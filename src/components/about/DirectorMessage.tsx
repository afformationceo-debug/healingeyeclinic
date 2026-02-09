"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DirectorMessage() {
    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 items-center">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 relative w-full"
                    >
                        <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden relative transition-all duration-700">
                            <Image
                                src="/images/doctors/1.png"
                                alt="Dr. Kim Sun-young"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
                                <span className="block text-primary font-bold tracking-wider sm:tracking-widest uppercase mb-1 sm:mb-2 text-xs sm:text-sm">Representative Director</span>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">Dr. Kim, Sun-young</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="md:w-1/2 space-y-6 sm:space-y-8 md:space-y-10"
                    >
                        <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase block text-sm sm:text-base">Greeting</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                            "Healing Your Eyes,<br />
                            Design Your Life."
                        </h2>

                        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed">
                            <p>
                                안녕하세요, 힐링안과 대표원장 김선영입니다.
                            </p>
                            <p>
                                '본다'는 것은 단순히 사물을 인지하는 것을 넘어, 사랑하는 사람의 얼굴을 마주하고
                                아름다운 풍경을 기억하며 삶의 매 순간을 온전히 느끼는 과정입니다.
                            </p>
                            <p>
                                대학병원 교수 시절부터 지금까지 수만 분의 환자분들을 만나며 제가 깨달은 것은,
                                결국 가장 좋은 의술은 '공감'에서 시작된다는 것입니다.
                                환자분의 작은 불편함까지 귀 기울이고, 가족을 대하는 마음으로 진료하는 것.
                                그것이 제가 생각하는 '힐링'의 본질입니다.
                            </p>
                            <p>
                                강남 유일의 여성 대표원장 단독 개원이라는 타이틀보다,
                                한 분 한 분의 눈 건강을 끝까지 책임지는 평생 주치의로 기억되고 싶습니다.
                                당신의 가장 빛나는 순간을 위해, 힐링안과가 함께하겠습니다.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
