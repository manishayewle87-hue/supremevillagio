import { Metadata } from "next";
import LocationSection from "@/components/sections/LocationSection";

export const metadata: Metadata = {
  title: "Location Map & Connectivity | Supreme Villagio Somatane Pune",
  description: "Supreme Villagio is strategically located in Somatane, Pune. Explore the location map, neighborhood, and seamless connectivity.",
  alternates: {
    canonical: "https://www.supremesvillagio.com/supreme-villagio/location",
  },
};

export default function LocationPage() {
  return (
    <div className="pt-24">
      <LocationSection />
    </div>
  );
}
