<?php

namespace Database\Factories;

use App\Models\Enemy;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory {
    public function definition(): array {
        return [
            'dungeon_id' => \App\Models\Dungeon::factory(),
            'number' => fake()->numberBetween(1, 10),
        ];
    }

    /**
     * Create a complete set of 10 rooms for a dungeon
     */
    public function createFullDungeon(\App\Models\Dungeon $dungeon = null): void {
        $dungeon = $dungeon ?? \App\Models\Dungeon::factory()->create();

        // Get available enemies
        $baseTemplates = Enemy::where('tier', 'base')
            ->whereNull('room_id')
            ->where('is_unique', false)
            ->get();

        $minorTemplates = Enemy::where('tier', 'minor')
            ->whereNull('room_id')
            ->where('is_unique', false)
            ->get();

        $uniqueEnemies = Enemy::where('is_unique', true)
            ->where('is_available', true)
            ->whereNull('room_id')
            ->get();

        for ($i = 1; $i <= 10; $i++) {
            $room = \App\Models\Room::factory()->create([
                'dungeon_id' => $dungeon->id,
                'number' => $i
            ]);

            // Add 2-6 base enemies to every room
            $baseCount = fake()->numberBetween(2, 6);
            for ($j = 0; $j < $baseCount; $j++) {
                $template = $baseTemplates->random();
                $room->enemies()->save($template->spawn());
            }

            // Add minor enemies to specific rooms
            if (in_array($i, [3, 5, 7])) {
                $minorCount = fake()->numberBetween(1, 2);
                for ($j = 0; $j < $minorCount; $j++) {
                    $template = $minorTemplates->random();
                    $room->enemies()->save($template->spawn());
                }
            }

            if (in_array($i, [9, 10])) {
                for ($j = 0; $j < 2; $j++) {
                    $template = $minorTemplates->random();
                    $room->enemies()->save($template->spawn());
                }
            }

            // Add unique enemies to rooms 5 and 10
            if ($i === 5 || $i === 10) {
                $uniqueEnemy = $uniqueEnemies->where('is_available', true)->first();
                if ($uniqueEnemy) {
                    $uniqueEnemy->update([
                        'room_id' => $room->id,
                        'current_hp' => $uniqueEnemy->max_hp,
                        'is_alive' => true
                    ]);
                    // Remove from collection so it won't be used again
                    $uniqueEnemies = $uniqueEnemies->where('id', '!=', $uniqueEnemy->id);
                }
            }
        }
    }
}
