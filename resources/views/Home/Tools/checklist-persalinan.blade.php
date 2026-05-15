@extends('Home.Layouts.app')

@section('content')
    <section >
        @include('Home.Layouts.toolsbread')

        {{-- Header --}}
        <div class="row mb-4">
            <div class="col-12">
                <div class="card shadow-sm border-0">
                    <div class="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="avatar d-flex align-items-center justify-content-center avatar-lg bg-label-danger rounded">
                                <i class="bx bx-child fs-4"></i>
                            </div>
                            <div>
                                <h5 class="mb-0 fw-bold">Checklist Persiapan Persalinan</h5>
                                <small class="text-muted">Berdasarkan panduan Kemenkes RI & WHO</small>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge bg-label-primary fs-6 px-3 py-2" id="progressBadge">0 / 0 selesai</span>
                            <button class="btn btn-sm btn-outline-danger" onclick="clearChecklist()">
                                <i class="bx bx-trash me-1"></i> Clear Semua
                            </button>
                        </div>
                    </div>
                    {{-- Progress Bar --}}
                    <div class="px-4 pb-3">
                        <div class="progress" style="height: 8px; border-radius: 10px;">
                            <div class="progress-bar bg-danger" id="progressBar" role="progressbar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">

            {{-- Kolom Kiri --}}
            <div class="col-12 col-lg-6">

                {{-- 1. Dokumen & Administrasi --}}
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header border-0 pb-0">
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar d-flex align-items-center justify-content-center avatar-sm bg-label-primary rounded">
                                <i class="bx bx-file"></i>
                            </span>
                            <h6 class="mb-0 fw-bold">Dokumen & Administrasi</h6>
                        </div>
                    </div>
                    <div class="card-body pt-2">
                        @php
                            $dokumen = [
                                ['id' => 'doc1', 'label' => 'KTP, Kartu Keluarga, Buku KIA'],
                                ['id' => 'doc2', 'label' => 'Kartu BPJS / asuransi kesehatan'],
                                ['id' => 'doc3', 'label' => 'Buku rekam medis / riwayat ANC'],
                                ['id' => 'doc4', 'label' => 'Uang tunai cadangan'],
                                ['id' => 'doc5', 'label' => 'Surat rujukan (jika ada)'],
                                ['id' => 'doc6', 'label' => 'Fotokopi semua dokumen penting'],
                            ];
                        @endphp
                        @foreach ($dokumen as $item)
                            <div class="form-check mb-2">
                                <input class="form-check-input checklist-item" type="checkbox" id="{{ $item['id'] }}"
                                    data-id="{{ $item['id'] }}" onchange="saveItem('{{ $item['id'] }}', this.checked)">
                                <label class="form-check-label" for="{{ $item['id'] }}">
                                    {{ $item['label'] }}
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- 2. Perlengkapan Ibu --}}
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header border-0 pb-0">
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar d-flex align-items-center justify-content-center avatar-sm bg-label-warning rounded">
                                <i class="bx bx-body"></i>
                            </span>
                            <h6 class="mb-0 fw-bold">Perlengkapan Ibu — Selama di RS/Bidan</h6>
                        </div>
                    </div>
                    <div class="card-body pt-2">
                        @php
                            $ibu = [
                                ['id' => 'ibu1', 'label' => 'Baju ganti 3–4 set (berkancing depan untuk menyusui)'],
                                ['id' => 'ibu2', 'label' => 'Kain jarik / sarung'],
                                ['id' => 'ibu3', 'label' => 'Pembalut nifas (maternity pad)'],
                                ['id' => 'ibu4', 'label' => 'Korset / gurita pasca melahirkan'],
                                ['id' => 'ibu5', 'label' => 'Perlengkapan mandi (sabun, sampo, sikat gigi)'],
                                ['id' => 'ibu6', 'label' => 'Sendal jepit'],
                                ['id' => 'ibu7', 'label' => 'Makanan & minuman ringan untuk tenaga saat persalinan'],
                                ['id' => 'ibu8', 'label' => 'Bantal menyusui'],
                                ['id' => 'ibu9', 'label' => 'Nipple cream'],
                            ];
                        @endphp
                        @foreach ($ibu as $item)
                            <div class="form-check mb-2">
                                <input class="form-check-input checklist-item" type="checkbox" id="{{ $item['id'] }}"
                                    data-id="{{ $item['id'] }}" onchange="saveItem('{{ $item['id'] }}', this.checked)">
                                <label class="form-check-label" for="{{ $item['id'] }}">
                                    {{ $item['label'] }}
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- 3. Perlengkapan Bayi --}}
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header border-0 pb-0">
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar d-flex align-items-center justify-content-center avatar-sm bg-label-success rounded">
                                <i class="bx bx-child"></i>
                            </span>
                            <h6 class="mb-0 fw-bold">Perlengkapan Bayi — Pulang dari RS</h6>
                        </div>
                    </div>
                    <div class="card-body pt-2">
                        @php
                            $bayi = [
                                ['id' => 'bay1', 'label' => 'Baju bayi 3–5 set (lengan panjang)'],
                                ['id' => 'bay2', 'label' => 'Popok bayi / diapers newborn'],
                                ['id' => 'bay3', 'label' => 'Bedong / selimut bayi 2–3 lembar'],
                                ['id' => 'bay4', 'label' => 'Topi bayi & kaos kaki'],
                                ['id' => 'bay5', 'label' => 'Sabun & sampo bayi'],
                                ['id' => 'bay6', 'label' => 'Minyak telon'],
                                ['id' => 'bay7', 'label' => 'Perlengkapan tali pusat (kasa steril, alkohol 70%)'],
                                ['id' => 'bay8', 'label' => 'Car seat (jika pulang naik mobil)'],
                            ];
                        @endphp
                        @foreach ($bayi as $item)
                            <div class="form-check mb-2">
                                <input class="form-check-input checklist-item" type="checkbox" id="{{ $item['id'] }}"
                                    data-id="{{ $item['id'] }}"
                                    onchange="saveItem('{{ $item['id'] }}', this.checked)">
                                <label class="form-check-label" for="{{ $item['id'] }}">
                                    {{ $item['label'] }}
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>

            </div>

            {{-- Kolom Kanan --}}
            <div class="col-12 col-lg-6">

                {{-- 4. Persiapan di Rumah --}}
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header border-0 pb-0">
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar d-flex align-items-center justify-content-center avatar-sm bg-label-info rounded">
                                <i class="bx bx-home-heart"></i>
                            </span>
                            <h6 class="mb-0 fw-bold">Persiapan di Rumah</h6>
                        </div>
                    </div>
                    <div class="card-body pt-2">
                        @php
                            $rumah = [
                                ['id' => 'rum1', 'label' => 'Tempat tidur / kasur bayi'],
                                ['id' => 'rum2', 'label' => 'Baby monitor (opsional)'],
                                ['id' => 'rum3', 'label' => 'Pompa ASI & botol ASIP'],
                                ['id' => 'rum4', 'label' => 'Termometer bayi'],
                                ['id' => 'rum5', 'label' => 'Nasal aspirator (penyedot ingus)'],
                                ['id' => 'rum6', 'label' => 'Paracetamol drops bayi'],
                                ['id' => 'rum7', 'label' => 'Salep ruam popok'],
                            ];
                        @endphp
                        @foreach ($rumah as $item)
                            <div class="form-check mb-2">
                                <input class="form-check-input checklist-item" type="checkbox" id="{{ $item['id'] }}"
                                    data-id="{{ $item['id'] }}"
                                    onchange="saveItem('{{ $item['id'] }}', this.checked)">
                                <label class="form-check-label" for="{{ $item['id'] }}">
                                    {{ $item['label'] }}
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- 5. Persiapan Persalinan P4K --}}
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header border-0 pb-0">
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar d-flex align-items-center justify-content-center avatar-sm bg-label-secondary rounded">
                                <i class="bx bx-clipboard"></i>
                            </span>
                            <h6 class="mb-0 fw-bold">Persiapan Persalinan — Program P4K Kemenkes RI</h6>
                        </div>
                    </div>
                    <div class="card-body pt-2">
                        @php
                            $p4k = [
                                ['id' => 'p4k1', 'label' => 'Sudah tentukan tempat bersalin'],
                                ['id' => 'p4k2', 'label' => 'Sudah tentukan penolong persalinan (dokter/bidan)'],
                                ['id' => 'p4k3', 'label' => 'Sudah siapkan transportasi darurat'],
                                ['id' => 'p4k4', 'label' => 'Sudah siapkan donor darah (golongan darah sama)'],
                                ['id' => 'p4k5', 'label' => 'Sudah siapkan dana darurat'],
                                ['id' => 'p4k6', 'label' => 'Nomor kontak bidan/dokter tersimpan'],
                                ['id' => 'p4k7', 'label' => 'Sudah tentukan pendamping persalinan'],
                            ];
                        @endphp
                        @foreach ($p4k as $item)
                            <div class="form-check mb-2">
                                <input class="form-check-input checklist-item" type="checkbox" id="{{ $item['id'] }}"
                                    data-id="{{ $item['id'] }}"
                                    onchange="saveItem('{{ $item['id'] }}', this.checked)">
                                <label class="form-check-label" for="{{ $item['id'] }}">
                                    {{ $item['label'] }}
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- 6. Tanda Bahaya --}}
                <div class="card border-0 mb-4"
                    style="background-color: #fff5f5; border-left: 4px solid #ea5455 !important; border-left-width: 4px !important;">
                    <div class="card-header border-0 pb-0" style="background: transparent;">
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar d-flex align-items-center justify-content-center avatar-sm bg-danger rounded">
                                <i class="bx bx-error text-white"></i>
                            </span>
                            <h6 class="mb-0 fw-bold text-danger">Tanda Bahaya — Segera ke RS jika:</h6>
                        </div>
                    </div>
                    <div class="card-body pt-2">
                        @php
                            $bahaya = [
                                'Kontraksi teratur tiap 5 menit',
                                'Ketuban pecah',
                                'Perdarahan',
                                'Gerakan bayi berkurang drastis',
                                'Pusing hebat / pandangan kabur',
                            ];
                        @endphp
                        <ul class="list-unstyled mb-0">
                            @foreach ($bahaya as $b)
                                <li class="d-flex align-items-center gap-2 mb-2">
                                    <i class="bx bx-radio-circle-marked text-danger"></i>
                                    <span class="text-danger">{{ $b }}</span>
                                </li>
                            @endforeach
                        </ul>
                        <div class="mt-3 p-2 rounded" style="background: #ea5455; color: white;">
                            <small><i class="bx bx-phone me-1"></i> <strong>Hotline BPJS:</strong> 1500 400 &nbsp;|&nbsp;
                                <strong>IGD:</strong> 119</small>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    @push('scripts')
        @vite('resources/js/checklist-persalinan.js')
    @endpush
@endsection
