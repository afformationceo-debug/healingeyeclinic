"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0.1, 0.9], ["100%", "-100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={targetRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-32 bg-black/50">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-24"
                >
                    <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">우리의 철학</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white font-light leading-relaxed">
                        "눈을 치료하는 것을 넘어 <br /> <span className="text-primary font-normal">당신의 삶을 치유합니다.</span>"
                    </h2>
                    <p className="text-neutral-400 mt-6 max-w-2xl mx-auto leading-loose">
                        단순히 시력을 교정하는 것이 아닙니다.<br />
                        아침에 눈을 뜨는 순간부터 잠들 때까지, 당신이 마주할 모든 세상을<br />
                        더 선명하고 아름답게 만드는 것. 그것이 힐링안과의 약속입니다.
                    </p>
                </motion.div>

                {/* Moving Text Stream */}
                <div className="w-full overflow-hidden py-10 border-y border-white/5">
                    <motion.div style={{ x }} className="whitespace-nowrap flex items-center gap-16">
                        <span className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter">BEYOND VISION</span>
                        <span className="text-6xl md:text-8xl font-serif text-primary/20 tracking-tighter italic">HEALING LIFE</span>
                        <span className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter">PREMIUM CARE</span>
                        <span className="text-6xl md:text-8xl font-serif text-primary/20 tracking-tighter italic">MASTERPIECE</span>
                        <span className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter">BEYOND VISION</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-center md:text-left">
                    {[
                        { title: "초정밀 (Precision)", desc: "2mm 최소 절개, 0.01D 오차 없는 완벽함으로 가장 안전한 시력을 선물합니다." },
                        { title: "안전 (Safety)", desc: "대학병원 교수 출신 의료진의 3중 더블체크 시스템으로 부작용 0%에 도전합니다." },
                        { title: "공감 (Empathy)", desc: "수술실의 차가운 공기가 아닌, 따뜻한 힐링의 공간에서 당신을 맞이합니다." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                                {i + 1}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
