"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-center items-center">

            {/* Background Video Layer */}
            <motion.div
                style={{ scale: videoScale }}
                className="absolute inset-0 z-0"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale-[30%] contrast-125 block"
                >
                    <source src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Massive Kinetic Typography - Editorial Style */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between py-20 px-6 md:px-12 pointer-events-none mix-blend-difference text-white">

                {/* Top Bar */}
                <div className="flex justify-between items-start">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
                    >
                        ( Healing Eye Clinic )
                        <br />
                        Gangnam, Seoul
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-right text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
                    >
                        Est. 2016
                        <br />
                        Kim Sun-young
                    </motion.div>
                </div>

                {/* Center Massive Text */}
                <div className="flex flex-col items-center justify-center flex-1">
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12vw] md:text-[14vw] font-black leading-[0.85] tracking-tighter text-center whitespace-nowrap"
                    >
                        HEALING
                        <br />
                        <span className="italic font-serif font-light">EYE</span>
                    </motion.h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <p className="max-w-xs text-xs md:text-sm leading-relaxed opacity-80">
                            We redefine the standard of vision correction with
                            uncompromising precision and safety.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="pointer-events-auto"
                    >
                        <Button className="rounded-full w-24 h-24 md:w-32 md:h-32 bg-primary text-black font-bold text-lg hover:scale-110 transition-transform duration-300 flex flex-col gap-1 items-center justify-center border-none">
                            <span>BOOK</span>
                            <span className="text-xs font-normal">NOW</span>
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Editorial Grid Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-12 w-[1px] h-full bg-white/10 hidden md:block" />
                <div className="absolute top-0 right-12 w-[1px] h-full bg-white/10 hidden md:block" />
                <div className="absolute top-20 left-0 w-full h-[1px] bg-white/10" />
                <div className="absolute bottom-20 left-0 w-full h-[1px] bg-white/10" />
            </div>

        </section>
    );
}
