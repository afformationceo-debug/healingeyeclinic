"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
    {
        id: "age",
        question: "연령대가 어떻게 되시나요?",
        options: ["20대 이하", "30대", "40대", "50대 이상"]
    },
    {
        id: "symptom",
        question: "가장 불편한 점은 무엇인가요?",
        options: ["안경/렌즈 불편", "눈 건조/피로", "가까운 글씨 안 보임", "빛 번짐 심함"]
    },
    {
        id: "lifestyle",
        question: "평소 라이프스타일은?",
        options: ["컴퓨터/스마트폰 사용 많음", "야외 활동/운동 즐김", "운전 많이 함", "독서/세밀한 작업"]
    }
];

export default function AISurveyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setAnswers({ ...answers, [questions[step].id]: option });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        // Simple mock logic for demo
        setTimeout(() => {
            if (answers.age === "50대 이상" || answers.symptom === "가까운 글씨 안 보임") {
                setResult("노안/백내장 프리미엄 센터");
            } else if (answers.lifestyle === "야외 활동/운동 즐김") {
                setResult("스마일 라식 (SMILE PRO)");
            } else {
                setResult("커스텀 라섹 (Custom LASEK)");
            }
        }, 1000);
        setStep(questions.length); // Loading state
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
                                animate={{ width: `${((step + 1) / (questions.length + 1)) * 100}%` }}
                                className="h-full bg-primary"
                            />
                        </div>

                        {step < questions.length ? (
                            // Question Step
                            <div key={step}>
                                <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">AI Analysis Step {step + 1}</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
                                    {questions[step].question}
                                </h2>
                                <div className="space-y-3">
                                    {questions[step].options.map((opt, i) => (
                                        <motion.button
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => handleSelect(opt)}
                                            className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-primary hover:text-black hover:border-primary transition-all flex justify-between items-center group"
                                        >
                                            <span className="font-medium">{opt}</span>
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
                                <h3 className="text-xl font-bold text-white mb-2">AI가 눈 상태를 분석 중입니다...</h3>
                                <p className="text-white/50 text-sm">10만 건의 임상 데이터를 대조하고 있습니다.</p>
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
                                <span className="text-neutral-400 text-sm uppercase tracking-widest mb-2 block">Recommendation</span>
                                <h2 className="text-3xl font-bold text-white mb-6">
                                    <span className="text-primary">{result}</span><br />이(가) 가장 적합합니다.
                                </h2>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    선택하신 라이프스타일과 증상을 토대로 한 1차 분석 결과입니다.<br />
                                    더 정확한 검사를 위해 정밀 검진 예약을 도와드릴까요?
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/10 text-white">다시하기</Button>
                                    <Button className="bg-primary text-black hover:bg-white">검사 예약하기</Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
