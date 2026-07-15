"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";

export default function LocationSection({ typology = "luxury villas" }: { typology?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="location" ref={containerRef} className="py-24 bg-charcoal text-cream relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/3 flex flex-col justify-center">
          <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-4">
            Chapter IV: Location
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-light mb-8">
            The Perfect <br />
            <span className="italic text-white">Equilibrium</span>
          </h3>
          <p className="text-stone font-light leading-relaxed mb-8">
            Situated just 2 hours from Mumbai and 30 minutes from Pune, with seamless access to Hinjawadi, Talegaon, and Chakan MIDC — Somatane offers connectivity without the compromise of urban chaos, making it the perfect destination for {typology.toLowerCase()}.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="text-gold mt-1 shrink-0" size={24} />
              <div>
                <p className="text-lg font-heading text-cream">Navi Mumbai Airport</p>
                <p className="text-sm text-stone">2 Hours Drive</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="text-gold mt-1 shrink-0" size={24} />
              <div>
                <p className="text-lg font-heading text-cream">Baner / Hinjewadi</p>
                <p className="text-sm text-stone">25 Mins Drive</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="text-gold mt-1 shrink-0" size={24} />
              <div>
                <p className="text-lg font-heading text-cream">Phoenix Mall of the Millennium</p>
                <p className="text-sm text-stone">25 Mins Drive</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Map */}
        <div className="lg:w-2/3 h-[500px] md:h-[700px] relative rounded-none overflow-hidden border border-cream/30 shadow-2xl">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.273187219985!2d73.68453481119799!3d18.65171738240502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c3f3ab8a43%3A0xc34cc5a2a229ceeb!2sSupreme%20Villagio!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(80%) grayscale(50%)" }}
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             />
             <div className="absolute inset-0 bg-charcoal/10 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
