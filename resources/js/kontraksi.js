// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let contractions = [];
let isActive = false;
let startTime = null;
let timerInterval = null;
let sesiMulai = null;
let sudahAlert511 = false;

const STORAGE_KEY = "kontraksiSesi";

// ══════════════════════════════════════════════════
// STORAGE HELPERS
// ══════════════════════════════════════════════════
function simpanStorage() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            contractions,
            sesiMulai: sesiMulai ? sesiMulai.toISOString() : null,
            sudahAlert511,
        }),
    );
}

function muatStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
        const data = JSON.parse(raw);
        contractions = data.contractions || [];
        sesiMulai = data.sesiMulai ? new Date(data.sesiMulai) : null;
        sudahAlert511 = data.sudahAlert511 || false;
    } catch {
        contractions = [];
    }
}

function hapusStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

// ══════════════════════════════════════════════════
// TOGGLE KONTRAKSI (1 tombol, 2 fungsi)
// ══════════════════════════════════════════════════
function toggleKontraksi() {
    if (!isActive) {
        // MULAI
        isActive = true;
        startTime = new Date();
        if (!sesiMulai) sesiMulai = new Date();

        const btn = document.getElementById("btnKontraksi");
        btn.innerHTML =
            '<i class="bx bx-stop-circle me-2" style="font-size:1.6rem;vertical-align:middle;"></i> SELESAI';
        btn.classList.add("sedang-berlangsung");
        btn.classList.remove("siaga");

        document.getElementById("timerBox").style.display = "block";

        timerInterval = setInterval(() => {
            const detik = Math.floor((new Date() - startTime) / 1000);
            const m = String(Math.floor(detik / 60)).padStart(2, "0");
            const s = String(detik % 60).padStart(2, "0");
            document.getElementById("timerDisplay").textContent = `${m}:${s}`;
        }, 500);
    } else {
        // SELESAI
        isActive = false;
        clearInterval(timerInterval);

        const endTime = new Date();
        const duration = Math.floor((endTime - startTime) / 1000);

        let interval = null;
        if (contractions.length > 0) {
            const prev = contractions[contractions.length - 1];
            interval = Math.floor((startTime - new Date(prev.start)) / 1000);
        }

        contractions.push({
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            duration,
            interval,
        });

        // Simpan ke localStorage
        simpanStorage();

        const btn = document.getElementById("btnKontraksi");
        btn.innerHTML =
            '<i class="bx bx-radio-circle-marked me-2" style="font-size:1.6rem;vertical-align:middle;"></i> MULAI KONTRAKSI';
        btn.classList.remove("sedang-berlangsung");
        btn.classList.add("siaga");

        document.getElementById("timerBox").style.display = "none";
        document.getElementById("timerDisplay").textContent = "00:00";

        updateUI();
        cek511();
    }
}

// ══════════════════════════════════════════════════
// UPDATE UI
// ══════════════════════════════════════════════════
function updateUI() {
    const total = contractions.length;
    document.getElementById("statJumlah").textContent = total;

    const last = contractions[total - 1];
    const durDetik = last.duration;
    const intDetik = last.interval;

    document.getElementById("statDurasi").textContent = durDetik + "s";

    if (intDetik !== null) {
        const intMenit = (intDetik / 60).toFixed(1);
        document.getElementById("statInterval").textContent = intMenit;
        document.getElementById("labelInterval").textContent =
            intMenit + " mnt";

        const progInt = Math.min(100, Math.round((300 / intDetik) * 100));
        document.getElementById("progInterval").style.width = progInt + "%";
        document.getElementById("progInterval").className =
            "progress-bar " +
            (intDetik <= 300
                ? "bg-danger"
                : intDetik <= 600
                  ? "bg-warning"
                  : "bg-secondary");
    } else {
        document.getElementById("statInterval").textContent = "--";
    }

    const progDur = Math.min(100, Math.round((durDetik / 40) * 100));
    document.getElementById("progDurasi").style.width = progDur + "%";
    document.getElementById("labelDurasi").textContent = durDetik + " dtk";
    document.getElementById("progDurasi").className =
        "progress-bar " + (durDetik >= 40 ? "bg-success" : "bg-warning");

    const sesiDetik = Math.floor((new Date() - sesiMulai) / 1000);
    const progSesi = Math.min(100, Math.round((sesiDetik / 3600) * 100));
    document.getElementById("progSesi").style.width = progSesi + "%";
    const sesiMnt = Math.floor(sesiDetik / 60);
    document.getElementById("labelDurSesi").textContent = sesiMnt + " mnt";

    const badge = document.getElementById("badgeSesi");
    badge.textContent = total + " kontraksi tercatat";
    badge.className =
        "badge " + (total >= 3 ? "bg-warning text-dark" : "bg-primary");

    renderTable();
}

// ══════════════════════════════════════════════════
// RENDER TABLE
// ══════════════════════════════════════════════════
function renderTable() {
    document.getElementById("riwayatKosong").style.display = "none";
    document.getElementById("tableWrapper").style.display = "block";

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = [...contractions]
        .reverse()
        .map((c, i) => {
            const no = contractions.length - i;
            const waktu = new Date(c.start).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            const durStr =
                c.duration >= 60
                    ? Math.floor(c.duration / 60) +
                      "m " +
                      (c.duration % 60) +
                      "d"
                    : c.duration + " dtk";
            const intStr =
                c.interval === null
                    ? "-"
                    : c.interval >= 60
                      ? Math.floor(c.interval / 60) +
                        " mnt " +
                        (c.interval % 60) +
                        "dtk"
                      : c.interval + " dtk";

            let badge =
                '<span class="badge bg-secondary" style="font-size:0.7rem;">Normal</span>';
            if (c.interval !== null && c.interval <= 300 && c.duration >= 40) {
                badge =
                    '<span class="badge bg-danger" style="font-size:0.7rem;">⚠ Waspada</span>';
            } else if (c.duration >= 40) {
                badge =
                    '<span class="badge bg-warning text-dark" style="font-size:0.7rem;">Pantau</span>';
            }

            return `<tr>
                <td class="text-muted">${no}</td>
                <td>${waktu}</td>
                <td><strong>${durStr}</strong></td>
                <td>${intStr}</td>
                <td>${badge}</td>
            </tr>`;
        })
        .join("");
}

// ══════════════════════════════════════════════════
// CEK 5-1-1
// ══════════════════════════════════════════════════
function cek511() {
    if (sudahAlert511 || contractions.length < 3) return;

    const recent = contractions.slice(-3);
    const semuaDurasiOk = recent.every((c) => c.duration >= 40);
    const semuaIntervalOk = recent.every(
        (c) => c.interval !== null && c.interval <= 300,
    );
    const sesiDetik = Math.floor((new Date() - sesiMulai) / 1000);
    const sesiOk = sesiDetik >= 3600;

    const warningInterval = recent.every(
        (c) => c.interval !== null && c.interval <= 420,
    );
    if (!sudahAlert511 && semuaDurasiOk && warningInterval && !sesiOk) {
        Swal.fire({
            icon: "warning",
            title: "Kontraksi Makin Teratur",
            html: `Interval kontraksi sudah <strong>≤ 7 menit</strong> dan durasi ≥ 40 detik.<br>Pantau terus dan bersiaplah menuju fasilitas kesehatan.`,
            confirmButtonColor: "#f39c12",
            confirmButtonText: "Baik, lanjut pantau",
        });
        return;
    }

    if (semuaDurasiOk && semuaIntervalOk && sesiOk) {
        sudahAlert511 = true;
        simpanStorage(); // simpan status alert
        Swal.fire({
            icon: "error",
            title: "🚨 Saatnya ke Fasilitas Kesehatan!",
            html: `
                <p style="font-size:0.95rem; margin-bottom:16px;">
                    Pola kontraksi <strong>5-1-1 terpenuhi</strong>.<br>
                    Segera menuju fasilitas kesehatan terdekat.
                </p>
                <div class="d-flex gap-2 justify-content-center flex-wrap">
                    <button onclick="cariRS()" class="btn btn-danger btn-sm px-4">
                        <i class="bx bx-plus-medical me-1"></i> Cari RS Terdekat
                    </button>
                    <button onclick="cariPuskesmas()" class="btn btn-warning btn-sm px-4 text-dark">
                        <i class="bx bx-clinic me-1"></i> Cari Puskesmas Terdekat
                    </button>
                </div>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            footer: '<small class="text-muted">Tetap tenang, hubungi bidan atau keluarga terdekat</small>',
        });
    }
}

// ══════════════════════════════════════════════════
// CARI RS / PUSKESMAS
// ══════════════════════════════════════════════════
function cariRS() {
    window.open(
        "https://www.google.com/maps/search/rumah+sakit+terdekat/",
        "_blank",
    );
}

function cariPuskesmas() {
    window.open(
        "https://www.google.com/maps/search/puskesmas+terdekat/",
        "_blank",
    );
}

// ══════════════════════════════════════════════════
// RESET SESI
// ══════════════════════════════════════════════════
function resetSesi() {
    if (contractions.length === 0 && !isActive) return;

    Swal.fire({
        title: "Reset sesi?",
        text: "Semua data kontraksi sesi ini akan dihapus.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d63031",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, reset!",
        cancelButtonText: "Batal",
    }).then((r) => {
        if (!r.isConfirmed) return;

        // Hapus storage
        hapusStorage();

        // Reset state
        contractions = [];
        isActive = false;
        startTime = null;
        sesiMulai = null;
        sudahAlert511 = false;
        clearInterval(timerInterval);

        // Reset UI
        const btn = document.getElementById("btnKontraksi");
        btn.innerHTML =
            '<i class="bx bx-radio-circle-marked me-2" style="font-size:1.6rem;vertical-align:middle;"></i> MULAI KONTRAKSI';
        btn.classList.remove("sedang-berlangsung", "siaga");

        document.getElementById("timerBox").style.display = "none";
        document.getElementById("timerDisplay").textContent = "00:00";
        document.getElementById("riwayatKosong").style.display = "block";
        document.getElementById("tableWrapper").style.display = "none";
        document.getElementById("tableBody").innerHTML = "";

        document.getElementById("statJumlah").textContent = "0";
        document.getElementById("statInterval").textContent = "--";
        document.getElementById("statDurasi").textContent = "--";
        document.getElementById("progInterval").style.width = "0%";
        document.getElementById("progDurasi").style.width = "0%";
        document.getElementById("progSesi").style.width = "0%";
        document.getElementById("labelInterval").textContent = "--";
        document.getElementById("labelDurasi").textContent = "--";
        document.getElementById("labelDurSesi").textContent = "--";
        document.getElementById("badgeSesi").textContent = "Belum mulai";
        document.getElementById("badgeSesi").className = "badge bg-secondary";

        Swal.fire({
            icon: "success",
            title: "Sesi direset",
            timer: 1000,
            showConfirmButton: false,
        });
    });
}

// ══════════════════════════════════════════════════
// INIT — muat data saat halaman dibuka
// ══════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    muatStorage();

    if (contractions.length > 0) {
        updateUI();
    }
});

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    toggleKontraksi,
    resetSesi,
    cariRS,
    cariPuskesmas,
});
