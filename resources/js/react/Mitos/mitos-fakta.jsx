import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import GameCard from "./GameCard";
import ScoreBoard from "./ScoreBoard";
import ResultScene from "./ResultScene";

// ── DATA ──────────────────────────────────────────────────────────
// Nanti ganti dengan: const CARDS = await fetch('/api/mitos-fakta').then(r => r.json())
const CARDS = [
    {
        id: 1,
        pernyataan: "Ibu hamil tidak boleh makan nanas",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Nanas aman dikonsumsi dalam jumlah wajar. Bromelain dalam nanas hanya berbahaya dalam dosis sangat tinggi yang tidak mungkin dicapai dari makan biasa.",
    },
    {
        id: 2,
        pernyataan: "Detak jantung janin cepat menandakan bayi perempuan",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Tidak ada bukti ilmiah yang mendukung ini. Detak jantung janin dipengaruhi usia kehamilan dan aktivitas janin, bukan jenis kelamin.",
    },
    {
        id: 3,
        pernyataan:
            "Ibu hamil membutuhkan asam folat terutama di trimester pertama",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Asam folat sangat penting di trimester pertama untuk mencegah cacat tabung saraf. Dianjurkan mulai sebelum hamil hingga usia kehamilan 12 minggu.",
    },
    {
        id: 4,
        pernyataan: "Morning sickness hanya terjadi di pagi hari",
        jawaban: "mitos",
        kategori: "Gejala",
        penjelasan:
            "Morning sickness bisa terjadi kapan saja sepanjang hari. Nama 'morning sickness' hanya istilah umum, mual bisa muncul pagi, siang, maupun malam.",
    },
    {
        id: 5,
        pernyataan: "Olahraga ringan aman dilakukan selama kehamilan normal",
        jawaban: "fakta",
        kategori: "Aktivitas",
        penjelasan:
            "Olahraga ringan seperti jalan kaki, yoga prenatal, dan renang sangat dianjurkan. Terbukti mengurangi nyeri punggung dan memperlancar persalinan.",
    },
    {
        id: 6,
        pernyataan: "Ibu hamil tidak boleh minum kopi sama sekali",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "WHO mengizinkan konsumsi kafein maksimal 200mg per hari (sekitar 1 cangkir kopi). Yang berbahaya adalah konsumsi berlebihan, bukan kafein sama sekali.",
    },
    {
        id: 7,
        pernyataan:
            "Berhubungan intim bisa menyebabkan keguguran pada kehamilan normal",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Pada kehamilan normal tanpa komplikasi, berhubungan intim aman dilakukan. Janin terlindungi oleh cairan ketuban dan otot rahim.",
    },
    {
        id: 8,
        pernyataan: "Preeklampsia hanya terjadi pada kehamilan pertama",
        jawaban: "mitos",
        kategori: "Komplikasi",
        penjelasan:
            "Preeklampsia bisa terjadi pada kehamilan mana pun. Risikonya memang lebih tinggi pada kehamilan pertama, tetapi bisa terjadi berulang.",
    },
    {
        id: 9,
        pernyataan:
            "Ibu hamil dianjurkan periksa kehamilan (ANC) minimal 6 kali",
        jawaban: "fakta",
        kategori: "ANC",
        penjelasan:
            "Kemenkes RI merekomendasikan minimal 6 kali pemeriksaan ANC: 2x trimester 1, 2x trimester 2, dan 2x trimester 3 untuk memantau kesehatan ibu dan janin.",
    },
    {
        id: 10,
        pernyataan: "Air ketuban berwarna hijau adalah tanda normal",
        jawaban: "mitos",
        kategori: "Persalinan",
        penjelasan:
            "Ketuban hijau menandakan bayi telah buang air besar (mekonium) di dalam rahim, bisa tanda gawat janin. Segera ke fasilitas kesehatan.",
    },
    {
        id: 11,
        pernyataan: "Anemia pada ibu hamil dapat membahayakan janin",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Anemia menyebabkan kurangnya oksigen ke janin, berisiko BBLR, kelahiran prematur, dan komplikasi persalinan. Konsumsi zat besi sangat penting.",
    },
    {
        id: 12,
        pernyataan: "Bentuk perut yang runcing berarti bayi laki-laki",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Bentuk perut ditentukan oleh posisi janin, kekuatan otot perut ibu, dan postur tubuh. Tidak ada hubungan ilmiah dengan jenis kelamin bayi.",
    },
    {
        id: 13,
        pernyataan: "Ibu hamil sebaiknya menghindari rokok dan asap rokok",
        jawaban: "fakta",
        kategori: "Gaya Hidup",
        penjelasan:
            "Paparan rokok aktif maupun pasif sangat berbahaya. Meningkatkan risiko BBLR, kelahiran prematur, cacat bawaan, dan sindrom kematian bayi mendadak.",
    },
    {
        id: 14,
        pernyataan: "Ngidam harus selalu dipenuhi agar bayi tidak cacat",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Tidak ada hubungan ilmiah antara ngidam dan cacat bayi. Ngidam adalah respons normal hormonal. Yang penting tetap makan bergizi dan seimbang.",
    },
    {
        id: 15,
        pernyataan: "Imunisasi TT (Tetanus Toksoid) penting untuk ibu hamil",
        jawaban: "fakta",
        kategori: "Imunisasi",
        penjelasan:
            "Imunisasi TT melindungi ibu dan bayi dari tetanus neonatorum, penyakit berbahaya pada bayi baru lahir. Dianjurkan sesuai jadwal Kemenkes.",
    },
    {
        id: 16,
        pernyataan: "Ibu hamil tidak boleh tidur telentang sama sekali",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Tidur miring kiri memang dianjurkan untuk aliran darah optimal, namun tidur telentang sebentar tidak berbahaya. Yang perlu dihindari adalah tidur telentang dalam waktu lama di trimester 3.",
    },
    {
        id: 17,
        pernyataan:
            "Bayi yang sering menendang dalam kandungan adalah tanda sehat",
        jawaban: "fakta",
        kategori: "Perkembangan",
        penjelasan:
            "Gerakan janin adalah tanda janin aktif dan sehat. Ibu dianjurkan menghitung gerakan janin (kick count) minimal 10 gerakan dalam 2 jam.",
    },
    {
        id: 18,
        pernyataan: "Makan durian saat hamil selalu berbahaya",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Tidak ada larangan medis makan durian saat hamil. Namun karena kandungan gula dan kalorinya tinggi, konsumsi sebaiknya dibatasi terutama pada ibu dengan diabetes gestasional.",
    },
    {
        id: 19,
        pernyataan: "Tekanan darah tinggi saat hamil perlu diwaspadai",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Hipertensi dalam kehamilan bisa berkembang menjadi preeklampsia yang mengancam jiwa. Pemantauan tekanan darah rutin sangat penting dalam setiap ANC.",
    },
    {
        id: 20,
        pernyataan:
            "Ibu hamil harus makan dua porsi karena makan untuk dua orang",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Yang dibutuhkan bukan porsi dua kali lipat, tetapi kualitas gizi yang baik. Trimester 2 dan 3 hanya butuh tambahan sekitar 300-500 kalori per hari.",
    },
    {
        id: 21,
        pernyataan: "Persalinan caesar lebih aman dari persalinan normal",
        jawaban: "mitos",
        kategori: "Persalinan",
        penjelasan:
            "Persalinan normal adalah proses alamiah yang umumnya lebih aman. Cesar memiliki risiko komplikasi lebih tinggi dan pemulihan lebih lama. Dipilih berdasarkan indikasi medis.",
    },
    {
        id: 22,
        pernyataan: "ASI eksklusif diberikan selama 6 bulan pertama",
        jawaban: "fakta",
        kategori: "Menyusui",
        penjelasan:
            "WHO dan Kemenkes menganjurkan ASI eksklusif tanpa tambahan makanan/minuman lain selama 6 bulan, lalu dilanjutkan bersama MPASI hingga 2 tahun.",
    },
    {
        id: 23,
        pernyataan: "Stretch mark bisa dicegah 100% dengan krim pelembap",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Stretch mark sebagian besar dipengaruhi faktor genetik dan kecepatan penambahan berat badan. Pelembap membantu mengurangi rasa gatal namun tidak bisa mencegah sepenuhnya.",
    },
    {
        id: 24,
        pernyataan: "Ibu hamil boleh minum obat warung tanpa konsultasi dokter",
        jawaban: "mitos",
        kategori: "Keselamatan",
        penjelasan:
            "Banyak obat yang aman untuk orang dewasa biasa bisa berbahaya bagi janin. Selalu konsultasikan dengan dokter atau bidan sebelum mengonsumsi obat apapun.",
    },
    {
        id: 25,
        pernyataan:
            "Depresi pasca persalinan (baby blues) adalah kondisi nyata yang butuh perhatian",
        jawaban: "fakta",
        kategori: "Kesehatan Mental",
        penjelasan:
            "Baby blues dan depresi pasca persalinan nyata secara medis, bukan 'lebay'. Disebabkan perubahan hormon drastis. Perlu dukungan keluarga dan tenaga kesehatan.",
    },
    {
        id: 26,
        pernyataan: "Ibu hamil tidak boleh bepergian naik pesawat",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Penerbangan aman hingga usia kehamilan 36 minggu untuk kehamilan normal. Di atas itu perlu surat dokter. Yang penting hindari duduk terlalu lama tanpa bergerak.",
    },
    {
        id: 27,
        pernyataan:
            "Kontraksi palsu (Braxton Hicks) normal terjadi di trimester 3",
        jawaban: "fakta",
        kategori: "Persalinan",
        penjelasan:
            "Braxton Hicks adalah kontraksi latihan rahim yang normal. Berbeda dengan kontraksi asli: tidak teratur, tidak makin kuat, dan hilang saat posisi berubah.",
    },
    {
        id: 28,
        pernyataan: "Gusi berdarah saat hamil harus didiamkan saja",
        jawaban: "mitos",
        kategori: "Kesehatan",
        penjelasan:
            "Masalah gusi umum tapi tidak boleh diabaikan. Infeksi gigi bisa memicu kelahiran prematur. Ibu hamil dianjurkan periksa gigi minimal sekali selama kehamilan.",
    },
    {
        id: 29,
        pernyataan:
            "Bayi prematur yang lahir di usia 28 minggu masih bisa selamat",
        jawaban: "fakta",
        kategori: "Perkembangan",
        penjelasan:
            "Dengan teknologi NICU modern, bayi prematur usia 28 minggu memiliki tingkat kelangsungan hidup lebih dari 90%. Penanganan cepat di rumah sakit sangat menentukan.",
    },
    {
        id: 30,
        pernyataan:
            "Ibu hamil yang mengalami mual parah (hiperemesis) hanya perlu banyak minum",
        jawaban: "mitos",
        kategori: "Komplikasi",
        penjelasan:
            "Hiperemesis gravidarum adalah kondisi serius yang menyebabkan dehidrasi dan kekurangan nutrisi. Perlu penanganan medis termasuk infus dan obat anti-mual.",
    },
    {
        id: 31,
        pernyataan: "Ibu hamil tidak boleh mewarnai rambut",
        jawaban: "mitos",
        kategori: "Gaya Hidup",
        penjelasan:
            "Beberapa penelitian menunjukkan pewarna rambut relatif aman digunakan setelah trimester pertama dalam ruangan berventilasi baik. Sebaiknya tunda hingga trimester 2 dan konsultasikan dengan dokter.",
    },
    {
        id: 32,
        pernyataan: "Kalsium penting untuk perkembangan tulang janin",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Janin membutuhkan 200–250 mg kalsium per hari untuk perkembangan tulang dan gigi. Jika asupan ibu kurang, kalsium akan diambil dari tulang ibu sehingga berisiko osteoporosis.",
    },
    {
        id: 33,
        pernyataan: "Ibu hamil tidak boleh makan ikan sama sekali",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Ikan justru dianjurkan karena mengandung omega-3 dan DHA penting bagi otak janin. Yang perlu dihindari adalah ikan tinggi merkuri seperti hiu, ikan pedang, dan king mackerel.",
    },
    {
        id: 34,
        pernyataan:
            "Berat badan naik terlalu cepat saat hamil bisa meningkatkan risiko komplikasi",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Kenaikan berat badan berlebih saat hamil meningkatkan risiko diabetes gestasional, hipertensi, preeklampsia, dan kesulitan persalinan. IMT sebelum hamil menentukan panduan kenaikan ideal.",
    },
    {
        id: 35,
        pernyataan:
            "Janin bisa mendengar suara dari luar rahim mulai trimester 2",
        jawaban: "fakta",
        kategori: "Perkembangan",
        penjelasan:
            "Indera pendengaran janin mulai berkembang sekitar minggu ke-18. Pada minggu 25–26, janin sudah bisa merespons suara dari luar. Mengajak bicara dan memperdengarkan musik dapat merangsang perkembangan.",
    },
    {
        id: 36,
        pernyataan:
            "Ibu hamil dengan golongan darah Rhesus negatif tidak perlu pemeriksaan khusus",
        jawaban: "mitos",
        kategori: "Komplikasi",
        penjelasan:
            "Ibu dengan Rh negatif perlu pemeriksaan khusus karena jika janin Rh positif, bisa terjadi inkompatibilitas Rh yang berbahaya. Penyuntikan anti-D immunoglobulin diperlukan untuk mencegah komplikasi.",
    },
    {
        id: 37,
        pernyataan: "Minyak kayu putih aman digunakan pada ibu hamil",
        jawaban: "mitos",
        kategori: "Keselamatan",
        penjelasan:
            "Beberapa minyak esensial termasuk eucalyptus (kayu putih) sebaiknya dihindari terutama di trimester pertama karena dapat merangsang kontraksi. Konsultasikan ke dokter sebelum penggunaan.",
    },
    {
        id: 38,
        pernyataan:
            "Ibu hamil yang bekerja tetap bisa melanjutkan pekerjaan hingga mendekati persalinan pada kehamilan normal",
        jawaban: "fakta",
        kategori: "Aktivitas",
        penjelasan:
            "Pada kehamilan normal tanpa komplikasi, ibu hamil boleh tetap bekerja hingga mendekati hari perkiraan lahir. Yang penting adalah memperhatikan kondisi kerja, tidak terlalu berat secara fisik, dan cukup istirahat.",
    },
    {
        id: 39,
        pernyataan:
            "Konsumsi susu ibu hamil adalah pengganti makanan sehat lainnya",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Susu ibu hamil adalah suplemen pelengkap, bukan pengganti makanan bergizi seimbang. Prioritas utama tetap makanan alami yang kaya protein, zat besi, kalsium, dan asam folat.",
    },
    {
        id: 40,
        pernyataan:
            "Gerakan janin pertama yang dirasakan ibu disebut quickening",
        jawaban: "fakta",
        kategori: "Perkembangan",
        penjelasan:
            "Quickening adalah sensasi pertama gerakan janin yang dirasakan ibu, biasanya terjadi antara minggu 16–25. Ibu hamil pertama umumnya merasakannya lebih lambat dibanding ibu yang sudah pernah hamil sebelumnya.",
    },
    {
        id: 41,
        pernyataan:
            "Warna kulit bayi bisa diprediksi dari makanan yang dimakan ibu",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Warna kulit bayi ditentukan sepenuhnya oleh genetika, yaitu kombinasi gen dari kedua orang tua. Makanan yang dikonsumsi ibu sama sekali tidak memengaruhi pigmentasi kulit bayi.",
    },
    {
        id: 42,
        pernyataan: "Ibu hamil perlu tambahan protein dibanding sebelum hamil",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Ibu hamil membutuhkan tambahan sekitar 25 gram protein per hari dibanding sebelum hamil untuk mendukung pertumbuhan jaringan janin, plasenta, dan perubahan tubuh ibu.",
    },
    {
        id: 43,
        pernyataan: "Minum air es bisa membuat bayi besar",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Tidak ada hubungan ilmiah antara minum air es dan ukuran bayi. Besar kecilnya bayi dipengaruhi faktor genetik, gizi ibu, dan kondisi kesehatan seperti diabetes gestasional, bukan suhu minuman.",
    },
    {
        id: 44,
        pernyataan:
            "Plasenta previa dapat menyebabkan perdarahan berbahaya saat hamil",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Plasenta previa (plasenta yang menutupi mulut rahim) dapat menyebabkan perdarahan hebat yang mengancam jiwa. Dideteksi melalui USG dan umumnya memerlukan persalinan cesar.",
    },
    {
        id: 45,
        pernyataan:
            "Semua ibu hamil harus menjalani operasi cesar untuk keselamatan bayi",
        jawaban: "mitos",
        kategori: "Persalinan",
        penjelasan:
            "Persalinan normal adalah pilihan utama untuk kehamilan tanpa komplikasi. Cesar dipilih berdasarkan indikasi medis tertentu seperti plasenta previa, letak sungsang yang tidak bisa diputar, atau gawat janin.",
    },
    {
        id: 46,
        pernyataan:
            "Zat besi dari sumber hewani lebih mudah diserap tubuh daripada dari sayuran",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Zat besi heme dari daging merah, unggas, dan ikan diserap 15–35%, sedangkan zat besi non-heme dari sayuran hanya 2–20%. Konsumsi vitamin C bersamaan dapat meningkatkan penyerapan zat besi nabati.",
    },
    {
        id: 47,
        pernyataan:
            "Ibu hamil tidak boleh sama sekali berolahraga di trimester pertama",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Olahraga ringan seperti jalan kaki tetap aman di trimester pertama untuk kehamilan normal. Yang perlu dihindari adalah olahraga kontak fisik, risiko benturan perut, dan olahraga dengan intensitas sangat tinggi.",
    },
    {
        id: 48,
        pernyataan: "Preeklampsia bisa terjadi tanpa gejala yang terasa",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Banyak kasus preeklampsia awalnya tanpa gejala dan hanya terdeteksi melalui pengukuran tekanan darah dan tes urin saat ANC. Itulah pentingnya pemeriksaan rutin selama kehamilan.",
    },
    {
        id: 49,
        pernyataan:
            "Ibu hamil tidak perlu khawatir soal kesehatan gigi dan mulut",
        jawaban: "mitos",
        kategori: "Kesehatan",
        penjelasan:
            "Perubahan hormonal saat hamil meningkatkan risiko radang gusi (gingivitis kehamilan) dan gigi berlubang. Infeksi mulut yang tidak diobati dikaitkan dengan kelahiran prematur dan bayi berat badan lahir rendah.",
    },
    {
        id: 50,
        pernyataan:
            "Diabetes gestasional biasanya hilang sendiri setelah persalinan",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Sebagian besar kasus diabetes gestasional membaik setelah melahirkan. Namun ibu yang pernah mengalaminya memiliki risiko lebih tinggi terkena diabetes tipe 2 di masa depan dan perlu pemantauan jangka panjang.",
    },
    {
        id: 51,
        pernyataan:
            "Ibu hamil yang sering heartburn berarti bayinya berbulu lebat",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Heartburn saat hamil disebabkan hormon progesteron yang melonggarkan katup kerongkongan dan rahim yang membesar menekan lambung. Tidak ada kaitan sama sekali dengan rambut bayi.",
    },
    {
        id: 52,
        pernyataan: "Ibu hamil dianjurkan tidur cukup 7–9 jam per malam",
        jawaban: "fakta",
        kategori: "Gaya Hidup",
        penjelasan:
            "Tidur cukup sangat penting untuk ibu hamil. Kurang tidur dikaitkan dengan preeklampsia, diabetes gestasional, dan persalinan lebih lama. Tidur miring kiri dianjurkan untuk aliran darah optimal ke janin.",
    },
    {
        id: 53,
        pernyataan:
            "Bau-bauan tertentu yang memicu mual saat hamil adalah tanda kelemahan",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Hipersensitivitas penciuman saat hamil adalah kondisi biologis nyata akibat peningkatan hormon estrogen. Ini adalah mekanisme perlindungan evolusioner, bukan tanda kelemahan. Dialami hingga 2/3 ibu hamil.",
    },
    {
        id: 54,
        pernyataan:
            "Ibu hamil dengan riwayat keguguran perlu pengawasan lebih ketat",
        jawaban: "fakta",
        kategori: "ANC",
        penjelasan:
            "Riwayat keguguran berulang (≥2 kali) meningkatkan risiko pada kehamilan berikutnya. Perlu evaluasi penyebab (faktor genetik, hormon, anatomi rahim) dan pemantauan lebih intensif oleh dokter kandungan.",
    },
    {
        id: 55,
        pernyataan: "Makan pedas bisa memicu persalinan prematur",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Tidak ada bukti ilmiah bahwa makanan pedas menyebabkan persalinan prematur. Namun makanan pedas bisa memperburuk heartburn dan gangguan pencernaan yang umum pada kehamilan.",
    },
    {
        id: 56,
        pernyataan: "Vaksin flu aman dan dianjurkan untuk ibu hamil",
        jawaban: "fakta",
        kategori: "Imunisasi",
        penjelasan:
            "WHO dan Kemenkes merekomendasikan vaksin influenza untuk ibu hamil di trimester berapa pun karena flu bisa berbahaya saat hamil. Vaksin ini juga memberikan perlindungan pada bayi baru lahir.",
    },
    {
        id: 57,
        pernyataan:
            "Posisi bayi sungsang pada usia 30 minggu berarti pasti lahir cesar",
        jawaban: "mitos",
        kategori: "Persalinan",
        penjelasan:
            "Pada usia 30 minggu, masih ada cukup waktu dan ruang bagi bayi untuk berputar. Posisi janin baru dievaluasi serius menjelang minggu 36. Prosedur ECV (versi luar) bisa dicoba untuk membalikkan posisi janin.",
    },
    {
        id: 58,
        pernyataan: "Kehamilan kembar memiliki risiko komplikasi lebih tinggi",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Kehamilan kembar meningkatkan risiko kelahiran prematur, BBLR, preeklampsia, anemia, diabetes gestasional, dan komplikasi persalinan. Membutuhkan pemantauan ANC yang lebih sering dari kehamilan tunggal.",
    },
    {
        id: 59,
        pernyataan: "Ibu hamil tidak boleh menggendong anak yang sudah ada",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Menggendong anak kecil saat hamil pada umumnya aman, terutama di awal kehamilan. Yang perlu diperhatikan adalah teknik menggendong yang benar untuk menjaga punggung dan menghindari ketegangan berlebihan.",
    },
    {
        id: 60,
        pernyataan: "Vitamin D penting untuk penyerapan kalsium pada ibu hamil",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Vitamin D berperan penting dalam penyerapan kalsium dan fosfor untuk perkembangan tulang janin. Kekurangan vitamin D dikaitkan dengan risiko preeklampsia, diabetes gestasional, dan BBLR.",
    },
    {
        id: 61,
        pernyataan:
            "Ibu hamil harus menghindari kucing karena pasti menularkan toksoplasmosis",
        jawaban: "mitos",
        kategori: "Keselamatan",
        penjelasan:
            "Kucing hanya menularkan toksoplasmosis melalui kotorannya jika terinfeksi. Ibu hamil cukup menghindari membersihkan kotak pasir kucing dan selalu cuci tangan. Kucing indoor yang tidak makan hewan liar berisiko rendah.",
    },
    {
        id: 62,
        pernyataan:
            "Persalinan normal lebih cepat pemulihannya dibanding operasi cesar",
        jawaban: "fakta",
        kategori: "Persalinan",
        penjelasan:
            "Pemulihan pasca persalinan normal umumnya lebih cepat, 1–3 hari di rumah sakit. Cesar membutuhkan 3–5 hari di rumah sakit dan 6–8 minggu pemulihan penuh karena melibatkan sayatan bedah.",
    },
    {
        id: 63,
        pernyataan:
            "Ibu hamil yang mual di awal kehamilan tandanya kehamilan tidak sehat",
        jawaban: "mitos",
        kategori: "Gejala",
        penjelasan:
            "Justru sebaliknya, mual-muntah di awal kehamilan dikaitkan dengan kadar hCG yang tinggi, tanda kehamilan berkembang baik. Beberapa penelitian menunjukkan ibu dengan morning sickness memiliki risiko keguguran lebih rendah.",
    },
    {
        id: 64,
        pernyataan: "Iodium penting untuk perkembangan otak janin",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Kekurangan iodium saat hamil dapat menyebabkan hipotiroid kongenital dan keterlambatan perkembangan kognitif pada anak. Ibu hamil dianjurkan mengonsumsi garam beriodium dan suplemen yang mengandung iodium.",
    },
    {
        id: 65,
        pernyataan:
            "Bayi dalam kandungan bisa merasakan emosi ibu secara langsung",
        jawaban: "mitos",
        kategori: "Perkembangan",
        penjelasan:
            "Janin tidak dapat merasakan emosi secara langsung, namun stres kronik ibu dapat memengaruhi janin melalui hormon kortisol dan perubahan aliran darah. Stres berat yang terus-menerus dikaitkan dengan kelahiran prematur.",
    },
    {
        id: 66,
        pernyataan:
            "Kram kaki saat hamil sering terjadi terutama di malam hari",
        jawaban: "fakta",
        kategori: "Gejala",
        penjelasan:
            "Kram kaki sangat umum dialami ibu hamil terutama di trimester 2 dan 3. Penyebabnya diduga akibat kekurangan magnesium, kalsium, atau perubahan sirkulasi darah. Peregangan ringan dan hidrasi dapat membantu.",
    },
    {
        id: 67,
        pernyataan: "Penggunaan HP dan laptop berbahaya untuk janin",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Tidak ada bukti ilmiah bahwa radiasi non-ionisasi dari HP atau laptop berbahaya bagi janin. Namun postur tubuh saat menggunakan gadget perlu diperhatikan agar tidak membebani punggung dan leher.",
    },
    {
        id: 68,
        pernyataan:
            "Sering buang air kecil di trimester pertama adalah hal normal",
        jawaban: "fakta",
        kategori: "Gejala",
        penjelasan:
            "Peningkatan frekuensi buang air kecil di trimester pertama disebabkan oleh peningkatan volume darah dan hormon hCG. Di trimester 3, kandung kemih tertekan rahim yang membesar.",
    },
    {
        id: 69,
        pernyataan: "Ibu hamil tidak boleh mengonsumsi probiotik",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Probiotik aman dikonsumsi selama kehamilan dan bahkan bermanfaat untuk kesehatan saluran cerna, mencegah infeksi vaginal, dan mengurangi risiko eksim pada bayi. Konsultasikan jenis dan dosis dengan dokter.",
    },
    {
        id: 70,
        pernyataan:
            "Ikterus (kuning) pada bayi baru lahir selalu merupakan tanda bahaya",
        jawaban: "mitos",
        kategori: "Neonatal",
        penjelasan:
            "Ikterus fisiologis pada bayi baru lahir sangat umum dan umumnya tidak berbahaya, terjadi pada 60% bayi cukup bulan. Namun ikterus dalam 24 jam pertama atau kadar bilirubin sangat tinggi memerlukan penanganan medis.",
    },
    {
        id: 71,
        pernyataan:
            "Ibu menyusui membutuhkan kalori lebih banyak dari saat hamil",
        jawaban: "fakta",
        kategori: "Menyusui",
        penjelasan:
            "Ibu menyusui membutuhkan tambahan sekitar 500 kalori per hari, lebih tinggi dari tambahan 300 kalori saat hamil. Kualitas gizi ibu memengaruhi komposisi dan produksi ASI.",
    },
    {
        id: 72,
        pernyataan: "Sinar matahari pagi berbahaya untuk ibu hamil",
        jawaban: "mitos",
        kategori: "Gaya Hidup",
        penjelasan:
            "Paparan sinar matahari pagi selama 10–15 menit membantu produksi vitamin D yang penting bagi ibu hamil. Hindari paparan berlebih di siang hari untuk mencegah hiperpigmentasi dan kepanasan.",
    },
    {
        id: 73,
        pernyataan:
            "Tes gula darah penting dilakukan pada ibu hamil terutama dengan faktor risiko",
        jawaban: "fakta",
        kategori: "ANC",
        penjelasan:
            "Skrining diabetes gestasional (tes toleransi glukosa) dianjurkan pada minggu 24–28, lebih awal jika ada faktor risiko seperti obesitas, riwayat keluarga DM, atau riwayat bayi besar sebelumnya.",
    },
    {
        id: 74,
        pernyataan:
            "Mandi air panas atau berendam di bathtub sangat aman dilakukan kapan saja saat hamil",
        jawaban: "mitos",
        kategori: "Keselamatan",
        penjelasan:
            "Suhu tubuh inti yang terlalu tinggi terutama di trimester pertama dapat meningkatkan risiko cacat tabung saraf. Hindari berendam air panas lebih dari 10 menit atau sauna. Air hangat suam-suam kuku lebih aman.",
    },
    {
        id: 75,
        pernyataan:
            "Kontraksi yang teratur dan makin kuat adalah tanda persalinan aktif",
        jawaban: "fakta",
        kategori: "Persalinan",
        penjelasan:
            "Tanda persalinan aktif adalah kontraksi yang teratur setiap 5 menit sekali, berlangsung 60 detik, dan semakin kuat. Berbeda dengan Braxton Hicks yang tidak teratur dan tidak semakin intens.",
    },
    {
        id: 76,
        pernyataan:
            "Ibu hamil tidak perlu berolahraga karena berbahaya untuk janin",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Olahraga ringan-sedang justru sangat dianjurkan. Terbukti menurunkan risiko diabetes gestasional, preeklampsia, nyeri punggung, dan komplikasi persalinan. Direkomendasikan 150 menit aktivitas sedang per minggu.",
    },
    {
        id: 77,
        pernyataan:
            "Konsumsi alkohol dalam jumlah sedikit aman untuk ibu hamil",
        jawaban: "mitos",
        kategori: "Keselamatan",
        penjelasan:
            "Tidak ada batas aman konsumsi alkohol saat hamil. Alkohol melewati plasenta dan dapat menyebabkan fetal alcohol spectrum disorders (FASD) yang memengaruhi otak dan organ tubuh bayi secara permanen.",
    },
    {
        id: 78,
        pernyataan:
            "Perdarahan ringan di awal kehamilan selalu berarti keguguran",
        jawaban: "mitos",
        kategori: "Gejala",
        penjelasan:
            "Sekitar 20–30% ibu hamil mengalami flek atau perdarahan ringan di trimester pertama. Penyebabnya bisa implantasi embrio atau perubahan serviks. Namun tetap perlu dievaluasi dokter karena bisa juga tanda ancaman keguguran.",
    },
    {
        id: 79,
        pernyataan:
            "Ibu hamil dianjurkan mengonsumsi suplemen zat besi setiap hari",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "Kemenkes merekomendasikan konsumsi 1 tablet tambah darah (TTD) per hari selama kehamilan dan 40 hari pasca persalinan untuk mencegah anemia yang berisiko pada ibu dan janin.",
    },
    {
        id: 80,
        pernyataan:
            "Tidur miring kanan sama berbahayanya dengan tidur telentang saat hamil",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Tidur miring kanan pada dasarnya aman, namun miring kiri lebih dianjurkan karena mengoptimalkan aliran darah ke plasenta dan ginjal. Tidur telentang dalam waktu lama di trimester akhir yang perlu dihindari.",
    },
    {
        id: 81,
        pernyataan:
            "Persiapan mental sama pentingnya dengan persiapan fisik menjelang persalinan",
        jawaban: "fakta",
        kategori: "Persalinan",
        penjelasan:
            "Kecemasan berlebih saat persalinan dapat memperlambat proses dan meningkatkan persepsi nyeri. Kelas prenatal, hypnobirthing, dan dukungan pasangan terbukti membantu persalinan yang lebih positif.",
    },
    {
        id: 82,
        pernyataan:
            "Bayi yang sering menangis di dalam kandungan berarti ada masalah",
        jawaban: "mitos",
        kategori: "Mitos Umum",
        penjelasan:
            "Bayi dalam kandungan tidak bisa menangis karena trakea berisi cairan ketuban, bukan udara. Gerakan wajah yang menyerupai tangis terdeteksi di USG namun ini bagian dari perkembangan neuromotor normal.",
    },
    {
        id: 83,
        pernyataan: "Pemeriksaan USG aman dilakukan selama kehamilan",
        jawaban: "fakta",
        kategori: "ANC",
        penjelasan:
            "USG obstetri menggunakan gelombang suara, bukan radiasi ionisasi, sehingga aman untuk ibu dan janin. Tidak ada bukti USG menyebabkan efek berbahaya. WHO merekomendasikan minimal satu kali USG sebelum minggu ke-24.",
    },
    {
        id: 84,
        pernyataan:
            "Ibu hamil yang mengalami varises tidak perlu penanganan khusus",
        jawaban: "mitos",
        kategori: "Kesehatan",
        penjelasan:
            "Varises saat hamil perlu diperhatikan karena bisa menimbulkan nyeri dan risiko trombosis vena dalam. Penggunaan stoking kompresi, elevasi kaki, dan menghindari berdiri terlalu lama sangat dianjurkan.",
    },
    {
        id: 85,
        pernyataan:
            "Usia ibu di atas 35 tahun meningkatkan risiko kelainan kromosom pada janin",
        jawaban: "fakta",
        kategori: "Komplikasi",
        penjelasan:
            "Risiko kelainan kromosom seperti Down syndrome meningkat signifikan seiring usia ibu. Pada usia 35 tahun risiko sekitar 1:350, dan pada usia 40 tahun sekitar 1:100. Skrining prenatal sangat dianjurkan.",
    },
    {
        id: 86,
        pernyataan:
            "Mengangkat benda berat saat hamil selalu menyebabkan keguguran",
        jawaban: "mitos",
        kategori: "Aktivitas",
        penjelasan:
            "Mengangkat benda sangat berat tidak dianjurkan karena membebani punggung, namun tidak secara langsung menyebabkan keguguran kecuali ada kondisi risiko tinggi. Teknik angkat yang benar penting diperhatikan.",
    },
    {
        id: 87,
        pernyataan: "Ibu hamil perlu menjaga kesehatan mental selama kehamilan",
        jawaban: "fakta",
        kategori: "Kesehatan Mental",
        penjelasan:
            "Stres, kecemasan, dan depresi selama kehamilan dikaitkan dengan kelahiran prematur, BBLR, dan masalah perkembangan anak. Dukungan psikologis, komunikasi terbuka dengan pasangan, dan aktivitas relaksasi sangat penting.",
    },
    {
        id: 88,
        pernyataan:
            "Minum jamu tradisional saat hamil pasti aman karena bahan alami",
        jawaban: "mitos",
        kategori: "Keselamatan",
        penjelasan:
            "Banyak bahan jamu mengandung senyawa aktif yang belum teruji keamanannya pada ibu hamil. Beberapa herbal seperti kayu manis berlebih dan jamu peluntur bisa berbahaya bagi janin. Selalu konsultasikan dengan tenaga kesehatan.",
    },
    {
        id: 89,
        pernyataan:
            "Kondisi gigi berlubang ibu hamil bisa memengaruhi kesehatan bayi",
        jawaban: "fakta",
        kategori: "Kesehatan",
        penjelasan:
            "Bakteri penyebab karies dapat ditularkan dari ibu ke bayi melalui ciuman atau berbagi sendok. Selain itu infeksi gigi kronik dikaitkan dengan peningkatan risiko kelahiran prematur.",
    },
    {
        id: 90,
        pernyataan: "Amniosentesis wajib dilakukan oleh semua ibu hamil",
        jawaban: "mitos",
        kategori: "ANC",
        penjelasan:
            "Amniosentesis adalah prosedur invasif yang hanya direkomendasikan untuk ibu dengan risiko tinggi (usia >35, hasil skrining abnormal, riwayat keluarga). Membawa risiko kecil keguguran (0,1–0,3%).",
    },
    {
        id: 91,
        pernyataan:
            "Lingkar lengan atas (LILA) ibu hamil kurang dari 23,5 cm menandakan risiko KEK",
        jawaban: "fakta",
        kategori: "Nutrisi",
        penjelasan:
            "LILA < 23,5 cm merupakan indikator Kurang Energi Kronik (KEK) pada ibu hamil yang berisiko melahirkan bayi BBLR dan stunting. Pemantauan LILA adalah bagian standar ANC di Indonesia.",
    },
    {
        id: 92,
        pernyataan:
            "Ibu hamil tidak perlu mengonsumsi vitamin tambahan jika sudah makan sehat",
        jawaban: "mitos",
        kategori: "Nutrisi",
        penjelasan:
            "Meski pola makan sehat, kebutuhan asam folat, zat besi, kalsium, dan vitamin D saat hamil sulit dipenuhi dari makanan saja. Suplemen prenatal direkomendasikan untuk memastikan kecukupan nutrisi kritis bagi perkembangan janin.",
    },
    {
        id: 93,
        pernyataan:
            "Ibu yang pernah cesar bisa mencoba persalinan normal pada kehamilan berikutnya",
        jawaban: "fakta",
        kategori: "Persalinan",
        penjelasan:
            "VBAC (Vaginal Birth After Cesarean) dimungkinkan pada sebagian ibu dengan kehamilan normal dan jaringan parut yang baik. Keputusan dibuat bersama dokter dengan mempertimbangkan jenis sayatan dan jarak kehamilan.",
    },
    {
        id: 94,
        pernyataan:
            "Ruam atau gatal di perut saat hamil pasti menandakan penyakit serius",
        jawaban: "mitos",
        kategori: "Gejala",
        penjelasan:
            "Rasa gatal ringan akibat kulit yang meregang adalah hal umum. Namun gatal parah terutama di telapak tangan dan kaki di trimester 3 bisa menandakan kolestasis obstetrik yang perlu segera dievaluasi dokter.",
    },
    {
        id: 95,
        pernyataan:
            "Inisiasi Menyusu Dini (IMD) dalam satu jam pertama setelah lahir sangat penting",
        jawaban: "fakta",
        kategori: "Menyusui",
        penjelasan:
            "IMD meningkatkan keberhasilan menyusui, memberikan kolostrum penuh antibodi, mempererat ikatan ibu-bayi, dan membantu rahim berkontraksi. WHO dan Kemenkes sangat menganjurkan IMD minimal 1 jam setelah lahir.",
    },
    {
        id: 96,
        pernyataan:
            "Kelahiran prematur hanya disebabkan oleh aktivitas fisik berlebihan",
        jawaban: "mitos",
        kategori: "Komplikasi",
        penjelasan:
            "Penyebab kelahiran prematur sangat beragam: infeksi, kehamilan kembar, preeklampsia, kelainan rahim, plasenta, stres kronik, atau tanpa penyebab jelas. Aktivitas fisik berlebihan hanya salah satu faktor risiko kecil.",
    },
    {
        id: 97,
        pernyataan:
            "Perubahan pigmentasi kulit seperti linea nigra dan melasma normal terjadi saat hamil",
        jawaban: "fakta",
        kategori: "Gejala",
        penjelasan:
            "Peningkatan hormon estrogen dan progesteron merangsang produksi melanin sehingga timbul linea nigra, melasma, dan puting yang menggelap. Biasanya memudar setelah persalinan.",
    },
    {
        id: 98,
        pernyataan:
            "Ibu hamil yang menderita HIV tidak bisa melahirkan bayi yang sehat",
        jawaban: "mitos",
        kategori: "Komplikasi",
        penjelasan:
            "Dengan program PMTCT menggunakan ARV sejak hamil, risiko penularan HIV dari ibu ke bayi bisa ditekan hingga di bawah 2%. Banyak ibu dengan HIV melahirkan bayi sehat dengan penanganan medis yang tepat.",
    },
    {
        id: 99,
        pernyataan:
            "Kolostrum (susu pertama) memiliki kandungan imunitas yang sangat tinggi",
        jawaban: "fakta",
        kategori: "Menyusui",
        penjelasan:
            "Kolostrum yang diproduksi 1–5 hari pertama setelah melahirkan mengandung IgA sekretori, sel darah putih, dan faktor pertumbuhan dalam konsentrasi tinggi. Disebut 'vaksin pertama' bayi karena manfaat kekebalan tubuhnya.",
    },
    {
        id: 100,
        pernyataan:
            "Stres berat dan berkepanjangan saat hamil tidak memengaruhi janin",
        jawaban: "mitos",
        kategori: "Kesehatan Mental",
        penjelasan:
            "Stres kronik meningkatkan kadar kortisol yang melewati plasenta, dikaitkan dengan kelahiran prematur, BBLR, gangguan perkembangan otak janin, dan masalah perilaku pada anak. Manajemen stres adalah bagian penting perawatan kehamilan.",
    },
];

// ── Komponen Feedback ──────────────────────────────────────────
function FeedbackOverlay({ isCorrect, card, onNext }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 8px 32px rgba(108,99,255,.15)",
                padding: "2rem 1.75rem",
                maxWidth: 380,
                margin: "0 auto",
                border: `2px solid ${isCorrect ? "#27ae60" : "#ff6b6b"}`,
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: ".25rem" }}>
                    {isCorrect ? "✅" : "❌"}
                </div>
                <h3
                    style={{
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: isCorrect ? "#27ae60" : "#ff6b6b",
                        marginBottom: ".25rem",
                    }}
                >
                    {isCorrect ? "Benar!" : "Kurang Tepat"}
                </h3>
                <p
                    style={{
                        fontSize: ".85rem",
                        color: "#696cff",
                        fontWeight: 600,
                    }}
                >
                    Ini adalah <strong>{card.jawaban.toUpperCase()}</strong>
                </p>
            </div>

            <div
                style={{
                    background: "#fafafa",
                    borderRadius: 12,
                    padding: "1rem",
                    marginBottom: "1.25rem",
                }}
            >
                <p
                    style={{
                        fontSize: ".8rem",
                        fontWeight: 700,
                        color: "#a0a0b0",
                        marginBottom: ".4rem",
                    }}
                >
                    📋 PENJELASAN MEDIS
                </p>
                <p
                    style={{
                        fontSize: ".9rem",
                        color: "#2d2d3a",
                        lineHeight: 1.6,
                    }}
                >
                    {card.penjelasan}
                </p>
            </div>

            <button
                onClick={onNext}
                style={{
                    width: "100%",
                    padding: ".8rem",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #696cff, #a78bfa)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: ".95rem",
                    cursor: "pointer",
                }}
            >
                Kartu Berikutnya →
            </button>
        </motion.div>
    );
}

// ── Main Game ─────────────────────────────────────────────────
function MitosFaktaGame() {
    const [cards, setCards] = useState(() =>
        [...CARDS].sort(() => Math.random() - 0.5).slice(0, 20),
    );
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [wrong, setWrong] = useState([]);
    const [phase, setPhase] = useState("game"); // "game" | "feedback" | "result"
    const [lastCorrect, setLastCorrect] = useState(null);

    const current = cards[index];

    const handleSwipe = useCallback(
        (answer) => {
            const isCorrect = answer === current.jawaban;
            setLastCorrect(isCorrect);

            if (isCorrect) {
                setScore((s) => s + 1);
                setStreak((s) => {
                    const next = s + 1;
                    setMaxStreak((m) => Math.max(m, next));
                    return next;
                });
            } else {
                setStreak(0);
                setWrong((w) => [...w, current]);
            }
            setPhase("feedback");
        },
        [current],
    );

    const handleNext = useCallback(() => {
        if (index + 1 >= cards.length) {
            setPhase("result");
        } else {
            setIndex((i) => i + 1);
            setPhase("game");
        }
    }, [index, cards.length]);

    const handleRestart = useCallback(() => {
        setCards([...CARDS].sort(() => Math.random() - 0.5));
        setIndex(0);
        setScore(0);
        setStreak(0);
        setMaxStreak(0);
        setWrong([]);
        setPhase("game");
        setLastCorrect(null);
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "2rem 1rem 4rem",
                fontFamily: "'Nunito', 'DM Sans', sans-serif",
            }}
        >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontWeight: 900,
                        color: "#2d2d3a",
                        marginBottom: ".25rem",
                    }}
                >
                    🔬 Mitos vs Fakta
                </h1>
                <p style={{ color: "#a0a0b0", fontSize: ".9rem" }}>
                    Seputar kehamilan & kebidanan
                </p>
            </div>

            <div style={{ maxWidth: 420, margin: "0 auto" }}>
                {/* ScoreBoard */}
                {phase !== "result" && (
                    <ScoreBoard
                        current={index + (phase === "feedback" ? 1 : 0)}
                        total={cards.length}
                        score={score}
                        streak={streak}
                        maxStreak={maxStreak}
                    />
                )}

                {/* Game / Feedback / Result */}
                <AnimatePresence mode="wait">
                    {phase === "game" && (
                        <motion.div
                            key={`card-${index}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GameCard
                                card={current}
                                onSwipe={handleSwipe}
                                disabled={false}
                            />
                        </motion.div>
                    )}

                    {phase === "feedback" && (
                        <FeedbackOverlay
                            key="feedback"
                            isCorrect={lastCorrect}
                            card={current}
                            onNext={handleNext}
                        />
                    )}

                    {phase === "result" && (
                        <ResultScene
                            key="result"
                            score={score}
                            total={cards.length}
                            maxStreak={maxStreak}
                            wrong={wrong}
                            onRestart={handleRestart}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ── Mount ke DOM ──────────────────────────────────────────────
const el = document.getElementById("mitos-fakta-root");
if (el) {
    if (!el._reactRoot) el._reactRoot = createRoot(el);
    el._reactRoot.render(<MitosFaktaGame />);
}
