---
title: "港美股开户奖励领取"
description: "领取港美股新开户官方奖励"
layout: "coupons"
url: "/coupons"
type: "coupons"
coupons:
  - name: "老虎证券开户领取总价值高达2200港币+180天30次免佣卡"
    amount: "2200HKD"
    rules: |
      - 首次存入資金 HK$10,000 並維持45日，可激活總價值 HK$300 股票代金券。
      - 首次入金后7日内累計淨入金達 HK$50,000 並維持45日，可激活總價值 HK$600 股票代金券。
      - 首次入金后7日内累計淨入金達 HK$100,000 並維持45日，可激活總價值 HK$1,200 股票代金券。
      - 首次入金達 HK$10,000 或其他等值貨幣及以上可享：
        - HK$300 股票代金券
        - 180天30次通用免佣卡
      - 交易獎賞：60天内完成5筆買入交易，激活 HK$700 股票代金券
    validDate: "2024-10-31"
    link: "https://tigr.link/7gIFaD"
    code: "LAOSJI"
    thumbnail: "/images/tiger10.jpg"
    
  - name: "长桥证券-终生免佣"
    amount: "488HKD"
    rules: |
      - 香港长桥活动
      💵首次净入资1万HKD 
      福利1️⃣：港股终身免佣
      福利2️⃣：美股终身免佣
      优质渠道客户加码88港币（需要联系我或者客户经理获取）

      💵首次净入资2万HKD 再得
      福利3️⃣：400港币股票现金卡
      福利4️⃣：5USD期权现金卡
    validDate: "2024-12-31"
    link: "https://app.longbridgehk.com/ac/oa?account_channel=lb&channel=HB100034&invite-code=48T09P"
    code: "48T09P"
    thumbnail: "/images/longbridge10.jpg"
    
  - name: "华盛通10月新人奖励最高1300HKD"
    amount: "1300HKD"
    rules: |
      - ❤️ 【华盛10月新人奖励】： 
      总额1100奖励等你来拿 
      首次入金达1w港币（或1300USD） 
      1. HK$400交易现金券
      2. US$25交易现金券 
      3. 港股90天免佣卡 ，美股90天免佣卡，180天期货免佣卡
      4. HK$300新股认购优惠券 
      5. 1股OXY价值51美元（首入金金额留存30天） 
      6. 两人同行开户，额外送HK$200交易现金券 
        - 通过OCBC新加坡卡存入到账1万港币或者以上的话，可以补贴200港币现金券，这样就相当于无损入金了
      老用户开户未入金，首次入金前在App我的-填写邀请码处输入 E1NC，亦可拿到奖励。
    validDate: "2024-12-31"
    link: "https://www.hstbroker.com/kh/apply/online?_scnl=E1NC"
    code: "E1NC"
    thumbnail: "/images/huast10.jpg"

  - name: "卓锐证券港美股终身0佣金，新人注册可得高达1888HKD奖励"
    amount: "1888HKD"
    rules: |
      - 【卓锐证券新礼[港美股终身0佣+1688现金券]】：
      活动时间：2024.8.1-2024.10.31
      注册送：2*99$融资打新券
      开户送：港美股终身0佣
      入金奖励：
      1. 首次入金1万港币，奖励500港币现金券
      2. 首次入金3万港币，奖励688港币现金券
      3. 首次入金30万港币，奖励1688港币现金券
    validDate: "2024-10-31"
    link: "https://h5pro.zr66.com/zhuorui_web_h5/?channelId=100283"
    code: "100283"
    thumbnail: "/images/zhuorui.jpg"
  
  - name: "立桥证券开户【最高可得3股理想美股股票】" 
    rules: |
    - 2股【理想汽車】美股(代號NASDAQ: LI)
    - 好友同行加碼额外1股理想汽车股票
    - 永久$0平台費永久$0佣金(港期買賣)
    amount:"888HKD"
    validDate: "2024-10-31"
    link: "https://h.wlsec.com:6003/webstatic/sign/index.html#/register?channelId=EO0SJua%2FGSP9adQxdXBBdQ%3D%3D&customerSourceId=4xBYZ66VGEkCBgE6uGyiXg%3D%3D&aeCode=HHwfH8dTlcImS%2BveqlB41g%3D%3D&lang=zh_HK"
    thumbnail: "/images/liqiao.jpg"


---

## 优惠券使用说明

这里汇集了各大电商平台的优质优惠券,所有优惠券均经过严格筛选,确保实用性和可靠性。

### 使用步骤

1. 点击"立即领取"按钮跳转到对应平台
2. 登录账号后自动领取优惠券
3. 下单时选择优惠券即可抵扣

### 温馨提示

- 部分优惠券可能库存有限,请尽快领取使用
- 使用优惠券时请注意查看使用规则和有效期
- 如遇到问题可以通过评论区留言或联系我们协助处理

## 全部优惠券

{{ range .Params.coupons }}
<div class="coupon-card">
  <img src="{{ .thumbnail }}" alt="{{ .name }}" class="coupon-thumbnail">
  <div class="coupon-info">
    <h3 class="coupon-name">{{ .name }}</h3>
    <span class="discount-amount">{{ .amount }}</span>
    <div class="coupon-rules">
      {{ .rules | markdownify }}
    </div>
    <div class="coupon-meta">
      <span>有效期至：{{ .validDate }}</span>
      {{ if .code }}
      <span>优惠码：<code class="coupon-code">{{ .code }}</code></span>
      {{ end }}
    </div>
    <a href="{{ .link }}" class="coupon-btn" target="_blank">立即领取</a>
  </div>
</div>
{{ end }}
