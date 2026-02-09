"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scan, BrainCircuit, Activity } from "lucide-react";
import { useState } from "react";
import AISurveyModal from "@/components/home/AISurveyModal";

export default function AIPrediction() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="py-16 sm:py-20 md:py-32 relative overflow-hidden bg-neutral-900">
                {/* Background Matrix/Grid Effect */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">

                        {/* Visual Area */}
                        <div className="w-full md:w-[45%] relative max-w-lg">
                            <motion.div
                                className="aspect-square bg-black rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center cursor-pointer group"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                {/* Holographic Background - Eye Grid */}
                                <div className="absolute inset-0 opacity-25 scale-75 sm:scale-90 md:scale-100">
                                    {/* Concentric Circles with Segments */}
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={`circle-${i}`}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
                                            style={{
                                                width: `${(i + 1) * 12}%`,
                                                height: `${(i + 1) * 12}%`,
                                                borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
                                                background: i === 2 || i === 4 || i === 6 ? `conic-gradient(
                                                    from ${i * 45}deg,
                                                    transparent 0deg,
                                                    rgba(212, 175, 55, 0.15) 20deg,
                                                    transparent 40deg,
                                                    rgba(212, 175, 55, 0.15) 60deg,
                                                    transparent 80deg,
                                                    rgba(212, 175, 55, 0.15) 100deg,
                                                    transparent 120deg,
                                                    rgba(212, 175, 55, 0.15) 140deg,
                                                    transparent 160deg,
                                                    rgba(212, 175, 55, 0.15) 180deg,
                                                    transparent 200deg,
                                                    rgba(212, 175, 55, 0.15) 220deg,
                                                    transparent 240deg,
                                                    rgba(212, 175, 55, 0.15) 260deg,
                                                    transparent 280deg,
                                                    rgba(212, 175, 55, 0.15) 300deg,
                                                    transparent 320deg,
                                                    rgba(212, 175, 55, 0.15) 340deg,
                                                    transparent 360deg
                                                )` : 'none',
                                            }}
                                            animate={{
                                                opacity: [0.3, 0.7, 0.3],
                                                scale: [1, 1.03, 1],
                                            }}
                                            transition={{
                                                duration: 3,
                                                delay: i * 0.15,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}

                                    {/* Degree Markers - 360 degree ticks */}
                                    <div className="absolute inset-0">
                                        {[...Array(72)].map((_, i) => {
                                            const angle = (i * 5);
                                            const isMajor = i % 6 === 0;
                                            const isMedium = i % 3 === 0;
                                            return (
                                                <div
                                                    key={`tick-${i}`}
                                                    className="absolute top-1/2 left-1/2 origin-left"
                                                    style={{
                                                        width: isMajor ? '15%' : isMedium ? '10%' : '6%',
                                                        height: isMajor ? '2px' : '1px',
                                                        background: `linear-gradient(to right, rgba(212, 175, 55, ${isMajor ? 0.6 : isMedium ? 0.3 : 0.15}), transparent)`,
                                                        transform: `rotate(${angle}deg)`,
                                                    }}
                                                />
                                            );
                                        })}
                                        {/* Degree Numbers */}
                                        {[0, 90, 180, 270].map((deg) => (
                                            <div
                                                key={`deg-${deg}`}
                                                className="absolute text-primary/40 text-[10px] sm:text-xs font-mono"
                                                style={{
                                                    top: deg === 0 ? '8%' : deg === 180 ? '88%' : '48%',
                                                    left: deg === 90 ? '88%' : deg === 270 ? '8%' : '48%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            >
                                                {deg}°
                                            </div>
                                        ))}
                                    </div>

                                    {/* Crosshair Lines */}
                                    <div className="absolute inset-0">
                                        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                                        {/* Diagonal lines */}
                                        <div className="absolute top-1/2 left-1/2 w-full h-px origin-left rotate-45 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                        <div className="absolute top-1/2 left-1/2 w-full h-px origin-left -rotate-45 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                    </div>

                                    {/* Corner Brackets */}
                                    <div className="absolute inset-0">
                                        {/* Top-left */}
                                        <div className="absolute top-[15%] left-[15%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-l-2 border-t-2 border-primary/30" />
                                        {/* Top-right */}
                                        <div className="absolute top-[15%] right-[15%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-r-2 border-t-2 border-primary/30" />
                                        {/* Bottom-left */}
                                        <div className="absolute bottom-[15%] left-[15%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-l-2 border-b-2 border-primary/30" />
                                        {/* Bottom-right */}
                                        <div className="absolute bottom-[15%] right-[15%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-r-2 border-b-2 border-primary/30" />
                                    </div>

                                    {/* Data Points */}
                                    {[
                                        { top: '20%', left: '25%', label: 'A1' },
                                        { top: '30%', right: '22%', label: 'B2' },
                                        { bottom: '28%', left: '24%', label: 'C3' },
                                        { bottom: '22%', right: '28%', label: 'D4' },
                                        { top: '45%', left: '15%', label: 'E5' },
                                        { top: '45%', right: '15%', label: 'F6' },
                                    ].map((pos, i) => (
                                        <motion.div
                                            key={`point-${i}`}
                                            className="absolute"
                                            style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                                            <div className="absolute top-3 left-3 text-[8px] text-primary/50 font-mono whitespace-nowrap">
                                                {pos.label}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Rotating Radar Scan */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 w-full h-px origin-left"
                                        style={{
                                            background: 'linear-gradient(to right, rgba(212, 175, 55, 0.6), transparent)',
                                        }}
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    {/* Hexagonal Grid Pattern */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: `
                                                linear-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 1px),
                                                linear-gradient(90deg, rgba(212, 175, 55, 0.08) 1px, transparent 1px)
                                            `,
                                            backgroundSize: '25px 25px',
                                            maskImage: 'radial-gradient(circle at center, black 35%, transparent 65%)',
                                        }}
                                    />
                                </div>

                                {/* Scanning Animation */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-2 bg-primary blur-lg shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50" />

                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="text-center px-4">
                                        <Scan size={80} className="sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] text-primary mx-auto mb-4 sm:mb-6 md:mb-8 opacity-90 group-hover:scale-110 transition-transform duration-500" />
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-wider">AI EYE SCANNING</h3>
                                        <p className="text-primary/80 text-xs sm:text-sm md:text-base tracking-widest uppercase font-semibold">Click to Start Analysis</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                                <BrainCircuit className="text-primary" size={24} />
                                <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">Healing AI Solutions</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
                                내 눈에 딱 맞는 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">최적의 수술 찾기</span>
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg text-neutral-400 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                                10만 건 이상의 임상 데이터를 학습한 힐링안과 AI가<br className="hidden sm:block" />
                                고객님의 각막 데이터와 라이프스타일을 분석하여<br className="hidden sm:block" />
                                가장 안전하고 효과적인 시력교정술을 제안합니다.
                            </p>

                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
                                {[
                                    "각막 두께 및 형태 3D 분석",
                                    "라이프스타일 맞춤형 매칭",
                                    "수술 후 회복 기간 예측 시뮬레이션"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white/5 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                                        <Activity size={18} className="sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                                        <span className="text-white font-medium text-sm sm:text-base">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className="bg-primary text-black hover:bg-white w-full md:w-auto h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg rounded-full font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all px-5 py-2.5 sm:px-6 sm:py-3"
                                onClick={() => setIsModalOpen(true)}
                            >
                                AI 시력교정 예측 시작하기
                            </Button>
                        </div>

                    </div>
                </div>
            </section>

            <AISurveyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
