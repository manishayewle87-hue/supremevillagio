"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import AnimatedLine from "@/components/ui/AnimatedLine";

const HOTSPOTS = [
  { id: 1, x: "30%", y: "40%", title: "Nature-Integrated", desc: "Lush greenery weaving through private and communal spaces." },
  { id: 2, x: "70%", y: "30%", title: "Elevation & Views", desc: "At 616m above sea level, offering uninterrupted mountain views." },
  { id: 3, x: "50%", y: "70%", title: "Low-Rise Density", desc: "Absolutely no high-rises. Just townhouses and twin villas." }
];

export default function ArchitectureSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section id="architecture" ref={sectionRef} className="py-24 bg-charcoal text-cream relative">
      <div className="absolute top-0 left-0 w-full px-6 md:px-12">
        <AnimatedLine />
      </div>
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-4">
          Chapter II: Architecture & Nature
        </h2>
        <h3 className="text-4xl md:text-5xl font-heading font-light max-w-4xl mx-auto">
          No Obstructing High-Rises. <br /> <span className="italic text-white">Just Mountain Views.</span>
        </h3>
      </div>

      {/* Interactive Render */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 w-full h-full origin-center">
          <Image 
            src="https://cdn.supremeuniversal.com/media/Supreme-Villagio--Desktop-Banner-2_sx0rpm.jpg"
            alt="Supreme Villagio Architecture"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />

        {/* Hotspots */}
        {HOTSPOTS.map((spot) => (
          <div 
            key={spot.id}
            className="absolute z-20"
            style={{ left: spot.x, top: spot.y }}
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              className="relative w-8 h-8 md:w-10 md:h-10 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-30"
            >
              <Plus size={20} className={`transition-transform duration-300 ${activeHotspot === spot.id ? 'rotate-45' : ''}`} />
              <span className="absolute inset-0 rounded-full border border-gold animate-ping opacity-75 pointer-events-none" />
            </button>

            <AnimatePresence>
              {activeHotspot === spot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-background/95 backdrop-blur-md border border-border/50 p-4 rounded-none shadow-2xl z-40"
                >
                  <h4 className="text-gold font-heading text-lg mb-2">{spot.title}</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{spot.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h4 className="text-3xl font-heading text-gold mb-6">A Slower, Richer Pace of Life</h4>
            <p className="text-stone font-light leading-relaxed mb-6">
              Rooted in the serene heart of Somatane, Supreme Villagio reimagines community living with a rare blend of nature, design, and personal space. This villa estate is crafted for those who value meaningful architecture, curated greens, and a slower, richer pace of life.
            </p>
            <p className="text-stone font-light leading-relaxed">
              Every detail — from the landscape by global experts to the ready clubhouse — echoes Supreme’s signature focus on refinement over flamboyance. Here, life unfolds not in vertical towers but across open skies, tree-lined boulevards, and thoughtfully planned spaces that feel just right.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16 border-l border-cream/30 pl-8 lg:pl-16">
            <div>
              <p className="text-5xl md:text-8xl font-heading text-cream mb-2 tracking-tighter">40+</p>
              <p className="text-[10px] md:text-xs text-stone uppercase tracking-widest font-semibold">Lifestyle Comforts</p>
            </div>
            <div>
              <p className="text-5xl md:text-8xl font-heading text-cream mb-2 tracking-tighter">616<span className="text-xl md:text-3xl">m</span></p>
              <p className="text-[10px] md:text-xs text-stone uppercase tracking-widest font-semibold">Above Sea Level</p>
            </div>
            <div>
              <p className="text-5xl md:text-8xl font-heading text-cream mb-2 tracking-tighter">25<span className="text-xl md:text-3xl">m</span></p>
              <p className="text-[10px] md:text-xs text-stone uppercase tracking-widest font-semibold">From Baner</p>
            </div>
            <div>
              <p className="text-5xl md:text-8xl font-heading text-cream mb-2 tracking-tighter">2<span className="text-xl md:text-3xl">hr</span></p>
              <p className="text-[10px] md:text-xs text-stone uppercase tracking-widest font-semibold">To Airport</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
