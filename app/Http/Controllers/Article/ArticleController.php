<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;

use App\Models\Article\Article;
use App\Models\Article\Category;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;
use App\Jobs\SendNewsletterBlastJob;


// Article::withAnyTags(['laravel'])->get();
// $article->tags;


class ArticleController extends Controller
{
    public function index()
    {
        $title = 'Article';
        $articles = Article::with('categories')->latest()->paginate(10);
        $categories = Category::all();
        return view('Admin.Article.index', compact('articles', 'title', 'categories'));
    }

    public function search(Request $request)
    {
        $q = $request->q;
        $category = $request->category;
        $status = $request->status;
        $user = Auth::user();

        $articles = Article::with('categories')

            // 🔍 SEARCH
            ->when($q, function ($query) use ($q) {
                $query->where(function ($q2) use ($q) {
                    $q2->where('title', 'like', "%$q%")
                        ->orWhere('excerpt', 'like', "%$q%");
                });
            })

            // 🎯 CATEGORY FILTER
            ->when($category, function ($query) use ($category) {
                $query->whereHas('categories', function ($q) use ($category) {
                    $q->where('categories.id', $category);
                });
            })

            // 📌 STATUS FILTER
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })

            // 🔐 ROLE / OWNER FILTER
            ->when(
                !$user->hasAnyRole(['admin', 'editor', 'developer']),
                function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                }
            )

            ->latest()
            ->limit(10)
            ->get();

        return view('Admin.Article.list', compact('articles'))->render();
    }

    public function create()
    {
        $categories = Category::all();
        $title = 'Article Create';
        return view('Admin.Article.create', compact('title', 'categories'));
    }

    public function store(Request $request)
    {
        // 🏷️ handle tags dulu
        $tags = array_filter(array_map('trim', explode(',', $request->tags_input)));

        // 🖼️ upload image dulu
        $featuredImage = null;

        if ($request->hasFile('featured_image')) {
            $featuredImage = upload_image_webp($request->file('featured_image'), 'articles');
        }

        // 📰 create article
        $article = Article::create([
            'user_id'          => Auth::id(),
            'title'            => $request->title,
            'content'          => Purifier::clean($request->content),
            'excerpt'          => Str::limit(strip_tags($request->content), 180),
            'featured_image'   => $featuredImage,
            'meta_title'       => $request->title,
            'meta_description' => Str::limit(strip_tags($request->content), 160),
            'meta_keywords'    => implode(',', $tags),
            'status'           => 'draft',
        ]);

        // 🏷️ tags
        $article->syncTags($tags);

        // 🔍 search
        $article->searchable();

        // 🗂️ categories
        $article->categories()->sync($request->categories ?? []);



        return redirect()->route('articles.index');
    }

    public function show(Article $article)
    {
        $article->increment('views');

        $comments = $article->comments()->with('replies')->get();
        $title = $article->title;


        return view('Admin.Article.show', compact('article', 'comments', 'title'));
    }

    public function edit(Article $article)
    {
        $title = 'Article Edit';

        $categories = Category::all();
        return view('Admin.Article.edit', compact('article', 'title', 'categories'));
    }

    public function update(Request $request, Article $article)
    {
        // 🏷️ handle tags dari input string
        $tags = array_filter(array_map('trim', explode(',', $request->tags_input)));

        // 🖼️ handle image
        $featuredImage = $article->featured_image;

        if ($request->hasFile('featured_image')) {


            if ($article->featured_image && Storage::disk('public')->exists(
                str_replace('storage/', '', $article->featured_image)
            )) {
                Storage::disk('public')->delete(
                    str_replace('storage/', '', $article->featured_image)
                );
            }

            // upload baru
            $featuredImage = upload_image_webp($request->file('featured_image'), 'articles');
        }

        $oldImages = extractImages($article->getOriginal('content'));
        $newImages = extractImages($request->content);

        $deletedImages = array_diff($oldImages, $newImages);

        foreach ($deletedImages as $img) {

            $parsed = parse_url($img, PHP_URL_PATH);

            if (!$parsed) continue;

            // 🔥 bersihin ../ (data lama yang rusak)
            $cleanPath = preg_replace('#(\.\./)+#', '', $parsed);

            if (str_starts_with($cleanPath, '/storage/')) {

                $path = ltrim(str_replace('/storage/', '', $cleanPath), '/');

                Storage::disk('public')->delete($path);
            }
        }

        // 📰 update article
        $article->update([
            'title' => $request->title,
            'content' => Purifier::clean($request->content),
            'excerpt' => Str::limit(strip_tags($request->content), 180),

            // image
            'featured_image' => $featuredImage,

            // SEO
            'meta_title' => $request->title,
            'meta_description' => Str::limit(strip_tags($request->content), 160),
            'meta_keywords' => implode(',', $tags),

            'editor_id' => Auth::id(),

            // 🔥 STATUS
            'status' => $request->status,
            'publisher_id' => Auth::id(),
            // 🔥 PUBLISH DATE (logic di bawah)
            'published_at' => $request->status === 'published'
                ? ($request->published_at ?? now())
                : null,

            // 🔥 BREAKING
            'is_breaking' => $request->has('is_breaking'),
            'breaking_until' => $request->has('is_breaking')
                ? $request->breaking_until
                : null,
        ]);

        // 🗂️ categories
        $article->categories()->sync($request->categories ?? []);

        // 🏷️ tags
        $article->syncTags($tags);

        // 🔍 search
        $article->searchable();

        // di method update(), tambahkan kondisi ini
        if ($request->status === 'published' && $article->status !== 'published') {
            Artisan::call('sitemap:generate');
        }

        if ($request->has('blast_newsletter') && $request->status === 'published') {
            $subscribers = NewsletterSubscriber::where('is_active', true)->get();

            foreach ($subscribers as $subscriber) {
                dispatch(new SendNewsletterBlastJob(
                    $subscriber,
                    $article->title,
                    $article->excerpt . '<br><br><a href="' . route('article.show', $article->slug) . '">Baca Selengkapnya</a>',
                ));
            }
        }

        return redirect()->route('articles.show', $article->slug);
    }


    public function destroy(Article $article)
    {
        // 🖼️ hapus featured image
        if ($article->featured_image) {
            $path = str_replace('storage/', '', $article->featured_image);

            Storage::disk('public')->delete($path);
        }

        $images = extractImages($article->content);

        foreach ($images as $img) {

            $parsed = parse_url($img, PHP_URL_PATH); // ambil /storage/articles/xxx.webp

            if (!$parsed) continue;

            // pastikan memang dari storage
            if (str_starts_with($parsed, '/storage/')) {

                $path = ltrim(str_replace('/storage/', '', $parsed), '/');



                Storage::disk('public')->delete($path);
            }
        }

        $article->unsearchable();


        $article->categories()->detach();
        $article->syncTags([]);

        // 🗑️ delete article
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article deleted successfully');
    }




    public function editorUpload(Request $request)
    {
        if ($request->hasFile('file')) {

            $path = upload_image_webp($request->file('file'), 'articles');

            return response()->json([
                'location' => Storage::url($path) // 🔥 INI WAJIB
            ]);
        }

        return response()->json([
            'error' => 'Upload gagal'
        ], 400);
    }



    public function blast(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $subscribers = NewsletterSubscriber::where('is_active', true)->get();

        foreach ($subscribers as $subscriber) {
            dispatch(new SendNewsletterBlastJob(
                $subscriber,
                $request->subject,
                $request->content,
            ));
        }

        return back()->with('swal', [
            'icon'  => 'success',
            'title' => 'Blast Terkirim!',
            'text'  => 'Email sedang dikirim ke ' . $subscribers->count() . ' subscriber.',
        ]);
    }
}
