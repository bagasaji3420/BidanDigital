// resources/js/react/MitosFakta/ScoreBoard.jsx

import { motion, AnimatePresence } from "framer-motion";

export default function ScoreBoard({ current, total, score, streak }) {
    const progress = (current / total) * 100;

    const badges = [
        { min: 3,  icon: "🔥", label: "On Fire!" },
        { min: 5,  icon: "⚡", label: "Streak 5!" },
        { min: 10, icon: "👑", label: "Luar Biasa!" },
    ];
    const activeBadge = [...badges].reverse().find(b => streak >= b.min);

    return (
        <div style={{ marginBottom: "1.5rem" }}>

            {/* Top row */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex gap-3">
                    <div className="text-center">
                        <div className="fw-bold" style={{ fontSize: "1.4rem", color: "#696cff", lineHeight: 1 }}>
                            {score}
                        </div>
                        <div className="text-muted" style={{ fontSize: ".7rem", fontWeight: 500 }}>BENAR</div>
                    </div>

                    <div style={{ width: 1, background: "var(--bs-border-color)" }} />

                    <div className="text-center">
                        <div className="fw-bold" style={{ fontSize: "1.4rem", color: "#ff9f43", lineHeight: 1 }}>
                            {streak}
                        </div>
                        <div className="text-muted" style={{ fontSize: ".7rem", fontWeight: 500 }}>STREAK</div>
                    </div>
                </div>

                {/* Badge streak */}
                <AnimatePresence mode="wait">
                    {activeBadge && (
                        <motion.div
                            key={activeBadge.label}
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            className="badge rounded-pill d-flex align-items-center gap-1"
                            style={{
                                background: "linear-gradient(135deg, #ff9f43, #ee5a24)",
                                color: "#fff",
                                padding: "6px 12px",
                                fontSize: ".8rem",
                                fontWeight: 700,
                            }}
                        >
                            {activeBadge.icon} {activeBadge.label}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-end">
                    <div style={{ fontSize: ".85rem" }}>
                        <span className="text-heading fw-bold">{current}</span>
                        <span className="text-muted"> / {total}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: ".7rem" }}>kartu</div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="bg-label-primary rounded-pill overflow-hidden" style={{ height: 8 }}>
                <motion.div
                    style={{
                        height: "100%",
                        background: "linear-gradient(90deg, #696cff, #a78bfa)",
                        borderRadius: 99,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </div>
        </div>
    );
}
