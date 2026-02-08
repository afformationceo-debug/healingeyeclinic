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
        title: "뉴스마일 라식 (New SMILE)",
        subtitle: "차세대 최소절개 시력교정술",
        desc: "ZIEMER Z8 펨토세컨드 레이저를 이용한 최소절개 방식으로 각막 손상을 최소화하는 4세대 시력교정술입니다. 각막 표면을 투과하여 실질층에만 정밀하게 레이저를 조사하므로 각막 신경 손상이 적고, 시축 중심의 정확한 계측으로 난시 교정의 정밀도가 높습니다.",
        features: ["2mm 최소절개", "각막신경 보존", "정밀 난시교정", "빠른 일상복귀"],
        color: "from-blue-600 to-indigo-900",
        bgUser: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Futuristic eye scan
    },
    {
        id: "02",
        title: "프리미엄 라식 (Premium LASIK)",
        subtitle: "빠른 회복의 스마트 시력교정",
        desc: "각막 절편을 생성한 후 레이저로 각막을 절삭하여 굴절이상을 교정하는 검증된 시력교정술입니다. 수술 당일부터 시력 회복이 가능하며, 통증이 거의 없고 빠른 일상 복귀가 가능합니다. 최신 웨이브프론트 기술로 야간 시력의 질까지 개선합니다.",
        features: ["당일 시력회복", "최소 통증", "웨이브프론트 맞춤", "야간시력 향상"],
        color: "from-cyan-600 to-blue-900",
        bgUser: "https://images.pexels.com/photos/5752263/pexels-photo-5752263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Clear vision, woman with glasses looking
    },
    {
        id: "03",
        title: "프리미엄 라섹 (Premium LASEK)",
        subtitle: "안전성이 검증된 보수적 시력교정",
        desc: "각막 상피층만 제거하고 실질에 레이저를 조사하는 보수적 방식으로 각막 두께가 얇거나 외부 충격이 많은 직업군에 적합합니다. 플랩을 생성하지 않아 구조적 안정성이 뛰어나며, 군인, 소방관, 운동선수 등 활동적인 직업군에게 권장됩니다.",
        features: ["플랩 미생성", "구조적 안정성", "고도근시 가능", "외부충격 강함"],
        color: "from-purple-600 to-fuchsia-900",
        bgUser: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Scientific/Medical precision
    },
    {
        id: "04",
        title: "ICL 렌즈삽입술 (EVO+ ICL)",
        subtitle: "각막을 보존하는 렌즈삽입 시력교정",
        desc: "각막을 절삭하지 않고 홍채 뒤편에 특수 렌즈를 삽입하여 시력을 교정하는 안내렌즈삽입술입니다. 생체친화적 Collamer 재질로 부작용이 적으며, 라식/라섹이 불가능한 초고도근시(-6디옵터 이상)나 얇은 각막 환자에게 최적의 대안입니다. 수술 후에도 렌즈 제거가 가능하여 가역성이 보장됩니다.",
        features: ["각막 비절삭", "초고도근시 교정", "UV 차단기능", "가역적 시술"],
        color: "from-amber-600 to-orange-900",
        bgUser: "https://images.pexels.com/photos/5621937/pexels-photo-5621937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Lens concept
    },
    {
        id: "05",
        title: "라식·라섹 재수술 (Re-Surgery)",
        subtitle: "정밀 진단과 경험으로 완성하는 재교정",
        desc: "이전 시력교정술 후 시력 저하, 잔여 굴절이상, 야간 빛번짐 등의 문제를 개선하는 고난도 재교정술입니다. 대학병원 교수 출신 의료진의 풍부한 임상경험을 바탕으로 잔여 각막 두께를 정밀 분석하여 안전한 범위 내에서 재수술 가능 여부를 판단합니다.",
        features: ["정밀 각막분석", "부작용 최소화", "안전성 우선", "1:1 맞춤상담"],
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
                {/* Technical Background */}
                <div className="absolute inset-0">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Radial Gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.15),transparent_70%)]" />

                    {/* Laser Lines */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                        <div className="absolute top-0 bottom-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                    </motion.div>

                    {/* Corner Accents */}
                    <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/20" />
                    <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
                    <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
                    <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/20" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-center relative z-10 px-4"
                >
                    <div className="flex items-center justify-center gap-2 mb-6 text-primary border border-primary/30 rounded-full px-4 py-1 w-fit mx-auto bg-primary/5 backdrop-blur-md">
                        <Zap size={14} fill="currentColor" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">2026년 최소절개술 뉴스마일 라식</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        NEW SMILE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">LASIK</span>
                    </h1>
                    <p className="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-6">
                        ZIEMER Z8 펨토세컨드 레이저로 구현하는 4세대 시력교정술<br />
                        각막 표면을 투과하여 각막 실질에만 레이저를 조사하는 최소절개 렌티큘 제거 방식
                    </p>
                    <p className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        시야 중심축과 회전축의 정확한 계측 및 절삭으로 정밀한 난시 교정이 가능한<br />
                        대학병원 교수 출신 의료진의 차세대 시력교정 시스템
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
                            "ZIEMER FEMTO Z8", "4th Generation", "Minimal Incision",
                            "Lenticule Extraction", "Precise Astigmatism Correction", "Real-time Eye Tracking",
                            "ZIEMER FEMTO Z8", "4th Generation", "Minimal Incision"
                        ].map((tech, i) => (
                            <span key={i}>{tech}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Deep Process Section (New Rich Content) */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { title: "정밀 검사", desc: "60여가지 안구 정밀 측정", icon: <ScanEye /> },
                        { title: "1:1 상담", desc: "라이프스타일 심층 분석", icon: <UserCheck /> },
                        { title: "맞춤 수술", desc: "대표원장 직접 집도", icon: <Microscope /> },
                        { title: "사후 관리", desc: "평생 안구 관리 보증", icon: <ShieldCheck /> },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-black transition-all">
                                {step.icon}
                            </div>
                            <span className="text-3xl font-black text-primary mb-3 tracking-tighter">0{i + 1}</span>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-neutral-400 text-base leading-relaxed">{step.desc}</p>
                        </motion.div>
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
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                                    <Check size={18} strokeWidth={3} />
                                                </div>
                                                <span className="text-base md:text-lg font-bold text-white uppercase tracking-wide leading-tight">{feat}</span>
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
