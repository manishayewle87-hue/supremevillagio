export const SEO_KEYWORD_MATRIX = {
  locations: [
    "pune", "somatane", "somatane-pune", "west-pune", "near-baner", "near-hinjewadi",
    "kothrud", "dhayari", "warje", "karvenagar", "vadgaon-budruk", "narhe", "katraj",
    "swargate", "shivajinagar", "deccan-gymkhana", "erandwane", "bavdhan", "pashan",
    "aundh", "baner", "balewadi", "wakad", "hinjewadi", "pimple-saudagar", "pimple-nilakh",
    "pimpri", "chinchwad", "nigdi", "akurdi", "ravet", "kiwale", "punawale", "tathawade",
    "bhumkar-chowk", "dange-chowk", "thergaon", "kalewadi", "sangvi", "dapodi", "bhosari",
    "moshi", "charholi", "dighi", "vishrantwadi", "yerawada", "kalyani-nagar", "viman-nagar",
    "kharadi", "wagholi", "lohegaon", "dhanori", "tingre-nagar", "koregaon-park", "camp",
    "mg-road", "fatima-nagar", "wanowrie", "kondhwa", "nibm-road", "undri", "pisoli",
    "handewadi", "hadapsar", "magarpatta", "amanora-park-town", "phursungi", "bhekrai-nagar",
    "wadki", "uruli-kanchan", "loni-kalbhor", "kharadi-bypass", "chandan-nagar", "mundhwa",
    "keshav-nagar", "ghorpadi", "bhawani-peth", "nana-peth", "rasta-peth", "somwar-peth",
    "mangalwar-peth", "budhwar-peth", "shaniwar-peth", "narayan-peth", "sadashiv-peth",
    "navi-peth", "parvati", "bibwewadi", "dhankawadi", "sahakar-nagar", "padmavati",
    "market-yard", "gultekdi", "salisbury-park", "pune-cantonment", "khadki", "bopodi",
    "aundh-road", "baner-road", "sus", "mahalunge", "pirangut", "bhugaon", "kothrud-depot",
    "bhusari-colony", "paud-road", "talegaon", "lonavala", "khandala", "mumbai-pune-expressway"
  ],
  categories: {
    "villas": ["4-bhk-villas", "5-bhk-villas", "villas-in-pune", "luxury-villas", "premium-villas-market"],
    "bungalows": ["premium-bungalows", "premium-bungalows-in-pune", "4-bhk-bungalows", "5-bhk-twin-bungalows", "luxury-bungalow-projects"],
    "real-estate": ["pune-real-estate-market", "somatane-real-estate", "pune-premium-properties"],
    "row-houses": ["luxury-row-house", "premium-row-house", "4-bhk-row-house"]
  },
  intents: [
    "price", "floor-plan", "reviews", "location", "investment", 
    "for-sale", "gated-community", "top-1-project"
  ]
};

// Generate valid Hierarchical SEO URL slugs for Deep Siloing
export function generateSeoSlugs(): string[][] {
  const slugs: string[][] = [];
  let count = 0;
  
  for (const location of SEO_KEYWORD_MATRIX.locations) {
    for (const [category, specificTypes] of Object.entries(SEO_KEYWORD_MATRIX.categories)) {
      
      // We only statically generate the core paths to prevent Vercel Build timeouts
      // 1. Parent Silo
      slugs.push([location, category]);
      count++;
      
      for (const specific of specificTypes) {
        // 2. Child Silo
        if (count < 100) {
          slugs.push([location, category, specific]);
          count++;
        }
      }
    }
  }
  
  // Hard cap static generation at 100 to ensure fast builds. 
  // ISR (dynamicParams = true) will handle the remaining 12,000 On-Demand.
  return slugs.slice(0, 100);
}

// Separate function for the XML sitemap which needs ALL 12,000+ combinations instantly
export function getAllSeoSlugStrings(): string[][] {
  const slugs: string[][] = [];
  
  for (const location of SEO_KEYWORD_MATRIX.locations) {
    for (const [category, specificTypes] of Object.entries(SEO_KEYWORD_MATRIX.categories)) {
      // 1. Parent Silo
      slugs.push([location, category]);
      
      for (const specific of specificTypes) {
        // 2. Child Silo
        slugs.push([location, category, specific]);
        
        for (const intent of SEO_KEYWORD_MATRIX.intents) {
           // 3. Deep Intent Silo
           slugs.push([location, category, specific, intent]);
        }
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
  
  // Extract intents if they exist in the slug
  let intentContext = "";
  let intentSuffix = "";
  if (fullSlugStr.includes("price")) { intentContext = "pricing details and exclusive offers"; intentSuffix = " | Price"; }
  else if (fullSlugStr.includes("floor plan")) { intentContext = "spacious layout and floor plans"; intentSuffix = " | Floor Plan"; }
  else if (fullSlugStr.includes("investment")) { intentContext = "high-ROI investment opportunities"; intentSuffix = " | Investment"; }
  else if (fullSlugStr.includes("reviews")) { intentContext = "honest reviews and lifestyle insights"; intentSuffix = " | Reviews"; }
  else if (fullSlugStr.includes("for sale")) { intentContext = "premium properties currently for sale"; intentSuffix = " | For Sale"; }
  else if (fullSlugStr.includes("gated community")) { intentContext = "secure gated community lifestyle"; intentSuffix = " | Gated Community"; }
  
  // Dynamic Context Injection based on Silo Array
  let locationContext = "in the premium Pune Real Estate market";
  let locationBenefit = "Experience ultra-luxury living";
  
  if (fullSlugStr.includes("hinjewadi")) {
    locationContext = "just minutes away from Pune's bustling IT hubs";
    locationBenefit = "Balance your professional IT lifestyle with tranquil luxury living";
  } else if (fullSlugStr.includes("baner") || fullSlugStr.includes("balewadi")) {
    locationContext = "near the vibrant high-street culture of West Pune";
    locationBenefit = "Enjoy seamless connectivity to Baner's finest restaurants and schools";
  } else if (fullSlugStr.includes("somatane") || fullSlugStr.includes("talegaon") || fullSlugStr.includes("lonavala")) {
    locationContext = "surrounded by the serene hill-station atmosphere of Somatane";
    locationBenefit = "Wake up to breathtaking mountain views every morning";
  } else if (fullSlugStr.includes("kothrud") || fullSlugStr.includes("karvenagar")) {
    locationContext = "blending Pune's cultural heritage with modern luxury";
    locationBenefit = "Live in the heart of Pune's most prestigious traditional neighborhoods";
  } else if (fullSlugStr.includes("viman nagar") || fullSlugStr.includes("kalyani nagar") || fullSlugStr.includes("koregaon park")) {
    locationContext = "in Pune's most cosmopolitan and affluent eastern corridor";
    locationBenefit = "Immerse yourself in the pinnacle of urban luxury living";
  } else {
    // Try to dynamically inject the specific location if no custom rule applies
    const rawLoc = slugs[0] ? titleCase(slugs[0].replace(/-/g, " ")) : "Pune";
    locationContext = `near the rapidly developing micro-market of ${rawLoc}`;
    locationBenefit = `Secure your legacy in one of ${rawLoc}'s most coveted addresses`;
  }

  // Supreme Villagio hardened SEO injection
  const titlePrefix = titleCase(fullSlugStr);
  const finalTitle = `${titlePrefix}${intentSuffix} | Supreme Villagio Pune`;
  
  const optimizedDescription = `Discover exclusive ${titlePrefix} ${locationContext}. Supreme Villagio offers ultra-luxury ${typologyText.toLowerCase()} starting from ₹2.89 Cr*. Explore ${intentContext || 'Under Construction projects'}.`;

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
