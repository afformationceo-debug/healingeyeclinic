"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sun, Glasses, Component, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function Services() {
    return (
        <section className="py-24 md:py-32 container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-end mb-16"
            >
                <div>
                    <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Medical Centers</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        World Class <br />
                        <span className="text-neutral-500">Healing Centers</span>
                    </h2>
                </div>
                <Link href="/vision" className="group flex items-center gap-2 text-white hover:text-primary transition-colors mt-6 md:mt-0">
                    <span className="text-lg">View All Services</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">

                {/* 1. Vision Correction (Large) */}
                <Link href="/vision" className="col-span-1 md:col-span-2 md:row-span-2 group relative rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/10 hover:border-primary/50 transition-all duration-500">
                    <div className="absolute inset-0 bg-[url('/images/vision-correction-bg.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="bg-primary/20 backdrop-blur-md w-fit px-4 py-2 rounded-full mb-4 border border-primary/20">
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Most Popular</span>
                                </div>
                                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">Vision Correction</h3>
                                <p className="text-neutral-300 max-w-lg text-lg leading-relaxed mb-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    스마일 라식, 커스텀 라섹, 렌즈삽입술까지.<br />
                                    기존 시력교정술의 한계를 넘어선 초정밀 레이저 솔루션.
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <ArrowUpRight size={32} />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* 2. Cataract (Square) */}
                <Link href="/cataract" className="col-span-1 md:col-span-1 md:row-span-1 group relative rounded-[2.5rem] overflow-hidden bg-white text-black hover:bg-neutral-100 transition-colors">
                    <div className="absolute top-8 right-8 text-neutral-300 group-hover:text-black transition-colors duration-500">
                        <Sun size={64} />
                    </div>
                    <div className="absolute bottom-0 left-0 p-10">
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">Presbyopia & <br /> Cataract</h3>
                        <p className="text-neutral-500 text-base md:text-lg font-bold tracking-wide">노안/백내장센터 +</p>
                    </div>
                    {/* Reveal Text */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-black font-bold text-xl">노안/백내장센터 +</span>
                    </div>
                </Link>

                {/* 3. Eye Disease (Square) */}
                <Link href="/center" className="col-span-1 md:col-span-1 md:row-span-1 group relative rounded-[2.5rem] overflow-hidden bg-[#151515] border border-white/5 hover:border-white/20 transition-all">
                    <div className="absolute inset-0 p-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <Component size={40} className="text-primary" />
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-white">University Hospital Level</span>
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Eye Disease <br /> Center</h3>
                            <p className="text-neutral-300 text-base md:text-lg font-bold mb-2">안질환센터</p>
                            <p className="text-neutral-400 text-sm md:text-base font-medium">안구건조증, 녹내장, 망막질환</p>
                        </div>
                    </div>
                </Link>

            </div>
        </section>
    );
}
