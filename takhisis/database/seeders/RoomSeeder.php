<?php

namespace Database\Seeders;

use App\Models\Dungeon;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder {
  public function run(): void {
    // Create 5 dungeons, each with 10 rooms
    Dungeon::factory()
      ->count(3)
      ->create()
      ->each(function ($dungeon) {
        Room::factory()->createFullDungeon($dungeon);
      });
  }
}
