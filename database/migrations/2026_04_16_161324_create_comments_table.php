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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('article_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            // nested comment
            $table->foreignId('parent_id')->nullable()->constrained('comments')->nullOnDelete();

            $table->text('content');

            // moderation
            $table->enum('status', ['pending', 'approved', 'spam'])->default('pending');

            $table->timestamps();
            $table->softDeletes();

            $table->index(['article_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
