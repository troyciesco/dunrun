<?php

namespace Database\Factories;

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

        for ($i = 1; $i <= 10; $i++) {
            \App\Models\Room::factory()->create([
                'dungeon_id' => $dungeon->id,
                'number' => $i
            ]);
        }
    }
}
