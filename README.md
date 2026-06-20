# BarCraft

BarCraft 是一个静态网页版鸡尾酒 App。当前版本包含首页今日推荐、经典酒单、故事馆、库存材料、原创调酒模拟器、学习路径、笔记和本地数据备份功能。

项目不需要重新构建，也没有 npm / package.json 流程。继续修改时请直接基于现有文件维护。

## 当前预览方式

最推荐的预览方式：

1. 双击 `BarCraft Preview.app`
2. 在 Codex 内置浏览器打开：

```text
http://localhost:8765/
```

关闭预览服务：

1. 双击 `Stop BarCraft Preview.app`

预览服务使用本地端口 `8765`。运行时会把预览文件复制到：

```text
/tmp/barcraft-preview-site
```

如果页面没有更新，先刷新浏览器；如果仍然没有更新，重新双击 `BarCraft Preview.app`。

## GitHub Pages 发布

当前仓库根目录已经是完整静态站点，可以直接用 GitHub Pages 发布 `main` 分支根目录。

推荐设置：

```text
Repository: Yves12138/barcraft
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

发布后网址通常是：

```text
https://yves12138.github.io/barcraft/
```

项目根目录保留 `.nojekyll`，用于让 GitHub Pages 按普通静态文件发布，不经过 Jekyll 处理。

## 主要文件

源文件：

```text
index.html
app.js
styles.css
iba-data.js
assets/cocktails/
```

预览输出文件：

```text
outputs/barcraft-app/index.html
outputs/barcraft-app/app.js
outputs/barcraft-app/styles.css
outputs/barcraft-app/iba-data.js
outputs/barcraft-app/assets/cocktails/
```

Preview App 内置文件：

```text
BarCraft Preview.app/Contents/Resources/site/
```

当前运行中的临时预览目录：

```text
/tmp/barcraft-preview-site
```

主要入口：

- 页面入口：`index.html`
- 交互逻辑：`app.js`
- 全局样式：`styles.css`
- 鸡尾酒数据：`iba-data.js`
- 图片资产：`assets/`

页面为纯静态 App，不依赖打包工具。顶部导航和底部控制台通过 `data-view` / `data-view-panel` 切换页面状态。

## 修改约定

修改源文件后，需要同步到预览输出目录和 Preview App 内置目录。通常至少同步这些文件：

```bash
cp index.html app.js styles.css outputs/barcraft-app/
cp index.html app.js styles.css "BarCraft Preview.app/Contents/Resources/site/"
if [ -d /tmp/barcraft-preview-site ]; then cp index.html app.js styles.css /tmp/barcraft-preview-site/; fi
```

如果修改了 `iba-data.js`：

```bash
cp iba-data.js outputs/barcraft-app/
cp iba-data.js "BarCraft Preview.app/Contents/Resources/site/"
if [ -d /tmp/barcraft-preview-site ]; then cp iba-data.js /tmp/barcraft-preview-site/; fi
```

如果修改了图片，需要同步对应图片目录：

```bash
cp assets/cocktails/*.png outputs/barcraft-app/assets/cocktails/
cp assets/cocktails/*.png "BarCraft Preview.app/Contents/Resources/site/assets/cocktails/"
if [ -d /tmp/barcraft-preview-site/assets/cocktails ]; then cp assets/cocktails/*.png /tmp/barcraft-preview-site/assets/cocktails/; fi
```

## Git 提交流程

每轮修改完成并确认预览没问题后提交。常用命令：

```bash
cd /Users/yves/Documents/Codex/2026-06-02/barcraft
git status --short
git add index.html app.js styles.css iba-data.js assets/cocktails outputs/barcraft-app "BarCraft Preview.app/Contents/Resources/site"
git commit -m "填写本次修改说明"
```

如果只改了页面和样式，可用更精确的提交：

```bash
cd /Users/yves/Documents/Codex/2026-06-02/barcraft
git add index.html app.js styles.css outputs/barcraft-app/index.html outputs/barcraft-app/app.js outputs/barcraft-app/styles.css "BarCraft Preview.app/Contents/Resources/site/index.html" "BarCraft Preview.app/Contents/Resources/site/app.js" "BarCraft Preview.app/Contents/Resources/site/styles.css"
git commit -m "填写本次修改说明"
```

## 内容维护约定

- 酒名使用中英双语，例如 `边车 Sidecar`。
- 正文说明尽量使用中文。
- 故事馆只保留 `起源` 和 `近代发展` 两类内容。
- 历史有争议时写成“常见说法”“资料不一”“并非铁证”，不要写死。
- 故事馆不要出现 IBA、iba-world、国际调酒师协会等机构露出。
- 图片使用本地 AI 生成或本地资产，不直接抓取外部网站图片。
- 库存基酒只保留六大类：朗姆、威士忌、伏特加、金酒、白兰地、龙舌兰。
- 库存材料命名要偏普通用户可理解，避免品牌名和过细项。

## 当前状态

- 鸡尾酒数量：102 款。
- 图片目录：`assets/cocktails/` 与预览目录保持同步。
- 首页今日推荐已经显示中英双语酒名，英文略小。
- 收藏页已经独立为“我的酒单”页面。
- 库存和原创调酒模拟器已合并为“调酒台”。
- 收藏、库存、原创配方、学习进度和品鉴日志使用浏览器本地数据保存，支持 JSON 备份导出和导入，并在首页、收藏空状态和笔记空状态提供轻量首次使用提示。
- 学习路径和笔记页面已做移动端阅读密度和底部安全区优化。
- 底部留白已收紧，拖到底部后内容应停在底部控制台上方，不被遮挡。
- 首页桌面端：左图右文。
- 首页手机端：推荐说明、图片、推荐酒款、时间天气和完整配方入口按纵向排列。
- 酒单“全部”页：按英文首字母分组，每个首字母组内横向每行 6 个。
- 移动端酒单：保持两列布局。

## 最终发布清单

当前版本已经具备对外预览和小范围分享条件。

上线前建议确认：

- Git 工作区为干净状态：`git status --short` 无输出。
- 本地预览可打开：`http://localhost:8765/`。
- GitHub Pages 可打开：`https://yves12138.github.io/barcraft/`。
- 近期改动已经提交并推送到 `main`。
- 如果浏览器仍显示旧页面，强制刷新或等待 GitHub Pages 缓存更新几分钟。

已完成能力：

- 首页今日推荐：按时间和天气生成推荐，显示中英双语酒名、图片、推荐理由和完整配方入口。
- 经典图鉴：展示图片、风味、库存匹配、参数、配方、替代建议、练习重点、做法和历史笔记。
- 酒单：102 款鸡尾酒，全部页按英文首字母分组，基酒页按类别筛选。
- 收藏：收藏页独立展示“我的酒单”，支持收藏、取消收藏和刷新保留。
- 故事馆：每款酒保留起源和近代发展，不使用机构化露出。
- 调酒台：库存材料、可做酒款、差 1 样推荐、原创调酒模拟器和原创配方保存。
- 学习：7 天入门路径，可跳转练习酒款并写练习笔记。
- 笔记：品鉴日志、评分、微调记录、搜索和点击回到对应酒款。
- 本地保存：收藏、库存、原创配方、学习进度和笔记保存于当前浏览器设备，并可在品鉴日志页导出 / 导入 JSON 备份。

已知限制：

- 当前是纯静态网页，没有账号系统；本地保存只保存在当前设备和当前浏览器。
- 更换浏览器、清理浏览器数据或使用隐私模式可能导致收藏、库存和笔记不可用或丢失。
- 不同域名的本地保存彼此隔离，例如 `localhost`、`127.0.0.1` 和 GitHub Pages 线上地址的数据不互通。
- 酒单图片使用浏览器懒加载，自动化检查可能把未进入视口的图片临时判为“未加载”，这不等于资源缺失。
- 当前没有服务端同步、用户账号、云备份和多设备同步。

## 最近健康检查

检查日期：2026-06-20。

结果：

- Git 状态：干净。
- 核心文件同步：`index.html`、`app.js`、`styles.css`、`iba-data.js` 在源文件、`outputs/barcraft-app/`、`BarCraft Preview.app/Contents/Resources/site/` 中一致；运行预览服务时也会同步到 `/tmp/barcraft-preview-site/`。
- 数据完整性：102 款鸡尾酒，重复 ID 为 0，缺失图片为 0。
- 图片目录：`assets/cocktails/`、`outputs/barcraft-app/assets/cocktails/`、`BarCraft Preview.app/Contents/Resources/site/assets/cocktails/` 均为 102 张。
- 酒单“全部”：102 款，无重复，按英文首字母分组正常。
- 预览 App：`BarCraft Preview.app` 和 `Stop BarCraft Preview.app` 的 `Info.plist` 与可执行文件检查正常。
- Codex 内置浏览器检查：本地预览和 GitHub Pages 线上页均可打开。
- 桌面端检查：1280×720 下首页、图鉴、酒单、收藏、故事、调酒台、学习、笔记均可正常切换，无横向溢出，无控制台错误。
- 手机端检查：390×844 下首页、图鉴、酒单、收藏、故事、调酒台、学习、笔记均可正常切换，无横向溢出，无控制台错误。
- 底部安全区检查：拖到底部后，主要内容停在底部控制台上方，未发现实际可见内容被遮挡。
- 本地保存流程检查：收藏、取消收藏、笔记保存、笔记回跳、库存勾选、原创配方保存和删除均通过；刷新后保存状态可保留。

备注：

- `assets/` 源目录已清理未被当前页面引用的历史素材，当前源资源数量与预览输出资源数量一致。
- `outputs/` 根目录中的历史截图、概念图，以及 `work/contact-sheets/` 中的核对图已清理；当前保留的 `outputs/barcraft-app/` 是实际预览输出。
- Codex 沙盒里直接用命令访问本地端口可能会被 macOS 权限限制；预览状态以 Codex 内置浏览器为准。

## 常见检查

语法检查：

```bash
/Users/yves/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check app.js
/Users/yves/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check iba-data.js
```

确认仓库是否干净：

```bash
git status --short
```

确认预览服务端口：

```bash
lsof -iTCP:8765 -sTCP:LISTEN
```

确认核心文件是否同步：

```bash
cd /Users/yves/Documents/Codex/2026-06-02/barcraft
for f in index.html app.js styles.css iba-data.js; do
  echo "$f"
  shasum -a 256 "$f" "outputs/barcraft-app/$f" "BarCraft Preview.app/Contents/Resources/site/$f" "/tmp/barcraft-preview-site/$f"
done
```

确认鸡尾酒数量、重复 ID 和缺图：

```bash
cd /Users/yves/Documents/Codex/2026-06-02/barcraft
/Users/yves/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node <<'NODE'
const fs = require("fs");
const vm = require("vm");
const code = fs.readFileSync("iba-data.js", "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const drinks = ctx.window.IBA_DRINKS || [];
const ids = new Set();
const duplicateIds = [];
const missingImages = [];
for (const drink of drinks) {
  if (ids.has(drink.id)) duplicateIds.push(drink.id);
  ids.add(drink.id);
  if (!drink.image || !fs.existsSync(drink.image.replace(/^\.\//, ""))) {
    missingImages.push({ id: drink.id, name: drink.name, image: drink.image });
  }
}
console.log({ drinkCount: drinks.length, duplicateIds, missingImagesCount: missingImages.length, missingImages });
NODE
```
