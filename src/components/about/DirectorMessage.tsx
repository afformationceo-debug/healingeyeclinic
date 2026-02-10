"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function DirectorMessage() {
    const t = useTranslations('About.DirectorMessage');
    const paragraphs = t.raw('paragraphs') as string[];

    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 items-center">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 relative w-full"
                    >
                        <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden relative transition-all duration-700">
                            <Image
                                src="/images/doctors/1.png"
                                alt="Dr. Kim Sun-young"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
                                <span className="block text-primary font-bold tracking-wider sm:tracking-widest uppercase mb-1 sm:mb-2 text-xs sm:text-sm">{t('representativeDirector')}</span>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">{t('doctorName')}</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="md:w-1/2 space-y-6 sm:space-y-8 md:space-y-10"
                    >
                        <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase block text-sm sm:text-base">{t('sectionTitle')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                            &quot;{t('headline')}<br />
                            {t('headlineSubtitle')}&quot;
                        </h2>

                        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed">
                            <p>
                                {t('greeting')}
                            </p>
                            {paragraphs.map((paragraph, index) => (
                                <p key={index}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
