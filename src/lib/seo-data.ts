export const SEO_KEYWORD_MATRIX = {
  typologies: [
    "4-bhk-villas",
    "5-bhk-villas",
    "twin-bungalows",
    "luxury-row-house",
    "independent-villas",
    "premium-bungalows",
    "luxury-villas",
    "villas",
    "bungalows",
    "row-house"
  ],
  locations: [
    "pune",
    "somatane",
    "somatane-pune",
    "west-pune",
    "near-baner",
    "near-hinjewadi",
    "pune-real-estate"
  ],
  modifiers: [
    "supreme-villagio",
    "supreme-villagio-somatane",
    "luxury",
    "premium",
    "gated-community"
  ]
};

// Generate valid SEO URL slugs (Neat, clean, 1-depth focusing on supreme-villagio)
export function generateSeoSlugs(): string[][] {
  const slugs: string[][] = [];
  
  for (const typology of SEO_KEYWORD_MATRIX.typologies) {
    for (const location of SEO_KEYWORD_MATRIX.locations) {
      // Very clean URLs:
      // supreme-villagio-4-bhk-villas-pune
      slugs.push([`supreme-villagio-${typology}-${location}`]);
      // supreme-villagio-4-bhk-villas-in-pune
      slugs.push([`supreme-villagio-${typology}-in-${location}`]);
      
      for (const modifier of SEO_KEYWORD_MATRIX.modifiers) {
        // e.g. luxury-supreme-villagio-4-bhk-villas-in-pune
        if (modifier !== "supreme-villagio" && modifier !== "supreme-villagio-somatane") {
          slugs.push([`${modifier}-supreme-villagio-${typology}-in-${location}`]);
        }
      }
    }
  }
  
  return slugs;
}

// Convert slug array back to readable text
export function generateSeoDataFromSlug(slugs: string[]) {
  const fullSlugStr = slugs.join(" ").replace(/-/g, " ");
  
  const isBungalow = fullSlugStr.includes("bungalow");
  const isRowHouse = fullSlugStr.includes("row house");
  const isIndependent = fullSlugStr.includes("independent");
  
  let typologyText = "4 & 5 BHK Villas";
  if (isBungalow) typologyText = "Twin Bungalows";
  if (isRowHouse) typologyText = "Luxury Row House";
  if (isIndependent) typologyText = "Independent Villas";

  const locationText = (slugs.includes("somatane") || slugs.includes("supreme-villagio-somatane")) 
    ? "Somatane, Pune" 
    : "Pune Real Estate Market";

  // Title case function
  const titleCase = (str: string) => str.replace(/\b\w/g, c => c.toUpperCase());
  
  // Supreme Villagio hardened SEO injection
  const titlePrefix = titleCase(fullSlugStr);
  const finalTitle = `${titlePrefix} | Supreme Villagio Somatane`;
  
  const optimizedDescription = `Discover ${fullSlugStr} in the premium Pune Real Estate market. Supreme Villagio Somatane offers ultra-luxury ${typologyText.toLowerCase()}, twin bungalows, and row houses starting from ₹2.89 Cr* with OC received.`;

  // Return dynamically constructed SEO props
  return {
    heroHeadline1: titleCase(fullSlugStr.split(" in ")[0] || "A New Paradigm of").trim(),
    heroHeadline2: titleCase(fullSlugStr.split(" in ")[1] || "Luxury Living").trim(),
    heroSubline: `Experience ultra-luxury ${typologyText.toLowerCase()} at Supreme Villagio Somatane. OC Received.`,
    highlightWords: slugs.map(s => titleCase(s.replace(/-/g, " "))).flatMap(s => s.split(" ")),
    pricing: "₹2.89 Cr*",
    typology: typologyText,
    title: finalTitle,
    description: optimizedDescription
  };
}
