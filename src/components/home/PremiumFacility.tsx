"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function PremiumFacility() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-black overflow-hidden flex items-center justify-center">

            {/* Parallax Background Video/Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.pexels.com/photos/2079237/pexels-photo-2079237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Premium Lounge"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div style={{ opacity }}>
                    <span className="text-primary font-bold tracking-[0.5em] uppercase block mb-8 text-sm md:text-base">Premium Lounge</span>
                    <h2 className="text-5xl md:text-8xl font-serif text-white font-light mb-12 leading-tight">
                        Relaxation <br />
                        <span className="italic">Before Perfection</span>
                    </h2>
                    <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                        수술을 앞둔 긴장감조차 설렘으로 바뀌는 공간.<br />
                        힐링안과의 프리미엄 라운지는 5성급 호텔의 품격을 담았습니다.<br />
                        최상의 컨디션으로 새로운 시력을 맞이하세요.
                    </p>
                </motion.div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-20 left-10 md:left-20 text-white/50 text-xs tracking-widest uppercase rotate-90 origin-left">
                Architecture & Interior Design
            </div>
        </section>
    );
}
