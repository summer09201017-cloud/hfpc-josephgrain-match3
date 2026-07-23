// 鍛造:noahark-match3 → 約瑟七豐年存糧(創 41)。錨點替換,缺錨即停(照 tsum-forks 鐵則)。
import fs from 'fs'
import path from 'path'
const ROOT = path.resolve(import.meta.dirname, '..')
const P = (f) => path.join(ROOT, f)

function repl(src, from, to, tag) {
  if (!src.includes(from)) { console.error('🔴 缺錨:', tag); process.exit(1) }
  return src.replace(from, to)
}
function replRange(src, startAnchor, endAnchor, newBlock, tag) {
  const i = src.indexOf(startAnchor)
  const j = src.indexOf(endAnchor, i + 1)
  if (i < 0 || j < 0) { console.error('🔴 缺區段錨:', tag); process.exit(1) }
  return src.slice(0, i) + newBlock + src.slice(j)
}

// ── game.js ──
let g = fs.readFileSync(P('game.js'), 'utf8')

g = replRange(g, '// 挪亞方舟・動物上船', '(function () {', `// 約瑟七豐年存糧(創 41:29,48-49;50:20)——「Candy 骨架 + tsum 皮」第二發(A28,fork noahark-match3):
//   swap 三消反向化(match3-swap)+ tsum 圓萌臉 + squash & stretch Q 彈。
// ⚠ 文案為 AI 依和合本草擬(引文均經 cuv MCP 逐字查證:創 41:29、41:48、41:49、50:20),牧者已核可題材。
//   與 joseph-granary/steward 糧倉關區隔:這張講「神預先看顧——七豐年存糧,保全許多人的性命」。
//
// 玩法:七個大豐年,田裡五穀豐登!點兩個相鄰的莊稼交換;排成一排 3 個同款=「收進糧倉」
//   (倉窗一格格亮起);新的莊稼源源長出來(神賜豐年=補位的經文!)。存滿目標倉數——
//   荒年來到,埃及全地都有糧!⑤瘦穗子(法老夢裡被東風吹焦的,創 41:23)偶爾飄來擋路,
//   風一吹自己就走;連 4+ 出「豐收捆」,點一下整排整列一起入倉(豐收滿溢)。
// ★ 神學守法:①收進糧倉,絕不畫成消滅;②補位=神賜豐年;③永不會輸;④信息在「神預先看顧、
//   保全性命」(創 50:20),不做高分炫光。
(function () {`, 'header')

g = repl(g, "const ANIMALS = ['sheep', 'dove', 'lion', 'elephant', 'turtle', 'frog']",
  "const ANIMALS = ['wheat', 'barley', 'millet', 'bean', 'fig', 'date']", 'kinds')

g = repl(g, "young: { label: '🐣 幼', desc: '6×6・上船 20 對', size: 6, kinds: 4, goal: 20, crow: 0 },",
  "young: { label: '🐣 幼', desc: '6×6・存滿 20 倉', size: 6, kinds: 4, goal: 20, crow: 0 },", 'age-y')
g = repl(g, "kid: { label: '🙂 童', desc: '7×7・上船 32 對', size: 7, kinds: 5, goal: 32, crow: 2 },",
  "kid: { label: '🙂 童', desc: '7×7・存滿 32 倉', size: 7, kinds: 5, goal: 32, crow: 2 },", 'age-k')
g = repl(g, "teen: { label: '🔥 青', desc: '8×8・上船 45 對', size: 8, kinds: 6, goal: 45, crow: 3 },",
  "teen: { label: '🔥 青', desc: '8×8・存滿 45 倉', size: 8, kinds: 6, goal: 45, crow: 3 },", 'age-t')

g = replRange(g, '  const T = {', '\n\n  const VOICES', `  const T = {
    title: '🌾 約瑟七豐年存糧',
    ref: '創世記 41:29,48-49',
    intro1: '「埃及遍地必來七個大豐年，」(創 41:29)',
    how: '七個大豐年,田裡五穀豐登!點一個莊稼、再點旁邊的一個交換位置;排成一排 3 個同款就「收進糧倉」,新的莊稼會源源長出來。連出 4 個以上會出現豐收捆——點一下,整排整列一起入倉!存滿目標倉數,荒年來到全地都有糧。放心慢慢收——沒有步數限制。',
    pick: '約瑟站在倉前,等你一起收糧:',
    hud: (p, goal) => \`🌾 已存 \${p}/\${goal} 倉\`,
    gather: '入倉!積蓄五穀',
    cascade: '田裡又長出新的了…',
    shuffle: '風把莊稼吹勻了…',
    noswap: '這樣排不成一排——輕輕放回去',
    crowCome: '瘦穗子飄來擋路了…(創 41:23)',
    crowGo: '東風一吹,瘦穗子走了',
    rainbowBorn: '豐收捆!點它,整排整列一起入倉',
    rainbowGo: '一大批一起入倉了!',
    closeLine: '約瑟聚歛埃及地七個豐年一切的糧食，把糧食積存在各城裡。(創 41:48)',
    winTitle: '🎉 倉都滿了,荒年不怕!',
    winVerse: '約瑟積蓄五穀甚多，如同海邊的沙，無法計算，因為穀不可勝數。',
    winRef: '創世記 41:49',
    teachVerse: '從前你們的意思是要害我，但神的意思原是好的，要保全許多人的性命，成就今日的光景。',
    teachRef: '創世記 50:20',
    teach: '七個豐年不是運氣,是神預先看見、預先預備——祂把夢給法老,把智慧給約瑟,把糧食存滿倉,為要在荒年保全許多人的性命。今天神也一樣走在你前面:你還沒遇見的難處,祂已經預備好了恩典。',
    review: '文案待牧者審核・經文均經和合本逐句核對',
  }`, 'T')

g = repl(g, "try { if (typeof window.__ping === 'function') window.__ping('noahark-match3' + suffix, t) } catch {}",
  "try { if (typeof window.__ping === 'function') window.__ping('josephgrain-match3' + suffix, t) } catch {}", 'ping')

// 埃及金黃色調
g = repl(g, "sky.addColorStop(0, '#9db8d8'); sky.addColorStop(0.55, '#c6d6e4'); sky.addColorStop(0.72, '#9ec380'); sky.addColorStop(1, '#7fae62')",
  "sky.addColorStop(0, '#bcd2e8'); sky.addColorStop(0.5, '#ead9a8'); sky.addColorStop(0.72, '#d8bc72'); sky.addColorStop(1, '#c0a050')", 'sky')
g = repl(g, "ctx.fillStyle = 'rgba(90,130,70,0.28)'", "ctx.fillStyle = 'rgba(150,120,60,0.28)'", 'board-bg')
g = repl(g, "ctx.strokeStyle = 'rgba(70,105,55,0.2)'", "ctx.strokeStyle = 'rgba(120,95,45,0.22)'", 'board-grid')

// 糧倉(沿用窗格進度邏輯,只換造型與字)
g = replRange(g, '    // 方舟:右側大船,艙房窗=進度(每對亮一格)', '    _rainbowArc(alpha) {', `    // 糧倉:右側大倉,倉窗=進度(每滿一倉亮一格)
    _ark() {
      const { ctx } = this
      const goal = this.cfg.goal
      const done = this._pairs()
      const frac = (this.collected % PAIR) / PAIR
      const ax = 764, aw = 176
      // 倉基
      ctx.fillStyle = '#8a6a3a'
      ctx.beginPath()
      ctx.moveTo(ax, 380); ctx.lineTo(ax + aw, 380); ctx.lineTo(ax + aw - 14, 430); ctx.lineTo(ax + 14, 430)
      ctx.closePath(); ctx.fill()
      // 倉身
      const houseY = 96, houseH = 268
      ctx.fillStyle = '#c89858'
      rR(ctx, ax + 14, houseY, aw - 28, houseH, 10); ctx.fill()
      // 尖頂(埃及圓穹倉)
      ctx.fillStyle = '#8a6a3a'
      ctx.beginPath(); ctx.arc(ax + aw / 2, houseY + 2, (aw - 28) / 2, Math.PI, 0); ctx.fill()
      // 倉窗(=目標倉數;亮一格=存滿一倉)
      const cols = goal > 36 ? 5 : goal > 24 ? 4 : goal > 16 ? 3 : 2
      const rows = Math.ceil(goal / cols)
      const wx0 = ax + 24, wy0 = houseY + 14
      const ww = (aw - 48 - (cols - 1) * 6) / cols
      const wh = Math.min(24, (houseH - 28 - (rows - 1) * 5) / rows)
      for (let i = 0; i < goal; i++) {
        const col = i % cols, row = Math.floor(i / cols)
        const wx = wx0 + col * (ww + 6), wy = wy0 + row * (wh + 5)
        const full = i < done
        const filling = i === done ? frac : 0
        ctx.fillStyle = full ? '#ffd77a' : 'rgba(58,40,16,0.5)'
        rR(ctx, wx, wy, ww, wh, 5); ctx.fill()
        if (!full && filling > 0) {
          ctx.fillStyle = 'rgba(255,215,122,0.55)'
          rR(ctx, wx, wy + wh * (1 - filling), ww, wh * filling, 4); ctx.fill()
        }
        if (full) { // 滿倉小麥堆
          ctx.fillStyle = '#a07828'
          ctx.beginPath(); ctx.arc(wx + ww * 0.3, wy + wh * 0.6, wh * 0.2, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(wx + ww * 0.55, wy + wh * 0.5, wh * 0.22, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(wx + ww * 0.75, wy + wh * 0.62, wh * 0.18, 0, 7); ctx.fill()
        }
      }
      // 倉門+坡道(莊稼落點)
      ctx.fillStyle = '#5a4016'
      rR(ctx, ax + 28, 378, 34, 44, 6); ctx.fill()
      ctx.fillStyle = '#d8b878'
      ctx.beginPath(); ctx.moveTo(ax + 30, 422); ctx.lineTo(ax - 34, 452); ctx.lineTo(ax - 22, 460); ctx.lineTo(ax + 62, 424); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#3c2c0c'
      ctx.font = 'bold 14px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('糧倉', ax + aw / 2, 66)
      ctx.font = '11px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText('(創 41:49 如同海邊的沙)', ax + aw / 2, 82)
    }

    `, 'granary')

// 豐收金光(取代彩虹弧)
g = repl(g, `      const COLORS = ['#e8524a', '#f0a030', '#f5d90a', '#58b368', '#4a90d9', '#9068be']
      ctx.save()
      ctx.globalAlpha = 0.75 * alpha`, `      const COLORS = ['#ffe9a0', '#ffd77a', '#f0b850', '#d89830', '#c08020', '#a87018']
      ctx.save()
      ctx.globalAlpha = 0.75 * alpha`, 'arc-colors')

// 勝利卡弧線改麥金
g = repl(g, `      const COLORS = ['#e8524a', '#f0a030', '#f5d90a', '#58b368', '#4a90d9', '#9068be']
      ctx.lineWidth = Math.max(3, H * 0.008)`, `      const COLORS = ['#ffe9a0', '#ffd77a', '#f0b850', '#d89830', '#c08020', '#a87018']
      ctx.lineWidth = Math.max(3, H * 0.008)`, 'wincard-arc')

// tsum 皮:六款莊稼+瘦穗子(crow)+豐收捆(rainbow)
g = replRange(g, "      if (kind === 'sheep') {", `      ctx.restore()
    }

    _drawIntro() {`, `      if (kind === 'wheat') { // 金麥穗:頂上三根麥芒+麥粒
        body('#f0c85a', '#cda43a')
        ctx.strokeStyle = '#cda43a'; ctx.lineWidth = Math.max(1.6, r * 0.07); ctx.lineCap = 'round'
        for (const a of [-0.5, 0, 0.5]) {
          ctx.beginPath(); ctx.moveTo(a * r * 0.5, -r * 0.85); ctx.lineTo(a * r * 0.85, -r * 1.35); ctx.stroke()
        }
        ctx.lineCap = 'butt'
        ctx.fillStyle = '#e0b048'
        for (const [ux, uy] of [[-0.3, -1.0], [0, -1.15], [0.3, -1.0]]) {
          ctx.beginPath(); ctx.ellipse(ux * r, uy * r, r * 0.13, r * 0.2, 0, 0, 7); ctx.fill()
        }
        face()
      } else if (kind === 'barley') { // 棕大麥:垂穗
        body('#d8a86a', '#b4844a')
        ctx.strokeStyle = '#b4844a'; ctx.lineWidth = Math.max(1.5, r * 0.06); ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(0, -r * 0.9); ctx.quadraticCurveTo(r * 0.4, -r * 1.3, r * 0.7, -r * 1.05); ctx.stroke()
        ctx.lineCap = 'butt'
        ctx.fillStyle = '#c89454'
        for (const k2 of [0.25, 0.45, 0.65]) {
          ctx.beginPath(); ctx.ellipse(r * (0.1 + k2 * 0.6), -r * (1.05 + 0.22 * Math.sin(k2 * 3)), r * 0.12, r * 0.18, 0.5, 0, 7); ctx.fill()
        }
        face()
      } else if (kind === 'millet') { // 橘小米:頂上一簇圓粒
        body('#f0a44a', '#cd8434')
        ctx.fillStyle = '#e09038'
        for (const [ux, uy] of [[-0.35, -0.85], [0, -1.0], [0.35, -0.85], [-0.15, -1.1], [0.18, -1.12]]) {
          ctx.beginPath(); ctx.arc(ux * r, uy * r, r * 0.16, 0, 7); ctx.fill()
        }
        face()
      } else if (kind === 'bean') { // 綠豆莢:頭頂彎莢
        body('#9cc45a', '#7ca43e')
        ctx.strokeStyle = '#6f9438'; ctx.lineWidth = Math.max(2, r * 0.14); ctx.lineCap = 'round'
        ctx.beginPath(); ctx.arc(0, -r * 0.95, r * 0.42, Math.PI * 0.15, Math.PI * 0.85, true); ctx.stroke()
        ctx.lineCap = 'butt'
        ctx.fillStyle = '#7ca43e'
        for (const a of [0.3, 0.5, 0.7]) {
          const px = Math.cos(Math.PI * a) * r * 0.42, py = -r * 0.95 - Math.sin(Math.PI * a) * r * 0.42
          ctx.beginPath(); ctx.arc(-px, py, r * 0.1, 0, 7); ctx.fill()
        }
        face()
      } else if (kind === 'fig') { // 紫無花果:頂上小葉
        body('#a678b8', '#84589a')
        ctx.fillStyle = '#6f9438'
        ctx.beginPath(); ctx.ellipse(0, -r * 0.95, r * 0.2, r * 0.32, 0.4, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.ellipse(-r * 0.22, -r * 0.88, r * 0.16, r * 0.26, -0.5, 0, 7); ctx.fill()
        face()
      } else if (kind === 'date') { // 棗紅椰棗:頂上棕櫚葉
        body('#c86048', '#a44832')
        ctx.strokeStyle = '#6f9438'; ctx.lineWidth = Math.max(1.6, r * 0.07); ctx.lineCap = 'round'
        for (const a of [-0.6, -0.2, 0.2, 0.6]) {
          ctx.beginPath(); ctx.moveTo(0, -r * 0.85); ctx.quadraticCurveTo(a * r * 0.8, -r * 1.35, a * r * 1.1, -r * 1.1); ctx.stroke()
        }
        ctx.lineCap = 'butt'
        face()
      } else if (kind === 'crow') { // 瘦穗子(創41:23 被東風吹焦):灰黃枯瘦+想睡的臉
        body('#c8bc98', '#a89c78')
        ctx.strokeStyle = '#a89c78'; ctx.lineWidth = Math.max(1.4, r * 0.06); ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(0, -r * 0.85); ctx.quadraticCurveTo(r * 0.3, -r * 1.25, r * 0.15, -r * 1.4); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(r * 0.15, -r * 1.4); ctx.lineTo(r * 0.4, -r * 1.28); ctx.stroke() // 垂頭的枯穗
        ctx.lineCap = 'butt'
        const er = r * 0.12
        ctx.strokeStyle = '#5a5040'; ctx.lineWidth = Math.max(1.4, r * 0.06)
        ctx.beginPath(); ctx.moveTo(-r * 0.42, -r * 0.1); ctx.lineTo(-r * 0.18, -r * 0.1); ctx.stroke() // 瞇眼
        ctx.beginPath(); ctx.moveTo(r * 0.18, -r * 0.1); ctx.lineTo(r * 0.42, -r * 0.1); ctx.stroke()
        ctx.beginPath(); ctx.arc(0, r * 0.2, er, 0.25 * Math.PI, 0.75 * Math.PI, true); ctx.stroke() // 嘟嘴
      } else if (kind === 'rainbow') { // 豐收捆:金黃麥捆+繩結+星光
        body('#fdf6dc', '#d8c088')
        ctx.strokeStyle = '#d8a840'; ctx.lineWidth = Math.max(2, r * 0.1); ctx.lineCap = 'round'
        for (const a of [-0.5, -0.17, 0.17, 0.5]) {
          ctx.beginPath(); ctx.moveTo(a * r * 0.7, r * 0.55); ctx.lineTo(a * r * 0.45, -r * 0.5); ctx.stroke()
        }
        ctx.lineCap = 'butt'
        ctx.strokeStyle = '#b07828'; ctx.lineWidth = Math.max(2.5, r * 0.13)
        ctx.beginPath(); ctx.moveTo(-r * 0.55, r * 0.05); ctx.lineTo(r * 0.55, r * 0.05); ctx.stroke() // 捆繩
        const tw = 0.6 + 0.4 * Math.sin(this._t * 5)
        ctx.fillStyle = \`rgba(255,220,120,\${tw})\`
        ctx.beginPath()
        for (let i = 0; i < 10; i++) {
          const ang = (i / 10) * Math.PI * 2 - Math.PI / 2
          const rr = i % 2 === 0 ? r * 0.24 : r * 0.1
          const px = Math.cos(ang) * rr, py = -r * 0.85 + Math.sin(ang) * rr
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath(); ctx.fill()
      }
      ctx.restore()
    }

    _drawIntro() {`, 'tsum-kinds')

// intro 示範三顆
g = repl(g, "this._tsum(ctx, VW * 0.32, VH * 0.63, 26, 'sheep', 0.25 * Math.abs(Math.sin(this._t * 2)))",
  "this._tsum(ctx, VW * 0.32, VH * 0.63, 26, 'wheat', 0.25 * Math.abs(Math.sin(this._t * 2)))", 'demo1')
g = repl(g, "this._tsum(ctx, VW * 0.5, VH * 0.63, 26, 'lion', 0.25 * Math.abs(Math.sin(this._t * 2 + 1)))",
  "this._tsum(ctx, VW * 0.5, VH * 0.63, 26, 'bean', 0.25 * Math.abs(Math.sin(this._t * 2 + 1)))", 'demo2')
g = repl(g, "this._tsum(ctx, VW * 0.68, VH * 0.63, 26, 'frog', 0.25 * Math.abs(Math.sin(this._t * 2 + 2)))",
  "this._tsum(ctx, VW * 0.68, VH * 0.63, 26, 'fig', 0.25 * Math.abs(Math.sin(this._t * 2 + 2)))", 'demo3')
g = repl(g, "ctx.fillText(T.ref + ' ・ 保全生命', VW / 2, VH * 0.23)",
  "ctx.fillText(T.ref + ' ・ 神預先看顧', VW / 2, VH * 0.23)", 'intro-sub')
g = repl(g, "ctx.fillText(`上船 ${this.cfg.goal} 對——一對一對,一個不少`, W / 2, H * 0.235)",
  "ctx.fillText(`存滿 ${this.cfg.goal} 倉——荒年來到,全地都有糧`, W / 2, H * 0.235)", 'win-sub')

fs.writeFileSync(P('game.js'), g)

// ── index.html ──
let h = fs.readFileSync(P('index.html'), 'utf8')
h = repl(h, '<title>挪亞方舟・動物上船</title>', '<title>約瑟七豐年存糧</title>', 'title')
h = repl(h, '<meta name="description" content="點兩隻相鄰的動物交換,排成一排 3 隻同款就一起上船!一對一對進方舟,保全生命(創世記 6-9,和合本)">',
  '<meta name="description" content="點兩個相鄰的莊稼交換,排成一排 3 個同款就收進糧倉!七豐年存糧,神預先看顧(創世記 41,和合本)">', 'desc')
h = repl(h, '<meta name="theme-color" content="#9db8d8">', '<meta name="theme-color" content="#ead9a8">', 'theme')
h = repl(h, 'background:#9db8d8', 'background:#ead9a8', 'bg')
h = repl(h, '📱 請把手機轉成橫向<br>方舟和動物們都在等你!', '📱 請把手機轉成橫向<br>糧倉和莊稼們都在等你!', 'rotate')
h = repl(h, "var k = 'ping-noahark-match3'", "var k = 'ping-josephgrain-match3'", 'ping-key')
h = repl(h, "window.__ping('noahark-match3')", "window.__ping('josephgrain-match3')", 'ping-id')
fs.writeFileSync(P('index.html'), h)

// ── sw.js / manifest ──
let s = fs.readFileSync(P('sw.js'), 'utf8')
s = repl(s, "var CACHE_NAME = 'noahark-match3-v2';", "var CACHE_NAME = 'josephgrain-match3-v1';", 'sw')
fs.writeFileSync(P('sw.js'), s)
let m = fs.readFileSync(P('manifest.webmanifest'), 'utf8')
m = m.replace('挪亞方舟・動物上船', '約瑟七豐年存糧').replace('"short_name": "方舟上船"', '"short_name": "七豐年存糧"')
m = m.replace('點兩隻相鄰的動物交換,排成一排 3 隻同款就一起上船!一對一對進方舟,保全生命(創世記 6-9,和合本)', '點兩個相鄰的莊稼交換,排成一排 3 個同款就收進糧倉!七豐年存糧,神預先看顧(創世記 41,和合本)')
m = m.replace('"background_color": "#9db8d8"', '"background_color": "#ead9a8"').replace('"theme_color": "#8a5a30"', '"theme_color": "#a07828"')
fs.writeFileSync(P('manifest.webmanifest'), m)

// ── gen-tts ──
let t = fs.readFileSync(P('scripts/gen-tts.mjs'), 'utf8')
t = replRange(t, 'const LINES = [', '];', `const LINES = [
  ['intro', '埃及遍地必來七個大豐年。'],
  ['bless', '約瑟聚歛埃及地七個豐年一切的糧食,把糧食積存在各城裡。'],
  ['win', '約瑟積蓄五穀甚多,如同海邊的沙,無法計算,因為穀不可勝數。創世記四十一章四十九節。']
];`, 'tts-lines')
fs.writeFileSync(P('scripts/gen-tts.mjs'), t)

console.log('🟢 鍛造完成:約瑟七豐年存糧')
