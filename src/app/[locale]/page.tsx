import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Services from "@/components/home/Services";
import Doctor from "@/components/home/Doctor";
import Review from "@/components/home/Review";
import MedicalTeam from "@/components/home/MedicalTeam";
import AIPrediction from "@/components/home/AIPrediction";
import PremiumFacility from "@/components/home/PremiumFacility";
import WhyHealingEye from "@/components/home/WhyHealingEye";

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
