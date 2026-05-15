import { motion } from "framer-motion";
import { WAJIB_ITEMS } from "./data/items";
import confetti from "canvas-confetti";

import { useEffect } from "react";

const BASE = "/assets/img/Game/Tas Siaga";

export default function ResultScene({ score, wrong, timeSeconds, onRestart }) {
    const total = WAJIB_ITEMS.length;
    const percent = Math.round((score / (total * 10)) * 100);
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;

    useEffect(() => {
        if (wrong === 0) {
            // Confetti terus selama 3 detik
            const end = Date.now() + 3000;
            const interval = setInterval(() => {
                if (Date.now() > end) return clearInterval(interval);
                confetti({ particleCount: 20, spread: 60, origin: { y: 0.7 } });
            }, 200);
            return () => clearInterval(interval);
        } else {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
    }, []);

    const grade =
        percent >= 90 && wrong === 0
            ? {
                  icon: "🏆",
                  label: "Ibu Siaga Sejati!",
                  maskot: "bidan-happy",
                  color: "#f9ca24",
                  bg: "bg-label-warning text-warning",
              }
            : percent >= 70
              ? {
                    icon: "⭐",
                    label: "Hampir Sempurna!",
                    maskot: "bidan-happy",
                    color: "#6ab04c",
                    bg: "bg-label-success text-success",
                }
              : percent >= 50
                ? {
                      icon: "👍",
                      label: "Lumayan, terus belajar!",
                      maskot: "bidan-encour",
                      color: "#4bcffa",
                      bg: "bg-label-info text-info",
                  }
                : {
                      icon: "📚",
                      label: "Yuk belajar lagi bersama bidan!",
                      maskot: "bidan-encour",
                      color: "#ff6b6b",
                      bg: "bg-label-danger text-danger",
                  };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            style={{ maxWidth: 420, margin: "0 auto", padding: "1rem" }}
        >
            <div className="card border-0 shadow rounded-4 p-4">
                {/* Maskot */}
                <div style={{ textAlign: "center", marginBottom: ".5rem" }}>
                    <motion.img
                        src={`${BASE}/${grade.maskot}.webp`}
                        alt="bidan"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 300,
                        }}
                        style={{ height: 100, objectFit: "contain" }}
                    />
                </div>

                <h2
                    className="text-heading fw-bold text-center mb-1"
                    style={{ fontSize: "1.4rem" }}
                >
                    {grade.icon} {grade.label}
                </h2>
                <p
                    className="text-muted text-center mb-4"
                    style={{ fontSize: ".88rem" }}
                >
                    Kamu sudah mengemas tas persalinan!
                </p>

                {/* Stats */}
                <div
                    className="card border-0 rounded-3 p-3 mb-3"
                    style={{ background: "var(--bs-tertiary-bg)" }}
                >
                    <div className="row g-0 text-center">
                        <div className="col">
                            <div
                                className="fw-bold"
                                style={{ fontSize: "1.6rem", color: "#696cff" }}
                            >
                                {score}
                            </div>
                            <div
                                className="text-muted"
                                style={{ fontSize: ".7rem", fontWeight: 600 }}
                            >
                                SKOR
                            </div>
                        </div>
                        <div
                            className="col border-start border-end"
                            style={{ borderColor: "var(--bs-border-color)" }}
                        >
                            <div
                                className="fw-bold"
                                style={{ fontSize: "1.6rem", color: "#ff6b6b" }}
                            >
                                {wrong}
                            </div>
                            <div
                                className="text-muted"
                                style={{ fontSize: ".7rem", fontWeight: 600 }}
                            >
                                SALAH
                            </div>
                        </div>
                        <div className="col">
                            <div
                                className="fw-bold"
                                style={{ fontSize: "1.6rem", color: "#ff9f43" }}
                            >
                                {minutes}:{seconds.toString().padStart(2, "0")}
                            </div>
                            <div
                                className="text-muted"
                                style={{ fontSize: ".7rem", fontWeight: 600 }}
                            >
                                WAKTU
                            </div>
                        </div>
                    </div>
                </div>

                {/* Persentase */}
                <div
                    className={`rounded-3 p-3 mb-4 ${grade.bg}`}
                    style={{ textAlign: "center" }}
                >
                    <div
                        className="fw-bold"
                        style={{ fontSize: "2.2rem", color: grade.color }}
                    >
                        {percent}%
                    </div>
                    <div className="text-muted" style={{ fontSize: ".8rem" }}>
                        Kelengkapan Tas
                    </div>
                </div>

                {/* Edukasi item yang terlewat */}
                {score < total * 10 && (
                    <div className="mb-4">
                        <p
                            className="text-muted fw-bold mb-2"
                            style={{
                                fontSize: ".75rem",
                                letterSpacing: ".05em",
                            }}
                        >
                            JANGAN SAMPAI KETINGGALAN:
                        </p>
                        {WAJIB_ITEMS.filter((i) => {
                            // items yang tidak di-collect — diambil dari skor
                            return false; // parent harus kirim missed items
                        }).map((item, i) => (
                            <div
                                key={i}
                                className="rounded-3 p-2 mb-2"
                                style={{
                                    background: "var(--bs-tertiary-bg)",
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    style={{
                                        width: 36,
                                        height: 36,
                                        objectFit: "contain",
                                    }}
                                />
                                <div>
                                    <p
                                        className="fw-bold mb-0"
                                        style={{ fontSize: ".82rem" }}
                                    >
                                        {item.label}
                                    </p>
                                    <p
                                        className="text-muted mb-0"
                                        style={{ fontSize: ".75rem" }}
                                    >
                                        {item.edukasi}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={onRestart}
                    className="btn btn-primary fw-bold w-100 rounded-3"
                    style={{ padding: ".85rem", fontSize: "1rem" }}
                >
                    🔄 Main Lagi
                </button>
            </div>
        </motion.div>
    );
}
