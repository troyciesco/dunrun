<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('enemies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('base_type')->nullable();  // goblin, skeleton, etc
            $table->enum('tier', ['base', 'minor', 'major']);
            $table->boolean('is_unique')->default(false);
            $table->integer('current_hp');
            $table->integer('max_hp');
            $table->boolean('is_alive')->default(true);
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        Schema::dropIfExists('room_enemy_types');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('enemies');
        Schema::create('room_enemy_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->foreignId('enemy_type_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }
};
