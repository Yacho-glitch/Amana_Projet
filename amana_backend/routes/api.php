<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BordereauController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\UserController;
use App\Models\Bordereau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/login', function() {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Bordereaux
    Route::get('/bordereaux', [BordereauController::class, 'index']);
    Route::get('/bordereaux/stats', [BordereauController::class, 'state']);

    // Demandes
    Route::get('/demandes', [DemandeController::class, 'index']);
    Route::post('demandes', [DemandeController::class, 'store']);
    Route::patch('/demandes/{id}/statut', [DemandeController::class, 'updateStatut']);

    // Users - admin only
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

});
