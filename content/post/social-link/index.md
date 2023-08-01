---
title: "hugo stack修改社交链接"
description: 
date: 2023-08-01T06:07:07Z
image: social-icon.png
categories:
    - hugo
tags:
    - blog
math: 
license: 
hidden: false
comments: true
draft: true
---

## 如何修改hugo stack主题中的social link
stack这款主题的社交链接会默认显示GitHub和twitter，如果想要增加，我们先要准备好icon。然后再通过修改配置文件，将icon链接到你的链接地址。
### 准备icon
- icon最好用svg格式，官方推荐的icon平台是[tablericons]（https://tablericons.com/）。在这个平台中找到你想添加的icon，点击复制即可。
- 然后在assets/icon文件夹下面新建svg文件,并将刚复制的icon代码粘贴到改文件。这时候icon已经准备完毕了，去添加你的链接地址吧。

### 编辑“menu.toml”配置文件
要增加多个链接，可以多复制几次下面的代码。
- identifier:标识
- name:名称
- 在url处填写你自己的链接；
- icon：填写你刚刚添加的icon名称，注意不要带上后缀名.svg
```
[[social]]
identifier = "github"
name = "GitHub"
url = "https://github.com/CaiJimmy/hugo-theme-stack"

[social.params]
icon = "brand-github"
```
编辑完成后，就大功告成了，可以提交代码查看效果啦。

