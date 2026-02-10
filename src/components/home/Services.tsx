"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sun, Glasses, Component, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useTranslations, useLocale } from "next-intl";

export default function Services() {
    const t = useTranslations('Home.Services');
    const locale = useLocale();
    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 container mx-auto px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16"
            >
                <div>
                    <span className="text-primary text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4 block">{t('sectionTitle')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                        {t('headline')} <br />
                        <span className="text-neutral-500">{t('headlineSubtitle')}</span>
                    </h2>
                </div>
                <Link href={`/${locale}/vision`} className="group flex items-center gap-2 text-white hover:text-primary transition-colors mt-6 md:mt-0">
                    <span className="text-base sm:text-lg">{t('viewAllButton')}</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 sm:gap-6 h-auto md:h-[800px]">

                {/* 1. Vision Correction (Large) */}
                <Link href={`/${locale}/vision`} className="col-span-1 md:col-span-2 md:row-span-2 group relative rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/10 hover:border-primary/50 transition-all duration-500 min-h-[400px] sm:min-h-[500px]">
                    <div className="absolute inset-0 bg-[url('/images/vision-correction-bg.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 lg:p-14 w-full">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="bg-primary/20 backdrop-blur-md w-fit px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 border border-primary/20">
                                    <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">{t('visionCorrection.badge')}</span>
                                </div>
                                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">{t('visionCorrection.title')}</h3>
                                <p className="text-neutral-300 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 whitespace-pre-line">
                                    {t('visionCorrection.description')}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* 2. Cataract (Square) */}
                <Link href={`/${locale}/cataract`} className="col-span-1 md:col-span-1 md:row-span-1 group relative rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white text-black hover:bg-neutral-100 transition-colors min-h-[300px] sm:min-h-[350px] md:min-h-0">
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-neutral-300 group-hover:text-black transition-colors duration-500">
                        <Sun className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('presbyopiaCataract.title')} <br /> {t('presbyopiaCataract.titleLine2')}</h3>
                        <p className="text-neutral-500 text-sm sm:text-base md:text-lg font-bold tracking-wide">{t('presbyopiaCataract.subtitle')}</p>
                    </div>
                    {/* Reveal Text */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-black font-bold text-base sm:text-lg md:text-xl">{t('presbyopiaCataract.hoverText')}</span>
                    </div>
                </Link>

                {/* 3. Eye Disease (Square) */}
                <Link href={`/${locale}/center`} className="col-span-1 md:col-span-1 md:row-span-1 group relative rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-[#151515] border border-white/5 hover:border-white/20 transition-all min-h-[300px] sm:min-h-[350px] md:min-h-0">
                    <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <Component className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                            <span className="bg-white/10 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs text-white">{t('eyeDisease.badge')}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">{t('eyeDisease.title')} <br /> {t('eyeDisease.titleLine2')}</h3>
                            <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-bold mb-1.5 sm:mb-2">{t('eyeDisease.subtitle')}</p>
                            <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium">{t('eyeDisease.description')}</p>
                        </div>
                    </div>
                </Link>

            </div>
        </section>
    );
}
