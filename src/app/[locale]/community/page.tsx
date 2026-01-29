"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Instagram, Calendar, MessageCircle } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-500 text-sm font-bold tracking-widest uppercase">Live Support</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white">
                            HEALING <br /> COMMUNITY
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-8 md:mt-0 flex gap-4"
                    >
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-neutral-800 hover:bg-neutral-700 text-white">수술 후기 보러가기</Button>
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">실시간 예약하기</Button>
                    </motion.div>
                </div>

                {/* Notices & Events */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-primary block" /> 공지사항 & 이벤트
                        </h2>
                        <div className="space-y-4">
                            {[
                                { title: "2024년 설 연휴 진료 안내", date: "2024.01.15", tag: "공지" },
                                { title: "수험생 대상 스마일라식 최대 49% 할인 이벤트", date: "2024.01.01", tag: "이벤트" },
                                { title: "힐링안과 누적 수술 5만안 달성 기념", date: "2023.12.10", tag: "소식" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer group">
                                    <div>
                                        <span className="text-xs font-bold text-primary border border-primary/30 px-2 py-1 rounded mb-2 inline-block mr-3">{item.tag}</span>
                                        <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors inline">{item.title}</h3>
                                    </div>
                                    <span className="text-neutral-500 text-sm">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Proof Gallery */}
                    <div className="md:col-span-1 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all">
                        <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                            <Instagram size={32} />
                        </div>
                        <div className="mt-8">
                            <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Instagram</span>
                            <h3 className="text-3xl font-bold text-white mb-6">@healingeye_official</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                                    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                                    "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                                    "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                ].map((src, i) => (
                                    <div key={i} className="aspect-square relative rounded-lg overflow-hidden group/img cursor-pointer">
                                        <img src={src} alt="Instagram" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="text-white mt-4 p-0 hover:text-primary">인스타그램 바로가기 &rarr;</Button>
                        </div>
                    </div>
                </div>

                {/* FAQ - Accordion Style */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-primary block" /> 자주 묻는 질문 (FAQ)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { q: "스마일 라식 수술 시간은 얼마나 걸리나요?", a: "양안 기준 약 10분 내외로 매우 짧습니다." },
                            { q: "수술 후 바로 일상생활이 가능한가요?", a: "네, 스마일 라식은 다음날부터 세안, 기초 화장이 가능합니다." },
                            { q: "당일 검사 후 당일 수술도 가능한가요?", a: "네, 원데이(One-day) 라식 프로그램을 운영하고 있습니다." },
                            { q: "백내장 수술 시 통증이 있나요?", a: "점안 마취를 진행하므로 통증은 거의 느껴지지 않습니다." },
                            { q: "노안 교정 렌즈의 수명은 어떻게 되나요?", a: "삽입된 인공수정체는 반영구적으로 유지됩니다." },
                            { q: "진료 예약은 필수인가요?", a: "대기 시간 단축을 위해 예약 후 내원을 권장드립니다." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8 hover:bg-neutral-800 hover:border-primary/30 transition-colors cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-primary font-bold text-xl">Q.</span>
                                    <Plus className="text-white/20 group-hover:text-primary transition-colors group-hover:rotate-90 duration-300" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.q}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
