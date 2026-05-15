@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- ═══════════════════════════════════════════
         MODAL MANUAL BOOK
    ═══════════════════════════════════════════ --}}
        <div class="modal fade" id="modalManualBook" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content border-0">
                    <div class="modal-header border-0">
                        <div class="d-flex align-items-center gap-2">
                            <div
                                class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center">
                                <i class="bx bx-book-open"></i>
                            </div>
                            <h5 class="modal-title fw-bold mb-0">Manual Book — Siklus Haid</h5>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body px-4">

                        {{-- Tanda Awal Haid --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span
                                    class="avatar avatar-sm bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-droplet"></i>
                                </span>
                                <h6 class="fw-bold mb-0 text-danger">Tanda-tanda Awal Haid (PMS & Menstruasi)</h6>
                            </div>
                            <div class="row g-3">
                                @php
                                    $tandaAwal = [
                                        [
                                            'icon' => 'bx-body',
                                            'title' => 'Kram Perut',
                                            'desc' =>
                                                'Nyeri atau kram di perut bagian bawah, biasanya mulai 1–2 hari sebelum haid dan berlanjut di hari pertama hingga kedua. Disebabkan kontraksi rahim saat meluruhkan lapisan endometrium.',
                                        ],
                                        [
                                            'icon' => 'bx-tired',
                                            'title' => 'Mudah Lelah',
                                            'desc' =>
                                                'Tubuh terasa berat dan mudah capek meski aktivitas ringan. Terjadi karena kadar progesteron tinggi di fase luteal akhir.',
                                        ],
                                        [
                                            'icon' => 'bx-confused',
                                            'title' => 'Perubahan Mood',
                                            'desc' =>
                                                'Mudah sedih, cemas, atau sensitif. Dikenal sebagai gejala PMS (Premenstrual Syndrome) akibat fluktuasi hormon estrogen dan progesteron.',
                                        ],
                                        [
                                            'icon' => 'bx-expand',
                                            'title' => 'Payudara Terasa Penuh',
                                            'desc' =>
                                                'Payudara bengkak, nyeri, atau sensitif saat disentuh. Umumnya muncul 1 minggu sebelum haid dan mereda begitu haid dimulai.',
                                        ],
                                        [
                                            'icon' => 'bx-wind',
                                            'title' => 'Kembung',
                                            'desc' =>
                                                'Perut terasa penuh dan kembung akibat retensi cairan yang dipengaruhi perubahan hormon, terutama progesteron.',
                                        ],
                                        [
                                            'icon' => 'bx-minus-circle',
                                            'title' => 'Flek / Bercak Darah',
                                            'desc' =>
                                                'Munculnya bercak darah coklat atau merah muda sebelum haid penuh — tanda lapisan rahim mulai luruh. Ini normal selama tidak berkepanjangan.',
                                        ],
                                        [
                                            'icon' => 'bx-head-circle',
                                            'title' => 'Sakit Kepala',
                                            'desc' =>
                                                'Penurunan estrogen menjelang haid dapat memicu sakit kepala atau migrain pada sebagian wanita.',
                                        ],
                                        [
                                            'icon' => 'bx-food-menu',
                                            'title' => 'Nafsu Makan Berubah',
                                            'desc' =>
                                                'Mengidam makanan tertentu (terutama manis atau asin) atau justru kehilangan nafsu makan adalah gejala PMS yang umum.',
                                        ],
                                    ];
                                @endphp
                                @foreach ($tandaAwal as $t)
                                    <div class="col-12 col-md-6">
                                        <div class="d-flex gap-3 p-3 rounded" style="background:#fff5f5;">
                                            <div class="avatar avatar-sm bg-label-danger rounded d-flex align-items-center justify-content-center"
                                                style="flex-shrink:0;">
                                                <i class="bx {{ $t['icon'] }}"></i>
                                            </div>
                                            <div>
                                                <div class="fw-semibold mb-1" style="font-size:0.875rem;">
                                                    {{ $t['title'] }}</div>
                                                <div class="text-muted" style="font-size:0.8rem;">{{ $t['desc'] }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        <hr>

                        {{-- Tanda Akhir Haid --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span
                                    class="avatar avatar-sm bg-label-success rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-check-circle"></i>
                                </span>
                                <h6 class="fw-bold mb-0 text-success">Tanda-tanda Akhir Haid</h6>
                            </div>
                            <div class="row g-3">
                                @php
                                    $tandaAkhir = [
                                        [
                                            'icon' => 'bx-trending-down',
                                            'title' => 'Darah Berkurang',
                                            'desc' =>
                                                'Volume darah semakin sedikit dan warna berubah dari merah segar menjadi coklat tua atau kecoklatan — tanda haid hampir selesai.',
                                        ],
                                        [
                                            'icon' => 'bx-smile',
                                            'title' => 'Mood Membaik',
                                            'desc' =>
                                                'Hormon estrogen mulai naik kembali di fase folikuler, membuat suasana hati lebih stabil dan energi meningkat.',
                                        ],
                                        [
                                            'icon' => 'bx-body',
                                            'title' => 'Kram Mereda',
                                            'desc' =>
                                                'Nyeri perut berangsur hilang karena kontraksi rahim berkurang seiring lapisan endometrium sudah selesai luruh.',
                                        ],
                                        [
                                            'icon' => 'bx-minus',
                                            'title' => 'Flek Coklat',
                                            'desc' =>
                                                'Darah coklat tua atau hitam di akhir haid adalah darah lama yang tersisa — ini normal dan bukan tanda infeksi.',
                                        ],
                                        [
                                            'icon' => 'bx-battery-charging',
                                            'title' => 'Energi Kembali',
                                            'desc' =>
                                                'Tubuh terasa lebih ringan dan segar. Fase folikuler dimulai — kadar estrogen naik mendukung perbaikan lapisan rahim baru.',
                                        ],
                                        [
                                            'icon' => 'bx-water',
                                            'title' => 'Cairan Serviks Berubah',
                                            'desc' =>
                                                'Setelah haid selesai, cairan vagina biasanya kering atau sedikit, lalu bertahap menjadi lebih bening menjelang ovulasi.',
                                        ],
                                    ];
                                @endphp
                                @foreach ($tandaAkhir as $t)
                                    <div class="col-12 col-md-6">
                                        <div class="d-flex gap-3 p-3 rounded" style="background:#f0fdf4;">
                                            <div class="avatar avatar-sm bg-label-success rounded d-flex align-items-center justify-content-center"
                                                style="flex-shrink:0;">
                                                <i class="bx {{ $t['icon'] }}"></i>
                                            </div>
                                            <div>
                                                <div class="fw-semibold mb-1" style="font-size:0.875rem;">
                                                    {{ $t['title'] }}</div>
                                                <div class="text-muted" style="font-size:0.8rem;">{{ $t['desc'] }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        <hr>

                        {{-- 4 Fase Siklus --}}
                        <div class="mb-2">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span
                                    class="avatar avatar-sm bg-label-info rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-infinite"></i>
                                </span>
                                <h6 class="fw-bold mb-0 text-info">4 Fase Siklus Menstruasi</h6>
                            </div>
                            <div class="row g-3">
                                @php
                                    $fase = [
                                        [
                                            'warna' => '#ea5455',
                                            'bg' => '#fff5f5',
                                            'title' => 'Menstruasi (Hari 1–5)',
                                            'desc' =>
                                                'Lapisan rahim luruh karena tidak ada pembuahan. Hormon estrogen & progesteron rendah. Ini hari pertama siklus baru.',
                                        ],
                                        [
                                            'warna' => '#00cfe8',
                                            'bg' => '#f0fbff',
                                            'title' => 'Folikuler (Hari 6–13)',
                                            'desc' =>
                                                'Folikel di ovarium berkembang dipicu FSH. Estrogen meningkat, lapisan rahim menebal. Energi & mood umumnya membaik.',
                                        ],
                                        [
                                            'warna' => '#28a745',
                                            'bg' => '#f0fdf4',
                                            'title' => 'Ovulasi (Hari 14)',
                                            'desc' =>
                                                'Sel telur dilepas dari ovarium. Ini hari paling subur. LH melonjak drastis. Bisa terasa sedikit nyeri di salah satu sisi perut (mittelschmerz).',
                                        ],
                                        [
                                            'warna' => '#7367f0',
                                            'bg' => '#f5f3ff',
                                            'title' => 'Luteal (Hari 15–28)',
                                            'desc' =>
                                                'Progesteron dominan mempersiapkan rahim untuk implantasi. Jika tidak hamil, hormon turun dan siklus baru dimulai. PMS muncul di fase akhir ini.',
                                        ],
                                    ];
                                @endphp
                                @foreach ($fase as $f)
                                    <div class="col-12 col-md-6">
                                        <div class="p-3 rounded h-100"
                                            style="background:{{ $f['bg'] }}; border-left: 3px solid {{ $f['warna'] }};">
                                            <div class="fw-semibold mb-1"
                                                style="font-size:0.875rem;color:{{ $f['warna'] }};">{{ $f['title'] }}
                                            </div>
                                            <div class="text-muted" style="font-size:0.8rem;">{{ $f['desc'] }}</div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Tutup</button>
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         MAIN CONTENT — 1 tampilan langsung
    ═══════════════════════════════════════════ --}}
        <div id="stateContent">

            {{-- Header --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div
                                    class="avatar avatar-lg bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-calendar-heart fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-0">Kalender Haid</h5>
                                    <small class="text-muted">Lacak & prediksi siklus menstruasimu</small>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2 align-items-center">
                                <span class="badge bg-label-danger fs-6 px-3 py-2">
                                    <i class="bx bx-droplet me-1"></i>
                                    Haid berikutnya: <span id="badgeBerikutnya" class="fw-bold ms-1">-</span>
                                </span>
                                <span class="badge bg-label-success fs-6 px-3 py-2">
                                    <i class="bx bx-target-lock me-1"></i>
                                    Ovulasi: <span id="badgeOvulasi" class="fw-bold ms-1">-</span>
                                </span>
                                <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                                    data-bs-target="#modalManualBook" title="Manual Book">
                                    <i class="bx bx-book-open"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-secondary" onclick="resetData()">
                                    <i class="bx bx-reset me-1"></i> Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Setup Siklus + Input Haid — 1 Card --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="row g-3 align-items-end">
                                <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                                    <label class="form-label fw-semibold mb-1" style="font-size:0.875rem;">Panjang
                                        Siklus</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="setupSiklus" value="28"
                                            min="21" max="45" onchange="simpanSetup()">
                                        <span class="input-group-text">hari</span>
                                    </div>
                                </div>
                                <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                                    <label class="form-label fw-semibold mb-1" style="font-size:0.875rem;">Lama
                                        Haid</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="setupDurasi" value="5"
                                            min="2" max="10" onchange="simpanSetup()">
                                        <span class="input-group-text">hari</span>
                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-3 col-lg-2">
                                    <label class="form-label fw-semibold mb-1" style="font-size:0.875rem;">Pilih
                                        Tanggal</label>
                                    <input type="date" class="form-control" id="inputTanggal"
                                        max="{{ date('Y-m-d') }}">
                                </div>
                                <div class="col-auto">
                                    <button id="btnMulaiSelesai" class="btn btn-danger" onclick="toggleHaid()">
                                        <i class="bx bx-droplet me-1"></i> Mulai Haid
                                    </button>
                                </div>
                            </div>
                            <div id="inputFeedback" class="mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4">

                {{-- Kalender --}}
                <div class="col-12 col-lg-8">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-outline-secondary" onclick="prevMonth()">
                                    <i class="bx bx-chevron-left"></i>
                                </button>
                                <h6 class="fw-bold mb-0" id="kalenderTitle">-</h6>
                                <button class="btn btn-sm btn-outline-secondary" onclick="nextMonth()">
                                    <i class="bx bx-chevron-right"></i>
                                </button>
                            </div>
                            <button class="btn btn-sm btn-outline-primary" onclick="goToday()">Hari Ini</button>
                        </div>
                        <div class="card-body">
                            {{-- Header hari --}}
                            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:6px;">
                                @foreach (['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'] as $d)
                                    <div class="text-center fw-semibold text-muted" style="font-size:0.75rem;">
                                        {{ $d }}</div>
                                @endforeach
                            </div>
                            {{-- Grid hari --}}
                            <div id="kalenderGrid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">
                            </div>
                        </div>
                    </div>

                    {{-- Legenda --}}
                    <div class="card border-0 shadow-sm mt-3">
                        <div class="card-body py-3">
                            <div class="d-flex flex-wrap gap-3">
                                @php
                                    $legends = [
                                        ['color' => '#ea5455', 'label' => 'Menstruasi'],
                                        ['color' => '#00cfe8', 'label' => 'Folikuler'],
                                        ['color' => '#28a745', 'label' => 'Ovulasi'],
                                        ['color' => '#7367f0', 'label' => 'Luteal'],
                                        ['color' => '#ff9f43', 'label' => 'PMS'],
                                    ];
                                @endphp
                                @foreach ($legends as $l)
                                    <div class="d-flex align-items-center gap-2">
                                        <div
                                            style="width:14px;height:14px;border-radius:3px;background:{{ $l['color'] }};flex-shrink:0;">
                                        </div>
                                        <span style="font-size:0.8rem;">{{ $l['label'] }}</span>
                                    </div>
                                @endforeach
                                <div class="d-flex align-items-center gap-2">
                                    <div
                                        style="width:14px;height:14px;border-radius:3px;background:#e9ecef;flex-shrink:0;">
                                    </div>
                                    <span style="font-size:0.8rem;">Normal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Sidebar Info --}}
                <div class="col-12 col-lg-4">

                    {{-- Fase Sekarang --}}
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header border-0 pb-0">
                            <h6 class="fw-bold mb-0">Fase Sekarang</h6>
                        </div>
                        <div class="card-body" id="faseSekarang">
                            <div class="text-muted text-center py-3" style="font-size:0.875rem;">
                                Belum ada data haid
                            </div>
                        </div>
                    </div>

                    {{-- Prediksi --}}
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header border-0 pb-0">
                            <h6 class="fw-bold mb-0">Prediksi 6 Siklus ke Depan</h6>
                        </div>
                        <div class="card-body p-0" id="prediksiList">
                            <div class="text-muted text-center py-3" style="font-size:0.875rem;">
                                Belum ada data haid
                            </div>
                        </div>
                    </div>

                    {{-- Riwayat --}}
                    <div class="card border-0 shadow-sm">
                        <div class="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                            <h6 class="fw-bold mb-0">Riwayat Haid</h6>
                            <small class="text-muted" id="totalSiklus"></small>
                        </div>
                        <div class="card-body p-0" id="riwayatList">
                            <div class="text-muted text-center py-3" style="font-size:0.875rem;">
                                Belum ada riwayat
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>


    @push('scripts')
        @vite('resources/js/kalender-haid.js')
    @endpush
@endsection
