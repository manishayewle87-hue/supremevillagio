import { generateSeoSlugs } from '@/lib/seo-data';
import Link from 'next/link';
import LandingPageTemplate from '@/components/layout/LandingPageTemplate';
import { Metadata } from 'next';

export const dynamicParams = true;

export function generateStaticParams() {
  const allSlugs = generateSeoSlugs();
  const locations = Array.from(new Set(allSlugs.map(slugArray => slugArray[0])));
  return locations.map(loc => ({ location: loc }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locReadable = resolvedParams.location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Luxury Villas in ${locReadable} | Supreme Villagio`,
    description: `Explore all premium luxury properties, twin bungalows, and 5 BHK villas targeted for the ${locReadable} real estate market.`,
  };
}

export default async function LocationSubSitemapPage({ params }: { params: Promise<{ location: string }> }) {
  const resolvedParams = await params;
  const location = resolvedParams.location;
  const locReadable = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const allSlugs = generateSeoSlugs();
  
  // Extract all deep URLs for this specific location
  const locationSlugs = allSlugs.filter(slugArray => slugArray[0] === location);

  return (
    <>
      <div className="bg-charcoal pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/locations" className="text-gold hover:text-white text-sm mb-8 inline-block">&larr; Back to All Locations</Link>
          <h1 className="text-3xl md:text-5xl font-heading text-cream mb-6">Properties in {locReadable}</h1>
          <p className="text-stone/80 mb-12 max-w-2xl">
            Browse our complete directory of luxury horizontal living options in {locReadable}.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locationSlugs.map(slugArray => {
              const urlPath = slugArray.join('/');
              const readableText = slugArray.slice(1).join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              return (
                <li key={urlPath}>
                  <Link href={`/supreme-villagio/${urlPath}`} className="text-stone hover:text-gold transition-colors text-sm block py-3 border-b border-white/5">
                    {readableText}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <LandingPageTemplate />
    </>
  );
}
