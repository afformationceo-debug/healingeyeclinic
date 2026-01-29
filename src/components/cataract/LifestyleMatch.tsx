"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Monitor, Book, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const lifestyles = [
    {
        id: "active",
        icon: <Sun size={32} />,
        title: "야외 활동형",
        desc: "골프, 등산, 여행 등 야외 활동을 즐기시나요?",
        recommendation: "원거리 시력 확보가 중요한 야외 활동형에는 '팬옵틱스' 또는 '비비티' 렌즈를 추천합니다."
    },
    {
        id: "digital",
        icon: <Monitor size={32} />,
        title: "디지털 기기형",
        desc: "하루 종일 컴퓨터나 스마트폰을 보시나요?",
        recommendation: "중간거리 시력이 중요한 디지털 환경에는 '시너지' 또는 '아이핸스' 렌즈가 적합합니다."
    },
    {
        id: "daily",
        icon: <Car size={32} />,
        title: "운전 및 일상형",
        desc: "주야간 운전이 많고 일상 생활이 중요한가요?",
        recommendation: "야간 빛 번짐을 최소화하고 대비 감도가 좋은 '비비티' 렌즈를 추천합니다."
    },
    {
        id: "reading",
        icon: <Book size={32} />,
        title: "독서 및 정밀작업",
        desc: "독서나 바느질 등 가까운 곳을 많이 보시나요?",
        recommendation: "30-40cm 근거리 시력이 가장 우수한 '시너지' 또는 '팬옵틱스' 렌즈를 추천합니다."
    }
];

export default function LifestyleMatch() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <section className="py-32 bg-white text-black relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Find Your Lens
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        백내장 수술의 핵심은 '어떤 렌즈를 선택하느냐' 입니다.<br />
                        나의 라이프스타일을 선택하고 최적의 렌즈를 확인해보세요.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {lifestyles.map((style) => (
                        <motion.div
                            key={style.id}
                            onClick={() => setSelected(style.id)}
                            whileHover={{ y: -5 }}
                            className={`cursor-pointer p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-6 ${selected === style.id ? "bg-black text-white border-black shadow-xl scale-105" : "bg-neutral-50 border-neutral-200 hover:border-black/30"}`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${selected === style.id ? "bg-white/10 text-primary" : "bg-white text-neutral-400"}`}>
                                {style.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                                <p className={`text-sm ${selected === style.id ? "text-neutral-400" : "text-neutral-500"}`}>{style.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {selected && (
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-primary/10 p-12 rounded-[2rem] text-center max-w-3xl mx-auto"
                        >
                            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center justify-center gap-2">
                                <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">RECOMMENDATION</span>
                                추천 솔루션
                            </h3>
                            <p className="text-2xl md:text-3xl font-serif font-bold leading-relaxed mb-8">
                                "{lifestyles.find(l => l.id === selected)?.recommendation}"
                            </p>
                            <Button className="rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-neutral-800">
                                1:1 정밀 검사 신청하기 <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
