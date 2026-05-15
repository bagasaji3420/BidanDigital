<?php

use App\Http\Controllers\Article\ArticleController;
use App\Http\Controllers\Article\CategoryController;
use App\Http\Controllers\Article\CommentController;
use Illuminate\Support\Facades\Route;

Route::prefix('articles')->name('articles.')->group(function () {

    // ARTICLE CRUD
    Route::get('/', [ArticleController::class, 'index'])->name('index');
    Route::get('/create', [ArticleController::class, 'create'])->name('create');
    Route::post('/', [ArticleController::class, 'store'])->name('store');

    Route::get('/{article:slug}', [ArticleController::class, 'show'])->name('show');

    Route::get('/{article:slug}/edit', [ArticleController::class, 'edit'])->name('edit');
    Route::put('/{article:slug}', [ArticleController::class, 'update'])->name('update');
    Route::delete('/{article:slug}', [ArticleController::class, 'destroy'])->name('destroy');

    Route::post('/editor-upload', [ArticleController::class, 'editorUpload'])
        ->name('editor.upload');

    Route::get('/admin/articles/search', [ArticleController::class, 'search'])
        ->name('search');


    // COMMENT
    Route::post('/{article}/comments', [CommentController::class, 'store'])->name('comments.store');

    Route::delete('/comments/remove/{comment}', [CommentController::class, 'destroy'])
        ->name('comments.destroy');
});

// CATEGORY RESOURCE
Route::resource('categories', CategoryController::class);
