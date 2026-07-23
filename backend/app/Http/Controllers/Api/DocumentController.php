<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::query();

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('year')) {
            $query->where('year', $request->year);
        }

        return $query->latest()->paginate(12);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:Bi-Monthly Newsletter,Publication,Report,Annual Report,Position Paper',
            'year' => 'required|digits:4',

            'khmer_file' => 'nullable|file|mimes:pdf|max:20480',
            'english_file' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        $khmer = null;
        $english = null;

        if ($request->hasFile('khmer_file')) {
            $khmer = $request->file('khmer_file')
                ->store('documents/khmer', 'public');
        }

        if ($request->hasFile('english_file')) {
            $english = $request->file('english_file')
                ->store('documents/english', 'public');
        }

        $document = Document::create([
            'title' => $request->title,
            'type' => $request->type,
            'year' => $request->year,
            'khmer_file' => $khmer,
            'english_file' => $english
        ]);

        return response()->json($document);
    }

    public function show(Document $document)
    {
        return $document;
    }

    public function update(Request $request, Document $document)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:Bi-Monthly Newsletter,Publication,Report,Annual Report,Position Paper',
            'year' => 'required|digits:4',

            'khmer_file' => 'nullable|file|mimes:pdf|max:20480',
            'english_file' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        if ($request->hasFile('khmer_file')) {

            if ($document->khmer_file) {
                Storage::disk('public')->delete($document->khmer_file);
            }

            $document->khmer_file = $request->file('khmer_file')
                ->store('documents/khmer', 'public');
        }

        if ($request->hasFile('english_file')) {

            if ($document->english_file) {
                Storage::disk('public')->delete($document->english_file);
            }

            $document->english_file = $request->file('english_file')
                ->store('documents/english', 'public');
        }

        $document->title = $request->title;
        $document->type = $request->type;
        $document->year = $request->year;

        $document->save();

        return response()->json($document);
    }

    public function destroy(Document $document)
    {
        if ($document->khmer_file) {
            Storage::disk('public')->delete($document->khmer_file);
        }

        if ($document->english_file) {
            Storage::disk('public')->delete($document->english_file);
        }

        $document->delete();

        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }
}
