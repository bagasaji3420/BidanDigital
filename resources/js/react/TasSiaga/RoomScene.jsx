import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ItemTooltip from "./ItemTooltip";

export default function RoomScene({ items, collected, onItemClick, roomImg, disabled }) {
    const [activeFeedback, setActiveFeedback] = useState(null);

    function handleClick(item) {
        if (disabled || collected.includes(item.id)) return;
        onItemClick(item);
        setActiveFeedback({ item });
    }

    function closeFeedback() {
        setActiveFeedback(null);
    }

    return (
        <div style={{ position: "relative", width: "100%" }}>
            {/* Wrapper rasio gambar */}
            <div style={{ position: "relative", width: "100%", paddingBottom: "100%" }}>

                {/* Room background */}
                <img
                    src={roomImg}
                    alt="Kamar"
                    style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover",
                        userSelect: "none", pointerEvents: "none",
                    }}
                    draggable={false}
                />

                {/* Item hotspots — tampil sebagai gambar item langsung, tanpa bubble */}
                {items.map((item) => {
                    const isCollected = collected.includes(item.id);

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => handleClick(item)}
                            disabled={isCollected || disabled}
                            title={isCollected ? item.label : undefined}
                            style={{
                                position: "absolute",
                                left: item.x,
                                top: item.y,
                                transform: "translate(-50%, -50%)",
                                width: 48,
                                height: 48,
                                borderRadius: 8,
                                border: "none",
                                background: "transparent",
                                padding: 0,
                                cursor: isCollected ? "default" : "pointer",
                                zIndex: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                outline: "none",
                                WebkitTapHighlightColor: "transparent",
                            }}
                            whileHover={!isCollected ? { scale: 1.12 } : {}}
                            whileTap={!isCollected ? { scale: 0.9 } : {}}
                            aria-label={item.label}
                        >
                            {isCollected ? (
                                /* Sudah diklik — tampil checkmark kecil di atas item */
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        width: 48, height: 48,
                                        borderRadius: 8,
                                        background: item.wajib
                                            ? "rgba(39,174,96,0.15)"
                                            : "rgba(231,76,60,0.15)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 22,
                                    }}
                                >
                                    {item.wajib ? "✓" : "✗"}
                                </motion.div>
                            ) : (
                                /* Belum diklik — tampil gambar item apa adanya */
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        objectFit: "contain",
                                        pointerEvents: "none",
                                        userSelect: "none",
                                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                                    }}
                                    draggable={false}
                                />
                            )}
                        </motion.button>
                    );
                })}

                {/* Feedback tooltip overlay */}
                <AnimatePresence>
                    {activeFeedback && (
                        <ItemTooltip feedback={activeFeedback} onClose={closeFeedback} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
