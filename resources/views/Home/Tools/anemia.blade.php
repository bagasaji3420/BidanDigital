@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- STATE: Setup Awal --}}
        <div id="stateSetup">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-lg-5">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <div
                                    class="avatar avatar-lg bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-droplet fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-0">Pantau Anemia & Tablet Fe</h5>
                                    <small class="text-muted">Setup awal — kapan mulai minum tablet Fe?</small>
                                </div>
                            </div>

                            {{-- Pilihan sumber tanggal --}}
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Tanggal Mulai Minum Tablet Fe</label>
                                <div class="d-flex flex-column gap-2">
                                    <div class="form-check border rounded p-3" id="optionHPL" style="cursor:pointer;">
                                        <input class="form-check-input" type="radio" name="sumberTanggal" id="radioHPL"
                                            value="hpl">
                                        <label class="form-check-label w-100" for="radioHPL" style="cursor:pointer;">
                                            <div class="fw-semibold">Ambil dari data HPL</div>
                                            <small class="text-muted">Otomatis dihitung dari HPHT + 56 hari (minggu
                                                ke-8)</small>
                                            <div id="previewHPL" class="mt-1"></div>
                                        </label>
                                    </div>
                                    <div class="form-check border rounded p-3" id="optionManual" style="cursor:pointer;">
                                        <input class="form-check-input" type="radio" name="sumberTanggal" id="radioManual"
                                            value="manual">
                                        <label class="form-check-label w-100" for="radioManual" style="cursor:pointer;">
                                            <div class="fw-semibold">Input manual</div>
                                            <small class="text-muted">Masukkan tanggal sendiri</small>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {{-- Date picker manual --}}
                            <div id="wrapManual" class="mb-4" style="display:none;">
                                <label class="form-label fw-semibold">Pilih Tanggal Mulai</label>
                                <input type="date" class="form-control" id="inputTanggalManual"
                                    max="{{ date('Y-m-d') }}">
                            </div>

                            <div id="alertNoHPL" class="alert alert-warning py-2" style="display:none;">
                                <i class="bx bx-info-circle me-1"></i>
                                Data HPL belum ada. <a href="/tools/hpl" class="alert-link">Hitung HPL dulu</a> atau pilih
                                input manual.
                            </div>

                            <button class="btn btn-primary w-100" onclick="simpanSetup()">
                                <i class="bx bx-save me-1"></i> Mulai Tracking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- STATE: Main Content --}}
        <div id="stateContent" style="display:none;">

            {{-- Header --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow-sm border-0">
                        <div class="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div
                                    class="avatar avatar-lg bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-droplet fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0 fw-bold">Pantau Anemia & Tablet Fe</h5>
                                    <small class="text-muted">Mulai: <span id="displayMulai">-</span></small>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap align-items-center gap-2">
                                <span class="badge bg-label-success fs-6 px-3 py-2">
                                    <i class="bx bx-capsule me-1"></i>
                                    <span id="displayFe">0</span> / 90 tablet
                                </span>
                                <span class="badge bg-label-warning fs-6 px-3 py-2">
                                    🔥 Streak <span id="displayStreak">0</span> hari
                                </span>
                                <button class="btn btn-sm btn-outline-secondary" onclick="resetSetup()">
                                    <i class="bx bx-reset me-1"></i> Reset
                                </button>
                            </div>
                        </div>
                        {{-- Progress Fe --}}
                        <div class="px-4 pb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small class="text-muted">Progress tablet Fe (target 90 tablet)</small>
                                <small class="text-muted"><span id="progressPct">0</span>%</small>
                            </div>
                            <div class="progress" style="height:8px;border-radius:10px;">
                                <div class="progress-bar bg-success" id="progressBarFe" style="width:0%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Tabs --}}
            <ul class="nav nav-pills mb-4 gap-2" id="anemiaTabs">
                <li class="nav-item">
                    <button class="nav-link active" onclick="switchTab('tracker')">
                        <i class="bx bx-calendar-check me-1"></i> Tracker Fe
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onclick="switchTab('catat')">
                        <i class="bx bx-test-tube me-1"></i> Catat Hb
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" onclick="switchTab('riwayat')">
                        <i class="bx bx-line-chart me-1"></i> Riwayat & Tren
                    </button>
                </li>
            </ul>

            {{-- TAB 1: Tracker Fe --}}
            <div id="tabTracker">
                {{-- Aksi hari ini --}}
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <div>
                                        <h6 class="fw-bold mb-1">Hari Ini</h6>
                                        <small class="text-muted" id="displayHariIni">-</small>
                                    </div>
                                    <div id="btnFeArea">
                                        {{-- dirender JS --}}
                                    </div>
                                </div>
                                <div id="streakInfo" class="mt-3"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Kalender Grid --}}
                <div class="row">
                    <div class="col-12">
                        <div class="card border-0 shadow-sm">
                            <div class="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                                <h6 class="fw-bold mb-0">Kalender Minum Tablet Fe</h6>
                                <div class="d-flex align-items-center gap-3" style="font-size:0.8rem;">
                                    <span><span class="badge bg-success me-1">&nbsp;</span>Minum</span>
                                    <span><span class="badge bg-danger me-1">&nbsp;</span>Skip</span>
                                    <span><span class="badge bg-label-secondary me-1">&nbsp;</span>Belum</span>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="kalenderGrid" class="d-flex flex-wrap gap-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- TAB 2: Catat Hb --}}
            <div id="tabCatat" style="display:none;">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-7">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h6 class="fw-bold mb-3">Catat Hasil Pemeriksaan Hb</h6>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Nilai Hb <span
                                            class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="inputHb"
                                            placeholder="cth: 10.5" step="0.1" min="1" max="20">
                                        <span class="input-group-text">g/dL</span>
                                    </div>
                                    <div id="hbPreview" class="mt-2"></div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Tanggal Periksa <span
                                            class="text-danger">*</span></label>
                                    <input type="date" class="form-control" id="inputTanggalHb"
                                        max="{{ date('Y-m-d') }}">
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Usia Kehamilan saat periksa</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="inputUsiaHb"
                                            placeholder="otomatis dari HPL" min="1" max="42">
                                        <span class="input-group-text">minggu</span>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="form-label fw-semibold">Gejala yang dirasakan</label>
                                    <div class="row g-2" id="gejalaCb">
                                        @php
                                            $gejala = [
                                                'Lemas / mudah lelah',
                                                'Pusing / kepala ringan',
                                                'Sesak napas',
                                                'Jantung berdebar',
                                                'Pucat (wajah/kuku/mata)',
                                                'Sulit konsentrasi',
                                            ];
                                        @endphp
                                        @foreach ($gejala as $g)
                                            <div class="col-6">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox"
                                                        value="{{ $g }}" id="gejala_{{ $loop->index }}">
                                                    <label class="form-check-label" for="gejala_{{ $loop->index }}"
                                                        style="font-size:0.875rem;">{{ $g }}</label>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>

                                <button class="btn btn-primary w-100" onclick="simpanHb()">
                                    <i class="bx bx-save me-1"></i> Simpan Hasil Hb
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- TAB 3: Riwayat & Tren --}}
            <div id="tabRiwayat" style="display:none;">

                {{-- Chart --}}
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card border-0 shadow-sm">
                            <div class="card-header border-0 pb-0">
                                <h6 class="fw-bold mb-0">Tren Hemoglobin (Hb)</h6>
                                <small class="text-muted">Garis merah = batas normal (11 g/dL)</small>
                            </div>
                            <div class="card-body">
                                <div id="chartHb" style="min-height:280px;"></div>
                                <div id="emptyChart" class="text-center py-5 text-muted" style="display:none;">
                                    <i class="bx bx-line-chart" style="font-size:3rem;opacity:0.3;"></i>
                                    <p class="mt-2">Belum ada data Hb. Catat hasil pemeriksaan dulu.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- List Riwayat --}}
                <div class="row">
                    <div class="col-12">
                        <div class="card border-0 shadow-sm">
                            <div class="card-header border-0 pb-0">
                                <h6 class="fw-bold mb-0">Riwayat Pemeriksaan</h6>
                            </div>
                            <div class="card-body p-0">
                                <div id="listRiwayat"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    {{-- ApexCharts --}}
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    @push('scripts')
        @vite('resources/js/anemia.js')
    @endpush
@endsection
