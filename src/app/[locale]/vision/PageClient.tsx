"use client";

import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, MouseEvent } from "react";
import { Check, Zap, Shield, Clock, ScanEye, UserCheck, Microscope, ShieldCheck } from "lucide-react";
import VisionComparison from "@/components/vision/VisionComparison";
import SafetySystem from "@/components/vision/SafetySystem";
import VisionProcess from "@/components/vision/VisionProcess";
import { useTranslations } from "next-intl";

const procedureColors = [
    {
        color: "from-blue-600 to-indigo-900",
        bgUser: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        color: "from-cyan-600 to-blue-900",
        bgUser: "https://images.pexels.com/photos/5752263/pexels-photo-5752263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        color: "from-purple-600 to-fuchsia-900",
        bgUser: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        color: "from-amber-600 to-orange-900",
        bgUser: "https://images.pexels.com/photos/5621937/pexels-photo-5621937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        color: "from-red-900 to-rose-950",
        bgUser: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

    const tHero = useTranslations('Vision.HeroPage');
    const tProcedures = useTranslations('Vision.Procedures');
    const tSteps = useTranslations('Vision.ProcessSteps');
    const tButton = useTranslations('Vision.Button');

    const procedures = tProcedures.raw('items').map((proc: any, index: number) => ({
        ...proc,
        ...procedureColors[index % procedureColors.length]
    }));

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
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">{tHero('badge')}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        {tHero('title1')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">{tHero('title2')}</span>
                    </h1>
                    <p className="text-neutral-400 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 whitespace-pre-line">
                        {tHero('description1')}
                    </p>
                    <p className="text-neutral-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {tHero('description2')}
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
            <section className="py-16 sm:py-20 md:py-32 container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                    {tSteps.raw('items').map((step: any, i: number) => {
                        const icons = [<ScanEye key={i} />, <UserCheck key={i} />, <Microscope key={i} />, <ShieldCheck key={i} />];
                        return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 rounded-2xl p-6 sm:p-7 md:p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-black transition-all">
                                {icons[i]}
                            </div>
                            <span className="text-2xl sm:text-3xl font-black text-primary mb-3 tracking-tighter">0{i + 1}</span>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                        </motion.div>
                    );
                    })}
                </div>

                {/* Sticky Cards Scroll */}
                <div className="space-y-40">
                    {procedures.map((proc: any, index: number) => (
                        <div key={index} className="sticky top-32 perspective-1000">
                            <TiltCard
                                className="bg-neutral-900 rounded-[3rem] border border-white/10 overflow-hidden min-h-[600px] flex flex-col md:flex-row group transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/20"
                            >
                                {/* Visual Side with Image */}
                                <div className={`w-full md:w-1/2 relative flex flex-col justify-between overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${proc.color} opacity-80 mix-blend-multiply z-10`} />
                                    <img src={proc.bgUser} alt={proc.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />

                                    <div className="relative z-20 p-8 sm:p-10 md:p-12 h-full flex flex-col justify-between">
                                        <span className="text-7xl sm:text-8xl md:text-9xl font-black text-white/20 translate-z-20">{proc.id}</span>
                                        <div className="translate-z-30">
                                            <div className="flex gap-2 mb-4">
                                                {index === 0 && <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">BEST</span>}
                                                {index === 2 && <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>}
                                            </div>
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">{proc.title}</h2>
                                            <p className="text-sm sm:text-base text-white/90 font-medium tracking-wide drop-shadow-md">{proc.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-neutral-900/95 backdrop-blur-xl translate-z-20 border-l border-white/5">
                                    <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 sm:mb-12 font-light">
                                        {proc.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-3 sm:gap-x-4 mb-8 sm:mb-12">
                                        {proc.features.map((feat: string, f_i: number) => (
                                            <div key={f_i} className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                                    <Check size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} />
                                                </div>
                                                <span className="text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-wide leading-tight">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button size="lg" className="w-full md:w-fit rounded-full px-8 bg-white text-black hover:bg-primary hover:text-white transition-colors h-14 text-md font-bold">
                                        {tButton('details')}
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
