@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title ?? 'Skrining Kesehatan Mental Ibu' }}</h3>
        <p class="text-muted">
            Skrining kesehatan mental pasca persalinan berdasarkan standar <strong>Kemenkes RI & POGI</strong> —
            hasil skrining bukan diagnosis, selalu konsultasikan dengan tenaga kesehatan.
        </p>

        {{-- ══════════════════════════════════════════════════ --}}
        {{-- LANDING: Pilih Mode --}}
        {{-- ══════════════════════════════════════════════════ --}}
        <div id="boxLanding">

            {{-- Pilih Mode --}}
            <div class="row g-3 mb-4">
                <div class="col-12">
                    <div class="card p-4" style="border:2px solid #696cff; background:#f8f8ff;">
                        <div class="mb-2" style="font-size:2rem;">🔵</div>
                        <h6 class="fw-bold mb-1">EPDS — Depresi Postpartum</h6>
                        <p class="text-muted mb-2" style="font-size:0.82rem;">Edinburgh Postnatal Depression Scale, standar
                            baku internasional & Kemenkes</p>
                        <div class="d-flex gap-2 flex-wrap">
                            <span class="badge" style="background:#e8eaff;color:#3d3fcc;font-size:0.72rem;">10
                                pertanyaan</span>
                            <span class="badge" style="background:#e8eaff;color:#3d3fcc;font-size:0.72rem;">±3 menit</span>
                            <span class="badge" style="background:#e8eaff;color:#3d3fcc;font-size:0.72rem;">Tervalidasi
                                Indonesia</span>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Form Identitas --}}
            <div id="boxIdentitas" style="display:none;">
                <div class="card p-4 mb-4">
                    <h6 class="fw-bold mb-3" style="font-size:0.9rem;"><i class="bx bx-user me-1 text-primary"></i>
                        Identitas Pasien</h6>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Nama Lengkap</label>
                            <input type="text" id="inputNama" class="form-control form-control-sm"
                                placeholder="Nama pasien...">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Usia (tahun)</label>
                            <input type="number" id="inputUsia" class="form-control form-control-sm"
                                placeholder="Contoh: 28" min="15" max="60">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Tanggal Periksa</label>
                            <input type="date" id="inputTanggal" class="form-control form-control-sm">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Hari Ke- Pasca
                                Melahirkan</label>
                            <input type="number" id="inputHariPasca" class="form-control form-control-sm"
                                placeholder="Contoh: 14" min="1">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" style="font-size:0.82rem; font-weight:600;">Nama Pemeriksa
                                (Bidan/Dokter)</label>
                            <input type="text" id="inputPemeriksa" class="form-control form-control-sm"
                                placeholder="Nama bidan/dokter...">
                        </div>
                    </div>
                    <div class="mt-3 d-flex gap-2">
                        <button onclick="mulaiSkrining()" class="btn btn-primary px-4 py-2">
                            <i class="bx bx-play-circle me-2"></i> Mulai Skrining
                        </button>
                    </div>
                </div>
            </div>

        </div>

        {{-- ══════════════════════════════════════════════════ --}}
        {{-- QUIZ AREA --}}
        {{-- ══════════════════════════════════════════════════ --}}
        <div id="boxQuiz" style="display:none;">

            {{-- Mode badge --}}
            <div class="mb-3">
                <span id="modeBadge" class="badge px-3 py-2" style="font-size:0.78rem;"></span>
            </div>

            {{-- Progress --}}
            <div class="card p-3 mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span style="font-size:0.8rem;" class="text-muted fw-semibold" id="progressLabel"></span>
                    <span style="font-size:0.8rem;" class="text-muted">
                        Pertanyaan <span id="qNum">1</span> dari <span id="qTotal">10</span>
                    </span>
                </div>
                <div class="progress" style="height:6px; border-radius:4px;">
                    <div id="progressBar" class="progress-bar" style="width:0%; transition:width .4s;"></div>
                </div>
            </div>

            {{-- Pertanyaan --}}
            <div class="card p-4 mb-4" id="cardPertanyaan">
                <div class="mb-2 d-flex align-items-center gap-2">
                    <span id="qNumBadge"
                        style="font-size:0.72rem; background:#f0f0f0; color:#888; padding:2px 10px; border-radius:20px;"></span>
                    <span id="reverseTag"
                        style="display:none; font-size:0.7rem; background:#fff3cd; color:#856404; padding:2px 8px; border-radius:20px;">⚠
                        Reverse Scoring</span>
                    <span id="flagTag"
                        style="display:none; font-size:0.7rem; background:#fdecea; color:#c0392b; padding:2px 8px; border-radius:20px;">🚨
                        Pertanyaan Kritis</span>
                </div>
                <h6 class="fw-bold mb-4" id="qText" style="font-size:1rem; line-height:1.6;"></h6>
                <div id="qOptions" class="d-flex flex-column gap-2"></div>
            </div>

            {{-- Navigasi --}}
            <div class="d-flex justify-content-between align-items-center">
                <button onclick="prevQ()" class="btn btn-outline-secondary btn-sm" id="btnPrev">
                    <i class="bx bx-chevron-left me-1"></i> Sebelumnya
                </button>
                <button onclick="nextQ()" class="btn btn-primary btn-sm px-4" id="btnNext" disabled>
                    Selanjutnya <i class="bx bx-chevron-right ms-1"></i>
                </button>
            </div>
        </div>

        {{-- ══════════════════════════════════════════════════ --}}
        {{-- HASIL --}}
        {{-- ══════════════════════════════════════════════════ --}}
        <div id="boxHasil" style="display:none;">

            {{-- Score Card --}}
            <div class="card p-4 mb-4 text-center" id="scoreCard">
                <div id="hasilIcon" style="font-size:3rem;" class="mb-2"></div>
                <div id="modeLabelHasil" style="font-size:0.75rem; color:#888;" class="mb-1"></div>
                <h5 class="fw-bold mb-1" id="hasilJudul"></h5>
                <p class="text-muted mb-3" style="font-size:0.85rem;" id="hasilSub"></p>
                <div class="d-inline-block px-4 py-2 rounded-pill mb-3" id="hasilBadge"
                    style="font-size:0.85rem; font-weight:600;"></div>
                <div id="hasilSkor" style="font-size:0.8rem;" class="text-muted"></div>
                {{-- Flag soal 10 --}}
                <div id="flagSoal10" style="display:none;" class="mt-3 p-3 rounded" style="background:#fdecea;">
                    <span style="font-size:0.82rem; color:#c0392b; font-weight:600;">
                        🚨 Perhatian Khusus: Pasien mengindikasikan adanya pikiran menyakiti diri sendiri. Lakukan rujukan
                        segera.
                    </span>
                </div>
            </div>

            {{-- Detail Jawaban --}}
            <div class="card p-4 mb-4">
                <h6 class="mb-3" style="font-size:0.85rem;"><i class="bx bx-list-check me-1"></i> Detail Jawaban Per
                    Pertanyaan</h6>
                <div id="detailJawaban"></div>
            </div>

            {{-- Rekomendasi --}}
            <div class="card p-4 mb-4" id="cardRekomendasi">
                <h6 class="mb-3" style="font-size:0.85rem;"><i class="bx bx-notepad me-1 text-primary"></i> Rekomendasi
                    Klinis</h6>
                <div id="isiRekomendasi" style="font-size:0.85rem; line-height:2;"></div>
            </div>

            {{-- Aksi --}}
            <div class="d-flex gap-2 flex-wrap justify-content-center mb-5">
                <button onclick="bukaLaporan()" class="btn btn-danger">
                    <i class="bx bx-file me-1"></i> Laporan PDF
                </button>
                <button onclick="ulangSkrining()" class="btn btn-outline-secondary">
                    <i class="bx bx-reset me-1"></i> Skrining Ulang
                </button>
            </div>
        </div>

    </section>



    @push('scripts')
        @vite('resources/js/epds.js')
    @endpush
@endsection
