"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

export default function VisionComparison() {
    return (
        <section className="py-32 bg-neutral-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">왜 ‘힐링 스마일’ 인가요?</h2>
                <p className="text-neutral-400 text-center mb-16">기존 라식/라섹의 장점은 합치고 단점은 보완한 3세대 수술법</p>

                <div className="overflow-x-auto">
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
                            {[
                                { label: "수술 방법", healing: "각막 최소 절개 (2mm)", lasik: "각막 절편 생성 (24mm)", lasek: "상피 제거" },
                                { label: "통증", healing: "거의 없음", lasik: "조금 있음", lasek: "2~3일 통증" },
                                { label: "회복 기간", healing: "수술 다음 날", lasik: "3~4일", lasek: "5~7일" },
                                { label: "각막 손상", healing: "최소화 (안전)", lasik: "많음", lasek: "많음" },
                                { label: "외부 충격", healing: "강함", lasik: "약함", lasek: "강함" },
                                { label: "안구 건조", healing: "거의 없음", lasik: "발생 가능", lasek: "발생 가능" },
                            ].map((row, i) => (
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
            </div>
        </section>
    );
}
