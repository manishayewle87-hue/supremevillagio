"use client";

import React, { useMemo, useEffect } from "react";
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
import PressSection from "@/components/sections/PressSection";
import ConstructionUpdatesSection from "@/components/sections/ConstructionUpdatesSection";
import SeoSiloLinks from "@/components/layout/SeoSiloLinks";
import { useModal } from "@/contexts/ModalContext";

export interface LandingPageProps {
  heroHeadline1?: string;
  heroHeadline2?: string;
  heroSubline?: string;
  highlightWords?: string[];
  pricing?: string;
  typology?: string;
  intent?: string; // e.g. "floor-plan", "price", "reviews", "brochure", "location", "construction"
}

export default function LandingPageTemplate({ 
  heroHeadline1 = "A New Paradigm of",
  heroHeadline2 = "Horizontal Living",
  heroSubline = "4 & 5 BHK Villas & 4 BHK Townhouses in Somatane, Pune",
  highlightWords = ["Paradigm", "Horizontal", "Living"],
  pricing = "₹2.89 Cr*",
  typology = "4 & 5 BHK",
  intent = "general"
}: LandingPageProps) {
  const { openBrochureModal } = useModal();

  // If intent is brochure, pop it immediately upon load
  useEffect(() => {
    if (intent.includes("brochure")) {
      const timer = setTimeout(() => {
        openBrochureModal();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [intent, openBrochureModal]);

  // Dynamic Intent Reordering Engine
  const sections = useMemo(() => {
    const baseSections = [
      { id: "press", component: <PressSection key="press" /> },
      { id: "vision", component: <VisionSection key="vision" typology={typology} /> },
      { id: "architecture", component: <ArchitectureSection key="arch" /> },
      { id: "masterplan", component: <MasterplanSection key="masterplan" /> },
      { id: "features", component: <FeaturesSliderSection key="features" /> },
      { id: "amenities", component: <AmenitiesSection key="amenities" /> },
      { id: "floor-plan", component: <FloorPlanSection key="floor-plan" /> },
      { id: "construction", component: <ConstructionUpdatesSection key="construction" /> },
      { id: "location", component: <LocationSection key="location" typology={typology} /> },
      { id: "developer", component: <DeveloperLegacySection key="developer" /> },
      { id: "reviews", component: <TestimonialSection key="reviews" /> },
      { id: "gallery", component: <GallerySection key="gallery" /> },
      { id: "faq", component: <FaqSection key="faq" /> },
    ];

    // Rearrange based on search intent
    if (intent.includes("floor-plan")) {
      const idx = baseSections.findIndex(s => s.id === "floor-plan");
      const [item] = baseSections.splice(idx, 1);
      baseSections.unshift(item);
    } else if (intent.includes("location") || intent.includes("map")) {
      const idx = baseSections.findIndex(s => s.id === "location");
      const [item] = baseSections.splice(idx, 1);
      baseSections.unshift(item);
    } else if (intent.includes("review") || intent.includes("testimonial")) {
      const idx = baseSections.findIndex(s => s.id === "reviews");
      const [item] = baseSections.splice(idx, 1);
      baseSections.unshift(item);
    } else if (intent.includes("construction") || intent.includes("status")) {
      const idx = baseSections.findIndex(s => s.id === "construction");
      const [item] = baseSections.splice(idx, 1);
      baseSections.unshift(item);
    }

    return baseSections.map(s => s.component);
  }, [intent, typology]);

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
      {sections}
      <SeoSiloLinks currentTypology={typology} />
    </>
  );
}
