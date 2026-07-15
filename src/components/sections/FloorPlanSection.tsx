"use client";

import { motion } from "framer-motion";
import { useModal } from "@/contexts/ModalContext";
import { ArrowRight, Maximize2 } from "lucide-react";

const FLOOR_PLANS = [
  {
    id: "4-BHK-TWIN",
    name: "4 BHK Twin Villas",
    carpetArea: "Approx. 2,800 sq.ft.",
    plotArea: "Approx. 3,500 sq.ft.",
    highlights: ["Private Garden", "Double-Height Living", "Staff Quarters"],
    description: "Designed for families seeking expansive horizontal living without compromising on privacy. Features a beautifully landscaped private garden and grand double-height living spaces.",
    coverImage: "https://cdn.supremeuniversal.com/media/SupremeVillagioIP52100046867_cwrz1A.jpg",
  },
  {
    id: "5-BHK-VILLA",
    name: "5 BHK Luxury Villas",
    carpetArea: "Approx. 4,200 sq.ft.",
    plotArea: "Approx. 5,000 sq.ft.",
    highlights: ["Private Elevator", "Terrace Lounge", "Home Theatre Option"],
    description: "The pinnacle of luxury in Somatane. These massive 5-bedroom residences come equipped with space for a private elevator and an expansive terrace lounge for entertaining.",
    coverImage: "https://cdn.supremeuniversal.com/media/SupremeVillagioIIP52100049506_zdy3oY.jpg",
  },
  {
    id: "ROW-HOUSE",
    name: "Luxury Row Houses",
    carpetArea: "Approx. 2,100 sq.ft.",
    plotArea: "Approx. 2,500 sq.ft.",
    highlights: ["Community Living", "Efficient Layout", "Modern Architecture"],
    description: "Perfectly balanced townhouses offering the security of a gated community with the independence of a villa. Smartly designed layouts maximize natural light and ventilation.",
    coverImage: "https://cdn.supremeuniversal.com/media/SUPREMEVILLAGIOIIIP52100055048_6dYFb3.jpg",
  },
];

export default function FloorPlanSection() {
  const { openContactModal } = useModal();

  return (
    <section id="residences" className="py-32 bg-charcoal text-white relative border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">The Residences</p>
          <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight">
            Curated Spaces for <br className="hidden md:block"/>
            <span className="text-white/50 italic">Elevated Living</span>
          </h2>
        </div>

        {/* Cinematic Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FLOOR_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative h-[600px] w-full bg-black rounded-sm overflow-hidden"
            >
              {/* Cover Image */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                <img 
                  src={plan.coverImage} 
                  alt={plan.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-30 transition-opacity duration-700" 
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80" />

              {/* Default State Content (Bottom) */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full transition-all duration-700 group-hover:translate-y-full group-hover:opacity-0">
                <h3 className="text-3xl font-heading mb-2">{plan.name}</h3>
                <p className="text-gold text-sm uppercase tracking-widest">{plan.carpetArea}</p>
              </div>

              {/* Hover State Content (Reveals on Hover) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div>
                  <h3 className="text-2xl font-heading text-gold mb-4">{plan.name}</h3>
                  <p className="text-white/80 font-light leading-relaxed text-sm mb-6 line-clamp-4">
                    {plan.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-white/20">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Carpet Area</p>
                      <p className="text-sm font-medium">{plan.carpetArea}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Plot Area</p>
                      <p className="text-sm font-medium">{plan.plotArea}</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-white/70 text-sm font-light">
                        <div className="w-1 h-1 rounded-full bg-gold mr-3" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={openContactModal}
                  className="mt-8 flex items-center justify-center gap-3 bg-white text-charcoal py-4 px-6 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-colors"
                >
                  <Maximize2 size={16} /> Request Floor Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
