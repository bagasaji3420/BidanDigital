import { motion, AnimatePresence } from "framer-motion";
import { WAJIB_ITEMS } from "./data/items";

const BASE = "/assets/img/Game/Tas Siaga";

export default function BagPanel({ collected, score, wrong, isDesktop }) {
    const wajibCollected = collected.filter(id => WAJIB_ITEMS.find(i => i.id === id));
    const total = WAJIB_ITEMS.length;

    return (
        <div style={{
            background: "var(--bs-body-bg)",
            borderTop: isDesktop ? "none" : "1px solid var(--bs-border-color)",
            borderLeft: isDesktop ? "1px solid var(--bs-border-color)" : "none",
            width: isDesktop ? 200 : "100%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
            {/* Header */}
            <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid var(--bs-border-color)" }}>
                <p className="fw-bold text-heading mb-0" style={{ fontSize: ".82rem" }}>🎒 Isi Tas Kamu</p>
            </div>

            {/* Tas visual + progress */}
            <div style={{
                padding: "12px 14px 10px",
                background: "var(--bs-tertiary-bg)",
                borderBottom: "1px solid var(--bs-border-color)",
                display: "flex", flexDirection: "column", alignItems: "center",
            }}>
                <img
                    src={`${BASE}/tas-utama.png`}
                    alt="Tas persalinan"
                    style={{ width: "100%", maxHeight: isDesktop ? 120 : 90, objectFit: "contain" }}
                />
                <div style={{ width: "100%", marginTop: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: ".7rem", color: "var(--bs-secondary-color)", fontWeight: 500 }}>
                            {wajibCollected.length} / {total}
                        </span>
                        <span style={{ fontSize: ".7rem", fontWeight: 700, color: "#696cff" }}>
                            {score} pts
                        </span>
                    </div>
                    <div style={{ height: 5, background: "var(--bs-border-color)", borderRadius: 99, overflow: "hidden" }}>
                        <motion.div
                            style={{ height: "100%", background: "linear-gradient(90deg, #696cff, #a78bfa)", borderRadius: 99 }}
                            animate={{ width: `${(wajibCollected.length / total) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 18 }}
                        />
                    </div>
                </div>
            </div>

            {/* Grid slot item yang sudah dikumpulkan */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    <AnimatePresence>
                        {wajibCollected.map(id => {
                            const item = WAJIB_ITEMS.find(i => i.id === id);
                            if (!item) return null;
                            return (
                                <motion.div
                                    key={id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        aspectRatio: "1", borderRadius: 10,
                                        background: "var(--bs-tertiary-bg)",
                                        border: "1.5px solid #27ae60",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        padding: 4,
                                    }}
                                    title={item.label}
                                >
                                    <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                </motion.div>
                            );
                        })}
                        {Array.from({ length: Math.max(0, total - wajibCollected.length) }).map((_, i) => (
                            <div key={`empty-${i}`} style={{
                                aspectRatio: "1", borderRadius: 10,
                                border: "1.5px dashed var(--bs-border-color)",
                            }} />
                        ))}
                    </AnimatePresence>
                </div>

                {wrong > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: 10, padding: "6px 10px", borderRadius: 8, background: "#fdf0ed" }}
                    >
                        <span style={{ fontSize: ".74rem", color: "#e74c3c", fontWeight: 600 }}>
                            ✗ {wrong}x barang tidak perlu
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
