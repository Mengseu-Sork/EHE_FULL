<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NewsArticleController extends Controller
{
    public function index()
    {
        return NewsArticle::latest()->paginate(12);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'         => 'required|string|max:255',
            'category'      => 'required|string|max:255',
            'body'          => 'nullable|string',
            'published_at'  => 'nullable|date',

            'images'        => 'nullable|array',
            'images.*'      => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $images = [];

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $images[] = $image->store('news', 'public');
            }
        }

        $news = NewsArticle::create([
            'title'         => $request->title,
            'category'      => $request->category,
            'body'          => $request->body,
            'published_at'  => $request->published_at,
            'images'        => $images,
        ]);

        return response()->json($news, 201);
    }

    public function show(NewsArticle $newsArticle)
    {
        return response()->json($newsArticle);
    }

    public function update(Request $request, NewsArticle $newsArticle)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'body' => 'nullable|string',
            'published_at' => 'nullable|date',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',

            'old_images' => 'nullable|array',
        ]);

        // Images that the user kept
        $images = $request->old_images ?? [];

        // Images currently stored in DB
        $currentImages = $newsArticle->images ?? [];

        // Delete images removed by the user
        foreach ($currentImages as $image) {

            if (!in_array($image, $images)) {

                Storage::disk('public')->delete($image);
            }
        }

        // Upload new images
        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $images[] = $image->store('news', 'public');
            }
        }

        $newsArticle->update([
            'title' => $request->title,
            'category' => $request->category,
            'body' => $request->body,
            'published_at' => $request->published_at,
            'images' => $images,
        ]);

        return response()->json([
            'message' => 'News updated successfully.',
            'data' => $newsArticle->fresh(),
        ]);
    }

    public function destroy(NewsArticle $newsArticle)
    {
        if ($newsArticle->images) {

            foreach ($newsArticle->images as $image) {

                Storage::disk('public')->delete($image);
            }
        }

        $newsArticle->delete();

        return response()->json([
            'message' => 'Deleted Successfully'
        ]);
    }
}
