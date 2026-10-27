// The privacy page, written from what this website actually does: which fields
// the enquiry form collects, who can read them (the owner's account only, see
// the Enquiry rules in base44/entities/Enquiry.jsonc), where the maps links lead,
// and what the browser stores.
//
// The owner is asked to confirm the retention sentence in "How long we keep it",
// so the page can be brought fully into line with their own practice.

export const PRIVACY_COPY = {
  en: {
    eyebrow: "Privacy",
    title: "How we handle your details",
    intro:
      "The short version: we collect what we need to answer your request and arrange your stay, only the family can read it, and we never sell it or share it for advertising.",
    sections: [
      {
        title: "What we collect when you write to us",
        text: "Your name, your email address and, if you give one, your phone number. The house you are asking about, your arrival and departure dates, how many adults and children are coming, the children's ages if you tell us, anything you write in the notes, how you would rather be answered (WhatsApp or email), and the language you read the site in.",
      },
      {
        title: "Why we collect it",
        text: "To answer you, to send you an offer and to arrange your stay. When a request arrives, the host is alerted by email. Your details are not used to build a profile, and you are not added to any mailing list.",
      },
      {
        title: "Who can see it",
        text: "Your request is stored in this website's own database, and only the owner's account on the site can open it. For requests sent through this website there is no agency and no booking platform in the middle.",
      },
      {
        title: "How long we keep it",
        text: "While your stay is being arranged, and afterwards as part of our guest records, so that we recognise you if you come back. Ask us to delete your details and we will.",
      },
      {
        title: "Payments",
        text: "You pay for your stay on arrival at the property, to the host, and we confirm how you can pay with your offer. This website never asks for card details and takes no payment itself.",
      },
      {
        title: "Maps, language and cookies",
        text: "We set no advertising or tracking cookies. The site remembers the language you chose in your own browser. When you follow a directions link, you leave this site and Google Maps opens, and it sees your request exactly as any website you visit would. Our platform keeps anonymous counts of which pages are read.",
      },
      {
        title: "Your choices",
        text: "Ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. WhatsApp or a phone call is the quickest way, and both are on the contact page.",
      },
    ],
    contactTitle: "Questions about your data",
    contactText: "Write to us on WhatsApp or call, and the family that keeps these records will answer.",
    updated: "Last updated 27 October 2026",
  },

  me: {
    eyebrow: "Privatnost",
    title: "Kako čuvamo vaše podatke",
    intro:
      "Kratko: prikupljamo samo ono što nam treba da odgovorimo na zahtjev i dogovorimo boravak, čita ih samo porodica, i nikada ih ne prodajemo niti dijelimo za reklame.",
    sections: [
      {
        title: "Šta prikupljamo kada nam pišete",
        text: "Ime, email adresu i, ako je date, telefonski broj. Kuću o kojoj pitate, datume dolaska i odlaska, broj odraslih i djece, uzrast djece ako nam ga navedete, sve što napišete u napomeni, način na koji želite odgovor (WhatsApp ili email) i jezik na kojem čitate sajt.",
      },
      {
        title: "Zašto ih prikupljamo",
        text: "Da vam odgovorimo, pošaljemo ponudu i dogovorimo boravak. Kada zahtjev dođe, domaćin o tome dobija email. Podaci se ne koriste za profilisanje i ne dodajemo vas ni na kakvu listu za slanje.",
      },
      {
        title: "Ko ih može vidjeti",
        text: "Zahtjev se čuva u bazi ovog sajta, a otvara ga samo račun vlasnika. Za zahtjeve poslane preko ovog sajta nema agencije niti platforme za rezervacije u sredini.",
      },
      {
        title: "Koliko dugo ih čuvamo",
        text: "Dok se boravak dogovara, a zatim kao dio naše evidencije gostiju, da vas prepoznamo ako se vratite. Zatražite brisanje i obrisaćemo ih.",
      },
      {
        title: "Plaćanje",
        text: "Boravak plaćate po dolasku u objektu, domaćinu, a način plaćanja potvrđujemo uz ponudu. Ovaj sajt nikada ne traži podatke kartice i sam ne naplaćuje ništa.",
      },
      {
        title: "Mape, jezik i kolačići",
        text: "Ne postavljamo reklamne ni tracking kolačiće. Sajt pamti izabrani jezik u vašem pregledaču. Kada otvorite link za navigaciju, napuštate ovaj sajt i otvara se Google Maps, koji vidi vaš zahtjev kao i svaki drugi sajt koji posjetite. Naša platforma vodi anonimno brojanje čitanih stranica.",
      },
      {
        title: "Vaš izbor",
        text: "Zatražite kopiju onoga što čuvamo o vama, ispravku ili brisanje. Najbrže je preko WhatsAppa ili telefonom, a oba su na stranici Kontakt.",
      },
    ],
    contactTitle: "Pitanja o vašim podacima",
    contactText: "Pišite nam na WhatsApp ili pozovite, i odgovoriće porodica koja vodi ovu evidenciju.",
    updated: "Posljednja izmjena 27. oktobar 2026.",
  },

  ru: {
    eyebrow: "Приватность",
    title: "Как мы обращаемся с вашими данными",
    intro:
      "Коротко: мы собираем только то, что нужно, чтобы ответить на запрос и договориться о проживании, читает это только семья, и мы никогда не продаём и не передаём данные для рекламы.",
    sections: [
      {
        title: "Что мы собираем, когда вы нам пишете",
        text: "Имя, адрес электронной почты и, если вы его указали, номер телефона. Дом, о котором вы спрашиваете, даты приезда и отъезда, число взрослых и детей, возраст детей, если вы его указали, всё, что вы написали в примечании, способ ответа (WhatsApp или email) и язык, на котором вы читаете сайт.",
      },
      {
        title: "Зачем мы их собираем",
        text: "Чтобы ответить вам, отправить предложение и договориться о проживании. Когда запрос приходит, хозяин получает письмо. Данные не используются для профилирования, и мы не добавляем вас ни в какие рассылки.",
      },
      {
        title: "Кто их видит",
        text: "Запрос хранится в собственной базе этого сайта, и открыть его может только аккаунт владельца. Для запросов, отправленных через этот сайт, посредников и систем бронирования нет.",
      },
      {
        title: "Сколько мы их храним",
        text: "Пока идёт согласование проживания, а затем как часть наших записей о гостях, чтобы узнать вас при возвращении. Попросите удалить данные, и мы это сделаем.",
      },
      {
        title: "Оплата",
        text: "Вы платите за проживание по приезде на месте, хозяину, а способ оплаты подтверждаем в предложении. Этот сайт никогда не запрашивает данные карты и сам платежей не принимает.",
      },
      {
        title: "Карты, язык и файлы cookie",
        text: "Мы не ставим рекламные и отслеживающие файлы cookie. Сайт запоминает выбранный язык в вашем браузере. Открывая ссылку с маршрутом, вы покидаете этот сайт и открывается Google Maps, который видит ваш запрос так же, как любой посещаемый сайт. Наша платформа ведёт анонимный подсчёт прочитанных страниц.",
      },
      {
        title: "Ваш выбор",
        text: "Запросите копию того, что мы о вас храним, исправление или удаление. Быстрее всего через WhatsApp или по телефону, оба указаны на странице Контакты.",
      },
    ],
    contactTitle: "Вопросы о ваших данных",
    contactText: "Напишите нам в WhatsApp или позвоните, и ответит семья, которая ведёт эти записи.",
    updated: "Обновлено 27 октября 2026",
  },

  sq: {
    eyebrow: "Privatësia",
    title: "Si i trajtojmë të dhënat tuaja",
    intro:
      "Shkurt: mbledhim vetëm atë që na duhet për t'iu përgjigjur kërkesës dhe për të rregulluar qëndrimin, i lexon vetëm familia, dhe nuk i shesim e as i ndajmë për reklama.",
    sections: [
      {
        title: "Çfarë mbledhim kur na shkruani",
        text: "Emrin, adresën e emailit dhe, nëse e jepni, numrin e telefonit. Shtëpinë për të cilën pyesni, datat e mbërritjes dhe të nisjes, numrin e të rriturve dhe fëmijëve, moshën e fëmijëve nëse na e thoni, çdo gjë që shkruani në shënime, mënyrën si dëshironi përgjigjen (WhatsApp ose email) dhe gjuhën në të cilën lexoni sajtin.",
      },
      {
        title: "Pse i mbledhim",
        text: "Për t'iu përgjigjur, për t'ju dërguar një ofertë dhe për të rregullar qëndrimin. Kur mbërrin një kërkesë, pronari njoftohet me email. Të dhënat nuk përdoren për profilizim dhe nuk ju shtojmë në asnjë listë postime.",
      },
      {
        title: "Kush i shikon",
        text: "Kërkesa ruhet në bazën e të dhënave të këtij sajti dhe mund ta hapë vetëm llogaria e pronarit. Për kërkesat e dërguara përmes këtij sajti nuk ka agjenci ose platformë rezervimi në mes.",
      },
      {
        title: "Sa kohë i ruajmë",
        text: "Sa kohë që rregullohet qëndrimi, dhe më pas si pjesë e evidencës sonë të mysafirëve, që t'ju njohim nëse ktheheni. Kërkoni fshirjen e të dhënave dhe do t'i fshijmë.",
      },
      {
        title: "Pagesat",
        text: "Qëndrimin e paguani në mbërritje në objekt, tek pronari, dhe mënyrën e pagesës e konfirmojmë me ofertën. Ky sajt nuk kërkon kurrë të dhëna karte dhe nuk pranon pagesa vetë.",
      },
      {
        title: "Harta, gjuha dhe cookies",
        text: "Nuk vendosim cookies reklamimi ose gjurmimi. Sajti mban mend gjuhën e zgjedhur në shfletuesin tuaj. Kur hapni një lidhje udhëzimesh, lini këtë sajt dhe hapet Google Maps, e cila e sheh kërkesën tuaj si çdo sajt që vizitoni. Platforma jonë mban numërime anonime të faqeve të lexuara.",
      },
      {
        title: "Zgjedhja juaj",
        text: "Kërkoni një kopje të asaj që mbajmë për ju, korrigjimin ose fshirjen e saj. Më e shpejta është WhatsApp ose telefonata, dhe të dyja janë në faqen Kontakt.",
      },
    ],
    contactTitle: "Pyetje për të dhënat tuaja",
    contactText: "Shkruajani në WhatsApp ose telefononi, dhe do t'ju përgjigjet familia që mban këto të dhëna.",
    updated: "Përditësuar më 27 tetor 2026",
  },
};