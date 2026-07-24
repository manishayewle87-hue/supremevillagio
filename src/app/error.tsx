'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Silently log the error to an analytics service or Sentry
    console.error('Captured by Next.js Error Boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl md:text-3xl text-gold mb-6 font-heading">We are optimizing our experience.</h2>
      <p className="text-stone/80 max-w-lg mb-12">
        A temporary network issue occurred while loading this page. Please refresh or return to the homepage to explore Supreme Villagio.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => reset()}
          className="bg-gold text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold"
        >
          Refresh Page
        </button>
        <Link 
          href="/" 
          className="flex items-center justify-center border border-cream/30 text-cream px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream/10 transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
