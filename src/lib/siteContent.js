export const BRAND = {
  name: "Mountain View",
  subtitle: "Resort & Inn",
  place: "Gusinje · Montenegro",
  phone: "+382 68 749 749",
  phoneHref: "tel:+38268749749",
  whatsapp: "https://wa.me/38268749749",
  instagram: "https://www.instagram.com/mountain_view_resortt/",
  instagramHandle: "@mountain_view_resortt",
  threads: "https://www.threads.com/@mountain_view_resortt",
  tourism: "https://gusinje.travel/post_type_offer/pjesacenje/",
};

export const MAP_QUERIES = {
  resort: "42.5458363,19.8308614",
  inn: "42.5641954,19.8325301",
  gusinje: "Gusinje, Montenegro",
  grebaje: "Grebaje Valley, Montenegro",
};

const FILES = "https://media.base44.com/images/public/6add6db1a4366797590573f0/";

export const IMAGES = {
  hero: `${FILES}bdc367c1b_mountain-view-valley.jpg`,
  prokletije: `${FILES}87bdef98b_mountain-view-prokletije.jpg`,
  gusinje: `${FILES}5b6f78991_mountain-view-gusinje-town.jpg`,
  resort: `${FILES}f8ca46b4b_mountain-view-cabin.jpg`,
  inn: `${FILES}0e20eaa80_mountain-view-gusinje.jpg`,
};

export const PHOTO_CREDITS =
  "Photographs of Mountain View Resort are our own. Landscape photographs: Bruno Rijsman (CC BY 2.0), Hladnikm (CC BY-SA 4.0), Etan J. Tal (CC BY 3.0), GjonBala (CC BY-SA 4.0), Planeti (CC BY-SA 4.0), Prasopestilence (CC BY-SA 3.0) — via Wikimedia Commons";

export const PROPERTIES = [
  { id: "resort", number: "01", name: "Mountain View Resort", image: IMAGES.resort, mapQuery: MAP_QUERIES.resort },
  { id: "inn", number: "02", name: "Hotel Mountain View Inn", image: IMAGES.inn, mapQuery: MAP_QUERIES.inn },
];

export const EXPERIENCES = [
  { id: "prokletije", image: IMAGES.prokletije, mapQuery: MAP_QUERIES.grebaje },
  { id: "gusinje", image: IMAGES.gusinje, mapQuery: MAP_QUERIES.gusinje },
];

export const PROPERTY_OPTIONS = [
  { value: "mountain_view_resort", label: PROPERTIES[0].name },
  { value: "mountain_view_inn", label: PROPERTIES[1].name },
  { value: "either", label: "Either — you decide" },
];

export const PROPERTY_LABELS = PROPERTY_OPTIONS.reduce((labels, option) => {
  labels[option.value] = option.label;
  return labels;
}, {});

export const ENQUIRY_STATUSES = [
  { value: "new", label: "New" },
  { value: "replied", label: "Replied" },
  { value: "confirmed", label: "Confirmed" },
  { value: "closed", label: "Closed" },
];