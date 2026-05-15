<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nama_bayis', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('arti');
            $table->string('suku');
            $table->string('kategori');
            $table->string('bahasa');
            $table->enum('gender', ['laki', 'perempuan']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nama_bayis');
    }
};
