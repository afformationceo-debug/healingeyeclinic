"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
    {
        title: "스마일라식 전 이 영상 필수! 실패 없는 병원 고르는 법",
        category: "닥터 아이시스 (Dr. Eye Sis)",
        time: "08:24",
        img: "https://images.pexels.com/photos/5752263/pexels-photo-5752263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        title: "노안백내장 수술, 렌즈 선택이 평생을 좌우합니다",
        category: "닥터 아이시스 (Dr. Eye Sis)",
        time: "12:15",
        img: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        title: "안구건조증, 인공눈물만 넣고 계신가요? 근본적인 치료법",
        category: "닥터 아이시스 (Dr. Eye Sis)",
        time: "06:30",
        img: "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
];

export default function VideoGallery() {
    return (
        <section className="py-20 border-t border-white/10">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">YouTube Channel</span>
                    <h2 className="text-4xl font-serif font-bold text-white">닥터 아이시스 @dreyesis</h2>
                </div>
                <button
                    onClick={() => window.open('https://www.youtube.com/@dreyesis', '_blank')}
                    className="hidden md:block text-sm font-bold border-b border-white pb-1 text-white hover:text-primary hover:border-primary transition-colors"
                >
                    채널 바로가기 &rarr;
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {videos.map((vid, i) => (
                    <div key={i} className="group cursor-pointer" onClick={() => window.open('https://www.youtube.com/@dreyesis', '_blank')}>
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-neutral-900 border border-white/10">
                            <img src={vid.img} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                                    <Play fill="currentColor" className="text-white ml-1 group-hover:text-black" />
                                </div>
                            </div>
                            <span className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                {vid.time}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{vid.category}</span>
                        <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors">{vid.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
