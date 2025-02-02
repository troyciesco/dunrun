<?php

namespace App\Http\Controllers;

use App\Models\Dungeon;
use App\Models\Enemy;
use App\Models\Room;
use App\Models\EnemyType;
use App\Models\UniqueEnemy;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class EnemyController extends Controller {
  public function index(?Dungeon $dungeon = null, ?Room $room = null): JsonResponse {
    if ($room) {
      return response()->json([
        'enemies' => $room->enemies()
          ->where('is_alive', true)
          ->get()
          ->map(fn($enemy) => [
            'id' => $enemy->id,
            'name' => $enemy->name,
            'base_type' => $enemy->base_type,
            'tier' => $enemy->tier,
            'is_unique' => $enemy->is_unique,
            'current_hp' => $enemy->current_hp,
            'max_hp' => $enemy->max_hp,
          ])
      ]);
    }

    // Return templates and unique enemies for the main listing
    return response()->json([
      'base_templates' => Enemy::whereNull('room_id')
        ->where('tier', 'base')
        ->where('is_unique', false)
        ->get(),
      'minor_templates' => Enemy::whereNull('room_id')
        ->where('tier', 'minor')
        ->where('is_unique', false)
        ->get(),
      'unique_enemies' => Enemy::where('is_unique', true)
        ->get()
    ]);
  }

  public function show(string $slug): JsonResponse {
    $name = str_replace('-', ' ', $slug);

    $enemy = Enemy::where('name', 'LIKE', $name)
      ->when(request()->has('template'), function ($query) {
        return $query->whereNull('room_id');
      })
      ->firstOrFail();

    return response()->json($enemy);
  }
}
