// resources/js/react/Piring/FoodItem.jsx

import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export default function FoodItem({ food, small = false }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: food.id,
    });

    const size = small ? 44 : 54;

    return (
        <motion.div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="d-flex flex-column align-items-center gap-1"
            style={{
                cursor: "grab",
                opacity: isDragging ? 0.3 : 1,
                transition: "opacity .15s",
                userSelect: "none",
                WebkitUserSelect: "none",
                touchAction: "none",
            }}
        >
            <div
                className="card border shadow-sm"
                style={{
                    width: size + 12,
                    height: size + 12,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "var(--bs-border-color)",
                }}
            >
                <img
                    src={food.image}
                    alt={food.nama}
                    draggable={false}
                    style={{
                        width: size,
                        height: size,
                        objectFit: "contain",
                        pointerEvents: "none",
                    }}
                />
            </div>
            <span
                className="text-body"
                style={{
                    fontSize: small ? ".65rem" : ".72rem",
                    fontWeight: 600,
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: size + 16,
                }}
            >
                {food.nama}
            </span>
        </motion.div>
    );
}
