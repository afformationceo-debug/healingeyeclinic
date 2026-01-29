"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

const symptoms = [
    "눈이 자주 뻑뻑하고 이물감이 느껴진다.",
    "아침에 일어날 때 눈을 뜨기 힘들다.",
    "빛을 보면 눈이 시리고 눈물이 난다.",
    "실내에서도 선글라스를 끼고 싶을 정도로 눈이 부시다.",
    "시야가 뿌옇게 보이고 답답하다.",
    "직선이 휘어져 보이거나 시야 중심이 검게 보인다."
];

export default function SymptomChecklist() {
    const [checked, setChecked] = useState<number[]>([]);

    const toggle = (i: number) => {
        setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    };

    return (
        <section className="py-20 bg-neutral-50 rounded-[3rem] my-20 p-8 md:p-16">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Self Check</span>
                    <h2 className="text-4xl font-serif font-bold text-black mb-6">
                        내 눈의 이상신호,<br /> 놓치지 마세요.
                    </h2>
                    <p className="text-neutral-500 leading-relaxed mb-8">
                        이 중 2개 이상 해당된다면 안질환 초기 증상일 수 있습니다.<br />
                        방치하면 시력 손상으로 이어질 수 있으니, 지금 바로 정밀 검사를 받아보세요.
                    </p>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100">
                        <div className="text-4xl font-black text-primary mb-2">{checked.length} / {symptoms.length}</div>
                        <div className="text-sm font-bold text-neutral-400">CHECKED SYMPTOMS</div>
                    </div>
                </div>

                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {symptoms.map((sym, i) => (
                        <motion.div
                            key={i}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggle(i)}
                            className={`p-6 rounded-xl border-2 cursor-pointer flex items-start gap-4 transition-all duration-300 ${checked.includes(i) ? "border-primary bg-primary/5 shadow-md" : "border-transparent bg-white shadow-sm hover:shadow-md"}`}
                        >
                            <div className={`${checked.includes(i) ? "text-primary" : "text-neutral-300"}`}>
                                {checked.includes(i) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                            </div>
                            <span className={`font-bold leading-relaxed ${checked.includes(i) ? "text-black" : "text-neutral-500"}`}>{sym}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
