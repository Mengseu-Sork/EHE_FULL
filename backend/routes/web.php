<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Api\DocumentFileController;

Route::get('/documents/file/{path}', [DocumentFileController::class, 'show'])
    ->where('path', '.*');
