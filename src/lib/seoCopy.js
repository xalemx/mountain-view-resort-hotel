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
  restaurant: social("8bda5b916_mountain-view-resort-room.jpg"),
  hotel: social("4bbcd5227_Screenshot_25-10-2026_34857_wwwgooglecouk.jpeg"),
};

export const SEO_COPY = {
  en: {
    home: {
      title: "Mountain View Resort & Hotel · Vusanje & Gusinje, Montenegro",
      description:
        "Two places to stay in the Gusinje area of Montenegro: Mountain View Resort in Vusanje and Hotel Mountain View in the centre of town, at the foot of the Prokletije mountains.",
    },
    about: {
      title: "About Mountain View · Two houses in the Gusinje area",
      description:
        "A family resort of bungalows in Vusanje and a small hotel in Gusinje, Montenegro, between the Grebaje valley and the Prokletije peaks. Breakfast is not included in the accommodation price.",
    },
    guide: {
      title: "Local guide · Walks, lakes and viewpoints near Gusinje",
      description:
        "Our own guide to the Prokletije: easy walks, hiking, family days, lakes and viewpoints around Gusinje and Vusanje, with distance, driving time and the best season for each place.",
    },
    contact: {
      title: "Contact & booking enquiry · Mountain View, Gusinje",
      description:
        "Send us your dates and guests, ask a question, or message the host on WhatsApp. Breakfast is not included in the accommodation price, payment is on arrival, and we answer in the languages we speak.",
    },
    privacy: {
      title: "Privacy · Your enquiry and your details",
      description:
        "What we collect when you send an enquiry, who can read it, how long we keep it, and how to ask us to correct or delete it.",
    },
    terms: {
      title: "Booking terms · Mountain View Resort & Hotel",
      description:
        "A request is answered within 24 hours, a stay is confirmed by message, no booking fee, breakfast not included in the accommodation price, and payment on arrival at the property.",
    },
    resort: {
      title: "Mountain View Resort · Vusanje, Gusinje, Montenegro",
      description:
        "A resort of bungalows on the Vusanjska road in Vusanje, in the Gusinje area of Montenegro: free private parking, one restaurant serving breakfast, lunch and dinner, under the Prokletije peaks.",
    },
    restaurant: {
      title: "Restaurant menu · Mountain View Resort, Vusanje",
      description:
        "The restaurant at Mountain View Resort in Vusanje: traditional dishes, grilled specialities, pizzas, breakfasts and drinks, with a price for every dish. Breakfast is €5.00 per serving, charged separately from accommodation.",
    },
    hotel: {
      title: "Hotel Mountain View · Gusinje town centre",
      description:
        "A small hotel in the centre of Gusinje, with rooms priced per night for the stated number of guests, breakfast not included, and payment on arrival at the property.",
    },
  },

  me: {
    home: {
      title: "Mountain View Resort & Hotel · Vusanje i Gusinje, Crna Gora",
      description:
        "Dvije kuće za boravak u gusinjskom kraju: Mountain View Resort u Vusanju i Hotel Mountain View u centru, u podnožju Prokletija.",
    },
    about: {
      title: "O nama · Dvije kuće u gusinjskom kraju",
      description:
        "Porodični resort sa bungalovima u Vusanju i mali hotel u Gusinju, između doline Grebaje i vrhova Prokletija. Doručak nije uključen u cijenu smještaja.",
    },
    guide: {
      title: "Vodič kroz okolinu · Šetnje, jezera i vidikovci",
      description:
        "Naš vodič kroz Prokletije: lagane šetnje, planinarenje, dani za porodicu, jezera i vidikovci oko Gusinja i Vusanja, sa razdaljinom, vremenom vožnje i najboljim godišnjim dobom.",
    },
    contact: {
      title: "Kontakt i zahtjev za boravak · Mountain View",
      description:
        "Pošaljite datume i broj gostiju, postavite pitanje ili pišite domaćinu na WhatsApp. Doručak nije uključen u cijenu smještaja, plaćanje je po dolasku, a odgovaramo na jezicima koje govorimo.",
    },
    privacy: {
      title: "Privatnost · Vaš zahtjev i vaši podaci",
      description:
        "Šta prikupljamo kada pošaljete zahtjev, ko to može čitati, koliko dugo čuvamo i kako zatražiti ispravku ili brisanje.",
    },
    terms: {
      title: "Uslovi rezervacije · Mountain View Resort i hotel",
      description:
        "Zahtjev dobija odgovor u roku od 24 sata, boravak se potvrđuje porukom, bez naknade za rezervaciju, doručak nije uključen u cijenu smještaja i plaćanje po dolasku u objektu.",
    },
    resort: {
      title: "Mountain View Resort · Vusanje, Gusinje, Crna Gora",
      description:
        "Porodični resort sa bungalovima na Vusanjskom putu u Vusanju, u gusinjskom kraju: besplatan privatni parking, jedan restoran za doručak, ručak i večeru, u podnožju Prokletija.",
    },
    restaurant: {
      title: "Jelovnik restorana · Mountain View Resort, Vusanje",
      description:
        "Restoran u resortu Mountain View u Vusanju: tradicionalna jela, jela sa žara, pice, doručak i pića, sa cijenom za svako jelo. Doručak je €5.00 po porciji i plaća se odvojeno od smještaja.",
    },
    hotel: {
      title: "Hotel Mountain View · Centar Gusinja",
      description:
        "Mali hotel u centru Gusinja, sa cijenama po noći za navedeni broj gostiju, doručak nije uključen i plaćanje po dolasku u objektu.",
    },
  },

  ru: {
    home: {
      title: "Mountain View Resort & Hotel · Вусане и Гусине, Черногория",
      description:
        "Два дома для проживания в районе Гусине, Черногория: Mountain View Resort в Вусане и отель Mountain View в центре, у подножия Проклетие.",
    },
    about: {
      title: "О нас · Два дома в районе Гусине",
      description:
        "Семейный resort с бунгало в Вусане и небольшой отель в Гусине, между долиной Гребае и вершинами Проклетие. Завтрак не включён в стоимость проживания.",
    },
    guide: {
      title: "Гид по окрестностям · Прогулки, озёра и смотровые площадки",
      description:
        "Наш гид по Проклетие: лёгкие прогулки, походы, дни с детьми, озёра и смотровые площадки вокруг Гусине и Вусане, с расстоянием, временем в пути и лучшим сезоном для каждого места.",
    },
    contact: {
      title: "Контакты и запрос на проживание · Mountain View",
      description:
        "Напишите даты и число гостей, задайте вопрос или напишите хозяину в WhatsApp. Завтрак не включён в стоимость проживания, оплата по приезде, отвечаем на языках, на которых говорим.",
    },
    privacy: {
      title: "Приватность · Ваш запрос и ваши данные",
      description:
        "Что мы собираем, когда вы отправляете запрос, кто это может прочитать, сколько мы храним и как попросить исправить или удалить данные.",
    },
    terms: {
      title: "Условия бронирования · Mountain View Resort и отель",
      description:
        "На запрос отвечаем в течение 24 часов, проживание подтверждается сообщением, без сбора за бронирование, завтрак не включён в стоимость проживания, оплата по приезде на месте.",
    },
    resort: {
      title: "Mountain View Resort · Вусане, Гусине, Черногория",
      description:
        "Семейный resort с бунгало на Вусаньской дороге в Вусане, в районе Гусине: бесплатная частная парковка, один ресторан с завтраком, обедом и ужином, у подножия Проклетие.",
    },
    restaurant: {
      title: "Меню ресторана · Mountain View Resort, Вусане",
      description:
        "Ресторан курорта Mountain View в Вусане: традиционные блюда, блюда на гриле, пицца, завтраки и напитки, с ценой для каждого блюда. Завтрак — €5.00 за порцию, оплачивается отдельно от проживания.",
    },
    hotel: {
      title: "Отель Mountain View · Центр Гусине",
      description:
        "Небольшой отель в центре Гусине: цены за ночь для указанного числа гостей, завтрак не включён, оплата по приезде на месте.",
    },
  },

  sq: {
    home: {
      title: "Mountain View Resort & Hotel · Vusanje dhe Gusinje, Mali i Zi",
      description:
        "Dy shtëpi për qëndrim në zonën e Gusinjës, Mali i Zi: Mountain View Resort në Vusanje dhe Hotel Mountain View në qendër, në këmbët e Prokletijeve.",
    },
    about: {
      title: "Rreth nesh · Dy shtëpi në zonën e Gusinjës",
      description:
        "Një resort familjar me bungalove në Vusanje dhe një hotel i vogël në Gusinje, midis luginës së Grebajës dhe majave të Prokletijeve. Mëngjesi nuk përfshihet në çmimin e qëndrimit.",
    },
    guide: {
      title: "Udhërrëfyesi i zonës · Ecje, liqene dhe pamje",
      description:
        "Udhërrëfyesi ynë për Prokletijet: ecje të lehta, hiking, ditë me fëmijë, liqene dhe pamje rreth Gusinjes e Vusanjes, me distancën, kohën e udhëtimit dhe sezonin më të mirë për çdo vend.",
    },
    contact: {
      title: "Kontakt dhe kërkesë për qëndrim · Mountain View",
      description:
        "Dërgoni datat dhe numrin e mysafirëve, bëni një pyetje ose shkruajini pronarit në WhatsApp. Mëngjesi nuk përfshihet në çmimin e qëndrimit, pagesa bëhet në mbërritje dhe përgjigjemi në gjuhët që flasim.",
    },
    privacy: {
      title: "Privatësia · Kërkesa juaj dhe të dhënat tuaja",
      description:
        "Çfarë mbledhim kur dërgoni një kërkesë, kush mund t'i lexojë, sa kohë i ruajmë dhe si të kërkoni korrigjim ose fshirje.",
    },
    terms: {
      title: "Kushtet e rezervimit · Mountain View Resort dhe hoteli",
      description:
        "Kërkesa merr përgjigje brenda 24 orëve, qëndrimi konfirmohet me mesazh, pa tarifë rezervimi, mëngjesi nuk përfshihet në çmimin e qëndrimit dhe pagesa në mbërritje në objekt.",
    },
    resort: {
      title: "Mountain View Resort · Vusanje, Gusinje, Mali i Zi",
      description:
        "Një resort familjar me bungalove në rrugën e Vusanjes në Vusanje, në zonën e Gusinjës: parkim privat falas, një restorant për mëngjes, drekë dhe darkë, nën majat e Prokletijeve.",
    },
    restaurant: {
      title: "Menuja e restorantit · Mountain View Resort, Vusanje",
      description:
        "Restoranti i resortit Mountain View në Vusanje: pjata tradicionale, specialitete në zgarë, pica, mëngjese dhe pije, me çmim për çdo pjatë. Mëngjesi është €5.00 për porcion dhe paguhet veçmas nga qëndrimi.",
    },
    hotel: {
      title: "Hotel Mountain View · Qendra e Gusinjës",
      description:
        "Një hotel i vogël në qendër të Gusinjës: çmimet për natë për numrin e mysafirëve të shënuar, mëngjesi nuk përfshihet dhe pagesa në mbërritje në objekt.",
    },
  },
};