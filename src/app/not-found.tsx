import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-heading text-gold mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl text-cream mb-6">Page Not Found</h2>
      <p className="text-stone/80 max-w-lg mb-12">
        The luxury property or location you are looking for has been moved or doesn't exist.
      </p>
      
      <div className="bg-white/5 border border-white/10 p-8 max-w-2xl w-full backdrop-blur-sm">
        <h3 className="text-cream text-lg mb-6 uppercase tracking-widest font-semibold">Explore Premium Locations</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <li>
            <Link href="/supreme-villagio/baner/4-bhk-villas" className="text-stone hover:text-gold transition-colors">
              Baner 4 BHK Villas
            </Link>
          </li>
          <li>
            <Link href="/supreme-villagio/koregaon-park/ultra-luxury-villas" className="text-stone hover:text-gold transition-colors">
              Koregaon Park Villas
            </Link>
          </li>
          <li>
            <Link href="/supreme-villagio/hinjawadi/row-houses" className="text-stone hover:text-gold transition-colors">
              Hinjawadi Row Houses
            </Link>
          </li>
          <li>
            <Link href="/supreme-villagio/wakad/5-bhk-villas" className="text-stone hover:text-gold transition-colors">
              Wakad 5 BHK Villas
            </Link>
          </li>
          <li>
            <Link href="/supreme-villagio/somatane/premium-bungalows" className="text-stone hover:text-gold transition-colors">
              Somatane Bungalows
            </Link>
          </li>
          <li>
            <Link href="/locations" className="text-gold hover:text-white transition-colors underline">
              View All Locations &rarr;
            </Link>
          </li>
        </ul>
      </div>
      
      <Link 
        href="/" 
        className="mt-12 text-sm uppercase tracking-widest text-cream border-b border-cream hover:text-gold hover:border-gold transition-colors pb-1"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
