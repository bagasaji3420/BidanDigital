const STORAGE_KEY = "haidData";
let viewYear, viewMonth; // kalender yang sedang ditampilkan

// ── Helpers ──────────────────────────────────────────────────────────────
function fromStr(str) {
    const [y, m, d] = str.split("-").map(Number);
    const date = new Date(y, m - 1, d, 7, 0, 0, 0); // jam 7 pagi WIB
    return date;
}

function toStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function formatTgl(str) {
    return fromStr(str).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    d.setHours(7, 0, 0, 0); // paksa WIB
    return d;
}

function getData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Setup ─────────────────────────────────────────────────────────────────
window.simpanSetup = function () {
    const siklus = parseInt(document.getElementById("setupSiklus").value);
    const durasi = parseInt(document.getElementById("setupDurasi").value);
    if (!siklus || siklus < 21 || siklus > 45) {
        Swal.fire(
            "Panjang siklus tidak valid",
            "Isi antara 21–45 hari",
            "warning",
        );
        return;
    }
    if (!durasi || durasi < 2 || durasi > 10) {
        Swal.fire("Durasi haid tidak valid", "Isi antara 2–10 hari", "warning");
        return;
    }
    let data = getData() || { riwayat: [] };
    data.siklus = siklus;
    data.durasi = durasi;
    saveData(data);
    renderAll(data);
    updateTombolHaid(data);
};

// ── Fase per hari dalam siklus ────────────────────────────────────────────
function getFase(hariKe, siklus, durasi) {
    // hariKe = 1-based dari H1 haid
    const ovulasi = siklus - 14;
    const pmsStart = siklus - 4;

    if (hariKe >= 1 && hariKe <= durasi) return "menstruasi";
    if (hariKe > durasi && hariKe < ovulasi) return "folikuler";
    if (hariKe === ovulasi) return "ovulasi";
    if (hariKe > ovulasi && hariKe < pmsStart) return "luteal";
    if (hariKe >= pmsStart && hariKe <= siklus) return "pms";
    return "normal";
}

const FASE_STYLE = {
    menstruasi: {
        bg: "#ea5455",
        color: "#fff",
        label: "Menstruasi",
    },
    folikuler: {
        bg: "#00cfe8",
        color: "#fff",
        label: "Folikuler",
    },
    ovulasi: {
        bg: "#28a745",
        color: "#fff",
        label: "Ovulasi",
    },
    luteal: {
        bg: "#7367f0",
        color: "#fff",
        label: "Luteal",
    },
    pms: {
        bg: "#ff9f43",
        color: "#fff",
        label: "PMS",
    },
    normal: {
        bg: "#e9ecef",
        color: "#6c757d",
        label: "Normal",
    },
    aktual: {
        bg: "#ea5455",
        color: "#fff",
        label: "Menstruasi",
    },
};

// ── Hitung fase semua hari di range ──────────────────────────────────────
function buildFaseMap(data) {
    const map = {};
    const { siklus, durasi, riwayat } = data;
    if (!riwayat.length) return map;

    const today = new Date();
    const endDate = addDays(today, 184); // ~6 bulan ke depan

    riwayat.forEach((entry) => {
        const mulai = fromStr(entry.mulai);
        const durasiAktual = entry.selesai
            ? Math.floor((fromStr(entry.selesai) - mulai) / 86400000) + 1
            : durasi;

       

        // Siklus aktual
        for (let h = 1; h <= siklus; h++) {
            const tgl = addDays(mulai, h - 1);
            const key = toStr(tgl);
            if (!map[key]) {
                map[key] = getFase(h, siklus, durasiAktual);
               
            }
        }

        // Prediksi 6 siklus ke depan
        for (let s = 1; s <= 6; s++) {
            const nextStart = addDays(mulai, s * siklus);
            if (nextStart > endDate) break;
            for (let h = 1; h <= siklus; h++) {
                const tgl = addDays(nextStart, h - 1);
                if (tgl > endDate) break;
                const key = toStr(tgl);
                if (!map[key]) map[key] = getFase(h, siklus, durasi);
            }
        }
    });



    return map;
}

// ── Kalender ──────────────────────────────────────────────────────────────
function renderKalender(data) {
    const faseMap = buildFaseMap(data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = toStr(today);

    const title = new Date(viewYear, viewMonth).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
    });
    document.getElementById("kalenderTitle").textContent = title;

    const grid = document.getElementById("kalenderGrid");
    grid.innerHTML = "";

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Padding awal
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(viewYear, viewMonth, d);
        const dateStr = toStr(date);
        const fase = faseMap[dateStr] || "normal";
        const style = FASE_STYLE[fase];
        const isToday = dateStr === todayStr;
        const isFuture = date > today;

        grid.innerHTML += `
                <div style="
                    aspect-ratio:1;
                    border-radius:8px;
                    background:${style.bg};
                    color:${style.color};
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:0.8rem;
                    font-weight:${isToday ? "700" : "400"};
                    outline:${isToday ? "2px solid #696cff" : "none"};
                    outline-offset:2px;
                    opacity:1;
                    cursor:default;
                    position:relative;
                " title="${style.label}">
                    ${d}
                    ${isToday ? `<span style="position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#696cff;"></span>` : ""}
                </div>`;
    }
}

window.prevMonth = function () {
    viewMonth--;
    if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
    }
    const data = getData();
    if (data) renderKalender(data);
};

window.nextMonth = function () {
    viewMonth++;
    if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
    }
    const data = getData();
    if (data) renderKalender(data);
};

window.goToday = function () {
    const now = new Date();
    viewYear = now.getFullYear();
    viewMonth = now.getMonth();
    const data = getData();
    if (data) renderKalender(data);
};

// ── Sidebar: Fase Sekarang ────────────────────────────────────────────────
function renderFaseSekarang(data) {
    const el = document.getElementById("faseSekarang");
    const { riwayat, siklus, durasi } = data;
    if (!riwayat.length) return;

    const last = riwayat[riwayat.length - 1];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const mulai = fromStr(last.mulai);
    const diffDay = Math.floor((today - mulai) / 86400000);
    const hariKe = (diffDay % siklus) + 1;
    const fase = getFase(hariKe, siklus, durasi);
    const style = FASE_STYLE[fase];

    const ovulasi = siklus - 14;
    const pmsStart = siklus - 4;

    const faseDesc = {
        menstruasi:
            "Kamu sedang dalam masa menstruasi. Istirahat cukup dan perbanyak cairan.",
        folikuler:
            "Fase folikuler — energi meningkat, mood membaik. Estrogen mulai naik.",
        ovulasi: "Hari ovulasi! Ini masa paling subur dalam siklusmu.",
        luteal: "Fase luteal — progesteron dominan. Mungkin mulai terasa perubahan mood.",
        pms: "Mendekati haid — gejala PMS mungkin muncul. Jaga pola makan & istirahat.",
    };

    el.innerHTML = `
            <div class="text-center">
                <div class="badge px-3 py-2 mb-2" style="background:${style.bg};color:${style.color};font-size:0.9rem;">
                    ${style.label}
                </div>
                <div class="text-muted mb-3" style="font-size:0.8rem;">${faseDesc[fase] || ""}</div>
                <div class="d-flex justify-content-around">
                    <div class="text-center">
                        <div class="fw-bold fs-5">${hariKe}</div>
                        <div class="text-muted" style="font-size:0.75rem;">Hari ke-</div>
                    </div>
                    <div class="text-center">
                        <div class="fw-bold fs-5">${ovulasi}</div>
                        <div class="text-muted" style="font-size:0.75rem;">Ovulasi hari</div>
                    </div>
                    <div class="text-center">
                        <div class="fw-bold fs-5">${siklus - hariKe + 1}</div>
                        <div class="text-muted" style="font-size:0.75rem;">Hari lagi</div>
                    </div>
                </div>
            </div>`;
}

// ── Sidebar: Prediksi ─────────────────────────────────────────────────────
function renderPrediksi(data) {
    const el = document.getElementById("prediksiList");
    const { riwayat, siklus, durasi } = data;
    if (!riwayat.length) return;

    const last = riwayat[riwayat.length - 1];
    const mulai = fromStr(last.mulai);
    let html = "";

    for (let i = 1; i <= 6; i++) {
        const predMulai = addDays(mulai, i * siklus);
        const predOvulasi = addDays(predMulai, siklus - 14);
        const predSelesai = addDays(predMulai, durasi - 1);

        html += `
                <div class="px-3 py-2 ${i < 6 ? "border-bottom" : ""}">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                        <span class="badge" style="background:#ea5455;color:#fff;font-size:0.7rem;">Siklus +${i}</span>
                        <small class="text-muted" style="font-size:0.75rem;">${formatTgl(toStr(predMulai))}</small>
                    </div>
                    <div style="font-size:0.78rem;" class="text-muted">
                        <i class="bx bx-droplet me-1" style="color:#ea5455;"></i>
                        Haid: s/d ${formatTgl(toStr(predSelesai))}
                    </div>
                    <div style="font-size:0.78rem;" class="text-muted">
                        <i class="bx bx-target-lock me-1" style="color:#28a745;"></i>
                        Ovulasi: ${formatTgl(toStr(predOvulasi))}
                    </div>
                </div>`;
    }

    // Badge header
    const next = addDays(mulai, siklus); // H1 haid berikutnya
    const ovNext = addDays(next, siklus - 14);
    document.getElementById("badgeBerikutnya").textContent = formatTgl(
        toStr(next),
    );
    document.getElementById("badgeOvulasi").textContent = formatTgl(
        toStr(ovNext),
    );

    el.innerHTML = html;
}

// ── Sidebar: Riwayat ──────────────────────────────────────────────────────
function renderRiwayat(data) {
    const el = document.getElementById("riwayatList");
    const { riwayat, siklus } = data;

    document.getElementById("totalSiklus").textContent = riwayat.length
        ? `${riwayat.length} entri`
        : "";

    if (!riwayat.length) {
        el.innerHTML = `<div class="text-muted text-center py-3" style="font-size:0.875rem;">Belum ada riwayat</div>`;
        return;
    }

    const sorted = [...riwayat].reverse();
    el.innerHTML = sorted
        .map((r, i) => {
            const durAktual = r.selesai
                ? Math.floor(
                      (fromStr(r.selesai) - fromStr(r.mulai)) / 86400000,
                  ) + 1
                : null;
            return `
            <div class="d-flex align-items-start gap-3 px-3 py-2 ${i < sorted.length - 1 ? "border-bottom" : ""}">
                <div class="avatar avatar-sm bg-label-danger rounded d-flex align-items-center justify-content-center" style="flex-shrink:0;">
                    <i class="bx bx-droplet"></i>
                </div>
                <div class="flex-fill">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <div class="fw-semibold" style="font-size:0.875rem;">${formatTgl(r.mulai)}</div>
                            <div class="text-muted" style="font-size:0.78rem;">
                                ${
                                    r.selesai
                                        ? `Selesai: ${formatTgl(r.selesai)} &nbsp;·&nbsp; ${durAktual} hari`
                                        : '<span class="badge bg-label-warning">Belum ditandai selesai</span>'
                                }
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-danger py-0 px-1 ms-2" onclick="hapusEntry('${r.mulai}')">
                            <i class="bx bx-trash" style="font-size:0.8rem;"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        })
        .join("");
}

// ── Input Haid ────────────────────────────────────────────────────────────
function updateTombolHaid(data) {
    const btn = document.getElementById("btnMulaiSelesai");
    if (!btn) return;
    const last = data ? data.riwayat[data.riwayat.length - 1] : null;
    const sedangHaid = last && !last.selesai;
    if (sedangHaid) {
        btn.className = "btn btn-outline-danger";
        btn.innerHTML = `<i class="bx bx-check me-1"></i> Selesai Haid`;
    } else {
        btn.className = "btn btn-danger";
        btn.innerHTML = `<i class="bx bx-droplet me-1"></i> Mulai Haid`;
    }
}

window.toggleHaid = function () {
    const tgl = document.getElementById("inputTanggal").value;
    const fb = document.getElementById("inputFeedback");
    if (!tgl) {
        fb.innerHTML = `<small class="text-danger">Pilih tanggal dulu.</small>`;
        return;
    }

    let data = getData();
    if (!data) {
        const siklus =
            parseInt(document.getElementById("setupSiklus").value) || 28;
        const durasi =
            parseInt(document.getElementById("setupDurasi").value) || 5;
        data = { siklus, durasi, riwayat: [] };
        saveData(data);
    }
    const last = data.riwayat[data.riwayat.length - 1];
    const sedangHaid = last && !last.selesai;

    if (sedangHaid) {
        // Mode: tandai selesai
        if (tgl < last.mulai) {
            fb.innerHTML = `<small class="text-danger">Tanggal selesai tidak boleh sebelum hari pertama (${formatTgl(last.mulai)}).</small>`;
            return;
        }
        last.selesai = tgl;
        last.durasi =
            Math.floor((fromStr(tgl) - fromStr(last.mulai)) / 86400000) + 1;
        saveData(data);
        fb.innerHTML = `<small class="text-success"><i class="bx bx-check me-1"></i>Haid selesai ${formatTgl(tgl)} tersimpan.</small>`;
    } else {
        // Mode: catat hari pertama
        if (last && !last.selesai) {
            // sudah ada yang belum selesai — konfirmasi (harusnya tidak sampai sini karena tombol sudah switch)
        }
        if (data.riwayat.find((r) => r.mulai === tgl)) {
            Swal.fire(
                "Tanggal ini sudah ada",
                "Pilih tanggal lain.",
                "warning",
            );
            return;
        }
        data.riwayat.push({ mulai: tgl, selesai: null });
        data.riwayat.sort((a, b) => a.mulai.localeCompare(b.mulai));
        saveData(data);
        fb.innerHTML = `<small class="text-success"><i class="bx bx-check me-1"></i>Hari pertama haid ${formatTgl(tgl)} tersimpan.</small>`;
    }

    renderAll(data);
    updateTombolHaid(data);
};

window.hapusEntry = function (mulai) {
    Swal.fire({
        title: "Hapus entri haid ini?",
        text: formatTgl(mulai),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;
        const data = getData();
        data.riwayat = data.riwayat.filter((x) => x.mulai !== mulai);
        saveData(data);
        renderAll(data);
    });
};

// ── Render All ────────────────────────────────────────────────────────────
function renderAll(data) {
    if (!data || !data.siklus) return;
    renderKalender(data);
    renderFaseSekarang(data);
    renderPrediksi(data);
    renderRiwayat(data);
}

// ── Reset ─────────────────────────────────────────────────────────────────
window.resetData = function () {
    Swal.fire({
        title: "Reset semua data haid?",
        text: "Semua riwayat akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, reset!",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;
        localStorage.removeItem(STORAGE_KEY);
        initContent(null);
        document.getElementById("riwayatList").innerHTML =
            `<div class="text-muted text-center py-3" style="font-size:0.875rem;">Belum ada riwayat</div>`;
        document.getElementById("prediksiList").innerHTML =
            `<div class="text-muted text-center py-3" style="font-size:0.875rem;">Belum ada data haid</div>`;
        document.getElementById("faseSekarang").innerHTML =
            `<div class="text-muted text-center py-3" style="font-size:0.875rem;">Belum ada data haid</div>`;
        document.getElementById("kalenderGrid").innerHTML = "";
        document.getElementById("inputFeedback").innerHTML = "";
    });
};

// ── Init ──────────────────────────────────────────────────────────────────
function initContent(data) {
    const now = new Date();
    viewYear = now.getFullYear();
    viewMonth = now.getMonth();

    // Isi nilai setup dari data tersimpan
    if (data) {
        document.getElementById("setupSiklus").value = data.siklus || 28;
        document.getElementById("setupDurasi").value = data.durasi || 5;
    }

    // Default tanggal input = hari ini
    document.getElementById("inputTanggal").value = toStr(now);

    if (data && data.siklus) renderAll(data);
    updateTombolHaid(data);
}

(function () {
    const data = getData();
    initContent(data);
})();
