<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Article\Article as Articles;
use App\Models\Article\Category;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class Article extends Controller
{

    public function home()
    {
        $ids = Cache::remember('home_article_ids', now()->addMinutes(30), function () {
            return Articles::where('status', 'published')
                ->latest()
                ->pluck('id')
                ->toArray();
        });

        $categories = Category::all();

        $articles = Articles::with(['categories', 'user'])
            ->whereIn('id', $ids)
            ->orderByRaw('FIELD(id, ' . implode(',', $ids) . ')')
            ->get();

        $description = 'BundaMuda – Informasi terpercaya seputar kehamilan, persalinan, tumbuh kembang bayi, dan parenting untuk ibu Indonesia.';

        SEOMeta::setTitle(config('app.name') . ' – Sahabat Ibu Hamil & Bunda');
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url('/'));
        SEOMeta::addKeyword(['kehamilan', 'ibu hamil', 'parenting', 'tumbuh kembang bayi', 'BundaMuda']);

        OpenGraph::setTitle(config('app.name') . ' – Sahabat Ibu Hamil & Bunda');
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url('/'));
        OpenGraph::setType('website');
        OpenGraph::setSiteName(config('app.name'));

        TwitterCard::setTitle(config('app.name') . ' – Sahabat Ibu Hamil & Bunda');
        TwitterCard::setDescription($description);
        TwitterCard::setType('summary');

        return view('Home.Index', [
            'title'      => config('app.name'),
            'articles'   => $articles,
            'categories' => $categories,
        ]);
    }

    public function bookmark(){
        return view('Home.Article.bookmark', [
            'title'      => 'Bookmark Artikel',
        ]);
    }

    public function index(Request $request)
    {
        $title = 'Articles';

        $q        = $request->q;
        $category = $request->category;

        $articles = Articles::with('categories')
            ->where('status', 'published')
            ->when($q, function ($query) use ($q) {
                $query->where(function ($q2) use ($q) {
                    $q2->where('title', 'like', "%$q%")
                        ->orWhere('excerpt', 'like', "%$q%");
                });
            })
            ->when($category, function ($query) use ($category) {
                $query->whereHas('categories', function ($q) use ($category) {
                    $q->where('categories.id', $category);
                });
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();

        $categories = Category::withCount(['articles' => function ($q) {
            $q->where('status', 'published');
        }])->get();

        $featured = Articles::with('categories')
            ->where('status', 'published')
            ->orderByDesc('views')
            ->take(3)
            ->get();

        $description = $q
            ? "Hasil pencarian artikel tentang \"{$q}\" – temukan informasi seputar kehamilan, persalinan, dan parenting di BundaMuda."
            : 'Kumpulan artikel seputar kehamilan, persalinan, tumbuh kembang bayi, dan parenting. Informasi terpercaya untuk para ibu dan calon ibu.';

        SEOMeta::setTitle('Artikel Kehamilan & Parenting | BundaMuda');
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::addKeyword(['artikel kehamilan', 'artikel parenting', 'info ibu hamil', 'tumbuh kembang bayi', 'BundaMuda']);

        OpenGraph::setTitle('Artikel Kehamilan & Parenting | BundaMuda');
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setType('website');

        TwitterCard::setTitle('Artikel Kehamilan & Parenting | BundaMuda');
        TwitterCard::setDescription($description);
        TwitterCard::setType('summary');

        return view('Home.Article.index', compact('articles', 'title', 'categories', 'featured', 'q', 'category'));
    }

    public function show(Articles $article)
    {
        abort_if($article->status !== 'published', 404);


        $article->increment('views');

        $comments = $article->comments()->with('replies')->whereNull('parent_id')->latest()->get();

        $related = Articles::with('categories')
            ->where('status', 'published')
            ->where('id', '!=', $article->id)
            ->whereHas('categories', function ($q) use ($article) {
                $q->whereIn('categories.id', $article->categories->pluck('id'));
            })
            ->latest()
            ->take(3)
            ->get();

        $title       = $article->title;
        $description = $article->excerpt ?? \Illuminate\Support\Str::limit(strip_tags($article->content), 160);
        $image       = $article->thumbnail ? asset($article->thumbnail) : null;
        $keywords    = $article->categories->pluck('name')->toArray();

        SEOMeta::setTitle($title . ' | ' . config('app.name') );
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::addKeyword($keywords);

        OpenGraph::setTitle($title . ' | ' . config('app.name') );
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setType('article');
        OpenGraph::setArticle([
            'published_time' => $article->created_at->toIso8601String(),
            'modified_time'  => $article->updated_at->toIso8601String(),
            'author'         => $article->author->name ?? 'BundaMuda',
        ]);
        if ($image) {
            OpenGraph::addImage($image);
        }

        TwitterCard::setTitle($title . ' | ' . config('app.name') );
        TwitterCard::setDescription($description);
        TwitterCard::setType('summary_large_image');
        if ($image) {
            TwitterCard::setImage($image);
        }

        return view('Home.Article.show', compact('article', 'comments', 'title', 'related'));
    }
}
