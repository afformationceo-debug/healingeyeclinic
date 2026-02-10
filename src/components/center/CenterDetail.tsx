"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProgramItem {
    title: string;
    desc: string;
    details: string[];
}

export default function CenterDetail() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const t = useTranslations('Center.Programs');

    const programs = t.raw('items') as ProgramItem[];

    return (
        <section className="py-32 bg-neutral-950 text-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20">
                <div className="w-full md:w-1/3">
                    <span className="text-primary font-bold tracking-widest uppercase block mb-4">{t('sectionTitle')}</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        {t('headline')}<br />
                        <span className="text-neutral-500">{t('headlineHighlight')}</span>
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="w-full md:w-2/3 space-y-4">
                    {programs.map((item, i) => (
                        <div key={i} className="border-b border-white/10 pb-4">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center py-6 text-left group"
                            >
                                <h3 className={`text-2xl font-bold transition-colors ${openIndex === i ? "text-primary" : "text-white group-hover:text-primary"}`}>
                                    {item.title}
                                </h3>
                                <div className={`p-2 rounded-full border transition-all ${openIndex === i ? "border-primary text-primary rotate-180" : "border-white/20 text-white"}`}>
                                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pt-2">
                                            <p className="text-neutral-300 text-lg leading-relaxed mb-6">{item.desc}</p>
                                            <div className="flex flex-wrap gap-3">
                                                {item.details.map((det, idx) => (
                                                    <span key={idx} className="px-4 py-2 bg-white/5 rounded-full text-sm text-primary font-medium border border-primary/20">
                                                        {det}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
