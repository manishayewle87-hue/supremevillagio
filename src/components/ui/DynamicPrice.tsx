'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/currency';

interface DynamicPriceProps {
  fallbackPrice?: string;
}

export default function DynamicPrice({ fallbackPrice = "₹2.89 Cr*" }: DynamicPriceProps) {
  const [price, setPrice] = useState(fallbackPrice);

  useEffect(() => {
    // Read the currency cookie set by Vercel Edge Middleware
    const match = document.cookie.match(new RegExp('(^| )user-currency=([^;]+)'));
    if (match && match[2]) {
      const currency = match[2];
      setPrice(formatPrice(currency));
    }
  }, []);

  return <>{price}</>;
}
