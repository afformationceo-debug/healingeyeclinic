"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames } from "@/i18n/config";
import { useState } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleSwitch = (newLocale: string) => {
        // Construct new path: /en/about -> /ko/about
        // We assume pathname starts with /[locale]
        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/");
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm text-foreground/80 hover:text-primary"
            >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{locale}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-40 py-2 bg-background/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl ring-1 ring-black/5"
                    >
                        {locales.map((l) => (
                            <button
                                key={l}
                                onClick={() => handleSwitch(l)}
                                className="w-full text-left px-4 py-2 text-sm text-foreground/70 hover:bg-white/10 hover:text-primary transition-colors flex items-center justify-between group"
                            >
                                <span>{localeNames[l]}</span>
                                {locale === l && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
