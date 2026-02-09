"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from "lucide-react";

const doctors = [
    {
        name: "김선영",
        nameEng: "Kim Sun-young",
        position: "대표원장",
        positionEng: "Representative Director",
        title: "안과전문의/임상교수",
        specialty: "스마일·클리어 / 노안백내장 / 안구건조증",
        quote: "끝없는 탐구와 연구로 기존 이론을 진일보 시키는",
        philosophy: "단 1%의 오차도 허용하지 않는 완벽주의. 대학병원 교수 출신의 풍부한 임상경험과 최첨단 장비에 대한 깊은 이해를 바탕으로, 당신의 생애 가장 맑은 순간을 찾아드립니다.",
        career: [
            "가톨릭대학교 의과대학 대학원 석사",
            "2009-2013 가톨릭대학교 가톨릭중앙의료원 안과 전문의",
            "2013-2016 의정부 성모병원 각막,백내장 임상교수",
            "2009년 서울성모병원 최우수 전공의 표창",
            "2008년 보건복지부장관상",
            "제 108회 대한안과학회 구연상 수상",
            "질병관리본부 역학조사 표창장 수상",
            "대한안과학회(KOS) 정회원",
            "한국외안부연구회(KEEDS) 정회원",
            "한국콘택트렌즈(KCLSS) 정회원",
            "유럽백내장굴절수술학회(ESCRS) 정회원"
        ],
        img: "/images/doctors/1.png"
    },
    {
        name: "임성웅",
        nameEng: "Lim Sung-woong",
        position: "대표원장",
        positionEng: "Representative Director",
        title: "안과전문의",
        specialty: "망막 / 녹내장 / 시력교정",
        quote: "환자의 마음으로 최선을 다하는",
        philosophy: "정확한 진단은 성공적인 수술의 첫걸음입니다. 대학병원급 첨단 검사 시스템과 데이터를 분석하는 통찰력으로, 당신의 눈 상태에 가장 적합한 맞춤형 치료 계획을 수립합니다.",
        career: ["연세대학교 의과대학 졸업", "세브란스병원 안과 전문의", "전) 실로암안과병원 진료과장", "한국망막학회 정회원"],
        img: "/images/doctors/2.png"
    },
    {
        name: "이용은",
        nameEng: "Lee Yong-eun",
        position: "원장",
        positionEng: "Director",
        title: "안과전문의",
        specialty: "소아안과 / 드림렌즈",
        quote: "끝없는 연구와 다양한 경험으로 신뢰할 수 있는",
        philosophy: "아이의 시력은 평생의 자산입니다. 성장기 근시 진행 억제부터 드림렌즈 처방까지, 아이들의 눈높이에 맞춘 따뜻하고 세심한 진료로 부모님의 걱정까지 덜어드리겠습니다.",
        career: [
            "대전과학고등학교 졸업",
            "가톨릭대학교 의과대학 차석 졸업",
            "가톨릭대학교 의과대학 대학원 석사",
            "서울성모병원 백내장 임상교수",
            "대한안과학회(KOS)정회원",
            "한국백내장굴절수술학회(KSCRS) 정회원",
            "대한안과의사회(KOA)정회원",
            "미국 백내장굴절수술학회(ASCRS) 정회원",
            "유럽 백내장굴절수술학회(ESCRS) 정회원",
            "미국재향군인 검진의사(Veterans Evaluation Services)"
        ],
        img: "/images/doctors/3.png"
    }
];

export default function Doctor() {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const currentDoctor = doctors[currentIndex];

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));
    };

    // Parse quote into parts for styling
    const parseQuote = (quote: string) => {
        const parts = quote.split(/(\b(?:seeing|diagnosis|children's vision)\b)/gi);
        return parts;
    };

    const getHighlightedQuote = () => {
        const quote = currentDoctor.quote;

        if (currentIndex === 0) {
            // "Vision is not just seeing, it is experiencing."
            return (
                <>
                    "Vision is not just <br />
                    <span className="text-zinc-600">seeing</span>, it is <br />
                    <span className="text-primary italic">experiencing.</span>"
                </>
            );
        } else if (currentIndex === 1) {
            // "Precision in diagnosis, excellence in treatment."
            return (
                <>
                    "Precision in <br />
                    <span className="text-zinc-600">diagnosis</span>, <br />
                    excellence in <span className="text-primary italic">treatment.</span>"
                </>
            );
        } else {
            // "Caring for children's vision, securing their future."
            return (
                <>
                    "Caring for <br />
                    <span className="text-zinc-600">children's vision</span>, <br />
                    securing their <span className="text-primary italic">future.</span>"
                </>
            );
        }
    };

    return (
        <section ref={containerRef} className="relative py-16 sm:py-20 md:py-32 overflow-hidden bg-zinc-950">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

            {/* Navigation Buttons */}
            <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
            >
                <ChevronLeft className="text-white group-hover:text-black transition-colors w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
            >
                <ChevronRight className="text-white group-hover:text-black transition-colors w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16"
                    >
                        {/* Cinematic Image Area */}
                        <div className="w-full md:w-5/12 relative group">
                            <motion.div
                                style={{ y }}
                                className="absolute -top-20 -left-20 w-full h-full border border-white/5 z-0 hidden lg:block"
                            />
                            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100">
                                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
                                <img
                                    src={currentDoctor.img}
                                    alt={currentDoctor.name}
                                    className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105"
                                />

                                <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 z-30">
                                    <p className="text-primary font-bold tracking-widest uppercase mb-2 text-xs sm:text-sm">
                                        {currentDoctor.positionEng}
                                    </p>
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold mb-1 drop-shadow-lg">
                                        {currentDoctor.nameEng}
                                    </h3>
                                    <p className="text-white/80 text-sm tracking-wide">
                                        {currentDoctor.title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="w-full md:w-7/12">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-6 sm:mb-8 md:mb-10 leading-[1.1]"
                            >
                                {getHighlightedQuote()}
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 border-t border-white/10 pt-8 sm:pt-12">
                                <div>
                                    <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Main Career</h4>
                                    <motion.ul
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: {
                                                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                                            }
                                        }}
                                        className="space-y-2 sm:space-y-3 text-zinc-400 font-light text-sm sm:text-base tracking-wide"
                                    >
                                        {currentDoctor.career.map((item, idx) => (
                                            <motion.li
                                                key={idx}
                                                variants={{
                                                    hidden: { opacity: 0, x: -20 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                            >
                                                · {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>

                                <div>
                                    <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Medical Philosophy</h4>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-zinc-400 leading-relaxed font-light mb-6 sm:mb-8 text-sm sm:text-base"
                                    >
                                        {currentDoctor.philosophy}
                                    </motion.p>
                                    <Link href="/about">
                                        <Button variant="link" className="text-white p-0 h-auto hover:text-primary transition-all text-base sm:text-lg group">
                                            View Full Profile
                                            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
