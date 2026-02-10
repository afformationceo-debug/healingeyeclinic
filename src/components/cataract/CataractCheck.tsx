"use client";

import { motion } from "framer-motion";
import { CheckSquare, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CataractCheck() {
    const t = useTranslations('Cataract.Check');
    const checkList = t.raw('items') as string[];
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
                        <span className="text-amber-600 font-bold tracking-[0.2em] uppercase block mb-4">{t('sectionTitle')}</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                            {t('headline')} <br /> <span className="text-amber-600">{t('headlineHighlight')}</span>
                        </h2>
                        <p className="text-neutral-500 mb-8 leading-relaxed">
                            {t('description')}
                        </p>
                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                            <div className="flex items-start gap-4 mb-2">
                                <AlertCircle className="text-amber-600 shrink-0" />
                                <span className="font-bold text-amber-900">{t('healthTip.title')}</span>
                            </div>
                            <p className="text-sm text-amber-800">
                                {t('healthTip.content')}
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
