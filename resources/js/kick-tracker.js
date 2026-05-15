const KICK_TARGET = 10;
const MAX_JAM = 12;

let sesi = {
    kicks: 0,
    log: [], // array timestamp tiap kick
    mulai: null, // timestamp mulai (kick pertama)
    selesai: false,
    timerInterval: null,
};

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("pregnancyData"));
    const today = getTodayKey();

    document.getElementById("tanggalSesi").textContent =
        new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    if (!data || !data.hpht) {
        document.getElementById("hphtBox").classList.remove("d-none");
    } else {
        tampilInfoKehamilan(data);
        enableTombol();
        muatSesiHariIni();
        renderHistori();
    }
});

function simpanHPHT() {
    const val = document.getElementById("inputHPHT").value;
    if (!val) return;

    const hpht = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - hpht) / 86400000);
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    const edd = new Date(hpht);
    edd.setDate(edd.getDate() + 280);
    const daysLeft = Math.round((edd - today) / 86400000);

    const existing = JSON.parse(localStorage.getItem("pregnancyData")) || {};
    localStorage.setItem(
        "pregnancyData",
        JSON.stringify({
            ...existing,
            hpht: val,
            weeks,
            days,
            edd: edd.toISOString(),
            daysLeft,
            trimester: weeks <= 13 ? 1 : weeks <= 26 ? 2 : 3,
            updated_at: Date.now(),
        }),
    );

    document.getElementById("hphtBox").classList.add("d-none");
    tampilInfoKehamilan(JSON.parse(localStorage.getItem("pregnancyData")));
    muatSesiHariIni();
    renderHistori();
}

function enableTombol() {
    const data = JSON.parse(localStorage.getItem("pregnancyData"));
    const weeks = data?.weeks ?? 0;

    if (weeks < 28) return;

    document.getElementById("btnKick").disabled = false;
    document.getElementById("btnUndo").disabled = false;
    document.getElementById("btnReset").disabled = false;
}

function tampilInfoKehamilan(data) {
    const box = document.getElementById("infoKehamilan");
    box.classList.remove("d-none");

    const trimLabel = !data.weeks
        ? "-"
        : data.weeks <= 13
          ? "Trimester 1"
          : data.weeks <= 26
            ? "Trimester 2"
            : "Trimester 3";

    document.getElementById("infoMinggu").textContent =
        `${data.weeks} minggu ${data.days} hari`;
    document.getElementById("infoTrimester").textContent = `· ${trimLabel}`;
    document.getElementById("infoHPHT").textContent = new Date(
        data.hpht,
    ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (data.weeks < 28) {
        document.getElementById("warningMinggu").classList.remove("d-none");
    }
}

// ── SESI ──────────────────────────────────────────────────────────────
function getTodayKey() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function muatSesiHariIni() {
    const key = "kickSesi_" + getTodayKey();
    const saved = localStorage.getItem(key);
    if (!saved) return;

    const data = JSON.parse(saved);
    sesi.kicks = data.kicks || 0;
    sesi.log = data.log || [];
    sesi.mulai = data.mulai || null;
    sesi.selesai = data.selesai || false;

    updateUI();

    if (sesi.mulai && !sesi.selesai) {
        startTimer();
    }
    if (sesi.selesai) {
        tampilStatusSelesai();
        stopTimer();
    }
}

function simpanSesi() {
    const key = "kickSesi_" + getTodayKey();
    localStorage.setItem(key, JSON.stringify(sesi));
}

function recordKick() {
    if (sesi.selesai) return;

    const now = Date.now();

    // Cek 12 jam
    if (sesi.mulai && now - sesi.mulai > MAX_JAM * 3600 * 1000) {
        selesaiSesi(false);
        return;
    }

    if (!sesi.mulai) {
        sesi.mulai = now;
        startTimer();
    }

    sesi.kicks++;
    sesi.log.push(now);

    updateUI();
    animasiKick();
    simpanSesi();

    if (sesi.kicks >= KICK_TARGET) {
        selesaiSesi(true);
    }
}

function undoKick() {
    if (sesi.kicks <= 0 || sesi.selesai) return;
    sesi.kicks--;
    sesi.log.pop();
    if (sesi.kicks === 0) {
        sesi.mulai = null;
        stopTimer();
        document.getElementById("timerDisplay").textContent = "00:00:00";
        document.getElementById("mulaiJam").textContent = "";
    }
    updateUI();
    simpanSesi();
}

function resetSesi() {
    Swal.fire({
        title: "Reset sesi hari ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#696cff",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, reset!",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;
        stopTimer();
        sesi = {
            kicks: 0,
            log: [],
            mulai: null,
            selesai: false,
            timerInterval: null,
        };
        localStorage.removeItem("kickSesi_" + getTodayKey());
        updateUI();
        document.getElementById("timerDisplay").textContent = "00:00:00";
        document.getElementById("mulaiJam").textContent = "";
        document.getElementById("statusSelesai").classList.add("d-none");
    });
}

function selesaiSesi(tercapai) {
    sesi.selesai = true;
    sesi.tercapai = tercapai;
    stopTimer();
    simpanSesi();
    simpanHistori(tercapai);
    tampilStatusSelesai();
    renderHistori();
}

function tampilStatusSelesai() {
    const el = document.getElementById("statusSelesai");
    el.classList.remove("d-none", "alert-success", "alert-danger");

    if (sesi.tercapai || sesi.kicks >= KICK_TARGET) {
        const durasi = sesi.mulai
            ? Math.round((sesi.log[sesi.log.length - 1] - sesi.mulai) / 60000)
            : 0;
        el.classList.add("alert-success");
        el.innerHTML = `<i class="bx bx-check-circle me-1"></i> <strong>Target tercapai!</strong> 10 gerakan dalam ${durasi} menit. Janin aktif & sehat 🎉`;
    } else {
        el.classList.add("alert-danger");
        el.innerHTML = `<i class="bx bx-error-circle me-1"></i> <strong>Perhatian!</strong> 10 gerakan belum tercapai dalam 12 jam. Segera hubungi bidan atau dokter.`;
    }

    document.getElementById("btnKick").disabled = true;
}

// ── HISTORI ───────────────────────────────────────────────────────────
function simpanHistori(tercapai) {
    const today = getTodayKey();
    let histori = JSON.parse(localStorage.getItem("kickHistori")) || {};

    histori[today] = {
        tanggal: today,
        kicks: sesi.kicks,
        tercapai,
        durasi:
            sesi.mulai && sesi.log.length
                ? Math.round(
                      (sesi.log[sesi.log.length - 1] - sesi.mulai) / 60000,
                  )
                : null,
        jamMulai: sesi.mulai
            ? new Date(sesi.mulai).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
              })
            : null,
        jamSelesai:
            tercapai && sesi.log[9]
                ? new Date(sesi.log[9]).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                  })
                : null,
        minggu:
            JSON.parse(localStorage.getItem("pregnancyData"))?.weeks ?? null,
    };

    // Simpan max 30 hari
    // SESUDAH
    const data = JSON.parse(localStorage.getItem("pregnancyData"));
    const daysLeft = data?.daysLeft ?? 0;
    const maxHari =
        daysLeft > 0 ? Math.ceil((40 - (data?.weeks ?? 40)) * 7) : 84;
    const keys = Object.keys(histori).sort().reverse().slice(0, maxHari);

    const pruned = {};
    keys.forEach((k) => (pruned[k] = histori[k]));
    localStorage.setItem("kickHistori", JSON.stringify(pruned));
}

let historiPage = 7; // tampil awal 7 hari

function renderHistori() {
    const histori = JSON.parse(localStorage.getItem("kickHistori")) || {};
    const allKeys = Object.keys(histori).sort().reverse();
    const keys = allKeys.slice(0, historiPage);
    const el = document.getElementById("historiList");

    if (!allKeys.length) return;

    el.innerHTML = keys
        .map((k) => {
            const h = histori[k];
            const tgl = new Date(k).toLocaleDateString("id-ID", {
                weekday: "short",
                day: "numeric",
                month: "short",
            });
            const icon = h.kicks >= KICK_TARGET ? "✅" : "⚠️";
            const durasi = h.durasi ? `${h.durasi} mnt` : "-";
            return `
            <div class="histori-row">
                <span>${icon} ${tgl}</span>
                <span><strong>${h.kicks}</strong>/10 kick</span>
                <span class="text-muted">${durasi}</span>
            </div>
        `;
        })
        .join("");

    // Tombol load more
    if (allKeys.length > historiPage) {
        el.innerHTML += `
            <div class="text-center mt-2">
                <button onclick="loadMoreHistori()" class="btn btn-sm btn-outline-secondary w-100">
                    <i class="bx bx-chevron-down me-1"></i> Tampilkan 7 hari lagi
                </button>
            </div>
        `;
    }
}

function loadMoreHistori() {
    historiPage += 7;
    renderHistori();
}

// ── UI ────────────────────────────────────────────────────────────────
function updateUI() {
    document.getElementById("kickCount").textContent = sesi.kicks;

    for (let i = 1; i <= KICK_TARGET; i++) {
        const dot = document.getElementById("dot-" + i);
        dot.classList.remove("active", "done");
        if (i <= sesi.kicks) {
            dot.classList.add(sesi.selesai ? "done" : "active");
        }
    }

    if (sesi.mulai) {
        const jam = new Date(sesi.mulai).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
        document.getElementById("mulaiJam").textContent =
            `Dimulai pukul ${jam}`;
    }
}

function animasiKick() {
    const btn = document.getElementById("btnKick");
    btn.classList.add("scale-pulse");
    setTimeout(() => btn.classList.remove("scale-pulse"), 200);
}

// ── TIMER ─────────────────────────────────────────────────────────────
function startTimer() {
    if (sesi.timerInterval) return;
    sesi.timerInterval = setInterval(() => {
        if (!sesi.mulai) return;
        const elapsed = Date.now() - sesi.mulai;

        // Auto-selesai 12 jam
        if (elapsed >= MAX_JAM * 3600 * 1000 && !sesi.selesai) {
            selesaiSesi(false);
            return;
        }

        const h = String(Math.floor(elapsed / 3600000)).padStart(2, "0");
        const m = String(Math.floor((elapsed % 3600000) / 60000)).padStart(
            2,
            "0",
        );
        const s = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
        document.getElementById("timerDisplay").textContent = `${h}:${m}:${s}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(sesi.timerInterval);
    sesi.timerInterval = null;
}

function bukaLaporanKIA() {
    const histori = JSON.parse(localStorage.getItem("kickHistori")) || {};
    const data = JSON.parse(localStorage.getItem("pregnancyData")) || {};
    const keys = Object.keys(histori).sort().reverse();

    const tglCetak = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const hphtStr = data.hpht
        ? new Date(data.hpht).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "-";
    const eddStr = data.edd
        ? new Date(data.edd).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "-";

    const rows = !keys.length
        ? `<tr><td colspan="7" style="text-align:center;padding:20px;color:#888;">Belum ada data</td></tr>`
        : keys
              .map((k, idx) => {
                  const h = histori[k];
                  const tgl = new Date(k).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                  });
                  const minggu =
                      h.minggu != null ? `${h.minggu}+${h.days ?? 0}` : "-";
                  const bg = idx % 2 === 0 ? "#fff" : "#f4fdf9";
                  const statusColor = h.tercapai ? "#1a7a5e" : "#c0392b";
                  const statusBg = h.tercapai ? "#e6f7f2" : "#fdecea";
                  return `
            <tr style="background:${bg};">
                <td style="padding:7px 10px;border:1px solid #e0e0e0;">${tgl}</td>
                <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${minggu}</td>
                <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${h.jamMulai ?? "-"}</td>
                <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${h.jamSelesai ?? '<span style="color:#c0392b;font-size:0.75rem;">Tidak tercapai</span>'}</td>
                <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${h.durasi ? h.durasi + " mnt" : "-"}</td>
                <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;font-weight:600;">${h.kicks}</td>
                <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">
                    <span style="background:${statusBg};color:${statusColor};padding:2px 8px;border-radius:20px;font-size:0.75rem;font-weight:600;">
                        ${h.tercapai ? "✅ Normal" : "⚠️ Kurang"}
                    </span>
                </td>
            </tr>`;
              })
              .join("");

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Gerak Janin — KIA Digital</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #fff; padding: 32px 40px; }
        .kia-header { text-align: center; border-bottom: 2px solid #3aab8c; padding-bottom: 16px; margin-bottom: 20px; }
        .kia-header .label { font-size: 0.68rem; color: #888; text-transform: uppercase; letter-spacing: .1em; }
        .kia-header h1 { font-size: 1.3rem; font-weight: 700; margin: 4px 0; }
        .kia-header .sub { font-size: 0.78rem; color: #555; }
        .kia-info { display: flex; gap: 32px; font-size: 0.8rem; color: #444; margin-bottom: 20px; }
        .kia-info div span { color: #888; display: block; font-size: 0.72rem; }
        table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
        thead tr { background: #3aab8c; color: #fff; }
        thead th { padding: 9px 10px; border: 1px solid #2e9278; font-weight: 600; }
        .kia-footer { margin-top: 20px; font-size: 0.7rem; color: #aaa; border-top: 1px solid #eee; padding-top: 10px; }
        @media print {
            body { padding: 16px 20px; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="kia-header">
        <div class="label">Kartu Ibu &amp; Anak Digital — Kemenkes RI</div>
        <h1>Laporan Pemantauan Gerak Janin</h1>
        <div class="sub">Dicetak: ${tglCetak} &nbsp;·&nbsp; HPHT: ${hphtStr}</div>
    </div>

    <div class="kia-info">
        <div><span>Usia kehamilan saat ini</span><strong>${data.weeks ?? "-"} minggu ${data.days ?? ""} hari</strong></div>
        <div><span>HPL</span><strong>${eddStr}</strong></div>
        <div><span>Total sesi tercatat</span><strong>${keys.length} hari</strong></div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="text-align:left;">Tanggal</th>
                <th>Minggu</th>
                <th>Jam Mulai</th>
                <th>Jam ke-10</th>
                <th>Durasi</th>
                <th>Kick</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>

    <div class="kia-footer">
        Dicetak dari aplikasi KIA Digital &nbsp;·&nbsp; Metode Cardiff Count to Ten &nbsp;·&nbsp; Target 10 gerakan / 12 jam
    </div>

    <div class="no-print" style="margin-top:24px; text-align:center;">
        <button onclick="window.print()" style="background:#3aab8c;color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:0.9rem;cursor:pointer;">
            🖨️ Print / Simpan PDF
        </button>
    </div>
</body>
</html>`;

    const tab = window.open("", "_blank");
    tab.document.write(html);
    tab.document.close();
}

function downloadKIAPdf() {
    const el = document.getElementById("kiaReportContent");
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `laporan-gerak-janin-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: {
            type: "jpeg",
            quality: 0.98,
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
        },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape",
        },
    };
    html2pdf().set(opt).from(el).save();
}

function clearDataKick() {
    Swal.fire({
        title: "Hapus semua data?",
        text: "Seluruh riwayat gerak janin & sesi hari ini akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus semua!",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;

        // Hapus kickHistori
        localStorage.removeItem("kickHistori");

        // Hapus semua sesi harian (kickSesi_YYYY-MM-DD)
        Object.keys(localStorage)
            .filter((k) => k.startsWith("kickSesi_"))
            .forEach((k) => localStorage.removeItem(k));

        // Reset state sesi
        stopTimer();
        sesi = {
            kicks: 0,
            log: [],
            mulai: null,
            selesai: false,
            timerInterval: null,
        };

        // Reset UI
        updateUI();
        document.getElementById("timerDisplay").textContent = "00:00:00";
        document.getElementById("mulaiJam").textContent = "";
        document.getElementById("statusSelesai").classList.add("d-none");
        document.getElementById("historiList").innerHTML = `
                    <div class="text-center text-muted py-4" style="font-size:0.85rem;">
                        <i class="bx bx-time-five" style="font-size:2rem;"></i>
                        <p class="mt-2 mb-0">Belum ada riwayat</p>
                    </div>`;

        Swal.fire({
            title: "Terhapus!",
            text: "Semua data gerak janin berhasil dihapus.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        });
    });
}
// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    simpanHPHT,
    recordKick,
    undoKick,
    resetSesi,
    loadMoreHistori,
    bukaLaporanKIA,
    downloadKIAPdf,
    clearDataKick,
});
