// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let state = {
    "ayah-abo": null,
    "ibu-abo": null,
    "ayah-rh": null,
    "ibu-rh": null,
};

// ═══════════════════════════════════════════════
// KONSTANTA GENETIK
// ═══════════════════════════════════════════════
const ALLELES_ABO = {
    A: [
        ["IA", "IA"],
        ["IA", "i"],
    ],
    B: [
        ["IB", "IB"],
        ["IB", "i"],
    ],
    AB: [["IA", "IB"]],
    O: [["i", "i"]],
};

// Rh+ bisa RR atau Rr, Rh- hanya rr
const ALLELES_RH = {
    "+": [
        ["R", "R"],
        ["R", "r"],
    ],
    "-": [["r", "r"]],
};

const BADGE_ABO = {
    A: "bg-label-primary",
    B: "bg-label-success",
    AB: "bg-label-danger",
    O: "bg-label-secondary",
};
const PILL_ABO = {
    A: {
        bg: "#dbeafe",
        text: "#1e3a8a",
    },
    B: {
        bg: "#dcfce7",
        text: "#14532d",
    },
    AB: {
        bg: "#fce7f3",
        text: "#831843",
    },
    O: {
        bg: "#f3f4f6",
        text: "#374151",
    },
};
const PILL_RH = {
    "+": {
        bg: "#dcfce7",
        text: "#14532d",
        label: "Rh+",
    },
    "-": {
        bg: "#f3f4f6",
        text: "#374151",
        label: "Rh−",
    },
};

// ═══════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════
function pilihGoldar(group, val) {
    state[group] = val;
    const isAyah = group.startsWith("ayah");
    const base = isAyah ? "primary" : "danger";
    document.querySelectorAll(`[data-group="${group}"]`).forEach((btn) => {
        const isActive = btn.dataset.val === val;
        btn.className = `btn fw-bold btn-goldar ${isActive ? `btn-${base}` : `btn-outline-${base}`}`;
        btn.style.borderRadius = "10px";
        if (group.endsWith("abo")) {
            btn.style.minWidth = "56px";
        } else {
            btn.style.flex = "1";
            btn.style.fontSize = "0.82rem";
        }
    });
}

function resetForm() {
    state = {
        "ayah-abo": null,
        "ibu-abo": null,
        "ayah-rh": null,
        "ibu-rh": null,
    };
    ["ayah-abo", "ibu-abo"].forEach((g) => {
        const base = g.startsWith("ayah") ? "primary" : "danger";
        document.querySelectorAll(`[data-group="${g}"]`).forEach((btn) => {
            btn.className = `btn fw-bold btn-goldar btn-outline-${base}`;
            btn.style.minWidth = "56px";
            btn.style.borderRadius = "10px";
        });
    });
    ["ayah-rh", "ibu-rh"].forEach((g) => {
        const base = g.startsWith("ayah") ? "primary" : "danger";
        document.querySelectorAll(`[data-group="${g}"]`).forEach((btn) => {
            btn.className = `btn fw-bold btn-goldar btn-outline-${base} flex-fill`;
            btn.style.borderRadius = "10px";
            btn.style.fontSize = "0.82rem";
        });
    });
    document.getElementById("hasil-card").style.display = "none";
    document.getElementById("hasil-placeholder").style.display = "";
}

// ═══════════════════════════════════════════════
// LOGIKA GENETIK
// ═══════════════════════════════════════════════
function getPhenotypeABO(a1, a2) {
    const s = [a1, a2].sort().join("");
    if (s === "IAIB") return "AB";
    if (a1 === "IA" || a2 === "IA") return "A";
    if (a1 === "IB" || a2 === "IB") return "B";
    return "O";
}

function getLabelABO(a1, a2) {
    const m = {
        IA: "Iᴬ",
        IB: "Iᴮ",
        i: "i",
    };
    return m[a1] + m[a2];
}

function hitungABO(aboA, aboB) {
    const combosA = ALLELES_ABO[aboA];
    const combosB = ALLELES_ABO[aboB];
    const map = {};
    let total = 0;
    combosA.forEach((ca) => {
        combosB.forEach((cb) => {
            [
                [ca[0], cb[0]],
                [ca[0], cb[1]],
                [ca[1], cb[0]],
                [ca[1], cb[1]],
            ].forEach(([x, y]) => {
                const ph = getPhenotypeABO(x, y);
                if (!map[ph])
                    map[ph] = {
                        count: 0,
                        combos: new Set(),
                    };
                map[ph].count++;
                map[ph].combos.add(getLabelABO(x, y));
                total++;
            });
        });
    });
    return {
        map,
        total,
    };
}

function getPhenotypeRH(a1, a2) {
    return a1 === "R" || a2 === "R" ? "+" : "-";
}

function hitungRH(rhA, rhB) {
    const combosA = ALLELES_RH[rhA];
    const combosB = ALLELES_RH[rhB];
    const map = {};
    let total = 0;
    combosA.forEach((ca) => {
        combosB.forEach((cb) => {
            [
                [ca[0], cb[0]],
                [ca[0], cb[1]],
                [ca[1], cb[0]],
                [ca[1], cb[1]],
            ].forEach(([x, y]) => {
                const ph = getPhenotypeRH(x, y);
                if (!map[ph])
                    map[ph] = {
                        count: 0,
                        combos: new Set(),
                    };
                map[ph].count++;
                map[ph].combos.add(x + y);
                total++;
            });
        });
    });
    return {
        map,
        total,
    };
}

// ═══════════════════════════════════════════════
// HITUNG UTAMA
// ═══════════════════════════════════════════════
function hitung() {
    if (
        !state["ayah-abo"] ||
        !state["ibu-abo"] ||
        !state["ayah-rh"] ||
        !state["ibu-rh"]
    ) {
        Swal.fire({
            icon: "warning",
            title: "Belum lengkap",
            text: "Pilih golongan darah ABO dan Rhesus untuk ayah dan ibu.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    const { map: aboMap, total: aboTotal } = hitungABO(
        state["ayah-abo"],
        state["ibu-abo"],
    );
    const { map: rhMap, total: rhTotal } = hitungRH(
        state["ayah-rh"],
        state["ibu-rh"],
    );

    // Label pasangan
    document.getElementById("label-pasangan").textContent =
        `Ayah ${state["ayah-abo"]}${state["ayah-rh"]} × Ibu ${state["ibu-abo"]}${state["ibu-rh"]}`;

    // Pills ABO
    const pillsABO = document.getElementById("hasil-pills-abo");
    pillsABO.innerHTML = "";
    Object.entries(aboMap)
        .sort((a, b) => b[1].count - a[1].count)
        .forEach(([ph, data]) => {
            const pct = Math.round((data.count / aboTotal) * 100);
            const col = PILL_ABO[ph];
            pillsABO.innerHTML += `
                    <div style="background:${col.bg}; border-radius:14px; padding:12px 20px; text-align:center; min-width:80px;">
                        <div style="font-size:1.5rem; font-weight:700; color:${col.text};">${ph}</div>
                        <div style="font-size:0.78rem; color:${col.text}; opacity:0.8; margin-top:2px;">${pct}%</div>
                    </div>`;
        });

    // Pills Rh
    const pillsRH = document.getElementById("hasil-pills-rh");
    pillsRH.innerHTML = "";
    Object.entries(rhMap)
        .sort((a, b) => b[1].count - a[1].count)
        .forEach(([ph, data]) => {
            const pct = Math.round((data.count / rhTotal) * 100);
            const col = PILL_RH[ph];
            pillsRH.innerHTML += `
                    <div style="background:${col.bg}; border-radius:14px; padding:12px 20px; text-align:center; min-width:80px;">
                        <div style="font-size:1.5rem; font-weight:700; color:${col.text};">${col.label}</div>
                        <div style="font-size:0.78rem; color:${col.text}; opacity:0.8; margin-top:2px;">${pct}%</div>
                    </div>`;
        });

    // Kombinasi Lengkap ABO + Rh
    const kombiEl = document.getElementById("hasil-kombinasi");
    kombiEl.innerHTML = "";
    Object.keys(aboMap).forEach((abo) => {
        Object.keys(rhMap).forEach((rh) => {
            const pct = Math.round(
                (aboMap[abo].count / aboTotal) *
                    (rhMap[rh].count / rhTotal) *
                    100,
            );
            const col = PILL_ABO[abo];
            kombiEl.innerHTML += `
                        <div style="background:${col.bg}; border-radius:12px; padding:8px 16px; text-align:center; min-width:72px;">
                            <div style="font-size:1.1rem; font-weight:700; color:${col.text};">${abo}${rh === "+" ? "+" : "−"}</div>
                            <div style="font-size:0.72rem; color:${col.text}; opacity:0.8;">${pct}%</div>
                        </div>`;
        });
    });

    // Tabel ABO
    const tbodyABO = document.getElementById("tabel-body-abo");
    tbodyABO.innerHTML = "";
    ["A", "B", "AB", "O"].forEach((ph) => {
        const data = aboMap[ph];
        const ada = !!data;
        const pct = ada
            ? Math.round((data.count / aboTotal) * 100) + "%"
            : "0%";
        const combosStr = ada ? [...data.combos].join(", ") : "—";
        tbodyABO.innerHTML += `
                    <tr>
                        <td class="text-center"><span class="badge ${BADGE_ABO[ph]} fw-bold">${ph}</span></td>
                        <td class="text-center text-muted" style="font-size:0.78rem;">${combosStr}</td>
                        <td class="text-center fw-bold ${ada ? "" : "text-muted"}">${pct}</td>
                        <td class="text-center">
                            ${
                                ada
                                    ? '<i class="bx bx-check-circle text-success" style="font-size:1.1rem;"></i>'
                                    : '<i class="bx bx-x-circle text-danger" style="font-size:1.1rem;"></i>'
                            }
                        </td>
                    </tr>`;
    });

    // Tabel Rh
    const tbodyRH = document.getElementById("tabel-body-rh");
    tbodyRH.innerHTML = "";
    ["+", "-"].forEach((ph) => {
        const data = rhMap[ph];
        const ada = !!data;
        const pct = ada ? Math.round((data.count / rhTotal) * 100) + "%" : "0%";
        const combosStr = ada ? [...data.combos].join(", ") : "—";
        const badge = ph === "+" ? "bg-label-success" : "bg-label-secondary";
        const label = ph === "+" ? "Rh+" : "Rh−";
        tbodyRH.innerHTML += `
                    <tr>
                        <td class="text-center"><span class="badge ${badge} fw-bold">${label}</span></td>
                        <td class="text-center text-muted" style="font-size:0.78rem;">${combosStr}</td>
                        <td class="text-center fw-bold ${ada ? "" : "text-muted"}">${pct}</td>
                        <td class="text-center">
                            ${
                                ada
                                    ? '<i class="bx bx-check-circle text-success" style="font-size:1.1rem;"></i>'
                                    : '<i class="bx bx-x-circle text-danger" style="font-size:1.1rem;"></i>'
                            }
                        </td>
                    </tr>`;
    });

    // Warning inkompatibilitas Rh: ibu Rh- + ayah Rh+ + ada kemungkinan anak Rh+
    const warnEl = document.getElementById("warning-rh");
    const risikoRh =
        state["ibu-rh"] === "-" && state["ayah-rh"] === "+" && rhMap["+"];
    warnEl.style.setProperty(
        "display",
        risikoRh ? "flex" : "none",
        "important",
    );

    // Tampilkan
    document.getElementById("hasil-placeholder").style.display = "none";
    document.getElementById("hasil-card").style.display = "";
}

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihGoldar,
    resetForm,
    hitung,
});
