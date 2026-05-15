@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title ?? 'Tracker Tekanan Darah' }}</h3>
        <p class="text-muted" style="font-size:0.88rem;">
            Pantau tekanan darah selama kehamilan — deteksi dini risiko <strong>hipertensi & preeklampsia</strong>
            berdasarkan standar <strong>POGI 2023 & WHO</strong>.
        </p>

        {{-- ALERT: Tidak ada data HPL --}}
        <div id="alertNoHPL" style="display:none;">
            <div class="card p-4 mb-4 text-center">
                <div class="mb-2"><i class="bx bx-clipboard" style="font-size:2.5rem; color:#696cff;"></i></div>
                <h6 class="fw-bold mb-1">Data HPL belum tersedia</h6>
                <p class="text-muted mb-3" style="font-size:0.85rem;">
                    Lengkapi data di Kalkulator HPL terlebih dahulu agar tracker dapat membaca usia kehamilan Anda secara
                    otomatis.
                </p>
                <a href="/tools/hpl" class="btn btn-primary px-4">
                    <i class="bx bx-calculator me-1"></i> Buka Kalkulator HPL
                </a>
            </div>
        </div>

        {{-- MAIN CONTENT --}}
        <div id="mainContent" style="display:none;">

            {{-- ROW 1: Status + Ambang Batas + Form --}}
            <div class="row g-3 mb-3">

                {{-- Status TD Terakhir --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100 text-center" id="cardStatusTD">
                        <div class="mb-1">
                            <i class="bx bx-heart-circle" id="statusIcon" style="font-size:2.2rem; color:#696cff;"></i>
                        </div>
                        <div class="d-flex justify-content-center align-items-end gap-1 mb-1">
                            <span id="statusSistolik"
                                style="font-size:2.8rem; font-weight:700; color:#696cff; line-height:1;">—</span>
                            <span style="font-size:1.1rem; color:#aaa; margin-bottom:6px;">/</span>
                            <span id="statusDiastolik"
                                style="font-size:2rem; font-weight:600; color:#888; line-height:1; margin-bottom:4px;">—</span>
                            <span style="font-size:0.78rem; color:#aaa; margin-bottom:6px;">mmHg</span>
                        </div>
                        <div class="text-muted mb-2" style="font-size:0.78rem;">Pengukuran terakhir</div>
                        <div id="statusBadge" class="d-inline-block px-3 py-1 rounded-pill mb-2"
                            style="font-size:0.78rem; font-weight:600; background:#f0f0ff; color:#696cff;">
                            Belum ada data
                        </div>
                        <div class="text-muted" style="font-size:0.75rem;" id="statusSub">Tambahkan pengukuran pertama Anda
                        </div>

                        {{-- MAP --}}
                        <div class="mt-3 p-2 rounded" style="background:#f8f8ff; font-size:0.78rem;">
                            <span class="text-muted">Mean Arterial Pressure (MAP):</span>
                            <span class="fw-bold ms-1" id="statusMAP">—</span>
                        </div>
                    </div>
                </div>

                {{-- Ambang Batas Referensi --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <h6 class="fw-bold mb-3" style="font-size:0.85rem;">
                            <i class="bx bx-info-circle me-1 text-primary"></i> Ambang Batas Klinis
                        </h6>
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#e6f7f2;">
                                <div style="width:10px;height:10px;border-radius:50%;background:#0f6e56;flex-shrink:0;">
                                </div>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:600; color:#0f6e56;">Normal</div>
                                    <div style="font-size:0.72rem; color:#555;">&lt; 120 / &lt; 80 mmHg</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#fff8e1;">
                                <div style="width:10px;height:10px;border-radius:50%;background:#b8860b;flex-shrink:0;">
                                </div>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:600; color:#b8860b;">Prehipertensi</div>
                                    <div style="font-size:0.72rem; color:#555;">120–139 / 80–89 mmHg</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-2 p-2 rounded" style="background:#fdecea;">
                                <div style="width:10px;height:10px;border-radius:50%;background:#c0392b;flex-shrink:0;">
                                </div>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:600; color:#c0392b;">Hipertensi Gestasional
                                    </div>
                                    <div style="font-size:0.72rem; color:#555;">≥ 140 / ≥ 90 mmHg</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-2 p-2 rounded"
                                style="background:#fdecea; border:1.5px solid #e74c3c;">
                                <i class="bx bx-error" style="color:#c0392b; font-size:1rem; flex-shrink:0;"></i>
                                <div>
                                    <div style="font-size:0.78rem; font-weight:700; color:#c0392b;">Krisis Hipertensi 🚨
                                    </div>
                                    <div style="font-size:0.72rem; color:#555;">≥ 160 / ≥ 110 mmHg — rujuk segera</div>
                                </div>
                            </div>
                            <div class="mt-1 p-2 rounded" style="background:#f0f0ff; font-size:0.72rem; color:#555;">
                                <i class="bx bx-bulb me-1 text-primary"></i>
                                MAP ≥ 105 mmHg juga indikasi risiko preeklampsia
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Form Input --}}
                <div class="col-md-4">
                    <div class="card p-4 h-100">
                        <h6 class="fw-bold mb-3" style="font-size:0.85rem;">
                            <i class="bx bx-plus-circle me-1 text-primary"></i> Tambah Pengukuran
                        </h6>
                        <div class="mb-2">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Tanggal & Waktu</label>
                            <input type="datetime-local" id="inputWaktu" class="form-control form-control-sm">
                        </div>
                        <div class="mb-2">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Tekanan Darah</label>
                            <div class="row g-2">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <input type="number" id="inputSistolik" class="form-control" placeholder="Sistolik"
                                            min="60" max="250">
                                        <span class="input-group-text" style="font-size:0.72rem;">atas</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <input type="number" id="inputDiastolik" class="form-control"
                                            placeholder="Diastolik" min="40" max="150">
                                        <span class="input-group-text" style="font-size:0.72rem;">bawah</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-text" style="font-size:0.72rem;">Satuan: mmHg</div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Nadi (opsional)</label>
                            <div class="input-group input-group-sm">
                                <input type="number" id="inputNadi" class="form-control" placeholder="Contoh: 80"
                                    min="40" max="200">
                                <span class="input-group-text">bpm</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Posisi Pengukuran</label>
                            <select id="inputPosisi" class="form-select form-select-sm">
                                <option value="duduk">Duduk</option>
                                <option value="berbaring">Berbaring</option>
                                <option value="berdiri">Berdiri</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="font-size:0.8rem; font-weight:600;">Catatan
                                (opsional)</label>
                            <input type="text" id="inputCatatan" class="form-control form-control-sm"
                                placeholder="Contoh: setelah istirahat, pusing...">
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
                    <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                        <i class="bx bx-line-chart me-1 text-primary"></i> Grafik Tekanan Darah
                    </h6>
                    <div class="d-flex gap-2 align-items-center">
                        <span
                            style="width:12px;height:3px;background:#696cff;display:inline-block;border-radius:2px;"></span>
                        <span style="font-size:0.72rem;">Sistolik</span>
                        <span
                            style="width:12px;height:3px;background:#3aab8c;display:inline-block;border-radius:2px;"></span>
                        <span style="font-size:0.72rem;">Diastolik</span>
                        <span
                            style="width:12px;height:3px;background:#e74c3c;display:inline-block;border-radius:2px;border-top:2px dashed #e74c3c;"></span>
                        <span style="font-size:0.72rem;">Batas</span>
                    </div>
                </div>
                <div id="emptyGrafik" class="text-center py-4" style="display:none;">
                    <i class="bx bx-line-chart" style="font-size:2rem; color:#dee2e6;"></i>
                    <div class="text-muted mt-2" style="font-size:0.85rem;">Belum ada data pengukuran.</div>
                </div>
                <div style="position:relative; height:280px;" id="grafikWrap">
                    <canvas id="grafikTD"></canvas>
                </div>
            </div>

            {{-- ROW 3: Tabel Riwayat --}}
            <div class="card p-4 mb-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                        <i class="bx bx-table me-1 text-primary"></i> Riwayat Pengukuran
                    </h6>
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
                    <i class="bx bx-data" style="font-size:1.5rem; color:#dee2e6;"></i>
                    <div class="mt-1">Belum ada data pengukuran.</div>
                </div>
                <div id="tabelWrap" style="overflow-x:auto; display:none;">
                    <table class="table table-sm" style="font-size:0.82rem;">
                        <thead>
                            <tr style="font-size:0.78rem; color:#aaa;">
                                <th>Waktu</th>
                                <th>Minggu</th>
                                <th>Sistolik</th>
                                <th>Diastolik</th>
                                <th>MAP</th>
                                <th>Nadi</th>
                                <th>Posisi</th>
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



    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    @push('scripts')
        @vite('resources/js/tekanan-darah.js')
    @endpush
@endsection
