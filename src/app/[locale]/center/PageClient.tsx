"use client";

import { motion } from "framer-motion";
import { Activity, Droplets, Eye, ScanEye, MousePointer2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import CenterDetail from "@/components/center/CenterDetail";
import SymptomChecklist from "@/components/center/SymptomChecklist";
import TreatmentProcess from "@/components/center/TreatmentProcess";
import EquipmentShowcase from "@/components/center/EquipmentShowcase";

const clinics = [
    {
        title: "안구건조증 클리닉",
        eng: "Dry Eye Clinic",
        icon: <Droplets size={40} />,
        desc: "M22 IPL 최신 장비를 도입하여 마이봄샘 기능을 회복시키고, 근본적인 안구건조증 원인을 치료합니다.",
        stats: "IPL 치료",
        bg: "from-blue-900/40"
    },
    {
        title: "망막 센터",
        eng: "Retina Center",
        icon: <ScanEye size={40} />,
        desc: "황반변성, 당뇨망막병증 등 실명 유발 질환을 대학병원급 광각 OCT 장비로 조기 발견 및 치료합니다.",
        stats: "초정밀 OCT",
        bg: "from-amber-900/40"
    },
    {
        title: "녹내장 센터",
        eng: "Glaucoma Care",
        icon: <Eye size={40} />,
        desc: "시신경 분석기를 통해 소리 없는 시력 도둑 녹내장을 예방하고, 안압을 정밀하게 관리합니다.",
        stats: "평생 관리",
        bg: "from-emerald-900/40"
    },
    {
        title: "일반 진료",
        eng: "General Eye Care",
        icon: <Activity size={40} />,
        desc: "결막염, 눈 다래끼, 알러지 등 일상적인 안질환부터 소아 안과 검진까지 세심하게 진료합니다.",
        stats: "가족 주치의",
        bg: "from-purple-900/40"
    }
];

export default function CenterPageClient() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-24 md:flex justify-between items-end"
                >
                    <div>
                        <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">Specialized Medical Center</span>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight">
                            EYE DISEASE <br />
                            <span className="text-neutral-500">CLINIC</span>
                        </h1>
                    </div>
                    <p className="text-lg text-neutral-400 font-light max-w-md mt-8 md:mt-0 text-right md:text-left leading-relaxed">
                        대학병원급 정밀 진단 장비와 분야별 전문 의료진이<br />
                        여러분의 눈 건강을 평생 지켜드립니다.
                    </p>
                </motion.div>

                {/* Grid System */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clinics.map((clinic, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`group relative h-[350px] md:h-[400px] border border-white/10 rounded-[3rem] bg-neutral-900/50 backdrop-blur-xl hover:bg-neutral-800/80 transition-all duration-500 overflow-hidden flex flex-col justify-between p-10 cursor-pointer shadow-2xl hover:shadow-primary/10`}
                        >
                            {/* Gradient Bg */}
                            <div className={`absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l ${clinic.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="flex justify-between items-start relative z-10">
                                <div className="text-neutral-400 group-hover:text-primary transition-colors duration-500 scale-100 group-hover:scale-110 origin-top-left p-3 rounded-2xl bg-white/5 group-hover:bg-white/10">
                                    {clinic.icon}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 border border-white/10 px-4 py-2 rounded-full group-hover:border-primary/50 group-hover:text-primary transition-all">
                                    {clinic.stats}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 opacity-50 text-sm font-mono uppercase tracking-wider text-neutral-300">
                                    {clinic.eng}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{clinic.title}</h3>
                                <p className="text-neutral-400 group-hover:text-white/80 transition-colors leading-relaxed">
                                    {clinic.desc}
                                </p>
                            </div>

                            {/* Interaction Hint */}
                            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                                <MousePointer2 className="text-primary rotate-[-45deg]" size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <SymptomChecklist />

                {/* Equipment Visualization */}
                <EquipmentShowcase />

                <TreatmentProcess />

                <CenterDetail />
            </div>
        </div>
    );
}
