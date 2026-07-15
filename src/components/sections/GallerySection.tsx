"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NextImage from "next/image";
import AnimatedLine from "@/components/ui/AnimatedLine";

const GALLERY_IMAGES = [
  "https://cdn.supremeuniversal.com/media/Mobile13_kHFJ7R.jpg",
  "https://cdn.supremeuniversal.com/media/image-3_PEYNPS.jpg",
  "https://cdn.supremeuniversal.com/media/Mobile14_LLFdev.jpg",
  "https://cdn.supremeuniversal.com/media/Mobile15_gRJeOM.jpg",
  "https://cdn.supremeuniversal.com/media/tutGs9_supreme-villagio-mobile.jpg",
  "https://cdn.supremeuniversal.com/media/Supreme-Villagio--Desktop-Banner-2_sx0rpm.jpg",
];

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="gallery" ref={containerRef} className="py-20 md:py-32 bg-charcoal text-cream relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-4">
              Chapter VI: The Gallery
            </h2>
            <h3 className="text-4xl md:text-6xl font-heading font-light">
              Visual <span className="italic text-white">Narrative</span>
            </h3>
          </div>
          <p className="text-stone font-light max-w-sm mt-6 md:mt-0">
            A glimpse into the meticulously crafted spaces where nature and architecture converge.
          </p>
        </div>
        <AnimatedLine className="mt-12" />
      </div>

      <div className="container mx-auto px-6 md:px-12 h-[80vh] md:h-[120vh] overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          
          {/* Column 1 (Scrolls Up) */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-8 h-[150%]">
            <div className="relative w-full h-[400px] rounded-none overflow-hidden border border-cream/30">
              <NextImage src={GALLERY_IMAGES[0]} alt="Gallery 1" fill className="object-cover" />
            </div>
            <div className="relative w-full h-[600px] rounded-none overflow-hidden border border-cream/30">
              <NextImage src={GALLERY_IMAGES[1]} alt="Gallery 2" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Column 2 (Scrolls Down) */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-8 h-[150%] md:-mt-[200px] mt-8">
            <div className="relative w-full h-[600px] rounded-none overflow-hidden border border-cream/30">
              <NextImage src={GALLERY_IMAGES[2]} alt="Gallery 3" fill className="object-cover" />
            </div>
            <div className="relative w-full h-[400px] rounded-none overflow-hidden border border-cream/30">
              <NextImage src={GALLERY_IMAGES[3]} alt="Gallery 4" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Column 3 (Scrolls Up) - Hidden on Mobile */}
          <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-8 h-[150%] mt-[100px]">
            <div className="relative w-full h-[450px] rounded-none overflow-hidden border border-cream/30">
              <NextImage src={GALLERY_IMAGES[4]} alt="Gallery 5" fill className="object-cover" />
            </div>
            <div className="relative w-full h-[550px] rounded-none overflow-hidden border border-cream/30">
              <NextImage src={GALLERY_IMAGES[5]} alt="Gallery 6" fill className="object-cover" />
            </div>
          </motion.div>

        </div>

        {/* Gradient Overlays for smooth fade out at edges */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-charcoal to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
