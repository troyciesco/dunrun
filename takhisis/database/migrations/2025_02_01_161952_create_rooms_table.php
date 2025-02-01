<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dungeon_id')->constrained()->onDelete('cascade');
            $table->integer('number');
            $table->timestamps();

            $table->unique(['dungeon_id', 'number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('rooms');
    }
};
