"use client";

import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, MouseEvent } from "react";
import { Check, Zap, Shield, Clock, ScanEye, UserCheck, Microscope, ShieldCheck } from "lucide-react";

const procedures = [
    {
        id: "01",
        title: "스마일 라식 (SMILE PRO)",
        subtitle: "3세대 레이저 시력교정의 정점",
        desc: "각막 절개 최소화(2mm)로 통증 없이, 수술 다음 날 바로 일상 복귀가 가능합니다. 독일 ZEISS 비쥬맥스 장비의 초정밀 레이저 기술을 경험하세요.",
        features: ["2mm 최소 절개", "무통증/무출혈", "다음날 일상복귀", "안구건조증 최소화"],
        color: "from-blue-600 to-indigo-900",
        bgUser: "https://images.pexels.com/photos/50692/pexels-photo-50692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: "02",
        title: "커스텀 라섹 (Custom LASEK)",
        subtitle: "초고도근시/난시를 위한 안전한 선택",
        desc: "각막 두께가 얇거나 충격에 민감한 분들을 위해, 각막 상피를 정교하게 제거하고 강화하는 2-Step 안전 프로토콜을 적용합니다.",
        features: ["각막 보존 극대화", "외부 충격에 강함", "안구건조 최소화", "초고도근시 교정"],
        color: "from-purple-600 to-fuchsia-900",
        bgUser: "https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: "03",
        title: "ICL 렌즈삽입술 (EVO+)",
        subtitle: "각막을 깎지 않는 프리미엄 교정",
        desc: "레이저 교정이 불가능한 초고도근시 환자분들을 위한 최적의 솔루션. 생체 친화적 재료인 Collamer 렌즈로 선명한 시력을 되찾으세요.",
        features: ["각막 비절삭", "UHD 고해상도", "반영구적 수명", "자외선 차단"],
        color: "from-amber-600 to-orange-900",
        bgUser: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

import VisionProcess from "@/components/vision/VisionProcess";
import VisionComparison from "@/components/vision/VisionComparison";
import SafetySystem from "@/components/vision/SafetySystem";

export default function VisionPage() {
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

