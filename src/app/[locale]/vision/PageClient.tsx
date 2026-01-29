"use client";

import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, MouseEvent } from "react";
import { Check, Zap, Shield, Clock, ScanEye, UserCheck, Microscope, ShieldCheck } from "lucide-react";
import VisionComparison from "@/components/vision/VisionComparison";
import SafetySystem from "@/components/vision/SafetySystem";
import VisionProcess from "@/components/vision/VisionProcess";

const procedures = [
    {
        id: "01",
        title: "뉴스마일 라식 (News Mile)",
        subtitle: "5세대 시력교정의 완성",
        desc: "스마일 라식의 장점을 넘어섰습니다. 700Hz 초고속 레이저로 기존보다 3배 더 빠른 수술 속도와 마이크로 단위의 정교함을 자랑합니다. 각막 손상을 최소화하여 다음 날 바로 일상으로 복귀하세요.",
        features: ["700Hz 초고속 레이저", "로우 에너지 조사", "안구건조증 최소화", "빛 번짐 획기적 감소"],
        color: "from-blue-600 to-indigo-900",
        bgUser: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Futuristic eye scan
    },
    {
        id: "02",
        title: "프리미엄 라식 (Premium LASIK)",
        subtitle: "하루 만에 되찾는 선명함",
        desc: "바쁜 현대인을 위한 원데이 솔루션. 20mm 최소 절개와 강화된 각막 보존 기술로 수술 당일 목표 시력의 90%를 회복합니다. 통증 없이 가장 빠르게 광명을 찾으세요.",
        features: ["원데이 시력 회복", "통증 제로", "최소 절개", "야간 시력 향상"],
        color: "from-cyan-600 to-blue-900",
        bgUser: "https://images.pexels.com/photos/5752263/pexels-photo-5752263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Clear vision, woman with glasses looking
    },
    {
        id: "03",
        title: "프리미엄 라섹 (Premium LASEK)",
        subtitle: "가장 보수적이고 안전한 선택",
        desc: "각막 두께가 얇거나 충격에 민감한 특수 직업군(군인, 소방관, 운동선수)을 위해. 상피 세포를 정교하게 다듬어 외부 충격에 가장 강한 눈을 만듭니다.",
        features: ["초고도근시 가능", "외부 충격 최강", "각막 절약형", "안구건조 케어"],
        color: "from-purple-600 to-fuchsia-900",
        bgUser: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Scientific/Medical precision
    },
    {
        id: "04",
        title: "ICL 렌즈삽입술 (EVO+ ICL)",
        subtitle: "각막 그대로, 시력만 업그레이드",
        desc: "레이저 교정이 불가능한 초고도근시 환자분들을 위한 최적의 솔루션. 생체 친화적 재료인 Collamer 렌즈로 시력을 디자인하며, 언제든 원상 복구가 가능합니다.",
        features: ["각막 비절삭", "초고도근시/난시 해결", "자외선 차단", "반영구적 유지"],
        color: "from-amber-600 to-orange-900",
        bgUser: "https://images.pexels.com/photos/5621937/pexels-photo-5621937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Lens concept
    },
    {
        id: "05",
        title: "라식·라섹 재수술 (Re-Surgery)",
        subtitle: "마지막 기회, 완벽한 복원",
        desc: "과거 수술의 부작용(빛 번짐, 시력 저하)으로 고통받는 분들을 위한 고난도 클리닉. 대학병원 교수 출신 의료진의 경험과 노하우로 당신의 마지막 수술을 집도합니다.",
        features: ["대학병원급 정밀 분석", "부작용 케어", "잔여 각막 보존", "1:1 전담 책임제"],
        color: "from-red-900 to-rose-950",
        bgUser: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Detailed eye exam, serious tone
    }
];

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    function onMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function VisionPageClient() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <div ref={containerRef} className="bg-black min-h-screen selection:bg-primary selection:text-black">

            {/* Hero */}
            <section className="h-[80vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-center relative z-10 px-4"
                >
                    <div className="flex items-center justify-center gap-2 mb-6 text-blue-400 border border-blue-400/30 rounded-full px-4 py-1 w-fit mx-auto bg-blue-400/5 backdrop-blur-md">
                        <Zap size={14} fill="currentColor" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Premium Vision Correction</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        BEYOND <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">YOUR LIMITS</span>
                    </h1>
                    <p className="text-neutral-400 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        세계적인 광학 기업 ZEISS의 최첨단 장비와 <br />
                        대학병원 교수 출신 의료진의 완벽한 협연.
                    </p>
                </motion.div>

                {/* Tech Specs Marquee */}
                <div className="absolute bottom-10 w-full overflow-hidden border-y border-white/5 py-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        className="flex gap-16 whitespace-nowrap text-white/30 font-mono text-sm uppercase tracking-widest"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    >
                        {[
                            "ZEISS VisuMax 800", "SCHWIND AMARIS RED", "Femtosecond Laser",
                            "FDA Approved", "Smart Pulse Technology", "Real-time Eye Tracking",
                            "ZEISS VisuMax 800", "SCHWIND AMARIS RED", "Femtosecond Laser"
                        ].map((tech, i) => (
                            <span key={i}>{tech}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Deep Process Section (New Rich Content) */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
                    {[
                        { title: "정밀 검사", desc: "60단계 안구 정밀 측정", icon: <ScanEye /> },
                        { title: "1:1 상담", desc: "라이프스타일 심층 분석", icon: <UserCheck /> },
                        { title: "맞춤 수술", desc: "대표원장 직접 집도", icon: <Microscope /> },
                        { title: "사후 관리", desc: "평생 안구 관리 보증", icon: <ShieldCheck /> },
                    ].map((step, i) => (
                        <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                            <span className="text-2xl font-bold text-white mb-2 tracking-tighter">0{i + 1}</span>
                            <h3 className="text-lg font-bold text-primary mb-1">{step.title}</h3>
                            <p className="text-neutral-500 text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Sticky Cards Scroll */}
                <div className="space-y-40">
                    {procedures.map((proc, index) => (
                        <div key={index} className="sticky top-32 perspective-1000">
                            <TiltCard
                                className="bg-neutral-900 rounded-[3rem] border border-white/10 overflow-hidden min-h-[600px] flex flex-col md:flex-row group transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/20"
                            >
                                {/* Visual Side with Image */}
                                <div className={`w-full md:w-1/2 relative flex flex-col justify-between overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${proc.color} opacity-80 mix-blend-multiply z-10`} />
                                    <img src={proc.bgUser} alt={proc.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />

                                    <div className="relative z-20 p-12 h-full flex flex-col justify-between">
                                        <span className="text-9xl font-black text-white/20 translate-z-20">{proc.id}</span>
                                        <div className="translate-z-30">
                                            <div className="flex gap-2 mb-4">
                                                {index === 0 && <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">BEST</span>}
                                                {index === 2 && <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>}
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">{proc.title}</h2>
                                            <p className="text-white/90 font-medium tracking-wide drop-shadow-md">{proc.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-neutral-900/95 backdrop-blur-xl translate-z-20 border-l border-white/5">
                                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-12 font-light">
                                        {proc.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12">
                                        {proc.features.map((feat, f_i) => (
                                            <div key={f_i} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm font-bold text-white uppercase tracking-wide">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button size="lg" className="w-full md:w-fit rounded-full px-8 bg-white text-black hover:bg-primary hover:text-white transition-colors h-14 text-md font-bold">
                                        자세히 보기 & 상담신청
                                    </Button>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </section>

            <SafetySystem />
            <VisionProcess />
            <VisionComparison />
        </div>
    );
}
