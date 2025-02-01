<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model {
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;

    protected $fillable = [
        'dungeon_id',
        'number'
    ];

    public function dungeon(): BelongsTo {
        return $this->belongsTo(Dungeon::class);
    }

    public function enemyTypes(): BelongsToMany {
        return $this->belongsToMany(EnemyType::class, 'room_enemy_types');
    }

    public function uniqueEnemies(): HasMany {
        return $this->hasMany(UniqueEnemy::class);
    }

    public function getAllEnemies() {
        return [
            'enemy_types' => $this->enemyTypes,
            'unique_enemies' => $this->uniqueEnemies,
        ];
    }
}
