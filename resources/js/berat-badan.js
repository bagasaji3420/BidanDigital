// ══════════════════════════════════════════════════
// STANDAR KENAIKAN BB (IOM / Kemenkes)
// ══════════════════════════════════════════════════
const BB_GAIN_STD = {
    who: [
        {
            maxBMI: 18.5,
            min: 12.5,
            max: 18,
            label: "Kurus",
        },
        {
            maxBMI: 25.0,
            min: 11.5,
            max: 16,
            label: "Normal",
        },
        {
            maxBMI: 30.0,
            min: 7,
            max: 11.5,
            label: "Lebih",
        },
        {
            maxBMI: Infinity,
            min: 5,
            max: 9,
            label: "Obesitas",
        },
    ],
    indonesia: [
        {
            maxBMI: 18.5,
            min: 12.5,
            max: 18,
            label: "Kurus",
        },
        {
            maxBMI: 23.0,
            min: 11.5,
            max: 16,
            label: "Normal",
        },
        {
            maxBMI: 27.5,
            min: 7,
            max: 11.5,
            label: "Lebih",
        },
        {
            maxBMI: Infinity,
            min: 5,
            max: 9,
            label: "Obesitas",
        },
    ],
};

// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let hplData = null;
let bbRange = {
    min: 11.5,
    max: 16,
};
let riwayat = [];
let chartInst = null;

// ══════════════════════════════════════════════════
// INIT — baca localStorage
// ══════════════════════════════════════════════════
window.addEventListener("load", () => {
    // Baca data HPL
    const raw = localStorage.getItem("pregnancyData");
    if (!raw) {
        document.getElementById("alertNoHPL").style.display = "block";
        return;
    }

    hplData = JSON.parse(raw);
    document.getElementById("mainContent").style.display = "block";

    // Baca riwayat BB
    const rawBB = localStorage.getItem("kia_berat_badan");
    riwayat = rawBB ? JSON.parse(rawBB) : [];

    // Isi info dari HPL
    renderInfoHPL();

    // Set default input
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("inputTanggal").value = today;
    document.getElementById("inputMinggu").value = hplData.weeks || "";

    // Render semua
    renderStatus();
    renderGrafik();
    renderTabel();
});

// ══════════════════════════════════════════════════
// RENDER INFO HPL
// ══════════════════════════════════════════════════
function renderInfoHPL() {
    const { weeks, days, bmi, bbAwal, bbNow, trimester, bmiStandar } = hplData;

    document.getElementById("infoMinggu").textContent =
        `${weeks}+${days} minggu`;
    document.getElementById("infoBBAwal").textContent = bbAwal
        ? `${bbAwal} kg`
        : "—";
    document.getElementById("infoBBAwalHamil").textContent = bbNow
        ? `${bbNow} kg`
        : "—";
    document.getElementById("infoBMI").textContent = bmi ? `${bmi} kg/m²` : "—";

    // Trimester badge
    const triBadge = document.getElementById("infoBadgeTrimester");
    const triMap = {
        1: ["Trimester 1", "tri-badge-1"],
        2: ["Trimester 2", "tri-badge-2"],
        3: ["Trimester 3", "tri-badge-3"],
    };
    const [triLabel, triCls] = triMap[trimester] || ["—", ""];
    triBadge.textContent = triLabel;
    triBadge.className = `badge ${triCls}`;

    // Hitung range kenaikan
    const std = BB_GAIN_STD[bmiStandar || "who"];
    for (const r of std) {
        if (!bmi || bmi < r.maxBMI) {
            bbRange = {
                min: r.min,
                max: r.max,
                label: r.label,
            };
            break;
        }
    }
    document.getElementById("infoTarget").textContent =
        `+${bbRange.min}–${bbRange.max} kg`;
    document.getElementById("grafikStandarLabel").textContent =
        bmiStandar === "indonesia" ? "Indonesia (Kemenkes)" : "WHO / IOM";
}

// ══════════════════════════════════════════════════
// TAMBAH PENGUKURAN
// ══════════════════════════════════════════════════
function tambahPengukuran() {
    const tanggal = document.getElementById("inputTanggal").value;
    const bb = parseFloat(document.getElementById("inputBB").value);
    const minggu = parseInt(document.getElementById("inputMinggu").value);
    const catatan = document.getElementById("inputCatatan").value.trim();

    if (!tanggal || isNaN(bb) || bb < 30 || bb > 150) {
        Swal.fire({
            icon: "warning",
            title: "Data tidak valid",
            text: "Pastikan tanggal dan berat badan diisi dengan benar.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    // Cek duplikat tanggal
    const dupIdx = riwayat.findIndex((r) => r.tanggal === tanggal);
    if (dupIdx !== -1) {
        Swal.fire({
            icon: "question",
            title: "Data tanggal ini sudah ada",
            text: "Apakah Anda ingin mengganti data pengukuran di tanggal ini?",
            showCancelButton: true,
            confirmButtonColor: "#696cff",
            cancelButtonColor: "#8592a3",
            confirmButtonText: "Ya, ganti",
            cancelButtonText: "Batal",
        }).then((res) => {
            if (res.isConfirmed) {
                riwayat[dupIdx] = {
                    tanggal,
                    bb,
                    minggu: minggu || hplData.weeks,
                    catatan,
                };
                simpanDanRefresh();
            }
        });
        return;
    }

    riwayat.push({
        tanggal,
        bb,
        minggu: minggu || hplData.weeks,
        catatan,
    });
    riwayat.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    simpanDanRefresh();

    // Reset form
    document.getElementById("inputBB").value = "";
    document.getElementById("inputCatatan").value = "";

    Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        text: `BB ${bb} kg berhasil dicatat.`,
        timer: 1800,
        showConfirmButton: false,
    });
}

function simpanDanRefresh() {
    localStorage.setItem("kia_berat_badan", JSON.stringify(riwayat));
    renderStatus();
    renderGrafik();
    renderTabel();
}

// ══════════════════════════════════════════════════
// HITUNG STATUS BB
// ══════════════════════════════════════════════════
function getStatus(kenaikan) {
    if (kenaikan === null) return null;
    if (kenaikan < bbRange.min)
        return {
            label: `Kurang (anjuran +${bbRange.min}–${bbRange.max} kg)`,
            cls: "kurang",
            icon: "↓",
        };
    if (kenaikan <= bbRange.max)
        return {
            label: `Normal (anjuran +${bbRange.min}–${bbRange.max} kg)`,
            cls: "normal",
            icon: "✓",
        };
    return {
        label: `Berlebih (anjuran +${bbRange.min}–${bbRange.max} kg)`,
        cls: "lebih",
        icon: "↑",
    };
}

// ══════════════════════════════════════════════════
// RENDER STATUS CARD
// ══════════════════════════════════════════════════
function renderStatus() {
    const bbAwal = hplData.bbAwal;
    if (!bbAwal || riwayat.length === 0) {
        document.getElementById("statusKenaikan").textContent = "— kg";
        document.getElementById("bbProgressBar").style.width = "0%";
        return;
    }

    const latest = riwayat[riwayat.length - 1];
    const kenaikan = +(latest.bb - bbAwal).toFixed(1);
    const st = getStatus(kenaikan);

    document.getElementById("statusKenaikan").textContent = `+${kenaikan} kg`;

    const barMax = bbRange.max + 4;
    const pct = Math.min(100, Math.max(0, (kenaikan / barMax) * 100));
    const barColor = !st
        ? "#696cff"
        : st.cls === "normal"
          ? "#3aab8c"
          : st.cls === "kurang"
            ? "#f5c518"
            : "#e74c3c";

    document.getElementById("bbProgressBar").style.width = pct + "%";
    document.getElementById("bbProgressBar").style.background = barColor;
    document.getElementById("barMax").textContent = `${barMax} kg`;

    if (st) {
        document.getElementById("statusIcon").textContent =
            st.cls === "normal" ? "✅" : st.cls === "kurang" ? "⚠️" : "🚨";
        document.getElementById("statusBadge").textContent =
            `${st.icon} ${st.label}`;
        document.getElementById("statusBadge").className =
            `d-inline-block px-3 py-1 rounded-pill mb-2 status-${st.cls}`;
        document.getElementById("statusSub").textContent =
            `BB terakhir: ${latest.bb} kg · Pengukuran ke-${riwayat.length}`;
    }
}

// ══════════════════════════════════════════════════
// RENDER GRAFIK
// ══════════════════════════════════════════════════
function renderGrafik() {
    const emptyEl = document.getElementById("emptyGrafik");
    const wrapEl = document.getElementById("grafikWrap");

    if (riwayat.length === 0) {
        emptyEl.style.display = "block";
        wrapEl.style.display = "none";
        return;
    }
    emptyEl.style.display = "none";
    wrapEl.style.display = "block";

    const bbAwal = hplData.bbAwal || 0;

    // Titik awal: BB sebelum hamil = kenaikan 0
    // Titik kedua (opsional): bbNow dari HPL jika ada dan belum ada di riwayat
    const pointsAwal = [
        {
            label: `${new Date(hplData.hpht).toLocaleDateString("id-ID", { day: "numeric", month: "short" })} (pra-hamil)`,
            kenaikan: 0,
        },
    ];



    // Titik bbNow dari HPL jika ada
    if (hplData.bbNow && hplData.bbNow !== hplData.bbAwal) {
        pointsAwal.push({
            label: `HPL (${hplData.weeks} minggu)`,
            kenaikan: +(hplData.bbNow - bbAwal).toFixed(1),
        });
    }

    const labels = [
        ...pointsAwal.map((p) => p.label),
        ...riwayat.map((r) =>
            new Date(r.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
            }),
        ),
    ];
    const kenaikanData = [
        ...pointsAwal.map((p) => p.kenaikan),
        ...riwayat.map((r) => +(r.bb - bbAwal).toFixed(1)),
    ];
    const targetMin = labels.map(() => bbRange.min);
    const targetMax = labels.map(() => bbRange.max);

    if (chartInst) chartInst.destroy();

    const ctx = document.getElementById("grafikBB").getContext("2d");
    chartInst = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Kenaikan BB Anda",
                    data: kenaikanData,
                    borderColor: "#696cff",
                    backgroundColor: "rgba(105,108,255,0.08)",
                    borderWidth: 2.5,
                    pointBackgroundColor: "#696cff",
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: `Target Min (+${bbRange.min} kg)`,
                    data: targetMin,
                    borderColor: "#3aab8c",
                    borderWidth: 1.5,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    fill: false,
                    tension: 0,
                },
                {
                    label: `Target Max (+${bbRange.max} kg)`,
                    data: targetMax,
                    borderColor: "#e74c3c",
                    borderWidth: 1.5,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    fill: false,
                    tension: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 11,
                        },
                        boxWidth: 20,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            if (ctx.datasetIndex === 0) {
                                const k = ctx.raw;
                                const st = getStatus(k);
                                return [
                                    `Kenaikan: +${k} kg`,
                                    st ? `Status: ${st.icon} ${st.cls}` : "",
                                ];
                            }
                            return `${ctx.dataset.label}: +${ctx.raw} kg`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        color: "#f0f0f0",
                    },
                    ticks: {
                        font: {
                            size: 11,
                        },
                    },
                },
                y: {
                    grid: {
                        color: "#f0f0f0",
                    },
                    ticks: {
                        font: {
                            size: 11,
                        },
                        callback: (v) => `+${v} kg`,
                    },
                    title: {
                        display: true,
                        text: "Kenaikan BB (kg)",
                        font: {
                            size: 11,
                        },
                        color: "#888",
                    },
                },
            },
        },
    });
}

// ══════════════════════════════════════════════════
// RENDER TABEL
// ══════════════════════════════════════════════════
function renderTabel() {
    const tbody = document.getElementById("tabelBody");
    const emptyEl = document.getElementById("emptyTable");
    const tabelEl = document.getElementById("tabelWrap");
    const bbAwal = hplData.bbAwal || 0;

    if (riwayat.length === 0) {
        emptyEl.style.display = "block";
        tabelEl.style.display = "none";
        return;
    }
    emptyEl.style.display = "none";
    tabelEl.style.display = "block";

    tbody.innerHTML = [...riwayat]
        .reverse()
        .map((r, i) => {
            const kenaikan = +(r.bb - bbAwal).toFixed(1);
            const st = getStatus(kenaikan);
            const tglFmt = new Date(r.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            const realIdx = riwayat.length - 1 - i;

            // Selisih dengan pengukuran sebelumnya
            let delta = "—";
            if (realIdx > 0) {
                const selisih = +(r.bb - riwayat[realIdx - 1].bb).toFixed(1);
                delta =
                    selisih >= 0
                        ? `<span class="text-success">+${selisih}</span>`
                        : `<span class="text-danger">${selisih}</span>`;
            }

            return `<tr>
            <td>${tglFmt}</td>
            <td><span style="font-size:0.75rem;background:#f0f0f0;padding:1px 8px;border-radius:20px;">Minggu ${r.minggu}</span></td>
            <td><strong>${r.bb}</strong></td>
            <td>${delta}</td>
            <td>${st ? `<span class="badge status-${st.cls}" style="font-size:0.72rem;">${st.icon} ${st.cls === "normal" ? "Normal" : st.cls === "kurang" ? "Kurang" : "Berlebih"}</span>` : "—"}</td>
            <td class="text-muted" style="font-size:0.78rem;">${r.catatan || "—"}</td>
            <td>
                <button onclick="hapusEntry(${realIdx})" class="btn btn-sm btn-outline-danger py-0 px-2" style="font-size:0.72rem;">
                    <i class="bx bx-trash"></i>
                </button>
            </td>
        </tr>`;
        })
        .join("");
}

// ══════════════════════════════════════════════════
// HAPUS
// ══════════════════════════════════════════════════
function hapusEntry(idx) {
    Swal.fire({
        title: "Hapus pengukuran ini?",
        text: `BB ${riwayat[idx].bb} kg — ${riwayat[idx].tanggal}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            riwayat.splice(idx, 1);
            simpanDanRefresh();
        }
    });
}

function konfirmasiHapusSemua() {
    if (riwayat.length === 0) return;
    Swal.fire({
        title: "Hapus semua riwayat?",
        text: "Seluruh data pengukuran berat badan akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus semua",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            riwayat = [];
            localStorage.removeItem("kia_berat_badan");
            simpanDanRefresh();
            Swal.fire({
                icon: "success",
                title: "Dihapus",
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                location.reload();
            });
        }
    });
}

// ══════════════════════════════════════════════════
// EXPORT CSV
// ══════════════════════════════════════════════════
function exportCSV() {
    if (riwayat.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Belum ada data",
            text: "Tidak ada pengukuran untuk diekspor.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    const bbAwal = hplData.bbAwal || 0;
    const header =
        "Tanggal,Minggu Kehamilan,BB (kg),Kenaikan (kg),Status,Catatan\n";
    const rows = riwayat
        .map((r) => {
            const k = +(r.bb - bbAwal).toFixed(1);
            const st = getStatus(k);
            return `${r.tanggal},${r.minggu},${r.bb},+${k},${st ? st.cls : "—"},"${r.catatan || ""}"`;
        })
        .join("\n");

    const blob = new Blob([header + rows], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tracker-bb-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}


Object.assign(window, {
    tambahPengukuran,
    hapusEntry,
    konfirmasiHapusSemua,
    exportCSV,
});