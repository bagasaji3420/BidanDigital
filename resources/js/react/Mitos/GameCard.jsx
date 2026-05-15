// resources/js/react/Piring/GameCard.jsx

import { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function GameCard({ card, onSwipe, disabled }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const mitosOpacity = useTransform(x, [-100, -20, 0], [1, 0.3, 0]);
    const faktaOpacity = useTransform(x, [0, 20, 100], [0, 0.3, 1]);

    const [isDragging, setIsDragging] = useState(false);

    function handleDragEnd(_, info) {
        setIsDragging(false);
        if (info.offset.x > 100) throwCard("fakta");
        else if (info.offset.x < -100) throwCard("mitos");
        else animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    }

    function throwCard(answer) {
        const dir = answer === "fakta" ? 600 : -600;
        animate(x, dir, {
            type: "spring", stiffness: 200, damping: 20,
            onComplete: () => onSwipe(answer),
        });
    }

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 380, margin: "0 auto" }}>

            {/* Hint labels */}
            <div style={{
                position: "absolute", top: -40, left: 0, right: 0,
                display: "flex", justifyContent: "space-between",
                padding: "0 8px", pointerEvents: "none", zIndex: 10,
            }}>
                <span style={{ fontSize: ".85rem", fontWeight: 600, color: "#e74c3c", opacity: 0.5 }}>← MITOS</span>
                <span style={{ fontSize: ".85rem", fontWeight: 600, color: "#27ae60", opacity: 0.5 }}>FAKTA →</span>
            </div>

            <motion.div
                drag={disabled ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                style={{ x, rotate, opacity, cursor: disabled ? "default" : "grab", touchAction: "none" }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
            >
                {/* MITOS stamp */}
                <motion.div style={{
                    position: "absolute", top: 20, left: 20, zIndex: 10,
                    border: "3px solid #e74c3c", borderRadius: 8,
                    padding: "4px 12px", opacity: mitosOpacity,
                    transform: "rotate(-15deg)",
                }}>
                    <span style={{ color: "#e74c3c", fontWeight: 800, fontSize: "1.1rem", letterSpacing: 2 }}>MITOS</span>
                </motion.div>

                {/* FAKTA stamp */}
                <motion.div style={{
                    position: "absolute", top: 20, right: 20, zIndex: 10,
                    border: "3px solid #27ae60", borderRadius: 8,
                    padding: "4px 12px", opacity: faktaOpacity,
                    transform: "rotate(15deg)",
                }}>
                    <span style={{ color: "#27ae60", fontWeight: 800, fontSize: "1.1rem", letterSpacing: 2 }}>FAKTA</span>
                </motion.div>

                {/* Card body */}
                <div className="card border shadow-sm" style={{
                    borderRadius: 20,
                    borderColor: "var(--bs-border-color)",
                    padding: "2rem 1.75rem 1.75rem",
                    minHeight: 260,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    userSelect: "none",
                }}>
                    <div>
                        <span className="badge bg-label-primary text-primary rounded-pill mb-3"
                            style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".05em" }}>
                            {card.kategori}
                        </span>
                        <p className="text-heading" style={{
                            fontSize: "1.15rem", fontWeight: 600,
                            lineHeight: 1.6, marginBottom: "1.5rem",
                        }}>
                            {card.pernyataan}
                        </p>
                    </div>
                    <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: ".8rem" }}>
                        <span>👆</span>
                        <span>Geser kartu atau tekan tombol di bawah</span>
                    </div>
                </div>
            </motion.div>

            {/* Button fallback */}
            {!disabled && (
                <div className="d-flex gap-3 mt-3">
                    <button
                        onClick={() => throwCard("mitos")}
                        className="btn btn-outline-danger fw-bold flex-1 rounded-3"
                        style={{ padding: ".75rem", fontSize: ".95rem" }}
                    >
                        ✗ Mitos
                    </button>
                    <button
                        onClick={() => throwCard("fakta")}
                        className="btn btn-outline-success fw-bold flex-1 rounded-3"
                        style={{ padding: ".75rem", fontSize: ".95rem" }}
                    >
                        ✓ Fakta
                    </button>
                </div>
            )}
        </div>
    );
}
