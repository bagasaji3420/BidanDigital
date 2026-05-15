// resources/js/react/MitosFakta/ResultScene.jsx

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ResultScene({ score, total, maxStreak, wrong, onRestart }) {
    const percent = Math.round((score / total) * 100);

    const grade = percent >= 90 ? { icon: "🏆", label: "Luar Biasa!",        color: "#f9ca24", labelClass: "bg-label-warning text-warning" }
                : percent >= 70 ? { icon: "⭐", label: "Bagus Sekali!",       color: "#6ab04c", labelClass: "bg-label-success text-success" }
                : percent >= 50 ? { icon: "👍", label: "Lumayan!",            color: "#4bcffa", labelClass: "bg-label-info text-info"       }
                :                 { icon: "📚", label: "Perlu Belajar Lagi",  color: "#ff6b6b", labelClass: "bg-label-danger text-danger"   };

    useEffect(() => {
        if (percent >= 90) {
            // Perfect / near perfect — confetti dari kiri & kanan terus 3 detik
            const end = Date.now() + 3000;
            const interval = setInterval(() => {
                if (Date.now() > end) return clearInterval(interval);
                confetti({ particleCount: 25, angle: 60,  spread: 55, origin: { x: 0,   y: 0.7 } });
                confetti({ particleCount: 25, angle: 120, spread: 55, origin: { x: 1,   y: 0.7 } });
            }, 220);
            return () => clearInterval(interval);

        } else if (percent >= 70) {
            // Bagus — tembak sekali dari tengah + kiri kanan
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.65 } });
            setTimeout(() => {
                confetti({ particleCount: 50, angle: 60,  spread: 50, origin: { x: 0 } });
                confetti({ particleCount: 50, angle: 120, spread: 50, origin: { x: 1 } });
            }, 350);

        } else if (percent >= 50) {
            // Lumayan — tembak sekali kecil
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        }
        // < 50% tidak ada confetti
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: .9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="card border-0 shadow rounded-4 p-4 p-md-5"
            style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}
        >
            {/* Grade icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: .2, type: "spring", stiffness: 300 }}
                style={{ fontSize: "4rem", marginBottom: ".5rem" }}
            >
                {grade.icon}
            </motion.div>

            <h2 className="text-heading fw-bold mb-1" style={{ fontSize: "1.5rem" }}>
                {grade.label}
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: ".9rem" }}>
                Kamu menyelesaikan semua {total} kartu!
            </p>

            {/* Stats */}
            <div className="card border-0 rounded-3 p-3 mb-4" style={{ background: "var(--bs-tertiary-bg)" }}>
                <div className="row g-0 text-center">
                    <div className="col">
                        <div className="fw-bold" style={{ fontSize: "1.8rem", color: "#696cff" }}>{score}</div>
                        <div className="text-muted" style={{ fontSize: ".72rem", fontWeight: 500 }}>BENAR</div>
                    </div>
                    <div className="col border-start border-end" style={{ borderColor: "var(--bs-border-color)" }}>
                        <div className="fw-bold" style={{ fontSize: "1.8rem", color: "#ff6b6b" }}>{total - score}</div>
                        <div className="text-muted" style={{ fontSize: ".72rem", fontWeight: 500 }}>SALAH</div>
                    </div>
                    <div className="col">
                        <div className="fw-bold" style={{ fontSize: "1.8rem", color: "#ff9f43" }}>{maxStreak}</div>
                        <div className="text-muted" style={{ fontSize: ".72rem", fontWeight: 500 }}>MAX STREAK</div>
                    </div>
                </div>
            </div>

            {/* Persen */}
            <div className={`rounded-3 p-3 mb-4 ${grade.labelClass}`}>
                <div className="fw-bold" style={{ fontSize: "2.5rem", color: grade.color }}>{percent}%</div>
                <div className="text-muted" style={{ fontSize: ".8rem" }}>Tingkat Kebenaran</div>
            </div>

            {/* Jawaban salah */}
            {wrong.length > 0 && (
                <div className="text-start mb-4">
                    <p className="text-muted fw-bold mb-2" style={{ fontSize: ".8rem", letterSpacing: ".05em" }}>
                        PERLU DIPELAJARI LAGI:
                    </p>
                    {wrong.map((w, i) => (
                        <div key={i} className="rounded-3 p-3 mb-2 bg-label-danger"
                            style={{ borderLeft: "3px solid #ff6b6b" }}>
                            <p className="text-heading fw-bold mb-1" style={{ fontSize: ".85rem" }}>
                                {w.pernyataan}
                            </p>
                            <p className="mb-1" style={{ fontSize: ".78rem", color: "#696cff", fontWeight: 500 }}>
                                ✓ {w.jawaban === "fakta" ? "Ini adalah FAKTA" : "Ini adalah MITOS"}
                            </p>
                            <p className="text-muted mb-0" style={{ fontSize: ".78rem" }}>
                                {w.penjelasan}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={onRestart}
                className="btn btn-primary fw-bold w-100 rounded-3"
                style={{ padding: ".9rem", fontSize: "1rem" }}
            >
                🔄 Main Lagi
            </button>
        </motion.div>
    );
}
