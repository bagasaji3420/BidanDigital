<?php

use App\Http\Controllers\WilayahController;
use Illuminate\Support\Facades\Route;

Route::prefix('wilayah')->group(function () {
    Route::get('/',        [WilayahController::class, 'index']);
    Route::get('/{kode}',  [WilayahController::class, 'show']);
});


