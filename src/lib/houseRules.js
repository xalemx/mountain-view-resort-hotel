// The house rules Mountain View Resort is listed with, in the owner's list.
//
// These are published as the rules the house is listed with, not as
// direct-booking conditions: the owner has asked to confirm first whether they
// apply to bookings made with us directly. Until then the site says the times
// and the conditions for a stay are confirmed with the offer. That question is
// open in src/lib/propertyFacts.js under "directBookingRules".

export const RESORT_HOUSE_RULES = {
  en: {
    checkIn: "Check-in 12:00–22:00",
    checkOut: "Check-out 08:00–11:00",
    times: "Check-in 12:00–22:00, check-out 08:00–11:00.",
    items: [
      "Children of all ages are welcome",
      "Cots and extra beds are not available",
      "Pets are not allowed",
      "Parties and events are not allowed, including hen, stag and similar parties",
      "No minimum check-in age is listed",
      "Non-smoking accommodation, with a designated smoking area",
    ],
    note: "These are the rules the house is listed with. We confirm the times and the conditions for your stay with your offer.",
  },
  me: {
    checkIn: "Prijava 12:00–22:00",
    checkOut: "Odjava 08:00–11:00",
    times: "Prijava 12:00–22:00, odjava 08:00–11:00.",
    items: [
      "Djeca svih uzrasta su dobrodošla",
      "Krevetići i dodatni ležajevi nisu dostupni",
      "Kućni ljubimci nisu dozvoljeni",
      "Zabave i događaji nisu dozvoljeni, uključujući momačke i djevojačke zabave",
      "Minimalna starost za prijavu nije navedena",
      "Smještaj u kojem se ne puši, sa određenim prostorom za pušenje",
    ],
    note: "Ovo je kućni red pod kojim je objekt naveden. Vrijeme i uslove vašeg boravka potvrđujemo uz ponudu.",
  },
  ru: {
    checkIn: "Заезд 12:00–22:00",
    checkOut: "Выезд 08:00–11:00",
    times: "Заезд 12:00–22:00, выезд 08:00–11:00.",
    items: [
      "Принимаются дети любого возраста",
      "Детские кроватки и дополнительные кровати не предоставляются",
      "Проживание с животными не допускается",
      "Вечеринки и мероприятия не допускаются, включая мальчишники и девичники",
      "Минимальный возраст для заезда не указан",
      "Проживание без курения, с отведённым местом для курения",
    ],
    note: "Это правила, под которыми указан дом. Время и условия вашего проживания мы подтверждаем в предложении.",
  },
  sq: {
    checkIn: "Regjistrimi 12:00–22:00",
    checkOut: "Çregjistrimi 08:00–11:00",
    times: "Regjistrimi 12:00–22:00, çregjistrimi 08:00–11:00.",
    items: [
      "Pranohen fëmijë të çdo moshe",
      "Krevat fëmijësh dhe shtretër shtesë nuk ofrohen",
      "Kafshët nuk lejohen",
      "Nuk lejohen festa dhe evente, përfshirë festat e beqarëve",
      "Nuk është përcaktuar mosha minimale për regjistrim",
      "Objekt pa duhan, me një vend të caktuar për duhanpirje",
    ],
    note: "Këto janë rregullat me të cilat është listuar shtëpia. Orarin dhe kushtet e qëndrimit tuaj i konfirmojmë me ofertën.",
  },
};