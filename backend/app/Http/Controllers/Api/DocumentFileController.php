<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;


class DocumentFileController extends Controller
{
    public function show($path)
    {
        $file = storage_path('app/public/' . $path);

        if (!file_exists($file)) {
            abort(404);
        }

        $origin = request()->header('Origin');

        $allowedOrigins = [
            'http://localhost:5173',
            'https://eheo.cc',
        ];

        return Response::file($file, [
            'Content-Type' => 'application/pdf',
            'Access-Control-Allow-Origin' => in_array($origin, $allowedOrigins) ? $origin : '',
            'Access-Control-Allow-Methods' => 'GET, OPTIONS',
            'Access-Control-Allow-Headers' => '*',
            'Cache-Control' => 'public, max-age=3600',
            'Vary' => 'Origin',
        ]);
    }
}
