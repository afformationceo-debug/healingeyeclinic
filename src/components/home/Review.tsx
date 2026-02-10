"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Review() {
    const t = useTranslations('Home.Review');
    const reviews = t.raw('reviews') as Array<{
        name: string;
        age: string;
        surgery: string;
        content: string;
        date: string;
    }>;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Auto-play functionality
    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <section className="py-16 sm:py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(218,165,32,0.03),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 md:mb-16 gap-8"
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
                            {t('title')}
                            <span className="text-primary">.</span>
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={scrollPrev}
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-primary transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-primary transition-colors shadow-sm"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Button>
                    </div>
                </motion.div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 sm:-ml-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-4 sm:pl-6">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="bg-gray-50 border border-gray-200 p-6 sm:p-7 md:p-8 h-full rounded-xl sm:rounded-2xl flex flex-col justify-between group hover:border-primary/50 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <Quote className="text-primary/40 w-10 h-10 rotate-180" />
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" fill="#FCD34D" stroke="#FCD34D" />
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                                            {review.surgery}
                                        </h3>

                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                            "{review.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-900 font-bold text-xs">
                                            {review.name.slice(0, 1)}
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-bold">{review.name}</p>
                                            <p className="text-gray-500 text-xs">{review.age} · {review.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-gray-600 mb-6 text-base sm:text-lg font-light tracking-wide">
                            {t('ctaSubtitle')}
                        </p>
                        <Button
                            onClick={() => {
                                console.log('CTA clicked - will connect to booking modal/page later');
                                // TODO: Connect to booking modal or consultation page
                            }}
                            className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold text-base sm:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#FFD700]/30 transition-all duration-300 hover:scale-105 group"
                        >
                            <Calendar className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            {t('ctaButton')}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
