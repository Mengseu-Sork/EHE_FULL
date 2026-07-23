<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StoryController extends Controller
{
    /**
     * Display a listing.
     */
    public function index(Request $request)
    {
        $query = Story::query();

        // Search
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter Year
        if ($request->filled('year')) {
            $query->whereYear('publish_date', $request->year);
        }

        $stories = $query
            ->latest()
            ->paginate(12);

        return response()->json($stories);
    }

    /**
     * Store a newly created story.
     */
    public function store(StoreStoryRequest $request)
    {
        $data = $request->validated();

        // Upload Images
        $images = [];

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $images[] = $image->store(
                    'stories/images',
                    'public'
                );
            }
        }

        // Upload Attachment
        $attachment = null;

        if ($request->hasFile('attachment')) {

            $attachment = $request
                ->file('attachment')
                ->store('stories/files', 'public');
        }

        $story = Story::create([
            'title' => $data['title'],
            'publish_date' => $data['publish_date'],
            'description' => $data['description'] ?? null,
            'images' => $images,
            'attachment' => $attachment,
        ]);

        return response()->json([
            'message' => 'Story created successfully.',
            'data' => $story
        ], 201);
    }

    /**
     * Display the specified story.
     */
    public function show(Story $story)
    {
        return response()->json($story);
    }

    /**
     * Update the specified story.
     */
    public function update(UpdateStoryRequest $request, Story $story)
    {
        $data = $request->validated();

        // Replace Images
        if ($request->hasFile('images')) {

            if ($story->images) {

                foreach ($story->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            $images = [];

            foreach ($request->file('images') as $image) {

                $images[] = $image->store(
                    'stories/images',
                    'public'
                );
            }

            $story->images = $images;
        }

        // Replace Attachment
        if ($request->hasFile('attachment')) {

            if ($story->attachment) {
                Storage::disk('public')->delete($story->attachment);
            }

            $story->attachment = $request
                ->file('attachment')
                ->store('stories/files', 'public');
        }

        $story->title = $data['title'];
        $story->publish_date = $data['publish_date'];
        $story->description = $data['description'] ?? null;

        $story->save();

        return response()->json([
            'message' => 'Story updated successfully.',
            'data' => $story
        ]);
    }

    /**
     * Remove the specified story.
     */
    public function destroy(Story $story)
    {
        // Delete Images
        if ($story->images) {

            foreach ($story->images as $image) {

                Storage::disk('public')->delete($image);
            }
        }

        // Delete Attachment
        if ($story->attachment) {

            Storage::disk('public')
                ->delete($story->attachment);
        }

        $story->delete();

        return response()->json([
            'message' => 'Story deleted successfully.'
        ]);
    }
}
