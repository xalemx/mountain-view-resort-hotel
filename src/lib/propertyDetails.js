import { IMAGES, PROPERTIES } from "@/lib/siteContent";
import { RESORT_PHOTOS } from "@/lib/galleryPhotos";

// The photographs we actually hold for each house. The hotel gallery is one
// picture because that is all we have of it so far.
const PROPERTY_PHOTOS = {
  resort: RESORT_PHOTOS,
  inn: [{ key: "front", src: IMAGES.inn }],
};

export function propertyById(id) {
  return PROPERTIES.find((property) => property.id === id) || PROPERTIES[0];
}

export function propertyPhotos(id) {
  return PROPERTY_PHOTOS[id] || [];
}