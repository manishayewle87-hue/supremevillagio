import HeroSection from "@/components/sections/HeroSection";
import VisionSection from "@/components/sections/VisionSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import MasterplanSection from "@/components/sections/MasterplanSection";
import FeaturesSliderSection from "@/components/sections/FeaturesSliderSection";
import LocationSection from "@/components/sections/LocationSection";
import GallerySection from "@/components/sections/GallerySection";
import FaqSection from "@/components/sections/FaqSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import FloorPlanSection from "@/components/sections/FloorPlanSection";
import DeveloperLegacySection from "@/components/sections/DeveloperLegacySection";
import TestimonialSection from "@/components/sections/TestimonialSection";

export interface LandingPageProps {
  heroHeadline1?: string;
  heroHeadline2?: string;
  heroSubline?: string;
  highlightWords?: string[];
  pricing?: string;
  typology?: string;
}

import SeoSiloLinks from "@/components/layout/SeoSiloLinks";

export default function LandingPageTemplate({ 
  heroHeadline1 = "A New Paradigm of",
  heroHeadline2 = "Horizontal Living",
  heroSubline = "4 & 5 BHK Villas & 4 BHK Townhouses in Somatane, Pune",
  highlightWords = ["Paradigm", "Horizontal", "Living"],
  pricing = "₹2.89 Cr*",
  typology = "4 & 5 BHK"
}: LandingPageProps) {
  return (
    <>
      <HeroSection 
        headlineLine1={heroHeadline1}
        headlineLine2={heroHeadline2}
        subline={heroSubline}
        highlightWords={highlightWords}
        pricing={pricing}
        typology={typology}
      />
      <VisionSection typology={typology} />
      <ArchitectureSection />
      <MasterplanSection />
      <FeaturesSliderSection />
      <AmenitiesSection />
      <FloorPlanSection />
      <LocationSection typology={typology} />
      <DeveloperLegacySection />
      <TestimonialSection />
      <GallerySection />
      <FaqSection />
      <SeoSiloLinks currentTypology={typology} />
    </>
  );
}
