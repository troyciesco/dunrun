<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UniqueEnemy extends Model {
    use HasFactory;

    protected $fillable = [
        'enemy_type_id',
        'room_id',
        'name',
        'is_available',
        'runs_survived',
        'total_damage_dealt',
        'last_defeated_at',
        'base_type',
        'category'
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'last_defeated_at' => 'datetime'
    ];

    public function getTypeAttribute(): string {
        return $this->enemyType?->base_type ?? $this->base_type ?? 'unknown';
    }

    public function enemyType(): BelongsTo {
        return $this->belongsTo(EnemyType::class);
    }

    public function room(): BelongsTo {
        return $this->belongsTo(Room::class);
    }
}
