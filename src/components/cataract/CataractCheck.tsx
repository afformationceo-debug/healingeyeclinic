"use client";

import { motion } from "framer-motion";
import { CheckSquare, AlertCircle } from "lucide-react";
import { useState } from "react";

const checkList = [
    "작은 글씨가 뿌옇게 보이거나 초점이 잘 맞지 않는다.",
    "밝은 곳보다 어두운 곳에서 더 잘 보인다 (주맹 현상).",
    "사물이 이중, 삼중으로 겹쳐 보인다 (복시).",
    "빛 번짐이 심해 밤 운전이 어렵다.",
    "눈이 자꾸 침침하고 피로감을 자주 느낀다.",
    "돋보기를 써도 가까운 글씨가 잘 안 보인다."
];

export default function CataractCheck() {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const toggleCheck = (index: number) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(i => i !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    return (
        <section className="py-24 bg-white text-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16">

                    <div className="w-full md:w-1/3">
                        <span className="text-amber-600 font-bold tracking-[0.2em] uppercase block mb-4">Self Check</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                            혹시 나도 <br /> <span className="text-amber-600">백내장</span>일까요?
                        </h2>
                        <p className="text-neutral-500 mb-8 leading-relaxed">
                            백내장은 초기 증상이 노안과 비슷하여 방치하기 쉽습니다.
                            3개 이상 해당된다면 정밀 검진이 필요합니다.
                        </p>
                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                            <div className="flex items-start gap-4 mb-2">
                                <AlertCircle className="text-amber-600 shrink-0" />
                                <span className="font-bold text-amber-900">Health Tip</span>
                            </div>
                            <p className="text-sm text-amber-800">
                                40대 이상이라면 1년에 한 번 안과 정기 검진을 권장합니다.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {checkList.map((item, i) => (
                            <motion.div
                                key={i}
                                onClick={() => toggleCheck(i)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${checkedItems.includes(i)
                                        ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                                        : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-amber-300"
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 mt-1 transition-colors ${checkedItems.includes(i) ? "bg-white border-white text-amber-600" : "bg-white border-neutral-300"
                                    }`}>
                                    {checkedItems.includes(i) && <CheckSquare size={16} />}
                                </div>
                                <span className="text-lg font-medium leading-snug">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
