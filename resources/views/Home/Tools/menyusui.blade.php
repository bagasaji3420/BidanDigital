@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title }}</h3>
        <p class="text-muted">
            Catat sesi menyusui harian sesuai standar <strong>ASI Eksklusif Kemenkes RI</strong> —
            target <strong>8–12 kali</strong> per hari, durasi <strong>20–30 menit</strong> per sesi.
        </p>

        {{-- PILIH ANAK --}}
        <div id="boxPilihAnak" class="mb-4"></div>

        {{-- ALERT JEDA --}}
        <div id="alertJeda" class="alert alert-warning d-none mb-4 p-2" style="font-size:0.82rem;">
            <i class="bx bx-alarm me-1"></i>
            <span id="alertJedaText"></span>
        </div>

        <div class="row g-4" id="boxUtama" style="display:none;">

            {{-- SESI AKTIF --}}
            <div class="col-md-7">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">Sesi Hari Ini</h5>
                        <span id="tanggalSesi" class="text-muted" style="font-size:0.82rem;"></span>
                    </div>

                    {{-- Pilih payudara --}}
                    <div class="mb-4">
                        <div class="text-muted mb-2" style="font-size:0.8rem;">Payudara</div>
                        <div class="d-flex gap-2">
                            <button id="btnKiri" onclick="pilihPayudara('kiri')"
                                class="btn btn-outline-primary flex-fill">
                                ◀ Kiri
                            </button>
                            <button id="btnDua" onclick="pilihPayudara('dua')" class="btn btn-outline-primary flex-fill">
                                ⬤ Keduanya
                            </button>
                            <button id="btnKanan" onclick="pilihPayudara('kanan')"
                                class="btn btn-outline-primary flex-fill">
                                Kanan ▶
                            </button>
                        </div>
                    </div>

                    {{-- Counter & Timer --}}
                    <div class="text-center mb-4">
                        <div id="sesiCount"
                            style="font-size:4rem; font-weight:700; line-height:1; color:var(--bs-primary);">0</div>
                        <div class="text-muted" style="font-size:0.85rem;">sesi hari ini · target <strong>8–12x</strong>
                        </div>

                        <div class="mt-3">
                            <div class="text-muted" style="font-size:0.78rem;">Durasi sesi ini</div>
                            <div id="timerDisplay"
                                style="font-size:1.4rem; font-weight:600; font-variant-numeric:tabular-nums;">00:00</div>
                            <div id="mulaiJam" class="text-muted" style="font-size:0.78rem;"></div>
                        </div>
                    </div>

                    {{-- Tombol utama --}}
                    <button id="btnMulai" onclick="toggleSesi()" class="btn btn-primary btn-lg w-100 mb-2"
                        style="height:64px; font-size:1.1rem;">
                        <i class="bx bx-play-circle me-2"></i> Mulai Menyusui
                    </button>

                    <div class="d-flex gap-2">
                        <button id="btnBatalSesi" onclick="batalSesiAktif()" class="btn btn-outline-secondary flex-fill"
                            disabled>
                            <i class="bx bx-undo me-1"></i> Batal Sesi Ini
                        </button>
                        <button onclick="clearDataMenyusui()" class="btn btn-outline-danger flex-fill">
                            <i class="bx bx-trash me-1"></i> Hapus Semua Data
                        </button>
                    </div>

                    {{-- Status harian --}}
                    <div id="statusHarian" class="alert mt-3 mb-0 d-none"></div>
                </div>
            </div>

            {{-- RIWAYAT --}}
            <div class="col-md-5">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">Sesi Hari Ini</h5>
                        <button onclick="bukaLaporanMenyusui()" class="btn btn-sm btn-outline-primary">
                            <i class="bx bx-file me-1"></i> Laporan PDF
                        </button>
                    </div>
                    <div id="sesiHariIniList">
                        <div class="text-center text-muted py-4" style="font-size:0.85rem;">
                            <i class="bx bx-droplet" style="font-size:2rem;"></i>
                            <p class="mt-2 mb-0">Belum ada sesi hari ini</p>
                        </div>
                    </div>
                </div>

                <div class="card p-3 mt-3" style="background:#fff8f0; border-color:#fde8c8;">
                    <h6 class="mb-2" style="font-size:0.85rem;"><i class="bx bx-book-open me-1 text-warning"></i> Panduan
                        Menyusui — Kemenkes RI</h6>
                    <ul class="mb-0 ps-3" style="font-size:0.78rem; color:#6b5c4e; line-height:1.8;">
                        <li>Susui <strong>8–12 kali</strong> per hari atau setiap bayi meminta</li>
                        <li>Durasi normal <strong>20–30 menit</strong> untuk dua sisi payudara</li>
                        <li>Bangunkan bayi jika tidur lebih dari <strong>3 jam</strong></li>
                        <li>Bergantian payudara setiap sesi</li>
                        <li>ASI eksklusif hingga bayi usia <strong>6 bulan</strong></li>
                    </ul>
                </div>
            </div>

        </div>
    </section>

    @push('scripts')
        @vite('resources/js/menyusui.js')
    @endpush

@endsection
