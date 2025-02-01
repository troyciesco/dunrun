<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EnemyTypeFactory extends Factory {
  public function definition(): array {
    return [
      'name' => fake()->unique()->words(2, true),
      'base_type' => fake()->randomElement(['goblin', 'skeleton']),
      'tier' => fake()->randomElement(['base', 'minor']),
      'available_count' => -1,
    ];
  }
}
