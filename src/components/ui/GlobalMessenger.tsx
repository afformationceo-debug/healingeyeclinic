"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const messengers = [
    {
        name: "KakaoTalk",
        color: "bg-[#FAE100] text-[#371D1E]",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 3C5.925 3 1 6.925 1 11.775C1 14.75 2.875 17.375 5.75 18.95C5.275 20.625 4.25 24 4.25 24C4.25 24 8.5 22.875 11.5 20.625L12 20.625C18.075 20.625 23 16.7 23 11.775C23 6.925 18.075 3 12 3Z" />
            </svg>
        )
    },
    {
        name: "LINE",
        color: "bg-[#06C755] text-white",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M19.34 5.46C15.34 2.2 9.17 2.05 4.67 5.45C-0.34 9.24 -0.34 16.09 4.67 19.88C6.91 21.58 9.94 22.34 12.87 21.68C13.43 21.55 14.28 21.84 14.73 22.54C14.78 22.61 15.39 23.95 15.42 24C15.46 24.11 15.54 24.16 15.63 24.16C15.79 24.16 15.91 24.04 15.94 23.86C16.1 22.97 16.59 20.25 18.94 18.86C23.08 16.29 23.97 10.33 19.34 5.46Z" />
            </svg>
        )
    },
    {
        name: "WhatsApp",
        color: "bg-[#25D366] text-white",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382C17.11 14.201 15.334 13.332 15.002 13.221C14.67 13.11 14.428 13.055 14.186 13.417C13.944 13.78 13.25 14.595 13.04 14.836C12.828 15.077 12.617 15.107 12.255 14.927C11.893 14.746 10.728 14.364 9.346 13.133C8.258 12.164 7.523 10.967 7.311 10.605C7.1 10.243 7.29 10.047 7.471 9.867C7.632 9.706 7.834 9.445 8.015 9.233C8.196 9.022 8.257 8.871 8.378 8.63C8.498 8.389 8.438 8.178 8.348 7.997C8.257 7.816 7.533 6.035 7.231 5.311C6.919 4.607 6.618 4.707 6.407 4.707C6.216 4.707 5.995 4.707 5.753 4.707C5.512 4.707 5.12 4.797 4.788 5.159C4.456 5.521 3.52 6.406 3.52 8.206C3.52 10.006 4.828 11.746 5.029 12.018C5.23 12.29 7.644 16.012 11.396 17.631C14.07 18.788 14.633 18.556 15.176 18.506C15.78 18.456 17.02 17.792 17.281 17.058C17.542 16.324 17.542 15.7 17.472 15.58C17.402 15.459 17.22 15.399 16.858 15.218H17.472V14.382ZM12.043 21.655C10.264 21.655 8.614 21.192 7.18 20.248L7.15 20.218L3.259 21.244L4.315 17.513L4.285 17.463C3.259 15.833 2.716 13.953 2.716 11.977C2.716 6.819 6.899 2.626 12.053 2.626C14.547 2.626 16.88 3.591 18.64 5.361C20.4 7.131 21.365 9.474 21.365 11.977C21.365 17.135 17.182 21.328 12.023 21.64H12.043V21.655Z" />
            </svg>
        )
    },
];

export default function GlobalMessenger() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-6">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-4 items-end"
                    >
                        {messengers.map((app, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl ${app.color} transition-all`}
                                title={`Chat via ${app.name}`}
                            >
                                {app.icon}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${isOpen ? "bg-neutral-800 text-white" : "bg-primary text-black"}`}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
                </motion.div>
            </motion.button>
        </div>
    );
}
