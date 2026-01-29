"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const lenses = [
    {
        name: "다초점 인공수정체",
        eng: "Multifocal IOL",
        desc: "근거리, 중간거리, 원거리를 모두 선명하게 볼 수 있어 수술 후 돋보기가 필요 없습니다.",
        pros: ["모든 거리 시력 확보", "안경/돋보기 불필요", "백내장+노안 동시 해결"],
        recommend: "사회 활동이 활발한 중장년층",
        bg: "bg-gradient-to-br from-amber-100 to-orange-50"
    },
    {
        name: "단초점 인공수정체",
        eng: "Monofocal IOL",
        desc: "원거리나 근거리 중 하나에 초점을 맞추며, 빛 번짐이 적고 적응이 빠릅니다.",
        pros: ["선명한 원거리 시력", "적은 야간 빛 번짐", "경제적인 비용"],
        recommend: "야간 운전을 많이 하시는 분",
        bg: "bg-gradient-to-br from-neutral-100 to-neutral-50"
    }
];

export default function LensGuide() {
    return (
        <section className="py-24 bg-neutral-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-amber-600 font-bold tracking-[0.2em] uppercase block mb-4">Premium Lens</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 font-serif">
                        나에게 맞는 <span className="text-amber-600">인공수정체</span>는?
                    </h2>
                    <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
                        환자의 라이프스타일, 직업, 취미 등을 고려하여<br />
                        가장 적합한 프리미엄 렌즈를 1:1 맞춤 처방합니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {lenses.map((lens, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className={`rounded-[2.5rem] p-10 border border-black/5 shadow-xl ${lens.bg} hover:shadow-2xl transition-all duration-500`}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-neutral-900 mb-1">{lens.name}</h3>
                                    <span className="text-amber-700 font-mono text-sm tracking-wider uppercase">{lens.eng}</span>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-neutral-300">
                                    {i === 0 ? "A" : "B"}
                                </div>
                            </div>

                            {/* Simulation Area (Placeholder) */}
                            <div className="aspect-video bg-neutral-900 rounded-2xl mb-8 overflow-hidden relative group">
                                <Image
                                    src="https://images.pexels.com/photos/1656579/pexels-photo-1656579.jpeg"
                                    alt="Vision Simulation"
                                    fill
                                    className={`object-cover transition-all duration-700 ${i === 0 ? "blur-none" : "group-hover:blur-[2px]"}`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm">
                                        {i === 0 ? "모든 거리 선명" : "원거리 선명"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-neutral-700 font-medium text-lg mb-8 leading-relaxed">
                                {lens.desc}
                            </p>

                            <div className="space-y-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
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
