@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title }}</h3>
        <p class="text-muted">
            Hitung gerakan janin harian menggunakan metode <strong>Cardiff Count to Ten</strong> —
            standar buku KIA Kemenkes RI. Target 10 gerakan dalam 12 jam.
        </p>

        {{-- INPUT HPHT (tampil kalau belum ada data) --}}
        <div id="hphtBox" class="card p-4 mb-4 d-none">
            <div class="text-center py-2">
                <i class="bx bx-calculator" style="font-size:2rem; color:var(--bs-primary);"></i>
                <h6 class="mt-2 mb-1">Data kehamilan belum tersedia</h6>
                <p class="text-muted mb-3" style="font-size:0.85rem;">
                    Hitung usia kehamilan & HPL terlebih dahulu agar Kick Tracker bisa berjalan otomatis.
                </p>
                <a href="/tools/hpl" class="btn btn-primary">
                    <i class="bx bx-calendar-heart me-1"></i> Hitung HPL Sekarang
                </a>
            </div>
        </div>

        {{-- INFO KEHAMILAN --}}
        <div id="infoKehamilan" class="card p-3 mb-4 d-none">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted" style="font-size:0.82rem;">Usia Kehamilan</span>
                    <div><strong id="infoMinggu">-</strong> <span class="text-muted" style="font-size:0.82rem;"
                            id="infoTrimester"></span></div>
                </div>
                <div class="text-end">
                    <span class="text-muted" style="font-size:0.82rem;">HPHT</span>
                    <div><strong id="infoHPHT">-</strong></div>
                </div>
            </div>
            <div id="warningMinggu" class="alert alert-warning mt-2 mb-0 p-2 d-none" style="font-size:0.82rem;">
                <i class="bx bx-info-circle me-1"></i>
                Penghitungan gerak janin direkomendasikan mulai minggu ke-28. Kamu tetap bisa mencatat, namun hasilnya belum
                jadi acuan klinis.
            </div>
        </div>

        <div class="row g-4">

            {{-- SESI HARI INI --}}
            <div class="col-md-7">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">Sesi Hari Ini</h5>
                        <span id="tanggalSesi" class="text-muted" style="font-size:0.82rem;"></span>
                    </div>

                    {{-- Progress kicks --}}
                    <div class="text-center mb-4">
                        <div id="kickCount"
                            style="font-size: 4rem; font-weight: 700; line-height:1; color: var(--bs-primary);">0</div>
                        <div class="text-muted" style="font-size:0.85rem;">gerakan tercatat · target <strong>10</strong>
                        </div>

                        {{-- Dot indicator --}}
                        <div class="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                            @for ($i = 1; $i <= 10; $i++)
                                <div class="kick-dot" id="dot-{{ $i }}"></div>
                            @endfor
                        </div>
                    </div>

                    {{-- Timer --}}
                    <div class="text-center mb-4">
                        <div class="text-muted" style="font-size:0.78rem;">Waktu berjalan</div>
                        <div id="timerDisplay"
                            style="font-size:1.4rem; font-weight:600; font-variant-numeric: tabular-nums;">00:00:00</div>
                        <div id="mulaiJam" class="text-muted" style="font-size:0.78rem;"></div>
                    </div>

                    {{-- Tombol --}}
                    <button id="btnKick" onclick="recordKick()" class="btn btn-primary btn-lg w-100 mb-2"
                        style="height:64px; font-size:1.1rem;" disabled>
                        <i class="bx bx-heart-circle me-2"></i> Rasakan Gerakan
                    </button>

                    <div class="d-flex gap-2">
                        <button id="btnUndo" onclick="undoKick()" class="btn btn-outline-secondary flex-fill" disabled>
                            <i class="bx bx-undo me-1"></i> Batal Terakhir
                        </button>
                        <button id="btnReset" onclick="resetSesi()" class="btn btn-outline-danger flex-fill" disabled>
                            <i class="bx bx-refresh me-1"></i> Reset Sesi
                        </button>
                    </div>

                    {{-- Status selesai --}}
                    <div id="statusSelesai" class="alert mt-3 mb-0 d-none"></div>
                </div>
            </div>

            {{-- HISTORI --}}
            <div class="col-md-5">
                <div class="card p-4">
                    <h5 class="mb-3">Riwayat 7 Hari</h5>
                    <button onclick="bukaLaporanKIA()" class="btn btn-sm btn-outline-primary w-100 mb-3">
                        <i class="bx bx-file me-1"></i> Cetak Laporan KIA
                    </button>
                    <button onclick="clearDataKick()" class="btn btn-sm btn-outline-danger w-100 mb-3">
                        <i class="bx bx-trash me-1"></i> Hapus Semua Data
                    </button>
                    <div id="historiList">
                        <div class="text-center text-muted py-4" style="font-size:0.85rem;">
                            <i class="bx bx-time-five" style="font-size:2rem;"></i>
                            <p class="mt-2 mb-0">Belum ada riwayat</p>
                        </div>
                    </div>
                </div>

                <div class="card p-3 mt-3" style="background:#fff8f0; border-color:#fde8c8;">
                    <h6 class="mb-2" style="font-size:0.85rem;"><i class="bx bx-book-open me-1 text-warning"></i> Panduan
                        Cardiff Count to Ten</h6>
                    <ul class="mb-0 ps-3" style="font-size:0.78rem; color:#6b5c4e; line-height:1.8;">
                        <li>Mulai hitung dari pagi di jam yang sama setiap hari</li>
                        <li>Catat setiap gerakan: tendangan, geliat, atau pukulan</li>
                        <li>Target <strong>10 gerakan</strong> dalam waktu <strong>12 jam</strong></li>
                        <li>Lakukan mulai usia kehamilan <strong>28 minggu</strong></li>
                        <li>Jika 10 gerakan belum tercapai dalam 12 jam, segera hubungi bidan atau dokter</li>
                    </ul>
                </div>
            </div>

        </div>
    </section>


    <div class="modal fade" id="modalLaporanKIA" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <h6 class="modal-title mb-0">
                        <i class="bx bx-file me-1 text-danger"></i> Preview Laporan Gerak Janin — KIA Digital
                    </h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-3 pt-2">
                    <div id="kiaReportContent" style="padding-top:0;">
                        <div
                            style="text-align:center; margin-bottom:20px; border-bottom:2px solid #3aab8c; padding-bottom:14px;">
                            <div style="font-size:0.7rem; color:#888; text-transform:uppercase; letter-spacing:.08em;">
                                Kartu Ibu & Anak Digital — Kemenkes RI</div>
                            <div style="font-size:1.2rem; font-weight:700;">Laporan Pemantauan Gerak Janin</div>
                            <div style="font-size:0.78rem; color:#555; margin-top:4px;" id="kiaSubtitle"></div>
                        </div>
                        <div id="kiaInfoIbu"
                            style="font-size:0.8rem; color:#444; margin-bottom:16px; display:flex; gap:24px;"></div>
                        <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                            <thead>
                                <tr style="background:#3aab8c; color:#fff;">
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:left;">Tanggal</th>
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:center;">Minggu</th>
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:center;">Jam Mulai
                                    </th>
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:center;">Jam ke-10
                                    </th>
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:center;">Durasi</th>
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:center;">Kick</th>
                                    <th style="padding:8px 10px; border:1px solid #2e9278; text-align:center;">Status</th>
                                </tr>
                            </thead>
                            <tbody id="kiaTableBody"></tbody>
                        </table>
                        <div
                            style="margin-top:20px; font-size:0.72rem; color:#888; border-top:1px solid #eee; padding-top:10px;">
                            Dicetak dari aplikasi KIA Digital · Metode Cardiff Count to Ten · Target 10 gerakan / 12 jam
                        </div>
                    </div>
                </div>
                <div class="modal-footer py-2">
                    <button class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Tutup</button>
                    <button class="btn btn-danger btn-sm" onclick="downloadKIAPdf()">
                        <i class="bx bx-download me-1"></i> Download PDF
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>


    @push('scripts')
        @vite('resources/js/kick-tracker.js')
    @endpush
@endsection
