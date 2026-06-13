import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "work" / "iba-drinks.json"
CLEAN_PATH = ROOT / "work" / "barcraft-drinks-clean.json"
OUT_PATH = ROOT / "iba-data.js"

raw = {item["id"]: item for item in json.loads(RAW_PATH.read_text())}
clean = json.loads(CLEAN_PATH.read_text())

ZH_CATEGORY = {
    "The unforgettables": "难忘经典",
    "Contemporary Classics": "当代经典",
    "New Era": "新派经典",
    "难忘经典": "难忘经典",
    "当代经典": "当代经典",
    "新派经典": "新派经典",
}

INGREDIENT_OVERRIDES = {
    "iba-tiki": [
        ["哈瓦那俱乐部深色朗姆", "30 毫升"],
        ["哈瓦那俱乐部烟熏朗姆", "30 毫升"],
        ["杏仁利口酒", "15 毫升"],
        ["弗兰杰利科榛子利口酒", "5 毫升"],
        ["路萨朵黑樱桃利口酒", "5 滴"],
        ["百香果泥", "30 毫升"],
        ["新鲜菠萝汁", "90 毫升"],
        ["新鲜青柠汁", "30 毫升"],
    ],
    "three-dots-and-a-dash": [
        ["马提尼克农业朗姆", "45 毫升"],
        ["调和陈年朗姆", "15 毫升"],
        ["法勒南姆利口酒", "7.5 毫升"],
        ["圣伊丽莎白多香果利口酒", "7.5 毫升"],
        ["新鲜青柠汁", "15 毫升"],
        ["新鲜橙汁", "15 毫升"],
        ["蜂蜜糖浆", "15 毫升"],
        ["安格仕苦精", "2 滴"],
    ],
    "singapore-sling": [
        ["金酒", "30 毫升"],
        ["桑格莫拉克樱桃利口酒", "15 毫升"],
        ["君度橙酒", "7.5 毫升"],
        ["本尼迪克汀草本利口酒", "7.5 毫升"],
        ["新鲜菠萝汁", "120 毫升"],
        ["新鲜青柠汁", "15 毫升"],
        ["石榴糖浆", "10 毫升"],
        ["安格仕苦精", "1 滴"],
    ],
    "suffering-bastard": [
        ["干邑或白兰地", "30 毫升"],
        ["金酒", "30 毫升"],
        ["新鲜青柠汁", "15 毫升"],
        ["安格仕苦精", "2 滴"],
        ["姜汁啤酒", "补满"],
    ],
    "missionarys-downfall": [
        ["白朗姆", "30 毫升"],
        ["蜜桃白兰地利口酒", "15 毫升"],
        ["新鲜青柠汁", "15 毫升"],
        ["蜂蜜混合液", "30 毫升"],
        ["薄荷叶", "10 片"],
        ["菠萝块", "3-4 块"],
    ],
    "penicillin": [
        ["苏格兰威士忌", "60 毫升"],
        ["拉加维林 16 年威士忌", "7.5 毫升"],
        ["新鲜柠檬汁", "22.5 毫升"],
        ["蜂蜜糖浆", "22.5 毫升"],
        ["鲜姜片", "2-3 片"],
    ],
    "paloma": [
        ["100% 龙舌兰", "50 毫升"],
        ["新鲜青柠汁", "5 毫升"],
        ["盐", "少量"],
        ["葡萄柚汽水", "100 毫升"],
    ],
    "sherry-cobbler": [
        ["雪莉酒", "45 毫升"],
        ["糖浆", "45 毫升"],
        ["橙子半轮片", "1/2 片"],
        ["柠檬半轮片", "1/2 片"],
    ],
    "rabo-de-galo": [
        ["卡莎萨", "50 毫升"],
        ["甜味美思", "20 毫升"],
        ["金巴利苦味利口酒", "15 毫升"],
        ["安格仕苦精", "2 滴"],
    ],
}

TRANSLATIONS = [
    ("Ron Profundo Havana Club", "哈瓦那俱乐部 Profundo 朗姆"),
    ("Ron Smoky Havana Club", "哈瓦那俱乐部 Smoky 朗姆"),
    ("Rhum Martinique Agricole", "马提尼克农业朗姆"),
    ("Blended Aged 朗姆", "调和陈年朗姆"),
    ("Gold Jamaican 朗姆", "金色牙买加朗姆"),
    ("Gold Puerto Rican 朗姆", "金色波多黎各朗姆"),
    ("Demerara 朗姆", "德梅拉拉朗姆"),
    ("Blackstrap 朗姆", "黑糖蜜朗姆"),
    ("Jamaican 黑朗姆", "牙买加黑朗姆"),
    ("Amber Jamaican 朗姆", "琥珀牙买加朗姆"),
    ("Martinique Molasses Rhum*", "马提尼克糖蜜朗姆"),
    ("Jamaica Overproof 白朗姆", "牙买加强力白朗姆"),
    ("White Cuban Ron", "白古巴朗姆"),
    ("Cuban 朗姆", "古巴朗姆"),
    ("100% Agave 龙舌兰", "100% 龙舌兰"),
    ("龙舌兰 100% Agave", "100% 龙舌兰"),
    ("龙舌兰 100% agave", "100% 龙舌兰"),
    ("Espadin 梅斯卡尔", "埃斯帕丁梅斯卡尔"),
    ("Bourbon or 黑麦威士忌", "波本或黑麦威士忌"),
    ("Lagavulin 16y", "拉加维林 16 年威士忌"),
    ("Peach 白兰地", "蜜桃白兰地利口酒"),
    ("Apricot 白兰地", "杏桃白兰地利口酒"),
    ("Apricot Brandy", "杏桃白兰地利口酒"),
    ("Cherry Sangue Morlacco", "桑格莫拉克樱桃利口酒"),
    ("Maraschino Luxardo", "路萨朵黑樱桃利口酒"),
    ("Maraschino Liqueur", "黑樱桃利口酒"),
    ("Crème de Violette", "紫罗兰利口酒"),
    ("Crème de Cassis", "黑加仑利口酒"),
    ("Crème de Cassis", "黑加仑利口酒"),
    ("Crème de Mûre", "黑莓利口酒"),
    ("Crème de Menthe", "薄荷利口酒"),
    ("Crème de Cacao", "可可利口酒"),
    ("Licor Frangelico", "弗兰杰利科榛子利口酒"),
    ("Licor 杏仁利口酒", "杏仁利口酒"),
    ("Passion Fruit Liqueur", "百香果利口酒"),
    ("Passion Fruit Puree", "百香果泥"),
    ("Passion Fruit Syrup", "百香果糖浆"),
    ("Elderflower Cordial", "接骨木花糖浆"),
    ("Allspice Saint Elizabeth", "圣伊丽莎白多香果利口酒"),
    ("Green 查特酒", "绿查特酒"),
    ("Yellow 查特酒", "黄查特酒"),
    ("DOM Bénédictine", "本尼迪克汀草本利口酒"),
    ("Bénédictine", "本尼迪克汀草本利口酒"),
    ("Fernet Branca", "菲奈布兰卡苦味利口酒"),
    ("Fernet", "菲奈苦味利口酒"),
    ("Bitter 金巴利", "金巴利苦味利口酒"),
    ("阿佩罗", "阿佩罗苦味利口酒"),
    ("法勒南姆", "法勒南姆利口酒"),
    ("Grand Marnier", "金万利橙酒"),
    ("drops of 金万利", "金万利橙酒"),
    ("金万利", "金万利橙酒"),
    ("Cointreau", "君度橙酒"),
    ("君度", "君度橙酒"),
    ("Curacao", "库拉索橙酒"),
    ("Triple Sec", "三秒橙酒"),
    ("Orange Curacao", "橙味库拉索"),
    ("Kahlúa", "咖啡利口酒"),
    ("Coffee Liqueur", "咖啡利口酒"),
    ("Lillet Blanc", "利莱白开胃酒"),
    ("Lillet Blonde", "利莱白开胃酒"),
    ("Sweet 红 Vermouth", "甜红味美思"),
    ("Sweet Vermouth", "甜味美思"),
    ("Dry Vermouth", "干味美思"),
    ("Red Port", "红波特酒"),
    ("Red Tawny Port Wine", "红茶色波特酒"),
    ("Red Tawny 波特酒", "红茶色波特酒"),
    ("Red wine", "红葡萄酒"),
    ("Port Wine", "波特酒"),
    ("Dry White Wine", "干白葡萄酒"),
    ("Sparkling Wine", "起泡酒"),
    ("Prosecco", "普罗塞克"),
    ("Aromatic 苦精", "芳香苦精"),
    ("Peychaud’s 苦精", "佩肖德苦精"),
    ("Angostura", "安格仕苦精"),
    ("A dash of 安格仕苦精", "安格仕苦精"),
    ("1 dash 安格仕苦精", "安格仕苦精"),
    ("橙味苦精", "橙味苦精"),
    ("Aguardiente", "古巴甘蔗烈酒"),
    ("Cachaça", "卡莎萨"),
    ("Cachaça Prata", "卡莎萨"),
    ("Pisco", "皮斯科"),
    ("Old Tom 金酒", "老汤姆金酒"),
    ("Vanilla 伏特加", "香草伏特加"),
    ("伏特加 Vanilla", "香草伏特加"),
    ("Freshly Squeezed 青柠汁", "新鲜青柠汁"),
    ("Fresh Squeezed 青柠汁", "新鲜青柠汁"),
    ("Fresh Lime", "新鲜青柠汁"),
    ("Fresh lime", "新鲜青柠汁"),
    ("Freshly Squeezed 柠檬汁", "新鲜柠檬汁"),
    ("Fresh Squeezed 柠檬汁", "新鲜柠檬汁"),
    ("Fresh Lemon  Juice", "新鲜柠檬汁"),
    ("Fresh 橙汁", "新鲜橙汁"),
    ("Freshly Squeezed 橙汁", "新鲜橙汁"),
    ("Freshly Squeezed  橙汁", "新鲜橙汁"),
    ("Fresh 菠萝汁", "新鲜菠萝汁"),
    ("Honey Mix", "蜂蜜混合液"),
    ("Monin 蜂蜜糖浆", "蜂蜜糖浆"),
    ("Plain Water", "清水"),
    ("Orange Flower Water", "橙花水"),
    ("Vanilla Extract", "香草精"),
    ("Vanilla 糖", "香草糖"),
    ("Superfine 糖", "细砂糖"),
    ("1 strong Espresso", "浓缩咖啡"),
    ("1 Raw whole 蛋白", "蛋白"),
    ("Drops of 蛋白", "蛋白"),
    ("drops 蛋白", "蛋白"),
    ("1 糖 cube", "方糖"),
    ("1 糖 Cube", "方糖"),
    ("1 Lime cut into small wedges", "青柠块"),
    ("10 pcs Italian Basil leaves", "意大利罗勒叶"),
    ("10 pcs 薄荷叶", "薄荷叶"),
    ("5/6 薄荷叶", "薄荷叶"),
    ("6/8 pcs 薄荷叶", "薄荷叶"),
    ("6 pcs 薄荷枝", "薄荷枝"),
    ("4 fresh 薄荷枝", "薄荷枝"),
    ("3 pcs Cloves", "丁香"),
    ("2 thin Slices Red Chili Pepper", "红辣椒薄片"),
    ("Top up 金酒ger beer", "姜汁啤酒"),
    ("金酒ger Ale", "姜汁汽水"),
    ("金酒ger Beer", "姜汁啤酒"),
    ("Ginger Ale", "姜汁汽水"),
    ("Ginger Beer", "姜汁啤酒"),
    ("Soda Water", "苏打水"),
    ("A splash of 苏打水", "少量苏打水"),
    ("Fill up with 可乐", "补满可乐"),
    ("Top with 可乐", "补满可乐"),
    ("Dry 金酒", "干金酒"),
    ("London Dry 金酒", "伦敦干金酒"),
    ("London dry 金酒", "伦敦干金酒"),
    ("White 桃泥", "白桃泥"),
    ("Worcestershire Sauce", "伍斯特酱"),
    ("Tabasco, Celery Salt, Pepper", "塔巴斯科辣酱、芹菜盐和胡椒"),
    ("White Cane 糖", "白蔗糖"),
    ("Cuban 古巴甘蔗烈酒", "古巴甘蔗烈酒"),
    ("Raw Honey", "原蜂蜜"),
    ("Water", "清水"),
    ("Chilled 香槟", "冰镇香槟"),
    ("伏特加 Citron", "柑橘伏特加"),
    ("Goslings 朗姆", "高斯林黑朗姆"),
    ("Raspberry Liqueur", "覆盆子利口酒"),
    ("Hot 咖啡", "热咖啡"),
    ("Demerara 糖浆", "德梅拉拉糖浆"),
    ("Orange 库拉索橙酒", "橙味库拉索"),
    ("Powdered 糖", "糖粉"),
    ("1 Tablespoon 苦艾酒", "苦艾酒"),
    ("1 Tablespoon 石榴糖浆", "石榴糖浆"),
    ("Smirnoff 伏特加", "斯米尔诺夫伏特加"),
    ("黑麦威士忌 or Bourbon", "黑麦或波本威士忌"),
    ("Aged 朗姆", "陈年朗姆"),
    ("Brut 香槟 or 普罗塞克", "极干型香槟或普罗塞克"),
    ("Amaro Nonino", "诺尼诺阿玛罗利口酒"),
    ("Coconut 奶油", "椰子奶油"),
    ("Jamaican 朗姆", "牙买加朗姆"),
    ("糖 Cane Juice", "甘蔗汁"),
    ("香槟 to serve on the side", "旁配香槟"),
    ("Cherry 白兰地 Luxardo", "路萨朵樱桃白兰地"),
    ("Peach Schnapps", "蜜桃利口酒"),
    ("White 薄荷利口酒", "白薄荷利口酒"),
    ("Agave Nectar", "龙舌兰糖浆"),
    ("White Smooth Grappa", "柔和白格拉帕"),
    ("Honey mix *", "蜂蜜混合液"),
    ("Chamomile cordial", "洋甘菊糖浆"),
    ("Bénédictine", "本尼迪克汀草本利口酒"),
    ("Donn’s Mix*", "唐氏混合糖浆"),
    ("新鲜ly Squeezed 橙汁", "新鲜橙汁"),
    ("新鲜Lemon Juice", "新鲜柠檬汁"),
    ("Splash", "少量"),
]

BASE_PATTERNS = [
    ("金酒", ["金酒", "gin", "old tom"]),
    ("伏特加", ["伏特加", "vodka"]),
    ("威士忌", ["威士忌", "whiskey", "whisky", "bourbon", "rye", "scotch", "lagavulin"]),
    ("朗姆", ["朗姆", "rum", "ron", "rhum", "cachaça", "卡莎萨", "aguardiente", "甘蔗"]),
    ("白兰地", ["白兰地", "brandy", "cognac", "干邑", "pisco", "皮斯科", "calvados", "卡尔瓦多斯"]),
    ("龙舌兰", ["龙舌兰", "tequila", "mezcal", "梅斯卡尔"]),
]

LIQUEUR_KEYWORDS = [
    "利口酒",
    "查特酒",
    "金巴利",
    "阿佩罗",
    "味美思",
    "开胃酒",
    "苦艾酒",
    "本尼迪克汀",
    "杜林标",
    "橙酒",
    "库拉索",
    "法勒南姆",
    "金万利",
]

ORIGINS = {
    "alexander": ("20 世纪初", "亚历山大通常被认为诞生于 20 世纪初的大西洋两岸酒店酒吧圈，早期版本曾以金酒为主体，后来干邑版本成为更常见的经典形态。", "名称来源有舞台人物、广告角色等多种说法，但它真正被记住的是奶油型短饮的优雅质地。"),
    "americano": ("19 世纪", "美式鸡尾酒源自意大利米兰一带的餐前酒传统，早期与“米兰-都灵”结构关系密切。", "加入苏打水后，它更适合长时间饮用，也成为后来尼格罗尼的重要前身。"),
    "angel-face": ("20 世纪初", "天使之颜出现在 20 世纪初的经典酒谱传统中，是苹果白兰地、金酒和杏桃风味的短饮组合。", "它的名字带有装饰艺术时代的柔和想象，风味却比名字更有力度。"),
    "aviation": ("1910 年代", "航空通常归功于纽约调酒师雨果·恩斯林，早期记录见于 1916 年酒谱。", "紫罗兰利口酒带来的淡色调让它与飞行时代的浪漫想象联系在一起。"),
    "bees-knees": ("禁酒令时期", "蜜蜂膝盖流行于美国禁酒令时期，蜂蜜与柑橘常被用来修饰当时烈酒的粗粝感。", "名字来自当时表示“极好”的俚语，因此带有轻快的年代气息。"),
    "bellini": ("1940 年代", "贝里尼由威尼斯哈利酒吧的朱塞佩·奇普里亚尼创造。", "桃泥与普罗塞克的柔粉色让人联想到文艺复兴画家贝里尼的色彩。"),
    "between-the-sheets": ("20 世纪上半叶", "床笫之间常被认为出现在一战后到 1930 年代之间的欧洲酒店酒吧。", "它以边车的酸酒骨架为基础，加入朗姆后更显热烈。"),
    "black-russian": ("1949 年", "黑俄罗斯常被追溯到 1949 年布鲁塞尔的酒店酒吧。", "伏特加与咖啡利口酒的组合让它成为最简洁的深色餐后短饮之一。"),
    "bloody-mary": ("1920-1930 年代", "血腥玛丽的起源常在巴黎与纽约之间被讨论，费尔南·佩蒂奥的名字经常出现在相关叙述中。", "番茄汁、香料和伏特加让它从酒吧走进早午餐文化。"),
    "boulevardier": ("1920 年代", "林荫大道与 1920 年代巴黎的美国侨民圈有关，常和作家厄斯金·格温联系在一起。", "它像是把尼格罗尼的金酒换成威士忌，因此更温暖厚实。"),
    "bramble": ("1984 年", "荆棘由伦敦调酒师 Dick Bradsell 在 1984 年创造，当时他在伦敦 Soho 的 Fred’s Club 工作，并想做一杯带有英国气质的金酒鸡尾酒。", "他的灵感来自童年在怀特岛采黑莓的记忆；黑莓灌木被称作 bramble，黑莓利口酒沿碎冰下沉的视觉也强化了这个名字。"),
    "brandy-crusta": ("19 世纪中叶", "白兰地克拉斯塔诞生于新奥尔良，常与调酒师约瑟夫·桑蒂尼联系在一起。", "杯口糖边和长柠檬皮让它成为许多酸酒与边车系作品的先声。"),
    "caipirinha": ("19-20 世纪", "凯匹林纳来自巴西民间饮酒传统，卡莎萨、青柠和糖构成最朴素的地方表达。", "它从乡土饮法逐渐进入国际酒吧，成为巴西最具代表性的鸡尾酒。"),
    "canchanchara": ("19 世纪", "坎昌查拉与古巴东部独立战争时期的民间饮法有关。", "甘蔗烈酒、蜂蜜和青柠呈现出非常直接的加勒比性格。"),
    "cardinale": ("20 世纪中期", "红衣主教常被放在罗马酒店酒吧传统中理解，是干味美思方向的尼格罗尼变体。", "名字来自红色酒液与意大利宗教服饰色彩的联想。"),
    "casino": ("20 世纪初", "赌场出现在 20 世纪初的美国经典酒谱中，与老汤姆金酒时代相连。", "黑樱桃与橙味苦精让它保留了早期金酒短饮的层次。"),
    "champagne-cocktail": ("19 世纪中叶", "香槟鸡尾酒是 19 世纪美国酒谱中很早出现的起泡酒鸡尾酒。", "方糖、苦精和香槟的组合让它成为庆祝场景的古典模板。"),
    "chartreuse-swizzle": ("21 世纪初", "查特摇棒是新世纪热带风格复兴中的代表作品。", "绿查特酒的草本力度与菠萝、青柠和法勒南姆形成明亮对比。"),
    "clover-club": ("19 世纪末", "三叶草俱乐部源自费城同名绅士俱乐部，19 世纪末到 20 世纪初已很流行。", "蛋白泡沫与覆盆子色泽让它在经典复兴中重新受到欢迎。"),
    "corpse-reviver-2": ("1930 年代", "还魂酒二号因 1930 年代萨伏伊酒谱而广为人知。", "它属于“提神酒”家族，名字带有早餐后或宿醉后的俏皮意味。"),
    "cosmopolitan": ("1980-1990 年代", "大都会的现代版本在 1980 年代末到 1990 年代的美国酒吧走红。", "蔓越莓与柑橘让它成为城市夜生活中辨识度极高的粉红短饮。"),
    "daiquiri": ("19 世纪末", "戴基里起源于古巴戴基里矿区附近，常与美国工程师詹宁斯·考克斯的故事相连。", "朗姆、青柠和糖的骨架后来成为无数酸酒变化的基础。"),
    "dry-martini": ("19-20 世纪之交", "干马天尼由马丁内斯等早期金酒与味美思饮法逐步演变而来。", "它的历史很难归于单一发明者，更像是酒吧审美持续变干、变冷、变简洁的结果。"),
    "espresso-martini": ("约 1983 年", "浓缩咖啡马天尼最早常被称作 Vodka Espresso，由伦敦调酒师 Dick Bradsell 约在 1983 年创造，常见说法把地点指向 Soho Brasserie。", "故事里那位客人想要一杯既能提神又有酒劲的饮品，于是伏特加、浓缩咖啡和咖啡利口酒被组合在一起；后来它在 1990 年代马天尼杯风潮中固定为 Espresso Martini 之名。"),
    "french-75": ("一战前后", "法式75在一战前后的巴黎和伦敦酒吧中成形。", "名字借用了法国 75 毫米野战炮，暗示它看似清爽却后劲明显。"),
    "gin-basil-smash": ("2008 年", "金酒罗勒碎由汉堡调酒师约格·迈耶在 2008 年创造。", "大量罗勒被捣压后释放的绿色香气，让它迅速成为现代金酒酸酒代表。"),
    "hemingway-special": ("1930 年代", "海明威特饮来自哈瓦那的佛罗里迪塔酒吧，与作家海明威的饮酒偏好相关。", "它在戴基里的基础上加入葡萄柚与黑樱桃风味，并减少甜度。"),
    "irish-coffee": ("1940 年代", "爱尔兰咖啡诞生于爱尔兰福因斯机场，常归功于乔·谢里丹。", "热咖啡、爱尔兰威士忌和奶油让它成为寒冷旅途里的安慰型经典。"),
    "mai-tai": ("1940 年代", "迈泰通常与 1944 年加州的维克商人餐厅联系在一起。", "它后来成为提基文化的核心作品之一，也引发过关于最初版本的长期争论。"),
    "manhattan": ("19 世纪末", "曼哈顿在 19 世纪末的纽约成形，是威士忌与甜味美思结构的代表。", "关于具体宴会和发明者的故事很多，但纽约都市气质始终是它的核心背景。"),
    "margarita": ("1930-1940 年代", "玛格丽塔的起源有多种墨西哥与美墨边境故事。", "无论哪种说法，龙舌兰、橙酒和青柠的组合都让它成为酸酒家族中最有名的一支。"),
    "mojito": ("古巴传统", "莫吉托来自古巴，常被视作更早的甘蔗烈酒、青柠、薄荷饮法的现代化版本。", "哈瓦那酒吧文化让它成为清爽长饮的国际符号。"),
    "moscow-mule": ("1940 年代", "莫斯科骡子诞生于 1940 年代的洛杉矶，常与伏特加、姜汁啤酒和铜杯推广有关。", "它帮助伏特加在美国市场建立了更强的存在感。"),
    "negroni": ("1919 年", "尼格罗尼通常追溯到 1919 年佛罗伦萨的 Caffè Casoni：卡米洛·尼格罗尼伯爵请调酒师 Fosco Scarselli 把美式鸡尾酒做得更有劲。", "Scarselli 把苏打水换成金酒，其他客人随后也开始点“尼格罗尼伯爵那杯酒”，名字便流传下来。"),
    "old-fashioned": ("19 世纪", "古典鸡尾酒源自 19 世纪“烈酒、糖、苦精、水”的基本鸡尾酒定义。", "当新式配料越来越多时，点一杯“老派”的威士忌鸡尾酒便成为它的名字来源。"),
    "paper-plane": ("2008 年", "纸飞机由 Sam Ross 与 Sasha Petraske 在 2008 年创造，当时是为芝加哥 The Violet Hour 的 Toby Maloney 设计一杯夏季酒。", "它以 Last Word 的等量思路为灵感，名字来自 M.I.A. 的歌曲《Paper Planes》；早期还曾被误写成 Paper Airplane。"),
    "penicillin": ("2005 年", "盘尼西林由纽约牛奶与蜂蜜酒吧的萨姆·罗斯创造。", "苏格兰威士忌、蜂蜜、柠檬和姜让它像一杯带烟熏感的现代热疗方。"),
    "pina-colada": ("1950 年代", "椰林飘香来自波多黎各，1950 年代的圣胡安酒店酒吧常被提及。", "椰子、菠萝和朗姆让它成为热带度假想象的代表。"),
    "pisco-punch": ("19 世纪末", "皮斯科潘趣与旧金山的银行交易所酒吧密切相关。", "皮斯科与菠萝的组合让它在淘金时代后的西海岸酒吧中声名大噪。"),
    "pisco-sour": ("1903 年前后", "皮斯科酸的起源存在争议，但较常被讨论的线索包括 1903 年前后秘鲁早期含皮斯科、蛋白、糖和青柠的配方，以及后来 Victor Morris 在利马经营 Morris’ Bar 时推广的版本。", "Morris’ Bar 的调酒师后来转到利马其他酒店酒吧，使这杯酒继续传播；蛋白泡沫和苦精点缀也逐渐成为人们熟悉的样貌。"),
    "sazerac": ("19 世纪", "萨泽拉克诞生于新奥尔良，是美国最具地方身份的威士忌鸡尾酒之一。", "苦艾酒洗杯、佩肖德苦精和糖让它拥有非常清晰的仪式感。"),
    "sidecar": ("一战前后", "边车常被放在一战前后的巴黎或伦敦酒店酒吧背景中讨论。", "干邑、橙酒和柠檬形成的结构影响了许多后来的酸酒。"),
    "singapore-sling": ("1910 年代", "新加坡司令由莱佛士酒店的严崇文在 20 世纪初创造的说法最为流行。", "它从殖民地酒店酒吧走向世界，成为热带长饮的标志。"),
    "spritz": ("19-20 世纪", "斯普瑞兹源自意大利北部和威尼托地区的餐前酒传统。", "气泡酒、苦味开胃酒和苏打水让它成为低酒精社交饮品的代表。"),
    "tequila-sunrise": ("1970 年代", "龙舌兰日出的现代版本常追溯到加州索萨利托的三叉戟酒吧。", "石榴糖浆下沉形成日出色带，使它拥有非常直观的视觉名字。"),
    "tommys-margarita": ("1980-1990 年代", "汤米玛格丽塔由旧金山汤米墨西哥餐厅的胡里奥·贝尔梅霍推广。", "它舍弃橙酒，用龙舌兰糖浆突出龙舌兰本身。"),
    "vesper": ("1953 年", "薇丝朋出自伊恩·弗莱明小说《皇家赌场》。", "它因邦德点单而成名，金酒、伏特加和利莱白构成冷冽而戏剧化的形象。"),
    "vieux-carre": ("1930 年代", "老广场由新奥尔良蒙特莱昂酒店的沃尔特·贝热龙创造。", "名字指向法语区旧城，也把威士忌、干邑和味美思的混合文化装进一杯酒。"),
    "whiskey-sour": ("19 世纪", "威士忌酸属于 19 世纪已经成形的酸酒家族。", "威士忌、柑橘和糖的组合既适合海上补给逻辑，也适合酒吧标准化。"),
    "zombie": ("1934 年", "僵尸由唐海滩客在 1934 年创造，是提基酒吧文化的代表作。", "多种朗姆和热带香料让它从诞生起就带有强烈的戏剧性。"),
    "cuba-libre": ("1900 年前后", "自由古巴诞生于美西战争后的古巴，朗姆与可乐的组合常被解释为美国饮料文化进入哈瓦那后的产物。", "它的名字来自“自由古巴”的时代口号，因此比普通长饮多了一层历史情绪。"),
    "dark-n-stormy": ("20 世纪初", "黑暗风暴与百慕大高斯林黑朗姆和当地姜汁啤酒传统关系密切。", "深色朗姆浮在姜汁啤酒之上，如乌云压海，这个视觉意象让名字流传开来。"),
    "dons-special-daiquiri": ("1930 年代", "唐的特别戴基里属于唐海滩客早期提基酒吧体系，把戴基里的酸甜骨架拓展为多朗姆与热带糖浆的组合。", "它展现了提基文化喜欢复杂香料、分层朗姆和丰富装饰的特点。"),
    "fernandito": ("20 世纪后期", "费尔南迪托源自阿根廷日常饮酒文化，菲奈布兰卡与可乐的搭配在当地极为流行。", "它从简单混饮进入国际酒单，保留了浓烈草本苦味和可乐甜感的反差。"),
    "french-connection": ("20 世纪后期", "法国连线因 1970 年代同名电影而被广泛记住，干邑与杏仁利口酒的组合强调餐后酒气质。", "它的流行来自简洁配方和电影时代的酷感命名。"),
    "french-martini": ("1980 年代", "法式马天尼兴起于 1980 年代纽约酒吧，后来在 1990 年代餐厅酒单中流行。", "覆盆子利口酒和菠萝汁让它带有当时都会甜果型马天尼的风格。"),
    "garibaldi": ("20 世纪", "加里波第来自意大利餐前酒传统，以意大利民族英雄朱塞佩·加里波第命名。", "金巴利代表北方，橙汁代表南方，名字和配方都带有意大利统一的象征意味。"),
    "gin-fizz": ("19 世纪末", "金菲士从 19 世纪美国菲士家族中发展而来，酸酒加入苏打后变得更轻盈。", "它曾在新奥尔良等地极为流行，也为拉莫斯菲士等复杂版本铺路。"),
    "grand-margarita": ("现代变体", "金万利玛格丽塔是玛格丽塔的现代升级版本，用金万利橙酒强化橙香与酒体。", "它延续龙舌兰、橙酒和青柠的经典结构，但口感更圆润。"),
    "grasshopper": ("20 世纪初", "蚱蜢常被追溯到新奥尔良的图雅格餐厅酒吧，20 世纪初逐渐成形。", "绿色薄荷利口酒让它拥有鲜明外观，也让奶油型餐后酒多了轻快的一面。"),
    "hanky-panky": ("20 世纪初", "花招由伦敦萨伏伊酒店的艾达·科尔曼创造，她是早期最具影响力的女性调酒师之一。", "菲奈布兰卡让金酒和甜味美思的组合带上尖锐草本感，名字来自客人品尝后的惊叹。"),
    "horses-neck": ("19 世纪末", "马颈最初是一种不含酒精的姜汁汽水饮法，因长柠檬皮形似马颈而得名。", "后来加入白兰地或威士忌，成为清爽而有辨识度的长饮。"),
    "iba-tiki": ("2022 年", "提基特饮由古巴调酒师 Diosmel Mendoza Medrano 在 2022 年创造，背景是古巴瓦拉德罗举行的世界调酒锦标赛重启。", "这杯酒在哈瓦那 Habana Libre 酒店的 El Polinesio 提基酒吧语境中成形，把古巴朗姆、坚果利口酒、樱桃利口酒和热带水果集中到一杯现代提基酒里。"),
    "illegal": ("21 世纪", "非法是新派梅斯卡尔鸡尾酒的代表之一，借助烟熏龙舌兰、朗姆和黑樱桃风味形成复杂酸酒。", "它反映了 21 世纪酒吧对梅斯卡尔和手工利口酒的兴趣。"),
    "john-collins": ("19 世纪", "约翰柯林斯来自 19 世纪伦敦和美国酒吧里的柯林斯长饮传统。", "烈酒、柠檬、糖和苏打的组合，让它成为最基础也最耐用的长饮模板之一。"),
    "jungle-bird": ("1970 年代", "丛林鸟诞生于吉隆坡希尔顿酒店的酒吧，1970 年代进入热带长饮谱系。", "朗姆、菠萝和金巴利的苦甜组合，让它在提基复兴后重新走红。"),
    "kir": ("20 世纪中期", "基尔来自法国勃艮第，并以第戎市长菲利克斯·基尔命名。", "黑加仑利口酒与干白葡萄酒的组合，最初也带有推广地方物产的意味。"),
    "last-word": ("1910-1920 年代", "最后一句源自底特律运动俱乐部，后来因 1950 年代酒谱留下记录。", "等量的金酒、绿查特酒、黑樱桃利口酒和青柠，让它在经典复兴中重新成名。"),
    "lemon-drop-martini": ("1970 年代", "柠檬滴马天尼由旧金山亨利非洲酒吧的诺曼·杰伊·霍布森创造。", "它把柠檬糖果般的酸甜感带进伏特加马天尼语境，成为派对型现代经典。"),
    "long-island-iced-tea": ("1970 年代", "长岛冰茶的现代版本常追溯到 1970 年代纽约长岛的酒吧竞赛与派对文化。", "多种烈酒加可乐产生近似冰茶的外观，让它成为高酒精长饮的代表。"),
    "martinez": ("19 世纪", "马丁内斯出现在 19 世纪后期酒谱中，常被视为马天尼演变链条上的关键一环。", "甜味美思、金酒和黑樱桃利口酒让它比干马天尼更柔和复古。"),
    "mary-pickford": ("1920 年代", "玛丽皮克福德诞生于古巴哈瓦那，以好莱坞默片明星玛丽·皮克福德命名。", "菠萝、石榴和黑樱桃风味让它带有热带与电影黄金时代的气息。"),
    "mimosa": ("1920 年代", "含羞草通常与 1920 年代巴黎丽兹酒店的酒吧传统相关。", "橙汁和香槟的简单组合让它成为早午餐和庆祝场合的常客。"),
    "mint-julep": ("18-19 世纪", "薄荷茱莉普起源于美国南方，早期曾可使用多种烈酒，后来波本威士忌版本成为主流。", "银杯、碎冰和薄荷香气让它与肯塔基赛马文化紧密相连。"),
    "monkey-gland": ("1920 年代", "猴腺由巴黎哈利纽约酒吧的哈里·麦克艾尔洪创造。", "名字来自当时颇受关注的医学实验传闻，因此带有典型 1920 年代猎奇幽默。"),
    "naked-and-famous": ("2011 年", "赤裸成名由华金·西莫创造，是最后一句与纸飞机思路影响下的新派等量鸡尾酒。", "梅斯卡尔、黄查特酒、阿佩罗和青柠形成烟熏、草本、苦甜的清晰平衡。"),
    "new-york-sour": ("19 世纪末", "纽约酸来自威士忌酸家族，早期也曾以大陆酸等名称出现。", "在酸酒上漂浮红葡萄酒，让它拥有醒目的分层外观和更柔和的单宁感。"),
    "old-cuban": ("2001 年", "老古巴由纽约调酒师奥黛丽·桑德斯创造。", "它把莫吉托的薄荷朗姆结构与香槟结合，成为新世纪经典长饮之一。"),
    "paloma": ("20 世纪中期", "帕洛玛源自墨西哥，常被视为龙舌兰与葡萄柚汽水在当地自然结合的产物。", "相比玛格丽塔，它更轻松、更日常，也更接近墨西哥长饮语境。"),
    "paradise": ("20 世纪初", "天堂出现在 20 世纪初的经典酒谱中，是金酒、杏桃白兰地利口酒和橙汁的组合。", "它的明亮果香和柔和名字，带有早期酒店酒吧的浪漫审美。"),
    "planters-punch": ("19 世纪", "种植园潘趣来自加勒比朗姆潘趣传统，常用押韵口诀记忆酸、甜、烈、弱的比例。", "它从殖民地种植园语境进入酒吧经典，后来出现许多地方版本。"),
    "porn-star-martini": ("2002 年", "艳星马天尼由伦敦调酒师道格拉斯·安克拉创造。", "百香果、香草伏特加和旁配香槟让它成为 21 世纪最流行的新派甜果型鸡尾酒之一。"),
    "porto-flip": ("19 世纪", "波特翻转来自更古老的翻转类饮品传统，蛋黄与加强葡萄酒让口感厚实。", "它保留了餐后酒和旧式酒馆热饮传统的一部分影子。"),
    "ramos-fizz": ("1888 年", "拉莫斯菲士由新奥尔良调酒师亨利·拉莫斯创造。", "奶油、蛋白、柑橘和橙花水需要长时间摇和，使它成为调酒技法上的名作。"),
    "remember-the-maine": ("1930 年代", "记住缅因号因查尔斯·贝克 1930 年代的旅行饮酒记录而知名。", "名字指向美西战争前的历史口号，配方则像曼哈顿加入樱桃与苦艾酒的变体。"),
    "russian-spring-punch": ("1980 年代", "俄罗斯春日潘趣由伦敦调酒师迪克·布拉德塞尔创造。", "伏特加、柠檬、黑加仑和起泡酒让它在派对场景中轻盈又有层次。"),
    "rusty-nail": ("20 世纪中期", "锈钉在 20 世纪中期美国酒吧流行，苏格兰威士忌与杜林标利口酒构成核心。", "它是少数只靠两种酒就能形成鲜明餐后风格的经典。"),
    "sea-breeze": ("20 世纪后期", "海风的现代版本在 20 世纪后期蔓越莓汁流行后成形。", "伏特加、蔓越莓和葡萄柚让它成为轻爽海岸感长饮。"),
    "sex-on-the-beach": ("1980 年代", "海滩之恋兴起于 1980 年代美国度假酒吧与派对文化。", "伏特加、蜜桃利口酒和果汁带来直白甜美的热带风格。"),
    "south-side": ("20 世纪初", "南区常被追溯到芝加哥或纽约俱乐部酒吧传统，是金酒、柑橘、糖和薄荷的清爽组合。", "它像没有气泡的莫吉托，也常被视作禁酒令时期的清凉短饮。"),
    "spicy-fifty": ("21 世纪", "辛辣五十来自现代酒吧对伏特加、接骨木花和辣椒元素的组合实验。", "它用蜂蜜和辣椒打破伏特加短饮的平直感，突出甜辣对比。"),
    "stinger": ("19-20 世纪之交", "毒刺在 19 世纪末到 20 世纪初的美国上流社交场合中流行。", "白兰地与薄荷利口酒的极简组合，让它成为冷冽餐后酒代表。"),
    "tipperary": ("一战时期", "蒂珀雷里与一战时期流行歌曲《到蒂珀雷里的漫长路》相关。", "爱尔兰威士忌、甜味美思和绿查特酒让它带有鲜明的爱尔兰身份。"),
    "trinidad-sour": ("2009 年", "特立尼达酸由纽约调酒师朱塞佩·冈萨雷斯推广成名。", "它大胆把安格仕苦精当作主体用量，成为新派酒吧挑战传统比例的代表。"),
    "tuxedo": ("19 世纪末", "燕尾服与纽约附近的塔克西多俱乐部社交传统相关，和马天尼家族关系密切。", "金酒、味美思、樱桃与苦艾酒让它保留了晚装时代的精致感。"),
    "ve-n-to": ("21 世纪", "威尼托来自意大利北部饮酒语境，名字直接指向威尼托地区。", "白兰地、柠檬、蜂蜜和洋甘菊风味让它呈现温柔而明亮的地方感。"),
    "white-lady": ("1910-1920 年代", "白佳人常与哈里·麦克艾尔洪和欧洲酒店酒吧传统联系在一起。", "金酒、橙酒与柠檬让它成为边车结构在金酒方向上的优雅版本。"),
    "missionarys-downfall": ("1930 年代", "传教士的倒下出自唐海滩客的提基酒吧体系，是朗姆、蜜桃、蜂蜜、薄荷和菠萝的热带组合。", "它不像许多烈性提基酒那样厚重，而是以碎冰和草本果香形成轻盈口感。"),
    "rabo-de-galo": ("20 世纪中期", "公鸡尾来自巴西酒吧文化，名字在葡萄牙语中意为“鸡尾”。", "卡莎萨、甜味美思和苦味利口酒让它带有巴西烈酒与意式餐前酒结合的气质。"),
    "sherry-cobbler": ("19 世纪", "雪莉考伯勒是 19 世纪美国非常流行的考伯勒家族饮品。", "碎冰、水果和吸管让它成为早期酒吧服务方式改变的重要代表。"),
    "suffering-bastard": ("1940 年代", "受苦混蛋诞生于开罗谢泼德酒店，常与调酒师乔·西亚洛姆在二战时期为士兵调制的故事相连。", "干邑、金酒、青柠和姜汁啤酒让它既有力量也足够清爽。"),
    "three-dots-and-a-dash": ("1940 年代", "三点一线由唐海滩客创造，名字来自摩尔斯电码中代表胜利的符号。", "多朗姆、法勒南姆和多香果利口酒让它成为提基经典中辨识度很高的一杯。"),
}


def clean_qty(value):
    v = str(value).strip()
    v = re.sub(r"(?i)ml", "毫升", v)
    v = re.sub(r"(?i)\bbar spoons?\b", "吧匙", v)
    v = re.sub(r"(?i)\btsp\b", "茶匙", v)
    v = re.sub(r"(?i)\bteaspoons?\b", "茶匙", v)
    v = re.sub(r"(?i)\bdashes\b", "滴", v)
    v = re.sub(r"(?i)\bdash\b", "滴", v)
    v = re.sub(r"(?i)\bdrops\b", "滴", v)
    v = re.sub(r"(?i)\bdrop\b", "滴", v)
    v = re.sub(r"(?i)\bfew\s+滴\b", "数滴", v)
    v = re.sub(r"(?i)^splash$", "少量", v)
    v = re.sub(r"(\d(?:[\d./]*))\s*毫升", r"\1 毫升", v)
    return v.strip()


def translate_label(label):
    text = str(label).strip().replace("\xa0", " ")
    text = text.replace("Crème", "Crème").replace("Bénédictine", "Bénédictine")
    for src, dst in TRANSLATIONS:
        text = text.replace(src, dst)
    text = re.sub(r"(?i)^of\s+", "", text)
    text = re.sub(r"(?i)^drops?\s+of\s+", "", text)
    text = re.sub(r"(?i)^a\s+dash\s+of\s+", "", text)
    text = re.sub(r"(?i)^1\s+dash\s+", "", text)
    text = re.sub(r"(?i)^drops?\s+", "", text)
    text = re.sub(r"(?i)^fresh\s+", "新鲜", text)
    text = re.sub(r"\s+", " ", text)
    text = text.replace("特色成分", "")
    text = text.replace("Ron", "朗姆").replace("Rum", "朗姆")
    text = text.replace("Fresh", "新鲜")
    text = text.replace("金巴利苦味利口酒苦味利口酒", "金巴利苦味利口酒")
    text = text.replace("金万利橙酒橙酒", "金万利橙酒")
    text = text.replace("London 干金酒", "伦敦干金酒")
    text = text.replace("新鲜ly Squeezed 橙汁", "新鲜橙汁")
    text = text.replace("新鲜Lemon Juice", "新鲜柠檬汁")
    text = text.replace("Red Tawny 波特酒", "红茶色波特酒")
    return text.strip()


def infer_inventory(label):
    lower = label.lower()
    for base, keys in BASE_PATTERNS:
        if any(key.lower() in lower for key in keys):
            return base
    if "柠檬" in label:
        return "柠檬汁"
    if "青柠" in label:
        return "青柠"
    if any(k in label for k in ["菠萝", "橙汁", "番茄", "蔓越莓", "西柚", "葡萄柚", "桃泥", "百香果泥"]):
        return "果汁/果泥"
    if any(k in label for k in ["糖", "蜂蜜", "糖浆", "石榴糖浆", "接骨木花"]):
        return "糖/糖浆"
    if "苦精" in label:
        return "苦精"
    if any(k in label for k in ["苏打", "姜汁", "可乐", "汽水"]):
        return "气泡饮料"
    if any(k in label for k in ["奶油", "蛋白", "蛋黄", "乳"]):
        return "乳品/蛋类"
    if any(k in label for k in LIQUEUR_KEYWORDS):
        return label
    if any(k in label for k in ["香槟", "普罗塞克", "起泡酒", "葡萄酒", "雪莉", "波特酒"]):
        return label
    if any(k in label for k in ["薄荷", "罗勒", "辣椒", "香草", "盐", "丁香", "清水", "橙花水"]):
        return "特色辅料"
    return label


def is_liqueur_type(label):
    return any(k in label for k in LIQUEUR_KEYWORDS + ["香槟", "普罗塞克", "起泡酒", "葡萄酒", "雪莉酒", "波特酒"])


def category_context(item):
    category = ZH_CATEGORY.get(item.get("category"), item.get("category", ""))
    if category == "难忘经典":
        return "它属于较早被反复书写和演变的经典类型，常能看到酒店酒吧、俱乐部酒吧和旧式酒谱之间互相影响的痕迹。"
    if category == "当代经典":
        return "它的现代形态更接近 20 世纪后半叶到现代酒吧的审美：材料更容易标准化，风味也更强调清晰、直接和可复制。"
    if category == "新派经典":
        return "它代表新派酒吧对经典骨架的再创作，往往把老配方的比例逻辑和新的利口酒、地域材料或戏剧化呈现结合起来。"
    return "它被放进现代经典酒单，是因为结构清楚、辨识度高，并且能让不同酒吧用稳定方式复现。"


def recipe_character(recipe, item):
    labels = [label for label, _ in recipe]
    text = " ".join(labels)
    base = item["base"] if item["base"] in text else labels[0]
    ingredients = "、".join(labels[:4])
    if len(labels) > 4:
        ingredients += "等"
    traits = []
    if re.search("柠檬|青柠|橙汁|西柚|葡萄柚", text):
        traits.append("柑橘酸度")
    if re.search("糖|糖浆|蜂蜜|石榴", text):
        traits.append("甜感支撑")
    if re.search("苦味|金巴利|阿佩罗|菲奈|苦精", text):
        traits.append("苦味层次")
    if re.search("味美思|葡萄酒|香槟|普罗塞克|雪莉|波特", text):
        traits.append("葡萄酒系香气")
    if re.search("奶油|蛋白|蛋黄", text):
        traits.append("绵密质地")
    if re.search("薄荷|罗勒|姜|辣椒|香草", text):
        traits.append("草本或辛香")
    if re.search("菠萝|百香果|桃|蔓越莓|黑莓|黑加仑|覆盆子", text):
        traits.append("果香记忆点")
    if not traits:
        traits.append("主体酒香")
    return f"从配方看，{item['nameZh']}以{base}作为主要线索，借由{ingredients}建立风味骨架；最值得留意的是{'、'.join(traits[:3])}。这些元素解释了它为什么不是随意混合，而是一套能被反复辨认的比例关系。"


MODERN_DEVELOPMENTS = {
    "negroni": "近代发展中，尼格罗尼成为苦甜餐前酒的核心模板；酒吧会用不同金酒、味美思或苦味酒做变化，Boulevardier、White Negroni 等分支也让它从意大利餐前酒扩展成全球酒单语言。",
    "old-fashioned": "近代鸡尾酒复兴后，Old Fashioned 几乎成为判断酒吧基本功的标尺：大冰块、糖的溶解、苦精和橙皮处理都被重新讲究起来，也推动了波本和黑麦威士忌短饮的回潮。",
    "dry-martini": "近代的 Dry Martini 从极干比例、Dirty Martini 到不同苦精和装饰的版本不断分化；它既是经典酒店酒吧的象征，也经常被用来展示金酒、伏特加和味美思的细微差别。",
    "daiquiri": "近代酒吧常把 Daiquiri 当作酸酒基本功：它不像冷冻甜饮那样依赖装饰，而是用朗姆、青柠和糖检验比例、摇和与新鲜度。很多现代酸酒都能从它身上看见结构影子。",
    "margarita": "Margarita 后来发展出盐边、冻饮、Tommy’s Margarita、Mezcal Margarita 等大量分支；近代酒吧更强调优质龙舌兰、真实青柠和明确橙酒选择，让它从派对甜饮回到酸酒经典。",
    "mojito": "近代 Mojito 借由哈瓦那旅游形象和夏季长饮文化持续流行。酒吧会在薄荷处理、苏打加入顺序和糖的形态上做细节调整，也常出现莓果、百香果等季节变体。",
    "bramble": "Bramble 在 20 世纪末和 21 世纪初成为英国现代经典代表；它的碎冰、黑莓利口酒下沉和可替换莓果风味，让它很适合被现代酒吧做成季节版本。",
    "espresso-martini": "Espresso Martini 在 1990 年代马天尼杯风潮中改名定型，近年又随着咖啡文化和夜生活复兴重新走红；很多酒吧会调整咖啡豆、咖啡利口酒和泡沫质地来做招牌版本。",
    "paper-plane": "Paper Plane 传播很快，是新派等量鸡尾酒的代表。近代酒吧常把它和 Last Word、Naked and Famous 放在同一条创作谱系里，也会尝试替换阿玛罗或基酒来做变体。",
    "penicillin": "Penicillin 成为 21 世纪最有影响力的新经典之一，带动蜂蜜姜糖浆和烟熏威士忌漂浮层的使用；许多酒吧用它展示现代威士忌酸酒可以兼具疗愈感和复杂度。",
    "pisco-sour": "近代 Pisco Sour 既是秘鲁和智利饮酒身份的一部分，也因国际酒吧对皮斯科的兴趣而继续传播；蛋白泡沫、苦精点缀和皮斯科产地差异成为现代版本的重点。",
    "spritz": "近代 Spritz 借由意大利餐前酒文化、低酒精社交和露台饮酒场景快速全球化；它也推动了不同苦味开胃酒、起泡酒和苏打比例的轻饮趋势。",
    "mai-tai": "近代提基复兴让 Mai Tai 回到更接近早期配方的朗姆、橙味库拉索、杏仁糖浆和青柠结构，区别于后来过甜、果汁化的度假版本。",
    "zombie": "Zombie 在近代提基复兴中被重新研究，重点回到多种朗姆、香料糖浆和严格酒精控制；它也提醒酒吧在戏剧化呈现和饮用安全之间保持平衡。",
    "singapore-sling": "近代 Singapore Sling 常被重新校正为更有层次的金酒长饮，而不只是甜红色旅游饮品；酒店酒吧和新加坡城市形象持续强化了它的辨识度。",
    "pina-colada": "Piña Colada 近代从度假甜饮回到朗姆、椰子和菠萝平衡的讨论中；酒吧会用新鲜菠萝、不同椰子材料和优质朗姆减少廉价甜腻感。",
    "paloma": "Paloma 近年因墨西哥烈酒热潮而更受重视，许多酒吧用新鲜葡萄柚、苏打和高品质龙舌兰取代瓶装汽水，做出更干净的现代版本。",
    "tom-margarita": "",
}


def modern_development_for(item):
    if item["id"] in MODERN_DEVELOPMENTS and MODERN_DEVELOPMENTS[item["id"]]:
        return MODERN_DEVELOPMENTS[item["id"]]
    category = ZH_CATEGORY.get(item.get("category"), item.get("category", ""))
    base = item["base"]
    if category == "难忘经典":
        return f"近代发展中，{item['nameZh']}主要通过经典鸡尾酒复兴重新被认真对待。酒吧不再只把它当作老酒谱里的名字，而是重新比较早期配方、杯型、冰和材料质量，让这杯以{base}为核心的酒重新具备清晰标准。"
    if category == "当代经典":
        return f"近代发展中，{item['nameZh']}依靠稳定配方和高辨识度进入更多餐厅、酒店和家庭酒单。它的变化通常围绕材料品牌、甜酸比例、杯型和装饰展开，既保留原始结构，也适应更轻松的现代饮用场景。"
    if category == "新派经典":
        return f"近代发展中，{item['nameZh']}体现了现代调酒对经典结构的再创作：调酒师会保留它的核心比例，同时用新的利口酒、地域材料或呈现方式扩大风味边界。它的流行也常和社群分享、酒吧榜单以及新派酒吧文化有关。"
    return f"近代发展中，{item['nameZh']}被保留下来，主要因为它有清晰的风味记忆点，也容易让不同酒吧在原配方基础上做出可辨认的变化。"


def story_for(item):
    zh = item["nameZh"]
    if item["id"] in ORIGINS:
        year, origin, spread = ORIGINS[item["id"]]
    else:
        year = "起源"
        origin = f"{zh}的早期线索多见于酒吧经典化过程，它的具体发明者未必有单一公认答案。"
        spread = "这款酒被保留下来，主要因为修饰材料、比例和杯型之间形成了清晰可辨的风格。"
    origin_copy = f"{origin}{spread}"
    return year, f"{zh}的起源故事", [
        ["起源", origin_copy],
        ["近代发展", modern_development_for(item)],
    ]


def recipe_for(item):
    if item["id"] in INGREDIENT_OVERRIDES:
        return INGREDIENT_OVERRIDES[item["id"]]
    entries = raw[item["id"]]["recipe"]
    recipe = []
    for label, amount in entries:
        recipe.append([translate_label(label), clean_qty(amount)])
    return recipe


def subtitle_from(recipe, item):
    first = []
    for label, _ in recipe:
        inv = infer_inventory(label)
        display = inv if inv in ["朗姆", "威士忌", "伏特加", "金酒", "白兰地", "龙舌兰"] else label
        if display not in first:
            first.append(display)
        if len(first) == 3:
            break
    return " / ".join(first) if first else item.get("subtitle", "")


def normalize_tags(tags):
    result = []
    for tag in tags:
        if "IBA" in tag or "参考" in tag:
            continue
        result.append(tag)
    return result or ["经典", "平衡"]


new_items = []
for item in clean:
    recipe = recipe_for(item)
    inventory = []
    liqueur_types = []
    for label, _ in recipe:
        inv = infer_inventory(label)
        if inv not in inventory:
            inventory.append(inv)
        if is_liqueur_type(label) and label not in liqueur_types:
            liqueur_types.append(label)
    origin_year, story_title, story = story_for(item)
    updated = dict(item)
    updated.update(
        {
            "name": f"{item['nameZh']} {item['nameEn']}",
            "subtitle": subtitle_from(recipe, item),
            "sourceLabel": "配方来源",
            "category": ZH_CATEGORY.get(item.get("category"), item.get("category", "")),
            "abv": "经典配方",
            "mood": ZH_CATEGORY.get(item.get("mood"), item.get("mood", "")),
            "tags": normalize_tags(item.get("tags", [])),
            "taste": item["taste"].replace("配方参考 IBA，中文风味描述由本应用重新整理。", "风味描述由本应用按配方结构重新整理。").replace("IBA", ""),
            "recipe": recipe,
            "originYear": origin_year,
            "storyTitle": story_title,
            "story": story,
            "inventory": inventory,
            "liqueurTypes": liqueur_types,
        }
    )
    new_items.append(updated)

CLEAN_PATH.write_text(json.dumps(new_items, ensure_ascii=False, indent=2) + "\n")
OUT_PATH.write_text("window.IBA_DRINKS = " + json.dumps(new_items, ensure_ascii=False, indent=2) + ";\n")
print(f"wrote {len(new_items)} cocktails")
