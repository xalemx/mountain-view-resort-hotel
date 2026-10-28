import { base44 } from "@/api/base44Client";

// Web measurement for the guide, with a fixed vocabulary.
//
// Only the event names below are sent, and only with the fixed properties the
// helper takes: a page id, a language code, a property code and a small count.
// Names, addresses, phone numbers, notes and anything a visitor typed are never
// passed in, because nothing here accepts free text. Opening WhatsApp is not an
// enquiry and is not counted as one: `enquiry_sent` fires only when the website
// itself has accepted a request.
const EVENTS = {
  guide_view: { page: "string", language: "string" },
  guide_filter_used: { filter: "string" },
  guide_property_selected: { property: "string", page: "string" },
  guide_directions_click: { page: "string", target: "string" },
  guide_activity_enquiry_start: { page: "string", activity: "string" },
  property_card_click: { property: "string" },
  enquiry_sent: { property: "string", language: "string" },
};

function clean(name, properties) {
  const allowed = EVENTS[name];
  if (!allowed) return null;

  const safe = {};
  Object.keys(allowed).forEach((key) => {
    const value = properties[key];
    if (typeof value === "number" && Number.isFinite(value)) safe[key] = value;
    if (typeof value === "string" && value.length && value.length <= 64) safe[key] = value;
  });
  return safe;
}

export function trackEvent(name, properties = {}) {
  const safe = clean(name, properties);
  if (!safe) return;
  try {
    base44.analytics?.track({ eventName: name, properties: safe });
  } catch (error) {
    // Measurement never interrupts a visitor.
  }
}