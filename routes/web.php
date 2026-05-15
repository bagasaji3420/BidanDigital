<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Home\Article;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\WilayahController;

// Homapage 
Route::redirect('/', '/');



Route::get('/', [Article::class, 'home'])->name('index');
Route::post('/chatbot/send', [ChatbotController::class, 'send'])->name('chatbot.send')->middleware('throttle:chatbot-daily');

Route::get('/articles', [Article::class, 'index'])->name('article.index');
Route::get('/articles/bookmark', [Article::class, 'bookmark'])->name('article.bookmark');
Route::get('/articles/{article:slug}', [Article::class, 'show'])->name('article.show');

Route::view('/login', 'Admin.login', [
    'title' => 'Login'
])->name('login');

Route::get('/peta-kesehatan', [WilayahController::class, 'petaWilayah'])->name('wilayah.peta');

require __DIR__ . '/modules/wilayah.php';
require __DIR__ . '/modules/game.php';
require __DIR__ . '/modules/tools.php';
require __DIR__ . '/modules/newslatter.php';

require __DIR__ . '/modules/auth.php';


Route::get('/privacy-policy', [HomeController::class, 'privacyPolicy'])->name('privacy.policy');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::post('/contact', [HomeController::class, 'sendContact'])->name('contact.send');

// Backend
Route::middleware(['auth', 'user.status'])->prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return view('Admin.dashboard', [
            'title' => 'Dashboard'
        ]);
    })->name('dashboard');

    require __DIR__ . '/modules/users.php';
    require __DIR__ . '/modules/roles.php';
    require __DIR__ . '/modules/audit.php';

    require __DIR__ . '/modules/article.php';
});
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');


Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
