<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('room_enemy_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->foreignId('enemy_type_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Remove the room_id from unique_enemies if it exists
        Schema::table('unique_enemies', function (Blueprint $table) {
            $table->dropConstrainedForeignId('room_id');
            // Add it back as a unique foreign key
            $table->foreignId('room_id')->nullable()->unique()->constrained()->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::dropIfExists('room_enemy_types');

        Schema::table('unique_enemies', function (Blueprint $table) {
            $table->dropConstrainedForeignId('room_id');
            // Add it back as a non-unique foreign key
            $table->foreignId('room_id')->nullable()->constrained()->onDelete('set null');
        });
    }
};
