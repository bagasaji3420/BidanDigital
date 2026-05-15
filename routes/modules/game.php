<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use App\Models\NamaBayi;


Route::prefix('game')->name('game.')->group(function () {
    Route::get('/nama-generator',                  [GameController::class, 'nama'])->name('nama-generator');
    Route::get('/mitos-fakta',                  [GameController::class, 'mitos'])->name('mitos-fakta');
    Route::get('/piringku',                  [GameController::class, 'piringku'])->name('piringku');
    Route::get('/tas-siaga',                  [GameController::class, 'tasSiaga'])->name('tas-siaga');
});

Route::get('/api/nama-bayi', function () {
    $data = NamaBayi::select('nama', 'arti', 'suku', 'kategori', 'bahasa', 'gender')
        ->orderBy('suku', 'asc')
        ->orderBy('gender', 'asc')
        ->orderBy('nama', 'asc')
        ->get();

    return response()->json([
        'success' => true,
        'total'   => $data->count(),
        'data'    => $data,
    ]);
})->name('api.nama-bayi');
