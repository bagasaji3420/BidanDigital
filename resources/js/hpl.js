const MILESTONES = [
    {
        week: 4,
        text: "Tes kehamilan positif",
        color: "#4a90c4",
    },
    {
        week: 6,
        text: "Detak jantung terdeteksi",
        color: "#4a90c4",
    },
    {
        week: 8,
        text: "Janin ±1.6 cm, organ terbentuk",
        color: "#4a90c4",
    },
    {
        week: 10,
        text: "USG pertama disarankan",
        color: "#4a90c4",
    },
    {
        week: 12,
        text: "Akhir trimester 1",
        color: "#4a90c4",
    },
    {
        week: 16,
        text: "Gerakan janin mulai terasa",
        color: "#3aab8c",
    },
    {
        week: 20,
        text: "USG anomali & jenis kelamin",
        color: "#3aab8c",
    },
    {
        week: 24,
        text: "Batas viabilitas janin",
        color: "#3aab8c",
    },
    {
        week: 26,
        text: "Akhir trimester 2",
        color: "#3aab8c",
    },
    {
        week: 28,
        text: "Cek glukosa darah (GD)",
        color: "#e8607a",
    },
    {
        week: 32,
        text: "Posisi janin — letak kepala",
        color: "#e8607a",
    },
    {
        week: 36,
        text: "Janin late preterm",
        color: "#e8607a",
    },
    {
        week: 37,
        text: "Aterm — siap lahir",
        color: "#e8607a",
    },
    {
        week: 40,
        text: "HPL — Hari Perkiraan Lahir",
        color: "#e8a045",
    },
];

let currentWeekGlobal = 0;

// Berat janin gr, panjang cm, per minggu (index = minggu)
const DATA_JANIN = {
    4: {
        gr: 0.4,
        cm: 0.2,
    },
    6: {
        gr: 2,
        cm: 0.6,
    },
    8: {
        gr: 3,
        cm: 1.6,
    },
    10: {
        gr: 4,
        cm: 3.1,
    },
    12: {
        gr: 14,
        cm: 5.4,
    },
    14: {
        gr: 43,
        cm: 8.7,
    },
    16: {
        gr: 100,
        cm: 11.6,
    },
    18: {
        gr: 190,
        cm: 14.2,
    },
    20: {
        gr: 300,
        cm: 16.4,
    },
    22: {
        gr: 430,
        cm: 19.0,
    },
    24: {
        gr: 600,
        cm: 21.0,
    },
    26: {
        gr: 760,
        cm: 23.0,
    },
    28: {
        gr: 1000,
        cm: 25.0,
    },
    30: {
        gr: 1300,
        cm: 27.0,
    },
    32: {
        gr: 1700,
        cm: 28.0,
    },
    34: {
        gr: 2100,
        cm: 32.0,
    },
    36: {
        gr: 2600,
        cm: 33.0,
    },
    38: {
        gr: 3000,
        cm: 35.0,
    },
    40: {
        gr: 3400,
        cm: 36.0,
    },
};

// Kenaikan BB ideal ibu per trimester (kg total)
const BB_RANGE = [
    {
        label: "Kurang",
        min: 0,
        max: 12.5,
        color: "#e8a045",
    },
    {
        label: "Normal",
        min: 11.5,
        max: 16,
        color: "#3aab8c",
    },
    {
        label: "Lebih",
        min: 16,
        max: 999,
        color: "#e8607a",
    },
];

// ─── STANDAR BMI ────────────────────────────────────────────────────────────
// WHO: cut-off 18.5 / 25 / 30
// Indonesia (PDGKI/Kemenkes): cut-off 18.5 / 22.9 / 27.4 (Asia-Pasifik)
const BMI_STANDAR = {
    who: {
        nama: "WHO",
        kategori: [
            {
                max: 18.5,
                label: "Berat Badan Kurang",
                cls: "kurang",
                icon: "↓",
            },
            { max: 25.0, label: "Normal", cls: "normal", icon: "✓" },
            { max: 30.0, label: "Berat Badan Lebih", cls: "lebih", icon: "↑" },
            { max: Infinity, label: "Obesitas", cls: "lebih", icon: "⚠" },
        ],
        // IOM kenaikan BB per kategori BMI
        bbGain: [
            { maxBMI: 18.5, min: 12.5, max: 18 },
            { maxBMI: 25.0, min: 11.5, max: 16 },
            { maxBMI: 30.0, min: 7, max: 11.5 },
            { maxBMI: Infinity, min: 5, max: 9 },
        ],
    },
    indonesia: {
        nama: "Indonesia (Kemenkes/PDGKI)",
        kategori: [
            {
                max: 18.5,
                label: "Berat Badan Kurang",
                cls: "kurang",
                icon: "↓",
            },
            { max: 23.0, label: "Normal", cls: "normal", icon: "✓" },
            { max: 27.5, label: "Berat Badan Lebih", cls: "lebih", icon: "↑" },
            { max: Infinity, label: "Obesitas", cls: "lebih", icon: "⚠" },
        ],
        // Kenaikan BB disesuaikan cut-off Asia-Pasifik
        bbGain: [
            { maxBMI: 18.5, min: 12.5, max: 18 },
            { maxBMI: 23.0, min: 11.5, max: 16 },
            { maxBMI: 27.5, min: 7, max: 11.5 },
            { maxBMI: Infinity, min: 5, max: 9 },
        ],
    },
};

let bmiStandar = "who"; // default

function setStandar(s) {
    bmiStandar = s;
    document.getElementById("btnWHO").classList.toggle("active", s === "who");
    document
        .getElementById("btnINA")
        .classList.toggle("active", s === "indonesia");
    if (state) renderPanel(state);
}

function getBMIKategori(bmi) {
    const std = BMI_STANDAR[bmiStandar];
    for (const k of std.kategori) {
        if (bmi < k.max) return { label: k.label, cls: k.cls, icon: k.icon };
    }
    return std.kategori[std.kategori.length - 1];
}

function bbStatusByBMI(delta, bmi) {
    if (delta === null) return null;
    const std = BMI_STANDAR[bmiStandar];
    let range = std.bbGain[std.bbGain.length - 1]; // default obesitas
    if (bmi) {
        for (const r of std.bbGain) {
            if (bmi < r.maxBMI) {
                range = r;
                break;
            }
        }
    }
    const { min, max } = range;
    if (delta < min)
        return {
            label: `Kenaikan kurang (anjuran ${min}–${max} kg)`,
            cls: "kurang",
            icon: "↓",
        };
    if (delta <= max)
        return {
            label: `Kenaikan normal (anjuran ${min}–${max} kg)`,
            cls: "normal",
            icon: "✓",
        };
    return {
        label: `Kenaikan berlebih (anjuran ${min}–${max} kg)`,
        cls: "lebih",
        icon: "↑",
    };
}

let mode = "bumil";
let state = null;

function setMode(m) {
    mode = m;
    document
        .getElementById("btnBumil")
        .classList.toggle("active", m === "bumil");
    document
        .getElementById("btnBidan")
        .classList.toggle("active", m === "bidan");
    if (state) renderPanel(state);
}

function hitung() {
    const hphtVal = document.getElementById("inputHPHT").value;
    if (!hphtVal) {
        alert("Masukkan tanggal HPHT terlebih dahulu.");
        return;
    }

    const hpht = new Date(hphtVal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = today - hpht;
    const diffDays = Math.floor(diffMs / 86400000);
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    const edd = new Date(hpht);
    edd.setDate(edd.getDate() + 280);

    const daysLeft = Math.round((edd - today) / 86400000);

    const tb = parseFloat(document.getElementById("inputTB").value) || null;
    const bbAwal =
        parseFloat(document.getElementById("inputBBawal").value) || null;
    const bbNow =
        parseFloat(document.getElementById("inputBBnow").value) || null;
    const deltaBB = bbAwal && bbNow ? +(bbNow - bbAwal).toFixed(1) : null;

    // Hitung BMI (pakai BB sebelum hamil)
    const bmi =
        tb && bbAwal ? +(bbAwal / Math.pow(tb / 100, 2)).toFixed(1) : null;
    const bmiKat = bmi ? getBMIKategori(bmi) : null;

    state = {
        hpht,
        today,
        weeks,
        days,
        edd,
        daysLeft,
        tb,
        bbAwal,
        bbNow,
        deltaBB,
        bmi,
        bmiKat,
    };

    currentWeekGlobal = weeks;
    drawRoda(weeks);
    renderPanel(state);

    // ✅ SIMPAN DI SINI
    localStorage.setItem(
        "pregnancyData",
        JSON.stringify({
            hpht: hphtVal,
            tb,
            bbAwal,
            bbNow,
            bmiStandar,
            mode,

            weeks,
            days,
            edd: edd.toISOString(),
            daysLeft,
            bmi,
            trimester: weeks <= 13 ? 1 : weeks <= 26 ? 2 : 3,

            updated_at: Date.now(),
        }),
    );
}

function nearestData(week) {
    const keys = Object.keys(DATA_JANIN)
        .map(Number)
        .sort((a, b) => a - b);
    let best = keys[0];
    for (const k of keys) {
        if (k <= week) best = k;
    }
    return DATA_JANIN[best] || DATA_JANIN[4];
}

function formatTgl(d) {
    return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatTglShort(d) {
    return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
    });
}

function getTrimester(w) {
    if (w <= 13)
        return {
            num: 1,
            label: "Trimester 1",
            cls: "tri-1",
        };
    if (w <= 26)
        return {
            num: 2,
            label: "Trimester 2",
            cls: "tri-2",
        };
    return {
        num: 3,
        label: "Trimester 3",
        cls: "tri-3",
    };
}

function renderPanel(s) {
    const panel = document.getElementById("panel");
    const { weeks, days, edd, daysLeft, deltaBB, hpht, bmi, bmiKat } = s;
    const tri = getTrimester(weeks);
    const janin = nearestData(weeks);
    // Hitung ulang bmiKat & bbSt pakai standar aktif
    const bmiKatAktif = bmi ? getBMIKategori(bmi) : null;
    const bbSt = bbStatusByBMI(deltaBB, bmi);
    const isBidan = mode === "bidan";
    const stdLabel = BMI_STANDAR[bmiStandar].nama;

    const jadwalBidan = generateJadwalBidan(hpht);

    // ambil sekitar current week
    const jadwalShown = jadwalBidan;

    // Milestone: ambil 2 sebelumnya + 4 setelahnya
    const past = MILESTONES.filter((m) => m.week < weeks).slice(-2);
    const future = MILESTONES.filter((m) => m.week >= weeks).slice(0, 4);
    const shown = [...past, ...future];

    // BB bar: range dinamis sesuai anjuran standar aktif
    const std = BMI_STANDAR[bmiStandar];
    let bbMax = 20;
    if (bmi) {
        for (const r of std.bbGain) {
            if (bmi < r.maxBMI) {
                bbMax = r.max + 2;
                break;
            }
        }
    }
    const barPct = deltaBB ? Math.min(100, (deltaBB / bbMax) * 100) : 0;
    const barColor = bbSt
        ? bbSt.cls === "normal"
            ? "#3aab8c"
            : bbSt.cls === "kurang"
              ? "#e8a045"
              : "#e8607a"
        : "#c4c1b8";

    panel.innerHTML = `

    <div class="d-flex no-print justify-content-center align-items-center gap-2 mt-3 flex-wrap">
        <a href="/tools/berat-badan" class="btn btn-outline-secondary btn-sm no-print">
            <i class="bx bx-trending-up me-1"></i> Berat Badan
        </a>
        <a href="/tools/tekanan-darah" class="btn btn-outline-secondary btn-sm no-print">
            <i class="bx bx-heart me-1"></i> Tekanan Darah
        </a>
        <a href="/tools/kick-counter" class="btn btn-outline-secondary btn-sm no-print">
            <i class="bx bx-run me-1"></i> Kick Counter
        </a>
        <a href="/tools/anemia" class="btn btn-outline-secondary btn-sm no-print">
            <i class="bx bx-droplet me-1"></i> Tracker Anemia
        </a>
        <a href="/tools/jadwal-anc" class="btn btn-outline-secondary btn-sm no-print">
            <i class="bx bx-calendar me-1"></i> Jadwal ANC
        </a>
    </div>


        <!-- RINGKASAN UTAMA -->
        <div class="card">
            <div class="card-title">Ringkasan Kehamilan</div>

            <div class="ringkasan-wrap">
                <img src="${getJaninImage(weeks)}" class="janin-img">

                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-label">Usia kehamilan</div>
                        <div class="stat-val accent">
                            ${weeks}<span style="font-size:1rem;"> minggu</span>
                        </div>
                        <div class="stat-sub">${days} hari · ${tri.label}</div>
                    </div>

                    <div class="stat-item">
                        <div class="stat-label">Hari Perkiraan Lahir</div>
                        <div class="hpl-date">${formatTgl(edd)}</div>
                        <div class="stat-sub">
                            ${daysLeft > 0 ? daysLeft + " hari lagi" : daysLeft === 0 ? "Hari ini!" : Math.abs(daysLeft) + " hari lalu"}
                        </div>
                    </div>
                </div>

                <div style="margin-top:12px;">
                    <span class="tri-badge ${tri.cls}">${tri.label}</span>
                    ${isBidan ? `<span style="font-size:0.75rem;color:var(--gray-500);">HPHT: ${formatTgl(hpht)}</span>` : ""}
                </div>
            </div>
        </div>

        <!-- BMI IBU -->
        ${
            bmi
                ? `
        <div class="card">
            <div class="card-title">BMI Pra-Hamil <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--gray-400);font-size:0.7rem;">· ${stdLabel}</span></div>
            <div style="display:flex;align-items:center;gap:14px;">
                <div>
                    <div class="stat-val" style="font-size:2rem;">${bmi}</div>
                    <div class="stat-sub">kg/m²</div>
                </div>
                <div>
                    <div class="bb-status ${bmiKatAktif.cls}" style="margin-top:0;">${bmiKatAktif.icon} ${bmiKatAktif.label}</div>
                    <div style="margin-top:6px;font-size:0.72rem;color:var(--gray-500);">
                        ${
                            bmiStandar === "who"
                                ? "Kurus &lt;18.5 · Normal 18.5–24.9 · Lebih 25–29.9 · Obesitas ≥30"
                                : "Kurus &lt;18.5 · Normal 18.5–22.9 · Lebih 23–27.4 · Obesitas ≥27.5"
                        }
                    </div>
                </div>
            </div>
        </div>`
                : ""
        }

        <!-- DATA JANIN -->
        <div class="card">
            <div class="card-title">Perkembangan Janin (~minggu ${weeks})</div>
            <div class="janin-grid">
                <div class="janin-item">
                    <div class="janin-num">${janin.gr < 1000 ? janin.gr + " gr" : (janin.gr / 1000).toFixed(1) + " kg"}</div>
                    <div class="janin-lbl">Berat rata-rata</div>
                </div>
                <div class="janin-item">
                    <div class="janin-num">${janin.cm} cm</div>
                    <div class="janin-lbl">Panjang janin</div>
                </div>
                <div class="janin-item">
                    <div class="janin-num">${40 - weeks > 0 ? 40 - weeks : 0} minggu</div>
                    <div class="janin-lbl">Sisa ke HPL</div>
                </div>
            </div>
        </div>

        <!-- KENAIKAN BB -->
        ${
            deltaBB !== null
                ? `
            <div class="card">
                <div class="card-title">Kenaikan Berat Badan Ibu <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--gray-400);font-size:0.7rem;">· ${stdLabel}</span></div>
                <div class="bb-bar-wrap">
                    <div class="bb-bar-labels">
                        <span>0 kg</span>
                        <span style="font-weight:600;color:var(--gray-700);">+${deltaBB} kg</span>
                        <span>${bbMax} kg</span>
                    </div>
                    <div class="bb-bar-track">
                        <div class="bb-bar-fill" style="width:${barPct}%;background:${barColor};"></div>
                    </div>
                    ${bbSt ? `<div class="bb-status ${bbSt.cls}">${bbSt.icon} ${bbSt.label}</div>` : ""}
                    ${
                        isBidan
                            ? `
                <div style="margin-top:10px;font-size:0.78rem;color:var(--gray-500);">
                    BB awal: ${s.bbAwal} kg &nbsp;·&nbsp; BB sekarang: ${s.bbNow} kg
                </div>`
                            : ""
                    }
                </div>
            </div>`
                : ""
        }

        <!-- MILESTONE -->
        <div class="card">
            <div class="card-title">Milestone Kehamilan</div>
            <div class="milestone-list">
                ${shown
                    .map((m) => {
                        const mDate = new Date(hpht);
                        mDate.setDate(mDate.getDate() + (m.week - 1) * 7);
                        const isPast = m.week < weeks;
                        const isNow = m.week === weeks;
                        const dotCls = isPast
                            ? "past"
                            : isNow
                              ? "now"
                              : "future";
                        return `
                        <div class="ms-row">
                            <div class="ms-dot ${dotCls}"></div>
                            <span class="ms-week">Minggu ${m.week}</span>
                            <span class="ms-text" style="color:${isPast ? "var(--gray-300)" : isNow ? "var(--gray-900)" : "var(--gray-700)"}">${m.text}</span>
                            <span class="ms-date">${formatTglShort(mDate)}</span>
                        </div>`;
                    })
                    .join("")}
            </div>
        </div>

       
       

        ${
            isBidan
                ? `
            <!-- INFO KLINIS (bidan only) -->
            <div class="card pdf-section">
                <div class="card-title">Informasi Klinis</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.82rem;">
                    <div><span style="color:var(--gray-500);">Usia gestasi:</span><br><strong>${weeks}+${days} minggu</strong></div>
                    <div><span style="color:var(--gray-500);">EDD (Naegele):</span><br><strong>${formatTgl(edd)}</strong></div>
                    <div><span style="color:var(--gray-500);">Taksiran BB janin:</span><br><strong>±${janin.gr} gram</strong></div>
                    <div><span style="color:var(--gray-500);">Panjang janin:</span><br><strong>±${janin.cm} cm</strong></div>
                    ${bmi ? `<div><span style="color:var(--gray-500);">BMI pra-hamil (${bmiStandar === "who" ? "WHO" : "INA"}):</span><br><strong>${bmi} – ${bmiKatAktif.label}</strong></div>` : ""}
                    <div><span style="color:var(--gray-500);">Standar BMI:</span><br><strong>${stdLabel}</strong></div>
                </div>
            </div>
            
            <div class="card  mb-5">
                <div class="card-title">Jadwal Kontrol Bidan</div>
                <div class="milestone-list">
                    ${jadwalShown
                        .map((j) => {
                            const isPast = j.week < weeks;
                            const isNow = j.week === weeks;

                            return `
                        <div class="ms-row">
                            <div class="ms-dot ${isPast ? "past" : isNow ? "now" : "future"}"></div>
                            <span class="ms-week">Minggu ${j.week}</span>
                            <span class="ms-text">${j.label}</span>
                            <span class="ms-date">${formatTglShort(j.date)}</span>
                        </div>`;
                        })
                        .join("")}
                </div>
            </div>
            
            `
                : ""
        }


        


        <div class="d-flex no-print justify-content-center align-items-center gap-3 mt-4 flex-wrap">
            <div class="text-center">
                <a href="/tools/kebutuhan-kalori" class="btn btn-primary no-print">
                    <i class="bx bx-calculator me-1"></i>
                    Hitung Kalori Ibu Hamil
                </a>
            </div>

            <button onclick="exportPDF()" class="btn btn-danger no-print">
                <i class='bx bx-download me-1'></i>
                Export PDF
            </button>

        </div>
    `;
}

// ─── CANVAS RODA ────────────────────────────────────────────────────────────

function drawRoda(currentWeek) {
    const canvas = document.getElementById("roda");
    const container = canvas.parentElement;

    const dpr = window.devicePixelRatio || 1;
    const available = container.offsetWidth || window.innerWidth;
    const size = Math.min(available, 400);

    // set ukuran fisik canvas (piksel asli layar)
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // set ukuran tampilan CSS
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr); // scale semua drawing sesuai DPR

    const cx = size / 2;
    const cy = size / 2;
    const scale = size / 400;

    // Radii
    const R = {
        cal: 190 * scale, // kalender luar
        calIn: 162 * scale,
        wkOut: 158 * scale, // ring minggu
        wkIn: 136 * scale,
        blOut: 132 * scale, // ring biru (data janin)
        blIn: 88 * scale,
        core: 84 * scale, // lingkaran tengah
    };

    const TOTAL = 40;
    const startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, size, size);

    // --- helper ---
    function seg(r1, r2, a1, a2, fill, stroke) {
        ctx.beginPath();
        ctx.arc(cx, cy, r1, a1, a2);
        ctx.arc(cx, cy, r2, a2, a1, true);
        ctx.closePath();
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
        }
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 0.5 * scale;
            ctx.stroke();
        }
    }

    function arcText(text, r, angle, fontSize, color) {
        ctx.save();
        ctx.translate(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.rotate(angle + Math.PI / 2);
        ctx.font = `${fontSize * scale}px 'DM Sans', sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }

    // --- RING KALENDER (paling luar) ---
    // Generate bulan dari HPHT
    const hphtVal = document.getElementById("inputHPHT").value;
    const hpht = hphtVal ? new Date(hphtVal) : null;

    const MONTHS_ID = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ];

    // Hitung jumlah hari per bulan selama 10 bulan dari HPHT
    let calMonths = [];
    if (hpht) {
        for (let i = 0; i < 10; i++) {
            const d = new Date(hpht.getFullYear(), hpht.getMonth() + i, 1);
            const daysInMonth = new Date(
                d.getFullYear(),
                d.getMonth() + 1,
                0,
            ).getDate();
            const yr = d.getFullYear();
            const baseYr = hpht.getFullYear();
            calMonths.push({
                name:
                    MONTHS_ID[d.getMonth()] +
                    (yr !== baseYr ? " '" + String(yr).slice(2) : ""),
                days: daysInMonth,
                month: d.getMonth(),
                year: yr,
            });
        }
    } else {
        // default tampilkan 10 bulan dari sekarang
        const now = new Date();
        for (let i = 0; i < 10; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
            calMonths.push({
                name: MONTHS_ID[d.getMonth()],
                days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
                month: d.getMonth(),
                year: d.getFullYear(),
            });
        }
    }

    const totalDays = calMonths.reduce((s, m) => s + m.days, 0);
    const anglePerDay = (2 * Math.PI) / totalDays;

    // Draw kalender segments
    let dayAngle = startAngle;
    calMonths.forEach((mon, mi) => {
        const monStartAngle = dayAngle;
        const monEndAngle = dayAngle + anglePerDay * mon.days;

        // bulan background alt
        const bgCal = mi % 2 === 0 ? "#f0ede8" : "#e8e4dd";
        seg(R.cal, R.calIn, monStartAngle, monEndAngle, bgCal, "#ccc8c0");

        // nama bulan
        const midA = monStartAngle + (monEndAngle - monStartAngle) / 2;
        arcText(mon.name, (R.cal + R.calIn) / 2, midA, 8.5, "#5a5550");

        // tanggal per hari
        for (let d = 1; d <= mon.days; d++) {
            const a = dayAngle + anglePerDay * (d - 0.5);
            if (d % 5 === 0 || d === 1) {
                arcText(d, R.calIn - 7 * scale, a, 7, "#888580");
            }
            // tick
            const aT = dayAngle + anglePerDay * d;
            ctx.beginPath();
            ctx.moveTo(
                cx + R.calIn * Math.cos(aT),
                cy + R.calIn * Math.sin(aT),
            );
            const tickLen = (d % 5 === 0 ? 5 : 3) * scale;
            ctx.lineTo(
                cx + (R.calIn - tickLen) * Math.cos(aT),
                cy + (R.calIn - tickLen) * Math.sin(aT),
            );
            ctx.strokeStyle = "#aaa8a0";
            ctx.lineWidth = 0.5 * scale;
            ctx.stroke();

            dayAngle += anglePerDay;
        }
    });

    // --- RING MINGGU ---
    const anglePerWeek = (2 * Math.PI) / TOTAL;
    for (let w = 1; w <= TOTAL; w++) {
        const a1 = startAngle + (w - 1) * anglePerWeek;
        const a2 = startAngle + w * anglePerWeek - 0.008;

        let fill;
        if (w <= currentWeek) {
            if (w <= 13) fill = "#b5d4f0";
            else if (w <= 26) fill = "#9fd9c8";
            else fill = "#f5c0cb";
        } else {
            fill = "#edeae4";
        }

        seg(R.wkOut, R.wkIn, a1, a2, fill, "#d8d4cc");

        if (w === currentWeek) {
            ctx.beginPath();
            ctx.arc(cx, cy, R.wkOut, a1, a2);
            ctx.arc(cx, cy, R.wkIn, a2, a1, true);
            ctx.closePath();
            ctx.strokeStyle = "#e8607a";
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
        }

        const midA = startAngle + (w - 0.5) * anglePerWeek;
        arcText(
            w,
            (R.wkOut + R.wkIn) / 2,
            midA,
            w % 4 === 0 || w === 1 || w === 40 ? 9 : 7.5,
            w === currentWeek ? "#e8607a" : "#5a5550",
        );
    }

    // --- RING DATA JANIN (biru) ---
    for (let w = 1; w <= TOTAL; w++) {
        const a1 = startAngle + (w - 1) * anglePerWeek;
        const a2 = startAngle + w * anglePerWeek - 0.008;

        const isFilled = w <= currentWeek;
        const fillBl = isFilled
            ? w <= 13
                ? "#daeeff"
                : w <= 26
                  ? "#d0f2e8"
                  : "#fde8ed"
            : "#f5f3ef";

        seg(R.blOut, R.blIn, a1, a2, fillBl, "#ddd9d0");

        // tampilkan angka per 4 minggu
        if (w % 4 === 0) {
            const midA = startAngle + (w - 0.5) * anglePerWeek;
            const janin = DATA_JANIN[w] || null;
            if (janin) {
                // gr
                arcText(
                    janin.gr < 1000
                        ? janin.gr
                        : (janin.gr / 1000).toFixed(1) + "k",
                    R.blOut - 10 * scale,
                    midA,
                    6.5,
                    "#4a90c4",
                );
                // cm
                arcText(janin.cm, R.blIn + 10 * scale, midA, 6.5, "#3aab8c");
            }
        }
    }

    // --- CORE ---
    ctx.beginPath();
    ctx.arc(cx, cy, R.core, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#e0dcd4";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // Center text
    ctx.font = `${500}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (currentWeek > 0) {
        ctx.font = `600 ${28 * scale}px 'DM Serif Display', serif`;
        ctx.fillStyle = "#e8607a";
        ctx.fillText(currentWeek, cx, cy - 8 * scale);

        ctx.font = `${10 * scale}px 'DM Sans', sans-serif`;
        ctx.fillStyle = "#888580";
        ctx.fillText("minggu", cx, cy + 12 * scale);
    } else {
        ctx.font = `${10 * scale}px 'DM Sans', sans-serif`;
        ctx.fillStyle = "#c4c1b8";
        ctx.fillText("masukkan HPHT", cx, cy);
    }

    // --- POINTER (jarum) ---
    if (currentWeek > 0) {
        const needleAngle = startAngle + (currentWeek - 0.5) * anglePerWeek;
        const nx = cx + R.wkIn * 0.7 * Math.cos(needleAngle);
        const ny = cy + R.wkIn * 0.7 * Math.sin(needleAngle);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = "#1e1c1a";
        ctx.lineWidth = 2 * scale;
        ctx.lineCap = "round";
        ctx.stroke();

        // pivot dot
        ctx.beginPath();
        ctx.arc(cx, cy, 5 * scale, 0, 2 * Math.PI);
        ctx.fillStyle = "#1e1c1a";
        ctx.fill();
    }

    // Legend label
    ctx.font = `${8 * scale}px 'DM Sans', sans-serif`;
    ctx.fillStyle = "#4a90c4";
    ctx.textAlign = "left";
    ctx.fillText("gr ↑", cx + R.blOut - 30 * scale, cy - R.blOut + 18 * scale);
    ctx.fillStyle = "#3aab8c";
    ctx.fillText("cm ↓", cx + R.blOut - 30 * scale, cy - R.blOut + 28 * scale);
}

// Draw roda kosong saat load
drawRoda(0);
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        drawRoda(currentWeekGlobal ?? 0);
    }, 150);
});

window.addEventListener("load", () => {
    const saved = localStorage.getItem("pregnancyData");
    if (!saved) {
        renderEmptyPanel();
        return;
    }

    const data = JSON.parse(saved);

    // isi ulang form
    document.getElementById("inputHPHT").value = data.hpht || "";
    document.getElementById("inputTB").value = data.tb || "";
    document.getElementById("inputBBawal").value = data.bbAwal || "";
    document.getElementById("inputBBnow").value = data.bbNow || "";

    bmiStandar = data.bmiStandar || "who";
    mode = data.mode || "bumil";

    // langsung hitung ulang biar UI muncul
    if (data.hpht) {
        hitung();
    }
});

function generateJadwalBidan(hpht) {
    const jadwal = [];

    for (let w = 1; w <= 40; w++) {
        let perluKontrol = false;
        let label = "";

        // === RULE KONTROL ===
        if (w <= 28 && w % 4 === 0) {
            perluKontrol = true;
            label = "Kontrol rutin";
        } else if (w > 28 && w <= 36 && w % 2 === 0) {
            perluKontrol = true;
            label = "Kontrol intensif";
        } else if (w > 36) {
            perluKontrol = true;
            label = "Kontrol persalinan";
        }

        if (!perluKontrol) continue;

        // === OVERRIDE KLINIS (PRIORITAS) ===
        if (w === 4) label = "Kunjungan awal (konfirmasi kehamilan)";
        if (w === 12) label = "Akhir trimester 1 (cek perkembangan)";
        if (w === 20) label = "USG anatomi (organ janin)";
        if (w === 28) label = "Skrining diabetes gestasional";
        if (w === 32) label = "Pantau posisi & pertumbuhan janin";
        if (w === 36) label = "Persiapan persalinan";
        if (w === 37) label = "Aterm (siap lahir)";
        if (w === 38) label = "Pantau kontraksi & posisi janin";
        if (w === 39) label = "Menjelang persalinan";
        if (w === 40) label = "HPL (Hari Perkiraan Lahir)";

        // === HITUNG TANGGAL ===
        const tgl = new Date(hpht);
        tgl.setDate(tgl.getDate() + w * 7);

        jadwal.push({
            week: w,
            label,
            date: tgl,
        });
    }

    return jadwal;
}

function clearPregnancyData() {
    Swal.fire({
        title: "Yakin hapus data?",
        text: "Data kehamilan akan dihapus permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#696cff",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            // 1. Hapus storage
            localStorage.removeItem("pregnancyData");

            // 2. Reset state
            state = null;

            // 3. Kosongkan input
            document.getElementById("inputHPHT").value = "";
            document.getElementById("inputTB").value = "";
            document.getElementById("inputBBawal").value = "";
            document.getElementById("inputBBnow").value = "";

            // 4. Reset UI
            renderEmptyPanel();
            drawRoda(0);

            // 5. Notifikasi
            Swal.fire({
                icon: "success",
                title: "Berhasil dihapus",
                text: "Data kehamilan sudah dibersihkan",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    });
}

function exportPDF() {
    if (!state) {
        alert("Hitung dulu sebelum export PDF");
        return;
    }

    const element = document.getElementById("exportArea");
    const noPrintEls = document.querySelectorAll(".no-print");

    noPrintEls.forEach((el) => (el.style.display = "none"));

    setTimeout(() => {
        const opt = {
            margin: 10,
            filename: `HPL-${mode}-${bmiStandar}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                scrollY: 0,
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        };

        html2pdf()
            .set(opt)
            .from(element)
            .outputPdf("bloburl") // ← bloburl bukan langsung save
            .then((url) => {
                // balikin tombol
                noPrintEls.forEach((el) => (el.style.display = ""));

                // buka preview di tab baru
                window.open(url, "_blank");
            });
    }, 500);
}

function renderEmptyPanel() {
    const panel = document.getElementById("panel");
    panel.innerHTML = `
        <div class="panel-empty">
            <span>🌸</span>
            Masukkan HPHT untuk melihat hasil perhitungan
        </div>
    `;
}

function getJaninImage(week) {
    if (week < 1) week = 1;
    if (week > 40) week = 40;

    return `/assets/img/Janin/week-${week}.png`;
}

// ─── EXPOSE KE GLOBAL (diperlukan karena Vite ES Module) ────────────────────
Object.assign(window, {
    hitung,
    setMode,
    setStandar,
    clearPregnancyData,
    exportPDF,
});
