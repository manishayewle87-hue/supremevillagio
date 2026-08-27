import React from 'react';
import Link from 'next/link';
import { SEO_KEYWORD_MATRIX } from '@/lib/seo-data';

export const metadata = {
  title: "Supreme Villagio | All Locations & Topologies",
  description: "Browse all available luxury villas and premium bungalows by Supreme Universal across Pune's top real estate micro-markets.",
};

export default function LocationsSitemap() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-heading text-4xl md:text-5xl text-forest mb-6">Property Locations & Configurations</h1>
      <p className="text-forest/70 mb-12 max-w-3xl">Explore our vast portfolio of premium luxury real estate across Pune. Select a category below to find the perfect home in the perfect micro-market.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Categories / Topologies */}
        <div>
          <h2 className="text-gold font-bold uppercase tracking-wider mb-6 pb-2 border-b border-cream/30">By Typology</h2>
          <ul className="space-y-4">
            {SEO_KEYWORD_MATRIX.categories.slice(0, 15).map(cat => (
              <li key={cat}>
                <Link href={`/supreme-villagio/${cat}`} className="text-forest hover:text-gold transition-colors block">
                  {cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Locations */}
        <div>
          <h2 className="text-gold font-bold uppercase tracking-wider mb-6 pb-2 border-b border-cream/30">By Micro-Market (Pune)</h2>
          <ul className="space-y-4">
            {SEO_KEYWORD_MATRIX.locations.map(loc => (
              <li key={loc}>
                <Link href={`/supreme-villagio/luxury-villas/${loc}`} className="text-forest hover:text-gold transition-colors block">
                  Luxury Villas in {loc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Popular Searches */}
        <div>
          <h2 className="text-gold font-bold uppercase tracking-wider mb-6 pb-2 border-b border-cream/30">High-Intent Searches</h2>
          <ul className="space-y-4">
            {SEO_KEYWORD_MATRIX.locations.slice(0, 10).map(loc => (
              <li key={`4bhk-${loc}`}>
                <Link href={`/supreme-villagio/4-bhk-villas/${loc}/premium-residential-projects`} className="text-forest hover:text-gold transition-colors block">
                  4 BHK Premium Projects in {loc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              </li>
            ))}
            {SEO_KEYWORD_MATRIX.locations.slice(0, 10).map(loc => (
              <li key={`5bhk-${loc}`}>
                <Link href={`/supreme-villagio/5-bhk-villas/${loc}/luxury-gated-villas`} className="text-forest hover:text-gold transition-colors block">
                  5 BHK Gated Villas in {loc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
