---
title: 永久免费的个人博客github page+hugo，如何搭建？
description: 
slug: build a free blog
date: 2023-08-01T02:27:36Z
image: blog.png
math: 
license: 
hidden: false
comments: true
draft: false
categories:
    - hugo
tags:
    - 教程
    - blog
---

搭建个人博客最好的方案是什么？相信很多人肯定会毫不犹豫的说出“WordPress”,的确wordpress是一个不错的方案，安装简单，主题多插件丰富，而且带后台，很多VPS也都支持一键安装。但是缺点是不免费，不仅要买服务器，还要买域名。对很多心血来潮的朋友来说，在VPS上搭建好了wordpress博客之后，很久都不更新。渐渐的这个博客也就被遗忘了，服务器也不续费了，域名也过期了，自己曾经写过的东西一点也没留下，从此消失在了信息大爆炸的互联网中。但是如果使用免费的方案，就算你不更新，只要GitHub不关停，你的博客就会一直保留。折腾了这么多的程序之后，我自己的服务器上的内容全部已经丢失，就再也不想折腾了，何不用免费的呢？省心、省钱，哈哈哈···。下面是我折腾hugo Stack主题的具体操作，如果你也想拥有这样一个博客，就跟着下面的步骤来开始操作吧，真的非常简单，只要3分钟就能搭建完成。

### 第一步，注册GitHub账号

打开![GitHub] (<https://github.com/),如果你还没有账号的话，请注册一个。如果你已经拥有一个GitHub账号，请直接登录。>)

### 第二步，新建仓库

我使用的是Stack主题，这个主题不仅简单美观，而且可以快速部署。打开这个项目[hugo-theme-stack-starter](https://github.com/CaiJimmy/hugo-theme-stack-starter),根据readme.md的说明，我们点击“use this template”的绿色按钮，选择“Crete a new repository”。如图：
[use this template](https://user-images.githubusercontent.com/5889006/156916624-20b2a784-f3a9-4718-aa5f-ce2a436b241f.png)
仓库可以命名为“username.github.io”,这样就可以直接访问这个地址来打开你的博客。

### 第三步，创建代码空间，可在线编辑代码

[创建代码空间]（<https://user-images.githubusercontent.com/5889006/156916672-43b7b6e9-4ffb-4704-b4ba-d5ca40ffcae7.png）>

### 第四步，预览你的网站

在代码空间运行"hugo server"，开启Hugo 服务器，此时就可以在浏览器中预览你的网站啦。

### 第五步，配置 Hugo

打开 config.toml 文件，根据您的需求进行配置，例如设置网站标题、作者等信息。
>

baseurl = "<https://laosji.net>"
languageCode = "zh-cn"
paginate = 5
title = "laosji.net"
DefaultContentLanguage = "zh-cn"
hasCJKLanguage = ture

## Change it to your Disqus shortname before using

disqusShortname = "laosji.net"

### 修改头像
>
> 替换themes/hugo-theme-stack/assets/img/avatar.png下的avatar.png即可
>
### 菜单编辑

打开“menu.toml”文件, 修改自己的社交媒体账号链接即可

---

[[social]]
identifier = "github"
name = "GitHub"
url = "<https://github.com/koala9527>"

[social.params]
icon = "brand-github"

到此你的博客已经搭建完成了，快去看看吧
