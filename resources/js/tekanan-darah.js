// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let hplData = null;
let riwayat = [];
let chartInst = null;

// ══════════════════════════════════════════════════
// KLASIFIKASI TD
// ══════════════════════════════════════════════════
function klasifikasiTD(s, d) {
    const map = parseFloat(((s + 2 * d) / 3).toFixed(1));
    if (s >= 160 || d >= 110)
        return {
            label: "Krisis Hipertensi",
            cls: "td-krisis",
            icon: "🚨",
            level: 4,
            map,
        };
    if (s >= 140 || d >= 90)
        return {
            label: "Hipertensi Gestasional",
            cls: "td-hiper",
            icon: "⚠️",
            level: 3,
            map,
        };
    if (map >= 105)
        return {
            label: "MAP Tinggi",
            cls: "td-hiper",
            icon: "⚠️",
            level: 3,
            map,
        };
    if (s >= 120 || d >= 80)
        return {
            label: "Prehipertensi",
            cls: "td-pre",
            icon: "〰️",
            level: 2,
            map,
        };
    return {
        label: "Normal",
        cls: "td-normal",
        icon: "✅",
        level: 1,
        map,
    };
}

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
window.addEventListener("load", () => {
    const raw = localStorage.getItem("pregnancyData");
    if (!raw) {
        document.getElementById("alertNoHPL").style.display = "block";
        return;
    }

    hplData = JSON.parse(raw);
    document.getElementById("mainContent").style.display = "block";

    const rawTD = localStorage.getItem("kia_tekanan_darah");
    riwayat = rawTD ? JSON.parse(rawTD) : [];

    // Default datetime = sekarang
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById("inputWaktu").value = now
        .toISOString()
        .slice(0, 16);

    renderStatus();
    renderGrafik();
    renderTabel();
});

// ══════════════════════════════════════════════════
// TAMBAH PENGUKURAN
// ══════════════════════════════════════════════════
function tambahPengukuran() {
    const waktu = document.getElementById("inputWaktu").value;
    const sistolik = parseInt(document.getElementById("inputSistolik").value);
    const diastolik = parseInt(document.getElementById("inputDiastolik").value);
    const nadi = parseInt(document.getElementById("inputNadi").value) || null;
    const posisi = document.getElementById("inputPosisi").value;
    const catatan = document.getElementById("inputCatatan").value.trim();

    if (!waktu || isNaN(sistolik) || isNaN(diastolik)) {
        Swal.fire({
            icon: "warning",
            title: "Data tidak lengkap",
            text: "Waktu, sistolik, dan diastolik wajib diisi.",
            confirmButtonColor: "#696cff",
        });
        return;
    }
    if (sistolik < 60 || sistolik > 250 || diastolik < 40 || diastolik > 150) {
        Swal.fire({
            icon: "warning",
            title: "Nilai tidak wajar",
            text: "Periksa kembali nilai sistolik dan diastolik.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    const minggu = hplData?.weeks || null;
    const klas = klasifikasiTD(sistolik, diastolik);

    const entry = {
        waktu,
        sistolik,
        diastolik,
        nadi,
        posisi,
        catatan,
        minggu,
        map: klas.map,
    };
    riwayat.push(entry);
    riwayat.sort((a, b) => new Date(a.waktu) - new Date(b.waktu));
    simpanDanRefresh();

    // Reset
    document.getElementById("inputSistolik").value = "";
    document.getElementById("inputDiastolik").value = "";
    document.getElementById("inputNadi").value = "";
    document.getElementById("inputCatatan").value = "";

    // Alert khusus kalau krisis/hipertensi
    if (klas.level === 4) {
        Swal.fire({
            icon: "error",
            title: "🚨 Krisis Hipertensi!",
            html: `TD <strong>${sistolik}/${diastolik} mmHg</strong> sangat tinggi.<br>
                   <strong>Segera rujuk ke fasilitas kesehatan!</strong>`,
            confirmButtonColor: "#c0392b",
            confirmButtonText: "Saya Mengerti",
            allowOutsideClick: false,
        });
    } else if (klas.level === 3) {
        Swal.fire({
            icon: "warning",
            title: "⚠️ Hipertensi Terdeteksi",
            html: `TD <strong>${sistolik}/${diastolik} mmHg</strong> melebihi batas normal kehamilan.<br>
                   Konsultasikan dengan bidan atau dokter segera.`,
            confirmButtonColor: "#e74c3c",
            confirmButtonText: "Lihat Detail",
            timer: 5000,
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Tersimpan!",
            text: `TD ${sistolik}/${diastolik} mmHg berhasil dicatat.`,
            timer: 1800,
            showConfirmButton: false,
        });
    }
}

function simpanDanRefresh() {
    localStorage.setItem("kia_tekanan_darah", JSON.stringify(riwayat));
    renderStatus();
    renderGrafik();
    renderTabel();
}

// ══════════════════════════════════════════════════
// RENDER STATUS
// ══════════════════════════════════════════════════
function renderStatus() {
    if (riwayat.length === 0) {
        document.getElementById("statusSistolik").textContent = "—";
        document.getElementById("statusDiastolik").textContent = "—";
        document.getElementById("statusMAP").textContent = "—";

        const iconEl = document.getElementById("statusIcon");
        iconEl.className = "bx bx-heart-circle";
        iconEl.style.color = "#696cff";

        const badge = document.getElementById("statusBadge");
        badge.textContent = "Belum ada data";
        badge.className = "d-inline-block px-3 py-1 rounded-pill mb-2";
        badge.style =
            "font-size:0.78rem; font-weight:600; background:#f0f0ff; color:#696cff;";

        document.getElementById("statusSub").textContent =
            "Tambahkan pengukuran pertama Anda";
        return;
    }

    const latest = riwayat[riwayat.length - 1];
    const klas = klasifikasiTD(latest.sistolik, latest.diastolik);

    document.getElementById("statusSistolik").textContent = latest.sistolik;
    document.getElementById("statusDiastolik").textContent = latest.diastolik;
    document.getElementById("statusMAP").textContent = `${klas.map} mmHg`;

    const iconEl = document.getElementById("statusIcon");
    iconEl.className =
        "bx " +
        (klas.level >= 4
            ? "bx-error-circle"
            : klas.level >= 3
              ? "bx-error"
              : "bx-heart-circle");
    iconEl.style.color =
        klas.level >= 3 ? "#e74c3c" : klas.level === 2 ? "#f5c518" : "#696cff";
    iconEl.style.fontSize = "2.2rem";

    const badge = document.getElementById("statusBadge");
    badge.textContent = `${klas.icon} ${klas.label}`;
    badge.className = `d-inline-block px-3 py-1 rounded-pill mb-2 ${klas.cls}`;

    const tglFmt = new Date(latest.waktu).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
    document.getElementById("statusSub").textContent =
        `${tglFmt} · ${latest.posisi} · Minggu ${latest.minggu || "—"}`;
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

    const labels = riwayat.map((r) => {
        const d = new Date(r.waktu);
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });
    });
    const sistolik = riwayat.map((r) => r.sistolik);
    const diastolik = riwayat.map((r) => r.diastolik);
    const mapData = riwayat.map((r) => r.map);
    const batas140 = riwayat.map(() => 140);
    const batas90 = riwayat.map(() => 90);

    if (chartInst) chartInst.destroy();

    const ctx = document.getElementById("grafikTD").getContext("2d");
    chartInst = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Sistolik",
                    data: sistolik,
                    borderColor: "#696cff",
                    backgroundColor: "rgba(105,108,255,0.07)",
                    borderWidth: 2.5,
                    pointBackgroundColor: riwayat.map((r) =>
                        klasifikasiTD(r.sistolik, r.diastolik).level >= 3
                            ? "#e74c3c"
                            : "#696cff",
                    ),
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: "Diastolik",
                    data: diastolik,
                    borderColor: "#3aab8c",
                    backgroundColor: "rgba(58,171,140,0.07)",
                    borderWidth: 2.5,
                    pointBackgroundColor: riwayat.map((r) =>
                        klasifikasiTD(r.sistolik, r.diastolik).level >= 3
                            ? "#e74c3c"
                            : "#3aab8c",
                    ),
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: "MAP",
                    data: mapData,
                    borderColor: "#f39c12",
                    borderWidth: 1.5,
                    borderDash: [4, 3],
                    pointRadius: 3,
                    fill: false,
                    tension: 0.3,
                },
                {
                    label: "Batas Sistolik (140)",
                    data: batas140,
                    borderColor: "#e74c3c",
                    borderWidth: 1.5,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    fill: false,
                    tension: 0,
                },
                {
                    label: "Batas Diastolik (90)",
                    data: batas90,
                    borderColor: "#e74c3c",
                    borderWidth: 1,
                    borderDash: [4, 4],
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
                        afterBody: (ctx) => {
                            const idx = ctx[0].dataIndex;
                            const r = riwayat[idx];
                            const klas = klasifikasiTD(r.sistolik, r.diastolik);
                            const lines = [
                                `Status: ${klas.icon} ${klas.label}`,
                                `MAP: ${klas.map} mmHg`,
                            ];
                            if (r.nadi) lines.push(`Nadi: ${r.nadi} bpm`);
                            if (r.posisi) lines.push(`Posisi: ${r.posisi}`);
                            if (r.catatan) lines.push(`Catatan: ${r.catatan}`);
                            return lines;
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
                        callback: (v) => `${v}`,
                    },
                    title: {
                        display: true,
                        text: "mmHg",
                        font: {
                            size: 11,
                        },
                        color: "#888",
                    },
                    min: 50,
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
            const klas = klasifikasiTD(r.sistolik, r.diastolik);
            const realIdx = riwayat.length - 1 - i;
            const tglFmt = new Date(r.waktu).toLocaleString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

            return `<tr ${klas.level >= 4 ? 'style="background:#fff5f5;"' : ""}>
            <td style="font-size:0.78rem;">${tglFmt}</td>
            <td><span style="font-size:0.72rem;background:#f0f0f0;padding:1px 8px;border-radius:20px;">Mgg ${r.minggu || "—"}</span></td>
            <td><strong style="color:${r.sistolik >= 140 ? "#e74c3c" : "#333"}">${r.sistolik}</strong></td>
            <td><strong style="color:${r.diastolik >= 90 ? "#e74c3c" : "#333"}">${r.diastolik}</strong></td>
            <td style="font-size:0.78rem; color:${r.map >= 105 ? "#e74c3c" : "#888"}">${r.map}</td>
            <td style="font-size:0.78rem;">${r.nadi ? r.nadi + " bpm" : "—"}</td>
            <td style="font-size:0.78rem; text-transform:capitalize;">${r.posisi}</td>
            <td><span class="badge ${klas.cls}" style="font-size:0.7rem;">${klas.icon} ${klas.label}</span></td>
            <td class="text-muted" style="font-size:0.75rem;">${r.catatan || "—"}</td>
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
        text: `TD ${riwayat[idx].sistolik}/${riwayat[idx].diastolik} mmHg`,
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
        text: "Seluruh data pengukuran tekanan darah akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus semua",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            riwayat = [];
            localStorage.removeItem("kia_tekanan_darah");
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
            confirmButtonColor: "#696cff",
        });
        return;
    }
    const header =
        "Waktu,Minggu,Sistolik,Diastolik,MAP,Nadi,Posisi,Status,Catatan\n";
    const rows = riwayat
        .map((r) => {
            const klas = klasifikasiTD(r.sistolik, r.diastolik);
            return `${r.waktu},${r.minggu || ""},${r.sistolik},${r.diastolik},${r.map},${r.nadi || ""},${r.posisi},"${klas.label}","${r.catatan || ""}"`;
        })
        .join("\n");

    const blob = new Blob([header + rows], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tracker-td-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

Object.assign(window, {
    tambahPengukuran,
    hapusEntry,
    konfirmasiHapusSemua,
    exportCSV,
});