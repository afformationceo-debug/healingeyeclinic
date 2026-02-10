"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { YouTubeVideo } from "@/lib/youtube";

interface VideoGalleryProps {
    videos: YouTubeVideo[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
    const t = useTranslations('Insight.VideoGallery');

    function formatDate(dateString: string): string {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Unknown';
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return t('dates.today');
        if (diffDays === 1) return t('dates.yesterday');
        if (diffDays < 7) return t('dates.daysAgo', { count: diffDays });
        if (diffDays < 30) return t('dates.weeksAgo', { count: Math.floor(diffDays / 7) });
        if (diffDays < 365) return t('dates.monthsAgo', { count: Math.floor(diffDays / 30) });
        return t('dates.yearsAgo', { count: Math.floor(diffDays / 365) });
    }

    return (
        <section className="py-32 relative">
            {/* Decorative border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
            >
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-primary rounded-full" />
                        <span className="text-sm font-bold tracking-[0.3em] uppercase text-primary">{t('channelLabel')}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3">{t('channelName')}</h2>
                    <p className="text-neutral-400 text-base">{t('channelDescription')}</p>
                </div>
                <button
                    onClick={() => window.open('https://www.youtube.com/@dreyesis', '_blank', 'noopener,noreferrer')}
                    className="group flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white hover:text-black transition-all duration-300 hover:scale-105"
                >
                    {t('visitChannel')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                        onClick={() => window.open(video.link, '_blank', 'noopener,noreferrer')}
                    >
                        <div className="relative">
                            {/* Hover glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                            <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                                <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                            <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 border border-white/20 group-hover:border-primary">
                                                <Play fill="currentColor" className="text-white ml-0.5 group-hover:text-black transition-colors" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date badge */}
                                    <div className="absolute bottom-3 right-3">
                                        <span className="inline-block bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
                                            {formatDate(video.publishedAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5">
                                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider mb-3 opacity-80">
                                        {t('badge')}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-bold leading-snug text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                        {video.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {videos.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Play className="w-10 h-10 text-neutral-600" />
                    </div>
                    <p className="text-neutral-500 text-lg">{t('emptyState')}</p>
                </motion.div>
            )}
        </section>
    );
}
