"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BrandStory() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={targetRef} className="h-[200vh] bg-black relative">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x, opacity }} className="whitespace-nowrap flex text-[20vw] font-black text-white/5 leading-none select-none">
                    HEALING EYE HEALING EYE HEALING EYE
                </motion.div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-primary font-bold tracking-[0.5em] text-sm md:text-xl uppercase mb-8 block">Our Mission</span>
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                            More Than Vision,<br />
                            <span className="text-neutral-500 italic">We Design Your Life.</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            단순히 시력을 교정하는 것을 넘어,<br />
                            당신의 삶이 더 선명하고 아름다워질 수 있도록.<br />
                            힐링안과는 기술과 예술의 경계에서<br />
                            가장 완벽한 시력을 조각합니다.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
