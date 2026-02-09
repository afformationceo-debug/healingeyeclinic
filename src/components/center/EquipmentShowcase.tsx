"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const equipment = [
    // 시력교정술 장비
    {
        name: "AMARIS SPT",
        tag: "시력교정 레이저",
        desc: "프리미엄 레이저 장비 아마리스. 3D 3차원 입체 교정과 각막 연마 시스템으로 정밀한 시력교정을 구현합니다.",
        specs: ["3D 3차원 입체 교정", "0.54mm 정밀 레이저 빔", "7차원 안구추적", "스마트 펄스"],
        img: "/images/center/equipment/amaris-spt.png",
        needsWhiteBg: true
    },
    {
        name: "Galilei G4",
        tag: "각막 단층 촬영",
        desc: "3차원 각막 분석 최첨단 검사 장비. 가장 빠른 1초의 검사로 122,000개 데이터 포인트를 측정합니다.",
        specs: ["1초 초고속 검사", "122,000개 데이터", "3차원 각막 분석", "전안부 CT 정밀장비"],
        img: "/images/center/equipment/galilei-g4.png"
    },
    {
        name: "Pentacam HR",
        tag: "각막 지형도",
        desc: "정밀각막분석을 통해 수술 가능 여부를 결정하고 부작용으로부터 빠른 대처가 가능합니다. 정밀하고 정확한 백내장 검사도 가능합니다.",
        specs: ["정밀각막분석", "부작용 대처", "정확한 지형도 데이터", "백내장 검사"],
        img: "/images/center/equipment/pentacam-hr.png"
    },
    {
        name: "3D OCT-1",
        tag: "안구 광학 단층",
        desc: "시신경 및 망막의 CT 촬영기. 짧은 촬영시간으로 불편함을 감소시키며 녹내장, 당뇨망막병증, 황반변성 등을 진단할 수 있습니다.",
        specs: ["시신경·망막 CT", "짧은 촬영시간", "녹내장 진단", "망막질환 진단"],
        img: "/images/center/equipment/3d-oct-1.png"
    },
    {
        name: "Optos Daytona P200T",
        tag: "광학 안저 촬영",
        desc: "산동없이 짧은 시간(0.25초)으로 촬영 가능. 200˚ 와이드 영상으로 한번에 주변부 망막을 촬영하여 망막질환을 조기발견하고 예방할 수 있습니다.",
        specs: ["0.25초 초고속", "200˚ 와이드 영상", "산동 불필요", "조기발견·예방"],
        img: "/images/center/equipment/optos-daytona.png"
    },

    // 노안백내장 장비
    {
        name: "FEMTO LDV Z8",
        tag: "백내장 레이저",
        desc: "현존하는 가장 정밀한 레이저 장비. 정밀한 수정체 제거로 수술 시간을 단축하고 빠른 회복을 가능하게 합니다.",
        specs: ["정밀 수정체 제거", "수술시간 단축", "버블현상 최소화", "7차원 안구추적"],
        img: "/images/center/equipment/femto-ldv-z8.png",
        needsWhiteBg: true
    },
    {
        name: "IOL MASTER 700",
        tag: "눈상태 계측",
        desc: "초정밀 눈상태 레이저 계측기. 안구의 모든 부위를 정밀 검사할 수 있는 비접촉식 최첨단 초정밀 안구레이저 계측기입니다.",
        specs: ["비접촉식 계측", "전체부위 정밀검사", "높은 검사 정확성", "빠르고 안전한 수술"],
        img: "/images/center/equipment/iol-master-700.png"
    },
    {
        name: "CALLISTO EYE",
        tag: "난시 추적 항법",
        desc: "난시 오차율 0%에 도전하는 수술 네비게이션. 정밀한 수술 가이드를 시각화하여 절개 위치, 크기, 인공수정체 위치, 난시축을 정확하게 표시합니다.",
        specs: ["난시 오차율 0%", "수술 가이드 시각화", "정확한 절개위치", "난시축 표시"],
        img: "/images/center/equipment/callisto-eye.png"
    },
    {
        name: "LUMERA 700",
        tag: "초정밀 현미경",
        desc: "탁월한 시야확보 기능으로 질 높은 시력개선을 제공합니다. 최적의 수술 시야를 자동으로 조절하고 환자의 난시축을 자동으로 맞춤 조절합니다.",
        specs: ["탁월한 시야확보", "자동 시야조절", "난시축 자동조절", "빠르고 정밀한 수술"],
        img: "/images/center/equipment/lumera-700.png"
    }
];

export default function EquipmentShowcase() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-16 sm:py-20 md:py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 mb-12">
                <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block">Technology</span>
                <div className="flex justify-between items-end">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white font-bold max-w-2xl leading-tight">
                        World Class <br />
                        High-End Equipment
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-3">
                        <Button
                            onClick={scrollPrev}
                            disabled={!prevBtnEnabled}
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                        >
                            <ChevronLeft size={20} className="md:w-6 md:h-6" />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            disabled={!nextBtnEnabled}
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                        >
                            <ChevronRight size={20} className="md:w-6 md:h-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-3 sm:gap-4 md:gap-6 pl-4 sm:pl-6 md:pl-[10vw]">
                    {equipment.map((item, i) => (
                        <div key={i} className="flex-[0_0_90%] md:flex-[0_0_600px] aspect-[16/9] relative rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden group border border-white/10">
                            <div className={`absolute inset-0 ${item.needsWhiteBg ? 'bg-white' : 'bg-neutral-900'}`}>
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-12">
                                <span className="bg-primary text-black text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3 md:mb-4 inline-block">{item.tag}</span>
                                <h3 className="text-base sm:text-lg md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{item.name}</h3>
                                <p className="text-neutral-300 leading-snug sm:leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-md text-xs sm:text-sm md:text-base line-clamp-3 md:line-clamp-none">
                                    {item.desc}
                                </p>

                                <div className="flex gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
                                    {item.specs.map((spec, s_i) => (
                                        <div key={s_i} className="border border-white/20 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs font-mono text-neutral-400">
                                            {spec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {equipment.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => emblaApi?.scrollTo(idx)}
                        className={`h-2 rounded-full transition-all ${
                            idx === selectedIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                    />
                ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center gap-3 mt-8">
                <Button
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                >
                    <ChevronLeft size={20} />
                </Button>
                <Button
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full border-white/20 hover:border-primary hover:bg-primary hover:text-black disabled:opacity-30"
                >
                    <ChevronRight size={20} />
                </Button>
            </div>
        </section>
    );
}
