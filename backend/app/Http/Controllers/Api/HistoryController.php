<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\History;

class HistoryController extends Controller
{
    /**
     * Display all histories
     */
    public function index()
    {
        $histories = History::orderBy('id', 'asc')->get()->map(function ($history) {
            return [
                'id' => $history->id,
                'year' => $history->year,
                'title' => $history->title,
                'description' => $history->description,
                'is_active' => $history->is_active,
                'image' => $history->image
                    ? asset('storage/' . $history->image)
                    : null,
            ];
        });

        return response()->json($histories);
    }

    /**
     * Store a new history
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:20',
            'title' => 'nullable|string|max:255',
            'description' => 'required|string',
            'is_active' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('history', 'public');
        }

        $history = History::create([
            'year' => $validated['year'],
            'title' => $validated['title'] ?? null,
            'description' => $validated['description'],
            'is_active' => $validated['is_active'] ?? true,
            'image' => $validated['image'] ?? null,
        ]);

        return response()->json([
            'message' => 'History created successfully.',
            'data' => $history,
        ], 201);
    }

    /**
     * Show one history
     */
    public function show(int $id)
    {
        $history = History::findOrFail($id);

        return response()->json([
            'id' => $history->id,
            'year' => $history->year,
            'title' => $history->title,
            'description' => $history->description,
            'is_active' => $history->is_active,
            'image' => $history->image
                ? asset('storage/' . $history->image)
                : null,
        ]);
    }

    /**
     * Update history
     */
    public function update(Request $request, int $id)
    {
        $history = History::findOrFail($id);

        $validated = $request->validate([
            'year' => 'required|string|max:20',
            'title' => 'nullable|string|max:255',
            'description' => 'required|string',
            'is_active' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {

            if ($history->image && Storage::disk('public')->exists($history->image)) {
                Storage::disk('public')->delete($history->image);
            }

            $validated['image'] = $request->file('image')
                ->store('history', 'public');
        }

        $history->update([
            'year' => $validated['year'],
            'title' => $validated['title'] ?? null,
            'description' => $validated['description'],
            'is_active' => $validated['is_active'] ?? true,
            'image' => $validated['image'] ?? $history->image,
        ]);

        return response()->json([
            'message' => 'History updated successfully.',
            'data' => $history,
        ]);
    }

    /**
     * Delete history
     */
    public function destroy(int $id)
    {
        $history = History::findOrFail($id);

        if ($history->image && Storage::disk('public')->exists($history->image)) {
            Storage::disk('public')->delete($history->image);
        }

        $history->delete();

        return response()->json([
            'message' => 'History deleted successfully.'
        ]);
    }
}
