import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream text-center px-4">
      <h1 className="text-8xl md:text-9xl font-heading font-bold text-gold mb-6 tracking-wider opacity-80">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-heading font-semibold mb-4">
        Page Not Found
      </h2>
      <p className="text-stone max-w-lg mb-10 font-light leading-relaxed">
        We apologize, but the page you are looking for has been moved or no longer exists. Return to the homepage to explore the ultra-luxury lifestyle of Supreme Villagio Somatane.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <Link 
          href="/" 
          className="bg-gold text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold"
        >
          Return Home
        </Link>
        <Link 
          href="/supreme-villagio/residences" 
          className="border border-cream/30 text-cream px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream/10 transition-colors duration-300 backdrop-blur-sm"
        >
          View Residences
        </Link>
      </div>
    </div>
  );
}
