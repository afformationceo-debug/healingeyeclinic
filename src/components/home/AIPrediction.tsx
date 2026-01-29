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
            <section className="py-32 relative overflow-hidden bg-neutral-900">
                {/* Background Matrix/Grid Effect */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">

                        {/* Visual Area */}
                        <div className="w-full md:w-1/2 relative">
                            <motion.div
                                className="aspect-square bg-black rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center cursor-pointer group"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                {/* Scanning Animation */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-primary blur-md"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50" />

                                <div className="text-center relative z-10">
                                    <Scan size={80} className="text-primary mx-auto mb-6 opacity-80 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-2xl font-mono text-white mb-2">AI EYE SCANNING</h3>
                                    <p className="text-primary/60 text-sm tracking-widest uppercase">Click to Start Analysis</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        <div className="w-full md:w-1/2">
                            <div className="flex items-center gap-4 mb-6">
                                <BrainCircuit className="text-primary" size={32} />
                                <span className="text-primary font-bold tracking-widest uppercase">Healing AI Solutions</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                내 눈에 딱 맞는 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">최적의 수술 찾기</span>
                            </h2>

                            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                                10만 건 이상의 임상 데이터를 학습한 힐링안과 AI가<br />
                                고객님의 각막 데이터와 라이프스타일을 분석하여<br />
                                가장 안전하고 효과적인 시력교정술을 제안합니다.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    "각막 두께 및 형태 3D 분석",
                                    "라이프스타일 맞춤형 매칭",
                                    "수술 후 회복 기간 예측 시뮬레이션"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                                        <Activity size={20} className="text-primary" />
                                        <span className="text-white font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className="bg-primary text-black hover:bg-white w-full md:w-auto h-16 text-lg rounded-full font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all"
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
