"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const equipmentImages = [
    { img: "/images/center/equipment/amaris-spt.png", needsWhiteBg: true },
    { img: "/images/center/equipment/galilei-g4.png", needsWhiteBg: false },
    { img: "/images/center/equipment/pentacam-hr.png", needsWhiteBg: false },
    { img: "/images/center/equipment/3d-oct-1.png", needsWhiteBg: false },
    { img: "/images/center/equipment/optos-daytona.png", needsWhiteBg: false },
    { img: "/images/center/equipment/femto-ldv-z8.png", needsWhiteBg: true },
    { img: "/images/center/equipment/iol-master-700.png", needsWhiteBg: false },
    { img: "/images/center/equipment/callisto-eye.png", needsWhiteBg: false },
    { img: "/images/center/equipment/lumera-700.png", needsWhiteBg: false }
];

export default function EquipmentShowcase() {
    const t = useTranslations('Center.Equipment');
    const equipment = t.raw('items') as Array<{
        name: string;
        tag: string;
        desc: string;
        specs: string[];
    }>;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-16 sm:py-20 md:py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 mb-12">
                <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block">{t('sectionTitle')}</span>
                <div className="flex justify-between items-end">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white font-bold max-w-2xl leading-tight">
                        {t('headline')} <br />
                        {t('headlineSubtitle')}
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-3">
                        <Button
                            onClick={scrollPrev}
                            disabled={!prevBtnEnabled}
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                        >
                            <ChevronLeft size={20} className="md:w-6 md:h-6" />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            disabled={!nextBtnEnabled}
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                        >
                            <ChevronRight size={20} className="md:w-6 md:h-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-3 sm:gap-4 md:gap-6 pl-4 sm:pl-6 md:pl-[10vw]">
                    {equipment.map((item, i) => (
                        <div key={i} className="flex-[0_0_90%] md:flex-[0_0_600px] aspect-[16/9] relative rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden group border border-white/10">
                            <div className={`absolute inset-0 ${equipmentImages[i]?.needsWhiteBg ? 'bg-white' : 'bg-neutral-900'}`}>
                                <img src={equipmentImages[i]?.img} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-12">
                                <span className="bg-primary text-black text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3 md:mb-4 inline-block">{item.tag}</span>
                                <h3 className="text-base sm:text-lg md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{item.name}</h3>
                                <p className="text-neutral-300 leading-snug sm:leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-md text-xs sm:text-sm md:text-base line-clamp-3 md:line-clamp-none">
                                    {item.desc}
                                </p>

                                <div className="flex gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
                                    {item.specs.map((spec, s_i) => (
                                        <div key={s_i} className="border border-white/20 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs font-mono text-neutral-400">
                                            {spec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {equipment.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => emblaApi?.scrollTo(idx)}
                        className={`h-2 rounded-full transition-all ${
                            idx === selectedIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                    />
                ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center gap-3 mt-8">
                <Button
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                >
                    <ChevronLeft size={20} />
                </Button>
                <Button
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                >
                    <ChevronRight size={20} />
                </Button>
            </div>
        </section>
    );
}
