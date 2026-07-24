export const CURRENCY_RATES = {
  INR: 1,
  USD: 83.2, // $1 = 83.2 INR
  AED: 22.65, // 1 AED = 22.65 INR
  GBP: 104.5, // £1 = 104.5 INR
  SGD: 61.2, // 1 SGD = 61.2 INR
};

export const BASE_PRICE_INR = 28900000; // ₹2.89 Cr

export function formatPrice(currencyCode: string): string {
  const rate = CURRENCY_RATES[currencyCode as keyof typeof CURRENCY_RATES] || 1;
  const convertedValue = BASE_PRICE_INR / rate;

  switch (currencyCode) {
    case 'USD':
      return `$${(convertedValue / 1000).toFixed(0)}K*`;
    case 'AED':
      return `${(convertedValue / 1000000).toFixed(2)}M AED*`;
    case 'GBP':
      return `£${(convertedValue / 1000).toFixed(0)}K*`;
    case 'SGD':
      return `S$${(convertedValue / 1000).toFixed(0)}K*`;
    default:
      return '₹2.89 Cr*'; // Default INR formatting
  }
}
