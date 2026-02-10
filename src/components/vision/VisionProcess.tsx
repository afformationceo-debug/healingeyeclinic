"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Shield, Eye, CheckCircle2, ScanEye } from "lucide-react";
import { useTranslations } from "next-intl";

export default function VisionProcess() {
    const t = useTranslations('Vision.Process');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const steps = t.raw('steps') as Array<{
        time: string;
        title: string;
        desc: string;
    }>;

    const icons = [<ScanEye key="scan" />, <Clock key="clock" />, <Eye key="eye" />, <CheckCircle2 key="check" />, <Shield key="shield" />];

    return (
        <section ref={containerRef} className="py-16 sm:py-20 md:py-32 bg-neutral-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">

                <div className="mb-16 sm:mb-20 md:mb-24 text-center">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-3 sm:mb-4 text-sm sm:text-base">{t('sectionTitle')}</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 px-4">
                        {t('headline').split(',')[0]}, <span className="text-primary">{t('headline').split(',')[1]?.trim()}</span><br />
                        {t('headlineHighlight')}
                    </h2>
                    <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed px-4 whitespace-pre-line">
                        {t('description')}
                    </p>
                </div>

                {/* Timeline Graphic */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Line */}
                    <div className="absolute left-[60px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

                    <div className="space-y-16 sm:space-y-20 md:space-y-24">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                {/* Content */}
                                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                    <span className="text-primary font-mono text-base sm:text-lg md:text-xl mb-2 block">{step.time}</span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">{step.desc}</p>
                                </div>

                                {/* Icon Point */}
                                <div className="absolute left-[45px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border-2 border-primary text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] z-10">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6">
                                        {icons[i]}
                                    </div>
                                </div>

                                {/* Empty Space for alignment */}
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
