import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import ProcessSection from "../components/landing/ProcessSection";
import WhySection from "../components/landing/WhySection";
import FooterSection from "../components/landing/FooterSection";

export default function LandingPage() {
  return (
    <div className="font-sans">
      <LandingNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProcessSection />
      <WhySection />
      <FooterSection />
    </div>
  );
}
