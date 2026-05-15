// ── STATE ─────────────────────────────────────────────────────────────
let sesiAktif = {
    mulai: null,
    payudara: null,
    timerInterval: null,
};

let anakAktifId = null;
let anakAktifNama = "";

const JEDA_MAX_MS = 3 * 60 * 60 * 1000; // 3 jam
const TARGET_MIN = 8;
const TARGET_MAX = 12;
const DURASI_MIN = 10 * 60 * 1000; // 10 mnt
const DURASI_MAX = 45 * 60 * 1000; // 45 mnt

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tanggalSesi").textContent =
        new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    renderPilihAnak();
});

// ── PILIH ANAK ────────────────────────────────────────────────────────
function renderPilihAnak() {
    const raw = localStorage.getItem("kia_anak");
    const daftarAnak = raw ? JSON.parse(raw) : [];
    const el = document.getElementById("boxPilihAnak");

    if (daftarAnak.length === 0) {
        document.getElementById("boxUtama").style.display = "none";
        el.innerHTML = `
                    <div class="card p-5 text-center" style="border:2px dashed #dee2e6; border-radius:16px;">
                        <div style="font-size:3rem;">👶</div>
                        <h5 class="fw-bold mt-3 mb-2">Belum Ada Data Anak</h5>
                        <p class="text-muted mb-4" style="font-size:0.88rem; max-width:420px; margin:0 auto 1.5rem;">
                            Data anak diambil dari <strong>Grafik Pertumbuhan Bayi</strong>.
                            Tambahkan data anak di sana terlebih dahulu agar bisa mulai mencatat sesi menyusui.
                        </p>
                        <div>
                            <a href="/tools/pertumbuhan-bayi" class="btn btn-primary px-4 py-2">
                                <i class="bx bx-line-chart me-2"></i> Ke Grafik Pertumbuhan Bayi
                            </a>
                        </div>
                        <div class="mt-3 p-3 rounded d-inline-block mx-auto"
                            style="background:#fff8e1; font-size:0.78rem; color:#856404; max-width:420px;">
                            <i class="bx bx-info-circle me-1"></i>
                            Data anak yang sudah ditambahkan di Grafik Pertumbuhan akan langsung muncul di sini.
                        </div>
                    </div>`;
        return;
    }

    el.innerHTML = `
                <div class="card p-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="fw-bold mb-0" style="font-size:0.85rem;">
                            <i class="bx bx-user-circle me-1 text-primary"></i> Pilih Anak
                        </h6>
                        <a href="/tools/pertumbuhan-bayi" class="btn btn-outline-primary btn-sm"
                            style="font-size:0.72rem;">
                            <i class="bx bx-link-external me-1"></i> Kelola Anak
                        </a>
                    </div>
                    <div class="d-flex gap-2 flex-wrap" id="listAnakMenyusui"></div>
                </div>`;

    const listEl = document.getElementById("listAnakMenyusui");
    listEl.innerHTML = daftarAnak
        .map((anak) => {
            const avatar = anak.jk === "P" ? "👧" : "👦";
            const isActive = anak.id === anakAktifId;
            return `<button onclick="pilihAnakMenyusui('${anak.id}', '${anak.nama}')"
                    class="btn btn-sm ${isActive ? "btn-primary" : "btn-outline-secondary"}"
                    style="font-size:0.8rem;">
                    ${avatar} ${anak.nama}
                </button>`;
        })
        .join("");

    // Auto pilih anak pertama jika belum ada yang aktif
    if (!anakAktifId) {
        pilihAnakMenyusui(daftarAnak[0].id, daftarAnak[0].nama);
    }
}

function pilihAnakMenyusui(id, nama) {
    // Reset sesi aktif dulu kalau ganti anak
    if (anakAktifId && anakAktifId !== id && sesiAktif.mulai) {
        stopTimer();
        sesiAktif = {
            mulai: null,
            payudara: sesiAktif.payudara,
            timerInterval: null,
        };
        const btn = document.getElementById("btnMulai");
        btn.innerHTML = '<i class="bx bx-play-circle me-2"></i> Mulai Menyusui';
        btn.classList.replace("btn-success", "btn-primary");
        document.getElementById("btnBatalSesi").disabled = true;
        document.getElementById("timerDisplay").textContent = "00:00";
        document.getElementById("mulaiJam").textContent = "";
    }

    anakAktifId = id;
    anakAktifNama = nama;

    document.getElementById("boxUtama").style.display = "flex";
    renderPilihAnak(); // re-render untuk update active button

    muatSesiHariIni();
    renderSesiList();
    cekAlertJeda();
}

// ── KEY HELPERS ───────────────────────────────────────────────────────
function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
}

function getSesiKey() {
    return "menyusuiSesi_" + anakAktifId + "_" + getTodayKey();
}

function getHistoriKey() {
    return "menyusuiHistori_" + anakAktifId;
}

// ── PAYUDARA ──────────────────────────────────────────────────────────
function pilihPayudara(val) {
    if (sesiAktif.mulai) return;
    sesiAktif.payudara = val;
    ["kiri", "dua", "kanan"].forEach((p) => {
        document
            .getElementById("btn" + p.charAt(0).toUpperCase() + p.slice(1))
            .classList.toggle("payudara-active", p === val);
    });
}

// ── TOGGLE SESI ───────────────────────────────────────────────────────
function toggleSesi() {
    if (!sesiAktif.mulai) {
        // MULAI
        if (!sesiAktif.payudara) {
            Swal.fire({
                icon: "info",
                title: "Pilih payudara dulu",
                text: "Tentukan payudara kiri, kanan, atau dua-dua.",
                confirmButtonColor: "#696cff",
            });
            return;
        }
        sesiAktif.mulai = Date.now();
        startTimer();

        const btn = document.getElementById("btnMulai");
        btn.innerHTML =
            '<i class="bx bx-stop-circle me-2"></i> Selesai Menyusui';
        btn.classList.replace("btn-primary", "btn-success");
        document.getElementById("btnBatalSesi").disabled = false;

        const jam = new Date(sesiAktif.mulai).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
        document.getElementById("mulaiJam").textContent =
            `Dimulai pukul ${jam}`;
    } else {
        // SELESAI
        simpanSesiSelesai();
    }
}

function simpanSesiSelesai() {
    const selesai = Date.now();
    const durasi = selesai - sesiAktif.mulai;

    const sesi = {
        jamMulai: new Date(sesiAktif.mulai).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        jamSelesai: new Date(selesai).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        durasi: Math.round(durasi / 60000),
        payudara: sesiAktif.payudara,
        ts: sesiAktif.mulai,
    };

    const list = JSON.parse(localStorage.getItem(getSesiKey())) || [];
    list.push(sesi);
    localStorage.setItem(getSesiKey(), JSON.stringify(list));

    simpanHistoriHarian(list);

    resetSesiAktif();
    renderSesiList();
    tampilStatusHarian(list);
    cekAlertJeda();

    if (durasi < DURASI_MIN) {
        Swal.fire({
            icon: "info",
            title: "Sesi singkat",
            text: "Durasi kurang dari 10 menit. Pastikan pelekatan bayi sudah benar.",
            confirmButtonColor: "#696cff",
        });
    }
}

function batalSesiAktif() {
    Swal.fire({
        title: "Batalkan sesi ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#696cff",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, batalkan",
        cancelButtonText: "Lanjut menyusui",
    }).then((r) => {
        if (!r.isConfirmed) return;
        resetSesiAktif();
    });
}

function resetSesiAktif() {
    stopTimer();
    sesiAktif = {
        mulai: null,
        payudara: sesiAktif.payudara,
        timerInterval: null,
    };

    const btn = document.getElementById("btnMulai");
    btn.innerHTML = '<i class="bx bx-play-circle me-2"></i> Mulai Menyusui';
    btn.classList.replace("btn-success", "btn-primary");
    document.getElementById("btnBatalSesi").disabled = true;
    document.getElementById("timerDisplay").textContent = "00:00";
    document.getElementById("mulaiJam").textContent = "";
}

// ── HISTORI HARIAN ────────────────────────────────────────────────────
function simpanHistoriHarian(list) {
    let histori = JSON.parse(localStorage.getItem(getHistoriKey())) || {};
    const today = getTodayKey();
    const totalDurasi = list.reduce((s, s2) => s + s2.durasi, 0);
    const payudaraCount = {
        kiri: 0,
        kanan: 0,
        dua: 0,
    };
    list.forEach((s) => payudaraCount[s.payudara]++);
    const dominan = Object.entries(payudaraCount).sort(
        (a, b) => b[1] - a[1],
    )[0][0];

    histori[today] = {
        tanggal: today,
        totalSesi: list.length,
        rataRata: list.length ? Math.round(totalDurasi / list.length) : 0,
        dominan,
        tercapai: list.length >= TARGET_MIN,
        jamMulai: list[0]?.jamMulai ?? null,
        jamTerakhir: list[list.length - 1]?.jamSelesai ?? null,
    };

    // Max 84 hari
    const keys = Object.keys(histori).sort().reverse().slice(0, 84);
    const pruned = {};
    keys.forEach((k) => (pruned[k] = histori[k]));
    localStorage.setItem(getHistoriKey(), JSON.stringify(pruned));
}

function muatSesiHariIni() {
    const list = JSON.parse(localStorage.getItem(getSesiKey())) || [];
    if (list.length) tampilStatusHarian(list);
    else document.getElementById("statusHarian").classList.add("d-none");
}

// ── RENDER LIST SESI HARI INI ─────────────────────────────────────────
function renderSesiList() {
    const list = JSON.parse(localStorage.getItem(getSesiKey())) || [];
    const el = document.getElementById("sesiHariIniList");

    document.getElementById("sesiCount").textContent = list.length;

    if (!list.length) {
        el.innerHTML = `
                    <div class="text-center text-muted py-4" style="font-size:0.85rem;">
                        <i class="bx bx-droplet" style="font-size:2rem;"></i>
                        <p class="mt-2 mb-0">Belum ada sesi hari ini</p>
                    </div>`;
        return;
    }

    const payudaraLabel = {
        kiri: "Kiri",
        kanan: "Kanan",
        dua: "Keduanya",
    };
    el.innerHTML = [...list]
        .reverse()
        .map(
            (s, idx) => `
                <div class="sesi-row">
                    <span class="text-muted" style="font-size:0.75rem;">#${list.length - idx}</span>
                    <span>${s.jamMulai} – ${s.jamSelesai}</span>
                    <span class="text-muted">${payudaraLabel[s.payudara]}</span>
                    <span style="font-weight:600;">${s.durasi} mnt</span>
                </div>`,
        )
        .join("");
}

function tampilStatusHarian(list) {
    const el = document.getElementById("statusHarian");
    const total = list.length;
    el.classList.remove(
        "d-none",
        "alert-success",
        "alert-warning",
        "alert-info",
    );

    if (total >= TARGET_MIN && total <= TARGET_MAX) {
        el.classList.add("alert-success");
        el.innerHTML = `<i class="bx bx-check-circle me-1"></i> <strong>Target tercapai!</strong> ${total} sesi hari ini. Frekuensi menyusui normal 🎉`;
    } else if (total > TARGET_MAX) {
        el.classList.add("alert-info");
        el.innerHTML = `<i class="bx bx-info-circle me-1"></i> ${total} sesi hari ini — di atas target. Pastikan bayi menyusu dengan efektif.`;
    } else {
        el.classList.add("alert-warning");
        el.innerHTML = `<i class="bx bx-error me-1"></i> Baru <strong>${total} sesi</strong> hari ini. Target minimal 8 sesi per hari.`;
    }
}

// ── ALERT JEDA ────────────────────────────────────────────────────────
function cekAlertJeda() {
    if (sesiAktif.mulai) return;

    const list = JSON.parse(localStorage.getItem(getSesiKey())) || [];
    if (!list.length) return;

    const lastTs = list[list.length - 1].ts;
    const elapsed = Date.now() - lastTs;
    const el = document.getElementById("alertJeda");

    if (elapsed >= JEDA_MAX_MS) {
        const jam = Math.floor(elapsed / 3600000);
        const mnt = Math.floor((elapsed % 3600000) / 60000);
        document.getElementById("alertJedaText").textContent =
            `Sesi terakhir ${jam > 0 ? jam + " jam " : ""}${mnt} menit lalu. Sudah waktunya menyusui!`;
        el.classList.remove("d-none");
    } else {
        el.classList.add("d-none");
    }
}

// ── CLEAR DATA ────────────────────────────────────────────────────────
function clearDataMenyusui() {
    Swal.fire({
        title: "Hapus semua data?",
        text: `Seluruh riwayat menyusui ${anakAktifNama} akan dihapus permanen.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus semua!",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;

        localStorage.removeItem(getHistoriKey());
        Object.keys(localStorage)
            .filter((k) => k.startsWith("menyusuiSesi_" + anakAktifId))
            .forEach((k) => localStorage.removeItem(k));

        resetSesiAktif();
        sesiAktif.payudara = null;
        ["btnKiri", "btnDua", "btnKanan"].forEach((id) =>
            document.getElementById(id).classList.remove("payudara-active"),
        );

        document.getElementById("sesiCount").textContent = "0";
        document.getElementById("statusHarian").classList.add("d-none");
        document.getElementById("alertJeda").classList.add("d-none");
        renderSesiList();

        Swal.fire({
            title: "Terhapus!",
            text: "Semua data menyusui berhasil dihapus.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        });
    });
}

// ── LAPORAN PDF ────────────────────────────────────────────────────────
function bukaLaporanMenyusui() {
    const histori = JSON.parse(localStorage.getItem(getHistoriKey())) || {};
    const keys = Object.keys(histori).sort().reverse();
    const tglCetak = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const payudaraLabel = {
        kiri: "Kiri",
        kanan: "Kanan",
        dua: "Dua-dua",
    };

    const rows = !keys.length
        ? `<tr><td colspan="6" style="text-align:center;padding:20px;color:#888;">Belum ada data</td></tr>`
        : keys
              .map((k, idx) => {
                  const h = histori[k];
                  const tgl = new Date(k).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                  });
                  const bg = idx % 2 === 0 ? "#fff" : "#f4fdf9";
                  const statusColor = h.tercapai ? "#1a7a5e" : "#c0392b";
                  const statusBg = h.tercapai ? "#e6f7f2" : "#fdecea";
                  return `
                    <tr style="background:${bg};">
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;">${tgl}</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;font-weight:600;">${h.totalSesi}x</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${h.rataRata} mnt</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${h.jamMulai ?? "-"} – ${h.jamTerakhir ?? "-"}</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${payudaraLabel[h.dominan] ?? "-"}</td>
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
    <title>Laporan Menyusui — ${anakAktifNama} — KIA Digital</title>
    <style>
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Segoe UI', Arial, sans-serif; color:#1a1a2e; background:#fff; padding:32px 40px; }
        .header { text-align:center; border-bottom:2px solid #3aab8c; padding-bottom:16px; margin-bottom:20px; }
        .header .label { font-size:0.68rem; color:#888; text-transform:uppercase; letter-spacing:.1em; }
        .header h1 { font-size:1.3rem; font-weight:700; margin:4px 0; }
        .header .sub { font-size:0.78rem; color:#555; }
        .info { display:flex; gap:32px; font-size:0.8rem; color:#444; margin-bottom:20px; flex-wrap:wrap; }
        .info div span { color:#888; display:block; font-size:0.72rem; }
        table { width:100%; border-collapse:collapse; font-size:0.78rem; }
        thead tr { background:#3aab8c; color:#fff; }
        thead th { padding:9px 10px; border:1px solid #2e9278; font-weight:600; }
        .footer { margin-top:20px; font-size:0.7rem; color:#aaa; border-top:1px solid #eee; padding-top:10px; }
        .note { margin-top:16px; font-size:0.72rem; color:#666; background:#f9fffe; border:1px solid #c8ede4; border-radius:6px; padding:10px 14px; }
        @media print {
            body { padding:16px 20px; }
            .no-print { display:none !important; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="label">Kartu Ibu &amp; Anak Digital — Kemenkes RI</div>
        <h1>Laporan Pemantauan Menyusui</h1>
        <div class="sub">Bayi: <strong>${anakAktifNama}</strong> &nbsp;·&nbsp; Dicetak: ${tglCetak}</div>
    </div>

    <div class="info">
        <div><span>Nama Bayi</span><strong>${anakAktifNama}</strong></div>
        <div><span>Total hari tercatat</span><strong>${keys.length} hari</strong></div>
        <div><span>Hari tercapai target</span><strong>${keys.filter((k) => histori[k].tercapai).length} hari</strong></div>
        <div><span>Standar</span><strong>ASI Eksklusif Kemenkes RI · 8–12x/hari</strong></div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="text-align:left;">Tanggal</th>
                <th>Total Sesi</th>
                <th>Rata² Durasi</th>
                <th>Jam Pertama – Terakhir</th>
                <th>Payudara Dominan</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>

    <div class="note">
        <strong>Keterangan:</strong> Normal = ≥8 sesi/hari sesuai standar Kemenkes RI.
        Kurang = &lt;8 sesi/hari, disarankan konsultasi dengan bidan atau konselor laktasi.
    </div>

    <div class="footer">
        Dicetak dari aplikasi KIA Digital &nbsp;·&nbsp; Standar ASI Eksklusif Kemenkes RI &nbsp;·&nbsp; Target 8–12 sesi/hari, durasi 20–30 menit
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

// ── TIMER ─────────────────────────────────────────────────────────────
function startTimer() {
    if (sesiAktif.timerInterval) return;
    sesiAktif.timerInterval = setInterval(() => {
        if (!sesiAktif.mulai) return;
        const elapsed = Date.now() - sesiAktif.mulai;
        const m = String(Math.floor(elapsed / 60000)).padStart(2, "0");
        const s = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
        document.getElementById("timerDisplay").textContent = `${m}:${s}`;

        if (elapsed >= DURASI_MAX) {
            document.getElementById("timerDisplay").style.color = "#e74c3c";
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(sesiAktif.timerInterval);
    sesiAktif.timerInterval = null;
    document.getElementById("timerDisplay").style.color = "";
}

// Auto cek jeda tiap menit setelah anak dipilih
setInterval(() => {
    if (anakAktifId) cekAlertJeda();
}, 60000);

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihAnakMenyusui,
    pilihPayudara,
    toggleSesi,
    batalSesiAktif,
    clearDataMenyusui,
    bukaLaporanMenyusui,
});
