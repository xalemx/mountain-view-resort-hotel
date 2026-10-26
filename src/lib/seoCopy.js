// The title and description of each public page, in each language, plus the
// photograph that represents the page when it is shared.
//
// Titles and descriptions are unique per page and written in the language of
// the URL they belong to, so /ru/guide introduces the Russian guide and
// /guide the English one. Only facts that src/lib/propertyFacts.js records as
// confirmed or externally sourced are used here.

const FILES = "https://media.base44.com/images/public/6add6db1a4366797590573f0/";

// The same crop the platform uses for shared images: 1200 by 630.
const social = (file) => `${FILES}${file}/v1/fill/w_1200,h_630/${file}`;

export const SEO_IMAGES = {
  home: social("bdc367c1b_mountain-view-valley.jpg"),
  about: social("87bdef98b_mountain-view-prokletije.jpg"),
  guide: social("5b6f78991_mountain-view-gusinje-town.jpg"),
  contact: social("bdc367c1b_mountain-view-valley.jpg"),
  privacy: social("5b6f78991_mountain-view-gusinje-town.jpg"),
  terms: social("bdc367c1b_mountain-view-valley.jpg"),
  resort: social("8bda5b916_mountain-view-resort-room.jpg"),
  hotel: social("4bbcd5227_Screenshot_25-10-2026_34857_wwwgooglecouk.jpeg"),
};

export const SEO_COPY = {
  en: {
    home: {
      title: "Mountain View Resort & Hotel · Gusinje, Montenegro",
      description:
        "Two places to stay in Gusinje, Montenegro: Mountain View Resort on the Vusanje road and Hotel Mountain View in the town centre, at the foot of the Prokletije mountains.",
    },
    about: {
      title: "About Mountain View · Two houses in Gusinje",
      description:
        "A family resort and a small hotel in Gusinje, Montenegro, between the Grebaje valley and the Vusanje road, under the peaks of the Prokletije. Breakfast is included at both.",
    },
    guide: {
      title: "Local guide · Walks, lakes and viewpoints near Gusinje",
      description:
        "Our own guide to the Prokletije: easy walks, hiking, family days, lakes and viewpoints around Gusinje and Vusanje, with distance, driving time and the best season for each place.",
    },
    contact: {
      title: "Contact & booking enquiry · Mountain View, Gusinje",
      description:
        "Send us your dates and guests, ask a question, or message the host on WhatsApp. Breakfast is included, payment is on arrival, and we answer in four languages.",
    },
    privacy: {
      title: "Privacy · Your enquiry and the automated assistant",
      description:
        "What we collect when you send an enquiry or write to the automated assistant, who can read it, how long we keep it, and how to ask us to correct or delete it.",
    },
    terms: {
      title: "Booking terms · Mountain View Resort & Hotel",
      description:
        "A request is answered within 24 hours, a stay is confirmed by message, no booking fee, breakfast included, and payment on arrival by cash or card.",
    },
    resort: {
      title: "Mountain View Resort · Gusinje, Montenegro",
      description:
        "A family resort on the Vusanje road, about 2 km south of Gusinje, with breakfast included and free private parking, at the foot of the Prokletije mountains.",
    },
    hotel: {
      title: "Hotel Mountain View · Gusinje town centre",
      description:
        "A small hotel in the centre of Gusinje, about 300 m from the town square and 2 km from the resort, with breakfast included and payment on arrival.",
    },
  },

  me: {
    home: {
      title: "Mountain View Resort & Hotel · Gusinje, Crna Gora",
      description:
        "Dvije kuće za boravak u Gusinju: Mountain View Resort na Vusanjskom putu i Hotel Mountain View u centru, u podnožju Prokletija.",
    },
    about: {
      title: "O nama · Dvije kuće u Gusinju",
      description:
        "Porodični resort i mali hotel u Gusinju, između doline Grebaje i Vusanjskog puta, pod vrhovima Prokletija. Doručak je uključen u obje kuće.",
    },
    guide: {
      title: "Vodič kroz okolinu · Šetnje, jezera i vidikovci",
      description:
        "Naš vodič kroz Prokletije: lagane šetnje, planinarenje, dani za porodicu, jezera i vidikovci oko Gusinja i Vusanja, sa razdaljinom, vremenom vožnje i najboljim godišnjim dobom.",
    },
    contact: {
      title: "Kontakt i zahtjev za boravak · Mountain View",
      description:
        "Pošaljite datume i broj gostiju, postavite pitanje ili pišite domaćinu na WhatsApp. Doručak je uključen, plaćanje je po dolasku, a odgovaramo na četiri jezika.",
    },
    privacy: {
      title: "Privatnost · Vaš zahtjev i automatski asistent",
      description:
        "Šta prikupljamo kada pošaljete zahtjev ili pišete automatskom asistentu, ko to može čitati, koliko dugo čuvamo i kako zatražiti ispravku ili brisanje.",
    },
    terms: {
      title: "Uslovi rezervacije · Mountain View Resort i hotel",
      description:
        "Zahtjev dobija odgovor u roku od 24 sata, boravak se potvrđuje porukom, bez naknade za rezervaciju, doručak uključen i plaćanje po dolasku u gotovini ili karticom.",
    },
    resort: {
      title: "Mountain View Resort · Gusinje, Crna Gora",
      description:
        "Porodični resort na Vusanjskom putu, oko 2 km južno od Gusinja, sa doručkom uključenim i besplatnim privatnim parkingom, u podnožju Prokletija.",
    },
    hotel: {
      title: "Hotel Mountain View · Centar Gusinja",
      description:
        "Mali hotel u centru Gusinja, oko 300 m od trga i 2 km od resorta, sa doručkom uključenim i plaćanjem po dolasku.",
    },
  },

  ru: {
    home: {
      title: "Mountain View Resort & Hotel · Гусине, Черногория",
      description:
        "Два дома для проживания в Гусине, Черногория: Mountain View Resort на Вусаньской дороге и отель Mountain View в центре, у подножия Проклетие.",
    },
    about: {
      title: "О нас · Два дома в Гусине",
      description:
        "Семейный resort и небольшой отель в Гусине, между долиной Гребае и Вусаньской дорогой, под вершинами Проклетие. Завтрак включён в обоих домах.",
    },
    guide: {
      title: "Гид по окрестностям · Прогулки, озёра и смотровые площадки",
      description:
        "Наш гид по Проклетие: лёгкие прогулки, походы, дни с детьми, озёра и смотровые площадки вокруг Гусине и Вусане, с расстоянием, временем в пути и лучшим сезоном для каждого места.",
    },
    contact: {
      title: "Контакты и запрос на проживание · Mountain View",
      description:
        "Напишите даты и число гостей, задайте вопрос или напишите хозяину в WhatsApp. Завтрак включён, оплата по приезде, отвечаем на четырёх языках.",
    },
    privacy: {
      title: "Приватность · Ваш запрос и автоматический помощник",
      description:
        "Что мы собираем, когда вы отправляете запрос или пишете автоматическому помощнику, кто это может прочитать, сколько мы храним и как попросить исправить или удалить данные.",
    },
    terms: {
      title: "Условия бронирования · Mountain View Resort и отель",
      description:
        "На запрос отвечаем в течение 24 часов, проживание подтверждается сообщением, без сбора за бронирование, завтрак включён, оплата по приезде наличными или картой.",
    },
    resort: {
      title: "Mountain View Resort · Гусине, Черногория",
      description:
        "Семейный resort на Вусаньской дороге, около 2 км южнее Гусине, с завтраком и бесплатной частной парковкой, у подножия Проклетие.",
    },
    hotel: {
      title: "Отель Mountain View · Центр Гусине",
      description:
        "Небольшой отель в центре Гусине, около 300 м от площади и 2 км от resort, с завтраком и оплатой по приезде.",
    },
  },

  sq: {
    home: {
      title: "Mountain View Resort & Hotel · Gusinje, Mali i Zi",
      description:
        "Dy shtëpi për qëndrim në Gusinje, Mali i Zi: Mountain View Resort në rrugën e Vusanjes dhe Hotel Mountain View në qendër, në këmbët e Prokletijeve.",
    },
    about: {
      title: "Rreth nesh · Dy shtëpi në Gusinje",
      description:
        "Një resort familjar dhe një hotel i vogël në Gusinje, midis luginës së Grebajës dhe rrugës së Vusanjes, nën majat e Prokletijeve. Mëngjesi përfshihet në të dyja shtëpitë.",
    },
    guide: {
      title: "Udhërrëfyesi i zonës · Ecje, liqene dhe pamje",
      description:
        "Udhërrëfyesi ynë për Prokletijet: ecje të lehta, hiking, ditë me fëmijë, liqene dhe pamje rreth Gusinjes e Vusanjes, me distancën, kohën e udhëtimit dhe sezonin më të mirë për çdo vend.",
    },
    contact: {
      title: "Kontakt dhe kërkesë për qëndrim · Mountain View",
      description:
        "Dërgoni datat dhe numrin e mysafirëve, bëni një pyetje ose shkruajini pronarit në WhatsApp. Mëngjesi përfshihet, pagesa bëhet në mbërritje dhe përgjigjemi në katër gjuhë.",
    },
    privacy: {
      title: "Privatësia · Kërkesa juaj dhe asistenti automatik",
      description:
        "Çfarë mbledhim kur dërgoni një kërkesë ose shkruani asistentit automatik, kush mund t'i lexojë, sa kohë i ruajmë dhe si të kërkoni korrigjim ose fshirje.",
    },
    terms: {
      title: "Kushtet e rezervimit · Mountain View Resort dhe hoteli",
      description:
        "Kërkesa merr përgjigje brenda 24 orëve, qëndrimi konfirmohet me mesazh, pa tarifë rezervimi, mëngjesi përfshihet dhe pagesa në mbërritje me para në dorë ose kartë.",
    },
    resort: {
      title: "Mountain View Resort · Gusinje, Mali i Zi",
      description:
        "Një resort familjar në rrugën e Vusanjes, rreth 2 km në jug të Gusinjes, me mëngjes të përfshirë dhe parkim privat falas, në këmbët e Prokletijeve.",
    },
    hotel: {
      title: "Hotel Mountain View · Qendra e Gusinjes",
      description:
        "Një hotel i vogël në qendër të Gusinjes, rreth 300 m nga sheshi dhe 2 km nga resorti, me mëngjes të përfshirë dhe pagesë në mbërritje.",
    },
  },
};