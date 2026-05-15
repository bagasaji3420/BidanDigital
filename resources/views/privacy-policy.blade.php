@extends('Home.Layouts.app')

@section('content')
    <div class="container py-5" style="max-width: 800px;">

        <h1 class="mb-2 fw-bold">Kebijakan Privasi</h1>
        <p class="text-muted mb-5">Terakhir diperbarui: {{ date('d F Y') }}</p>

        {{-- 1 --}}
        <section class="mb-5">
            <h5 class="fw-bold">1. Informasi yang Kami Kumpulkan</h5>
            <p>
                {{ config('app.name') }} <strong>tidak mengumpulkan data kesehatan pribadimu</strong>.
                Semua data tools kesehatan hanya tersimpan di perangkatmu sendiri melalui
                <em>localStorage</em> browser dan <strong>tidak pernah dikirim ke server kami</strong>.
            </p>
            <p>Informasi yang kami kumpulkan hanya jika kamu membuat akun atau berinteraksi dengan platform:</p>
            <ul>
                <li>Nama dan alamat email saat mendaftar</li>
                <li>Komentar yang kamu tulis di artikel</li>
                <li>Alamat email jika kamu berlangganan newsletter</li>
            </ul>
        </section>

        {{-- 2 --}}
        <section class="mb-5">
            <h5 class="fw-bold">2. Data Lokal (localStorage)</h5>
            <p>
                Data tools kesehatan berikut <strong>hanya tersimpan di browser/perangkatmu</strong>
                dan sama sekali tidak dapat kami akses:
            </p>
            <ul>
                <li>Data kehamilan — HPHT, HPL, berat badan, BMI</li>
                <li>Tracker berat badan ibu hamil</li>
                <li>Tracker tekanan darah</li>
                <li>Tracker anemia & konsumsi tablet Fe</li>
                <li>Kick counter & riwayat gerak janin</li>
                <li>Jadwal nifas & checklist persalinan</li>
                <li>Pertumbuhan bayi & jadwal imunisasi</li>
                <li>Tracker menyusui</li>
                <li>Kalender haid & prediksi siklus</li>
                <li>Bookmark artikel</li>
            </ul>
            <div class="alert alert-warning d-flex gap-2 align-items-start mt-3"
                style="border-radius:10px; font-size:0.875rem;">
                <i class="bx bx-info-circle mt-1 flex-shrink-0"></i>
                <div>
                    Data lokal akan hilang jika cache browser dibersihkan atau kamu berganti perangkat.
                    Gunakan fitur <strong>Export CSV/PDF</strong> di masing-masing tool untuk menyimpan data secara
                    permanen.
                </div>
            </div>
        </section>

        {{-- 3 --}}
        <section class="mb-5">
            <h5 class="fw-bold">3. Data yang Tidak Disimpan Sama Sekali</h5>
            <p>
                Hasil dari tools berikut <strong>tidak disimpan</strong> sama sekali,
                bahkan di perangkatmu sendiri. Data direset otomatis setiap sesi baru:
            </p>
            <ul>
                <li>Tracker Kontraksi</li>
                <li>Skrining EPDS & Baby Blues</li>
                <li>Skrining Preeklampsia</li>
            </ul>
            <p class="text-muted" style="font-size:0.875rem;">
                Gunakan fitur cetak atau export PDF langsung dari halaman tool tersebut
                jika ingin menyimpan hasilnya.
            </p>
        </section>

        {{-- 4 --}}
        <section class="mb-5">
            <h5 class="fw-bold">4. Bagaimana Kami Menggunakan Informasi Akun</h5>
            <p>Jika kamu membuat akun, informasi yang dikumpulkan digunakan untuk:</p>
            <ul>
                <li>Mengidentifikasi kamu sebagai pengguna terdaftar</li>
                <li>Menampilkan komentar yang kamu tulis di artikel</li>
                <li>Mengirimkan newsletter kesehatan jika kamu berlangganan</li>
                <li>Menghubungi kamu terkait akun atau layanan jika diperlukan</li>
            </ul>
        </section>

        {{-- 5 --}}
        <section class="mb-5">
            <h5 class="fw-bold">5. Newsletter</h5>
            <p>
                Jika kamu berlangganan newsletter, alamat emailmu akan kami simpan untuk keperluan
                pengiriman informasi kesehatan terbaru. Kamu dapat berhenti berlangganan kapan saja
                melalui link <strong>Berhenti Berlangganan</strong> yang tersedia di setiap email yang kami kirim.
            </p>
        </section>

        {{-- 6 --}}
        <section class="mb-5">
            <h5 class="fw-bold">6. Keamanan Data</h5>
            <p>
                Kami berkomitmen menjaga keamanan data akun yang kamu percayakan kepada kami.
                Data disimpan di server yang aman dan hanya dapat diakses oleh pihak yang berwenang.
                Namun, perlu diingat bahwa tidak ada metode transmisi internet yang 100% aman.
            </p>
        </section>

        {{-- 7 --}}
        <section class="mb-5">
            <h5 class="fw-bold">7. Berbagi Data dengan Pihak Ketiga</h5>
            <p>
                Kami <strong>tidak menjual</strong> data pribadimu kepada pihak ketiga manapun.
                Data hanya dapat dibagikan dalam kondisi berikut:
            </p>
            <ul>
                <li>Diwajibkan oleh hukum atau otoritas yang berwenang</li>
                <li>Diperlukan untuk menjalankan layanan inti, seperti pengiriman email</li>
            </ul>
        </section>

        {{-- 8 --}}
        <section class="mb-5">
            <h5 class="fw-bold">8. Cookie</h5>
            <p>
                {{ config('app.name') }} menggunakan cookie hanya untuk keperluan sesi login
                dan keamanan formulir. Kami tidak menggunakan cookie untuk pelacakan iklan
                atau analitik pihak ketiga.
            </p>
        </section>

        {{-- 9 --}}
        <section class="mb-5">
            <h5 class="fw-bold">9. Hak Pengguna</h5>
            <p>Kamu memiliki hak penuh untuk:</p>
            <ul>
                <li>Mengakses dan memperbarui data profil akunmu</li>
                <li>Menghapus akun dan semua data terkait</li>
                <li>Menghapus data lokal kapan saja melalui halaman <a href="{{ route('tools.data') }}">Data Tersimpan</a>
                </li>
                <li>Berhenti berlangganan newsletter kapan saja</li>
            </ul>
        </section>

        {{-- 10 --}}
        <section class="mb-5">
            <h5 class="fw-bold">10. Perubahan Kebijakan</h5>
            <p>
                Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan
                akan diberitahukan melalui email atau notifikasi di platform. Penggunaan layanan
                setelah perubahan berlaku berarti kamu menyetujui kebijakan yang baru.
            </p>
        </section>

        {{-- 11 --}}
        <section class="mb-5">
            <h5 class="fw-bold">11. Hubungi Kami</h5>
            <p>
                Jika ada pertanyaan seputar kebijakan privasi ini, silakan hubungi kami melalui
                halaman <a href="{{ route('index') }}#landingContact">Kontak</a> atau email di
                <a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a>.
            </p>
        </section>

    </div>
@endsection
