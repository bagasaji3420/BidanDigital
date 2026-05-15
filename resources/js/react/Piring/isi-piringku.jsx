// resources/js/react/Piring/isi-piringku.jsx

import { useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import ModeSelector from "./ModeSelector";
import ManualBook from "./ManualBook";
import GameTable from "./GameTable";
import ResultScreen from "./ResultScreen";
import { getRandomFoods, hitungSkor } from "./foodData";

function IsiPiringku() {
    const [phase, setPhase] = useState("landing");
    const [mode, setMode] = useState(null);
    const [foods, setFoods] = useState([]);
    // droppedIds: Set of food IDs that have been placed in any zone
    // Ini mencegah duplikasi — satu item hanya bisa ada di satu tempat
    const [droppedIds, setDroppedIds] = useState(new Set());
    const [dropped, setDropped] = useState({
        sayur: [],
        karbo: [],
        protein: [],
    });
    const [activeFood, setActiveFood] = useState(null);
    const [hasil, setHasil] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        // Sesudah:
        useSensor(TouchSensor, {
            activationConstraint: { distance: 100 },
        }),
    );

    function handleModeSelect(selectedMode) {
        setMode(selectedMode);
        setFoods(getRandomFoods(selectedMode));
        setDropped({ sayur: [], karbo: [], protein: [] });
        setDroppedIds(new Set());
        setHasil(null);
        setPhase("game");
    }

    function handleDragStart({ active }) {
        // Cari di tray (belum di-drop) atau di salah satu zona
        const food =
            foods.find((f) => f.id === active.id) ??
            Object.values(dropped)
                .flat()
                .find((f) => f.id === active.id);
        setActiveFood(food ?? null);
    }

    function handleDragEnd({ active, over }) {
        setActiveFood(null);
        if (!over) return;

        const zonaTarget = over.id;
        const foodId = active.id;

        // Cari item: bisa dari tray atau dari zona manapun
        let food = foods.find((f) => f.id === foodId);
        let fromZona = null;

        if (!food) {
            for (const zona of ["sayur", "karbo", "protein"]) {
                const found = dropped[zona].find((f) => f.id === foodId);
                if (found) {
                    food = found;
                    fromZona = zona;
                    break;
                }
            }
        }

        if (!food) return;

        // Kembalikan ke tray
        if (zonaTarget === "tray") {
            if (fromZona) {
                setDropped((prev) => ({
                    ...prev,
                    [fromZona]: prev[fromZona].filter((f) => f.id !== foodId),
                }));
                setDroppedIds((prev) => {
                    const next = new Set(prev);
                    next.delete(foodId);
                    return next;
                });
            }
            return;
        }

        if (!["sayur", "karbo", "protein"].includes(zonaTarget)) return;

        // Jika dari zona lain → pindah (hapus dari zona lama, tambah ke zona baru)
        // Jika dari tray → tambah ke zona target
        // Dalam kedua kasus, cegah duplikasi antar zona
        setDropped((prev) => {
            const next = {
                sayur: [...prev.sayur],
                karbo: [...prev.karbo],
                protein: [...prev.protein],
            };

            // Hapus dari zona lama jika ada
            if (fromZona) {
                next[fromZona] = next[fromZona].filter((f) => f.id !== foodId);
            }

            // Tambah ke zona target (cek lagi sudah ada atau belum, untuk keamanan)
            const sudahAda = next[zonaTarget].some((f) => f.id === foodId);
            if (!sudahAda) {
                next[zonaTarget] = [...next[zonaTarget], food];
            }

            return next;
        });

        // Tandai sebagai sudah di-drop (tidak bisa muncul lagi di tray)
        setDroppedIds((prev) => new Set([...prev, foodId]));
    }

    // Hapus item dari zona → kembalikan ke tray
    function handleRemoveFromZona(foodId, zona) {
        setDropped((prev) => ({
            ...prev,
            [zona]: prev[zona].filter((f) => f.id !== foodId),
        }));
        setDroppedIds((prev) => {
            const next = new Set(prev);
            next.delete(foodId);
            return next;
        });
    }

    function handleSelesai() {
        setHasil(hitungSkor(dropped));
        setPhase("result");
    }

    function handleRestart() {
        setMode(null);
        setFoods([]);
        setDropped({ sayur: [], karbo: [], protein: [] });
        setDroppedIds(new Set());
        setHasil(null);
        setPhase("landing");
    }

    return (
        <div style={{ minHeight: "70vh" }}>
            <AnimatePresence mode="wait">
                {/* ── Landing ── */}
                {phase === "landing" && (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.3 }}
                        className="d-flex flex-column align-items-center justify-content-center text-center py-5"
                        style={{ minHeight: "70vh" }}
                    >
                        <motion.div
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut",
                            }}
                            style={{ fontSize: "5rem", marginBottom: "1.5rem" }}
                        >
                            🍽️
                        </motion.div>

                        <h1
                            className="fw-extrabold mb-1"
                            style={{ fontSize: "1.75rem", color: "#2d2d3a" }}
                        >
                            Isi Piringku
                        </h1>
                        <p
                            className="text-muted mb-1"
                            style={{ fontSize: ".9rem" }}
                        >
                            Simulasi gizi seimbang
                        </p>
                        <p
                            className="text-muted mb-4 mx-auto"
                            style={{ fontSize: ".8rem", maxWidth: 300 }}
                        >
                            Susun makanan yang tepat di setiap zona piring dan
                            lihat seberapa seimbang gizimu!
                        </p>

                        <div
                            className="d-flex flex-column gap-3"
                            style={{ width: "100%", maxWidth: 300 }}
                        >
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                whileHover={{ scale: 1.02 }}
                                className="btn btn-success btn-lg fw-bold rounded-3 shadow-sm"
                                onClick={() => setPhase("mode")}
                            >
                                🎮 Mulai Permainan
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                whileHover={{ scale: 1.02 }}
                                className="btn btn-outline-success btn-lg fw-bold rounded-3"
                                onClick={() => setPhase("manual")}
                            >
                                📖 Manual Book
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* ── Manual Book ── */}
                {phase === "manual" && (
                    <motion.div
                        key="manual"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ManualBook
                            onBack={() => setPhase("landing")}
                            onMulai={() => setPhase("mode")}
                        />
                    </motion.div>
                )}

                {/* ── Mode Selector ── */}
                {phase === "mode" && (
                    <motion.div
                        key="mode"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ModeSelector
                            onSelect={handleModeSelect}
                            onBack={() => setPhase("landing")}
                        />
                    </motion.div>
                )}

                {/* ── Game ── */}
                {phase === "game" && (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <GameTable
                                mode={mode}
                                foods={foods}
                                dropped={dropped}
                                droppedIds={droppedIds}
                                onRemove={handleRemoveFromZona}
                                onSelesai={handleSelesai}
                            />

                            <DragOverlay
                                dropAnimation={{
                                    duration: 200,
                                    easing: "ease",
                                }}
                            >
                                {activeFood && (
                                    <div
                                        className="d-flex flex-column align-items-center gap-1"
                                        style={{
                                            opacity: 0.92,
                                            transform: "scale(1.1)",
                                        }}
                                    >
                                        <img
                                            src={activeFood.image}
                                            alt={activeFood.nama}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                objectFit: "contain",
                                                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                                            }}
                                        />
                                        <span
                                            className="badge bg-white text-dark shadow-sm"
                                            style={{ fontSize: ".7rem" }}
                                        >
                                            {activeFood.nama}
                                        </span>
                                    </div>
                                )}
                            </DragOverlay>
                        </DndContext>
                    </motion.div>
                )}

                {/* ── Result ── */}
                {phase === "result" && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <ResultScreen
                            hasil={hasil}
                            dropped={dropped}
                            mode={mode}
                            onRestart={handleRestart}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const el = document.getElementById("isi-piringku-root");
if (el) {
    // Cegah createRoot duplikat saat HMR reload
    if (!el._reactRoot) {
        el._reactRoot = createRoot(el);
    }
    el._reactRoot.render(<IsiPiringku />);
}
