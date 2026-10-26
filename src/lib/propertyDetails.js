import { PROPERTIES } from "@/lib/siteContent";

export function propertyById(id) {
  return PROPERTIES.find((property) => property.id === id) || PROPERTIES[0];
}