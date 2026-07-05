<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\ProgramController;


// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Public
Route::get('/supporters', [PartnerController::class, 'index']);
Route::get('/supporters/{id}', [PartnerController::class, 'show']);

Route::get('/histories', [HistoryController::class, 'index']);
Route::get('/histories/{history}', [HistoryController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/logout', [AuthController::class, 'logout']);


    // History CRUD
    Route::post('/histories', [HistoryController::class, 'store']);
    Route::put('/histories/{history}', [HistoryController::class, 'update']);
    Route::delete('/histories/{history}', [HistoryController::class, 'destroy']);

    // Patner
    Route::post('/supporters', [PartnerController::class, 'store']);
    Route::put('/supporters/{id}', [PartnerController::class, 'update']);
    Route::delete('/supporters/{id}', [PartnerController::class, 'destroy']);

    
});
