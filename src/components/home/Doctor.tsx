"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function Doctor() {
    const t = useTranslations('Home.Doctor');
    const locale = useLocale();
    const doctors = t.raw('doctors');

    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const currentDoctor = doctors[currentIndex];

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));
    };

    // Parse quote into parts for styling
    const parseQuote = (quote: string) => {
        const parts = quote.split(/(\b(?:seeing|diagnosis|children's vision)\b)/gi);
        return parts;
    };

    const getHighlightedQuote = () => {
        const quoteEng = currentDoctor.quoteEng;
        const highlight1 = currentDoctor.quoteHighlight1;
        const highlight2 = currentDoctor.quoteHighlight2;

        if (currentIndex === 0) {
            return (
                <>
                    "Vision is not just <br />
                    <span className="text-zinc-600">{highlight1}</span>, it is <br />
                    <span className="text-primary italic">{highlight2}</span>"
                </>
            );
        } else if (currentIndex === 1) {
            return (
                <>
                    "Precision in <br />
                    <span className="text-zinc-600">{highlight1}</span>, <br />
                    excellence in <span className="text-primary italic">{highlight2}</span>"
                </>
            );
        } else {
            return (
                <>
                    "Caring for <br />
                    <span className="text-zinc-600">{highlight1}</span>, <br />
                    securing their <span className="text-primary italic">{highlight2}</span>"
                </>
            );
        }
    };

    return (
        <section ref={containerRef} className="relative py-16 sm:py-20 md:py-32 overflow-hidden bg-zinc-950">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

            {/* Navigation Buttons */}
            <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
            >
                <ChevronLeft className="text-white group-hover:text-black transition-colors w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
            >
                <ChevronRight className="text-white group-hover:text-black transition-colors w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16"
                    >
                        {/* Cinematic Image Area */}
                        <div className="w-full md:w-5/12 relative group">
                            <motion.div
                                style={{ y }}
                                className="absolute -top-20 -left-20 w-full h-full border border-white/5 z-0 hidden lg:block"
                            />
                            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100">
                                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
                                <img
                                    src={currentDoctor.img}
                                    alt={currentDoctor.name}
                                    className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105"
                                />

                                <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 z-30">
                                    <p className="text-primary font-bold tracking-widest uppercase mb-2 text-xs sm:text-sm">
                                        {currentDoctor.positionEng}
                                    </p>
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold mb-1 drop-shadow-lg">
                                        {currentDoctor.nameEng}
                                    </h3>
                                    <p className="text-white/80 text-sm tracking-wide">
                                        {currentDoctor.title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="w-full md:w-7/12">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-6 sm:mb-8 md:mb-10 leading-[1.1]"
                            >
                                {getHighlightedQuote()}
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 border-t border-white/10 pt-8 sm:pt-12">
                                <div>
                                    <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">{t('mainCareer')}</h4>
                                    <motion.ul
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: {
                                                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                                            }
                                        }}
                                        className="space-y-2 sm:space-y-3 text-zinc-400 font-light text-sm sm:text-base tracking-wide"
                                    >
                                        {currentDoctor.career.map((item: string, idx: number) => (
                                            <motion.li
                                                key={idx}
                                                variants={{
                                                    hidden: { opacity: 0, x: -20 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                            >
                                                · {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>

                                <div>
                                    <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">{t('medicalPhilosophy')}</h4>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-zinc-400 leading-relaxed font-light mb-6 sm:mb-8 text-sm sm:text-base"
                                    >
                                        {currentDoctor.philosophy}
                                    </motion.p>
                                    <Link href={`/${locale}/about`}>
                                        <Button variant="link" className="text-white p-0 h-auto hover:text-primary transition-all text-base sm:text-lg group">
                                            {t('viewProfile')}
                                            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
