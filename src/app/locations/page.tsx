import { generateSeoDataFromSlug, generateSeoSlugs } from '@/lib/seo-data';
import Link from 'next/link';
import LandingPageTemplate from '@/components/layout/LandingPageTemplate';

export const metadata = {
  title: "Supreme Villagio Locations | Explore Luxury Villas across Pune",
  description: "Explore our premium inventory of luxury villas, twin bungalows, and penthouses across 28 distinct Pune locations.",
};

export default function LocationsSitemapPage() {
  const allSlugs = generateSeoSlugs();
  
  // Extract unique locations from the first path segment
  const locations = Array.from(new Set(allSlugs.map(slugArray => slugArray[0])));

  return (
    <>
      <div className="bg-charcoal pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-heading text-cream mb-12">Locations Directory</h1>
          <p className="text-stone/80 mb-12 max-w-2xl">
            Explore our curated selection of ultra-premium horizontal living options across Pune's most affluent micro-markets.
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locations.map(loc => (
              <li key={loc}>
                <Link href={`/locations/${loc}`} className="text-gold hover:text-white transition-colors capitalize text-lg block py-2 border-b border-white/5">
                  {loc.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <LandingPageTemplate />
    </>
  );
}
