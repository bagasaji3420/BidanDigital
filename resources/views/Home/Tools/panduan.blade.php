@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- Header --}}
        <div class="text-center mb-5">
            <div
                class="avatar avatar-lg bg-label-primary rounded d-inline-flex align-items-center justify-content-center mb-3">
                <i class="bx bx-book-open fs-4"></i>
            </div>
            <h3 class="fw-bold mb-2">Panduan Penggunaan Tools</h3>
            <p class="text-muted" style="font-size:0.9rem; max-width:600px; margin:0 auto;">
                Panduan lengkap semua fitur tools kesehatan ibu hamil, persalinan, dan tumbuh kembang bayi.
                Semua data disimpan lokal di perangkat Anda dan tidak dikirim ke server manapun.
            </p>
        </div>

        {{-- Quick Nav --}}
        <div class="card border-0 shadow-sm mb-5">
            <div class="card-body py-3">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    @php
                        $navs = [
                            [
                                'href' => '#kalkulator',
                                'icon' => 'bx-calculator',
                                'label' => 'Kalkulator',
                                'color' => 'primary',
                            ],
                            ['href' => '#perkiraan', 'icon' => 'bx-dna', 'label' => 'Perkiraan', 'color' => 'warning'],
                            [
                                'href' => '#tracker',
                                'icon' => 'bx-heart-circle',
                                'label' => 'Tracker',
                                'color' => 'success',
                            ],
                            [
                                'href' => '#skrining',
                                'icon' => 'bx-clipboard',
                                'label' => 'Skrining',
                                'color' => 'danger',
                            ],
                            ['href' => '#jadwal', 'icon' => 'bx-calendar', 'label' => 'Jadwal', 'color' => 'info'],
                            [
                                'href' => '#checklist',
                                'icon' => 'bx-check-square',
                                'label' => 'Checklist & Tes',
                                'color' => 'secondary',
                            ],
                        ];
                    @endphp
                    @foreach ($navs as $nav)
                        <a href="{{ $nav['href'] }}" class="btn btn-sm btn-outline-{{ $nav['color'] }}">
                            <i class="bx {{ $nav['icon'] }} me-1"></i>{{ $nav['label'] }}
                        </a>
                    @endforeach
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: KALKULATOR
    ═══════════════════════════════════════════ --}}
        <div id="kalkulator" class="mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="avatar bg-label-primary rounded d-flex align-items-center justify-content-center">
                    <i class="bx bx-calculator"></i>
                </div>
                <div>
                    <h5 class="fw-bold mb-0">Kalkulator</h5>
                    <small class="text-muted">Hitung HPL, kalori, dan kebutuhan nutrisi ibu hamil</small>
                </div>
            </div>

            <div class="row g-4">

                {{-- HPL --}}
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-start gap-3 mb-3">
                                <div
                                    class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center shrink-0">
                                    <i class="bx bx-calendar-heart"></i>
                                </div>
                                <div class="flex-fill">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <h6 class="fw-bold mb-0">Kalkulator HPL (Hari Perkiraan Lahir)</h6>
                                        <a href="{{ route('tools.hpl') }}" class="btn btn-sm btn-primary">
                                            <i class="bx bx-link-external me-1"></i>Buka Tools
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <p class="text-muted mb-3" style="font-size:0.875rem;">
                                Tools terlengkap untuk memantau kehamilan. Masukkan HPHT dan dapatkan informasi lengkap
                                dalam satu halaman.
                            </p>

                            <div class="row g-3 mb-3">
                                @php
                                    $hplFitur = [
                                        [
                                            'icon' => 'bx-calendar-check',
                                            'color' => 'primary',
                                            'title' => 'HPL Otomatis',
                                            'desc' =>
                                                'Hitung HPL berdasarkan HPHT (Hukum Naegele, +280 hari). Tersimpan otomatis untuk dipakai tools lain.',
                                        ],
                                        [
                                            'icon' => 'bx-body',
                                            'color' => 'success',
                                            'title' => 'Usia Kehamilan',
                                            'desc' =>
                                                'Tampil usia kehamilan dalam minggu+hari disertai info trimester dan milestone perkembangan janin.',
                                        ],
                                        [
                                            'icon' => 'bx-trending-up',
                                            'color' => 'warning',
                                            'title' => 'BMI & Kenaikan BB',
                                            'desc' =>
                                                'Pantau BMI pra-hamil (standar WHO atau Kemenkes) dan kenaikan BB ideal selama kehamilan.',
                                        ],
                                        [
                                            'icon' => 'bx-circle',
                                            'color' => 'danger',
                                            'title' => 'Roda Kehamilan',
                                            'desc' =>
                                                'Visualisasi kalender kehamilan berbentuk roda — menampilkan progres minggu per minggu secara visual.',
                                        ],
                                        [
                                            'icon' => 'bx-file',
                                            'color' => 'info',
                                            'title' => 'Export PDF',
                                            'desc' =>
                                                'Unduh laporan kehamilan lengkap dalam format PDF untuk dibawa saat kontrol ke bidan/dokter.',
                                        ],
                                        [
                                            'icon' => 'bx-user-check',
                                            'color' => 'secondary',
                                            'title' => 'Mode Bumil & Bidan',
                                            'desc' =>
                                                'Mode Bumil menampilkan info ramah pengguna. Mode Bidan menampilkan data klinis lengkap termasuk jadwal kontrol.',
                                        ],
                                    ];
                                @endphp
                                @foreach ($hplFitur as $f)
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <div class="d-flex gap-3 p-3 rounded">
                                            <div
                                                class="avatar avatar-sm bg-label-{{ $f['color'] }} rounded d-flex align-items-center justify-content-center shrink-0">
                                                <i class="bx {{ $f['icon'] }}"></i>
                                            </div>
                                            <div>
                                                <div class="fw-semibold mb-1" style="font-size:0.85rem;">{{ $f['title'] }}
                                                </div>
                                                <div class="text-muted" style="font-size:0.78rem; line-height:1.5;">
                                                    {{ $f['desc'] }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div class="alert alert-primary mb-0 py-2 px-3" style="font-size:0.82rem;">
                                <i class="bx bx-info-circle me-1"></i>
                                <strong>Penting:</strong> Data yang diisi di HPL (HPHT, TB, BB) akan otomatis tersimpan dan
                                digunakan oleh tools lain seperti Kebutuhan Kalori, Jadwal ANC, dan Jadwal Imunisasi.
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Kebutuhan Kalori --}}
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-start gap-3 mb-3">
                                <div
                                    class="avatar avatar-sm bg-label-success rounded d-flex align-items-center justify-content-center shrink-0">
                                    <i class="bx bx-food-menu"></i>
                                </div>
                                <div class="flex-fill">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <h6 class="fw-bold mb-0">Kebutuhan Kalori Ibu Hamil</h6>
                                        <a href="{{ route('tools.kebutuhan-kalori') }}" class="btn btn-sm btn-success">
                                            <i class="bx bx-link-external me-1"></i>Buka Tools
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="text-muted mb-3" style="font-size:0.875rem;">
                                Hitung kebutuhan kalori harian berdasarkan rumus BMR Mifflin-St Jeor + TDEE + tambahan AKG
                                2019 Kemenkes sesuai trimester.
                            </p>
                            <div class="row g-3">
                                @php
                                    $kaloriSteps = [
                                        [
                                            'step' => '1',
                                            'color' => 'primary',
                                            'title' => 'Data Otomatis',
                                            'desc' =>
                                                'Jika sudah isi HPL, data BB, TB, dan trimester akan terisi otomatis.',
                                        ],
                                        [
                                            'step' => '2',
                                            'color' => 'success',
                                            'title' => 'Isi Usia & Aktivitas',
                                            'desc' =>
                                                'Masukkan usia dan tingkat aktivitas (santai, ringan, sedang, berat).',
                                        ],
                                        [
                                            'step' => '3',
                                            'color' => 'warning',
                                            'title' => 'Hasil & Menu',
                                            'desc' =>
                                                'Dapatkan total kalori harian + jadwal makan 5x sehari lengkap dengan contoh menu per trimester.',
                                        ],
                                    ];
                                @endphp
                                @foreach ($kaloriSteps as $s)
                                    <div class="col-12 col-md-4">
                                        <div class="d-flex gap-3 p-3 rounded">
                                            <div class="avatar avatar-sm bg-label-{{ $s['color'] }} rounded d-flex align-items-center justify-content-center shrink-0 fw-bold"
                                                style="font-size:0.85rem;">
                                                {{ $s['step'] }}
                                            </div>
                                            <div>
                                                <div class="fw-semibold mb-1" style="font-size:0.85rem;">
                                                    {{ $s['title'] }}</div>
                                                <div class="text-muted" style="font-size:0.78rem;">{{ $s['desc'] }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: PERKIRAAN
    ═══════════════════════════════════════════ --}}
        <div id="perkiraan" class="mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="avatar bg-label-warning rounded d-flex align-items-center justify-content-center">
                    <i class="bx bx-dna"></i>
                </div>
                <div>
                    <h5 class="fw-bold mb-0">Perkiraan</h5>
                    <small class="text-muted">Prediksi berbasis genetika dan data orang tua</small>
                </div>
            </div>

            <div class="row g-4">
                @php
                    $perkiraanTools = [
                        [
                            'route' => 'tools.goldar',
                            'icon' => 'bx-droplet',
                            'color' => 'danger',
                            'title' => 'Pencocokan Golongan Darah Anak',
                            'desc' =>
                                'Prediksi golongan darah anak berdasarkan Hukum Mendel. Pilih golongan darah ABO dan Rhesus ayah dan ibu, lalu lihat semua kemungkinan golongan darah anak beserta persentase peluangnya.',
                            'cara' => [
                                'Pilih golongan darah ABO ayah (A, B, AB, atau O)',
                                'Pilih Rhesus ayah (Rh+ atau Rh−)',
                                'Lakukan hal yang sama untuk ibu',
                                'Klik Hitung — lihat tabel genetik lengkap dan peluang per golongan darah',
                            ],
                            'note' =>
                                'Jika ibu Rh− dan ayah Rh+, akan muncul peringatan risiko inkompatibilitas Rhesus.',
                            'note_color' => 'warning',
                        ],
                        [
                            'route' => 'tools.tinggi',
                            'icon' => 'bx-ruler',
                            'color' => 'info',
                            'title' => 'Prediksi Tinggi Badan Anak',
                            'desc' =>
                                'Perkirakan potensi tinggi badan anak menggunakan rumus Mid-Parental Height berdasarkan tinggi ayah dan ibu.',
                            'cara' => [
                                'Masukkan tinggi badan ayah (cm)',
                                'Masukkan tinggi badan ibu (cm)',
                                'Pilih jenis kelamin anak (Laki-laki, Perempuan, atau Keduanya)',
                                'Klik Hitung — dapatkan prediksi tinggi ± 10 cm range',
                            ],
                            'note' =>
                                'Rumus: Laki-laki = (TB Ayah + TB Ibu + 13) ÷ 2 | Perempuan = (TB Ayah + TB Ibu − 13) ÷ 2',
                            'note_color' => 'info',
                        ],
                    ];
                @endphp
                @foreach ($perkiraanTools as $t)
                    <div class="col-12 col-md-6">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div
                                        class="avatar avatar-sm bg-label-{{ $t['color'] }} rounded d-flex align-items-center justify-content-center shrink-0">
                                        <i class="bx {{ $t['icon'] }}"></i>
                                    </div>
                                    <div class="flex-fill">
                                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                            <h6 class="fw-bold mb-0" style="font-size:0.9rem;">{{ $t['title'] }}</h6>
                                            <a href="{{ route($t['route']) }}"
                                                class="btn btn-sm btn-outline-{{ $t['color'] }}">
                                                <i class="bx bx-link-external me-1"></i>Buka
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-muted mb-3" style="font-size:0.82rem;">{{ $t['desc'] }}</p>
                                <div class="mb-3">
                                    <div class="fw-semibold mb-2" style="font-size:0.8rem;">Cara Penggunaan:</div>
                                    <ol class="ps-3 mb-0" style="font-size:0.8rem; color:#555; line-height:1.7;">
                                        @foreach ($t['cara'] as $c)
                                            <li>{{ $c }}</li>
                                        @endforeach
                                    </ol>
                                </div>
                                <div class="alert alert-{{ $t['note_color'] }} mb-0 py-2 px-3"
                                    style="font-size:0.78rem;">
                                    <i class="bx bx-info-circle me-1"></i>{{ $t['note'] }}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: TRACKER
    ═══════════════════════════════════════════ --}}
        <div id="tracker" class="mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="avatar bg-label-success rounded d-flex align-items-center justify-content-center">
                    <i class="bx bx-heart-circle"></i>
                </div>
                <div>
                    <h5 class="fw-bold mb-0">Tracker</h5>
                    <small class="text-muted">Pantau kondisi ibu dan bayi secara berkala</small>
                </div>
            </div>

            <div class="row g-4">
                @php
                    $trackers = [
                        [
                            'route' => 'tools.kalender-haid',
                            'icon' => 'bx-calendar-heart',
                            'color' => 'danger',
                            'title' => 'Kalender Haid',
                            'desc' =>
                                'Catat dan prediksi siklus menstruasi. Menampilkan fase-fase siklus (menstruasi, folikuler, ovulasi, luteal, PMS) dalam kalender berwarna.',
                            'cara' => [
                                'Setup awal: isi panjang siklus (21–45 hari) dan durasi haid (2–10 hari)',
                                'Catat hari pertama haid dengan memilih tanggal lalu klik "Hari Pertama Haid"',
                                'Tandai selesai haid dengan klik "Selesai Haid"',
                                'Lihat prediksi 3 siklus ke depan dan fase saat ini',
                            ],
                            'storage' => 'haidData',
                        ],
                        [
                            'route' => 'tools.kick-counter',
                            'icon' => 'bx-run',
                            'color' => 'primary',
                            'title' => 'Kick Counter (Hitung Tendangan Bayi)',
                            'desc' =>
                                'Hitung tendangan bayi per sesi. Dokter menyarankan minimal 10 gerakan dalam 2 jam sebagai tanda bayi sehat.',
                            'cara' => [
                                'Isi profil bayi (nama, usia kehamilan)',
                                'Tekan tombol besar setiap kali bayi bergerak/menendang',
                                'Sistem otomatis hitung durasi dan catat ke riwayat harian',
                                'Lihat grafik tren gerakan bayi per hari',
                            ],
                            'storage' => 'kickHistori + kickSesi_*',
                        ],
                        [
                            'route' => 'tools.kontraksi',
                            'icon' => 'bx-pulse',
                            'color' => 'warning',
                            'title' => 'Tracker Kontraksi',
                            'desc' =>
                                'Timer kontraksi real-time dengan deteksi otomatis pola 5-1-1 (kontraksi 5 menit sekali, durasi 1 menit, selama 1 jam) — tanda aktif persalinan.',
                            'cara' => [
                                'Tekan tombol MULAI KONTRAKSI saat kontraksi mulai terasa',
                                'Tekan SELESAI saat kontraksi berakhir',
                                'Ulangi untuk setiap kontraksi berikutnya',
                                'Sistem otomatis hitung durasi, interval, dan deteksi pola 5-1-1',
                            ],
                            'storage' => 'Tidak disimpan (sesi sementara)',
                            'note' =>
                                'Jika pola 5-1-1 terpenuhi, akan muncul alert darurat dengan link ke RS/Puskesmas terdekat.',
                            'note_color' => 'danger',
                        ],
                        [
                            'route' => 'tools.menyusui',
                            'icon' => 'bx-time-five',
                            'color' => 'info',
                            'title' => 'Tracker Menyusui',
                            'desc' =>
                                'Catat jadwal dan durasi menyusui per anak. Pantau pola menyusui untuk memastikan bayi mendapat ASI yang cukup.',
                            'cara' => [
                                'Tambahkan profil bayi (nama dan tanggal lahir)',
                                'Catat sesi menyusui: pilih sisi (kiri/kanan/keduanya) dan durasi',
                                'Lihat riwayat menyusui harian per anak',
                                'Pantau total durasi dan frekuensi menyusui per hari',
                            ],
                            'storage' => 'menyusuiHistori_* + menyusuiSesi_*',
                        ],
                        [
                            'route' => 'tools.berat-badan',
                            'icon' => 'bx-trending-up',
                            'color' => 'success',
                            'title' => 'Tracker Berat Badan',
                            'desc' =>
                                'Pantau kenaikan berat badan ibu hamil sesuai anjuran IOM/Kemenkes berdasarkan BMI pra-hamil.',
                            'cara' => [
                                'Masukkan berat badan saat ini dan tanggal pengukuran',
                                'Sistem bandingkan dengan anjuran kenaikan BB ideal (standar WHO atau Kemenkes)',
                                'Lihat grafik tren kenaikan BB dari waktu ke waktu',
                                'Data tersimpan dan ditampilkan di halaman Kelola Data',
                            ],
                            'storage' => 'kia_berat_badan',
                        ],
                        [
                            'route' => 'tools.tekanan-darah',
                            'icon' => 'bx-heart',
                            'color' => 'danger',
                            'title' => 'Tracker Tekanan Darah',
                            'desc' =>
                                'Catat tekanan darah sistolik dan diastolik secara berkala. Deteksi dini hipertensi dan risiko preeklampsia.',
                            'cara' => [
                                'Masukkan nilai sistolik (angka atas) dan diastolik (angka bawah)',
                                'Isi tanggal dan waktu pengukuran',
                                'Sistem otomatis kategorikan: Normal / Prehipertensi / Hipertensi',
                                'Lihat grafik tren tekanan darah dari waktu ke waktu',
                            ],
                            'storage' => 'kia_tekanan_darah',
                            'note' =>
                                'TD ≥ 140/90 mmHg pada ibu hamil adalah tanda bahaya. Segera konsultasi ke bidan/dokter.',
                            'note_color' => 'danger',
                        ],
                        [
                            'route' => 'tools.anemia',
                            'icon' => 'bx-droplet',
                            'color' => 'warning',
                            'title' => 'Tracker Anemia',
                            'desc' =>
                                'Pantau kadar Hb dan kepatuhan minum tablet Fe (zat besi). Ibu hamil dianjurkan minum 1 tablet Fe per hari.',
                            'cara' => [
                                'Setup tanggal mulai tracker',
                                'Centang setiap hari sudah minum tablet Fe',
                                'Catat hasil pemeriksaan Hb dari laboratorium',
                                'Lihat status anemia: Normal (≥11), Ringan (9–10.9), Sedang (7–8.9), Berat (<7)',
                            ],
                            'storage' => 'anemiaData',
                        ],
                        [
                            'route' => 'tools.pertumbuhan-bayi',
                            'icon' => 'bx-bar-chart-alt-2',
                            'color' => 'primary',
                            'title' => 'Grafik Pertumbuhan Bayi',
                            'desc' =>
                                'Pantau tumbuh kembang bayi menggunakan kurva pertumbuhan WHO. Catat berat, tinggi, dan lingkar kepala secara berkala.',
                            'cara' => [
                                'Tambahkan profil anak (nama, tanggal lahir, jenis kelamin)',
                                'Catat pengukuran: berat badan, tinggi badan, lingkar kepala',
                                'Lihat posisi anak di kurva WHO (persentil)',
                                'Catat dan pantau riwayat vaksinasi/imunisasi per anak',
                            ],
                            'storage' => 'kia_anak',
                        ],
                    ];
                @endphp

                @foreach ($trackers as $t)
                    <div class="col-12 col-md-6">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div
                                        class="avatar avatar-sm bg-label-{{ $t['color'] }} rounded d-flex align-items-center justify-content-center shrink-0">
                                        <i class="bx {{ $t['icon'] }}"></i>
                                    </div>
                                    <div class="flex-fill">
                                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                            <h6 class="fw-bold mb-0" style="font-size:0.9rem;">{{ $t['title'] }}</h6>
                                            <a href="{{ route($t['route']) }}"
                                                class="btn btn-sm btn-outline-{{ $t['color'] }}">
                                                <i class="bx bx-link-external me-1"></i>Buka
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-muted mb-3" style="font-size:0.82rem;">{{ $t['desc'] }}</p>
                                <div class="mb-2">
                                    <div class="fw-semibold mb-1"
                                        style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.05em; color:#888;">
                                        Cara Pakai</div>
                                    <ol class="ps-3 mb-2" style="font-size:0.78rem; color:#555; line-height:1.7;">
                                        @foreach ($t['cara'] as $c)
                                            <li>{{ $c }}</li>
                                        @endforeach
                                    </ol>
                                </div>
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <span class="badge bg-label-secondary" style="font-size:0.7rem;">
                                        <i class="bx bx-data me-1"></i>Storage: {{ $t['storage'] }}
                                    </span>
                                </div>
                                @if (isset($t['note']))
                                    <div class="alert alert-{{ $t['note_color'] }} mb-0 py-2 px-3"
                                        style="font-size:0.78rem;">
                                        <i class="bx bx-error-circle me-1"></i>{{ $t['note'] }}
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: SKRINING
    ═══════════════════════════════════════════ --}}
        <div id="skrining" class="mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="avatar bg-label-danger rounded d-flex align-items-center justify-content-center">
                    <i class="bx bx-search-alt"></i>
                </div>
                <div>
                    <h5 class="fw-bold mb-0">Skrining</h5>
                    <small class="text-muted">Deteksi dini risiko kesehatan ibu hamil dan pascapersalinan</small>
                </div>
            </div>

            <div class="row g-4">

                {{-- Skrining Preeklampsia --}}
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-start gap-3 mb-3">
                                <div
                                    class="avatar avatar-sm bg-label-danger rounded d-flex align-items-center justify-content-center shrink-0">
                                    <i class="bx bx-heart"></i>
                                </div>
                                <div class="flex-fill">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <h6 class="fw-bold mb-0" style="font-size:0.9rem;">Skrining Preeklampsia</h6>
                                        <a href="{{ route('tools.skrining-preeklampsia') }}"
                                            class="btn btn-sm btn-outline-danger">
                                            <i class="bx bx-link-external me-1"></i>Buka
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="text-muted mb-3" style="font-size:0.82rem;">
                                Kuesioner skrining risiko preeklampsia berdasarkan 5 seksi: identitas kehamilan, riwayat
                                penyakit pribadi, riwayat keluarga, gejala saat ini, dan parameter klinis.
                            </p>
                            <div class="row g-2 mb-3">
                                @php
                                    $seksipre = [
                                        'Identitas & Kehamilan',
                                        'Riwayat Penyakit Pribadi',
                                        'Riwayat Keluarga',
                                        'Gejala Saat Ini',
                                        'Parameter Klinis',
                                    ];
                                    $colorspre = ['primary', 'warning', 'info', 'danger', 'success'];
                                @endphp
                                @foreach ($seksipre as $i => $s)
                                    <div class="col-6">
                                        <div class="d-flex align-items-center gap-2 p-2 rounded"
                                        >
                                            <div class="avatar avatar-xs bg-label-{{ $colorspre[$i] }} rounded d-flex align-items-center justify-content-center"
                                                style="width:20px;height:20px;font-size:0.65rem;">{{ $i + 1 }}
                                            </div>
                                            <span style="font-size:0.78rem;">{{ $s }}</span>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="alert alert-danger mb-0 py-2 px-3" style="font-size:0.78rem;">
                                <i class="bx bx-error-circle me-1"></i>
                                Hasil skrining bersifat informatif. Skor tinggi = segera konsultasi ke dokter kandungan.
                            </div>
                        </div>
                    </div>
                </div>

                {{-- EPDS --}}
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-start gap-3 mb-3">
                                <div
                                    class="avatar avatar-sm bg-label-info rounded d-flex align-items-center justify-content-center shrink-0">
                                    <i class="bx bx-brain"></i>
                                </div>
                                <div class="flex-fill">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <h6 class="fw-bold mb-0" style="font-size:0.9rem;">Skrining Baby Blues (EPDS)</h6>
                                        <a href="{{ route('tools.epds') }}" class="btn btn-sm btn-outline-info">
                                            <i class="bx bx-link-external me-1"></i>Buka
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="text-muted mb-3" style="font-size:0.82rem;">
                                Edinburgh Postnatal Depression Scale (EPDS) — 10 pertanyaan tervalidasi Kemenkes/POGI untuk
                                mendeteksi gejala baby blues dan depresi postpartum.
                            </p>
                            <div class="row g-2 mb-3">
                                @php
                                    $hasilEpds = [
                                        ['skor' => '0–9', 'color' => 'success', 'label' => 'Risiko Rendah'],
                                        ['skor' => '10–12', 'color' => 'warning', 'label' => 'Perlu Perhatian'],
                                        ['skor' => '13–30', 'color' => 'danger', 'label' => 'Risiko Tinggi'],
                                    ];
                                @endphp
                                @foreach ($hasilEpds as $h)
                                    <div class="col-4">
                                        <div class="text-center p-2 rounded">
                                            <div class="badge bg-label-{{ $h['color'] }} mb-1"
                                                style="font-size:0.75rem;">{{ $h['skor'] }}</div>
                                            <div style="font-size:0.72rem; color:#555;">{{ $h['label'] }}</div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="alert alert-info mb-0 py-2 px-3" style="font-size:0.78rem;">
                                <i class="bx bx-info-circle me-1"></i>
                                Tes ini bisa diulang kapanpun. Jujurlah dalam menjawab — tidak ada jawaban benar atau salah.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: JADWAL
    ═══════════════════════════════════════════ --}}
        <div id="jadwal" class="mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="avatar bg-label-info rounded d-flex align-items-center justify-content-center">
                    <i class="bx bx-calendar"></i>
                </div>
                <div>
                    <h5 class="fw-bold mb-0">Jadwal</h5>
                    <small class="text-muted">Jadwal ANC, nifas, dan imunisasi sesuai standar Kemenkes</small>
                </div>
            </div>

            <div class="row g-4">
                @php
                    $jadwals = [
                        [
                            'route' => 'tools.jadwal-anc',
                            'icon' => 'bx-plus-medical',
                            'color' => 'primary',
                            'title' => 'Jadwal ANC (Antenatal Care)',
                            'desc' =>
                                '6 kunjungan ANC sesuai standar Kemenkes. Otomatis menghitung jadwal berdasarkan HPHT dan menampilkan status setiap kunjungan.',
                            'items' => [
                                'ANC 1 (Minggu 1–12): Konfirmasi kehamilan, cek darah & USG pertama',
                                'ANC 2 (Minggu 13–16): Skrining Down Syndrome, evaluasi suplemen',
                                'ANC 3 (Minggu 18–24): USG Anatomi janin — penting!',
                                'ANC 4 (Minggu 28–32): Skrining diabetes gestasional',
                                'ANC 5 (Minggu 34–36): Persiapan persalinan',
                                'ANC 6 (Minggu 37–40): Monitoring akhir menjelang HPL',
                            ],
                            'note' => 'Membutuhkan data HPHT dari Kalkulator HPL. Isi HPL terlebih dahulu.',
                            'note_color' => 'primary',
                        ],
                        [
                            'route' => 'tools.jadwal-nifas',
                            'icon' => 'bx-child',
                            'color' => 'success',
                            'title' => 'Jadwal Nifas (Kunjungan KF)',
                            'desc' =>
                                '4 kunjungan nifas (KF1–KF4) sesuai Kemenkes pascapersalinan. Konten berbeda untuk persalinan normal dan sesar (SC).',
                            'items' => [
                                'KF 1 (6 jam–2 hari): Pantau perdarahan, IMD, kondisi bayi',
                                'KF 2 (3–7 hari): Cek jahitan, ASI, skrining baby blues',
                                'KF 3 (8–28 hari): Involusi uterus, laktasi, KB pasca salin',
                                'KF 4 (29–42 hari): Evaluasi pemulihan & kesehatan mental',
                            ],
                            'note' => 'Isi tanggal melahirkan dan jenis persalinan (normal/SC) untuk memulai.',
                            'note_color' => 'success',
                        ],
                        [
                            'route' => 'tools.jadwal-imunisasi',
                            'icon' => 'bx-injection',
                            'color' => 'warning',
                            'title' => 'Jadwal Imunisasi Bayi',
                            'desc' =>
                                'Jadwal imunisasi bayi 0–24 bulan sesuai Kemenkes 2023. Otomatis hitung tanggal jadwal berdasarkan tanggal lahir bayi.',
                            'items' => [
                                'Imunisasi wajib: HB-0, BCG, Polio, DPT-HB-Hib, IPV, Campak, MR',
                                'Imunisasi rekomendasi: PCV, Rotavirus, JE, Varisela, dll',
                                'Status: Waktunya sekarang / Akan datang / Sudah lewat',
                                'Terintegrasi dengan data bayi di Grafik Pertumbuhan',
                            ],
                            'note' =>
                                'Masukkan tanggal lahir bayi untuk melihat jadwal imunisasi yang dipersonalisasi.',
                            'note_color' => 'warning',
                        ],
                    ];
                @endphp
                @foreach ($jadwals as $j)
                    <div class="col-12 col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div
                                        class="avatar avatar-sm bg-label-{{ $j['color'] }} rounded d-flex align-items-center justify-content-center shrink-0">
                                        <i class="bx {{ $j['icon'] }}"></i>
                                    </div>
                                    <div class="flex-fill">
                                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                            <h6 class="fw-bold mb-0" style="font-size:0.875rem;">{{ $j['title'] }}</h6>
                                            <a href="{{ route($j['route']) }}"
                                                class="btn btn-sm btn-outline-{{ $j['color'] }}">
                                                <i class="bx bx-link-external me-1"></i>Buka
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-muted mb-3" style="font-size:0.82rem;">{{ $j['desc'] }}</p>
                                <ul class="list-unstyled mb-3">
                                    @foreach ($j['items'] as $item)
                                        <li class="d-flex align-items-start gap-2 mb-1">
                                            <i class="bx bx-chevron-right text-{{ $j['color'] }} mt-1"
                                                style="font-size:0.9rem; flex-shrink:0;"></i>
                                            <span style="font-size:0.78rem; color:#555;">{{ $item }}</span>
                                        </li>
                                    @endforeach
                                </ul>
                                <div class="alert alert-{{ $j['note_color'] }} mb-0 py-2 px-3"
                                    style="font-size:0.78rem;">
                                    <i class="bx bx-info-circle me-1"></i>{{ $j['note'] }}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: CHECKLIST & TES
    ═══════════════════════════════════════════ --}}
        <div id="checklist" class="mb-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="avatar bg-label-secondary rounded d-flex align-items-center justify-content-center">
                    <i class="bx bx-check-square"></i>
                </div>
                <div>
                    <h5 class="fw-bold mb-0">Checklist & Tes</h5>
                    <small class="text-muted">Persiapan persalinan dan kesiapan menyambut kehamilan</small>
                </div>
            </div>

            <div class="row g-4">

                {{-- Checklist Persalinan --}}
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-start gap-3 mb-3">
                                <div
                                    class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center shrink-0">
                                    <i class="bx bx-check-double"></i>
                                </div>
                                <div class="flex-fill">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <h6 class="fw-bold mb-0" style="font-size:0.9rem;">Checklist Persalinan</h6>
                                        <a href="{{ route('tools.checklist-persalinan') }}"
                                            class="btn btn-sm btn-outline-primary">
                                            <i class="bx bx-link-external me-1"></i>Buka
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="text-muted mb-3" style="font-size:0.82rem;">
                                Daftar lengkap perlengkapan persalinan yang perlu disiapkan. Centang item yang sudah siap
                                dan pantau progres persiapan Anda.
                            </p>
                            <div class="mb-3">
                                <div class="fw-semibold mb-2" style="font-size:0.8rem;">Cara Penggunaan:</div>
                                <ol class="ps-3 mb-0" style="font-size:0.8rem; color:#555; line-height:1.7;">
                                    <li>Buka halaman Checklist Persalinan</li>
                                    <li>Centang item yang sudah disiapkan</li>
                                    <li>Progress bar otomatis update menunjukkan persentase kesiapan</li>
                                    <li>Data tersimpan otomatis, tidak hilang saat halaman ditutup</li>
                                </ol>
                            </div>
                            <div class="alert alert-primary mb-0 py-2 px-3" style="font-size:0.78rem;">
                                <i class="bx bx-info-circle me-1"></i>
                                Data tersimpan di localStorage dengan key <code>checklist_persalinan</code>.
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Tes Kesiapan Suami --}}
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-start gap-3 mb-3">
                                <div
                                    class="avatar avatar-sm bg-label-warning rounded d-flex align-items-center justify-content-center shrink-0">
                                    <i class="bx bx-clipboard"></i>
                                </div>
                                <div class="flex-fill">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <h6 class="fw-bold mb-0" style="font-size:0.9rem;">Tes Kesiapan Suami</h6>
                                        <a href="{{ route('tools.test-kesiapan') }}"
                                            class="btn btn-sm btn-outline-warning">
                                            <i class="bx bx-link-external me-1"></i>Buka
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p class="text-muted mb-3" style="font-size:0.82rem;">
                                Kuis interaktif untuk mengukur kesiapan suami dalam mendampingi kehamilan dan persalinan,
                                mencakup 5 aspek penting.
                            </p>
                            <div class="row g-2 mb-3">
                                @php
                                    $aspek = [
                                        ['color' => 'success', 'label' => 'Finansial'],
                                        ['color' => 'info', 'label' => 'Mental & Emosional'],
                                        ['color' => 'primary', 'label' => 'Pengetahuan'],
                                        ['color' => 'warning', 'label' => 'Dukungan Fisik'],
                                        ['color' => 'danger', 'label' => 'Hubungan'],
                                    ];
                                @endphp
                                @foreach ($aspek as $a)
                                    <div class="col-6">
                                        <div class="d-flex align-items-center gap-2 p-2 rounded"
                                        >
                                            <div class="avatar avatar-xs bg-label-{{ $a['color'] }} rounded d-flex align-items-center justify-content-center"
                                                style="width:18px;height:18px;">
                                                <i class="bx bx-check" style="font-size:0.65rem;"></i>
                                            </div>
                                            <span style="font-size:0.78rem;">{{ $a['label'] }}</span>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="alert alert-warning mb-0 py-2 px-3" style="font-size:0.78rem;">
                                <i class="bx bx-bulb me-1"></i>
                                Setiap aspek dilengkapi edukasi dan tips praktis untuk calon ayah.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {{-- ═══════════════════════════════════════════
         SECTION: KELOLA DATA
    ═══════════════════════════════════════════ --}}
        <div class="card border-0 shadow-sm mb-5" style="border-left: 4px solid #696cff !important;">
            <div class="card-body p-4">
                <div class="d-flex align-items-start gap-3">
                    <div
                        class="avatar bg-label-primary rounded d-flex align-items-center justify-content-center shrink-0">
                        <i class="bx bxs-data"></i>
                    </div>
                    <div class="flex-fill">
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                            <h6 class="fw-bold mb-0">Kelola Data (Data Manager)</h6>
                            <a href="{{ route('tools.data') }}" class="btn btn-sm btn-primary">
                                <i class="bx bxs-data me-1"></i>Kelola Data Saya
                            </a>
                        </div>
                        <p class="text-muted mb-3" style="font-size:0.875rem;">
                            Halaman pusat untuk melihat, memantau, dan menghapus semua data yang tersimpan di browser Anda.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {{-- Disclaimer --}}
        <div class="alert alert-warning d-flex align-items-start gap-3" style="border-radius:12px;">
            <i class="bx bx-info-circle mt-1 shrink-0" style="font-size:1.2rem;"></i>
            <div style="font-size:0.85rem;">
                <strong>Catatan Penting:</strong> Semua tools di TentangBidan bersifat <strong>informatif dan
                    edukatif</strong>.
                Hasil perhitungan, prediksi, dan skrining tidak menggantikan pemeriksaan langsung oleh bidan, dokter, atau
                tenaga kesehatan.
                Selalu konsultasikan kondisi kesehatan Anda kepada tenaga medis yang menangani.
            </div>
        </div>

    </section>
@endsection
