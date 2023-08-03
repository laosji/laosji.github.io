---
title: "Github Page多个仓库用同一个域名，如何绑定二级域名？"
description: 
date: 2023-08-03T01:03:14Z
image: https://cdn.jsdelivr.net/gh/Johnsmart/PokeAI/photos/aguedes_Create_an_illustration_of_space_with_planets_orbiting_a_bf93ba3b-a5a1-46a6-8cb9-299c8da5a365.png
categories:
    - hugo
tags:
    - blog
math: 
license: 
hidden: false
comments: true
draft: false
---

# Github Page多个仓库用同一个域名，如何绑定二级域名？

## 背景

先来说说我在搭建这个博客的经历，本来是想通过博客申请Google AdSense，申请成功之后把域名换成我的网址导航站。因为这个导航站已经做了很多年而且有一定的用户基础，前段时间也选定了一个比较合适域名"laosji.net",这样挂着广告也可以有一笔收入（做美梦中）。
接下来我终于把博客搭建起来了，完全被hugo的stack主题征服，整个发布博文的方式也很特别，此时的我已经想要在这个博客上大干一场了。于是主域名被我解析到了博客主页，导航站又没有域名了，这可怎么办呢？能不能解析二级域名啊，Google了一下居然站的可以，话不多说就是你现在看到的效果，我把导航站的链接放在了博客的左侧菜单，点击一下看看效果吧。

## 方案设计

* 将主域名laosji.net解析到我的博客仓库（laosji.github.io）
* 将二级域名解析到我的导航站的仓库（chaodior.github.io）  

域名很快就解析好了，但是我发现导航站不能访问。有问题找Google嘛，看到一篇博客说仓库缺少CNAME文件。于是我就去照做，在导航站的仓库中新建了一个CNAME的文件，里面填上二级域名，这里我的决定使用"dh.laosji.net"这个域名，编辑完后保存并更新，不知道现在访问会出现什么结果，希望可以正常访问吧。果然，可以正常打开了。

## 域名解析

这里我用的是阿里云，在阿里云域名设置里添加一条如下记录：
1 记录类型选择CNAME
2 主机记录填写自己要绑定的二级域名
3 记录值填写自己的仓库地址
![域名解析](https://cdn.jsdelivr.net/gh/Johnsmart/PokeAI/photos/20200209182617491.png)

## 修改仓库配置

进入 Github Page 仓库，修改CNAME文件（没有则手动创建文件），将自己的二级域名添加到文件第一行（内容必须为一行），如图：
![仓库配置](https://cdn.jsdelivr.net/gh/Johnsmart/PokeAI/photos/20200209183526783.png)

## 完成打开你的网址试试看吧