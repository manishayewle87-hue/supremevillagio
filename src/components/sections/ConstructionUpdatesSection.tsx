/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";

const UPDATES = [
  {
    date: "August 2026",
    title: "Phase 1: Superstructure Complete",
    description: "The primary superstructure for the initial luxury villas has been successfully erected.",
    image: "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg"
  },
  {
    date: "September 2026",
    title: "Club Villagio Foundation",
    description: "Excavation and foundation work for the 18,500 sq ft Club Villagio has commenced.",
    image: "https://cdn.supremeuniversal.com/images/villagio-render.jpg"
  }
];

export default function ConstructionUpdatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-cream text-charcoal relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">Live Progress</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light">
              Construction <span className="italic">Updates</span>
            </h2>
          </div>
          <p className="text-charcoal/70 max-w-md text-sm md:text-base leading-relaxed">
            Transparency is our ultimate luxury. Witness the meticulous physical realization of Supreme Villagio in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {UPDATES.map((update, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-sm mb-8">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                  <img 
                    src={update.image} 
                    alt={update.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-widest text-charcoal">
                  {update.date}
                </div>
              </div>
              <h3 className="text-2xl font-heading mb-3">{update.title}</h3>
              <p className="text-charcoal/70 leading-relaxed">{update.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
