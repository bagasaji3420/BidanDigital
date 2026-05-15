// ══════════════════════════════════════════════════
// JADWAL IMUNISASI KEMENKES 2023
// ══════════════════════════════════════════════════
const JADWAL = [
    {
        id: "hb0",
        nama: "Hepatitis B (HB-0)",
        usiaBulan: 0,
        usiaLabel: "0 hari (< 24 jam)",
        usiaHari: 1,
        jenis: "wajib",
        keterangan: "Diberikan segera setelah lahir, maks 24 jam pertama",
    },
    {
        id: "bcg",
        nama: "BCG",
        usiaBulan: 1,
        usiaLabel: "1 bulan",
        usiaHari: 30,
        jenis: "wajib",
        keterangan: "Mencegah TBC berat; berikan sebelum usia 2 bulan",
    },
    {
        id: "polio1",
        nama: "Polio 1 (OPV)",
        usiaBulan: 1,
        usiaLabel: "1 bulan",
        usiaHari: 30,
        jenis: "wajib",
        keterangan: "Bisa bersamaan dengan BCG",
    },
    {
        id: "dpt1",
        nama: "DPT-HB-Hib 1 + Polio 2",
        usiaBulan: 2,
        usiaLabel: "2 bulan",
        usiaHari: 60,
        jenis: "wajib",
        keterangan: "Difteri, Pertusis, Tetanus, Hepatitis B, Hib",
    },
    {
        id: "pcv1",
        nama: "PCV 1",
        usiaBulan: 2,
        usiaLabel: "2 bulan",
        usiaHari: 60,
        jenis: "rekomendasi",
        keterangan: "Mencegah pneumonia & meningitis",
    },
    {
        id: "rv1",
        nama: "Rotavirus 1",
        usiaBulan: 2,
        usiaLabel: "2 bulan",
        usiaHari: 60,
        jenis: "rekomendasi",
        keterangan: "Mencegah diare rotavirus",
    },
    {
        id: "dpt2",
        nama: "DPT-HB-Hib 2 + Polio 3",
        usiaBulan: 3,
        usiaLabel: "3 bulan",
        usiaHari: 90,
        jenis: "wajib",
        keterangan: "",
    },
    {
        id: "pcv2",
        nama: "PCV 2",
        usiaBulan: 3,
        usiaLabel: "3 bulan",
        usiaHari: 90,
        jenis: "rekomendasi",
        keterangan: "",
    },
    {
        id: "rv2",
        nama: "Rotavirus 2",
        usiaBulan: 3,
        usiaLabel: "3 bulan",
        usiaHari: 90,
        jenis: "rekomendasi",
        keterangan: "",
    },
    {
        id: "dpt3",
        nama: "DPT-HB-Hib 3 + Polio 4 + IPV",
        usiaBulan: 4,
        usiaLabel: "4 bulan",
        usiaHari: 120,
        jenis: "wajib",
        keterangan: "IPV = Inactivated Polio Vaccine",
    },
    {
        id: "pcv3",
        nama: "PCV 3",
        usiaBulan: 4,
        usiaLabel: "4 bulan",
        usiaHari: 120,
        jenis: "rekomendasi",
        keterangan: "",
    },
    {
        id: "rv3",
        nama: "Rotavirus 3",
        usiaBulan: 4,
        usiaLabel: "4 bulan",
        usiaHari: 120,
        jenis: "rekomendasi",
        keterangan: "Hanya untuk vaksin 3-dosis",
    },
    {
        id: "influenza",
        nama: "Influenza",
        usiaBulan: 6,
        usiaLabel: "6 bulan (tahunan)",
        usiaHari: 180,
        jenis: "rekomendasi",
        keterangan: "Diulang tiap tahun",
    },
    {
        id: "mr1",
        nama: "MR (Campak-Rubela)",
        usiaBulan: 9,
        usiaLabel: "9 bulan",
        usiaHari: 270,
        jenis: "wajib",
        keterangan: "Mencegah campak dan rubela",
    },
    {
        id: "jea",
        nama: "Japanese Encephalitis (JE)",
        usiaBulan: 9,
        usiaLabel: "9 bulan",
        usiaHari: 270,
        jenis: "rekomendasi",
        keterangan: "Di daerah endemis",
    },
    {
        id: "varisela",
        nama: "Varisela",
        usiaBulan: 12,
        usiaLabel: "12 bulan",
        usiaHari: 365,
        jenis: "rekomendasi",
        keterangan: "Mencegah cacar air",
    },
    {
        id: "hep_a",
        nama: "Hepatitis A",
        usiaBulan: 12,
        usiaLabel: "12 bulan",
        usiaHari: 365,
        jenis: "rekomendasi",
        keterangan: "Diberikan 2 dosis, interval 6 bulan",
    },
    {
        id: "mr2",
        nama: "MR Lanjutan + DPT-HB-Hib",
        usiaBulan: 18,
        usiaLabel: "18 bulan",
        usiaHari: 540,
        jenis: "wajib",
        keterangan: "Booster MR dan DPT-HB-Hib",
    },
    {
        id: "campak",
        nama: "Campak Lanjutan",
        usiaBulan: 24,
        usiaLabel: "24 bulan",
        usiaHari: 730,
        jenis: "wajib",
        keterangan: "Sebelum masuk sekolah",
    },
];

// ══════════════════════════════════════════════════
// STATE — data dibaca dari kia_anak (shared dengan pertumbuhan)
// ══════════════════════════════════════════════════
let daftarAnak = []; // dari localStorage kia_anak
let anakAktifId = null;
let filterJenis = "semua";

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
window.addEventListener("load", () => {
    muatDataAnak();
});

/**
 * Baca data dari kia_anak (sama dengan grafik pertumbuhan).
 * Jika belum ada, tampilkan empty state dengan tombol ke pertumbuhan.
 * Data vaksin disimpan di field `vaksin` masing-masing anak.
 */
function muatDataAnak() {
    const raw = localStorage.getItem("kia_anak");
    daftarAnak = raw ? JSON.parse(raw) : [];

    // Pastikan setiap anak punya field vaksin
    daftarAnak.forEach((a) => {
        if (!a.vaksin) a.vaksin = [];
    });

    if (daftarAnak.length === 0) {
        document.getElementById("emptyState").style.display = "block";
        document.getElementById("mainUI").style.display = "none";
    } else {
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("mainUI").style.display = "block";
        renderListAnak();
        pilihAnak(daftarAnak[0].id);
    }
}

// Simpan kembali ke kia_anak (termasuk update field vaksin)
function simpan() {
    localStorage.setItem("kia_anak", JSON.stringify(daftarAnak));
}

// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
function getAnakAktif() {
    return daftarAnak.find((a) => a.id === anakAktifId);
}

function hitungUmur(tglLahir) {
    const lahir = new Date(tglLahir);
    const now = new Date();
    const diffMs = now - lahir;
    const diffHari = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const bulan = Math.floor(diffHari / 30);
    const tahun = Math.floor(bulan / 12);
    if (diffHari < 30) return `${diffHari} hari`;
    if (bulan < 12) return `${bulan} bulan`;
    const sisa = bulan % 12;
    return sisa > 0 ? `${tahun} thn ${sisa} bln` : `${tahun} tahun`;
}

function getJadwalTanggal(tglLahir, usiaHari) {
    const d = new Date(tglLahir);
    d.setDate(d.getDate() + usiaHari);
    return d;
}

function getStatusVaksin(vaksinId, tglLahir, vaksinData) {
    const v = vaksinData?.find((v) => v.id === vaksinId);
    if (v?.status === "selesai") return "selesai";

    const jadwal = JADWAL.find((j) => j.id === vaksinId);
    if (!jadwal) return "belum";

    const tglJadwal = getJadwalTanggal(tglLahir, jadwal.usiaHari);
    const now = new Date();
    const selisihHari = Math.floor((tglJadwal - now) / (1000 * 60 * 60 * 24));

    if (selisihHari < 0) return "terlambat";
    if (selisihHari <= 30) return "upcoming";
    return "belum";
}

// ══════════════════════════════════════════════════
// RENDER LIST ANAK
// ══════════════════════════════════════════════════
function renderListAnak() {
    const el = document.getElementById("listAnak");
    if (daftarAnak.length === 0) {
        el.innerHTML = `<div class="text-center py-3 text-muted" style="font-size:0.85rem;">
                    Belum ada data anak.
                </div>`;
        return;
    }
    const totalWajib = JADWAL.filter((j) => j.jenis === "wajib").length;
    el.innerHTML = daftarAnak
        .map((anak) => {
            const umur = hitungUmur(anak.tglLahir);
            const selesai = (anak.vaksin || []).filter(
                (v) => v.status === "selesai",
            ).length;
            const isActive = anak.id === anakAktifId;
            const avatar = anak.jk === "P" ? "👧" : "👦";
            return `<div class="anak-card ${isActive ? "active" : ""}" onclick="pilihAnak('${anak.id}')">
                    <div class="d-flex align-items-center gap-2">
                        <span style="font-size:1.4rem;">${avatar}</span>
                        <div class="flex-grow-1">
                            <div class="fw-bold" style="font-size:0.82rem;">${anak.nama}</div>
                            <div class="text-muted" style="font-size:0.72rem;">${umur} · ${anak.jk === "P" ? "Perempuan" : "Laki-laki"}</div>
                        </div>
                        <span class="badge" style="background:#f0f0ff;color:#696cff;font-size:0.68rem;">${selesai}/${totalWajib}</span>
                    </div>
                </div>`;
        })
        .join("");
}

// ══════════════════════════════════════════════════
// PILIH ANAK
// ══════════════════════════════════════════════════
function pilihAnak(id) {
    anakAktifId = id;
    renderListAnak();
    renderInfoAnak();
    renderTimeline();
    renderTabel();
    document.getElementById("cardTimeline").style.display = "block";
    document.getElementById("cardTabel").style.display = "block";
}

// ══════════════════════════════════════════════════
// RENDER INFO ANAK
// ══════════════════════════════════════════════════
function renderInfoAnak() {
    const anak = getAnakAktif();
    if (!anak) return;

    document.getElementById("infoAnakEmpty").style.display = "none";
    document.getElementById("infoAnakDetail").style.display = "block";
    document.getElementById("anakAvatar").textContent =
        anak.jk === "P" ? "👧" : "👦";
    document.getElementById("infoNamaAnak").textContent = anak.nama;

    const tglFmt = new Date(anak.tglLahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    document.getElementById("infoTglLahir").textContent = `Lahir: ${tglFmt}`;
    document.getElementById("infoUmurAnak").textContent = hitungUmur(
        anak.tglLahir,
    );

    const vaksinData = anak.vaksin || [];
    const wajib = JADWAL.filter((j) => j.jenis === "wajib");
    let selesai = 0,
        terlambat = 0,
        upcoming = 0;
    wajib.forEach((j) => {
        const st = getStatusVaksin(j.id, anak.tglLahir, vaksinData);
        if (st === "selesai") selesai++;
        else if (st === "terlambat") terlambat++;
        else if (st === "upcoming") upcoming++;
    });

    document.getElementById("infoSelesai").textContent = selesai;
    document.getElementById("infoTerlambat").textContent = terlambat;
    document.getElementById("infoUpcoming").textContent = upcoming;

    const pct = Math.round((selesai / wajib.length) * 100);
    document.getElementById("progressBar").style.width = pct + "%";
    document.getElementById("progressLabel").textContent =
        `${selesai} / ${wajib.length} vaksin wajib`;
}

// ══════════════════════════════════════════════════
// RENDER TIMELINE
// ══════════════════════════════════════════════════
function renderTimeline() {
    const anak = getAnakAktif();
    if (!anak) return;
    document.getElementById("timelineNamaAnak").textContent = anak.nama;

    const groups = {};
    JADWAL.forEach((j) => {
        if (!groups[j.usiaBulan]) groups[j.usiaBulan] = [];
        groups[j.usiaBulan].push(j);
    });

    const sortedKeys = Object.keys(groups).sort((a, b) => a - b);
    const vaksinData = anak.vaksin || [];

    const html =
        `<div class="d-flex gap-2 pb-2" style="min-width:max-content;">` +
        sortedKeys
            .map((key) => {
                const items = groups[key];
                const label = key == 0 ? "0 hari" : `${key} bln`;
                const statuses = items.map((j) =>
                    getStatusVaksin(j.id, anak.tglLahir, vaksinData),
                );

                let dotCls = "dot-belum",
                    icon = "○";
                if (statuses.every((s) => s === "selesai")) {
                    dotCls = "dot-selesai";
                    icon = "✓";
                } else if (statuses.some((s) => s === "terlambat")) {
                    dotCls = "dot-terlambat";
                    icon = "!";
                } else if (statuses.some((s) => s === "upcoming")) {
                    dotCls = "dot-upcoming";
                    icon = "~";
                }

                const tglJadwal = getJadwalTanggal(
                    anak.tglLahir,
                    items[0].usiaHari,
                );
                const tglFmt = tglJadwal.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
                const tooltip = items.map((j) => j.nama).join(", ");

                return `<div class="timeline-item">
                        <div class="timeline-dot ${dotCls}" title="${tooltip}">${icon}</div>
                        <div class="timeline-label">${items.map((j) => j.nama.split(" ")[0]).join(", ")}</div>
                        <div class="timeline-usia">${label}</div>
                        <div class="timeline-usia">${tglFmt}</div>
                    </div>`;
            })
            .join("") +
        `</div>`;

    document.getElementById("timelineContent").innerHTML = html;
}

// ══════════════════════════════════════════════════
// RENDER TABEL
// ══════════════════════════════════════════════════
function renderTabel() {
    const anak = getAnakAktif();
    if (!anak) return;
    document.getElementById("tabelNamaAnak").textContent = anak.nama;

    const vaksinData = anak.vaksin || [];
    const filterStatus = document.getElementById("filterStatus").value;
    let filtered =
        filterJenis === "semua"
            ? JADWAL
            : JADWAL.filter((j) => j.jenis === filterJenis);

    const stBadgeMap = {
        selesai: `<span class="badge" style="background:#e6f7f2;color:#0f6e56;font-size:0.7rem;">✅ Selesai</span>`,
        terlambat: `<span class="badge" style="background:#fdecea;color:#c0392b;font-size:0.7rem;">⚠️ Terlambat</span>`,
        upcoming: `<span class="badge" style="background:#fff8e1;color:#b8860b;font-size:0.7rem;">🕐 Upcoming</span>`,
        belum: `<span class="badge" style="background:#f5f5f5;color:#888;font-size:0.7rem;">— Belum</span>`,
    };

    document.getElementById("tabelBody").innerHTML = filtered
        .map((j) => {
            const st = getStatusVaksin(j.id, anak.tglLahir, vaksinData);
            if (filterStatus !== "semua" && st !== filterStatus) return "";

            const vData = vaksinData.find((v) => v.id === j.id);
            const tglJadwal = getJadwalTanggal(anak.tglLahir, j.usiaHari);
            const tglJadwalFmt = tglJadwal.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            const tglDiberikan = vData?.tglDiberikan
                ? new Date(vData.tglDiberikan).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  })
                : "—";

            const jenisBadge =
                j.jenis === "wajib"
                    ? `<span class="badge" style="background:#f0f0ff;color:#696cff;font-size:0.68rem;">Wajib</span>`
                    : `<span class="badge" style="background:#fff3cd;color:#856404;font-size:0.68rem;">Rekomendasi</span>`;

            const btnAksi =
                st === "selesai"
                    ? `<button onclick="batalkanVaksin('${j.id}')" class="btn btn-sm btn-outline-secondary py-0 px-2" style="font-size:0.7rem;">Batalkan</button>`
                    : `<button onclick="tandaiSelesai('${j.id}')" class="btn btn-sm btn-outline-success py-0 px-2" style="font-size:0.7rem;"><i class="bx bx-check me-1"></i>Tandai Selesai</button>`;

            const rowBg =
                st === "terlambat"
                    ? "background:#fff5f5;"
                    : st === "selesai"
                      ? "background:#f8fffc;"
                      : "";

            return `<tr style="${rowBg}">
                    <td style="font-size:0.8rem;"><strong>${j.nama}</strong></td>
                    <td>${jenisBadge}</td>
                    <td style="font-size:0.78rem;">${j.usiaLabel}</td>
                    <td style="font-size:0.78rem;">${tglJadwalFmt}</td>
                    <td>${stBadgeMap[st]}</td>
                    <td style="font-size:0.78rem;">${tglDiberikan}</td>
                    <td class="text-muted" style="font-size:0.75rem;">${j.keterangan || "—"}</td>
                    <td>${btnAksi}</td>
                </tr>`;
        })
        .join("");
}

// ══════════════════════════════════════════════════
// TANDAI SELESAI / BATALKAN
// ══════════════════════════════════════════════════
function tandaiSelesai(vaksinId) {
    const anak = getAnakAktif();
    if (!anak) return;
    if (!anak.vaksin) anak.vaksin = [];

    const today = new Date().toISOString().split("T")[0];
    const idx = anak.vaksin.findIndex((v) => v.id === vaksinId);
    const jadwal = JADWAL.find((j) => j.id === vaksinId);
    const st = getStatusVaksin(vaksinId, anak.tglLahir, anak.vaksin);

    const doSimpan = (tgl) => {
        const entry = {
            id: vaksinId,
            status: "selesai",
            tglDiberikan: tgl,
        };
        if (idx !== -1) anak.vaksin[idx] = entry;
        else anak.vaksin.push(entry);
        simpan();
        renderInfoAnak();
        renderTimeline();
        renderTabel();
        renderListAnak();
        Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: `${jadwal.nama} telah dicatat.`,
            timer: 1500,
            showConfirmButton: false,
        });
    };

    if (st === "terlambat") {
        Swal.fire({
            icon: "warning",
            title: "⚠️ Imunisasi Terlambat",
            html: `<strong>${jadwal.nama}</strong> sudah melewati jadwal ideal.<br><br>
               <label style="font-size:0.85rem;font-weight:600;">Tanggal vaksin diberikan:</label><br>
               <input type="date" id="swalTglVaksin" class="swal2-input" style="margin-top:6px;" 
                      max="${today}" value="${today}">`,
            showCancelButton: true,
            confirmButtonColor: "#696cff",
            cancelButtonColor: "#8592a3",
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            preConfirm: () => {
                const tgl = document.getElementById("swalTglVaksin").value;
                if (!tgl) {
                    Swal.showValidationMessage("Tanggal harus diisi");
                    return false;
                }
                return tgl;
            },
        }).then((res) => {
            if (res.isConfirmed) doSimpan(res.value);
        });
    } else {
        doSimpan(today);
    }
}

function batalkanVaksin(vaksinId) {
    const anak = getAnakAktif();
    if (!anak) return;
    Swal.fire({
        title: "Batalkan imunisasi ini?",
        text: "Status akan dikembalikan ke belum selesai.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, batalkan",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            anak.vaksin = (anak.vaksin || []).filter((v) => v.id !== vaksinId);
            simpan();
            renderInfoAnak();
            renderTimeline();
            renderTabel();
            renderListAnak();
        }
    });
}

// ══════════════════════════════════════════════════
// FILTER JENIS
// ══════════════════════════════════════════════════
function setFilterJenis(jenis) {
    filterJenis = jenis;
    document.getElementById("btnJenisSemua").className =
        "btn btn-sm " +
        (jenis === "semua" ? "btn-primary" : "btn-outline-secondary");
    document.getElementById("btnJenisWajib").className =
        "btn btn-sm " +
        (jenis === "wajib" ? "btn-primary" : "btn-outline-secondary");
    document.getElementById("btnJenisRek").className =
        "btn btn-sm " +
        (jenis === "rekomendasi" ? "btn-primary" : "btn-outline-secondary");
    renderTabel();
}

// ══════════════════════════════════════════════════
// REVIEW & EXPORT PDF
// ══════════════════════════════════════════════════
function reviewPDF() {
    const anak = getAnakAktif();
    if (!anak) return;

    const vaksinData = anak.vaksin || [];
    const umur = hitungUmur(anak.tglLahir);
    const tglLahirFmt = new Date(anak.tglLahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const selesai = JADWAL.filter(
        (j) => getStatusVaksin(j.id, anak.tglLahir, vaksinData) === "selesai",
    ).length;

    const rows = JADWAL.map((j) => {
        const st = getStatusVaksin(j.id, anak.tglLahir, vaksinData);
        const vData = vaksinData.find((v) => v.id === j.id);
        const tglJadwal = getJadwalTanggal(anak.tglLahir, j.usiaHari);
        const tglJadwalFmt = tglJadwal.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        const tglDiberikan = vData?.tglDiberikan
            ? new Date(vData.tglDiberikan).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
              })
            : "—";
        const stText = {
            selesai: "✅ Selesai",
            terlambat: "⚠️ Terlambat",
            upcoming: "🕐 Upcoming",
            belum: "— Belum",
        }[st];
        const stColor = {
            selesai: "#e6f7f2",
            terlambat: "#fdecea",
            upcoming: "#fff8e1",
            belum: "#f5f5f5",
        }[st];
        return `<tr style="background:${stColor}">
                    <td>${j.nama}</td>
                    <td>${j.jenis === "wajib" ? "Wajib" : "Rekomendasi"}</td>
                    <td>${j.usiaLabel} (${tglJadwalFmt})</td>
                    <td>${stText}</td>
                    <td>${tglDiberikan}</td>
                </tr>`;
    }).join("");

    const html = `<div>
                <div class="text-center mb-3">
                    <h6 class="fw-bold">Laporan Imunisasi — ${anak.nama}</h6>
                    <div class="text-muted" style="font-size:0.78rem;">
                        Dicetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} ·
                        Sumber: Jadwal Imunisasi Kemenkes RI 2023
                    </div>
                </div>
                <div class="d-flex gap-3 mb-3 flex-wrap p-3 rounded" style="background:#f8f8ff;font-size:0.82rem;">
                    <div><span class="text-muted" style="font-size:0.72rem;display:block;">Nama</span><strong>${anak.nama}</strong></div>
                    <div><span class="text-muted" style="font-size:0.72rem;display:block;">Jenis Kelamin</span><strong>${anak.jk === "P" ? "Perempuan" : "Laki-laki"}</strong></div>
                    <div><span class="text-muted" style="font-size:0.72rem;display:block;">Tgl Lahir</span><strong>${tglLahirFmt}</strong></div>
                    <div><span class="text-muted" style="font-size:0.72rem;display:block;">Usia</span><strong>${umur}</strong></div>
                    <div><span class="text-muted" style="font-size:0.72rem;display:block;">Progress</span><strong>${selesai}/${JADWAL.length} vaksin</strong></div>
                </div>
                <table class="table table-sm table-bordered" style="font-size:0.78rem;">
                    <thead style="background:#f0f0ff;">
                        <tr>
                            <th>Vaksin</th><th>Jenis</th><th>Jadwal</th><th>Status</th><th>Tgl Diberikan</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
                <div class="alert alert-warning mt-2" style="font-size:0.75rem;">
                    ⚠️ <strong>Disclaimer:</strong> Laporan ini hanya sebagai alat bantu pemantauan. Konsultasikan jadwal imunisasi dengan dokter atau bidan Anda.
                </div>
            </div>`;

    document.getElementById("previewPDFContent").innerHTML = html;
    new bootstrap.Modal(document.getElementById("modalReviewPDF")).show();
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    const today = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    let yPos = 15;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Laporan Imunisasi Bayi", 105, yPos, {
        align: "center",
    });
    yPos += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(
        `Dicetak: ${today} | Sumber: Jadwal Imunisasi Kemenkes RI 2023`,
        105,
        yPos,
        {
            align: "center",
        },
    );
    yPos += 10;

    daftarAnak.forEach((anak) => {
        const vaksinData = anak.vaksin || [];
        const umur = hitungUmur(anak.tglLahir);
        const tglLahirFmt = new Date(anak.tglLahir).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            },
        );

        if (yPos > 240) {
            doc.addPage();
            yPos = 15;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40);
        doc.text(anak.nama, 14, yPos);
        yPos += 5;
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(
            `Lahir: ${tglLahirFmt} | Usia: ${umur} | ${anak.jk === "P" ? "Perempuan" : "Laki-laki"}${anak.beratLahir ? " | Berat lahir: " + anak.beratLahir + " gram" : ""}`,
            14,
            yPos,
        );
        yPos += 6;

        const rows = JADWAL.map((j) => {
            const st = getStatusVaksin(j.id, anak.tglLahir, vaksinData);
            const vData = vaksinData.find((v) => v.id === j.id);
            const tglJadwal = getJadwalTanggal(anak.tglLahir, j.usiaHari);
            const tglJadwalFmt = tglJadwal.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            const tglDiberikan = vData?.tglDiberikan
                ? new Date(vData.tglDiberikan).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  })
                : "-";
            const stText = {
                selesai: "Selesai",
                terlambat: "Terlambat",
                upcoming: "Upcoming",
                belum: "Belum",
            }[st];
            return [
                j.nama,
                j.jenis === "wajib" ? "Wajib" : "Rekomendasi",
                j.usiaLabel,
                tglJadwalFmt,
                stText,
                tglDiberikan,
            ];
        });

        doc.autoTable({
            startY: yPos,
            head: [
                [
                    "Vaksin",
                    "Jenis",
                    "Usia Ideal",
                    "Jadwal",
                    "Status",
                    "Tgl Diberikan",
                ],
            ],
            body: rows,
            styles: {
                fontSize: 7,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [105, 108, 255],
                textColor: 255,
                fontStyle: "bold",
            },
            bodyStyles: {
                textColor: 40,
            },
            didParseCell: (data) => {
                if (data.section === "body") {
                    const st = data.row.raw[4];
                    if (st === "Selesai")
                        data.cell.styles.fillColor = [230, 247, 242];
                    else if (st === "Terlambat")
                        data.cell.styles.fillColor = [253, 236, 234];
                    else if (st === "Upcoming")
                        data.cell.styles.fillColor = [255, 248, 225];
                }
            },
            margin: {
                left: 14,
                right: 14,
            },
        });
        yPos = doc.lastAutoTable.finalY + 10;
    });

    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(
        "Disclaimer: Laporan ini hanya sebagai alat bantu pemantauan. Konsultasikan jadwal imunisasi dengan dokter atau bidan Anda.",
        14,
        yPos,
    );
    doc.save(`laporan-imunisasi-${new Date().toISOString().split("T")[0]}.pdf`);

    bootstrap.Modal.getInstance(
        document.getElementById("modalReviewPDF"),
    ).hide();
    Swal.fire({
        icon: "success",
        title: "PDF berhasil diunduh!",
        timer: 1500,
        showConfirmButton: false,
    });
}


// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihAnak,
    tandaiSelesai,
    batalkanVaksin,
    setFilterJenis,
    reviewPDF,
    downloadPDF,
});