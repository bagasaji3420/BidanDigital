// ── Data jadwal ANC (6 kunjungan utama Kemenkes + tambahan klinis) ──
const ANC_SCHEDULE = [
    {
        visit: 1,
        weekMin: 1,
        weekMax: 12,
        targetWeek: 8,
        title: "Kunjungan ANC 1",
        subtitle: "Trimester 1 — Konfirmasi kehamilan",
        color: "primary",
        icon: "bx-plus-medical",
        items: [
            "Konfirmasi kehamilan & usia kehamilan",
            "Cek tekanan darah & berat badan",
            "Golongan darah & hemoglobin",
            "USG pertama (bila tersedia)",
            "Konseling nutrisi & suplemen",
        ],
    },
    {
        visit: 2,
        weekMin: 13,
        weekMax: 16,
        targetWeek: 14,
        title: "Kunjungan ANC 2",
        subtitle: "Trimester 1–2 — Skrining awal",
        color: "info",
        icon: "bx-search-alt",
        items: [
            "Cek perkembangan janin",
            "Skrining Down Syndrome (opsional)",
            "Evaluasi suplemen zat besi & asam folat",
            "Cek tekanan darah & edema",
        ],
    },
    {
        visit: 3,
        weekMin: 18,
        weekMax: 24,
        targetWeek: 20,
        title: "Kunjungan ANC 3",
        subtitle: "Trimester 2 — USG Anatomi (penting!)",
        color: "success",
        icon: "bx-heart",
        items: [
            "USG anatomi janin (organ & kelainan)",
            "Cek posisi plasenta",
            "Pantau pertumbuhan janin",
            "Evaluasi keluhan trimester 2",
            "Edukasi tanda bahaya",
        ],
    },
    {
        visit: 4,
        weekMin: 28,
        weekMax: 32,
        targetWeek: 28,
        title: "Kunjungan ANC 4",
        subtitle: "Trimester 3 — Skrining DM Gestasional",
        color: "warning",
        icon: "bx-test-tube",
        items: [
            "Skrining diabetes gestasional (GD)",
            "Cek posisi janin & TFU",
            "Pantau anemia & tekanan darah",
            "Persiapan menyusui (ASI eksklusif)",
        ],
    },
    {
        visit: 5,
        weekMin: 34,
        weekMax: 36,
        targetWeek: 36,
        title: "Kunjungan ANC 5",
        subtitle: "Menjelang persalinan — Persiapan",
        color: "danger",
        icon: "bx-child",
        items: [
            "Pantau posisi kepala janin",
            "Cek tekanan darah intensif",
            "Edukasi tanda persalinan",
            "Diskusi rencana persalinan (tempat, penolong)",
            "Siapkan perlengkapan persalinan",
        ],
    },
    {
        visit: 6,
        weekMin: 37,
        weekMax: 40,
        targetWeek: 39,
        title: "Kunjungan ANC 6",
        subtitle: "Menjelang HPL — Monitoring akhir",
        color: "secondary",
        icon: "bx-alarm",
        items: [
            "Monitoring kontraksi & tanda persalinan",
            "Cek posisi & penurunan kepala janin",
            "Pantau tekanan darah & protein urin",
            "Konfirmasi rencana & transportasi darurat",
        ],
    },
];

function formatTanggal(date) {
    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function addWeeks(date, weeks) {
    const d = new Date(date);
    d.setDate(d.getDate() + weeks * 7);
    return d;
}

function getStatusBadge(targetDate, weekMin, weekMax, currentWeek) {
    if (currentWeek > weekMax) {
        return {
            label: "Sudah Lewat",
            cls: "bg-label-secondary",
            icon: "bx-check-circle",
        };
    } else if (currentWeek >= weekMin && currentWeek <= weekMax) {
        return {
            label: "Waktunya Sekarang!",
            cls: "bg-danger text-white",
            icon: "bx-alarm",
        };
    } else {
        return {
            label: "Akan Datang",
            cls: "bg-label-primary",
            icon: "bx-time-five",
        };
    }
}

function renderANC(hpht, currentWeek, hpl) {
    const container = document.getElementById("ancContainer");
    container.innerHTML = "";

    ANC_SCHEDULE.forEach((anc) => {
        const estDate = addWeeks(hpht, anc.targetWeek);
        const status = getStatusBadge(
            estDate,
            anc.weekMin,
            anc.weekMax,
            currentWeek,
        );
        const isNow = currentWeek >= anc.weekMin && currentWeek <= anc.weekMax;
        const isPast = currentWeek > anc.weekMax;

        const itemsHTML = anc.items
            .map(
                (item) => `
                <li class="d-flex align-items-start gap-2 mb-1">
                    <i class="bx bx-chevron-right text-${anc.color} mt-1" style="font-size:0.9rem;flex-shrink:0;"></i>
                    <span style="font-size:0.875rem;">${item}</span>
                </li>
            `,
            )
            .join("");

        const cardStyle = isNow
            ? `border: 2px solid var(--bs-${anc.color}) !important; box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;`
            : isPast
              ? "opacity: 0.7;"
              : "";

        container.innerHTML += `
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="card border-0 shadow-sm h-100" style="${cardStyle}">
                        <div class="card-header border-0 pb-0">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="avatar avatar-sm bg-label-${anc.color} rounded d-flex align-items-center justify-content-center">
                                        <i class="bx ${anc.icon}"></i>
                                    </span>
                                    <div>
                                        <div class="fw-bold" style="font-size:0.9rem;">${anc.title}</div>
                                        <div class="text-muted" style="font-size:0.75rem;">Minggu ${anc.weekMin}–${anc.weekMax}</div>
                                    </div>
                                </div>
                                <span class="badge ${status.cls}" style="font-size:0.7rem;">
                                    <i class="bx ${status.icon} me-1"></i>${status.label}
                                </span>
                            </div>
                            <div class="text-muted" style="font-size:0.8rem;">${anc.subtitle}</div>
                        </div>
                        <div class="card-body pt-2">
                            <div class="mb-2 p-2 rounded" style="background:#f8f9fa;">
                                <small class="text-muted d-block"><i class="bx bx-calendar me-1"></i>Estimasi kunjungan:</small>
                                <small class="fw-semibold">${formatTanggal(estDate)}</small>
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
                                            <strong>Ini jadwalmu sekarang!</strong> Segera buat janji dengan bidan/dokter.
                                        </div>
                                    </div>`
                                : ""
                        }
                    </div>
                </div>
            `;
    });
}

function init() {
    const saved = localStorage.getItem("pregnancyData");

    if (!saved) {
        document.getElementById("stateEmpty").style.display = "";
        document.getElementById("stateContent").style.display = "none";
        return;
    }

    const data = JSON.parse(saved);

    if (!data.hpht) {
        document.getElementById("stateEmpty").style.display = "";
        document.getElementById("stateContent").style.display = "none";
        return;
    }

    document.getElementById("stateEmpty").style.display = "none";
    document.getElementById("stateContent").style.display = "";

    // Hitung usia kehamilan
    const hpht = new Date(data.hpht);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - hpht) / 86400000);
    const currentWeek = Math.min(Math.max(Math.floor(diffDays / 7), 0), 40);

    // HPL = HPHT + 280 hari
    const hpl = new Date(hpht);
    hpl.setDate(hpl.getDate() + 280);

    // Tampilkan info header
    document.getElementById("displayHPL").textContent = hpl.toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        },
    );
    document.getElementById("displayWeek").textContent = currentWeek;

    // Progress bar
    const pct = Math.round((currentWeek / 40) * 100);
    document.getElementById("progressBar").style.width = pct + "%";
    document.getElementById("progressPct").textContent = pct;

    // Render jadwal
    renderANC(hpht, currentWeek, hpl);
}

document.addEventListener("DOMContentLoaded", init);
