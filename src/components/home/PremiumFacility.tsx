"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// 시설 이미지 배열
const facilityImages = [
    "/images/facility/1.jpeg",
    "/images/facility/2.jpeg",
    "/images/facility/3.jpeg",
    "/images/facility/4.png",
    "/images/facility/5.jpeg"
];

export default function PremiumFacility() {
    const t = useTranslations("Home.PremiumFacility");
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    // Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // 활성 슬라이드 추적
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        onSelect(); // 초기 선택

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    return (
        <section ref={containerRef} className="relative py-16 sm:py-20 md:py-32 lg:py-40 bg-black overflow-hidden">

            {/* Parallax Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/healingeye-main10f.jpeg"
                    alt={t("backgroundAlt")}
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header Section */}
                <motion.div style={{ opacity }} className="text-center mb-16">
                    <span className="text-primary font-bold tracking-[0.5em] uppercase block mb-8 text-xs sm:text-sm md:text-base">{t("sectionTitle")}</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-white font-bold mb-12 leading-tight">
                        {t("headline")} <br />
                        <span className="italic">{t("headlineSubtitle")}</span>
                    </h2>
                    <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed font-light whitespace-pre-line">
                        {t("description")}
                    </p>
                </motion.div>

                {/* Facility Gallery Carousel */}
                <div className="relative mt-20">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t("galleryTitle")}</h3>
                        <div className="flex gap-4">
                            <Button
                                onClick={scrollPrev}
                                variant="outline"
                                size="icon"
                                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Button>
                            <Button
                                onClick={scrollNext}
                                variant="outline"
                                size="icon"
                                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 sm:-ml-6">
                            {facilityImages.map((imageSrc, index) => (
                                <div key={index} className="flex-[0_0_85%] md:flex-[0_0_38%] lg:flex-[0_0_30%] min-w-0 pl-4 sm:pl-6">
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="relative aspect-[4/3] rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 group min-h-[300px] sm:min-h-[400px]"
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt={`${t("facilityAlt")} ${index + 1}`}
                                            fill
                                            className={`object-cover group-hover:scale-105 transition-all duration-700 ${
                                                isMobile
                                                    ? (index === selectedIndex ? '' : 'grayscale group-hover:grayscale-0')
                                                    : (index === (selectedIndex + 1) % facilityImages.length ? '' : 'grayscale group-hover:grayscale-0')
                                            }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-20 left-10 md:left-20 text-white/50 text-[10px] sm:text-xs tracking-widest uppercase rotate-90 origin-left">
                {t("floatingText")}
            </div>
        </section>
    );
}
