import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Real Estate Blog | Supreme Villagio',
  description: 'Read the latest insights on luxury real estate, twin bungalows, and 5 BHK villas in Pune and Somatane.',
  alternates: {
    canonical: 'https://www.supremesvillagio.com/blog',
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24 bg-charcoal min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-semibold text-gold mb-4">
            The Villagio Journal
          </h1>
          <p className="text-stone text-lg md:text-xl font-light">
            Insights on ultra-luxury living, architecture, and the Pune real estate market.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-charcoal-light border border-white/10 rounded-none overflow-hidden transition-all duration-300 group-hover:border-gold/50 group-hover:-translate-y-1">
                <div className="aspect-[16/9] relative bg-charcoal overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="text-xs text-gold tracking-widest uppercase mb-3">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h2 className="text-xl md:text-2xl font-heading text-cream mb-4 line-clamp-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-stone text-sm line-clamp-3 font-light leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center text-xs text-cream uppercase tracking-widest group-hover:text-gold transition-colors">
                    Read Article 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
