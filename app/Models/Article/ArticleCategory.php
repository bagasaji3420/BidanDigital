<?php

namespace App\Models\Article;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArticleCategory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'article_id',
        'user_id',
        'parent_id',
        'content',
        'status',
    ];

    // 📰 article
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    // 👤 user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 🔁 parent comment
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    // 🔁 replies
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')
            ->where('status', 'approved');
    }
}
