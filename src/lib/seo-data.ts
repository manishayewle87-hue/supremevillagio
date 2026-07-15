export const SEO_KEYWORD_MATRIX = {
  locations: [
    "pune",
    "somatane",
    "somatane-pune",
    "west-pune",
    "near-baner",
    "near-hinjewadi"
  ],
  categories: {
    "villas": ["4-bhk-villas", "5-bhk-villas", "independent-villas", "luxury-villas"],
    "bungalows": ["twin-bungalows", "premium-bungalows"],
    "row-houses": ["luxury-row-house", "premium-row-house"]
  }
};

// Generate valid Hierarchical SEO URL slugs for Deep Siloing
export function generateSeoSlugs(): string[][] {
  const slugs: string[][] = [];
  
  for (const location of SEO_KEYWORD_MATRIX.locations) {
    for (const [category, specificTypes] of Object.entries(SEO_KEYWORD_MATRIX.categories)) {
      // Parent Silo: e.g. /supreme-villagio/pune/villas
      slugs.push([location, category]);
      
      for (const specific of specificTypes) {
        // Child Silo: e.g. /supreme-villagio/pune/villas/4-bhk-villas
        slugs.push([location, category, specific]);
      }
    }
  }
  
  return slugs;
}

// Convert hierarchical array back to readable text and inject dynamic location context
export function generateSeoDataFromSlug(slugs: string[]) {
  const fullSlugStr = slugs.join(" ").replace(/-/g, " ");
  
  const isBungalow = fullSlugStr.includes("bungalow");
  const isRowHouse = fullSlugStr.includes("row house");
  const isIndependent = fullSlugStr.includes("independent");
  
  let typologyText = "4 & 5 BHK Villas";
  if (isBungalow) typologyText = "Twin Bungalows";
  if (isRowHouse) typologyText = "Luxury Row Houses";
  if (isIndependent) typologyText = "Independent Villas";

  // Title case function
  const titleCase = (str: string) => str.replace(/\b\w/g, c => c.toUpperCase());
  
  // Dynamic Context Injection based on Silo Array
  let locationContext = "in the premium Pune Real Estate market";
  let locationBenefit = "Experience ultra-luxury living";
  
  if (fullSlugStr.includes("hinjewadi")) {
    locationContext = "just minutes away from Pune's bustling IT hubs";
    locationBenefit = "Balance your professional IT lifestyle with tranquil luxury living";
  } else if (fullSlugStr.includes("baner")) {
    locationContext = "near the vibrant high-street culture of West Pune";
    locationBenefit = "Enjoy seamless connectivity to Baner's finest restaurants and schools";
  } else if (fullSlugStr.includes("somatane")) {
    locationContext = "surrounded by the serene hill-station atmosphere of Somatane";
    locationBenefit = "Wake up to breathtaking mountain views every morning";
  }

  // Supreme Villagio hardened SEO injection
  const titlePrefix = titleCase(fullSlugStr);
  const finalTitle = `${titlePrefix} | Supreme Villagio Pune`;
  
  const optimizedDescription = `Discover exclusive ${titlePrefix} ${locationContext}. Supreme Villagio offers ultra-luxury ${typologyText.toLowerCase()} starting from ₹2.89 Cr* with Under Construction status.`;

  // Return dynamically constructed SEO props
  return {
    heroHeadline1: titleCase(slugs[slugs.length - 1] ? slugs[slugs.length - 1].replace(/-/g, " ") : "A New Paradigm of").trim(),
    heroHeadline2: titleCase(slugs[0] ? slugs[0].replace(/-/g, " ") : "Luxury Living").trim(),
    heroSubline: `${locationBenefit} at Supreme Villagio. ${typologyText} starting from ₹2.89 Cr*. Under Construction.`,
    highlightWords: slugs.map(s => titleCase(s.replace(/-/g, " "))).flatMap(s => s.split(" ")),
    pricing: "₹2.89 Cr*",
    typology: typologyText,
    title: finalTitle,
    description: optimizedDescription
  };
}
