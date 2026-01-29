"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DirectorMessage() {
    return (
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-20 items-center">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Dr. Kim Sun-young"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10">
                                <span className="block text-primary font-bold tracking-widest uppercase mb-2">Representative Director</span>
                                <h3 className="text-4xl font-serif font-bold text-white">Dr. Kim, Sun-young</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="md:w-1/2 space-y-10"
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase block">Greeting</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                            "Healing Your Eyes,<br />
                            Design Your Life."
                        </h2>

                        <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
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

                        <div className="pt-10">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-16 invert opacity-80" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
