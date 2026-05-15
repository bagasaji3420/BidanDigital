@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title }}</h3>
        <p class="text-muted">
            Skrining faktor risiko preeklampsia berdasarkan panduan <strong>POGI 2023 & WHO</strong> —
            hasil skrining bukan diagnosis, selalu konsultasikan dengan tenaga kesehatan.
        </p>

        {{-- LANDING / MULAI --}}
        <div id="boxLanding" class="card p-4 mb-4 text-center">
            <div class="mb-3" style="font-size:2.5rem;">🩺</div>
            <h5 class="fw-bold mb-2">Skrining Preeklampsia</h5>
            <p class="text-muted mb-1" style="font-size:0.88rem;">24 pertanyaan · 5 section · ±5 menit</p>
            <p class="text-muted mb-4" style="font-size:0.82rem;">
                Jawab setiap pertanyaan dengan jujur sesuai kondisi Anda.<br>
                Data tidak disimpan dan akan hilang saat halaman di-refresh.
            </p>
            <button onclick="mulaiSkrining()" class="btn btn-primary px-5 py-2">
                <i class="bx bx-play-circle me-2"></i> Mulai Skrining
            </button>
        </div>

        {{-- QUIZ AREA --}}
        <div id="boxQuiz" style="display:none;">

            {{-- Progress --}}
            <div class="card p-3 mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span style="font-size:0.8rem;" class="text-muted">
                        <span id="sectionLabel" class="fw-semibold text-primary"></span>
                    </span>
                    <span style="font-size:0.8rem;" class="text-muted">
                        Pertanyaan <span id="qNum">1</span> dari <span id="qTotal">24</span>
                    </span>
                </div>
                <div class="progress" style="height:6px; border-radius:4px;">
                    <div id="progressBar" class="progress-bar bg-primary" style="width:0%; transition:width .4s;"></div>
                </div>
            </div>

            {{-- Pertanyaan --}}
            <div class="card p-4 mb-4" id="cardPertanyaan">
                <div class="mb-1" style="font-size:0.75rem; color:#aaa;" id="sectionTag"></div>
                <h6 class="fw-bold mb-4" id="qText" style="font-size:1rem; line-height:1.6;"></h6>
                <div id="qOptions" class="d-flex flex-column gap-2"></div>
                <div id="qInput" class="mt-3" style="display:none;"></div>
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

        {{-- HASIL --}}
        <div id="boxHasil" style="display:none;">

            {{-- Score Card --}}
            <div class="card p-4 mb-4 text-center" id="scoreCard">
                <div id="hasilIcon" style="font-size:3rem;" class="mb-2"></div>
                <h5 class="fw-bold mb-1" id="hasilJudul"></h5>
                <p class="text-muted mb-3" style="font-size:0.85rem;" id="hasilSub"></p>
                <div class="d-inline-block px-4 py-2 rounded-pill mb-3" id="hasilBadge"
                    style="font-size:0.85rem; font-weight:600;"></div>
                <div id="hasilSkor" style="font-size:0.8rem;" class="text-muted"></div>
            </div>

            {{-- Detail Faktor Risiko --}}
            <div class="card p-4 mb-4">
                <h6 class="mb-3" style="font-size:0.85rem;"><i class="bx bx-list-check me-1"></i> Detail Faktor Risiko
                    Terdeteksi</h6>
                <div id="detailRisiko"></div>
            </div>

            {{-- Rekomendasi --}}
            <div class="card p-4 mb-4" id="cardRekomendasi">
                <h6 class="mb-3" style="font-size:0.85rem;"><i class="bx bx-notepad me-1 text-primary"></i> Rekomendasi
                    Klinis</h6>
                <div id="isiRekomendasi" style="font-size:0.85rem; line-height:2;"></div>
            </div>

            {{-- Aksi --}}
            <div class="d-flex gap-2 flex-wrap justify-content-center mb-5">
                <button onclick="bukaLaporanPE()" class="btn btn-danger">
                    <i class="bx bx-file me-1"></i> Laporan PDF
                </button>
                <button onclick="ulangSkrining()" class="btn btn-outline-secondary">
                    <i class="bx bx-reset me-1"></i> Ulangi Skrining
                </button>
            </div>
        </div>

    </section>


    @push('scripts')
        @vite('resources/js/preeklamsia.js')
    @endpush
@endsection
