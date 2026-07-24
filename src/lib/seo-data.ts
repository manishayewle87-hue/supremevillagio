export const SEO_KEYWORD_MATRIX = {
  // CLUSTER 9: Location Keywords (28 Locations)
  locations: [
    "pune", "somatane", "talegaon", "hinjawadi", "baner", "balewadi", "pashan", 
    "bavdhan", "wakad", "ravet", "punawale", "kiwale", "aundh", "prabhat-road", 
    "koregaon-park", "kalyani-nagar", "nibm", "panchshil", "pcmc", "mulshi", 
    "bhugaon", "sus", "mahalunge", "pirangut", "mumbai-pune-expressway", 
    "dehu-road", "chinchwad", "nigdi"
  ],
  
  // CLUSTERS 1-6: Luxury Property Types (36 Types)
  categories: [
    // Villas
    "luxury-villas", "premium-villas", "villas-for-sale", "independent-villas", 
    "modern-villas", "designer-villas", "smart-villas", "luxury-gated-villas", 
    "ready-villas", "exclusive-villas", "villa-projects", "high-end-villas",
    // Homes
    "luxury-homes", "premium-luxury-homes", "ultra-luxury-homes", "exclusive-luxury-homes",
    "designer-luxury-homes", "gated-luxury-homes", "signature-homes", "mansion-style-homes",
    "elite-homes", "luxury-private-homes", "premium-homes", "premium-residential-projects",
    "premium-houses", "premium-living", "premium-family-homes",
    // Row Houses & Duplex
    "luxury-row-houses", "premium-row-houses", "row-house-projects", "gated-row-houses",
    "luxury-townhouses", "luxury-duplex", "duplex-homes", "duplex-villa", "premium-duplex-homes"
  ],

  // CLUSTERS 7, 8, 10, 11, 12, 14: HNI & Budget Modifiers (38 Modifiers)
  modifiers: [
    // Budgets (Cluster 7)
    "under-3-crore", "under-4-crore", "under-5-crore", "under-7-crore", "under-10-crore",
    "between-3-and-10-crore", "above-3-crore",
    // Lifestyles (Cluster 8)
    "luxury-living", "golf-living", "nature-living", "resort-living", "weekend-living",
    "pet-friendly", "smart-homes", "luxury-community", "wellness-living",
    // HNI Audiences (Cluster 10)
    "for-ceos", "for-entrepreneurs", "for-business-owners", "for-nris", "for-doctors",
    "luxury-second-homes", "executive-villas", "luxury-retirement-homes",
    // Amenities (Cluster 11)
    "with-private-garden", "with-private-terrace", "with-private-lift", "with-swimming-pool",
    "with-clubhouse", "forest-view", "mountain-view", "with-home-theatre",
    // Investment & Commercial (Clusters 12, 14)
    "investment", "high-roi", "price", "site-visit", "offers", "payment-plan"
  ]
};

// 28 Locations * 36 Categories * 38 Modifiers = 38,304 Combinations.

export function generateSeoSlugs(): string[][] {
  const slugs: string[][] = [];
  let count = 0;
  
  for (const location of SEO_KEYWORD_MATRIX.locations) {
    for (const category of SEO_KEYWORD_MATRIX.categories) {
      // 1. Parent Silo (1,008 combinations)
      if (count < 100) {
        slugs.push([location, category]);
        count++;
      }
      
      for (const modifier of SEO_KEYWORD_MATRIX.modifiers) {
        // 2. Child Silo (38,304 combinations)
        if (count < 100) {
          slugs.push([location, category, modifier]);
          count++;
        }
      }
    }
  }
  
  // Cap static generation at 100. ISR handles the remaining 38,204 On-Demand.
  return slugs.slice(0, 100);
}

// Function for the XML sitemap which needs ALL 38,304 combinations instantly
export function getAllSeoSlugStrings(): string[][] {
  const slugs: string[][] = [];
  
  for (const location of SEO_KEYWORD_MATRIX.locations) {
    for (const category of SEO_KEYWORD_MATRIX.categories) {
      slugs.push([location, category]);
      for (const modifier of SEO_KEYWORD_MATRIX.modifiers) {
        slugs.push([location, category, modifier]);
      }
    }
  }
  
  return slugs;
}

// Parser that dynamically understands the HNI keywords
export function generateSeoDataFromSlug(slugs: string[]) {
  const rawLoc = slugs[0] || "pune";
  const rawCategory = slugs[1] || "luxury-villas";
  const rawModifier = slugs[2] || "";

  // Title case function
  const titleCase = (str: string) => str.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  
  const formattedLoc = titleCase(rawLoc);
  const formattedCat = titleCase(rawCategory);
  let formattedMod = rawModifier ? titleCase(rawModifier) : "";

  // Advanced grammatical formatting for the title
  let titleString = "";
  if (rawModifier.startsWith('under') || rawModifier.startsWith('between') || rawModifier.startsWith('above') || rawModifier.startsWith('for') || rawModifier.startsWith('with')) {
    // e.g. "Ultra Luxury Homes in Baner Under 5 Crore"
    titleString = `${formattedCat} in ${formattedLoc} ${formattedMod}`;
  } else if (rawModifier === "investment" || rawModifier === "high-roi") {
    titleString = `${formattedMod} ${formattedCat} in ${formattedLoc}`;
  } else if (rawModifier === "price" || rawModifier === "site-visit" || rawModifier === "offers" || rawModifier === "payment-plan") {
    titleString = `${formattedCat} in ${formattedLoc} | ${formattedMod}`;
  } else if (rawModifier.includes("living") || rawModifier.includes("community")) {
    titleString = `${formattedMod} | ${formattedCat} in ${formattedLoc}`;
  } else {
    titleString = `${formattedCat} in ${formattedLoc} ${formattedMod ? "- " + formattedMod : ""}`;
  }

  // Enforce HNI Focus
  const finalTitle = `${titleString} | Supreme Villagio Somatane`;
  
  // Identify core typology for the UI
  let typologyText = "Premium Villas";
  if (rawCategory.includes("row-house")) typologyText = "Luxury Row Houses";
  if (rawCategory.includes("duplex")) typologyText = "Premium Duplex Homes";
  if (rawCategory.includes("bungalow")) typologyText = "Ultra Luxury Twin Bungalows";

  const optimizedDescription = `Discover the pinnacle of luxury living. Supreme Villagio offers ${typologyText.toLowerCase()} in the ${formattedLoc} real estate market. Perfectly designed for HNI buyers seeking ${formattedMod || "exclusive properties"} in the ₹3-10 Cr segment.`;

  return {
    heroHeadline1: formattedMod ? formattedMod : "A New Paradigm of",
    heroHeadline2: formattedCat,
    heroSubline: `Secure your legacy in the highly coveted ${formattedLoc} market. ${typologyText} starting from ₹2.89 Cr*. Designed exclusively for the luxury buyer.`,
    highlightWords: [formattedCat, formattedLoc, formattedMod].filter(Boolean).flatMap(s => s.split(" ")),
    pricing: "₹2.89 Cr*",
    typology: typologyText,
    title: finalTitle.replace(/\s+/g, ' ').trim(), // Clean up extra spaces
    description: optimizedDescription
  };
}
