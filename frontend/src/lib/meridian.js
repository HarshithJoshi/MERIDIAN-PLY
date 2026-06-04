// Shared assets and constants for Meridian Plywood
export const BRAND = {
  name: "Meridian Plywood",
  tagline: "Built to Endure. Designed to Inspire.",
  // Heritage tagline carried forward from the original brand mark
  legacyTagline: "always with you…",
  productLine: "Plywood · Block Board · Flush Door",
  short: "Meridian",
  whatsapp: "+919629783971",
  email: "hello@meridianplywood.com",
  phone: "+91 96297 83971",
  // Primary manufacturing facility
  manufacturing: "Industrial Estate, Yamunanagar, Haryana 135001, India",
  // Authorised distributor + flagship company store (Telangana)
  showroomAddress:
    "14-1-327/328, Behind Prakash Talkies Lane, Near Jain Mandir, Aghapura, Hyderabad, Telangana 500028, India",
  showroomLabel: "Authorised Distributor · Telangana",
  showroomBadge: "Flagship Company Store",
  // Backwards-compat alias used by the Footer + general "address" references
  address:
    "14-1-327/328, Behind Prakash Talkies Lane, Near Jain Mandir, Aghapura, Hyderabad, Telangana 500028, India",
  // For the OpenStreetMap iframe embed (Aghapura, Hyderabad)
  mapLat: 17.3911,
  mapLng: 78.4625,
  mapShareUrl: "https://share.google/oH6zkfr89LhvWRCUa",
};

export const IMAGES = {
  hero: "/images/hero-plywood-slab.png",
  // Brand identity assets (extracted from supplied Meridian PDF)
  logoBox: "/images/logo-wordmark-ivory.png", // PRIMARY — boxed rectangular wordmark (ivory, pre-processed)
  logoMark: "/images/logo-mark.png",          // standalone tree-in-hands symbol (icon usage only)
  logoWordmark: "/images/logo-wordmark.png",  // original black-on-white wordmark
  logoFull: "/images/logo-full.png",          // horizontal lockup variant
  exploded:
    "https://static.prod-images.emergentagent.com/jobs/a398aedd-9258-477b-b0f6-a8e34e2373a5/images/25815b3d59b495af0f8b427a7748dbd9e8ade893e183e2c9e418d2e114d8f20b.png",
  water:
    "https://static.prod-images.emergentagent.com/jobs/a398aedd-9258-477b-b0f6-a8e34e2373a5/images/2a6cd08a03fb3fe92afa18861a3d661122f5a97f52aeb629248ab2a6c00e4e63.png",
  forest:
    "https://static.prod-images.emergentagent.com/jobs/a398aedd-9258-477b-b0f6-a8e34e2373a5/images/fe21622034f19fc80e351856410744b8a40b577d32237a8c502b1a784982ada1.png",
  kitchen:
    "https://images.unsplash.com/photo-1663811396777-05505d999151?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbHV4dXJ5JTIwbW9kZXJuJTIwa2l0Y2hlbiUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3Nzk5MDg4NTd8MA&ixlib=rb-4.1.0&q=85",
  wardrobe:
    "https://images.unsplash.com/photo-1771270731051-9cfbb7222946?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB3YXJkcm9iZSUyMGRhcmslMjB3b29kJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzc5OTA4ODU3fDA&ixlib=rb-4.1.0&q=85",
  portrait1:
    "https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwYXJjaGl0ZWN0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc5OTA4ODU3fDA&ixlib=rb-4.1.0&q=85",
  portrait2:
    "https://images.unsplash.com/photo-1558730234-d8b2281b0d00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwYXJjaGl0ZWN0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc5OTA4ODU3fDA&ixlib=rb-4.1.0&q=85",
  portrait3:
    "https://images.unsplash.com/photo-1613064756072-52b429a1e06f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwYXJjaGl0ZWN0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc5OTA4ODU3fDA&ixlib=rb-4.1.0&q=85",
};

// Curated cinematic woody luxury interiors — AI-generated (Gemini Nano Banana)
export const GALLERY = [
  {
    src: "/images/interior_kitchen.jpg",
    title: "The Atelier Kitchen",
    location: "Mumbai · Private Residence",
    finish: "BWP Gurjan 19mm · Fluted Walnut Veneer",
  },
  {
    src: "/images/interior_wardrobe.jpg",
    title: "Walk-In Wardrobe",
    location: "Bengaluru · Penthouse",
    finish: "BWP Gurjan 16mm · Vertical Reeded Walnut",
  },
  {
    src: "/images/interior_lobby.jpg",
    title: "Hotel Lobby Panels",
    location: "Goa · Boutique Hotel",
    finish: "Book-matched Walnut Veneer · Architectural Grade",
  },
  {
    src: "/images/interior_library.jpg",
    title: "Reading Library",
    location: "Delhi · Villa",
    finish: "Solid Walnut Shelving · Hand-finished Oil",
  },
  {
    src: "/images/interior_bath.jpg",
    title: "Sculpted Bath",
    location: "Hyderabad · Apartment",
    finish: "Marine Grade 18mm · Slatted Walnut Screen",
  },
];

export const NAV = [
  { id: "material", label: "Material" },
  { id: "technology", label: "Technology" },
  { id: "products", label: "Products" },
  { id: "performance", label: "Performance" },
  { id: "interiors", label: "Interiors" },
  { id: "sustainability", label: "Sustainability" },
  { id: "portal", label: "Portal" },
  { id: "contact", label: "Contact" },
];
