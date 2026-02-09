"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
    const locale = useLocale();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Pathname used only for active state if needed, but not for locale
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3 sm:py-4"
                        : "bg-transparent py-5 sm:py-6"
                )}
            >
                <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="relative z-50">
                        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                            Healing Eye<span className="text-primary">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={`/${locale}${item.href}`}
                                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                            >
                                {t(item.key)}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Button size="sm" className="hidden lg:inline-flex">
                            Reservation
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 text-white p-2 -mr-2 active:scale-95 transition-transform"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        />
                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-background border-l border-white/10 md:hidden overflow-y-auto"
                        >
                            <div className="px-6 py-20">
                                <nav className="flex flex-col gap-8">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.key}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={`/${locale}${item.href}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-2xl font-serif font-medium text-foreground hover:text-primary active:text-primary py-2 transition-colors"
                                            >
                                                {t(item.key)}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <div className="h-px bg-white/10 my-4" />
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">Language</span>
                                        <LanguageSwitcher />
                                    </div>
                                    <Button className="w-full mt-4 h-12 text-base">Reservation</Button>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
