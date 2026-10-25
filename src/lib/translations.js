export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES = [
  { code: "me", short: "CG", html: "cnr", greeting: "Dobro došli", label: "Crnogorski" },
  { code: "ru", short: "RU", html: "ru", greeting: "Добро пожаловать", label: "Русский" },
  { code: "sq", short: "SQ", html: "sq", greeting: "Mirë se vini", label: "Shqip" },
  { code: "en", short: "EN", html: "en", greeting: "Welcome", label: "English" },
];

export const TRANSLATIONS = {
  en: {
    place: "Gusinje · Montenegro",
    brandSubtitle: "Resort & Hotel",
    nav: [
      { label: "The stays", href: "#stays" },
      { label: "Discover", href: "#discover" },
      { label: "Plan", href: "#plan" },
      { label: "Request an offer", href: "#offer" },
    ],
    hero: {
      eyebrow: "Gusinje · Montenegro",
      intro:
        "Two places to stay, one extraordinary corner of Montenegro. A resort and a hotel at the foot of the Prokletije mountains, between the Grebaje valley and the small town of Gusinje.",
      cta: "Find your stay",
      ctaSecondary: "Request an offer",
      footLeft: "Two places to stay · A world to discover",
      footRight: "01 / Prokletije",
    },
    intro: {
      eyebrow: "Welcome",
      title: "A quiet base at the foot of the Accursed Mountains",
      text: "Mountain View is family-run, in a small town on the edge of Prokletije National Park. One property is a resort with a garden and room for everyone; the other a hotel in the town centre for people travelling light. Both are a few minutes from the bakery, ten minutes from the trailheads, and a world away from the crowds on the coast.",
    },
    stays: {
      eyebrow: "Two ways to stay",
      title: "Choose your Mountain View",
      aside: "Same valley, same welcome — two different rhythms to your days.",
      cta: "Request an offer",
      map: "See it on the map",
      resort: {
        place: "Gusinje · Prokletije",
        description:
          "Our larger property, with bungalows and rooms built for families and groups. A restaurant and bar serve local, Italian and Mediterranean dishes, with vegetarian, vegan and halal options; outside there is a garden, an open terrace and a fireplace, and peaks in view from almost every window.",
        features: ["Restaurant & bar", "Breakfast included", "Family bungalows", "Free parking", "Airport shuttle", "Terrace & fireplace"],
      },
      inn: {
        place: "Gusinje · town centre",
        description:
          "A small, informal hotel in the heart of Gusinje. Comfortable rooms, a shared kitchen you are welcome to use, and advice on the trails before you set off — the choice of hikers, cyclists and slow travellers.",
        features: ["Central location", "Shared kitchen", "Cycle storage", "Trail advice", "Breakfast included"],
      },
    },
    discover: {
      eyebrow: "Beyond the door",
      title: "Gusinje & Prokletije",
      aside: "The valley is the reason most of our guests come back.",
      map: "Open in Maps",
      prokletije: {
        tag: "The mountains",
        name: "Prokletije",
        text: "The Accursed Mountains rise straight out of the Grebaje valley: limestone walls of over 2,000 metres, glacial lakes, and paths that are waymarked but rarely crowded.",
      },
      gusinje: {
        tag: "The town",
        name: "Gusinje",
        text: "A small mountain town with a long memory — Ottoman-era mosques, plum orchards, a Saturday market, and long evenings by the water at the edge of the lake.",
      },
      activities: [
        {
          title: "Rivers & springs",
          text: "Cold, clear water runs through the valley and past the town. Short walks to the springs and the old stone bridges make an easy half-day, with swimming on a hot afternoon.",
        },
        {
          title: "The Grebaje valley",
          text: "The classic walk from Gusinje. An hour or two in for a picnic beneath the walls, or a full day up to one of the glacial lakes if your legs are willing.",
        },
        {
          title: "Slow days",
          text: "Some guests come only to read on the terrace, eat plum dumplings and drink coffee for two hours. That is a perfectly good plan too.",
        },
      ],
      trailNote:
        "Trails are waymarked but quiet. Spring and early autumn are best underfoot; July and August are warm and busy in the valley. Bring sturdy shoes and some cash — Gusinje is small, and the nearest cash machine is in Plav.",
    },
    plan: {
      eyebrow: "Plan your visit",
      title: "Getting here & when to come",
      text: "We are happy to help with the details before you book — transfers, luggage, a table for dinner, or the right trail for the time you have.",
      link: "More on Gusinje tourism",
      faqs: [
        {
          question: "How do I get to Gusinje?",
          answer:
            "Most guests arrive by car: roughly two and a half hours from Podgorica, and about an hour from the Albanian border via Plav. There is a bus to Plav, and we can arrange a pick-up from Plav on request.",
        },
        {
          question: "When is the best time to visit?",
          answer:
            "May, June, September and early October are best for walking — cooler, greener and quiet. July and August are the warmest and the busiest months in the valley. Winter is peaceful, with snow on the high peaks.",
        },
        {
          question: "Do I need a car?",
          answer:
            "It helps, but it is not essential. Both properties are in or a short walk from the town centre, and the trailheads can be reached on foot or by taxi from Plav. Tell us what you are planning and we will help with the logistics.",
        },
      ],
    },
    offer: {
      eyebrow: "Direct with us",
      title: "Request a personalised offer",
      text: "Tell us your dates and how many of you are coming. We will reply with availability and a price for the property that suits you best — no booking fees, no middleman.",
      whatsapp: "WhatsApp",
      steps: [
        "Send your request with your dates and group size",
        "We reply within 24 hours with availability and a price",
        "Confirm by message — payment on arrival, in cash or by card",
      ],
    },
    form: {
      property: "Property",
      arrival: "Arrival",
      departure: "Departure",
      adults: "Adults",
      children: "Children",
      name: "Your name",
      email: "Email",
      phone: "Phone (optional)",
      notes: "Anything we should know?",
      submit: "Send request",
      sending: "Sending…",
      privacy: "We use your details only to answer this request.",
      success: "Thank you — your request is with us. We will reply within 24 hours.",
      errorDates: "Your departure date needs to be after your arrival date.",
      error: "We could not send that. Please try again, or message us on WhatsApp.",
      optionEither: "Either — you decide",
    },
    social: {
      eyebrow: "Between stays",
      title: "Follow the seasons",
      text: "Snow on the peaks in March, wildflowers in May, the first plums in August. We post what the valley is doing — and what is free at short notice.",
    },
    footer: {
      rights: "© 2026 Mountain View · Resort & Hotel",
      owner: "Owner login",
      chooseLanguage: "Choose language",
      imagery: "Photographs of Mountain View Resort are our own. The other images show the landscape around Gusinje.",
    },
  },

  me: {
    place: "Gusinje · Crna Gora",
    brandSubtitle: "Resort i hotel",
    nav: [
      { label: "Smještaj", href: "#stays" },
      { label: "Otkrijte", href: "#discover" },
      { label: "Plan", href: "#plan" },
      { label: "Zatražite ponudu", href: "#offer" },
    ],
    hero: {
      eyebrow: "Gusinje · Crna Gora",
      intro:
        "Dva mjesta za boravak, jedan izuzetan kutak Crne Gore. Resort i hotel u podnožju Prokletija, između doline Grebaje i malog grada Gusinja.",
      cta: "Nađite svoj smještaj",
      ctaSecondary: "Zatražite ponudu",
      footLeft: "Dva mjesta za boravak · Svijet da otkrijete",
      footRight: "01 / Prokletije",
    },
    intro: {
      eyebrow: "Dobro došli",
      title: "Miran kutak u podnožju Prokletija",
      text: "Mountain View je porodični posao u malom gradu na rubu Nacionalnog parka Prokletije. Jedno zdanje je resort sa baštom i mjestom za svakoga, a drugi hotel u centru grada za one koji putuju s malo prtljaga. Oba su nekoliko minuta od pekare, deset minuta od staza i daleko od gužve na primorju.",
    },
    stays: {
      eyebrow: "Dva načina da odsjednete",
      title: "Izaberite svoj Mountain View",
      aside: "Ista dolina, ista dobrodošlica — dva različita ritma dana.",
      cta: "Zatražite ponudu",
      map: "Pogledajte na mapi",
      resort: {
        place: "Gusinje · Prokletije",
        description:
          "Naša veća kuća, sa bungalovima i sobama za porodice i grupe. Restoran i bar služe domaća, italijanska i mediteranska jela, uz vegetarijanske, veganske i halal opcije; napolju su bašta, otvorena terasa i ognjište, a vrhovi se vide iz gotovo svakog prozora.",
        features: ["Restoran i bar", "Doručak uključen", "Porodični bungalovi", "Besplatan parking", "Transfer sa aerodroma", "Terasa i ognjište"],
      },
      inn: {
        place: "Gusinje · centar",
        description:
          "Mali, opušten hotel u srcu Gusinja. Udobne sobe, zajednička kuhinja na korišćenje i savjet o stazama prije polaska — izbor planinara, biciklista i onih koji putuju polako.",
        features: ["Centar grada", "Zajednička kuhinja", "Ostava za bicikle", "Savjeti o stazama", "Doručak uključen"],
      },
    },
    discover: {
      eyebrow: "Iza vrata",
      title: "Gusinje i Prokletije",
      aside: "Dolina je razlog zbog kojeg se većina naših gostiju vraća.",
      map: "Otvori u Mapama",
      prokletije: {
        tag: "Planine",
        name: "Prokletije",
        text: "Prokletije se dižu pravo iz doline Grebaje: krečnjački zidovi viši od 2.000 metara, ledenička jezera i staze koje su obilježene, ali rijetko pune.",
      },
      gusinje: {
        tag: "Grad",
        name: "Gusinje",
        text: "Mali planinski grad sa dugom uspomenom — džamije iz osmanskog doba, šljivici, subotnja pijaca i duge večeri kraj vode na obali jezera.",
      },
      activities: [
        {
          title: "Rijeke i izvori",
          text: "Hladna, bistra voda teče dolinom i pored grada. Kratke šetnje do izvora i starih kamenih mostova čine lako poludnevno izletište, uz kupanje u vruće popodne.",
        },
        {
          title: "Dolina Grebaje",
          text: "Klasična šetnja iz Gusinja. Sat-dva do mjesta za piknik pod zidovima ili cijeli dan do jednog od ledeničkih jezera, ako noge dozvole.",
        },
        {
          title: "Polaki dani",
          text: "Neki gosti dolaze samo da čitaju na terasi, jedu knedle od šljiva i piju kafu dva sata. I to je sasvim dobar plan.",
        },
      ],
      trailNote:
        "Staze su obilježene, ali mirne. Proljeće i rana jesen su najbolji za hodanje; jul i avgust su topli i puni gostiju u dolini. Ponesite solidnu obuću i malo gotovine — Gusinje je malo, a najbliži bankomat je u Plavu.",
    },
    plan: {
      eyebrow: "Isplanirajte posjetu",
      title: "Kako doći i kada doći",
      text: "Rado ćemo pomoći oko detalja prije rezervacije — transfera, prtljaga, stola za večeru ili prave staze za vrijeme koje imate.",
      link: "Više o turizmu u Gusinju",
      faqs: [
        {
          question: "Kako da stignem u Gusinje?",
          answer:
            "Većina gostiju dolazi autom: oko dva i po sata iz Podgorice i oko sat vremena od granice sa Albanijom preko Plava. Postoji autobus do Plava, a na zahtjev možemo organizovati i prevoz iz Plava.",
        },
        {
          question: "Kada je najbolje doći?",
          answer:
            "Maj, jun, septembar i rana jesen su najbolji za pješačenje — hladniji, zeleniji i mirni. Jul i avgust su najtopliji i najposećeniji mjeseci u dolini. Zima je mirna, sa snijegom na visokim vrhovima.",
        },
        {
          question: "Da li mi treba auto?",
          answer:
            "Pomaže, ali nije neophodan. Oba objekta su u centru ili na kratkoj šetnji od njega, a do početka staza možete pješke ili taksijem iz Plava. Recite nam šta planirate i pomoći ćemo vam oko logistike.",
        },
      ],
    },
    offer: {
      eyebrow: "Direktno s nama",
      title: "Zatražite ponudu po mjeri",
      text: "Recite nam datume i koliko vas dolazi. Odgovorićemo sa slobodnim terminima i cijenom za smještaj koji vam najbolje odgovara — bez naknada za rezervaciju i bez posrednika.",
      whatsapp: "WhatsApp",
      steps: [
        "Pošaljite zahtjev sa datumima i brojem gostiju",
        "Odgovaramo u roku od 24 časa sa slobodnim terminima i cijenom",
        "Potvrdite porukom — plaćanje na dolasku, keš ili kartica",
      ],
    },
    form: {
      property: "Smještaj",
      arrival: "Dolazak",
      departure: "Odlazak",
      adults: "Odrasli",
      children: "Djeca",
      name: "Vaše ime",
      email: "Email",
      phone: "Telefon (opciono)",
      notes: "Nešto što treba da znamo?",
      submit: "Pošaljite zahtjev",
      sending: "Šaljem…",
      privacy: "Vaše podatke koristimo samo za odgovor na ovaj zahtjev.",
      success: "Hvala — vaš zahtjev je kod nas. Odgovorićemo u roku od 24 časa.",
      errorDates: "Datum odlaska mora biti poslije datuma dolaska.",
      error: "Nijesmo uspjeli da pošaljemo zahtjev. Pokušajte ponovo ili nam pišite na WhatsApp.",
      optionEither: "Bilo koje — vi odlučite",
    },
    social: {
      eyebrow: "Između boravaka",
      title: "Pratite godišnja doba",
      text: "Snijeg na vrhovima u martu, divlje cvijeće u maju, prve šljive u avgustu. Objavljujemo šta dolina radi — i šta je slobodno u zadnji čas.",
    },
    footer: {
      rights: "© 2026 Mountain View · Resort i hotel",
      owner: "Prijava za domaćina",
      chooseLanguage: "Izaberite jezik",
      imagery: "Fotografije resorta Mountain View su naše. Ostale fotografije prikazuju pejzaž oko Gusinja.",
    },
  },

  ru: {
    place: "Гусине · Черногория",
    brandSubtitle: "Курорт и гостиница",
    nav: [
      { label: "Размещение", href: "#stays" },
      { label: "О регионе", href: "#discover" },
      { label: "Планирование", href: "#plan" },
      { label: "Запросить предложение", href: "#offer" },
    ],
    hero: {
      eyebrow: "Гусине · Черногория",
      intro:
        "Два места для отдыха в одном удивительном уголке Черногории. Курорт и гостиница у подножия гор Проклетие, между долиной Гребае и маленьким городом Гусине.",
      cta: "Найти своё жильё",
      ctaSecondary: "Запросить предложение",
      footLeft: "Два места для отдыха · Мир для открытий",
      footRight: "01 / Проклетие",
    },
    intro: {
      eyebrow: "Добро пожаловать",
      title: "Тихое место у подножия Проклятых гор",
      text: "Mountain View — семейное дело в маленьком городке на краю национального парка Проклетие. Первый дом — курорт с садом и местом для всех, второй — гостиница в центре для тех, кто путешествует налегке. До пекарни несколько минут, до троп десять, а до пляжей побережья — целый мир.",
    },
    stays: {
      eyebrow: "Два способа остановиться",
      title: "Выберите свой Mountain View",
      aside: "Та же долина и то же гостеприимство — но два разных ритма дня.",
      cta: "Запросить предложение",
      map: "Посмотреть на карте",
      resort: {
        place: "Гусине · Проклетие",
        description:
          "Наш большой дом с бунгало и номерами для семей и групп. Ресторан и бар предлагают местные, итальянские и средиземноморские блюда, в том числе вегетарианские, веганские и халяльные; на улице сад, открытая терраса и камин, а вершины видны почти из каждого окна.",
        features: ["Ресторан и бар", "Завтрак включён", "Семейные бунгало", "Бесплатная парковка", "Трансфер из аэропорта", "Терраса и камин"],
      },
      inn: {
        place: "Гусине · центр",
        description:
          "Небольшая простая гостиница в самом центре Гусине. Уютные номера, общая кухня в вашем распоряжении и советы по тропам перед выходом — выбор походников, велосипедистов и неспешных путешественников.",
        features: ["Центр города", "Общая кухня", "Место для велосипедов", "Советы по тропам", "Завтрак включён"],
      },
    },
    discover: {
      eyebrow: "За порогом",
      title: "Гусине и Проклетие",
      aside: "Долина — причина, по которой большинство наших гостей возвращается.",
      map: "Открыть в картах",
      prokletije: {
        tag: "Горы",
        name: "Проклетие",
        text: "Проклетие поднимаются прямо из долины Гребае: известняковые стены выше 2000 метров, ледниковые озёра и тропы, которые размечены, но почти не многолюдны.",
      },
      gusinje: {
        tag: "Город",
        name: "Гусине",
        text: "Маленький горный город с долгой памятью — мечети османских времён, сливовые сады, субботний рынок и длинные вечера у воды на берегу озера.",
      },
      activities: [
        {
          title: "Реки и источники",
          text: "Холодная прозрачная вода идёт по долине и мимо города. Короткие прогулки к источникам и старым каменным мостам — лёгкая половина дня, а в жаркий день можно и искупаться.",
        },
        {
          title: "Долина Гребае",
          text: "Классический маршрут из Гусине. Час-два до места для пикника под стенами или целый день до одного из ледниковых озёр, если хватит сил.",
        },
        {
          title: "Медленные дни",
          text: "Некоторые гости приезжают только чтобы читать на террасе, есть вареники со сливами и пить кофе два часа. Это тоже вполне хороший план.",
        },
      ],
      trailNote:
        "Тропы размечены, но малолюдны. Весна и ранняя осень — лучшее время для ходьбы; июль и август в долине тёплые и оживлённые. Возьмите крепкую обувь и немного наличных — Гусине маленький, ближайший банкомат в Плаве.",
    },
    plan: {
      eyebrow: "Спланировать поездку",
      title: "Как добраться и когда приехать",
      text: "Мы с радостью поможем с деталями до брони — трансфер, багаж, столик на ужин или подходящая тропа на то время, что у вас есть.",
      link: "Подробнее о туризме в Гусине",
      faqs: [
        {
          question: "Как добраться до Гусине?",
          answer:
            "Большинство гостей приезжают на машине: примерно два с половиной часа из Подгорицы и около часа от границы с Албанией через Плав. Есть автобус до Плава, а по запросу мы можем организовать трансфер из Плава.",
        },
        {
          question: "Когда лучше приехать?",
          answer:
            "Май, июнь, сентябрь и начало октября лучше всего для прогулок — прохладнее, зеленее и тихо. Июль и август — самые тёплые и самые людные месяцы в долине. Зима спокойна, со снегом на высоких вершинах.",
        },
        {
          question: "Нужна ли машина?",
          answer:
            "Она помогает, но не обязательна. Оба дома находятся в центре или в нескольких минутах от него, а к началу троп можно дойти пешком или доехать на такси из Плава. Расскажите о своих планах, и мы поможем с логистикой.",
        },
      ],
    },
    offer: {
      eyebrow: "Напрямую с нами",
      title: "Запросите персональное предложение",
      text: "Напишите даты и сколько вас приезжает. Мы ответим со свободными датами и ценой для того дома, который вам больше подойдёт — без комиссий и посредников.",
      whatsapp: "WhatsApp",
      steps: [
        "Отправьте запрос с датами и числом гостей",
        "Мы ответим в течение 24 часов со свободными датами и ценой",
        "Подтвердите сообщением — оплата при заселении, наличными или картой",
      ],
    },
    form: {
      property: "Жильё",
      arrival: "Заезд",
      departure: "Выезд",
      adults: "Взрослые",
      children: "Дети",
      name: "Ваше имя",
      email: "Email",
      phone: "Телефон (необязательно)",
      notes: "Что нам стоит знать?",
      submit: "Отправить запрос",
      sending: "Отправляем…",
      privacy: "Мы используем ваши данные только для ответа на этот запрос.",
      success: "Спасибо — ваш запрос у нас. Ответим в течение 24 часов.",
      errorDates: "Дата выезда должна быть позже даты заезда.",
      error: "Не удалось отправить запрос. Попробуйте ещё раз или напишите нам в WhatsApp.",
      optionEither: "Любой — решите сами",
    },
    social: {
      eyebrow: "Между поездками",
      title: "Следите за сезонами",
      text: "Снег на вершинах в марте, дикие цветы в мае, первые сливы в августе. Мы рассказываем, что происходит в долине — и что свободно в последний момент.",
    },
    footer: {
      rights: "© 2026 Mountain View · Курорт и гостиница",
      owner: "Вход для владельца",
      chooseLanguage: "Выбрать язык",
      imagery: "Фотографии комплекса Mountain View — наши. Остальные снимки показывают окрестности Гусине.",
    },
  },

  sq: {
    place: "Gusinje · Mali i Zi",
    brandSubtitle: "Resort dhe hotel",
    nav: [
      { label: "Qëndrimet", href: "#stays" },
      { label: "Zbulo", href: "#discover" },
      { label: "Planifiko", href: "#plan" },
      { label: "Kërkoni një ofertë", href: "#offer" },
    ],
    hero: {
      eyebrow: "Gusinje · Mali i Zi",
      intro:
        "Dy vende për të qëndruar, një cep i jashtëzakonshëm i Malit të Zi. Një resort dhe një hotel në këmbët e bjeshkëve të Prokletijeve, midis luginës së Grebajës dhe qytetit të vogël të Gusinjës.",
      cta: "Gjeni qëndrimin tuaj",
      ctaSecondary: "Kërkoni një ofertë",
      footLeft: "Dy vende për të qëndruar · Një botë për të zbuluar",
      footRight: "01 / Prokletijet",
    },
    intro: {
      eyebrow: "Mirë se vini",
      title: "Një bazë e qetë në këmbët e Bjeshkëve të Nemuna",
      text: "Mountain View drejtohet nga familja, në një qytet të vogël në skaj të Parkut Kombëtar të Bjeshkëve të Nemuna. Njëra shtëpi është resort me kopsht dhe vend për të gjithë, tjetra hotel në qendër për ata që udhëtojnë lehtë. Të dyja janë disa minuta nga furra e bukës, dhjetë minuta nga shtigjet dhe një botë larg turmave të bregdetit.",
    },
    stays: {
      eyebrow: "Dy mënyra për të qëndruar",
      title: "Zgjidhni Mountain View tuaj",
      aside: "E njëjta luginë, e njëjta mikpritje — dy ritme të ndryshme ditësh.",
      cta: "Kërkoni një ofertë",
      map: "Shiheni në hartë",
      resort: {
        place: "Gusinje · Prokletijet",
        description:
          "Shtëpia jonë më e madhe, me bungalove dhe dhoma për familje e grupe. Restoranti dhe bari ofrojnë gatime vendase, italiane dhe mesdhetare, me opsione vegjetariane, vegane dhe halal; jashtë ka kopsht, tarracë të hapur dhe vatër, ndërsa majat shihen nga pothuajse çdo dritare.",
        features: ["Restorant dhe bar", "Mëngjes i përfshirë", "Bungalove familjare", "Parkim falas", "Transfert nga aeroporti", "Tarracë dhe vatër"],
      },
      inn: {
        place: "Gusinje · qendra",
        description:
          "Një hotel i vogël dhe i thjeshtë në zemër të Gusinjës. Dhoma komode, kuzhinë e përbashkët në dispozicionin tuaj dhe këshilla për shtigjet përpara se të niseni — zgjedhja e ecësve, çiklistëve dhe udhëtarëve të qetë.",
        features: ["Në qendër", "Kuzhinë e përbashkët", "Depo për biçikleta", "Këshilla për shtigjet", "Mëngjes i përfshirë"],
      },
    },
    discover: {
      eyebrow: "Përtej derës",
      title: "Gusinja dhe Prokletijet",
      aside: "Lugina është arsyeja pse shumica e mysafirëve tanë kthehen.",
      map: "Hapni në Harta",
      prokletije: {
        tag: "Malet",
        name: "Prokletijet",
        text: "Bjeshkët e Nemuna ngrihen direkt nga lugina e Grebajës: mure gëlqerore mbi 2000 metra, liqene akullnajore dhe shtigje të shënuara, por rrallë të mbushura.",
      },
      gusinje: {
        tag: "Qyteti",
        name: "Gusinja",
        text: "Një qytet i vogël mali me kujtime të gjata — xhami nga koha osmane, kopshte kumbullash, tregu të shtunave dhe mbrëmje të gjata pranë ujit në breg të liqenit.",
      },
      activities: [
        {
          title: "Lumenjtë dhe burimet",
          text: "Uji i ftohtë e i kulluar rrjedh nëpër luginë dhe pranë qytetit. Shëtitjet e shkurtra drejt burimeve dhe urave të vjetra prej guri bëjnë një gjysmë dite të lehtë, me mundësi larjeje në një pasdite të nxehtë.",
        },
        {
          title: "Lugina e Grebajës",
          text: "Ecja klasike nga Gusinja. Një ose dy orë deri në një vend pikniku nën mure, ose një ditë e plotë deri në një nga liqenet akullnajore, nëse këmbët i mbajnë.",
        },
        {
          title: "Ditët e ngadalta",
          text: "Disa mysafirë vijnë vetëm për të lexuar në tarracë, për të ngrënë petulla me kumbulla dhe për të pirë kafe për dy orë. Edhe ky është një plan krejt i mirë.",
        },
      ],
      trailNote:
        "Shtigjet janë të shënuara, por të qeta. Pranvera dhe vjeshta e hershme janë më të mirat për ecje; korriku dhe gushti janë të ngrohtë dhe të zënë në luginë. Merrni këpucë të forta dhe pak para në dorë — Gusinja është e vogël, bankomati më i afërt është në Plavë.",
    },
    plan: {
      eyebrow: "Planifikoni vizitën",
      title: "Si të vini dhe kur të vini",
      text: "Me kënaqësi ndihmojmë me detajet përpara rezervimit — transferta, bagazh, një tavolinë për darkë ose shtegu i duhur për kohën që keni.",
      link: "Më shumë për turizmin në Gusinje",
      faqs: [
        {
          question: "Si të arrij në Gusinje?",
          answer:
            "Shumica e mysafirëve vijnë me makinë: rreth dy orë e gjysmë nga Podgorica dhe rreth një orë nga kufiri me Shqipërinë nëpërmjet Plavës. Ka autobus për në Plavë, dhe me kërkesë mund të organizojmë transport nga Plava.",
        },
        {
          question: "Kur është koha më e mirë për të ardhur?",
          answer:
            "Maji, qershori, shtatori dhe fillimi i tetorit janë më të mirat për ecje — më freskët, më e gjelbër dhe e qetë. Korriku dhe gushti janë muajt më të ngrohtë dhe më të zënë në luginë. Dimri është i qetë, me borë në majat e larta.",
        },
        {
          question: "A më duhet makinë?",
          answer:
            "Ndihmon, por nuk është e domosdoshme. Të dyja objektet janë në qendër ose pak minuta larg saj, dhe nisjet e shtigjeve arrihen në këmbë ose me taksi nga Plava. Na thoni çfarë planifikoni dhe do t'ju ndihmojmë me logjistikën.",
        },
      ],
    },
    offer: {
      eyebrow: "Direkt me ne",
      title: "Kërkoni një ofertë të personalizuar",
      text: "Na thoni datat dhe sa persona vijnë. Do të përgjigjemi me disponueshmërinë dhe çmimin për shtëpinë që ju përshtatet më mirë — pa komisione dhe pa ndërmjetës.",
      whatsapp: "WhatsApp",
      steps: [
        "Dërgoni kërkesën me datat dhe numrin e personave",
        "Përgjigjemi brenda 24 orëve me disponueshmërinë dhe çmimin",
        "Konfirmoni me mesazh — pagesa në mbërritje, me para në dorë ose kartë",
      ],
    },
    form: {
      property: "Qëndrimi",
      arrival: "Mbërritja",
      departure: "Nisja",
      adults: "Të rritur",
      children: "Fëmijë",
      name: "Emri juaj",
      email: "Email",
      phone: "Telefon (opsionale)",
      notes: "Diçka që duhet ta dimë?",
      submit: "Dërgo kërkesën",
      sending: "Po dërgohet…",
      privacy: "Të dhënat tuaja i përdorim vetëm për t'iu përgjigjur kësaj kërkese.",
      success: "Faleminderit — kërkesa juaj është me ne. Do të përgjigjemi brenda 24 orëve.",
      errorDates: "Data e nisjes duhet të jetë pas datës së mbërritjes.",
      error: "Nuk arritëm ta dërgonim kërkesën. Provoni përsëri ose na shkruani në WhatsApp.",
      optionEither: "Të dyja — vendosni ju",
    },
    social: {
      eyebrow: "Midis qëndrimeve",
      title: "Ndiqni stinët",
      text: "Borë në majat e maleve në mars, lule të egra në maj, kumbullat e para në gusht. Postojmë çfarë po bën lugina — dhe çfarë është e lirë në momentin e fundit.",
    },
    footer: {
      rights: "© 2026 Mountain View · Resort dhe hotel",
      owner: "Hyrja e pronarit",
      chooseLanguage: "Zgjidhni gjuhën",
      imagery: "Fotografitë e resortit Mountain View janë tonat. Fotografitë e tjera tregojnë peizazhin rreth Gusinjës.",
    },
  },
};