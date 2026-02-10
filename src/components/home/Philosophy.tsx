"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Philosophy() {
    const t = useTranslations('Home.Philosophy');
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0.1, 0.9], ["20%", "-120%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={targetRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-32 bg-black/50">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-24"
                >
                    <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">{t('sectionTitle')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-relaxed">
                        {t('mainQuote')} <br /> <span className="text-primary">{t('mainQuoteHighlight')}</span>
                    </h2>
                    <p className="text-neutral-400 mt-6 max-w-2xl mx-auto leading-loose whitespace-pre-line">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Moving Text Stream */}
                <div className="w-full overflow-hidden py-10 border-y border-white/5">
                    <motion.div style={{ x }} className="whitespace-nowrap flex items-center gap-16">
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white/5 tracking-tighter">{t('movingText.text1')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-primary/20 tracking-tighter italic">{t('movingText.text2')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white/5 tracking-tighter">{t('movingText.text3')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-primary/20 tracking-tighter italic">{t('movingText.text4')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white/5 tracking-tighter">{t('movingText.text1')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-primary/20 tracking-tighter italic">{t('movingText.text2')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white/5 tracking-tighter">{t('movingText.text3')}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-primary/20 tracking-tighter italic">{t('movingText.text4')}</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-24 text-center md:text-left">
                    {['precision', 'safety', 'empathy'].map((key, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-primary text-2xl font-bold group-hover:bg-primary group-hover:text-black transition-colors duration-500 mx-auto md:mx-0">
                                {i + 1}
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">{t(`values.${key}.title`)}</h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">{t(`values.${key}.description`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
