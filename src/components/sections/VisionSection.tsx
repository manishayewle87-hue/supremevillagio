"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import AnimatedLine from "@/components/ui/AnimatedLine";
import TextReveal from "@/components/ui/TextReveal";

export default function VisionSection({ typology = "luxury homes" }: { typology?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="vision" 
      ref={sectionRef} 
      className="py-32 md:py-48 bg-cream text-charcoal relative overflow-hidden border-t border-charcoal/10"
    >
      <div className="absolute top-12 left-0 w-full px-6 md:px-12">
         <AnimatedLine />
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div style={{ opacity }} className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-8">
              Chapter I: Overview
            </h2>
            <div className="mb-8">
              <TextReveal 
                text="A Personal Sanctuary" 
                className="text-4xl md:text-6xl font-heading leading-tight" 
                highlightWords={["Sanctuary"]}
              />
              <TextReveal 
                text="For Slow Living" 
                className="text-4xl md:text-6xl font-heading leading-tight" 
                delay={0.5} 
                highlightWords={["Slow", "Living"]}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="space-y-6 text-charcoal-light text-lg font-light leading-relaxed"
            >
              <p>
                Supreme Villagio is not just a residence; it is a meticulously crafted sanctuary in Somatane, Pune. 
                Spanning 16 acres of pristine landscape, we have redefined horizontal living by offering exclusive {typology.toLowerCase()}.
              </p>
              
              <ul className="mt-8 space-y-4 pt-4 border-t border-charcoal/10">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="font-medium">Spacious 4 & 5 BHK Twin Villas & 4 BHK Townhouses</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="font-medium">Fully-Equipped Club Villagio</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="font-medium">Landscaped by Site Concepts, Singapore</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="font-medium">Phase 1 & 2 Sold Out and Handed Over</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Images (Editorial Layout) */}
          <div className="relative h-[600px] md:h-[800px] w-full hidden md:block">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-[70%] h-[60%] z-10"
            >
              <div className="relative w-full h-full shadow-2xl">
                <Image 
                  src="https://cdn.supremeuniversal.com/media/Mobile13_kHFJ7R.jpg"
                  alt="Supreme Villagio Exterior"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-10 left-0 w-[60%] h-[50%] z-20"
            >
              <div className="relative w-full h-full shadow-2xl border-4 border-cream">
                <Image 
                  src="https://cdn.supremeuniversal.com/media/image-3_PEYNPS.jpg"
                  alt="Supreme Villagio Exterior View"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Mobile Image Fallback */}
          <div className="block md:hidden h-[400px] w-full mt-10 relative">
             <Image 
                src="https://cdn.supremeuniversal.com/media/Mobile13_kHFJ7R.jpg"
                alt="Supreme Villagio Mobile View"
                fill
                className="object-cover"
              />
          </div>

        </div>
      </div>
    </section>
  );
}
