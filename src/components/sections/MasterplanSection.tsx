"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MASTERPLAN_ZONES, MasterplanZone } from "@/lib/masterplan-data";
import { useModal } from "@/contexts/ModalContext";
import { X, ArrowRight } from "lucide-react";

export default function MasterplanSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [activeZone, setActiveZone] = useState<MasterplanZone | null>(null);
  const { openContactModal } = useModal();

  return (
    <section id="residences" ref={containerRef} className="py-20 md:py-32 bg-cream text-charcoal relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-4">
            Chapter V: The Masterplan
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-light mb-6">
            A Blueprint for <br />
            <span className="italic text-charcoal-light">Harmony</span>
          </h3>
          <p className="text-charcoal-light font-light leading-relaxed">
            Spanning approximately 16 acres, the masterplan is a testament to thoughtful urban design. 
            Click the pulsing beacons on the aerial view below to explore the distinct zones of Supreme Villagio.
          </p>
        </div>

        <div className="relative w-full h-[60vh] md:h-[80vh] rounded-sm overflow-hidden shadow-2xl border border-charcoal/10 bg-charcoal">
          {/* Parallax Background Map */}
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image 
              src="https://cdn.supremeuniversal.com/media/Mobile15_gRJeOM.jpg"
              alt="Supreme Villagio Masterplan Aerial View"
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-charcoal/30 mix-blend-multiply" />
          </motion.div>

          {/* Interactive Hotspots */}
          {MASTERPLAN_ZONES.map((zone) => (
            <div 
              key={zone.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              onClick={() => setActiveZone(zone)}
            >
              {/* Outer Pulse */}
              <motion.div 
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gold rounded-full w-12 h-12 -ml-3 -mt-3"
              />
              {/* Inner Core */}
              <div className="relative w-6 h-6 bg-gold rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              
              {/* Floating Label (Desktop Only) */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block w-max">
                <div className="bg-charcoal text-cream px-3 py-1 text-xs uppercase tracking-widest rounded-sm border border-gold/30 shadow-xl">
                  {zone.title}
                </div>
              </div>
            </div>
          ))}

          {/* Sliding Detail Panel */}
          <AnimatePresence>
            {activeZone && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-charcoal/95 backdrop-blur-xl border-l border-gold/20 shadow-2xl z-20 flex flex-col"
              >
                {/* Header */}
                <div className="p-8 border-b border-white/10 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${activeZone.status === 'Available' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                      <span className="text-xs uppercase tracking-widest text-white/50">{activeZone.status}</span>
                    </div>
                    <h4 className="text-3xl font-heading text-cream">{activeZone.title}</h4>
                  </div>
                  <button 
                    onClick={() => setActiveZone(null)}
                    className="p-2 text-white/50 hover:text-gold transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-8 flex-grow overflow-y-auto">
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-gold mb-1">Configuration</p>
                    <p className="text-lg text-cream font-light">{activeZone.configuration}</p>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-gold mb-1">Pricing</p>
                    <p className="text-lg text-cream font-light">{activeZone.pricing}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-gold mb-3">Overview</p>
                    <p className="text-white/70 font-light leading-relaxed">
                      {activeZone.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-black/20 border-t border-white/5">
                  <button 
                    onClick={openContactModal}
                    className="w-full flex items-center justify-between bg-gold text-charcoal px-6 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-cream transition-colors"
                  >
                    Inquire Now <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </section>
  );
}
