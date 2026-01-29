"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const qnaData = [
    {
        q: "라식 수술 후 시력이 다시 나빠질 수도 있나요?",
        a: "근시 퇴행은 고도근시 환자에서 드물게 발생할 수 있습니다. 하지만 힐링안과의 '스마일 프로'는 각막 절삭량이 적고 구조적 안정성이 뛰어나 근시 퇴행 확률을 획기적으로 낮췄습니다. 만약 시력이 저하되더라도 잔여 각막량에 따라 재교정이 가능하며, 평생 관리 프로그램을 통해 지속적인 케어를 받으실 수 있습니다.",
        doc: "김선영 대표원장",
        img: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        q: "노안 수술, 백내장이 없어도 받을 수 있나요?",
        a: "네, 가능합니다. 수정체의 조절력이 떨어져 근거리가 불편한 경우, '노안 교정 렌즈삽입술' 또는 '모노비전 라식'을 통해 교정할 수 있습니다. 다만, 40대 후반~50대 초반이라면 향후 백내장 발생 가능성까지 고려하여 의료진과 충분한 상담 후 수술 시기를 결정하는 것이 좋습니다.",
        doc: "이준호 원장",
        img: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        q: "안구건조증이 심한데 시력교정술이 가능한가요?",
        a: "안구건조증이 심한 경우 일반 라식보다는 각막 표면 손상이 적은 '스마일 라식'이나 '렌즈삽입술(ICL)'을 권장합니다. 수술 전 'IPL 레이저' 치료를 통해 건조증을 먼저 개선하고, 수술 후 집중 관리 프로그램을 병행하면 건강한 시력을 되찾으실 수 있습니다.",
        doc: "박지민 원장",
        img: "https://images.pexels.com/photos/5998468/pexels-photo-5998468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
];

export default function ExpertQnA() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 md:py-32">
            <div className="flex flex-col md:flex-row gap-16">
                <div className="md:w-1/3">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Medical Q&A</span>
                    <h2 className="text-4xl font-serif font-bold mb-6 text-black">
                        무엇이든<br /> 물어보세요
                    </h2>
                    <p className="text-neutral-500 leading-relaxed mb-8">
                        진료실에서 환자분들이 가장 많이 궁금해하셨던 질문들.<br />
                        안과 전문의가 직접 명쾌하게 답변해 드립니다.
                    </p>
                </div>

                <div className="md:w-2/3 space-y-4">
                    {qnaData.map((item, i) => (
                        <div
                            key={i}
                            className={`border border-black/10 rounded-2xl p-8 transition-all duration-500 cursor-pointer ${openIndex === i ? "bg-black text-white shadow-2xl scale-[1.02]" : "bg-white hover:bg-neutral-50"}`}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`text-xl font-bold ${openIndex === i ? "text-white" : "text-black"}`}>Q. {item.q}</h3>
                                {openIndex === i ? <Minus className="text-primary" /> : <Plus className="text-neutral-400" />}
                            </div>

                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 border-t border-white/10 mt-4 flex gap-6 items-start">
                                    <img src={item.img} alt={item.doc} className="w-12 h-12 rounded-full object-cover border border-white/20 hidden md:block" />
                                    <div>
                                        <p className={`text-base leading-relaxed mb-4 ${openIndex === i ? "text-neutral-300" : "text-neutral-600"}`}>
                                            "{item.a}"
                                        </p>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${openIndex === i ? "text-primary" : "text-neutral-500"}`}>
                                            Answered by {item.doc}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
