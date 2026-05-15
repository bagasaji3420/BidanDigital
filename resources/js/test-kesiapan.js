// ══════════════════════════════════════════════════════════════
// DATA KUESIONER
// ══════════════════════════════════════════════════════════════
const KATEGORI_SUAMI = [
    {
        id: "fin",
        label: "Finansial & Ekonomi",
        icon: "bx-wallet",
        warna: "success",
        edukasi: {
            title: "💰 Kesiapan Finansial",
            konten: `
                <p>Memiliki anak membutuhkan kesiapan finansial yang matang. Biaya yang perlu dipersiapkan meliputi:</p>
                <div class="row g-3 mt-1">
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#f0fdf4; border-left:3px solid #28a745;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#28a745;">Biaya Kehamilan & Persalinan</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>ANC (cek kandungan rutin): Rp 100-500rb/kunjungan</li>
                                <li>USG: Rp 150-500rb</li>
                                <li>Persalinan normal: Rp 3-10 juta</li>
                                <li>Persalinan SC: Rp 15-50 juta</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#f0fbff; border-left:3px solid #00cfe8;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#00cfe8;">Biaya Bayi 1 Tahun Pertama</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Perlengkapan bayi: Rp 2-10 juta</li>
                                <li>Susu formula (jika diperlukan): Rp 500rb-1jt/bulan</li>
                                <li>Imunisasi lengkap: Rp 1-5 juta</li>
                                <li>Dana darurat kesehatan bayi</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="alert alert-warning mt-3 mb-0" style="font-size:0.85rem;">
                    <i class="bx bx-bulb me-1"></i>
                    <strong>Tips:</strong> Idealnya siapkan dana darurat minimal 6x pengeluaran bulanan sebelum merencanakan kehamilan.
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya memiliki penghasilan tetap yang cukup untuk membiayai kebutuhan kehamilan dan bayi.",
                bobot: 3,
            },
            {
                q: "Saya dan istri sudah memiliki tabungan/dana darurat minimal 6 bulan pengeluaran.",
                bobot: 3,
            },
            {
                q: "Kami sudah memiliki atau merencanakan asuransi kesehatan (BPJS/swasta) untuk ibu dan bayi.",
                bobot: 2,
            },
            {
                q: "Saya siap jika istri harus cuti kerja atau berhenti bekerja sementara selama kehamilan/menyusui.",
                bobot: 2,
            },
        ],
    },
    {
        id: "mental",
        label: "Mental & Emosional",
        icon: "bx-brain",
        warna: "info",
        edukasi: {
            title: "🧠 Kesiapan Mental & Emosional",
            konten: `
                <p>Menjadi orang tua adalah perubahan besar dalam hidup. Kesiapan mental sangat penting untuk menghadapi tantangan baru.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#fff5f5; border-left:3px solid #ea5455;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#ea5455;">Tantangan yang Akan Dihadapi</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Kurang tidur di bulan-bulan awal</li>
                                <li>Perubahan dinamika hubungan suami-istri</li>
                                <li>Tekanan finansial yang meningkat</li>
                                <li>Risiko baby blues/depresi pasca melahirkan</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#f0fdf4; border-left:3px solid #28a745;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#28a745;">Yang Perlu Disiapkan</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Komunikasi terbuka dengan pasangan</li>
                                <li>Sistem support (keluarga, teman)</li>
                                <li>Kemampuan manajemen stres</li>
                                <li>Fleksibilitas menghadapi perubahan</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="alert alert-info mt-3 mb-0" style="font-size:0.85rem;">
                    <i class="bx bx-heart me-1"></i>
                    <strong>Penting:</strong> Peran suami dalam mendukung istri secara emosional selama kehamilan sangat berpengaruh pada kesehatan mental ibu dan tumbuh kembang janin.
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya siap menghadapi perubahan besar dalam rutinitas dan gaya hidup kami.",
                bobot: 2,
            },
            {
                q: "Saya mampu mengelola stres dan tidak mudah panik menghadapi situasi sulit.",
                bobot: 2,
            },
            {
                q: "Saya siap untuk aktif mendampingi istri secara emosional selama kehamilan dan pascamelahirkan.",
                bobot: 3,
            },
            {
                q: "Saya memahami risiko baby blues/depresi pasca melahirkan dan tahu cara mendukung istri.",
                bobot: 3,
            },
        ],
    },
    {
        id: "peran",
        label: "Komitmen & Peran",
        icon: "bx-user-check",
        warna: "primary",
        edukasi: {
            title: "🤝 Komitmen & Pembagian Peran",
            konten: `
                <p>Pengasuhan anak yang sehat membutuhkan keterlibatan aktif kedua orang tua, bukan hanya ibu.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12">
                        <div class="p-3 rounded" style="background:#f5f3ff; border-left:3px solid #7367f0;">
                            <div class="fw-semibold mb-2" style="font-size:0.875rem; color:#7367f0;">Peran Aktif Ayah yang Terbukti Bermanfaat</div>
                            <div class="row g-2">
                                <div class="col-6" style="font-size:0.8rem; color:#555;">✅ Ikut ANC (periksa kandungan)</div>
                                <div class="col-6" style="font-size:0.8rem; color:#555;">✅ Hadir saat persalinan</div>
                                <div class="col-6" style="font-size:0.8rem; color:#555;">✅ Membantu ganti popok</div>
                                <div class="col-6" style="font-size:0.8rem; color:#555;">✅ Mendukung program ASI eksklusif</div>
                                <div class="col-6" style="font-size:0.8rem; color:#555;">✅ Stimulasi tumbuh kembang</div>
                                <div class="col-6" style="font-size:0.8rem; color:#555;">✅ Berbagi pekerjaan rumah</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alert alert-success mt-3 mb-0" style="font-size:0.85rem;">
                    <i class="bx bx-check-circle me-1"></i>
                    Riset menunjukkan keterlibatan ayah sejak dini meningkatkan IQ anak, kestabilan emosi, dan kesehatan mental ibu.
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya bersedia ikut hadir dalam pemeriksaan kehamilan (ANC) bersama istri.",
                bobot: 2,
            },
            {
                q: "Saya siap aktif terlibat dalam pengasuhan bayi (ganti popok, memandikan, dll), bukan hanya menafkahi.",
                bobot: 3,
            },
            {
                q: "Saya dan istri sudah mendiskusikan dan sepakat tentang pembagian peran setelah bayi lahir.",
                bobot: 3,
            },
            {
                q: "Saya bersedia mengurangi aktivitas luar (nongkrong, hobi, dll) untuk lebih banyak waktu bersama keluarga.",
                bobot: 2,
            },
        ],
    },
    {
        id: "pengetahuan",
        label: "Pengetahuan Dasar",
        icon: "bx-book",
        warna: "warning",
        edukasi: {
            title: "📚 Pengetahuan Dasar Kehamilan & Parenting",
            konten: `
                <p>Suami yang berpengetahuan dapat menjadi pendukung terbaik bagi istri selama kehamilan.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#fff8e1; border-left:3px solid #ff9f43;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#ff9f43;">Yang Perlu Diketahui Suami</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Tanda bahaya kehamilan (preeklampsia, perdarahan)</li>
                                <li>Pentingnya tablet Fe & asam folat</li>
                                <li>Jadwal ANC yang dianjurkan</li>
                                <li>Tanda-tanda persalinan</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#f0fbff; border-left:3px solid #00cfe8;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#00cfe8;">Manfaat ASI Eksklusif</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Optimal untuk 6 bulan pertama</li>
                                <li>Meningkatkan imunitas bayi</li>
                                <li>Mengurangi risiko diare & ISPA</li>
                                <li>Dukungan suami = kunci sukses ASI</li>
                            </ul>
                        </div>
                    </div>
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya memahami tanda-tanda bahaya kehamilan yang harus segera ditangani (preeklampsia, perdarahan, dll).",
                bobot: 3,
            },
            {
                q: "Saya mendukung penuh program ASI eksklusif 6 bulan untuk bayi kami.",
                bobot: 3,
            },
            {
                q: "Saya bersedia belajar tentang kehamilan, persalinan, dan pengasuhan bayi sebelum/selama kehamilan.",
                bobot: 2,
            },
            {
                q: "Saya tahu pentingnya asam folat dan tablet Fe bagi ibu hamil dan akan memastikan istri mengonsumsinya.",
                bobot: 2,
            },
        ],
    },
];

const KATEGORI_ISTRI = [
    {
        id: "kesehatan",
        label: "Kesehatan Fisik",
        icon: "bx-heart-circle",
        warna: "danger",
        edukasi: {
            title: "❤️ Kesiapan Kesehatan Fisik",
            konten: `
                <p>Kesehatan fisik ibu sebelum hamil sangat menentukan kesehatan kehamilan dan janin.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#fff5f5; border-left:3px solid #ea5455;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#ea5455;">Pemeriksaan Pra-Konsepsi Penting</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Cek darah lengkap (Hb, goldar)</li>
                                <li>Cek penyakit TORCH</li>
                                <li>Cek gula darah & tekanan darah</li>
                                <li>Vaksin rubella (jika belum)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#f0fdf4; border-left:3px solid #28a745;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#28a745;">Persiapan Fisik Sebelum Hamil</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Konsumsi asam folat 400mcg/hari (minimal 3 bulan sebelum)</li>
                                <li>Jaga berat badan ideal (BMI 18.5-24.9)</li>
                                <li>Hentikan rokok & alkohol</li>
                                <li>Olahraga ringan rutin</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="alert alert-danger mt-3 mb-0" style="font-size:0.85rem;">
                    <i class="bx bx-error-circle me-1"></i>
                    <strong>Penting:</strong> Asam folat harus dikonsumsi <strong>sebelum</strong> hamil, bukan setelah tahu hamil, untuk mencegah cacat tabung saraf pada janin.
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya sudah atau berencana melakukan pemeriksaan kesehatan pra-kehamilan (cek darah, tekanan darah, dll).",
                bobot: 3,
            },
            {
                q: "Saya sudah mengonsumsi atau siap mengonsumsi asam folat sebelum dan selama kehamilan.",
                bobot: 3,
            },
            {
                q: "Saya tidak memiliki kondisi medis kronis yang belum terkontrol (diabetes, hipertensi, dll).",
                bobot: 2,
            },
            {
                q: "Saya menjaga pola makan bergizi dan berolahraga ringan secara rutin.",
                bobot: 2,
            },
        ],
    },
    {
        id: "mental_istri",
        label: "Mental & Emosional",
        icon: "bx-smile",
        warna: "info",
        edukasi: {
            title: "🌸 Kesiapan Mental & Emosional Istri",
            konten: `
                <p>Kesehatan mental ibu sangat berpengaruh pada perkembangan janin dan pengalaman kehamilan secara keseluruhan.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12">
                        <div class="p-3 rounded" style="background:#f5f3ff; border-left:3px solid #7367f0;">
                            <div class="fw-semibold mb-2" style="font-size:0.875rem; color:#7367f0;">Fakta Kesehatan Mental Ibu</div>
                            <div class="row g-2" style="font-size:0.8rem; color:#555;">
                                <div class="col-12">📊 1 dari 5 ibu mengalami depresi/kecemasan selama kehamilan</div>
                                <div class="col-12">🧠 Stres kronis ibu dapat memengaruhi perkembangan otak janin</div>
                                <div class="col-12">💜 Baby blues dialami 50-80% ibu pascamelahirkan (normal, berlangsung 2 minggu)</div>
                                <div class="col-12">⚠️ Depresi pascamelahirkan berbeda dari baby blues dan perlu penanganan profesional</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alert alert-info mt-3 mb-0" style="font-size:0.85rem;">
                    <i class="bx bx-heart me-1"></i>
                    Tidak apa-apa untuk merasa cemas atau takut. Yang penting adalah memiliki sistem support yang baik dan tidak ragu mencari bantuan profesional.
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya merasa siap secara emosional untuk menghadapi perubahan besar dalam hidup saya sebagai ibu.",
                bobot: 2,
            },
            {
                q: "Saya memiliki sistem dukungan yang baik (suami, keluarga, teman) yang bisa diandalkan.",
                bobot: 3,
            },
            {
                q: "Saya tidak sedang mengalami masalah kesehatan mental yang belum tertangani (depresi, kecemasan berat, dll).",
                bobot: 3,
            },
            {
                q: "Saya terbuka untuk mencari bantuan profesional jika mengalami kesulitan emosional selama kehamilan.",
                bobot: 2,
            },
        ],
    },
    {
        id: "pengetahuan_istri",
        label: "Pengetahuan Kehamilan",
        icon: "bx-book-heart",
        warna: "warning",
        edukasi: {
            title: "📖 Pengetahuan tentang Kehamilan & Persalinan",
            konten: `
                <p>Ibu yang berpengetahuan cenderung memiliki kehamilan yang lebih sehat dan pengalaman persalinan yang lebih positif.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#fff8e1; border-left:3px solid #ff9f43;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#ff9f43;">Yang Perlu Diketahui Ibu</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Tanda bahaya kehamilan</li>
                                <li>Nutrisi optimal selama hamil</li>
                                <li>Aktivitas yang aman & dihindari</li>
                                <li>Proses persalinan normal & SC</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="p-3 rounded" style="background:#f0fdf4; border-left:3px solid #28a745;">
                            <div class="fw-semibold mb-1" style="font-size:0.875rem; color:#28a745;">Persiapan Menyusui</div>
                            <ul class="mb-0 ps-3" style="font-size:0.8rem; color:#555;">
                                <li>Belajar teknik menyusui yang benar</li>
                                <li>Mengetahui tanda bayi cukup ASI</li>
                                <li>Cara menyimpan ASI perah</li>
                                <li>Solusi masalah menyusui umum</li>
                            </ul>
                        </div>
                    </div>
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya memahami tanda-tanda bahaya kehamilan yang perlu segera ditangani tenaga kesehatan.",
                bobot: 3,
            },
            {
                q: "Saya sudah belajar atau berencana belajar tentang teknik menyusui yang benar sebelum melahirkan.",
                bobot: 2,
            },
            {
                q: "Saya mengetahui jadwal pemeriksaan kehamilan (ANC) yang dianjurkan dan berencana mengikutinya.",
                bobot: 2,
            },
            {
                q: "Saya memahami pilihan metode persalinan dan siap berdiskusi dengan tenaga kesehatan tentang hal ini.",
                bobot: 3,
            },
        ],
    },
    {
        id: "support",
        label: "Support System",
        icon: "bx-group",
        warna: "success",
        edukasi: {
            title: "👨‍👩‍👧 Support System & Lingkungan",
            konten: `
                <p>Memiliki support system yang kuat adalah salah satu faktor terpenting untuk kehamilan yang sehat dan pengasuhan yang optimal.</p>
                <div class="row g-3 mt-1">
                    <div class="col-12">
                        <div class="p-3 rounded" style="background:#f0fdf4; border-left:3px solid #28a745;">
                            <div class="fw-semibold mb-2" style="font-size:0.875rem; color:#28a745;">Komponen Support System yang Baik</div>
                            <div class="row g-2" style="font-size:0.8rem; color:#555;">
                                <div class="col-12 col-md-6">👨 <strong>Suami:</strong> Dukungan emosional & fisik sehari-hari</div>
                                <div class="col-12 col-md-6">👩‍👧 <strong>Keluarga:</strong> Bantuan pengasuhan & rumah tangga</div>
                                <div class="col-12 col-md-6">👭 <strong>Teman:</strong> Dukungan sosial & berbagi pengalaman</div>
                                <div class="col-12 col-md-6">👩‍⚕️ <strong>Nakes:</strong> Bidan/dokter yang dipercaya</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alert alert-warning mt-3 mb-0" style="font-size:0.85rem;">
                    <i class="bx bx-home me-1"></i>
                    <strong>Tempat tinggal:</strong> Pastikan lingkungan tempat tinggal aman, bersih, dan memiliki akses ke fasilitas kesehatan.
                </div>`,
        },
        pertanyaan: [
            {
                q: "Saya dan suami sudah mendiskusikan dan sepakat tentang di mana kami akan tinggal setelah bayi lahir.",
                bobot: 2,
            },
            {
                q: "Saya memiliki akses ke fasilitas kesehatan (klinik, puskesmas, RS) yang memadai di sekitar tempat tinggal.",
                bobot: 3,
            },
            {
                q: "Ada anggota keluarga atau orang terdekat yang bisa membantu merawat bayi jika diperlukan.",
                bobot: 2,
            },
            {
                q: "Saya dan suami sudah berkomunikasi dengan baik tentang ekspektasi masing-masing setelah punya anak.",
                bobot: 3,
            },
        ],
    },
];

// ══════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════
let state = {
    fase: "suami", // 'suami' | 'istri' | 'hasil'
    kategoriFase: 0, // index kategori saat ini
    jawabanSuami: {}, // { kategoriId: [skor per pertanyaan] }
    jawabanIstri: {},
};

const OPSI = [
    {
        label: "Sangat Setuju",
        skor: 4,
        color: "#28a745",
    },
    {
        label: "Setuju",
        skor: 3,
        color: "#00cfe8",
    },
    {
        label: "Ragu-ragu",
        skor: 2,
        color: "#ff9f43",
    },
    {
        label: "Tidak Setuju",
        skor: 1,
        color: "#ea5455",
    },
];

// ══════════════════════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════════════════════
function render() {
    updateProgress();
    if (state.fase === "suami")
        renderKategori(KATEGORI_SUAMI, state.kategoriFase, "suami");
    else if (state.fase === "istri")
        renderKategori(KATEGORI_ISTRI, state.kategoriFase, "istri");
    else renderHasil();
}

function updateProgress() {
    const totalKategori = KATEGORI_SUAMI.length + KATEGORI_ISTRI.length;
    let done = 0;
    if (state.fase === "suami") done = state.kategoriFase;
    else if (state.fase === "istri")
        done = KATEGORI_SUAMI.length + state.kategoriFase;
    else done = totalKategori;

    const pct = Math.round((done / totalKategori) * 100);
    document.getElementById("progressBar").style.width = pct + "%";
    document.getElementById("progressPct").textContent = pct + "%";

    if (state.fase === "hasil") {
        document.getElementById("progressLabel").textContent =
            "Selesai! Lihat hasil di bawah.";
    } else {
        const kategoriList =
            state.fase === "suami" ? KATEGORI_SUAMI : KATEGORI_ISTRI;
        const idx = state.kategoriFase;
        document.getElementById("progressLabel").textContent =
            `Bagian ${state.fase === "suami" ? "Suami" : "Istri"} — ${kategoriList[idx].label} (${idx + 1} dari ${kategoriList.length})`;
    }
}

function renderKategori(kategoriList, idx, fase) {
    const kat = kategoriList[idx];
    const jawaban = fase === "suami" ? state.jawabanSuami : state.jawabanIstri;
    const jawabanKat = jawaban[kat.id] || [];

    const isFirst = idx === 0 && fase === "suami";
    const isLastKategori = idx === kategoriList.length - 1;
    const isLastFase = fase === "istri" && isLastKategori;

    document.getElementById("quizArea").innerHTML = `
        ${
            isFirst || (idx === 0 && fase === "istri")
                ? `
            <div class="card border-0 shadow-sm mb-4" style="border-radius:16px; background: ${fase === "suami" ? "linear-gradient(135deg, #667eea22, #764ba211)" : "linear-gradient(135deg, #f9a8d411, #fb7185111)"}; border: 2px solid ${fase === "suami" ? "#667eea44" : "#fb718544"} !important;">
                <div class="card-body p-4 text-center">
                    <div class="fw-bold fs-5 mb-1">${fase === "suami" ? "👨 Bagian Suami" : "👩 Bagian Istri"}</div>
                    <p class="text-muted mb-0" style="font-size:0.875rem;">
                        ${
                            fase === "suami"
                                ? "Pertanyaan berikut dijawab oleh <strong>suami</strong>. Jawab sejujurnya tanpa tekanan."
                                : "Sekarang giliran <strong>istri</strong> menjawab. Jawab secara jujur dan mandiri."
                        }
                    </p>
                </div>
            </div>`
                : ""
        }

        <div class="card border-0 shadow-sm mb-3" style="border-radius:16px;">
            <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                    <div class="d-flex align-items-center gap-3">
                        <span class="avatar d-flex align-items-center justify-content-center rounded bg-label-${kat.warna}" style="flex-shrink:0;">
                            <i class="bx ${kat.icon}"></i>
                        </span>
                        <div>
                            <div class="fw-bold" style="font-size:0.95rem;">${kat.label}</div>
                            <div class="text-muted" style="font-size:0.78rem;">${kat.pertanyaan.length} pertanyaan</div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary" onclick="bukaEdukasi('${kat.id}', '${fase}')">
                        <i class="bx bx-book-open me-1"></i> Baca Edukasi Dulu
                    </button>
                </div>

                <div id="pertanyaanList">
                    ${kat.pertanyaan
                        .map(
                            (p, i) => `
                            <div class="mb-4 p-3 rounded">
                                <div class="fw-semibold mb-3" style="font-size:0.875rem; line-height:1.5;">
                                    <span class="badge bg-label-secondary me-2">${i + 1}</span>${p.q}
                                </div>
                                <div class="d-flex flex-wrap gap-2">
                                    ${OPSI.map(
                                        (opsi) => `
                                    <button class="btn btn-sm opsi-btn ${jawabanKat[i] === opsi.skor ? "active-opsi" : "btn-outline-secondary"}"
                                        style="${jawabanKat[i] === opsi.skor ? `background:${opsi.color}; color:#fff; border-color:${opsi.color};` : ""}"
                                        onclick="pilihJawaban('${kat.id}', ${i}, ${opsi.skor}, '${opsi.color}', '${fase}', this)">
                                        ${opsi.label}
                                    </button>
                                `,
                                    ).join("")}
                                </div>
                            </div>
                        `,
                        )
                        .join("")}
                </div>

                <div id="feedbackKategori" class="mb-3" style="display:none;"></div>

                <div class="d-flex justify-content-between align-items-center mt-4 pt-3" style="border-top:1px solid #e9ecef;">
                    ${
                        !isFirst
                            ? `
                        <button class="btn btn-outline-secondary" onclick="prevKategori()">
                            <i class="bx bx-chevron-left me-1"></i> Sebelumnya
                        </button>`
                            : "<div></div>"
                    }
                    <button class="btn btn-primary" id="btnLanjut" onclick="nextKategori()">
                        ${isLastFase ? '<i class="bx bx-check-circle me-1"></i> Lihat Hasil' : '<i class="bx bx-chevron-right me-1"></i> ' + (isLastKategori ? "Lanjut ke Bagian Istri" : "Selanjutnya")}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function pilihJawaban(katId, pertIdx, skor, color, fase, btn) {
    const jawaban = fase === "suami" ? state.jawabanSuami : state.jawabanIstri;
    if (!jawaban[katId]) jawaban[katId] = [];
    jawaban[katId][pertIdx] = skor;

    // Update visual semua tombol di pertanyaan ini
    const allBtns = btn.closest(".d-flex").querySelectorAll(".opsi-btn");
    allBtns.forEach((b) => {
        b.className = "btn btn-sm opsi-btn btn-outline-secondary";
        b.style = "";
    });
    btn.className = "btn btn-sm opsi-btn active-opsi";
    btn.style.cssText = `background:${color}; color:#fff; border-color:${color};`;
}

function nextKategori() {
    const kategoriList =
        state.fase === "suami" ? KATEGORI_SUAMI : KATEGORI_ISTRI;
    const kat = kategoriList[state.kategoriFase];
    const jawaban =
        state.fase === "suami" ? state.jawabanSuami : state.jawabanIstri;
    const jawabanKat = jawaban[kat.id] || [];

    // Validasi semua pertanyaan dijawab
    if (
        jawabanKat.filter((v) => v !== undefined).length < kat.pertanyaan.length
    ) {
        Swal.fire({
            icon: "warning",
            title: "Belum semua dijawab",
            text: "Mohon jawab semua pertanyaan sebelum melanjutkan.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    if (state.kategoriFase < kategoriList.length - 1) {
        state.kategoriFase++;
    } else if (state.fase === "suami") {
        state.fase = "istri";
        state.kategoriFase = 0;
    } else {
        state.fase = "hasil";
        document.getElementById("quizArea").style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    render();
}

function prevKategori() {
    if (state.kategoriFase > 0) {
        state.kategoriFase--;
    } else if (state.fase === "istri") {
        state.fase = "suami";
        state.kategoriFase = KATEGORI_SUAMI.length - 1;
        document.getElementById("quizArea").style.display = "";
        document.getElementById("hasilArea").style.display = "none";
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    render();
}

// ══════════════════════════════════════════════════════════════
// EDUKASI MODAL
// ══════════════════════════════════════════════════════════════
function bukaEdukasi(katId, fase) {
    const list = fase === "suami" ? KATEGORI_SUAMI : KATEGORI_ISTRI;
    const kat = list.find((k) => k.id === katId);
    document.getElementById("modalEdukasiTitle").innerHTML =
        `<i class="bx ${kat.icon} me-2"></i>${kat.edukasi.title}`;
    document.getElementById("modalEdukasiBody").innerHTML = kat.edukasi.konten;
    const modal = new bootstrap.Modal(document.getElementById("modalEdukasi"));
    modal.show();
}

// ══════════════════════════════════════════════════════════════
// HITUNG & RENDER HASIL
// ══════════════════════════════════════════════════════════════
function hitungSkor(jawaban, kategoriList) {
    let totalBobot = 0;
    let totalSkor = 0;
    const perKategori = [];

    kategoriList.forEach((kat) => {
        const jawabanKat = jawaban[kat.id] || [];
        let skorKat = 0;
        let bobotKat = 0;
        kat.pertanyaan.forEach((p, i) => {
            const skor = jawabanKat[i] || 1;
            const maxSkor = 4;
            skorKat += skor * p.bobot;
            bobotKat += maxSkor * p.bobot;
        });
        const pct = Math.round((skorKat / bobotKat) * 100);
        perKategori.push({
            label: kat.label,
            icon: kat.icon,
            warna: kat.warna,
            pct,
        });
        totalSkor += skorKat;
        totalBobot += bobotKat;
    });

    const total = Math.round((totalSkor / totalBobot) * 100);
    return {
        total,
        perKategori,
    };
}

function getLevel(pct) {
    if (pct >= 80)
        return {
            label: "Siap",
            color: "#28a745",
            bg: "#f0fdf4",
            desc: "Sangat baik! Kamu sudah sangat siap.",
        };
    if (pct >= 60)
        return {
            label: "Cukup Siap",
            color: "#00cfe8",
            bg: "#f0fbff",
            desc: "Baik, dengan sedikit persiapan tambahan.",
        };
    if (pct >= 40)
        return {
            label: "Perlu Persiapan",
            color: "#ff9f43",
            bg: "#fff8e1",
            desc: "Ada beberapa hal yang perlu dipersiapkan lebih matang.",
        };
    return {
        label: "Belum Siap",
        color: "#ea5455",
        bg: "#fff5f5",
        desc: "Disarankan mempersiapkan diri lebih lanjut sebelum merencanakan kehamilan.",
    };
}

function renderHasil() {
    const hasilSuami = hitungSkor(state.jawabanSuami, KATEGORI_SUAMI);
    const hasilIstri = hitungSkor(state.jawabanIstri, KATEGORI_ISTRI);
    const totalGabungan = Math.round((hasilSuami.total + hasilIstri.total) / 2);
    const levelGabungan = getLevel(totalGabungan);

    document.getElementById("hasilArea").style.display = "";
    document.getElementById("hasilArea").innerHTML = `

        {{-- Skor Keseluruhan --}}
        <div class="card border-0 shadow-sm mb-4" style="border-radius:16px; overflow:hidden;">
            <div class="card-body p-4 text-center" style="background:${levelGabungan.bg};">
                <div class="fw-bold text-muted mb-2" style="font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase;">Skor Kesiapan Keseluruhan</div>
                <div class="display-3 fw-bold mb-1" style="color:${levelGabungan.color};">${totalGabungan}%</div>
                <div class="badge px-3 py-2 mb-2" style="background:${levelGabungan.color}; color:#fff; font-size:0.9rem;">${levelGabungan.label}</div>
                <p class="text-muted mb-0" style="font-size:0.875rem;">${levelGabungan.desc}</p>
            </div>
        </div>

        {{-- Skor Per Orang --}}
        <div class="row g-3 mb-4">
            ${["suami", "istri"]
                .map((fase) => {
                    const hasil = fase === "suami" ? hasilSuami : hasilIstri;
                    const level = getLevel(hasil.total);
                    return `
                    <div class="col-12 col-md-6">
                        <div class="card border-0 shadow-sm h-100" style="border-radius:16px;">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-center gap-2 mb-3">
                                    <span style="font-size:1.5rem;">${fase === "suami" ? "👨" : "👩"}</span>
                                    <div>
                                        <div class="fw-bold">${fase === "suami" ? "Suami" : "Istri"}</div>
                                        <div class="badge" style="background:${level.color}; color:#fff; font-size:0.72rem;">${level.label} — ${hasil.total}%</div>
                                    </div>
                                </div>
                                ${hasil.perKategori
                                    .map(
                                        (k) => `
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <small class="fw-semibold" style="font-size:0.8rem;">
                                            <i class="bx ${k.icon} me-1"></i>${k.label}
                                        </small>
                                        <small class="fw-bold" style="color:${getLevel(k.pct).color};">${k.pct}%</small>
                                    </div>
                                    <div class="progress" style="height:8px; border-radius:20px; background:#f0f0f0;">
                                        <div class="progress-bar" style="width:${k.pct}%; border-radius:20px; background:${getLevel(k.pct).color}; transition:width 1s ease;"></div>
                                    </div>
                                </div>
                            `,
                                    )
                                    .join("")}
                            </div>
                        </div>
                    </div>`;
                })
                .join("")}
        </div>


        <div class="card border-0 shadow-sm mb-4" style="border-radius:16px;">
            <div class="card-header border-0 pb-0 pt-4 px-4">
                <h6 class="fw-bold mb-0"><i class="bx bx-bulb me-2 text-warning"></i>Rekomendasi untuk Anda</h6>
            </div>
            <div class="card-body p-4">
                ${getRekomendasiHtml(hasilSuami, hasilIstri, totalGabungan)}
            </div>
        </div>

        {{-- Disclaimer & Tombol Ulangi --}}
        <div class="alert d-flex align-items-start gap-3 mb-4" role="alert"
            style="border-radius:12px; background:#fef2f2; border:1px solid #fca5a5;">
            <i class="bx bx-info-circle mt-1 flex-shrink-0" style="color:#b91c1c; font-size:1.2rem;"></i>
            <div style="font-size:0.82rem; color:#b91c1c;">
                <strong>Ingat:</strong> Hasil ini hanya gambaran awal dan bukan diagnosis medis.
                Konsultasikan dengan <strong>dokter, bidan, atau konselor pernikahan</strong> untuk panduan yang lebih personal dan akurat.
            </div>
        </div>

        <div class="text-center">
            <button class="btn btn-outline-primary" onclick="ulangiTest()">
                <i class="bx bx-refresh me-1"></i> Ulangi Tes
            </button>
        </div>
    `;

    window.scrollTo({
        top: document.getElementById("hasilArea").offsetTop - 80,
        behavior: "smooth",
    });
}

function getRekomendasiHtml(hasilSuami, hasilIstri, total) {
    const items = [];

    // Cek per kategori suami
    hasilSuami.perKategori.forEach((k) => {
        if (k.pct < 60)
            items.push({
                icon: "bx-error-circle",
                color: "#ff9f43",
                teks: `<strong>Suami — ${k.label}:</strong> Perlu perhatian lebih. Diskusikan bersama pasangan dan cari informasi tambahan.`,
            });
    });

    // Cek per kategori istri
    hasilIstri.perKategori.forEach((k) => {
        if (k.pct < 60)
            items.push({
                icon: "bx-error-circle",
                color: "#ff9f43",
                teks: `<strong>Istri — ${k.label}:</strong> Perlu perhatian lebih. Diskusikan bersama pasangan dan cari informasi tambahan.`,
            });
    });

    if (total >= 80)
        items.push({
            icon: "bx-check-circle",
            color: "#28a745",
            teks: "Secara keseluruhan pasangan ini sudah sangat siap. Lanjutkan komunikasi yang baik dan pertahankan persiapan yang sudah dilakukan.",
        });

    items.push({
        icon: "bx-calendar-heart",
        color: "#696cff",
        teks: "Lakukan pemeriksaan kesehatan pra-konsepsi bersama dokter atau bidan untuk memastikan kondisi fisik optimal sebelum hamil.",
    });

    items.push({
        icon: "bx-chat",
        color: "#00cfe8",
        teks: "Terus komunikasikan harapan, kekhawatiran, dan rencana bersama pasangan secara terbuka dan jujur.",
    });

    return items
        .map(
            (item) => `
        <div class="d-flex align-items-start gap-3 mb-3">
            <i class="bx ${item.icon} mt-1 flex-shrink-0" style="color:${item.color}; font-size:1.1rem;"></i>
            <div style="font-size:0.875rem;">${item.teks}</div>
        </div>
    `,
        )
        .join("");
}

function ulangiTest() {
    state = {
        fase: "suami",
        kategoriFase: 0,
        jawabanSuami: {},
        jawabanIstri: {},
    };
    document.getElementById("quizArea").style.display = "";
    document.getElementById("hasilArea").style.display = "none";
    document.getElementById("hasilArea").innerHTML = "";
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    render();
}

// ══════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    render();
});
// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihJawaban,
    nextKategori,
    prevKategori,
    bukaEdukasi,
    ulangiTest,
});
