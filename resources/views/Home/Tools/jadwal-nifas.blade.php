@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- STATE: Form Input --}}
        <div id="stateForm" class="mb-4">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-lg-5">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <div
                                    class="avatar avatar-lg bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-calendar-check fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-0">Jadwal Kunjungan Nifas</h5>
                                    <small class="text-muted">Masukkan tanggal persalinan kamu</small>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-semibold">Tanggal Melahirkan <span
                                        class="text-danger">*</span></label>
                                <input type="date" class="form-control" id="inputTanggalLahir" max="">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-semibold">Jenis Persalinan <span
                                        class="text-danger">*</span></label>
                                <div class="d-flex gap-2">
                                    <div class="flex-fill">
                                        <input type="radio" class="btn-check" name="jenisLahir" id="radioNormal"
                                            value="normal" checked>
                                        <label class="btn btn-outline-primary w-100" for="radioNormal">
                                            <i class="bx bx-heart me-1"></i> Normal / Pervaginam
                                        </label>
                                    </div>
                                    <div class="flex-fill">
                                        <input type="radio" class="btn-check" name="jenisLahir" id="radioSC"
                                            value="sc">
                                        <label class="btn btn-outline-warning w-100" for="radioSC">
                                            <i class="bx bx-plus-medical me-1"></i> Sesar (SC)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label fw-semibold">Berat Lahir Bayi <span
                                        class="text-muted fw-normal">(opsional)</span></label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="inputBeratLahir" placeholder="cth: 3200"
                                        min="500" max="6000">
                                    <span class="input-group-text">gram</span>
                                </div>
                            </div>

                            <button class="btn btn-primary w-100" onclick="simpanNifas()">
                                <i class="bx bx-save me-1"></i> Simpan & Lihat Jadwal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- STATE: Jadwal --}}
        <div id="stateContent" style="display:none;">

            {{-- Header --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow-sm border-0">
                        <div class="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div
                                    class="avatar avatar-lg bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-child fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0 fw-bold">Jadwal Kunjungan Nifas</h5>
                                    <small class="text-muted">4 kunjungan dalam 42 hari — Standar Kemenkes RI</small>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap align-items-center gap-2">
                                <span class="badge bg-label-danger fs-6 px-3 py-2">
                                    <i class="bx bx-calendar me-1"></i>
                                    Lahir: <span id="displayTanggalLahir" class="fw-bold ms-1">-</span>
                                </span>
                                <span class="badge bg-label-info fs-6 px-3 py-2" id="badgeHariKe">Hari ke-0</span>
                                <button class="btn btn-sm btn-outline-secondary" onclick="resetNifas()">
                                    <i class="bx bx-edit me-1"></i> Ubah Data
                                </button>
                            </div>
                        </div>

                        {{-- Progress --}}
                        <div class="px-4 pb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small class="text-muted">Masa nifas (0–42 hari)</small>
                                <small class="text-muted">Hari ke-<span id="progressHari">0</span> / 42</small>
                            </div>
                            <div class="progress" style="height:8px;border-radius:10px;">
                                <div class="progress-bar bg-danger" id="progressBar" style="width:0%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Info jenis persalinan --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div id="infoJenis" class="alert border-0 d-flex gap-2 align-items-start mb-0"></div>
                </div>
            </div>

            {{-- Kartu KF --}}
            <div class="row g-3" id="kfContainer"></div>

            {{-- Selesai masa nifas --}}
            <div id="selesaiNifas" class="row mt-4" style="display:none!important;">
                <div class="col-12">
                    <div class="card border-0 shadow-sm text-center py-4"
                        style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
                        <div class="card-body">
                            <div class="avatar avatar-xl bg-success rounded mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style="width:72px;height:72px;">
                                <i class="bx bx-trophy text-white" style="font-size:2rem;"></i>
                            </div>
                            <h5 class="fw-bold text-success mb-2">Masa Nifas Selesai! 🎉</h5>
                            <p class="text-muted mb-0">Kamu telah melewati 42 hari masa nifas. Jangan lupa kontrol KB pasca
                                salin dan tetap pantau kesehatan bersama dokter/bidan.</p>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Tanda Bahaya --}}
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card border-0 mb-0" style="background:#fff5f5;">
                        <div class="card-header border-0 pb-0" style="background:transparent;">
                            <div class="d-flex align-items-center gap-2">
                                <span
                                    class="avatar avatar-sm bg-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-error text-white"></i>
                                </span>
                                <h6 class="mb-0 fw-bold text-danger">Tanda Bahaya Nifas — Segera ke RS:</h6>
                            </div>
                        </div>
                        <div class="card-body pt-2">
                            <div class="row g-2">
                                @php
                                    $bahaya = [
                                        'Perdarahan hebat (ganti pembalut >1 jam)',
                                        'Demam > 38°C lebih dari 2 hari',
                                        'Nyeri perut hebat',
                                        'Luka jahitan merah, bengkak, atau bernanah',
                                        'Nyeri & bengkak pada payudara (mastitis)',
                                        'Sedih berlebihan / tidak mau merawat bayi (baby blues berat)',
                                    ];
                                @endphp
                                @foreach ($bahaya as $b)
                                    <div class="col-12 col-md-6">
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="bx bx-radio-circle-marked text-danger"></i>
                                            <span class="text-danger"
                                                style="font-size:0.875rem;">{{ $b }}</span>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="mt-3 p-2 rounded" style="background:#ea5455;color:white;">
                                <small>
                                    <i class="bx bx-phone me-1"></i>
                                    <strong>Hotline BPJS:</strong> 1500 400
                                    &nbsp;|&nbsp;
                                    <strong>IGD:</strong> 119
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
    @push('scripts')
        @vite('resources/js/jadwal-nifas.js')
    @endpush
@endsection
