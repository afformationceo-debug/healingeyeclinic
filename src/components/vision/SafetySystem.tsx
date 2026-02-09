"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Activity, Database, BadgeCheck } from "lucide-react";

const safetyItems = [
    {
        icon: <BadgeCheck size={32} className="sm:w-9 sm:h-9" />,
        title: "1:1 Responsible Care",
        desc: "상담부터 수술, 사후관리까지 1명의 대표원장이 전담합니다. 대리 수술 걱정 없는 100% 실명제 시스템을 운영합니다."
    },
    {
        icon: <Database size={32} className="sm:w-9 sm:h-9" />,
        title: "DB & Backup",
        desc: "평생 보관되는 수술 데이터. 수술 후 10년, 20년이 지나도 고객님의 눈 상태를 정확히 추적 관찰할 수 있습니다."
    },
    {
        icon: <Activity size={32} className="sm:w-9 sm:h-9" />,
        title: "Emergency Power",
        desc: "무정전 전원 공급 장치(UPS) 가동. 천재지변이나 정전 상황에서도 레이저 장비는 멈추지 않고 안전하게 수술을 마칩니다."
    },
    {
        icon: <Shield size={32} className="sm:w-9 sm:h-9" />,
        title: "Clean Room System",
        desc: "대학병원급 양압 수술실. 헤파필터와 에어샤워 시스템으로 미세먼지와 세균을 99.9% 차단하여 감염을 예방합니다."
    },
    {
        icon: <Eye size={32} className="sm:w-9 sm:h-9" />,
        title: "Triple Check",
        desc: "검안사, 검안 원장, 수술 집도 원장의 3중 교차 검증. 사소한 데이터 오류도 허용하지 않는 철저한 검사 시스템."
    }
];

export default function SafetySystem() {
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-neutral-950 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16 sm:mb-20 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.2em] uppercase block mb-4 text-xs sm:text-sm"
                    >
                        Safety First
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-3xl md:text-5xl font-serif text-white font-bold"
                    >
                        타협하지 않는 <br className="md:hidden" />
                        <span className="text-neutral-500">안전 기준</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {safetyItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-6 sm:p-7 md:p-8 rounded-2xl group hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-black transition-all mb-5 sm:mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">{item.title}</h3>
                            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed keep-all">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
