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
      'max_hp' => 10
    ]);

    Enemy::create([
      'name' => 'Skeleton',
      'base_type' => 'skeleton',
      'tier' => 'base',
      'current_hp' => 10,
      'max_hp' => 10
    ]);

    // Create minor enemy types
    Enemy::create([
      'name' => 'Goblin Leader',
      'base_type' => 'goblin',
      'tier' => 'minor',
      'current_hp' => 20,
      'max_hp' => 20
    ]);

    // $goblinTemplate = Enemy::template('goblin', 'base')->first();
    // Create unique enemies
    Enemy::create([
      'name' => 'Uktuk Borgdan',
      'base_type' => 'goblin',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 75,
      'max_hp' => 75,
    ]);

    Enemy::create([
      'name' => 'Gruknak the Wise',
      'base_type' => 'goblin',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 85,
      'max_hp' => 85,
    ]);

    Enemy::create([
      'name' => 'Zix Bloodfist',
      'base_type' => 'goblin',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 95,
      'max_hp' => 95,
    ]);

    // Create standalone unique enemies
    Enemy::create([
      'name' => 'Myrkul',
      'base_type' => 'deity',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 160,
      'max_hp' => 160,
    ]);

    Enemy::create([
      'name' => 'Orcus',
      'base_type' => 'demon',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 170,
      'max_hp' => 170,
    ]);

    Enemy::create([
      'name' => 'Vecna',
      'base_type' => 'deity',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 175,
      'max_hp' => 175,
    ]);

    Enemy::create([
      'name' => 'Demogorgon',
      'base_type' => 'demon',
      'tier' => 'major',
      'is_available' => true,
      'current_hp' => 180,
      'max_hp' => 180,
    ]);
  }
}
