"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextImage from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  {
    title: "Lonavala Weather, Without the Premium",
    desc: "At the same altitude as Lonavala, Somatane enjoys a cooler microclimate and cleaner air — a rare combination of comfort and value just minutes from city life.",
  },
  {
    title: "Ready-to-Use Club Villagio",
    desc: "A clubhouse that brings the community together — with a grand banquet hall, gym, yoga and meditation zones, games room, and a mini theatre.",
  },
  {
    title: "Wellness Designed Into Everyday Life",
    desc: "A wellness-focused masterplan with reflexology paths, yoga decks, forest trails, and outdoor fitness areas.",
  },
  {
    title: "Curated Green Experiences",
    desc: "From butterfly gardens and bird pavilions to spice patches and blossom trails — every landscape element is designed to slow you down.",
  },
  {
    title: "Designed by Global Landscape Experts",
    desc: "Crafted in collaboration with Site Concepts International, led by Singapore-based Mark Mahan, every inch of greenery is shaped with design intention.",
  },
  {
    title: "Crafted Homes With Premium Specifications",
    desc: "From modular kitchens with designer fittings to wooden flooring, false ceilings, and smart security — your home is designed to feel elevated.",
  },
  {
    title: "A Complete, Self-Sustained Ecosystem",
    desc: "Co-working spaces, kids’ play areas, celebration lawns, and daily convenience zones come together to make Villagio more than a home.",
  },
  {
    title: "Low-Rise Living Amidst Nature",
    desc: "No high-rises, just uninterrupted views of skies and mountain ranges. With over 65% open spaces and thoughtfully landscaped zones.",
  }
];

export default function FeaturesSliderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const totalWidth = slider.scrollWidth - window.innerWidth;

      gsap.to(slider, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="amenities" ref={containerRef} className="h-[100dvh] w-full bg-cream text-charcoal overflow-hidden flex flex-col justify-center relative">
      <div className="absolute top-24 left-6 md:left-12 lg:left-24 z-10 max-w-2xl">
        <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-4">
          Chapter III: Amenities
        </h2>
        <h3 className="text-3xl md:text-5xl font-heading font-light">
          Everything You Need, <br />
          <span className="italic text-charcoal-light">Exactly Where You Want It</span>
        </h3>
      </div>

      <div ref={sliderRef} className="flex gap-8 md:gap-16 px-6 md:px-12 lg:px-24 mt-40 pb-24 items-center w-max">
        {FEATURES.map((feature, idx) => (
          <div 
            key={idx}
            className="w-[300px] md:w-[400px] flex-shrink-0 bg-background border border-charcoal p-8 md:p-12 h-[350px] flex flex-col justify-between hover:shadow-2xl hover:border-gold hover:-translate-y-4 transition-all duration-500 rounded-none group"
          >
            <div>
              <div className="text-5xl font-heading text-gold/20 mb-6 group-hover:text-gold transition-colors duration-500">0{idx + 1}</div>
              <h4 className="text-2xl font-heading text-charcoal mb-4 group-hover:text-gold transition-colors duration-500">{feature.title}</h4>
            </div>
            <p className="text-charcoal-light font-light leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
