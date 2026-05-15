@extends('Home.Layouts.app')

@section('content')
    <section>
        @include('Home.Layouts.toolsbread')

        {{-- DISCLAIMER --}}
        <div class="alert alert-warning d-flex align-items-start gap-3 mb-4 rounded-3" role="alert">
            <i class="bx bx-info-circle mt-1 flex-shrink-0 text-warning" style="font-size:1.2rem;"></i>
            <div style="font-size:0.85rem;">
                <strong>Disclaimer:</strong> Kuesioner ini bukan alat diagnostik medis. Hanya sebagai
                <strong>self-reflection tool</strong> untuk pasangan yang merencanakan kehamilan.
                Hasil tidak menggantikan konsultasi dengan <strong>dokter, bidan, atau konselor pernikahan</strong>.
            </div>
        </div>

        {{-- MODAL EDUKASI --}}
        <div class="modal fade" id="modalEdukasi" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content border-0">
                    <div class="modal-header border-0">
                        <div class="d-flex align-items-center gap-2">
                            <div
                                class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center">
                                <i class="bx bx-book-open"></i>
                            </div>
                            <h5 class="modal-title fw-bold mb-0" id="modalEdukasiTitle">Edukasi</h5>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body px-4" id="modalEdukasiBody"></div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                            <i class="bx bx-check me-1"></i> Mengerti, Lanjut Isi
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {{-- HEADER --}}
        <div class="card border-0 shadow-sm mb-4" style="border-radius:16px; overflow:hidden;">
            <div class="card-body p-4" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <div class="d-flex align-items-center gap-3">
                    <div class="avatar avatar-lg rounded d-flex align-items-center justify-content-center"
                        style="background:rgba(255,255,255,0.2); flex-shrink:0;">
                        <i class="bx bx-heart fs-4 text-white"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold mb-1 text-white">Tes Kesiapan Sebelum Hamil</h4>
                        <p class="mb-0 text-white" style="opacity:0.85; font-size:0.875rem;">
                            Kuesioner self-reflection untuk pasangan suami istri yang merencanakan kehamilan
                        </p>
                    </div>
                </div>
                {{-- Progress Bar --}}
                <div class="mt-4">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-white" style="opacity:0.85;" id="progressLabel">Bagian Suami — Kategori 1 dari
                            4</small>
                        <small class="text-white fw-bold" id="progressPct" style="opacity:0.85;">0%</small>
                    </div>
                    <div class="progress" style="height:6px; border-radius:20px; background:rgba(255,255,255,0.3);">
                        <div id="progressBar" class="progress-bar"
                            style="width:0%; border-radius:20px; background:#fff; transition:width 0.5s ease;"></div>
                    </div>
                </div>
            </div>
        </div>

        {{-- CONTENT AREA --}}
        <div id="quizArea"></div>

        {{-- HASIL --}}
        <div id="hasilArea" style="display:none;"></div>

    </section>

    @push('scripts')
        @vite('resources/js/test-kesiapan.js')
    @endpush
@endsection
