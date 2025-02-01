<?php

namespace Database\Factories;

use App\Models\EnemyType;
use Illuminate\Database\Eloquent\Factories\Factory;

class UniqueEnemyFactory extends Factory {
  public function definition(): array {
    return [
      'enemy_type_id' => EnemyType::factory(),
      'name' => fake()->unique()->name(),
      'is_available' => true,
      'runs_survived' => 0,
      'total_damage_dealt' => 0,
    ];
  }
}
