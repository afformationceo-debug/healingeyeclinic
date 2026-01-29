"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Doctor() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative py-40 overflow-hidden bg-zinc-950">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                    {/* Cinematic Image Area */}
                    <div className="w-full lg:w-5/12 relative group">
                        <motion.div
                            style={{ y }}
                            className="absolute -top-20 -left-20 w-full h-full border border-white/5 z-0 hidden lg:block"
                        />
                        <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-[2px]">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-20" />
                            <img
                                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Dr. Kim Sun-young"
                                className="w-full h-full object-cover grayscale transition-all duration-1000 scale-100 group-hover:scale-105 group-hover:grayscale-0"
                            />

                            <div className="absolute bottom-10 left-8 z-30">
                                <p className="text-primary font-bold tracking-widest uppercase mb-2 text-sm">Representative Director</p>
                                <h3 className="text-4xl lg:text-5xl font-serif text-white mb-4">Kim Sun-young</h3>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg"
                                    alt="signature"
                                    className="h-12 w-auto invert opacity-80"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full lg:w-7/12">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-7xl font-serif text-white mb-12 leading-[1.1]"
                        >
                            "Vision is not just <br />
                            <span className="text-zinc-600">seeing</span>, it is <br />
                            <span className="text-primary italic">experiencing.</span>"
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                            <div>
                                <h4 className="text-white font-bold mb-6 text-lg">Main Career</h4>
                                <ul className="space-y-3 text-zinc-400 font-light text-sm tracking-wide">
                                    <li>· M.D., Ph.D. Seoul National University</li>
                                    <li>· Adjunct Professor, SNU Hospital</li>
                                    <li>· Official Member, KSCRS / ASCRS / ESCRS</li>
                                    <li>· Certified SMILE PRO Surgeon (ZEISS)</li>
                                    <li>· Best Paper Award, KOS (2020)</li>
                                    <li>· Advisory Board, Alcon Korea</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold mb-6 text-lg">Medical Philosophy</h4>
                                <p className="text-zinc-400 leading-relaxed font-light mb-8">
                                    단 1%의 오차도 허용하지 않는 완벽주의.<br />
                                    대학병원 교수 출신의 풍부한 임상경험과<br />
                                    최첨단 장비에 대한 깊은 이해를 바탕으로,<br />
                                    당신의 생애 가장 맑은 순간을 찾아드립니다.
                                </p>
                                <Link href="/about">
                                    <Button variant="link" className="text-white p-0 h-auto hover:text-primary transition-colors text-lg">
                                        View Full Profile →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
