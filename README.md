# 肚肚小侦探

适合 iPhone 添加到主屏幕的原创卡通亲子模拟扫描 PWA。纯 HTML / CSS / JavaScript，无构建依赖、无服务器、无登录、无统计代码。

## 功能

- 三个情境：零食吃太多、饭前没洗手、睡前不刷牙。
- 分层模拟扫描：腹部骨骼/器官、手部骨骼、牙齿结构，扫描线、进度、动态虚构标记。
- 扫描结果 → 给孩子看 → 习惯约定 → 返回或再扫描。
- 本地合成扫描音效、随包提供的中文提示语音。
- 可选 5 / 10 / 15 秒，音效、触感、设备姿态视差偏好持久化。
- iPhone 方向传感器权限处理；不支持或拒绝时可滑动画面。
- 完整 Service Worker 预缓存、离线启动、音频 Range 响应、更新提示。
- 设置、使用说明、隐私说明、添加到主屏幕引导。

所有扫描和结果为预先设计的游戏效果，不检查人体，不使用相机/麦克风，不代表医学发现。此实现参考原应用公开描述和提供的四张截图；没有访问原应用二进制、付费内部页面或源代码，未公开页面按公开功能关系实现，不能保证未知页面逐项一致。原创名称与插画，不隶属于原应用。

## 发布到当前仓库

仓库：<https://github.com/liverick-netizen/tummyscanner>

应用文件应在仓库根目录。可选两种 Pages 方式，选一种即可：

1. **最简单**：Settings → Pages → Source 选择 Deploy from a branch → main → /(root) → Save。根目录的 `.nojekyll` 保证按静态文件发布。
2. **Actions**：Settings → Pages → Source 选择 GitHub Actions。已提供 `.github/workflows/pages.yml`，push 到 main 或手动运行 Publish PWA to GitHub Pages 即发布，只上传公共应用文件和 assets。

目标地址：<https://liverick-netizen.github.io/tummyscanner/>。

## iPhone 使用

1. Safari 打开线上 HTTPS 地址。
2. 分享 → 添加到主屏幕 → 添加。
3. 从主屏幕图标打开，等首页出现“离线已就绪”。
4. 可以开启飞行模式验证三种情境、图片和提示音。

首次打开需要网络。iOS 可能清理网站数据；清理后需再次联网加载。不要使用文件管理器直接打开 index.html：`file://` 不支持 Service Worker。局域网 HTTP 在 iPhone 上也无法提供完整 PWA/姿态权限，请用 Pages 的 HTTPS 地址。

## 本地预览

在应用目录运行 `python3 -m http.server 4173`，Mac 浏览器打开 <http://localhost:4173/>。也可以放在任意静态服务器的子目录，所有资源、manifest 和缓存路径均为相对路径。

## 平台边界

- 网页端 iPhone Safari 不支持通用 Vibration API，因此触感开关不可用；支持的平台可以震动。
- 设备倾斜需要浏览器支持；iPhone 首次开启时会请求权限，拒绝后可滑动画面。
- 语音文件为离线 WAV，不依赖 speechSynthesis 的网络语音；扫描电子音使用 Web Audio。
- 没有照片、位置、个人数据上传，也没有后端。线上加载时 GitHub 仍可能处理基础访问日志。
- 从桌面删除图标不保证同时清理浏览器缓存；可在 Safari 网站数据中删除本网站数据。

## 修改与更新

修改文件后同步提高 `sw.js` 的 `VERSION`。新版本完整预缓存成功后，首页会显示更新按钮，点击后启用新缓存并刷新。缓存以完整 scope 隔离，不清理同域其他 PWA。

## 视觉资产

运行时使用压缩 JPG 以减少首次下载；完整生成原图仍保留在源码中，不属于运行时缓存依赖。三个原始插画使用内置 image_gen 生成，保存在 `assets/belly.png`、`assets/hands.png`、`assets/teeth.png`；图标由肚肚插画按图标尺寸导出。完整提示词见 [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md)。音频由 macOS 本地 Tingting 中文语音离线合成。

## 参考

- [原应用公开说明](https://apps.apple.com/sa/app/id6795453888)
- [GitHub Pages 发布源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [设备方向权限](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/requestPermission_static)
