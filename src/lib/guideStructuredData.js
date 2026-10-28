import { SITE_URL } from "@/lib/seo";
import { localePath } from "@/lib/localePaths";

// Structured data for the guide, written from the same words the page shows.
// Nothing is claimed that a visitor cannot read on the page: no ratings, no
// reviews, no opening hours and no prices, because none of them are confirmed.

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// A place a guest can visit on their own. The address is the municipality the
// sources place it in; the coordinates are deliberately absent until the pins are
// confirmed.
export function placeSchema({ name, description, image, language, path }) {
  return {
    "@type": "TouristAttraction",
    name,
    description,
    url: `${SITE_URL}${localePath(path, language)}`,
    ...(image ? { image } : {}),
    containedInPlace: {
      "@type": "TouristDestination",
      name: "Gusinje, Montenegro",
      address: { "@type": "PostalAddress", addressLocality: "Gusinje", addressCountry: "ME" },
    },
  };
}

// The three-day plan, as the list of places it actually uses.
export function itinerarySchema({ name, description, days, language, path }) {
  return {
    "@type": "TouristTrip",
    name,
    description,
    url: `${SITE_URL}${localePath(path, language)}`,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: days.length,
      itemListElement: days.map((day, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "TouristAttraction", name: day.title },
      })),
    },
  };
}

export function withGraph(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}