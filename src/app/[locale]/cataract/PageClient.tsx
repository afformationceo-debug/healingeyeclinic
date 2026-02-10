"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CataractCheck from "@/components/cataract/CataractCheck";
import LensGuide from "@/components/cataract/LensGuide";
import LifestyleMatch from "@/components/cataract/LifestyleMatch";
import AgingProcess from "@/components/cataract/AgingProcess";
import { useTranslations } from "next-intl";

export default function CataractPageClient() {
    const t = useTranslations('Cataract.HeroPage');

    return (
        <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#f5f5f0]">
            {/* Header - Magazine Style with Video */}
            <section className="relative h-screen flex flex-col justify-end pb-20 overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover grayscale brightness-50"
                    >
                        {/* Abstract Fluid / Tech Background */}
                        <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="border-b border-white/20 pb-8 sm:pb-10 md:pb-12"
                    >
                        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block text-primary shadow-black drop-shadow-lg">{t('badge')}</span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-serif font-medium leading-[0.9] text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-xl">
                            {t('title1')} <br /> {t('title2')}
                        </h1>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 sm:gap-8">
                            <div>
                                <p className="max-w-xl text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light mb-4 sm:mb-6 md:mb-8 drop-shadow-md">
                                    {t('description1')}<br className="hidden sm:block" />
                                    <strong className="font-bold bg-gradient-to-r from-amber-300 via-primary to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">{t('description2')}</strong>
                                </p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 md:mb-8 text-white">{t('subtitle')}</h2>
                                <Button size="lg" className="rounded-full px-6 sm:px-8 md:px-12 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg bg-white text-black hover:bg-primary transition-colors font-bold">
                                    {t('ctaButton')} &rarr;
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AgingProcess />
            <CataractCheck />
            <LifestyleMatch />
            <LensGuide />
        </div>
    );
}
