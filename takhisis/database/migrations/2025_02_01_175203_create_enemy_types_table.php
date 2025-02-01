<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('enemy_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('base_type');
            $table->enum('tier', ['base', 'minor']);
            $table->integer('available_count')->default(-1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('enemy_types');
    }
};
