<?php

namespace App\Http\Controllers;

use App\Models\Dungeon;
use App\Models\Room;
use App\Models\EnemyType;
use App\Models\UniqueEnemy;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class EnemyController extends Controller {
  public function index(?Dungeon $dungeon = null, ?Room $room = null): JsonResponse {
    if ($room) {
      $uniqueEnemies = UniqueEnemy::where('room_id', $room->id)
        ->with('enemyType')
        ->get();
      return response()->json($uniqueEnemies);
    }

    $types = EnemyType::all();
    $uniques = UniqueEnemy::with('enemyType')->get();

    return response()->json([
      'types' => $types,
      'unique_enemies' => $uniques,
    ]);
  }

  public function show(string $slug): JsonResponse {
    $name = Str::title(str_replace('-', ' ', $slug));

    $uniqueEnemy = UniqueEnemy::where('name', $name)
      ->with('enemyType')
      ->first();

    if ($uniqueEnemy) {
      return response()->json([
        'type' => 'unique',
        'enemy' => $uniqueEnemy
      ]);
    }

    $enemyType = EnemyType::where('name', $name)->first();

    if ($enemyType) {
      return response()->json([
        'type' => 'template',
        'enemy' => $enemyType
      ]);
    }

    return response()->json(['message' => 'Enemy not found'], 404);
  }
}
