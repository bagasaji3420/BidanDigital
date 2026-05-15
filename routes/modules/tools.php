<?php

use App\Http\Controllers\ToolsController;
use Illuminate\Support\Facades\Route;

Route::get('/app',                  [ToolsController::class, 'app'])->name('app');

Route::prefix('tools')->name('tools.')->group(function () {
    Route::get('/data-saya',                  [ToolsController::class, 'data'])->name('data');
    Route::get('/panduan-alat',                  [ToolsController::class, 'panduan'])->name('panduan');
    Route::get('/test-kesiapan', [ToolsController::class, 'testKesiapanSuami'])->name('test-kesiapan');
    Route::get('/hpl',                  [ToolsController::class, 'hpl'])->name('hpl');
    Route::get('/match-golongan-darah',  [ToolsController::class, 'goldar'])->name('goldar');
    Route::get('/tinggi-anak',  [ToolsController::class, 'prediksiTinggi'])->name('tinggi');
    Route::get('/kebutuhan-kalori',     [ToolsController::class, 'kebutuhanKalori'])->name('kebutuhan-kalori');
    Route::get('/kalender-haid', [ToolsController::class, 'kalenderHaid'])->name('kalender-haid');
    Route::get('/kick-counter',         [ToolsController::class, 'kickCounter'])->name('kick-counter');
    Route::get('/kontraksi',            [ToolsController::class, 'kontraksi'])->name('kontraksi');
    Route::get('/menyusui',             [ToolsController::class, 'menyusui'])->name('menyusui');
    Route::get('/tekanan-darah',             [ToolsController::class, 'tekananDarah'])->name('tekanan-darah');
    Route::get('/anemia',             [ToolsController::class, 'anemia'])->name('anemia');
    Route::get('/berat-badan',             [ToolsController::class, 'beratBadan'])->name('berat-badan');
    Route::get('/pertumbuhan-bayi',     [ToolsController::class, 'pertumbuhanBayi'])->name('pertumbuhan-bayi');
    Route::get('/skrining-preeklampsia', [ToolsController::class, 'skriningPreeklampsia'])->name('skrining-preeklampsia');
    Route::get('/epds',                 [ToolsController::class, 'epds'])->name('epds');
    Route::get('/jadwal-imunisasi',     [ToolsController::class, 'jadwalImunisasi'])->name('jadwal-imunisasi');
    Route::get('/jadwal-anc',           [ToolsController::class, 'jadwalAnc'])->name('jadwal-anc');
    Route::get('/jadwal-nifas',           [ToolsController::class, 'jadwalNifas'])->name('jadwal-nifas');
    Route::get('/checklist-persalinan', [ToolsController::class, 'checklistPersalinan'])->name('checklist-persalinan');
});
