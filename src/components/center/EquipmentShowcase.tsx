"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

const equipment = [
    {
        name: "ZEISS VisuMax 800",
        tag: "SMILE PRO",
        desc: "기존 스마일라식보다 3배 더 빠른 10초대 레이저 조사 시간. 안구 고정 시스템으로 수술 중 안구 움직임을 완벽하게 컨트롤합니다.",
        specs: ["2MHz Laser Frequency", "10s Laser Time", "CentraLign® System"],
        img: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        name: "ZEISS MEL 90",
        tag: "LASIK / LASEK",
        desc: "최소 절삭으로 각막을 최대한 보존하는 초정밀 엑시머 레이저. 트리플 A 알고리즘으로 야간 빛번짐을 획기적으로 줄였습니다.",
        specs: ["500Hz Frequency", "0.7mm Spot", "Triple-A Algorithm"],
        img: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        name: "AMARIS RED 1050RS",
        tag: "ALL LASER",
        desc: "현존하는 장비 중 가장 빠른 1050Hz 속도. 7차원 안구 추적 장치로 미세한 눈의 떨림까지 정확하게 보정합니다.",
        specs: ["1050Hz Speed", "7D Eye Tracker", "0.54mm Spot"],
        img: "https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        name: "OCULUS Pentacam HR",
        tag: "DIAGNOSIS",
        desc: "세계적인 표준으로 인정받는 각막 단층 촬영 장비. 25,000포인트의 정밀 스캔으로 부작용 가능성을 0.1%까지 찾아냅니다.",
        specs: ["Scheimpflug Camera", "3D Modeling", "Belin/Ambrósio Display"],
        img: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
];

export default function EquipmentShowcase() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={targetRef} className="py-32 bg-black overflow-hidden relative min-h-[150vh]">
            <div className="container mx-auto px-6 mb-20 sticky top-32 z-20">
                <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block">Technology</span>
                <h2 className="text-4xl md:text-6xl font-serif text-white font-bold max-w-2xl leading-tight">
                    World Class <br />
                    High-End Equipment
                </h2>
            </div>

            <div className="sticky top-80 overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-[30vw]">
                    {equipment.map((item, i) => (
                        <div key={i} className="min-w-[400px] md:min-w-[600px] aspect-[16/9] relative rounded-[3rem] overflow-hidden group border border-white/10 shrink-0">
                            <div className="absolute inset-0 bg-neutral-900">
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-10 md:p-12">
                                <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">{item.tag}</span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{item.name}</h3>
                                <p className="text-neutral-300 leading-relaxed mb-8 max-w-md">
                                    {item.desc}
                                </p>

                                <div className="flex gap-3 flex-wrap">
                                    {item.specs.map((spec, s_i) => (
                                        <div key={s_i} className="border border-white/20 rounded-full px-4 py-2 text-xs font-mono text-neutral-400">
                                            {spec}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
