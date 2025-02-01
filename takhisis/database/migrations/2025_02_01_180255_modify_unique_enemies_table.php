<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('unique_enemies', function (Blueprint $table) {
            // Make enemy_type_id nullable
            $table->foreignId('enemy_type_id')->nullable()->change();

            // Add fields for standalone unique enemies
            $table->string('base_type')->nullable(); // For enemies not tied to a type
            $table->string('category')->nullable();  // 'undead', 'demon', 'deity', etc.
        });
    }

    public function down(): void {
        Schema::table('unique_enemies', function (Blueprint $table) {
            $table->foreignId('enemy_type_id')->change();
            $table->dropColumn(['base_type', 'category']);
        });
    }
};
