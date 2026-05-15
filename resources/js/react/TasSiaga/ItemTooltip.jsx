import { motion, AnimatePresence } from "framer-motion";

const BASE = "/assets/img/Game/Tas Siaga";

export default function ItemTooltip({ feedback, onClose }) {
    if (!feedback) return null;

    const isCorrect = feedback.item.wajib;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 50,
                    pointerEvents: "none",
                }}
            >
                <div style={{ pointerEvents: "auto", width: "90%", maxWidth: 320 }}>
                    <div style={{
                        background: "rgba(255,255,255,0.97)",
                        backdropFilter: "blur(8px)",
                        borderRadius: 20,
                        padding: "1.25rem",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                        border: `2px solid ${isCorrect ? "#6ab04c" : "#e74c3c"}`,
                    }}>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                            <img
                                src={feedback.item.img}
                                alt={feedback.item.label}
                                style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 10, background: "#f8f4f0" }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                                    <span style={{
                                        fontSize: ".7rem", fontWeight: 700, letterSpacing: ".05em",
                                        padding: "2px 8px", borderRadius: 99,
                                        background: isCorrect ? "#eafaf1" : "#fdf0ed",
                                        color: isCorrect ? "#27ae60" : "#e74c3c",
                                    }}>
                                        {isCorrect ? "✓ BENAR" : "✗ SALAH"}
                                    </span>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: ".95rem", margin: 0, color: "#2d3436" }}>
                                    {feedback.item.label}
                                </p>
                            </div>
                        </div>

                        {/* Maskot + feedback */}
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                            <img
                                src={`${BASE}/${isCorrect ? "bidan-happy" : "bidan-laugh"}.webp`}
                                alt="bidan"
                                style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }}
                            />
                            <div style={{
                                background: isCorrect ? "#eafaf1" : "#fdf0ed",
                                borderRadius: 12, padding: "8px 12px",
                                fontSize: ".85rem", color: "#2d3436", lineHeight: 1.5,
                                flex: 1,
                            }}>
                                {feedback.item.feedback}
                            </div>
                        </div>

                        {/* Edukasi — hanya untuk item wajib */}
                        {isCorrect && feedback.item.edukasi && (
                            <div style={{
                                background: "#f0f4ff", borderRadius: 10, padding: "8px 12px",
                                fontSize: ".8rem", color: "#555", lineHeight: 1.5, marginBottom: 10,
                                borderLeft: "3px solid #696cff",
                            }}>
                                💡 {feedback.item.edukasi}
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            style={{
                                width: "100%", padding: ".6rem",
                                borderRadius: 10, border: "none",
                                background: isCorrect ? "#27ae60" : "#e74c3c",
                                color: "white", fontWeight: 700, fontSize: ".9rem",
                                cursor: "pointer",
                            }}
                        >
                            {isCorrect ? "Lanjutkan →" : "Oke, mengerti!"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
