"use client";

import { useTranslations } from 'next-intl';
import BrandStory from "@/components/about/BrandStory";
import Philosophy from "@/components/about/Philosophy";
import Location from "@/components/about/Location";
import MedicalTeam from "@/components/home/MedicalTeam";
import PremiumFacility from "@/components/home/PremiumFacility";
import DirectorMessage from "@/components/about/DirectorMessage";
import HistoryTimeline from "@/components/about/HistoryTimeline";

export default function AboutPageClient() {
    const t = useTranslations('About');
    return (
        <div className="bg-black min-h-screen selection:bg-primary selection:text-black">
            <BrandStory />
            <DirectorMessage />
            <MedicalTeam />
            <HistoryTimeline />
            <Philosophy />
            <PremiumFacility />
            <Location />
        </div>
    );
}
