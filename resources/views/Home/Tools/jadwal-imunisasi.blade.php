@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title ?? 'Jadwal Imunisasi Bayi' }}</h3>
        <p class="text-muted" style="font-size:0.88rem;">
            Pantau jadwal imunisasi bayi berdasarkan standar <strong>Kemenkes RI</strong> — imunisasi wajib & rekomendasi
            lengkap untuk tumbuh kembang optimal.
        </p>

        {{-- MAIN CONTENT --}}
        <div id="mainContent">

            {{-- EMPTY STATE: Belum ada data anak di grafik pertumbuhan --}}
            <div id="emptyState" style="display:none;">
                <div class="card p-5 text-center" style="border: 2px dashed #dee2e6; border-radius: 16px;">
                    <div style="font-size:3rem;">👶</div>
                    <h5 class="fw-bold mt-3 mb-2">Belum Ada Data Anak</h5>
                    <p class="text-muted mb-4" style="font-size:0.88rem; max-width:420px; margin:0 auto 1.5rem;">
                        Data anak untuk jadwal imunisasi diambil dari <strong>Grafik Pertumbuhan Bayi</strong>.
                        Tambahkan data anak di sana terlebih dahulu agar jadwal imunisasi dapat ditampilkan secara otomatis.
                    </p>
                    <div>
                        <a href="{{ url('/tools/pertumbuhan-bayi') }}" class="btn btn-primary px-4 py-2">
                            <i class="bx bx-line-chart me-2"></i> Ke Grafik Pertumbuhan Bayi
                        </a>
                    </div>
                    <div class="mt-3 p-3 rounded d-inline-block mx-auto"
                        style="background:#fff8e1; font-size:0.78rem; color:#856404; max-width:420px;">
                        <i class="bx bx-info-circle me-1"></i>
                        Data anak yang sudah ditambahkan di Grafik Pertumbuhan akan langsung muncul di sini secara otomatis.
                    </div>
                </div>
            </div>

            {{-- MAIN UI (tampil jika ada data) --}}
            <div id="mainUI" style="display:none;">

                {{-- ROW 1: Selector Anak + Info + Referensi --}}
                <div class="row g-3 mb-3">

                    {{-- Panel Kiri: Daftar Anak --}}
                    <div class="col-md-4">
                        <div class="card p-4 h-100">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                                    <i class="bx bx-user-circle me-1 text-primary"></i> Daftar Anak
                                </h6>
                                <a href="{{ url('/tools/pertumbuhan-bayi') }}" class="btn btn-outline-primary btn-sm"
                                    style="font-size:0.72rem;" title="Tambah/edit anak di Grafik Pertumbuhan">
                                    <i class="bx bx-link-external me-1"></i> Kelola Anak
                                </a>
                            </div>
                            <div id="listAnak"></div>
                            <div class="mt-2 p-2 rounded" style="background:#fff3cd; font-size:0.72rem; color:#856404;">
                                <i class="bx bx-link me-1"></i>
                                Data anak dikelola di <a href="{{ url('/tools/pertumbuhan-bayi') }}"
                                    style="color:#856404; font-weight:600;">Grafik Pertumbuhan</a>.
                            </div>
                        </div>
                    </div>

                    {{-- Panel Tengah: Info Anak Aktif --}}
                    <div class="col-md-4">
                        <div class="card p-4 h-100 text-center" id="cardInfoAnak">
                            <div id="infoAnakEmpty" class="py-3">
                                <i class="bx bx-info-circle" style="font-size:2rem; color:#dee2e6;"></i>
                                <div class="text-muted mt-2" style="font-size:0.85rem;">Pilih anak dari daftar</div>
                            </div>
                            <div id="infoAnakDetail" style="display:none;">
                                <div class="mb-2">
                                    <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                                        id="anakAvatar" style="width:52px;height:52px;background:#f0f0ff;font-size:1.4rem;">
                                        👶
                                    </div>
                                    <div class="fw-bold" id="infoNamaAnak" style="font-size:1rem;">—</div>
                                    <div class="text-muted" id="infoTglLahir" style="font-size:0.78rem;">—</div>
                                </div>
                                <div class="d-flex justify-content-center gap-3 mb-3">
                                    <div class="text-center">
                                        <div class="fw-bold" id="infoUmurAnak" style="font-size:1.3rem; color:#696cff;">—
                                        </div>
                                        <div class="text-muted" style="font-size:0.72rem;">Usia</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="fw-bold" id="infoSelesai" style="font-size:1.3rem; color:#3aab8c;">—
                                        </div>
                                        <div class="text-muted" style="font-size:0.72rem;">Selesai</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="fw-bold" id="infoTerlambat" style="font-size:1.3rem; color:#e74c3c;">—
                                        </div>
                                        <div class="text-muted" style="font-size:0.72rem;">Terlambat</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="fw-bold" id="infoUpcoming" style="font-size:1.3rem; color:#f5c518;">—
                                        </div>
                                        <div class="text-muted" style="font-size:0.72rem;">Upcoming</div>
                                    </div>
                                </div>
                                {{-- Progress bar --}}
                                <div class="mb-1" style="font-size:0.75rem; color:#888;">Progress Imunisasi Wajib</div>
                                <div class="progress mb-1" style="height:8px; border-radius:4px;">
                                    <div id="progressBar" class="progress-bar" role="progressbar"
                                        style="background:#696cff; width:0%; border-radius:4px;"></div>
                                </div>
                                <div style="font-size:0.72rem; color:#aaa;" id="progressLabel">0 / 0 vaksin</div>
                            </div>
                        </div>
                    </div>

                    {{-- Panel Kanan: Referensi --}}
                    <div class="col-md-4">
                        <div class="card p-4 h-100">
                            <h6 class="fw-bold mb-3" style="font-size:0.85rem;">
                                <i class="bx bx-info-circle me-1 text-primary"></i> Keterangan Status
                            </h6>
                            <div class="d-flex flex-column gap-2">
                                <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#e6f7f2;">
                                    <div
                                        style="width:10px;height:10px;border-radius:50%;background:#0f6e56;flex-shrink:0;">
                                    </div>
                                    <div>
                                        <div style="font-size:0.78rem; font-weight:600; color:#0f6e56;">✅ Selesai</div>
                                        <div style="font-size:0.72rem; color:#555;">Imunisasi sudah diberikan</div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#fdecea;">
                                    <div
                                        style="width:10px;height:10px;border-radius:50%;background:#c0392b;flex-shrink:0;">
                                    </div>
                                    <div>
                                        <div style="font-size:0.78rem; font-weight:600; color:#c0392b;">⚠️ Terlambat</div>
                                        <div style="font-size:0.72rem; color:#555;">Jadwal sudah lewat, segera ke
                                            posyandu</div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#fff8e1;">
                                    <div
                                        style="width:10px;height:10px;border-radius:50%;background:#b8860b;flex-shrink:0;">
                                    </div>
                                    <div>
                                        <div style="font-size:0.78rem; font-weight:600; color:#b8860b;">🕐 Upcoming</div>
                                        <div style="font-size:0.72rem; color:#555;">Jadwal dalam 30 hari ke depan</div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#f5f5f5;">
                                    <div style="width:10px;height:10px;border-radius:50%;background:#aaa;flex-shrink:0;">
                                    </div>
                                    <div>
                                        <div style="font-size:0.78rem; font-weight:600; color:#888;">— Belum Waktunya
                                        </div>
                                        <div style="font-size:0.72rem; color:#555;">Jadwal masih jauh</div>
                                    </div>
                                </div>
                                <div class="mt-1 p-2 rounded" style="background:#f0f0ff; font-size:0.72rem; color:#555;">
                                    <i class="bx bx-bulb me-1 text-primary"></i>
                                    Sumber: Jadwal Imunisasi Kemenkes RI 2023
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{{-- END ROW 1 --}}

                {{-- ROW 2: Timeline Imunisasi --}}
                <div class="card p-4 mb-3" id="cardTimeline" style="display:none;">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                            <i class="bx bx-calendar-check me-1 text-primary"></i> Timeline Imunisasi —
                            <span id="timelineNamaAnak" class="text-primary"></span>
                        </h6>
                        <div class="d-flex gap-2 align-items-center">
                            <span class="badge"
                                style="background:#f0f0ff; color:#696cff; font-size:0.72rem;">Wajib</span>
                            <span class="badge"
                                style="background:#fff3cd; color:#856404; font-size:0.72rem;">Rekomendasi</span>
                        </div>
                    </div>
                    <div id="timelineWrap" style="overflow-x:auto;">
                        <div id="timelineContent"></div>
                    </div>
                </div>

                {{-- ROW 3: Tabel Checklist --}}
                <div class="card p-4 mb-5" id="cardTabel" style="display:none;">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                            <i class="bx bx-list-check me-1 text-primary"></i> Checklist Detail —
                            <span id="tabelNamaAnak" class="text-primary"></span>
                        </h6>
                        <div class="d-flex gap-2">
                            <select id="filterStatus" onchange="renderTabel()" class="form-select form-select-sm"
                                style="font-size:0.75rem; width:auto;">
                                <option value="semua">Semua</option>
                                <option value="selesai">✅ Selesai</option>
                                <option value="terlambat">⚠️ Terlambat</option>
                                <option value="upcoming">🕐 Upcoming</option>
                                <option value="belum">— Belum Waktunya</option>
                            </select>
                            <button onclick="reviewPDF()" class="btn btn-outline-primary btn-sm"
                                style="font-size:0.75rem;">
                                <i class="bx bx-file me-1"></i> Export PDF
                            </button>
                        </div>
                    </div>

                    {{-- Filter Wajib/Rekomendasi --}}
                    <div class="d-flex gap-2 mb-3">
                        <button onclick="setFilterJenis('semua')" id="btnJenisSemua" class="btn btn-sm btn-primary"
                            style="font-size:0.75rem;">Semua</button>
                        <button onclick="setFilterJenis('wajib')" id="btnJenisWajib"
                            class="btn btn-sm btn-outline-secondary" style="font-size:0.75rem;">Wajib</button>
                        <button onclick="setFilterJenis('rekomendasi')" id="btnJenisRek"
                            class="btn btn-sm btn-outline-secondary" style="font-size:0.75rem;">Rekomendasi</button>
                    </div>

                    <div style="overflow-x:auto;">
                        <table class="table table-sm" style="font-size:0.82rem;">
                            <thead>
                                <tr style="font-size:0.78rem; color:#aaa;">
                                    <th>Vaksin</th>
                                    <th>Jenis</th>
                                    <th>Usia Ideal</th>
                                    <th>Jadwal</th>
                                    <th>Status</th>
                                    <th>Tgl Diberikan</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tabelBody"></tbody>
                        </table>
                    </div>
                </div>

            </div>{{-- END mainUI --}}

        </div>
    </section>

    {{-- MODAL: Review PDF --}}
    <div class="modal fade" id="modalReviewPDF" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title fw-bold">
                        <i class="bx bx-file me-1 text-danger"></i> Review Laporan Imunisasi
                    </h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="previewPDFContent" style="font-size:0.82rem;"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" onclick="downloadPDF()" class="btn btn-danger btn-sm">
                        <i class="bx bx-download me-1"></i> Download PDF
                    </button>
                </div>
            </div>
        </div>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
    @push('scripts')
        @vite('resources/js/imunisasi.js')
    @endpush
@endsection
