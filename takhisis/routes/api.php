<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DungeonController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::apiResource('dungeons', DungeonController::class);
Route::apiResource('dungeons.rooms', RoomController::class)->parameters([
  'rooms' => 'number'
]);

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');
