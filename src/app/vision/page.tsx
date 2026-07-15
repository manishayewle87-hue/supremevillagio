import { Metadata } from "next";
import VisionSection from "@/components/sections/VisionSection";

export const metadata: Metadata = {
  title: "Vision & Philosophy | Supreme Villagio Somatane Pune",
  description: "Discover the architectural vision and philosophy behind Supreme Villagio, offering ultra-luxury villas and row houses in Somatane, Pune.",
  alternates: {
    canonical: "https://www.supremesvillagio.com/vision",
  },
};

export default function VisionPage() {
  return (
    <div className="pt-24">
      <VisionSection />
    </div>
  );
}
