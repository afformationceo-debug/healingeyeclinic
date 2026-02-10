"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Question data with keys for comparison logic
const questionsData = [
    {
        id: "age",
        questionKey: "questions.age.question",
        options: [
            { key: "under30", labelKey: "questions.age.options.under30" },
            { key: "30s", labelKey: "questions.age.options.30s" },
            { key: "40s", labelKey: "questions.age.options.40s" },
            { key: "50plus", labelKey: "questions.age.options.50plus" }
        ]
    },
    {
        id: "symptom",
        questionKey: "questions.symptom.question",
        options: [
            { key: "glassesDiscomfort", labelKey: "questions.symptom.options.glassesDiscomfort" },
            { key: "dryFatigue", labelKey: "questions.symptom.options.dryFatigue" },
            { key: "nearVision", labelKey: "questions.symptom.options.nearVision" },
            { key: "lightGlare", labelKey: "questions.symptom.options.lightGlare" }
        ]
    },
    {
        id: "lifestyle",
        questionKey: "questions.lifestyle.question",
        options: [
            { key: "digitalDevice", labelKey: "questions.lifestyle.options.digitalDevice" },
            { key: "outdoor", labelKey: "questions.lifestyle.options.outdoor" },
            { key: "driving", labelKey: "questions.lifestyle.options.driving" },
            { key: "reading", labelKey: "questions.lifestyle.options.reading" }
        ]
    }
];

// Result keys for translation
type ResultKey = "cataract" | "smileLasik" | "customLasek";

export default function AISurveyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const t = useTranslations("Home.AISurvey");
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<ResultKey | null>(null);

    const handleSelect = (optionKey: string) => {
        setAnswers({ ...answers, [questionsData[step].id]: optionKey });
        if (step < questionsData.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult({ ...answers, [questionsData[step].id]: optionKey });
        }
    };

    const calculateResult = (finalAnswers: Record<string, string>) => {
        // Set to loading state
        setStep(questionsData.length);

        // Simple mock logic for demo - now using option keys instead of Korean text
        setTimeout(() => {
            if (finalAnswers.age === "50plus" || finalAnswers.symptom === "nearVision") {
                setResult("cataract");
            } else if (finalAnswers.lifestyle === "outdoor") {
                setResult("smileLasik");
            } else {
                setResult("customLasek");
            }
        }, 1000);
    };

    const handleReset = () => {
        setStep(0);
        setAnswers({});
        setResult(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-[#1a1a1a] border border-white/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((step + 1) / (questionsData.length + 1)) * 100}%` }}
                                className="h-full bg-primary"
                            />
                        </div>

                        {step < questionsData.length ? (
                            // Question Step
                            <div key={step}>
                                <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
                                    {t("stepLabel", { step: step + 1 })}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
                                    {t(questionsData[step].questionKey)}
                                </h2>
                                <div className="space-y-3">
                                    {questionsData[step].options.map((opt, i) => (
                                        <motion.button
                                            key={opt.key}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => handleSelect(opt.key)}
                                            className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-primary hover:text-black hover:border-primary transition-all flex justify-between items-center group"
                                        >
                                            <span className="font-medium">{t(opt.labelKey)}</span>
                                            <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        ) : !result ? (
                            // Loading Step
                            <div className="py-20 text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full mx-auto mb-6"
                                />
                                <h3 className="text-xl font-bold text-white mb-2">{t("loading.title")}</h3>
                                <p className="text-white/50 text-sm">{t("loading.subtitle")}</p>
                            </div>
                        ) : (
                            // Result Step
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Check size={40} />
                                </motion.div>
                                <span className="text-neutral-400 text-sm uppercase tracking-widest mb-2 block">
                                    {t("result.badge")}
                                </span>
                                <h2 className="text-3xl font-bold text-white mb-6">
                                    <span className="text-primary">{t(`results.${result}.name`)}</span>
                                    <br />
                                    {t("result.suitable")}
                                </h2>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    {t("result.description")}
                                    <br />
                                    {t("result.callToAction")}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={handleReset}
                                        className="border-white/10 hover:bg-white/10 text-white"
                                    >
                                        {t("buttons.retry")}
                                    </Button>
                                    <Button className="bg-primary text-black hover:bg-white">
                                        {t("buttons.book")}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
