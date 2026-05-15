// ══════════════════════════════════════════════════
// DATA PERTANYAAN
// ══════════════════════════════════════════════════

// EPDS — 10 soal tervalidasi Indonesia (Kemenkes / POGI)
const PERTANYAAN_EPDS = [
    {
        no: 1,
        teks: "Saya dapat tertawa dan melihat sisi lucu dari suatu hal",
        opsi: [
            "Sama seperti biasanya",
            "Tidak begitu banyak sekarang",
            "Jelas tidak sebanyak sekarang",
            "Tidak sama sekali",
        ],
        skor: [0, 1, 2, 3],
        reverse: true,
        flag: false,
        keterangan: "Kemampuan menikmati humor",
    },
    {
        no: 2,
        teks: "Saya dapat menikmati hal-hal yang menyenangkan dengan penuh gairah",
        opsi: [
            "Sama seperti biasanya",
            "Agak kurang dari biasanya",
            "Jelas kurang dari biasanya",
            "Hampir tidak sama sekali",
        ],
        skor: [0, 1, 2, 3],
        reverse: true,
        flag: false,
        keterangan: "Kemampuan menikmati hal menyenangkan",
    },
    {
        no: 3,
        teks: "Saya menyalahkan diri sendiri secara tidak perlu ketika sesuatu berjalan salah",
        opsi: [
            "Ya, hampir sepanjang waktu",
            "Ya, kadang-kadang",
            "Tidak terlalu sering",
            "Tidak, tidak pernah",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: false,
        keterangan: "Menyalahkan diri sendiri",
    },
    {
        no: 4,
        teks: "Saya merasa cemas atau khawatir tanpa alasan yang jelas",
        opsi: [
            "Tidak, sama sekali tidak",
            "Hampir tidak pernah",
            "Ya, kadang-kadang",
            "Ya, sangat sering",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Kecemasan tanpa alasan",
    },
    {
        no: 5,
        teks: "Saya merasa takut atau panik tanpa alasan yang jelas",
        opsi: [
            "Ya, cukup banyak",
            "Ya, kadang-kadang",
            "Tidak, tidak banyak",
            "Tidak, sama sekali tidak",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: false,
        keterangan: "Rasa takut atau panik",
    },
    {
        no: 6,
        teks: "Berbagai hal datang menimpa saya terlalu banyak",
        opsi: [
            "Ya, hampir tidak bisa mengatasi sama sekali",
            "Ya, kadang-kadang tidak bisa mengatasi seperti biasanya",
            "Tidak, hampir selalu bisa mengatasinya",
            "Tidak, saya bisa mengatasinya dengan baik seperti biasanya",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: false,
        keterangan: "Kemampuan mengatasi masalah",
    },
    {
        no: 7,
        teks: "Saya sangat tidak bahagia sehingga saya sulit tidur",
        opsi: [
            "Ya, hampir sepanjang waktu",
            "Ya, kadang-kadang",
            "Tidak terlalu sering",
            "Tidak, sama sekali tidak",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: false,
        keterangan: "Kesulitan tidur karena tidak bahagia",
    },
    {
        no: 8,
        teks: "Saya merasa sedih atau sengsara",
        opsi: [
            "Ya, hampir sepanjang waktu",
            "Ya, cukup sering",
            "Tidak terlalu sering",
            "Tidak, sama sekali tidak",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: false,
        keterangan: "Perasaan sedih atau sengsara",
    },
    {
        no: 9,
        teks: "Saya sangat tidak bahagia sehingga saya menangis",
        opsi: [
            "Ya, hampir sepanjang waktu",
            "Ya, cukup sering",
            "Hanya sesekali",
            "Tidak, tidak pernah",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: false,
        keterangan: "Menangis karena tidak bahagia",
    },
    {
        no: 10,
        teks: "Pikiran untuk menyakiti diri sendiri pernah terlintas di benak saya",
        opsi: [
            "Ya, cukup sering",
            "Kadang-kadang",
            "Hampir tidak pernah",
            "Tidak pernah",
        ],
        skor: [3, 2, 1, 0],
        reverse: false,
        flag: true,
        keterangan: "⚠ Ide menyakiti diri sendiri",
    },
];

// BABY BLUES — 10 pertanyaan standar gejala (adaptasi Kemenkes / Edinburgh Maternity Blues Scale)
const PERTANYAAN_BB = [
    {
        no: 1,
        teks: "Saya merasa mudah menangis atau ingin menangis tanpa alasan yang jelas",
        opsi: [
            "Tidak sama sekali",
            "Sesekali, ringan",
            "Cukup sering",
            "Hampir sepanjang waktu",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Mudah menangis",
    },
    {
        no: 2,
        teks: "Saya merasa mudah tersinggung atau marah tiba-tiba",
        opsi: [
            "Tidak sama sekali",
            "Sesekali",
            "Cukup sering",
            "Hampir setiap saat",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Mudah tersinggung / marah",
    },
    {
        no: 3,
        teks: "Saya merasa sedih tanpa sebab yang jelas",
        opsi: [
            "Tidak sama sekali",
            "Sesekali",
            "Cukup sering",
            "Hampir sepanjang waktu",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Perasaan sedih tanpa sebab",
    },
    {
        no: 4,
        teks: "Saya merasa cemas berlebihan tentang kondisi bayi saya",
        opsi: [
            "Tidak sama sekali",
            "Sesekali",
            "Cukup sering",
            "Hampir setiap saat",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Cemas berlebihan tentang bayi",
    },
    {
        no: 5,
        teks: "Saya merasa lelah dan kelelahan yang sangat berlebihan meski sudah beristirahat",
        opsi: [
            "Tidak sama sekali",
            "Sedikit",
            "Cukup terasa",
            "Sangat terasa berat",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Kelelahan berlebihan",
    },
    {
        no: 6,
        teks: "Saya merasa sulit berkonsentrasi atau pikiran sering kosong",
        opsi: [
            "Tidak sama sekali",
            "Sesekali",
            "Cukup sering",
            "Hampir selalu",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Sulit berkonsentrasi",
    },
    {
        no: 7,
        teks: "Saya merasa tidak mampu atau tidak percaya diri merawat bayi saya",
        opsi: [
            "Tidak sama sekali",
            "Sedikit ragu",
            "Cukup sering merasa tidak mampu",
            "Hampir selalu merasa tidak mampu",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Kurang percaya diri merawat bayi",
    },
    {
        no: 8,
        teks: "Saya merasa tidak bahagia dan tidak bisa menikmati kehadiran bayi saya",
        opsi: [
            "Tidak sama sekali, saya menikmatinya",
            "Sesekali merasa begitu",
            "Cukup sering",
            "Hampir selalu",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Tidak menikmati kehadiran bayi",
    },
    {
        no: 9,
        teks: "Saya mengalami perubahan nafsu makan — tidak mau makan atau makan berlebihan",
        opsi: [
            "Tidak ada perubahan",
            "Sedikit berubah",
            "Cukup berubah dari biasanya",
            "Sangat berubah drastis",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Perubahan nafsu makan",
    },
    {
        no: 10,
        teks: "Saya merasa kesepian dan tidak mendapat dukungan dari orang-orang sekitar saya",
        opsi: [
            "Tidak sama sekali",
            "Sesekali merasa begitu",
            "Cukup sering",
            "Hampir selalu merasa sendirian",
        ],
        skor: [0, 1, 2, 3],
        reverse: false,
        flag: false,
        keterangan: "Rasa kesepian / kurang dukungan",
    },
];

// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let modeAktif = null; // 'epds' | 'babyblues'
let PERTANYAAN = [];
let currentQ = 0;
let jawaban = [];
let skorTotal = 0;

// Identitas
let identitas = {
    nama: "",
    usia: "",
    tanggal: "",
    hariPasca: "",
    pemeriksa: "",
};

// Langsung set mode EPDS dan tampilkan form identitas
window.addEventListener("load", () => {
    pilihMode("epds");
});

// ══════════════════════════════════════════════════
// PILIH MODE
// ══════════════════════════════════════════════════
function pilihMode(mode) {
    modeAktif = mode;

    document.getElementById("boxIdentitas").style.display = "block";

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("inputTanggal").value = today;
}

function batalPilih() {
    modeAktif = null;
    document.getElementById("boxIdentitas").style.display = "none";
    document
        .getElementById("cardBB")
        .classList.remove("active-epds", "active-bb");
    document
        .getElementById("cardEPDS")
        .classList.remove("active-epds", "active-bb");
}

// ══════════════════════════════════════════════════
// MULAI SKRINING
// ══════════════════════════════════════════════════
function mulaiSkrining() {
    if (!modeAktif) return;

    const nama = document.getElementById("inputNama").value.trim();
    const usia = document.getElementById("inputUsia").value.trim();
    const tanggal = document.getElementById("inputTanggal").value;
    const hariPasca = document.getElementById("inputHariPasca").value.trim();
    const pemeriksa = document.getElementById("inputPemeriksa").value.trim();

    if (!nama) {
        Swal.fire({
            icon: "warning",
            title: "Nama wajib diisi",
            text: "Mohon isi nama pasien sebelum memulai skrining.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    identitas = {
        nama,
        usia,
        tanggal,
        hariPasca,
        pemeriksa,
    };
    PERTANYAAN = modeAktif === "epds" ? PERTANYAAN_EPDS : PERTANYAAN_BB;
    currentQ = 0;
    jawaban = new Array(PERTANYAAN.length).fill(null);
    skorTotal = 0;

    document.getElementById("boxLanding").style.display = "none";
    document.getElementById("boxQuiz").style.display = "block";

    // Setup mode badge & progress bar color
    const badge = document.getElementById("modeBadge");
    const bar = document.getElementById("progressBar");
    if (modeAktif === "epds") {
        badge.style.cssText =
            "background:#e8eaff;color:#3d3fcc;font-size:0.78rem;";
        badge.textContent = "🔵 EPDS — Edinburgh Postnatal Depression Scale";
        bar.style.background = "#696cff";
    } else {
        badge.style.cssText =
            "background:#fff8e1;color:#b8860b;font-size:0.78rem;";
        badge.textContent = "🟡 Baby Blues Checklist";
        bar.style.background = "#f5c518";
    }

    renderQ(0);
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
    document.getElementById("progressLabel").textContent =
        modeAktif === "epds"
            ? "EPDS — Depresi Postpartum"
            : "Baby Blues Checklist";

    document.getElementById("qNumBadge").textContent =
        `Pertanyaan ${idx + 1} dari ${total}`;
    document.getElementById("qText").textContent = q.teks;

    // Tags
    document.getElementById("reverseTag").style.display = q.reverse
        ? "inline-block"
        : "none";
    document.getElementById("flagTag").style.display = q.flag
        ? "inline-block"
        : "none";

    // Opsi
    const container = document.getElementById("qOptions");
    container.innerHTML = "";
    const isEpds = modeAktif === "epds";

    q.opsi.forEach((o, i) => {
        const btn = document.createElement("button");
        const isSelected = jawaban[idx] === i;
        btn.className =
            "opt-btn" +
            (isSelected ? (isEpds ? " selected" : " selected-bb") : "");
        const circleColor = isSelected
            ? isEpds
                ? "#696cff"
                : "#f5c518"
            : "#eee";
        const textColor = isSelected ? (isEpds ? "#fff" : "#fff") : "#888";
        btn.innerHTML = `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${circleColor};color:${textColor};font-size:0.7rem;font-weight:600;text-align:center;line-height:22px;margin-right:10px;flex-shrink:0;">${String.fromCharCode(65 + i)}</span>${o}`;
        btn.onclick = () => pilihOpsi(idx, i);
        container.appendChild(btn);
    });

    // Navigasi
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
    let adaFlag = false;

    PERTANYAAN.forEach((q, i) => {
        const pIdx = jawaban[i];
        if (pIdx === null) return;
        skorTotal += q.skor[pIdx];
        if (q.flag && q.skor[pIdx] > 0) adaFlag = true;
    });

    let level;
    if (modeAktif === "epds") {
        if (adaFlag || skorTotal >= 13) level = "tinggi";
        else if (skorTotal >= 10) level = "sedang";
        else level = "rendah";
    } else {
        // Baby Blues threshold
        if (skorTotal >= 15) level = "tinggi";
        else if (skorTotal >= 8) level = "sedang";
        else level = "rendah";
    }

    tampilkanHasil(level, adaFlag);
}

// ══════════════════════════════════════════════════
// TAMPILKAN HASIL
// ══════════════════════════════════════════════════
function tampilkanHasil(level, adaFlag) {
    document.getElementById("boxQuiz").style.display = "none";
    document.getElementById("boxHasil").style.display = "block";

    const isEpds = modeAktif === "epds";

    const configEPDS = {
        rendah: {
            icon: "✅",
            judul: "Tidak Ada Indikasi Depresi",
            sub: "Skor dalam batas normal — kondisi ibu relatif baik",
            badge: "background:#e6f7f2;color:#0f6e56;",
            cardBg: "#f8fffc",
            rekomendasi: [
                "✔ Lanjutkan pemantauan rutin di kunjungan nifas berikutnya",
                "✔ Berikan edukasi tentang tanda-tanda depresi postpartum kepada ibu dan keluarga",
                "✔ Pastikan ibu mendapat dukungan sosial yang cukup dari keluarga",
                "✔ Anjurkan ibu untuk tidak ragu melapor jika kondisi berubah",
                "✔ Lakukan skrining ulang pada kunjungan 3 bulan postpartum",
            ],
        },
        sedang: {
            icon: "⚠️",
            judul: "Kemungkinan Depresi Ringan–Sedang",
            sub: "Skor menunjukkan adanya gejala yang perlu ditindaklanjuti",
            badge: "background:#faeeda;color:#854f0b;",
            cardBg: "#fffdf8",
            rekomendasi: [
                "⚠ Lakukan wawancara klinis lebih mendalam untuk konfirmasi diagnosis",
                "⚠ Berikan konseling suportif oleh bidan atau psikolog",
                "⚠ Libatkan keluarga dalam pemberian dukungan emosional",
                "⚠ Pantau ulang dalam 2 minggu dengan skrining EPDS kembali",
                "⚠ Pertimbangkan rujukan ke psikolog klinis atau dokter jiwa jika tidak ada perbaikan",
                "⚠ Anjurkan ibu untuk tidak mengisolasi diri dan menjaga aktivitas harian",
            ],
        },
        tinggi: {
            icon: "🚨",
            judul: "Indikasi Depresi Postpartum",
            sub: "Skor tinggi — diperlukan evaluasi dan intervensi segera",
            badge: "background:#fdecea;color:#c0392b;",
            cardBg: "#fffafa",
            rekomendasi: [
                "🚨 SEGERA rujuk ke dokter spesialis kedokteran jiwa (SpKJ) atau psikiater",
                "🚨 Lakukan penilaian risiko keselamatan ibu dan bayi secara menyeluruh",
                "🚨 Informasikan kepada keluarga tentang kondisi ibu dan pentingnya pengawasan",
                "🚨 Jangan biarkan ibu sendirian jika ada indikasi membahayakan diri",
                "🚨 Dokumentasikan hasil skrining ini di rekam medis pasien",
                "🚨 Jadwalkan follow-up dalam 3–7 hari",
            ],
        },
    };

    const configBB = {
        rendah: {
            icon: "✅",
            judul: "Tidak Ada Baby Blues Signifikan",
            sub: "Gejala minimal, kondisi ibu dalam batas normal pasca melahirkan",
            badge: "background:#e6f7f2;color:#0f6e56;",
            cardBg: "#f8fffc",
            rekomendasi: [
                "✔ Kondisi ibu baik, lanjutkan edukasi perawatan bayi",
                "✔ Ingatkan ibu bahwa perubahan suasana hati ringan adalah normal di hari-hari awal",
                "✔ Anjurkan ibu untuk beristirahat cukup dan menerima bantuan dari keluarga",
                "✔ Pantau pada kunjungan nifas berikutnya",
                "✔ Lakukan skrining EPDS pada minggu ke-6 postpartum",
            ],
        },
        sedang: {
            icon: "⚠️",
            judul: "Gejala Baby Blues Sedang",
            sub: "Ditemukan beberapa gejala yang perlu dipantau lebih lanjut",
            badge: "background:#faeeda;color:#854f0b;",
            cardBg: "#fffdf8",
            rekomendasi: [
                "⚠ Berikan dukungan emosional dan reassurance kepada ibu",
                "⚠ Libatkan suami dan keluarga untuk membantu perawatan bayi",
                "⚠ Pantau dalam 3–5 hari, jika gejala tidak mereda lakukan skrining EPDS",
                "⚠ Edukasi ibu bahwa baby blues biasanya mereda dalam 2 minggu",
                "⚠ Pastikan ibu tidur cukup dan tidak kekurangan nutrisi",
            ],
        },
        tinggi: {
            icon: "🚨",
            judul: "Gejala Baby Blues Berat",
            sub: "Gejala signifikan — perlu evaluasi apakah sudah berkembang ke depresi postpartum",
            badge: "background:#fdecea;color:#c0392b;",
            cardBg: "#fffafa",
            rekomendasi: [
                "🚨 Gejala berat — lakukan skrining EPDS segera untuk menyingkirkan depresi postpartum",
                "🚨 Konsultasikan dengan dokter atau psikolog klinis",
                "🚨 Pastikan ibu tidak sendirian dan mendapat dukungan penuh dari keluarga",
                "🚨 Jika gejala > 2 minggu, kemungkinan besar sudah masuk kategori depresi postpartum",
                "🚨 Dokumentasikan dan jadwalkan follow-up dalam 2–3 hari",
            ],
        },
    };

    const config = isEpds ? configEPDS[level] : configBB[level];

    document.getElementById("modeLabelHasil").textContent = isEpds
        ? "EPDS — Edinburgh Postnatal Depression Scale"
        : "Baby Blues Checklist";
    document.getElementById("hasilIcon").textContent = config.icon;
    document.getElementById("hasilJudul").textContent = config.judul;
    document.getElementById("hasilSub").textContent = config.sub;
    document.getElementById("hasilBadge").style.cssText =
        config.badge + "display:inline-block;";
    document.getElementById("hasilBadge").textContent = config.judul;
    document.getElementById("hasilSkor").textContent =
        `Total skor: ${skorTotal} dari ${PERTANYAAN.length * 3} poin maksimal`;
    document.getElementById("scoreCard").style.background = config.cardBg;

    // Flag soal 10
    const flagEl = document.getElementById("flagSoal10");
    if (adaFlag) {
        flagEl.style.display = "block";
        flagEl.style.background = "#fdecea";
        flagEl.style.border = "1.5px solid #e74c3c";
        flagEl.style.borderRadius = "8px";
    } else {
        flagEl.style.display = "none";
    }

    // Detail jawaban
    const detailEl = document.getElementById("detailJawaban");
    detailEl.innerHTML = PERTANYAAN.map((q, i) => {
        const pIdx = jawaban[i];
        const pilihan = pIdx !== null ? q.opsi[pIdx] : "-";
        const skor = pIdx !== null ? q.skor[pIdx] : 0;
        const dotColor =
            skor === 0
                ? "#27ae60"
                : skor === 1
                  ? "#f39c12"
                  : skor === 2
                    ? "#e67e22"
                    : "#e74c3c";
        return `
                <div class="detail-row">
                    <div class="detail-num">${q.no}</div>
                    <div style="flex:1;">
                        <div style="font-weight:600;color:#333;font-size:0.82rem;">${q.teks}</div>
                        <div class="text-muted" style="font-size:0.78rem;margin-top:2px;">
                            Jawaban: <strong>${pilihan}</strong> &nbsp;·&nbsp;
                            <span style="background:${dotColor}22;color:${dotColor};padding:1px 7px;border-radius:20px;font-weight:600;font-size:0.75rem;">+${skor} poin</span>
                            ${q.reverse ? '<span style="background:#fff3cd;color:#856404;padding:1px 6px;border-radius:20px;font-size:0.72rem;margin-left:4px;">Reverse</span>' : ""}
                            ${q.flag ? '<span style="background:#fdecea;color:#c0392b;padding:1px 6px;border-radius:20px;font-size:0.72rem;margin-left:4px;">🚨 Kritis</span>' : ""}
                        </div>
                    </div>
                </div>`;
    }).join("");

    // Rekomendasi
    document.getElementById("isiRekomendasi").innerHTML = config.rekomendasi
        .map((r) => `<div class="mb-1">${r}</div>`)
        .join("");

    // SweetAlert
    if (adaFlag) {
        Swal.fire({
            icon: "error",
            title: "🚨 Perhatian Segera!",
            html: "Pasien mengindikasikan adanya <strong>pikiran menyakiti diri sendiri</strong>.<br>Lakukan rujukan dan pendampingan segera.",
            confirmButtonColor: "#e74c3c",
            confirmButtonText: "Saya Mengerti",
            allowOutsideClick: false,
        });
    } else if (level === "tinggi") {
        Swal.fire({
            icon: "error",
            title: "Skor Tinggi Terdeteksi",
            html: "Hasil skrining menunjukkan indikasi yang perlu penanganan segera.<br><strong>Lakukan rujukan sesuai SOP.</strong>",
            confirmButtonColor: "#e74c3c",
            confirmButtonText: "Lihat Detail",
            allowOutsideClick: false,
        });
    } else if (level === "sedang") {
        Swal.fire({
            icon: "warning",
            title: "Perlu Tindak Lanjut",
            text: "Ditemukan gejala yang perlu pemantauan lebih lanjut.",
            confirmButtonColor: "#f39c12",
            confirmButtonText: "Lihat Detail",
            timer: 4000,
        });
    }
}

// ══════════════════════════════════════════════════
// LAPORAN PDF (buka halaman baru)
// ══════════════════════════════════════════════════
function bukaLaporan() {
    const isEpds = modeAktif === "epds";
    const levelEl = document.getElementById("hasilJudul").textContent;
    const skorEl = document.getElementById("hasilSkor").textContent;
    const rekEl = document.getElementById("isiRekomendasi").innerHTML;
    const adaFlag =
        document.getElementById("flagSoal10").style.display !== "none";

    const warnaAksen =
        levelEl.includes("Indikasi") || levelEl.includes("Berat")
            ? "#c0392b"
            : levelEl.includes("Sedang") || levelEl.includes("Ringan")
              ? "#854f0b"
              : "#0f6e56";
    const warnaBg =
        levelEl.includes("Indikasi") || levelEl.includes("Berat")
            ? "#fdecea"
            : levelEl.includes("Sedang") || levelEl.includes("Ringan")
              ? "#faeeda"
              : "#e6f7f2";

    const tglCetak = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const tglFormat = identitas.tanggal
        ? new Date(identitas.tanggal).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : tglCetak;

    const tabelJawaban = PERTANYAAN.map((q, i) => {
        const pIdx = jawaban[i];
        const pilihan = pIdx !== null ? q.opsi[pIdx] : "-";
        const skor = pIdx !== null ? q.skor[pIdx] : 0;
        const bg = i % 2 === 0 ? "#fff" : "#f9f9f9";
        const warnaS =
            skor === 0 ? "#27ae60" : skor <= 1 ? "#f39c12" : "#e74c3c";
        return `<tr style="background:${bg};">
                    <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;text-align:center;">${q.no}</td>
                    <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;">${q.teks}${q.flag ? ' <span style="color:#c0392b;font-weight:700;">⚠</span>' : ""}</td>
                    <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;font-weight:600;">${pilihan}</td>
                    <td style="padding:6px 10px;border:1px solid #eee;font-size:0.75rem;text-align:center;color:${warnaS};font-weight:700;">${skor}</td>
                </tr>`;
    }).join("");

    const html = `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8">
<title>Laporan Skrining — ${isEpds ? "EPDS" : "Baby Blues"} — KIA Digital</title>
<style>
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Segoe UI',Arial,sans-serif; color:#1a1a2e; background:#fff; padding:32px 40px; }
.header { text-align:center; border-bottom:2px solid ${warnaAksen}; padding-bottom:16px; margin-bottom:20px; }
.header .label { font-size:0.68rem; color:#888; text-transform:uppercase; letter-spacing:.1em; }
.header h1 { font-size:1.3rem; font-weight:700; margin:4px 0; }
.header .sub { font-size:0.78rem; color:#555; }
.identitas-box { background:#f9f9f9; border:1px solid #eee; border-radius:8px; padding:12px 16px; margin-bottom:16px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
.identitas-box .field label { font-size:0.68rem; color:#888; text-transform:uppercase; }
.identitas-box .field span { font-size:0.82rem; font-weight:600; display:block; }
.hasil-box { background:${warnaBg}; border:1.5px solid ${warnaAksen}; border-radius:10px; padding:16px 20px; margin-bottom:16px; text-align:center; }
.hasil-box h2 { color:${warnaAksen}; font-size:1.2rem; margin-bottom:4px; }
.hasil-box p { font-size:0.8rem; color:#555; }
.flag-box { background:#fdecea; border:1.5px solid #e74c3c; border-radius:8px; padding:10px 14px; margin-bottom:16px; font-size:0.82rem; color:#c0392b; font-weight:600; }
h2.section { font-size:0.85rem; color:${warnaAksen}; font-weight:700; margin:16px 0 8px; border-left:4px solid ${warnaAksen}; padding-left:10px; }
table { width:100%; border-collapse:collapse; }
thead tr { background:${warnaAksen}; color:#fff; }
thead th { padding:8px 10px; text-align:left; font-size:0.78rem; }
.rekomendasi div { padding:4px 0; font-size:0.82rem; border-bottom:1px solid #f0f0f0; }
.ttd-box { display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-top:20px; }
.ttd-item { text-align:center; }
.ttd-item .line { border-bottom:1px solid #333; margin-bottom:6px; height:50px; }
.ttd-item p { font-size:0.75rem; color:#555; }
.note { margin-top:16px; font-size:0.72rem; color:#666; background:#fffde7; border:1px solid #ffe082; border-radius:6px; padding:10px 14px; }
.footer { margin-top:16px; font-size:0.7rem; color:#aaa; border-top:1px solid #eee; padding-top:10px; text-align:center; }
@media print { body{padding:16px 20px;} .no-print{display:none!important;} }
</style></head><body>

<div class="header">
    <div class="label">Kartu Ibu & Anak Digital — KIA Digital</div>
    <h1>Laporan Skrining ${isEpds ? "EPDS — Edinburgh Postnatal Depression Scale" : "Baby Blues Checklist"}</h1>
    <div class="sub">Dicetak: ${tglCetak} · ${isEpds ? "Berdasarkan EPDS Tervalidasi Indonesia (Kemenkes/POGI)" : "Adaptasi Edinburgh Maternity Blues Scale"}</div>
</div>

<div class="identitas-box">
    <div class="field"><label>Nama Pasien</label><span>${identitas.nama || "-"}</span></div>
    <div class="field"><label>Usia</label><span>${identitas.usia ? identitas.usia + " tahun" : "-"}</span></div>
    <div class="field"><label>Tanggal Periksa</label><span>${tglFormat}</span></div>
    <div class="field"><label>Hari Ke- Pasca Melahirkan</label><span>${identitas.hariPasca ? "Hari ke-" + identitas.hariPasca : "-"}</span></div>
    <div class="field"><label>Pemeriksa</label><span>${identitas.pemeriksa || "-"}</span></div>
    <div class="field"><label>Jenis Skrining</label><span>${isEpds ? "EPDS" : "Baby Blues"}</span></div>
</div>

<div class="hasil-box">
    <h2>${levelEl}</h2>
    <p>${skorEl}</p>
</div>

${adaFlag ? `<div class="flag-box">🚨 PERHATIAN: Pasien mengindikasikan adanya pikiran menyakiti diri sendiri (soal no.10 > 0). Lakukan rujukan dan pendampingan segera sesuai SOP.</div>` : ""}

<h2 class="section">Rekomendasi Klinis</h2>
<div class="rekomendasi">${rekEl}</div>

<h2 class="section">Detail Jawaban Per Pertanyaan</h2>
<table>
    <thead><tr>
        <th style="width:6%;text-align:center;">No</th>
        <th style="width:58%;">Pertanyaan</th>
        <th style="width:28%;">Jawaban Pasien</th>
        <th style="width:8%;text-align:center;">Skor</th>
    </tr></thead>
    <tbody>${tabelJawaban}</tbody>
    <tfoot><tr style="background:#f5f5f5;">
        <td colspan="3" style="padding:8px 10px;font-size:0.78rem;font-weight:700;border:1px solid #eee;text-align:right;">TOTAL SKOR</td>
        <td style="padding:8px 10px;font-size:0.9rem;font-weight:700;border:1px solid #eee;text-align:center;color:${warnaAksen};">${skorTotal}</td>
    </tr></tfoot>
</table>

<div class="ttd-box">
    <div class="ttd-item">
        <div class="line"></div>
        <p>Tanda tangan Pemeriksa<br><strong>${identitas.pemeriksa || "................................."}</strong></p>
    </div>
    <div class="ttd-item">
        <div class="line"></div>
        <p>Tanda tangan Pasien<br><strong>${identitas.nama || "................................."}</strong></p>
    </div>
</div>

<div class="note">
    <strong>⚠ Penting:</strong> Hasil skrining ini <strong>bukan diagnosis medis</strong>.
    ${
        isEpds
            ? "EPDS adalah alat skrining, bukan alat diagnostik. Skor ≥ 13 mengindikasikan kemungkinan depresi postpartum dan memerlukan evaluasi klinis lebih lanjut."
            : "Baby Blues adalah kondisi normal pasca melahirkan. Jika gejala berlangsung > 2 minggu atau semakin berat, segera lakukan skrining EPDS."
    }
    Selalu konsultasikan hasil ini dengan dokter atau psikolog klinis.
</div>

<div class="footer">KIA Digital · Skrining ${isEpds ? "EPDS" : "Baby Blues"} · ${tglCetak}</div>

<div class="no-print" style="margin-top:20px;text-align:center;">
    <button onclick="window.print()" style="background:${warnaAksen};color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:0.9rem;cursor:pointer;margin-right:8px;">
        🖨️ Print / Simpan PDF
    </button>
    <button onclick="window.close()" style="background:#eee;color:#333;border:none;padding:10px 20px;border-radius:8px;font-size:0.9rem;cursor:pointer;">
        ✖ Tutup
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
    document.getElementById("boxIdentitas").style.display = "none";
    document
        .getElementById("cardBB")
        .classList.remove("active-epds", "active-bb");
    document
        .getElementById("cardEPDS")
        .classList.remove("active-epds", "active-bb");
    modeAktif = "epds";
    currentQ = 0;
    jawaban = [];
    skorTotal = 0;
}

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihMode,
    batalPilih,
    mulaiSkrining,
    pilihOpsi,
    nextQ,
    prevQ,
    bukaLaporan,
    ulangSkrining,
});
