"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TreatmentProcess() {
    const t = useTranslations('Center.TreatmentProcess');
    const steps = t.raw('steps') as Array<{ title: string; desc: string }>;
    return (
        <section className="py-16 sm:py-20 border-t border-white/10">
            {/* Desktop: Original Layout (unchanged) */}
            <div className="hidden md:block">
                <h2 className="text-3xl font-bold text-white mb-16 text-center">{t('headline')}</h2>

                <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-0">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block -translate-y-1/2 z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 text-center group w-full md:w-auto">
                            <div className="w-16 h-16 mx-auto bg-neutral-900 border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                {i + 1}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-sm text-neutral-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile: Vertical Timeline (new mobile-optimized layout) */}
            <div className="block md:hidden container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase mb-3 block text-xs">{t('sectionTitle')}</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">{t('headline')}</h2>
                    <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-white/20 to-primary/0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="relative pl-20 pb-12 last:pb-0"
                        >
                            {/* Number Circle */}
                            <div className="absolute left-0 top-0 w-16 h-16 bg-neutral-900 border-2 border-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                                {i + 1}
                            </div>

                            {/* Card Content */}
                            <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-primary/30 hover:bg-neutral-900/80 transition-all duration-300">
                                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
