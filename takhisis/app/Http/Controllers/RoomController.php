<?php

namespace App\Http\Controllers;

use App\Models\Dungeon;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoomController extends Controller {
  public function index(Dungeon $dungeon): JsonResponse {
    $rooms = $dungeon->rooms()->orderBy('number')->get();
    return response()->json($rooms);
  }

  public function store(Request $request, Dungeon $dungeon): JsonResponse {
    $validated = $request->validate([
      'number' => [
        'required',
        'integer',
        'between:1,10',
        'unique:rooms,number,NULL,id,dungeon_id,' . $dungeon->id,
      ],
    ]);

    $room = $dungeon->rooms()->create($validated);
    return response()->json($room, 201);
  }

  public function show(Dungeon $dungeon, $number): JsonResponse {
    $room = $dungeon->rooms()->where('number', $number)->firstOrFail();
    return response()->json($room);
  }

  public function update(Request $request, Dungeon $dungeon, $number): JsonResponse {
    $room = $dungeon->rooms()->where('number', $number)->firstOrFail();

    $validated = $request->validate([
      'number' => [
        'required',
        'integer',
        'between:1,10',
        'unique:rooms,number,' . $room->id . ',id,dungeon_id,' . $dungeon->id,
      ],
    ]);

    $room->update($validated);
    return response()->json($room);
  }

  public function destroy(Dungeon $dungeon, $number): JsonResponse {
    $room = $dungeon->rooms()->where('number', $number)->firstOrFail();
    $room->delete();
    return response()->json(null, 204);
  }
}
