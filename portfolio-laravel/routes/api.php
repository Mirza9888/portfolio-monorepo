<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Auth\ContentController;


Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [LoginController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('contents')->group(function () {
        Route::get('', [ContentController::class, 'getContent']);
        Route::post('', [ContentController::class, 'storeContent']);
        Route::get('/{content}', [ContentController::class, 'showContent']);
        Route::put('/{content}', [ContentController::class, 'updateContent']);
        Route::delete('/{content}', [ContentController::class, 'destroyContent']);
    });

    
});


