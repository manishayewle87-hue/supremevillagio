import { Metadata } from "next";
import ArchitectureSection from "@/components/sections/ArchitectureSection";

export const metadata: Metadata = {
  title: "Architecture & Design | Supreme Villagio Somatane Pune",
  description: "Explore the neo-classical Spanish architecture and master-planned design of Supreme Villagio in Somatane, Pune.",
  alternates: {
    canonical: "https://www.supremesvillagio.com/architecture",
  },
};

export default function ArchitecturePage() {
  return (
    <div className="pt-24">
      <ArchitectureSection />
    </div>
  );
}
