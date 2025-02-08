import { FeaturesSection } from "@/components/layout/FeatureSection";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/layout/PricingSection";
import { TestimonialsSection } from "@/components/layout/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
