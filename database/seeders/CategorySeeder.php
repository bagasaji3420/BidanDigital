<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kehamilan',
                'desc' => 'Artikel seputar kehamilan, pemeriksaan antenatal care (ANC), perkembangan janin, dan keluhan ibu hamil per trimester.',
                'icon' => 'fa-solid fa-person-pregnant',
            ],
            [
                'name' => 'Persalinan',
                'desc' => 'Informasi mengenai proses persalinan normal maupun seksio sesarea, kala I-IV, inisiasi menyusu dini (IMD), dan persiapan melahirkan.',
                'icon' => 'fa-solid fa-baby',
            ],
            [
                'name' => 'Nifas',
                'desc' => 'Panduan perawatan ibu pasca persalinan, involusi uterus, lochea, dan pemantauan kondisi ibu selama masa nifas.',
                'icon' => 'fa-solid fa-bed',
            ],
            [
                'name' => 'Bayi Baru Lahir',
                'desc' => 'Perawatan bayi baru lahir, penilaian APGAR, tanda bahaya neonatus, dan stimulasi tumbuh kembang.',
                'icon' => 'fa-solid fa-baby-carriage',
            ],
            [
                'name' => 'Laktasi & Menyusui',
                'desc' => 'Edukasi ASI eksklusif, teknik menyusui yang benar, masalah laktasi, dan manajemen ASI perah.',
                'icon' => 'fa-solid fa-heart',
            ],
            [
                'name' => 'Kontrasepsi',
                'desc' => 'Informasi seputar keluarga berencana (KB), jenis-jenis alat kontrasepsi, indikasi, dan efek samping.',
                'icon' => 'fa-solid fa-shield',
            ],
            [
                'name' => 'Kesehatan Reproduksi',
                'desc' => 'Artikel terkait kesehatan organ reproduksi wanita, infeksi saluran reproduksi, flour albus, dan pemeriksaan ginekologi.',
                'icon' => 'fa-solid fa-venus',
            ],
            [
                'name' => 'Gizi Ibu & Anak',
                'desc' => 'Panduan nutrisi untuk ibu hamil, menyusui, dan anak, termasuk pencegahan stunting dan anemia.',
                'icon' => 'fa-solid fa-utensils',
            ],
            [
                'name' => 'Imunisasi',
                'desc' => 'Jadwal dan jenis imunisasi dasar lengkap untuk bayi dan anak, serta imunisasi pada ibu hamil.',
                'icon' => 'fa-solid fa-syringe',
            ],
            [
                'name' => 'Kesehatan Remaja',
                'desc' => 'Edukasi kesehatan reproduksi remaja, menstruasi, PKPR, dan pencegahan pernikahan dini.',
                'icon' => 'fa-solid fa-person',
            ],
            [
                'name' => 'Menopause',
                'desc' => 'Informasi seputar perimenopause, menopause, perubahan hormonal, dan penanganan keluhan klimakterium.',
                'icon' => 'fa-solid fa-clock-rotate-left',
            ],
            [
                'name' => 'Kegawatdaruratan Kebidanan',
                'desc' => 'Penanganan kasus obstetri darurat seperti perdarahan post partum (HPP), eklampsia, dan distosia.',
                'icon' => 'fa-solid fa-triangle-exclamation',
            ],
            [
                'name' => 'Edukasi Pasien',
                'desc' => 'Materi edukasi kesehatan untuk pasien dan keluarga dalam bahasa yang mudah dipahami.',
                'icon' => 'fa-solid fa-chalkboard-user',
            ],
            [
                'name' => 'Tutorial & Prosedur',
                'desc' => 'Panduan langkah demi langkah tindakan kebidanan, SOP, dan prosedur klinik.',
                'icon' => 'fa-solid fa-list-check',
            ],
            [
                'name' => 'Berita Kebidanan',
                'desc' => 'Informasi terkini seputar dunia kebidanan, kebijakan kesehatan ibu dan anak, serta perkembangan ilmu kebidanan di Indonesia.',
                'icon' => 'fa-solid fa-newspaper',
            ],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'desc' => $cat['desc'],
                'icon' => $cat['icon'],
                'slug' => Str::slug($cat['name']),
            ]);
        }
    }
}
