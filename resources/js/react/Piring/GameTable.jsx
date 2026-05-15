// resources/js/react/Piring/GameTable.jsx

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import FoodItem from "./FoodItem";

const ZONE_CONFIG = {
    sayur:   { label: "Sayur & Buah", emoji: "🥦", color: "#4caf50", labelClass: "bg-label-success", badgeClass: "bg-success" },
    karbo:   { label: "Karbohidrat",  emoji: "🍚", color: "#ff9800", labelClass: "bg-label-warning", badgeClass: "bg-warning" },
    protein: { label: "Protein",      emoji: "🍗", color: "#e91e8c", labelClass: "bg-label-danger",  badgeClass: "bg-danger"  },
};

// ── Drop Zone ─────────────────────────────────────────────────────
function DropZone({ id, items, onRemove }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const cfg = ZONE_CONFIG[id];

    return (
        <div
            ref={setNodeRef}
            className={`rounded-3 p-2 ${isOver ? cfg.labelClass : ""}`}
            style={{
                flex: 1,
                minHeight: 90,
                border: `2px dashed ${isOver ? cfg.color : "var(--bs-border-color)"}`,
                transition: "all .2s",
            }}
        >
            <div className="d-flex align-items-center gap-1 mb-1">
                <span style={{ fontSize: ".9rem" }}>{cfg.emoji}</span>
                <span style={{ fontWeight: 700, color: cfg.color, fontSize: ".78rem" }}>{cfg.label}</span>
                <span className={`badge ms-auto ${cfg.badgeClass}`} style={{ fontSize: ".65rem" }}>
                    {items.length}
                </span>
            </div>

            <div className="d-flex flex-wrap gap-2">
                <AnimatePresence>
                    {items.map((food) => (
                        <motion.div
                            key={food.id}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.2 }}
                            style={{ position: "relative" }}
                        >
                            <FoodItem food={food} small />
                            <button
                                onClick={() => onRemove(food.id, id)}
                                style={{
                                    position: "absolute",
                                    top: -4,
                                    right: -4,
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    background: "#e74c3c",
                                    border: "none",
                                    color: "#fff",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0,
                                    zIndex: 10,
                                    boxShadow: "0 1px 3px rgba(0,0,0,.25)",
                                }}
                            >
                                ×
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <p className="text-muted" style={{ fontSize: ".72rem", margin: "4px auto", fontStyle: "italic" }}>
                        Letakkan di sini
                    </p>
                )}
            </div>
        </div>
    );
}

// ── Tray ──────────────────────────────────────────────────────────
function Tray({ foods, droppedIds = new Set() }) {
    const { setNodeRef, isOver } = useDroppable({ id: "tray" });
    const remaining = foods.filter((f) => !droppedIds.has(f.id));

    return (
        <div
            ref={setNodeRef}
            className={`card border-0 shadow-sm rounded-4 h-100 ${isOver ? "bg-label-success" : ""}`}
            style={{
                border: isOver ? "2px solid #4caf50" : "2px solid var(--bs-border-color)",
                transition: "all .2s",
            }}
        >
            <div className="card-body p-3">
                <div className="d-flex align-items-center gap-2 mb-3 pb-2" style={{ borderBottom: "1px solid var(--bs-border-color)" }}>
                    <span style={{ fontSize: "1.2rem" }}>🧺</span>
                    <span className="text-heading fw-bold" style={{ fontSize: ".9rem" }}>Pilihan Makanan</span>
                    <span className="badge bg-label-success text-success ms-auto rounded-pill" style={{ fontSize: ".72rem" }}>
                        {remaining.length} tersisa
                    </span>
                </div>

                <div className="d-flex flex-wrap gap-3 justify-content-center" style={{ minHeight: 80 }}>
                    <AnimatePresence>
                        {remaining.map((food) => (
                            <motion.div
                                key={food.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FoodItem food={food} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {remaining.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="d-flex flex-column align-items-center justify-content-center w-100 py-3"
                        >
                            <span style={{ fontSize: "2rem" }}>🎉</span>
                            <p className="text-success fw-bold mb-0 mt-1" style={{ fontSize: ".82rem" }}>
                                Semua makanan sudah tersusun!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Plate ─────────────────────────────────────────────────────────
function Plate({ dropped, onRemove }) {
    const totalItem = Object.values(dropped).flat().length;

    return (
        <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-3">
                <div className="d-flex align-items-center gap-2 mb-3 pb-2" style={{ borderBottom: "1px solid var(--bs-border-color)" }}>
                    <span style={{ fontSize: "1.2rem" }}>🍽️</span>
                    <span className="text-heading fw-bold" style={{ fontSize: ".9rem" }}>Susun Piringmu</span>
                    <span className="badge bg-label-primary text-primary ms-auto rounded-pill" style={{ fontSize: ".72rem" }}>
                        {totalItem} item
                    </span>
                </div>

                <div className="text-center mb-3">
                    <div
                        className="card border shadow-sm"
                        style={{
                            width: 110, height: 110, borderRadius: "50%",
                            margin: "0 auto", display: "flex",
                            alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <svg width="90" height="90" viewBox="0 0 90 90">
                            <path d="M45,45 L45,5 A40,40 0 0,1 85,45 Z" fill="var(--bs-tertiary-bg)" />
                            <path d="M45,45 L85,45 A40,40 0 0,1 45,85 Z" fill="var(--bs-tertiary-bg)" opacity="0.7" />
                            <path d="M45,45 L45,85 A40,40 0 0,1 5,45 Z" fill="var(--bs-tertiary-bg)" opacity="0.5" />
                            <path d="M45,45 L5,45 A40,40 0 0,1 45,5 Z" fill="var(--bs-tertiary-bg)" />
                            <circle cx="45" cy="45" r="40" fill="none" stroke="var(--bs-border-color)" strokeWidth="1.5" />
                            <circle cx="45" cy="45" r="4" fill="var(--bs-border-color)" />
                        </svg>
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: ".7rem", marginTop: 4 }}>
                        ½ sayur · ¼ karbo · ¼ protein
                    </p>
                </div>

                <div className="d-flex flex-column gap-2">
                    {["sayur", "karbo", "protein"].map((z) => (
                        <DropZone key={z} id={z} items={dropped[z] ?? []} onRemove={onRemove} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── GameTable ─────────────────────────────────────────────────────
export default function GameTable({ mode, foods, dropped, droppedIds, onRemove, onSelesai }) {
    const totalDropped = Object.values(dropped).flat().length;
    const modeLabel = mode === "bumil" ? "🤰 Ibu Hamil" : "👶 MPASI Bayi";
    const modeBadge = mode === "bumil" ? "bg-label-danger text-danger" : "bg-label-warning text-warning";

    // Pastikan droppedIds selalu Set meski prop tidak dikirim
    const safeDroppedIds = droppedIds instanceof Set ? droppedIds : new Set();

    return (
        <div className="py-3 px-2" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                <span className={`badge rounded-pill px-3 py-2 ${modeBadge}`} style={{ fontWeight: 700, fontSize: ".82rem" }}>
                    {modeLabel}
                </span>
                <span className="text-muted ms-auto" style={{ fontSize: ".8rem" }}>
                    Seret makanan ke zona piring yang tepat
                </span>
            </div>

            {/* Mobile: Piring dulu, Tray di bawah | Desktop: Tray kiri, Piring kanan */}
            <div className="row g-3">
                <div className="col-12 col-md-7 order-1 order-md-2">
                    <Plate dropped={dropped} onRemove={onRemove} />
                </div>
                <div className="col-12 col-md-5 order-2 order-md-1">
                    <Tray foods={foods} droppedIds={safeDroppedIds} />
                </div>
            </div>

            <p className="text-muted text-center mt-2 mb-0 d-md-none" style={{ fontSize: ".72rem" }}>
                💡 Tap × untuk hapus item dari zona
            </p>

            <div className="text-center mt-4">
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.03 }}
                    className="btn btn-success btn-lg fw-bold rounded-3 px-5 shadow"
                    onClick={onSelesai}
                    disabled={totalDropped === 0}
                    style={{ opacity: totalDropped === 0 ? 0.5 : 1, transition: "opacity .2s" }}
                >
                    ✅ Selesai — Lihat Skorku!
                </motion.button>
                {totalDropped === 0 && (
                    <p className="text-muted mt-2 mb-0" style={{ fontSize: ".78rem" }}>
                        Susun minimal 1 makanan untuk melanjutkan
                    </p>
                )}
            </div>
        </div>
    );
}
