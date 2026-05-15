// resources/js/react/Piring/ManualBook.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
    {
        id: "tujuan",
        icon: "🎯",
        title: "Apa itu Isi Piringku?",
        color: "#4caf50",
        labelClass: "bg-label-success",
        content: (
            <>
                <p className="text-body" style={{ lineHeight: 1.7 }}>
                    <strong>Isi Piringku</strong> adalah simulasi interaktif gizi
                    seimbang berbasis pedoman <em>Isi Piringku</em> dari Kemenkes RI.
                </p>
                <p className="text-body" style={{ lineHeight: 1.7 }}>
                    Kamu akan menyusun makanan ke dalam 3 zona piring: sayur & buah,
                    karbohidrat, dan protein — lalu mendapatkan skor sesuai seberapa
                    seimbang pilihanmu!
                </p>
                <div className="d-flex gap-2 mt-3 flex-wrap">
                    <span className="badge rounded-pill px-3 py-2 bg-label-danger text-danger" style={{ fontWeight: 600, fontSize: ".8rem" }}>
                        🤰 Mode Ibu Hamil
                    </span>
                    <span className="badge rounded-pill px-3 py-2 bg-label-warning text-warning" style={{ fontWeight: 600, fontSize: ".8rem" }}>
                        👶 Mode MPASI Bayi
                    </span>
                </div>
            </>
        ),
    },
    {
        id: "cara",
        icon: "🕹️",
        title: "Cara Bermain",
        color: "#1976d2",
        labelClass: "bg-label-primary",
        content: (
            <>
                {[
                    { n: "1", t: "Pilih Mode", d: "Pilih antara mode Ibu Hamil atau MPASI Bayi sesuai kebutuhanmu." },
                    { n: "2", t: "Drag & Drop", d: "Seret makanan dari tray ke zona piring yang tepat: Sayur/Buah, Karbohidrat, atau Protein." },
                    { n: "3", t: "Susun Piringmu", d: "Isi semua zona piring. Kamu bisa memindahkan makanan antar zona atau mengembalikannya ke tray." },
                    { n: "4", t: "Lihat Hasil", d: "Tekan 'Selesai' untuk melihat skor, bintang, dan saran gizimu!" },
                ].map((s) => (
                    <div key={s.n} className="d-flex gap-3 mb-3 align-items-start">
                        <div style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: "#1976d2", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: ".8rem", flexShrink: 0, marginTop: 2,
                        }}>
                            {s.n}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: "#1976d2", fontSize: ".9rem" }}>{s.t}</div>
                            <div className="text-body" style={{ fontSize: ".82rem", lineHeight: 1.5 }}>{s.d}</div>
                        </div>
                    </div>
                ))}
            </>
        ),
    },
    {
        id: "zona",
        icon: "🍽️",
        title: "Zona Piring",
        color: "#e91e8c",
        labelClass: "bg-label-danger",
        content: (
            <>
                <p className="text-muted" style={{ fontSize: ".85rem", marginBottom: 12 }}>
                    Berdasarkan pedoman <strong>Isi Piringku</strong> Kemenkes RI:
                </p>
                {[
                    { emoji: "🥦", zona: "Sayur & Buah", porsi: "½ piring", warna: "#4caf50", cls: "bg-label-success", contoh: "Bayam, wortel, apel, pisang, pepaya" },
                    { emoji: "🍚", zona: "Karbohidrat", porsi: "¼ piring", warna: "#ff9800", cls: "bg-label-warning", contoh: "Nasi, kentang, roti, ubi, jagung" },
                    { emoji: "🍗", zona: "Protein", porsi: "¼ piring", warna: "#e91e8c", cls: "bg-label-danger", contoh: "Ayam, ikan, telur, tahu, tempe" },
                ].map((z) => (
                    <div key={z.zona} className={`d-flex gap-3 mb-2 p-2 rounded-3 align-items-center ${z.cls}`}>
                        <div style={{ fontSize: "1.8rem" }}>{z.emoji}</div>
                        <div>
                            <div style={{ fontWeight: 700, color: z.warna, fontSize: ".88rem" }}>
                                {z.zona}{" "}
                                <span className="badge ms-1" style={{ background: z.warna, color: "#fff", fontSize: ".7rem" }}>
                                    {z.porsi}
                                </span>
                            </div>
                            <div className="text-muted" style={{ fontSize: ".78rem" }}>{z.contoh}</div>
                        </div>
                    </div>
                ))}
            </>
        ),
    },
    {
        id: "skor",
        icon: "⭐",
        title: "Sistem Skor",
        color: "#f59e0b",
        labelClass: "bg-label-warning",
        content: (
            <>
                <p className="text-muted" style={{ fontSize: ".85rem", marginBottom: 12 }}>
                    Skor dihitung berdasarkan <strong>akurasi zona</strong> + <strong>bonus proporsi</strong>:
                </p>
                {[
                    { stars: "⭐⭐⭐", label: "85 – 100", desc: "Luar biasa! Piring gizimu sangat seimbang.", color: "#f59e0b" },
                    { stars: "⭐⭐", label: "60 – 84", desc: "Bagus! Masih ada ruang untuk perbaikan.", color: "#94a3b8" },
                    { stars: "⭐", label: "0 – 59", desc: "Yuk coba lagi dan perbaiki komposisi piringmu!", color: "#cd7f32" },
                ].map((s) => (
                    <div key={s.label} className="d-flex gap-3 mb-2 p-2 rounded-3 align-items-center bg-label-warning">
                        <div style={{ fontSize: "1.2rem", minWidth: 60 }}>{s.stars}</div>
                        <div>
                            <div style={{ fontWeight: 700, color: s.color, fontSize: ".85rem" }}>Skor {s.label}</div>
                            <div className="text-muted" style={{ fontSize: ".78rem" }}>{s.desc}</div>
                        </div>
                    </div>
                ))}
                <p className="text-muted" style={{ fontSize: ".78rem", marginTop: 8 }}>
                    💡 Bonus poin diberikan jika proporsi zona sudah mendekati ideal.
                </p>
            </>
        ),
    },
];

export default function ManualBook({ onBack, onMulai }) {
    const [page, setPage] = useState(0);
    const [dir, setDir] = useState(1);

    function goTo(i) {
        setDir(i > page ? 1 : -1);
        setPage(i);
    }

    const current = PAGES[page];

    return (
        <div className="d-flex flex-column align-items-center py-4 px-3" style={{ minHeight: "70vh" }}>
            {/* Header */}
            <div className="d-flex align-items-center w-100 mb-4" style={{ maxWidth: 480 }}>
                <button className="btn btn-link text-muted p-0 me-3" onClick={onBack} style={{ fontSize: ".85rem" }}>
                    ← Kembali
                </button>
                <h5 className="fw-bold mb-0 me-auto text-heading">📖 Manual Book</h5>
                <span className="text-muted" style={{ fontSize: ".8rem" }}>{page + 1} / {PAGES.length}</span>
            </div>

            {/* Tab pills */}
            <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center" style={{ maxWidth: 480 }}>
                {PAGES.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => goTo(i)}
                        className="btn btn-sm rounded-pill px-3"
                        style={{
                            background: i === page ? p.color : "var(--bs-tertiary-bg)",
                            color: i === page ? "#fff" : "var(--bs-secondary-color)",
                            fontWeight: i === page ? 700 : 500,
                            border: "none",
                            fontSize: ".78rem",
                            transition: "all .2s",
                        }}
                    >
                        {p.icon} {p.title.split(" ")[0]}
                    </button>
                ))}
            </div>

            {/* Card */}
            <div style={{ width: "100%", maxWidth: 480, overflow: "hidden" }}>
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={page}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -60 }}
                        transition={{ duration: 0.28 }}
                        className={`card border-0 shadow-sm rounded-4 p-4 ${current.labelClass}`}
                    >
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="card border-0 shadow-sm"
                                style={{
                                    fontSize: "2.2rem", width: 54, height: 54,
                                    borderRadius: 16, display: "flex",
                                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}
                            >
                                {current.icon}
                            </div>
                            <h5 className="fw-bold mb-0" style={{ color: current.color }}>{current.title}</h5>
                        </div>
                        {current.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Nav */}
            <div className="d-flex align-items-center gap-3 mt-4" style={{ maxWidth: 480, width: "100%" }}>
                <button
                    className="btn btn-outline-secondary rounded-3 flex-1"
                    onClick={() => goTo(page - 1)}
                    disabled={page === 0}
                    style={{ fontSize: ".85rem" }}
                >
                    ← Sebelumnya
                </button>
                {page < PAGES.length - 1 ? (
                    <button
                        className="btn btn-success rounded-3 flex-1 fw-bold"
                        onClick={() => goTo(page + 1)}
                        style={{ fontSize: ".85rem" }}
                    >
                        Selanjutnya →
                    </button>
                ) : (
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        className="btn btn-success rounded-3 flex-1 fw-bold"
                        onClick={onMulai}
                        style={{ fontSize: ".85rem" }}
                    >
                        🎮 Mulai Bermain!
                    </motion.button>
                )}
            </div>

            {/* Dots */}
            <div className="d-flex gap-2 mt-3">
                {PAGES.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => goTo(i)}
                        style={{
                            width: i === page ? 20 : 8,
                            height: 8,
                            borderRadius: 4,
                            background: i === page ? current.color : "var(--bs-border-color)",
                            cursor: "pointer",
                            transition: "all .3s",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
