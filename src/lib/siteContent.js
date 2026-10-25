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
  mapsGusinje: "https://www.google.com/maps/search/?api=1&query=Gusinje+Montenegro",
  mapsGrebaje: "https://www.google.com/maps/search/?api=1&query=Grebaje+Valley+Montenegro",
};

export const IMAGES = {
  hero: "https://media.base44.com/images/public/6add6db1a4366797590573f0/6e4da1233_generated_image.png",
  gusinje: "https://media.base44.com/images/public/6add6db1a4366797590573f0/0c96f8eac_generated_image.png",
  resort: "https://media.base44.com/images/public/6add6db1a4366797590573f0/1bf06e1ae_generated_image.png",
  inn: "https://media.base44.com/images/public/6add6db1a4366797590573f0/7b725a420_generated_image.png",
};

export const PROPERTIES = [
  { id: "resort", number: "01", name: "Mountain View Resort", image: IMAGES.resort, map: BRAND.mapsGusinje },
  { id: "inn", number: "02", name: "Hotel Mountain View Inn", image: IMAGES.inn, map: BRAND.mapsGusinje },
];

export const EXPERIENCES = [
  { id: "prokletije", image: IMAGES.hero, link: BRAND.mapsGrebaje },
  { id: "gusinje", image: IMAGES.gusinje, link: BRAND.mapsGusinje },
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