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

export const NAV_LINKS = [
  { label: "The stays", href: "#stays" },
  { label: "Discover", href: "#discover" },
  { label: "Plan", href: "#plan" },
];

export const PROPERTIES = [
  {
    id: "resort",
    number: "01",
    name: "Mountain View Resort",
    place: "Gusinje · Prokletije",
    image: IMAGES.resort,
    description:
      "Our larger property, set back from the road with a garden and an open terrace. Space for families and groups, long tables for shared dinners, and the Prokletije peaks in view from almost every window.",
    features: ["Garden & terrace", "Family rooms", "Free parking", "Breakfast included", "Groups welcome"],
    map: BRAND.mapsGusinje,
  },
  {
    id: "inn",
    number: "02",
    name: "Hotel Mountain View Inn",
    place: "Gusinje · town centre",
    image: IMAGES.inn,
    description:
      "A small, informal inn in the heart of Gusinje. Comfortable rooms, a shared kitchen you are welcome to use, and advice on the trails before you set off — the choice of hikers, cyclists and slow travellers.",
    features: ["Central location", "Shared kitchen", "Cycle storage", "Trail advice", "Breakfast included"],
    map: BRAND.mapsGusinje,
  },
];

export const PROPERTY_OPTIONS = [
  { value: "mountain_view_resort", label: "Mountain View Resort" },
  { value: "mountain_view_inn", label: "Hotel Mountain View Inn" },
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

export const EXPERIENCES = [
  {
    tag: "The mountains",
    title: "Prokletije",
    image: IMAGES.hero,
    text: "The Accursed Mountains rise straight out of the Grebaje valley: limestone walls of over 2,000 metres, glacial lakes, and paths that are waymarked but rarely crowded.",
    link: BRAND.mapsGrebaje,
  },
  {
    tag: "The town",
    title: "Gusinje",
    image: IMAGES.gusinje,
    text: "A small mountain town with a long memory — Ottoman-era mosques, plum orchards, a Saturday market, and long evenings by the water at the edge of the lake.",
    link: BRAND.mapsGusinje,
  },
];

export const ACTIVITIES = [
  {
    title: "Rivers & springs",
    text: "Cold, clear water runs through the valley and past the town. Short walks to the springs and the old stone bridges make an easy half-day, with swimming on a hot afternoon.",
  },
  {
    title: "The Grebaje valley",
    text: "The classic walk from Gusinje. An hour or two in for a picnic beneath the walls, or a full day up to one of the glacial lakes if your legs are willing.",
  },
  {
    title: "Slow days",
    text: "Some guests come only to read on the terrace, eat plum dumplings and drink coffee for two hours. That is a perfectly good plan too.",
  },
];

export const TRAIL_NOTE =
  "Trails are waymarked but quiet. Spring and early autumn are best underfoot; July and August are warm and busy in the valley. Bring sturdy shoes and some cash — Gusinje is small, and the nearest cash machine is in Plav.";

export const FAQS = [
  {
    question: "How do I get to Gusinje?",
    answer:
      "Most guests arrive by car: roughly two and a half hours from Podgorica, and about an hour from the Albanian border via Plav. There is a bus to Plav, and we can arrange a pick-up from Plav on request.",
  },
  {
    question: "When is the best time to visit?",
    answer:
      "May, June, September and early October are best for walking — cooler, greener and quiet. July and August are the warmest and the busiest months in the valley. Winter is peaceful, with snow on the high peaks.",
  },
  {
    question: "Do I need a car?",
    answer:
      "It helps, but it is not essential. Both properties are in or a short walk from the town centre, and the trailheads can be reached on foot or by taxi from Plav. Tell us what you are planning and we will help with the logistics.",
  },
];

export const STEPS = [
  "Send your request with your dates and group size",
  "We reply within 24 hours with availability and a price",
  "Confirm by message — payment on arrival, in cash or by card",
];