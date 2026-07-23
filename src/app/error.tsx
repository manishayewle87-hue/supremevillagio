'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream text-center px-4">
      <h1 className="text-6xl md:text-8xl font-heading font-bold text-red-500/80 mb-6 tracking-wider">
        System Error
      </h1>
      <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
        We encountered an unexpected issue
      </h2>
      <p className="text-stone max-w-lg mb-10 font-light leading-relaxed">
        Our technical team has been notified. Please try reloading the page or return to the homepage to continue exploring Supreme Villagio.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <button 
          onClick={() => reset()}
          className="bg-gold text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="border border-cream/30 text-cream px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream/10 transition-colors duration-300 backdrop-blur-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
