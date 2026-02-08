"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Monitor, Book, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const lifestyles = [
    {
        id: "active",
        icon: <Sun size={36} />,
        title: "야외 활동을 즐기시는 분",
        desc: "골프, 등산, 여행처럼 멀리 보는 활동이 많으신가요?",
        recommendation: "원거리 시력이 중요한 분께는 '팬옵틱스' 또는 '비비티' 렌즈를 추천드립니다. 선명하고 넓은 시야로 야외 활동의 즐거움을 더해드립니다."
    },
    {
        id: "digital",
        icon: <Monitor size={36} />,
        title: "컴퓨터·스마트폰 사용이 많은 분",
        desc: "TV 시청, 컴퓨터 작업, 스마트폰을 자주 보시나요?",
        recommendation: "중간 거리 시력이 중요한 분께는 '시너지' 또는 '아이핸스' 렌즈가 적합합니다. 화면을 편안하게 보실 수 있도록 최적화되었습니다."
    },
    {
        id: "daily",
        icon: <Car size={36} />,
        title: "운전을 자주 하시는 분",
        desc: "낮과 밤에 운전을 하시거나 일상 생활이 중요하신가요?",
        recommendation: "야간 운전이 많은 분께는 '비비티' 렌즈를 추천드립니다. 빛 번짐을 최소화하고 선명한 대비감으로 안전한 운전을 도와드립니다."
    },
    {
        id: "reading",
        icon: <Book size={36} />,
        title: "독서·정밀 작업을 하시는 분",
        desc: "책이나 신문을 읽거나 가까운 곳을 자주 보시나요?",
        recommendation: "근거리 시력이 중요한 분께는 '시너지' 또는 '팬옵틱스' 렌즈를 추천드립니다. 30~40cm 거리에서 가장 선명하게 보실 수 있습니다."
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
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${selected === style.id ? "bg-white/10 text-primary" : "bg-white text-neutral-400"}`}>
                                {style.icon}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">{style.title}</h3>
                                <p className={`text-lg md:text-xl font-medium leading-relaxed ${selected === style.id ? "text-neutral-200" : "text-neutral-700"}`}>{style.desc}</p>
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
                            className="bg-primary/10 p-10 md:p-14 rounded-[2rem] text-center max-w-4xl mx-auto"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 flex items-center justify-center gap-3">
                                <span className="bg-primary text-black text-sm px-3 py-1.5 rounded-full tracking-wide">RECOMMENDATION</span>
                                <span className="tracking-tight">추천 솔루션</span>
                            </h3>
                            <p className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold leading-loose tracking-wide mb-10 text-neutral-800">
                                {lifestyles.find(l => l.id === selected)?.recommendation}
                            </p>
                            <Button className="rounded-full px-10 py-7 text-lg md:text-xl bg-black text-white hover:bg-neutral-800 tracking-wide">
                                1:1 정밀 검사 신청하기 <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
