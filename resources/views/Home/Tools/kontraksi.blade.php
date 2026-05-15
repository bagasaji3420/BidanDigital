@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title }}</h3>
        <p class="text-muted">
            Pantau pola kontraksi persalinan menggunakan aturan <strong>5-1-1</strong> —
            panduan kapan harus segera ke fasilitas kesehatan.
        </p>

        <div class="row g-4">

            {{-- KIRI: Tombol + Timer + Status --}}
            <div class="col-lg-5">

                {{-- Tombol Utama --}}
                <div class="card p-4 mb-4 text-center">
                    <p class="text-muted mb-2" style="font-size:0.82rem;">Tekan tombol saat kontraksi dimulai atau selesai</p>

                    <button id="btnKontraksi" onclick="toggleKontraksi()" class="btn btn-danger w-100 py-4 mb-3"
                        style="font-size:1.5rem; font-weight:700; border-radius:16px; letter-spacing:0.5px;">
                        <i class="bx bx-radio-circle-marked me-2" style="font-size:1.6rem;vertical-align:middle;"></i>
                        MULAI KONTRAKSI
                    </button>

                    {{-- Timer --}}
                    <div id="timerBox" class="mb-3" style="display:none;">
                        <div class="text-muted mb-1" style="font-size:0.78rem;">Durasi kontraksi berlangsung</div>
                        <div id="timerDisplay"
                            style="font-size:3rem; font-weight:700; color:#d63031; letter-spacing:2px; font-variant-numeric:tabular-nums;">
                            00:00
                        </div>
                    </div>

                    {{-- Reset --}}
                    <button onclick="resetSesi()" class="btn btn-outline-secondary btn-sm">
                        <i class="bx bx-reset me-1"></i> Reset Sesi
                    </button>
                </div>

                {{-- Status 5-1-1 --}}
                <div class="card p-4 mb-4">
                    <h6 class="mb-3" style="font-size:0.85rem;">
                        <i class="bx bx-pulse me-1 text-danger"></i> Status Pola Kontraksi
                    </h6>
                    <div class="row g-2 text-center mb-3">
                        <div class="col-4">
                            <div class="p-2 rounded" style="background:#f8f9fa;">
                                <div id="statJumlah" style="font-size:1.5rem; font-weight:700; color:#495057;">0</div>
                                <div class="text-muted" style="font-size:0.72rem;">Kontraksi</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="p-2 rounded" style="background:#f8f9fa;">
                                <div id="statInterval" style="font-size:1.5rem; font-weight:700; color:#495057;">--</div>
                                <div class="text-muted" style="font-size:0.72rem;">Interval (mnt)</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="p-2 rounded" style="background:#f8f9fa;">
                                <div id="statDurasi" style="font-size:1.5rem; font-weight:700; color:#495057;">--</div>
                                <div class="text-muted" style="font-size:0.72rem;">Durasi (dtk)</div>
                            </div>
                        </div>
                    </div>

                    {{-- Progress 5-1-1 --}}
                    <div style="font-size:0.78rem; color:#888; margin-bottom:6px;">Progress menuju 5-1-1</div>
                    <div class="mb-2">
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.75rem;">
                            <span>Interval ≤ 5 menit</span>
                            <span id="labelInterval" class="text-muted">--</span>
                        </div>
                        <div class="progress" style="height:6px; border-radius:4px;">
                            <div id="progInterval" class="progress-bar bg-danger" style="width:0%;transition:width .4s;">
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.75rem;">
                            <span>Durasi ≥ 40 - 60 detik</span>
                            <span id="labelDurasi" class="text-muted">--</span>
                        </div>
                        <div class="progress" style="height:6px; border-radius:4px;">
                            <div id="progDurasi" class="progress-bar bg-warning" style="width:0%;transition:width .4s;">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.75rem;">
                            <span>Berlangsung ≥ 1 jam</span>
                            <span id="labelDurSesi" class="text-muted">--</span>
                        </div>
                        <div class="progress" style="height:6px; border-radius:4px;">
                            <div id="progSesi" class="progress-bar bg-primary" style="width:0%;transition:width .4s;">
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Panduan --}}
                <div class="card p-3" style="background:#fff8f0; border-color:#fde8c8;">
                    <h6 class="mb-2" style="font-size:0.85rem;">
                        <i class="bx bx-book-open me-1 text-warning"></i> Aturan 5-1-1
                    </h6>
                    <ul class="mb-0 ps-3" style="font-size:0.78rem; color:#6b5c4e; line-height:2;">
                        <li>Kontraksi tiap <strong>5 menit</strong> sekali</li>
                        <li>Berlangsung <strong>1 menit</strong> tiap kontraksi</li>
                        <li>Terjadi selama <strong>1 jam</strong> berturut-turut</li>
                        <li>→ Segera ke fasilitas kesehatan!</li>
                    </ul>
                </div>

            </div>

            {{-- KANAN: Riwayat --}}
            <div class="col-lg-7">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="mb-0" style="font-size:0.85rem;">
                            <i class="bx bx-list-ul me-1"></i> Riwayat Kontraksi Sesi Ini
                        </h6>
                        <span id="badgeSesi" class="badge bg-secondary" style="font-size:0.72rem;">Belum mulai</span>
                    </div>

                    <div id="riwayatKosong" class="text-center text-muted py-5">
                        <i class="bx bx-time-five" style="font-size:2.5rem; opacity:0.3;"></i>
                        <p class="mt-2 mb-0" style="font-size:0.82rem;">Belum ada kontraksi tercatat</p>
                        <p style="font-size:0.78rem; opacity:0.7;">Tekan tombol saat kontraksi dimulai</p>
                    </div>

                    <div class="table-responsive" id="tableWrapper" style="display:none;">
                        <table class="table table-sm align-middle mb-0" style="font-size:0.8rem;">
                            <thead class="table-light">
                                <tr>
                                    <th style="width:30px;">#</th>
                                    <th>Waktu Mulai</th>
                                    <th>Durasi</th>
                                    <th>Interval</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </section>

    @push('scripts')
        @vite('resources/js/kontraksi.js')
    @endpush
@endsection
