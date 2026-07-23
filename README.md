# 🌾 約瑟七豐年存糧(hfpc-josephgrain-match3)

「Candy 骨架 + tsum 皮」系列第二發(大表 A28),fork 自 hfpc-noahark-match3。
swap 三消反向化:三連=**收進糧倉**(不是消滅)、補位=神賜豐年、永不會輸。

- 經文:創 41:29、41:48、41:49、50:20——**均經 cuv MCP 逐字查證(和合本)**
- 信息:**神預先看顧**——七豐年存糧,保全許多人的性命(創 50:20);與 joseph-granary/steward 糧倉關區隔
- 六款莊稼 tsum 臉(麥/大麥/小米/豆莢/無花果/椰棗)+瘦穗子搗蛋鬼(創 41:23)+豐收捆(4 連,整排整列入倉)
- 年齡三檔:幼 6×6・20 倉/童 7×7・32 倉(瘦穗子2)/青 8×8・45 倉(瘦穗子3);勝利卡有「再玩一次/選難度」
- 牧者已核可題材(2026-07-23);文案細節仍請過目

## 開發/部署

零相依、零美術檔、可離線(PWA)。鍛造來源:`scripts/forge.mjs`(noahark → 本題)。
語音重烤 `node scripts/gen-tts.mjs`;驗證 `node scripts/verify.mjs <URL>`。

```bash
npx wrangler deploy --name hfpc-josephgrain-match3 --compatibility-date 2026-07-01 --assets .
```

改版時 `sw.js` 的 `CACHE_NAME` +1;`.assetsignore` 已擋 `.git`/`.wrangler`。
