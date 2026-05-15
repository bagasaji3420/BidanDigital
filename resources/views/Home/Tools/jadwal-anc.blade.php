@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- STATE: belum ada HPL --}}
        <div id="stateEmpty" style="display:none;">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm text-center py-5">
                        <div class="card-body">
                            <div class="avatar avatar-xl bg-label-warning rounded mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style="width:72px;height:72px;">
                                <i class="bx bx-calendar-x" style="font-size:2rem;"></i>
                            </div>
                            <h5 class="fw-bold mb-2">Data HPL Belum Ada</h5>
                            <p class="text-muted mb-4">Kamu belum menghitung HPL. Hitung dulu yuk biar jadwal ANC bisa
                                ditampilkan otomatis.</p>
                            <a href="/tools/hpl" class="btn btn-primary">
                                <i class="bx bx-calculator me-1"></i> Hitung HPL Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- STATE: ada HPL --}}
        <div id="stateContent" style="display:none;">

            {{-- Header --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow-sm border-0">
                        <div class="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div
                                    class="avatar avatar-lg bg-label-danger rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-calendar-heart fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0 fw-bold">Jadwal ANC</h5>
                                    <small class="text-muted">Antenatal Care — berdasarkan HPHT kamu</small>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap align-items-center gap-2">
                                <span class="badge bg-label-info fs-6 px-3 py-2">
                                    <i class="bx bx-calendar me-1"></i>
                                    HPL: <span id="displayHPL" class="fw-bold ms-1">-</span>
                                </span>
                                <span class="badge bg-label-success fs-6 px-3 py-2">
                                    Minggu ke-<span id="displayWeek" class="fw-bold">-</span>
                                </span>
                            </div>
                        </div>

                        {{-- Progress --}}
                        <div class="px-4 pb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small class="text-muted">Progress kehamilan</small>
                                <small class="text-muted"><span id="progressPct">0</span>%</small>
                            </div>
                            <div class="progress" style="height: 8px; border-radius: 10px;">
                                <div class="progress-bar bg-danger" id="progressBar" role="progressbar" style="width:0%">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Keterangan ANC Kemenkes --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="alert border-0 mb-0 d-flex gap-2 align-items-start" style="background:#f0f9ff;">
                        <i class="bx bx-info-circle text-info mt-1"></i>
                        <div>
                            <strong>Standar Kemenkes RI:</strong> minimal <strong>6x kunjungan ANC</strong> selama
                            kehamilan.
                            WHO merekomendasikan <strong>8x kunjungan</strong>. Jadwal di bawah mengikuti panduan klinis
                            standar.
                        </div>
                    </div>
                </div>
            </div>

            {{-- Jadwal ANC Cards --}}
            <div class="row g-3" id="ancContainer"></div>

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
                                <h6 class="mb-0 fw-bold text-danger">Tanda Bahaya — Segera ke RS jika:</h6>
                            </div>
                        </div>
                        <div class="card-body pt-2">
                            <div class="row g-2">
                                @php
                                    $bahaya = [
                                        'Kontraksi teratur tiap 5 menit',
                                        'Ketuban pecah',
                                        'Perdarahan',
                                        'Gerakan bayi berkurang drastis',
                                        'Pusing hebat / pandangan kabur',
                                    ];
                                @endphp
                                @foreach ($bahaya as $b)
                                    <div class="col-12 col-md-6">
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="bx bx-radio-circle-marked text-danger"></i>
                                            <span class="text-danger">{{ $b }}</span>
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
        @vite('resources/js/jadwal-anc.js')
    @endpush
@endsection
