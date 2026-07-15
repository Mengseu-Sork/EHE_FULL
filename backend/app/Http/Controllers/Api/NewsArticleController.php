<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsArticleController extends Controller
{
    public function index()
    {
        return NewsArticle::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'category'=>'required',
            'excerpt'=>'required',
            'body'=>'nullable',
            'published_at'=>'nullable|date',
            'image'=>'nullable|image|max:2048'
        ]);

        $image = null;

        if($request->hasFile('image')){
            $image = $request->file('image')->store('news','public');
        }

        $news = NewsArticle::create([
            'title'=>$request->title,
            'slug'=>str()->slug($request->title),
            'category'=>$request->category,
            'excerpt'=>$request->excerpt,
            'body'=>$request->body,
            'image'=>$image,
            'published_at'=>$request->published_at,
            'is_published'=>true
        ]);

        return response()->json($news,201);
    }

    public function show(NewsArticle $newsArticle)
    {
        return $newsArticle;
    }

    public function update(Request $request, NewsArticle $newsArticle)
    {
        if($request->hasFile('image')){

            if($newsArticle->image){
                Storage::disk('public')->delete($newsArticle->image);
            }

            $newsArticle->image = $request->file('image')->store('news','public');
        }

        $newsArticle->update($request->except('image'));

        if($request->hasFile('image')){
            $newsArticle->save();
        }

        return $newsArticle;
    }

    public function destroy(NewsArticle $newsArticle)
    {
        if($newsArticle->image){
            Storage::disk('public')->delete($newsArticle->image);
        }

        $newsArticle->delete();

        return response()->json([
            'message'=>'Deleted Successfully'
        ]);
    }
}