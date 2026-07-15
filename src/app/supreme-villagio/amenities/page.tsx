import { Metadata } from "next";
import AmenitiesSection from "@/components/sections/AmenitiesSection";

export const metadata: Metadata = {
  title: "Luxury Amenities & Club Villagio | Supreme Villagio Pune",
  description: "Experience the world-class amenities at Club Villagio, featuring swimming pools, fitness centers, and lush green landscapes in Somatane, Pune.",
  alternates: {
    canonical: "https://www.supremesvillagio.com/supreme-villagio/amenities",
  },
};

export default function AmenitiesPage() {
  return (
    <div className="pt-24">
      <AmenitiesSection />
    </div>
  );
}
