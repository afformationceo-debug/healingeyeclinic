"use client";

import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
    {
        id: 1,
        name: "김지*",
        age: "20대",
        surgery: "스마일 라식 (SMILE PRO)",
        content: "안경 없는 아침이 이렇게 감동적일 줄 몰랐습니다. 수술 당일만 조금 뿌옇고 다음날부터 신세계였어요. 특히 야간 빛번짐 걱정했는데, 전혀 불편함 없이 야간 운전도 잘 하고 있습니다. 원장님이 직접 검안부터 수술까지 봐주셔서 더욱 믿음이 갔습니다.",
        rating: 5,
        date: "2024.01.15"
    },
    {
        id: 2,
        name: "이형*",
        age: "40대",
        surgery: "다초점 인공수정체 (노안백내장)",
        content: "돋보기 없이는 핸드폰도 보기 힘들었는데, 이제는 골프 공도 선명하게 보이고 친구들과 카톡도 편하게 합니다. 단순히 수술을 넘어 삶의 질을 선물 받은 기분입니다. 병원 시설도 호텔처럼 고급스럽고 직원분들도 너무 친절하셔서 편안하게 수술 받았습니다.",
        rating: 5,
        date: "2024.01.12"
    },
    {
        id: 3,
        name: "박서*",
        age: "30대",
        surgery: "ICL 렌즈삽입술",
        content: "각막이 얇아서 라식 불가능 판정 받고 좌절했었는데, 힐링안과에서 ICL로 광명 찾았습니다. 렌즈 이물감도 전혀 없고 건조증도 오히려 렌즈 낄 때보다 덜해요. 고민했던 시간이 아까울 정도입니다. 강추합니다!",
        rating: 5,
        date: "2024.01.08"
    },
    {
        id: 4,
        name: "최민*",
        age: "50대",
        surgery: "노안 라식 (Monovision)",
        content: "노안 때문에 업무 보기가 너무 힘들었는데, 모노비전 라식 후 근거리 작업이 한결 수월해졌습니다. 처음엔 적응 기간이 필요하다고 하셨는데, 생각보다 금방 적응했고 지금은 안경 없이 회의 자료도 잘 봅니다.",
        rating: 5,
        date: "2023.12.29"
    },
    {
        id: 5,
        name: "정하*",
        age: "20대",
        surgery: "투데이 라섹",
        content: "통증 때문에 걱정 많이 했는데, 2일 정도만 눈시림 있고 그 이후론 편안했습니다. 보호렌즈 빼고 나니 시력이 확 올라오는게 느껴졌어요. 1.5 시력 유지 중입니다. 감사합니다!",
        rating: 5,
        date: "2023.12.20"
    }
];

export default function Review() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-32 bg-neutral-900 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
                            Real Stories
                        </h2>
                        <p className="text-neutral-400 text-lg">
                            데이터로 증명된 결과, 고객님들의 생생한 이야기입니다.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={scrollPrev}
                            variant="outline"
                            size="icon"
                            className="rounded-full w-14 h-14 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            variant="outline"
                            size="icon"
                            className="rounded-full w-14 h-14 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
                        >
                            <ChevronRight size={24} />
                        </Button>
                    </div>
                </motion.div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-6">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="bg-zinc-900/50 border border-white/10 p-10 h-full rounded-[2rem] flex flex-col justify-between backdrop-blur-sm group hover:border-primary/50 transition-colors"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <Quote className="text-primary/50 w-10 h-10 rotate-180" />
                                            <div className="flex gap-1">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={16} fill="#FCD34D" className="text-amber-300" />
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                                            {review.surgery}
                                        </h3>

                                        <p className="text-zinc-300 text-lg leading-relaxed mb-8 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                            "{review.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-xs">
                                            {review.name.slice(0, 1)}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">{review.name}</p>
                                            <p className="text-zinc-500 text-xs">{review.age} · {review.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
