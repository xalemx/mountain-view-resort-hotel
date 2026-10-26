import { INN_PHOTO_CREDIT, OWN_PHOTO_CREDIT } from "@/lib/siteContent";

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

// The hotel: our own photographs of the house, the reception and the rooms, in
// the order they are worth looking at. Captions live in the translations, keyed
// by the photo key.
const INN_PHOTOS = [
  { key: "front", src: `${FILES}ebed257b5_WhatsAppImage2026-10-26at114817.jpeg` },
  { key: "reception", src: `${FILES}cc8efc1a1_WhatsAppImage2026-10-26at1148101166.jpeg` },
  { key: "stair", src: `${FILES}15273ac44_WhatsAppImage2026-10-26at11481055.jpeg` },
  { key: "lounge", src: `${FILES}aa71a6694_WhatsAppImage2026-10-26at114810.jpeg` },
  { key: "hall", src: `${FILES}69c4b23c8_WhatsAppImage2026-10-26at11481077.jpeg` },
  { key: "room_twin", src: `${FILES}beac00c4c_WhatsAppImage2026-10-26at1148061.jpeg` },
  { key: "room_family", src: `${FILES}40cc6831e_WhatsAppImage2026-10-26at114807.jpeg` },
  { key: "room_wide", src: `${FILES}3cc45208c_WhatsAppImage2026-10-26at1148098.jpeg` },
  { key: "room_tv", src: `${FILES}603f68198_WhatsAppImage2026-10-26at114808.jpeg` },
  { key: "room_fridge", src: `${FILES}f0eb7faa6_WhatsAppImage2026-10-26at114809.jpeg` },
];

export const GALLERIES = {
  resort: { photos: RESORT_PHOTOS, credit: OWN_PHOTO_CREDIT },
  inn: { photos: INN_PHOTOS, credit: INN_PHOTO_CREDIT },
};

export function galleryFor(propertyId) {
  return GALLERIES[propertyId] || { photos: [], credit: null };
}