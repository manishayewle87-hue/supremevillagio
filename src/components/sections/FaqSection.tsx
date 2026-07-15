"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What residential options does the project offer?",
    answer: "The estate features an exclusive collection of 3, 4, and 5 BHK twin villas, alongside elegantly designed 4 BHK townhouses."
  },
  {
    question: "How expansive is the development?",
    answer: "The entire community is meticulously planned across a sprawling expanse of approximately 16 acres."
  },
  {
    question: "What is the expected possession timeline?",
    answer: "The project is slated to receive its full Occupancy Certificate (OC) by December 2027."
  },
  {
    question: "Can you describe the clubhouse facilities?",
    answer: "Residents enjoy exclusive access to Club Villagio, an expansive 18,500 sq. ft. facility dedicated to indoor recreation, wellness, and social gatherings."
  },
  {
    question: "What is the exact address of the estate?",
    answer: "The property is nestled in the serene locale of Somatane, Pune."
  },
  {
    question: "How accessible is the site from key city hubs?",
    answer: "You can reach the estate via a smooth 30-minute drive from Baner, taking the Mumbai-Satara Highway."
  },
  {
    question: "Does the property offer a secure, enclosed environment?",
    answer: "Absolutely, it is a fully secured, gated luxury community comprising premium villas and townhouses."
  },
  {
    question: "What is the total unit density of the community?",
    answer: "The development maintains a low-density profile with just 75 3-BHK townhouses, 44 4-BHK townhouses, 72 4-BHK twin villas, and 19 5-BHK twin villas."
  },
  {
    question: "What kind of lifestyle amenities are included?",
    answer: "Beyond the grand Club Villagio, the estate is equipped with a diverse array of outdoor leisure, fitness, and nature-inspired recreational spaces."
  }
];

export default function FaqSection() {
  return (
    <section className="py-24 bg-cream text-charcoal">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-gold font-bold mb-4">
            Questions & Answers
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-light">
            Frequently Asked Questions
          </h3>
        </div>

        <Accordion className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-charcoal py-4">
              <AccordionTrigger className="text-left font-heading text-lg md:text-xl hover:text-gold transition-colors duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal-light leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
