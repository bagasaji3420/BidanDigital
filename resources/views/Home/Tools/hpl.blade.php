@extends('Home.Layouts.app')

@section('content')
    <section class="hpl-page ">

        @include('Home.Layouts.toolsbread')
        <h3>{{ $title }}</h3>
        <div class="mt-3 mb-5">
            <ul class="text-muted" style="font-size: 14px;">
                <li>
                    <strong>Usia Kehamilan</strong> — Menampilkan perkiraan usia kehamilan dalam minggu berdasarkan HPHT.
                </li>
                <li>
                    <strong>HPL (Hari Perkiraan Lahir)</strong> — Estimasi tanggal persalinan menggunakan perhitungan
                    standar kehamilan (±40 minggu).
                </li>
                <li>
                    <strong>BMI (Body Mass Index)</strong> — Menghitung indeks massa tubuh ibu sebelum hamil untuk
                    menentukan kategori berat badan.
                </li>
                <li>
                    <strong>Kenaikan Berat Badan Ideal</strong> — Rekomendasi kenaikan berat badan selama kehamilan
                    berdasarkan standar BMI.
                </li>
                <li>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#modalRumus">
                        Dokumentasi Perhitungan Kehamilan
                    </a>
                </li>
            </ul>
        </div>

        <div class="row mt-3 g-3">
            <div class="col-12 col-md-6 d-flex justify-content-center">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-primary active" id="btnBumil" onclick="setMode('bumil')">
                        Ibu Hamil
                    </button>
                    <button type="button" class="btn btn-outline-primary" id="btnBidan" onclick="setMode('bidan')">
                        Bidan / Dokter
                    </button>
                </div>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-center">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-primary active" id="btnWHO"
                        onclick="setStandar('who')">
                        Standar WHO
                    </button>
                    <button type="button" class="btn btn-outline-primary" id="btnINA" onclick="setStandar('indonesia')">
                        Standar Indonesia
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div class="row g-3 align-items-end">
                    <div class="col-12 col-sm-6 col-lg">
                        <label class="form-label">Hari Pertama Haid Terakhir</label>
                        <input type="date" class="form-control" id="inputHPHT" max="{{ date('Y-m-d') }}">
                    </div>
                    <div class="col-12 col-sm-6 col-lg">
                        <label class="form-label">Tinggi Badan (cm)</label>
                        <input type="number" class="form-control" id="inputTB" min="50" max="220"
                            step="0.1">
                    </div>
                    <div class="col-12 col-sm-6 col-lg">
                        <label class="form-label">BB Sebelum Hamil (kg)</label>
                        <input type="number" class="form-control" id="inputBBawal" min="30" max="150"
                            step="0.1">
                    </div>
                    <div class="col-12 col-sm-6 col-lg">
                        <label class="form-label">BB Sekarang (kg)</label>
                        <input type="number" class="form-control" id="inputBBnow" min="30" max="200"
                            step="0.1">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-auto d-flex gap-2">
                        <button type="button" class="btn btn-primary" onclick="hitung()">Hitung</button>
                        <button type="button" class="btn btn-danger" onclick="clearPregnancyData()">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="hpl-main mt-4">
            <div class="wheel-wrap">
                <canvas id="roda" width="400" height="400"></canvas>
            </div>
            <div id="exportArea">
                <div class="panel" id="panel">
                </div>
            </div>
        </div>

        <div class="text-center mt-5">
            <small class="text-muted  ">
                *Perhitungan ini merupakan estimasi berdasarkan standar umum dan tidak menggantikan saran medis.
            </small>
        </div>
    </section>


    <div class="modal fade" id="modalRumus" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content border-0">

                <div class="modal-header border-0">
                    <div class="d-flex align-items-center gap-2">
                        <div
                            class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center">
                            <i class="bx bx-book-open"></i>
                        </div>
                        <h5 class="modal-title fw-bold mb-0">Dokumentasi — Kalkulator HPL</h5>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body px-4">

                    {{-- Apa itu HPL --}}
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span
                                class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center">
                                <i class="bx bx-info-circle"></i>
                            </span>
                            <h6 class="fw-bold mb-0 text-primary">Apa itu HPL?</h6>
                        </div>
                        <div class="p-3 rounded" style="background:#f0f4ff; border-left: 3px solid #696cff;">
                            <div class="text-muted" style="font-size:0.85rem; line-height:1.7;">
                                <strong>HPL (Hari Perkiraan Lahir)</strong> adalah perkiraan tanggal persalinan yang
                                dihitung
                                berdasarkan <strong>HPHT (Hari Pertama Haid Terakhir)</strong>. HPL bukan tanggal pasti —
                                hanya sekitar <strong>5% bayi lahir tepat pada HPL</strong>. Persalinan normal terjadi
                                antara
                                minggu ke-37 hingga 42.
                            </div>
                        </div>
                    </div>

                    <hr>

                    {{-- Rumus Perhitungan --}}
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span
                                class="avatar avatar-sm bg-label-info rounded d-flex align-items-center justify-content-center">
                                <i class="bx bx-math"></i>
                            </span>
                            <h6 class="fw-bold mb-0 text-info">Rumus Perhitungan</h6>
                        </div>
                        <div class="row g-3">
                            @php
                                $rumus = [
                                    [
                                        'warna' => '#696cff',
                                        'bg' => '#f0f4ff',
                                        'icon' => 'bx-calendar',
                                        'title' => 'HPL (Hari Perkiraan Lahir)',
                                        'rumus' => 'HPL = HPHT + 280 hari (40 minggu)',
                                        'desc' =>
                                            'Berdasarkan Hukum Naegele — standar internasional yang digunakan WHO dan Kemenkes.',
                                    ],
                                    [
                                        'warna' => '#00cfe8',
                                        'bg' => '#f0fbff',
                                        'icon' => 'bx-time',
                                        'title' => 'Usia Kehamilan',
                                        'rumus' => 'Hari = Hari ini − HPHT → Minggu = floor(hari ÷ 7), Sisa = hari % 7',
                                        'desc' => 'Dihitung dari HPHT. Contoh: 70 hari = 10 minggu 0 hari.',
                                    ],
                                    [
                                        'warna' => '#28a745',
                                        'bg' => '#f0fdf4',
                                        'icon' => 'bx-body',
                                        'title' => 'BMI (Sebelum Hamil)',
                                        'rumus' => 'BMI = BB (kg) ÷ (TB (m))²',
                                        'desc' =>
                                            'Digunakan untuk menentukan rekomendasi kenaikan berat badan selama kehamilan.',
                                    ],
                                    [
                                        'warna' => '#ff9f43',
                                        'bg' => '#fff8f0',
                                        'icon' => 'bx-trending-up',
                                        'title' => 'Kenaikan Berat Badan',
                                        'rumus' => 'ΔBB = BB sekarang − BB sebelum hamil',
                                        'desc' =>
                                            'Dipantau setiap kunjungan ANC untuk memastikan pertumbuhan bayi optimal.',
                                    ],
                                ];
                            @endphp
                            @foreach ($rumus as $r)
                                <div class="col-12 col-md-6">
                                    <div class="p-3 rounded h-100"
                                        style="background:{{ $r['bg'] }}; border-left: 3px solid {{ $r['warna'] }};">
                                        <div class="d-flex align-items-center gap-2 mb-2">
                                            <i class="bx {{ $r['icon'] }}"
                                                style="color:{{ $r['warna'] }}; font-size:1rem;"></i>
                                            <div class="fw-semibold"
                                                style="font-size:0.875rem; color:{{ $r['warna'] }};">{{ $r['title'] }}
                                            </div>
                                        </div>
                                        <code class="d-block mb-2 p-2 rounded"
                                            style="font-size:0.78rem; background:rgba(0,0,0,0.05);">{{ $r['rumus'] }}</code>
                                        <div class="text-muted" style="font-size:0.78rem;">{{ $r['desc'] }}</div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <hr>

                    {{-- Trimester --}}
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span
                                class="avatar avatar-sm bg-label-success rounded d-flex align-items-center justify-content-center">
                                <i class="bx bx-layer"></i>
                            </span>
                            <h6 class="fw-bold mb-0 text-success">Pembagian Trimester</h6>
                        </div>
                        <div class="row g-3">
                            @php
                                $trimester = [
                                    [
                                        'warna' => '#ea5455',
                                        'bg' => '#fff5f5',
                                        'title' => 'Trimester 1 (0–13 minggu)',
                                        'desc' =>
                                            'Pembentukan organ vital bayi. Ibu sering mengalami mual, muntah, dan kelelahan. Kunjungan ANC pertama sangat penting di trimester ini.',
                                    ],
                                    [
                                        'warna' => '#ff9f43',
                                        'bg' => '#fff8f0',
                                        'title' => 'Trimester 2 (14–26 minggu)',
                                        'desc' =>
                                            'Fase paling nyaman. Mual berkurang, energi meningkat. Bayi mulai bergerak (quickening) sekitar minggu 18–20.',
                                    ],
                                    [
                                        'warna' => '#696cff',
                                        'bg' => '#f0f4ff',
                                        'title' => 'Trimester 3 (27–40 minggu)',
                                        'desc' =>
                                            'Bayi tumbuh pesat dan bersiap lahir. Ibu mungkin merasakan sesak napas, sering kencing, dan kontraksi Braxton Hicks.',
                                    ],
                                ];
                            @endphp
                            @foreach ($trimester as $t)
                                <div class="col-12 col-md-4">
                                    <div class="p-3 rounded h-100"
                                        style="background:{{ $t['bg'] }}; border-left: 3px solid {{ $t['warna'] }};">
                                        <div class="fw-semibold mb-1"
                                            style="font-size:0.875rem; color:{{ $t['warna'] }};">{{ $t['title'] }}
                                        </div>
                                        <div class="text-muted" style="font-size:0.78rem; line-height:1.6;">
                                            {{ $t['desc'] }}</div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <hr>

                    {{-- Jadwal Kontrol ANC --}}
                    <div class="mb-2">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span
                                class="avatar avatar-sm bg-label-warning rounded d-flex align-items-center justify-content-center">
                                <i class="bx bx-clinic"></i>
                            </span>
                            <h6 class="fw-bold mb-0 text-warning">Jadwal Kontrol ANC</h6>
                        </div>
                        <div class="row g-3">
                            @php
                                $jadwal = [
                                    [
                                        'warna' => '#28a745',
                                        'bg' => '#f0fdf4',
                                        'title' => '0–28 minggu',
                                        'frek' => 'Tiap 4 minggu',
                                        'desc' => 'Pemeriksaan rutin awal kehamilan, skrining awal, USG pertama.',
                                    ],
                                    [
                                        'warna' => '#ff9f43',
                                        'bg' => '#fff8f0',
                                        'title' => '28–36 minggu',
                                        'frek' => 'Tiap 2 minggu',
                                        'desc' => 'Pemantauan pertumbuhan bayi, posisi bayi, tekanan darah.',
                                    ],
                                    [
                                        'warna' => '#ea5455',
                                        'bg' => '#fff5f5',
                                        'title' => '36–40 minggu',
                                        'frek' => 'Tiap minggu',
                                        'desc' => 'Persiapan persalinan, pemantauan tanda-tanda inpartu.',
                                    ],
                                ];
                            @endphp
                            @foreach ($jadwal as $j)
                                <div class="col-12 col-md-4">
                                    <div class="d-flex gap-3 p-3 rounded" style="background:{{ $j['bg'] }};">
                                        <div class="avatar avatar-sm rounded d-flex align-items-center justify-content-center"
                                            style="background:{{ $j['warna'] }}; flex-shrink:0;">
                                            <i class="bx bx-calendar-check" style="color:#fff;"></i>
                                        </div>
                                        <div>
                                            <div class="fw-semibold"
                                                style="font-size:0.875rem; color:{{ $j['warna'] }};">
                                                {{ $j['title'] }}</div>
                                            <div class="badge mb-1"
                                                style="background:{{ $j['warna'] }}; color:#fff; font-size:0.7rem;">
                                                {{ $j['frek'] }}</div>
                                            <div class="text-muted" style="font-size:0.78rem;">{{ $j['desc'] }}</div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                </div>

                <div class="modal-footer border-0">
                    <p class="text-muted me-auto mb-0" style="font-size:0.75rem;">
                        <i class="bx bx-info-circle me-1"></i>
                        Berdasarkan standar WHO & Kemenkes RI. Bukan pengganti konsultasi medis.
                    </p>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Tutup</button>
                </div>

            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    @push('scripts')
        @vite('resources/js/hpl.js')
    @endpush
@endsection
