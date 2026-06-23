# BarCraft 原生 App 打包说明

BarCraft 现在仍然保留原来的静态网页 / PWA 结构，同时新增 Capacitor 配置，用来把现有网页包装成 iOS / Android 原生 App。

## 当前新增内容

- `package.json`：Capacitor 依赖和常用命令。
- `capacitor.config.json`：App 名称、包名和网页资源目录。
- `scripts/prepare-mobile-web.js`：把当前静态网页资源同步到 `outputs/barcraft-app/`，供 Capacitor 打包。

网页入口仍然是：

```text
index.html
```

Capacitor 使用的网页目录是：

```text
outputs/barcraft-app
```

## 第一次生成 iOS App

需要先准备：

- Node.js LTS 和 npm。
- Xcode。
- 联网安装 Capacitor 依赖。

如果终端提示 `npm: command not found`，先安装 Node.js LTS，再继续。

在本机联网安装依赖：

```bash
cd /Users/yves/Documents/Codex/2026-06-02/barcraft
npm install
```

然后生成 iOS 原生项目：

```bash
npm run ios:add
npm run cap:sync
npm run ios:open
```

`ios:open` 会打开 Xcode。之后可以在 Xcode 里选择模拟器或真机运行。

## 第一次生成 Android App

需要先准备：

- Node.js LTS 和 npm。
- Android Studio。
- Android SDK。
- 联网安装 Capacitor 依赖。

然后执行：

```bash
cd /Users/yves/Documents/Codex/2026-06-02/barcraft
npm install
npm run android:add
npm run cap:sync
npm run android:open
```

`android:open` 会打开 Android Studio。

## 每次修改网页后

如果只改了 `index.html`、`app.js`、`styles.css`、`iba-data.js` 或图片资源，先同步网页资源，再同步到原生项目：

```bash
npm run cap:sync
```

如果只想复制网页资源，不重新同步插件：

```bash
npm run cap:copy
```

## iPhone 真机安装

iPhone 真机运行需要：

- Xcode。
- Apple ID。
- 如果只是自己手机测试，可以先用 Xcode 的个人签名。
- 如果要 TestFlight 或 App Store 上架，需要 Apple Developer Program。

在 Xcode 中需要检查：

- Bundle Identifier：`com.yves12138.barcraft`
- Display Name：`BarCraft`
- Signing Team：选择你的 Apple ID / 开发者团队

## 注意事项

- 当前方案不是重写 App，而是用 Capacitor 包装现有网页。
- `ios/` 和 `android/` 目录会在执行 `npm run ios:add` / `npm run android:add` 后生成。
- 生成后的 `ios/` 和 `android/` 原生项目通常需要提交到 git，方便后续继续维护。
- App Store 审核可能会关注它是否只是简单网页壳。BarCraft 已经有离线缓存、收藏、调酒台、笔记、学习路径和本地备份，后续上架前还应补隐私政策、截图和应用描述。
