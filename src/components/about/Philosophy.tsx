"use client";

import { motion } from "framer-motion";

const values = [
    { title: "Safety First", desc: "타협하지 않는 안전, 0.01%의 오차도 허용하지 않는 완벽주의" },
    { title: "Personalized", desc: "공장형 수술 거부, 오직 한 사람을 위한 1:1 맞춤 플랜" },
    { title: "Lifetime Care", desc: "수술이 끝이 아닌 시작, 평생 눈 건강 파트너" }
];

export default function Philosophy() {
    return (
        <section className="py-32 bg-neutral-950 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-20">
                    <div className="md:w-1/2 sticky top-32 h-fit">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-4">Philosophy</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
                            The Standard<br />
                            of Excellence.
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8" />
                    </div>

                    <div className="md:w-1/2 space-y-20">
                        {values.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="border-l border-white/20 pl-10"
                            >
                                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                                <p className="text-xl text-neutral-400 leading-relaxed font-serif">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
