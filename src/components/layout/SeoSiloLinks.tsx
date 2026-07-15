import React from 'react';
import Link from 'next/link';
import { generateSeoSlugs } from '@/lib/seo-data';

export default function SeoSiloLinks({ currentTypology }: { currentTypology: string }) {
  // Get all generated slugs (now an array of arrays)
  const allSlugs = generateSeoSlugs();
  
  // Create a silo based on the current typology
  const is5BHK = currentTypology.includes('5');
  const isBungalow = currentTypology.toLowerCase().includes('bungalow');
  const isRowHouse = currentTypology.toLowerCase().includes('row');
  
  let siloKeyword = '4-bhk';
  if (is5BHK) siloKeyword = '5-bhk';
  if (isBungalow) siloKeyword = 'bungalow';
  if (isRowHouse) siloKeyword = 'row-house';

  // Filter for related slugs (Siloing) and take a chunk
  const relatedSlugs = allSlugs
    .filter(slugArray => slugArray.join('-').includes(siloKeyword))
    .filter((_, i) => i % 2 === 0) 
    .slice(0, 15);

  if (relatedSlugs.length === 0) return null;

  return (
    <section className="bg-charcoal text-stone/60 py-12 border-t border-white/5 text-xs">
      <div className="container mx-auto px-6 md:px-12">
        <h3 className="text-stone/40 uppercase tracking-widest mb-6 font-medium">Explore Related Properties in Pune</h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {relatedSlugs.map(slugArray => {
            const urlPath = slugArray.join('/');
            const readableText = slugArray.join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
              <li key={urlPath}>
                <Link href={`/supreme-villagio/${urlPath}`} className="hover:text-gold transition-colors block">
                  {readableText}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  );
}
