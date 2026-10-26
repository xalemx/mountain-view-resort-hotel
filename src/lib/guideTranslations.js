// The local guide's own copy, in the four languages the site is written in.
//
// It lives here rather than inside src/lib/translations.js because the guide is
// the part of the site that keeps growing: the filters, the walking and driving
// labels, the season heading and the loading, empty and error wording all sit
// together here, one block per language, and translations.js reads them back in.
//
// The record-level text for each place — its name, description and season — is
// in src/lib/guideContent.js, matched on the English name in the record.

export const GUIDE_COPY = {
  en: {
    eyebrow: "Field notes",
    title: "Gusinje & Prokletije: a guest's guide",
    intro: [
      "Gusinje sits in a wide valley in the north-east of Montenegro, between the Prokletije mountains and the border with Albania. It is small — a few thousand people, a handful of streets, one lake below the town — and it is the quietest way into a national park that most visitors to Montenegro have never heard of. Our two houses, Mountain View Resort and Hotel Mountain View, are the base we write from.",
      "Below is the short list we send guests before they arrive: the places within half an hour of the door that are worth a morning, an afternoon or a full day. Distances are measured from the town centre and driving times are rough, because mountain roads are slow and beautiful. Trail conditions change with the weather, so ask us before you set off and we will tell you what is passable this week.",
    ],
    placesTitle: "Places within half an hour",
    distanceLabel: "From Gusinje (approx.)",
    driveLabel: "By car (approx.)",
    seasonLabel: "Best time",
    mapLink: "Open in Maps",
    categories: {
      mountain: "Mountain",
      valley: "Valley",
      lake: "Lake",
      town: "Town",
      viewpoint: "Viewpoint",
      activity: "Activity",
    },
    practicalTitle: "Before you come",
    practical: [
      {
        title: "Getting here",
        text: "The nearest international airport is Podgorica, and Tivat and Dubrovnik are further along scenic routes. We have not verified the distances or the driving times ourselves, so we publish no figure: ask us and we will confirm the route and how long to allow. If you are arriving without a car, say so in your request and we will help arrange a transfer.",
      },
      {
        title: "When to come",
        text: "June to early October is walking season, with the clearest weeks usually in July and September. May and October are quieter and colder on the high trails. Winter is for snow, slow mornings and the fireplace at the resort.",
      },
    ],
    filterLabel: "Show",
    filters: { all: "All", easy_walks: "Easy walks", hiking: "Hiking", family: "Family activities", sightseeing: "Sightseeing" },
    walkLabel: "On foot",
    hoursShort: "h",
    minutesShort: "min",
    conditionsNote:
      "Trail conditions are not shown live. Ask us before you set off and we will check what is passable this week.",
    loadingLabel: "Loading the places…",
    emptyState: "Nothing in the guide matches this filter yet. Try another one, or ask us about the place you have in mind.",
    errorState:
      "The places could not be loaded just now. Please try again, or message us on WhatsApp and we will send you the list.",
    retry: "Try again",
    cta: "Ask us about the trails",
  },

  me: {
    eyebrow: "Bilješke iz doline",
    title: "Gusinje i Prokletije: vodič za goste",
    intro: [
      "Gusinje leži u širokoj dolini na sjeveroistoku Crne Gore, između Prokletija i granice sa Albanijom. Malo je — nekoliko hiljada ljudi, nekoliko ulica, jedno jezero pod gradom — i najtiši je ulaz u nacionalni park za koji većina posjetilaca Crne Gore nikada nije čula. Naše dvije kuće, Mountain View Resort i Hotel Mountain View, baza su iz koje pišemo.",
      "Ispod je kratak spisak koji šaljemo gostima prije dolaska: mjesta na pola sata od vrata, koja vrijede jutro, popodne ili cijeli dan. Udaljenosti mjerimo od centra grada, a vremena vožnje su približna, jer su planinski putevi spori i lijepi. Stanje staza se mijenja s vremenom, pa nas pitajte prije polaska i reći ćemo vam šta je ove nedjelje prohodno.",
    ],
    placesTitle: "Mjesta na pola sata",
    distanceLabel: "Od Gusinja (približno)",
    driveLabel: "Autom (približno)",
    seasonLabel: "Najbolje vrijeme",
    mapLink: "Otvori u Mapama",
    categories: {
      mountain: "Planina",
      valley: "Dolina",
      lake: "Jezero",
      town: "Grad",
      viewpoint: "Vidikovac",
      activity: "Aktivnost",
    },
    practicalTitle: "Prije dolaska",
    practical: [
      {
        title: "Kako stići",
        text: "Najbliži međunarodni aerodrom je Podgorica, a Tivat i Dubrovnik su dalje, slikovitim rutama. Udaljenosti i vremena vožnje nismo sami provjerili, pa ne objavljujemo brojke: pitajte nas i potvrdićemo rutu i koliko vremena treba. Ako dolazite bez auta, napišite nam to u zahtjevu i pomoći ćemo oko transfera.",
      },
      {
        title: "Kada doći",
        text: "Od juna do početka oktobra je sezona pješačenja, a najvedrije nedjelje su obično u julu i septembru. Maj i oktobar su mirniji i hladniji na visokim stazama. Zima je za snijeg, spora jutra i kamin u resortu.",
      },
    ],
    filterLabel: "Prikaži",
    filters: { all: "Sve", easy_walks: "Lagane šetnje", hiking: "Pješačenje", family: "Za porodicu", sightseeing: "Razgledanje" },
    walkLabel: "Pješke",
    hoursShort: "h",
    minutesShort: "min",
    conditionsNote:
      "Stanje staza nije prikazano uživo. Pitajte nas prije polaska i provjerićemo šta je prohodno ove nedjelje.",
    loadingLabel: "Učitavanje mjesta…",
    emptyState: "Za ovaj filter još nema mjesta u vodiču. Probajte drugi ili nas pitajte za mjesto koje imate na umu.",
    errorState:
      "Mjesta trenutno nisu mogla biti učitana. Pokušajte ponovo ili nam pišite na WhatsApp i poslaćemo vam spisak.",
    retry: "Pokušajte ponovo",
    cta: "Pitajte nas o stazama",
  },

  ru: {
    eyebrow: "Заметки из долины",
    title: "Гусине и Проклетие: путеводитель для гостей",
    intro: [
      "Гусине стоит в широкой долине на северо-востоке Черногории, между Проклетием и границей с Албанией. Город небольшой — несколько тысяч жителей, несколько улиц, озеро под городом — и это самый тихий вход в национальный парк, о котором большинство туристов в Черногории даже не слышали. Два наших дома, Mountain View Resort и Hotel Mountain View, — та база, из которой мы пишем.",
      "Ниже короткий список, который мы отправляем гостям перед приездом: места в получасе от порога, ради которых стоит выделить утро, полдня или целый день. Расстояния указаны от центра города, а время в пути примерное, потому что горные дороги медленные и красивые. Состояние троп меняется с погодой, поэтому спросите нас перед выходом, и мы скажем, что проходимо на этой неделе.",
    ],
    placesTitle: "Места в получасе",
    distanceLabel: "От Гусине (приблизительно)",
    driveLabel: "На машине (приблизительно)",
    seasonLabel: "Лучшее время",
    mapLink: "Открыть в Картах",
    categories: {
      mountain: "Гора",
      valley: "Долина",
      lake: "Озеро",
      town: "Город",
      viewpoint: "Смотровая",
      activity: "Занятие",
    },
    practicalTitle: "Перед поездкой",
    practical: [
      {
        title: "Как добраться",
        text: "Ближайший международный аэропорт — Подгорица, а Тиват и Дубровник дальше, по живописным дорогам. Расстояния и время в пути мы сами не проверяли, поэтому цифр не публикуем: спросите нас, и мы подтвердим маршрут и сколько времени закладывать. Если вы приезжаете без машины, напишите об этом в запросе, и мы поможем с трансфером.",
      },
      {
        title: "Когда приезжать",
        text: "С июня до начала октября — сезон ходьбы, самые ясные недели обычно в июле и сентябре. Май и октябрь тише и холоднее на высоких тропах. Зима — это снег, неспешные утра и камин в комплексе.",
      },
    ],
    filterLabel: "Показать",
    filters: { all: "Все", easy_walks: "Лёгкие прогулки", hiking: "Походы", family: "Для семьи", sightseeing: "Достопримечательности" },
    walkLabel: "Пешком",
    hoursShort: "ч",
    minutesShort: "мин",
    conditionsNote:
      "Состояние троп не показывается в реальном времени. Спросите нас перед выходом, и мы проверим, что проходимо на этой неделе.",
    loadingLabel: "Загружаем места…",
    emptyState: "По этому фильтру в путеводителе пока ничего нет. Попробуйте другой или спросите нас о месте, которое имеете в виду.",
    errorState:
      "Не удалось загрузить места. Попробуйте ещё раз или напишите нам в WhatsApp, и мы пришлём список.",
    retry: "Попробовать снова",
    cta: "Спросите нас о маршрутах",
  },

  sq: {
    eyebrow: "Shënime nga lugina",
    title: "Gusinja dhe Prokletijet: një udhërrëfyes për mysafirët",
    intro: [
      "Gusinja shtrihet në një luginë të gjerë në veri-lindje të Malit të Zi, midis Prokletijeve dhe kufirit me Shqipërinë. Është i vogël — disa mijëra banorë, disa rrugë, një liqen nën qytet — dhe është hyrja më e qetë në një park kombëtar për të cilin shumica e vizitorëve të Malit të Zi nuk kanë dëgjuar kurrë. Dy shtëpitë tona, Mountain View Resort dhe Hotel Mountain View, janë baza nga e cila shkruajmë.",
      "Më poshtë është lista e shkurtër që u dërgojmë mysafirëve para se të vijnë: vendet brenda gjysmë ore nga dera, që vlejnë një mëngjes, një pasdite ose një ditë të plotë. Distancat maten nga qendra e qytetit dhe kohët e udhëtimit janë të përafërta, sepse rrugët e malit janë të ngadalta dhe të bukura. Gjendja e shtigjeve ndryshon me motin, prandaj na pyesni para se të niseni dhe do t'ju themi çfarë kalon këtë javë.",
    ],
    placesTitle: "Vende brenda gjysmë ore",
    distanceLabel: "Nga Gusinja (afërsisht)",
    driveLabel: "Me makinë (afërsisht)",
    seasonLabel: "Koha më e mirë",
    mapLink: "Hap në Harta",
    categories: {
      mountain: "Mal",
      valley: "Luginë",
      lake: "Liqen",
      town: "Qytet",
      viewpoint: "Pamje",
      activity: "Aktivitet",
    },
    practicalTitle: "Para se të vini",
    practical: [
      {
        title: "Si të arrihet",
        text: "Aeroporti ndërkombëtar më i afërt është Podgorica, ndërsa Tivari dhe Dubrovniku janë më larg, në rrugë piktoreske. Distancat dhe kohën e udhëtimit nuk i kemi verifikuar vetë, prandaj nuk publikojmë shifra: na pyesni dhe do t'ju konfirmojmë rrugën dhe sa kohë duhet. Nëse vini pa makinë, na shkruani në kërkesë dhe do t'ju ndihmojmë me transfert.",
      },
      {
        title: "Kur të vini",
        text: "Nga qershori deri në fillim të tetorit është sezoni i ecjes, ndërsa javët më të kthjellta janë zakonisht në korrik dhe shtator. Maji dhe tetori janë më të qetë dhe më të ftohtë në shtigjet e larta. Dimri është për borë, mëngjese të qeta dhe kaminin e resortit.",
      },
    ],
    filterLabel: "Shfaq",
    filters: { all: "Të gjitha", easy_walks: "Shëtitje të lehta", hiking: "Ecje malore", family: "Për familje", sightseeing: "Vizita" },
    walkLabel: "Në këmbë",
    hoursShort: "orë",
    minutesShort: "min",
    conditionsNote:
      "Gjendja e shtigjeve nuk shfaqet drejtpërdrejt. Na pyesni përpara se të niseni dhe do të kontrollojmë çfarë kalon këtë javë.",
    loadingLabel: "Po ngarkohen vendet…",
    emptyState: "Për këtë filtër nuk ka ende vende në udhërrëfyes. Provoni një tjetër ose na pyesni për vendin që keni në mendje.",
    errorState:
      "Vendet nuk u ngarkuan dot tani. Provoni përsëri ose na shkruani në WhatsApp dhe do t'ju dërgojmë listën.",
    retry: "Provoni përsëri",
    cta: "Pyetni për shtigjet",
  },
};