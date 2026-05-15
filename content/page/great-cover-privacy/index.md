---
title: "好封面 Great Cover 隐私政策"
description: "好封面 Great Cover 浏览器扩展的隐私政策与数据使用说明"
slug: "great-cover-privacy"
date: 2026-05-15
comments: false
---

生效日期：2026-05-15

好封面 Great Cover 是一个在浏览器本地运行的中英双语封面生成器，作为 Chrome 浏览器侧边栏扩展提供。

## 数据收集

本扩展**不收集、不存储、不出售、不分享**任何用户个人数据。

用户输入的封面文字仅在当前浏览器侧边栏中用于生成预览与导出图片，全部处理在用户本地完成，不会上传到任何远程服务器。

## 权限使用

本扩展在 `manifest.json` 中仅申请以下 Chrome 权限：

- `sidePanel`：用于在浏览器侧边栏中显示扩展界面，是使用 Chrome 侧边栏 API 的必要权限。

复制 PNG 到剪贴板使用浏览器原生 `navigator.clipboard` API，导出 PNG 使用浏览器原生下载能力，二者均由用户手势触发，无需额外的 Chrome 权限。

## 远程服务

本扩展不依赖任何后端服务，不向远程服务器发送用户输入的文本、生成的图片或任何使用数据。扩展加载时浏览器会按需获取以下静态资源（用于字体与纹理渲染）：

- Google Fonts CDN — Noto Serif SC 字体
- transparenttextures.com — 纸张纹理装饰图

以上请求仅返回静态资源，不携带用户身份或输入内容。

## 第三方分析

本扩展不集成 Google Analytics、Sentry、Mixpanel 等任何第三方统计或埋点服务。

## 联系方式

如对本隐私政策有任何疑问或建议，请通过 Chrome Web Store 该扩展页面提供的开发者联系入口与我们联系。

## 变更

本隐私政策的最新版本始终发布于本页面。任何重大变更将以更新生效日期的形式标注。
