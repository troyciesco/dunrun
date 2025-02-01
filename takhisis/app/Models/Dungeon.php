<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dungeon extends Model {
    /** @use HasFactory<\Database\Factories\DungeonFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
    ];

    public function rooms(): HasMany {
        return $this->hasMany(Room::class);
    }
}
