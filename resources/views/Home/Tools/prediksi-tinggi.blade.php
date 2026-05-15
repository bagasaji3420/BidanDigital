@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- Header --}}
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div>
                <h4 class="fw-bold mb-1">
                    <i class="bx bx-ruler me-2 text-primary"></i>Prediksi Tinggi Badan Anak
                </h4>
                <p class="text-muted mb-0" style="font-size:0.875rem;">
                    Perkiraan tinggi badan anak berdasarkan tinggi ayah dan ibu menggunakan metode <strong>Mid-Parental
                        Height</strong>.
                </p>
            </div>
        </div>

        {{-- Info Banner --}}
        <div class="alert alert-warning d-flex align-items-start gap-3 mb-4" role="alert" style="border-radius:12px;">
            <i class="bx bx-info-circle mt-1 shrink-0" style="font-size:1.2rem;"></i>
            <div style="font-size:0.85rem;">
                <strong>Catatan:</strong> Hasil ini adalah <strong>perkiraan genetik</strong> berdasarkan rumus
                Mid-Parental Height (WHO). Tinggi aktual anak dipengaruhi juga oleh nutrisi, tidur, aktivitas fisik,
                dan faktor lingkungan lainnya. <strong>Rentang normal ±10 cm</strong> dari hasil prediksi.
            </div>
        </div>

        <div class="row g-4">

            {{-- ─── FORM INPUT ─── --}}
            <div class="col-12 col-lg-5">
                <div class="card shadow-sm" style="border-radius:16px;">
                    <div class="card-body p-4">
                        <h6 class="fw-bold mb-4" style="font-size:0.9rem;">
                            <i class="bx bx-user-check me-2 text-primary"></i>Data Orang Tua
                        </h6>

                        {{-- Ayah --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary shrink-0">
                                    <i class="bx bx-male"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.875rem;">Tinggi Ayah</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Dalam satuan sentimeter (cm)</div>
                                </div>
                            </div>
                            <div class="input-group">
                                <input type="number" id="tinggi-ayah" class="form-control" placeholder="cth: 170"
                                    min="140" max="220" style="border-radius:10px 0 0 10px;"
                                    oninput="resetHasil()">
                                <span class="input-group-text"
                                    style="border-radius:0 10px 10px 0; font-size:0.85rem;">cm</span>
                            </div>
                        </div>

                        {{-- Ibu --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-danger shrink-0">
                                    <i class="bx bx-female"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.875rem;">Tinggi Ibu</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Dalam satuan sentimeter (cm)</div>
                                </div>
                            </div>
                            <div class="input-group">
                                <input type="number" id="tinggi-ibu" class="form-control" placeholder="cth: 158"
                                    min="130" max="210" style="border-radius:10px 0 0 10px;"
                                    oninput="resetHasil()">
                                <span class="input-group-text"
                                    style="border-radius:0 10px 10px 0; font-size:0.85rem;">cm</span>
                            </div>
                        </div>

                        {{-- Jenis Kelamin --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-success shrink-0">
                                    <i class="bx bx-child"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.875rem;">Jenis Kelamin Anak</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Pilih salah satu atau keduanya</div>
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button type="button" id="btn-laki" onclick="pilihJK('L')"
                                    class="btn btn-outline-primary fw-bold flex-fill" style="border-radius:10px;">
                                    <i class="bx bx-male me-1"></i>Laki-laki
                                </button>
                                <button type="button" id="btn-perempuan" onclick="pilihJK('P')"
                                    class="btn btn-outline-danger fw-bold flex-fill" style="border-radius:10px;">
                                    <i class="bx bx-female me-1"></i>Perempuan
                                </button>
                                <button type="button" id="btn-keduanya" onclick="pilihJK('LP')"
                                    class="btn btn-outline-success fw-bold flex-fill" style="border-radius:10px;">
                                    <i class="bx bx-group me-1"></i>Keduanya
                                </button>
                            </div>
                        </div>

                        <button class="btn btn-primary w-100 fw-bold" onclick="hitung()" style="border-radius:10px;">
                            <i class="bx bx-calculator me-2"></i>Hitung Prediksi
                        </button>
                        <button class="btn btn-outline-secondary w-100 mt-2" onclick="resetForm()"
                            style="border-radius:10px; font-size:0.85rem;">
                            <i class="bx bx-reset me-1"></i>Reset
                        </button>
                    </div>
                </div>
            </div>

            {{-- ─── HASIL ─── --}}
            <div class="col-12 col-lg-7">

                {{-- Placeholder --}}
                <div id="hasil-placeholder" class="card shadow-sm" style="border-radius:16px;">
                    <div class="card-body p-4 d-flex flex-column align-items-center justify-content-center text-center"
                        style="min-height:320px;">
                        <i class="bx bx-ruler text-muted mb-3" style="font-size:3rem;"></i>
                        <p class="text-muted mb-0" style="font-size:0.9rem;">
                            Masukkan tinggi ayah & ibu,<br>lalu klik <strong>Hitung Prediksi</strong>.
                        </p>
                    </div>
                </div>

                {{-- Hasil --}}
                <div id="hasil-card" class="card shadow-sm" style="border-radius:16px; display:none;">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center gap-2 mb-1">
                            <span
                                class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary shrink-0">
                                <i class="bx bx-ruler"></i>
                            </span>
                            <div>
                                <div class="fw-bold" style="font-size:0.9rem;">Hasil Prediksi Tinggi Anak</div>
                                <div class="text-muted" id="label-ortu" style="font-size:0.72rem;">—</div>
                            </div>
                        </div>

                        <hr class="my-3">

                        {{-- Result boxes --}}
                        <div id="hasil-boxes" class="row g-3 mb-4"></div>

                        {{-- Visual bar --}}
                        <div id="visual-bar-wrap" style="display:none;">
                            <h6 class="fw-bold mb-3"
                                style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.06em; color:#888;">
                                <i class="bx bx-bar-chart-alt-2 me-1"></i>Visualisasi Rentang Tinggi
                            </h6>
                            <div id="visual-bars"></div>
                        </div>

                        {{-- Disclaimer --}}
                        <div class="alert alert-light d-flex align-items-start gap-2 mt-3 mb-0"
                            style="border-radius:10px; font-size:0.78rem;">
                            <i class="bx bx-info-circle text-warning mt-1 shrink-0"></i>
                            <span>Prediksi menggunakan rumus <strong>Mid-Parental Height (WHO)</strong>.
                                Faktor nutrisi, olahraga, kualitas tidur, dan kesehatan umum dapat memengaruhi tinggi aktual
                                anak secara signifikan.</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>{{-- end row --}}

        {{-- Penjelasan Metode --}}
        <div class="card shadow-sm mt-4" style="border-radius:16px;">
            <div class="card-body p-4">
                <h6 class="fw-bold mb-3" style="font-size:0.88rem;">
                    <i class="bx bx-book-open me-2 text-info"></i>Tentang Metode Mid-Parental Height
                </h6>
                <div class="row g-4" style="font-size:0.82rem; color:#555; line-height:1.7;">
                    <div class="col-12 col-md-6">
                        <div class="fw-bold mb-2" style="font-size:0.82rem; color:#333;">Rumus Perhitungan</div>
                        <div class="card" style="border-radius:10px; background:#f8f9fa; border:none;">
                            <div class="card-body p-3">
                                <div class="mb-2">
                                    <span class="badge bg-label-primary me-2">Laki-laki</span>
                                    <code>(Tinggi Ayah + Tinggi Ibu + 13) ÷ 2</code>
                                </div>
                                <div>
                                    <span class="badge bg-label-danger me-2">Perempuan</span>
                                    <code>(Tinggi Ayah + Tinggi Ibu − 13) ÷ 2</code>
                                </div>
                            </div>
                        </div>
                        <p class="mt-2 mb-0 text-muted" style="font-size:0.78rem;">
                            Konstanta <strong>13 cm</strong> merupakan selisih rata-rata tinggi pria dan wanita dewasa
                            secara global.
                        </p>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="fw-bold mb-2" style="font-size:0.82rem; color:#333;">Rentang Normal (±10 cm)</div>
                        <p class="mb-2">Hasil prediksi memiliki rentang <strong>±10 cm</strong> karena tinggi badan juga
                            dipengaruhi oleh:</p>
                        <ul class="mb-0 ps-3" style="font-size:0.8rem;">
                            <li>Kecukupan nutrisi (kalsium, protein, vitamin D)</li>
                            <li>Kualitas dan kuantitas tidur</li>
                            <li>Aktivitas fisik & olahraga rutin</li>
                            <li>Kondisi kesehatan umum & hormon pertumbuhan</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </section>

    @push('scripts')
        @vite('resources/js/prediksi-tinggi.js')
    @endpush
@endsection
