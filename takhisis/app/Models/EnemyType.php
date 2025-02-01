<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EnemyType extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'base_type',
        'tier',
        'available_count'
    ];

    public function uniqueEnemies(): HasMany {
        return $this->hasMany(UniqueEnemy::class);
    }

    public function isAvailable(): bool {
        if ($this->available_count === -1) return true;

        $usedCount = $this->uniqueEnemies()
            ->where('is_available', false)
            ->count();

        return $usedCount < $this->available_count;
    }

    public function rooms(): BelongsToMany {
        return $this->belongsToMany(Room::class, 'room_enemy_types');
    }
}
