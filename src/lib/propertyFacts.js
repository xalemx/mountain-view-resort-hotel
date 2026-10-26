// The single source of truth for what this site publishes about the two houses.
//
// Nothing about the properties, the distance between them or the practical
// travel advice should be written from memory. Every claim is recorded here
// with the state of its verification and with the places that repeat it, so
// the pages, the four translations and the AI assistants can always be brought
// back to the same words.
//
//   FACT_STATUS.OWNER        the owner confirmed it — safe to publish as it stands
//   FACT_STATUS.EXTERNAL     checked against public sources, named in `source`
//   FACT_STATUS.UNCONFIRMED  published from an earlier draft, still to be confirmed
//
// The two pins below feed MAP_QUERIES in src/lib/siteContent.js, so every map
// link on the site opens the same coordinates the copy describes.

export const FACT_STATUS = {
  OWNER: "owner",
  EXTERNAL: "external",
  UNCONFIRMED: "unconfirmed",
};

// Straight-line distance between two pins, in kilometres.
export function distanceKm(a, b) {
  const earthRadiusKm = 6371;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const deltaLat = toRadians(b.lat - a.lat);
  const deltaLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(deltaLng / 2) ** 2;

  return Math.round(2 * earthRadiusKm * Math.asin(Math.sqrt(h)) * 10) / 10;
}

const RESORT_PIN = { lat: 42.5458363, lng: 19.8308614 };
const INN_PIN = { lat: 42.5641954, lng: 19.8325301 };

// Approximate reference point for the middle of Gusinje. The walking and driving
// distances quoted in the copy are measured from here.
const TOWN_CENTRE_PIN = { lat: 42.5619, lng: 19.8334 };

// How far each house is from the town centre, and from the other.
export const TOWN_CENTRE_KM = {
  resort: distanceKm(TOWN_CENTRE_PIN, RESORT_PIN),
  inn: distanceKm(TOWN_CENTRE_PIN, INN_PIN),
};

export const HOUSES_APART_KM = distanceKm(RESORT_PIN, INN_PIN);

export const PROPERTY_FACTS = {
  resort: {
    id: "resort",
    value: "mountain_view_resort",
    name: "Mountain View Resort",
    path: "/mountain-view-resort",

    pin: {
      lat: RESORT_PIN.lat,
      lng: RESORT_PIN.lng,
      query: `${RESORT_PIN.lat},${RESORT_PIN.lng}`,
      status: FACT_STATUS.OWNER,
      note: "Checked against the listed address on 26 October 2026: 42.5458363, 19.8308614 falls on Vusanjska (Ćosovići) at postcode 84326, the address the owner gave, and OpenStreetMap also maps Mountain View Resort about 60 m away, so the pin is kept as it stands.",
    },

    position: {
      status: FACT_STATUS.OWNER,
      text: "In Vusanje, in the Gusinje area, on the Vusanjska road — Vusanjska, 84326 Vusanje, Montenegro — about 2 km from the centre of Gusinje.",
      source: "Owner, 26 October 2026: the resort is in Vusanje, in the Gusinje area, and is not in the town centre. The distance is measured between the stored pin and the town-centre reference.",
      shownIn: [
        "translations: property.resort.location (en, me, ru, sq)",
        "base44/agents/concierge.jsonc — the two houses",
      ],
    },

    facilities: [
      {
        key: "restaurant",
        label: "Restaurant & bar",
        status: FACT_STATUS.OWNER,
        detail:
          "One restaurant, open for breakfast, lunch and dinner, plus a bar and a coffee shop (owner, 26 October 2026). Listed cuisines: Italian, Mediterranean, pizza, seafood, international, European, Croatian, and grill and barbecue, with halal, vegetarian and vegan options and special diet menus on request. The menu itself and every price are not published.",
        shownIn: [
          "translations: stays.resort.features[0], stays.resort.description (en, me, ru, sq)",
          "src/lib/dining.js",
          "src/lib/facilities.js — the resort's facilities list",
        ],
      },
      {
        key: "breakfast",
        label: "Breakfast available",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: breakfast is available, not included; whether it is included depends on the offer. Listed options: continental, Full English/Irish, vegetarian, halal and breakfast to go. No price is published: the paid-breakfast rates shown on booking sites are theirs, in their own converted currency.",
        shownIn: [
          "translations: stays.resort.features[1]",
          "src/lib/dining.js",
          "PropertyGoodToKnow",
          "base44/agents/concierge.jsonc",
        ],
      },
      {
        key: "bungalows",
        label: "Family bungalows",
        status: FACT_STATUS.OWNER,
        source: "Owner, 26 October 2026: a resort of bungalows in three types.",
        shownIn: [
          "translations: stays.resort.features[2], stays.resort.description (en, me, ru, sq)",
          "src/lib/roomTypes.js",
        ],
      },
      {
        key: "parking",
        label: "Free parking",
        status: FACT_STATUS.OWNER,
        source: "Owner, 26 October 2026: free private parking on site, no reservation needed.",
        shownIn: [
          "translations: stays.resort.features[3]",
          "src/lib/facilities.js",
          "base44/agents/concierge.jsonc",
        ],
      },
      {
        key: "shuttle",
        label: "Airport shuttle (extra charge)",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: an airport shuttle and other shuttle services are available at an additional charge, and no price is published. The chip and the facilities list both say the charge applies.",
        shownIn: [
          "translations: stays.resort.features[4]",
          "src/lib/facilities.js",
          "base44/agents/concierge.jsonc",
        ],
      },
      {
        key: "terrace",
        label: "Terrace & fireplace",
        status: FACT_STATUS.OWNER,
        source:
          "Owner, 26 October 2026: a garden, terrace, sun terrace and outdoor furniture; a picnic area, barbecue facilities and an outdoor fireplace; a children's playground and outdoor play equipment.",
        shownIn: [
          "translations: stays.resort.features[5], stays.resort.description (en, me, ru, sq)",
          "src/lib/facilities.js",
        ],
      },
      {
        key: "rooms",
        label: "Bungalow types",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: Bungalow (6 single beds, about 35 m²), Family Bungalow (3 single beds and 1 double bed, about 35 m²) and Standard Bungalow (2 single beds and 1 double bed, about 25 m²), each an entire bungalow with a balcony, a terrace, mountain views, air conditioning, a private bathroom and free Wi-Fi. Maximum occupancy is not confirmed, and neither the number of bedrooms nor how many bungalows there are is published.",
        shownIn: ["src/lib/roomTypes.js", "translations: property.roomsNote, property.resort.rooms"],
      },
    ],

    activities: [
      {
        key: "activitiesIncluded",
        label: "Cycling and children's playground",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: come with the stay, no extra charge.",
        shownIn: ["src/lib/activities.js", "src/components/site/PropertyActivities.jsx"],
      },
      {
        key: "activitiesArranged",
        label: "Bicycle rental, bike tours, walking tours, hiking activities and evening entertainment",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: on site, at an additional charge, available to enquire about and subject to arrangements. No price is published.",
        shownIn: ["src/lib/activities.js", "base44/agents/concierge.jsonc", "base44/agents/local_guide.jsonc"],
      },
      {
        key: "activitiesOffSite",
        label: "Horse riding and fishing",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: off-site activities at an additional charge, arranged on request.",
        shownIn: ["src/lib/activities.js", "base44/agents/concierge.jsonc"],
      },
      {
        key: "walkingFree",
        label: "Walking in the area on your own",
        status: FACT_STATUS.OWNER,
        note: "Owner, 26 October 2026: no property charge. The waymarked trails are free to walk, and only guided walks and the arranged activities carry one.",
        shownIn: ["src/lib/activities.js", "base44/agents/local_guide.jsonc"],
      },
    ],

    policies: {
      breakfast: {
        status: FACT_STATUS.OWNER,
        text: "Breakfast is available; whether it is included depends on your offer. No price is published.",
      },
      payment: { status: FACT_STATUS.OWNER, text: "Payment for your stay is on arrival, in cash or by card." },
      arrivalTimes: {
        status: FACT_STATUS.OWNER,
        text: "Check-in 12:00–22:00 and check-out 08:00–11:00, as the house is listed. The site still says the times for a stay are confirmed with the offer.",
      },
      houseRules: {
        status: FACT_STATUS.OWNER,
        source: "Owner, 26 October 2026, from the house rules the property is listed with.",
        text: "Children of all ages are welcome; cots and extra beds are not available; pets are not allowed; parties and events are not allowed, including hen, stag and similar parties; no minimum check-in age is listed; non-smoking accommodation with a designated smoking area.",
        shownIn: [
          "src/lib/houseRules.js",
          "src/components/site/PropertyRules.jsx",
          "translations: property.rulesTitle (en, me, ru, sq)",
          "base44/agents/concierge.jsonc",
        ],
      },
    },
  },

  inn: {
    id: "inn",
    value: "mountain_view_inn",
    name: "Hotel Mountain View",
    path: "/hotel-mountain-view",

    pin: {
      lat: INN_PIN.lat,
      lng: INN_PIN.lng,
      query: `${INN_PIN.lat},${INN_PIN.lng}`,
      status: FACT_STATUS.UNCONFIRMED,
      note: "In the middle of Gusinje, 2 km north of the resort pin. The owner has to confirm the building.",
    },

    position: {
      status: FACT_STATUS.EXTERNAL,
      text: "In the centre of Gusinje, about 300 m from the town centre reference point and 2 km from the resort.",
      source: "Measured between the stored pins and the town centre; Tripadvisor lists a Hotel Mountain View Inn in Gusinje.",
      shownIn: [
        "translations: property.inn.location, stays.inn.place (en, me, ru, sq)",
        "base44/agents/booking_assistant.jsonc — property list",
        "base44/agents/concierge.jsonc — the two houses",
      ],
    },

    facilities: [
      {
        key: "kitchen",
        label: "Shared kitchen",
        status: FACT_STATUS.UNCONFIRMED,
        shownIn: ["translations: stays.inn.features[1], stays.inn.description", "base44/agents/concierge.jsonc"],
      },
      {
        key: "bikes",
        label: "Cycle storage",
        status: FACT_STATUS.UNCONFIRMED,
        shownIn: ["translations: stays.inn.features[2]", "base44/agents/concierge.jsonc"],
      },
      {
        key: "advice",
        label: "Trail advice",
        status: FACT_STATUS.UNCONFIRMED,
        shownIn: ["translations: stays.inn.features[3]"],
      },
      {
        key: "breakfast",
        label: "Breakfast included",
        status: FACT_STATUS.OWNER,
        shownIn: ["translations: stays.inn.features[4]", "PropertyGoodToKnow", "base44/agents/concierge.jsonc"],
      },
      {
        key: "parking",
        label: "Parking",
        status: FACT_STATUS.UNCONFIRMED,
        note: "Not claimed for the hotel anywhere on the site. Guests will ask, so the answer should be recorded here.",
        shownIn: ["not yet published"],
      },
      {
        key: "rooms",
        label: "Comfortable rooms",
        status: FACT_STATUS.UNCONFIRMED,
        note: "Room types, bed arrangements and how many each room takes are still unpublished.",
        shownIn: ["translations: property.roomsNote, property.inn.rooms"],
      },
    ],

    policies: {
      breakfast: { status: FACT_STATUS.OWNER, text: "Breakfast is included in your stay." },
      payment: { status: FACT_STATUS.OWNER, text: "Payment for your stay is on arrival, in cash or by card." },
      arrivalTimes: {
        status: FACT_STATUS.UNCONFIRMED,
        text: "Not published: the site says arrival and departure times are confirmed with the offer.",
      },
    },
  },
};

// Everything the site and the assistants say about reaching Gusinje.
export const TRAVEL_FACTS = {
  airport: {
    status: FACT_STATUS.EXTERNAL,
    text: "The nearest international airport is Podgorica, about three hours by car (roughly 150 km) on the road through Plav. Tivat and Dubrovnik are longer, scenic drives.",
    source:
      "Driving tables give Podgorica to Plav as 134 km in about 2 h 35 (2 h 45 in season), then another 15 minutes to Gusinje; a distance calculator gives about 2 h 30 for the whole run. The earlier wording said two and a half hours, which understates it.",
    shownIn: [
      "translations: plan.faqs[0].answer, guide.practical[0].text (en, me, ru, sq)",
      "base44/agents/concierge.jsonc — getting here",
    ],
  },
  border: {
    status: FACT_STATUS.EXTERNAL,
    text: "The Albanian border crossing at Vermosh is about 10 km from Gusinje, roughly a 20-minute drive.",
    source:
      "The crossing sits between Vusanje and Vermosh; travel accounts put Vermosh 7 km from Gusinje. The earlier wording said about an hour from the border via Plav, which is both too long and the wrong road: the crossing is reached south through Vusanje, not through Plav.",
    shownIn: [
      "translations: plan.faqs[0].answer (en, me, ru, sq)",
      "base44/agents/concierge.jsonc — getting here",
    ],
  },
  bus: {
    status: FACT_STATUS.EXTERNAL,
    text: "There is a bus between Plav and Gusinje, a few times a day and about 15 to 30 minutes.",
    source: "Published timetables list several daily departures each way on the Plav–Gusinje road.",
    shownIn: ["translations: plan.faqs[0].answer (en, me, ru, sq)"],
  },
  car: {
    status: FACT_STATUS.EXTERNAL,
    text: "A car helps but is not essential; both houses are in or a short drive from the town centre, and the trailheads can be reached on foot or by taxi from Plav.",
    source: "Consistent with the two pins and the bus service.",
    shownIn: ["translations: plan.faqs[2].answer (en, me, ru, sq)"],
  },
  cash: {
    status: FACT_STATUS.UNCONFIRMED,
    text: "The nearest cash machine is in Plav; guests should bring some cash.",
    note: "Plav is confirmed to have ATMs. Whether Gusinje now has one is not something the site can establish from outside, and it is the kind of detail a guest acts on.",
    shownIn: [
      "translations: discover.trailNote (en, me, ru, sq)",
      "base44/agents/concierge.jsonc — practical notes",
    ],
  },
  seasons: {
    status: FACT_STATUS.UNCONFIRMED,
    text: "May, June, September and early October are best for walking; July and August are the warmest and busiest; winter is quiet with snow on the high peaks.",
    note: "Advice, not a hard fact, and it is repeated in five places. Worth the owner's blessing once.",
    shownIn: [
      "translations: plan.faqs[1].answer, guide.practical[1].text, discover.trailNote",
      "base44/agents/concierge.jsonc — when to come",
    ],
  },
  lake: {
    status: FACT_STATUS.UNCONFIRMED,
    text: "The guide describes Gusinje with one lake below the town, and the resort as lying between the Grebaje valley and the lake.",
    note: "The lake in the copy is Plav Lake, which lies at 906 m, lower than Gusinje, about 10 km down the valley. The wording is defensible but the owner should confirm how they want it said, since guests read it as a lake at the door.",
    shownIn: ["translations: guide.intro[0], property.resort.location"],
  },
};

// The claims only the owner can settle. Each one names where it is published,
// so answering here and editing this file keeps the site, the translations and
// the assistants in step.
export const FACTS_TO_CONFIRM = [
  {
    id: "pins",
    question:
      "The resort pin is settled: 42.5458363, 19.8308614 falls on Vusanjska (Ćosovići) at postcode 84326, the address the owner gave, and OpenStreetMap also maps Mountain View Resort about 60 m away. Still open: is the hotel pin, 42.5641954, 19.8325301, on the building? The two are 2 km apart.",
    affects: ["siteContent MAP_QUERIES", "every map link on the site", "both assistant instructions"],
  },
  {
    id: "shuttle",
    question:
      "Answered on 26 October 2026: an airport shuttle and other shuttle services run at an additional charge, and the feature chip now says so. Still open: should a price be published, or is it always quoted with the offer?",
    affects: ["translations: stays.resort.features[4]", "src/lib/facilities.js", "base44/agents/concierge.jsonc"],
  },
  {
    id: "restaurant",
    question:
      "Answered on 26 October 2026: one restaurant serving breakfast, lunch and dinner, with the cuisines, the halal, vegetarian and vegan options, the special diet menus on request and the breakfast options all published.",
    affects: [
      "translations: stays.resort.description, stays.resort.features[0]",
      "src/lib/dining.js",
      "src/lib/facilities.js",
    ],
  },
  {
    id: "kitchen",
    question: "Does the hotel have a shared kitchen guests may use, and cycle storage?",
    affects: ["translations: stays.inn.description, stays.inn.features", "base44/agents/concierge.jsonc"],
  },
  {
    id: "parking",
    question:
      "Answered for the resort on 26 October 2026: free private parking on site, no reservation needed. Still open: nothing is claimed for the hotel.",
    affects: ["translations: stays.resort.features[3]", "src/lib/facilities.js", "base44/agents/concierge.jsonc"],
  },
  {
    id: "cash",
    question: "Is the nearest cash machine still in Plav, or does Gusinje have one now?",
    affects: ["translations: discover.trailNote", "base44/agents/concierge.jsonc"],
  },
  {
    id: "bakery",
    question:
      "Answered for the resort on 26 October 2026: the copy describes the resort as being in Vusanje, in the Gusinje area, and no longer places it a few minutes from the bakery. The hotel in the centre keeps the bakery line.",
    affects: ["translations: intro.text, plan.faqs[2].answer (en, me, ru, sq)"],
  },
  {
    id: "rooms",
    question:
      "Room types, beds and sizes are published, and the arrival and departure times are published with the house rules (owner, 26 October 2026). Still open: how many guests each bungalow type takes.",
    affects: ["translations: property.roomsNote, property.times", "src/lib/roomTypes.js", "base44/agents/concierge.jsonc"],
  },
  {
    id: "roomsClaim",
    question: '"Peaks in view from almost every window" is published for the resort: keep it or soften it?',
    affects: ["translations: stays.resort.description (en, me, ru, sq)"],
  },
  {
    id: "charging",
    question:
      "What does charging an electric vehicle cost? The facilities list says the price is confirmed with the offer, and no price is published.",
    affects: ["src/lib/facilities.js", "base44/agents/concierge.jsonc"],
  },
  {
    id: "access",
    question:
      "The property is listed with accessible facilities and wheelchair access. Which bungalow types suit a wheelchair or a guest with limited mobility, and what should the site say about them?",
    affects: ["src/lib/facilities.js", "base44/agents/concierge.jsonc"],
  },
  {
    id: "breakfastPrice",
    question:
      "Settled on 26 October 2026: no breakfast price is published. The rates that showed optional paid breakfast are Booking's, in its own converted currency, and are not our direct-booking price.",
    affects: ["src/lib/dining.js", "base44/agents/concierge.jsonc"],
  },
  {
    id: "activities",
    question:
      "Answered on 26 October 2026: cycling and the children's playground come with the stay; bicycle rental, bike tours, walking tours, hiking activities and evening entertainment are on site at an additional charge and arranged on request; horse riding and fishing are off site at an additional charge. Walking the trails on your own carries no property charge. Still open: is any of it priced, or is every paid activity quoted with the offer?",
    affects: [
      "src/lib/activities.js",
      "src/components/site/PropertyActivities.jsx",
      "base44/agents/concierge.jsonc",
      "base44/agents/local_guide.jsonc",
    ],
  },
  {
    id: "directBookingRules",
    question:
      "The listed house rules are published (check-in 12:00–22:00, check-out 08:00–11:00, children of all ages welcome, no cots or extra beds, no pets, no parties or events including hen and stag parties, no minimum check-in age listed, non-smoking with a designated smoking area). Asked on 26 October 2026: do these rules also apply to direct bookings, or are they the listing's conditions only? Until the owner says, the site keeps them as the rules the house is listed with and confirms the times and the conditions for a stay with the offer.",
    affects: [
      "src/lib/houseRules.js",
      "src/components/site/PropertyRules.jsx",
      "translations: property.times (en, me, ru, sq)",
      "base44/agents/concierge.jsonc",
    ],
  },
];