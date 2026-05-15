// ══════════════════════════════════════════════════
// DATA PERTANYAAN
// ══════════════════════════════════════════════════
const SECTIONS = [
    "Identitas & Kehamilan",
    "Riwayat Penyakit Pribadi",
    "Riwayat Keluarga",
    "Gejala Saat Ini",
    "Parameter Klinis",
];

const PERTANYAAN = [
    // ── SECTION 1: Identitas & Kehamilan ──
    {
        section: 0,
        teks: "Ini adalah kehamilan Anda yang ke berapa?",
        type: "option",
        opsi: ["Pertama", "Kedua", "Ketiga", "Keempat atau lebih"],
        skor: [2, 0, 0, 0],
        bobot: "minor",
        keterangan: "Kehamilan pertama meningkatkan risiko preeklampsia",
    },
    {
        section: 0,
        teks: "Apakah kehamilan ini kembar dua atau lebih?",
        type: "option",
        opsi: [
            "Tidak, kehamilan tunggal",
            "Ya, kembar dua",
            "Ya, kembar tiga atau lebih",
        ],
        skor: [0, 3, 5],
        bobot: "mayor",
        keterangan: "Kehamilan kembar meningkatkan risiko signifikan",
    },
    {
        section: 0,
        teks: "Berapa usia Anda saat ini?",
        type: "option",
        opsi: ["< 20 tahun", "20 – 35 tahun", "36 – 40 tahun", "> 40 tahun"],
        skor: [1, 0, 1, 2],
        bobot: "minor",
        keterangan: "Usia < 20 dan > 40 tahun berisiko lebih tinggi",
    },
    {
        section: 0,
        teks: "Berapa Indeks Massa Tubuh (BMI) Anda sebelum hamil? (BB dalam kg dibagi tinggi dalam meter dikuadratkan)",
        type: "option",
        opsi: [
            "< 18.5 (Kurus)",
            "18.5 – 24.9 (Normal)",
            "25 – 29.9 (Gemuk)",
            "≥ 30 (Obesitas)",
            "Saya tidak tahu",
        ],
        skor: [0, 0, 1, 3, 0],
        bobot: "minor",
        keterangan: "Obesitas (BMI ≥ 30) meningkatkan risiko preeklampsia",
    },
    {
        section: 0,
        teks: "Berapa jarak antara kehamilan ini dengan kehamilan sebelumnya?",
        type: "option",
        opsi: [
            "Ini kehamilan pertama saya",
            "Kurang dari 2 tahun",
            "2 – 10 tahun",
            "Lebih dari 10 tahun",
        ],
        skor: [0, 0, 0, 2],
        bobot: "minor",
        keterangan: "Jarak kehamilan > 10 tahun meningkatkan risiko",
    },

    // ── SECTION 2: Riwayat Penyakit Pribadi ──
    {
        section: 1,
        teks: "Apakah Anda pernah mengalami preeklampsia atau tekanan darah tinggi saat kehamilan sebelumnya?",
        type: "option",
        opsi: [
            "Tidak pernah",
            "Ya, pernah preeklampsia ringan",
            "Ya, pernah preeklampsia berat / eklampsia",
            "Tidak tahu / lupa",
        ],
        skor: [0, 4, 6, 0],
        bobot: "mayor",
        keterangan:
            "Riwayat preeklampsia sebelumnya adalah faktor risiko terbesar",
    },
    {
        section: 1,
        teks: "Apakah Anda memiliki riwayat tekanan darah tinggi (hipertensi) sebelum hamil?",
        type: "option",
        opsi: [
            "Tidak",
            "Ya, tapi tidak minum obat",
            "Ya, sedang minum obat darah tinggi",
            "Tidak yakin / belum pernah cek",
        ],
        skor: [0, 3, 4, 0],
        bobot: "mayor",
        keterangan:
            "Hipertensi kronis meningkatkan risiko preeklampsia superimposed",
    },
    {
        section: 1,
        teks: "Apakah Anda memiliki diabetes (kencing manis) sebelum hamil?",
        type: "option",
        opsi: [
            "Tidak",
            "Ya, diabetes tipe 1",
            "Ya, diabetes tipe 2",
            "Ya, diabetes gestasional di kehamilan lalu",
        ],
        skor: [0, 4, 3, 2],
        bobot: "mayor",
        keterangan:
            "Diabetes meningkatkan risiko preeklampsia secara signifikan",
    },
    {
        section: 1,
        teks: "Apakah Anda pernah didiagnosis penyakit ginjal oleh dokter?",
        type: "option",
        opsi: [
            "Tidak",
            "Ya, penyakit ginjal ringan",
            "Ya, penyakit ginjal kronik / berat",
            "Tidak tahu",
        ],
        skor: [0, 2, 4, 0],
        bobot: "mayor",
        keterangan: "Penyakit ginjal kronis meningkatkan risiko preeklampsia",
    },
    {
        section: 1,
        teks: "Apakah Anda pernah didiagnosis penyakit autoimun seperti lupus, sindrom antifosfolipid, atau rheumatoid arthritis?",
        type: "option",
        opsi: [
            "Tidak",
            "Ya, lupus (SLE)",
            "Ya, sindrom antifosfolipid (APS)",
            "Ya, penyakit autoimun lainnya",
            "Tidak tahu",
        ],
        skor: [0, 4, 5, 3, 0],
        bobot: "mayor",
        keterangan: "Penyakit autoimun sangat meningkatkan risiko preeklampsia",
    },
    {
        section: 1,
        teks: "Apakah Anda pernah mengalami pembekuan darah di pembuluh vena (trombosis vena dalam / DVT) atau emboli paru?",
        type: "option",
        opsi: [
            "Tidak",
            "Ya, pernah trombosis vena dalam",
            "Ya, pernah emboli paru",
            "Tidak tahu",
        ],
        skor: [0, 3, 4, 0],
        bobot: "mayor",
        keterangan:
            "Riwayat trombosis berkaitan dengan gangguan pembekuan yang meningkatkan risiko",
    },
    {
        section: 1,
        teks: "Apakah Anda pernah mengalami keguguran berulang (2 kali atau lebih)?",
        type: "option",
        opsi: [
            "Tidak / belum pernah keguguran",
            "Pernah 1 kali keguguran",
            "Ya, 2 kali keguguran",
            "Ya, 3 kali atau lebih",
        ],
        skor: [0, 0, 2, 3],
        bobot: "minor",
        keterangan:
            "Keguguran berulang bisa mengindikasikan gangguan imunologi atau trombofilia",
    },

    // ── SECTION 3: Riwayat Keluarga ──
    {
        section: 2,
        teks: "Apakah ibu kandung Anda pernah mengalami preeklampsia atau eklamsia saat hamil?",
        type: "option",
        opsi: ["Tidak", "Ya", "Tidak tahu"],
        skor: [0, 2, 0],
        bobot: "minor",
        keterangan: "Faktor genetik berkontribusi pada risiko preeklampsia",
    },
    {
        section: 2,
        teks: "Apakah saudara kandung perempuan Anda pernah mengalami preeklampsia saat hamil?",
        type: "option",
        opsi: ["Tidak / tidak punya saudara perempuan", "Ya", "Tidak tahu"],
        skor: [0, 2, 0],
        bobot: "minor",
        keterangan: "Riwayat keluarga tingkat pertama meningkatkan risiko",
    },
    {
        section: 2,
        teks: "Apakah ada anggota keluarga dekat (orang tua, saudara) yang menderita hipertensi kronis atau penyakit jantung?",
        type: "option",
        opsi: [
            "Tidak ada",
            "Ya, salah satu orang tua",
            "Ya, saudara kandung",
            "Ya, keduanya",
            "Tidak tahu",
        ],
        skor: [0, 1, 1, 2, 0],
        bobot: "minor",
        keterangan: "Riwayat keluarga hipertensi meningkatkan risiko",
    },

    // ── SECTION 4: Gejala Saat Ini ──
    {
        section: 3,
        teks: "Apakah Anda sering mengalami sakit kepala hebat yang tidak hilang dengan obat biasa belakangan ini?",
        type: "option",
        opsi: [
            "Tidak",
            "Kadang-kadang, masih bisa ditoleransi",
            "Ya, sering dan cukup mengganggu",
            "Ya, sangat sering dan berat",
        ],
        skor: [0, 1, 3, 5],
        bobot: "gejala",
        keterangan: "Sakit kepala hebat adalah gejala preeklampsia berat",
    },
    {
        section: 3,
        teks: "Apakah Anda mengalami gangguan penglihatan seperti kabur, berkunang-kunang, atau melihat bintik-bintik?",
        type: "option",
        opsi: [
            "Tidak",
            "Sesekali, ringan",
            "Ya, cukup sering",
            "Ya, sangat mengganggu",
        ],
        skor: [0, 1, 3, 5],
        bobot: "gejala",
        keterangan: "Gangguan penglihatan adalah tanda preeklampsia berat",
    },
    {
        section: 3,
        teks: "Apakah Anda merasakan nyeri atau rasa tidak nyaman di ulu hati atau perut bagian kanan atas?",
        type: "option",
        opsi: [
            "Tidak",
            "Sesekali, ringan",
            "Ya, cukup sering",
            "Ya, sangat mengganggu",
        ],
        skor: [0, 1, 3, 5],
        bobot: "gejala",
        keterangan:
            "Nyeri epigastrik menandakan keterlibatan hati pada preeklampsia",
    },
    {
        section: 3,
        teks: "Apakah kaki, tangan, atau wajah Anda mengalami pembengkakan yang tiba-tiba atau cepat membesar?",
        type: "option",
        opsi: [
            "Tidak ada pembengkakan",
            "Ada sedikit, wajar untuk ibu hamil",
            "Ya, cukup bengkak tiba-tiba",
            "Ya, sangat bengkak dan cepat",
        ],
        skor: [0, 0, 2, 4],
        bobot: "gejala",
        keterangan: "Edema mendadak dan cepat perlu diwaspadai",
    },
    {
        section: 3,
        teks: "Apakah berat badan Anda naik drastis dalam 1 minggu terakhir (lebih dari 1 kg dalam seminggu)?",
        type: "option",
        opsi: [
            "Tidak / tidak tahu",
            "Naik sedikit, normal",
            "Ya, naik lebih dari 1 kg dalam seminggu",
            "Ya, naik sangat drastis",
        ],
        skor: [0, 0, 2, 4],
        bobot: "gejala",
        keterangan: "Kenaikan BB drastis mengindikasikan retensi cairan",
    },
    {
        section: 3,
        teks: "Apakah Anda merasa buang air kecil sangat sedikit atau jarang dalam sehari belakangan ini?",
        type: "option",
        opsi: [
            "Tidak, normal seperti biasa",
            "Sedikit berkurang",
            "Ya, jauh lebih sedikit dari biasanya",
            "Ya, hampir tidak keluar",
        ],
        skor: [0, 1, 3, 5],
        bobot: "gejala",
        keterangan:
            "Oliguria (urine sedikit) adalah tanda gangguan ginjal akut",
    },

    // ── SECTION 5: Parameter Klinis ──
    {
        section: 4,
        teks: "Berapa tekanan darah Anda saat pemeriksaan terakhir? (sistolik / atas)",
        type: "option",
        opsi: [
            "< 120 mmHg (Normal)",
            "120 – 129 mmHg (Meningkat)",
            "130 – 139 mmHg (Hipertensi stage 1)",
            "140 – 159 mmHg (Hipertensi stage 2)",
            "≥ 160 mmHg (Hipertensi berat)",
            "Tidak tahu / belum pernah cek",
        ],
        skor: [0, 0, 1, 3, 6, 0],
        bobot: "klinis",
        keterangan:
            "Tekanan darah sistolik ≥ 140 mmHg adalah kriteria diagnosis preeklampsia",
    },
    {
        section: 4,
        teks: "Berapa tekanan darah diastolik (bawah) Anda saat pemeriksaan terakhir?",
        type: "option",
        opsi: [
            "< 80 mmHg (Normal)",
            "80 – 89 mmHg (Meningkat)",
            "90 – 99 mmHg (Hipertensi stage 1)",
            "100 – 109 mmHg (Hipertensi stage 2)",
            "≥ 110 mmHg (Hipertensi berat)",
            "Tidak tahu / belum pernah cek",
        ],
        skor: [0, 0, 2, 4, 6, 0],
        bobot: "klinis",
        keterangan:
            "Tekanan darah diastolik ≥ 90 mmHg adalah kriteria diagnosis preeklampsia",
    },
    {
        section: 4,
        teks: "Apakah pernah ditemukan protein dalam urine Anda saat pemeriksaan kehamilan?",
        type: "option",
        opsi: [
            "Tidak / hasil negatif",
            "Ya, trace / +1",
            "Ya, +2",
            "Ya, +3 atau lebih",
            "Belum pernah diperiksa",
        ],
        skor: [0, 2, 3, 5, 0],
        bobot: "klinis",
        keterangan: "Proteinuria adalah kriteria mayor diagnosis preeklampsia",
    },
    {
        section: 4,
        teks: "Berapa usia kehamilan Anda saat ini?",
        type: "option",
        opsi: [
            "< 20 minggu",
            "20 – 27 minggu",
            "28 – 33 minggu",
            "34 – 36 minggu",
            "≥ 37 minggu",
        ],
        skor: [0, 1, 2, 1, 0],
        bobot: "klinis",
        keterangan: "Preeklampsia paling sering muncul setelah 20 minggu",
    },
];

// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let currentQ = 0;
let jawaban = new Array(PERTANYAAN.length).fill(null);
let skorTotal = 0;

// ══════════════════════════════════════════════════
// MULAI
// ══════════════════════════════════════════════════
function mulaiSkrining() {
    document.getElementById("boxLanding").style.display = "none";
    document.getElementById("boxQuiz").style.display = "block";
    currentQ = 0;
    jawaban = new Array(PERTANYAAN.length).fill(null);
    renderQ(currentQ);
}

// ══════════════════════════════════════════════════
// RENDER PERTANYAAN
// ══════════════════════════════════════════════════
function renderQ(idx) {
    const q = PERTANYAAN[idx];
    const total = PERTANYAAN.length;

    document.getElementById("qNum").textContent = idx + 1;
    document.getElementById("qTotal").textContent = total;
    document.getElementById("progressBar").style.width =
        ((idx + 1) / total) * 100 + "%";
    document.getElementById("sectionLabel").textContent = SECTIONS[q.section];
    document.getElementById("sectionTag").textContent =
        `Section ${q.section + 1} · ${SECTIONS[q.section]}`;
    document.getElementById("qText").textContent = q.teks;

    // Opsi
    const container = document.getElementById("qOptions");
    container.innerHTML = "";
    q.opsi.forEach((o, i) => {
        const btn = document.createElement("button");
        btn.className = "opt-btn" + (jawaban[idx] === i ? " selected" : "");
        btn.innerHTML = `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${jawaban[idx] === i ? "#696cff" : "#eee"};color:${jawaban[idx] === i ? "#fff" : "#888"};font-size:0.7rem;font-weight:600;text-align:center;line-height:22px;margin-right:10px;flex-shrink:0;">${String.fromCharCode(65 + i)}</span>${o}`;
        btn.onclick = () => pilihOpsi(idx, i);
        container.appendChild(btn);
    });

    // Tombol navigasi
    document.getElementById("btnPrev").style.visibility =
        idx === 0 ? "hidden" : "visible";
    document.getElementById("btnNext").disabled = jawaban[idx] === null;
    document.getElementById("btnNext").innerHTML =
        idx === total - 1
            ? 'Lihat Hasil <i class="bx bx-check-circle ms-1"></i>'
            : 'Selanjutnya <i class="bx bx-chevron-right ms-1"></i>';
}

function pilihOpsi(qIdx, opsiIdx) {
    jawaban[qIdx] = opsiIdx;
    renderQ(qIdx);
}

function nextQ() {
    if (jawaban[currentQ] === null) return;
    if (currentQ === PERTANYAAN.length - 1) {
        hitungHasil();
        return;
    }
    currentQ++;
    renderQ(currentQ);
}

function prevQ() {
    if (currentQ === 0) return;
    currentQ--;
    renderQ(currentQ);
}

// ══════════════════════════════════════════════════
// HITUNG HASIL
// ══════════════════════════════════════════════════
function hitungHasil() {
    skorTotal = 0;
    let faktorTerdeteksi = [];

    PERTANYAAN.forEach((q, i) => {
        const pilihanIdx = jawaban[i];
        if (pilihanIdx === null) return;
        const skor = q.skor[pilihanIdx];
        if (skor > 0) {
            skorTotal += skor;
            faktorTerdeteksi.push({
                keterangan: q.keterangan,
                bobot: q.bobot,
                skor,
                section: SECTIONS[q.section],
                pilihan: q.opsi[pilihanIdx],
            });
        }
    });

    // Cek gejala berat (auto tinggi)
    const gejalaBerat = PERTANYAAN.filter(
        (q, i) =>
            q.bobot === "gejala" &&
            jawaban[i] !== null &&
            q.skor[jawaban[i]] >= 3,
    );
    const klinisKritis = PERTANYAAN.filter(
        (q, i) =>
            q.bobot === "klinis" &&
            jawaban[i] !== null &&
            q.skor[jawaban[i]] >= 5,
    );

    let level;
    if (
        gejalaBerat.length >= 2 ||
        klinisKritis.length >= 1 ||
        skorTotal >= 18
    ) {
        level = "tinggi";
    } else if (gejalaBerat.length === 1 || skorTotal >= 8) {
        level = "sedang";
    } else {
        level = "rendah";
    }

    tampilkanHasil(level, faktorTerdeteksi);
}

// ══════════════════════════════════════════════════
// TAMPILKAN HASIL
// ══════════════════════════════════════════════════
function tampilkanHasil(level, faktor) {
    document.getElementById("boxQuiz").style.display = "none";
    document.getElementById("boxHasil").style.display = "block";

    const config = {
        rendah: {
            icon: "✅",
            judul: "Risiko Rendah",
            sub: "Tidak ditemukan faktor risiko signifikan saat ini",
            badge: "background:#e6f7f2;color:#0f6e56;",
            cardBg: "#f8fffc",
            rekomendasi: [
                "✔ Lanjutkan pemeriksaan kehamilan rutin sesuai jadwal ANC",
                "✔ Pantau tekanan darah setiap kunjungan",
                "✔ Jaga pola makan rendah garam dan cukup cairan",
                "✔ Laporkan segera jika muncul gejala baru seperti sakit kepala, bengkak mendadak, atau gangguan penglihatan",
                "✔ Skrining ulang jika kondisi berubah",
            ],
        },
        sedang: {
            icon: "⚠️",
            judul: "Risiko Sedang",
            sub: "Ditemukan beberapa faktor risiko yang perlu dipantau",
            badge: "background:#faeeda;color:#854f0b;",
            cardBg: "#fffdf8",
            rekomendasi: [
                "⚠ Konsultasikan hasil skrining ini dengan bidan atau dokter kandungan",
                "⚠ Lakukan pemeriksaan tekanan darah lebih sering (minimal 2x seminggu)",
                "⚠ Pertimbangkan pemeriksaan laboratorium: protein urine, fungsi ginjal, trombosit",
                "⚠ Dokter akan mempertimbangkan pemberian aspirin dosis rendah (75-150 mg/hari) mulai usia kehamilan 12-16 minggu",
                "⚠ Segera ke fasilitas kesehatan jika TD ≥ 140/90 mmHg atau muncul gejala berat",
                "⚠ Jaga berat badan, hindari stress berlebihan, istirahat cukup",
            ],
        },
        tinggi: {
            icon: "🚨",
            judul: "Risiko Tinggi",
            sub: "Ditemukan faktor risiko mayor atau gejala yang memerlukan perhatian segera",
            badge: "background:#fdecea;color:#c0392b;",
            cardBg: "#fffafa",
            rekomendasi: [
                "🚨 SEGERA konsultasi dengan dokter spesialis kandungan (SpOG)",
                "🚨 Jangan tunda — bawa hasil skrining ini ke fasilitas kesehatan hari ini atau besok",
                "🚨 Lakukan pemeriksaan lengkap: tekanan darah, protein urine 24 jam, fungsi ginjal & hati, trombosit, USG Doppler",
                "🚨 Dokter kemungkinan akan meresepkan aspirin profilaksis dan memantau lebih ketat",
                "🚨 Jika muncul sakit kepala hebat, gangguan penglihatan, atau nyeri ulu hati — langsung ke IGD",
                "🚨 Tidak dianjurkan menunggu jadwal kontrol biasa",
            ],
        },
    };

    const c = config[level];
    document.getElementById("hasilIcon").textContent = c.icon;
    document.getElementById("hasilJudul").textContent = c.judul;
    document.getElementById("hasilSub").textContent = c.sub;
    document.getElementById("hasilBadge").style.cssText =
        c.badge + "display:inline-block;";
    document.getElementById("hasilBadge").textContent = c.judul;
    document.getElementById("hasilSkor").textContent =
        `Total skor: ${skorTotal} poin · ${faktor.length} faktor risiko terdeteksi`;
    document.getElementById("scoreCard").style.background = c.cardBg;

    // Detail faktor
    const warnaBobotDot = {
        mayor: "#e74c3c",
        minor: "#f39c12",
        gejala: "#e74c3c",
        klinis: "#9b59b6",
    };
    const labelBobot = {
        mayor: "Mayor",
        minor: "Minor",
        gejala: "Gejala",
        klinis: "Klinis",
    };

    const detailEl = document.getElementById("detailRisiko");
    if (faktor.length === 0) {
        detailEl.innerHTML =
            '<div class="text-muted" style="font-size:0.82rem;">Tidak ada faktor risiko signifikan yang terdeteksi.</div>';
    } else {
        detailEl.innerHTML = faktor
            .sort((a, b) => b.skor - a.skor)
            .map(
                (f) => `
                <div class="risiko-item">
                    <div class="risiko-dot" style="background:${warnaBobotDot[f.bobot] || "#888"};"></div>
                    <div>
                        <div style="font-weight:600; color:#333;">${f.keterangan}</div>
                        <div class="text-muted" style="font-size:0.78rem;">
                            Jawaban: ${f.pilihan} &nbsp;·&nbsp;
                            <span style="background:${warnaBobotDot[f.bobot]}22;color:${warnaBobotDot[f.bobot]};padding:1px 7px;border-radius:20px;font-weight:600;">${labelBobot[f.bobot]}</span>
                            &nbsp;·&nbsp; +${f.skor} poin &nbsp;·&nbsp; ${f.section}
                        </div>
                    </div>
                </div>
            `,
            )
            .join("");
    }

    // Rekomendasi
    document.getElementById("isiRekomendasi").innerHTML = c.rekomendasi
        .map((r) => `<div class="mb-1">${r}</div>`)
        .join("");

    // SweetAlert sesuai level
    if (level === "tinggi") {
        Swal.fire({
            icon: "error",
            title: "🚨 Risiko Tinggi Terdeteksi",
            html: "Hasil skrining menunjukkan risiko tinggi preeklampsia.<br><strong>Segera konsultasikan dengan dokter spesialis kandungan.</strong>",
            confirmButtonColor: "#e74c3c",
            confirmButtonText: "Saya Mengerti",
            allowOutsideClick: false,
        });
    } else if (level === "sedang") {
        Swal.fire({
            icon: "warning",
            title: "Risiko Sedang",
            text: "Ditemukan beberapa faktor risiko. Konsultasikan dengan bidan atau dokter Anda.",
            confirmButtonColor: "#f39c12",
            confirmButtonText: "Lihat Detail",
            timer: 4000,
        });
    }
}

// ══════════════════════════════════════════════════
// LAPORAN PDF
// ══════════════════════════════════════════════════
function bukaLaporanPE() {
    const tglCetak = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const levelEl = document.getElementById("hasilJudul").textContent;
    const skorEl = document.getElementById("hasilSkor").textContent;
    const detailEl = document.getElementById("detailRisiko").innerHTML;
    const rekEl = document.getElementById("isiRekomendasi").innerHTML;

    const warnaBg = levelEl.includes("Tinggi")
        ? "#fdecea"
        : levelEl.includes("Sedang")
          ? "#faeeda"
          : "#e6f7f2";
    const warnaAksen = levelEl.includes("Tinggi")
        ? "#c0392b"
        : levelEl.includes("Sedang")
          ? "#854f0b"
          : "#0f6e56";

    // Tabel jawaban lengkap
    const tabelJawaban = PERTANYAAN.map((q, i) => {
        const pIdx = jawaban[i];
        const pilihan = pIdx !== null ? q.opsi[pIdx] : "-";
        const skor = pIdx !== null ? q.skor[pIdx] : 0;
        const bg = i % 2 === 0 ? "#fff" : "#f9f9f9";
        return `<tr style="background:${bg};">
                <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;color:#555;">${SECTIONS[q.section]}</td>
                <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;">${q.teks}</td>
                <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;font-weight:600;">${pilihan}</td>
                <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;text-align:center;color:${skor > 0 ? "#e74c3c" : "#27ae60"};font-weight:600;">${skor > 0 ? "+" + skor : "0"}</td>
            </tr>`;
    }).join("");

    const html = `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8">
<title>Laporan Skrining Preeklampsia — KIA Digital</title>
<style>
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Segoe UI',Arial,sans-serif; color:#1a1a2e; background:#fff; padding:32px 40px; }
.header { text-align:center; border-bottom:2px solid ${warnaAksen}; padding-bottom:16px; margin-bottom:20px; }
.header .label { font-size:0.68rem; color:#888; text-transform:uppercase; letter-spacing:.1em; }
.header h1 { font-size:1.3rem; font-weight:700; margin:4px 0; }
.header .sub { font-size:0.78rem; color:#555; }
.hasil-box { background:${warnaBg}; border:1.5px solid ${warnaAksen}; border-radius:10px; padding:16px 20px; margin-bottom:20px; text-align:center; }
.hasil-box h2 { color:${warnaAksen}; font-size:1.3rem; margin-bottom:4px; }
.hasil-box p { font-size:0.8rem; color:#555; }
h2.section { font-size:0.85rem; color:${warnaAksen}; font-weight:700; margin:20px 0 10px; border-left:4px solid ${warnaAksen}; padding-left:10px; }
table { width:100%; border-collapse:collapse; font-size:0.78rem; }
thead tr { background:${warnaAksen}; color:#fff; }
thead th { padding:8px 10px; text-align:left; }
.rekomendasi div { padding:5px 0; font-size:0.82rem; border-bottom:1px solid #f0f0f0; }
.note { margin-top:16px; font-size:0.72rem; color:#666; background:#fffde7; border:1px solid #ffe082; border-radius:6px; padding:10px 14px; }
.footer { margin-top:16px; font-size:0.7rem; color:#aaa; border-top:1px solid #eee; padding-top:10px; text-align:center; }
@media print { body{padding:16px 20px;} .no-print{display:none!important;} }
</style></head><body>
<div class="header">
    <div class="label">Kartu Ibu & Anak Digital — KIA Digital</div>
    <h1>Laporan Skrining Preeklampsia</h1>
    <div class="sub">Dicetak: ${tglCetak} · Berdasarkan Panduan POGI 2023 & WHO</div>
</div>

<div class="hasil-box">
    <h2>${levelEl}</h2>
    <p>${skorEl}</p>
</div>

<h2 class="section">Rekomendasi Klinis</h2>
<div class="rekomendasi">${rekEl}</div>

<h2 class="section">Faktor Risiko Terdeteksi</h2>
${detailEl}

<h2 class="section">Detail Jawaban Lengkap</h2>
<table>
    <thead><tr>
        <th style="width:18%;">Section</th>
        <th style="width:52%;">Pertanyaan</th>
        <th style="width:22%;">Jawaban</th>
        <th style="width:8%;text-align:center;">Skor</th>
    </tr></thead>
    <tbody>${tabelJawaban}</tbody>
</table>

<div class="note">
    <strong>⚠ Penting:</strong> Hasil skrining ini <strong>bukan diagnosis medis</strong>.
    Skrining hanya menilai faktor risiko berdasarkan jawaban yang diberikan.
    Selalu konsultasikan hasil ini dengan bidan atau dokter spesialis kandungan untuk evaluasi lebih lanjut.
</div>
<div class="footer">KIA Digital · Skrining Preeklampsia · Panduan POGI 2023 & WHO</div>
<div class="no-print" style="margin-top:20px;text-align:center;">
    <button onclick="window.print()" style="background:${warnaAksen};color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:0.9rem;cursor:pointer;">
        🖨️ Print / Simpan PDF
    </button>
</div>
</body></html>`;

    const tab = window.open("", "_blank");
    tab.document.write(html);
    tab.document.close();
}

// ══════════════════════════════════════════════════
// ULANG
// ══════════════════════════════════════════════════
function ulangSkrining() {
    document.getElementById("boxHasil").style.display = "none";
    document.getElementById("boxLanding").style.display = "block";
    currentQ = 0;
    jawaban = new Array(PERTANYAAN.length).fill(null);
    skorTotal = 0;
}

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    mulaiSkrining,
    pilihOpsi,
    nextQ,
    prevQ,
    bukaLaporanPE,
    ulangSkrining,
});
