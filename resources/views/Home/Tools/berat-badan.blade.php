@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title ?? 'Tracker Berat Badan' }}</h3>
        <p class="text-muted" style="font-size:0.88rem;">
            Pantau kenaikan berat badan selama kehamilan sesuai standar <strong>IOM & Kemenkes RI</strong> —
            data tersinkronisasi otomatis dengan Kalkulator HPL Anda.
        </p>

        {{-- ══════════════════════════════════════════════════ --}}
        {{-- ALERT: Tidak ada data HPL --}}
        {{-- ══════════════════════════════════════════════════ --}}
        <div id="alertNoHPL" style="display:none;">
            <div class="card p-4 mb-4 text-center">
                <div style="font-size:2.5rem;" class="mb-2">📋</div>
                <h6 class="fw-bold mb-1">Data HPL belum tersedia</h6>
                <p class="text-muted mb-3" style="font-size:0.85rem;">
                    Lengkapi data di Kalkulator HPL terlebih dahulu agar tracker dapat membaca BB awal dan standar kenaikan
                    BB Anda.
                </p>
                <a href="/tools/hpl" class="btn btn-primary px-4">
                    <i class="bx bx-calculator me-1"></i> Buka Kalkulator HPL
                </a>
            </div>
        </div>

        {{-- ══════════════════════════════════════════════════ --}}
        {{-- MAIN CONTENT --}}
        {{-- ══════════════════════════════════════════════════ --}}
        <div id="mainContent" style="display:none;">

            {{-- ROW 1: Ringkasan + Form Input --}}
            <div class="row g-3 mb-3">

                {{-- Ringkasan dari HPL --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <div
                                style="width:36px;height:36px;background:#ebebff;border-radius:8px;display:flex;align-items:center;justify-content:center;">
                                <i class="bx bx-user text-primary" style="font-size:1.1rem;"></i>
                            </div>
                            <span class="fw-semibold" style="font-size:0.85rem;">Data dari Kalkulator HPL</span>
                        </div>
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex justify-content-between align-items-center py-1"
                                style="border-bottom:1px solid #f0f0f0;">
                                <span class="text-muted" style="font-size:0.8rem;">Usia Kehamilan</span>
                                <span class="fw-semibold" style="font-size:0.85rem;" id="infoMinggu">—</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1"
                                style="border-bottom:1px solid #f0f0f0;">
                                <span class="text-muted" style="font-size:0.8rem;">BB Sebelum Hamil</span>
                                <span class="fw-semibold" style="font-size:0.85rem;" id="infoBBAwal">—</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1"
                                style="border-bottom:1px solid #f0f0f0;">
                                <span class="text-muted" style="font-size:0.8rem;">BB Awal Hamil</span>
                                <span class="fw-semibold" style="font-size:0.85rem;" id="infoBBAwalHamil">—</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1"
                                style="border-bottom:1px solid #f0f0f0;">
                                <span class="text-muted" style="font-size:0.8rem;">BMI Pra-Hamil</span>
                                <span class="fw-semibold" style="font-size:0.85rem;" id="infoBMI">—</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1"
                                style="border-bottom:1px solid #f0f0f0;">
                                <span class="text-muted" style="font-size:0.8rem;">Trimester</span>
                                <span id="infoBadgeTrimester" class="badge" style="font-size:0.75rem;">—</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1">
                                <span class="text-muted" style="font-size:0.8rem;">Target Kenaikan</span>
                                <span class="fw-semibold text-primary" style="font-size:0.85rem;" id="infoTarget">—</span>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Status BB Sekarang --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100 text-center" id="cardStatusBB">
                        <div style="font-size:2.2rem;" class="mb-2" id="statusIcon">⚖️</div>
                        <div style="font-size:2.5rem; font-weight:700; color:#696cff;" id="statusKenaikan">— kg</div>
                        <div class="text-muted mb-2" style="font-size:0.78rem;">Total kenaikan BB</div>
                        <div id="statusBadge" class="d-inline-block px-3 py-1 rounded-pill mb-2"
                            style="font-size:0.78rem; font-weight:600; background:#f0f0ff; color:#696cff;">
                            Belum ada data
                        </div>
                        <div class="text-muted" style="font-size:0.75rem;" id="statusSub">Tambahkan pengukuran pertama Anda
                        </div>
                        {{-- Progress bar --}}
                        <div class="mt-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span style="font-size:0.72rem; color:#aaa;">0 kg</span>
                                <span style="font-size:0.72rem; color:#aaa;" id="barMax">20 kg</span>
                            </div>
                            <div class="progress" style="height:8px; border-radius:6px;">
                                <div id="bbProgressBar" class="progress-bar"
                                    style="width:0%; background:#696cff; transition:width .5s;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Form Tambah Pengukuran --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <h6 class="fw-bold mb-3" style="font-size:0.85rem;"><i
                                class="bx bx-plus-circle me-1 text-primary"></i> Tambah Pengukuran</h6>
                        <div class="mb-3">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Tanggal Pengukuran</label>
                            <input type="date" id="inputTanggal" class="form-control form-control-sm">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Berat Badan (kg)</label>
                            <div class="input-group input-group-sm">
                                <input type="number" id="inputBB" class="form-control" placeholder="Contoh: 62.5"
                                    step="0.1" min="30" max="150">
                                <span class="input-group-text">kg</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Minggu Kehamilan</label>
                            <input type="number" id="inputMinggu" class="form-control form-control-sm"
                                placeholder="Otomatis dari HPL" min="1" max="42">
                            <div class="form-text" style="font-size:0.72rem;">Terisi otomatis, bisa diedit manual</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Catatan
                                (opsional)</label>
                            <input type="text" id="inputCatatan" class="form-control form-control-sm"
                                placeholder="Contoh: setelah makan, pagi hari...">
                        </div>
                        <button onclick="tambahPengukuran()" class="btn btn-primary w-100 btn-sm py-2">
                            <i class="bx bx-save me-1"></i> Simpan Pengukuran
                        </button>
                    </div>
                </div>
            </div>

            {{-- ROW 2: Grafik --}}
            <div class="card p-4 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="fw-bold mb-0" style="font-size:0.85rem;"><i
                            class="bx bx-line-chart me-1 text-primary"></i> Grafik Kenaikan Berat Badan</h6>
                    <div class="d-flex gap-2 align-items-center">
                        <span style="font-size:0.72rem;" class="text-muted">Standar:</span>
                        <span id="grafikStandarLabel"
                            style="font-size:0.72rem; background:#e8eaff; color:#3d3fcc; padding:2px 8px; border-radius:20px; font-weight:600;"></span>
                    </div>
                </div>
                <div id="emptyGrafik" class="text-center py-4" style="display:none;">
                    <div class="text-muted" style="font-size:0.85rem;">📈 Belum ada data pengukuran.<br>Tambahkan
                        pengukuran pertama Anda di atas.</div>
                </div>
                <div style="position:relative; height:280px;" id="grafikWrap">
                    <canvas id="grafikBB"></canvas>
                </div>
            </div>

            {{-- ROW 3: Tabel Riwayat --}}
            <div class="card p-4 mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="fw-bold mb-0" style="font-size:0.85rem;"><i class="bx bx-table me-1 text-primary"></i>
                        Riwayat Pengukuran</h6>
                    <div class="d-flex gap-2">
                        <button onclick="exportCSV()" class="btn btn-outline-secondary btn-sm"
                            style="font-size:0.75rem;">
                            <i class="bx bx-download me-1"></i> Export CSV
                        </button>
                        <button onclick="konfirmasiHapusSemua()" class="btn btn-outline-danger btn-sm"
                            style="font-size:0.75rem;">
                            <i class="bx bx-trash me-1"></i> Hapus Semua
                        </button>
                    </div>
                </div>
                <div id="emptyTable" class="text-center py-3 text-muted" style="font-size:0.85rem; display:none;">
                    Belum ada data pengukuran.
                </div>
                <div id="tabelWrap" style="overflow-x:auto;">
                    <table class="table table-sm" style="font-size:0.82rem;" id="tabelBB">
                        <thead>
                            <tr style="font-size:0.78rem; color:#aaa;">
                                <th>Tanggal</th>
                                <th>Minggu</th>
                                <th>BB (kg)</th>
                                <th>Kenaikan</th>
                                <th>Status</th>
                                <th>Catatan</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="tabelBody"></tbody>
                    </table>
                </div>
            </div>

        </div>
    </section>

    <style>
        
    </style>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    @push('scripts')
        @vite('resources/js/berat-badan.js')
    @endpush
@endsection
