"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eye, Users, Award } from "lucide-react";

const stats = [
    { icon: Eye, label: "성공 사례", value: "50,000+", suffix: "안" },
    { icon: Users, label: "환자 만족도", value: "4.9", suffix: "/5.0" },
    { icon: Award, label: "의료진", value: "대학병원", suffix: "교수 출신" }
];

export default function BrandStory() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section ref={targetRef} className="h-[200vh] bg-black relative">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-24">

                {/* Holographic Eye Scan Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Concentric Circles */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute border border-primary/10 rounded-full"
                            style={{
                                width: `${i * 100}px`,
                                height: `${i * 100}px`,
                            }}
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Rotating Radar Scan */}
                    <motion.div
                        className="absolute w-[600px] h-[600px]"
                        style={{ rotate }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                             style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
                        />
                    </motion.div>

                    {/* Crosshair */}
                    <div className="absolute w-[600px] h-[600px]">
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary/20" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/20" />
                    </div>

                    {/* Data Points */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <motion.div
                            key={angle}
                            className="absolute w-3 h-3 bg-primary rounded-full"
                            style={{
                                left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 200}px)`,
                                top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 200}px)`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Hexagon Grid Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="w-full h-full"
                             style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23DAA520' stroke-width='1'/%3E%3C/svg%3E")`,
                                backgroundSize: '60px 60px'
                             }}
                        />
                    </div>
                </div>

                {/* Scrolling Text Background */}
                <motion.div style={{ x, opacity }} className="whitespace-nowrap flex text-[20vw] font-black text-white/5 leading-none select-none absolute">
                    HEALING EYE HEALING EYE HEALING EYE
                </motion.div>

                {/* Main Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-primary font-bold tracking-[0.5em] text-sm md:text-xl uppercase mb-8 block">Our Mission</span>
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                            More Than Vision,<br />
                            <span className="text-neutral-500 italic">We Design Your Life.</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-16">
                            단순히 시력을 교정하는 것을 넘어,<br />
                            당신의 삶이 더 선명하고 아름다워질 수 있도록.<br />
                            힐링안과는 기술과 예술의 경계에서<br />
                            가장 완벽한 시력을 조각합니다.
                        </p>

                        {/* Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                        >
                            {stats.map((stat, i) => {
                                const IconComponent = stat.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto group-hover:bg-primary group-hover:text-black transition-all">
                                            <IconComponent size={24} />
                                        </div>
                                        <div className="text-3xl font-black text-white mb-1">
                                            {stat.value}
                                            <span className="text-xl text-primary ml-1">{stat.suffix}</span>
                                        </div>
                                        <div className="text-sm text-neutral-400 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
