<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Enemy extends Model {
  protected $fillable = [
    'room_id',
    'name',
    'base_type',
    'tier',
    'is_unique',
    'current_hp',
    'max_hp',
    'is_alive',
    'is_available'
  ];

  protected $casts = [
    'is_unique' => 'boolean',
    'is_alive' => 'boolean',
    'is_available' => 'boolean'
  ];

  public function room(): BelongsTo {
    return $this->belongsTo(Room::class);
  }

  // Scope for finding templates to spawn from
  public function scopeTemplate($query, string $baseType, string $tier) {
    return $query->where('base_type', $baseType)
      ->where('tier', $tier)
      ->whereNull('room_id')
      ->where('is_unique', false);
  }

  // Create a new instance from a template
  public function spawn(?Room $room = null): self {
    return self::create([
      'room_id' => $room?->id,
      'name' => $this->name,
      'base_type' => $this->base_type,
      'tier' => $this->tier,
      'is_unique' => false,
      'current_hp' => $this->max_hp,
      'max_hp' => $this->max_hp,
      'is_alive' => true,
      'is_available' => true,
    ]);
  }
}
