"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MedicalTeam() {
    const t = useTranslations("Home.MedicalTeam");

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps"
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const doctors = [
        {
            name: t("doctors.0.name"),
            position: t("doctors.0.position"),
            title: t("doctors.0.title"),
            specialty: t("doctors.0.specialty"),
            desc: t("doctors.0.description"),
            career: [
                t("doctors.0.career.0"),
                t("doctors.0.career.1"),
                t("doctors.0.career.2"),
                t("doctors.0.career.3"),
                t("doctors.0.career.4"),
                t("doctors.0.career.5"),
                t("doctors.0.career.6"),
                t("doctors.0.career.7"),
                t("doctors.0.career.8"),
                t("doctors.0.career.9"),
                t("doctors.0.career.10")
            ],
            img: "/images/doctors/1.png"
        },
        {
            name: t("doctors.1.name"),
            position: t("doctors.1.position"),
            title: t("doctors.1.title"),
            specialty: t("doctors.1.specialty"),
            desc: t("doctors.1.description"),
            career: [t("doctors.1.career.0"), t("doctors.1.career.1"), t("doctors.1.career.2"), t("doctors.1.career.3")],
            img: "/images/doctors/2.png"
        },
        {
            name: t("doctors.2.name"),
            position: t("doctors.2.position"),
            title: t("doctors.2.title"),
            specialty: t("doctors.2.specialty"),
            desc: t("doctors.2.description"),
            career: [
                t("doctors.2.career.0"),
                t("doctors.2.career.1"),
                t("doctors.2.career.2"),
                t("doctors.2.career.3"),
                t("doctors.2.career.4"),
                t("doctors.2.career.5"),
                t("doctors.2.career.6"),
                t("doctors.2.career.7"),
                t("doctors.2.career.8"),
                t("doctors.2.career.9")
            ],
            img: "/images/doctors/3.png"
        }
    ];

    return (
        <section className="bg-neutral-950 relative py-16 sm:py-20 md:py-32 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 md:mb-20">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-4">{t("sectionTitle")}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
                            {t("headline")} <br />
                            <span className="text-neutral-500 italic">{t("headlineSubtitle")}</span>
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-3 sm:gap-4 mt-8 md:mt-0">
                        <motion.button
                            onClick={scrollPrev}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
                        >
                            <ChevronLeft className="text-white group-hover:text-black transition-colors" size={24} />
                        </motion.button>
                        <motion.button
                            onClick={scrollNext}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
                        >
                            <ChevronRight className="text-white group-hover:text-black transition-colors" size={24} />
                        </motion.button>
                    </div>
                </div>

                {/* Embla Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6 sm:gap-8 md:gap-12">
                        {doctors.map((doc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative flex-[0_0_90%] md:flex-[0_0_650px] group cursor-grab active:cursor-grabbing"
                            >
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative bg-white rounded-[2rem] border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                                >
                                    {/* Doctor Image */}
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                        <Image
                                            src={doc.img}
                                            alt={doc.name}
                                            fill
                                            sizes="(max-width: 768px) 90vw, 650px"
                                            className="object-cover object-top transition-all duration-700 scale-100 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-8 left-8 z-20">
                                            <div className="flex flex-col gap-2 mb-2">
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3">
                                                    <span className="bg-primary text-black text-xs sm:text-sm font-bold px-3 py-1 rounded-full w-fit">{doc.position}</span>
                                                </div>
                                                <span className="text-white/80 text-sm font-medium">{doc.title}</span>
                                            </div>
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{doc.name}</h3>
                                        </div>
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="p-6 sm:p-7 md:p-8 space-y-6">
                                        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-serif leading-relaxed">
                                            &ldquo;{doc.desc}&rdquo;
                                        </p>
                                        <div className="border-t border-gray-200 pt-6">
                                            <h4 className="text-sm text-primary font-bold tracking-wider uppercase mb-4">{t("careerTitle")}</h4>
                                            <ul className="space-y-3">
                                                {doc.career.map((c, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                        <span className="flex-1">{c}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
