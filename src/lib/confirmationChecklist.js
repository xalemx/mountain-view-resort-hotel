// The final confirmation checklist the owner walks through before the site is
// treated as settled. Each area is one question, and it gathers the saved
// record's items that answer it, so nothing has to be decided twice.
// Matching is on the item's topic, in order: the first area that matches wins,
// and anything no area claims falls to the last one.

export const CHECKLIST_AREAS = [
  {
    id: "occupancy",
    title: "Maximum occupancy and bedroom layout, bungalow by bungalow",
    ask: "How many guests does each bungalow type take, and how is it laid out inside? The site publishes Bungalow (6 single beds), Family Bungalow (3 single beds and 1 double) and Standard Bungalow (2 single beds and 1 double), but no occupancy figure, so the assistants are told never to say how many a bungalow takes and never to describe how one is divided inside.",
    affects: "the room cards on the resort page, the ME, RU and SQ translations, and both assistants",
    matches: ["occupancy", "room types", "beds"],
  },
  {
    id: "location",
    title: "The exact location and the map pin",
    ask: "The resort pin is settled: 42.5458363, 19.8308614 falls on Vusanjska, the address you gave, and every map link on the site uses it. Still open: is the hotel pin, 42.5641954, 19.8325301, on the building?",
    affects: "every map link on the site, the map itself, and both assistants",
    matches: ["map pin", "where the resort is", "exact location", "location"],
  },
  {
    id: "breakfast",
    title: "Breakfast at the hotel, and what a serving costs there",
    ask: "Settled on 27 October 2026: breakfast is not included in the accommodation prices at either house, and every page, translation and structured-data entry now says so. The resort's restaurant serves breakfast at €5 a serving and charges it separately from the accommodation. Still open: does the hotel serve breakfast at all, and if it does, what does a serving cost and where is it served?",
    affects: "the dining section, the facilities list, the resort room copy, the prices section and the hotel's good-to-know card",
    matches: ["breakfast"],
  },
  {
    id: "payment",
    title: "The payment methods you accept",
    ask: "Which methods can a guest use: cash only, a card, or something else? The site says payment is on arrival and that the way to pay is confirmed with the offer. Nothing about cash or card is claimed anywhere.",
    affects: "the terms, the privacy page, the structured data and the concierge",
    matches: ["payment method", "way to pay"],
  },
  {
    id: "bookingTerms",
    title: "Deposit and cancellation, for a direct booking",
    ask: "For a booking made with you directly: is a deposit asked for, and what is the cancellation rule? Nothing is promised today beyond notice by phone or WhatsApp. The listing's prepayment and cancellation conditions belong to its own accommodation options.",
    affects: "the terms, the privacy page, the enquiry flow and the booking assistant",
    matches: ["deposit", "cancellation", "prepayment", "direct booking", "house rules", "promotional"],
  },
  {
    id: "accessibility",
    title: "Accessibility, bungalow by bungalow",
    ask: "Which bungalow types suit a wheelchair or a guest with limited mobility, and what should the site say about them? The listing's accessible facilities and wheelchair access are published, and no individual bungalow is described as fully accessible.",
    affects: "the facilities list, the room cards and the concierge",
    matches: ["accessib", "access details", "wheelchair", "mobility"],
  },
  {
    id: "transfers",
    title: "Transfers and activities: what is arranged, and what it costs",
    ask: "The airport shuttle and the other shuttle services run at an additional charge, and the paid activities are arranged on request, but no price is published anywhere. Tell us what should be quoted with the offer, and whether any charge is fixed.",
    affects: "the facilities list, the activities section, the enquiry wording and the concierge",
    matches: ["shuttle", "transfer", "activit", "charging"],
  },
  {
    id: "differences",
    title: "Anything else that differs from the saved listing today",
    ask: "Everything on the record the seven areas above do not cover: the restaurant, the parking and the outside facilities as the listing describes them against how the house is run today, the rating the listing shows, the distances we have not checked, and anything you have changed since the snapshot was taken.",
    affects: "the site copy, the local guide and both assistants, wherever each item lands",
    matches: [],
  },
];

const areaFor = (topic) => {
  const text = String(topic || "").toLowerCase();
  return (
    CHECKLIST_AREAS.find((area) => area.matches.some((match) => text.includes(match))) ||
    CHECKLIST_AREAS[CHECKLIST_AREAS.length - 1]
  );
};

// Groups the record's items under the checklist, keeping their order.
export const groupFactsByArea = (facts = []) =>
  CHECKLIST_AREAS.map((area) => ({
    area,
    items: facts
      .map((fact, index) => ({ fact, index }))
      .filter(({ fact }) => areaFor(fact.topic).id === area.id),
  }));

export const isOpen = (fact) => !fact.decision || fact.decision === "undecided";