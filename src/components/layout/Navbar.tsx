"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

const navItems = [
    { key: "about", href: "/about" },
    { key: "vision", href: "/vision" },
    { key: "cataract", href: "/cataract" },
    { key: "center", href: "/center" },
    { key: "insight", href: "/insight" },
    { key: "community", href: "/community" },
];

export default function Navbar() {
    const t = useTranslations('Navigation');
    const tCommon = useTranslations('Common');
    const locale = useLocale();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll state: "top" | "scrolled-up" | "scrolled-down"
    const [scrollState, setScrollState] = useState<'top' | 'up' | 'down'>('top');
    const lastScrollY = useRef(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const prev = lastScrollY.current;
        if (latest < 30) {
            setScrollState('top');
        } else if (latest < prev) {
            setScrollState('up');
        } else if (latest > prev + 5) {
            setScrollState('down');
        }
        lastScrollY.current = latest;
    });

    const isScrolled = scrollState !== 'top';
    const isHidden = scrollState === 'down' && !isMobileMenuOpen;

    // Active link detection
    const isActive = (href: string) => {
        return pathname === `/${locale}${href}`;
    };

    return (
        <>
            <motion.header
                animate={{
                    y: isHidden ? '-100%' : '0%',
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
                    isScrolled
                        ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_30px_rgba(0,0,0,0.5)]"
                        : "bg-transparent"
                )}
            >
                <div className={cn(
                    "container mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-400",
                    isScrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-5"
                )}>
                    {/* Logo */}
                    <Link href={`/${locale}`} className="relative z-50">
                        <motion.span
                            className="font-serif font-bold tracking-tight text-white block"
                            animate={{
                                fontSize: isScrolled ? '1.125rem' : '1.25rem',
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Healing Eye<span className="text-primary">.</span>
                        </motion.span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7 lg:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={`/${locale}${item.href}`}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group py-1",
                                    isActive(item.href)
                                        ? "text-primary"
                                        : "text-foreground/70 hover:text-white"
                                )}
                            >
                                {t(item.key)}
                                <span className={cn(
                                    "absolute -bottom-0.5 left-0 h-[1.5px] bg-primary transition-all duration-300 rounded-full",
                                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Right Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageSwitcher />
                        <Button size="sm" className="hidden lg:inline-flex">
                            {tCommon('buttons.book')}
                        </Button>
                    </div>

                    {/* Mobile Right Actions: Language + Hamburger */}
                    <div className="flex md:hidden items-center gap-1.5 z-50">
                        <LanguageSwitcher />
                        <button
                            className="text-white p-2 active:scale-90 transition-transform rounded-xl hover:bg-white/5"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
                        />
                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-white/[0.06] md:hidden overflow-y-auto"
                        >
                            <div className="px-6 pt-20 pb-10 min-h-full flex flex-col">
                                <nav className="flex flex-col gap-1 flex-1">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.key}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
                                        >
                                            <Link
                                                href={`/${locale}${item.href}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "block text-xl font-medium py-3.5 transition-colors border-b border-white/[0.04]",
                                                    isActive(item.href)
                                                        ? "text-primary"
                                                        : "text-white/80 active:text-primary"
                                                )}
                                            >
                                                <span className="flex items-center justify-between">
                                                    {t(item.key)}
                                                    {isActive(item.href) && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    )}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="mt-auto pt-6"
                                >
                                    <Button className="w-full h-12 text-base rounded-xl">
                                        {tCommon('buttons.book')}
                                    </Button>
                                    <p className="text-[10px] text-white/20 text-center mt-4">
                                        Healing Eye Clinic
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
