/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import Image from "next/image";

const LOGOS = [
  { name: "Economic Times", url: "https://upload.wikimedia.org/wikipedia/commons/4/41/The_Economic_Times_logo.png" },
  { name: "Times of India", url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/The_Times_of_India_logo.svg/2560px-The_Times_of_India_logo.svg.png" },
  { name: "Moneycontrol", url: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Moneycontrol_logo.svg/1200px-Moneycontrol_logo.svg.png" },
  { name: "Hindustan Times", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Hindustan_Times_logo.svg/2560px-Hindustan_Times_logo.svg.png" }
];

export default function PressSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-cream/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-forest/50 uppercase tracking-[0.2em] text-xs font-semibold mb-12">
          Recognized For Excellence In Luxury Real Estate
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {LOGOS.map((logo, idx) => (
            <img 
              key={idx}
              src={logo.url}
              alt={`${logo.name} Logo`}
              className="h-6 md:h-8 object-contain opacity-50 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
