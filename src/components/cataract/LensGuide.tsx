"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type DistanceZone = "near" | "mid" | "far" | null;

const lenses = [
    {
        name: "다초점 인공수정체",
        eng: "Multifocal IOL",
        desc: "근거리, 중간거리, 원거리를 모두 선명하게 볼 수 있어 수술 후 돋보기가 필요 없습니다.",
        pros: ["모든 거리 시력 확보", "안경/돋보기 불필요", "백내장+노안 동시 해결"],
        recommend: "사회 활동이 활발한 중장년층",
        bg: "bg-gradient-to-br from-amber-100 to-orange-50",
        type: "multifocal" as const,
        clarity: { near: true, mid: true, far: true }
    },
    {
        name: "단초점 인공수정체",
        eng: "Monofocal IOL",
        desc: "원거리나 근거리 중 하나에 초점을 맞추며, 빛 번짐이 적고 적응이 빠릅니다.",
        pros: ["선명한 원거리 시력", "적은 야간 빛 번짐", "경제적인 비용"],
        recommend: "야간 운전을 많이 하시는 분",
        bg: "bg-gradient-to-br from-neutral-100 to-neutral-50",
        type: "monofocal" as const,
        clarity: { near: false, mid: false, far: true }
    }
];

const distanceZones = [
    { id: "near" as const, label: "근거리", distance: "30cm", position: "left-0 w-1/3" },
    { id: "mid" as const, label: "중간거리", distance: "1m", position: "left-1/3 w-1/3" },
    { id: "far" as const, label: "원거리", distance: "5m", position: "right-0 w-1/3" }
];

// Interactive Vision Simulator Component
function VisionSimulator({ lens }: { lens: typeof lenses[0] }) {
    const [hoveredZone, setHoveredZone] = useState<DistanceZone>(null);

    return (
        <div className="aspect-video bg-neutral-900 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 overflow-hidden relative group">
            {/* Base Image */}
            <Image
                src="/images/cataract/lens-simulation.jpeg"
                alt="Vision Simulation"
                fill
                className="object-cover"
            />

            {/* Distance Zone Overlays */}
            {distanceZones.map((zone) => {
                const isClear = lens.clarity[zone.id];
                const isHovered = hoveredZone === zone.id;
                const showBlur = !isClear && (hoveredZone === null || isHovered);

                return (
                    <motion.div
                        key={zone.id}
                        className={`absolute top-0 h-full ${zone.position} cursor-pointer touch-manipulation`}
                        onMouseEnter={() => setHoveredZone(zone.id)}
                        onMouseLeave={() => setHoveredZone(null)}
                        onTouchStart={() => setHoveredZone(zone.id)}
                        onTouchEnd={() => setHoveredZone(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Blur Layer */}
                        {showBlur && (
                            <motion.div
                                className={`absolute inset-0 bg-white/10 ${
                                    zone.id === "mid" ? "backdrop-blur-[4px]" : "backdrop-blur-[8px]"
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7 }}
                            />
                        )}

                        {/* Zone Info on Hover */}
                        <motion.div
                            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                                isHovered ? "bg-black/40" : "bg-black/0"
                            }`}
                        >
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <div className="text-white text-xs sm:text-sm font-bold mb-1 sm:mb-2">
                                        {zone.label}
                                    </div>
                                    <div className="text-amber-300 text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                                        {zone.distance}
                                    </div>
                                    <div className={`text-base sm:text-lg ${isClear ? "text-green-400" : "text-red-400"}`}>
                                        {isClear ? "✓ 선명" : "✗ 흐림"}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                );
            })}

            {/* ALL CLEAR Badge for Multifocal */}
            {lens.type === "multifocal" && (
                <motion.div
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-1 sm:gap-2"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                    <span>✓</span>
                    <span>ALL CLEAR</span>
                </motion.div>
            )}

            {/* Distance Markers at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-t from-black/70 to-transparent flex items-end pb-1.5 sm:pb-2 px-2 sm:px-4">
                {distanceZones.map((zone) => {
                    const isClear = lens.clarity[zone.id];
                    const isHovered = hoveredZone === zone.id;

                    return (
                        <div
                            key={zone.id}
                            className="flex-1 text-center"
                        >
                            <motion.div
                                className={`text-xs font-mono transition-all duration-700 ${
                                    isHovered
                                        ? "text-amber-300 font-bold scale-110"
                                        : isClear
                                        ? "text-white/90"
                                        : "text-white/40"
                                }`}
                                animate={isHovered ? { y: -4 } : { y: 0 }}
                            >
                                {zone.distance}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function LensGuide() {
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-neutral-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <span className="text-amber-600 font-bold tracking-[0.2em] uppercase block mb-3 sm:mb-4 text-xs sm:text-sm">Premium Lens</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 font-serif">
                        나에게 맞는 <span className="text-amber-600">인공수정체</span>는?
                    </h2>
                    <p className="text-neutral-500 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                        환자의 라이프스타일, 직업, 취미 등을 고려하여<br />
                        가장 적합한 프리미엄 렌즈를 1:1 맞춤 처방합니다.
                    </p>
                    <p className="text-amber-600 text-xs sm:text-sm font-medium mt-2 sm:mt-3">
                        각 거리 구간에 마우스를 올려 시력 차이를 체험해보세요
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {lenses.map((lens, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-black/5 shadow-xl ${lens.bg} hover:shadow-2xl transition-all duration-500`}
                        >
                            <div className="flex justify-between items-start mb-6 sm:mb-8">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">{lens.name}</h3>
                                    <span className="text-amber-700 font-mono text-xs sm:text-sm tracking-wider uppercase">{lens.eng}</span>
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-xl sm:text-2xl font-bold text-neutral-300">
                                    {i === 0 ? "A" : "B"}
                                </div>
                            </div>

                            {/* Interactive Vision Simulator */}
                            <VisionSimulator lens={lens} />

                            <p className="text-neutral-700 font-medium text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                                {lens.desc}
                            </p>

                            <div className="space-y-3 sm:space-y-4 bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                                <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500" /> 특징
                                </h4>
                                <ul className="space-y-2">
                                    {lens.pros.map((pro, idx) => (
                                        <li key={idx} className="text-neutral-600 text-sm flex items-center gap-2">
                                            - {pro}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 border-t border-black/5 mt-4">
                                    <h4 className="font-bold text-neutral-900 text-sm mb-1">추천 대상</h4>
                                    <p className="text-amber-700 text-sm">{lens.recommend}</p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
