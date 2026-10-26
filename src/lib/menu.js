import { formatEuro } from "@/lib/money";

// The restaurant at Mountain View Resort, in Vusanje: its menu and every price,
// the words around it, and the link to the resort's own e-menu.
//
// This is the only place a dish or a price lives, and all of it belongs to the
// resort alone — the hotel in the centre of Gusinje has no restaurant, and this
// menu is never shown as its own.
//
// Nothing is added here that the menu does not carry: no ingredients beyond the
// description printed with a dish, no dietary labels, no opening hours, no
// season and no service the restaurant has not told us about. Drink volumes are
// left out, because the printed pages label them inconsistently.

export const MENU_PATH = "/mountain-view-resort/restaurant";

// The resort's own e-menu, published by mojmeni.me and kept up to date there.
export const EMENU_URL = "https://mojmeni.me/mountainviewresort/";

export const RESTAURANT_COPY = {
  en: {
    eyebrow: "Mountain View Resort · the restaurant",
    title: "Restaurant & menu",
    intro: "Explore our selection of traditional dishes, grilled specialities, pizzas, breakfasts and drinks.",
    breakfastNote:
      "Breakfast is available at Mountain View Resort's restaurant for €5 per serving and is charged separately from accommodation.",
    allergens: "Please ask our team about ingredients and allergens before ordering.",
    categoriesLabel: "Menu sections",
    viewMenu: "View restaurant menu",
    menuHeading: "The menu",
    emenuLink: "Open our e-menu",
    backToResort: "Mountain View Resort",
    where: "The restaurant is at Mountain View Resort, in Vusanje.",
    contactNote: "The restaurant belongs to Mountain View Resort, so the resort's line is the one that reaches the family.",
    contactAction: "Message Mountain View Resort",
  },
  me: {
    eyebrow: "Mountain View Resort · restoran",
    title: "Restoran i jelovnik",
    intro: "Pogledajte naš izbor tradicionalnih jela, jela sa žara, pica, doručka i pića.",
    breakfastNote:
      "Doručak je dostupan u restoranu Mountain View Resorta za €5.00 po porciji i plaća se odvojeno od smještaja.",
    allergens: "Pitajte naš tim o sastojcima i alergenima prije naručivanja.",
    categoriesLabel: "Dijelovi jelovnika",
    viewMenu: "Pogledajte jelovnik restorana",
    menuHeading: "Jelovnik",
    emenuLink: "Otvorite naš e-jelovnik",
    backToResort: "Mountain View Resort",
    where: "Restoran se nalazi u resortu Mountain View, u Vusanju.",
    contactNote: "Restoran pripada resortu Mountain View, pa je resortov broj onaj koji vodi do porodice.",
    contactAction: "Pišite resortu Mountain View",
  },
  ru: {
    eyebrow: "Mountain View Resort · ресторан",
    title: "Ресторан и меню",
    intro: "Посмотрите нашу подборку традиционных блюд, блюд на гриле, пиццы, завтраков и напитков.",
    breakfastNote:
      "Завтрак подают в ресторане Mountain View Resort: €5.00 за порцию, оплачивается отдельно от проживания.",
    allergens: "Пожалуйста, спросите нашу команду о составе и аллергенах до заказа.",
    categoriesLabel: "Разделы меню",
    viewMenu: "Посмотреть меню ресторана",
    menuHeading: "Меню",
    emenuLink: "Открыть наше электронное меню",
    backToResort: "Mountain View Resort",
    where: "Ресторан находится в Mountain View Resort, в Вусане.",
    contactNote: "Ресторан относится к Mountain View Resort, поэтому до семьи можно добраться по номеру курорта.",
    contactAction: "Написать в Mountain View Resort",
  },
  sq: {
    eyebrow: "Mountain View Resort · restoranti",
    title: "Restoranti dhe menuja",
    intro: "Shikoni përzgjedhjen tonë të pjatave tradicionale, specialiteteve në zgarë, picave, mëngjeseve dhe pijeve.",
    breakfastNote:
      "Mëngjesi ofrohet në restorantin e Mountain View Resort për €5.00 për porcion dhe paguhet veçmas nga qëndrimi.",
    allergens: "Ju lutemi pyesni ekipin tonë për përbërësit dhe alergjenët përpara se të porosisni.",
    categoriesLabel: "Seksionet e menujës",
    viewMenu: "Shikoni menujën e restorantit",
    menuHeading: "Menuja",
    emenuLink: "Hapni menujën tonë elektronike",
    backToResort: "Mountain View Resort",
    where: "Restoranti ndodhet në Mountain View Resort, në Vusanje.",
    contactNote: "Restoranti i përket Mountain View Resort, prandaj linja e resortit është ajo që të çon te familja.",
    contactAction: "Shkruani Mountain View Resort",
  },
};

export const MENU = [
  {
    id: "breakfast",
    label: { en: "Breakfast", me: "Doručak", ru: "Завтрак", sq: "Mëngjes" },
    note: { en: "€5.00 each", me: "€5.00 po porciji", ru: "€5.00 за порцию", sq: "€5.00 për porcion" },
    items: [
      {
        id: "omelette",
        price: 5,
        weight: "300 g",
        name: { en: "Omelette", me: "Omlet", ru: "Омлет", sq: "Omletë" },
        description: {
          en: "Prosciutto or kulen, homemade cheese and three eggs.",
          me: "Pršut ili kulen, domaći sir i tri jajeta.",
          ru: "Прошутто или кулен, домашний сыр и три яйца.",
          sq: "Proshut ose kulen, djathë i shtëpisë dhe tri vezë.",
        },
      },
      {
        id: "breakfast-sausage",
        price: 5,
        weight: "400 g",
        name: {
          en: "Breakfast with sausage",
          me: "Doručak sa kobasicom",
          ru: "Завтрак с колбасой",
          sq: "Mëngjes me salsiçe",
        },
        description: {
          en: "Three fried eggs, potatoes, salad and homemade cheese.",
          me: "Tri pržena jajeta, krompir, salata i domaći sir.",
          ru: "Три жареных яйца, картофель, салат и домашний сыр.",
          sq: "Tri vezë të skuqura, patate, sallatë dhe djathë i shtëpisë.",
        },
      },
      {
        id: "cold-breakfast",
        price: 5,
        weight: "350 g",
        name: { en: "Cold breakfast", me: "Hladan doručak", ru: "Холодный завтрак", sq: "Mëngjes i ftohtë" },
        description: {
          en: "Tomato, cucumber, cheese, prosciutto and kulen.",
          me: "Paradajz, krastavac, sir, pršut i kulen.",
          ru: "Помидор, огурец, сыр, прошутто и кулен.",
          sq: "Domate, kastravec, djathë, proshut dhe kulen.",
        },
      },
      {
        id: "hot-breakfast",
        price: 5,
        weight: "350 g",
        name: { en: "Hot breakfast", me: "Topli doručak", ru: "Горячий завтрак", sq: "Mëngjes i ngrohtë" },
        description: {
          en: "Tomato, cucumber, cheese and three boiled eggs.",
          me: "Paradajz, krastavac, sir i tri kuvana jajeta.",
          ru: "Помидор, огурец, сыр и три варёных яйца.",
          sq: "Domate, kastravec, djathë dhe tri vezë të ziera.",
        },
      },
      {
        id: "priganice",
        price: 5,
        weight: "400 g",
        name: { en: "Priganice", me: "Priganice", ru: "Приганице", sq: "Priganice" },
        description: {
          en: "Served with cream, jam or homemade cheese.",
          me: "Poslužene sa pavlakom, pekmezom ili domaćim sirom.",
          ru: "Подаются с домашними сливками (каймак), вареньем или домашним сыром.",
          sq: "Shërbehen me kajmak, reçel ose djathë të shtëpisë.",
        },
      },
    ],
  },

  {
    id: "appetisers",
    label: { en: "Appetisers and sides", me: "Predjela i prilozi", ru: "Закуски и гарниры", sq: "Meze dhe garnitura" },
    items: [
      { id: "prosciutto", price: 3, weight: "100 g", name: { en: "Prosciutto", me: "Pršut", ru: "Прошутто", sq: "Proshut" } },
      { id: "kulen", price: 2.5, weight: "100 g", name: { en: "Kulen", me: "Kulen", ru: "Кулен", sq: "Kulen" } },
      {
        id: "trappist-cheese",
        price: 1.5,
        weight: "100 g",
        name: { en: "Trappist cheese", me: "Trapist sir", ru: "Сыр трапист", sq: "Djathë trappist" },
      },
      {
        id: "homemade-cheese",
        price: 2,
        weight: "100 g",
        name: { en: "Homemade cheese", me: "Domaći sir", ru: "Домашний сыр", sq: "Djathë i shtëpisë" },
      },
      {
        id: "homemade-cream",
        price: 3,
        weight: "50 g",
        name: { en: "Homemade cream", me: "Domaća pavlaka", ru: "Домашние сливки", sq: "Kajmak i shtëpisë" },
      },
      {
        id: "roasted-peppers",
        price: 3,
        weight: "300 g",
        name: { en: "Roasted peppers", me: "Pečene paprike", ru: "Печёный перец", sq: "Speca të pjekura" },
        description: { en: "Three peppers.", me: "Tri paprike.", ru: "Три перца.", sq: "Tri speca." },
      },
      {
        id: "french-fries",
        price: 3,
        weight: "300 g",
        name: { en: "French fries", me: "Pomfrit", ru: "Картофель фри", sq: "Patate të fërguara" },
      },
      { id: "potatoes", price: 3.5, weight: "300 g", name: { en: "Potatoes", me: "Krompir", ru: "Картофель", sq: "Patate" } },
      {
        id: "flatbread",
        price: 0.7,
        weight: "200 g",
        name: { en: "Flatbread", me: "Somun", ru: "Лепёшка", sq: "Somun (bukë e hollë)" },
      },
    ],
  },

  {
    id: "soups",
    label: { en: "Soups and stew", me: "Supe i čorbe", ru: "Супы и рагу", sq: "Supa dhe çorba" },
    items: [
      { id: "beef-soup", price: 4, weight: "300 g", name: { en: "Beef soup", me: "Goveđa supa", ru: "Суп из говядины", sq: "Supë me mish lope" } },
      { id: "chicken-soup", price: 4, weight: "300 g", name: { en: "Chicken soup", me: "Pileća supa", ru: "Куриный суп", sq: "Supë pule" } },
      { id: "goulash", price: 6, weight: "300 g", name: { en: "Goulash", me: "Gulaš", ru: "Гуляш", sq: "Gullash" } },
    ],
  },

  {
    id: "mains",
    label: { en: "Main dishes", me: "Glavna jela", ru: "Основные блюда", sq: "Pjatat kryesore" },
    items: [
      {
        id: "mountain-veal",
        price: 17,
        weight: "400 g",
        name: { en: "Mountain-style veal", me: "Teleće meso na planinski način", ru: "Телятина «по-горски»", sq: "Mish viçi si në bjeshkë" },
        description: {
          en: "Potatoes, grilled vegetables, Trappist cheese, red sauce and bacon.",
          me: "Krompir, grilovano povrće, trapist sir, crveni sos i slanina.",
          ru: "Картофель, овощи на гриле, сыр трапист, красный соус и бекон.",
          sq: "Patate, perime në zgarë, djathë trappist, salcë e kuqe dhe pancetë.",
        },
      },
      {
        id: "veal-ribs-bell",
        price: 14,
        weight: "350 g",
        name: { en: "Veal ribs under the bell", me: "Teleća rebra ispod sača", ru: "Рёбрышки телёнка под сачем", sq: "Brinjë viçi nën saç" },
      },
      { id: "veal", price: 13, weight: "300 g", name: { en: "Veal", me: "Teleće meso", ru: "Телятина", sq: "Mish viçi" } },
      {
        id: "veal-mushroom",
        price: 15,
        weight: "400 g",
        name: { en: "Veal in mushroom sauce", me: "Teleće meso u sosu od pečuraka", ru: "Телятина в грибном соусе", sq: "Mish viçi me salcë kërpudhash" },
      },
      { id: "veal-chop", price: 15, weight: "350 g", name: { en: "Veal chop", me: "Teleći kotlet", ru: "Телячья отбивная", sq: "Kotoletë viçi" } },
      {
        id: "grilled-chicken-fillet",
        price: 8,
        weight: "300 g",
        name: { en: "Grilled chicken fillet", me: "Pileći file na žaru", ru: "Куриное филе на гриле", sq: "Fileto pule në zgarë" },
      },
      {
        id: "chicken-mushroom",
        price: 9,
        weight: "350 g",
        name: { en: "Chicken fillet in mushroom sauce", me: "Pileći file u sosu od pečuraka", ru: "Куриное филе в грибном соусе", sq: "Fileto pule me salcë kërpudhash" },
      },
      {
        id: "chicken-curry",
        price: 9,
        weight: "350 g",
        name: { en: "Chicken fillet in curry sauce", me: "Pileći file u kari sosu", ru: "Куриное филе в соусе карри", sq: "Fileto pule me salcë kari" },
      },
      {
        id: "breaded-chicken",
        price: 8,
        weight: "300 g",
        name: { en: "Breaded chicken", me: "Pohovana piletina", ru: "Курица в панировке", sq: "Pule e pohuar" },
      },
      {
        id: "chicken-parmesan",
        price: 12,
        weight: "350 g",
        name: { en: "Chicken Parmesan with pesto", me: "Piletina parmezan sa pestom", ru: "Курица «пармезан» с песто", sq: "Pule parmezan me pesto" },
      },
      {
        id: "lamb-bell",
        price: 15,
        weight: "350 g",
        name: { en: "Lamb under the bell", me: "Jagnjetina ispod sača", ru: "Ягнёнок под сачем", sq: "Qengji nën saç" },
      },
      { id: "fish", price: 10, weight: "350 g", name: { en: "Fish", me: "Riba", ru: "Рыба", sq: "Peshk" } },
      { id: "fish-fillet", price: 10, weight: "300 g", name: { en: "Fish fillet", me: "Ribji file", ru: "Рыбное филе", sq: "Fileto peshku" } },
      {
        id: "grilled-vegetables",
        price: 7,
        weight: "350 g",
        name: { en: "Grilled vegetables with potatoes", me: "Grilovano povrće sa krompirom", ru: "Овощи на гриле с картофелем", sq: "Perime në zgarë me patate" },
      },
      {
        id: "mixed-platter",
        price: 76,
        weight: "2 kg",
        name: { en: "Mixed platter for four people", me: "Miješana plata za četiri osobe", ru: "Смешанное плато на четверых", sq: "Pjatë e përzier për katër persona" },
        description: {
          en: "Veal, veal ribs under the bell, veal chop, chicken fillet, lamb and fish fillet, with potatoes and grilled vegetables.",
          me: "Teleće meso, teleća rebra ispod sača, teleći kotlet, pileći file, jagnjetina i riblji file, sa krompirom i grilovanim povrćem.",
          ru: "Телятина, рёбрышки телёнка под сачем, телячья отбивная, куриное филе, ягнёнок и рыбное филе, с картофелем и овощами на гриле.",
          sq: "Mish viçi, brinjë viçi nën saç, kotoletë viçi, fileto pule, qengj dhe fileto peshku, me patate dhe perime në zgarë.",
        },
      },
    ],
  },

  {
    id: "pasta",
    label: { en: "Pasta", me: "Testenine", ru: "Паста", sq: "Pasta" },
    items: [
      { id: "carbonara", price: 6, weight: "300 g", name: { en: "Carbonara", me: "Karbonara", ru: "Карбонара", sq: "Karbonara" } },
      { id: "bolognese", price: 7, weight: "300 g", name: { en: "Bolognese", me: "Bolonjeze", ru: "Болоньезе", sq: "Boloneze" } },
      { id: "chicken-pasta", price: 8, weight: "300 g", name: { en: "Chicken pasta", me: "Pileća pasta", ru: "Паста с курицей", sq: "Pasta me pule" } },
    ],
  },

  {
    id: "traditional",
    label: { en: "Traditional dishes", me: "Tradicionalna jela", ru: "Традиционные блюда", sq: "Pjatat tradicionale" },
    items: [
      {
        id: "flija",
        price: 8,
        weight: "350 g",
        name: { en: "Flija", me: "Flija", ru: "Флия", sq: "Flija" },
        description: {
          en: "Homemade cheese and peppers.",
          me: "Domaći sir i paprike.",
          ru: "Домашний сыр и перец.",
          sq: "Djathë i shtëpisë dhe speca.",
        },
      },
      { id: "kacamak", price: 10, weight: "400 g", name: { en: "Kačamak", me: "Kačamak", ru: "Качамак", sq: "Kaçamak" } },
      {
        id: "summer-stew",
        price: 5,
        weight: "300 g",
        name: { en: "Summer stew with cheese", me: "Ljetno varivo sa sirom", ru: "Летнее рагу с сыром", sq: "Çorbë verore me djathë" },
      },
      {
        id: "peppers-cream",
        price: 6.5,
        weight: "300 g",
        name: { en: "Peppers in cream", me: "Paprike u pavlaci", ru: "Перец в сливках", sq: "Speca me kajmak" },
      },
      {
        id: "flatbread-cream",
        price: 3.5,
        weight: "250 g",
        name: { en: "Flatbread with cream", me: "Somun sa pavlakom", ru: "Лепёшка с каймаком", sq: "Somun me kajmak" },
      },
    ],
  },

  {
    id: "salads",
    label: { en: "Salads", me: "Salate", ru: "Салаты", sq: "Sallata" },
    items: [
      {
        id: "mixed-salad",
        price: 3,
        weight: "300 g",
        name: { en: "Mixed salad", me: "Miješana salata", ru: "Смешанный салат", sq: "Sallatë e përzier" },
        description: {
          en: "Tomato, cucumber, onion and sauerkraut.",
          me: "Paradajz, krastavac, luk i kiseli kupus.",
          ru: "Помидор, огурец, лук и квашеная капуста.",
          sq: "Domate, kastravec, qepë dhe lakër turshi.",
        },
      },
      {
        id: "shopska",
        price: 3.5,
        weight: "300 g",
        name: { en: "Shopska salad", me: "Šopska salata", ru: "Шопский салат", sq: "Sallatë shopska" },
        description: {
          en: "Tomato, cucumber, onion, peppers and homemade cheese.",
          me: "Paradajz, krastavac, luk, paprike i domaći sir.",
          ru: "Помидор, огурец, лук, перец и домашний сыр.",
          sq: "Domate, kastravec, qepë, speca dhe djathë i shtëpisë.",
        },
      },
      {
        id: "greek-salad",
        price: 4,
        weight: "300 g",
        name: { en: "Greek salad", me: "Grčka salata", ru: "Греческий салат", sq: "Sallatë greke" },
        description: {
          en: "Tomato, cucumber, onion, peppers, olives and homemade cheese.",
          me: "Paradajz, krastavac, luk, paprike, masline i domaći sir.",
          ru: "Помидор, огурец, лук, перец, оливки и домашний сыр.",
          sq: "Domate, kastravec, qepë, speca, ullinj dhe djathë i shtëpisë.",
        },
      },
      {
        id: "caesar",
        price: 6,
        weight: "300 g",
        name: { en: "Caesar salad", me: "Cezar salata", ru: "Салат «Цезарь»", sq: "Sallatë cezar" },
        description: {
          en: "Chicken, tomato, lettuce, bread and white dressing.",
          me: "Piletina, paradajz, zelena salata, hljeb i bijeli dresing.",
          ru: "Курица, помидор, салат, хлеб и белый соус.",
          sq: "Pule, domate, sallatë jeshile, bukë dhe salcë e bardhë.",
        },
      },
    ],
  },

  {
    id: "pizza",
    label: { en: "Pizza", me: "Pica", ru: "Пицца", sq: "Pica" },
    note: { en: "400 g each", me: "400 g svaka", ru: "400 г каждая", sq: "400 g secila" },
    items: [
      {
        id: "margherita",
        price: 5,
        name: { en: "Margherita", me: "Margarita", ru: "Маргарита", sq: "Margarita" },
        description: { en: "Tomato and Trappist cheese.", me: "Paradajz i trapist sir.", ru: "Помидор и сыр трапист.", sq: "Domate dhe djathë trappist." },
      },
      {
        id: "diavola",
        price: 6,
        name: { en: "Diavola", me: "Djavola", ru: "Дьявола", sq: "Diavola" },
        description: { en: "Tomato, Trappist cheese and kulen.", me: "Paradajz, trapist sir i kulen.", ru: "Помидор, сыр трапист и кулен.", sq: "Domate, djathë trappist dhe kulen." },
      },
      {
        id: "tuna",
        price: 6,
        name: { en: "Tuna", me: "Tuna", ru: "Тунец", sq: "Ton" },
        description: { en: "Tomato, Trappist cheese, tuna and onion.", me: "Paradajz, trapist sir, tuna i luk.", ru: "Помидор, сыр трапист, тунец и лук.", sq: "Domate, djathë trappist, ton dhe qepë." },
      },
      {
        id: "vegetarian",
        price: 7,
        name: { en: "Vegetarian", me: "Vegetarijanska", ru: "Вегетарианская", sq: "Vegjetariane" },
        description: { en: "Tomato, Trappist cheese and vegetables.", me: "Paradajz, trapist sir i povrće.", ru: "Помидор, сыр трапист и овощи.", sq: "Domate, djathë trappist dhe perime." },
      },
      {
        id: "capricciosa",
        price: 7,
        name: { en: "Capricciosa", me: "Kaprićoza", ru: "Капричоза", sq: "Kaprikoza" },
        description: { en: "Tomato, Trappist cheese, prosciutto and mushrooms.", me: "Paradajz, trapist sir, pršut i pečurke.", ru: "Помидор, сыр трапист, прошутто и грибы.", sq: "Domate, djathë trappist, proshut dhe kërpudha." },
      },
      {
        id: "mountain-pizza",
        price: 8,
        name: { en: "Mountain Pizza", me: "Planinska pica", ru: "Пицца «Горная»", sq: "Pica e bjeshkës" },
        description: { en: "Tomato, Trappist cheese, vegetables, kulen and prosciutto.", me: "Paradajz, trapist sir, povrće, kulen i pršut.", ru: "Помидор, сыр трапист, овощи, кулен и прошутто.", sq: "Domate, djathë trappist, perime, kulen dhe proshut." },
      },
    ],
  },

  {
    id: "desserts",
    label: { en: "Desserts", me: "Deserti", ru: "Десерты", sq: "Ëmbëlsira" },
    note: { en: "200 g each", me: "200 g svaki", ru: "200 г каждый", sq: "200 g secila" },
    items: [
      { id: "trilece", price: 2.5, name: { en: "Trileçe", me: "Trileće", ru: "Трилече", sq: "Trileçe" } },
      { id: "cake", price: 3.2, name: { en: "Cake", me: "Kolač", ru: "Пирожное", sq: "Tortë" } },
      { id: "metropoli", price: 4, name: { en: "Metropoli ice cream", me: "Sladoled Metropoli", ru: "Мороженое Metropoli", sq: "Akullore Metropoli" } },
      { id: "dubai-cake", price: 4, name: { en: "Dubai cake", me: "Dubai kolač", ru: "Пирожное «Дубай»", sq: "Tortë Dubai" } },
    ],
  },

  {
    id: "hot-drinks",
    label: { en: "Hot drinks", me: "Topli napici", ru: "Горячие напитки", sq: "Pije të ngrohta" },
    items: [
      { id: "tea", price: 1, name: { en: "Tea", me: "Čaj", ru: "Чай", sq: "Çaj" } },
      { id: "homemade-coffee", price: 1, name: { en: "Homemade coffee", me: "Domaća kafa", ru: "Домашний кофе", sq: "Kafe e shtëpisë" } },
      { id: "espresso", price: 0.9, name: { en: "Espresso", me: "Espresso", ru: "Эспрессо", sq: "Espresso" } },
      { id: "macchiato-small", price: 1, name: { en: "Small macchiato", me: "Mala makijata", ru: "Макиато, маленький", sq: "Makiat i vogël" } },
      { id: "macchiato-large", price: 1.2, name: { en: "Large macchiato", me: "Velika makijata", ru: "Макиато, большой", sq: "Makiat i madh" } },
      { id: "ness-coffee", price: 1.2, name: { en: "Ness coffee", me: "Ness kafa", ru: "Кофе Ness", sq: "Kafe Ness" } },
      { id: "ness-vanilla", price: 1.5, name: { en: "Ness vanilla", me: "Ness vanila", ru: "Ness ваниль", sq: "Ness vanilje" } },
    ],
  },

  {
    id: "cold-drinks",
    label: { en: "Cold drinks", me: "Hladni napici", ru: "Холодные напитки", sq: "Pije të ftohta" },
    items: [
      { id: "coca-cola", price: 2.2, name: { en: "Coca-Cola", me: "Coca-Cola", ru: "Coca-Cola", sq: "Coca-Cola" } },
      { id: "sprite", price: 2.2, name: { en: "Sprite", me: "Sprite", ru: "Sprite", sq: "Sprite" } },
      { id: "fanta", price: 2.2, name: { en: "Fanta", me: "Fanta", ru: "Fanta", sq: "Fanta" } },
      { id: "bravo-apple", price: 2.2, name: { en: "Bravo apple", me: "Bravo jabuka", ru: "Bravo яблоко", sq: "Bravo mollë" } },
      { id: "bravo-peach", price: 2.2, name: { en: "Bravo peach", me: "Bravo breskva", ru: "Bravo персик", sq: "Bravo pjeshkë" } },
      { id: "bravo-orange", price: 2.2, name: { en: "Bravo orange", me: "Bravo pomorandža", ru: "Bravo апельсин", sq: "Bravo portokall" } },
      { id: "bravo-strawberry", price: 2.2, name: { en: "Bravo strawberry", me: "Bravo jagoda", ru: "Bravo клубника", sq: "Bravo luleshtrydhe" } },
      { id: "bravo-cherry", price: 2.2, name: { en: "Bravo cherry", me: "Bravo višnja", ru: "Bravo вишня", sq: "Bravo qershi" } },
      { id: "bravo-blueberry", price: 2.2, name: { en: "Bravo blueberry", me: "Bravo borovnica", ru: "Bravo черника", sq: "Bravo boronicë" } },
      { id: "ultra-energy", price: 2.2, name: { en: "Ultra Energy", me: "Ultra Energy", ru: "Ultra Energy", sq: "Ultra Energy" } },
      { id: "guarana", price: 2.2, name: { en: "Guarana", me: "Guarana", ru: "Гуарана", sq: "Guarana" } },
      { id: "red-bull", price: 3.5, name: { en: "Red Bull", me: "Red Bull", ru: "Red Bull", sq: "Red Bull" } },
      { id: "orangina", price: 2.5, name: { en: "Orangina", me: "Orangina", ru: "Orangina", sq: "Orangina" } },
      { id: "homemade-juices", price: 3, name: { en: "Homemade juices", me: "Domaći sokovi", ru: "Домашние соки", sq: "Lëngje frutash të shtëpisë" } },
      { id: "rosa", price: 1.5, name: { en: "Rosa water", me: "Voda Rosa", ru: "Вода Rosa", sq: "Ujë Rosa" } },
      { id: "aqua", price: 1.5, name: { en: "Aqua water", me: "Voda Aqua", ru: "Вода Aqua", sq: "Ujë Aqua" } },
      { id: "sparkling-water", price: 1.5, name: { en: "Sparkling water", me: "Gazirana voda", ru: "Газированная вода", sq: "Ujë me gaz" } },
    ],
  },

  {
    id: "alcohol",
    label: { en: "Alcoholic drinks", me: "Alkoholna pića", ru: "Алкогольные напитки", sq: "Pije alkoolike" },
    items: [
      { id: "rakija", price: 2, name: { en: "Homemade rakija", me: "Domaća rakija", ru: "Домашняя ракия", sq: "Raki e shtëpisë" } },
      { id: "loza", price: 2, name: { en: "Loza", me: "Loza", ru: "Лоза", sq: "Loza" } },
      { id: "whiskey", price: 3.5, name: { en: "Whiskey", me: "Viski", ru: "Виски", sq: "Uiski" } },
      { id: "wine-small", price: 4, name: { en: "Small bottle of wine", me: "Mala flaša vina", ru: "Маленькая бутылка вина", sq: "Shishe e vogël vere" } },
      { id: "wine-white", price: 20, name: { en: "White wine, bottle", me: "Bijelo vino, flaša", ru: "Белое вино, бутылка", sq: "Verë e bardhë, shishe" } },
      { id: "wine-red", price: 20, name: { en: "Red wine, bottle", me: "Crno vino, flaša", ru: "Красное вино, бутылка", sq: "Verë e kuqe, shishe" } },
      { id: "beer", price: 3, name: { en: "Beer", me: "Pivo", ru: "Пиво", sq: "Birrë" } },
      { id: "niksicko", price: 3, name: { en: "Nikšićko beer", me: "Nikšićko pivo", ru: "Пиво Nikšićko", sq: "Birra Nikšićko" } },
      { id: "stella", price: 3, name: { en: "Stella", me: "Stella", ru: "Stella", sq: "Stella" } },
    ],
  },
];

// The English name of a dish is the key everything else is written against, so
// a translated card can always be traced back to the printed menu.
export function formatMenuPrice(price) {
  return formatEuro(price);
}