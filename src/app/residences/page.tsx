import { Metadata } from "next";
import FloorPlanSection from "@/components/sections/FloorPlanSection";

export const metadata: Metadata = {
  title: "Residences & Floor Plans | Supreme Villagio Somatane Pune",
  description: "View the floor plans and pricing for 4 BHK Villas, 5 BHK Twin Bungalows, and Row Houses at Supreme Villagio, Pune.",
  alternates: {
    canonical: "https://www.supremesvillagio.com/residences",
  },
};

export default function ResidencesPage() {
  return (
    <div className="pt-24">
      <FloorPlanSection />
    </div>
  );
}
