<?php

namespace Database\Seeders;

use App\Models\Enemy;
use Illuminate\Database\Seeder;

class EnemySeeder extends Seeder {
  public function run(): void {
    // Create base enemy types
    Enemy::create([
      'name' => 'Goblin',
      'base_type' => 'goblin',
      'tier' => 'base',
      'current_hp' => 10,
      'max_hp' => 10,
      'strength' => 8,
      'dexterity' => 12,
      'constitution' => 8,
      'intelligence' => 6,
      'wisdom' => 6,
      'charisma' => 6,
      'armor_class' => 12
    ]);

    Enemy::create([
      'name' => 'Skeleton',
      'base_type' => 'skeleton',
      'tier' => 'base',
      'current_hp' => 10,
      'max_hp' => 10,
      'strength' => 10,
      'dexterity' => 10,
      'constitution' => 10,
      'intelligence' => 4,
      'wisdom' => 4,
      'charisma' => 4,
      'armor_class' => 13
    ]);

    // Create minor enemy types
    Enemy::create([
      'name' => 'Goblin Leader',
      'base_type' => 'goblin',
      'tier' => 'minor',
      'current_hp' => 20,
      'max_hp' => 20,
      'strength' => 12,
      'dexterity' => 14,
      'constitution' => 12,
      'intelligence' => 10,
      'wisdom' => 10,
      'charisma' => 12,
      'armor_class' => 14
    ]);

    // Create unique enemies
    Enemy::create([
      'name' => 'Uktuk Borgdan',
      'base_type' => 'goblin',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 75,
      'max_hp' => 75,
      'strength' => 16,
      'dexterity' => 16,
      'constitution' => 16,
      'intelligence' => 14,
      'wisdom' => 12,
      'charisma' => 14,
      'armor_class' => 16
    ]);

    Enemy::create([
      'name' => 'Gruknak the Wise',
      'base_type' => 'goblin',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 85,
      'max_hp' => 85,
      'strength' => 14,
      'dexterity' => 14,
      'constitution' => 16,
      'intelligence' => 18,
      'wisdom' => 18,
      'charisma' => 16,
      'armor_class' => 16
    ]);

    Enemy::create([
      'name' => 'Zix Bloodfist',
      'base_type' => 'goblin',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 95,
      'max_hp' => 95,
      'strength' => 18,
      'dexterity' => 18,
      'constitution' => 18,
      'intelligence' => 14,
      'wisdom' => 14,
      'charisma' => 16,
      'armor_class' => 17
    ]);

    // Create standalone unique enemies
    Enemy::create([
      'name' => 'Myrkul',
      'base_type' => 'deity',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 160,
      'max_hp' => 160,
      'strength' => 22,
      'dexterity' => 20,
      'constitution' => 24,
      'intelligence' => 25,
      'wisdom' => 25,
      'charisma' => 25,
      'armor_class' => 20
    ]);

    Enemy::create([
      'name' => 'Orcus',
      'base_type' => 'demon',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 170,
      'max_hp' => 170,
      'strength' => 26,
      'dexterity' => 20,
      'constitution' => 26,
      'intelligence' => 20,
      'wisdom' => 20,
      'charisma' => 24,
      'armor_class' => 21
    ]);

    Enemy::create([
      'name' => 'Vecna',
      'base_type' => 'deity',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 175,
      'max_hp' => 175,
      'strength' => 20,
      'dexterity' => 20,
      'constitution' => 24,
      'intelligence' => 28,
      'wisdom' => 28,
      'charisma' => 26,
      'armor_class' => 21
    ]);

    Enemy::create([
      'name' => 'Demogorgon',
      'base_type' => 'demon',
      'tier' => 'major',
      'is_unique' => true,
      'is_available' => true,
      'current_hp' => 180,
      'max_hp' => 180,
      'strength' => 28,
      'dexterity' => 22,
      'constitution' => 28,
      'intelligence' => 22,
      'wisdom' => 22,
      'charisma' => 26,
      'armor_class' => 22
    ]);
  }
}
