@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        <h3>{{ $title }}</h3>
        <p class="text-muted">
            Hitung kebutuhan kalori harian ibu hamil berdasarkan berat badan, tinggi badan, usia, dan aktivitas.
            Menggunakan standar <strong>AKG 2019 Kemenkes RI</strong>.
        </p>

        {{-- SUMMARY DATA --}}
        <div id="summaryBox" class="card p-3 mb-4 d-none">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">Data Kehamilan Anda</h6>
                <button onclick="clearPregnancyData()" class="btn btn-sm btn-outline-danger">
                    <i class="bx bx-trash"></i> Hapus
                </button>
            </div>
            <ul class="mb-0" id="summaryList"></ul>
        </div>

        <div class="row mt-4">
            <div class=" col-md-6">

                <div class="card">
                    <div class="card-body">
                        <div class="mb-3">
                            <label>Berat Badan Sekarang (kg)</label>
                            <input type="number" id="bb" class="form-control" placeholder="Contoh: 58">
                        </div>

                        <div class="mb-3">
                            <label>Tinggi Badan (cm)</label>
                            <input type="number" id="tb" class="form-control" placeholder="Contoh: 158">
                        </div>

                        <div class="mb-3">
                            <label>Usia (tahun)</label>
                            <input type="number" id="umur" class="form-control" placeholder="Contoh: 28">
                        </div>

                        <div class="mb-3">
                            <label>Tingkat Aktivitas</label>
                            <select id="aktivitas" class="form-control">
                                <option value="1.2">Jarang gerak (istirahat di rumah)</option>
                                <option value="1.375">Ringan (jalan kaki ringan, kerja kantor)</option>
                                <option value="1.55" selected>Sedang (aktivitas harian normal)</option>
                                <option value="1.725">Aktif (olahraga rutin)</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label>Trimester</label>
                            <select id="trimester" class="form-control">
                                <option value="1">Trimester 1 (1–13 minggu)</option>
                                <option value="2">Trimester 2 (14–26 minggu)</option>
                                <option value="3">Trimester 3 (27–40 minggu)</option>
                            </select>
                        </div>

                        <button onclick="hitungKalori()" class="btn btn-primary w-100">
                            <i class="bx bx-calculator me-1"></i> Hitung Kebutuhan Kalori
                        </button>

                        <p class="text-muted mt-3" style="font-size: 0.78rem;">
                            <i class="bx bx-info-circle me-1"></i>
                            Hasil ini bersifat estimasi umum. Kondisi khusus seperti penyakit, kehamilan kembar, atau
                            masalah
                            gizi
                            sebaiknya dikonsultasikan ke dokter atau bidan.
                        </p>

                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card p-4 mt-3 mt-md-0" id="hasilBox" style="display:none;">
                    <h5>Kebutuhan Kalori Harian</h5>
                    <h2 id="hasilKalori" class="text-primary mb-0">-</h2>
                    <p id="detailKalori" class="text-muted mt-1 mb-3" style="font-size:0.82rem;"></p>

                    <hr>

                    <h6 class="mb-3">Saran Pembagian Kalori Per Hari</h6>
                    <div id="saranMakanan"></div>
                </div>

                <div class="card p-4 mt-3 mb-3 mt-md-0" id="placeholderBox">
                    <div class="text-center text-muted py-4">
                        <i class="bx bx-bowl-hot" style="font-size: 2.5rem;"></i>
                        <p class="mt-2 mb-0">Isi form dan klik hitung untuk melihat hasil</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    @push('scripts')
        @vite('resources/js/kalori.js')
    @endpush
@endsection
