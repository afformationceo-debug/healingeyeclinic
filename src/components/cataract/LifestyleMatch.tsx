"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Monitor, Book, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const iconMap: Record<string, React.ReactNode> = {
    active: <Sun size={36} />,
    digital: <Monitor size={36} />,
    daily: <Car size={36} />,
    reading: <Book size={36} />
};

export default function LifestyleMatch() {
    const t = useTranslations('Cataract.LifestyleMatch');
    const lifestyles = t.raw('lifestyles') as Array<{
        id: string;
        title: string;
        desc: string;
        recommendation: string;
    }>;
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <section className="py-16 sm:py-20 md:py-32 bg-white text-black relative">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16 md:mb-24">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4 sm:mb-6">
                        {t('headline')}
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto whitespace-pre-line">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
                    {lifestyles.map((style) => (
                        <motion.div
                            key={style.id}
                            onClick={() => setSelected(style.id)}
                            whileHover={{ y: -5 }}
                            className={`cursor-pointer p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 touch-manipulation ${selected === style.id ? "bg-black text-white border-black shadow-xl scale-105" : "bg-neutral-50 border-neutral-200 hover:border-black/30"}`}
                        >
                            <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center ${selected === style.id ? "bg-white/10 text-primary" : "bg-white text-neutral-400"}`}>
                                {iconMap[style.id]}
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">{style.title}</h3>
                                <p className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed ${selected === style.id ? "text-neutral-200" : "text-neutral-700"}`}>{style.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {selected && (
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-primary/10 p-6 sm:p-8 md:p-10 lg:p-14 rounded-xl sm:rounded-[2rem] text-center max-w-4xl mx-auto"
                        >
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                                <span className="bg-primary text-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full tracking-wide">{t('recommendationBadge')}</span>
                                <span className="tracking-tight">{t('recommendationTitle')}</span>
                            </h3>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold leading-relaxed sm:leading-loose tracking-wide mb-6 sm:mb-8 md:mb-10 text-neutral-800">
                                {lifestyles.find(l => l.id === selected)?.recommendation}
                            </p>
                            <Button className="rounded-full px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl bg-black text-white hover:bg-neutral-800 tracking-wide">
                                {t('ctaButton')} <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
