// What Mountain View Resort offers to do, in the owner's own list, with the
// charges exactly as they are listed: cycling and the children's playground
// come with the stay, the arranged activities and the off-site ones carry an
// additional charge, and walking the trails on your own is free — the property
// does not charge for walking in the area.
//
// Nothing here is priced, because the owner has not priced any of it: the paid
// activities are described as available to enquire about, subject to
// arrangements, and the answer comes back with the offer.

export const RESORT_ACTIVITIES = {
  en: {
    groups: [
      {
        title: "On site, no extra charge",
        items: ["Cycling", "Children's playground"],
      },
      {
        title: "Available to enquire about, at an additional charge, subject to arrangements",
        items: ["Bicycle rental", "Bike tours", "Walking tours", "Hiking activities", "Evening entertainment"],
      },
      {
        title: "Off site, at an additional charge",
        items: ["Horse riding", "Fishing"],
      },
    ],
    note: "Walking in the area on your own costs nothing: the waymarked trails around Vusanje and the Grebaje valley are free to use. The activities above that carry a charge are arranged on request, so ask about them in your enquiry and we will confirm what we can arrange.",
  },
  me: {
    groups: [
      {
        title: "U objektu, bez doplate",
        items: ["Biciklizam", "Dječije igralište"],
      },
      {
        title: "Dostupno na upit, uz doplatu, u dogovoru s nama",
        items: ["Najam bicikala", "Biciklističke ture", "Šetnje sa vodičem", "Planinarske aktivnosti", "Večernji program"],
      },
      {
        title: "Van objekta, uz doplatu",
        items: ["Jahanje", "Ribolov"],
      },
    ],
    note: "Šetnja obilježenim stazama oko Vusanja i doline Grebaje je besplatna. Aktivnosti koje se plaćaju dogovaramo na zahtjev, pa ih navedite u svom upitu i potvrdićemo šta možemo organizovati.",
  },
  ru: {
    groups: [
      {
        title: "На территории, без доплаты",
        items: ["Велосипедные прогулки", "Детская площадка"],
      },
      {
        title: "Доступно по запросу, за дополнительную плату, по договорённости",
        items: ["Прокат велосипедов", "Велотуры", "Прогулки с гидом", "Походы", "Вечерние развлечения"],
      },
      {
        title: "За пределами территории, за дополнительную плату",
        items: ["Верховая езда", "Рыбалка"],
      },
    ],
    note: "Гулять по маркированным тропам вокруг Вусане и долины Гребае можно бесплатно. Активности за дополнительную плату мы согласуем по запросу: напишите о них в своём запросе, и мы подтвердим, что сможем организовать.",
  },
  sq: {
    groups: [
      {
        title: "Në objekt, pa pagesë shtesë",
        items: ["Çiklizëm", "Kënd lojërash për fëmijë"],
      },
      {
        title: "Të ofruara me kërkesë, me pagesë shtesë, sipas marrëveshjes",
        items: ["Qira biçikletash", "Ture me biçikletë", "Shëtitje me guidë", "Aktivitete hiking", "Program mbrëmjeje"],
      },
      {
        title: "Jashtë objektit, me pagesë shtesë",
        items: ["Kalërim", "Peshkim"],
      },
    ],
    note: "Ecja në shtigjet e shënuara rreth Vusanjes dhe luginës së Grebajës është falas. Aktivitetet me pagesë shtesë i rregullojmë me kërkesë, prandaj shkruajini në kërkesën tuaj dhe do t'ju konfirmojmë çfarë mund të organizojmë.",
  },
};