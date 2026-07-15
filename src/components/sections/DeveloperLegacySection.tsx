"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MILESTONES = [
  {
    year: "1982",
    title: "The Genesis",
    description: "Supreme Universal was founded with a vision to redefine luxury living in India.",
  },
  {
    year: "2010",
    title: "Redefining Pune",
    description: "Expanded our footprint to Pune, delivering landmark projects that transformed the skyline.",
  },
  {
    year: "2020",
    title: "70+ Masterpieces",
    description: "Successfully delivered over 70 projects, building a legacy of trust with 3000+ happy families.",
  },
  {
    year: "2026",
    title: "Supreme Villagio",
    description: "Launching the magnum opus of horizontal living in Somatane, Pune.",
  }
];

export default function DeveloperLegacySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Grow the line from 0% to 100% height as we scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="legacy" className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4"
          >
            Our Legacy
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-light leading-tight"
          >
            Four Decades of <br className="hidden md:block"/>
            <span className="text-foreground/50 italic">Uncompromising Excellence</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Background faint line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/50 md:-translate-x-1/2 z-0" />
          
          {/* Animated Golden Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gold md:-translate-x-1/2 z-10 origin-top"
          />

          <div className="space-y-24 relative z-20 pb-12">
            {MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={milestone.year} className="relative flex flex-col md:flex-row items-center justify-between group">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-2 border-gold rounded-full md:-translate-x-1/2 z-20 group-hover:scale-150 group-hover:bg-gold transition-all duration-300" />
                  
                  {/* Left Content (or empty spacer for odd items on desktop) */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <h3 className="text-4xl font-heading text-gold mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-medium mb-3">{milestone.title}</h4>
                      <p className="text-foreground/70 font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty Spacer for alternating layout on Desktop */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-2' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
