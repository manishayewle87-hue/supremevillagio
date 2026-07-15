"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { openContactModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 800px)
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 flex flex-col gap-4"
        >
          <a
            href="https://wa.me/917744009295"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle size={24} />
          </a>
          <a
            href="tel:+917744009295"
            className="w-12 h-12 bg-charcoal text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Phone size={22} />
          </a>
          <button
            onClick={openContactModal}
            className="w-12 h-12 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Calendar size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
