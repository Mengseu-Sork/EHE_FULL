<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class VideoController extends Controller
{
    /**
     * Display videos
     */
    public function index()
    {
        return response()->json(
            Video::latest()->get()
        );
    }

    /**
     * Store
     */
    public function store(Request $request)
    {
        $request->validate([
            'video_file' => 'required|mimes:mp4,mov,avi,mkv,webm|max:512000',
        ]);

        $path = $request->file('video_file')->store('videos', 'public');

        Video::create([
            'video_file' => $path,
            'original_name' => $request->file('video_file')->getClientOriginalName(),
            'size' => $request->file('video_file')->getSize(),
        ]);

        return response()->json([
            'message' => 'Video uploaded successfully.',
        ]);
    }

    /**
     * Show
     */
    public function show(Video $video)
    {
        return response()->json($video);
    }

    /**
     * Update
     */
    public function update(Request $request, Video $video)
    {
        $request->validate([
            'video_file' => 'nullable|mimes:mp4,mov,avi,mkv,webm|max:512000',
        ]);

        if ($request->hasFile('video_file')) {

            Storage::disk('public')->delete($video->video_file);

            $path = $request->file('video_file')->store('videos', 'public');

            $video->update([
                'video_file' => $path,
                'original_name' => $request->file('video_file')->getClientOriginalName(),
                'size' => $request->file('video_file')->getSize(),
            ]);
        }

        return response()->json([
            'message' => 'Video updated successfully.',
        ]);
    }

    /**
     * Delete
     */
    public function destroy(Video $video)
    {
        Storage::disk('public')->delete($video->video_file);

        $video->delete();

        return response()->json([
            'message' => 'Video deleted successfully.',
        ]);
    }
}
