// The guide's long-form pages, in the four languages the site is written in.
//
// These are the words; the distances, times, grades and charges are in
// src/lib/guideFacts.js and are never repeated here. A page therefore cannot
// claim a different distance in Russian from the one the English page shows.
// Pages are matched on the stable place id, never on the English name.

export const GUIDE_PAGE_COPY = {
  en: {
    "grebaje-valley": {
      name: "Grebaje Valley",
      imageAlt: "The Grebaje valley in the Prokletije mountains, with limestone peaks above a green valley floor",
      title: "Grebaje Valley Guide – Walks, Hiking & Getting There",
      description:
        "Our own notes on the Grebaje valley near Vusanje: what the valley floor is like to walk, which peaks the routes lead to, how the road in behaves, and what to check before setting out.",
      lead: "The valley most guests come for: a green floor, limestone walls on both sides, and a road that ends where the walking starts.",
      intro: [
        "Grebaje runs south from Vusanje towards the Albanian border, and it is the reason many people stop in this corner of Montenegro at all. The floor is meadow and orchard, still worked by families who bring animals up for the summer, and the sides are the grey limestone of the Karanfili group — the peaks you can see from both of our houses on a clear day.",
        "It is not a single viewpoint. It is a place you enter and spend a few hours in, with the mountain getting closer the further you walk.",
      ],
      expect: [
        "A level walk on the valley floor for as long as you want it: an hour, or half a day if you keep going.",
        "Summer pasture in the upper valley — huts, stone walls and animals.",
        "The starting point for the serious routes as well. Karanfili, Volušnica, Popadija and Talijanka are all climbed from this valley, and none of them is a valley stroll.",
      ],
      gettingThere: [
        "By road from Vusanje, on the lane that leaves the village towards the mountains. It is a mountain road, and we will tell you what state it is in on the day you ask rather than guess at it here.",
      ],
      practical: [
        "The valley lies inside Prokletije National Park, declared in 2009 and covering about 1,660 hectares across the Plav and Gusinje municipalities.",
        "Park admission is sold as a ticket online. Whether it is checked at this entrance, and what it costs, is not published on the park's pages, so ask us before you set out.",
        "Weather turns quickly here. Start early, and carry water and a jacket even in July.",
      ],
    },

    "ropojana-valley": {
      name: "Ropojana Valley",
      imageAlt: "The Ropojana valley below the Prokletije peaks, towards the border with Albania",
      title: "Ropojana Valley – The Quiet Walk Beyond Vusanje",
      description:
        "Ropojana is the long glacial valley south of Vusanje, quieter than Grebaje and leading towards the rock gateway to Albania. What to expect, and what to arrange before you cross.",
      lead: "The quieter neighbour of Grebaje: a long glacial valley that leads towards Albania, with the mountains closing in as the road runs out.",
      intro: [
        "Ropojana begins where the tarmac ends south of Vusanje. The Gusinje tourist organisation describes it, with Grebaje, as one of the two glacial valleys that divide the Prokletije on this side of the border, and names both as habitat for the chamois, deer and brown bear that live in the park.",
        "It is also the valley that leads to the natural rock gateway the organisation calls the second of Prokletije's three doors — the one that opens towards the Valbona plain in Albania.",
      ],
      expect: [
        "A valley walk, quieter than Grebaje and with far fewer people on it.",
        "The rock gateway towards Albania, for those walking that far.",
        "No villages past the last houses of Vusanje. This is a place to be self-sufficient in.",
      ],
      gettingThere: [
        "From Vusanje, on the way that continues south into the valley. The further you go, the more the surface is a track rather than a road.",
      ],
      practical: [
        "Crossing into Albania away from an official border point needs permission from the border police in advance, and time to arrange it. Do not plan a through-walk on the assumption that you can cross freely.",
        "Ropojana is inside the national park. The ticket arrangements for this entrance are unconfirmed, so ask before you rely on them.",
        "Mobile signal is unreliable once you are past the village.",
      ],
    },

    "grlja-waterfall": {
      name: "Grlja Waterfall",
      imageAlt: "Water falling over rock at the Grlja waterfall above Vusanje",
      title: "Grlja Waterfall – A Page Still Being Checked",
      description:
        "Grlja is the waterfall above Vusanje, in the direction of the Ropojana valley. We are still confirming the access point, so this page is a draft and is not published.",
      lead: "A waterfall above Vusanje, in the Ropojana direction — a page we are still checking.",
      intro: [
        "Grlja is the waterfall most often mentioned alongside Vusanje: water dropping over rock in the valley that continues towards Ropojana.",
        "We have not yet walked the access with the people who know it, so this page stays a draft. What follows is where it sits in the landscape and what the ground around it is like, and nothing that pretends to be a route description.",
      ],
      expect: [
        "A short visit rather than a day out.",
        "Wet rock and slippery edges close to the falls.",
      ],
      gettingThere: [
        "Reached from the Vusanje side, on foot. The exact point where the walk begins is the thing we are still confirming.",
      ],
      practical: [
        "Do not treat this page as a route yet: the access point, any charge and the condition of the path are all unconfirmed.",
        "Ask us before setting out and we will tell you what we know on the day.",
      ],
      missing: ["the exact access point", "any charge", "the condition of the path"],
    },

    "oko-skakavice": {
      name: "Oko Skakavice",
      imageAlt: "The clear water of the Oko Skakavice spring near Vusanje",
      title: "Oko Skakavice – A Spring Above Vusanje",
      description:
        "Oko Skakavice is a karst spring above Vusanje with unusually clear, cold water. Access is still being confirmed, so the page is kept as a draft.",
      lead: "A karst spring above Vusanje, usually visited together with the valley beyond it.",
      intro: [
        "Oko Skakavice — the grasshopper's eye — is a spring that comes up out of the rock rather than off a hillside, which is why its water is so clear and so cold. It sits in the same corner of the parish as Ropojana.",
        "This page stays a draft until the access and the state of the ground around the spring are confirmed.",
      ],
      expect: [
        "A short stop, usually combined with the valley.",
        "Cold, clear water, and slippery stone around it.",
      ],
      gettingThere: [
        "In the Vusanje area, on foot from the village side. The precise start of the path is unconfirmed.",
      ],
      practical: [
        "No facilities at the spring are confirmed.",
        "Ask us before you go: we would rather send you with current information than with this page.",
      ],
      missing: ["the start of the path", "whether a guide is needed", "any facilities nearby"],
    },

    "ali-pasha-springs": {
      name: "Ali Pasha's Springs",
      imageAlt: "Shaded water at Ali Pasha's Springs at the edge of Gusinje",
      title: "Ali Pasha's Springs, Gusinje – An Easy Half Hour",
      description:
        "The springs at the edge of Gusinje that become the Ljuča river, listed on the tourist organisation's own map of the municipality. The easiest outing from our hotel.",
      lead: "Springs at the edge of Gusinje that turn into the Ljuča river within a few steps.",
      intro: [
        "The springs rise just outside the town and feed the Ljuča, the river that runs through Gusinje. The tourist organisation marks them on its own map of the municipality, which is how most guests come across them.",
        "They are the easiest outing from the hotel: no car, no planning, and a short walk back into town for coffee afterwards.",
      ],
      expect: [
        "Water coming straight out of the rock, in a shaded hollow.",
        "A short visit — half an hour is enough unless you stop for longer.",
        "A place people who live here use, rather than a visitor attraction with a gate.",
      ],
      gettingThere: [
        "On foot from Hotel Mountain View, at the edge of town. From the resort it means a short drive into Gusinje.",
      ],
      practical: [
        "Whether the site is free to visit and open at all hours has not been confirmed by the municipality. Ask us and we will check before you walk over.",
        "Bring insect repellent in high summer; the water and the shade bring them out.",
      ],
    },

    "hrid-lake": {
      name: "Hrid Lake",
      imageAlt: "Hrid lake in Prokletije National Park, ringed by conifer forest below the ridge",
      title: "Hrid Lake, Prokletije – Route from the Plav Side",
      description:
        "Hrid lake is approached from the Plav side, not from Vusanje. What the walk is like, what the park says about the lake, and what to confirm before you drive out.",
      lead: "The lake the park calls its most beautiful, reached from the Plav side — not from a trailhead at Vusanje.",
      intro: [
        "Hridsko jezero lies in the Plav municipality, inside Prokletije National Park, and the park lists it as one of its two strict nature reserves. It is also the lake the park's own material calls the Lake of Happiness, with the old belief that bathing in it brings luck, health and peace.",
        "We had this wrong before, and this is the correction: the lake is not a three-hour walk from a trailhead near Vusanje. The route comes in from the Plav direction, and the walking itself is a short, marked descent to the water. The figures you see above come from the national tourism organisation's route description and the park's own pages, read on the date shown beside them.",
      ],
      expect: [
        "A marked walk in one direction, mostly downhill — arrange a pick-up, or walk back the way you came.",
        "Conifer forest, a spring partway down, and the lake in a hollow below the ridge.",
        "Cool air even in August. This is high ground and it behaves like it.",
      ],
      gettingThere: [
        "By road from the Plav side to the trailhead above the lake. From either house that means driving through Gusinje and on towards Plav, so do not set out expecting a trailhead at Vusanje.",
        "The walking distance and time, the direction of the route and the marked trail are in the panel above; we have not measured the drive from either house and will not invent one.",
      ],
      practical: [
        "There is drinking water and a shelter at the trailhead, and a spring on the route.",
        "Best from June to October. Outside those months snow and ice can make the way difficult.",
        "A park ticket is sold online. The price, and whether it is checked on this route, is unconfirmed, so ask before you go.",
        "Afternoon storms are common at this height. Start early and turn back if the cloud builds.",
      ],
    },
  },

  me: {
    "grebaje-valley": {
      name: "Dolina Grebaje",
      imageAlt: "Dolina Grebaje u Prokletijama, sa krečnjačkim vrhovima nad zelenim dnom doline",
      title: "Vodič kroz dolinu Grebaje – šetnje, planinarenje i dolazak",
      description:
        "Naše bilješke o dolini Grebaje kod Vusanja: kakvo je dno doline za šetnju, kojim vrhovima vode rute, kakav je put i šta provjeriti prije polaska.",
      lead: "Dolina zbog koje većina gostiju i dolazi: zeleno dno, krečnjački zidovi sa obje strane i put koji prestaje tamo gdje počinje pješačenje.",
      intro: [
        "Grebaje se pruža na jug od Vusanja prema albanskoj granici i zbog nje mnogi i zastanu u ovom dijelu Crne Gore. Dno je livada i voćnjak, koje i dalje obrađuju porodice koje ljeti izvode stoku, a strane su sivi krečnjak Karanfila — vrhovi koje vidite sa obje naše kuće kada je vedro.",
        "To nije jedan vidikovac. To je mjesto u koje se uđe i u kojem se provede nekoliko sati, a planina je sve bliža što se dalje ide.",
      ],
      expect: [
        "Ravna šetnja po dnu doline, koliko želite: sat, ili pola dana ako nastavite.",
        "Ljetni katun u gornjem dijelu doline — kolibe, suhozidi i stoka.",
        "I početak ozbiljnih ruta. Karanfili, Volušnica, Popadija i Talijanka penju se iz ove doline, i nijedna od njih nije šetnja dolinom.",
      ],
      gettingThere: [
        "Autom iz Vusanja, putem koji iz sela vodi prema planini. To je planinski put, pa ćemo vam reći u kakvom je stanju onog dana kada pitate, umjesto da ovdje nagađamo.",
      ],
      practical: [
        "Dolina je u Nacionalnom parku Prokletije, proglašenom 2009. godine, koji pokriva oko 1.660 hektara na teritoriji opština Plav i Gusinje.",
        "Ulaznica za park prodaje se online. Da li se provjerava na ovom ulazu i koliko košta nije objavljeno na stranicama parka, pa nas pitajte prije polaska.",
        "Vrijeme se ovdje brzo mijenja. Krenite rano i nosite vodu i jaknu i u julu.",
      ],
    },

    "ropojana-valley": {
      name: "Dolina Ropojane",
      imageAlt: "Dolina Ropojane pod vrhovima Prokletija, prema granici sa Albanijom",
      title: "Dolina Ropojane – tiha šetnja iza Vusanja",
      description:
        "Ropojana je duga lednička dolina južno od Vusanja, tiša od Grebaje, i vodi prema kamenim vratima ka Albaniji. Šta očekivati i šta urediti prije prelaska.",
      lead: "Tiša susjeda Grebaje: duga lednička dolina koja vodi prema Albaniji, a planine se zbližavaju kako put prestaje.",
      intro: [
        "Ropojana počinje tamo gdje asfalt prestaje južno od Vusanja. Turistička organizacija Gusinje je, uz Grebaje, opisuje kao jednu od dvije ledničke doline koje dijele Prokletije s ove strane granice, i obje navodi kao stanište divokoze, srne i mrkog medvjeda koji žive u parku.",
        "To je i dolina koja vodi do prirodnih kamenih vrata koje organizacija naziva drugim od tri prokletijska vrata — onih koja se otvaraju prema ravnici Valbone u Albaniji.",
      ],
      expect: [
        "Šetnja dolinom, tiša od Grebaje i sa znatno manje ljudi.",
        "Kamena vrata prema Albaniji, za one koji idu tako daleko.",
        "Nema sela poslije posljednjih kuća u Vusanju. Ovdje se treba osloniti na sebe.",
      ],
      gettingThere: [
        "Iz Vusanja, putem koji se nastavlja na jug u dolinu. Što dalje idete, to je podloga više staza nego put.",
      ],
      practical: [
        "Prelazak u Albaniju van zvaničnog graničnog prelaza traži prethodnu dozvolu granične policije i vremena za njeno uređenje. Ne planirajte prolazak kroz dolinu računajući da možete slobodno preći.",
        "Ropojana je u nacionalnom parku. Uslovi sa ulaznicama na ovom ulazu nijesu potvrđeni, pa pitajte prije nego se na njih oslonite.",
        "Signal mobilne telefonije je nepouzdan kada prođete selo.",
      ],
    },

    "grlja-waterfall": {
      name: "Vodopad Grlja",
      imageAlt: "Voda pada preko stijene na vodopadu Grlja iznad Vusanja",
      title: "Vodopad Grlja – stranica koja se još provjerava",
      description:
        "Grlja je vodopad iznad Vusanja, u smjeru doline Ropojane. Još provjeravamo pristup, pa je stranica nacrt i nije objavljena.",
      lead: "Vodopad iznad Vusanja, u smjeru Ropojane — stranica koju još provjeravamo.",
      intro: [
        "Grlja je vodopad koji se najčešće pominje uz Vusanje: voda pada preko stijene u dolini koja se nastavlja prema Ropojani.",
        "Pristup još nijesmo prošli sa ljudima koji ga poznaju, pa stranica ostaje nacrt. Ono što slijedi je gdje se nalazi u pejzažu i kakav je teren oko njega, i ništa što se pretvara da je opis rute.",
      ],
      expect: ["Kratka posjeta, a ne cijeli dan.", "Mokra stijena i klizne ivice blizu vodopada."],
      gettingThere: [
        "Dolazi se sa strane Vusanja, pješke. Tačno mjesto gdje šetnja počinje je ono što još provjeravamo.",
      ],
      practical: [
        "Ne tretirajte ovu stranicu kao rutu: pristup, eventualna naplata i stanje staze nijesu potvrđeni.",
        "Pitajte nas prije polaska i reći ćemo vam šta znamo tog dana.",
      ],
      missing: ["tačno mjesto pristupa", "eventualna naplata", "stanje staze"],
    },

    "oko-skakavice": {
      name: "Oko Skakavice",
      imageAlt: "Bistra voda izvora Oko Skakavice kod Vusanja",
      title: "Oko Skakavice – izvor iznad Vusanja",
      description:
        "Oko Skakavice je kraški izvor iznad Vusanja, neuobičajeno bistre i hladne vode. Pristup se još provjerava, pa stranica ostaje nacrt.",
      lead: "Kraški izvor iznad Vusanja, obično u istom izletu sa dolinom iza njega.",
      intro: [
        "Oko Skakavice je izvor koji izbija iz stijene, a ne sa padine, i zato je voda tako bistra i hladna. Nalazi se u istom dijelu atara kao Ropojana.",
        "Stranica ostaje nacrt dok se ne potvrde pristup i stanje terena oko izvora.",
      ],
      expect: ["Kratko zaustavljanje, obično spojeno sa dolinom.", "Hladna bistra voda i klizno kamenje oko nje."],
      gettingThere: ["U kraju Vusanja, pješke sa strane sela. Tačan početak staze nije potvrđen."],
      practical: [
        "Nikakvi sadržaji kod izvora nijesu potvrđeni.",
        "Pitajte nas prije polaska: radije ćemo vas poslati sa svježim podacima nego sa ovom stranicom.",
      ],
      missing: ["početak staze", "da li je potreban vodič", "sadržaji u blizini"],
    },

    "ali-pasha-springs": {
      name: "Ali-pašini izvori",
      imageAlt: "Voda u hladovini na Ali-pašinim izvorima na ivici Gusinja",
      title: "Ali-pašini izvori u Gusinju – lako pola sata",
      description:
        "Izvori na ivici Gusinja koji se odmah pretvaraju u rijeku Ljuču, označeni na mapi Turističke organizacije. Najlakši izlet iz našeg hotela.",
      lead: "Izvori na ivici Gusinja koji se u nekoliko koraka pretvaraju u rijeku Ljuču.",
      intro: [
        "Izvori izbijaju odmah iznad grada i napajaju Ljuču, rijeku koja teče kroz Gusinje. Turistička organizacija ih označava na svojoj mapi opštine, i tako većina gostiju za njih i sazna.",
        "To je najlakši izlet iz hotela: bez auta, bez planiranja, i kratka šetnja nazad u grad na kafu.",
      ],
      expect: [
        "Voda koja izbija pravo iz stijene, u sjenovitoj udolini.",
        "Kratka posjeta — pola sata je dovoljno ako se ne zadržite.",
        "Mjesto koje koriste ljudi koji ovdje žive, a ne atrakcija sa kapijom.",
      ],
      gettingThere: ["Pješke od Hotela Mountain View, na ivici grada. Iz resorta to znači kratku vožnju do Gusinja."],
      practical: [
        "Da li je pristup besplatan i otvoren u svako doba nije potvrdila opština. Pitajte nas i provjerićemo prije nego što krenete.",
        "Ljeti ponesite sredstvo protiv insekata; uz vodu i hladovinu ih ima.",
      ],
    },

    "hrid-lake": {
      name: "Jezero Hrid",
      imageAlt: "Jezero Hrid u Nacionalnom parku Prokletije, okruženo četinarima pod grebenom",
      title: "Jezero Hrid – ruta sa plavske strane",
      description:
        "Jezero Hrid se obilazi sa plavske strane, ne od Vusanja. Kakvo je pješačenje, šta park kaže o jezeru i šta provjeriti prije polaska.",
      lead: "Jezero koje park naziva najljepšim, a do kojeg se dolazi sa plavske strane — ne sa staze kod Vusanja.",
      intro: [
        "Hridsko jezero je u opštini Plav, u Nacionalnom parku Prokletije, i park ga navodi kao jedan od svoja dva specijalna rezervata prirode. To je i jezero koje materijali parka zovu Jezero sreće, s vjerovanjem da kupanje u njemu donosi sreću, zdravlje i mir.",
        "Ovo smo prije imali pogrešno, i ovo je ispravka: jezero nije trosatno pješačenje od staze kod Vusanja. Ruta dolazi sa plavske strane, a samo pješačenje je kratak, obilježen spust do vode. Brojke iznad dolaze iz opisa rute nacionalne turističke organizacije i sa stranica parka, čitanih na datum koji stoji uz njih.",
      ],
      expect: [
        "Obilježena staza u jednom smjeru, uglavnom nizbrdo — dogovorite prevoz ili se vratite istim putem.",
        "Četinarska šuma, izvor na pola spusta i jezero u udolini pod grebenom.",
        "Svjež vazduh i u avgustu. Ovo je visina i tako se i ponaša.",
      ],
      gettingThere: [
        "Autom sa plavske strane do početka staze iznad jezera. Iz obje kuće to znači vožnju kroz Gusinje dalje prema Plavu, pa ne krećite očekujući stazu kod Vusanja.",
        "Razdaljina i vrijeme pješačenja, smjer rute i označenost stoje u pregledu iznad; vožnju od kuća nijesmo mjerili i nećemo je izmišljati.",
      ],
      practical: [
        "Na početku staze ima pijaće vode i sklonište, a na ruti izvor.",
        "Najbolje od juna do oktobra. Van tih mjeseci snijeg i led mogu otežati prolaz.",
        "Ulaznica za park se prodaje online. Cijena i to da li se provjerava na ovoj ruti nijesu potvrđeni, pa pitajte prije polaska.",
        "Popodnevne oluje su na ovoj visini česte. Krenite rano i vratite se ako se oblaci skupljaju.",
      ],
    },
  },

  ru: {
    "grebaje-valley": {
      name: "Долина Гребае",
      imageAlt: "Долина Гребае в Проклетие: известняковые вершины над зелёным дном долины",
      title: "Долина Гребае – прогулки, походы и как добраться",
      description:
        "Наши заметки о долине Гребае у Вусане: каково дно долины для прогулки, к каким вершинам ведут маршруты, какая дорога и что проверить перед выходом.",
      lead: "Долина, ради которой приезжает большинство гостей: зелёное дно, известняковые стены по сторонам и дорога, которая кончается там, где начинается ходьба.",
      intro: [
        "Гребае тянется на юг от Вусане к албанской границе, и из-за неё многие и останавливаются в этом углу Черногории. Дно — луга и сады, которые до сих пор обрабатывают семьи, выгоняющие скот на лето, а склоны — серый известняк Каранфила, вершины, которые видно из обоих наших домов в ясный день.",
        "Это не одна смотровая площадка. Это место, куда входят и где проводят несколько часов, и горы становятся ближе, чем дальше идёшь.",
      ],
      expect: [
        "Ровная прогулка по дну долины, сколько захотите: час или полдня, если продолжить.",
        "Летний катун в верхней части долины — хижины, каменные стены и скот.",
        "И начало серьёзных маршрутов. Каранфил, Волушница, Попадия и Талиянка поднимаются из этой долины, и ни один из них не прогулка по долине.",
      ],
      gettingThere: [
        "На машине из Вусане, по дороге, которая уходит из села к горам. Это горная дорога, и мы скажем, в каком она состоянии в день вашего вопроса, а не будем гадать здесь.",
      ],
      practical: [
        "Долина входит в национальный парк Проклетие, учреждённый в 2009 году и занимающий около 1 660 гектаров в общинах Плав и Гусине.",
        "Билет в парк продаётся онлайн. Проверяют ли его на этом входе и сколько он стоит, на страницах парка не сказано, поэтому спросите нас перед выходом.",
        "Погода здесь меняется быстро. Выходите рано и берите воду и куртку даже в июле.",
      ],
    },

    "ropojana-valley": {
      name: "Долина Ропояне",
      imageAlt: "Долина Ропояне под вершинами Проклетие, в сторону границы с Албанией",
      title: "Долина Ропояне – тихая прогулка за Вусане",
      description:
        "Ропояне — длинная ледниковая долина южнее Вусане, тише Гребае, ведущая к каменным воротам в Албанию. Чего ждать и что оформить заранее.",
      lead: "Тихая соседка Гребае: длинная ледниковая долина к Албании, где горы смыкаются, а дорога кончается.",
      intro: [
        "Ропояне начинается там, где южнее Вусане кончается асфальт. Туристическая организация Гусине описывает её вместе с Гребае как одну из двух ледниковых долин, разделяющих Проклетие с этой стороны границы, и называет обе местом обитания серны, косули и бурого медведя, живущих в парке.",
        "Это и долина, которая ведёт к природным каменным воротам, которые организация называет вторыми из трёх ворот Проклетие — тех, что открываются к равнине Вальбона в Албании.",
      ],
      expect: [
        "Прогулка по долине, тише Гребае и с заметно меньшим числом людей.",
        "Каменные ворота к Албании — для тех, кто идёт так далеко.",
        "После последних домов Вусане сёл нет. Здесь нужно рассчитывать на себя.",
      ],
      gettingThere: [
        "Из Вусане, по дороге, которая продолжается на юг в долину. Чем дальше, тем больше это тропа, а не дорога.",
      ],
      practical: [
        "Переход в Албанию вне официального пункта пропуска требует разрешения пограничной полиции заранее и времени на оформление. Не планируйте сквозной маршрут, рассчитывая на свободный переход.",
        "Ропояне в национальном парке. Условия с билетами на этом входе не подтверждены, поэтому спросите, прежде чем на них полагаться.",
        "Мобильная связь за селом ненадёжна.",
      ],
    },

    "grlja-waterfall": {
      name: "Водопад Грля",
      imageAlt: "Вода падает по скале на водопаде Грля над Вусане",
      title: "Водопад Грля – страница ещё проверяется",
      description:
        "Грля — водопад над Вусане, в сторону долины Ропояне. Мы всё ещё уточняем подход, поэтому страница остаётся черновиком и не опубликована.",
      lead: "Водопад над Вусане, в сторону Ропояне — страница, которую мы ещё проверяем.",
      intro: [
        "Грля — водопад, который чаще всего упоминают рядом с Вусане: вода падает по скале в долине, продолжающейся к Ропояне.",
        "Мы ещё не прошли подход вместе с теми, кто знает его точно, поэтому страница остаётся черновиком. Дальше — только где он находится в ландшафте и каковы подходы к нему, и ничего похожего на описание маршрута.",
      ],
      expect: ["Короткий визит, а не целый день.", "Мокрая скала и скользкие края у водопада."],
      gettingThere: ["Со стороны Вусане, пешком. Точное место начала подхода мы как раз уточняем."],
      practical: [
        "Не считайте эту страницу маршрутом: подход, возможная плата и состояние тропы не подтверждены.",
        "Спросите нас перед выходом, и мы скажем, что знаем на этот день.",
      ],
      missing: ["точное место подхода", "возможная плата", "состояние тропы"],
    },

    "oko-skakavice": {
      name: "Око Скакавице",
      imageAlt: "Прозрачная вода источника Око Скакавице под Вусане",
      title: "Око Скакавице – источник над Вусане",
      description:
        "Око Скакавице — карстовый источник над Вусане с необычно прозрачной и холодной водой. Подход ещё проверяется, страница остаётся черновиком.",
      lead: "Карстовый источник над Вусане, обычно в одной поездке с долиной за ним.",
      intro: [
        "Око Скакавице — источник, который выходит прямо из скалы, а не со склона, поэтому вода в нём такая прозрачная и холодная. Он в той же части округи, что и Ропояне.",
        "Страница остаётся черновиком, пока не подтверждены подход и состояние земли вокруг источника.",
      ],
      expect: ["Короткая остановка, обычно вместе с долиной.", "Холодная прозрачная вода и скользкие камни вокруг."],
      gettingThere: ["В районе Вусане, пешком со стороны села. Точное начало тропы не подтверждено."],
      practical: [
        "Никакие удобства у источника не подтверждены.",
        "Спросите нас перед выходом: лучше отправить вас с актуальными сведениями, чем с этой страницей.",
      ],
      missing: ["начало тропы", "нужен ли гид", "удобства рядом"],
    },

    "ali-pasha-springs": {
      name: "Источники Али-паши",
      imageAlt: "Вода в тени на источниках Али-паши на краю Гусине",
      title: "Источники Али-паши в Гусине – лёгкие полчаса",
      description:
        "Источники на краю Гусине, которые сразу становятся рекой Лючей, отмеченные на карте туристической организации. Самый простой выход из нашего отеля.",
      lead: "Источники на краю Гусине, которые в нескольких шагах становятся рекой Лючей.",
      intro: [
        "Источники бьют сразу за городом и питают Лючу, реку, текущую через Гусине. Туристическая организация отмечает их на своей карте общины — так о них и узнаёт большинство гостей.",
        "Это самый простой выход из отеля: без машины, без планов и с короткой прогулкой обратно в город на кофе.",
      ],
      expect: [
        "Вода прямо из скалы, в тенистой низине.",
        "Короткий визит — получаса хватает, если не задерживаться.",
        "Место, которым пользуются местные, а не аттракцион с кассой.",
      ],
      gettingThere: ["Пешком от отеля Mountain View, на краю города. Из резорта это короткая поездка в Гусине."],
      practical: [
        "Бесплатен ли вход и открыт ли он круглосуточно, община не подтверждала. Спросите нас, и мы проверим перед вашей прогулкой.",
        "Летом возьмите средство от насекомых: у воды и в тени их много.",
      ],
    },

    "hrid-lake": {
      name: "Озеро Хрид",
      imageAlt: "Озеро Хрид в национальном парке Проклетие, в кольце хвойного леса под гребнем",
      title: "Озеро Хрид – маршрут со стороны Плава",
      description:
        "К озеру Хрид подходят со стороны Плава, а не от Вусане. Каков подъём, что парк говорит об озере и что уточнить перед выездом.",
      lead: "Озеро, которое парк называет красивейшим, а подходят к нему со стороны Плава — не с тропы у Вусане.",
      intro: [
        "Хридско озеро находится в общине Плав, в национальном парке Проклетие, и парк указывает его как один из двух своих строгих природных резерватов. Это и озеро, которое материалы парка называют Озером счастья: есть поверье, что купание в нём приносит удачу, здоровье и покой.",
        "Раньше у нас было неверно, и вот исправление: озеро — не трёхчасовая ходьба от тропы у Вусане. Маршрут идёт со стороны Плава, а сама ходьба — короткий маркированный спуск к воде. Цифры выше взяты из описания маршрута национальной туристической организации и со страниц парка, прочитанных в указанную рядом дату.",
      ],
      expect: [
        "Маркированная тропа в одну сторону, в основном вниз: договоритесь о встрече или возвращайтесь тем же путём.",
        "Хвойный лес, источник на середине спуска и озеро в низине под гребнем.",
        "Прохладно даже в августе. Это высота, и она ведёт себя соответственно.",
      ],
      gettingThere: [
        "На машине со стороны Плава до начала тропы над озером. Из обоих домов это значит ехать через Гусине дальше к Плаву, так что не выезжайте в расчёте на тропу у Вусане.",
        "Расстояние и время ходьбы, направление маршрута и маркировка — в блоке выше; дорогу от домов мы не измеряли и придумывать не будем.",
      ],
      practical: [
        "У начала тропы есть питьевая вода и укрытие, на маршруте — источник.",
        "Лучше всего с июня по октябрь. В остальное время снег и лёд могут осложнить путь.",
        "Билет в парк продаётся онлайн. Цена и то, проверяют ли его на этом маршруте, не подтверждены, поэтому спросите перед выходом.",
        "Послеполуденные грозы на этой высоте обычны. Выходите рано и поворачивайте назад, если облака сгущаются.",
      ],
    },
  },

  sq: {
    "grebaje-valley": {
      name: "Lugina e Grebajës",
      imageAlt: "Lugina e Grebajës në Prokletije, me maja gëlqerore mbi fundin e gjelbër të luginës",
      title: "Guida e luginës së Grebajës – ecje, hiking dhe si të arrish",
      description:
        "Shënimet tona për luginën e Grebajës pranë Vusanjes: si është fundi i luginës për ecje, për cilat maja çojnë shtigjet, si është rruga dhe çfarë të kontrollosh përpara nisjes.",
      lead: "Lugina për të cilën vijnë shumica e mysafirëve: fund i gjelbër, mure gëlqerore nga të dyja anët dhe një rrugë që mbaron aty ku fillon ecja.",
      intro: [
        "Grebaja shtrihet në jug nga Vusanja drejt kufirit me Shqipërinë, dhe për shkak të saj shumë njerëz ndalen në këtë cep të Malit të Zi. Fundi është livadh e pemishte, i punuar ende nga familje që nxjerrin bagëti në verë, dhe anët janë gëlqerori gri i Karanfilit — majat që shihen nga të dyja shtëpitë tona në ditë të kthjellët.",
        "Nuk është një pikëpamje e vetme. Është një vend ku hyn dhe kalon disa orë, dhe mali afrohet sa më shumë të ecësh.",
      ],
      expect: [
        "Ecje e rrafshët në fundin e luginës, sa të duash: një orë, ose gjysmë dite nëse vazhdon.",
        "Kullosë verore në pjesën e sipërme — kasolle, mure guri dhe bagëti.",
        "Dhe nisja e shtigjeve serioze. Karanfili, Volušnica, Popadija dhe Talijanka ngjiten nga kjo luginë, dhe asnjëra nuk është shëtitje luginë.",
      ],
      gettingThere: [
        "Me makinë nga Vusanja, në rrugën që del nga fshati drejt maleve. Është rrugë mali, dhe do t'ju themi në çfarë gjendje është ditën që pyesni, në vend që të hamendësojmë këtu.",
      ],
      practical: [
        "Lugina ndodhet brenda Parkut Kombëtar të Prokletijeve, shpallur në 2009 dhe që mbulon rreth 1.660 hektarë në komunat Plavë e Gusinje.",
        "Bileta e parkut shitet online. Nëse kontrollohet në këtë hyrje dhe sa kushton nuk është publikuar në faqet e parkut, prandaj na pyesni përpara nisjes.",
        "Moti ndryshon shpejt këtu. Nisuni herët dhe merrni ujë e xhaketë edhe në korrik.",
      ],
    },

    "ropojana-valley": {
      name: "Lugina e Ropojanës",
      imageAlt: "Lugina e Ropojanës nën majat e Prokletijeve, drejt kufirit me Shqipërinë",
      title: "Lugina e Ropojanës – shëtitja e qetë pas Vusanjes",
      description:
        "Ropojana është lugina e gjatë akullnajore në jug të Vusanjes, më e qetë se Grebaja, që të çon drejt portës shkëmbore për në Shqipëri. Çfarë të presësh dhe çfarë të rregullosh.",
      lead: "Fqinja më e qetë e Grebajës: luginë e gjatë akullnajore drejt Shqipërisë, ku malet afrohen dhe rruga mbaron.",
      intro: [
        "Ropojana fillon aty ku asfalti mbaron në jug të Vusanjes. Organizata turistike e Gusinjës e përshkruan, bashkë me Grebajën, si një nga dy luginat akullnajore që ndajnë Prokletijet në këtë anë të kufirit, dhe i përmend të dyja si habitat i dhive të egra, kaprolleve dhe arinjve kafë që jetojnë në park.",
        "Është edhe lugina që të çon te porta natyrore shkëmbore që organizata e quan e dyta nga tri portat e Prokletijeve — ajo që hapet drejt fushës së Valbonës në Shqipëri.",
      ],
      expect: [
        "Ecje në luginë, më e qetë se Grebaja dhe me shumë më pak njerëz.",
        "Porta shkëmbore drejt Shqipërisë, për ata që ecin deri atje.",
        "Pa fshatra pas shtëpive të fundit të Vusanjes. Këtu duhet të mbështetesh vetë.",
      ],
      gettingThere: [
        "Nga Vusanja, në rrugën që vazhdon në jug në luginë. Sa më larg, aq më shumë sipërfaqja është shteg sesa rrugë.",
      ],
      practical: [
        "Kalimi në Shqipëri jashtë një pike zyrtare kufitare kërkon leje paraprake nga policia kufitare dhe kohë për ta rregulluar. Mos planifiko ecje kalimtare duke llogaritur kalim të lirë.",
        "Ropojana është brenda parkut kombëtar. Kushtet e biletave për këtë hyrje nuk janë konfirmuar, prandaj pyesni përpara se të mbështeteni tek ato.",
        "Sinjali i telefonit është i pasigurt pas fshatit.",
      ],
    },

    "grlja-waterfall": {
      name: "Ujëvara e Grljës",
      imageAlt: "Uji bie mbi shkëmb në ujëvarën e Grljës mbi Vusanje",
      title: "Ujëvara e Grljës – faqe ende në verifikim",
      description:
        "Grlja është ujëvara mbi Vusanje, në drejtim të luginës së Ropojanës. Ende po verifikojmë hyrjen, prandaj faqja është skicë dhe nuk është botuar.",
      lead: "Ujëvarë mbi Vusanje, në drejtim të Ropojanës — një faqe që ende po verifikojmë.",
      intro: [
        "Grlja është ujëvara që përmendet më shpesh bashkë me Vusanjen: ujë që bie mbi shkëmb në luginën që vazhdon drejt Ropojanës.",
        "Nuk e kemi ecur hyrjen me njerëzit që e njohin, prandaj faqja mbetet skicë. Ajo që vijon është ku ndodhet në peizazh dhe si është terreni përreth, dhe asgjë që pretendon të jetë përshkrim shtegu.",
      ],
      expect: ["Vizitë e shkurtër, jo një ditë e tërë.", "Shkëmb i lagësht dhe skaje të rrëshqitshme pranë ujëvarës."],
      gettingThere: ["Nga ana e Vusanjes, në këmbë. Pika e saktë ku fillon ecja është ajo që po verifikojmë."],
      practical: [
        "Mos e trajtoni këtë faqe si shteg: hyrja, ndonjë pagesë dhe gjendja e shtegut nuk janë konfirmuar.",
        "Na pyesni përpara nisjes dhe do t'ju themi çfarë dimë atë ditë.",
      ],
      missing: ["pika e saktë e hyrjes", "ndonjë pagesë", "gjendja e shtegut"],
    },

    "oko-skakavice": {
      name: "Oko Skakavice",
      imageAlt: "Uji i kulluar i burimit Oko Skakavice pranë Vusanjes",
      title: "Oko Skakavice – burim mbi Vusanje",
      description:
        "Oko Skakavice është burim karstik mbi Vusanje, me ujë të kulluar e të ftohtë. Hyrja ende po verifikohet, prandaj faqja mbetet skicë.",
      lead: "Burim karstik mbi Vusanje, zakonisht në të njëjtën shëtitje me luginën pas tij.",
      intro: [
        "Oko Skakavice është burim që del drejt nga shkëmbi dhe jo nga një shpat, prandaj uji është kaq i kulluar dhe i ftohtë. Ndodhet në të njëjtin cep të krahinës si Ropojana.",
        "Faqja mbetet skicë derisa të konfirmohen hyrja dhe gjendja e terrenit rreth burimit.",
      ],
      expect: ["Ndalim i shkurtër, zakonisht bashkë me luginën.", "Ujë i ftohtë e i kulluar, dhe gurë të rrëshqitshëm përreth."],
      gettingThere: ["Në zonën e Vusanjes, në këmbë nga ana e fshatit. Fillimi i saktë i shtegut nuk është konfirmuar."],
      practical: [
        "Asnjë shërbim pranë burimit nuk është konfirmuar.",
        "Na pyesni përpara nisjes: më mirë t'ju dërgojmë me të dhëna të freskëta sesa me këtë faqe.",
      ],
      missing: ["fillimi i shtegut", "nëse duhet guidë", "shërbime përreth"],
    },

    "ali-pasha-springs": {
      name: "Burimet e Ali Pashës",
      imageAlt: "Ujë në hije te burimet e Ali Pashës në skaj të Gusinjës",
      title: "Burimet e Ali Pashës në Gusinje – gjysmë ore e lehtë",
      description:
        "Burimet në skaj të Gusinjës që bëhen menjëherë lumi Ljuça, të shënuara në hartën e organizatës turistike. Shëtitja më e lehtë nga hoteli ynë.",
      lead: "Burime në skaj të Gusinjës që në disa hapa bëhen lumi Ljuça.",
      intro: [
        "Burimet dalin menjëherë mbi qytet dhe ushqejnë Ljuçën, lumin që rrjedh nëpër Gusinje. Organizata turistike i shënon në hartën e saj të komunës, dhe kështu i gjejnë shumica e mysafirëve.",
        "Është shëtitja më e lehtë nga hoteli: pa makinë, pa planifikim, dhe një ecje e shkurtër përsëri në qytet për kafe.",
      ],
      expect: [
        "Ujë që del drejt nga shkëmbi, në një gropë me hije.",
        "Vizitë e shkurtër — gjysmë ore mjafton nëse nuk ndaleni më gjatë.",
        "Vend që e përdorin ata që jetojnë këtu, jo atraksion me portë.",
      ],
      gettingThere: ["Në këmbë nga Hotel Mountain View, në skaj të qytetit. Nga resorti do të thotë një xhiro e shkurtër me makinë në Gusinje."],
      practical: [
        "Nëse vendi vizitohet falas dhe është i hapur gjithë kohës nuk është konfirmuar nga komuna. Na pyesni dhe do ta kontrollojmë përpara se të shkoni.",
        "Në verë merrni sprai kundër insekteve; uji dhe hija i nxjerrin.",
      ],
    },

    "hrid-lake": {
      name: "Liqeni i Hridit",
      imageAlt: "Liqeni i Hridit në Parkun Kombëtar të Prokletijeve, i rrethuar me pyll halor nën kreshtë",
      title: "Liqeni i Hridit – shtegu nga ana e Plavës",
      description:
        "Liqenit të Hridit i afrohen nga ana e Plavës, jo nga Vusanja. Si është ecja, çfarë thotë parku për liqenin dhe çfarë të konfirmosh përpara nisjes.",
      lead: "Liqeni që parku e quan më të bukurin, arrihet nga ana e Plavës — jo nga një shteg në Vusanje.",
      intro: [
        "Hridsko jezero ndodhet në komunën e Plavës, brenda Parkut Kombëtar të Prokletijeve, dhe parku e liston si një nga dy rezervatet e tij strikte të natyrës. Është edhe liqeni që materialet e parkut e quajnë Liqeni i Lumturisë, me besimin e vjetër se larja në të sjell fat, shëndet dhe paqe.",
        "Këtë e kishim gabim më parë, dhe ky është korrigjimi: liqeni nuk është tre orë ecje nga një shteg pranë Vusanjes. Shtegu vjen nga ana e Plavës, dhe vetë ecja është një zbritje e shkurtër dhe e shënuar deri te uji. Shifrat më sipër vijnë nga përshkrimi i shtegut i organizatës kombëtare të turizmit dhe nga faqet e parkut, lexuar në datën që qëndron pranë tyre.",
      ],
      expect: [
        "Shteg i shënuar në një drejtim, kryesisht zbritje — rregulloni transport ose kthehuni me të njëjtën rrugë.",
        "Pyll halor, burim në mes të zbritjes dhe liqeni në një gropë nën kreshtë.",
        "Ajër i freskët edhe në gusht. Kjo është lartësi dhe sillet si e tillë.",
      ],
      gettingThere: [
        "Me makinë nga ana e Plavës deri te nisja e shtegut mbi liqen. Nga të dyja shtëpitë kjo do të thotë të kalosh nëpër Gusinje dhe tutje drejt Plavës, prandaj mos u nisni duke pritur një shteg në Vusanje.",
        "Distanca dhe koha e ecjes, drejtimi i shtegut dhe shënimi janë në panelin më sipër; rrugën nga shtëpitë nuk e kemi matur dhe nuk do ta shpikim.",
      ],
      practical: [
        "Në nisje të shtegut ka ujë të pijshëm dhe strehë, dhe një burim gjatë rrugës.",
        "Më mirë nga qershori deri në tetor. Jashtë këtyre muajve bora dhe akulli mund ta vështirësojnë kalimin.",
        "Bileta e parkut shitet online. Çmimi dhe nëse kontrollohet në këtë shteg nuk janë konfirmuar, prandaj pyesni përpara nisjes.",
        "Stuhitë e pasdites janë të shpeshta në këtë lartësi. Nisuni herët dhe kthehuni nëse retë shtohen.",
      ],
    },
  },
};

export function guidePageCopy(id, language) {
  const pages = GUIDE_PAGE_COPY[language] || GUIDE_PAGE_COPY.en;
  return pages[id] || GUIDE_PAGE_COPY.en[id] || null;
}