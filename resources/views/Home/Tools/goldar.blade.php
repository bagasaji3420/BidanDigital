@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- Header --}}
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div>
                <h4 class="fw-bold mb-1">
                    <i class="bx bx-droplet me-2 text-danger"></i>Pencocokan Golongan Darah Anak
                </h4>
                <p class="text-muted mb-0" style="font-size:0.875rem;">
                    Perkiraan golongan darah anak berdasarkan genetika sistem ABO dan Rhesus (Rh) dari kedua orang tua.
                </p>
            </div>
        </div>

        {{-- Info Banner --}}
        <div class="alert alert-warning d-flex align-items-start gap-3 mb-4" role="alert" style="border-radius:12px;">
            <i class="bx bx-info-circle mt-1 flex-shrink-0" style="font-size:1.2rem;"></i>
            <div style="font-size:0.85rem;">
                <strong>Catatan:</strong> Hasil ini merupakan <strong>perkiraan genetik</strong> berdasarkan sistem ABO
                dan Rhesus. Golongan darah sesungguhnya hanya dapat dipastikan melalui <strong>tes laboratorium</strong>.
                Data sesi ini <strong>tidak disimpan</strong> ke server manapun.
            </div>
        </div>

        <div class="row g-4">

            {{-- ─── FORM INPUT ─── --}}
            <div class="col-12 col-lg-5">
                <div class="card shadow-sm h-100" style="border-radius:16px;">
                    <div class="card-body p-4">
                        <h6 class="fw-bold mb-4" style="font-size:0.9rem;">
                            <i class="bx bx-user-check me-2 text-primary"></i>Data Orang Tua
                        </h6>

                        {{-- Ayah --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-primary flex-shrink-0">
                                    <i class="bx bx-male"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.875rem;">Golongan Darah Ayah</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Pilih ABO dan Rhesus</div>
                                </div>
                            </div>
                            <div class="d-flex gap-2 flex-wrap mb-2" id="btn-ayah-abo">
                                @foreach (['A', 'B', 'AB', 'O'] as $gd)
                                    <button type="button" class="btn btn-outline-primary btn-goldar fw-bold"
                                        style="min-width:56px; border-radius:10px;" data-group="ayah-abo"
                                        data-val="{{ $gd }}"
                                        onclick="pilihGoldar('ayah-abo', '{{ $gd }}')">
                                        {{ $gd }}
                                    </button>
                                @endforeach
                            </div>
                            <div class="d-flex gap-2" id="btn-ayah-rh">
                                @foreach (['+' => 'Rh+ (Positif)', '-' => 'Rh− (Negatif)'] as $val => $label)
                                    <button type="button" class="btn btn-outline-primary btn-goldar fw-bold flex-fill"
                                        style="border-radius:10px; font-size:0.82rem;" data-group="ayah-rh"
                                        data-val="{{ $val }}"
                                        onclick="pilihGoldar('ayah-rh', '{{ $val }}')">
                                        {{ $label }}
                                    </button>
                                @endforeach
                            </div>
                        </div>

                        {{-- Ibu --}}
                        <div class="mb-4">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span
                                    class="avatar d-flex align-items-center justify-content-center rounded bg-label-danger flex-shrink-0">
                                    <i class="bx bx-female"></i>
                                </span>
                                <div>
                                    <div class="fw-bold" style="font-size:0.875rem;">Golongan Darah Ibu</div>
                                    <div class="text-muted" style="font-size:0.72rem;">Pilih ABO dan Rhesus</div>
                                </div>
                            </div>
                            <div class="d-flex gap-2 flex-wrap mb-2" id="btn-ibu-abo">
                                @foreach (['A', 'B', 'AB', 'O'] as $gd)
                                    <button type="button" class="btn btn-outline-danger btn-goldar fw-bold"
                                        style="min-width:56px; border-radius:10px;" data-group="ibu-abo"
                                        data-val="{{ $gd }}"
                                        onclick="pilihGoldar('ibu-abo', '{{ $gd }}')">
                                        {{ $gd }}
                                    </button>
                                @endforeach
                            </div>
                            <div class="d-flex gap-2" id="btn-ibu-rh">
                                @foreach (['+' => 'Rh+ (Positif)', '-' => 'Rh− (Negatif)'] as $val => $label)
                                    <button type="button" class="btn btn-outline-danger btn-goldar fw-bold flex-fill"
                                        style="border-radius:10px; font-size:0.82rem;" data-group="ibu-rh"
                                        data-val="{{ $val }}"
                                        onclick="pilihGoldar('ibu-rh', '{{ $val }}')">
                                        {{ $label }}
                                    </button>
                                @endforeach
                            </div>
                        </div>

                        <button class="btn btn-primary w-100 fw-bold" onclick="hitung()" style="border-radius:10px;">
                            <i class="bx bx-calculator me-2"></i>Hitung Sekarang
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
                <div id="hasil-placeholder" class="card shadow-sm h-100" style="border-radius:16px;">
                    <div class="card-body p-4 d-flex flex-column align-items-center justify-content-center text-center"
                        style="min-height:300px;">
                        <i class="bx bx-dna text-muted mb-3" style="font-size:3rem;"></i>
                        <p class="text-muted mb-0" style="font-size:0.9rem;">Pilih golongan darah dan Rhesus ayah &
                            ibu,<br>lalu
                            klik <strong>Hitung Sekarang</strong>.</p>
                    </div>
                </div>

                {{-- Hasil --}}
                <div id="hasil-card" class="card shadow-sm" style="border-radius:16px; display:none;">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center gap-2 mb-1">
                            <span
                                class="avatar d-flex align-items-center justify-content-center rounded bg-label-success flex-shrink-0">
                                <i class="bx bx-dna"></i>
                            </span>
                            <div>
                                <div class="fw-bold" style="font-size:0.9rem;">Kemungkinan Golongan Darah Anak</div>
                                <div class="text-muted" id="label-pasangan" style="font-size:0.72rem;">—</div>
                            </div>
                        </div>

                        <hr class="my-3">

                        {{-- Pills ABO --}}
                        <div class="fw-bold mb-2"
                            style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.06em; color:#888;">
                            <i class="bx bx-droplet me-1"></i>Sistem ABO
                        </div>
                        <div id="hasil-pills-abo" class="d-flex flex-wrap gap-3 mb-4"></div>

                        {{-- Pills Rhesus --}}
                        <div class="fw-bold mb-2"
                            style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.06em; color:#888;">
                            <i class="bx bx-plus-circle me-1"></i>Sistem Rhesus
                        </div>
                        <div id="hasil-pills-rh" class="d-flex flex-wrap gap-3 mb-4"></div>

                        {{-- Kombinasi Lengkap --}}
                        <div class="fw-bold mb-2"
                            style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.06em; color:#888;">
                            <i class="bx bx-list-ul me-1"></i>Kombinasi Lengkap Anak
                        </div>
                        <div id="hasil-kombinasi" class="d-flex flex-wrap gap-2 mb-4"></div>

                        {{-- Tabel ABO --}}
                        <h6 class="fw-bold mb-2"
                            style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.06em; color:#888;">
                            <i class="bx bx-table me-1"></i>Rincian Genetik ABO
                        </h6>
                        <div class="table-responsive mb-3">
                            <table class="table table-sm table-bordered mb-0"
                                style="font-size:0.8rem; border-radius:10px; overflow:hidden;">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center">Goldar</th>
                                        <th class="text-center">Kombinasi Alel</th>
                                        <th class="text-center">Peluang</th>
                                        <th class="text-center">Mungkin?</th>
                                    </tr>
                                </thead>
                                <tbody id="tabel-body-abo"></tbody>
                            </table>
                        </div>

                        {{-- Tabel Rhesus --}}
                        <h6 class="fw-bold mb-2"
                            style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.06em; color:#888;">
                            <i class="bx bx-table me-1"></i>Rincian Genetik Rhesus
                        </h6>
                        <div class="table-responsive mb-3">
                            <table class="table table-sm table-bordered mb-0"
                                style="font-size:0.8rem; border-radius:10px; overflow:hidden;">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center">Rhesus</th>
                                        <th class="text-center">Kombinasi Alel</th>
                                        <th class="text-center">Peluang</th>
                                        <th class="text-center">Mungkin?</th>
                                    </tr>
                                </thead>
                                <tbody id="tabel-body-rh"></tbody>
                            </table>
                        </div>

                        {{-- Warning inkompatibilitas Rh --}}
                        <div id="warning-rh" class="alert alert-danger d-flex align-items-start gap-2 mb-3"
                            style="border-radius:10px; font-size:0.78rem; display:none !important;">
                            <i class="bx bx-error mt-1 flex-shrink-0"></i>
                            <span><strong>Perhatian:</strong> Ibu Rh<strong>−</strong> dengan ayah Rh<strong>+</strong>
                                berisiko mengalami <strong>inkompatibilitas Rhesus</strong>. Jika anak mewarisi Rh+,
                                dapat terjadi sensitisasi pada kehamilan berikutnya. Konsultasikan dengan dokter
                                kandungan.</span>
                        </div>

                        {{-- Catatan kaki --}}
                        <div class="alert alert-light d-flex align-items-start gap-2 mb-0"
                            style="border-radius:10px; font-size:0.78rem;">
                            <i class="bx bx-info-circle text-warning mt-1 flex-shrink-0"></i>
                            <span>Perhitungan berdasarkan <strong>hukum Mendel</strong>. Sistem ABO dan Rhesus diwariskan
                                secara <strong>independen</strong>. Hasil ini bersifat perkiraan — golongan darah aktual
                                hanya dapat diketahui melalui pemeriksaan laboratorium.</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>{{-- end row --}}

        {{-- Penjelasan ABO & Rh --}}
        <div class="card shadow-sm mt-4" style="border-radius:16px;">
            <div class="card-body p-4">
                <h6 class="fw-bold mb-3" style="font-size:0.88rem;">
                    <i class="bx bx-book-open me-2 text-info"></i>Tentang Sistem Golongan Darah ABO & Rhesus
                </h6>
                <div class="row g-4" style="font-size:0.82rem; color:#555; line-height:1.7;">
                    <div class="col-12 col-md-6">
                        <div class="fw-bold mb-2" style="font-size:0.82rem; color:#333;">Sistem ABO</div>
                        <p class="mb-2">Diwariskan melalui <strong>alel kodominan</strong>:
                            <code>I<sup>A</sup></code>, <code>I<sup>B</sup></code>, dan <code>i</code>.
                        </p>
                        <div class="table-responsive">
                            <table class="table table-sm table-bordered mb-0" style="font-size:0.78rem;">
                                <thead class="table-light">
                                    <tr>
                                        <th>Goldar</th>
                                        <th>Genotip</th>
                                        <th>Sifat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span class="badge bg-label-primary">A</span></td>
                                        <td><code>I<sup>A</sup>I<sup>A</sup></code> / <code>I<sup>A</sup>i</code></td>
                                        <td>Dominan</td>
                                    </tr>
                                    <tr>
                                        <td><span class="badge bg-label-success">B</span></td>
                                        <td><code>I<sup>B</sup>I<sup>B</sup></code> / <code>I<sup>B</sup>i</code></td>
                                        <td>Dominan</td>
                                    </tr>
                                    <tr>
                                        <td><span class="badge bg-label-danger">AB</span></td>
                                        <td><code>I<sup>A</sup>I<sup>B</sup></code></td>
                                        <td>Kodominan</td>
                                    </tr>
                                    <tr>
                                        <td><span class="badge bg-label-secondary">O</span></td>
                                        <td><code>ii</code></td>
                                        <td>Resesif</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="fw-bold mb-2" style="font-size:0.82rem; color:#333;">Sistem Rhesus (Rh)</div>
                        <p class="mb-2">Dikendalikan oleh gen <strong>RHD</strong>. Rh+ bersifat
                            <strong>dominan</strong>,
                            Rh− bersifat <strong>resesif</strong>.</p>
                        <div class="table-responsive">
                            <table class="table table-sm table-bordered mb-0" style="font-size:0.78rem;">
                                <thead class="table-light">
                                    <tr>
                                        <th>Rhesus</th>
                                        <th>Genotip</th>
                                        <th>Sifat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span class="badge bg-label-success">Rh+</span></td>
                                        <td><code>RR</code> atau <code>Rr</code></td>
                                        <td>Dominan</td>
                                    </tr>
                                    <tr>
                                        <td><span class="badge bg-label-secondary">Rh−</span></td>
                                        <td><code>rr</code></td>
                                        <td>Resesif</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="alert alert-warning mt-2 mb-0 p-2" style="border-radius:8px; font-size:0.75rem;">
                            <i class="bx bx-error-circle me-1"></i>
                            <strong>Inkompatibilitas Rh:</strong> Ibu Rh− dengan janin Rh+ dapat memicu pembentukan
                            antibodi yang berbahaya pada kehamilan berikutnya.
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

    @push('scripts')
        @vite('resources/js/goldar.js')
    @endpush

@endsection
