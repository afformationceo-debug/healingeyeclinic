"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SymptomChecklist() {
    const t = useTranslations('Center.SymptomChecklist');
    const symptoms = t.raw('items') as string[];
    const [checked, setChecked] = useState<number[]>([]);

    const toggle = (i: number) => {
        setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    };

    return (
        <section className="py-20 bg-neutral-50 rounded-[3rem] my-20 p-8 md:p-16">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">{t('sectionTitle')}</span>
                    <h2 className="text-4xl font-serif font-bold text-black mb-6">
                        {t('headline')}<br /> {t('headlineHighlight')}
                    </h2>
                    <p className="text-neutral-500 leading-relaxed mb-8 whitespace-pre-line">
                        {t('description')}
                    </p>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100">
                        <div className="text-4xl font-black text-primary mb-2">{checked.length} / {symptoms.length}</div>
                        <div className="text-sm font-bold text-neutral-400">{t('checkedLabel')}</div>
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
