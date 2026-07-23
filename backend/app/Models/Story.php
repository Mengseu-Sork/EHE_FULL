<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'publish_date',
        'description',
        'images',
        'attachment',
    ];

    protected $casts = [
        'publish_date' => 'date',
        'images' => 'array',
    ];

    /**
     * Get image URLs
     */
    public function getImagesAttribute(string $value)
    {
        if (!$value) {
            return [];
        }

        $images = json_decode($value, true);

        return collect($images)->map(function ($image) {
            return asset('storage/' . $image);
        })->toArray();
    }
}
