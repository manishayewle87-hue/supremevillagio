"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { Play } from "lucide-react";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import { useModal } from "@/contexts/ModalContext";

interface HeroSectionProps {
  headlineLine1?: string;
  headlineLine2?: string;
  subline?: string;
  highlightWords?: string[];
  pricing?: string;
  typology?: string;
}

export default function HeroSection({
  headlineLine1 = "A New Paradigm of",
  headlineLine2 = "Horizontal Living",
  subline = "4 & 5 BHK Villas & 4 BHK Townhouses in Somatane, Pune",
  highlightWords = ["Paradigm", "Horizontal", "Living"],
  pricing = "₹2.89 Cr*",
  typology = "4 & 5 BHK"
}: HeroSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContactModal } = useModal();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    // GSAP Intro Animation
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-logo",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
    ).fromTo(
      ".hero-text-reveal",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" },
      "-=1"
    ).fromTo(
      ".hero-panel",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    );
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-charcoal">
      {/* Background Media */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <Image 
          src="https://cdn.supremeuniversal.com/media/Supreme-Villagio--Desktop-Banner-3_IOrvdm.jpg"
          alt="Supreme Villagio Somatane Pune"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={100}
          className="object-cover object-center transform scale-105 transition-transform duration-[20s] ease-linear hover:scale-110"
        />
        <div className="absolute inset-0 bg-charcoal/40 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
      >
        <div className="mb-12 hero-logo">
          <Image 
            src="https://cdn.supremeuniversal.com/media/Q9b1g7_Supreme-Villagio-Logo.svg"
            alt="Supreme Villagio Somatane Logo"
            width={300}
            height={100}
            className="mx-auto drop-shadow-2xl brightness-0 invert" // Invert if the logo is originally dark
          />
        </div>

        <div className="overflow-hidden mb-6 flex flex-col items-center justify-center">
          <TextReveal 
            text={headlineLine1} 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold text-cream max-w-5xl leading-tight" 
            delay={0.5} 
            highlightWords={highlightWords}
          />
          <TextReveal 
            text={headlineLine2} 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal text-cream max-w-5xl leading-tight" 
            delay={1}
            highlightWords={highlightWords}
          />
        </div>
        
        <div className="overflow-hidden mb-12">
          <p className="hero-text-reveal text-lg md:text-xl text-cream/90 max-w-2xl font-light tracking-wide">
            {subline}
          </p>
        </div>

        <div className="overflow-hidden flex flex-col sm:flex-row gap-6">
          <button 
            onClick={openContactModal}
            className="hero-text-reveal bg-gold text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 font-semibold"
          >
            Book Private Tour
          </button>
          <button className="hero-text-reveal flex items-center justify-center gap-3 border border-cream/30 text-cream px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream/10 transition-colors duration-300 backdrop-blur-sm">
            <Play size={16} /> Watch Film
          </button>
        </div>
      </motion.div>

      {/* Floating Info Panel (Real Data) */}
      <div className="hero-panel absolute bottom-0 left-0 w-full z-20">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 border-t border-cream/20 bg-charcoal/80 backdrop-blur-md py-4 md:py-6">
            <div className="px-2 md:px-4 border-r border-cream/10 md:last:border-0">
              <p className="text-[10px] md:text-xs text-gold uppercase tracking-widest mb-1 font-semibold">Typology</p>
              <p className="text-xs md:text-sm text-cream font-light">{typology}</p>
            </div>
            <div className="px-2 md:px-4 border-none md:border-r border-cream/10 md:last:border-0">
              <p className="text-[10px] md:text-xs text-gold uppercase tracking-widest mb-1 font-semibold">Project Status</p>
              <p className="text-xs md:text-sm text-cream font-light">Under Construction</p>
            </div>
            <div className="px-2 md:px-4 border-r border-cream/10 md:last:border-0 mt-2 md:mt-0">
              <p className="text-[10px] md:text-xs text-gold uppercase tracking-widest mb-1 font-semibold">Location</p>
              <p className="text-xs md:text-sm text-cream font-light">Somatane, Pune</p>
            </div>
            <div className="px-2 md:px-4 mt-2 md:mt-0">
              <p className="text-[10px] md:text-xs text-gold uppercase tracking-widest mb-1 font-semibold">Starting Price</p>
              <p className="text-xs md:text-sm text-cream font-light text-gold">{pricing}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
