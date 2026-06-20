function makeCocktailVisual(drink) {
  const color = drink.visual?.color || "#d9d7bf";
  const glass = drink.visual?.glass || "coupe";
  const accent = `#${drink.visual?.accent || "f2b45c"}`;
  const bowl =
    glass === "highball"
      ? `<rect x="74" y="48" width="76" height="126" rx="16" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.58)" stroke-width="3"/><rect x="82" y="78" width="60" height="88" rx="12" fill="${color}" opacity=".88"/>`
      : glass === "rocks"
        ? `<rect x="62" y="74" width="100" height="92" rx="18" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.58)" stroke-width="3"/><rect x="72" y="104" width="80" height="52" rx="12" fill="${color}" opacity=".88"/>`
        : glass === "flute"
          ? `<path d="M82 42h60l-13 102H95L82 42Z" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.58)" stroke-width="3"/><path d="M91 82h42l-8 56h-34Z" fill="${color}" opacity=".88"/><path d="M112 144v42M88 186h48" stroke="rgba(255,255,255,.58)" stroke-width="4"/>`
          : `<path d="M48 54h128l-46 60H94L48 54Z" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.58)" stroke-width="3"/><path d="M68 68h88l-30 36H98Z" fill="${color}" opacity=".88"/><path d="M112 114v62M82 176h60" stroke="rgba(255,255,255,.58)" stroke-width="4"/>`;
  const label = escapeHtml(drink.name).slice(0, 24);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 224">
      <defs>
        <radialGradient id="bg" cx="68%" cy="18%" r="72%">
          <stop stop-color="${accent}" stop-opacity=".36"/>
          <stop offset=".55" stop-color="#17191b"/>
          <stop offset="1" stop-color="#090a0b"/>
        </radialGradient>
      </defs>
      <rect width="224" height="224" fill="url(#bg)"/>
      <circle cx="168" cy="52" r="18" fill="${color}" opacity=".45"/>
      <path d="M28 190c34-18 134-18 168 0" stroke="rgba(242,180,92,.28)" stroke-width="3"/>
      ${bowl}
      <text x="112" y="210" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="700" fill="#f6f1e8">${label}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const drinks = (window.IBA_DRINKS || []).map((drink) => ({
  ...drink,
  image: drink.image || makeCocktailVisual(drink)
}));

const baseInventoryItems = [
  "朗姆",
  "威士忌",
  "伏特加",
  "金酒",
  "白兰地",
  "龙舌兰"
];
const baseAliases = {
  朗姆: ["朗姆"],
  威士忌: ["威士忌", "波本", "黑麦"],
  伏特加: ["伏特加"],
  金酒: ["金酒"],
  白兰地: ["白兰地", "干邑", "科涅克", "皮斯科"],
  龙舌兰: ["龙舌兰", "梅斯卡尔"]
};
const liqueurCategoryNames = {
  君度橙酒: "橙味利口酒",
  柑曼怡橙酒: "橙味利口酒",
  库拉索橙酒: "橙味利口酒",
  橙味库拉索: "橙味利口酒",
  金巴利: "苦味利口酒",
  金巴利苦味利口酒: "苦味利口酒",
  阿佩罗苦味利口酒: "苦味利口酒",
  菲奈布兰卡苦味利口酒: "苦味利口酒",
  菲奈苦味利口酒: "苦味利口酒",
  诺尼诺阿玛罗利口酒: "苦味利口酒",
  路萨朵黑樱桃利口酒: "樱桃利口酒",
  桑格莫拉克樱桃利口酒: "樱桃利口酒",
  紫罗兰利口酒: "花香利口酒",
  黑莓利口酒: "黑莓利口酒",
  覆盆子利口酒: "覆盆子利口酒",
  黑加仑利口酒: "黑加仑利口酒",
  蜜桃白兰地利口酒: "蜜桃利口酒",
  杏桃白兰地利口酒: "杏桃利口酒",
  百香果利口酒: "百香果利口酒",
  咖啡利口酒: "咖啡利口酒",
  可可利口酒: "巧克力利口酒",
  白薄荷利口酒: "薄荷利口酒",
  杏仁利口酒: "杏仁利口酒",
  弗兰杰利科榛子利口酒: "坚果利口酒",
  杜林标利口酒: "威士忌蜂蜜利口酒",
  本尼迪克汀草本利口酒: "草本利口酒",
  绿查特酒: "草本利口酒",
  黄查特酒: "草本利口酒",
  法勒南姆利口酒: "香料利口酒",
  圣伊丽莎白多香果利口酒: "香料利口酒"
};
const wineCategoryNames = {
  波特酒: "加强型葡萄酒",
  红茶色波特酒: "加强型葡萄酒",
  雪莉酒: "加强型葡萄酒",
  干雪莉酒: "加强型葡萄酒",
  红葡萄酒: "葡萄酒",
  白葡萄酒: "葡萄酒",
  干白葡萄酒: "葡萄酒",
  普罗塞克: "起泡酒",
  香槟: "起泡酒",
  极干型香槟或普罗塞克: "起泡酒",
  冰镇香槟: "起泡酒",
  旁配香槟: "起泡酒"
};
const coreInventoryItems = [
  "味美思",
  "起泡酒",
  "柠檬汁",
  "青柠",
  "糖/糖浆",
  "苦精",
  "气泡饮料",
  "果汁/果泥",
  "咖啡",
  "香草",
  "乳品/蛋类"
];
const inventoryCanonicalNames = {
  波本威士忌: "威士忌",
  黑麦威士忌: "威士忌",
  干邑: "白兰地",
  科涅克: "白兰地",
  梅斯卡尔: "龙舌兰",
  苦艾酒: "苦艾酒/茴香酒",
  干味美思: "味美思",
  甜味美思: "味美思",
  甜红味美思: "味美思",
  利莱白开胃酒: "味美思",
  安格仕苦精: "苦精",
  佩肖德苦精: "苦精",
  芳香苦精: "苦精",
  橙味苦精: "苦精",
  新鲜柠檬汁: "柠檬汁",
  新鲜青柠汁: "青柠",
  青柠汁: "青柠",
  青柠块: "青柠",
  方糖: "糖/糖浆",
  细砂糖: "糖/糖浆",
  白蔗糖: "糖/糖浆",
  糖粉: "糖/糖浆",
  糖浆: "糖/糖浆",
  蜂蜜糖浆: "糖/糖浆",
  原蜂蜜: "糖/糖浆",
  蜂蜜水: "糖/糖浆",
  可乐: "气泡饮料",
  苏打水: "气泡饮料",
  姜汁啤酒: "气泡饮料",
  姜汁汽水: "气泡饮料",
  薄荷叶: "香草",
  薄荷枝: "香草",
  罗勒叶: "香草",
  鲜奶油: "乳品/蛋类",
  蛋白: "乳品/蛋类",
  椰子奶油: "乳品/蛋类",
  橙汁: "果汁/果泥",
  新鲜橙汁: "果汁/果泥",
  菠萝汁: "果汁/果泥",
  新鲜菠萝汁: "果汁/果泥",
  西柚汁: "果汁/果泥",
  蔓越莓汁: "果汁/果泥",
  番茄汁: "果汁/果泥",
  百香果泥: "果汁/果泥",
  浓缩咖啡: "咖啡",
  热咖啡: "咖啡",
  伍斯特酱: "特色辅料",
  鲜姜片: "特色辅料",
  橙子半轮片: "特色辅料",
  ...liqueurCategoryNames,
  ...wineCategoryNames
};

function canonicalInventoryItem(item) {
  return inventoryCanonicalNames[item] || item;
}

function displayInventoryItem(item) {
  const labels = {
    味美思: "味美思（加香葡萄酒）",
    "苦艾酒/茴香酒": "苦艾酒/茴香酒",
    咖啡: "咖啡（热咖啡/浓缩）",
    特色辅料: "特色辅料（皮、盐边等）"
  };
  return labels[item] || item;
}

const exactLiqueurItems = [...new Set(drinks.flatMap((drink) => drink.liqueurTypes || []).map(canonicalInventoryItem))].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
const recipeInventoryItems = [...new Set(drinks.flatMap((drink) => drink.inventory || []).map(canonicalInventoryItem))].filter((item) => !baseInventoryItems.includes(item) && !coreInventoryItems.includes(item));
const inventoryItems = [...new Set([...baseInventoryItems, ...exactLiqueurItems, ...coreInventoryItems, ...recipeInventoryItems])];
const starterInventory = new Set(["金酒", "朗姆", "青柠", "糖/糖浆", "苦精", "气泡饮料"]);

const lessons = [
  {
    title: "认识基酒",
    copy: "先建立六大基酒的香气地图。",
    drinks: ["daiquiri", "old-fashioned", "margarita"],
    tasks: ["闻香后写下一个最明显的香气词。", "只小口品尝基酒在配方里的存在感。", "记录哪一种基酒最容易入口。"]
  },
  {
    title: "酸甜结构",
    copy: "用酸酒骨架理解酸、甜和酒体。",
    drinks: ["daiquiri", "whiskey-sour", "sidecar"],
    tasks: ["按标准比例做一杯。", "第二杯减少 5 毫升糖或甜味材料。", "比较入口、收口和酒精感变化。"]
  },
  {
    title: "摇和与稀释",
    copy: "观察摇和带来的降温、泡沫和稀释。",
    drinks: ["margarita", "white-lady", "cosmopolitan"],
    tasks: ["用足量冰摇到壶壁冰冷。", "双重过滤一次，观察口感是否更细。", "记录摇和时间和入口温度。"]
  },
  {
    title: "第一次搅拌",
    copy: "练习清澈、低温和顺滑。",
    drinks: ["negroni", "manhattan", "martinez"],
    tasks: ["搅拌到杯壁明显冰冷。", "比较 20 秒与 35 秒搅拌的稀释差异。", "观察酒液是否保持清澈。"]
  },
  {
    title: "冰块与杯型",
    copy: "理解大冰、满杯冰和预冷杯具。",
    drinks: ["old-fashioned", "gin-fizz", "mint-julep"],
    tasks: ["同一杯分别用大冰和小冰试饮。", "预冷杯具后再出品一次。", "记录第一口和五分钟后的差别。"]
  },
  {
    title: "长饮与气泡",
    copy: "保留气泡，让清爽感成立。",
    drinks: ["mojito", "cuba-libre", "paloma"],
    tasks: ["气泡材料最后加入。", "只轻轻提拉融合，不剧烈搅拌。", "记录气泡保留和甜度感受。"]
  },
  {
    title: "创作原创配方",
    copy: "从经典骨架出发，只改一个变量。",
    drinks: ["daiquiri", "negroni", "espresso-martini"],
    tasks: ["选一个经典骨架。", "只替换一个材料或调整一个比例。", "保存笔记，写下下一次要改什么。"]
  }
];

const homeRecommendationRules = {
  hot: ["mojito", "daiquiri", "paloma", "gin-fizz", "pina-colada", "sea-breeze"],
  clear: ["french-75", "margarita", "south-side", "bellini", "spritz", "tommys-margarita"],
  rain: ["old-fashioned", "penicillin", "irish-coffee", "vieux-carre", "sazerac", "manhattan"],
  cold: ["irish-coffee", "old-fashioned", "rusty-nail", "brandy-crusta", "french-connection", "alexander"],
  cloudy: ["negroni", "boulevardier", "paper-plane", "americano", "martinez", "sidecar"],
  night: ["espresso-martini", "old-fashioned", "manhattan", "negroni", "black-russian", "sazerac"],
  morning: ["mimosa", "bellini", "bloody-mary", "garibaldi", "kir", "champagne-cocktail"]
};

const weatherCodeMap = {
  0: "clear",
  1: "clear",
  2: "cloudy",
  3: "cloudy",
  45: "cloudy",
  48: "cloudy",
  51: "rain",
  53: "rain",
  55: "rain",
  61: "rain",
  63: "rain",
  65: "rain",
  80: "rain",
  81: "rain",
  82: "rain",
  95: "rain"
};

const simulatorProfiles = {
  清爽草本: {
    structure: "草本酸酒 / 气泡长饮",
    logic: "以酸酒骨架建立清爽度，草本只负责打开香气，气泡把酒体拉长，适合做第一杯原创练习。",
    method: "先把基酒、柑橘和糖浆摇冷，倒入加冰长饮杯，再补入气泡材料并轻轻提拉融合。",
    similarIds: ["mojito", "south-side", "gin-basil-smash", "gin-fizz"],
    slots: [
      [
        { label: "薄荷叶 8-10 片", needs: ["香草"] },
        { label: "罗勒叶 4 片", needs: ["香草"] }
      ],
      [{ label: "苏打水 补满", needs: ["气泡饮料"] }]
    ]
  },
  热带果香: {
    structure: "热带酸酒 / 提基骨架",
    logic: "用柑橘和糖浆托住果汁，少量苦精压住甜腻感。重点是让果香明亮，不让果汁盖住基酒。",
    method: "所有材料与冰块充分摇和，双重过滤进加冰杯；如果果汁较甜，先少放糖浆再试味。",
    similarIds: ["pina-colada", "mai-tai", "jungle-bird", "dons-special-daiquiri"],
    slots: [
      [{ label: "新鲜菠萝汁 30 毫升", needs: ["果汁/果泥"] }],
      [
        { label: "杏仁糖浆 10 毫升", needs: ["糖/糖浆"] },
        { label: "百香果糖浆 10 毫升", needs: ["糖/糖浆"] }
      ],
      [{ label: "安格仕苦精 1 dash", needs: ["苦精"] }]
    ]
  },
  烟熏浓郁: {
    structure: "旧式搅拌骨架",
    logic: "不靠酸度撑开，而是让糖、苦精和橙皮把基酒变得更圆。适合威士忌、朗姆和白兰地。",
    method: "在搅拌杯中加入所有液体和硬冰，搅拌至杯壁冰冷，滤入放有大冰块的古典杯。",
    similarIds: ["old-fashioned", "penicillin", "sazerac", "rusty-nail"],
    slots: [
      [
        { label: "枫糖浆 10 毫升", needs: ["糖/糖浆"] },
        { label: "黑糖糖浆 10 毫升", needs: ["糖/糖浆"] }
      ],
      [{ label: "芳香苦精 2 dash", needs: ["苦精"] }],
      [{ label: "橙皮 扭转释香", needs: ["特色辅料"] }]
    ]
  },
  苦甜餐前: {
    structure: "苦甜搅拌骨架",
    logic: "基酒、味美思和苦味利口酒形成餐前酒的三角。甜度越高，口感越圆；酸度滑杆在这里表现为更干爽的收口。",
    method: "所有材料与冰块搅拌至低温，滤入冰镇杯，最后用橙皮或柠檬皮释放香气。",
    similarIds: ["negroni", "boulevardier", "paper-plane", "americano"],
    slots: [
      [
        { label: "甜红味美思 25 毫升", needs: ["甜红味美思"] },
        { label: "甜味美思 25 毫升", needs: ["甜味美思"] },
        { label: "味美思 25 毫升", needs: ["味美思"] }
      ],
      [
        { label: "金巴利苦味利口酒 22.5 毫升", needs: ["金巴利苦味利口酒"] },
        { label: "阿佩罗苦味利口酒 25 毫升", needs: ["阿佩罗苦味利口酒"] }
      ],
      [{ label: "橙皮 扭转释香", needs: ["特色辅料"] }]
    ]
  },
  奶油甜点感: {
    structure: "甜点摇和骨架",
    logic: "利口酒负责甜香，奶油负责质地，基酒负责骨架。关键是充分摇冷，但不要让甜度失控。",
    method: "所有材料与冰块大力摇和，双重过滤进冰镇鸡尾酒杯；入口太厚时用少量冷水或咖啡调整。",
    similarIds: ["espresso-martini", "grasshopper", "alexander", "black-russian"],
    slots: [
      [{ label: "咖啡利口酒 20 毫升", needs: ["咖啡利口酒"] }],
      [{ label: "鲜奶油 20 毫升", needs: ["乳品/蛋类"] }],
      [{ label: "香草精 1 dash", needs: ["特色辅料"] }]
    ]
  }
};

const quickInventoryItems = [
  ...baseInventoryItems,
  "柠檬汁",
  "青柠",
  "糖/糖浆",
  "苦精",
  "气泡饮料",
  "果汁/果泥",
  "香草",
  "乳品/蛋类",
  "特色辅料",
  "味美思",
  "橙味利口酒",
  "苦味利口酒",
  "草本利口酒",
  "樱桃利口酒",
  "香料利口酒",
  "咖啡利口酒",
  "巧克力利口酒",
  "杏仁利口酒",
  "坚果利口酒",
  "薄荷利口酒"
].filter((item, index, list) => inventoryItems.includes(item) && list.indexOf(item) === index);

const inventoryGroupDefinitions = [
  {
    title: "六大基酒",
    copy: "先确认家里有哪些主体酒。",
    items: baseInventoryItems
  },
  {
    title: "柑橘、糖与苦精",
    copy: "最常用的酸甜平衡和长饮基础。",
    items: ["柠檬汁", "青柠", "糖/糖浆", "苦精", "气泡饮料"]
  },
  {
    title: "利口酒与风味酒",
    copy: "按风味归类，避免记品牌名。",
    items: [
      "橙味利口酒",
      "苦味利口酒",
      "草本利口酒",
      "樱桃利口酒",
      "香料利口酒",
      "百香果利口酒",
      "薄荷利口酒",
      "覆盆子利口酒",
      "黑加仑利口酒",
      "黑莓利口酒",
      "花香利口酒",
      "坚果利口酒",
      "咖啡利口酒",
      "巧克力利口酒",
      "威士忌蜂蜜利口酒",
      "蜜桃利口酒",
      "杏仁利口酒",
      "杏桃利口酒",
      "苦艾酒/茴香酒"
    ]
  },
  {
    title: "葡萄酒与起泡酒",
    copy: "餐前、清爽和庆祝类配方常会用到。",
    items: ["味美思", "葡萄酒", "起泡酒", "加强型葡萄酒"]
  },
  {
    title: "果汁、咖啡与乳品",
    copy: "热带、咖啡和甜点风格的核心材料。",
    items: ["果汁/果泥", "咖啡", "乳品/蛋类"]
  },
  {
    title: "香草与装饰辅料",
    copy: "香气、杯口和最后呈现。",
    items: ["香草", "特色辅料"]
  }
];

function readStoredValue(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`无法读取本地数据：${key}`, error);
    return null;
  }
}

function writeStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`无法保存本地数据：${key}`, error);
  }
}

function removeStoredValue(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // 文件模式或隐私设置可能禁止 localStorage，忽略即可。
  }
}

function canUseLocalStorage() {
  try {
    const key = "barcraft:storage-check";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function readStoredJson(key, fallback) {
  try {
    const raw = readStoredValue(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    console.warn(`已忽略损坏的本地数据：${key}`, error);
    removeStoredValue(key);
    return fallback;
  }
}

function readStoredNumber(key, fallback) {
  const value = Number(readStoredValue(key));
  return Number.isFinite(value) ? value : fallback;
}

const localStorageAvailable = canUseLocalStorage();
const savedInventory = readStoredJson("barcraft:inventory", null);

function localDataCopy() {
  return localStorageAvailable ? "收藏、库存和笔记会保存在这台设备的浏览器里。" : "当前浏览器限制本地保存，关闭或刷新后可能不会保留个人记录。";
}

const inventoryFamilies = [
  ["橙味利口酒"],
  ["苦味利口酒"],
  ["草本利口酒"],
  ["樱桃利口酒"],
  ["香料利口酒"],
  ["味美思", "甜味美思", "甜红味美思", "干味美思"],
  ["起泡酒", "普罗塞克", "香槟", "极干型香槟或普罗塞克", "冰镇香槟", "旁配香槟"],
  ["蜜桃利口酒", "蜜桃白兰地利口酒"],
  ["杏仁利口酒", "杏仁糖浆"],
  ["白兰地", "干邑"],
  ["威士忌", "波本威士忌", "黑麦威士忌"]
];

const state = {
  selectedId: drinks.find((drink) => drink.id === "daiquiri")?.id || drinks[0]?.id,
  activeView: "home",
  filter: "all",
  query: "",
  inventory: new Set(Array.isArray(savedInventory) ? savedInventory.map(canonicalInventoryItem) : starterInventory),
  favorites: new Set(readStoredJson("barcraft:favorites", [])),
  notes: readStoredJson("barcraft:notes", []),
  noteQuery: "",
  creations: readStoredJson("barcraft:creations", []),
  lessonIndex: readStoredNumber("barcraft:lessonIndex", 0),
  completedLessons: new Set(readStoredJson("barcraft:completedLessons", [])),
  recipeServings: 1,
  homeWeather: { type: "cloudy", label: "天气待确认", temperature: null, source: "fallback" },
  homeDrinkId: null,
  generatedRecipe: null
};

const $ = (selector) => document.querySelector(selector);

const elements = {
  drinkImage: $("#drinkImage"),
  drinkName: $("#drinkName"),
  drinkSubtitle: $("#drinkSubtitle"),
  drinkAbv: $("#drinkAbv"),
  drinkMood: $("#drinkMood"),
  difficulty: $("#difficulty"),
  drinkTaste: $("#drinkTaste"),
  todayFitCard: $("#todayFitCard"),
  tagRow: $("#tagRow"),
  buildSpecs: $("#buildSpecs"),
  servingControl: $("#servingControl"),
  recipeGrid: $("#recipeGrid"),
  substitutionCard: $("#substitutionCard"),
  drinkNotesCard: $("#drinkNotesCard"),
  practiceTitle: $("#practiceTitle"),
  practiceCopy: $("#practiceCopy"),
  practiceSteps: $("#practiceSteps"),
  methodList: $("#methodList"),
  storyTitle: $("#storyTitle"),
  originYear: $("#originYear"),
  storyDeepDive: $("#storyDeepDive"),
  storyRelated: $("#storyRelated"),
  homeHeadline: $("#homeHeadline"),
  homeReason: $("#homeReason"),
  homeTimeLabel: $("#homeTimeLabel"),
  homeWeatherLabel: $("#homeWeatherLabel"),
  homePickThumb: $("#homePickThumb"),
  homePickName: $("#homePickName"),
  homeInventoryCard: $("#homeInventoryCard"),
  homeLessonCard: $("#homeLessonCard"),
  homeRecentNoteCard: $("#homeRecentNoteCard"),
  homeDrinkImage: $("#homeDrinkImage"),
  homeDrinkName: $("#homeDrinkName"),
  homeDrinkMeta: $("#homeDrinkMeta"),
  homeDrinkTaste: $("#homeDrinkTaste"),
  homeDrinkChips: $("#homeDrinkChips"),
  homeOpenDrink: $("#homeOpenDrink"),
  refreshHomeButton: $("#refreshHomeButton"),
  manualWeatherRow: $("#manualWeatherRow"),
  drinkCards: $("#drinkCards"),
  resultCount: $("#resultCount"),
  filterRow: $("#filterRow"),
  favoriteButton: $("#favoriteButton"),
  favoriteCount: $("#favoriteCount"),
  favoriteSummary: $("#favoriteSummary"),
  favoriteCards: $("#favoriteCards"),
  workbenchOverview: $("#workbenchOverview"),
  inventoryOwnedCount: $("#inventoryOwnedCount"),
  inventoryGrid: $("#inventoryGrid"),
  inventoryStatusCard: $("#inventoryStatusCard"),
  simulatorInventoryGrid: $("#simulatorInventoryGrid"),
  simulatorInventoryCount: $("#simulatorInventoryCount"),
  matchList: $("#matchList"),
  lessonList: $("#lessonList"),
  lessonDetail: $("#lessonDetail"),
  noteCount: $("#noteCount"),
  noteStats: $("#noteStats"),
  noteInput: $("#noteInput"),
  noteDrinkSelect: $("#noteDrinkSelect"),
  noteLessonSelect: $("#noteLessonSelect"),
  noteAdjustmentInput: $("#noteAdjustmentInput"),
  noteSearchInput: $("#noteSearchInput"),
  noteAcidRange: $("#noteAcidRange"),
  noteSweetRange: $("#noteSweetRange"),
  noteBodyRange: $("#noteBodyRange"),
  noteAromaRange: $("#noteAromaRange"),
  noteBalanceRange: $("#noteBalanceRange"),
  noteAcidValue: $("#noteAcidValue"),
  noteSweetValue: $("#noteSweetValue"),
  noteBodyValue: $("#noteBodyValue"),
  noteAromaValue: $("#noteAromaValue"),
  noteBalanceValue: $("#noteBalanceValue"),
  noteList: $("#noteList"),
  dataBackupStatus: $("#dataBackupStatus"),
  exportDataButton: $("#exportDataButton"),
  importDataButton: $("#importDataButton"),
  importDataInput: $("#importDataInput"),
  generatedCard: $("#generatedCard"),
  creationList: $("#creationList"),
  baseSelect: $("#baseSelect"),
  flavorSelect: $("#flavorSelect"),
  useInventoryToggle: $("#useInventoryToggle"),
  sweetRange: $("#sweetRange"),
  acidRange: $("#acidRange"),
  sweetValue: $("#sweetValue"),
  acidValue: $("#acidValue"),
  consoleDrinkName: $("#consoleDrinkName"),
  consoleViewLabel: $("#consoleViewLabel"),
  consoleResultCount: $("#consoleResultCount"),
  consoleMode: $("#consoleMode")
};

const viewLabels = {
  home: "首页",
  atlas: "图鉴",
  collection: "酒单",
  favorites: "收藏",
  story: "故事",
  simulator: "调酒台",
  learn: "学习",
  notes: "笔记"
};

const viewModeLabels = {
  home: "今日推荐",
  atlas: "配方图鉴",
  collection: "选择酒款",
  favorites: "我的酒单",
  story: "起源故事",
  simulator: "库存 / 原创",
  learn: "练习路径",
  notes: "品鉴日志"
};

function selectedDrink() {
  return drinks.find((drink) => drink.id === state.selectedId) || drinks[0];
}

function setActiveView(view) {
  if (!viewLabels[view]) return;
  state.activeView = view;
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === view);
  });
  document.querySelectorAll("[data-view], .nav-item[data-section]").forEach((button) => {
    const buttonView = button.dataset.view || button.dataset.section;
    button.classList.toggle("active", buttonView === view);
  });
  elements.consoleViewLabel.textContent = viewLabels[view];
  elements.consoleMode.textContent = viewModeLabels[view] || "浏览模式";
  const consoleDrink =
    view === "home" && state.homeDrinkId
      ? drinks.find((drink) => drink.id === state.homeDrinkId)
      : selectedDrink();
  if (consoleDrink) elements.consoleDrinkName.textContent = consoleDrink.name;
  if (view === "favorites") renderFavorites();
  if (view === "notes") renderNotes();
  if (view === "collection") elements.consoleResultCount.textContent = `${filteredDrinks().length} 款`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function familyForInventoryItem(item) {
  const normalized = canonicalInventoryItem(item);
  return inventoryFamilies.find((family) => family.map(canonicalInventoryItem).includes(normalized)) || null;
}

function ownedAlternativeFor(item) {
  const normalized = canonicalInventoryItem(item);
  const family = familyForInventoryItem(item);
  if (!family) return "";
  return family.map(canonicalInventoryItem).find((candidate) => candidate !== normalized && state.inventory.has(candidate)) || "";
}

function hasInventoryCoverage(item) {
  const normalized = canonicalInventoryItem(item);
  return state.inventory.has(normalized) || Boolean(ownedAlternativeFor(normalized));
}

function inventoryMatchFor(drink) {
  const required = [...new Set((drink.inventory || []).map(canonicalInventoryItem))];
  const alternatives = [];
  const missing = [];
  required.forEach((item) => {
    if (state.inventory.has(canonicalInventoryItem(item))) return;
    const alternative = ownedAlternativeFor(item);
    if (alternative) alternatives.push({ item, alternative });
    else missing.push(item);
  });
  const covered = required.length - missing.length;
  const missingCount = missing.length;
  const status = missingCount === 0 ? "可立即制作" : `还差 ${missingCount} 样`;
  return {
    required,
    covered,
    total: required.length,
    missing,
    alternatives,
    missingCount,
    score: required.length ? covered / required.length : 0,
    status
  };
}

function bestInventoryMatches() {
  return drinks
    .map((drink) => ({ drink, match: inventoryMatchFor(drink) }))
    .sort((a, b) => a.match.missingCount - b.match.missingCount || b.match.score - a.match.score || a.drink.name.localeCompare(b.drink.name, "zh-Hans-CN"));
}

function currentDaypart(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return { key: "morning", label: "上午", copy: "适合低酒精、明亮、不会压住一天节奏的酒。" };
  if (hour >= 11 && hour < 17) return { key: "afternoon", label: "午后", copy: "适合清爽、带气泡或柑橘感的酒。" };
  if (hour >= 17 && hour < 22) return { key: "evening", label: "傍晚", copy: "适合餐前、苦甜或结构感更完整的酒。" };
  return { key: "night", label: "夜晚", copy: "适合慢饮、咖啡感或酒体更深的酒。" };
}

function weatherLabelFor(type, temperature) {
  const labels = {
    hot: "炎热",
    clear: "晴朗",
    rain: "下雨",
    cold: "寒冷",
    cloudy: "阴天"
  };
  return temperature === null ? labels[type] : `${labels[type]} · ${Math.round(temperature)}°C`;
}

function classifyWeather(code, temperature) {
  if (typeof temperature === "number" && temperature >= 29) return "hot";
  if (typeof temperature === "number" && temperature <= 9) return "cold";
  return weatherCodeMap[code] || "cloudy";
}

function drinkByIdList(ids) {
  return ids.map((id) => drinks.find((drink) => drink.id === id)).filter(Boolean);
}

function pickHomeDrink(weatherType, daypartKey) {
  const weatherPool = drinkByIdList(homeRecommendationRules[weatherType] || homeRecommendationRules.cloudy);
  const timePool = drinkByIdList(homeRecommendationRules[daypartKey] || []);
  const combined = [...weatherPool, ...timePool].filter((drink, index, list) => list.findIndex((item) => item.id === drink.id) === index);
  const pool = combined.length ? combined : drinks;
  const daySeed = new Date().toDateString().split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return pool[daySeed % pool.length];
}

function homeWeatherCopy(weatherType) {
  const copy = {
    hot: "天气偏热，推荐更冷、更清爽、酸度更明亮的一杯。",
    clear: "天气晴朗，推荐轻快、明亮、适合打开味觉的一杯。",
    rain: "雨天更适合温暖、木质、香料感或慢饮结构。",
    cold: "气温偏低，推荐酒体更厚、香气更深的一杯。",
    cloudy: "天气偏阴，推荐苦甜、餐前或层次更安静的一杯。"
  };
  return copy[weatherType] || copy.cloudy;
}

function homeRecommendationNameMarkup(drink) {
  if (drink.nameZh && drink.nameEn) {
    return `
      <span class="recommend-drink-zh">${escapeHtml(drink.nameZh)}</span>
      <span class="recommend-drink-en">${escapeHtml(drink.nameEn)}</span>
    `;
  }
  return `<span class="recommend-drink-zh">${escapeHtml(drink.name)}</span>`;
}

function renderHomeRecommendation() {
  const daypart = currentDaypart();
  const drink = pickHomeDrink(state.homeWeather.type, daypart.key) || selectedDrink();
  state.homeDrinkId = drink.id;
  elements.consoleDrinkName.textContent = drink.name;
  elements.homeHeadline.innerHTML = `
    <span class="recommend-kicker">${escapeHtml(daypart.label)}推荐：</span>
    <span class="recommend-drink">${homeRecommendationNameMarkup(drink)}</span>
  `;
  elements.homeReason.textContent = `${homeWeatherCopy(state.homeWeather.type)}${daypart.copy}`;
  elements.homeTimeLabel.textContent = new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit" }).format(new Date());
  elements.homeWeatherLabel.textContent = state.homeWeather.label || weatherLabelFor(state.homeWeather.type, state.homeWeather.temperature);
  elements.homePickThumb.src = drink.image;
  elements.homePickThumb.alt = `${drink.name} 推荐图`;
  elements.homePickName.textContent = drink.name;
  if (elements.homeDrinkImage) {
    elements.homeDrinkImage.src = drink.image;
    elements.homeDrinkImage.alt = `${drink.name} 成品图`;
  }
  if (elements.homeDrinkName) elements.homeDrinkName.textContent = drink.name;
  if (elements.homeDrinkMeta) elements.homeDrinkMeta.textContent = `${drink.base} / ${drink.mood}`;
  if (elements.homeDrinkTaste) elements.homeDrinkTaste.textContent = drink.taste;
  if (elements.homeDrinkChips) {
    elements.homeDrinkChips.innerHTML = [state.homeWeather.source === "live" ? "实时天气" : "可手动切换", daypart.label, ...drink.tags.slice(0, 3)]
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");
  }
  elements.manualWeatherRow.querySelectorAll("[data-weather]").forEach((button) => {
    button.classList.toggle("active", button.dataset.weather === state.homeWeather.type);
  });
}

function renderHomeInventoryRecommendation() {
  const best = bestInventoryMatches()[0];
  if (!best) return;
  const { drink, match } = best;
  const missingCopy = match.missing.length ? `缺：${match.missing.slice(0, 3).map(displayInventoryItem).map(escapeHtml).join("、")}` : "库存已覆盖核心材料";
  const alternativeCopy = match.alternatives.length ? `可替代：${match.alternatives.map(({ item, alternative }) => `${escapeHtml(displayInventoryItem(alternative))} 顶 ${escapeHtml(displayInventoryItem(item))}`).join("；")}` : "";
  elements.homeInventoryCard.innerHTML = `
    <div>
      <span>家中库存推荐</span>
      <strong>${escapeHtml(drink.name)}</strong>
      <p>${escapeHtml(match.status)} · ${escapeHtml(missingCopy)}</p>
      ${alternativeCopy ? `<p>${alternativeCopy}</p>` : ""}
    </div>
    <button type="button" data-home-inventory-drink="${escapeHtml(drink.id)}">查看</button>
  `;
}

function renderHomeLessonCard() {
  const lesson = lessons[state.lessonIndex] || lessons[0];
  const candidates = lesson.drinks
    .map((id) => drinks.find((drink) => drink.id === id))
    .filter(Boolean)
    .map((drink) => ({ drink, match: inventoryMatchFor(drink) }))
    .sort((a, b) => a.match.missingCount - b.match.missingCount || b.match.score - a.match.score);
  const best = candidates[0];
  if (!best) return;
  elements.homeLessonCard.innerHTML = `
    <div>
      <span>今日练习</span>
      <strong>第 ${state.lessonIndex + 1} 天：${escapeHtml(lesson.title)}</strong>
      <p>${escapeHtml(best.drink.name)} · ${escapeHtml(best.match.status)}</p>
    </div>
    <button type="button" data-home-lesson>开始</button>
  `;
}

async function loadHomeWeather() {
  renderHomeRecommendation();
  renderHomeInventoryRecommendation();
  renderHomeLessonCard();
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("weather request failed");
        const data = await response.json();
        const temperature = data.current?.temperature_2m ?? null;
        const code = data.current?.weather_code;
        const type = classifyWeather(code, temperature);
        state.homeWeather = { type, label: weatherLabelFor(type, temperature), temperature, source: "live" };
        renderHomeRecommendation();
      } catch {
        state.homeWeather = { type: state.homeWeather.type, label: "天气服务暂不可用", temperature: null, source: "fallback" };
        renderHomeRecommendation();
      }
    },
    () => {
      state.homeWeather = { type: state.homeWeather.type, label: "未开启定位", temperature: null, source: "fallback" };
      renderHomeRecommendation();
    },
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 900000 }
  );
}

function practiceFocusFor(drink) {
  const recipeText = drink.recipe.map(([label]) => label).join(" ");
  const methodText = drink.method.join(" ");
  const hasCitrus = /柠檬|青柠|橙汁|西柚|葡萄柚/.test(recipeText);
  const hasSweetener = /糖|糖浆|蜂蜜|石榴/.test(recipeText);
  const hasCarbonation = /苏打|气泡|姜汁|可乐|香槟|普罗塞克|起泡/.test(recipeText);
  const hasCreamOrEgg = /蛋白|蛋黄|奶油|乳/.test(recipeText);
  const hasMintOrHerb = /薄荷|罗勒|香草|辣椒|姜/.test(recipeText);
  const hasVermouthOrBitter = /味美思|苦味利口酒|金巴利|阿佩罗|苦精|查特|菲奈/.test(recipeText);
  const likelyStirred = hasVermouthOrBitter && !hasCitrus && !hasCreamOrEgg && !hasCarbonation;
  const isBuilt = /直接|杯中|轻轻/.test(methodText) || drink.tags.includes("清爽");

  if (hasCreamOrEgg) {
    return {
      title: "泡沫与质地",
      copy: "这杯重点看摇和是否足够充分：泡沫要细，酒体要冷，入口不能有松散水感。",
      steps: ["先干摇或充分摇和", "观察泡沫细密度", "过滤后尽快品尝"]
    };
  }
  if (hasCarbonation) {
    return {
      title: "气泡保留",
      copy: "含气泡材料不要一起剧烈摇和，先完成主体降温，再补入气泡并轻柔融合。",
      steps: ["气泡最后加入", "轻提拉少搅动", "杯中保留上升感"]
    };
  }
  if (likelyStirred) {
    return {
      title: "搅拌清澈度",
      copy: "这类酒的重点是低温、稀释和清澈度。搅拌到杯壁冰冷即可，避免过度稀释。",
      steps: ["使用足量硬冰", "慢速稳定搅拌", "观察酒液清澈"]
    };
  }
  if (hasMintOrHerb) {
    return {
      title: "香气释放",
      copy: "薄荷、罗勒或姜只需要释放香气，不要捣到发苦；入口应先闻到清新的顶部香气。",
      steps: ["轻压不碾碎", "保留新鲜叶片", "装饰靠近鼻尖"]
    };
  }
  if (hasCitrus && hasSweetener) {
    return {
      title: "酸甜平衡",
      copy: "先按配方做一杯，再只调整 5 毫升糖或柑橘，比较酸度、甜感和酒体的变化。",
      steps: ["记录柑橘新鲜度", "小幅调整糖量", "注意摇和稀释"]
    };
  }
  if (isBuilt) {
    return {
      title: "杯中融合",
      copy: "这类酒不靠复杂技法，重点是加料顺序、冰块状态和轻柔融合后的第一口。",
      steps: ["先酒后修饰", "冰块填满杯身", "轻搅保持层次"]
    };
  }
  return {
    title: "比例记忆",
    copy: "先记住主体、修饰材料和稀释之间的比例，再尝试用同一骨架替换风味。",
    steps: ["拆分主体与修饰", "记录第一口印象", "只改一个变量"]
  };
}

function drinkText(drink) {
  return [drink.subtitle, drink.taste, ...(drink.recipe || []).flat(), ...(drink.method || []), ...(drink.tags || [])].join(" ");
}

function glassLabelFor(drink) {
  const glass = drink.visual?.glass;
  if (glass === "highball") return "高球杯";
  if (glass === "rocks") return "古典杯";
  if (glass === "flute") return "香槟杯";
  return "鸡尾酒杯";
}

function techniqueFor(drink) {
  const text = drinkText(drink);
  if (/奶油|蛋白|蛋黄/.test(text)) return "充分摇和";
  if (/摇和|柠檬|青柠|果汁|糖浆/.test(text)) return "摇和";
  if (/直接|杯中|补满|苏打|姜汁|可乐|气泡|香槟|普罗塞克|起泡/.test(text)) return "杯中调和";
  if (/搅拌|清澈|古典|味美思|金巴利|苦味利口酒/.test(text)) return "搅拌";
  return "调和";
}

function iceFor(drink) {
  const text = drinkText(drink);
  if (/香槟|普罗塞克|起泡/.test(text)) return "预冷杯具";
  if (drink.visual?.glass === "highball") return "长冰或满杯冰";
  if (drink.visual?.glass === "rocks") return "大冰块";
  if (/过滤到预冷|冰镇杯|清澈/.test(text)) return "摇和或搅拌用冰，出品不过冰";
  return "摇和用冰";
}

function garnishFor(drink) {
  const text = drinkText(drink);
  if (/橙皮|橙片/.test(text)) return "橙皮或橙片";
  if (/柠檬皮|柠檬片/.test(text)) return "柠檬皮或柠檬片";
  if (/青柠/.test(text)) return "青柠角";
  if (/薄荷/.test(text)) return "薄荷枝";
  if (/樱桃/.test(text)) return "鸡尾酒樱桃";
  if (/菠萝/.test(text)) return "菠萝片";
  if (/咖啡/.test(text)) return "咖啡豆";
  return "简洁出品";
}

function buildSpecsFor(drink) {
  return [
    ["标准杯型", glassLabelFor(drink)],
    ["冰块", iceFor(drink)],
    ["装饰物", garnishFor(drink)],
    ["技法", techniqueFor(drink)]
  ];
}

function scaleRecipeValue(value, servings) {
  return String(value).replace(/(\d+(?:\.\d+)?)(\s*)(毫升|滴|dash|茶匙|吧匙)/gi, (_, number, space, unit) => {
    const scaled = Number(number) * servings;
    const rounded = Number.isInteger(scaled) ? scaled : Math.round(scaled * 10) / 10;
    return `${rounded}${space}${unit}`;
  });
}

function substitutionFor(label) {
  const rules = [
    [/君度|柑曼怡|库拉索|橙味利口酒|橙酒/, "可用同类橙味利口酒替代；甜度不同就微调糖浆。"],
    [/金巴利|阿佩罗|苦味利口酒/, "可用同类苦味利口酒替代；金巴利更苦，阿佩罗更轻甜。"],
    [/味美思/, "可换同色味美思；开瓶超过一个月时风味会明显下降。"],
    [/青柠|柠檬/, "柑橘可互换试做，但酸香不同，先少量调整糖。"],
    [/糖浆|细砂糖|蜂蜜|枫糖/, "可用 1:1 糖浆作基础替代，蜂蜜和枫糖会带额外香气。"],
    [/咖啡利口酒/, "可用咖啡利口酒同类替代；甜度高的品牌减少糖。"],
    [/可可利口酒/, "可用可可利口酒同类替代，白可可更干净，深色可可更浓。"],
    [/杏仁|奥杰|杏仁糖浆/, "可用杏仁糖浆或奥杰糖浆替代，注意坚果香会很明显。"],
    [/朗姆|威士忌|伏特加|金酒|白兰地|干邑|龙舌兰/, "同大类基酒可以替换，但风味会明显变化，先保持用量不变。"]
  ];
  const match = rules.find(([pattern]) => pattern.test(label));
  return match?.[1] || "";
}

function substitutionSuggestionsFor(drink) {
  const general = drink.recipe
    .map(([label]) => [label, substitutionFor(label)])
    .filter(([, copy]) => copy)
    .slice(0, 4);
  const match = inventoryMatchFor(drink);
  const linked = match.alternatives.map(({ item, alternative }) => [displayInventoryItem(item), `你已有 ${displayInventoryItem(alternative)}，可先用它试做，再按甜度或苦度微调。`]);
  const missing = match.missing.slice(0, 3).map((item) => [displayInventoryItem(item), "当前库存没有覆盖，建议先补齐或在同类材料中选择替代。"]);
  return [...linked, ...general, ...missing].filter((entry, index, list) => list.findIndex(([label]) => label === entry[0]) === index).slice(0, 5);
}

function storyTextFor(drink, label) {
  return drink.story.find(([title]) => title.includes(label))?.[1] || "";
}

function storyStructureCopy(drink) {
  const ingredients = drink.recipe.map(([label]) => label).slice(0, 4).join("、");
  const method = techniqueFor(drink);
  const glass = glassLabelFor(drink);
  return `${drink.nameZh || drink.name}能流传下来，不只因为名字有记忆点，也因为结构清晰：${ingredients}构成了它的主要骨架。${method}技法与${glass}让这杯酒在温度、稀释和香气释放上形成稳定风格，所以后来调酒师即使调整品牌、比例或装饰，也能让人一眼认出它。`;
}

function storyOriginReading(drink) {
  const origin = storyTextFor(drink, "起源");
  if (origin.length >= 120) return origin;
  return `${origin} 这杯酒的早期叙述没有总是固定到唯一发明者；更可靠的读法，是把它放回当时的酒吧、酒店、社交或地域场景中理解。`;
}

function storyModernReading(drink) {
  const development = storyTextFor(drink, "近代发展");
  const family = drink.tags?.slice(0, 2).join("、") || drink.category;
  return `${development} 当代酒吧通常会保留它最醒目的骨架，再围绕${family}做细节调整：可能是换用不同产地的基酒、改变甜味材料，或让杯型和冰块更符合今天的饮用节奏。对学习者来说，它的价值在于能清楚看见“经典比例如何被现代化”，而不是只把它当作固定答案。`;
}

function relatedStoryDrinks(drink) {
  return drinks
    .filter((candidate) => candidate.id !== drink.id && (candidate.base === drink.base || candidate.category === drink.category || candidate.tags?.some((tag) => drink.tags?.includes(tag))))
    .slice(0, 4);
}

function todayFitCopyFor(drink) {
  if (drink.id !== state.homeDrinkId) return "";
  const daypart = currentDaypart();
  return `${daypart.label}推荐它：${homeWeatherCopy(state.homeWeather.type)}${daypart.copy}`;
}

function renderSelectedDrink() {
  const drink = selectedDrink();
  if (!drink) return;
  const practice = practiceFocusFor(drink);
  const todayFitCopy = todayFitCopyFor(drink);
  const inventoryMatch = inventoryMatchFor(drink);
  const substitutions = substitutionSuggestionsFor(drink);
  elements.drinkImage.src = drink.image;
  elements.drinkImage.alt = `${drink.name} 成品图`;
  elements.drinkName.textContent = drink.name;
  elements.drinkSubtitle.textContent = drink.subtitle;
  elements.drinkAbv.textContent = drink.abv;
  elements.drinkMood.textContent = drink.mood;
  elements.consoleDrinkName.textContent = drink.name;
  elements.difficulty.textContent = drink.difficulty;
  elements.drinkTaste.textContent = drink.taste;
  elements.todayFitCard.innerHTML = todayFitCopy ? `<strong>今日适配</strong><p>${escapeHtml(todayFitCopy)}</p>` : "";
  elements.todayFitCard.classList.toggle("visible", Boolean(todayFitCopy));
  elements.inventoryStatusCard.innerHTML = `
    <strong>${escapeHtml(inventoryMatch.status)}</strong>
    <p>${inventoryMatch.missing.length ? `缺少：${inventoryMatch.missing.map(displayInventoryItem).map(escapeHtml).join("、")}` : "你勾选的库存已经覆盖这杯的核心材料。"}${inventoryMatch.alternatives.length ? ` 可替代：${inventoryMatch.alternatives.map(({ item, alternative }) => `${escapeHtml(displayInventoryItem(alternative))} 顶 ${escapeHtml(displayInventoryItem(item))}`).join("；")}` : ""}</p>
  `;
  elements.tagRow.innerHTML = drink.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  elements.buildSpecs.innerHTML = buildSpecsFor(drink)
    .map(([label, value]) => `<div class="build-spec"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  elements.servingControl.querySelectorAll("[data-servings]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.servings) === state.recipeServings);
  });
  elements.recipeGrid.innerHTML = drink.recipe
    .map(([label, value]) => `<div class="recipe-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(scaleRecipeValue(value, state.recipeServings))}</strong></div>`)
    .join("");
  elements.substitutionCard.innerHTML = substitutions.length
    ? `<span class="panel-label">替代建议</span>${substitutions.map(([label, copy]) => `<p><strong>${escapeHtml(label)}</strong>${escapeHtml(copy)}</p>`).join("")}`
    : "";
  elements.substitutionCard.classList.toggle("visible", Boolean(substitutions.length));
  renderDrinkNotes(drink);
  elements.practiceTitle.textContent = practice.title;
  elements.practiceCopy.textContent = practice.copy;
  elements.practiceSteps.innerHTML = practice.steps.map((step) => `<span>${escapeHtml(step)}</span>`).join("");
  elements.methodList.innerHTML = drink.method.map((step, index) => `<li><span>${index + 1}</span><p>${escapeHtml(step)}</p></li>`).join("");
  elements.storyTitle.textContent = drink.storyTitle;
  elements.originYear.textContent = drink.originYear;
  elements.storyDeepDive.innerHTML = `
    <article class="story-reading-card">
      <span>起源细读</span>
      <p>${escapeHtml(storyOriginReading(drink))}</p>
    </article>
    <article class="story-reading-card">
      <span>近代发展</span>
      <p>${escapeHtml(storyModernReading(drink))}</p>
    </article>
    <article class="story-reading-card">
      <span>结构为什么能留下来</span>
      <p>${escapeHtml(storyStructureCopy(drink))}</p>
    </article>
  `;
  elements.storyRelated.innerHTML = `
    <span>继续读相近酒款</span>
    <div>
      ${relatedStoryDrinks(drink)
        .map((candidate) => `<button type="button" data-drink="${escapeHtml(candidate.id)}">${escapeHtml(candidate.name)}</button>`)
        .join("")}
    </div>
  `;
  const isFavorite = state.favorites.has(drink.id);
  elements.favoriteButton.classList.toggle("active", isFavorite);
  elements.favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  elements.favoriteButton.setAttribute("aria-label", isFavorite ? "取消收藏当前鸡尾酒" : "收藏当前鸡尾酒");
  elements.favoriteButton.title = isFavorite ? "取消收藏当前鸡尾酒" : "收藏当前鸡尾酒";
}

function renderFilters() {
  const options = [
    ["all", `全部 ${drinks.length}`],
    ...baseInventoryItems.map((base) => [base, `${base} ${drinks.filter((drink) => drinkUsesBase(drink, base)).length}`])
  ];
  elements.filterRow.innerHTML = options
    .map(([value, label]) => `<button class="filter ${value === state.filter ? "active" : ""}" data-filter="${escapeHtml(value)}">${escapeHtml(label)}</button>`)
    .join("");
}

function drinkUsesBase(drink, base) {
  if (drink.base === base || drink.inventory?.includes(base)) return true;
  const recipeNames = drink.recipe?.map(([label]) => label).join(" ") || "";
  return baseAliases[base].some((alias) => recipeNames.includes(alias) && !recipeNames.includes(`${alias}利口酒`));
}

function drinkMatchesQuery(drink, query) {
  if (!query) return true;
  const recipeText = drink.recipe?.flat().join(" ") || "";
  const haystack = [drink.name, drink.nameZh, drink.nameEn, drink.subtitle, drink.base, drink.category, ...drink.tags, drink.taste, drink.storyTitle, ...drink.inventory, ...(drink.liqueurTypes || []), recipeText].join(" ").toLowerCase();
  return haystack.includes(query);
}

function filteredDrinks() {
  const query = state.query.trim().toLowerCase();
  return drinks.filter((drink) => {
    const matchesFilter = state.filter === "all" || drinkUsesBase(drink, state.filter);
    const matchesQuery = drinkMatchesQuery(drink, query);
    return matchesFilter && matchesQuery;
  });
}

function drinkCardMarkup(drink) {
  const match = inventoryMatchFor(drink);
  const chipClass = match.missingCount === 0 ? "ready" : match.missingCount <= 2 ? "near" : "";
  return `
    <button class="drink-card ${drink.id === state.selectedId ? "active" : ""}" data-drink="${drink.id}">
      <img src="${drink.image}" alt="${escapeHtml(drink.name)} 成品图" loading="lazy" decoding="async" />
      <span class="drink-card-body">
        <span class="make-chip ${chipClass}">${escapeHtml(match.status)}</span>
        <strong>${escapeHtml(drink.name)}</strong>
        <span>${escapeHtml(drink.subtitle)}</span>
      </span>
    </button>
  `;
}

function emptyListMarkup(title, copy) {
  return `
    <div class="empty-list">
      <span>没有结果</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(copy)}</p>
    </div>
  `;
}

function renderCards() {
  const results = filteredDrinks();
  elements.resultCount.textContent = `${results.length} 款`;
  elements.consoleResultCount.textContent = `${results.length} 款`;
  const query = state.query.trim().toLowerCase();
  if (state.filter === "all") {
    elements.drinkCards.className = "base-groups all-groups";
    const groups = alphabetGroups(results);
    if (!groups.length) {
      elements.drinkCards.innerHTML = emptyListMarkup("没有找到匹配的鸡尾酒", "可以换一个酒名、材料、风味词，或清空搜索后重新浏览。");
      return;
    }
    elements.drinkCards.innerHTML = groups
      .map(
        ({ letter, groupDrinks }) => `
          <section class="base-group">
            <div class="base-group-head">
              <h3>${escapeHtml(letter)}</h3>
              <span>${groupDrinks.length} 款</span>
            </div>
            <div class="card-strip base-card-strip">
              ${groupDrinks.map(drinkCardMarkup).join("")}
            </div>
          </section>
        `
      )
      .join("");
    return;
  }

  elements.drinkCards.className = "base-groups base-filter-groups";
  const visibleBases = state.filter === "all" ? baseInventoryItems : baseInventoryItems.filter((base) => base === state.filter);
  const groups = visibleBases
    .map((base) => {
      const groupDrinks = drinks.filter((drink) => drinkUsesBase(drink, base) && drinkMatchesQuery(drink, query));
      return { base, groupDrinks };
    })
    .filter(({ groupDrinks }) => groupDrinks.length);

  if (!groups.length) {
    elements.drinkCards.innerHTML = emptyListMarkup("没有找到匹配的鸡尾酒", "当前分类里没有符合搜索条件的酒，换个关键词或回到“全部”会更容易找到。");
    return;
  }

  elements.drinkCards.innerHTML = groups
    .map(
      ({ base, groupDrinks }) => `
        <section class="base-group">
          <div class="base-group-head">
            <h3>${escapeHtml(base)}</h3>
            <span>${groupDrinks.length} 款</span>
          </div>
          <div class="card-strip base-card-strip">
            ${groupDrinks.map(drinkCardMarkup).join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function favoriteDrinks() {
  return drinks
    .filter((drink) => state.favorites.has(drink.id))
    .sort((a, b) => (a.nameEn || a.name).localeCompare(b.nameEn || b.name, "en", { sensitivity: "base" }));
}

function favoriteCardMarkup(drink) {
  const match = inventoryMatchFor(drink);
  const chipClass = match.missingCount === 0 ? "ready" : match.missingCount <= 2 ? "near" : "";
  return `
    <article class="favorite-card ${drink.id === state.selectedId ? "active" : ""}">
      <button class="favorite-card-open" type="button" data-favorite-drink="${escapeHtml(drink.id)}" aria-label="查看 ${escapeHtml(drink.name)} 的完整配方">
        <img src="${drink.image}" alt="${escapeHtml(drink.name)} 成品图" loading="lazy" decoding="async" />
        <span class="favorite-card-body">
          <span class="make-chip ${chipClass}">${escapeHtml(match.status)}</span>
          <strong>${escapeHtml(drink.name)}</strong>
          <span>${escapeHtml(drink.subtitle)}</span>
        </span>
      </button>
      <div class="favorite-card-actions">
        <button class="small-button neutral" type="button" data-favorite-drink="${escapeHtml(drink.id)}">查看配方</button>
        <button class="small-button favorite-remove" type="button" data-unfavorite="${escapeHtml(drink.id)}">取消收藏</button>
      </div>
    </article>
  `;
}

function renderFavorites() {
  const favorites = favoriteDrinks();
  elements.favoriteCount.textContent = `${favorites.length} 款`;
  if (state.activeView === "favorites") {
    elements.consoleResultCount.textContent = `${favorites.length} 款`;
  }
  if (!favorites.length) {
    elements.favoriteSummary.innerHTML = `
      <div class="favorite-empty">
        <strong>还没有收藏的鸡尾酒</strong>
        <p>在图鉴页点亮心形按钮后，这里会集中显示你的私人酒单。${escapeHtml(localDataCopy())}</p>
        <button class="primary-button compact-action" type="button" data-open-collection>去酒单挑选</button>
      </div>
    `;
    elements.favoriteCards.innerHTML = "";
    return;
  }
  const readyCount = favorites.filter((drink) => inventoryMatchFor(drink).missingCount === 0).length;
  const bases = [...new Set(favorites.map((drink) => drink.base).filter(Boolean))];
  elements.favoriteSummary.innerHTML = `
    <div class="favorite-stat">
      <span>已收藏</span>
      <strong>${favorites.length}</strong>
    </div>
    <div class="favorite-stat">
      <span>当前可做</span>
      <strong>${readyCount}</strong>
    </div>
    <div class="favorite-stat wide">
      <span>覆盖风格</span>
      <strong>${bases.map(escapeHtml).join("、") || "待扩展"}</strong>
    </div>
  `;
  elements.favoriteCards.innerHTML = favorites.map(favoriteCardMarkup).join("");
}

function alphabetGroups(list) {
  const sorted = [...list].sort((a, b) => (a.nameEn || a.name).localeCompare(b.nameEn || b.name, "en", { sensitivity: "base" }));
  return sorted.reduce((groups, drink) => {
    const first = (drink.nameEn || drink.name || "#").trim().charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : "#";
    const group = groups.find((item) => item.letter === letter);
    if (group) group.groupDrinks.push(drink);
    else groups.push({ letter, groupDrinks: [drink] });
    return groups;
  }, []);
}

function inventoryItemMarkup(item, className = "inventory-item") {
  return `
    <label class="${className}">
      <input type="checkbox" value="${escapeHtml(item)}" ${state.inventory.has(item) ? "checked" : ""} />
      ${escapeHtml(displayInventoryItem(item))}
    </label>
  `;
}

function inventoryGroups() {
  const groupedItems = new Set(inventoryGroupDefinitions.flatMap((group) => group.items));
  const groups = inventoryGroupDefinitions
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => inventoryItems.includes(item))
    }))
    .filter((group) => group.items.length);
  const otherItems = inventoryItems.filter((item) => !groupedItems.has(item));
  if (otherItems.length) {
    groups.push({
      title: "其他材料",
      copy: "较少见，但部分经典配方会用到。",
      items: otherItems
    });
  }
  return groups;
}

function inventoryGroupMarkup(group) {
  const owned = group.items.filter((item) => state.inventory.has(item)).length;
  return `
    <section class="inventory-group">
      <div class="inventory-group-head">
        <div>
          <strong>${escapeHtml(group.title)}</strong>
          <span>${escapeHtml(group.copy)}</span>
        </div>
        <em>${owned}/${group.items.length}</em>
      </div>
      <div class="inventory-group-items">
        ${group.items.map((item) => inventoryItemMarkup(item)).join("")}
      </div>
    </section>
  `;
}

function renderSimulatorInventory() {
  elements.simulatorInventoryGrid.innerHTML = quickInventoryItems.map((item) => inventoryItemMarkup(item, "quick-inventory-item")).join("");
  const ownedQuickCount = quickInventoryItems.filter((item) => state.inventory.has(item)).length;
  elements.simulatorInventoryCount.textContent = `${ownedQuickCount} 项`;
}

function nextInventorySuggestion(matches) {
  const counts = new Map();
  matches
    .filter(({ match }) => match.missingCount === 1)
    .forEach(({ match }) => {
      const item = match.missing[0];
      counts.set(item, (counts.get(item) || 0) + 1);
    });
  const [item, count] = [...counts.entries()].sort((a, b) => b[1] - a[1] || displayInventoryItem(a[0]).localeCompare(displayInventoryItem(b[0]), "zh-Hans-CN"))[0] || [];
  return item ? { item, count } : null;
}

function renderWorkbenchOverview(matches) {
  const readyCount = matches.filter(({ match }) => match.missingCount === 0).length;
  const nearCount = matches.filter(({ match }) => match.missingCount === 1).length;
  const ownedCount = state.inventory.size;
  const suggestion = nextInventorySuggestion(matches);
  if (elements.inventoryOwnedCount) elements.inventoryOwnedCount.textContent = `${ownedCount} 项`;
  elements.workbenchOverview.innerHTML = `
    <div class="workbench-stat">
      <span>已有材料</span>
      <strong>${ownedCount}</strong>
    </div>
    <div class="workbench-stat">
      <span>可立即制作</span>
      <strong>${readyCount}</strong>
    </div>
    <div class="workbench-stat">
      <span>差 1 样</span>
      <strong>${nearCount}</strong>
    </div>
    <div class="workbench-next-step">
      <span>下一步</span>
      <strong>${suggestion ? `补 ${escapeHtml(displayInventoryItem(suggestion.item))}` : "直接生成原创配方"}</strong>
      <p>${suggestion ? `补齐后大约多 ${suggestion.count} 款经典酒更接近可做。` : "当前库存已经覆盖不少经典结构，可以先做小杯版本。"} </p>
      <div>
        <button class="small-button neutral" type="button" data-workbench-action="generate">生成原创</button>
        <button class="small-button" type="button" data-workbench-action="inventory">整理材料</button>
      </div>
    </div>
  `;
}

function renderInventory() {
  renderSimulatorInventory();
  renderHomeInventoryRecommendation();

  const matches = bestInventoryMatches();
  renderWorkbenchOverview(matches);
  elements.inventoryGrid.innerHTML = inventoryGroups().map(inventoryGroupMarkup).join("");
  const sections = [
    ["可立即制作", matches.filter(({ match }) => match.missingCount === 0).slice(0, 8)],
    ["差 1 样", matches.filter(({ match }) => match.missingCount === 1).slice(0, 8)],
    ["差 2 样", matches.filter(({ match }) => match.missingCount === 2).slice(0, 8)]
  ].filter(([, items]) => items.length);

  elements.matchList.innerHTML = sections.length
    ? sections
        .map(
          ([title, items]) => `
            <section class="inventory-match-section">
              <div class="inventory-match-head"><strong>${title}</strong><span>${items.length} 款</span></div>
              ${items
                .map(({ drink, match }) => {
                  const missingCopy = match.missing.length ? `缺：${match.missing.map(displayInventoryItem).map(escapeHtml).join("、")}` : "材料齐全";
                  const altCopy = match.alternatives.length ? ` · 可替代：${match.alternatives.map(({ item, alternative }) => `${escapeHtml(displayInventoryItem(alternative))} 顶 ${escapeHtml(displayInventoryItem(item))}`).join("；")}` : "";
                  return `<button class="match-row" type="button" data-drink="${escapeHtml(drink.id)}"><strong>${escapeHtml(drink.name)}</strong><span>${match.covered}/${match.total} ${missingCopy}${altCopy}</span></button>`;
                })
                .join("")}
            </section>
          `
        )
        .join("")
    : `<div class="match-row empty-match"><strong>还没有接近可做的酒</strong><span>先勾选几种基酒、柑橘、糖浆或苦精，系统会自动更新可做清单。</span></div>`;
}

function lessonDrinkCards(lesson) {
  return lesson.drinks
    .map((id) => drinks.find((drink) => drink.id === id))
    .filter(Boolean)
    .map((drink) => {
      const match = inventoryMatchFor(drink);
      const chipClass = match.missingCount === 0 ? "ready" : match.missingCount <= 2 ? "near" : "";
      return `
        <button class="lesson-drink-card" type="button" data-drink="${escapeHtml(drink.id)}">
          <img src="${drink.image}" alt="${escapeHtml(drink.name)} 成品图" />
          <span class="make-chip ${chipClass}">${escapeHtml(match.status)}</span>
          <strong>${escapeHtml(drink.name)}</strong>
          <span>${escapeHtml(drink.subtitle)}</span>
        </button>
      `;
    })
    .join("");
}

function renderLessonDetail() {
  const lesson = lessons[state.lessonIndex] || lessons[0];
  const isDone = state.completedLessons.has(String(state.lessonIndex));
  elements.lessonDetail.innerHTML = `
    <div class="lesson-detail-head">
      <div>
        <span class="panel-label">第 ${state.lessonIndex + 1} 天</span>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p>${escapeHtml(lesson.copy)}</p>
      </div>
      <button class="small-button neutral" type="button" data-complete-lesson="${state.lessonIndex}">
        ${isDone ? "已完成" : "标记完成"}
      </button>
    </div>
    <div class="lesson-drink-grid">${lessonDrinkCards(lesson)}</div>
    <div class="lesson-task-list">
      ${lesson.tasks.map((task, index) => `<div class="lesson-task"><span>${index + 1}</span><p>${escapeHtml(task)}</p></div>`).join("")}
    </div>
    <button class="primary-button lesson-note-button" type="button" data-lesson-note>写练习笔记</button>
  `;
}

function renderLessons() {
  const doneCount = state.completedLessons.size;
  $("#lessonDone").textContent = doneCount;
  elements.lessonList.innerHTML = lessons
    .map(
      (lesson, index) => `
        <button class="lesson-row ${state.completedLessons.has(String(index)) ? "done" : ""} ${state.lessonIndex === index ? "active" : ""}" type="button" data-lesson="${index}">
          <span class="lesson-step">${state.completedLessons.has(String(index)) ? "✓" : index + 1}</span>
          <div><strong>${escapeHtml(lesson.title)}</strong><span>${escapeHtml(lesson.copy)}</span></div>
        </button>
      `
    )
    .join("");
  renderLessonDetail();
}

function normalizeNote(note) {
  return {
    text: note.text || "",
    time: note.time || "",
    drinkId: note.drinkId || "",
    drinkName: note.drinkName || "",
    lessonIndex: typeof note.lessonIndex === "number" ? note.lessonIndex : null,
    lessonTitle: note.lessonTitle || "",
    adjustment: note.adjustment || "",
    ratings: note.ratings || null
  };
}

function renderNoteFormOptions() {
  elements.noteDrinkSelect.innerHTML = `<option value="">不关联酒款</option>${drinks
    .map((drink) => `<option value="${escapeHtml(drink.id)}">${escapeHtml(drink.name)}</option>`)
    .join("")}`;
  elements.noteLessonSelect.innerHTML = `<option value="">不关联课程</option>${lessons
    .map((lesson, index) => `<option value="${index}">第 ${index + 1} 天：${escapeHtml(lesson.title)}</option>`)
    .join("")}`;
  elements.noteDrinkSelect.value = state.selectedId || "";
  elements.noteLessonSelect.value = String(state.lessonIndex);
}

function noteRatingFields() {
  return [
    ["酸度", elements.noteAcidRange],
    ["甜度", elements.noteSweetRange],
    ["酒体", elements.noteBodyRange],
    ["香气", elements.noteAromaRange],
    ["平衡", elements.noteBalanceRange]
  ];
}

function renderNoteRatingValues() {
  elements.noteAcidValue.textContent = elements.noteAcidRange.value;
  elements.noteSweetValue.textContent = elements.noteSweetRange.value;
  elements.noteBodyValue.textContent = elements.noteBodyRange.value;
  elements.noteAromaValue.textContent = elements.noteAromaRange.value;
  elements.noteBalanceValue.textContent = elements.noteBalanceRange.value;
}

function noteRatingsFromForm() {
  return Object.fromEntries(noteRatingFields().map(([label, input]) => [label, Number(input.value)]));
}

function ratingText(ratings) {
  if (!ratings) return "";
  return Object.entries(ratings)
    .map(([label, value]) => `${label}${value}`)
    .join(" / ");
}

function noteAverageScore(ratings) {
  if (!ratings) return null;
  const values = Object.values(ratings).filter((value) => Number.isFinite(value));
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function renderNoteStats(notes) {
  if (!elements.noteStats) return;
  const drinkCount = new Set(notes.filter((note) => note.drinkId).map((note) => note.drinkId)).size;
  const scores = notes.map((note) => noteAverageScore(note.ratings)).filter((score) => score !== null);
  const averageScore = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "—";
  const latestNote = notes[0];

  if (elements.noteCount) {
    elements.noteCount.textContent = `${notes.length} 条`;
  }

  elements.noteStats.innerHTML = `
    <article class="note-stat-card">
      <span>累计记录</span>
      <strong>${notes.length}</strong>
      <p>${notes.length ? "每一次微调都会留在这里" : localDataCopy()}</p>
    </article>
    <article class="note-stat-card">
      <span>覆盖酒款</span>
      <strong>${drinkCount}</strong>
      <p>${drinkCount ? "已关联到具体鸡尾酒" : "保存时可关联酒款"}</p>
    </article>
    <article class="note-stat-card">
      <span>平均评分</span>
      <strong>${averageScore}</strong>
      <p>${latestNote ? `最近：${escapeHtml(latestNote.drinkName || latestNote.lessonTitle || "品鉴笔记")}` : "酸甜酒体香气和平衡"}</p>
    </article>
  `;
}

function renderHomeRecentNote() {
  if (!elements.homeRecentNoteCard) return;
  const note = state.notes.map(normalizeNote)[0];
  if (!note) {
    elements.homeRecentNoteCard.innerHTML = `
      <div>
        <span>开始使用</span>
        <strong>先整理材料，再收藏想做的酒</strong>
        <p>${escapeHtml(localDataCopy())}之后推荐、酒单和笔记会更贴近你的吧台。</p>
      </div>
      <button type="button" data-open-workbench>整理</button>
    `;
    return;
  }
  elements.homeRecentNoteCard.innerHTML = `
    <div>
      <span>最近复盘</span>
      <strong>${escapeHtml(note.drinkName || note.lessonTitle || "品鉴笔记")}</strong>
      <p>${escapeHtml(note.text.slice(0, 58))}${note.text.length > 58 ? "..." : ""}</p>
    </div>
    <button type="button" data-open-notes>查看</button>
  `;
}

function renderDrinkNotes(drink) {
  const notes = state.notes.map(normalizeNote).filter((note) => note.drinkId === drink.id).slice(0, 3);
  if (!notes.length) {
    elements.drinkNotesCard.innerHTML = "";
    elements.drinkNotesCard.classList.remove("visible");
    return;
  }
  elements.drinkNotesCard.innerHTML = `<span class="panel-label">历史笔记</span>${notes
    .map((note) => `<p><strong>${escapeHtml(note.time)}</strong>${escapeHtml(note.adjustment || "原配方")} · ${escapeHtml(ratingText(note.ratings) || "未评分")}<br>${escapeHtml(note.text)}</p>`)
    .join("")}`;
  elements.drinkNotesCard.classList.add("visible");
}

function renderNotes() {
  const query = state.noteQuery.trim().toLowerCase();
  const allNotes = state.notes.map(normalizeNote);
  renderNoteStats(allNotes);
  renderBackupSummary();

  const notes = allNotes.filter((note) => {
    const haystack = [note.text, note.drinkName, note.lessonTitle, note.adjustment, ratingText(note.ratings)].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });

  if (!notes.length) {
    elements.noteList.innerHTML = `
      <div class="note-empty">
        <span>${query ? "没有找到匹配的日志" : "还没有品鉴日志"}</span>
        <strong>${query ? "换个关键词再试试" : "保存一次调配想法后会显示在这里"}</strong>
        <p>${query ? "可以搜索酒名、课程、调整方式或评分文字。" : `建议记录配方调整、入口感受、余味和下一次想试的方向。${localDataCopy()}`}</p>
      </div>
    `;
    renderHomeRecentNote();
    return;
  }
  elements.noteList.innerHTML = notes
    .slice(0, 8)
    .map(
      (note) => `
        <button class="note-item note-log-card" type="button" ${note.drinkId ? `data-note-drink="${escapeHtml(note.drinkId)}"` : ""}>
          <span class="note-card-kicker">${escapeHtml(note.time)}${note.lessonTitle ? ` · ${escapeHtml(note.lessonTitle)}` : ""}</span>
          <strong>${escapeHtml(note.drinkName || note.lessonTitle || "品鉴笔记")}</strong>
          <div class="note-card-meta">
            <em>${escapeHtml(note.adjustment || "原配方")}</em>
            ${note.ratings ? `<span>${escapeHtml(ratingText(note.ratings))}</span>` : `<span>未评分</span>`}
          </div>
          <p>${escapeHtml(note.text)}</p>
        </button>
      `
    )
    .join("");
  renderHomeRecentNote();
}

function chooseIngredient(options, useInventory) {
  if (useInventory) {
    const owned = options.find((option) => option.needs.every((need) => state.inventory.has(canonicalInventoryItem(need))));
    if (owned) return owned;
  }
  return options[0];
}

function citrusFor(acid, useInventory) {
  const strong = [
    { label: "新鲜青柠汁 25 毫升", needs: ["青柠"] },
    { label: "新鲜柠檬汁 22.5 毫升", needs: ["柠檬汁"] }
  ];
  const gentle = [
    { label: "新鲜柠檬汁 18 毫升", needs: ["柠檬汁"] },
    { label: "新鲜青柠汁 20 毫升", needs: ["青柠"] }
  ];
  const soft = [
    { label: "新鲜柠檬汁 12.5 毫升", needs: ["柠檬汁"] },
    { label: "新鲜青柠汁 15 毫升", needs: ["青柠"] }
  ];
  return chooseIngredient(acid > 62 ? strong : acid < 38 ? soft : gentle, useInventory);
}

function sweetenerFor(sweet, base) {
  if (sweet > 70 && base === "龙舌兰") return { label: "龙舌兰糖浆 15 毫升", needs: ["糖/糖浆"] };
  if (sweet > 70) return { label: "蜂蜜糖浆 15 毫升", needs: ["糖/糖浆"] };
  if (sweet < 34) return { label: "糖浆 5 毫升", needs: ["糖/糖浆"] };
  return { label: "糖浆 10 毫升", needs: ["糖/糖浆"] };
}

function simulatorName(base, flavor, sweet, acid) {
  const baseNames = {
    朗姆: "糖蔗",
    威士忌: "橡木",
    伏特加: "冰线",
    金酒: "松针",
    龙舌兰: "荒原",
    白兰地: "葡萄"
  };
  const flavorNames = {
    清爽草本: acid > 65 ? "晨风" : "绿庭",
    热带果香: sweet > 62 ? "岛屿" : "海雾",
    烟熏浓郁: "余温",
    苦甜餐前: "暮光",
    奶油甜点感: "夜航"
  };
  return `${baseNames[base]}${flavorNames[flavor]}`;
}

function balanceText(flavor, sweet, acid) {
  if (flavor === "苦甜餐前") {
    return acid > 64 ? "收口偏干，苦味更清晰" : sweet > 62 ? "入口更圆，苦甜更柔和" : "苦甜均衡，适合餐前慢饮";
  }
  if (flavor === "烟熏浓郁") {
    return sweet > 68 ? "甜感会放大木质和焦糖气息" : "基酒感突出，收口更干净";
  }
  if (acid > sweet + 16) return "酸度更突出，收口清脆";
  if (sweet > acid + 16) return "甜感更圆润，适合做长饮";
  return "酸甜平衡，入口干净";
}

function similarClassicsFor(profile, base) {
  const fromProfile = profile.similarIds
    .map((id) => drinks.find((drink) => drink.id === id))
    .filter(Boolean);
  const fromBase = drinks
    .filter((drink) => drink.base === base && !fromProfile.some((classic) => classic.id === drink.id))
    .slice(0, 2);
  return [...fromProfile, ...fromBase].slice(0, 3);
}

function riskTipsFor({ base, flavor, sweet, acid, missing }) {
  const tips = [];
  if (sweet > 75) tips.push("甜感偏高：先减少 5 毫升糖浆，避免利口酒和果汁叠加后发腻。");
  if (acid > 75 && !["苦甜餐前", "烟熏浓郁", "奶油甜点感"].includes(flavor)) tips.push("酸度偏高：摇和后先试一小口，必要时补 5 毫升糖浆。");
  if (acid < 35 && sweet < 45 && !["苦甜餐前", "烟熏浓郁"].includes(flavor)) tips.push("结构可能偏薄：提高柑橘或糖浆任一项，让酒体更完整。");
  if (base === "龙舌兰" && flavor === "奶油甜点感") tips.push("龙舌兰和奶油会有明显风格冲突，建议加入咖啡或可可方向把香气接起来。");
  if (flavor === "苦甜餐前" && sweet < 36) tips.push("餐前酒过干会显得尖锐，可以把味美思增加 5 毫升。");
  if (missing.length > 2) tips.push("库存缺口较多：先把缺少材料控制在 1-2 样，试饮更容易判断问题来自哪里。");
  if (!missing.length) tips.push("库存匹配很好：可以直接先做小杯版本，再只改一个变量复盘。");
  return tips.slice(0, 3);
}

function buildGeneratedRecipe() {
  const base = baseInventoryItems.includes(elements.baseSelect.value) ? elements.baseSelect.value : "朗姆";
  const flavor = simulatorProfiles[elements.flavorSelect.value] ? elements.flavorSelect.value : "清爽草本";
  const sweet = Number.isFinite(Number(elements.sweetRange.value)) ? Number(elements.sweetRange.value) : 45;
  const acid = Number.isFinite(Number(elements.acidRange.value)) ? Number(elements.acidRange.value) : 58;
  const useInventory = elements.useInventoryToggle.checked;
  const profile = simulatorProfiles[flavor];
  const ingredients = [{ label: `${base} 45 毫升`, needs: [base] }];

  if (["清爽草本", "热带果香"].includes(flavor)) {
    ingredients.push(citrusFor(acid, useInventory), sweetenerFor(sweet, base));
  } else if (flavor === "烟熏浓郁") {
    ingredients[0] = { label: `${base} 50 毫升`, needs: [base] };
  } else if (flavor === "奶油甜点感") {
    ingredients[0] = { label: `${base} 40 毫升`, needs: [base] };
    if (sweet < 45) ingredients.push({ label: "冷萃咖啡 15 毫升", needs: ["特色辅料"] });
  } else if (flavor === "苦甜餐前" && acid > 68) {
    ingredients.push({ label: "柠檬皮 扭转释香", needs: ["特色辅料"] });
  }

  profile.slots.forEach((slot) => {
    ingredients.push(chooseIngredient(slot, useInventory));
  });

  const missing = [...new Set(ingredients.flatMap((ingredient) => ingredient.needs).map(canonicalInventoryItem).filter((need) => !state.inventory.has(need)))];
  const similar = similarClassicsFor(profile, base);
  return {
    id: `${Date.now()}-${Math.round(Math.random() * 1000)}`,
    name: simulatorName(base, flavor, sweet, acid),
    base,
    flavor,
    sweet,
    acid,
    structure: profile.structure,
    logic: profile.logic,
    method: profile.method,
    balance: balanceText(flavor, sweet, acid),
    ingredients,
    missing,
    similar,
    tips: riskTipsFor({ base, flavor, sweet, acid, missing })
  };
}

function renderGeneratedRecipe(recipe) {
  const missingCopy = recipe.missing.length ? `还差：${recipe.missing.map(displayInventoryItem).map(escapeHtml).join("、")}` : "家中库存已覆盖这杯的核心材料";
  elements.generatedCard.innerHTML = `
    <div class="generated-head">
      <div>
        <span class="panel-label">原创草案</span>
        <h3>${escapeHtml(recipe.name)}</h3>
      </div>
      <span class="status-chip">${escapeHtml(recipe.structure)}</span>
    </div>
    <p>${escapeHtml(recipe.base)}作为主体，走${escapeHtml(recipe.flavor)}方向；${escapeHtml(recipe.balance)}。</p>
    <div class="logic-grid">
      <div>
        <strong>结构逻辑</strong>
        <span>${escapeHtml(recipe.logic)}</span>
      </div>
      <div>
        <strong>做法</strong>
        <span>${escapeHtml(recipe.method)}</span>
      </div>
    </div>
    <div class="generated-meta">
      <span>甜度 ${recipe.sweet}</span>
      <span>酸度 ${recipe.acid}</span>
      <span>${missingCopy}</span>
    </div>
    <ul class="ingredient-list">
      ${recipe.ingredients.map((ingredient) => `<li><span>${escapeHtml(ingredient.label)}</span></li>`).join("")}
    </ul>
    <div class="classic-links">
      <strong>相似经典</strong>
      ${recipe.similar.map((drink) => `<button type="button" data-drink-link="${drink.id}">${escapeHtml(drink.name)}</button>`).join("")}
    </div>
    <ul class="risk-list">
      ${recipe.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
    </ul>
    <button class="primary-button compact-button" type="button" data-save-creation>
      <svg><use href="#icon-save"></use></svg>
      保存原创配方
    </button>
  `;
}

function renderCreationList() {
  if (!state.creations.length) {
    elements.creationList.innerHTML = `
      <div class="creation-item empty">
        <strong>还没有保存的原创配方</strong>
        <span>生成一杯满意的草案后，可以把它留在这里继续微调。</span>
      </div>
    `;
    return;
  }
  elements.creationList.innerHTML = state.creations
    .slice(0, 5)
    .map(
      (creation) => `
        <article class="creation-item">
          <div>
            <strong>${escapeHtml(creation.name)}</strong>
            <span>${escapeHtml(creation.structure)} · ${escapeHtml(creation.base)} · ${escapeHtml(creation.flavor)}</span>
          </div>
          <p>${creation.ingredients.map((ingredient) => escapeHtml(ingredient.label)).join(" / ")}</p>
          <button type="button" class="small-button" data-delete-creation="${escapeHtml(creation.id)}">删除</button>
        </article>
      `
    )
    .join("");
}

function saveGeneratedCreation() {
  if (!state.generatedRecipe) return;
  const signature = state.generatedRecipe.ingredients.map((ingredient) => ingredient.label).join("|");
  const exists = state.creations.some((creation) => {
    const creationSignature = creation.ingredients.map((ingredient) => ingredient.label).join("|");
    return creation.name === state.generatedRecipe.name && creation.sweet === state.generatedRecipe.sweet && creation.acid === state.generatedRecipe.acid && creationSignature === signature;
  });
  const saved = {
    name: state.generatedRecipe.name,
    base: state.generatedRecipe.base,
    flavor: state.generatedRecipe.flavor,
    sweet: state.generatedRecipe.sweet,
    acid: state.generatedRecipe.acid,
    structure: state.generatedRecipe.structure,
    balance: state.generatedRecipe.balance,
    ingredients: state.generatedRecipe.ingredients,
    missing: state.generatedRecipe.missing,
    id: `${Date.now()}`,
    savedAt: new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date())
  };
  if (!exists) state.creations.unshift(saved);
  persist();
  renderCreationList();
}

function generateCocktail() {
  state.generatedRecipe = buildGeneratedRecipe();
  renderGeneratedRecipe(state.generatedRecipe);
}

function personalDataSnapshot() {
  return {
    favorites: [...state.favorites],
    inventory: [...state.inventory],
    notes: state.notes,
    creations: state.creations,
    lessonIndex: state.lessonIndex,
    completedLessons: [...state.completedLessons]
  };
}

function backupSummaryText() {
  return `当前：收藏 ${state.favorites.size} 款，库存 ${state.inventory.size} 项，笔记 ${state.notes.length} 条，原创配方 ${state.creations.length} 条。`;
}

function backupSummaryFromData(data) {
  return `将导入：收藏 ${data.favorites.length} 款，库存 ${data.inventory.length} 项，笔记 ${data.notes.length} 条，原创配方 ${data.creations.length} 条。`;
}

function setBackupStatus(message, tone = "") {
  if (!elements.dataBackupStatus) return;
  elements.dataBackupStatus.textContent = message;
  elements.dataBackupStatus.classList.remove("success", "warning");
  if (tone) elements.dataBackupStatus.classList.add(tone);
}

function renderBackupSummary() {
  setBackupStatus(`${backupSummaryText()} ${localDataCopy()}`);
}

function backupFileName() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("");
  return `barcraft-backup-${stamp}.json`;
}

function exportPersonalData() {
  const payload = {
    app: "BarCraft",
    version: 1,
    exportedAt: new Date().toISOString(),
    source: {
      origin: window.location.origin,
      path: window.location.pathname
    },
    data: personalDataSnapshot()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = backupFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setBackupStatus(`已生成备份文件。${backupSummaryText()}`, "success");
}

function normalizedStringArray(value, allowedValues = null) {
  if (!Array.isArray(value)) return [];
  const allowed = allowedValues ? new Set(allowedValues) : null;
  return [...new Set(value.map((item) => String(item || "").trim()).filter((item) => item && (!allowed || allowed.has(item))))];
}

function normalizeImportedInventory(value) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(inventoryItems);
  return [
    ...new Set(
      value
        .map((item) => canonicalInventoryItem(String(item || "").trim()))
        .filter((item) => item && allowed.has(item))
    )
  ];
}

function normalizeImportedNote(note) {
  if (!note || typeof note !== "object") return null;
  const normalized = normalizeNote(note);
  normalized.ratings = note.ratings && typeof note.ratings === "object" ? note.ratings : null;
  if (!normalized.text && !normalized.drinkId && !normalized.lessonTitle) return null;
  return normalized;
}

function normalizeImportedCreation(creation) {
  if (!creation || typeof creation !== "object") return null;
  const ingredients = Array.isArray(creation.ingredients)
    ? creation.ingredients
        .filter((ingredient) => ingredient && typeof ingredient === "object")
        .map((ingredient) => ({
          label: String(ingredient.label || ""),
          needs: Array.isArray(ingredient.needs) ? ingredient.needs.map((need) => String(need || "")).filter(Boolean) : []
        }))
        .filter((ingredient) => ingredient.label)
    : [];
  if (!creation.name || !ingredients.length) return null;
  return {
    id: String(creation.id || Date.now()),
    name: String(creation.name),
    base: String(creation.base || ""),
    flavor: String(creation.flavor || ""),
    sweet: Number.isFinite(Number(creation.sweet)) ? Number(creation.sweet) : 45,
    acid: Number.isFinite(Number(creation.acid)) ? Number(creation.acid) : 58,
    structure: String(creation.structure || ""),
    balance: String(creation.balance || ""),
    ingredients,
    missing: Array.isArray(creation.missing) ? creation.missing.map((item) => String(item || "")).filter(Boolean) : [],
    savedAt: String(creation.savedAt || "")
  };
}

function normalizeImportedData(payload) {
  const data = payload && typeof payload === "object" && payload.data && typeof payload.data === "object" ? payload.data : payload;
  if (!data || typeof data !== "object") throw new Error("备份文件格式不正确");
  if (payload?.app && payload.app !== "BarCraft") throw new Error("不是 BarCraft 备份");
  const supportedKeys = ["favorites", "inventory", "notes", "creations", "lessonIndex", "completedLessons"];
  if (!supportedKeys.some((key) => Object.prototype.hasOwnProperty.call(data, key))) throw new Error("备份文件不包含可导入数据");
  const drinkIds = drinks.map((drink) => drink.id);
  const lessonIds = lessons.map((_, index) => String(index));
  const lessonIndex = Number.isFinite(Number(data.lessonIndex)) ? Math.min(Math.max(Number(data.lessonIndex), 0), lessons.length - 1) : 0;
  return {
    favorites: normalizedStringArray(data.favorites, drinkIds),
    inventory: normalizeImportedInventory(data.inventory),
    notes: Array.isArray(data.notes) ? data.notes.map(normalizeImportedNote).filter(Boolean) : [],
    creations: Array.isArray(data.creations) ? data.creations.map(normalizeImportedCreation).filter(Boolean) : [],
    lessonIndex,
    completedLessons: normalizedStringArray(data.completedLessons, lessonIds)
  };
}

function renderAfterPersonalDataChange() {
  renderSelectedDrink();
  renderCards();
  renderFavorites();
  renderInventory();
  renderLessons();
  renderNotes();
  renderCreationList();
  renderHomeRecommendation();
  renderHomeInventoryRecommendation();
  renderHomeLessonCard();
  generateCocktail();
  renderBackupSummary();
}

function applyImportedData(data) {
  state.favorites = new Set(data.favorites);
  state.inventory = new Set(data.inventory);
  state.notes = data.notes;
  state.creations = data.creations;
  state.lessonIndex = data.lessonIndex;
  state.completedLessons = new Set(data.completedLessons);
  state.noteQuery = "";
  if (elements.noteSearchInput) elements.noteSearchInput.value = "";
  persist();
  renderAfterPersonalDataChange();
  setBackupStatus(`已导入备份。${backupSummaryText()}`, "success");
}

function importPersonalDataFile(file) {
  if (!file) return;
  const isJsonFile = file.type.includes("json") || file.name.toLowerCase().endsWith(".json");
  if (!isJsonFile) {
    setBackupStatus("请选择 BarCraft 导出的 JSON 备份文件。", "warning");
    if (elements.importDataInput) elements.importDataInput.value = "";
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    setBackupStatus("这个备份文件太大，已停止导入。", "warning");
    if (elements.importDataInput) elements.importDataInput.value = "";
    return;
  }
  setBackupStatus("正在读取备份文件...");
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const data = normalizeImportedData(JSON.parse(String(reader.result || "")));
      const ok = window.confirm(`${backupSummaryFromData(data)}\n\n导入备份会覆盖当前浏览器里的收藏、库存、笔记、原创配方和学习进度。是否继续？`);
      if (!ok) {
        setBackupStatus(`已取消导入。${backupSummaryText()}`, "warning");
        return;
      }
      applyImportedData(data);
    } catch (error) {
      setBackupStatus("导入失败：备份文件无法识别。", "warning");
    } finally {
      if (elements.importDataInput) elements.importDataInput.value = "";
    }
  });
  reader.addEventListener("error", () => {
    setBackupStatus("导入失败：无法读取这个文件。", "warning");
    if (elements.importDataInput) elements.importDataInput.value = "";
  });
  reader.readAsText(file);
}

function persist() {
  writeStoredValue("barcraft:favorites", JSON.stringify([...state.favorites]));
  writeStoredValue("barcraft:notes", JSON.stringify(state.notes));
  writeStoredValue("barcraft:creations", JSON.stringify(state.creations));
  writeStoredValue("barcraft:inventory", JSON.stringify([...state.inventory]));
  writeStoredValue("barcraft:lessonIndex", String(state.lessonIndex));
  writeStoredValue("barcraft:completedLessons", JSON.stringify([...state.completedLessons]));
}

function updateInventoryFromInput(input) {
  if (input.checked) state.inventory.add(input.value);
  else state.inventory.delete(input.value);
  persist();
  renderInventory();
  renderCards();
  renderFavorites();
  renderSelectedDrink();
  renderLessons();
  renderHomeLessonCard();
  generateCocktail();
}

function attachEvents() {
  $("#searchInput").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCards();
    setActiveView("collection");
  });

  elements.homeOpenDrink.addEventListener("click", () => {
    if (state.homeDrinkId) state.selectedId = state.homeDrinkId;
    renderSelectedDrink();
    renderCards();
    setActiveView("atlas");
  });

  elements.refreshHomeButton.addEventListener("click", loadHomeWeather);

  elements.manualWeatherRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-weather]");
    if (!button) return;
    const type = button.dataset.weather;
    state.homeWeather = { type, label: weatherLabelFor(type, null), temperature: null, source: "manual" };
    renderHomeRecommendation();
  });

  elements.homeInventoryCard.addEventListener("click", (event) => {
    const button = event.target.closest("[data-home-inventory-drink]");
    if (!button) return;
    state.selectedId = button.dataset.homeInventoryDrink;
    renderSelectedDrink();
    renderCards();
    setActiveView("atlas");
  });

  elements.homeLessonCard.addEventListener("click", (event) => {
    const button = event.target.closest("[data-home-lesson]");
    if (!button) return;
    renderLessons();
    setActiveView("learn");
  });

  elements.homeRecentNoteCard?.addEventListener("click", (event) => {
    const notesButton = event.target.closest("[data-open-notes]");
    if (notesButton) {
      setActiveView("notes");
      return;
    }
    const workbenchButton = event.target.closest("[data-open-workbench]");
    if (workbenchButton) {
      setActiveView("simulator");
    }
  });

  elements.filterRow.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");
    if (!button) return;
    state.filter = button.dataset.filter;
    renderFilters();
    renderCards();
    setActiveView("collection");
  });

  elements.drinkCards.addEventListener("click", (event) => {
    const card = event.target.closest("[data-drink]");
    if (!card) return;
    state.selectedId = card.dataset.drink;
    renderSelectedDrink();
    renderCards();
    renderFavorites();
    setActiveView("atlas");
  });

  elements.favoriteButton.addEventListener("click", () => {
    const drink = selectedDrink();
    if (state.favorites.has(drink.id)) state.favorites.delete(drink.id);
    else state.favorites.add(drink.id);
    persist();
    renderSelectedDrink();
    renderCards();
    renderFavorites();
  });

  elements.favoriteSummary.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-collection]");
    if (!button) return;
    setActiveView("collection");
  });

  elements.favoriteCards.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-unfavorite]");
    if (removeButton) {
      state.favorites.delete(removeButton.dataset.unfavorite);
      persist();
      renderSelectedDrink();
      renderCards();
      renderFavorites();
      return;
    }
    const openButton = event.target.closest("[data-favorite-drink]");
    if (!openButton) return;
    state.selectedId = openButton.dataset.favoriteDrink;
    renderSelectedDrink();
    renderCards();
    renderFavorites();
    setActiveView("atlas");
  });

  elements.servingControl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-servings]");
    if (!button) return;
    state.recipeServings = Number(button.dataset.servings);
    renderSelectedDrink();
  });

  elements.inventoryGrid.addEventListener("change", (event) => {
    if (!event.target.matches("input")) return;
    updateInventoryFromInput(event.target);
  });

  elements.matchList.addEventListener("click", (event) => {
    const row = event.target.closest("[data-drink]");
    if (!row) return;
    state.selectedId = row.dataset.drink;
    renderSelectedDrink();
    renderCards();
    setActiveView("atlas");
  });

  elements.workbenchOverview.addEventListener("click", (event) => {
    const button = event.target.closest("[data-workbench-action]");
    if (!button) return;
    if (button.dataset.workbenchAction === "generate") {
      generateCocktail();
      elements.generatedCard.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const inventoryPanel = document.querySelector(".bar-inventory-area");
    if (inventoryPanel) {
      inventoryPanel.open = true;
      inventoryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  elements.storyRelated.addEventListener("click", (event) => {
    const button = event.target.closest("[data-drink]");
    if (!button) return;
    state.selectedId = button.dataset.drink;
    renderSelectedDrink();
    renderCards();
    setActiveView("atlas");
  });

  elements.lessonList.addEventListener("click", (event) => {
    const row = event.target.closest("[data-lesson]");
    if (!row) return;
    state.lessonIndex = Number(row.dataset.lesson);
    persist();
    renderLessons();
    renderHomeLessonCard();
  });

  elements.lessonDetail.addEventListener("click", (event) => {
    const drinkButton = event.target.closest("[data-drink]");
    if (drinkButton) {
      state.selectedId = drinkButton.dataset.drink;
      renderSelectedDrink();
      renderCards();
      setActiveView("atlas");
      return;
    }
    const completeButton = event.target.closest("[data-complete-lesson]");
    if (completeButton) {
      const key = completeButton.dataset.completeLesson;
      if (state.completedLessons.has(key)) state.completedLessons.delete(key);
      else state.completedLessons.add(key);
      persist();
      renderLessons();
      renderHomeLessonCard();
      return;
    }
    const noteButton = event.target.closest("[data-lesson-note]");
    if (!noteButton) return;
    const lesson = lessons[state.lessonIndex] || lessons[0];
    elements.noteLessonSelect.value = String(state.lessonIndex);
    elements.noteDrinkSelect.value = lesson.drinks[0] || "";
    elements.noteInput.value = `第 ${state.lessonIndex + 1} 天《${lesson.title}》练习：`;
    setActiveView("notes");
    elements.noteInput.focus();
  });

  elements.simulatorInventoryGrid.addEventListener("change", (event) => {
    if (!event.target.matches("input")) return;
    updateInventoryFromInput(event.target);
  });

  noteRatingFields().forEach(([, input]) => {
    input.addEventListener("input", renderNoteRatingValues);
  });

  elements.noteSearchInput.addEventListener("input", (event) => {
    state.noteQuery = event.target.value;
    renderNotes();
  });

  elements.noteList.addEventListener("click", (event) => {
    const item = event.target.closest("[data-note-drink]");
    if (!item) return;
    state.selectedId = item.dataset.noteDrink;
    renderSelectedDrink();
    renderCards();
    setActiveView("atlas");
  });

  $("#saveNoteButton").addEventListener("click", (event) => {
    const saveButton = event.currentTarget;
    const defaultSaveButtonHtml = `<svg><use href="#icon-save"></use></svg>保存笔记`;
    const flashSaveButton = (label, className) => {
      saveButton.classList.remove("saved", "attention");
      saveButton.classList.add(className);
      saveButton.innerHTML = `<svg><use href="#icon-save"></use></svg>${label}`;
      window.setTimeout(() => {
        saveButton.classList.remove(className);
        saveButton.innerHTML = defaultSaveButtonHtml;
      }, 1200);
    };
    const text = elements.noteInput.value.trim();
    if (!text) {
      flashSaveButton("先写一点笔记", "attention");
      elements.noteInput.focus();
      return;
    }
    const time = new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date());
    const drink = drinks.find((item) => item.id === elements.noteDrinkSelect.value);
    const lessonIndex = elements.noteLessonSelect.value === "" ? null : Number(elements.noteLessonSelect.value);
    const lesson = typeof lessonIndex === "number" ? lessons[lessonIndex] : null;
    state.notes.unshift({
      text,
      time,
      drinkId: drink?.id || "",
      drinkName: drink?.name || "",
      lessonIndex,
      lessonTitle: lesson?.title || "",
      adjustment: elements.noteAdjustmentInput.value.trim(),
      ratings: noteRatingsFromForm()
    });
    elements.noteInput.value = "";
    elements.noteAdjustmentInput.value = "";
    persist();
    renderNotes();
    renderSelectedDrink();
    flashSaveButton("已保存", "saved");
  });

  elements.exportDataButton?.addEventListener("click", exportPersonalData);

  elements.importDataButton?.addEventListener("click", () => {
    elements.importDataInput?.click();
  });

  elements.importDataInput?.addEventListener("change", (event) => {
    importPersonalDataFile(event.target.files?.[0]);
  });

  $("#generateButton").addEventListener("click", generateCocktail);
  [elements.baseSelect, elements.flavorSelect, elements.useInventoryToggle].forEach((control) => {
    control.addEventListener("change", generateCocktail);
  });
  [elements.sweetRange, elements.acidRange].forEach((range) => {
    range.addEventListener("input", () => {
      elements.sweetValue.textContent = elements.sweetRange.value;
      elements.acidValue.textContent = elements.acidRange.value;
      generateCocktail();
    });
  });

  elements.generatedCard.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save-creation]");
    if (saveButton) {
      saveGeneratedCreation();
      return;
    }
    const drinkLink = event.target.closest("[data-drink-link]");
    if (!drinkLink) return;
    state.selectedId = drinkLink.dataset.drinkLink;
    renderSelectedDrink();
    renderCards();
    setActiveView("atlas");
  });

  elements.creationList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-creation]");
    if (!deleteButton) return;
    state.creations = state.creations.filter((creation) => creation.id !== deleteButton.dataset.deleteCreation);
    persist();
    renderCreationList();
  });

  document.querySelectorAll("[data-view], .nav-item[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveView(button.dataset.view || button.dataset.section);
    });
  });
}

function init() {
  renderFilters();
  attachEvents();
  renderNoteFormOptions();
  renderNoteRatingValues();
  renderSelectedDrink();
  renderCards();
  renderFavorites();
  renderInventory();
  renderLessons();
  renderNotes();
  renderCreationList();
  generateCocktail();
  loadHomeWeather();
  setActiveView(state.activeView);
}

function renderStartupFallback(error) {
  console.error("BarCraft 初始化失败，已启用首页兜底。", error);
  const daypart = currentDaypart();
  const drink = selectedDrink() || drinks[0];
  if (!drink) return;
  state.homeDrinkId = drink.id;
  if (elements.homeHeadline) {
    elements.homeHeadline.innerHTML = `
      <span class="recommend-kicker">${escapeHtml(daypart.label)}推荐：</span>
      <span class="recommend-drink">${homeRecommendationNameMarkup(drink)}</span>
    `;
  }
  if (elements.homeReason) elements.homeReason.textContent = `暂时无法读取部分本地状态，先推荐一杯稳定经典。${daypart.copy}`;
  if (elements.homePickName) elements.homePickName.textContent = drink.name;
  if (elements.homePickThumb) elements.homePickThumb.src = drink.image;
  if (elements.homeDrinkImage) elements.homeDrinkImage.src = drink.image;
  if (elements.homeDrinkName) elements.homeDrinkName.textContent = drink.name;
  if (elements.homeDrinkMeta) elements.homeDrinkMeta.textContent = `${drink.base} / ${drink.mood}`;
  if (elements.homeDrinkTaste) elements.homeDrinkTaste.textContent = drink.taste;
}

try {
  init();
} catch (error) {
  renderStartupFallback(error);
}
