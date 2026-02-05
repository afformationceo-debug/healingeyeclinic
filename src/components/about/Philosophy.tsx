"use client";

import { motion } from "framer-motion";
import { Shield, User, HeartPulse } from "lucide-react";

const values = [
    {
        icon: Shield,
        title: "Safety First",
        subtitle: "타협하지 않는 안전 기준",
        desc: "수술 전 60단계 정밀 검사, 3중 교차 검증 시스템으로 0.01%의 오차도 허용하지 않습니다.",
        stats: [
            { label: "정밀 검사", value: "60단계" },
            { label: "교차 검증", value: "3중" }
        ]
    },
    {
        icon: User,
        title: "Personalized",
        subtitle: "오직 한 사람을 위한 맞춤 플랜",
        desc: "공장형 수술을 거부합니다. 환자의 각막 지문, 생활 패턴, 직업 환경까지 고려한 1:1 맞춤 플랜을 설계합니다.",
        stats: [
            { label: "맞춤 플랜", value: "1:1" },
            { label: "분석 항목", value: "20+" }
        ]
    },
    {
        icon: HeartPulse,
        title: "Lifetime Care",
        subtitle: "평생 눈 건강 파트너",
        desc: "수술 후 10년, 20년이 지나도 고객님의 눈 상태를 정확히 추적 관찰할 수 있는 평생 관리 시스템을 운영합니다.",
        stats: [
            { label: "데이터 보관", value: "평생" },
            { label: "정기 검진", value: "무료" }
        ]
    }
];

export default function Philosophy() {
    return (
        <section className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-20">
                    <div className="md:w-1/2 sticky top-32 h-fit">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-4">Philosophy</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
                            The Standard<br />
                            of Excellence.
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8" />
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            힐링안과는 세 가지 핵심 가치를 바탕으로<br />
                            가장 완벽한 시력교정을 약속합니다.
                        </p>
                    </div>

                    <div className="md:w-1/2 space-y-12">
                        {values.map((item, i) => {
                            const IconComponent = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    className="border border-white/10 rounded-[2rem] p-8 md:p-10 bg-neutral-900/50 backdrop-blur-sm hover:border-primary/30 hover:bg-neutral-900/80 transition-all duration-500 group"
                                >
                                    {/* Icon & Badge */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                                            <IconComponent size={32} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors duration-500">
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm font-bold mb-4 uppercase tracking-wider">
                                        {item.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-lg text-neutral-400 leading-relaxed font-light mb-8">
                                        {item.desc}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                        {item.stats.map((stat, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="text-2xl font-bold text-primary mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
