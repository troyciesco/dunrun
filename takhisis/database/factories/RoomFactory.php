<?php

namespace Database\Factories;

use App\Models\EnemyType;
use App\Models\UniqueEnemy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
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
        $baseEnemies = EnemyType::where('tier', 'base')->pluck('id')->toArray();
        $minorEnemies = EnemyType::where('tier', 'minor')->pluck('id')->toArray();
        $uniqueEnemies = UniqueEnemy::where('is_available', true)
            ->whereNull('room_id')
            ->get();

        for ($i = 1; $i <= 10; $i++) {
            $room = \App\Models\Room::factory()->create([
                'dungeon_id' => $dungeon->id,
                'number' => $i
            ]);

            // Add 2-6 base enemies to every room
            $baseCount = fake()->numberBetween(2, 6);
            $selectedBaseEnemies = array_fill(0, $baseCount, fake()->randomElement($baseEnemies));
            $room->enemyTypes()->attach($selectedBaseEnemies);

            // Add minor enemies to specific rooms
            if (in_array($i, [3, 5, 7])) {
                $minorCount = fake()->numberBetween(1, 2);
                $selectedMinorEnemies = array_fill(0, $minorCount, fake()->randomElement($minorEnemies));
                $room->enemyTypes()->attach($selectedMinorEnemies);
            }

            if (in_array($i, [9, 10])) {
                $selectedMinorEnemies = array_fill(0, 2, fake()->randomElement($minorEnemies));
                $room->enemyTypes()->attach($selectedMinorEnemies);
            }

            // Add unique enemies to rooms 5 and 10
            if ($i === 5 || $i === 10) {
                $availableUnique = $uniqueEnemies->where('room_id', null)->first();
                if ($availableUnique) {
                    $availableUnique->update(['room_id' => $room->id]);
                    // Remove this enemy from our collection so it won't be used again
                    $uniqueEnemies = $uniqueEnemies->where('id', '!=', $availableUnique->id);
                }
            }
        }
    }
}
