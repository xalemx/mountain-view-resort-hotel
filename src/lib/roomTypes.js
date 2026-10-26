// The accommodation types at Mountain View Resort, exactly as the owner listed
// them: the beds and the approximate size of each type, and the facilities every
// one of them has.
//
// Maximum occupancy is deliberately absent. The "Sleeps: 2 adults" a saved
// search showed describes that search, not a bungalow, and the owner has not
// confirmed how many guests each type takes.
//
// Nothing here says how many bungalows the resort has, or how they are divided
// inside: neither bed counts nor booking quantities establish that.

export const ROOM_FEATURES_LABEL = {
  en: "In every bungalow",
  me: "U svakom bungalovu",
  ru: "В каждом бунгало",
  sq: "Në çdo bungalow",
};

export const ROOM_FEATURES = {
  en: ["Entire bungalow", "Balcony", "Terrace", "Mountain view", "Air conditioning", "Private bathroom", "Free Wi-Fi"],
  me: ["Cijeli bungalov", "Balkon", "Terasa", "Pogled na planine", "Klima uređaj", "Privatno kupatilo", "Besplatan Wi-Fi"],
  ru: ["Отдельное бунгало", "Балкон", "Терраса", "Вид на горы", "Кондиционер", "Собственная ванная", "Бесплатный Wi-Fi"],
  sq: ["Bungalow i plotë", "Ballkon", "Tarracë", "Pamje nga malet", "Kondicioner", "Banjë private", "Wi-Fi falas"],
};

export const ROOM_TYPES = {
  en: [
    { id: "bungalow", name: "Bungalow", beds: "6 single beds", size: "Approx. 35 m²" },
    { id: "family", name: "Family Bungalow", beds: "3 single beds and 1 double bed", size: "Approx. 35 m²" },
    { id: "standard", name: "Standard Bungalow", beds: "2 single beds and 1 double bed", size: "Approx. 25 m²" },
  ],
  me: [
    { id: "bungalow", name: "Bungalov", beds: "6 jednokrevetnih kreveta", size: "Oko 35 m²" },
    { id: "family", name: "Porodični bungalov", beds: "3 jednokrevetna kreveta i 1 bračni krevet", size: "Oko 35 m²" },
    { id: "standard", name: "Standardni bungalov", beds: "2 jednokrevetna kreveta i 1 bračni krevet", size: "Oko 25 m²" },
  ],
  ru: [
    { id: "bungalow", name: "Бунгало", beds: "6 односпальных кроватей", size: "Около 35 м²" },
    { id: "family", name: "Семейное бунгало", beds: "3 односпальные кровати и 1 двуспальная", size: "Около 35 м²" },
    { id: "standard", name: "Стандартное бунгало", beds: "2 односпальные кровати и 1 двуспальная", size: "Около 25 м²" },
  ],
  sq: [
    { id: "bungalow", name: "Bungalow", beds: "6 shtretër njëshe", size: "Rreth 35 m²" },
    { id: "family", name: "Bungalow familjar", beds: "3 shtretër njëshe dhe 1 shtrat dopio", size: "Rreth 35 m²" },
    { id: "standard", name: "Bungalow standard", beds: "2 shtretër njëshe dhe 1 shtrat dopio", size: "Rreth 25 m²" },
  ],
};