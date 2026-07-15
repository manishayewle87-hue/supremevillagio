import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-charcoal-light/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-[8rem] md:text-[12rem] font-heading font-light text-foreground/10 leading-none select-none">
            404
          </h1>
          
          <div className="-mt-12 md:-mt-20 relative z-20">
            <h2 className="text-3xl md:text-5xl font-heading mb-6">
              The Path is <span className="italic text-foreground/50">Uncharted.</span>
            </h2>
            <p className="text-foreground/70 max-w-lg mx-auto mb-10 font-light leading-relaxed">
              We couldn't find the page you were looking for. It may have been moved, or it simply doesn't exist in this paradigm of living.
            </p>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-4 bg-foreground text-background px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-charcoal transition-colors duration-500"
            >
              Return Home <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
