import React from 'react';
import Link from 'next/link';

export default function RelatedProperties({ relatedSlugs }: { relatedSlugs: string[][] }) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-8 bg-cream/10 border-t border-cream/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-forest mb-2">Explore Related Properties</h2>
        <p className="text-forest/70 mb-10 max-w-2xl">Discover more exclusive configurations and micro-markets within the Supreme Universal luxury real estate portfolio.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedSlugs.map((slugArray, index) => {
            const url = `/supreme-villagio/${slugArray.join('/')}`;
            // Convert slug to Title Case for Display
            const title = slugArray
              .map(segment => segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
              .join(' | ');

            return (
              <Link 
                key={index} 
                href={url}
                className="group relative block p-6 border border-cream/30 bg-background rounded-lg hover:border-gold/50 hover:bg-forest/5 transition-all duration-300"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="text-gold text-xs font-semibold uppercase tracking-wider mb-2 block">
                      Pune Real Estate
                    </span>
                    <h3 className="text-forest font-heading text-xl leading-snug mb-3 group-hover:text-gold transition-colors">
                      {title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-forest/70 font-medium group-hover:text-forest transition-colors">
                    View Details 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
