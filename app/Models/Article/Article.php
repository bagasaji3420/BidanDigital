<?php

namespace App\Models\Article;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Laravel\Scout\Searchable;
use Spatie\Tags\HasTags;

class Article extends Model
{
    use Searchable;
    use SoftDeletes;
    use HasTags;

    use HasSlug;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'status',
        'published_at',
        
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'breaking_until' => 'datetime', 
    ];

    // 👤 author
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function publisher()
    {
        return $this->belongsTo(User::class, 'publisher_id');
    }

    // 🗂️ categories
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    // 💬 comments
    public function comments()
    {
        return $this->hasMany(Comment::class)
            ->whereNull('parent_id')
            ->where('status', 'approved');
    }

    // 🔥 published scope
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at');
    }

    // 🔗 route model binding by slug
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }
}
