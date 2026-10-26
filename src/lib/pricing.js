import { formatEuro } from "@/lib/money";

// The accommodation prices the owner gave us on 26 October 2026, and the words
// that surround them. This is the only place the figures live: the Accommodation
// prices section on both house pages reads them from here.
//
// Every figure is the total per night for the whole room or bungalow, for the
// number of guests in its row — never per person. Breakfast is not included in
// any of them. The site never adds a stay up: it publishes the nightly table and
// the price for particular dates is confirmed with the offer.

export const SEASONS = ["winter", "summer"];

// The season boundaries have not been given to us yet, so these four fields are
// left empty on purpose. Fill in the dates — for example
// winter: { from: "2026-11-01", to: "2027-04-30" } — and the site can say which
// season a guest's dates fall in. Until they are filled in, nothing is worked
// out from them and no seasonal total is shown anywhere.
export const SEASON_DATES = {
  winter: { from: "", to: "" },
  summer: { from: "", to: "" },
};

export function seasonDatesConfigured() {
  return SEASONS.every((season) => Boolean(SEASON_DATES[season].from) && Boolean(SEASON_DATES[season].to));
}

// Guests are listed exactly as the owner listed them. The hotel's table carries
// no row for four: there is no room for four people there, no price is worked
// out for four, and a request for four is answered with a combination of rooms.
export const NIGHTLY_PRICES = {
  resort: [
    { guests: 1, winter: 40, summer: 50 },
    { guests: 2, winter: 40, summer: 50 },
    { guests: 3, winter: 52, summer: 65 },
    { guests: 4, winter: 64, summer: 80 },
    { guests: 5, winter: 76, summer: 95 },
    { guests: 6, winter: 88, summer: 110 },
  ],
  inn: [
    { guests: 1, winter: 30, summer: 40 },
    { guests: 2, winter: 40, summer: 50 },
    { guests: 3, winter: 50, summer: 60 },
    { guests: 5, winter: 60, summer: 70 },
  ],
};

// The one night count the hotel cannot take as a single room.
export const INN_FOUR_GUESTS = 4;

// The nightly rates are whole euros, so they are printed without cents.
export function formatNightly(amount) {
  return formatEuro(amount, 0);
}

// Every offer request leaves the site on WhatsApp, at the number the owner gave
// for both houses.
const OFFER_WHATSAPP = "https://wa.me/38268749749";

export function offerWhatsAppLink(message) {
  return `${OFFER_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// The request a guest sends us: the house, the dates, how many are coming, their
// name, and anything else they wanted to say. A line is only added when the
// guest wrote something, so no empty label ever reaches the host.
export function buildOfferMessage({ template, noteLine, values, note }) {
  const fill = (line, data) => line.replace(/\{(\w+)\}/g, (match, key) => (data[key] ?? ""));
  const lines = template.map((line) => fill(line, values));

  if (note && note.trim()) lines.push(fill(noteLine, { ...values, note: note.trim() }));

  return lines.join("\n");
}

export const PRICING_COPY = {
  en: {
    eyebrow: "Accommodation prices",
    resort: { title: "Bungalow prices", aside: "Bungalows at Mountain View Resort, in Vusanje." },
    inn: { title: "Room prices", aside: "Rooms at Hotel Mountain View, in the centre of Gusinje." },
    seasonLabel: "Season",
    season: { winter: "Winter", summer: "Summer" },
    table: {
      guests: "Guests",
      perNight: "per night",
      winter: "Winter, per night",
      summer: "Summer, per night",
      request: "Request an offer",
      caption: "Prices per night for {property}, winter and summer, by number of guests.",
    },
    guestsValue: "Guests: {n}",
    note: "Prices are per night for the stated number of guests. Breakfast is not included. Request an offer to confirm availability and the price for your dates.",
    seasonNote: "The season dates are not fixed yet, so tell us your dates and we will confirm which season applies.",
    fourGuests: {
      title: "Four guests",
      text: "There is no room for four people at the hotel. Ask us about a combination of rooms, subject to confirmation, and we will answer with what is possible.",
      cta: "Request an offer",
    },
    offer: {
      title: "Request an offer",
      intro: "Tell us your dates and how many of you are coming. We will open WhatsApp with the message ready for you to send.",
      guests: "Guests",
      submit: "Prepare the message",
      errorGuests: "Please tell us how many of you are coming.",
      sendTitle: "Send it on WhatsApp",
      sendText: "Open WhatsApp with the button below and press Send there, so your request reaches us.",
      sendLink: "Open WhatsApp",
      sendNote:
        "Nothing is sent until you press Send in WhatsApp. This is an enquiry, not a confirmed booking: we reply with availability and the price for your dates.",
      back: "Change the details",
      messageTemplate: [
        "Hello Mountain View, I would like to request an offer.",
        "Property: {property}",
        "Arrival: {arrival}",
        "Departure: {departure}",
        "Guests: {guests}",
        "Name: {name}",
      ],
      noteLine: "Message: {note}",
    },
  },

  me: {
    eyebrow: "Cijene smještaja",
    resort: { title: "Cijene bungalova", aside: "Bungalovi u resortu Mountain View, u Vusanju." },
    inn: { title: "Cijene soba", aside: "Sobe u hotelu Mountain View, u centru Gusinja." },
    seasonLabel: "Sezona",
    season: { winter: "Zima", summer: "Ljeto" },
    table: {
      guests: "Gosti",
      perNight: "po noći",
      winter: "Zima, po noći",
      summer: "Ljeto, po noći",
      request: "Zatražite ponudu",
      caption: "Cijene po noći za {property}, zima i ljeto, prema broju gostiju.",
    },
    guestsValue: "Gosti: {n}",
    note: "Cijene su po noći za navedeni broj gostiju. Doručak nije uključen. Zatražite ponudu da potvrdimo slobodne termine i cijenu za vaše datume.",
    seasonNote: "Datumi sezona još nisu utvrđeni, pa nam recite svoje datume i potvrdićemo koji sezon važi.",
    fourGuests: {
      title: "Četiri gosta",
      text: "U hotelu nemamo sobu za četiri osobe. Pitajte nas za kombinaciju soba, uz potvrdu, i odgovorićemo šta je moguće.",
      cta: "Zatražite ponudu",
    },
    offer: {
      title: "Zatražite ponudu",
      intro: "Recite nam datume i koliko vas dolazi. Otvorićemo WhatsApp sa porukom spremnom da je pošaljete.",
      guests: "Gosti",
      submit: "Pripremi poruku",
      errorGuests: "Recite nam koliko vas dolazi.",
      sendTitle: "Pošaljite na WhatsAppu",
      sendText: "Otvorite WhatsApp na dugme ispod i pritisnite Pošalji, da zahtjev stigne do nas.",
      sendLink: "Otvori WhatsApp",
      sendNote:
        "Ništa nije poslano dok ne pritisnete Pošalji u WhatsAppu. Ovo je zahtjev, a ne potvrđena rezervacija: odgovaramo sa slobodnim terminima i cijenom za vaše datume.",
      back: "Izmijenite podatke",
      messageTemplate: [
        "Dobar dan, želim da zatražim ponudu.",
        "Smještaj: {property}",
        "Dolazak: {arrival}",
        "Odlazak: {departure}",
        "Gosti: {guests}",
        "Ime: {name}",
      ],
      noteLine: "Poruka: {note}",
    },
  },

  ru: {
    eyebrow: "Цены на проживание",
    resort: { title: "Цены на бунгало", aside: "Бунгало курорта Mountain View в Вусане." },
    inn: { title: "Цены на номера", aside: "Номера гостиницы Mountain View в центре Гусине." },
    seasonLabel: "Сезон",
    season: { winter: "Зима", summer: "Лето" },
    table: {
      guests: "Гости",
      perNight: "за ночь",
      winter: "Зима, за ночь",
      summer: "Лето, за ночь",
      request: "Запросить предложение",
      caption: "Цены за ночь для {property}, зима и лето, по числу гостей.",
    },
    guestsValue: "Гости: {n}",
    note: "Цены указаны за ночь для указанного числа гостей. Завтрак не включён. Запросите предложение, чтобы мы подтвердили свободные даты и цену для ваших дат.",
    seasonNote: "Даты сезонов пока не определены: напишите свои даты, и мы подтвердим, какой сезон действует.",
    fourGuests: {
      title: "Четверо гостей",
      text: "В гостинице нет номера на четверых. Спросите нас о комбинации номеров — это подтверждается отдельно, и мы ответим, что возможно.",
      cta: "Запросить предложение",
    },
    offer: {
      title: "Запросить предложение",
      intro: "Напишите даты и сколько вас приезжает. Мы откроем WhatsApp с готовым сообщением, которое вы отправите.",
      guests: "Гости",
      submit: "Подготовить сообщение",
      errorGuests: "Напишите, сколько вас приезжает.",
      sendTitle: "Отправьте в WhatsApp",
      sendText: "Откройте WhatsApp кнопкой ниже и нажмите «Отправить», чтобы запрос дошёл до нас.",
      sendLink: "Открыть WhatsApp",
      sendNote:
        "Ничего не отправляется, пока вы не нажмёте «Отправить» в WhatsApp. Это запрос, а не подтверждённое бронирование: мы ответим со свободными датами и ценой для ваших дат.",
      back: "Изменить данные",
      messageTemplate: [
        "Здравствуйте, хочу запросить предложение.",
        "Жильё: {property}",
        "Заезд: {arrival}",
        "Выезд: {departure}",
        "Гости: {guests}",
        "Имя: {name}",
      ],
      noteLine: "Сообщение: {note}",
    },
  },

  sq: {
    eyebrow: "Çmimet e qëndrimit",
    resort: { title: "Çmimet e bungalove", aside: "Bungalot e resortit Mountain View, në Vusanje." },
    inn: { title: "Çmimet e dhomave", aside: "Dhomat e hotelit Mountain View, në qendër të Gusinjës." },
    seasonLabel: "Stina",
    season: { winter: "Dimër", summer: "Verë" },
    table: {
      guests: "Mysafirë",
      perNight: "për natë",
      winter: "Dimër, për natë",
      summer: "Verë, për natë",
      request: "Kërkoni një ofertë",
      caption: "Çmimet për natë për {property}, dimër dhe verë, sipas numrit të mysafirëve.",
    },
    guestsValue: "Mysafirë: {n}",
    note: "Çmimet janë për natë për numrin e mysafirëve të shënuar. Mëngjesi nuk përfshihet. Kërkoni një ofertë për të konfirmuar disponueshmërinë dhe çmimin për datat tuaja.",
    seasonNote: "Datat e stinëve nuk janë caktuar ende, prandaj na thoni datat tuaja dhe do t'ju konfirmojmë cila stinë vlen.",
    fourGuests: {
      title: "Katër mysafirë",
      text: "Hoteli nuk ka dhomë për katër persona. Pyetni për një kombinim dhomash, e cila konfirmohet veçmas, dhe do t'ju përgjigjemi çfarë është e mundur.",
      cta: "Kërkoni një ofertë",
    },
    offer: {
      title: "Kërkoni një ofertë",
      intro: "Na thoni datat dhe sa persona vini. Do të hapim WhatsApp me mesazhin gati për ta dërguar.",
      guests: "Mysafirë",
      submit: "Përgatit mesazhin",
      errorGuests: "Na thoni sa persona vini.",
      sendTitle: "Dërgojeni në WhatsApp",
      sendText: "Hapni WhatsApp me butonin më poshtë dhe shtypni Dërgo, që kërkesa të arrijë te ne.",
      sendLink: "Hap WhatsApp",
      sendNote:
        "Asgjë nuk dërgohet derisa të shtypni Dërgo në WhatsApp. Kjo është një kërkesë, jo një rezervim i konfirmuar: përgjigjemi me disponueshmërinë dhe çmimin për datat tuaja.",
      back: "Ndrysho të dhënat",
      messageTemplate: [
        "Përshëndetje, dua të kërkoj një ofertë.",
        "Qëndrimi: {property}",
        "Mbërritja: {arrival}",
        "Nisja: {departure}",
        "Mysafirë: {guests}",
        "Emri: {name}",
      ],
      noteLine: "Mesazhi: {note}",
    },
  },
};