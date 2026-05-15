@extends('Home.Layouts.app')

@section('content')
    <section>

        {{-- Header --}}
        <div class="text-center mb-5">
            <h3 class="fw-bold mb-2">Tools KIA Digital</h3>
            <p class="text-muted" style="font-size:0.9rem;">Semua alat bantu kesehatan ibu & anak dalam satu tempat</p>
        </div>

        {{-- ─── KALKULATOR & PERKIRAAN ─────────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-calculator me-1 text-primary"></i> Utama
        </h6>
        <div class="row g-3 mb-5">

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('article.index') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/artikel.webp" class="tool-icon mb-3" alt="HPL">
                            <div class="fw-semibold" style="font-size:0.85rem;">Artikel</div>
                            <div class="text-muted" style="font-size:0.72rem;">Kumpulan Artikel</div>
                        </div>
                    </div>
                </a>
            </div>
            
            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.panduan') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/panduan.webp" class="tool-icon mb-3" alt="HPL">
                            <div class="fw-semibold" style="font-size:0.85rem;">Panduan</div>
                            <div class="text-muted" style="font-size:0.72rem;">Dokumentasi pengunaan Tools</div>
                        </div>
                    </div>
                </a>
            </div>
            
            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('wilayah.peta') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/peta.webp" class="tool-icon mb-3" alt="HPL">
                            <div class="fw-semibold" style="font-size:0.85rem;">Peta Kesehatan</div>
                            <div class="text-muted" style="font-size:0.72rem;">Informasi Kesehatan Indonesia</div>
                        </div>
                    </div>
                </a>
            </div>
            
            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.data') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/database.webp" class="tool-icon mb-3" alt="HPL">
                            <div class="fw-semibold" style="font-size:0.85rem;">Database</div>
                            <div class="text-muted" style="font-size:0.72rem;">Penyimpanan Lokal</div>
                        </div>
                    </div>
                </a>
            </div>

        

        </div>
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-calculator me-1 text-primary"></i> Kalkulator & Perkiraan
        </h6>
        <div class="row g-3 mb-5">

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.hpl') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/hpl.webp" class="tool-icon mb-3" alt="HPL">
                            <div class="fw-semibold" style="font-size:0.85rem;">Kalkulator HPL</div>
                            <div class="text-muted" style="font-size:0.72rem;">Hari Perkiraan Lahir</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.kebutuhan-kalori') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/kalori.webp" class="tool-icon mb-3" alt="Kalori">
                            <div class="fw-semibold" style="font-size:0.85rem;">Kebutuhan Kalori</div>
                            <div class="text-muted" style="font-size:0.72rem;">Nutrisi ibu hamil</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.goldar') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/goldar.webp" class="tool-icon mb-3" alt="Goldar">
                            <div class="fw-semibold" style="font-size:0.85rem;">Golongan Darah Anak</div>
                            <div class="text-muted" style="font-size:0.72rem;">Prediksi goldar bayi</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.tinggi') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/tinggi-bayi.webp" class="tool-icon mb-3" alt="Tinggi">
                            <div class="fw-semibold" style="font-size:0.85rem;">Tinggi Anak</div>
                            <div class="text-muted" style="font-size:0.72rem;">Prediksi tinggi badan</div>
                        </div>
                    </div>
                </a>
            </div>

        </div>

        {{-- ─── TRACKER ────────────────────────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-pulse me-1 text-success"></i> Tracker
        </h6>
        <div class="row g-3 mb-5">

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.kalender-haid') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/kalender-haid.webp" class="tool-icon mb-3" alt="Kalender Haid">
                            <div class="fw-semibold" style="font-size:0.85rem;">Kalender Haid</div>
                            <div class="text-muted" style="font-size:0.72rem;">Siklus & prediksi haid</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.kick-counter') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/kick-tracker.webp" class="tool-icon mb-3" alt="Kick Counter">
                            <div class="fw-semibold" style="font-size:0.85rem;">Kick Counter</div>
                            <div class="text-muted" style="font-size:0.72rem;">Gerak janin harian</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.kontraksi') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/kontraksi.webp" class="tool-icon mb-3" alt="Kontraksi">
                            <div class="fw-semibold" style="font-size:0.85rem;">Tracker Kontraksi</div>
                            <div class="text-muted" style="font-size:0.72rem;">Pantau pola kontraksi</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.menyusui') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/menyusui.webp" class="tool-icon mb-3" alt="Menyusui">
                            <div class="fw-semibold" style="font-size:0.85rem;">Tracker Menyusui</div>
                            <div class="text-muted" style="font-size:0.72rem;">Sesi menyusui harian</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.berat-badan') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/berat-badan.webp" class="tool-icon mb-3" alt="Berat Badan">
                            <div class="fw-semibold" style="font-size:0.85rem;">Tracker Berat Badan</div>
                            <div class="text-muted" style="font-size:0.72rem;">Kenaikan BB ibu hamil</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.tekanan-darah') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/tekanan-darah.webp" class="tool-icon mb-3" alt="Tekanan Darah">
                            <div class="fw-semibold" style="font-size:0.85rem;">Tracker Tekanan Darah</div>
                            <div class="text-muted" style="font-size:0.72rem;">Pantau TD ibu hamil</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.anemia') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/anemia.webp" class="tool-icon mb-3" alt="Anemia">
                            <div class="fw-semibold" style="font-size:0.85rem;">Tracker Anemia</div>
                            <div class="text-muted" style="font-size:0.72rem;">Tablet Fe & kadar Hb</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.pertumbuhan-bayi') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/pertumbuhan-bayi.webp" class="tool-icon mb-3"
                                alt="Pertumbuhan Bayi">
                            <div class="fw-semibold" style="font-size:0.85rem;">Grafik Pertumbuhan Bayi</div>
                            <div class="text-muted" style="font-size:0.72rem;">BB/PB standar WHO</div>
                        </div>
                    </div>
                </a>
            </div>

        </div>

        {{-- ─── SKRINING & JADWAL ──────────────────────────────────── --}}
        <h6 class="text-uppercase fw-bold text-muted mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">
            <i class="bx bx-shield-quarter me-1 text-warning"></i> Skrining & Jadwal
        </h6>
        <div class="row g-3 mb-5">

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.skrining-preeklampsia') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/preeklamsia.webp" class="tool-icon mb-3" alt="Preeklampsia">
                            <div class="fw-semibold" style="font-size:0.85rem;">Skrining Preeklampsia</div>
                            <div class="text-muted" style="font-size:0.72rem;">Deteksi risiko dini</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.epds') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/epds.webp" class="tool-icon mb-3" alt="EPDS">
                            <div class="fw-semibold" style="font-size:0.85rem;">Skrining Baby Blues (EPDS)</div>
                            <div class="text-muted" style="font-size:0.72rem;">Depresi pasca melahirkan</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.jadwal-imunisasi') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/imunisasi.webp" class="tool-icon mb-3" alt="Imunisasi">
                            <div class="fw-semibold" style="font-size:0.85rem;">Jadwal Imunisasi Bayi</div>
                            <div class="text-muted" style="font-size:0.72rem;">Kemenkes RI 2023</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.jadwal-anc') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/jadwal-anc.webp" class="tool-icon mb-3" alt="ANC">
                            <div class="fw-semibold" style="font-size:0.85rem;">Jadwal ANC</div>
                            <div class="text-muted" style="font-size:0.72rem;">Kunjungan periksa hamil</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.jadwal-nifas') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/jadwal-nifas.webp" class="tool-icon mb-3" alt="Nifas">
                            <div class="fw-semibold" style="font-size:0.85rem;">Jadwal Nifas</div>
                            <div class="text-muted" style="font-size:0.72rem;">Kunjungan pasca salin</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.checklist-persalinan') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/checklist-persalinan.webp" class="tool-icon mb-3" alt="Checklist">
                            <div class="fw-semibold" style="font-size:0.85rem;">Checklist Persalinan</div>
                            <div class="text-muted" style="font-size:0.72rem;">Persiapan bersalin</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-6 col-md-4 col-lg-3">
                <a href="{{ route('tools.test-kesiapan') }}" class="text-decoration-none">
                    <div class="card shadow-sm h-100 tool-card">
                        <div class="card-body p-3 text-center">
                            <img src="/assets/img/icons/test-kesiapan.webp" class="tool-icon mb-3" alt="Kesiapan Hamil">
                            <div class="fw-semibold" style="font-size:0.85rem;">Kesiapan Hamil</div>
                            <div class="text-muted" style="font-size:0.72rem;">Tes kesiapan pasangan</div>
                        </div>
                    </div>
                </a>
            </div>

        </div>

    </section>

    <style>
        .tool-card {
            border-radius: 16px;
            border: 1px solid #f0f0f0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
        }

        .tool-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10) !important;
        }

        .tool-icon {
            width: 64px;
            height: 64px;
            object-fit: contain;
        }
    </style>
@endsection
