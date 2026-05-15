// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let jkDipilih = null;

// ═══════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════
function pilihJK(val) {
    jkDipilih = val;
    const map = {
        L: {
            btn: "btn-laki",
            aktif: "btn-primary",
            nonaktif: "btn-outline-primary",
        },
        P: {
            btn: "btn-perempuan",
            aktif: "btn-danger",
            nonaktif: "btn-outline-danger",
        },
        LP: {
            btn: "btn-keduanya",
            aktif: "btn-success",
            nonaktif: "btn-outline-success",
        },
    };
    ["L", "P", "LP"].forEach((k) => {
        const m = map[k];
        const btn = document.getElementById(m.btn);
        btn.className = `btn fw-bold flex-fill ${val === k ? m.aktif : m.nonaktif}`;
        btn.style.borderRadius = "10px";
    });
    resetHasil();
}

function resetHasil() {
    document.getElementById("hasil-card").style.display = "none";
    document.getElementById("hasil-placeholder").style.display = "";
}

function resetForm() {
    document.getElementById("tinggi-ayah").value = "";
    document.getElementById("tinggi-ibu").value = "";
    jkDipilih = null;
    ["btn-laki", "btn-perempuan", "btn-keduanya"].forEach((id, i) => {
        const cls = [
            "btn-outline-primary",
            "btn-outline-danger",
            "btn-outline-success",
        ];
        const btn = document.getElementById(id);
        btn.className = `btn fw-bold flex-fill ${cls[i]}`;
        btn.style.borderRadius = "10px";
    });
    resetHasil();
}

// ═══════════════════════════════════════════════
// HITUNG
// ═══════════════════════════════════════════════
function hitung() {
    const ayah = parseFloat(document.getElementById("tinggi-ayah").value);
    const ibu = parseFloat(document.getElementById("tinggi-ibu").value);

    if (!ayah || !ibu) {
        Swal.fire({
            icon: "warning",
            title: "Belum lengkap",
            text: "Masukkan tinggi ayah dan ibu terlebih dahulu.",
            confirmButtonColor: "#696cff",
        });
        return;
    }
    if (ayah < 140 || ayah > 220 || ibu < 130 || ibu > 210) {
        Swal.fire({
            icon: "warning",
            title: "Nilai tidak wajar",
            text: "Pastikan tinggi badan dalam rentang yang realistis (cm).",
            confirmButtonColor: "#696cff",
        });
        return;
    }
    if (!jkDipilih) {
        Swal.fire({
            icon: "warning",
            title: "Jenis kelamin belum dipilih",
            text: "Pilih jenis kelamin anak terlebih dahulu.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    const predL = (ayah + ibu + 13) / 2;
    const predP = (ayah + ibu - 13) / 2;
    const RANGE = 10;

    // Label orang tua
    document.getElementById("label-ortu").textContent =
        `Ayah ${ayah} cm · Ibu ${ibu} cm`;

    // Render boxes
    const boxEl = document.getElementById("hasil-boxes");
    boxEl.innerHTML = "";

    const items = [];
    if (jkDipilih === "L" || jkDipilih === "LP")
        items.push({
            label: "Laki-laki",
            pred: predL,
            color: "primary",
            icon: "bx-male",
        });
    if (jkDipilih === "P" || jkDipilih === "LP")
        items.push({
            label: "Perempuan",
            pred: predP,
            color: "danger",
            icon: "bx-female",
        });

    const colClass = items.length === 1 ? "col-12" : "col-12 col-sm-6";

    items.forEach((item) => {
        const min = (item.pred - RANGE).toFixed(1);
        const max = (item.pred + RANGE).toFixed(1);
        const pred = item.pred.toFixed(1);
        boxEl.innerHTML += `
            <div class="${colClass}">
                <div class="card h-100" style="border-radius:14px; border:1.5px solid var(--bs-${item.color}); background: var(--bs-${item.color}-bg, #fff);">
                    <div class="card-body p-4 text-center">
                        <div class="d-flex align-items-center justify-content-center gap-2 mb-3">
                            <span class="avatar d-flex align-items-center justify-content-center rounded bg-label-${item.color}">
                                <i class="bx ${item.icon}"></i>
                            </span>
                            <span class="fw-bold" style="font-size:0.9rem;">Anak ${item.label}</span>
                        </div>
                        <div style="font-size:2.8rem; font-weight:700; color: var(--bs-${item.color}); line-height:1;">
                            ${pred}
                        </div>
                        <div class="text-muted mb-3" style="font-size:0.78rem;">cm (prediksi)</div>
                        <div class="d-flex justify-content-center gap-3">
                            <div class="text-center">
                                <div class="fw-bold" style="font-size:1rem;">${min}</div>
                                <div class="text-muted" style="font-size:0.7rem;">Min (cm)</div>
                            </div>
                            <div class="text-muted d-flex align-items-center" style="font-size:1.2rem;">—</div>
                            <div class="text-center">
                                <div class="fw-bold" style="font-size:1rem;">${max}</div>
                                <div class="text-muted" style="font-size:0.7rem;">Maks (cm)</div>
                            </div>
                        </div>
                        <div class="progress mt-3" style="height:6px; border-radius:20px; background:#f0f0f0;">
                            <div class="progress-bar bg-${item.color}" style="width:100%; border-radius:20px;"></div>
                        </div>
                        <div class="text-muted mt-1" style="font-size:0.7rem;">Rentang normal: ${min} – ${max} cm</div>
                    </div>
                </div>
            </div>
        `;
    });

    // Render visual bar perbandingan
    const barWrap = document.getElementById("visual-bar-wrap");
    const barEl = document.getElementById("visual-bars");
    barWrap.style.display = "";
    barEl.innerHTML = "";

    const allItems = [
        {
            label: "Ayah",
            val: ayah,
            color: "#696cff",
        },
        {
            label: "Ibu",
            val: ibu,
            color: "#ff3e1d",
        },
        ...(jkDipilih === "L" || jkDipilih === "LP"
            ? [
                  {
                      label: "Anak (L)",
                      val: predL,
                      color: "#696cff",
                      opacity: "0.45",
                  },
              ]
            : []),
        ...(jkDipilih === "P" || jkDipilih === "LP"
            ? [
                  {
                      label: "Anak (P)",
                      val: predP,
                      color: "#ff3e1d",
                      opacity: "0.45",
                  },
              ]
            : []),
    ];

    const maxVal = Math.max(...allItems.map((i) => i.val)) + 5;

    allItems.forEach((item) => {
        const pct = ((item.val / maxVal) * 100).toFixed(1);
        const opacity = item.opacity || "1";
        barEl.innerHTML += `
            <div class="d-flex align-items-center gap-3 mb-2">
                <div style="width:80px; font-size:0.78rem; color:#555; text-align:right; flex-shrink:0;">${item.label}</div>
                <div style="flex:1; background:#f0f0f0; border-radius:20px; height:22px; overflow:hidden;">
                    <div style="width:${pct}%; background:${item.color}; opacity:${opacity}; height:100%; border-radius:20px; transition:width 0.6s ease; display:flex; align-items:center; padding-left:8px;">
                        <span style="font-size:0.72rem; font-weight:600; color:#fff; white-space:nowrap;">${item.val.toFixed(1)} cm</span>
                    </div>
                </div>
            </div>
        `;
    });

    // Tampilkan
    document.getElementById("hasil-placeholder").style.display = "none";
    document.getElementById("hasil-card").style.display = "";
}

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihJK,
    resetForm,
    hitung,
});
