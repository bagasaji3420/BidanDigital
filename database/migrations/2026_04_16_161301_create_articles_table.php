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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            // author
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->foreignId('editor_id')->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('publisher_id')->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // content
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->text('excerpt')->nullable();

            // media
            $table->string('featured_image')->nullable();

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            // publishing
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();


            $table->boolean('is_breaking')->default(false);
            $table->timestamp('breaking_until')->nullable();

            // engagement
            $table->unsignedBigInteger('views')->default(0);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'published_at']);
            $table->fullText(['title', 'content']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
