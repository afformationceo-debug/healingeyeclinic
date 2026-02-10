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

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { title: string; description: string } };

    return {
        title: messages.Metadata.title,
        description: messages.Metadata.description,
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
