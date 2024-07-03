<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DummyController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\ThreeDController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
	/* Auth */
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::get('/user', [AuthController::class, 'user']);

	/* Site */
	Route::get('/categories', [SiteController::class, 'getCategories']);

	/* ThreeD */
	Route::prefix('3d')->group(function () {
		Route::post('/upload', [ThreeDController::class, 'upload']);
		Route::get('/highlighted_models', [ThreeDController::class, 'getHighlightedModels']);
	});

	/* Discover */
	Route::prefix('discover')->group(function () {
		Route::get('/most_liked_models', [ThreeDController::class, 'getMostLikedModels']);
	});

	Route::post('test', [DummyController::class, 'test']);
});
