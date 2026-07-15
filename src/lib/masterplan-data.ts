export interface MasterplanZone {
  id: string;
  title: string;
  configuration: string;
  status: "Available" | "Sold Out";
  pricing: string;
  x: number; // Percentage X coordinate on the aerial image
  y: number; // Percentage Y coordinate on the aerial image
  description: string;
}

export const MASTERPLAN_ZONES: MasterplanZone[] = [
  {
    id: "zone-1",
    title: "Club Villagio",
    configuration: "Amenities Center",
    status: "Available",
    pricing: "Exclusive Access",
    x: 45,
    y: 35,
    description: "The heart of Supreme Villagio. A fully-equipped luxury clubhouse featuring a resort-style pool, state-of-the-art gym, and indoor games."
  },
  {
    id: "zone-2",
    title: "The Townhouses",
    configuration: "4 BHK Row Houses",
    status: "Sold Out",
    pricing: "₹2.89 Cr*",
    x: 20,
    y: 60,
    description: "Phase 1 townhouses perfectly blending community living with villa independence. Fully sold out and handed over."
  },
  {
    id: "zone-3",
    title: "East Wing Twin Villas",
    configuration: "4 & 5 BHK Twin Villas",
    status: "Available",
    pricing: "₹3.50 Cr*",
    x: 70,
    y: 50,
    description: "Premium twin villas oriented for optimal morning sunlight. Features double-height living spaces and private gardens."
  },
  {
    id: "zone-4",
    title: "Signature Series",
    configuration: "5 BHK Independent Villas",
    status: "Available",
    pricing: "₹5.50 Cr*",
    x: 80,
    y: 20,
    description: "The crown jewel of Somatane. Ultra-luxury independent villas with private elevators, expansive terraces, and mountain views."
  },
  {
    id: "zone-5",
    title: "Central Park",
    configuration: "Landscaped Gardens",
    status: "Available",
    pricing: "Community Area",
    x: 55,
    y: 65,
    description: "Lush, expansive greenery landscaped by Site Concepts International, Singapore. A perfect retreat for evening walks."
  }
];
