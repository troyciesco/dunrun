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

    public function enemies(): HasMany {
        return $this->hasMany(Enemy::class);
    }

    public function getLiveEnemies() {
        return $this->enemies()
            ->where('is_alive', true)
            ->get();
    }

    public function getUniqueEnemies() {
        return $this->enemies()
            ->where('is_unique', true)
            ->get();
    }

    public function getBaseEnemies() {
        return $this->enemies()
            ->where('tier', 'base')
            ->where('is_unique', false)
            ->get();
    }

    public function getMinorEnemies() {
        return $this->enemies()
            ->where('tier', 'minor')
            ->where('is_unique', false)
            ->get();
    }
}
