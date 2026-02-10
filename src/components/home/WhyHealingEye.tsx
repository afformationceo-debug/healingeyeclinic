"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function WhyHealingEye() {
    const locale = useLocale();
    const t = useTranslations('Home.WhyHealingEye');
    const reviewUrl = locale === 'ko'
        ? 'https://map.naver.com/p/entry/place/1217790716?placePath=/review'
        : 'https://maps.app.goo.gl/jny3xdknHpJ2ggnW6';

    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-black">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase block mb-3 sm:mb-4 text-xs sm:text-sm">{t('sectionTitle')}</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                            {t('headline')}<br />
                            <span className="text-neutral-400">{t('headlineSubtitle')}</span>
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-0 w-full sm:w-auto">
                        <motion.a
                            href={reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 cursor-pointer text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(212, 175, 55, 0)",
                                    "0 0 0 8px rgba(212, 175, 55, 0.1)",
                                    "0 0 0 0 rgba(212, 175, 55, 0)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            <span className="font-bold text-sm sm:text-base">{t('stats.rating')}</span> <span className="text-xs sm:text-sm opacity-70">{t('stats.ratingLabel')}</span>
                        </motion.a>
                        <Link href={`/${locale}/community`} passHref legacyBehavior>
                            <motion.a
                                className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 cursor-pointer text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(212, 175, 55, 0)",
                                        "0 0 0 8px rgba(212, 175, 55, 0.1)",
                                        "0 0 0 0 rgba(212, 175, 55, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                <span className="font-bold text-sm sm:text-base">{t('stats.cases')}</span> <span className="text-xs sm:text-sm opacity-70">{t('stats.casesLabel')}</span>
                            </motion.a>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        {
                            titleKey: "faculty",
                            icon: <Award className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                        },
                        {
                            titleKey: "equipment",
                            icon: <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                        },
                        {
                            titleKey: "guarantee",
                            icon: <HeartHandshake className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-6 sm:p-7 md:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-neutral-50 hover:bg-neutral-900 hover:text-white transition-all duration-500 group"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center mb-6 sm:mb-7 md:mb-8 shadow-sm group-hover:bg-white/10 group-hover:text-white">
                                {item.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-2">{t(`features.${item.titleKey}.titleEng`)}</h3>
                            <p className="text-base sm:text-lg font-bold text-neutral-500 mb-4 sm:mb-5 md:mb-6 group-hover:text-neutral-400">{t(`features.${item.titleKey}.subtitle`)}</p>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed group-hover:text-neutral-300 transition-colors whitespace-pre-line">
                                {t(`features.${item.titleKey}.description`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
