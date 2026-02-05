"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function WhyHealingEye() {
    const locale = useLocale();
    const reviewUrl = locale === 'ko'
        ? 'https://map.naver.com/p/entry/place/1217790716?placePath=/review'
        : 'https://maps.app.goo.gl/jny3xdknHpJ2ggnW6';

    return (
        <section className="py-32 bg-white text-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase block mb-4">Why Healing Eye</span>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            기준이 다른 안과,<br />
                            <span className="text-neutral-400">결과가 증명합니다.</span>
                        </h2>
                    </div>
                    <div className="flex gap-4 mt-8 md:mt-0">
                        <motion.a
                            href={reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(212, 175, 55, 0)",
                                    "0 0 0 8px rgba(212, 175, 55, 0.1)",
                                    "0 0 0 0 rgba(212, 175, 55, 0)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            <span className="font-bold">4.9/5.0</span> <span className="text-sm opacity-70">Patient Review</span>
                        </motion.a>
                        <Link href={`/${locale}/community`} passHref legacyBehavior>
                            <motion.a
                                className="px-6 py-3 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(212, 175, 55, 0)",
                                        "0 0 0 8px rgba(212, 175, 55, 0.1)",
                                        "0 0 0 0 rgba(212, 175, 55, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                <span className="font-bold">50,000+</span> <span className="text-sm opacity-70">Successful Cases</span>
                            </motion.a>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "University Faculty",
                            sub: "대학병원 교수 출신 의료진",
                            desc: <>풍부한 임상 경험과 노하우를 갖춘 의료진이<br />상담부터 수술, 사후관리까지 1:1 전담합니다.</>,
                            icon: <Award size={40} className="text-primary" />
                        },
                        {
                            title: "High-End Equipment",
                            sub: "대학병원급 최첨단 장비",
                            desc: <>Zimer Z8, ZEISS SUITE 등 최신 장비와<br />독일 라라렌즈 최초 사용, 4중초점 판옵틱스 사용량 전국 1위로<br />백내장 전문성을 입증합니다.</>,
                            icon: <ShieldCheck size={40} className="text-primary" />
                        },
                        {
                            title: "Lifetime Guarantee",
                            sub: "평생 시력 보증 시스템",
                            desc: <>앞으로의 40년, 제2의 인생을 책임지는<br />평생 보증 제도로 당신의 시력을 평생 보장합니다.</>,
                            icon: <HeartHandshake size={40} className="text-primary" />
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[2.5rem] bg-neutral-50 hover:bg-neutral-900 hover:text-white transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10 group-hover:text-white">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-lg font-bold text-neutral-500 mb-6 group-hover:text-neutral-400">{item.sub}</p>
                            <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-300 transition-colors">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
