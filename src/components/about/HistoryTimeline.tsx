"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

interface HistoryItem {
    year: string;
    title: string;
    desc: string;
}

export default function HistoryTimeline() {
    const t = useTranslations('About.History');
    const historyData = t.raw('items') as HistoryItem[];
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <>
            {/* Desktop: Horizontal Scroll */}
            <section ref={targetRef} className="hidden md:block h-[300vh] bg-black relative">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                        <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase block mb-3 sm:mb-4 text-sm sm:text-base">{t('sectionLabel')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">{t('headline')}</h2>
                    </div>

                    <div className="w-full relative">
                        <motion.div style={{ x }} className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 pl-4 sm:pl-6 md:pl-[20vw] items-center">
                            {historyData.map((item, i) => (
                                <div key={i} className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] shrink-0 group">
                                    <div className="border-t border-white/20 pt-6 sm:pt-8 md:pt-10 relative">
                                        <div className="absolute top-[-4px] sm:top-[-5px] left-0 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full ring-2 sm:ring-4 ring-black" />
                                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white/5 group-hover:text-primary/20 transition-colors duration-500 absolute -top-12 sm:-top-16 md:-top-20 left-0 -z-10">
                                            {item.year}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 flex items-baseline gap-3 sm:gap-4">
                                            {item.year}
                                            <span className="text-xs sm:text-sm font-light text-neutral-500 tracking-normal hidden md:inline-block">/ {t('historyLabel')}</span>
                                        </h3>
                                        <h4 className="text-lg sm:text-xl md:text-2xl text-primary font-bold mb-2 sm:mb-3 md:mb-4">{item.title}</h4>
                                        <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mobile: Vertical Stack */}
            <section className="block md:hidden py-16 sm:py-20 bg-black relative">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-12">
                        <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-3 text-sm">{t('sectionLabel')}</span>
                        <h2 className="text-3xl font-serif font-bold text-white">{t('headline')}</h2>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Vertical line */}
                        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

                        {historyData.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative pl-10"
                            >
                                {/* Dot */}
                                <div className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full ring-4 ring-black" />

                                {/* Content */}
                                <div className="border-l-2 border-white/10 pl-6 pb-8">
                                    <span className="text-4xl font-black text-white/10 block mb-2">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {item.year}
                                    </h3>
                                    <h4 className="text-lg text-primary font-bold mb-2">{item.title}</h4>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
