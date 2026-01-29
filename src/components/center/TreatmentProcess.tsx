"use client";

const steps = [
    { title: "One-Stop 검사", desc: "50여 가지 정밀 검사를 하루에" },
    { title: "1:1 주치의 상담", desc: "검사 데이터를 바탕으로 한 정밀 분석" },
    { title: "맞춤형 레이저 치료", desc: "M22, IPL 등 최신 장비 치료" },
    { title: "전담 간호사 케어", desc: "수술/시술 후 회복실 집중 관리" },
    { title: "평생 안심 보증", desc: "정기 검진 및 재발 방지 프로그램" }
];

export default function TreatmentProcess() {
    return (
        <section className="py-20 border-t border-white/10">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">Healing Therapy Process</h2>

            <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-0">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block -translate-y-1/2 z-0" />

                {steps.map((step, i) => (
                    <div key={i} className="relative z-10 text-center group w-full md:w-auto">
                        <div className="w-16 h-16 mx-auto bg-neutral-900 border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            {i + 1}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-neutral-400">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
