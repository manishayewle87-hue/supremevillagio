"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-16 border-t border-charcoal-light">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-gold mb-6">
              Supreme Villagio
            </h2>
            <p className="text-stone text-sm leading-relaxed mb-6">
              A new definition of timeless luxury living. Experience architecture,
              nature, and lifestyle in perfect harmony.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/supreme_universal/" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-gold transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
              <Link href="https://www.facebook.com/SupremeUniversalRealEstate/" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-gold transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>

              <Link href="https://www.linkedin.com/company/supremeuniversal/" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-gold transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-white mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-stone">
              <li>
                <Link href="/supreme-villagio/vision" className="hover:text-gold transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link href="/supreme-villagio/architecture" className="hover:text-gold transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/supreme-villagio/residences" className="hover:text-gold transition-colors">
                  Residences
                </Link>
              </li>
              <li>
                <Link href="/supreme-villagio/amenities" className="hover:text-gold transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">
                  Journal (Blog)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-white mb-6">Information</h3>
            <ul className="space-y-4 text-sm text-stone">
              <li>
                <Link href="/supreme-villagio/location" className="hover:text-gold transition-colors">
                  Location Map
                </Link>
              </li>
              <li>
                <Link href="#investment" className="hover:text-gold transition-colors">
                  Investment
                </Link>
              </li>
              <li>
                <Link href="/brochure.pdf" className="hover:text-gold transition-colors">
                  Download Brochure
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-white mb-6">Experience Centre</h3>
            <address className="not-italic text-sm text-stone space-y-2">
              <p>Supreme Villagio Site,</p>
              <p>Luxury Estate Road, Sector 1,</p>
              <p>
                <button onClick={() => window.dispatchEvent(new Event('open-contact-modal'))} className="hover:text-gold transition-colors text-left flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Request a Callback / Email Us
                </button>
                <a href="tel:+917744009295" className="hover:text-gold transition-colors block mt-2 font-medium">
                  +91 7744009295
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Popular Searches SEO Silo Links */}
        <div className="py-12 border-t border-charcoal-light">
          <h3 className="text-sm uppercase tracking-widest text-white mb-8 text-center md:text-left">Popular Searches</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-stone">
            <Link href="/" className="hover:text-gold transition-colors font-semibold text-white">Supreme Villagio Somatane</Link>
            <Link href="/supreme-villagio/pune/villas" className="hover:text-gold transition-colors">Pune Luxury Villas</Link>
            <Link href="/supreme-villagio/somatane/villas/5-bhk-villas" className="hover:text-gold transition-colors">5 BHK Villas in Somatane</Link>
            <Link href="/supreme-villagio/near-hinjewadi/bungalows" className="hover:text-gold transition-colors">Bungalows Near Hinjewadi</Link>
            <Link href="/supreme-villagio/near-baner/row-houses" className="hover:text-gold transition-colors">Row Houses Near Baner</Link>
            <Link href="/supreme-villagio/pune/villas/4-bhk-villas" className="hover:text-gold transition-colors">4 BHK Villas in Pune</Link>
            <Link href="/supreme-villagio/west-pune/villas/luxury-villas" className="hover:text-gold transition-colors">Luxury Villas West Pune</Link>
            <Link href="/supreme-villagio/somatane/bungalows/twin-bungalows" className="hover:text-gold transition-colors">Twin Bungalows Somatane</Link>
            <Link href="/supreme-villagio/pune/row-houses/premium-row-house" className="hover:text-gold transition-colors">Premium Row Houses Pune</Link>
          </div>
        </div>

        {/* MahaRERA Section */}
        <div className="py-8 border-t border-charcoal-light text-center">
          <h4 className="text-gold font-heading text-sm uppercase tracking-widest mb-4">MahaRERA Registration</h4>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 text-sm text-stone mt-6">
            <div className="flex flex-col items-center">
              <img src="https://cdn.supremeuniversal.com/media/SupremeVillagioIP52100046867_cwrz1A.jpg" alt="Phase 1 QR Code" className="w-20 h-20 mb-3 rounded-sm opacity-90 hover:opacity-100 transition-opacity" />
              <p><strong>Phase 1:</strong> P52100046867</p>
            </div>
            <div className="hidden md:block h-24 w-px bg-charcoal-light self-center"></div>
            <div className="flex flex-col items-center">
              <img src="https://cdn.supremeuniversal.com/media/SupremeVillagioIIP52100049506_zdy3oY.jpg" alt="Phase 2 QR Code" className="w-20 h-20 mb-3 rounded-sm opacity-90 hover:opacity-100 transition-opacity" />
              <p><strong>Phase 2:</strong> P52100049506</p>
            </div>
            <div className="hidden md:block h-24 w-px bg-charcoal-light self-center"></div>
            <div className="flex flex-col items-center">
              <img src="https://cdn.supremeuniversal.com/media/SUPREMEVILLAGIOIIIP52100055048_6dYFb3.jpg" alt="Phase 3 QR Code" className="w-20 h-20 mb-3 rounded-sm opacity-90 hover:opacity-100 transition-opacity" />
              <p><strong>Phase 3:</strong> P52100055048</p>
            </div>
          </div>
          <p className="text-xs text-stone mt-4 max-w-3xl mx-auto">
            Available at <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold underline underline-offset-2">maharera.mahaonline.gov.in</a>
          </p>
        </div>

        <div className="pt-8 border-t border-charcoal-light flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>&copy; {new Date().getFullYear()} Supreme Villagio. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
