<?php

namespace Database\Seeders;

use App\Models\EnemyType;
use App\Models\UniqueEnemy;
use Illuminate\Database\Seeder;

class EnemySeeder extends Seeder {
  public function run(): void {
    // Create base enemy types
    EnemyType::create([
      'name' => 'Goblin',
      'base_type' => 'goblin',
      'tier' => 'base',
      'available_count' => -1,
    ]);

    EnemyType::create([
      'name' => 'Skeleton',
      'base_type' => 'skeleton',
      'tier' => 'base',
      'available_count' => -1,
    ]);

    // Create minor enemy types
    EnemyType::create([
      'name' => 'Goblin Leader',
      'base_type' => 'goblin',
      'tier' => 'minor',
      'available_count' => 10,
    ]);

    // Create unique enemies
    $goblinType = EnemyType::where('base_type', 'goblin')->first();
    UniqueEnemy::create([
      'enemy_type_id' => $goblinType->id,
      'name' => 'Uktuk Borgdan',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'enemy_type_id' => $goblinType->id,
      'name' => 'Gruknak the Wise',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'enemy_type_id' => $goblinType->id,
      'name' => 'Zix Bloodfist',
      'is_available' => true,
    ]);

    // Create standalone unique enemies
    UniqueEnemy::create([
      'name' => 'Myrkul',
      'base_type' => 'deity',
      'category' => 'undead',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Orcus',
      'base_type' => 'demon',
      'category' => 'demon-lord',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Vecna',
      'base_type' => 'deity',
      'category' => 'undead',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Demogorgon',
      'base_type' => 'demon',
      'category' => 'demon-lord',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Lolth',
      'base_type' => 'deity',
      'category' => 'demon-lord',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Tiamat',
      'base_type' => 'deity',
      'category' => 'dragon-queen',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Asmodeus',
      'base_type' => 'deity',
      'category' => 'archdevil',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Baphomet',
      'base_type' => 'demon',
      'category' => 'demon-lord',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Zuggtmoy',
      'base_type' => 'demon',
      'category' => 'demon-lord',
      'is_available' => true,
    ]);

    UniqueEnemy::create([
      'name' => 'Juiblex',
      'base_type' => 'demon',
      'category' => 'demon-lord',
      'is_available' => true,
    ]);
  }
}
