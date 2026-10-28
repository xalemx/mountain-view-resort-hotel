// The guide's facts, in one place, in no language.
//
// Every number, route, charge and season on the guide comes from this file, so
// the four languages cannot drift apart: the words are translated, the facts are
// not. Each entry names the sources it was checked against and the day it was
// checked, and anything we have not confirmed is left empty rather than guessed.
// An empty value is shown to the visitor as "ask us", never as a number.
//
// A place is published only when its essential facts are settled. A draft is
// reachable at its address for review, carries no index directive, and is kept
// out of the sitemap and out of the guide's own list.

import { IMAGES, MAP_QUERIES } from "@/lib/siteContent";

// The day every entry below was last read against its sources.
export const FACTS_CHECKED_ON = "2026-10-28";

export const GUIDE_SOURCES = {
  npcg_park: {
    label: "National Parks of Montenegro — Prokletije",
    url: "https://nparkovi.me/edukativni-kutak/prokletije",
  },
  npcg_tickets: {
    label: "National Parks of Montenegro — tickets",
    url: "https://nparkovi.me/sections/1/online-ulaznice",
  },
  to_park: {
    label: "Gusinje Tourist Organisation — Prokletije National Park",
    url: "https://gusinje.travel/prokletije-national-park/",
  },
  to_nature: {
    label: "Gusinje Tourist Organisation — natural features",
    url: "https://gusinje.travel/natural-attractions/",
  },
  to_home: {
    label: "Gusinje Tourist Organisation",
    url: "https://gusinje.travel/",
  },
  nto_hrid: {
    label: "National Tourism Organisation of Montenegro — Hridsko Lake trail",
    url: "https://traveltomontenegro.com/en/trails/hridsko-lake",
  },
};

// The filters the guide is read with. `filters` on a place is a subset of these.
export const GUIDE_FILTERS = [
  "short_visits",
  "valley_walks",
  "mountain_hikes",
  "cycling",
  "food_town",
  "rainy_day",
];

export const GUIDE_DURATIONS = ["short", "half_day", "full_day"];
export const GUIDE_DIFFICULTIES = ["easy", "moderate", "demanding"];

// How a guest gets from each house to the start of the outing. The code is
// turned into a sentence in the visitor's language; the sentence never carries a
// number, because none of these roads has been measured for this site yet.
export const APPROACHES = {
  valley_road_vusanje: "valley_road_vusanje",
  plav_side_road: "plav_side_road",
  on_foot_in_town: "on_foot_in_town",
  town_edge: "town_edge",
  park_trailhead: "park_trailhead",
};

const noTravel = {
  parking: null,
  roadSurface: null,
  facilities: null,
  seasonalAccess: null,
  entryCharge: null,
  cashMachine: null,
};

export const GUIDE_PLACES = [
  {
    id: "grebaje-valley",
    status: "published",
    category: "valley",
    filters: ["valley_walks", "short_visits"],
    duration: "half_day",
    difficulty: "easy",
    difficultyBasis: "estimate",
    image: IMAGES.prokletije,
    mapQuery: MAP_QUERIES.grebaje,
    sources: ["to_park", "to_nature", "npcg_park"],
    approach: { resort: APPROACHES.valley_road_vusanje, inn: APPROACHES.valley_road_vusanje },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["ropojana-valley", "grlja-waterfall", "hrid-lake"],
  },
  {
    id: "ropojana-valley",
    status: "published",
    category: "valley",
    filters: ["valley_walks", "mountain_hikes"],
    duration: "half_day",
    difficulty: "moderate",
    difficultyBasis: "estimate",
    image: null,
    mapQuery: "Ropojana, Vusanje, Montenegro",
    sources: ["to_nature", "to_park"],
    approach: { resort: APPROACHES.valley_road_vusanje, inn: APPROACHES.valley_road_vusanje },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["grlja-waterfall", "oko-skakavice", "grebaje-valley"],
  },
  {
    id: "grlja-waterfall",
    status: "draft",
    category: "valley",
    filters: ["short_visits", "valley_walks"],
    duration: "short",
    difficulty: "easy",
    difficultyBasis: "estimate",
    image: null,
    mapQuery: "Vodopad Grlja, Vusanje, Montenegro",
    sources: ["to_nature"],
    approach: { resort: APPROACHES.valley_road_vusanje, inn: APPROACHES.valley_road_vusanje },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["ropojana-valley", "oko-skakavice"],
  },
  {
    id: "oko-skakavice",
    status: "draft",
    category: "activity",
    filters: ["short_visits"],
    duration: "short",
    difficulty: "easy",
    difficultyBasis: "estimate",
    image: null,
    mapQuery: "Oko Skakavice, Vusanje, Montenegro",
    sources: ["to_nature"],
    approach: { resort: APPROACHES.valley_road_vusanje, inn: APPROACHES.valley_road_vusanje },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["ropojana-valley", "grlja-waterfall"],
  },
  {
    id: "ali-pasha-springs",
    status: "published",
    category: "activity",
    filters: ["short_visits", "rainy_day"],
    duration: "short",
    difficulty: "easy",
    difficultyBasis: "estimate",
    image: null,
    mapQuery: "Ali Pasha Springs, Gusinje, Montenegro",
    sources: ["to_home"],
    approach: { resort: APPROACHES.town_edge, inn: APPROACHES.on_foot_in_town },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["gusinje-town", "plav-lake"],
  },
  {
    id: "hrid-lake",
    status: "published",
    category: "lake",
    filters: ["mountain_hikes"],
    duration: "half_day",
    // The only grade on this site taken from a published route description
    // rather than our own reading of the ground.
    difficulty: "easy",
    difficultyBasis: "sourced",
    image: null,
    mapQuery: "Hridsko jezero, Plav, Montenegro",
    sources: ["npcg_park", "to_park", "nto_hrid", "npcg_tickets"],
    approach: { resort: APPROACHES.plav_side_road, inn: APPROACHES.plav_side_road },
    drive: { resort: null, inn: null },
    // Walked in one direction: 3.7 km, 1 h 20 min, marked with red and white
    // waymarks. Numbers from the national tourism organisation's route
    // description, checked 28 October 2026.
    //
    // No altitudes and no ascent or descent are published: that page's elevation
    // figures contradict the altitude other guides give for the lake, so nothing
    // here repeats them until the park confirms them.
    walk: {
      km: 3.7,
      minutes: 80,
      marked: true,
      direction: "one_way",
      trailheadQuery: "Hridsko jezero parking, Plav, Montenegro",
      routeQuery: "Hridsko jezero trailhead, Plav, Montenegro",
      source: "nto_hrid",
    },
    total: { resort: null, inn: null },
    practical: {
      ...noTravel,
      facilities: ["drinking_water_at_trailhead", "shelter_at_trailhead", "spring_on_route"],
      seasonalAccess: "june_to_october",
      // A park ticket exists and is sold online; the amount is not published on
      // the pages we read, so no figure is shown.
      entryCharge: null,
    },
    related: ["plav-lake", "grebaje-valley"],
  },
  {
    id: "plav-lake",
    status: "published",
    category: "lake",
    filters: ["short_visits", "valley_walks"],
    duration: "short",
    difficulty: "easy",
    difficultyBasis: "estimate",
    image: null,
    mapQuery: "Plav Lake, Montenegro",
    sources: ["to_home"],
    approach: { resort: APPROACHES.park_trailhead, inn: APPROACHES.park_trailhead },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["hrid-lake", "gusinje-town"],
    hubOnly: true,
  },
  {
    id: "gusinje-town",
    status: "published",
    category: "town",
    filters: ["food_town", "rainy_day", "short_visits"],
    duration: "short",
    difficulty: "easy",
    difficultyBasis: "estimate",
    image: IMAGES.gusinje,
    mapQuery: MAP_QUERIES.gusinje,
    sources: ["to_home"],
    approach: { resort: APPROACHES.on_foot_in_town, inn: APPROACHES.on_foot_in_town },
    drive: { resort: null, inn: null },
    walk: null,
    total: { resort: null, inn: null },
    practical: { ...noTravel },
    related: ["ali-pasha-springs", "plav-lake"],
    hubOnly: true,
  },
];

// What the houses arrange, kept apart from the places a guest can simply visit.
// `operator` says who runs it: the property itself, or someone else we would put
// a guest in touch with. Nothing here is priced or scheduled, because neither has
// been confirmed.
export const GUIDE_SERVICES = [
  { id: "bicycle_hire", operator: "property" },
  { id: "bike_tours", operator: "property" },
  { id: "walking_tours", operator: "property" },
  { id: "hiking_activities", operator: "property" },
  { id: "horse_riding", operator: "third_party" },
  { id: "fishing", operator: "third_party" },
  { id: "transfers", operator: "property" },
];

// Facts the page should carry but which nobody has confirmed yet. Reported to the
// owner from the dashboard, never printed inside the guide.
export const FACTS_TO_CONFIRM = [
  "Hrid Lake: the walking distance and duration come from the national tourism organisation's route description; the park has not confirmed them, and the drive from either house to the trailhead has not been measured.",
  "Hrid Lake altitude: sources disagree (other guides give about 1,970 m, the route description's own numbers imply lower), so no altitude is published. Confirm the lake's height with the park before it is added.",
  "Park admission: a ticket for Prokletije is sold online, but the price is not published on the park's own pages. Confirm the current charge, and whether it applies at the Grebaje and Ropojana entrances.",
  "Driving distances and times: no road distance from either house has been measured for this site. Confirm them, or keep the pages without figures.",
  "Grlja waterfall and Oko Skakavice: the exact access point, whether a fee applies, and whether either is reachable without a guide are unconfirmed, so both pages stay drafts.",
  "Ropojana valley: how far the road is passable by car, and where a walk into the valley properly starts.",
  "Ali Pasha springs: whether the site is open at all times, and whether the springs and the seating are free to visit.",
  "Facilities, parking and road surface at every trailhead listed here.",
  "Whether cash machines in Gusinje accept foreign cards — the guide makes no claim either way.",
];

export function placeById(id) {
  return GUIDE_PLACES.find((place) => place.id === id) || null;
}

export function publishedPlaces() {
  return GUIDE_PLACES.filter((place) => place.status === "published");
}

// Places with a page of their own, in the order the guide lists them.
export function guidePages() {
  return GUIDE_PLACES.filter((place) => !place.hubOnly);
}

export function publishedGuidePages() {
  return guidePages().filter((place) => place.status === "published");
}

export function placesForFilter(filter) {
  if (!filter) return publishedPlaces();
  return publishedPlaces().filter((place) => place.filters.includes(filter));
}

export function relatedPlaces(place) {
  return (place.related || [])
    .map(placeById)
    .filter((entry) => entry && entry.status === "published" && !entry.hubOnly);
}

export const ITINERARY_ID = "three-days-in-gusinje";
export const ITINERARY_PATH = `/guide/${ITINERARY_ID}`;