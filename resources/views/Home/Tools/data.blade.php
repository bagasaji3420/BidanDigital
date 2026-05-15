@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- Header --}}
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div>
                <h4 class="fw-bold mb-1">
                    <i class="bx bx-data me-2 text-primary"></i>Data Tersimpan Saya
                </h4>
                <p class="text-muted mb-0" style="font-size:0.875rem;">
                    Semua data tools KIA Digital tersimpan di perangkat Anda (localStorage).
                    Data tidak dikirim ke server manapun.
                </p>
            </div>
            <button class="btn btn-danger" onclick="hapusSemuaData()">
                <i class="bx bx-trash me-1"></i> Hapus Semua Data
            </button>
        </div>

        {{-- Info Banner --}}
        <div class="alert alert-warning d-flex align-items-start gap-3 mb-4" role="alert" style="border-radius:12px;">
            <i class="bx bx-info-circle mt-1 flex-shrink-0" style="font-size:1.2rem;"></i>
            <div style="font-size:0.85rem;">
                <strong>Penting:</strong> Data hanya tersimpan di browser/perangkat ini. Jika cache browser dibersihkan
                atau berganti perangkat, data akan hilang. Gunakan fitur <strong>Export CSV/PDF</strong>
                di masing-masing tool untuk menyimpan data secara permanen.
            </div>
        </div>

        {{-- Storage Usage Bar --}}
        <div class="card shadow-sm mb-4" style="border-radius:16px;">
            <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                    <div class="d-flex align-items-center gap-2">
                        <span
                            class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary flex-shrink-0">
                            <i class="bx bx-hdd"></i>
                        </span>
                        <div>
                            <div class="fw-bold" style="font-size:0.9rem;">Penggunaan Storage</div>
                            <div class="text-muted" style="font-size:0.75rem;">Estimasi data yang tersimpan di browser ini
                            </div>
                        </div>
                    </div>
                    <div class="text-end">
                        <span class="fw-bold fs-5" id="storageSize">—</span>
                        <div class="text-muted" style="font-size:0.72rem;">dari ~5 MB batas localStorage</div>
                    </div>
                </div>
                <div class="progress mb-2" style="height:8px; border-radius:20px; background:#f0f0f0;">
                    <div id="storageBar" class="progress-bar bg-primary"
                        style="width:0%; border-radius:20px; transition:width 0.6s ease;"></div>
                </div>
                <div class="text-muted" style="font-size:0.72rem;" id="storageDesc">Menghitung...</div>
            </div>
        </div>

        {{-- ─── SEKSI: DATA IBU HAMIL ─────────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-heart me-1 text-danger"></i> Data Ibu Hamil
        </h6>
        <div class="row g-3 mb-4">

            {{-- Data Kehamilan --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-pregnancyData">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary flex-shrink-0"><i
                                        class="bx bx-calendar-heart"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Data Kehamilan</div>
                                    <div class="text-muted" style="font-size:0.72rem;">HPHT, HPL, BB, BMI</div>
                                </div>
                            </div>
                            <span id="badge-pregnancyData" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-pregnancyData" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.hpl') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusSatu('pregnancyData', 'Data Kehamilan', 'card-pregnancyData')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Tracker Berat Badan --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-kia_berat_badan">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-success flex-shrink-0"><i
                                        class="bx bx-stats"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Tracker Berat Badan</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Riwayat kenaikan BB ibu</div>
                                </div>
                            </div>
                            <span id="badge-kia_berat_badan" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-kia_berat_badan" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.berat-badan') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusSatu('kia_berat_badan', 'Tracker Berat Badan', 'card-kia_berat_badan')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Tracker Tekanan Darah --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-kia_tekanan_darah">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-danger flex-shrink-0"><i
                                        class="bx bx-heart-circle"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Tracker Tekanan Darah</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Riwayat pengukuran TD ibu</div>
                                </div>
                            </div>
                            <span id="badge-kia_tekanan_darah" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-kia_tekanan_darah" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.tekanan-darah') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button
                                onclick="hapusSatu('kia_tekanan_darah', 'Tracker Tekanan Darah', 'card-kia_tekanan_darah')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {{-- Tracker Anemia --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-anemiaData">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-warning flex-shrink-0">
                                    <i class="bx bx-pulse"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Tracker Anemia</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Tablet Fe & riwayat Hb</div>
                                </div>
                            </div>
                            <span id="badge-anemiaData" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-anemiaData" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.anemia') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusSatu('anemiaData', 'Tracker Anemia', 'card-anemiaData')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Kick Counter --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-kickHistori">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-warning flex-shrink-0"><i
                                        class="bx bx-walk"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Kick Counter</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Riwayat gerak janin harian</div>
                                </div>
                            </div>
                            <span id="badge-kickHistori" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-kickHistori" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.kick-counter') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusKick()" class="btn btn-sm btn-outline-danger"
                                style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Tracker Kontraksi (sesi only) --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-info flex-shrink-0"><i
                                        class="bx bx-pulse"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Tracker Kontraksi</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Tidak disimpan antar sesi</div>
                                </div>
                            </div>
                            <span class="badge bg-label-secondary" style="font-size:0.68rem;">Sesi only</span>
                        </div>
                        <div class="mb-3" style="font-size:0.8rem; color:#888; min-height:56px;">
                            <i class="bx bx-info-circle me-1"></i>Data kontraksi direset otomatis tiap sesi baru. Tidak ada
                            data yang disimpan permanen.
                        </div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.kontraksi') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Jadwal Nifas --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-nifasData">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary flex-shrink-0"><i
                                        class="bx bx-clipboard"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Jadwal Nifas</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Tanggal & jenis persalinan</div>
                                </div>
                            </div>
                            <span id="badge-nifasData" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-nifasData" class="mb-3" style="font-size:0.8rem; color:#555; min-height:56px;">
                        </div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.jadwal-nifas') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusSatu('nifasData', 'Jadwal Nifas', 'card-nifasData')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Checklist Persalinan --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-checklist_persalinan">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-success flex-shrink-0"><i
                                        class="bx bx-check-square"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Checklist Persalinan</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Status persiapan bersalin</div>
                                </div>
                            </div>
                            <span id="badge-checklist_persalinan" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-checklist_persalinan" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.checklist-persalinan') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button
                                onclick="hapusSatu('checklist_persalinan', 'Checklist Persalinan', 'card-checklist_persalinan')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>{{-- end row ibu hamil --}}

        {{-- ─── SEKSI: DATA BAYI & ANAK ───────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-child me-1 text-success"></i> Data Bayi & Anak
        </h6>
        <div class="row g-3 mb-4">

            {{-- Pertumbuhan Bayi + Imunisasi --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-kia_anak">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-success flex-shrink-0"><i
                                        class="bx bx-line-chart"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Pertumbuhan & Imunisasi</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Profil anak, BB/PB, vaksin</div>
                                </div>
                            </div>
                            <span id="badge-kia_anak" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-kia_anak" class="mb-3" style="font-size:0.8rem; color:#555; min-height:56px;">
                        </div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.pertumbuhan-bayi') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusSatu('kia_anak', 'Data Bayi & Imunisasi', 'card-kia_anak')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Tracker Menyusui --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-menyusui">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-info flex-shrink-0"><i
                                        class="bx bx-droplet"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Tracker Menyusui</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Riwayat sesi menyusui per anak
                                    </div>
                                </div>
                            </div>
                            <span id="badge-menyusui" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-menyusui" class="mb-3" style="font-size:0.8rem; color:#555; min-height:56px;">
                        </div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('tools.menyusui') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Buka Tool
                            </a>
                            <button onclick="hapusMenyusui()" class="btn btn-sm btn-outline-danger"
                                style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>{{-- end row bayi --}}

        {{-- ─── SEKSI: SKRINING ───────────────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-shield-quarter me-1 text-warning"></i> Skrining
        </h6>
        <div class="row g-3 mb-5">

            {{-- EPDS --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-warning flex-shrink-0"><i
                                        class="bx bx-brain"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Skrining EPDS & Baby Blues</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Tidak disimpan antar sesi</div>
                                </div>
                            </div>
                            <span class="badge bg-label-secondary" style="font-size:0.68rem;">Sesi only</span>
                        </div>
                        <div class="mb-3" style="font-size:0.8rem; color:#888; min-height:56px;">
                            <i class="bx bx-info-circle me-1"></i>Hasil skrining tidak disimpan di localStorage. Gunakan
                            fitur cetak/PDF dari halaman skrining.
                        </div>
                        <a href="{{ route('tools.epds') }}" class="btn btn-sm btn-outline-primary"
                            style="font-size:0.75rem;">
                            <i class="bx bx-link-external me-1"></i>Buka Tool
                        </a>
                    </div>
                </div>
            </div>

            {{-- Preeklampsia --}}
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-danger flex-shrink-0"><i
                                        class="bx bx-test-tube"></i></span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Skrining Preeklampsia</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Tidak disimpan antar sesi</div>
                                </div>
                            </div>
                            <span class="badge bg-label-secondary" style="font-size:0.68rem;">Sesi only</span>
                        </div>
                        <div class="mb-3" style="font-size:0.8rem; color:#888; min-height:56px;">
                            <i class="bx bx-info-circle me-1"></i>Hasil skrining tidak disimpan di localStorage. Gunakan
                            fitur cetak/PDF dari halaman skrining.
                        </div>
                        <a href="{{ route('tools.skrining-preeklampsia') }}" class="btn btn-sm btn-outline-primary"
                            style="font-size:0.75rem;">
                            <i class="bx bx-link-external me-1"></i>Buka Tool
                        </a>
                    </div>
                </div>
            </div>

        </div>{{-- end row skrining --}}


        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-shield-quarter me-1 text-warning"></i> Kesehatan Remaja
        </h6>
        {{-- Kalender Haid --}}
        <div class="col-12 col-md-6 col-xl-4">
            <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-haidData">
                <div class="card-body p-4">
                    <div class="d-flex align-items-start justify-content-between mb-3">
                        <div class="d-flex align-items-center gap-2">
                            <span
                                class="avatar d-flex align-items-center justify-content-center rounded bg-label-danger flex-shrink-0">
                                <i class="bx bx-calendar-heart"></i>
                            </span>
                            <div>
                                <div class="fw-bold" style="font-size:0.88rem;">Kalender Haid</div>
                                <div class="text-muted" style="font-size:0.72rem;">Siklus & prediksi menstruasi</div>
                            </div>
                        </div>
                        <span id="badge-haidData" class="badge bg-label-secondary" style="font-size:0.68rem;">—</span>
                    </div>
                    <div id="detail-haidData" class="mb-3" style="font-size:0.8rem; color:#555; min-height:56px;">
                    </div>
                    <div class="d-flex gap-2 flex-wrap">
                        <a href="{{ route('tools.kalender-haid') }}" class="btn btn-sm btn-outline-primary"
                            style="font-size:0.75rem;">
                            <i class="bx bx-link-external me-1"></i>Buka Tool
                        </a>
                        <button onclick="hapusSatu('haidData', 'Kalender Haid', 'card-haidData')"
                            class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                            <i class="bx bx-trash me-1"></i>Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {{-- ─── SEKSI: ARTIKEL ───────────────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-bookmark me-1 text-primary"></i> Artikel Tersimpan
        </h6>
        <div class="row g-3 mb-5">
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card shadow-sm h-100" style="border-radius:16px;" id="card-bidan_bookmarks">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary flex-shrink-0">
                                    <i class="bx bx-book-bookmark"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.88rem;">Bookmark Artikel</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Artikel yang disimpan</div>
                                </div>
                            </div>
                            <span id="badge-bidan_bookmarks" class="badge bg-label-secondary"
                                style="font-size:0.68rem;">—</span>
                        </div>
                        <div id="detail-bidan_bookmarks" class="mb-3"
                            style="font-size:0.8rem; color:#555; min-height:56px;"></div>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="{{ route('article.index') }}" class="btn btn-sm btn-outline-primary"
                                style="font-size:0.75rem;">
                                <i class="bx bx-link-external me-1"></i>Lihat Artikel
                            </a>
                            <button onclick="hapusSatu('bidan_bookmarks', 'Bookmark Artikel', 'card-bidan_bookmarks')"
                                class="btn btn-sm btn-outline-danger" style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section>

    @push('scripts')
        @vite('resources/js/data.js')
    @endpush
@endsection
