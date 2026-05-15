import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoomScene from "./RoomScene";
import BagPanel from "./BagPanel";
import ResultScene from "./ResultScene";
import { ITEMS, WAJIB_ITEMS, WAJIB_COUNT, ROOMS } from "./data/items";

const BASE = "/assets/img/Game/Tas Siaga";
const POINTS_CORRECT = 10;
const POINTS_WRONG = -5;

function useWindowWidth() {
    const [w, setW] = useState(window.innerWidth);
    useEffect(() => {
        const fn = () => setW(window.innerWidth);
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);
    return w;
}

export default function TasSiaga() {
    const width = useWindowWidth();
    const isDesktop = width >= 768;

    const [phase, setPhase] = useState("intro");       // intro | game | result
    const [collected, setCollected] = useState([]);    // id[] semua item yang diklik
    const [score, setScore] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [missedItems, setMissedItems] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [roomIndex] = useState(() => Math.floor(Math.random() * ROOMS.length));

    // Timer
    useEffect(() => {
        if (phase !== "game") return;
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [phase, startTime]);

    function startGame() {
        setPhase("game");
        setCollected([]);
        setScore(0);
        setWrong(0);
        setMissedItems([]);
        setStartTime(Date.now());
        setElapsed(0);
    }

    const handleItemClick = useCallback((item) => {
        setCollected(prev => {
            if (prev.includes(item.id)) return prev;
            const next = [...prev, item.id];

            if (item.wajib) {
                setScore(s => s + POINTS_CORRECT);
                // Cek apakah sudah lengkap semua wajib
                const wajibDone = WAJIB_ITEMS.filter(w => next.includes(w.id));
                if (wajibDone.length === WAJIB_COUNT) {
                    const missed = WAJIB_ITEMS.filter(w => !next.includes(w.id));
                    setMissedItems(missed);
                    setTimeout(() => setPhase("result"), 1200);
                }
            } else {
                setScore(s => Math.max(0, s + POINTS_WRONG));
                setWrong(w => w + 1);
            }

            return next;
        });
    }, []);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

    // INTRO
    if (phase === "intro") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: 420, margin: "0 auto", padding: "1.5rem 1rem" }}
            >
                <div className="card border-0 shadow rounded-4 p-4 p-md-5" style={{ textAlign: "center" }}>
                    <motion.img
                        src={`${BASE}/bidan-encour.webp`}
                        alt="Bidan"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: .1, type: "spring", stiffness: 260 }}
                        style={{ height: 120, objectFit: "contain", margin: "0 auto 1rem" }}
                    />
                    <h2 className="text-heading fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
                        🎒 Tas Siaga Persalinan
                    </h2>
                    <p className="text-muted mb-4" style={{ fontSize: ".92rem", lineHeight: 1.6 }}>
                        Bantu Bu Ibu menyiapkan tas persalinan! Temukan dan klik semua barang yang <strong>wajib dibawa</strong> ke RS atau bidan.
                    </p>

                    <div className="card border-0 rounded-3 p-3 mb-4" style={{ background: "var(--bs-tertiary-bg)", textAlign: "left" }}>
                        <p className="fw-bold mb-2" style={{ fontSize: ".82rem" }}>📋 Cara Bermain:</p>
                        <div style={{ fontSize: ".82rem", color: "var(--bs-secondary-color)", lineHeight: 1.8 }}>
                            <div>✅ Klik barang yang wajib dibawa → <strong>+10 poin</strong></div>
                            <div>❌ Klik barang yang tidak perlu → <strong>-5 poin</strong></div>
                            <div>⚡ Makin cepat selesai, makin bagus!</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                        {WAJIB_ITEMS.slice(0, 6).map(item => (
                            <img key={item.id} src={item.img} alt={item.label}
                                style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 8, background: "var(--bs-tertiary-bg)", padding: 4 }}
                                title={item.label}
                            />
                        ))}
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--bs-tertiary-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", color: "var(--bs-secondary-color)" }}>
                            +{WAJIB_COUNT - 6}
                        </div>
                    </div>

                    <button
                        onClick={startGame}
                        className="btn btn-primary fw-bold w-100 rounded-3"
                        style={{ padding: ".9rem", fontSize: "1.05rem" }}
                    >
                        Mulai Bermain 🎮
                    </button>
                </div>
            </motion.div>
        );
    }

    // RESULT
    if (phase === "result") {
        return (
            <div style={{ padding: "1rem 0" }}>
                <ResultScene
                    score={score}
                    wrong={wrong}
                    missedItems={missedItems}
                    timeSeconds={elapsed}
                    onRestart={startGame}
                />
            </div>
        );
    }

    // GAME
    const wajibCollected = collected.filter(id => WAJIB_ITEMS.find(i => i.id === id));

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Top bar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 16px",
                borderBottom: "1px solid var(--bs-border-color)",
                background: "var(--bs-body-bg)",
                gap: 12,
            }}>
                <span className="fw-bold text-heading" style={{ fontSize: ".95rem" }}>
                    🎒 Tas Siaga Persalinan
                </span>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: ".82rem", color: "var(--bs-secondary-color)" }}>
                        ⏱ {formatTime(elapsed)}
                    </span>
                    <span style={{ fontSize: ".82rem" }}>
                        <span className="fw-bold" style={{ color: "#696cff" }}>{score}</span>
                        <span className="text-muted"> pts</span>
                    </span>
                    <span style={{ fontSize: ".82rem" }}>
                        <span className="fw-bold text-heading">{wajibCollected.length}</span>
                        <span className="text-muted"> / {WAJIB_COUNT}</span>
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: "var(--bs-tertiary-bg)" }}>
                <motion.div
                    style={{ height: "100%", background: "linear-gradient(90deg, #696cff, #a78bfa)" }}
                    animate={{ width: `${(wajibCollected.length / WAJIB_COUNT) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80 }}
                />
            </div>

            {/* Main layout */}
            <div style={{
                display: "flex",
                flexDirection: isDesktop ? "row" : "column",
                flex: 1,
                overflow: isDesktop ? "hidden" : "visible",
            }}>
                {/* Room */}
                <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                    <RoomScene
                        items={ITEMS}
                        collected={collected}
                        onItemClick={handleItemClick}
                        roomImg={ROOMS[roomIndex]}
                        disabled={phase !== "game"}
                    />
                </div>

                {/* Bag Panel */}
                <BagPanel
                    collected={collected}
                    score={score}
                    wrong={wrong}
                    isDesktop={isDesktop}
                />
            </div>
        </div>
    );
}
