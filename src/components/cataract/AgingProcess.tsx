"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AgingProcess() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const blurValue = useTransform(scrollYProgress, [0.3, 0.6], ["0px", "10px"]);
    const opacityValue = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.3]);

    return (
        <section ref={targetRef} className="py-32 bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">The Process</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                        Why does vision <br />
                        <span className="text-neutral-500">fade away?</span>
                    </h2>
                    <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                        우리 눈의 수정체는 카메라의 렌즈와 같습니다. 나이가 들면서 이 수정체가 딱딱해지고 혼탁해지는데,
                        이것이 바로 노안과 백내장입니다.
                    </p>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                        힐링안과는 단순히 혼탁해진 수정체를 교체하는 것을 넘어, 환자분의 생활 패턴에 맞는
                        가장 젊고 선명한 시력을 되찾아드리는 것에 집중합니다.
                    </p>
                </div>

                <div className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="text-center">
                            <motion.span
                                style={{ filter: blurValue, opacity: opacityValue }}
                                className="text-6xl font-black text-white block mb-2"
                            >
                                CLEAR
                            </motion.span>
                            <motion.span
                                style={{ opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 1]) }}
                                className="text-6xl font-black text-primary block absolute top-0 left-0 w-full text-center"
                            >
                                HEALED
                            </motion.span>
                        </div>
                    </div>

                    {/* Background visual representing eye lens */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.blue.500)_0%,transparent_50%)] opacity-20" />
                </div>
            </div>
        </section>
    );
}
