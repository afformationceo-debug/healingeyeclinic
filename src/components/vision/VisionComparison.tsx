"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

export default function VisionComparison() {
    const comparisonData = [
        { label: "수술 방법", healing: "각막 최소 절개 (2mm)", lasik: "각막 절편 생성 (24mm)", lasek: "상피 제거" },
        { label: "통증", healing: "거의 없음", lasik: "조금 있음", lasek: "2~3일 통증" },
        { label: "회복 기간", healing: "수술 다음 날", lasik: "3~4일", lasek: "5~7일" },
        { label: "각막 손상", healing: "최소화 (안전)", lasik: "많음", lasek: "많음" },
        { label: "외부 충격", healing: "강함", lasik: "약함", lasek: "강함" },
        { label: "안구 건조", healing: "거의 없음", lasik: "발생 가능", lasek: "발생 가능" },
    ];

    return (
        <section className="py-16 sm:py-20 md:py-32 bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-3 sm:mb-4">왜 '힐링 스마일' 인가요?</h2>
                <p className="text-neutral-400 text-center mb-12 sm:mb-16 text-sm sm:text-base">기존 라식/라섹의 장점은 합치고 단점은 보완한 3세대 수술법</p>

                {/* Desktop: Horizontal Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-6 text-neutral-500 font-normal">구분</th>
                                <th className="p-6 text-center text-xl font-bold text-primary bg-primary/5 rounded-t-2xl border-t border-x border-primary/20">
                                    스마일 라식
                                    <span className="block text-xs font-normal mt-1 opacity-70">Best Choice</span>
                                </th>
                                <th className="p-6 text-center text-xl font-bold text-white">일반 라식</th>
                                <th className="p-6 text-center text-xl font-bold text-white">일반 라섹</th>
                            </tr>
                        </thead>
                        <tbody className="text-neutral-300">
                            {comparisonData.map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-bold text-white">{row.label}</td>
                                    <td className="p-6 text-center font-bold text-primary bg-primary/5 border-x border-primary/20">{row.healing}</td>
                                    <td className="p-6 text-center">{row.lasik}</td>
                                    <td className="p-6 text-center">{row.lasek}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile: Vertical Cards */}
                <div className="block md:hidden space-y-6">
                    {comparisonData.map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-neutral-800/50 border border-white/10 rounded-xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
                                <h3 className="text-white font-bold text-base">{row.label}</h3>
                            </div>

                            {/* Content */}
                            <div className="divide-y divide-white/5">
                                {/* 스마일 라식 */}
                                <div className="px-4 py-4 bg-primary/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-400 text-sm">스마일 라식</span>
                                        <span className="text-primary font-bold text-sm">{row.healing}</span>
                                    </div>
                                </div>

                                {/* 일반 라식 */}
                                <div className="px-4 py-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-400 text-sm">일반 라식</span>
                                        <span className="text-neutral-300 text-sm">{row.lasik}</span>
                                    </div>
                                </div>

                                {/* 일반 라섹 */}
                                <div className="px-4 py-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-400 text-sm">일반 라섹</span>
                                        <span className="text-neutral-300 text-sm">{row.lasek}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
