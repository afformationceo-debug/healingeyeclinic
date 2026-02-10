"use client";

import { motion } from "framer-motion";
import { Shield, User, HeartPulse } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [Shield, User, HeartPulse];

export default function Philosophy() {
    const t = useTranslations('About.Philosophy');
    return (
        <section className="py-16 sm:py-20 md:py-32 bg-neutral-950 text-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20">
                    <div className="md:w-1/2 md:sticky md:top-32 h-fit">
                        <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase block mb-3 sm:mb-4 text-sm sm:text-base">{t('sectionTitle')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6 sm:mb-8">
                            {t('headline')}<br />
                            {t('headlineSubtitle')}
                        </h2>
                        <div className="w-16 sm:w-20 h-1 bg-primary mb-6 sm:mb-8" />
                        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                            {t('description')}
                        </p>
                    </div>

                    <div className="md:w-1/2 space-y-8 sm:space-y-10 md:space-y-12">
                        {icons.map((IconComponent, i) => {
                            const stats = t.raw(`values.${i}.stats`) as Array<{ label: string; value: string }>;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    className="border border-white/10 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-7 md:p-8 lg:p-10 bg-neutral-900/50 backdrop-blur-sm hover:border-primary/30 hover:bg-neutral-900/80 transition-all duration-500 group"
                                >
                                    {/* Icon & Badge */}
                                    <div className="flex items-start justify-between mb-5 sm:mb-6">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                                            <IconComponent size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors duration-500">
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                        {t(`values.${i}.title`)}
                                    </h3>
                                    <p className="text-neutral-500 text-xs sm:text-sm font-bold mb-3 sm:mb-4 uppercase tracking-wider">
                                        {t(`values.${i}.subtitle`)}
                                    </p>

                                    {/* Description */}
                                    <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light mb-6 sm:mb-8">
                                        {t(`values.${i}.description`)}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-white/5">
                                        {stats.map((stat, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
