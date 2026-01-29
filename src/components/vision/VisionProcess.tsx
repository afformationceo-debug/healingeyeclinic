"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Shield, Eye, CheckCircle2 } from "lucide-react";

export default function VisionProcess() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={containerRef} className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                <div className="mb-24 text-center">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-4">Recovery System</span>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        수술 후 <span className="text-primary">24시간</span>,<br />
                        당신의 일상은 멈추지 않습니다.
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        힐링안과의 스마일라식은 각막 손상을 최소화하여<br />
                        수술 다음 날부터 세안, 샤워, 가벼운 운동이 가능합니다.
                    </p>
                </div>

                {/* Timeline Graphic */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

                    <div className="space-y-24">
                        {[
                            { time: "AM 10:00", title: "수술 당일", desc: "수술 시간 10분, 회복실 1시간 휴식 후 즉시 귀가", icon: <Clock /> },
                            { time: "PM 02:00", title: "귀가 후 휴식", desc: "마취가 풀려도 이물감이 거의 없으며 편안한 휴식 가능", icon: <Eye /> },
                            { time: "Next Day", title: "수술 다음 날", desc: "목표 시력 90% 회복, 세안 및 기초 화장, 출근 가능", icon: <CheckCircle2 /> },
                            { time: "1 Week", title: "일주일 후", desc: "가벼운 운동 및 거의 모든 일상생활 가능 (음주/흡연 제외)", icon: <Shield /> }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                {/* Content */}
                                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                    <span className="text-primary font-mono text-xl mb-2 block">{step.time}</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
                                </div>

                                {/* Icon Point */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 border border-primary text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] z-10">
                                    {step.icon}
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
