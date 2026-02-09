"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const doctors = [
    {
        name: "김선영",
        position: "대표원장",
        title: "안과전문의/임상교수",
        specialty: "스마일·클리어 / 노안백내장 / 안구건조증",
        desc: "대학병원 교수로 재직하며 난치성 안구건조증과 백내장 치료에 매진해왔습니다. 강남 유일의 단독 개원 여성 안과 전문의로서, 섬세함의 차이가 만드는 최상의 수술 결과를 약속드립니다.",
        career: [
            "가톨릭대학교 의과대학 대학원 석사",
            "2009-2013 가톨릭대학교 가톨릭중앙의료원 안과 전문의",
            "2013-2016 의정부 성모병원 각막,백내장 임상교수",
            "2009년 서울성모병원 최우수 전공의 표창",
            "2008년 보건복지부장관상",
            "제 108회 대한안과학회 구연상 수상",
            "질병관리본부 역학조사 표창장 수상",
            "대한안과학회(KOS) 정회원",
            "한국외안부연구회(KEEDS) 정회원",
            "한국콘택트렌즈(KCLSS) 정회원",
            "유럽백내장굴절수술학회(ESCRS) 정회원"
        ],
        img: "/images/doctors/1.png"
    },
    {
        name: "임성웅",
        position: "대표원장",
        title: "안과전문의",
        specialty: "망막 / 녹내장 / 시력교정",
        desc: "정확한 진단은 성공적인 수술의 첫걸음입니다. 대학병원급 첨단 검사 시스템과 데이터를 분석하는 통찰력으로, 당신의 눈 상태에 가장 적합한 맞춤형 치료 계획을 수립합니다.",
        career: ["연세대학교 의과대학 졸업", "세브란스병원 안과 전문의", "전) 실로암안과병원 진료과장", "한국망막학회 정회원"],
        img: "/images/doctors/2.png"
    },
    {
        name: "이용은",
        position: "원장",
        title: "안과전문의",
        specialty: "소아안과 / 드림렌즈",
        desc: "아이의 시력은 평생의 자산입니다. 성장기 근시 진행 억제부터 드림렌즈 처방까지, 아이들의 눈높이에 맞춘 따뜻하고 세심한 진료로 부모님의 걱정까지 덜어드리겠습니다.",
        career: [
            "대전과학고등학교 졸업",
            "가톨릭대학교 의과대학 차석 졸업",
            "가톨릭대학교 의과대학 대학원 석사",
            "서울성모병원 백내장 임상교수",
            "대한안과학회(KOS)정회원",
            "한국백내장굴절수술학회(KSCRS) 정회원",
            "대한안과의사회(KOA)정회원",
            "미국 백내장굴절수술학회(ASCRS) 정회원",
            "유럽 백내장굴절수술학회(ESCRS) 정회원",
            "미국재향군인 검진의사(Veterans Evaluation Services)"
        ],
        img: "/images/doctors/3.png"
    }
];

export default function MedicalTeam() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps"
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="bg-neutral-950 relative py-16 sm:py-20 md:py-32 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 md:mb-20">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-4">Medical Team</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
                            Mastery <br />
                            <span className="text-neutral-500 italic">of Vision.</span>
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-3 sm:gap-4 mt-8 md:mt-0">
                        <motion.button
                            onClick={scrollPrev}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
                        >
                            <ChevronLeft className="text-white group-hover:text-black transition-colors" size={24} />
                        </motion.button>
                        <motion.button
                            onClick={scrollNext}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
                        >
                            <ChevronRight className="text-white group-hover:text-black transition-colors" size={24} />
                        </motion.button>
                    </div>
                </div>

                {/* Embla Carousel */}
                <div className="overflow-hidden hidden md:block" ref={emblaRef}>
                    <div className="flex gap-6 sm:gap-8 md:gap-12">
                        {doctors.map((doc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative flex-[0_0_90%] md:flex-[0_0_650px] group cursor-grab active:cursor-grabbing"
                            >
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative bg-white rounded-[2rem] border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                                >
                                    {/* Doctor Image */}
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                        <Image
                                            src={doc.img}
                                            alt={doc.name}
                                            fill
                                            sizes="(max-width: 768px) 90vw, 650px"
                                            className="object-cover object-top transition-all duration-700 scale-100 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-8 left-8 z-20">
                                            <div className="flex flex-col gap-2 mb-2">
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3">
                                                    <span className="bg-primary text-black text-xs sm:text-sm font-bold px-3 py-1 rounded-full w-fit">{doc.position}</span>
                                                </div>
                                                <span className="text-white/80 text-sm font-medium">{doc.title}</span>
                                            </div>
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{doc.name}</h3>
                                        </div>
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="p-6 sm:p-7 md:p-8 space-y-6">
                                        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-serif leading-relaxed">
                                            &ldquo;{doc.desc}&rdquo;
                                        </p>
                                        <div className="border-t border-gray-200 pt-6">
                                            <h4 className="text-sm text-primary font-bold tracking-wider uppercase mb-4">Career</h4>
                                            <ul className="space-y-3">
                                                {doc.career.map((c, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                        <span className="flex-1">{c}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
