// resources/js/react/Piring/ResultScreen.jsx

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const ZONE_CONFIG = {
    sayur:   { label: "Sayur & Buah", emoji: "🥦", color: "#4caf50", labelClass: "bg-label-success", badgeClass: "bg-success" },
    karbo:   { label: "Karbohidrat",  emoji: "🍚", color: "#ff9800", labelClass: "bg-label-warning", badgeClass: "bg-warning" },
    protein: { label: "Protein",      emoji: "🍗", color: "#e91e8c", labelClass: "bg-label-danger",  badgeClass: "bg-danger"  },
};

// ── Stars ─────────────────────────────────────────────────────────
function Stars({ count }) {
    return (
        <div className="d-flex gap-1 justify-content-center">
            {[1, 2, 3].map((i) => (
                <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={i <= count ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 260, damping: 16 }}
                    style={{ fontSize: "2.4rem", filter: i <= count ? "none" : "grayscale(1) opacity(.3)" }}
                >
                    ⭐
                </motion.span>
            ))}
        </div>
    );
}

// ── Score Ring ────────────────────────────────────────────────────
function ScoreRing({ skor }) {
    const r = 44;
    const circ = 2 * Math.PI * r;
    const dash = (skor / 100) * circ;
    const color = skor >= 80 ? "#4caf50" : skor >= 55 ? "#ff9800" : "#e91e8c";

    return (
        <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto" }}>
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r={r} fill="none" stroke="var(--bs-border-color)" strokeWidth="10" />
                <motion.circle
                    cx="60" cy="60" r={r} fill="none"
                    stroke={color} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ - dash }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ fontSize: "1.8rem", fontWeight: 800, color, lineHeight: 1 }}
                >
                    {skor}
                </motion.span>
                <span className="text-muted" style={{ fontSize: ".65rem", fontWeight: 600 }}>/ 100</span>
            </div>
        </div>
    );
}

// ── Score Breakdown ───────────────────────────────────────────────
function ScoreBreakdown({ breakdown }) {
    if (!breakdown) return null;
    const { skorAkurasi, skorProporsi, benar, salah, total } = breakdown;

    return (
        <div className="mt-3 pt-2" style={{ borderTop: "1px solid var(--bs-border-color)" }}>
            <p className="text-muted mb-2 text-center" style={{ fontSize: ".72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>
                Rincian Skor
            </p>
            <div className="d-flex align-items-center gap-2 mb-2">
                <span style={{ fontSize: ".78rem", minWidth: 130, color: "var(--bs-body-color)" }}>
                    🎯 Akurasi penempatan
                </span>
                <div className="flex-grow-1 card border-0" style={{ height: 8, borderRadius: 4, overflow: "hidden", background: "var(--bs-tertiary-bg)" }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(skorAkurasi / 70) * 100}%` }}
                        transition={{ duration: 0.9, delay: 0.5 }}
                        style={{ height: "100%", background: "#4caf50", borderRadius: 4 }}
                    />
                </div>
                <span style={{ fontSize: ".78rem", fontWeight: 700, minWidth: 40, textAlign: "right" }}>
                    {skorAkurasi}<span className="text-muted">/70</span>
                </span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
                <span style={{ fontSize: ".78rem", minWidth: 130, color: "var(--bs-body-color)" }}>
                    ⚖️ Proporsi piring
                </span>
                <div className="flex-grow-1 card border-0" style={{ height: 8, borderRadius: 4, overflow: "hidden", background: "var(--bs-tertiary-bg)" }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(skorProporsi / 30) * 100}%` }}
                        transition={{ duration: 0.9, delay: 0.7 }}
                        style={{ height: "100%", background: "#1976d2", borderRadius: 4 }}
                    />
                </div>
                <span style={{ fontSize: ".78rem", fontWeight: 700, minWidth: 40, textAlign: "right" }}>
                    {skorProporsi}<span className="text-muted">/30</span>
                </span>
            </div>
            <p className="text-muted mb-0 text-center" style={{ fontSize: ".72rem" }}>
                {benar} benar · {salah} salah dari {total} item yang disusun
            </p>
        </div>
    );
}

// ── Zone Summary ──────────────────────────────────────────────────
function ZoneSummary({ dropped }) {
    const total = Object.values(dropped).flat().length;

    return (
        <div className="d-flex flex-column gap-2">
            {["sayur", "karbo", "protein"].map((zid) => {
                const cfg = ZONE_CONFIG[zid];
                const items = dropped[zid] ?? [];
                const benar = items.filter((f) => f.zona === zid).length;
                const salah = items.length - benar;
                const pct = total > 0 ? Math.round((items.length / total) * 100) : 0;
                const target = zid === "sayur" ? "≥ 50%" : "20–35%";

                return (
                    <div key={zid} className={`rounded-3 p-3 ${cfg.labelClass}`}>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span>{cfg.emoji}</span>
                            <span style={{ fontWeight: 700, color: cfg.color, fontSize: ".85rem" }}>{cfg.label}</span>
                            <span className="text-muted ms-1" style={{ fontSize: ".72rem" }}>target {target}</span>
                            <span className={`ms-auto badge rounded-pill ${cfg.badgeClass}`} style={{ fontSize: ".7rem" }}>
                                {pct}%
                            </span>
                        </div>
                        <div className="card border-0" style={{ height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ height: "100%", background: cfg.color, borderRadius: 3 }}
                            />
                        </div>
                        {items.length === 0 ? (
                            <p className="text-muted mb-0" style={{ fontSize: ".74rem", fontStyle: "italic" }}>Tidak ada item</p>
                        ) : (
                            <div className="d-flex flex-wrap gap-1">
                                {items.map((food) => (
                                    <span
                                        key={food.id}
                                        className="badge rounded-pill px-2 py-1"
                                        style={{
                                            background: food.zona === zid ? cfg.color : "#e74c3c",
                                            color: "#fff", fontSize: ".7rem",
                                        }}
                                        title={food.zona !== zid ? `Seharusnya di zona ${food.zona}` : "Benar ✓"}
                                    >
                                        {food.zona !== zid && "⚠ "}{food.nama}
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className="text-muted mb-0" style={{ fontSize: ".7rem", marginTop: 6 }}>
                            {benar} benar
                            {salah > 0 && <span style={{ color: "#e74c3c" }}> · {salah} perlu diperbaiki</span>}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

// ── ResultScreen ──────────────────────────────────────────────────
export default function ResultScreen({ hasil, dropped, mode, onRestart }) {
    if (!hasil) return null;

    const { skor, bintang, pesan, breakdown } = hasil;
    const modeLabel = mode === "bumil" ? "🤰 Ibu Hamil" : "👶 MPASI Bayi";
    const modeBadge = mode === "bumil" ? "bg-label-danger text-danger" : "bg-label-warning text-warning";

    const headline =
        bintang === 3 ? "Luar Biasa! 🎉" :
        bintang === 2 ? "Bagus sekali! 👍" :
        "Ayo coba lagi! 💪";
    const headlineColor =
        skor >= 80 ? "#4caf50" :
        skor >= 55 ? "#ff9800" :
        "#e91e8c";

    useEffect(() => {
        if (bintang === 3) {
            // Bintang 3 — confetti meriah terus 3 detik
            const end = Date.now() + 3000;
            const interval = setInterval(() => {
                if (Date.now() > end) return clearInterval(interval);
                confetti({ particleCount: 25, angle: 60,  spread: 55, origin: { x: 0,   y: 0.7 } });
                confetti({ particleCount: 25, angle: 120, spread: 55, origin: { x: 1,   y: 0.7 } });
            }, 220);
            return () => clearInterval(interval);

        } else if (bintang === 2) {
            // Bintang 2 — tembak sekali dari tengah + kiri kanan
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.65 } });
            setTimeout(() => {
                confetti({ particleCount: 50, angle: 60,  spread: 50, origin: { x: 0 } });
                confetti({ particleCount: 50, angle: 120, spread: 50, origin: { x: 1 } });
            }, 350);

        } else if (bintang === 1) {
            // Bintang 1 — tembak kecil sekali
            confetti({ particleCount: 50, spread: 55, origin: { y: 0.7 } });
        }
        // Bintang 0 — tidak ada confetti
    }, []);

    return (
        <div className="py-4 px-3" style={{ maxWidth: 520, margin: "0 auto" }}>
            {/* Score header */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card border-0 shadow rounded-4 p-4 mb-3 text-center"
            >
                <span className={`badge rounded-pill px-3 py-2 mb-3 align-self-center ${modeBadge}`} style={{ fontWeight: 700, fontSize: ".8rem" }}>
                    {modeLabel}
                </span>

                <ScoreRing skor={skor} />

                <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="fw-bold mt-3 mb-2"
                    style={{ color: headlineColor }}
                >
                    {headline}
                </motion.h4>

                <Stars count={bintang} />
                <ScoreBreakdown breakdown={breakdown} />
            </motion.div>

            {/* Saran gizi */}
            {pesan.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="card border-0 shadow-sm rounded-4 p-3 mb-3 bg-label-warning"
                >
                    <div className="d-flex align-items-center gap-2 mb-2 text-warning fw-bold" style={{ fontSize: ".85rem" }}>
                        <span>💡</span> Saran Gizi
                    </div>
                    <ul className="mb-0 ps-3 text-body" style={{ fontSize: ".82rem" }}>
                        {pesan.map((p, i) => (
                            <li key={i} style={{ marginBottom: 4, lineHeight: 1.5 }}>{p}</li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Zone breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="card border-0 shadow-sm rounded-4 p-3 mb-4"
            >
                <div className="d-flex align-items-center gap-2 mb-3 text-heading fw-bold" style={{ fontSize: ".88rem" }}>
                    <span>🍽️</span> Rincian Piringmu
                </div>
                <ZoneSummary dropped={dropped} />
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="d-flex flex-column gap-2"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    className="btn btn-success btn-lg fw-bold rounded-3 shadow-sm"
                    onClick={onRestart}
                >
                    🔄 Main Lagi
                </motion.button>
                <p className="text-muted text-center mb-0" style={{ fontSize: ".75rem", marginTop: 4 }}>
                    Mode dan makanan akan diacak ulang
                </p>
            </motion.div>
        </div>
    );
}
