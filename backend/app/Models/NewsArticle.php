<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    protected $fillable = [
        'title',
        'category',
        'body',
        'images',
        'published_at',
    ];

    protected $casts = [
        'images' => 'array',
        'published_at' => 'date',
    ];
}
