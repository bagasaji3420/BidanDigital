const STORAGE_KEY = "nifasData";

// Jadwal KF Kemenkes RI
const KF_SCHEDULE = [
    {
        kf: 1,
        label: "KF 1",
        title: "Kunjungan Nifas 1",
        subtitle: "6 jam – 2 hari setelah melahirkan",
        dayMin: 0,
        dayMax: 2,
        color: "danger",
        icon: "bx-plus-medical",
        normal: [
            "Pantau perdarahan & kontraksi uterus",
            "Cek tekanan darah & nadi",
            "Pastikan kandung kemih kosong",
            "Ajarkan perawatan luka perineum",
            "Inisiasi menyusui dini (IMD)",
            "Observasi kondisi bayi",
        ],
        sc: [
            "Pantau perdarahan & luka operasi",
            "Cek tekanan darah & nadi",
            "Manajemen nyeri pasca SC",
            "Mobilisasi dini bertahap",
            "Inisiasi menyusui dini (IMD)",
            "Observasi kondisi bayi",
        ],
    },
    {
        kf: 2,
        label: "KF 2",
        title: "Kunjungan Nifas 2",
        subtitle: "3 – 7 hari setelah melahirkan",
        dayMin: 3,
        dayMax: 7,
        color: "warning",
        icon: "bx-heart",
        normal: [
            "Cek luka jahitan perineum",
            "Pantau lochia (cairan nifas)",
            "Evaluasi produksi ASI & teknik menyusui",
            "Skrining baby blues (Edinburgh Scale)",
            "Cek tekanan darah & suhu tubuh",
            "Konseling nutrisi ibu menyusui",
        ],
        sc: [
            "Cek luka operasi SC",
            "Pantau lochia (cairan nifas)",
            "Evaluasi produksi ASI & teknik menyusui",
            "Skrining baby blues (Edinburgh Scale)",
            "Evaluasi pemulihan mobilitas",
            "Konseling nutrisi ibu menyusui",
        ],
    },
    {
        kf: 3,
        label: "KF 3",
        title: "Kunjungan Nifas 3",
        subtitle: "8 – 28 hari setelah melahirkan",
        dayMin: 8,
        dayMax: 28,
        color: "success",
        icon: "bx-body",
        normal: [
            "Pantau involusi uterus (rahim kembali normal)",
            "Evaluasi laktasi & masalah menyusui",
            "Cek tekanan darah & kondisi umum",
            "Skrining depresi postpartum",
            "Konseling KB pasca salin",
            "Vaksin bayi (bila belum)",
        ],
        sc: [
            "Cek pemulihan luka SC",
            "Evaluasi laktasi & masalah menyusui",
            "Pantau involusi uterus",
            "Skrining depresi postpartum",
            "Konseling KB pasca salin",
            "Evaluasi pemulihan fisik",
        ],
    },
    {
        kf: 4,
        label: "KF 4",
        title: "Kunjungan Nifas 4",
        subtitle: "29 – 42 hari setelah melahirkan",
        dayMin: 29,
        dayMax: 42,
        color: "primary",
        icon: "bx-check-shield",
        normal: [
            "Evaluasi pemulihan lengkap",
            "Cek kesehatan mental (depresi postpartum)",
            "Konseling & pemasangan KB",
            "Evaluasi menyusui eksklusif",
            "Cek berat badan bayi",
            "Jadwal imunisasi bayi selanjutnya",
        ],
        sc: [
            "Evaluasi luka SC (sudah menutup sempurna?)",
            "Cek kesehatan mental (depresi postpartum)",
            "Konseling & pemasangan KB",
            "Evaluasi menyusui eksklusif",
            "Cek berat badan bayi",
            "Jadwal imunisasi bayi selanjutnya",
        ],
    },
];

function formatTgl(date) {
    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function getStatus(hariKe, dayMin, dayMax) {
    if (hariKe > dayMax)
        return {
            label: "Sudah Lewat",
            cls: "bg-label-secondary",
            icon: "bx-check-circle",
        };
    if (hariKe >= dayMin)
        return {
            label: "Waktunya Sekarang!",
            cls: "bg-danger text-white",
            icon: "bx-alarm",
        };
    return {
        label: "Akan Datang",
        cls: "bg-label-primary",
        icon: "bx-time-five",
    };
}

function renderKF(tanggalLahir, jenisLahir, hariKe) {
    const container = document.getElementById("kfContainer");
    container.innerHTML = "";

    KF_SCHEDULE.forEach((kf) => {
        const status = getStatus(hariKe, kf.dayMin, kf.dayMax);
        const isNow = hariKe >= kf.dayMin && hariKe <= kf.dayMax;
        const isPast = hariKe > kf.dayMax;

        const tglMulai = formatTgl(addDays(tanggalLahir, kf.dayMin));
        const tglSelesai = formatTgl(addDays(tanggalLahir, kf.dayMax));

        const items = jenisLahir === "sc" ? kf.sc : kf.normal;
        const itemsHTML = items
            .map(
                (i) => `
                <li class="d-flex align-items-start gap-2 mb-1">
                    <i class="bx bx-chevron-right text-${kf.color} mt-1" style="font-size:0.9rem;flex-shrink:0;"></i>
                    <span style="font-size:0.875rem;">${i}</span>
                </li>
            `,
            )
            .join("");

        const cardStyle = isNow
            ? `border: 2px solid var(--bs-${kf.color}) !important; box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;`
            : isPast
              ? "opacity:0.7;"
              : "";

        container.innerHTML += `
                <div class="col-12 col-md-6">
                    <div class="card border-0 shadow-sm h-100" style="${cardStyle}">
                        <div class="card-header border-0 pb-0">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="avatar avatar-sm bg-label-${kf.color} rounded d-flex align-items-center justify-content-center">
                                        <i class="bx ${kf.icon}"></i>
                                    </span>
                                    <div>
                                        <div class="fw-bold" style="font-size:0.9rem;">${kf.title}</div>
                                        <div class="text-muted" style="font-size:0.75rem;">${kf.subtitle}</div>
                                    </div>
                                </div>
                                <span class="badge ${status.cls}" style="font-size:0.7rem;">
                                    <i class="bx ${status.icon} me-1"></i>${status.label}
                                </span>
                            </div>
                        </div>
                        <div class="card-body pt-2">
                            <div class="mb-2 p-2 rounded" style="background:#f8f9fa;">
                                <small class="text-muted d-block"><i class="bx bx-calendar me-1"></i>Rentang kunjungan:</small>
                                <small class="fw-semibold">${tglMulai}</small>
                                <small class="text-muted d-block">s/d ${tglSelesai}</small>
                            </div>
                            <ul class="list-unstyled mb-0">
                                ${itemsHTML}
                            </ul>
                        </div>
                        ${
                            isNow
                                ? `
                                        <div class="card-footer border-0 pt-0">
                                            <div class="alert alert-danger mb-0 py-2 px-3" style="font-size:0.8rem;">
                                                <i class="bx bx-bell me-1"></i>
                                                <strong>Ini jadwalmu sekarang!</strong> Segera hubungi bidan/dokter.
                                            </div>
                                        </div>`
                                : ""
                        }
                    </div>
                </div>
            `;
    });
}

function simpanNifas() {
    const tgl = document.getElementById("inputTanggalLahir").value;
    const jenis = document.querySelector(
        'input[name="jenisLahir"]:checked',
    ).value;
    const berat = document.getElementById("inputBeratLahir").value;

    if (!tgl) {
        alert("Tanggal melahirkan wajib diisi.");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tglLahir = new Date(tgl);
    if (tglLahir > today) {
        alert("Tanggal melahirkan tidak boleh di masa depan.");
        return;
    }

    const data = {
        tanggalLahir: tgl,
        jenisLahir: jenis,
        beratLahir: berat || null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    renderContent(data);
}

function renderContent(data) {
    document.getElementById("stateForm").style.display = "none";
    document.getElementById("stateContent").style.display = "";

    const tanggalLahir = new Date(data.tanggalLahir);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hariKe = Math.floor((today - tanggalLahir) / 86400000);

    // Header
    document.getElementById("displayTanggalLahir").textContent =
        tanggalLahir.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    document.getElementById("badgeHariKe").textContent = `Hari ke-${hariKe}`;
    document.getElementById("progressHari").textContent = Math.min(hariKe, 42);

    const pct = Math.min(Math.round((hariKe / 42) * 100), 100);
    document.getElementById("progressBar").style.width = pct + "%";

    // Info jenis persalinan
    const infoEl = document.getElementById("infoJenis");
    if (data.jenisLahir === "sc") {
        infoEl.style.background = "#fffbeb";
        infoEl.innerHTML = `<i class="bx bx-info-circle text-warning mt-1"></i>
                <div><strong>Persalinan Sesar (SC):</strong> Pemulihan SC membutuhkan waktu lebih lama. Hindari angkat berat & aktivitas berat selama minimal 6 minggu. Pantau luka operasi setiap hari.
                ${data.beratLahir ? `<span class="ms-2 badge bg-label-info">Berat bayi: ${Number(data.beratLahir).toLocaleString("id-ID")} gram</span>` : ""}</div>`;
    } else {
        infoEl.style.background = "#f0fdf4";
        infoEl.innerHTML = `<i class="bx bx-info-circle text-success mt-1"></i>
                <div><strong>Persalinan Normal:</strong> Istirahat cukup & jaga kebersihan luka perineum. Boleh aktivitas ringan bertahap setelah kondisi membaik.
                ${data.beratLahir ? `<span class="ms-2 badge bg-label-info">Berat bayi: ${Number(data.beratLahir).toLocaleString("id-ID")} gram</span>` : ""}</div>`;
    }

    // Selesai masa nifas
    if (hariKe > 42) {
        document.getElementById("selesaiNifas").style.display = "";
    }

    renderKF(tanggalLahir, data.jenisLahir, hariKe);
}

function resetNifas() {
    Swal.fire({
        title: "Ubah data persalinan?",
        text: "Data tanggal lahir akan direset dan kamu perlu isi ulang.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#696cff",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, ubah!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem(STORAGE_KEY);
            document.getElementById("stateForm").style.display = "";
            document.getElementById("stateContent").style.display = "none";
        }
    });
}

function init() {
    // Set max date = hari ini
    document.getElementById("inputTanggalLahir").max = new Date()
        .toISOString()
        .split("T")[0];

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        renderContent(JSON.parse(saved));
    }
}

document.addEventListener("DOMContentLoaded", init);


// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    simpanNifas,
    resetNifas,
});