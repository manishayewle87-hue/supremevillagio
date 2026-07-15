"use client";

import { motion } from "framer-motion";

interface AnimatedLineProps {
  direction?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
}

export default function AnimatedLine({ direction = "horizontal", className = "", delay = 0 }: AnimatedLineProps) {
  const isHorizontal = direction === "horizontal";
  
  return (
    <div className={`overflow-hidden ${isHorizontal ? "w-full h-[1px]" : "h-full w-[1px]"} ${className}`}>
      <motion.div
        initial={{ [isHorizontal ? "width" : "height"]: 0 }}
        whileInView={{ [isHorizontal ? "width" : "height"]: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
        className="bg-current opacity-30 w-full h-full"
      />
    </div>
  );
}
