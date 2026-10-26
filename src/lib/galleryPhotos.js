import { IMAGES, OWN_PHOTO_CREDIT } from "@/lib/siteContent";

const FILES = "https://media.base44.com/images/public/6add6db1a4366797590573f0/";

// The resort: our own photographs of the grounds, the bungalows and the water,
// in the order they are worth looking at. Captions live in the translations,
// keyed by the photo key.
const RESORT_PHOTOS = [
  { key: "aerial", src: `${FILES}888e943c4_WhatsAppImage2026-10-25at112856.jpeg` },
  { key: "grounds", src: `${FILES}b7dfe0f4f_WhatsAppImage2026-10-25at112841.jpeg` },
  { key: "river", src: `${FILES}c620d8519_WhatsAppImage2026-10-25at112906.jpeg` },
  { key: "walkway", src: `${FILES}7d9740d7c_WhatsAppImage2026-10-25at112855.jpeg` },
  { key: "main", src: `${FILES}d4ae74815_WhatsAppImage2026-10-25at112909.jpeg` },
  { key: "lawns", src: `${FILES}1facf4da0_WhatsAppImage2026-10-25at112905.jpeg` },
  { key: "fence", src: `${FILES}91fd3937d_WhatsAppImage2026-10-25at112913.jpeg` },
  { key: "entrance", src: `${FILES}5a9154655_WhatsAppImage2026-10-25at112842.jpeg` },
  { key: "valley", src: `${FILES}21d162bcc_WhatsAppImage2026-10-25at1128561.jpeg` },
  { key: "animals", src: `${FILES}7d8e0a66f_WhatsAppImage2026-10-25at112930.jpeg` },
];

// The one photograph of Hotel Mountain View we hold: the house from the road at
// night. A daytime original takes its place as soon as the owner sends one, and
// the rooms and shared spaces join this list the same way.
const INN_PHOTOS = [{ key: "front", src: IMAGES.inn }];

export const GALLERIES = {
  resort: { photos: RESORT_PHOTOS, credit: OWN_PHOTO_CREDIT },
  inn: { photos: INN_PHOTOS, credit: null },
};

export function galleryFor(propertyId) {
  return GALLERIES[propertyId] || { photos: [], credit: null };
}