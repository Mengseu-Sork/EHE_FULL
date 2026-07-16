<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\VisitorController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\NewsArticleController;

// Visitor
Route::post('/visitor', [VisitorController::class, 'store']);

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Supporters
Route::get('/supporters', [PartnerController::class, 'index']);
Route::get('/supporters/{id}', [PartnerController::class, 'show']);

// Histories
Route::get('/histories', [HistoryController::class, 'index']);
Route::get('/histories/{history}', [HistoryController::class, 'show']);

// Projects
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

// Videos
Route::get('/videos', [VideoController::class, 'index']);
Route::get('/videos/{video}', [VideoController::class, 'show']);

// News
Route::get('/news', [NewsArticleController::class, 'index']);
Route::get('/news/{newsArticle}', [NewsArticleController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Visitor
    Route::get('/visitors', [VisitorController::class, 'index']);

    // History CRUD
    Route::post('/histories', [HistoryController::class, 'store']);
    Route::put('/histories/{history}', [HistoryController::class, 'update']);
    Route::delete('/histories/{history}', [HistoryController::class, 'destroy']);

    // Supporters CRUD
    Route::post('/supporters', [PartnerController::class, 'store']);
    Route::put('/supporters/{id}', [PartnerController::class, 'update']);
    Route::delete('/supporters/{id}', [PartnerController::class, 'destroy']);

    // Project CRUD
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Video CRUD
    Route::post('/videos', [VideoController::class, 'store']);
    Route::put('/videos/{video}', [VideoController::class, 'update']);
    Route::delete('/videos/{video}', [VideoController::class, 'destroy']);


    //new
    Route::post('/news', [NewsArticleController::class, 'store']);
    Route::put('/news/{newsArticle}', [NewsArticleController::class, 'update']);
    Route::delete('/news/{newsArticle}', [NewsArticleController::class, 'destroy']);
    
});
