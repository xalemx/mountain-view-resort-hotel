// The guide's own words, in the four languages the site is written in.
//
// The LocalPlace records hold the facts: the English name, the distance, the
// driving time, the season, the map query and any photograph. This file holds
// the translations of that text, matched on the record's English name, so the
// guide reads in the visitor's language without the distances drifting apart.
//
// If a place is added in the records and has no entry here, its card simply
// shows the English the record already contains — nothing goes missing.
//
// Walking time is deliberately not invented: a record carries walk_minutes and
// walk_from only where the walk has been checked, and the card shows those
// separately from the driving time.

export const GUIDE_FILTERS = ["easy_walks", "hiking", "family", "sightseeing"];

const PLACE_TEXT = {
  me: {
    "Grebaje Valley": {
      name: "Dolina Grebaje",
      description:
        "Duga zelena dolina zbog koje većina gostiju i dolazi: krečnjački vrhovi sa obje strane, pastirske kolibe, voćnjaci i riječni bazeni tamo gdje put prestaje i počinje pješačenje. Klasičan početak uspona ka Karanfilu i najlakši cijeli popodnevni izlet iz Gusinja.",
      season: "Maj do oktobra",
    },
    "Prokletije National Park": {
      name: "Nacionalni park Prokletije",
      description:
        "Crnogorski nacionalni park na planinskom lancu koji se na albanskom zove Prokletije, proglašen 2009. Snježna polja ostaju duboko u proljeće, staze su obilježene ali rijetko pune, a gornje doline su bez vozila. Pitajte nas za rutu koja odgovara vašoj obući i vašem danu.",
      season: "Maj do oktobra",
    },
    "Hrid Lake": {
      name: "Jezero Hrid",
      description:
        "Malo planinsko jezero visoko nad dolinom, do kojeg se stiže pješke za oko tri sata od početka staze kod Vusanja. Hladna bistra voda, travnata kotlina za odmor i jedan od najširih pogleda u ovom lancu na putu prema gore.",
      season: "Jun do septembra",
      walkFrom: "od početka staze kod Vusanja",
    },
    "Plav Lake": {
      name: "Plavsko jezero",
      description:
        "Ledeničko jezero niz put ka Plavu, sa stazom uz obalu, čamcima za iznajmljivanje ljeti i vodom dovoljno toplom za kupanje od jula. Grad Plav na drugom kraju je mjesto gdje većina gostiju ide po veću kupovinu ili riblji ručak kraj vode.",
      season: "Tokom cijele godine",
    },
    "Ali Pasha's Springs": {
      name: "Ali-pašini izvori",
      description:
        "Grupa izvora koji izbijaju iz stijene odmah iznad grada i odmah se pretvaraju u rijeku Ljuču, sa sjenovitim stolovima gdje mještani provode nedjeljna popodneva. Lako dostupno, svježe ljeti i dobro za djecu.",
      season: "April do novembra",
    },
    "Gusinje town centre": {
      name: "Centar Gusinja",
      description:
        "Mali grad kamenih kuća, pekara, kafića i prodavnica, sagrađen na starom trgovačkom putu između Plava i Albanije. Sve što putniku treba za nekoliko dana je na kratkoj šetnji, a Hotel Mountain View je u samom središtu.",
      season: "Tokom cijele godine",
    },
  },
  ru: {
    "Grebaje Valley": {
      name: "Долина Гребае",
      description:
        "Длинная зелёная долина, ради которой приезжает большинство гостей: стены известняковых вершин по обе стороны, пастушьи хижины, сады и речные заводи там, где кончается дорога и начинается ходьба. Классическое начало восхождений к Каранфилу и самый простой способ провести здесь целый день.",
      season: "С мая по октябрь",
    },
    "Prokletije National Park": {
      name: "Национальный парк Проклетие",
      description:
        "Национальный парк Черногории на хребте, который по-албански называют Проклятыми горами, основан в 2009 году. Снежники лежат до поздней весны, тропы размечены, но почти безлюдны, а верхние долины закрыты для машин. Спросите нас о маршруте под вашу обувь и ваш день.",
      season: "С мая по октябрь",
    },
    "Hrid Lake": {
      name: "Озеро Хрид",
      description:
        "Небольшое горное озеро высоко над долиной, куда поднимаются пешком примерно за три часа от начала тропы у Вусане. Холодная прозрачная вода, травяная чаша для отдыха и один из самых широких видов в этом хребте по дороге наверх.",
      season: "С июня по сентябрь",
      walkFrom: "от начала тропы у Вусане",
    },
    "Plav Lake": {
      name: "Плавское озеро",
      description:
        "Ледниковое озеро вниз по дороге к Плаву: дорожка вдоль берега, лодки в аренду летом и вода, достаточно тёплая для купания с июля. Город Плав на другом конце — там большинство гостей делают большие покупки или обедают рыбой у воды.",
      season: "Круглый год",
    },
    "Ali Pasha's Springs": {
      name: "Источники Али-паши",
      description:
        "Группа источников, бьющих из скалы сразу за городом и тут же превращающихся в реку Люча, с тенистыми столиками, где местные проводят воскресные дни. Легко добраться, прохладно летом и хорошо с детьми.",
      season: "С апреля по ноябрь",
    },
    "Gusinje town centre": {
      name: "Центр Гусине",
      description:
        "Небольшой город каменных домов, пекарен, кафе и магазинов, построенный на старом торговом пути между Плавом и Албанией. Всё, что нужно путешественнику на несколько дней, в нескольких минутах ходьбы, а отель Mountain View стоит в самом центре.",
      season: "Круглый год",
    },
  },
  sq: {
    "Grebaje Valley": {
      name: "Lugina e Grebajës",
      description:
        "Lugina e gjatë e gjelbër për të cilën vijnë shumica e mysafirëve: mure majash gëlqerore nga të dyja anët, kasolle blegtorësh, kopshte dhe pellgje lumi aty ku mbaron rruga dhe fillon ecja. Nisja klasike për ngjitjet drejt Karanfilit dhe pasditeja më e lehtë për t'u bërë nga Gusinja.",
      season: "Maji deri në tetor",
    },
    "Prokletije National Park": {
      name: "Parku Kombëtar i Prokletijeve",
      description:
        "Parku kombëtar i Malit të Zi mbi bjeshkën që në shqip quhet Bjeshkët e Nemuna, shpallur në 2009. Fushat e borës qëndrojnë deri në pranverë të vonë, shtigjet janë të shënuara por rrallë të mbushura, dhe luginat e sipërme mbahen pa makina. Na pyesni për itinerarin që i përshtatet këpucëve dhe ditës tuaj.",
      season: "Maji deri në tetor",
    },
    "Hrid Lake": {
      name: "Liqeni i Hridit",
      description:
        "Një liqen i vogël mali lart mbi luginë, ku arrihet në këmbë për rreth tre orë nga nisja e shtegut afër Vusanjes. Ujë i ftohtë e i kulluar, një gropë me bar për pushim dhe një nga pamjet më të gjera të bjeshkës gjatë rrugës lart.",
      season: "Qershori deri në shtator",
      walkFrom: "nga nisja e shtegut afër Vusanjes",
    },
    "Plav Lake": {
      name: "Liqeni i Plavës",
      description:
        "Një liqen akullnajor poshtë rrugës drejt Plavës, me shteg përgjatë bregut, barka me qira në verë dhe ujë mjaft i ngrohtë për t'u larë nga korriku. Qyteti i Plavës në skajin tjetër është aty ku shumica e mysafirëve shkojnë për pazare më të mëdha ose një drekë peshku buzë ujit.",
      season: "Gjatë gjithë vitit",
    },
    "Ali Pasha's Springs": {
      name: "Burimet e Ali Pashës",
      description:
        "Një grumbull burimesh që dalin nga shkëmbi menjëherë jashtë qytetit dhe kthehen aty për aty në lumin Ljuça, me tavolina në hije ku vendasit kalojnë të dielat. Arrihet lehtë, freskët në verë dhe e mirë për fëmijët.",
      season: "Prilli deri në nëntor",
    },
    "Gusinje town centre": {
      name: "Qendra e Gusinjës",
      description:
        "Një qytet i vogël me shtëpi guri, furra buke, kafene dhe dyqane, ndërtuar mbi rrugën e vjetër tregtare midis Plavës dhe Shqipërisë. Gjithçka që i duhet një udhëtari për disa ditë është brenda një shëtitjeje të shkurtër, dhe Hotel Mountain View ndodhet në mes të tij.",
      season: "Gjatë gjithë vitit",
    },
  },
};

// The words for one place in the visitor's language, falling back to what the
// record itself says in English.
export function placeText(place, language) {
  const translated = PLACE_TEXT[language]?.[place.name];

  return {
    name: translated?.name || place.name,
    description: translated?.description || place.description,
    season: translated?.season || place.best_season || "",
    walkFrom: translated?.walkFrom || place.walk_from || "",
  };
}

// 180 becomes "3 h", 210 becomes "3 h 30 min".
export function formatMinutes(minutes, t) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (!hours) return `${rest} ${t.guide.minutesShort}`;
  if (!rest) return `${hours} ${t.guide.hoursShort}`;

  return `${hours} ${t.guide.hoursShort} ${rest} ${t.guide.minutesShort}`;
}