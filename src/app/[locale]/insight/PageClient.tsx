"use client";

import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, Play, FileText, Activity } from "lucide-react";
import ExpertQnA from "@/components/insight/ExpertQnA";
import VideoGallery from "@/components/insight/VideoGallery";

const columns = [
    {
        category: "MEDICAL COLUMN",
        title: "스마트폰 블루라이트, 눈 건강에 정말 해로울까?",
        desc: "블루라이트 차단 안경의 효과와 디지털 기기 사용 시 눈 건강을 지키는 올바른 20-20-20 규칙에 대해 알아봅니다.",
        author: "Dr. Kim",
        date: "2024.01.15",
        img: "https://images.pexels.com/photos/5752263/pexels-photo-5752263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        category: "EYE HEALTH",
        title: "겨울철 안구건조증, 인공눈물만으로는 부족하다",
        desc: "실내 난방으로 인한 건조함, 어떻게 관리해야 할까요? 생활 속 습도 관리와 온찜질의 중요성.",
        author: "Healing Eye",
        date: "2024.01.10",
        img: "https://images.pexels.com/photos/5858739/pexels-photo-5858739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        category: "SURGERY Q&A",
        title: "라식 vs 라섹 vs 스마일, 나에게 맞는 수술은?",
        desc: "각막 두께, 근시 정도, 라이프스타일에 따른 최적의 시력교정술 선택 가이드.",
        author: "Dr. Lee",
        date: "2024.01.05",
        img: "https://images.pexels.com/photos/50692/pexels-photo-50692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
];

export default function InsightPageClient() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 selection:bg-primary selection:text-black text-white">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-sm font-bold tracking-[0.3em] uppercase mb-4 block text-primary">Medical Journal</span>
                        <h1 className="text-5xl md:text-8xl font-serif font-medium leading-[0.9] text-white">
                            INSIGHT <br /> & LOOK
                        </h1>
                    </motion.div>
                    <p className="text-neutral-400 max-w-sm mt-8 md:mt-0 text-right md:text-left">
                        정확한 의학 정보와 건강한 라이프스타일을 위한<br />
                        힐링안과의 전문 칼럼을 만나보세요.
                    </p>
                </div>

                {/* Featured Post (First one) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-[21/9] rounded-[2rem] overflow-hidden mb-24 group cursor-pointer"
                >
                    <Image
                        src="https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Featured"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white w-full md:w-2/3">
                        <span className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                            Editor's Pick
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                            "Seeing is Believing: The Science of Clarity"
                        </h2>
                        <p className="text-lg text-white/80 mb-8 line-clamp-2">
                            시력 교정이 가져다주는 삶의 변화, 그리고 그 뒤에 숨겨진 광학 기술의 진보에 대하여.
                        </p>
                        <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-black rounded-full px-8">
                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </motion.div>

                {/* Recent Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {columns.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                                <Image
                                    src={col.img}
                                    alt={col.title}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                                    {col.category}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-3 text-xs text-neutral-400 uppercase tracking-widest border-b border-black/5 pb-3">
                                <span>{col.author}</span>
                                <span>•</span>
                                <span>{col.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {col.title}
                            </h3>
                            <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3">
                                {col.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter */}
                <ExpertQnA />
                <VideoGallery />

                <div className="mt-20 bg-black text-white rounded-[3rem] p-12 md:p-24 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Stay Informed</h2>
                    <p className="text-neutral-400 mb-10 max-w-xl mx-auto">
                        눈 건강을 위한 유익한 정보를 매주 받아보세요. 스팸은 보내지 않습니다.
                    </p>
                    <div className="flex max-w-md mx-auto relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-white/10 border border-white/20 rounded-full px-8 py-4 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-neutral-500"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-primary text-black rounded-full px-6 font-bold hover:bg-white transition-colors">
                            Surscribe
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
