"use client";

import React, { useEffect, useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

export default function NriBanner() {
  const [isNRI, setIsNRI] = useState(false);
  const { openContactModal } = useModal();

  useEffect(() => {
    // Read the cookie set by the Edge Middleware
    const cookies = document.cookie.split(';');
    const nriCookie = cookies.find(c => c.trim().startsWith('nri_status='));
    if (nriCookie && nriCookie.split('=')[1] === 'true') {
      setIsNRI(true); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, []);

  if (!isNRI) return null;

  return (
    <div className="bg-gold text-charcoal py-3 px-4 text-center z-[60] relative border-b border-gold-muted flex flex-col md:flex-row items-center justify-center gap-3">
      <span className="text-sm font-semibold uppercase tracking-wider">
        ✈️ Special NRI Investment Allocation Available
      </span>
      <span className="text-xs md:text-sm">
        Secure your luxury villa in Pune with exclusive NRI payment plans.
      </span>
      <button 
        onClick={openContactModal}
        className="ml-0 md:ml-4 bg-charcoal text-white px-4 py-1.5 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-forest transition-colors shadow-lg"
      >
        Request NRI Guide
      </button>
    </div>
  );
}
