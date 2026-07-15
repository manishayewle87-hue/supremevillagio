"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function TextReveal({ 
  text, 
  className = "", 
  delay = 0,
  highlightWords = [],
  highlightClass = "text-gold italic font-light"
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => {
        // Remove punctuation for exact matching if needed, or just match directly
        const cleanWord = word.replace(/[.,]/g, "");
        const isHighlighted = highlightWords.includes(cleanWord);
        
        return (
          <motion.span 
            variants={child} 
            style={{ display: "inline-block" }} 
            key={index}
            className={isHighlighted ? highlightClass : ""}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
