@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title ?? 'Grafik Pertumbuhan Bayi' }}</h3>
        <p class="text-muted" style="font-size:0.88rem;">
            Pantau pertumbuhan bayi menggunakan standar <strong>WHO Child Growth Standards</strong> —
            acuan resmi buku KIA Kemenkes RI.
        </p>

        {{-- MAIN CONTENT --}}
        <div id="mainContent">

            {{-- ROW 1: Daftar Anak + Info Anak + Referensi --}}
            <div class="row g-3 mb-3">

                {{-- Panel Kiri: Daftar Anak --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                                <i class="bx bx-user-circle me-1 text-primary"></i> Daftar Anak
                            </h6>
                            <button onclick="showModalTambahAnak()" class="btn btn-primary btn-sm"
                                style="font-size:0.75rem;">
                                <i class="bx bx-plus me-1"></i> Tambah Anak
                            </button>
                        </div>
                        <div id="listAnak">
                            <div class="text-center py-4 text-muted" style="font-size:0.85rem;">
                                <i class="bx bx-baby-carriage" style="font-size:2rem; color:#dee2e6;"></i>
                                <div class="mt-2">Belum ada data anak.</div>
                                <div style="font-size:0.78rem;">Klik "Tambah Anak" untuk mulai.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Panel Tengah: Info Anak Aktif --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100 text-center">
                        <div id="infoAnakEmpty" class="py-3">
                            <i class="bx bx-bar-chart-alt-2" style="font-size:2rem; color:#dee2e6;"></i>
                            <div class="text-muted mt-2" style="font-size:0.85rem;">Pilih atau tambahkan anak</div>
                        </div>
                        <div id="infoAnakDetail" style="display:none;">
                            <div class="mb-2">
                                <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                                    id="anakAvatar" style="width:52px;height:52px;background:#f0f0ff;font-size:1.4rem;">👶
                                </div>
                                <div class="fw-bold" id="infoNamaAnak" style="font-size:1rem;">—</div>
                                <div class="text-muted" id="infoTglLahir" style="font-size:0.78rem;">—</div>
                            </div>
                            <div class="d-flex justify-content-center gap-3 mb-3">
                                <div class="text-center">
                                    <div class="fw-bold" id="infoUmur" style="font-size:1.1rem; color:#696cff;">—</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Usia</div>
                                </div>
                                <div class="text-center">
                                    <div class="fw-bold" id="infoBBTerakhir" style="font-size:1.1rem; color:#3aab8c;">—
                                    </div>
                                    <div class="text-muted" style="font-size:0.72rem;">BB Terakhir</div>
                                </div>
                                <div class="text-center">
                                    <div class="fw-bold" id="infoPBTerakhir" style="font-size:1.1rem; color:#f39c12;">—
                                    </div>
                                    <div class="text-muted" style="font-size:0.72rem;">PB Terakhir</div>
                                </div>
                            </div>
                            <div class="row g-2 mb-3">
                                <div class="col-6">
                                    <div class="p-2 rounded" style="background:#f8f8ff; font-size:0.75rem;">
                                        <div class="text-muted" style="font-size:0.7rem;">Berat Lahir</div>
                                        <div class="fw-bold" id="infoBeratLahir">— g</div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="p-2 rounded" style="background:#f8f8ff; font-size:0.75rem;">
                                        <div class="text-muted" style="font-size:0.7rem;">Panjang Lahir</div>
                                        <div class="fw-bold" id="infoPanjangLahir">— cm</div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex gap-2 justify-content-center">
                                <button onclick="editAnak()" class="btn btn-outline-secondary btn-sm"
                                    style="font-size:0.72rem;">
                                    <i class="bx bx-edit me-1"></i> Edit
                                </button>
                                <button onclick="hapusAnak()" class="btn btn-outline-danger btn-sm"
                                    style="font-size:0.72rem;">
                                    <i class="bx bx-trash me-1"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Panel Kanan: Panduan --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <h6 class="fw-bold mb-3" style="font-size:0.85rem;">
                            <i class="bx bx-info-circle me-1 text-primary"></i> Interpretasi Kurva WHO
                        </h6>
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#e6f7f2;">
                                <div style="width:10px;height:10px;border-radius:50%;background:#0f6e56;flex-shrink:0;">
                                </div>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:600; color:#0f6e56;">Normal (P3–P97)</div>
                                    <div style="font-size:0.72rem; color:#555;">Pertumbuhan dalam rentang ideal</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#fdecea;">
                                <div style="width:10px;height:10px;border-radius:50%;background:#c0392b;flex-shrink:0;">
                                </div>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:600; color:#c0392b;">Kurang (&lt; P3)</div>
                                    <div style="font-size:0.72rem; color:#555;">Di bawah normal, konsultasi dokter</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#fff8e1;">
                                <div style="width:10px;height:10px;border-radius:50%;background:#b8860b;flex-shrink:0;">
                                </div>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:600; color:#b8860b;">Lebih (&gt; P97)</div>
                                    <div style="font-size:0.72rem; color:#555;">Di atas normal, konsultasi dokter</div>
                                </div>
                            </div>
                            <div class="mt-1 p-2 rounded" style="background:#f0f0ff; font-size:0.72rem; color:#555;">
                                <i class="bx bx-bulb me-1 text-primary"></i>
                                Tren naik konsisten = pertumbuhan baik. Ukur setiap bulan hingga usia 1 tahun.
                            </div>
                            <div class="mt-1 p-2 rounded" style="background:#fff3cd; font-size:0.72rem; color:#856404;">
                                <i class="bx bx-link me-1"></i>
                                Data anak di sini juga digunakan oleh <strong>Jadwal Imunisasi</strong>.
                            </div>
                        </div>
                    </div>
                </div>

            </div>{{-- END ROW 1 --}}

            {{-- ROW 2: Grafik --}}
            <div class="card p-4 mb-3" id="cardGrafik" style="display:none;">
                <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <div class="d-flex gap-2 align-items-center">
                        <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                            <i class="bx bx-line-chart me-1 text-primary"></i> Kurva Pertumbuhan —
                            <span id="grafikNamaAnak" class="text-primary"></span>
                        </h6>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="d-flex gap-1">
                            <button id="tabBBU" onclick="gantiChart('BBU')" class="btn btn-sm btn-primary"
                                style="font-size:0.75rem;">BB/U</button>
                            <button id="tabPBU" onclick="gantiChart('PBU')" class="btn btn-sm btn-outline-secondary"
                                style="font-size:0.75rem;">PB/U</button>
                            <button id="tabBBPB" onclick="gantiChart('BBPB')" class="btn btn-sm btn-outline-secondary"
                                style="font-size:0.75rem;">BB/PB</button>
                        </div>
                        <button onclick="bukaLaporanGrowth()" class="btn btn-sm btn-outline-primary"
                            style="font-size:0.75rem;">
                            <i class="bx bx-file me-1"></i> Laporan
                        </button>
                    </div>
                </div>
                <div id="chartGrowth" style="min-height:320px;"></div>
                <div class="mt-2 d-flex gap-3 flex-wrap" style="font-size:0.75rem; color:#888;">
                    <span>
                        <span
                            style="display:inline-block;width:20px;height:2px;background:#e74c3c;margin-bottom:2px;border-top:2px dashed #e74c3c;"></span>
                        P3/P97
                    </span>
                    <span>
                        <span
                            style="display:inline-block;width:20px;height:2px;background:#f39c12;margin-bottom:2px;border-top:2px dashed #f39c12;"></span>
                        P15/P85
                    </span>
                    <span>
                        <span
                            style="display:inline-block;width:20px;height:2px;background:#27ae60;margin-bottom:2px;"></span>
                        P50 (median)
                    </span>
                    <span>
                        <span
                            style="display:inline-block;width:20px;height:3px;background:#3498db;margin-bottom:2px;"></span>
                        Data bayi
                    </span>
                </div>
            </div>

            {{-- ROW 3: Input + Tabel Riwayat --}}
            <div class="row g-3 mb-5" id="cardInput" style="display:none;">

                {{-- Form Input --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <h6 class="fw-bold mb-3" style="font-size:0.85rem;">
                            <i class="bx bx-plus-circle me-1 text-primary"></i> Tambah Pengukuran
                        </h6>
                        <div class="mb-2">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Tanggal Ukur</label>
                            <input type="date" id="inputTglUkur" class="form-control form-control-sm">
                        </div>
                        <div class="mb-2">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Berat Badan (kg)</label>
                            <div class="input-group input-group-sm">
                                <input type="number" id="inputBB" class="form-control" step="0.1" min="0"
                                    max="30" placeholder="cth: 7.5">
                                <span class="input-group-text">kg</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Panjang/Tinggi Badan
                                (cm)</label>
                            <div class="input-group input-group-sm">
                                <input type="number" id="inputPB" class="form-control" step="0.1" min="0"
                                    max="130" placeholder="cth: 67.5">
                                <span class="input-group-text">cm</span>
                            </div>
                        </div>
                        <button onclick="tambahPengukuran()" class="btn btn-primary w-100 btn-sm py-2">
                            <i class="bx bx-save me-1"></i> Simpan Pengukuran
                        </button>

                        {{-- Status terakhir --}}
                        <div id="statusBox" class="mt-3 p-3 rounded" style="background:#f8f8ff; display:none;">
                            <div class="fw-bold mb-1" style="font-size:0.78rem;">Status Terakhir</div>
                            <div id="statusContent"></div>
                        </div>
                    </div>
                </div>

                {{-- Tabel Riwayat --}}
                <div class="col-md-8">
                    <div class="card p-4 h-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                                <i class="bx bx-table me-1 text-primary"></i> Riwayat Pengukuran
                            </h6>
                            <button onclick="hapusSemuaPengukuran()" class="btn btn-outline-danger btn-sm"
                                style="font-size:0.75rem;">
                                <i class="bx bx-trash me-1"></i> Hapus Semua
                            </button>
                        </div>
                        <div id="emptyPengukuran" class="text-center py-4 text-muted" style="font-size:0.85rem;">
                            <i class="bx bx-data" style="font-size:2rem; color:#dee2e6;"></i>
                            <div class="mt-2">Belum ada pengukuran.</div>
                        </div>
                        <div id="tabelWrap" style="overflow-x:auto; display:none;">
                            <table class="table table-sm" style="font-size:0.82rem;">
                                <thead>
                                    <tr style="font-size:0.78rem; color:#aaa;">
                                        <th>Tanggal</th>
                                        <th>Usia</th>
                                        <th>BB (kg)</th>
                                        <th>PB (cm)</th>
                                        <th>Status BB/U</th>
                                        <th>Status PB/U</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tabelBody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>{{-- END ROW 3 --}}

        </div>{{-- END mainContent --}}
    </section>

    {{-- MODAL: Tambah / Edit Anak --}}
    <div class="modal fade" id="modalAnak" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title fw-bold" id="modalAnakTitle">Tambah Data Anak</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editAnakId">
                    <div class="mb-3">
                        <label class="form-label" style="font-size:0.82rem; font-weight:600;">Nama Anak</label>
                        <input type="text" id="inputNamaAnak" class="form-control form-control-sm"
                            placeholder="Contoh: Bintang, Kembar A...">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" style="font-size:0.82rem; font-weight:600;">Tanggal Lahir</label>
                        <input type="date" id="inputTglLahir" class="form-control form-control-sm">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" style="font-size:0.82rem; font-weight:600;">Jenis Kelamin</label>
                        <select id="inputJK" class="form-select form-select-sm">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>
                    <div class="row g-2">
                        <div class="col-6">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Berat Lahir
                                (gram)</label>
                            <input type="number" id="inputBeratLahir" class="form-control form-control-sm"
                                placeholder="cth: 3200">
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Panjang Lahir
                                (cm)</label>
                            <input type="number" id="inputPanjangLahir" class="form-control form-control-sm"
                                step="0.1" placeholder="cth: 50.5">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                    <button type="button" onclick="simpanAnak()" class="btn btn-primary btn-sm">
                        <i class="bx bx-save me-1"></i> Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>

    <style>
        .anak-card {
            border: 1.5px solid #e9e9e9;
            border-radius: 10px;
            padding: 10px 14px;
            cursor: pointer;
            transition: all 0.15s;
            margin-bottom: 8px;
        }

        .anak-card:hover {
            border-color: #696cff;
            background: #f8f8ff;
        }

        .anak-card.active {
            border-color: #696cff;
            background: #f0f0ff;
        }
    </style>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    @push('scripts')
        @vite('resources/js/pertumbuhan-bayi.js')
    @endpush
@endsection
