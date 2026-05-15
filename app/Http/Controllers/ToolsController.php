<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;

class ToolsController extends Controller
{
    private function setSeo(string $title, string $description, string $keywords = '')
    {
        SEOMeta::setTitle($title . ' | BundaMuda');
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url()->current());
        if ($keywords) {
            SEOMeta::addKeyword(explode(',', $keywords));
        }

        OpenGraph::setTitle($title . ' | BundaMuda');
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setType('website');

        TwitterCard::setTitle($title . ' | BundaMuda');
        TwitterCard::setDescription($description);
        TwitterCard::setType('summary');
    }

    public function app()
    {
        SEOMeta::setTitle('App Tools');
        return view('Home.Tools.app', [
            'title' => 'App Tools',
        ]);
    }

    public function data()
    {
        SEOMeta::setTitle('Data Lokal');
        return view('Home.Tools.data', [
            'title' => 'Data Personal',
        ]);
    }
    
    public function panduan()
    {
        SEOMeta::setTitle('Panduan Tools');
        return view('Home.Tools.panduan', [
            'title' => 'Panduan Tools',
        ]);
    }

    // ─── KALKULATOR ────────────────────────────────────────────────────────────

    public function hpl()
    {
        $this->setSeo(
            'Kalkulator HPL, Kalender Kehamilan & Kenaikan Berat Badan Ibu Hamil',
            'Hitung HPL (Hari Perkiraan Lahir) berdasarkan HPHT, lengkap dengan kalender kehamilan minggu per minggu, pantau kenaikan berat badan, BMI ibu hamil, dan unduh laporan PDF gratis.',
            'kalkulator HPL, hari perkiraan lahir, kalender kehamilan, kenaikan berat badan ibu hamil, BMI ibu hamil, HPHT, laporan kehamilan PDF, usia kehamilan'
        );

        return view('Home.Tools.hpl', [
            'title' => 'Kalkulator HPL',
        ]);
    }

    public function kebutuhanKalori()
    {
        $this->setSeo(
            'Kebutuhan Kalori Ibu Hamil',
            'Hitung kebutuhan kalori harian ibu hamil sesuai usia kehamilan dan berat badan. Pastikan nutrisi Anda dan bayi terpenuhi dengan baik.',
            'kebutuhan kalori ibu hamil, kalori harian hamil, nutrisi ibu hamil, gizi kehamilan'
        );

        return view('Home.Tools.kebutuhan-kalori', [
            'title' => 'Kebutuhan Kalori Ibu Hamil',
        ]);
    }

    // ─── TRACKER ───────────────────────────────────────────────────────────────

    public function kickCounter()
    {
        $this->setSeo(
            'Kick Counter – Hitung Tendangan Bayi',
            'Pantau dan hitung gerakan tendangan bayi dalam kandungan secara real-time. Deteksi dini jika bayi kurang aktif bergerak.',
            'kick counter, hitung tendangan bayi, gerakan bayi dalam kandungan, tracker tendangan bayi'
        );

        return view('Home.Tools.kick-counter', [
            'title' => 'Kick Counter',
        ]);
    }

    public function kontraksi()
    {
        $this->setSeo(
            'Tracker Kontraksi Persalinan',
            'Catat durasi dan interval kontraksi persalinan secara otomatis. Bantu Anda mengetahui kapan harus segera ke rumah sakit.',
            'tracker kontraksi, hitung kontraksi, kontraksi persalinan, timer kontraksi melahirkan'
        );

        return view('Home.Tools.kontraksi', [
            'title' => 'Tracker Kontraksi',
        ]);
    }

    public function menyusui()
    {
        $this->setSeo(
            'Tracker Menyusui – Jadwal & Durasi ASI',
            'Catat jadwal dan durasi menyusui bayi Anda. Pantau pola menyusui untuk memastikan bayi mendapat ASI yang cukup setiap harinya.',
            'tracker menyusui, jadwal menyusui, durasi ASI, pantau ASI bayi, log menyusui'
        );

        return view('Home.Tools.menyusui', [
            'title' => 'Tracker Menyusui',
        ]);
    }

    public function tekananDarah()
    {
        $this->setSeo(
            'Tracker Tekanan Darah Ibu Hamil',
            'Monitor tekanan darah selama kehamilan untuk mendeteksi risiko hipertensi dan preeklampsia sejak dini. Catat dan pantau riwayat tekanan darah Anda.',
            'tracker tekanan darah ibu hamil, hipertensi kehamilan, pantau tensi hamil, preeklampsia'
        );

        return view('Home.Tools.tekanan-darah', [
            'title' => 'Tracker Tekanan Darah',
        ]);
    }

    public function beratBadan()
    {
        $this->setSeo(
            'Tracker Berat Badan Ibu Hamil',
            'Pantau kenaikan berat badan selama kehamilan sesuai rekomendasi WHO. Grafik berat badan ibu hamil yang mudah dipahami.',
            'tracker berat badan hamil, kenaikan berat badan kehamilan, berat badan ideal ibu hamil, grafik BB hamil'
        );

        return view('Home.Tools.berat-badan', [
            'title' => 'Tracker Berat Badan',
        ]);
    }

    public function pertumbuhanBayi()
    {
        $this->setSeo(
            'Grafik Pertumbuhan Bayi – Berat & Tinggi Badan',
            'Pantau tumbuh kembang bayi Anda menggunakan grafik pertumbuhan WHO. Catat berat badan, tinggi badan, dan lingkar kepala bayi secara berkala.',
            'grafik pertumbuhan bayi, tumbuh kembang bayi, berat badan bayi, tinggi badan bayi, kurva pertumbuhan WHO'
        );

        return view('Home.Tools.pertumbuhan-bayi', [
            'title' => 'Grafik Pertumbuhan Bayi',
        ]);
    }

    public function anemia()
    {
        $this->setSeo(
            'Tracker Anemia Ibu Hamil – Pantau Kadar Hb',
            'Catat dan pantau kadar hemoglobin (Hb) selama kehamilan. Deteksi dini anemia pada ibu hamil untuk mencegah komplikasi persalinan.',
            'tracker anemia ibu hamil, kadar Hb hamil, hemoglobin kehamilan, anemia kehamilan, pantau Hb'
        );

        return view('Home.Tools.anemia', [
            'title' => 'Tracker Anemia',
        ]);
    }

    public function kalenderHaid()
    {
        $this->setSeo(
            'Kalender Haid & Siklus Menstruasi',
            'Pantau dan prediksi siklus haid secara akurat. Hitung masa subur, perkiraan menstruasi berikutnya, dan pahami pola siklus haid kamu.',
            'kalender haid, siklus menstruasi, masa subur, prediksi haid, haid tidak teratur, siklus haid normal'
        );

        return view('Home.Tools.kalender-haid', [
            'title' => 'Kalender Haid ',
        ]);
    }

    // ─── SKRINING & JADWAL ─────────────────────────────────────────────────────

    public function skriningPreeklampsia()
    {
        $this->setSeo(
            'Skrining Preeklampsia – Deteksi Dini Risiko',
            'Lakukan skrining risiko preeklampsia sejak trimester pertama. Kenali faktor risiko dan langkah pencegahan preeklampsia selama kehamilan.',
            'skrining preeklampsia, risiko preeklampsia, deteksi preeklampsia, hipertensi kehamilan, preeklampsia trimester 1'
        );

        return view('Home.Tools.skrining-preeklampsia', [
            'title' => 'Skrining Preeklampsia',
        ]);
    }

    public function epds()
    {
        $this->setSeo(
            'Skrining Baby Blues & Depresi Postpartum (EPDS)',
            'Tes Edinburgh Postnatal Depression Scale (EPDS) untuk mendeteksi gejala baby blues dan depresi postpartum. Kenali tanda-tandanya lebih awal.',
            'skrining EPDS, baby blues, depresi postpartum, Edinburgh postnatal depression scale, kesehatan mental ibu'
        );

        return view('Home.Tools.epds', [
            'title' => 'Skrining EPDS',
        ]);
    }

    public function jadwalImunisasi()
    {
        $this->setSeo(
            'Jadwal Imunisasi Bayi Lengkap – Rekomendasi IDAI',
            'Panduan jadwal imunisasi bayi 0–24 bulan sesuai rekomendasi IDAI dan Kemenkes. Pastikan si kecil mendapat vaksin tepat waktu.',
            'jadwal imunisasi bayi, vaksin bayi, imunisasi lengkap, jadwal vaksin IDAI, imunisasi 0-24 bulan'
        );

        return view('Home.Tools.jadwal-imunisasi', [
            'title' => 'Jadwal Imunisasi Bayi',
        ]);
    }

    public function jadwalAnc()
    {
        $this->setSeo(
            'Jadwal ANC (Antenatal Care) – Pemeriksaan Kehamilan',
            'Panduan jadwal kunjungan ANC (Antenatal Care) selama kehamilan sesuai standar WHO dan Kemenkes. Jangan lewatkan satu pun pemeriksaan kehamilan Anda.',
            'jadwal ANC, antenatal care, pemeriksaan kehamilan, kunjungan bidan kehamilan, ANC terpadu'
        );

        return view('Home.Tools.jadwal-anc', [
            'title' => 'Jadwal ANC',
        ]);
    }

    public function jadwalNifas()
    {
        $this->setSeo(
            'Jadwal Kunjungan Nifas – Pemulihan Pasca Melahirkan',
            'Panduan jadwal kunjungan nifas pasca persalinan sesuai standar Kemenkes. Pantau pemulihan ibu dan kesehatan bayi baru lahir.',
            'jadwal nifas, kunjungan nifas, masa nifas, pemulihan pasca melahirkan, perawatan nifas'
        );

        return view('Home.Tools.jadwal-nifas', [
            'title' => 'Jadwal Nifas',
        ]);
    }

    public function checklistPersalinan()
    {
        $this->setSeo(
            'Checklist Perlengkapan Persalinan – Persiapan Melahirkan',
            'Daftar lengkap perlengkapan yang perlu disiapkan sebelum persalinan. Pastikan tas bersalin Anda sudah lengkap sebelum hari H.',
            'checklist persalinan, perlengkapan melahirkan, persiapan persalinan, tas bersalin, bawaan rumah sakit melahirkan'
        );

        return view('Home.Tools.checklist-persalinan', [
            'title' => 'Checklist Persalinan',
        ]);
    }



    public function testKesiapanSuami()
    {
        $this->setSeo(
            'Tes Kesiapan Memiliki Anak untuk Pasangan',
            'Tes interaktif untuk mengukur kesiapan suami dan istri dalam memiliki anak, lengkap dengan hasil analisis dan saran persiapan menjadi orang tua.',
            'tes kesiapan punya anak, kesiapan pasangan menikah, persiapan menjadi orang tua, tes calon ayah ibu, perencanaan kehamilan'
        );

        return view('Home.Tools.test-kesiapan', [
            'title' => 'Tes Kesiapan',
        ]);
    }

    public function goldar()
    {
        $this->setSeo(
            'Pencocokan Golongan Darah Anak Berdasarkan Golongan Darah Orang Tua',
            'Perkirakan golongan darah anak berdasarkan golongan darah ayah dan ibu menggunakan sistem genetika ABO. Mudah, cepat, dan gratis.',
            'golongan darah anak, kalkulator golongan darah, prediksi goldar anak, sistem ABO, genetika golongan darah, goldar ayah ibu anak'
        );

        return view('Home.Tools.goldar', [
            'title' => 'Golongan Darah Anak',
        ]);
    }


    public function prediksiTinggi()
    {
        $this->setSeo(
            'Prediksi Tinggi Badan Anak Berdasarkan Tinggi Orang Tua',
            'Perkirakan tinggi badan anak berdasarkan tinggi ayah dan ibu menggunakan metode Mid-Parental Height (WHO).',
            'prediksi tinggi badan anak, mid-parental height, tinggi anak dari orang tua, kalkulator tinggi anak'
        );

        return view('Home.Tools.prediksi-tinggi', [
            'title' => 'Tinggi Badan Anak',
        ]);
    }
}
