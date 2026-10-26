import { PROPERTY_FACTS } from "@/lib/propertyFacts";

export const BRAND = {
  name: "Mountain View",
  subtitle: "Resort & Hotel",
  place: "Gusinje · Montenegro",
  phone: "+382 68 749 749",
  phoneHref: "tel:+38268749749",
  whatsapp: "https://wa.me/38268749749",
  // Written contact for both houses.
  email: "mountainviewresortt@gmail.com",
  emailHref: "mailto:mountainviewresortt@gmail.com",
  instagram: "https://www.instagram.com/mountain_view_resortt/",
  instagramHandle: "@mountain_view_resortt",
  threads: "https://www.threads.com/@mountain_view_resortt",
  tourism: "https://gusinje.travel/",
};

// The two property pins live in src/lib/propertyFacts.js, beside the facts they
// describe, so every map link on the site opens the same coordinates as the copy.
export const MAP_QUERIES = {
  resort: PROPERTY_FACTS.resort.pin.query,
  inn: PROPERTY_FACTS.inn.pin.query,
  gusinje: "Gusinje, Montenegro",
  grebaje: "Grebaje Valley, Montenegro",
};

const FILES = "https://media.base44.com/images/public/6add6db1a4366797590573f0/";

export const IMAGES = {
  hero: `${FILES}bdc367c1b_mountain-view-valley.jpg`,
  prokletije: `${FILES}87bdef98b_mountain-view-prokletije.jpg`,
  gusinje: `${FILES}5b6f78991_mountain-view-gusinje-town.jpg`,
  resort: `${FILES}8bda5b916_mountain-view-resort-room.jpg`,
  inn: `${FILES}4bbcd5227_Screenshot_25-10-2026_34857_wwwgooglecouk.jpeg`,
};

// Credits printed on the site: our own photographs of the houses, and the
// licensed landscape photographs taken by other photographers.
export const OWN_PHOTO_CREDIT = "Photographs of Mountain View Resort are our own.";

export const LANDSCAPE_PHOTO_CREDIT =
  "Landscape photographs: Bruno Rijsman (CC BY 2.0), Hladnikm (CC BY-SA 4.0), Etan J. Tal (CC BY 3.0), GjonBala (CC BY-SA 4.0), Planeti (CC BY-SA 4.0), Prasopestilence (CC BY-SA 3.0) — via Wikimedia Commons";

// Each house has its own line, published as the number to call and the number to
// message on WhatsApp. The resort's is the one the rest of the site carries; the
// hotel's is used wherever a guest is reading about that house.
export const PROPERTIES = [
  {
    id: "resort",
    value: "mountain_view_resort",
    number: "01",
    name: "Mountain View Resort",
    image: IMAGES.resort,
    mapQuery: MAP_QUERIES.resort,
    path: "/mountain-view-resort",
    phone: "+382 68 749 749",
    phoneHref: "tel:+38268749749",
    whatsapp: "https://wa.me/38268749749",
  },
  {
    id: "inn",
    value: "mountain_view_inn",
    number: "02",
    name: "Hotel Mountain View",
    image: IMAGES.inn,
    mapQuery: MAP_QUERIES.inn,
    path: "/hotel-mountain-view",
    phone: "+382 69 883 075",
    phoneHref: "tel:+38269883075",
    whatsapp: "https://wa.me/38269883075",
  },
];

export const EXPERIENCES = [
  { id: "prokletije", image: IMAGES.prokletije, mapQuery: MAP_QUERIES.grebaje },
  { id: "gusinje", image: IMAGES.gusinje, mapQuery: MAP_QUERIES.gusinje },
];

export const PROPERTY_OPTIONS = [
  ...PROPERTIES.map((property) => ({ value: property.value, label: property.name })),
  { value: "either", label: "Either property" },
];

export const PROPERTY_LABELS = PROPERTY_OPTIONS.reduce((labels, option) => {
  labels[option.value] = option.label;
  return labels;
}, {});

export const ENQUIRY_STATUSES = [
  { value: "new", label: "New" },
  { value: "offer_sent", label: "Offer sent" },
  { value: "confirmed", label: "Confirmed" },
  { value: "closed", label: "Closed" },
];