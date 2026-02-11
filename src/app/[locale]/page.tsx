import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Services from "@/components/home/Services";
import Doctor from "@/components/home/Doctor";
import Review from "@/components/home/Review";
import MedicalTeam from "@/components/home/MedicalTeam";
import AIPrediction from "@/components/home/AIPrediction";
import PremiumFacility from "@/components/home/PremiumFacility";
import WhyHealingEye from "@/components/home/WhyHealingEye";
import { getMessages } from 'next-intl/server';
import { getSeoForPage } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const seo = getSeoForPage('home', locale);
    const messages = await getMessages({ locale }) as { Metadata: { title: string; description: string } };

    const title = seo?.title_tag || messages.Metadata.title;
    const description = seo?.meta_description || messages.Metadata.description;

    return {
        title,
        description,
        openGraph: {
            title: seo?.og_title || title,
            description: seo?.og_description || description,
            ...(seo?.og_image && { images: [seo.og_image] }),
        },
        ...(seo?.keywords && { keywords: seo.keywords }),
        ...(seo?.canonical_url && { alternates: { canonical: seo.canonical_url } }),
        ...(seo?.robots && { robots: seo.robots }),
    };
}

export default function MainPage() {
    return (
        <div className="flex flex-col bg-background">
            <Hero />
            <Philosophy />
            <WhyHealingEye />
            <AIPrediction />
            <Services />
            <PremiumFacility />
            <MedicalTeam />
            <Doctor />
            <Review />
        </div>
    );
}
