"use client";

import { motion } from "framer-motion";
import { Activity, Droplets, Eye, ScanEye, MousePointer2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import CenterDetail from "@/components/center/CenterDetail";
import SymptomChecklist from "@/components/center/SymptomChecklist";
import TreatmentProcess from "@/components/center/TreatmentProcess";
import EquipmentShowcase from "@/components/center/EquipmentShowcase";

const clinicIcons = [<Droplets size={40} />, <ScanEye size={40} />, <Eye size={40} />, <Activity size={40} />];
const clinicBgs = ["from-blue-900/40", "from-amber-900/40", "from-emerald-900/40", "from-purple-900/40"];

export default function CenterPageClient() {
    const tHero = useTranslations('Center.Hero');
    const tClinics = useTranslations('Center.Clinics');

    const clinics = tClinics.raw('items').map((clinic: any, index: number) => ({
        ...clinic,
        icon: clinicIcons[index % clinicIcons.length],
        bg: clinicBgs[index % clinicBgs.length]
    }));
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-24 md:flex justify-between items-end"
                >
                    <div>
                        <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">{tHero('sectionTitle')}</span>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight">
                            {tHero('headline')} <br />
                            <span className="text-neutral-500">{tHero('headlineHighlight')}</span>
                        </h1>
                    </div>
                    <p className="text-lg text-neutral-400 font-light max-w-md mt-8 md:mt-0 text-right md:text-left leading-relaxed whitespace-pre-line">
                        {tHero('description')}
                    </p>
                </motion.div>

                {/* Grid System */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clinics.map((clinic: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`group relative h-[350px] md:h-[400px] border border-white/10 rounded-[3rem] bg-neutral-900/50 backdrop-blur-xl hover:bg-neutral-800/80 transition-all duration-500 overflow-hidden flex flex-col justify-between p-10 cursor-pointer shadow-2xl hover:shadow-primary/10`}
                        >
                            {/* Gradient Bg */}
                            <div className={`absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l ${clinic.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="flex justify-between items-start relative z-10">
                                <div className="text-neutral-400 group-hover:text-primary transition-colors duration-500 scale-100 group-hover:scale-110 origin-top-left p-3 rounded-2xl bg-white/5 group-hover:bg-white/10">
                                    {clinic.icon}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 border border-white/10 px-4 py-2 rounded-full group-hover:border-primary/50 group-hover:text-primary transition-all">
                                    {clinic.stats}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 opacity-50 text-sm font-mono uppercase tracking-wider text-neutral-300">
                                    {clinic.eng}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{clinic.title}</h3>
                                <p className="text-neutral-400 group-hover:text-white/80 transition-colors leading-relaxed">
                                    {clinic.desc}
                                </p>
                            </div>

                            {/* Interaction Hint */}
                            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                                <MousePointer2 className="text-primary rotate-[-45deg]" size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <SymptomChecklist />

                {/* Equipment Visualization */}
                <EquipmentShowcase />

                <TreatmentProcess />

                <CenterDetail />
            </div>
        </div>
    );
}
