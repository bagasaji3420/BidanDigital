// resources/js/react/Piring/ModeSelector.jsx

import { motion } from "framer-motion";

export default function ModeSelector({ onSelect, onBack }) {
    const modes = [
        {
            id: "bumil",
            emoji: "🤰",
            label: "Ibu Hamil",
            desc: "Susun menu gizi seimbang sesuai kebutuhan ibu hamil",
            color: "#e91e8c",
            labelClass: "bg-label-danger",
            badgeStyle: { background: "#e91e8c", color: "#fff" },
        },
        {
            id: "mpasi",
            emoji: "👶",
            label: "MPASI Bayi",
            desc: "Susun menu MPASI sehat untuk bayi usia 6–12 bulan",
            color: "#ff8c00",
            labelClass: "bg-label-warning",
            badgeStyle: { background: "#ff8c00", color: "#fff" },
        },
    ];

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center py-5"
            style={{ minHeight: "70vh" }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-4"
            >
                <h2 className="fw-bold mb-1 text-heading">Pilih Mode</h2>
                <p className="text-muted" style={{ fontSize: ".9rem" }}>
                    Sesuaikan dengan kebutuhanmu
                </p>
            </motion.div>

            {/* Cards */}
            <div
                className="row g-3 justify-content-center w-100"
                style={{ maxWidth: 600 }}
            >
                {modes.map((m, i) => (
                    <div className="col-12 col-sm-6" key={m.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onSelect(m.id)}
                            className={`card border-0 shadow-sm h-100 ${m.labelClass}`}
                            style={{ cursor: "pointer", borderRadius: 16 }}
                        >
                            <div className="card-body text-center py-4 px-3">
                                <div
                                    style={{
                                        fontSize: "3.5rem",
                                        marginBottom: ".75rem",
                                    }}
                                >
                                    {m.emoji}
                                </div>
                                <h5
                                    className="fw-bold mb-2"
                                    style={{ color: m.color }}
                                >
                                    {m.label}
                                </h5>
                                <p
                                    className="text-muted mb-3"
                                    style={{
                                        fontSize: ".82rem",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {m.desc}
                                </p>
                                <button
                                    className="btn fw-bold rounded-3 px-4"
                                    style={{
                                        ...m.badgeStyle,
                                        fontSize: ".85rem",
                                    }}
                                >
                                    Pilih →
                                </button>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Back */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="btn btn-link text-muted mt-4"
                onClick={onBack}
            >
                ← Kembali
            </motion.button>
        </div>
    );
}
