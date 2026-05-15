{{-- ALERT DISCLAIMER --}}
<div class="d-flex flex-column gap-3 my-4">

    <div class="d-flex gap-3 align-items-start p-3 rounded-3 bg-warning-subtle border border-warning-subtle">
        <i class="bx bx-error-alt text-warning mt-1" style="font-size:1.1rem; flex-shrink:0;"></i>
        <div>
            <div class="fw-semibold mb-1" style="font-size:0.82rem;">
                Data tersimpan lokal di perangkat Anda
            </div>
            <div class="text-muted" style="font-size:0.78rem; line-height:1.7;">
                Semua data yang Anda masukkan hanya disimpan di <strong>browser (localStorage) perangkat Anda
                    sendiri</strong>.
                Data tidak dikirim, disimpan, atau dikelola oleh pihak kami maupun server mana pun.
                Membersihkan cache/data browser akan menghapus semua data secara permanen.

                <a href="{{ route('tools.data') }}"
                    class="text-decoration-none fs-6 d-flex align-items-center gap-1 text-muted">
                    <i class='bx bxs-data'></i>
                    <span>Kelola Data</span>
                </a>
            </div>
        </div>
    </div>

    <div class="d-flex gap-3 align-items-start p-3 rounded-3 bg-danger-subtle border border-danger-subtle">
        <i class="bx bx-info-circle text-danger mt-1" style="font-size:1.1rem; flex-shrink:0;"></i>
        <div>
            <div class="fw-semibold mb-1" style="font-size:0.82rem;">
                Bukan pengganti pemeriksaan medis
            </div>
            <div class="text-muted" style="font-size:0.78rem; line-height:1.7;">
                Hasil perhitungan dan analisis pada halaman ini bersifat <strong>informatif dan edukatif</strong>.
                Jangan jadikan sebagai satu-satunya acuan kesehatan Anda. Selalu konsultasikan kondisi kehamilan,
                berat badan, dan pertumbuhan bayi dengan <strong>dokter, bidan, atau tenaga kesehatan</strong>
                yang menangani Anda.
            </div>
        </div>
    </div>

</div>
