'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-charcoal text-cream font-sans min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-5xl text-gold mb-6">Fatal Engine Error</h1>
        <p className="text-stone/80 mb-8 max-w-md">
          A critical system error prevented the application from rendering. Our engineering team has been notified.
        </p>
        <button 
          onClick={() => reset()}
          className="bg-gold text-charcoal px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors"
        >
          Reboot System
        </button>
      </body>
    </html>
  );
}
