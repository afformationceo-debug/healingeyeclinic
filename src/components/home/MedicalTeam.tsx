"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const doctors = [
    {
        name: "김선영",
        position: "대표원장",
        specialty: "스마일·클리어 / 노안백내장 / 안구건조증",
        desc: "대학병원 교수로 재직하며 난치성 안구건조증과 백내장 치료에 매진해왔습니다. 강남 유일의 단독 개원 여성 안과 전문의로서, 섬세함의 차이가 만드는 최상의 수술 결과를 약속드립니다.",
        career: ["가톨릭대학교 의과대학 졸업 및 안과 전문의", "가톨릭대학교 의과대학 대학원 안과학 석사", "전) 가톨릭대학교 성모병원 안과 교수", "의정부 성모병원 각막/백내장 임상교수", "대한안과학회(KOS) 정회원", "한국백내장굴절수술학회(KSCRS) 정회원", "미국안과학회(AAO) 정회원"],
        img: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        name: "서지원",
        position: "부원장",
        specialty: "망막 / 녹내장 / 시력교정",
        desc: "정확한 진단은 성공적인 수술의 첫걸음입니다. 대학병원급 첨단 검사 시스템과 데이터를 분석하는 통찰력으로, 당신의 눈 상태에 가장 적합한 맞춤형 치료 계획을 수립합니다.",
        career: ["연세대학교 의과대학 졸업", "세브란스병원 안과 전문의", "전) 실로암안과병원 진료과장", "한국망막학회 정회원"],
        img: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        name: "최성훈",
        position: "원장",
        specialty: "소아안과 / 드림렌즈",
        desc: "아이의 시력은 평생의 자산입니다. 성장기 근시 진행 억제부터 드림렌즈 처방까지, 아이들의 눈높이에 맞춘 따뜻하고 세심한 진료로 부모님의 걱정까지 덜어드리겠습니다.",
        career: ["가톨릭대학교 의과대학 졸업", "서울성모병원 안과 전문의", "대한소아안과학회 정회원", "한국콘택트렌즈학회 정회원"],
        img: "https://images.pexels.com/photos/5998468/pexels-photo-5998468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
];

export default function MedicalTeam() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="bg-neutral-950 relative min-h-[300vh]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />

                <div className="absolute top-20 left-10 md:left-20 z-20">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-4">Medical Team</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                        Mastery <br />
                        <span className="text-neutral-500 italic">of Vision.</span>
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-20 pl-[5vw] md:pl-[40vw] pr-[20vw]">
                    {doctors.map((doc, i) => (
                        <div key={i} className="relative w-[85vw] md:w-[600px] shrink-0 group">
                            <div className="aspect-[3/4] relative overflow-hidden rounded-[2rem] mb-12 border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                <img
                                    src={doc.img}
                                    alt={doc.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                />
                                <div className="absolute bottom-10 left-10 z-20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">{doc.position}</span>
                                        <span className="text-white/80 text-sm font-medium tracking-wider">{doc.specialty}</span>
                                    </div>
                                    <h3 className="text-5xl font-black text-white">{doc.name}</h3>
                                </div>
                            </div>

                            <div className="space-y-8 px-4">
                                <p className="text-xl md:text-2xl text-neutral-300 font-serif leading-relaxed">
                                    "{doc.desc}"
                                </p>
                                <div className="border-t border-white/10 pt-8">
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {doc.career.map((c, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-neutral-500">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
