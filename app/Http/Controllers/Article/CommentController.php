<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;

use App\Models\Article\Article;
use App\Models\Article\Comment;
use App\Models\User;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $articleId = Crypt::decrypt($request->slug);

        
        $article = Article::findOrFail($articleId);


        $request->validate([
            'content' => 'required|string'
        ]);

        $actor = Auth::user();
        $parentId = $request->parent_id;

        // 🔥 IG style: reply ke reply → tetap ke root
        if ($parentId) {
            $parent = Comment::find($parentId);

            if ($parent && $parent->parent_id) {
                $parentId = $parent->parent_id;
            }
        }

        // ✅ SIMPAN COMMENT
        $comment = Comment::create([
            'article_id' => $article->id,
            'user_id' => $actor->id,
            'parent_id' => $parentId,
            'content' => $request->content,
            'status' => 'approved',
        ]);

        // 🔥 TRACK USER YANG SUDAH DINOTIF (ANTI DOUBLE)
        $notifiedUserIds = [];

        // =========================
        // 🔔 1. NOTIF REPLY
        // =========================
        if ($request->parent_id) {
            $parent = Comment::find($request->parent_id);

            if ($parent && $parent->user_id !== $actor->id) {

                $parent->user->notify(new UserNotification([
                    'title' => 'Comment Replied',
                    'message' => $request->content,
                    'type' => 'comment',
                    'icon' => 'bx-message-dots',
                    'color' => 'primary',

                    'sender_id' => $actor->id,
                    'sender_name' => $actor->first_name . ' ' . $actor->last_name,
                    'avatar' => $actor->avatar
                        ? Storage::url($actor->avatar)
                        : 'https://ui-avatars.com/api/?name=' . urlencode($actor->name),

                    'url' => route('article.show', $article->slug),
                ]));

                $notifiedUserIds[] = $parent->user_id; // 🔥 tandai
            }
        }

        // =========================
        // 🔔 2. NOTIF MENTION (@user)
        // =========================
        preg_match_all('/@([\w]+)/', $request->content, $matches);

        if (!empty($matches[1])) {
            $mentionedUsers = User::whereIn('username', $matches[1])->get();

            foreach ($mentionedUsers as $user) {

                if ($user->id == $actor->id) continue;

                // ❌ skip kalau sudah dinotif (anti double)
                if (in_array($user->id, $notifiedUserIds)) continue;

                $user->notify(new UserNotification([
                    'title' => 'You were mentioned, ' . $actor->first_name . ' ' . $actor->last_name,
                    'message' => $request->content,
                    'type' => 'mention',
                    'icon' => 'bx-at',
                    'color' => 'info',

                    'sender_id' => $actor->id,
                    'sender_name' => $actor->first_name . ' ' . $actor->last_name,
                    'avatar' => $actor->avatar
                        ? Storage::url($actor->avatar)
                        : 'https://ui-avatars.com/api/?name=' . urlencode($actor->name),

                    'url' => route('article.show', $article->slug),
                ]));

                $notifiedUserIds[] = $user->id; // 🔥 tandai
            }
        }

        // =========================
        // 🔔 3. NOTIF KE AUTHOR (komen baru)
        // =========================
        if (!$request->parent_id) {

            $author = $article->user;

            if (
                $author &&
                $author->id !== $actor->id &&
                !in_array($author->id, $notifiedUserIds) // 🔥 anti double
            ) {

                $author->notify(new UserNotification([
                    'title' =>  'New Comment (' . $actor->first_name . ' ' . $actor->last_name . ')',
                    'message' => $request->content,
                    'type' => 'comment',
                    'icon' => 'bx-comment',
                    'color' => 'primary',

                    'sender_id' => $actor->id,
                    'sender_name' => $actor->first_name . ' ' . $actor->last_name,
                    'avatar' => $actor->avatar
                        ? Storage::url($actor->avatar)
                        : 'https://ui-avatars.com/api/?name=' . urlencode($actor->name),

                    'url' => route('article.show', $article->slug),
                ]));
            }
        }

        return back();
    }

    public function test()
    {
        echo 'hello';
    }


    public function destroy(Comment $comment)
    {
        // 🔒 hanya owner atau admin
        if (Auth::id() !== $comment->user_id && !Auth::user()->hasRole('admin')) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted');
    }
}
