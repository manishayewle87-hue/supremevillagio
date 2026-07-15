"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "An absolute masterpiece of horizontal living. Supreme Villagio is the sanctuary my family has been looking for in Pune.",
    author: "R. Desai",
    role: "Resident, 5 BHK Villa"
  },
  {
    text: "The attention to detail in the architecture and the scale of the amenities at Club Villagio are unmatched in the city.",
    author: "S. Kulkarni",
    role: "Resident, Twin Bungalow"
  },
  {
    text: "Supreme Universal has once again proven why they are the most trusted luxury developer. The build quality is flawless.",
    author: "A. Mehta",
    role: "Resident, 4 BHK Villa"
  },
  {
    text: "Living amidst 16 acres of greenery while being so well-connected has completely transformed our lifestyle.",
    author: "V. Sharma",
    role: "Resident, Luxury Row House"
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-20 md:py-32 bg-charcoal text-white relative overflow-hidden">
      {/* Massive Background Quote Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] pointer-events-none">
        <Quote size={400} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-16">
        <div className="text-center">
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">Words of Trust</p>
          <h2 className="text-4xl md:text-5xl font-heading font-light">
            The <span className="text-white/50 italic">Supreme</span> Experience
          </h2>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-hidden group">
        {/* We render the track twice for seamless infinite scrolling */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40,
            ease: "linear", 
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-8 px-4"
        >
          {/* Double the array for seamless looping */}
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
            <div 
              key={idx} 
              className="w-[350px] md:w-[500px] flex-shrink-0 bg-white/5 border border-white/10 p-10 whitespace-normal hover:bg-white/10 transition-colors duration-500 rounded-sm"
            >
              <div className="text-gold mb-6">
                <Quote size={32} />
              </div>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-white/90">
                &quot;{testimonial.text}&quot;
              </p>
              <div>
                <p className="font-heading text-lg">{testimonial.author}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
