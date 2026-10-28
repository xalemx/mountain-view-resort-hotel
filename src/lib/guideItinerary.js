// The three-day plan, in the four languages the site is written in.
//
// Each day names the places it uses by their stable id, so the page links to the
// detailed write-ups instead of repeating them, and so a place that is not
// published is never promised here. Distances, times and grades are not repeated:
// they live in src/lib/guideFacts.js.

export const ITINERARY_COPY = {
  en: {
    eyebrow: "Suggested stay",
    title: "Three Days in Gusinje – A Flexible Plan",
    description:
      "Two ways to spend three days around Gusinje: a lighter plan built on the town, the springs and the lake shore, and an active one on the valley walks and the lake above Plav. Weather alternatives and when you need a car.",
    lead: "Three days is enough for the valley, the lake and one proper walk — and short enough that the weather can take one of them away.",
    intro: [
      "We have written this as two versions of the same three days: one for guests who want to be out for a few hours and back for the afternoon, and one for guests who came to walk. Both start from either house, and neither needs to be booked with us in advance.",
      "Each day names the places we have written up, so you can read the detail before you decide. Where a day needs a car, it says so.",
    ],
    versions: {
      lighter: {
        label: "Lighter version",
        summary: "Two or three hours out each day, back at the house for the afternoon.",
        days: [
          {
            title: "The town, and the springs at its edge",
            text: "Start on foot in Gusinje: the bakery, the small streets, a coffee. Walk out to the springs where the Ljuča comes out of the rock, and be back in town in time for lunch. From the hotel this is all on foot; from the resort it is a short drive in.",
            places: ["gusinje-town", "ali-pasha-springs"],
            weather: "If it rains, keep the town half and leave the springs for another day; the cafés and the hotel lounge are the fallback.",
            transport: "No car needed. From Mountain View Resort, drive into Gusinje and park in the centre.",
          },
          {
            title: "Plav lake, and the drive that leads to it",
            text: "Drive towards Plav and spend the day around the lake: a walk along the shore, lunch by the water, and a look at the town at the far end. It is the day to take slowly if the weather is grey.",
            places: ["plav-lake"],
            weather: "The lake is the better choice in unsettled weather: you can stay in the car, stop for coffee and turn back whenever you like.",
            transport: "Car needed. Ask us about a transfer if you are arriving without one.",
          },
          {
            title: "The floor of the Grebaje valley",
            text: "Drive up into the valley and walk as far as you feel like on the flat floor, with the walls of the Karanfili group above you. No climbing, no route-finding, and you can turn around at any point.",
            places: ["grebaje-valley"],
            weather: "In rain the valley road and the floor get muddy; swap this day with the town day if the forecast is poor.",
            transport: "Car needed to reach the valley. Ask us about the state of the road that week.",
          },
        ],
      },
      active: {
        label: "Active version",
        summary: "A full morning or most of a day on foot, with the afternoons free.",
        days: [
          {
            title: "Grebaje valley, and up towards the peaks",
            text: "Walk the valley floor first, then take one of the marked routes above it if the conditions are right — Karanfili, Volušnica, Popadija and Talijanka all start from this valley, and all of them are mountain routes rather than valley walks. Tell us the night before and we will tell you honestly whether the day suits you.",
            places: ["grebaje-valley"],
            weather: "Thunderstorms build in the afternoon here. Start at first light, and choose the valley floor only if the cloud is low.",
            transport: "Car needed. Ask us before you rely on the upper routes; they are not a walk in poor visibility.",
          },
          {
            title: "Ropojana valley, the quiet one",
            text: "A longer, quieter valley walk in the direction of the border, with the rock gateway towards Valbona at the far end. Fewer people than Grebaje, no villages past Vusanje, and nowhere to buy anything — take what you need.",
            places: ["ropojana-valley"],
            weather: "Rain makes the track greasy and the river higher. Keep this for a dry day, or walk only the first part.",
            transport: "Car needed to the valley, then on foot. Do not plan to cross into Albania: that needs permission arranged in advance.",
          },
          {
            title: "Hrid lake, from the Plav side",
            text: "Drive round through Plav to the trailhead above the lake and walk down to the water. The route is marked and walked in one direction, so either arrange a pick-up or walk back up the way you came. Cool, forested and high, which is what makes it worth the drive.",
            places: ["hrid-lake"],
            weather: "This one is high ground: snow can close it outside the summer months, and afternoon storms are common. Give it the best forecast of the three days.",
            transport: "Car needed, and a full half day with the drive. Ask us to confirm the trailhead and the park ticket before you go.",
          },
        ],
      },
    },
    notes: [
      "The days are suggestions, not a package. Nothing here is booked, and no guide, vehicle or ticket is included.",
      "The order is worth swapping to suit the weather: the lake and the high routes want the clearest day.",
      "Snow can close the upper routes outside the summer months, and a valley road can be rough after rain. Ask us the day before.",
      "Two of the three days in each version need a car. If you are arriving without one, tell us and we will say what can be arranged.",
    ],
  },

  me: {
    eyebrow: "Predlog boravka",
    title: "Tri dana u Gusinju – fleksibilan plan",
    description:
      "Dva načina da provedete tri dana oko Gusinja: lakši plan sa gradom, izvorima i obalom jezera, i aktivni sa šetnjama dolinom i jezerom iznad Plava. Alternative za loše vrijeme i kada je potreban auto.",
    lead: "Tri dana su dovoljna za dolinu, jezero i jedno pravo pješačenje — i kratka dovoljno da vrijeme odnese jedan od njih.",
    intro: [
      "Napisali smo ovo kao dvije verzije istih tri dana: jedna je za goste koji žele nekoliko sati vani i popodne kod kuće, druga za goste koji su došli da pješače. Obje počinju iz obje kuće i ništa ne treba unaprijed rezervisati.",
      "Svaki dan navodi mjesta o kojima smo pisali, pa detalje pročitajte prije nego što odlučite. Gdje je potreban auto, to i piše.",
    ],
    versions: {
      lighter: {
        label: "Lakša verzija",
        summary: "Dva-tri sata vani svakog dana, popodne kod kuće.",
        days: [
          {
            title: "Grad i izvori na njegovoj ivici",
            text: "Počnite pješke po Gusinju: pekara, male ulice, kafa. Prošetajte do izvora gdje Ljuča izbija iz stijene i vratite se na ručak. Iz hotela je sve pješke; iz resorta je kratka vožnja.",
            places: ["gusinje-town", "ali-pasha-springs"],
            weather: "Ako pada kiša, zadržite dio u gradu, a izvore ostavite za drugi dan; kafići i salon hotela su rezerva.",
            transport: "Auto nije potreban. Iz Mountain View Resorta vozite do Gusinja i parkirate u centru.",
          },
          {
            title: "Plavsko jezero i put do njega",
            text: "Vozite prema Plavu i provedite dan oko jezera: šetnja uz obalu, ručak kraj vode i pogled na grad na drugom kraju. Ovo je dan koji treba uzeti polako ako je vrijeme sivo.",
            places: ["plav-lake"],
            weather: "Jezero je bolji izbor kada je vrijeme nestabilno: možete ostati u autu, stati na kafu i vratiti se kada želite.",
            transport: "Potreban je auto. Pitajte nas za prevoz ako dolazite bez njega.",
          },
          {
            title: "Dno doline Grebaje",
            text: "Vozite se u dolinu i šetajte po ravnom dnu koliko želite, sa zidovima Karanfila nad sobom. Bez penjanja i bez traženja puta, a možete se okrenuti u svakom trenutku.",
            places: ["grebaje-valley"],
            weather: "Na kiši se put i dno doline raskvase; zamijenite ovaj dan sa danom u gradu ako je prognoza loša.",
            transport: "Auto je potreban do doline. Pitajte nas o stanju puta te nedjelje.",
          },
        ],
      },
      active: {
        label: "Aktivna verzija",
        summary: "Cijelo jutro ili veći dio dana pješke, popodne slobodno.",
        days: [
          {
            title: "Dolina Grebaje i uspon prema vrhovima",
            text: "Prvo prođite dno doline, a zatim uzmite jednu od označenih ruta iznad ako uslovi dozvoljavaju — Karanfili, Volušnica, Popadija i Talijanka sve počinju iz ove doline i sve su planinske rute, a ne šetnje. Recite nam večer prije i iskreno ćemo vam reći odgovara li vam dan.",
            places: ["grebaje-valley"],
            weather: "Popodnevne oluje su ovdje česte. Krenite u svitanje, a ako su oblaci niski, ostajte na dnu doline.",
            transport: "Potreban je auto. Pitajte nas prije nego se oslonite na gornje rute; one nijesu šetnja pri slaboj vidljivosti.",
          },
          {
            title: "Dolina Ropojane, tiša",
            text: "Duža i tiša šetnja dolinom prema granici, sa kamenim vratima prema Valboni na kraju. Manje ljudi nego u Grebaji, nema sela poslije Vusanja i nema gdje ništa kupiti — ponesite što vam treba.",
            places: ["ropojana-valley"],
            weather: "Kiša čini stazu skliskom i rijeku većom. Ostavite ovo za suh dan ili prošetajte samo prvi dio.",
            transport: "Auto do doline, zatim pješke. Ne planirajte prelazak u Albaniju: za to treba dozvola uređena unaprijed.",
          },
          {
            title: "Jezero Hrid, sa plavske strane",
            text: "Vozite preko Plava do početka staze iznad jezera i spustite se do vode. Ruta je označena i ide u jednom smjeru, pa dogovorite prevoz ili se vratite istim putem. Svježe, šumovito i visoko — zato se i vozi tako daleko.",
            places: ["hrid-lake"],
            weather: "Ovo je visina: snijeg je van ljeta može zatvoriti, a popodnevne oluje su česte. Ostavite joj najbolju prognozu od tri dana.",
            transport: "Potreban je auto i pola dana sa vožnjom. Pitajte nas da potvrdimo početak staze i ulaznicu parka.",
          },
        ],
      },
    },
    notes: [
      "Dani su predlog, ne paket. Ništa ovdje nije rezervisano i nijedan vodič, vozilo ni ulaznica nijesu uključeni.",
      "Redoslijed vrijedi zamijeniti prema vremenu: jezero i visoke rute traže najvedriji dan.",
      "Snijeg van ljeta može zatvoriti gornje rute, a put kroz dolinu može biti loš poslije kiše. Pitajte nas dan prije.",
      "Dva od tri dana u svakoj verziji traže auto. Ako dolazite bez njega, recite nam i reći ćemo šta se može dogovoriti.",
    ],
  },

  ru: {
    eyebrow: "Предложение по проживанию",
    title: "Три дня в Гусине – гибкий план",
    description:
      "Два варианта трёх дней вокруг Гусине: спокойный — город, источники и берег озера, и активный — прогулки по долинам и озеро над Плавом. Альтернативы на случай погоды и когда нужна машина.",
    lead: "Трёх дней хватает на долину, озеро и один настоящий поход — и это достаточно коротко, чтобы погода отняла один из них.",
    intro: [
      "Мы написали это как две версии одних и тех же трёх дней: одна для гостей, которым хватает нескольких часов на выезд и полдня дома, другая для тех, кто приехал ходить. Обе начинаются из любого нашего дома, и ничего не нужно бронировать заранее.",
      "В каждом дне названы места, о которых мы написали, чтобы вы прочли подробности до решения. Где нужна машина, там это сказано.",
    ],
    versions: {
      lighter: {
        label: "Спокойный вариант",
        summary: "Два-три часа на выезде каждый день, полдень дома.",
        days: [
          {
            title: "Город и источники на его краю",
            text: "Начните пешком по Гусине: пекарня, узкие улицы, кофе. Дойдите до источников, где Люча выходит из скалы, и вернитесь к обеду. Из отеля всё пешком, из резорта — короткая поездка.",
            places: ["gusinje-town", "ali-pasha-springs"],
            weather: "Если пойдёт дождь, оставьте городскую часть, а источники перенесите на другой день; кафе и гостиная отеля — запасной вариант.",
            transport: "Машина не нужна. Из Mountain View Resort доезжайте до Гусине и паркуйтесь в центре.",
          },
          {
            title: "Плавское озеро и дорога к нему",
            text: "Поезжайте в сторону Плава и проведите день у озера: прогулка по берегу, обед у воды, город на другом конце. Этот день стоит брать неспешно, если небо серое.",
            places: ["plav-lake"],
            weather: "Озеро — лучший выбор при неустойчивой погоде: можно остаться в машине, остановиться на кофе и повернуть назад когда угодно.",
            transport: "Нужна машина. Спросите нас о трансфере, если приезжаете без неё.",
          },
          {
            title: "Дно долины Гребае",
            text: "Поднимитесь в долину и идите по ровному дну, сколько захочется, со стенами Каранфила над головой. Без подъёмов и без поиска дороги, развернуться можно в любой момент.",
            places: ["grebaje-valley"],
            weather: "В дождь дорога и дно долины размокают; поменяйте этот день с городским, если прогноз плохой.",
            transport: "Нужна машина до долины. Спросите нас о состоянии дороги на этой неделе.",
          },
        ],
      },
      active: {
        label: "Активный вариант",
        summary: "Полное утро или большая часть дня пешком, после обеда свободно.",
        days: [
          {
            title: "Долина Гребае и подъём к вершинам",
            text: "Сначала пройдите дно долины, затем возьмите один из маркированных маршрутов выше, если позволяют условия — Каранфил, Волушница, Попадия и Талиянка начинаются из этой долины, и все они горные маршруты, а не прогулки. Скажите нам вечером накануне, и мы честно ответим, подходит ли вам этот день.",
            places: ["grebaje-valley"],
            weather: "Послеполуденные грозы здесь обычны. Выходите на рассвете, а если облака низко, оставайтесь на дне долины.",
            transport: "Нужна машина. Спросите нас, прежде чем рассчитывать на верхние маршруты: при плохой видимости это не прогулка.",
          },
          {
            title: "Долина Ропояне, тихая",
            text: "Более длинная и тихая прогулка по долине в сторону границы, с каменными воротами к Вальбоне на дальнем конце. Людей меньше, чем в Гребае, после Вусане сёл нет, и купить нечего — берите всё с собой.",
            places: ["ropojana-valley"],
            weather: "Дождь делает тропу скользкой, а реку полнее. Оставьте это на сухой день или пройдите только начало.",
            transport: "Нужна машина до долины, дальше пешком. Не планируйте переход в Албанию: на него нужно разрешение, оформленное заранее.",
          },
          {
            title: "Озеро Хрид, со стороны Плава",
            text: "Проедьте через Плав к началу тропы над озером и спуститесь к воде. Маршрут маркирован и идёт в одну сторону, поэтому договоритесь о встрече или возвращайтесь тем же путём. Прохладно, лесисто и высоко — ради этого и стоит ехать.",
            places: ["hrid-lake"],
            weather: "Это высота: вне лета снег может закрыть маршрут, а послеполуденные грозы часты. Отдайте озеру лучший прогноз из трёх дней.",
            transport: "Нужна машина и полдня с дорогой. Попросите нас подтвердить начало тропы и билет в парк.",
          },
        ],
      },
    },
    notes: [
      "Дни — предложение, а не пакет. Здесь ничего не забронировано, и ни гид, ни машина, ни билет не включены.",
      "Порядок стоит менять под погоду: озеро и высокие маршруты хотят самый ясный день.",
      "Вне лета снег может закрыть верхние маршруты, а дорога в долину — быть плохой после дождя. Спросите нас за день.",
      "Два дня из трёх в каждом варианте требуют машины. Если вы приезжаете без неё, скажите, и мы ответим, что можно устроить.",
    ],
  },

  sq: {
    eyebrow: "Qëndrim i sugjeruar",
    title: "Tre ditë në Gusinje – plan fleksibël",
    description:
      "Dy mënyra për tre ditë rreth Gusinjës: plan i lehtë me qytetin, burimet dhe bregun e liqenit, dhe një plan aktiv me ecjet në luginë dhe liqenin mbi Plavë. Alternativa për motin dhe kur duhet makinë.",
    lead: "Tre ditë mjaftojnë për luginën, liqenin dhe një ecje të mirë — dhe janë aq pak sa moti mund të marrë njërën prej tyre.",
    intro: [
      "E kemi shkruar si dy versione të të njëjtave tre ditë: njëra për mysafirë që duan të dalin disa orë dhe të kthehen pasdite, tjetra për ata që kanë ardhur të ecin. Të dyja nisin nga secila shtëpi dhe asgjë nuk duhet rezervuar më parë.",
      "Çdo ditë përmend vendet për të cilat kemi shkruar, që t'i lexoni hollësitë përpara se të vendosni. Aty ku duhet makinë, e thotë.",
    ],
    versions: {
      lighter: {
        label: "Versioni i lehtë",
        summary: "Dy-tre orë jashtë çdo ditë, pasdite në shtëpi.",
        days: [
          {
            title: "Qyteti dhe burimet në skaj të tij",
            text: "Nisuni në këmbë në Gusinje: furra e bukës, rrugët e vogla, një kafe. Ecni deri te burimet ku Ljuça del nga shkëmbi dhe kthehuni për drekë. Nga hoteli gjithçka bëhet në këmbë; nga resorti është një xhiro e shkurtër me makinë.",
            places: ["gusinje-town", "ali-pasha-springs"],
            weather: "Nëse bie shi, mbani pjesën e qytetit dhe lërini burimet për një ditë tjetër; kafenetë dhe salloni i hotelit janë zgjidhja.",
            transport: "Nuk duhet makinë. Nga Mountain View Resort shkoni me makinë në Gusinje dhe parkoni në qendër.",
          },
          {
            title: "Liqeni i Plavës dhe rruga drejt tij",
            text: "Shkoni drejt Plavës dhe kaloni ditën rreth liqenit: ecje përgjatë bregut, drekë buzë ujit dhe një vështrim nga qyteti në skajin tjetër. Kjo është dita për t'u marrë me qetësi kur moti është i vrenjtur.",
            places: ["plav-lake"],
            weather: "Liqeni është zgjedhja më e mirë kur moti është i pasigurt: mund të rrini në makinë, të ndaleni për kafe dhe të ktheheni kur të doni.",
            transport: "Duhet makinë. Na pyesni për transport nëse vini pa të.",
          },
          {
            title: "Fundi i luginës së Grebajës",
            text: "Shkoni me makinë në luginë dhe ecni në fundin e rrafshët sa të doni, me muret e Karanfilit sipër. Pa ngjitje dhe pa kërkuar shteg, dhe mund të ktheheni në çdo moment.",
            places: ["grebaje-valley"],
            weather: "Në shi rruga dhe fundi i luginës bëhen baltë; ndërroni këtë ditë me ditën e qytetit nëse prognoza është e dobët.",
            transport: "Duhet makinë deri në luginë. Na pyesni për gjendjen e rrugës atë javë.",
          },
        ],
      },
      active: {
        label: "Versioni aktiv",
        summary: "Një mëngjes i plotë ose pjesa më e madhe e ditës në këmbë, pasditet të lira.",
        days: [
          {
            title: "Lugina e Grebajës dhe ngjitja drejt majave",
            text: "Ecni fillimisht fundin e luginës, pastaj merrni një nga shtigjet e shënuar sipër nëse kushtet lejojnë — Karanfili, Volušnica, Popadija dhe Talijanka nisin të gjitha nga kjo luginë, dhe të gjitha janë shtigje mali, jo shëtitje. Na thoni mbrëmjen përpara dhe do t'ju themi sinqerisht nëse dita ju përshtatet.",
            places: ["grebaje-valley"],
            weather: "Stuhitë e pasdites janë të shpeshta këtu. Nisuni në agim, dhe nëse retë janë të ulëta, qëndroni në fund të luginës.",
            transport: "Duhet makinë. Na pyesni përpara se të mbështeteni te shtigjet e sipërme; ato nuk janë shëtitje me dukshmëri të dobët.",
          },
          {
            title: "Lugina e Ropojanës, më e qeta",
            text: "Ecje më e gjatë e më e qetë në luginë drejt kufirit, me portën shkëmbore drejt Valbonës në skaj. Më pak njerëz se në Grebajë, pa fshatra pas Vusanjes dhe pa vend për të blerë — merrni çfarë ju duhet.",
            places: ["ropojana-valley"],
            weather: "Shiu e bën shtegun të rrëshqitshëm dhe lumin më të madh. Lëreni për ditë të thatë, ose ecni vetëm pjesën e parë.",
            transport: "Duhet makinë deri në luginë, pastaj në këmbë. Mos planifikoni kalim në Shqipëri: për atë duhet leje e rregulluar më parë.",
          },
          {
            title: "Liqeni i Hridit, nga ana e Plavës",
            text: "Shkoni me makinë nëpër Plavë deri te nisja e shtegut mbi liqen dhe zbritni te uji. Shtegu është i shënuar dhe ecet në një drejtim, prandaj ose rregulloni transport ose kthehuni me të njëjtën rrugë. I freskët, me pyll dhe i lartë — prandaj ia vlen rruga.",
            places: ["hrid-lake"],
            weather: "Kjo është lartësi: jashtë verës bora mund ta mbyllë, dhe stuhitë e pasdites janë të shpeshta. Jepini prognozën më të mirë të tri ditëve.",
            transport: "Duhet makinë dhe gjysmë dite me rrugën. Na pyesni të konfirmojmë nisjen e shtegut dhe biletën e parkut.",
          },
        ],
      },
    },
    notes: [
      "Ditët janë sugjerim, jo paketë. Asgjë nuk është rezervuar dhe as guidë, as makinë, as biletë nuk përfshihen.",
      "Renditja ia vlen të ndërrohet sipas motit: liqeni dhe shtigjet e larta duan ditën më të kthjellët.",
      "Jashtë verës bora mund të mbyllë shtigjet e sipërme, dhe rruga e luginës mund të jetë e keqe pas shiut. Na pyesni një ditë përpara.",
      "Dy nga tri ditët në secilin version kërkojnë makinë. Nëse vini pa të, na thoni dhe do t'ju themi çfarë mund të rregullohet.",
    ],
  },
};

export function itineraryCopy(language) {
  return ITINERARY_COPY[language] || ITINERARY_COPY.en;
}