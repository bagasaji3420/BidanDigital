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
        Schema::create('indikator_kesehatan', function (Blueprint $table) {
            $table->id();
            $table->string('kode_wilayah', 10);
            $table->enum('indikator', ['aki', 'akb', 'stunting', 'imunisasi', 'hiv', 'tb']);
            $table->year('tahun');
            $table->decimal('nilai', 10, 2);
            $table->string('satuan', 50);
            $table->string('sumber', 50)->default('KEMENKES');
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->unique(['kode_wilayah', 'indikator', 'tahun'], 'uq_wilayah_indikator_tahun');
            $table->index('kode_wilayah');
            $table->index('indikator');
            $table->index('tahun');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indikator_kesehatans');
    }
};
