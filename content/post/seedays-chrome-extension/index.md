---
title: "用 Claude Design 和 Claude Code 做了一个 Chrome 新标签页日历插件 SeeDays"
description: "本来想做一个可以撕掉昨天的真实日历，最后收敛成了一个显示今年、这个月、人生倒计时和今日待办的新标签页插件。"
slug: "seedays-chrome-extension"
date: 2026-04-21T08:19:39Z
image: "https://raw.githubusercontent.com/laosji/img/main/img/20260421161841695.png"
categories:
    - AI
    - 碎片
tags:
    - Claude Design
    - Claude Code
    - Chrome 插件
    - 新标签页
    - 独立开发
math:
license:
hidden: false
comments: true
draft: false
featured: false
---

最近我用 Claude Design 和 Claude Code，做了一个 Chrome 日历插件，名字叫 **SeeDays**。

这个插件现在已经上架到 Chrome 插件商店，可以直接下载安装，让 SeeDays 变成你的默认标签页：

[https://chromewebstore.google.com/detail/seedays/bfgmamhkpeeoaiknicdgombenfogjdjm?authuser=0&hl=en](https://chromewebstore.google.com/detail/seedays/bfgmamhkpeeoaiknicdgombenfogjdjm?authuser=0&hl=en)

## 起因：我本来想做一个可以“撕日历”的新标签页

这个想法其实很简单。

我一直想还原一个更接近真实日历的体验。不是普通的数字日历，而是那种每天撕掉一页的台历。因为“撕掉昨天”这个动作，本身就很有感觉，它会让人更直接地意识到，时间确实正在流逝。

所以一开始，我想做的并不是一个普通的 Chrome 插件，而是一个有一点仪式感的默认新标签页。

每天打开浏览器，先看到今天，然后把昨天撕掉。

## 但做到一半，我放弃了最初那个版本

原本我还设计了一个动画：

把日历撕掉以后，那一页会被揉成一个纸团，然后扔到屏幕上。

这个效果如果做好了，应该会很有意思，也会更接近我脑子里那个“真实撕日历”的感觉。

但问题是，我做不出让我自己满意的效果。

动画这种东西很微妙。不是能动就行，而是要自然、顺手、不要假。如果做出来的质感不对，整个产品看起来就会像一个半成品。

所以后来我决定，不再硬做那个动画，而是把产品收敛到一个更简单、也更实用的方向。

## 最后做成了现在这个版本

现在的 SeeDays，打开新标签页后，主要会看到这几块内容：

- 今年还剩多少天
- 这个月还剩多少天
- 人生倒计时
- 今日待办事项

它不是我最初设想的那个“可以完整撕日历”的版本，但它保留了我最在意的核心：**让你在打开浏览器的那一刻，对今天有一点真实的感知。**

很多人每天会打开无数次新标签页。

如果这个动作只是为了看搜索框，那太浪费了。不如让它顺手提醒你一下：今天已经来了，这个月也在过去，你的人生也不是无限长的。

听起来有点残酷，但我觉得这种提醒是有价值的。

## AI 现在真的很适合做这种小产品

这次我主要是用 Claude Design 和 Claude Code 来完成这个插件。

像这种个人小项目，如果放在以前，可能会一直停留在“我有个想法”这个阶段。因为从交互、视觉、前端实现，到细节调整，单靠自己慢慢磨，成本还是挺高的。

但现在有 AI，事情就变得不一样了。

我可以先把脑子里的画面告诉它，让它帮我整理设计方向，再继续让它把代码写出来，最后我自己不断试、不断改、不断否掉那些看起来不够对的细节。

所以对我来说，AI 最有价值的地方，不是“帮我一键生成一个成品”，而是它能把一个原本不会被做出来的想法，推进到真正可以上线。

## 如果你想试试

SeeDays 现在已经可以通过 Chrome 插件商店安装。

如果你也想把默认新标签页换成一个更有时间感的页面，可以直接试试看：

[安装 SeeDays](https://chromewebstore.google.com/detail/seedays/bfgmamhkpeeoaiknicdgombenfogjdjm?authuser=0&hl=en)

也许它不能真的替你留住时间，但至少每次打开浏览器的时候，它会提醒你，今天这一页，已经开始了。
