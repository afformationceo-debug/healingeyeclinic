"use client";

import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, Play, FileText, Activity } from "lucide-react";
import VideoGallery from "@/components/insight/VideoGallery";
import { YouTubeVideo } from '@/lib/youtube';
import { NaverBlogPost } from '@/lib/naver-blog';

interface PageClientProps {
    featuredVideo: YouTubeVideo | null;
    youtubeVideos: YouTubeVideo[];
    blogPosts: NaverBlogPost[];
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
}

export default function PageClient({ featuredVideo, youtubeVideos, blogPosts }: PageClientProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black pt-32 pb-20 selection:bg-primary selection:text-black text-white">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="relative mb-32">
                    {/* Background decorative element */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-primary to-transparent" />
                            <span className="text-sm font-bold tracking-[0.3em] uppercase mb-6 block text-primary">Medical Journal</span>
                            <h1 className="text-6xl md:text-9xl font-serif font-medium leading-[0.85] text-white mb-4">
                                INSIGHT <br />
                                <span className="text-white/80">& LOOK</span>
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="max-w-md mt-12 md:mt-0"
                        >
                            <p className="text-neutral-300 text-lg leading-relaxed text-right md:text-left">
                                정확한 의학 정보와 건강한 라이프스타일을 위한<br />
                                <span className="text-primary font-semibold">힐링안과의 전문 칼럼</span>을 만나보세요.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Featured Video */}
                {featuredVideo && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative mb-32"
                    >
                        {/* Decorative border */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-[2.5rem] opacity-20 blur-xl" />

                        <div
                            className="relative aspect-[21/9] rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10"
                            onClick={() => window.open(featuredVideo.link, '_blank')}
                        >
                            <Image
                                src={featuredVideo.thumbnail}
                                alt={featuredVideo.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 border-2 border-white/20 group-hover:border-primary">
                                        <Play fill="currentColor" className="text-white ml-1 group-hover:text-black transition-colors" size={36} />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                                <div className="max-w-4xl">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <span className="inline-flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-primary/50">
                                            <Activity className="w-4 h-4" />
                                            Featured Video
                                        </span>
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-3xl md:text-6xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-2xl"
                                    >
                                        {featuredVideo.title}
                                    </motion.h2>
                                    {featuredVideo.description && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="text-lg md:text-xl text-white/90 mb-8 line-clamp-2 leading-relaxed drop-shadow-lg"
                                        >
                                            {featuredVideo.description}
                                        </motion.p>
                                    )}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <Button
                                            variant="outline"
                                            className="text-white border-2 border-white/40 hover:bg-white hover:text-black rounded-full px-10 py-6 text-base font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl"
                                        >
                                            Watch Now <Play className="ml-2 w-5 h-5" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Recent Blog Posts */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-1 bg-primary rounded-full" />
                            <span className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Recent Columns</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">의료 칼럼</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {blogPosts.map((post, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                                onClick={() => window.open(post.link, '_blank')}
                            >
                                <div className="relative">
                                    {/* Hover glow effect */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                                    <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                                        <div className="aspect-[4/3] relative bg-neutral-900 overflow-hidden">
                                            {post.thumbnail ? (
                                                <Image
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-neutral-800/50">
                                                    <FileText className="w-20 h-20 text-neutral-600 group-hover:text-primary transition-colors duration-500" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />

                                            {/* Category badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className="inline-block bg-primary text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                                    {post.category}
                                                </span>
                                            </div>

                                            {/* Read more indicator */}
                                            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                                                <ArrowUpRight className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4 text-xs text-neutral-500 font-medium">
                                                <span className="text-primary">김선영 원장</span>
                                                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                                                {post.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Video Gallery */}
                <VideoGallery videos={youtubeVideos} />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mt-32 overflow-hidden"
                >
                    {/* Background decorative elements */}
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center">
                        {/* Top decorative line */}
                        <div className="flex justify-center mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary rounded-full" />
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary rounded-full" />
                            </div>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white"
                        >
                            Stay <span className="text-primary">Informed</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-neutral-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            눈 건강을 위한 유익한 정보를 매주 받아보세요.<br />
                            <span className="text-sm text-neutral-500">스팸은 절대 보내지 않습니다.</span>
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex max-w-lg mx-auto relative group"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="relative w-full bg-white/5 border-2 border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-300 text-white placeholder:text-neutral-500 text-base"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-primary text-black rounded-full px-8 font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70">
                                Subscribe
                            </button>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-8 mt-12 text-sm text-neutral-500"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <span>Weekly Updates</span>
                            </div>
                            <div className="w-px h-4 bg-neutral-700" />
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <span>No Spam</span>
                            </div>
                            <div className="w-px h-4 bg-neutral-700" />
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <span>Unsubscribe Anytime</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
