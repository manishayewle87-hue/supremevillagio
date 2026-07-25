import Link from 'next/link';

export const metadata = {
  title: "Supreme Universal Pune | Premium Luxury Ecosystem Hub",
  description: "Explore the entire ecosystem of Supreme Universal premium luxury projects in Pune, including Supreme Villagio, Supreme Estia, Amadore, Adima, and more.",
};

export default function EcosystemHub() {
  const ecosystemKeywords = [
    { title: "Supreme Universal Projects Pune", href: "/pune/supreme-universal-projects" },
    { title: "Supreme Estia Baner Alternatives", href: "/baner/supreme-estia-alternatives" },
    { title: "Supreme Amadore", href: "/baner/supreme-amadore" },
    { title: "Supreme Adima", href: "/baner/supreme-adima" },
    { title: "Supreme Pallacio", href: "/baner/supreme-pallacio" },
    { title: "Supreme Boulevard", href: "/koregaon-park/supreme-boulevard" },
    { title: "Supreme Universal Luxury Pune", href: "/pune/supreme-universal-luxury" },
    { title: "Best Supreme Projects in Pune", href: "/pune/best-supreme-projects" }
  ];

  return (
    <div className="min-h-screen bg-charcoal text-cream font-sans pt-32 pb-24 px-4 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-6xl font-heading text-gold mb-6">Supreme Universal Ecosystem</h1>
        <p className="text-lg text-stone/80 mb-12 max-w-3xl">
          Supreme Villagio is the flagship crown jewel of the Supreme Universal luxury real estate ecosystem in Pune. 
          Explore our extensive portfolio of ultra-premium developments across the city's most coveted micro-markets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ecosystemKeywords.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 group"
            >
              <h2 className="text-xl font-heading text-cream group-hover:text-gold transition-colors mb-2">
                {item.title}
              </h2>
              <span className="text-sm text-gold uppercase tracking-widest flex items-center gap-2">
                Explore <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12">
          <Link href="/locations" className="text-sm text-stone hover:text-gold uppercase tracking-widest transition-colors">
            &larr; Back to Location Matrix
          </Link>
        </div>
      </div>
    </div>
  );
}
