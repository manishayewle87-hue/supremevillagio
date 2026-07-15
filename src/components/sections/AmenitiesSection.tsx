"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NextImage from "next/image";

const AMENITIES = [
  {
    title: "Club Villagio",
    description: "18,500 sq. ft. of exclusive recreation and wellness.",
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-2",
    image: "https://cdn.supremeuniversal.com/media/jfpM5D_Villagio-L--KD--Club-housemin.jpg",
  },
  {
    title: "Infinity Pool",
    description: "Temperature-controlled swimming pool overlooking the hills.",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    image: "https://cdn.supremeuniversal.com/media/tIaHE6_Villagio-L--Club-housemin.jpg",
  },
  {
    title: "Yoga Pavilion",
    description: "Find inner peace in our dedicated meditation zones.",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    image: "https://cdn.supremeuniversal.com/media/fIAB41_Villagio--KD--Wellness-Spine.jpg",
  },
  {
    title: "Organic Gardens",
    description: "Stroll through meticulously landscaped green spaces.",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    image: "https://cdn.supremeuniversal.com/media/Bc6Vxj_Grand-Central-Boulevard_880-X-900_Villagio-08.jpg",
  },
  {
    title: "State-of-the-Art Gym",
    description: "Equipped with the latest fitness technology.",
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-1",
    image: "https://cdn.supremeuniversal.com/media/Supreme-Villagio--Desktop-Banner-5_H7lC84.jpg",
  }
];

export default function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="amenities" className="py-32 bg-background relative" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4"
          >
            A Life Extraordinary
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-light leading-tight"
          >
            Discover the <span className="text-foreground/50 italic">Pinnacle</span> of Wellness & Recreation.
          </motion.h2>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 md:auto-rows-[300px]">
          {AMENITIES.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden group rounded-sm ${amenity.colSpan} ${amenity.rowSpan} bg-muted h-[300px] md:h-auto`}
            >
              {/* Image Fallback Background */}
              <div className="absolute inset-0 bg-charcoal/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              
              {/* Background gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent z-20" />

              <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ y: amenity.rowSpan.includes("2") ? y : 0 }}
              >
                {/* 
                  Note: Using unoptimized img or fallback for now. 
                  In production, these URLs should be valid Supreme Universal CDN links.
                */}
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%231f2937'/%3E%3C/svg%3E";
                  }}
                />
              </motion.div>

              <div className="absolute bottom-0 left-0 p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-heading text-white mb-2">{amenity.title}</h3>
                <p className="text-white/70 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
