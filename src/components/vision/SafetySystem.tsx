"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Activity, Database, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap = [
    <BadgeCheck key="badgecheck" size={32} className="sm:w-9 sm:h-9" />,
    <Database key="database" size={32} className="sm:w-9 sm:h-9" />,
    <Activity key="activity" size={32} className="sm:w-9 sm:h-9" />,
    <Shield key="shield" size={32} className="sm:w-9 sm:h-9" />,
    <Eye key="eye" size={32} className="sm:w-9 sm:h-9" />
];

export default function SafetySystem() {
    const t = useTranslations('Vision.SafetySystem');
    const items = t.raw('items') as Array<{ title: string; desc: string }>;
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-neutral-950 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16 sm:mb-20 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.2em] uppercase block mb-4 text-xs sm:text-sm"
                    >
                        {t('sectionTitle')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-3xl md:text-5xl font-serif text-white font-bold"
                    >
                        {t('headline')} <br className="md:hidden" />
                        <span className="text-neutral-500">{t('headlineHighlight')}</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-6 sm:p-7 md:p-8 rounded-2xl group hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-black transition-all mb-5 sm:mb-6">
                                {iconMap[i]}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">{item.title}</h3>
                            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed keep-all">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
