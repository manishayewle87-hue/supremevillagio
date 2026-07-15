"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NextImage from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import { useModal } from "@/contexts/ModalContext";

const NAV_LINKS = [
  { label: "Vision", href: "/supreme-villagio/vision" },
  { label: "Architecture", href: "/supreme-villagio/architecture" },
  { label: "Residences", href: "/supreme-villagio/residences" },
  { label: "Amenities", href: "/supreme-villagio/amenities" },
  { label: "Location", href: "/supreme-villagio/location" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { openContactModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 group flex items-center">
          <NextImage 
            src="https://www.supremeuniversal.com/front/img/logo.svg" 
            alt="Supreme Universal" 
            width={121} 
            height={37}
            className="brightness-0 invert group-hover:opacity-80 transition-opacity duration-300" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav 
          className="hidden lg:flex items-center gap-2 relative"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.label} strength={20}>
              <div
                className="relative"
                onMouseEnter={() => setHoveredItem(link.label)}
              >
                {hoveredItem === link.label && (
                  <motion.div
                    layoutId="nav-box"
                    className="absolute inset-0 bg-cream/10 border border-cream/20 rounded-none z-[-1]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href={link.href}
                  className="group relative flex flex-col overflow-hidden text-sm uppercase tracking-widest font-medium h-[40px] px-4 justify-center"
                >
                  <div className="relative h-[20px] overflow-hidden flex flex-col justify-center w-full">
                    <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span className="absolute top-full block text-gold transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                      {link.label}
                    </span>
                  </div>
                </Link>
              </div>
            </Magnetic>
          ))}
          <Magnetic strength={40}>
            <button 
              onClick={() => openContactModal()}
              className="ml-6 bg-foreground text-background px-6 py-3 text-sm uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors duration-300 cursor-pointer"
            >
              Book Visit
            </button>
          </Magnetic>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-50 text-foreground hover:text-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 z-40"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContactModal();
                }}
                className="mt-8 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:bg-gold transition-colors duration-300"
              >
                Book Visit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
