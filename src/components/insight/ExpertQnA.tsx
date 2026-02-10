"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const qnaImages = [
    "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5998468/pexels-photo-5998468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

export default function ExpertQnA() {
    const t = useTranslations('Insight.ExpertQnA');
    const qnaData = t.raw('items') as Array<{
        q: string;
        a: string;
        doc: string;
    }>;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 md:py-32">
            <div className="flex flex-col md:flex-row gap-16">
                <div className="md:w-1/3">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">{t('sectionTitle')}</span>
                    <h2 className="text-4xl font-serif font-bold mb-6 text-black">
                        {t('headline')}<br /> {t('headlineHighlight')}
                    </h2>
                    <p className="text-neutral-500 leading-relaxed mb-8 whitespace-pre-line">
                        {t('description')}
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
                                    <img src={qnaImages[i]} alt={item.doc} className="w-12 h-12 rounded-full object-cover border border-white/20 hidden md:block" />
                                    <div>
                                        <p className={`text-base leading-relaxed mb-4 ${openIndex === i ? "text-neutral-300" : "text-neutral-600"}`}>
                                            "{item.a}"
                                        </p>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${openIndex === i ? "text-primary" : "text-neutral-500"}`}>
                                            {t('answeredBy')} {item.doc}
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
