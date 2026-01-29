"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function CenterDetail() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const programs = [
        {
            title: "안구건조증 집중 케어 (Dry Eye IPL)",
            desc: "단순히 인공눈물만 처방하지 않습니다. 마이봄샘 기능을 회복시키는 IPL 레이저 치료와 온열 마사지를 통해 건조증의 근본 원인을 해결합니다.",
            details: ["M22 IPL 레이저 시술", "마이봄샘 스퀴징", "자가혈청 안약 처방"]
        },
        {
            title: "녹내장 정밀 조기진단",
            desc: "시신경은 한 번 손상되면 회복되지 않습니다. 대학병원급 OCT 및 시야 검사 장비를 통해 초기 녹내장을 발견하고 맞춤 약물을 처방합니다.",
            details: ["시신경유두 분석", "망막 신경섬유층 촬영", "24시간 안압 측정"]
        },
        {
            title: "황반변성 항체 주사 클리닉",
            desc: "실명 원인 1위 황반변성. 루센티스, 아일리아 등 입증된 항체 주사 치료를 통해 시력 저하를 막고 망막 기능을 보존합니다.",
            details: ["빛간섭 단층촬영(OCT)", "형광안저혈관조영술", "항체 주사 당일 시술"]
        },
        {
            title: "드림렌즈 / 소아 근시 클리닉",
            desc: "자는 동안 시력을 교정하는 드림렌즈. 성장기 아이들의 근시 진행을 억제하고 안경 없는 자유로운 낮 시간을 선물합니다.",
            details: ["각막 지형도 검사", "정품 렌즈 시험 착용", "정기적인 시력 관리"]
        }
    ];

    return (
        <section className="py-32 bg-neutral-950 text-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20">
                <div className="w-full md:w-1/3">
                    <span className="text-primary font-bold tracking-widest uppercase block mb-4">Treatment Programs</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        대학병원 수준의<br />
                        <span className="text-neutral-500">전문 치료 시스템</span>
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        분야별 전담 의료진이 당신의 눈 건강을 위해<br />심도 깊은 진료를 약속합니다.
                    </p>
                </div>

                <div className="w-full md:w-2/3 space-y-4">
                    {programs.map((item, i) => (
                        <div key={i} className="border-b border-white/10 pb-4">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center py-6 text-left group"
                            >
                                <h3 className={`text-2xl font-bold transition-colors ${openIndex === i ? "text-primary" : "text-white group-hover:text-primary"}`}>
                                    {item.title}
                                </h3>
                                <div className={`p-2 rounded-full border transition-all ${openIndex === i ? "border-primary text-primary rotate-180" : "border-white/20 text-white"}`}>
                                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pt-2">
                                            <p className="text-neutral-300 text-lg leading-relaxed mb-6">{item.desc}</p>
                                            <div className="flex flex-wrap gap-3">
                                                {item.details.map((det, idx) => (
                                                    <span key={idx} className="px-4 py-2 bg-white/5 rounded-full text-sm text-primary font-medium border border-primary/20">
                                                        {det}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
