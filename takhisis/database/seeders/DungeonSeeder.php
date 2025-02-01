<?php

namespace Database\Seeders;

use App\Models\Dungeon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DungeonSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Dungeon::factory()->count(5)->create();
    }
}
