"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CataractCheck from "@/components/cataract/CataractCheck";
import LensGuide from "@/components/cataract/LensGuide";
import LifestyleMatch from "@/components/cataract/LifestyleMatch";
import AgingProcess from "@/components/cataract/AgingProcess";

export default function CataractPageClient() {
    return (
        <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#f5f5f0]">
            {/* Header - Magazine Style with Video */}
            <section className="relative h-screen flex flex-col justify-end pb-20 overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover grayscale brightness-50"
                    >
                        {/* Abstract Fluid / Tech Background */}
                        <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="border-b border-white/20 pb-12"
                    >
                        <span className="text-sm font-bold tracking-[0.3em] uppercase mb-4 block text-primary shadow-black drop-shadow-lg">Premium Aging Care</span>
                        <h1 className="text-6xl md:text-9xl font-serif font-medium leading-[0.9] text-white mb-8 drop-shadow-xl">
                            TIMELESS <br /> SIGHT
                        </h1>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div>
                                <p className="max-w-xl text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-8 drop-shadow-md">
                                    노화는 자연스러운 현상이지만, 흐릿한 시야까지 당연한 것은 아닙니다.<br />
                                    <strong className="font-bold bg-gradient-to-r from-amber-300 via-primary to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">프리미엄 다초점 인공수정체</strong>로 당신의 시력을 가장 젊었던 순간으로 되돌려드립니다.
                                </p>
                                <h2 className="text-3xl md:text-4xl font-serif mb-8 text-white">다시, 선명한 세상을 만날 준비가 되셨나요?</h2>
                                <Button size="lg" className="rounded-full px-12 h-16 text-lg bg-white text-black hover:bg-primary transition-colors font-bold">
                                    노안 정밀검사 신청하기 &rarr;
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AgingProcess />
            <CataractCheck />
            <LifestyleMatch />
            <LensGuide />
        </div>
    );
}
