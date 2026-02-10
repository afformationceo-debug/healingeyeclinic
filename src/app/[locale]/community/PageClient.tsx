"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Instagram, Youtube, BookOpen, Calendar, MessageCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState } from "react";

interface NoticeItem {
    title: string;
    date: string;
    tag: string;
}


function FAQSection() {
    const t = useTranslations('Community.Page');
    const categories = t.raw('faq.categories') as string[];
    const faqItems = t.raw('faq.items') as Record<string, Array<{q: string; a: string}>>;
    const categoryKeys = ['clearLasik', 'lasik', 'lasek', 'icl', 'cataract', 'pterygium', 'retina'];
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const currentFaqItems = faqItems[categoryKeys[activeTab]] || [];

    return (
        <div>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
                {categories.map((category, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(0); }}
                        className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                            activeTab === idx
                                ? 'bg-primary text-black'
                                : 'bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-white/10'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
                {currentFaqItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
                    >
                        <div
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex justify-between items-start p-4 sm:p-5 md:p-8 cursor-pointer group"
                        >
                            <div className="flex gap-4 items-start flex-1">
                                <span className="text-primary font-bold text-xl shrink-0">Q.</span>
                                <h3 className={`text-base sm:text-lg font-bold leading-relaxed transition-colors ${openIndex === i ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                                    {item.q}
                                </h3>
                            </div>
                            <Plus className={`text-white/20 group-hover:text-primary transition-all duration-300 shrink-0 ${openIndex === i ? 'rotate-45 text-primary' : ''}`} size={24} />
                        </div>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 sm:px-5 md:px-8 pb-4 sm:pb-5 md:pb-8"
                            >
                                <div className="pl-10 pt-4 border-t border-white/5">
                                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function CommunityPageClient() {
    const t = useTranslations('Community.Page');
    const noticeItems = t.raw('notices.items') as NoticeItem[];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 sm:mb-20 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-500 text-xs sm:text-sm font-bold tracking-widest uppercase">Live Support</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white">
                            HEALING <br /> COMMUNITY
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-6 sm:mt-8 md:mt-0 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg bg-neutral-800 hover:bg-neutral-700 text-white">{t('buttons.viewReviews')}</Button>
                        <Button size="lg" className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg bg-primary text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">{t('buttons.realTimeReservation')}</Button>
                    </motion.div>
                </div>

                {/* Notices & Events */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 sm:mb-20 md:mb-32">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-primary block" /> {t('notices.title')}
                        </h2>
                        <div className="space-y-4">
                            {noticeItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer group">
                                    <div>
                                        <span className="text-xs font-bold text-primary border border-primary/30 px-2 py-1 rounded mb-2 inline-block mr-3">{item.tag}</span>
                                        <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors inline">{item.title}</h3>
                                    </div>
                                    <span className="text-neutral-500 text-sm">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Media Cards */}
                    <div className="md:col-span-1 space-y-4">
                        {/* Instagram */}
                        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                            onClick={() => window.open('https://www.instagram.com/healingeyeclinic/', '_blank')}>
                            <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                                <Instagram size={32} />
                            </div>
                            <div className="mt-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Instagram</span>
                                <h3 className="text-3xl font-bold text-white mb-2">{t('social.instagram.name')}</h3>
                                <p className="text-neutral-400 text-sm mb-4">{t('social.instagram.description')}</p>
                                <Button
                                    variant="link"
                                    className="text-white p-0 hover:text-primary"
                                >
                                    {t('buttons.visitLink')} &rarr;
                                </Button>
                            </div>
                        </div>

                        {/* YouTube */}
                        <div className="bg-gradient-to-br from-red-900/20 to-rose-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                            onClick={() => window.open('https://www.youtube.com/@dreyesis', '_blank')}>
                            <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                                <Youtube size={32} />
                            </div>
                            <div className="mt-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">YouTube</span>
                                <h3 className="text-3xl font-bold text-white mb-2">{t('social.youtube.name')}</h3>
                                <p className="text-neutral-400 text-sm mb-4">{t('social.youtube.description')}</p>
                                <Button
                                    variant="link"
                                    className="text-white p-0 hover:text-primary"
                                >
                                    {t('buttons.visitLink')} &rarr;
                                </Button>
                            </div>
                        </div>

                        {/* Naver Blog */}
                        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                            onClick={() => window.open('https://blog.naver.com/wpsjtltmals7', '_blank')}>
                            <div className="absolute top-0 right-0 p-8 text-neutral-500 group-hover:text-white transition-colors">
                                <BookOpen size={32} />
                            </div>
                            <div className="mt-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Naver Blog</span>
                                <h3 className="text-3xl font-bold text-white mb-2">{t('social.blog.name')}</h3>
                                <p className="text-neutral-400 text-sm mb-4">{t('social.blog.description')}</p>
                                <Button
                                    variant="link"
                                    className="text-white p-0 hover:text-primary"
                                >
                                    {t('buttons.visitLink')} &rarr;
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ - Accordion Style with Tabs */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-primary block" /> {t('faq.title')}
                    </h2>

                    <FAQSection />
                </div>

            </div>
        </div>
    );
}
