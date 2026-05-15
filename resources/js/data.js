// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
function formatTgl(str) {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function setBadge(id, ada, label) {
    const el = document.getElementById("badge-" + id);
    if (!el) return;
    el.className = "badge " + (ada ? "bg-label-success" : "bg-label-secondary");
    el.textContent = ada ? label || "Ada data" : "Kosong";
}

function setDetail(id, html) {
    const el = document.getElementById("detail-" + id);
    if (el) el.innerHTML = html;
}

function cardEmpty(id) {
    setBadge(id, false);
    setDetail(
        id,
        '<span class="text-muted"><i class="bx bx-minus-circle me-1"></i>Belum ada data tersimpan.</span>',
    );
}

// ══════════════════════════════════════════════════
// HITUNG STORAGE
// ══════════════════════════════════════════════════
function hitungStorage() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key);
        total += new Blob([key + val]).size;
    }
    const MAX = 5 * 1024 * 1024;
    const pct = Math.min((total / MAX) * 100, 100);

    document.getElementById("storageSize").textContent = formatBytes(total);
    document.getElementById("storageBar").style.width = pct.toFixed(1) + "%";
    document.getElementById("storageDesc").textContent =
        localStorage.length +
        " key tersimpan · " +
        pct.toFixed(2) +
        "% dari batas browser";

    const bar = document.getElementById("storageBar");
    bar.className =
        "progress-bar " +
        (pct > 80 ? "bg-danger" : pct > 50 ? "bg-warning" : "bg-primary");
    bar.style.borderRadius = "20px";
    bar.style.transition = "width 0.6s ease";
}

// ══════════════════════════════════════════════════
// RENDER TIAP CARD
// ══════════════════════════════════════════════════
function renderPregnancyData() {
    const raw = localStorage.getItem("pregnancyData");
    if (!raw) {
        cardEmpty("pregnancyData");
        return;
    }
    const d = JSON.parse(raw);
    setBadge("pregnancyData", true, (d.weeks ?? "?") + " minggu");
    setDetail(
        "pregnancyData",
        `
        <div class="row g-1">
            <div class="col-6"><span class="text-muted">HPHT:</span> <strong>${d.hpht || "—"}</strong></div>
            <div class="col-6"><span class="text-muted">HPL:</span> <strong>${d.edd ? formatTgl(d.edd) : "—"}</strong></div>
            <div class="col-6"><span class="text-muted">Usia:</span> <strong>${d.weeks ?? "—"}+${d.days ?? 0} mgg</strong></div>
            <div class="col-6"><span class="text-muted">BMI:</span> <strong>${d.bmi ? d.bmi + " kg/m²" : "—"}</strong></div>
        </div>
    `,
    );
}

function renderBeratBadan() {
    const raw = localStorage.getItem("kia_berat_badan");
    if (!raw) {
        cardEmpty("kia_berat_badan");
        return;
    }
    const arr = JSON.parse(raw);
    if (!arr.length) {
        cardEmpty("kia_berat_badan");
        return;
    }
    const last = arr[arr.length - 1];
    setBadge("kia_berat_badan", true, arr.length + " data");
    setDetail(
        "kia_berat_badan",
        `
        <div><span class="text-muted">Total pengukuran:</span> <strong>${arr.length}x</strong></div>
        <div><span class="text-muted">BB terakhir:</span> <strong>${last.bb} kg</strong></div>
        <div><span class="text-muted">Tanggal:</span> <strong>${formatTgl(last.tanggal)}</strong></div>
    `,
    );
}

function renderTekananDarah() {
    const raw = localStorage.getItem("kia_tekanan_darah");
    if (!raw) {
        cardEmpty("kia_tekanan_darah");
        return;
    }
    const arr = JSON.parse(raw);
    if (!arr.length) {
        cardEmpty("kia_tekanan_darah");
        return;
    }
    const last = arr[arr.length - 1];
    setBadge("kia_tekanan_darah", true, arr.length + " data");
    setDetail(
        "kia_tekanan_darah",
        `
        <div><span class="text-muted">Total pengukuran:</span> <strong>${arr.length}x</strong></div>
        <div><span class="text-muted">TD terakhir:</span> <strong>${last.sistolik}/${last.diastolik} mmHg</strong></div>
        <div><span class="text-muted">Waktu:</span> <strong>${new Date(last.waktu).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</strong></div>
    `,
    );
}

function renderKickHistori() {
    const raw = localStorage.getItem("kickHistori");
    const sesiKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("kickSesi_"),
    );
    if (!raw && !sesiKeys.length) {
        cardEmpty("kickHistori");
        return;
    }
    const histori = raw ? JSON.parse(raw) : {};
    const hariCount = Object.keys(histori).length;
    const tercapai = Object.values(histori).filter((h) => h.tercapai).length;
    setBadge("kickHistori", true, hariCount + " hari");
    setDetail(
        "kickHistori",
        `
        <div><span class="text-muted">Total hari tercatat:</span> <strong>${hariCount} hari</strong></div>
        <div><span class="text-muted">Hari target tercapai:</span> <strong>${tercapai} hari</strong></div>
        <div><span class="text-muted">Sesi harian tersimpan:</span> <strong>${sesiKeys.length} sesi</strong></div>
    `,
    );
}

function renderNifasData() {
    const raw = localStorage.getItem("nifasData");
    if (!raw) {
        cardEmpty("nifasData");
        return;
    }
    const d = JSON.parse(raw);
    setBadge("nifasData", true, "Ada data");
    setDetail(
        "nifasData",
        `
        <div><span class="text-muted">Tanggal lahir:</span> <strong>${formatTgl(d.tanggalLahir)}</strong></div>
        <div><span class="text-muted">Jenis persalinan:</span> <strong>${d.jenisLahir === "sc" ? "Sesar (SC)" : "Normal"}</strong></div>
        ${d.beratLahir ? `<div><span class="text-muted">Berat bayi:</span> <strong>${Number(d.beratLahir).toLocaleString("id-ID")} gram</strong></div>` : ""}
    `,
    );
}

function renderChecklist() {
    const raw = localStorage.getItem("checklist_persalinan");
    if (!raw) {
        cardEmpty("checklist_persalinan");
        return;
    }
    const obj = JSON.parse(raw);
    const total = Object.keys(obj).length;
    const done = Object.values(obj).filter((v) => v).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    setBadge("checklist_persalinan", true, done + "/" + total);
    setDetail(
        "checklist_persalinan",
        `
        <div><span class="text-muted">Item dicentang:</span> <strong>${done} dari ${total}</strong></div>
        <div class="progress mt-2" style="height:6px; border-radius:20px; background:#f0f0f0;">
            <div class="progress-bar bg-success" style="width:${pct}%; border-radius:20px;"></div>
        </div>
        <div class="text-muted mt-1" style="font-size:0.72rem;">${pct}% selesai</div>
    `,
    );
}

function renderKiaAnak() {
    const raw = localStorage.getItem("kia_anak");
    if (!raw) {
        cardEmpty("kia_anak");
        return;
    }
    const arr = JSON.parse(raw);
    if (!arr.length) {
        cardEmpty("kia_anak");
        return;
    }
    const totalPengukuran = arr.reduce(
        (s, a) => s + (a.pengukuran?.length || 0),
        0,
    );
    const totalVaksin = arr.reduce(
        (s, a) =>
            s + (a.vaksin?.filter((v) => v.status === "selesai").length || 0),
        0,
    );
    setBadge("kia_anak", true, arr.length + " anak");
    setDetail(
        "kia_anak",
        `
        <div><span class="text-muted">Jumlah anak:</span> <strong>${arr.length} anak</strong></div>
        <div><span class="text-muted">Total pengukuran:</span> <strong>${totalPengukuran}x</strong></div>
        <div><span class="text-muted">Vaksin selesai:</span> <strong>${totalVaksin} vaksin</strong></div>
        <div class="mt-1 d-flex flex-wrap gap-1">
            ${arr.map((a) => `<span class="badge bg-label-primary" style="font-size:0.68rem;">${a.jk === "P" ? "👧" : "👦"} ${a.nama}</span>`).join("")}
        </div>
    `,
    );
}

function renderMenyusui() {
    const historiKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("menyusuiHistori_"),
    );
    const sesiKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("menyusuiSesi_"),
    );
    if (!historiKeys.length && !sesiKeys.length) {
        cardEmpty("menyusui");
        return;
    }
    let totalHari = 0,
        totalTercapai = 0;
    historiKeys.forEach((k) => {
        const obj = JSON.parse(localStorage.getItem(k) || "{}");
        totalHari += Object.keys(obj).length;
        totalTercapai += Object.values(obj).filter((h) => h.tercapai).length;
    });
    setBadge("menyusui", true, historiKeys.length + " anak");
    setDetail(
        "menyusui",
        `
        <div><span class="text-muted">Data anak tercatat:</span> <strong>${historiKeys.length} anak</strong></div>
        <div><span class="text-muted">Total hari tercatat:</span> <strong>${totalHari} hari</strong></div>
        <div><span class="text-muted">Hari target tercapai:</span> <strong>${totalTercapai} hari</strong></div>
    `,
    );
}

// ══════════════════════════════════════════════════
// HAPUS
// ══════════════════════════════════════════════════
function hapusSatu(key, namaData) {
    Swal.fire({
        title: "Hapus " + namaData + "?",
        text: "Data ini akan dihapus permanen dari perangkat Anda.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (!res.isConfirmed) return;
        localStorage.removeItem(key);
        renderSemua();
        hitungStorage();
        Swal.fire({
            icon: "success",
            title: "Dihapus!",
            timer: 1200,
            showConfirmButton: false,
        });
    });
}

function hapusKick() {
    Swal.fire({
        title: "Hapus data Kick Counter?",
        text: "Riwayat dan semua sesi harian akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (!res.isConfirmed) return;
        localStorage.removeItem("kickHistori");
        Object.keys(localStorage)
            .filter((k) => k.startsWith("kickSesi_"))
            .forEach((k) => localStorage.removeItem(k));
        renderSemua();
        hitungStorage();
        Swal.fire({
            icon: "success",
            title: "Dihapus!",
            timer: 1200,
            showConfirmButton: false,
        });
    });
}

function hapusMenyusui() {
    Swal.fire({
        title: "Hapus semua data Menyusui?",
        text: "Seluruh riwayat menyusui semua anak akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (!res.isConfirmed) return;
        Object.keys(localStorage)
            .filter(
                (k) =>
                    k.startsWith("menyusuiHistori_") ||
                    k.startsWith("menyusuiSesi_"),
            )
            .forEach((k) => localStorage.removeItem(k));
        renderSemua();
        hitungStorage();
        Swal.fire({
            icon: "success",
            title: "Dihapus!",
            timer: 1200,
            showConfirmButton: false,
        });
    });
}

function hapusSemuaData() {
    Swal.fire({
        title: "⚠️ Hapus Semua Data?",
        html: `Seluruh data yang tersimpan di perangkat ini akan dihapus permanen.<br><br>
               <small class="text-muted">Data kehamilan, berat badan, tekanan darah, kick counter,
               menyusui, pertumbuhan bayi, imunisasi, nifas, bookmark artikel, checklist, dan semua data lainnya.</small>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus semuanya!",
        cancelButtonText: "Batal",
        reverseButtons: true,
    }).then((res) => {
        if (!res.isConfirmed) return;
        // Konfirmasi kedua
        Swal.fire({
            title: "Yakin benar-benar hapus semua?",
            text: "Tindakan ini tidak bisa dibatalkan.",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#8592a3",
            confirmButtonText: "Hapus Semua Sekarang",
            cancelButtonText: "Batal",
        }).then((res2) => {
            if (!res2.isConfirmed) return;
            localStorage.clear();
            renderSemua();
            hitungStorage();
            Swal.fire({
                icon: "success",
                title: "Semua data berhasil dihapus",
                text: "localStorage sudah bersih.",
                timer: 2000,
                showConfirmButton: false,
            });
        });
    });
}

function renderHaidData() {
    const raw = localStorage.getItem("haidData");
    if (!raw) {
        cardEmpty("haidData");
        return;
    }
    const d = JSON.parse(raw);
    if (!d.riwayat?.length) {
        cardEmpty("haidData");
        return;
    }

    const last = d.riwayat[d.riwayat.length - 1];
    const next = new Date(last.mulai);
    next.setDate(next.getDate() + d.siklus);

    setBadge("haidData", true, d.riwayat.length + " entri");
    setDetail(
        "haidData",
        `
                    <div><span class="text-muted">Siklus:</span> <strong>${d.siklus} hari</strong></div>
                    <div><span class="text-muted">Total entri:</span> <strong>${d.riwayat.length} entri</strong></div>
                    <div><span class="text-muted">Haid terakhir:</span> <strong>${formatTgl(last.mulai)}</strong></div>
                    <div><span class="text-muted">Prediksi berikutnya:</span> <strong>${formatTgl(next.toISOString().split("T")[0])}</strong></div>
                `,
    );
}

function renderAnemiaData() {
    const raw = localStorage.getItem("anemiaData");
    if (!raw) {
        cardEmpty("anemiaData");
        return;
    }
    const d = JSON.parse(raw);

    const totalFe = Object.values(d.log || {}).filter((v) => v === true).length;
    const totalHb = d.riwayatHb?.length || 0;
    const lastHb = totalHb ? d.riwayatHb[d.riwayatHb.length - 1] : null;

    setBadge("anemiaData", true, totalFe + " hari Fe");
    setDetail(
        "anemiaData",
        `
                    <div><span class="text-muted">Mulai tracker:</span> <strong>${formatTgl(d.tanggalMulai)}</strong></div>
                    <div><span class="text-muted">Total minum Fe:</span> <strong>${totalFe} hari</strong></div>
                    <div><span class="text-muted">Pemeriksaan Hb:</span> <strong>${totalHb}x</strong></div>
                    ${lastHb ? `<div><span class="text-muted">Hb terakhir:</span> <strong>${lastHb.hb} g/dL</strong></div>` : ""}
                `,
    );
}

function renderBookmarks() {
    const raw = localStorage.getItem("bidan_bookmarks");
    if (!raw) {
        cardEmpty("bidan_bookmarks");
        return;
    }
    const arr = JSON.parse(raw);
    if (!arr.length) {
        cardEmpty("bidan_bookmarks");
        return;
    }

    setBadge("bidan_bookmarks", true, arr.length + " artikel");
    setDetail(
        "bidan_bookmarks",
        `
        <div><span class="text-muted">Total tersimpan:</span> <strong>${arr.length} artikel</strong></div>
        <div class="mt-1">
            ${arr
                .slice(0, 3)
                .map(
                    (b) => `
                <div class="text-truncate" style="max-width:100%;">
                    <i class="bx bxs-bookmark me-1 text-warning" style="font-size:0.75rem;"></i>
                    <a href="${b.url}" style="font-size:0.78rem;">${b.title}</a>
                </div>
            `,
                )
                .join("")}
            ${arr.length > 3 ? `<div class="text-muted mt-1" style="font-size:0.72rem;">+${arr.length - 3} artikel lainnya</div>` : ""}
        </div>
    `,
    );
}
// ══════════════════════════════════════════════════
// RENDER SEMUA & INIT
// ══════════════════════════════════════════════════
function renderSemua() {
    renderPregnancyData();
    renderBeratBadan();
    renderTekananDarah();
    renderKickHistori();
    renderNifasData();
    renderChecklist();
    renderKiaAnak();
    renderMenyusui();
    renderHaidData();
    renderAnemiaData();
    renderBookmarks(); 
}

document.addEventListener("DOMContentLoaded", () => {
    renderSemua();
    hitungStorage();
});

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    hapusSatu,
    hapusKick,
    hapusMenyusui,
    hapusSemuaData,
});
