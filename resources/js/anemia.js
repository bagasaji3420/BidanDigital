const STORAGE_KEY = "anemiaData";
let apexChart = null;

// ── Helpers ──────────────────────────────────────────────────────────────
function toDateStr(date) {
    return date.toISOString().split("T")[0];
}

function formatTgl(str) {
    const d = new Date(str + "T00:00:00");
    return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function getData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Status Hb ─────────────────────────────────────────────────────────────
function getStatusHb(hb) {
    if (hb >= 11)
        return {
            label: "Normal",
            cls: "success",
            icon: "bx-check-circle",
            color: "#28a745",
        };
    if (hb >= 9)
        return {
            label: "Anemia Ringan",
            cls: "warning",
            icon: "bx-error-circle",
            color: "#ffc107",
        };
    if (hb >= 7)
        return {
            label: "Anemia Sedang",
            cls: "orange",
            icon: "bx-error",
            color: "#fd7e14",
        };
    return {
        label: "Anemia Berat",
        cls: "danger",
        icon: "bx-x-circle",
        color: "#dc3545",
    };
}

function getRekomendasiHb(hb) {
    if (hb >= 11)
        return "Kadar Hb normal. Lanjutkan konsumsi tablet Fe rutin & pola makan bergizi.";
    if (hb >= 9)
        return "Anemia ringan. Tingkatkan konsumsi tablet Fe, makanan tinggi zat besi (daging merah, bayam, kacang), dan vitamin C untuk penyerapan.";
    if (hb >= 7)
        return "Anemia sedang. Segera konsultasi dokter/bidan. Mungkin diperlukan suplemen Fe dosis lebih tinggi atau evaluasi lebih lanjut.";
    return "Anemia berat. Segera ke dokter / RS. Kondisi ini berisiko untuk ibu dan janin.";
}

// ── Setup ─────────────────────────────────────────────────────────────────
function initSetup() {
    // Preview HPL
    const pregnancy = localStorage.getItem("pregnancyData");
    const radioHPL = document.getElementById("radioHPL");
    const previewEl = document.getElementById("previewHPL");

    if (pregnancy) {
        const p = JSON.parse(pregnancy);
        if (p.hpht) {
            const mulai = new Date(p.hpht);
            mulai.setDate(mulai.getDate() + 56);
            previewEl.innerHTML = `<span class="badge bg-label-primary">${formatTgl(toDateStr(mulai))}</span>`;
            radioHPL.disabled = false;
        } else {
            radioHPL.disabled = true;
            document.getElementById("alertNoHPL").style.display = "";
        }
    } else {
        radioHPL.disabled = true;
        document.getElementById("alertNoHPL").style.display = "";
    }

    // Toggle manual picker
    document.querySelectorAll('input[name="sumberTanggal"]').forEach((r) => {
        r.addEventListener("change", () => {
            document.getElementById("wrapManual").style.display =
                r.value === "manual" && r.checked ? "" : "none";
            document.getElementById("alertNoHPL").style.display =
                r.value === "hpl" && r.checked && radioHPL.disabled
                    ? ""
                    : "none";
        });
    });
}

function simpanSetup() {
    const sumber = document.querySelector(
        'input[name="sumberTanggal"]:checked',
    );
    if (!sumber) {
        Swal.fire("Pilih sumber tanggal", "", "warning");
        return;
    }

    let tanggalMulai = null;

    if (sumber.value === "hpl") {
        const p = JSON.parse(localStorage.getItem("pregnancyData") || "{}");
        if (!p.hpht) {
            Swal.fire(
                "Data HPL tidak ditemukan",
                "Pilih input manual.",
                "warning",
            );
            return;
        }
        const d = new Date(p.hpht);
        d.setDate(d.getDate() + 56);
        tanggalMulai = toDateStr(d);
    } else {
        tanggalMulai = document.getElementById("inputTanggalManual").value;
        if (!tanggalMulai) {
            Swal.fire("Pilih tanggal mulai", "", "warning");
            return;
        }
    }

    const data = {
        tanggalMulai,
        log: {},
        riwayatHb: [],
    };
    saveData(data);
    renderContent(data);
}

// ── Render Content ────────────────────────────────────────────────────────
function renderContent(data) {
    document.getElementById("stateSetup").style.display = "none";
    document.getElementById("stateContent").style.display = "";

    // Header
    document.getElementById("displayMulai").textContent = formatTgl(
        data.tanggalMulai,
    );

    updateHeaderStats(data);
    renderTrackerTab(data);
    renderRiwayatTab(data);

    // Isi usia kehamilan otomatis di form catat Hb
    const pregnancy = localStorage.getItem("pregnancyData");
    if (pregnancy) {
        const p = JSON.parse(pregnancy);
        if (p.hpht) {
            const hpht = new Date(p.hpht);
            const today = new Date();
            const weeks = Math.floor((today - hpht) / (7 * 86400000));
            const el = document.getElementById("inputUsiaHb");
            if (el && weeks > 0) el.value = weeks;
        }
    }

    // Set default tanggal catat Hb = hari ini
    document.getElementById("inputTanggalHb").value = toDateStr(new Date());
}

// ── Header Stats ──────────────────────────────────────────────────────────
function updateHeaderStats(data) {
    const total = Object.values(data.log).filter((v) => v === true).length;
    const streak = hitungStreak(data);
    const pct = Math.min(Math.round((total / 90) * 100), 100);

    document.getElementById("displayFe").textContent = total;
    document.getElementById("displayStreak").textContent = streak;
    document.getElementById("progressBarFe").style.width = pct + "%";
    document.getElementById("progressPct").textContent = pct;
}

function hitungStreak(data) {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let d = new Date(today);
    while (true) {
        const key = toDateStr(d);
        if (data.log[key] === true) {
            streak++;
            d.setDate(d.getDate() - 1);
        } else break;
    }
    return streak;
}

// ── TAB TRACKER ───────────────────────────────────────────────────────────
function renderTrackerTab(data) {
    const todayStr = toDateStr(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Display hari ini
    document.getElementById("displayHariIni").textContent =
        today.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    // Tombol hari ini
    const btnArea = document.getElementById("btnFeArea");
    const sudahStr = data.log[todayStr];

    if (sudahStr === true) {
        btnArea.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-success px-3 py-2 fs-6"><i class="bx bx-check me-1"></i> Sudah Minum Hari Ini</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="toggleFe('${todayStr}', false)">
                        <i class="bx bx-undo"></i> Batal
                    </button>
                </div>`;
    } else if (sudahStr === false) {
        btnArea.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-danger px-3 py-2 fs-6"><i class="bx bx-x me-1"></i> Skip Hari Ini</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="toggleFe('${todayStr}', true)">
                        <i class="bx bx-undo"></i> Ubah
                    </button>
                </div>`;
    } else {
        btnArea.innerHTML = `
                <div class="d-flex gap-2">
                    <button class="btn btn-success" onclick="toggleFe('${todayStr}', true)">
                        <i class="bx bx-check me-1"></i> Sudah Minum
                    </button>
                    <button class="btn btn-outline-danger" onclick="toggleFe('${todayStr}', false)">
                        <i class="bx bx-x me-1"></i> Skip
                    </button>
                </div>`;
    }

    // Streak info
    const streak = hitungStreak(data);
    const streakEl = document.getElementById("streakInfo");
    if (streak >= 7) {
        streakEl.innerHTML = `<div class="alert alert-success py-2 mb-0">🔥 Luar biasa! Kamu sudah rutin minum Fe selama <strong>${streak} hari berturut-turut</strong>. Pertahankan!</div>`;
    } else if (streak > 0) {
        streakEl.innerHTML = `<div class="alert alert-warning py-2 mb-0">💊 Streak <strong>${streak} hari</strong>. Terus konsisten ya!</div>`;
    } else {
        streakEl.innerHTML = `<div class="alert alert-secondary py-2 mb-0">Mulai streak hari ini dengan minum tablet Fe!</div>`;
    }

    // Kalender grid
    renderKalender(data);
}

function toggleFe(dateStr, val) {
    const data = getData();
    data.log[dateStr] = val;
    saveData(data);
    updateHeaderStats(data);
    renderTrackerTab(data);
}

function renderKalender(data) {
    const grid = document.getElementById("kalenderGrid");
    const mulai = new Date(data.tanggalMulai + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const akhir = new Date(mulai);
    akhir.setDate(akhir.getDate() + 89); // 90 hari

    grid.innerHTML = "";

    // Group per bulan
    let bulanLabel = "";
    let d = new Date(mulai);
    let dayCount = 0;

    while (d <= akhir && dayCount < 90) {
        const bln = d.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
        });
        if (bln !== bulanLabel) {
            bulanLabel = bln;
            const labelEl = document.createElement("div");
            labelEl.style.cssText =
                "width:100%;font-size:0.75rem;font-weight:600;color:#8592a3;margin-top:8px;margin-bottom:2px;";
            labelEl.textContent = bln;
            grid.appendChild(labelEl);
        }

        const key = toDateStr(d);
        const isFuture = d > today;
        const val = data.log[key];
        const isToday = key === toDateStr(today);

        let bg = "#e9ecef"; // belum / future
        let title = "Belum";
        if (!isFuture) {
            if (val === true) {
                bg = "#28a745";
                title = "Minum";
            } else if (val === false) {
                bg = "#dc3545";
                title = "Skip";
            } else {
                bg = "#e9ecef";
                title = "Tidak tercatat";
            }
        }

        const box = document.createElement("div");
        box.title = `${formatTgl(key)} — ${title}`;
        box.style.cssText = `
                width: 22px; height: 22px; border-radius: 4px;
                background: ${bg}; cursor: ${isFuture ? "default" : "pointer"};
                outline: ${isToday ? "2px solid #696cff" : "none"};
                outline-offset: 1px;
                transition: transform 0.1s;
            `;
        if (!isFuture) {
            box.addEventListener("click", () => {
                const cur = data.log[key];
                const next =
                    cur === true ? false : cur === false ? undefined : true;
                if (next === undefined) delete data.log[key];
                else data.log[key] = next;
                saveData(data);
                updateHeaderStats(data);
                renderTrackerTab(data);
            });
        }

        grid.appendChild(box);
        d.setDate(d.getDate() + 1);
        dayCount++;
    }
}

// ── TAB CATAT Hb ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const inputHb = document.getElementById("inputHb");
    if (inputHb) {
        inputHb.addEventListener("input", () => {
            const hb = parseFloat(inputHb.value);
            const el = document.getElementById("hbPreview");
            if (!hb || hb < 1) {
                el.innerHTML = "";
                return;
            }
            const st = getStatusHb(hb);
            el.innerHTML = `
                    <div class="alert alert-${st.cls === "orange" ? "warning" : st.cls} py-2 mb-0">
                        <i class="bx ${st.icon} me-1"></i>
                        <strong>${st.label}</strong> — ${getRekomendasiHb(hb)}
                    </div>`;
        });
    }
});

function simpanHb() {
    const hb = parseFloat(document.getElementById("inputHb").value);
    const tgl = document.getElementById("inputTanggalHb").value;
    const usia = document.getElementById("inputUsiaHb").value;
    const gejala = [
        ...document.querySelectorAll("#gejalaCb input:checked"),
    ].map((c) => c.value);

    if (!hb || hb < 1 || hb > 20) {
        Swal.fire(
            "Nilai Hb tidak valid",
            "Masukkan nilai antara 1–20 g/dL",
            "warning",
        );
        return;
    }
    if (!tgl) {
        Swal.fire("Tanggal periksa wajib diisi", "", "warning");
        return;
    }

    const data = getData();
    data.riwayatHb = data.riwayatHb || [];

    // Cek duplikat tanggal
    const dupIdx = data.riwayatHb.findIndex((r) => r.tanggal === tgl);
    if (dupIdx > -1) {
        Swal.fire({
            title: "Sudah ada data di tanggal ini",
            text: "Timpa data lama?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#696cff",
            cancelButtonColor: "#8592a3",
            confirmButtonText: "Ya, timpa",
            cancelButtonText: "Batal",
        }).then((r) => {
            if (r.isConfirmed) {
                data.riwayatHb[dupIdx] = {
                    tanggal: tgl,
                    hb,
                    usiaKehamilan: usia || null,
                    gejala,
                };
                saveData(data);
                afterSimpanHb(data);
            }
        });
        return;
    }

    data.riwayatHb.push({
        tanggal: tgl,
        hb,
        usiaKehamilan: usia || null,
        gejala,
    });
    data.riwayatHb.sort((a, b) => a.tanggal.localeCompare(b.tanggal));
    saveData(data);
    afterSimpanHb(data);
}

function afterSimpanHb(data) {
    Swal.fire({
        icon: "success",
        title: "Data Hb tersimpan!",
        timer: 1500,
        showConfirmButton: false,
    });
    document.getElementById("inputHb").value = "";
    document.getElementById("hbPreview").innerHTML = "";
    document
        .querySelectorAll("#gejalaCb input")
        .forEach((c) => (c.checked = false));
    renderRiwayatTab(data);
    switchTab("riwayat");
}

// ── TAB RIWAYAT ───────────────────────────────────────────────────────────
function renderRiwayatTab(data) {
    const riwayat = data.riwayatHb || [];
    const listEl = document.getElementById("listRiwayat");

    if (riwayat.length === 0) {
        document.getElementById("chartHb").style.display = "none";
        document.getElementById("emptyChart").style.display = "";
        listEl.innerHTML = `<div class="text-center py-4 text-muted">Belum ada riwayat pemeriksaan Hb.</div>`;
        return;
    }

    document.getElementById("chartHb").style.display = "";
    document.getElementById("emptyChart").style.display = "none";

    // Render chart
    renderChart(riwayat);

    // Render list (terbaru dulu)
    const sorted = [...riwayat].reverse();
    listEl.innerHTML = sorted
        .map((r, i) => {
            const st = getStatusHb(r.hb);
            return `
            <div class="d-flex align-items-start gap-3 p-3 ${i < sorted.length - 1 ? "border-bottom" : ""}">
                <div class="avatar avatar-sm bg-label-${st.cls === "orange" ? "warning" : st.cls} rounded d-flex align-items-center justify-content-center" style="flex-shrink:0;">
                    <i class="bx ${st.icon}"></i>
                </div>
                <div class="flex-fill">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <div>
                            <span class="fw-bold">${r.hb} g/dL</span>
                            <span class="badge bg-label-${st.cls === "orange" ? "warning" : st.cls} ms-2">${st.label}</span>
                            ${r.usiaKehamilan ? `<span class="badge bg-label-secondary ms-1">Minggu ke-${r.usiaKehamilan}</span>` : ""}
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <small class="text-muted">${formatTgl(r.tanggal)}</small>
                            <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="hapusHb('${r.tanggal}')">
                                <i class="bx bx-trash"></i>
                            </button>
                        </div>
                    </div>
                    ${
                        r.gejala && r.gejala.length
                            ? `
                                <div class="mt-1 d-flex flex-wrap gap-1">
                                    ${r.gejala.map((g) => `<span class="badge bg-label-secondary" style="font-size:0.7rem;">${g}</span>`).join("")}
                                </div>`
                            : ""
                    }
                    <small class="text-muted d-block mt-1" style="font-size:0.8rem;">${getRekomendasiHb(r.hb)}</small>
                </div>
            </div>`;
        })
        .join("");
}

function hapusHb(tanggal) {
    Swal.fire({
        title: "Hapus data Hb ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;
        const data = getData();
        data.riwayatHb = data.riwayatHb.filter((x) => x.tanggal !== tanggal);
        saveData(data);
        renderRiwayatTab(data);
    });
}

function renderChart(riwayat) {
    const categories = riwayat.map((r) => formatTgl(r.tanggal));
    const values = riwayat.map((r) => r.hb);

    const options = {
        chart: {
            type: "line",
            height: 280,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            fontFamily: "inherit",
        },
        series: [
            {
                name: "Hb (g/dL)",
                data: values,
                color: "#696cff",
            },
        ],
        annotations: {
            yaxis: [
                {
                    y: 11,
                    borderColor: "#dc3545",
                    borderWidth: 2,
                    strokeDashArray: 4,
                    label: {
                        text: "Batas Normal (11 g/dL)",
                        style: {
                            color: "#dc3545",
                            background: "#fff5f5",
                            fontSize: "11px",
                        },
                    },
                },
            ],
        },
        xaxis: {
            categories,
            labels: {
                style: {
                    fontSize: "11px",
                },
            },
        },
        yaxis: {
            min: 5,
            max: 16,
            title: {
                text: "g/dL",
                style: {
                    fontSize: "11px",
                },
            },
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        markers: {
            size: 6,
            hover: {
                size: 8,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} g/dL`,
            },
        },
        grid: {
            borderColor: "#f0f0f0",
        },
    };

    if (apexChart) {
        apexChart.updateOptions(options);
    } else {
        apexChart = new ApexCharts(document.getElementById("chartHb"), options);
        apexChart.render();
    }
}

// ── Tab Switch ────────────────────────────────────────────────────────────
function switchTab(tab) {
    ["tracker", "catat", "riwayat"].forEach((t) => {
        document.getElementById(
            "tab" + t.charAt(0).toUpperCase() + t.slice(1),
        ).style.display = t === tab ? "" : "none";
    });
    document.querySelectorAll("#anemiaTabs .nav-link").forEach((btn, i) => {
        btn.classList.toggle(
            "active",
            ["tracker", "catat", "riwayat"][i] === tab,
        );
    });

    if (tab === "riwayat") {
        const data = getData();
        if (data) renderRiwayatTab(data);
    }
}

// ── Reset ─────────────────────────────────────────────────────────────────
function resetSetup() {
    Swal.fire({
        title: "Reset semua data anemia?",
        text: "Data tracker Fe & riwayat Hb akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, reset!",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;
        localStorage.removeItem(STORAGE_KEY);
        apexChart = null;
        document.getElementById("stateSetup").style.display = "";
        document.getElementById("stateContent").style.display = "none";
        initSetup();
        Swal.fire({
            icon: "success",
            title: "Data direset",
            timer: 1500,
            showConfirmButton: false,
        });
    });
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    initSetup();
    const data = getData();
    if (data && data.tanggalMulai) {
        renderContent(data);
    }
});

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    simpanSetup,
    simpanHb,
    hapusHb,
    toggleFe,
    switchTab,
    resetSetup,
});
