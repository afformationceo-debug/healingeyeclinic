"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Calendar } from "lucide-react";
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
    },
    {
        id: 6,
        name: "안수*",
        age: "30대",
        surgery: "재수술 (라식 → 노안라섹)",
        content: "타병원 라식 후 시력 저하로 재수술 받았습니다. 불안했지만 원장님께서 각막 상태 꼼꼼히 체크하시고 안전하게 진행해주셔서 감사합니다. 지금은 1.2 시력 유지 중이고 야간시력도 이전보다 좋아졌어요.",
        rating: 5,
        date: "2023.12.15"
    },
    {
        id: 7,
        name: "윤지*",
        age: "20대",
        surgery: "라섹 (각막 얇음)",
        content: "각막이 얇아서 고민 많았는데, 힐링안과에서 라섹으로 안전하게 받았습니다. 회복도 빠르고 지금 6개월 됐는데 시력 완전 만족합니다!",
        rating: 5,
        date: "2023.12.10"
    },
    {
        id: 8,
        name: "조현*",
        age: "40대",
        surgery: "백내장 (프리미엄 렌즈)",
        content: "백내장 수술 후 30년 전 시력으로 돌아간 기분입니다. 안경 없이 골프도 하고, 책도 읽고, 인생이 달라졌어요. 주저하지 마시고 상담 받아보세요!",
        rating: 5,
        date: "2023.12.05"
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

    // Auto-play functionality
    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <section className="py-16 sm:py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(218,165,32,0.03),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 md:mb-16 gap-8"
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
                            Real Stories
                            <span className="text-primary">.</span>
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                            데이터로 증명된 결과, 고객님들의 생생한 이야기입니다.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={scrollPrev}
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-primary transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-primary transition-colors shadow-sm"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Button>
                    </div>
                </motion.div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 sm:-ml-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-4 sm:pl-6">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="bg-gray-50 border border-gray-200 p-6 sm:p-7 md:p-8 h-full rounded-xl sm:rounded-2xl flex flex-col justify-between group hover:border-primary/50 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <Quote className="text-primary/40 w-10 h-10 rotate-180" />
                                            <div className="flex gap-1">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" fill="#FCD34D" stroke="#FCD34D" />
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
                                            {review.surgery}
                                        </h3>

                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                            "{review.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-900 font-bold text-xs">
                                            {review.name.slice(0, 1)}
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-bold">{review.name}</p>
                                            <p className="text-gray-500 text-xs">{review.age} · {review.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-gray-600 mb-6 text-base sm:text-lg font-light tracking-wide">
                            평생 시력, 지금 시작하세요
                        </p>
                        <Button
                            onClick={() => {
                                console.log('CTA clicked - will connect to booking modal/page later');
                                // TODO: Connect to booking modal or consultation page
                            }}
                            className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold text-base sm:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#FFD700]/30 transition-all duration-300 hover:scale-105 group"
                        >
                            <Calendar className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            지금 바로 전문가 상담 예약하기
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
