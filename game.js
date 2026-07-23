// 約瑟七豐年存糧(創 41:29,48-49;50:20)——「Candy 骨架 + tsum 皮」第二發(A28,fork noahark-match3):
//   swap 三消反向化(match3-swap)+ tsum 圓萌臉 + squash & stretch Q 彈。
// ⚠ 文案為 AI 依和合本草擬(引文均經 cuv MCP 逐字查證:創 41:29、41:48、41:49、50:20),牧者已核可題材。
//   與 joseph-granary/steward 糧倉關區隔:這張講「神預先看顧——七豐年存糧,保全許多人的性命」。
//
// 玩法:七個大豐年,田裡五穀豐登!點兩個相鄰的莊稼交換;排成一排 3 個同款=「收進糧倉」
//   (倉窗一格格亮起);新的莊稼源源長出來(神賜豐年=補位的經文!)。存滿目標倉數——
//   荒年來到,埃及全地都有糧!⑤瘦穗子(法老夢裡被東風吹焦的,創 41:23)偶爾飄來擋路,
//   風一吹自己就走;連 4+ 出「豐收捆」,點一下整排整列＋旁邊一圈一起入倉(豐收滿溢)。
// ★ 神學守法:①收進糧倉,絕不畫成消滅;②補位=神賜豐年;③永不會輸;④信息在「神預先看顧、
//   保全性命」(創 50:20),不做高分炫光。
(function () {
  'use strict'

  const VW = 960
  const VH = 540
  const PAIR = 2 // 每 2 隻=一對(一公一母,創 7:9)

  const AGES = {
    young: { label: '🐣 幼', desc: '6×6・第1關 30 倉', size: 6, kinds: 4, goal: 30, crow: 0 },
    kid: { label: '🙂 童', desc: '7×7・第1關 48 倉', size: 7, kinds: 5, goal: 48, crow: 2 },
    teen: { label: '🔥 青', desc: '8×8・第1關 68 倉', size: 8, kinds: 6, goal: 68, crow: 3 },
  }

  // 六款動物(tsum 圓萌臉;顏色+特徵雙重分辨,紅綠不對抗)
  const ANIMALS = ['wheat', 'barley', 'millet', 'bean', 'fig', 'date']

  // 關卡制(tsum 家族 07-22 三包同款):進度與星星依年齡檔存本機
  const SPRINT_EVERY = 3
  const SPRINT_SECS = { young: 150, kid: 130, teen: 110 }
  const LS = 'josephgrain-match3'
  const isSprint = (lv) => lv % SPRINT_EVERY === 0
  const maxLevel = (age) => { try { return Math.max(1, parseInt(localStorage.getItem(`${LS}-lvl-${age}`)) || 1) } catch { return 1 } }
  const bumpLevel = (age, lv) => { try { localStorage.setItem(`${LS}-lvl-${age}`, String(Math.max(maxLevel(age), lv))) } catch {} }
  const loadStars = (age) => { try { return JSON.parse(localStorage.getItem(`${LS}-stars-${age}`) || '{}') || {} } catch { return {} } }
  const saveStars = (age, st) => { try { localStorage.setItem(`${LS}-stars-${age}`, JSON.stringify(st)) } catch {} }
  const levelGoal = (base, lv) => Math.round(base * (1 + (lv - 1) * 0.5))

  const T = {
    title: '🌾 約瑟七豐年存糧',
    ref: '創世記 41:29,48-49',
    intro1: '「埃及遍地必來七個大豐年，」(創 41:29)',
    how: '七個大豐年,田裡五穀豐登!點一個莊稼、再點旁邊的一個交換位置;排成一排 3 個同款就「收進糧倉」,新的莊稼會源源長出來。連出 4 個以上會出現豐收捆——點一下,整排整列＋旁邊一圈一起入倉!存滿目標倉數,荒年來到全地都有糧。放心慢慢收——沒有步數限制。',
    pick: '約瑟站在倉前,等你一起收糧:',
    hud: (p, goal) => `🌾 已存 ${p}/${goal} 倉`,
    gather: '入倉!積蓄五穀',
    cascade: '田裡又長出新的了…',
    shuffle: '風把莊稼吹勻了…',
    noswap: '這樣排不成一排——輕輕放回去',
    crowCome: '瘦穗子飄來擋路了…(創 41:23)',
    crowGo: '東風一吹,瘦穗子走了',
    rainbowBorn: '豐收捆!點它,整排整列＋旁邊一圈一起入倉',
    rainbowGo: '一大批一起入倉了!',
    closeLine: '約瑟聚歛埃及地七個豐年一切的糧食，把糧食積存在各城裡。(創 41:48)',
    winTitle: '🎉 倉都滿了,荒年不怕!',
    winVerse: '約瑟積蓄五穀甚多，如同海邊的沙，無法計算，因為穀不可勝數。',
    winRef: '創世記 41:49',
    teachVerse: '從前你們的意思是要害我，但神的意思原是好的，要保全許多人的性命，成就今日的光景。',
    teachRef: '創世記 50:20',
    teach: '七個豐年不是運氣,是神預先看見、預先預備——祂把夢給法老,把智慧給約瑟,把糧食存滿倉,為要在荒年保全許多人的性命。今天神也一樣走在你前面:你還沒遇見的難處,祂已經預備好了恩典。',
    bind: '金繩捆一捆…',
    mapTitle: '🗺 關卡地圖',
    mapHint: '點亮過的關可重玩拿星星・⏱=限時衝刺關',
    sprintGo: (sec) => `⏱ 限時衝刺!${sec} 秒內收越多越好!`,
    sprintHud: (sec, p) => `⏱ ${sec} 秒・已收 ${p}`,
    review: '經文均經和合本逐句核對・牧者已審核',
  }

  const VOICES = { intro: 'voice/intro.mp3', bless: 'voice/bless.mp3', win: 'voice/win.mp3' }
  const ARK = { doorX: 812, doorY: 398 } // 飛行動物的落點(方舟門口)

  class Game {
    constructor(canvas) {
      this.cv = canvas
      this.ctx = canvas.getContext('2d')
      this.state = 'intro' // intro → play → close → win
      this.stopped = false
      this._raf = 0
      this._t = 0
      this._btns = []
      this._onDown = (e) => this._down(e)
      this._onKey = (e) => this._key(e)
      this._onResize = () => this._resize()
      this.grid = []
      this.sel = null
      this.lock = 0
      this.collected = 0
      this.flyers = [] // 上船中的動物
      this.birds = [] // 飛走中的烏鴉
      this.pops = [] // 收取瞬間的 Q 彈圈
      this.pending = null // 兩拍收取:第一拍=金繩捆好亮 0.7s
      this.shocks = [] // 💥 爆收衝擊波光環
      this.sparks = [] // 💥 爆收煙火
      this.confetti = []
      this.shakeBack = null
      this.toasts = []
      this.closeT = 0
      this.crowT = 14
      this.rainbowFxT = 0
      this.blessPlayed = false
      this.startT = 0
      this.level = 1
      this.goal = 0
      this.stars = {}
      this.sprint = false
      this.sprintT = 0
      this.lastStars = 1
      this._mapBtns = []
      this._audio = null
      this._voiceEl = null
      this.canFS = !!document.documentElement.requestFullscreen
      this.reduced = matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    boot() {
      this.cv.addEventListener('pointerdown', this._onDown)
      addEventListener('keydown', this._onKey)
      addEventListener('resize', this._onResize)
      document.addEventListener('fullscreenchange', this._onResize)
      this._resize()
      let last = performance.now()
      const loop = (now) => {
        if (this.stopped) return
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        this._t += dt
        this._update(dt)
        this._draw()
        this._raf = requestAnimationFrame(loop)
      }
      this._raf = requestAnimationFrame(loop)
    }

    destroy() {
      this.stopped = true
      cancelAnimationFrame(this._raf)
      this.cv.removeEventListener('pointerdown', this._onDown)
      removeEventListener('keydown', this._onKey)
      removeEventListener('resize', this._onResize)
      document.removeEventListener('fullscreenchange', this._onResize)
      try { this._voiceEl && this._voiceEl.pause() } catch {}
      try { this._audio && this._audio.close() } catch {}
    }

    _voice(key) {
      try {
        if (this._voiceEl) this._voiceEl.pause()
        this._voiceEl = new Audio(VOICES[key])
        this._voiceEl.volume = 1
        this._voiceEl.play().catch(() => {})
      } catch {}
    }

    _ping(suffix, t) {
      try { if (typeof window.__ping === 'function') window.__ping('josephgrain-match3' + suffix, t) } catch {}
    }

    _pool() { return ANIMALS.slice(0, this.cfg.kinds) }
    _rand() { const p = this._pool(); return p[Math.floor(Math.random() * p.length)] }
    _pairs() { return Math.floor(this.collected / PAIR) }
    _isAnimal(k) { return !!k && k !== 'rainbow' && k !== 'crow' }

    _start(age, forceLv) {
      this.age = age
      this.cfg = AGES[age]
      this.level = forceLv || maxLevel(age)
      this.stars = loadStars(age)
      this.goal = levelGoal(this.cfg.goal, this.level)
      this.sprint = isSprint(this.level)
      this.sprintT = this.sprint ? (SPRINT_SECS[age] || 120) : 0
      const n = this.cfg.size
      this.grid = []
      for (let r = 0; r < n; r++) {
        this.grid.push([])
        for (let c = 0; c < n; c++) {
          let k
          do { k = this._rand() } while (
            (c >= 2 && this.grid[r][c - 1].kind === k && this.grid[r][c - 2].kind === k) ||
            (r >= 2 && this.grid[r - 1][c].kind === k && this.grid[r - 2][c].kind === k)
          )
          this.grid[r].push({ kind: k, dy: -(n - r) * 40 - 60, sq: 0, crowLife: 0 })
        }
      }
      this.sel = null
      this.lock = 0.5
      this.collected = 0
      this.flyers = []; this.birds = []; this.pops = []; this.toasts = []; this.confetti = []; this.shocks = []; this.sparks = []; this.pending = null
      this.crowT = 14
      this.blessPlayed = false
      this.state = 'play'
      this.startT = performance.now()
      if (this.sprint) this.toasts.push({ text: T.sprintGo(SPRINT_SECS[age] || 120), t: this._t })
      if (!this._hasMove()) this._shuffle(false)
      this._voice('intro')
      this._ping('-start')
    }

    // 盤面幾何(棋盤置中偏左,右側留給方舟)
    _geo() {
      const n = this.cfg.size
      const D = Math.min(430 / n, 60)
      const bw = D * n
      return { n, D, x0: VW * 0.37 - bw / 2, y0: (VH - bw) / 2 + 12 }
    }
    _cellXY(r, c, g) { return { x: g.x0 + c * g.D + g.D / 2, y: g.y0 + r * g.D + g.D / 2 } }

    // —— 配對邏輯(掃 run 線段:同款動物 3+ 連;烏鴉/彩虹不參與)——
    _scanRuns() {
      const n = this.cfg.size
      const runs = []
      for (let r = 0; r < n; r++) {
        let c = 0
        while (c < n) {
          const k = this.grid[r][c].kind
          if (!this._isAnimal(k)) { c++; continue }
          let len = 1
          while (c + len < n && this.grid[r][c + len].kind === k) len++
          if (len >= 3) { const cells = []; for (let i = 0; i < len; i++) cells.push({ r, c: c + i }); runs.push(cells) }
          c += len
        }
      }
      for (let c = 0; c < n; c++) {
        let r = 0
        while (r < n) {
          const k = this.grid[r][c].kind
          if (!this._isAnimal(k)) { r++; continue }
          let len = 1
          while (r + len < n && this.grid[r + len][c].kind === k) len++
          if (len >= 3) { const cells = []; for (let i = 0; i < len; i++) cells.push({ r: r + i, c }); runs.push(cells) }
          r += len
        }
      }
      return runs
    }

    _hasMatch() { return this._scanRuns().length > 0 }

    _hasMove() {
      const n = this.cfg.size
      const g = this.grid
      // 場上有彩虹=永遠有一手(點它就整排整列＋旁邊一圈上船)
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (g[r][c].kind === 'rainbow') return true
      const trySwap = (r1, c1, r2, c2) => {
        const a = g[r1][c1].kind, b = g[r2][c2].kind
        if (!this._isAnimal(a) || !this._isAnimal(b)) return false
        g[r1][c1].kind = b; g[r2][c2].kind = a
        const ok = this._hasMatch()
        g[r1][c1].kind = a; g[r2][c2].kind = b
        return ok
      }
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        if (c + 1 < n && trySwap(r, c, r, c + 1)) return true
        if (r + 1 < n && trySwap(r, c, r + 1, c)) return true
      }
      return false
    }

    _shuffle(toast = true) {
      const n = this.cfg.size
      const flat = []
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) flat.push(this.grid[r][c].kind)
      let tries = 0
      do {
        for (let i = flat.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [flat[i], flat[j]] = [flat[j], flat[i]] }
        for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { this.grid[r][c].kind = flat[r * n + c]; this.grid[r][c].dy = -40 }
      } while ((this._hasMatch() || !this._hasMove()) && ++tries < 60)
      this.lock = 0.4
      if (toast) { this.toasts.push({ text: T.shuffle, t: this._t }); this._tone(320, 0.15, 0, 'sine', 0.07) }
    }

    // 重力補位:非空往下沉,頂上生新動物(從遠方走來=神招聚,創 6:20)
    _gravity() {
      const g = this._geo()
      const n = this.cfg.size
      for (let c = 0; c < n; c++) {
        let write = n - 1
        for (let r = n - 1; r >= 0; r--) {
          if (this.grid[r][c].kind) {
            if (write !== r) {
              const src = this.grid[r][c]
              const dst = this.grid[write][c]
              dst.kind = src.kind; dst.crowLife = src.crowLife
              dst.dy = -(write - r) * g.D
              src.kind = null; src.crowLife = 0
            }
            write--
          }
        }
        for (let r = write; r >= 0; r--) {
          this.grid[r][c].kind = this._rand()
          this.grid[r][c].crowLife = 0
          this.grid[r][c].dy = -(write + 1) * g.D - 60
        }
      }
    }

    // 收取所有現成 3+ 連 → 4+ 連的中位格變彩虹方塊 → 重力補位;回傳收了幾隻
    _resolve() {
      const geo = this._geo()
      if (this.pending) {
        const { hit, rainbowAt } = this.pending
        this.pending = null
        let count = 0
        for (const key of hit) {
          const [r, c] = key.split(',').map(Number)
          const p = this._cellXY(r, c, geo)
          this.flyers.push({ sx: p.x, sy: p.y, x: p.x, y: p.y, kind: this.grid[r][c].kind, t: 0 })
          this.pops.push({ x: p.x, y: p.y, t: 0 })
          this.grid[r][c].kind = null
          count++
        }
        for (const rb of rainbowAt) {
          const cell = this.grid[rb.r][rb.c]
          cell.kind = 'rainbow'; cell.sq = 0.3
          this.toasts.push({ text: T.rainbowBorn, t: this._t })
          this._tone(659, 0.12, 0, 'triangle', 0.1); this._tone(784, 0.14, 0.1, 'triangle', 0.1); this._tone(988, 0.2, 0.2, 'triangle', 0.1)
        }
        this._gravity()
        this._tone(523, 0.1, 0, 'triangle', 0.1); this._tone(659, 0.14, 0.08, 'triangle', 0.1)
        return count
      }
      const runs = this._scanRuns()
      if (!runs.length) return 0
      const hit = new Set()
      const rainbowAt = []
      for (const run of runs) {
        if (run.length >= 4) rainbowAt.push(run[Math.floor(run.length / 2)])
        for (const p of run) hit.add(p.r + ',' + p.c)
      }
      for (const rb of rainbowAt) hit.delete(rb.r + ',' + rb.c)
      this.pending = { runs, hit, rainbowAt, t: this._t }
      this.toasts.push({ text: T.bind, t: this._t })
      this._tone(392, 0.1, 0, 'sine', 0.07)
      return -1
    }

    // 點彩虹:整排整列＋旁邊一圈一起上船(恩典多給;烏鴉被嚇飛,不算數也不扣分)
    _rainbowClear(r, c) {
      const g = this._geo()
      const n = this.cfg.size
      let count = 0
      const take = (rr, cc) => {
        const cell = this.grid[rr][cc]
        if (!cell.kind) return
        const p = this._cellXY(rr, cc, g)
        if (cell.kind === 'crow') { this.birds.push({ x: p.x, y: p.y, t: 0 }); cell.kind = null; cell.crowLife = 0; return }
        if (cell.kind === 'rainbow') { this.pops.push({ x: p.x, y: p.y, t: 0 }) }
        else { this.flyers.push({ sx: p.x, sy: p.y, x: p.x, y: p.y, kind: cell.kind, t: 0 }); this.pops.push({ x: p.x, y: p.y, t: 0 }); count++ }
        cell.kind = null
      }
      for (let cc = 0; cc < n; cc++) take(r, cc)
      for (let rr = 0; rr < n; rr++) if (rr !== r) take(rr, c)
      // 💥 爆收範圍加大(07-24,連鏈家族同款精神):整排整列＋旁邊一圈之外,周圍一圈也一起收
      for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
        const rr = r + dr, cc = c + dc
        if (rr >= 0 && cc >= 0 && rr < n && cc < n) take(rr, cc)
      }
      // 💥 擴散衝擊波光環(範圍看得見)+煙火 40 顆
      const pc0 = this._cellXY(r, c, g)
      this.shocks.push({ x: pc0.x, y: pc0.y, t: 0 })
      if (!this.reduced) {
        const FW = ['#ffd54a', '#ff8a5a', '#8ae08a', '#7ab8ff', '#e08ae0']
        for (let i = 0; i < 40; i++) {
          const a = Math.random() * Math.PI * 2, v = 90 + Math.random() * 220
          this.sparks.push({ x: pc0.x, y: pc0.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, t: 0, color: FW[i % 5] })
        }
      }
      this.collected += count
      this.rainbowFxT = 1.6
      this.toasts.push({ text: T.rainbowGo, t: this._t })
      this._tone(523, 0.1, 0, 'triangle', 0.11); this._tone(659, 0.1, 0.09, 'triangle', 0.11); this._tone(784, 0.1, 0.18, 'triangle', 0.11); this._tone(1047, 0.22, 0.27, 'triangle', 0.1)
      if (!this.blessPlayed) { this.blessPlayed = true; this._voice('bless') }
      this._gravity()
      this.lock = 0.55
    }

    _update(dt) {
      if (this.state === 'close') {
        this.closeT -= dt
        if (this.closeT <= 0) this._win()
      }
      if (this.grid.length) {
        for (const row of this.grid) for (const cell of row) {
          if (cell.dy) {
            const before = cell.dy
            cell.dy += (0 - cell.dy) * Math.min(1, dt * 9)
            if (Math.abs(cell.dy) < 1) { cell.dy = 0; if (Math.abs(before) > 6) cell.sq = 0.22 } // 落地 Q 彈
          }
          if (cell.sq > 0) cell.sq = Math.max(0, cell.sq - dt)
        }
      }
      if (this.lock > 0) {
        this.lock -= dt
        if (this.lock <= 0 && this.state === 'play') {
          const got = this._resolve()
          if (got === -1) {
            this.lock = 0.7 // 第一拍:金繩捆好,亮著看清楚
          } else if (got) {
            this.collected += got
            this.toasts.push({ text: this.collected % (PAIR * 3) < 3 ? T.gather : T.cascade, t: this._t })
            this.lock = 0.8 // 連鎖放慢,享受觀察
          } else if (this._pairs() >= this.goal) {
            this.state = 'close'
            this.closeT = 2.4
            this._tone(392, 0.2, 0, 'triangle', 0.1); this._tone(523, 0.3, 0.18, 'triangle', 0.1)
          } else if (!this._hasMove()) this._shuffle()
        }
      }
      // ⏱ 衝刺關倒數:時間到=直接結算(收越多越好,不算輸)
      if (this.sprint && this.state === 'play') {
        this.sprintT -= dt
        if (this.sprintT <= 0) {
          this.sprintT = 0
          this.state = 'close'
          this.closeT = 1.6
          this._tone(392, 0.2, 0, 'triangle', 0.1); this._tone(523, 0.3, 0.18, 'triangle', 0.1)
        }
      }
      // 烏鴉:童/青檔不定時飛來,一陣子後自己飛走(創 8:7)
      if (this.state === 'play' && this.cfg && this.cfg.crow > 0) {
        this.crowT -= dt
        let crows = 0
        const n = this.cfg.size
        for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (this.grid[r][c].kind === 'crow') crows++
        if (this.crowT <= 0) {
          this.crowT = 10 + Math.random() * 5
          if (crows < this.cfg.crow && this.lock <= 0) {
            const r = Math.floor(Math.random() * n), c = Math.floor(Math.random() * n)
            const cell = this.grid[r][c]
            if (this._isAnimal(cell.kind)) {
              cell.kind = 'crow'; cell.crowLife = 12; cell.sq = 0.25
              this.toasts.push({ text: T.crowCome, t: this._t })
              this._tone(190, 0.1, 0, 'sawtooth', 0.06); this._tone(160, 0.12, 0.12, 'sawtooth', 0.06)
            }
          }
        }
        for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
          const cell = this.grid[r][c]
          if (cell.kind === 'crow') {
            cell.crowLife -= dt
            if (cell.crowLife <= 0) {
              const p = this._cellXY(r, c, this._geo())
              this.birds.push({ x: p.x, y: p.y, t: 0 })
              cell.kind = null
              this.toasts.push({ text: T.crowGo, t: this._t })
              this._gravity()
              if (this.lock <= 0) this.lock = 0.35
            }
          }
        }
      }
      if (this.shakeBack) { this.shakeBack.t -= dt; if (this.shakeBack.t <= 0) this.shakeBack = null }
      for (const f of this.flyers) {
        f.t += dt * 1.4
        const k = Math.min(1, f.t)
        const ease = k * k * (3 - 2 * k)
        f.x = f.sx + (ARK.doorX - f.sx) * ease
        f.y = f.sy + (ARK.doorY - f.sy) * ease - Math.sin(k * Math.PI) * 70
      }
      this.flyers = this.flyers.filter((f) => f.t < 1)
      for (const b of this.birds) { b.t += dt; b.x += dt * 260; b.y -= dt * 150 }
      this.birds = this.birds.filter((b) => b.t < 1.6)
      for (const p of this.pops) p.t += dt * 3
      this.pops = this.pops.filter((p) => p.t < 1)
      for (const sfx of this.shocks) sfx.t += dt * 1.8
      this.shocks = this.shocks.filter((sfx) => sfx.t < 1)
      for (const sp of this.sparks) { sp.t += dt; sp.x += sp.vx * dt; sp.y += sp.vy * dt; sp.vy += 260 * dt }
      this.sparks = this.sparks.filter((sp) => sp.t < 0.9)
      if (this.rainbowFxT > 0) this.rainbowFxT -= dt
      for (const c of this.confetti) { c.y += c.vy * dt; c.x += c.vx * dt; c.rot += c.vr * dt }
      this.confetti = this.confetti.filter((c) => c.y < VH + 20)
      this.toasts = this.toasts.filter((t) => this._t - t.t < 1.8)
    }

    _win() {
      this.state = 'win'
      // ★ 星星:衝刺關看收取量;一般關看用時
      const secsSt = Math.max(1, (performance.now() - this.startT) / 1000)
      this.lastStars = this.sprint
        ? (this._pairs() >= this.goal ? 3 : this._pairs() >= this.goal * 0.6 ? 2 : 1)
        : (secsSt <= this.goal * 4.5 ? 3 : secsSt <= this.goal * 7 ? 2 : 1)
      if ((this.stars[this.level] | 0) < this.lastStars) {
        this.stars[this.level] = this.lastStars
        saveStars(this.age, this.stars)
      }
      bumpLevel(this.age, this.level + 1)
      this._tone(523, 0.15); this._tone(659, 0.15, 0.14); this._tone(784, 0.3, 0.28)
      this._voice('win')
      this._ping('-done', Math.max(1, Math.round((performance.now() - this.startT) / 1000)))
      if (!this.reduced) {
        const COLORS = ['#e8524a', '#f0a030', '#f5d90a', '#58b368', '#4a90d9', '#9068be']
        for (let i = 0; i < 70; i++) {
          this.confetti.push({
            x: Math.random() * VW, y: -20 - Math.random() * 160,
            vx: (Math.random() - 0.5) * 60, vy: 90 + Math.random() * 120,
            rot: Math.random() * 7, vr: (Math.random() - 0.5) * 8,
            w: 7 + Math.random() * 6, h: 5 + Math.random() * 4,
            color: COLORS[i % COLORS.length],
          })
        }
      }
    }

    _key(e) {
      if (this.state === 'intro') {
        if (e.key === '1') { this.age = 'young'; this.state = 'map'; return }
        if (e.key === '2' || e.key === 'Enter') { this.age = 'kid'; this.state = 'map'; return }
        if (e.key === '3') { this.age = 'teen'; this.state = 'map'; return }
      } else if (this.state === 'map' && e.key === 'Enter') {
        return this._start(this.age, maxLevel(this.age))
      }
    }

    _pt(e) {
      const r = this.cv.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * this.W
      const py = ((e.clientY - r.top) / r.height) * this.H
      const { s, ox, oy } = this._view()
      return { x: (px - ox) / s, y: (py - oy) / s }
    }

    _down(e) {
      const { x, y } = this._pt(e)
      // 全螢幕鈕(所有狀態都吃)
      if (this.canFS && x >= VW - 46 && x <= VW - 10 && y >= 8 && y <= 44) {
        try {
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen()
        } catch {}
        return
      }
      if (this.state === 'intro') {
        for (const b of this._btns) if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) { this.age = b.key; this.state = 'map'; return }
        return
      }
      if (this.state === 'map') {
        for (const b of this._mapBtns) {
          if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
            if (b.lv === 0) { this.state = 'intro'; return }
            return this._start(this.age, b.lv)
          }
        }
        return
      }
      if (this.state === 'win') {
        // 勝利卡按鈕用原始畫布座標(卡片不吃 960×540 轉換)
        const r0 = this.cv.getBoundingClientRect()
        const rx = ((e.clientX - r0.left) / r0.width) * this.W
        const ry = ((e.clientY - r0.top) / r0.height) * this.H
        for (const b of this._winBtns || []) {
          if (rx >= b.x && rx <= b.x + b.w && ry >= b.y && ry <= b.y + b.h) {
            if (b.action === 'next') return this._start(this.age, this.level + 1)
            if (b.action === 'replay') return this._start(this.age, this.level)
            if (b.action === 'lobby') { try { location.href = 'https://hfpc-bible-games.summer09201017.workers.dev/' } catch {} return }
            this.state = 'map'; this.confetti = [] // 🗺 關卡地圖
            return
          }
        }
        return
      }
      if (this.state !== 'play' || this.lock > 0) return
      const g = this._geo()
      const c = Math.floor((x - g.x0) / g.D)
      const r = Math.floor((y - g.y0) / g.D)
      if (r < 0 || c < 0 || r >= g.n || c >= g.n) { this.sel = null; return }
      const cell = this.grid[r][c]
      if (cell.kind === 'rainbow') { this.sel = null; return this._rainbowClear(r, c) }
      if (cell.kind === 'crow') {
        this.shakeBack = { a: { r, c }, b: { r, c }, t: 0.3 }
        this.toasts.push({ text: T.crowCome, t: this._t })
        this._tone(190, 0.08, 0, 'sawtooth', 0.05)
        this.sel = null
        return
      }
      if (!this.sel) { this.sel = { r, c }; cell.sq = 0.2; this._tone(500, 0.05, 0, 'sine', 0.05); return }
      const { r: r0, c: c0 } = this.sel
      if (r0 === r && c0 === c) { this.sel = null; return }
      const adjacent = Math.abs(r0 - r) + Math.abs(c0 - c) === 1
      if (!adjacent) { this.sel = { r, c }; cell.sq = 0.2; this._tone(500, 0.05, 0, 'sine', 0.05); return }
      const a = this.grid[r0][c0], b = this.grid[r][c]
      ;[a.kind, b.kind] = [b.kind, a.kind]
      if (this._hasMatch()) {
        this.sel = null
        a.sq = 0.22; b.sq = 0.22
        this.lock = 0.05
        this._tone(440, 0.06, 0, 'sine', 0.07)
      } else {
        ;[a.kind, b.kind] = [b.kind, a.kind]
        this.shakeBack = { a: { r: r0, c: c0 }, b: { r, c }, t: 0.35 }
        this.toasts.push({ text: T.noswap, t: this._t })
        this.sel = null
        this._tone(220, 0.1, 0, 'sine', 0.06)
      }
    }

    _tone(freq, dur, delay = 0, type = 'triangle', vol = 0.14) {
      try {
        if (!this._audio) this._audio = new (window.AudioContext || window.webkitAudioContext)()
        const ctx = this._audio
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = type; o.frequency.value = freq
        g.gain.setValueAtTime(0.0001, ctx.currentTime + delay)
        g.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + delay + 0.015)
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur)
        o.connect(g).connect(ctx.destination)
        o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + dur + 0.03)
      } catch {}
    }

    _resize() {
      const s = Math.min(devicePixelRatio || 1, 2)
      this.cv.width = Math.round(innerWidth * s)
      this.cv.height = Math.round(innerHeight * s)
      this.cv.style.width = innerWidth + 'px'
      this.cv.style.height = innerHeight + 'px'
      this.W = this.cv.width; this.H = this.cv.height
    }

    _view() {
      const s = Math.min(this.W / VW, this.H / VH)
      return { s, ox: (this.W - VW * s) / 2, oy: (this.H - VH * s) / 2 }
    }

    // ══════════════════ 繪圖 ══════════════════

    _draw() {
      const { ctx, W, H } = this
      if (!W) return
      // 豐年的天空:藍天 → 綠草地 → 金黃麥田(07-24 使用者點名:要有綠草地與金黃稻穗色)
      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#bcd6ec'); sky.addColorStop(0.48, '#dcebc8'); sky.addColorStop(0.62, '#a8cc7e'); sky.addColorStop(0.78, '#e2c878'); sky.addColorStop(1, '#d0a84e')
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)
      const { s, ox, oy } = this._view()
      ctx.save()
      ctx.setTransform(s, 0, 0, s, ox, oy)
      this._clouds()
      this._wheatField()
      if (this.state === 'intro') { this._drawIntro(); this._fsBtn(); ctx.restore(); return }
      if (this.state === 'map') { this._drawMap(); this._fsBtn(); ctx.restore(); return }
      const g = this._geo()
      // 草地盤面底
      ctx.fillStyle = 'rgba(150,120,60,0.28)'
      rR(ctx, g.x0 - 10, g.y0 - 10, g.D * g.n + 20, g.D * g.n + 20, 16); ctx.fill()
      ctx.strokeStyle = 'rgba(120,95,45,0.22)'; ctx.lineWidth = 1
      for (let i = 1; i < g.n; i++) {
        ctx.beginPath(); ctx.moveTo(g.x0 + i * g.D, g.y0); ctx.lineTo(g.x0 + i * g.D, g.y0 + g.n * g.D); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(g.x0, g.y0 + i * g.D); ctx.lineTo(g.x0 + g.n * g.D, g.y0 + i * g.D); ctx.stroke()
      }
      // 方舟(先畫,動物飛過去落在它前面)
      this._ark()
      // 動物們
      for (let r = 0; r < g.n; r++) for (let c = 0; c < g.n; c++) {
        const cell = this.grid[r][c]
        if (!cell.kind) continue
        const p = this._cellXY(r, c, g)
        let dx = 0
        if (this.shakeBack) {
          const sb = this.shakeBack
          if ((sb.a.r === r && sb.a.c === c) || (sb.b.r === r && sb.b.c === c)) dx = Math.sin(this._t * 40) * 3
        }
        const selHere = this.sel && this.sel.r === r && this.sel.c === c
        if (selHere) {
          ctx.strokeStyle = '#f0b030'; ctx.lineWidth = 3
          rR(ctx, g.x0 + c * g.D + 3, g.y0 + r * g.D + 3, g.D - 6, g.D - 6, 12); ctx.stroke()
        }
        this._tsum(ctx, p.x + dx, p.y + cell.dy, g.D * 0.4, cell.kind, cell.sq, selHere)
      }
      // 🪢 金繩捆帶:pending 的每條排,金繩把頭尾綁起來+中點繩結+格子亮(先看清楚是一排,再收)
      if (this.pending) {
        const blink = 0.55 + 0.45 * Math.sin((this._t - this.pending.t) * 10)
        for (const run of this.pending.runs) {
          const a = this._cellXY(run[0].r, run[0].c, g)
          const b = this._cellXY(run[run.length - 1].r, run[run.length - 1].c, g)
          ctx.globalAlpha = blink
          for (const p0 of run) {
            const p = this._cellXY(p0.r, p0.c, g)
            ctx.fillStyle = 'rgba(255,225,130,0.35)'
            ctx.beginPath(); ctx.arc(p.x, p.y + this.grid[p0.r][p0.c].dy, g.D * 0.46, 0, 7); ctx.fill()
          }
          ctx.strokeStyle = '#d8a840'; ctx.lineWidth = 5; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          ctx.lineCap = 'butt'
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
          ctx.fillStyle = '#b07828'
          ctx.beginPath(); ctx.arc(mx, my, 7, 0, 7); ctx.fill()
          ctx.strokeStyle = '#b07828'; ctx.lineWidth = 3
          ctx.beginPath(); ctx.moveTo(mx - 8, my + 8); ctx.lineTo(mx + 8, my - 8); ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
      // Q 彈圈(收取瞬間)
      for (const p of this.pops) {
        ctx.globalAlpha = 1 - p.t
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3
        ctx.beginPath(); ctx.arc(p.x, p.y, 10 + p.t * 26, 0, 7); ctx.stroke()
        ctx.globalAlpha = 1
      }
      // 💥 爆收衝擊波光環(雙圈擴散)+煙火
      for (const sfx of this.shocks) {
        const k = sfx.t
        ctx.globalAlpha = (1 - k) * 0.9
        ctx.strokeStyle = '#ffd54a'; ctx.lineWidth = 6 * (1 - k) + 2
        ctx.beginPath(); ctx.arc(sfx.x, sfx.y, 24 + k * 300, 0, 7); ctx.stroke()
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3
        ctx.beginPath(); ctx.arc(sfx.x, sfx.y, 12 + k * 210, 0, 7); ctx.stroke()
        ctx.globalAlpha = 1
      }
      for (const sp of this.sparks) {
        ctx.globalAlpha = Math.max(0, 1 - sp.t / 0.9)
        ctx.fillStyle = sp.color
        ctx.beginPath(); ctx.arc(sp.x, sp.y, 3.2, 0, 7); ctx.fill()
        ctx.globalAlpha = 1
      }
      // 上船中的動物(飛行途中縮小一點)
      for (const f of this.flyers) this._tsum(ctx, f.x, f.y, 17 * (1 - f.t * 0.25), f.kind, 0.1)
      // 飛走的烏鴉
      for (const b of this.birds) {
        ctx.globalAlpha = Math.max(0, 1 - b.t / 1.6)
        this._tsum(ctx, b.x, b.y, 15, 'crow', 0)
        ctx.globalAlpha = 1
      }
      // 彩虹特效(用彩虹方塊時,方舟上空掛一道虹)
      if (this.rainbowFxT > 0) this._rainbowArc(Math.min(1, this.rainbowFxT / 0.4))
      // 漂浮字
      for (const t of this.toasts) {
        const k = (this._t - t.t) / 1.8
        ctx.globalAlpha = 1 - k
        ctx.fillStyle = '#2c3c1c'; ctx.strokeStyle = 'rgba(255,255,250,0.92)'; ctx.lineWidth = 4
        ctx.font = 'bold 19px "Noto Sans TC","Microsoft JhengHei",sans-serif'
        ctx.textAlign = 'center'
        ctx.strokeText(t.text, VW * 0.37, 40 - k * 14)
        ctx.fillText(t.text, VW * 0.37, 40 - k * 14)
        ctx.globalAlpha = 1
      }
      // 關門句
      if (this.state === 'close' || this.state === 'win') {
        ctx.fillStyle = '#2c3c1c'
        ctx.font = 'bold 20px "Noto Sans TC","Microsoft JhengHei",sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(T.closeLine, VW / 2, VH - 26)
      }
      // HUD
      ctx.fillStyle = 'rgba(44,60,28,0.62)'
      rR(ctx, VW * 0.16, VH - 44, VW * 0.44, 30, 12); ctx.fill()
      ctx.fillStyle = '#f4f8e8'
      ctx.font = 'bold 15px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(
        this.sprint
          ? `第 ${this.level} 關 ${T.sprintHud(Math.ceil(this.sprintT), this._pairs())} ・ 點兩隻相鄰的交換`
          : `第 ${this.level} 關 ${T.hud(this._pairs(), this.goal)} ・ 點兩隻相鄰的交換`,
        VW * 0.38, VH - 24)
      this._fsBtn()
      // 彩帶
      for (const c of this.confetti) {
        ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot)
        ctx.fillStyle = c.color; ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h)
        ctx.restore()
      }
      ctx.restore()
      if (this.state === 'win') this._drawWinCard()
    }

    // 🌾 金黃麥穗(豐年:底部麥稈叢隨風搖,左右各一簇;創 41:47 豐年五穀茂盛)
    _wheatField() {
      const { ctx } = this
      for (const [bx, count] of [[30, 4], [925, 4]]) {
        for (let i = 0; i < count; i++) {
          const rx = bx + i * 12
          const sway = Math.sin(this._t * 1.3 + rx) * 4
          ctx.strokeStyle = '#c8a24a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(rx, 540); ctx.quadraticCurveTo(rx + 4 + sway, 496, rx + 2 + sway, 462); ctx.stroke()
          ctx.lineCap = 'butt'
          // 穗粒(兩排小橢圓)
          ctx.fillStyle = '#e8c868'
          for (let g2 = 0; g2 < 4; g2++) {
            const gy = 462 + g2 * 9
            ctx.beginPath(); ctx.ellipse(rx - 2.5 + sway, gy, 3, 5.5, -0.4, 0, 7); ctx.fill()
            ctx.beginPath(); ctx.ellipse(rx + 6.5 + sway, gy, 3, 5.5, 0.4, 0, 7); ctx.fill()
          }
        }
      }
    }

    _clouds() {
      const { ctx } = this
      ctx.fillStyle = 'rgba(255,255,255,0.75)'
      const drift = (this._t * 6) % (VW + 300) - 150
      for (const [bx, by, sc] of [[120, 56, 1], [430, 34, 0.8], [700, 66, 1.15]]) {
        const x = ((bx + drift * sc * 0.4) % (VW + 200) + VW + 200) % (VW + 200) - 100
        ctx.beginPath()
        ctx.arc(x, by, 22 * sc, 0, 7); ctx.arc(x + 24 * sc, by - 8 * sc, 17 * sc, 0, 7); ctx.arc(x + 46 * sc, by, 20 * sc, 0, 7)
        ctx.fill()
      }
    }

    _fsBtn() {
      if (!this.canFS) return
      const { ctx } = this
      ctx.fillStyle = 'rgba(44,60,28,0.5)'
      rR(ctx, VW - 44, 10, 32, 32, 8); ctx.fill()
      ctx.strokeStyle = '#f4f8e8'; ctx.lineWidth = 2.5
      const x = VW - 44, y = 10
      for (const [mx, my, lx, ly] of [[8, 13, 8, 8], [13, 8, 8, 8], [24, 8, 24, 8], [24, 8, 24, 13], [8, 19, 8, 24], [8, 24, 13, 24], [19, 24, 24, 24], [24, 24, 24, 19]]) {
        ctx.beginPath(); ctx.moveTo(x + mx, y + my); ctx.lineTo(x + lx, y + ly); ctx.stroke()
      }
    }

    // 糧倉:右側大倉,倉窗=進度(每滿一倉亮一格)
    _ark() {
      const { ctx } = this
      const goal = this.goal
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
      const cols = goal > 120 ? 9 : goal > 90 ? 8 : goal > 64 ? 7 : goal > 48 ? 6 : goal > 36 ? 5 : goal > 24 ? 4 : goal > 16 ? 3 : 2
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

    _rainbowArc(alpha) {
      const { ctx } = this
      const COLORS = ['#ffe9a0', '#ffd77a', '#f0b850', '#d89830', '#c08020', '#a87018']
      ctx.save()
      ctx.globalAlpha = 0.75 * alpha
      ctx.lineWidth = 7
      COLORS.forEach((col, i) => {
        ctx.strokeStyle = col
        ctx.beginPath()
        ctx.arc(852, 330, 210 - i * 8, Math.PI * 1.05, Math.PI * 1.72)
        ctx.stroke()
      })
      ctx.restore()
    }

    // ══════ tsum 圓萌動物(可愛的 80% 在動畫:squash & stretch)══════
    _tsum(ctx, x, y, r, kind, sq = 0, glow = false) {
      const k = Math.max(0, sq)
      const wob = Math.sin((k / 0.25) * Math.PI)
      const sx = 1 + wob * 0.22, sy = 1 - wob * 0.22
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(sx, sy)
      if (glow) {
        ctx.fillStyle = 'rgba(255,240,180,0.4)'
        ctx.beginPath(); ctx.arc(0, 0, r * 1.35, 0, 7); ctx.fill()
      }
      // ★ 07-24 立體化:地面軟影+徑向漸層球體+頂光弧(家族美術範式 v2)
      const body = (color, line) => {
        ctx.fillStyle = 'rgba(40,50,25,0.18)'
        ctx.beginPath(); ctx.ellipse(0, r * 0.92, r * 0.78, r * 0.22, 0, 0, 7); ctx.fill()
        const grd = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r * 1.12)
        grd.addColorStop(0, tint(color, 0.45))
        grd.addColorStop(0.55, color)
        grd.addColorStop(1, shadeHex(color, 0.22))
        ctx.fillStyle = grd
        ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill()
        ctx.strokeStyle = line; ctx.lineWidth = Math.max(1.5, r * 0.07)
        ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke()
        ctx.strokeStyle = 'rgba(255,255,255,0.55)'
        ctx.lineWidth = Math.max(1.5, r * 0.09); ctx.lineCap = 'round'
        ctx.beginPath(); ctx.arc(0, 0, r * 0.78, Math.PI * 1.12, Math.PI * 1.48); ctx.stroke()
        ctx.lineCap = 'butt'
      }
      const face = (fy = 0) => {
        // ★ 07-24 v3:大眼睛+眨眼(依位置錯開,絕不全場同步;reduced-motion 不眨)+興奮 D 型嘴
        const er = r * 0.18
        const blink = !this.reduced && ((this._t + x * 7.13 + y * 3.71) % 4.6) < 0.12
        if (blink) {
          ctx.strokeStyle = '#2c2416'; ctx.lineWidth = Math.max(1.6, r * 0.07); ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(-r * 0.44, fy - r * 0.08); ctx.lineTo(-r * 0.16, fy - r * 0.08); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(r * 0.2, fy - r * 0.08); ctx.lineTo(r * 0.48, fy - r * 0.08); ctx.stroke()
          ctx.lineCap = 'butt'
        } else {
          ctx.fillStyle = '#fff'
          ctx.beginPath(); ctx.arc(-r * 0.32, fy - r * 0.1, er * 1.45, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(r * 0.32, fy - r * 0.1, er * 1.45, 0, 7); ctx.fill()
          ctx.fillStyle = '#2c2416'
          ctx.beginPath(); ctx.arc(-r * 0.3, fy - r * 0.08, er, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(r * 0.34, fy - r * 0.08, er, 0, 7); ctx.fill()
          ctx.fillStyle = '#fff'
          ctx.beginPath(); ctx.arc(-r * 0.35, fy - r * 0.15, er * 0.42, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(r * 0.29, fy - r * 0.15, er * 0.42, 0, 7); ctx.fill()
          ctx.fillStyle = 'rgba(255,255,255,0.7)'
          ctx.beginPath(); ctx.arc(-r * 0.25, fy - r * 0.02, er * 0.2, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(r * 0.39, fy - r * 0.02, er * 0.2, 0, 7); ctx.fill()
        }
        const bl = ctx.createRadialGradient(-r * 0.54, fy + r * 0.22, 0, -r * 0.54, fy + r * 0.22, er * 1.25)
        bl.addColorStop(0, 'rgba(245,130,130,0.5)'); bl.addColorStop(1, 'rgba(245,130,130,0)')
        ctx.fillStyle = bl
        ctx.beginPath(); ctx.arc(-r * 0.54, fy + r * 0.22, er * 1.25, 0, 7); ctx.fill()
        const br = ctx.createRadialGradient(r * 0.54, fy + r * 0.22, 0, r * 0.54, fy + r * 0.22, er * 1.25)
        br.addColorStop(0, 'rgba(245,130,130,0.5)'); br.addColorStop(1, 'rgba(245,130,130,0)')
        ctx.fillStyle = br
        ctx.beginPath(); ctx.arc(r * 0.54, fy + r * 0.22, er * 1.25, 0, 7); ctx.fill()
        if (k > 0.05) { // 興奮(收取/落地 Q 彈)=開心 D 型嘴+小舌頭
          ctx.fillStyle = '#4a3420'
          ctx.beginPath(); ctx.arc(0, fy + r * 0.14, r * 0.2, 0, Math.PI); ctx.closePath(); ctx.fill()
          ctx.fillStyle = '#e89090'
          ctx.beginPath(); ctx.arc(0, fy + r * 0.3, r * 0.11, Math.PI, 0); ctx.fill()
        } else { // 平時=加深加寬的微笑
          ctx.strokeStyle = '#4a3420'; ctx.lineWidth = Math.max(1.6, r * 0.065); ctx.lineCap = 'round'
          ctx.beginPath(); ctx.arc(0, fy + r * 0.08, r * 0.26, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke()
          ctx.lineCap = 'butt'
        }
      }
      if (kind === 'wheat') { // 金麥穗:頂上三根麥芒+麥粒
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
        ctx.fillStyle = `rgba(255,220,120,${tw})`
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

    _drawIntro() {
      const { ctx } = this
      ctx.fillStyle = 'rgba(252,250,240,0.95)'
      ctx.strokeStyle = '#9a8450'; ctx.lineWidth = 3
      rR(ctx, VW * 0.08, VH * 0.05, VW * 0.84, VH * 0.9, 18); ctx.fill(); ctx.stroke()
      ctx.textAlign = 'center'
      ctx.fillStyle = '#4a3c16'
      ctx.font = 'bold 34px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(T.title, VW / 2, VH * 0.16)
      ctx.fillStyle = '#8a7a4a'
      ctx.font = '16px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(T.ref + ' ・ 神預先看顧', VW / 2, VH * 0.23)
      ctx.fillStyle = '#3e3418'
      wrap(ctx, T.intro1, VW / 2, VH * 0.3, VW * 0.7, 23)
      wrap(ctx, T.how, VW / 2, VH * 0.42, VW * 0.7, 22)
      // 三隻示範動物(tsum 皮開門見山)
      this._tsum(ctx, VW * 0.32, VH * 0.63, 26, 'wheat', 0.25 * Math.abs(Math.sin(this._t * 2)))
      this._tsum(ctx, VW * 0.5, VH * 0.63, 26, 'bean', 0.25 * Math.abs(Math.sin(this._t * 2 + 1)))
      this._tsum(ctx, VW * 0.68, VH * 0.63, 26, 'fig', 0.25 * Math.abs(Math.sin(this._t * 2 + 2)))
      ctx.fillStyle = '#8a7a4a'
      ctx.font = '16px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(T.pick, VW / 2, VH * 0.72)
      this._btns = []
      const bw = VW * 0.2, bh = VH * 0.12, gap = VW * 0.04
      const x0 = VW / 2 - bw * 1.5 - gap
      Object.entries(AGES).forEach(([key, a], i) => {
        const x = x0 + i * (bw + gap), y = VH * 0.76
        ctx.fillStyle = '#bcd88a'
        rR(ctx, x, y, bw, bh, 14); ctx.fill()
        ctx.fillStyle = '#2c3608'
        ctx.font = 'bold 20px "Noto Sans TC","Microsoft JhengHei",sans-serif'
        ctx.fillText(a.label, x + bw / 2, y + bh * 0.42)
        ctx.font = '12px "Noto Sans TC","Microsoft JhengHei",sans-serif'
        ctx.fillText(a.desc, x + bw / 2, y + bh * 0.78)
        this._btns.push({ x, y, w: bw, h: bh, key })
      })
      ctx.fillStyle = '#a89868'
      ctx.font = '11px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(T.review, VW / 2, VH * 0.95)
    }

    // 🗺 關卡地圖(tsum 三包移植,橫版蛇行 12 節點+星星+🔒+⏱;點過的關可重玩拿星)
    _drawMap() {
      const { ctx } = this
      const a = AGES[this.age] || AGES.kid
      const maxLv = maxLevel(this.age)
      this.stars = loadStars(this.age)
      ctx.fillStyle = 'rgba(252,250,240,0.95)'
      ctx.strokeStyle = '#9a8450'; ctx.lineWidth = 3
      rR(ctx, VW * 0.06, VH * 0.04, VW * 0.88, VH * 0.92, 18); ctx.fill(); ctx.stroke()
      ctx.textAlign = 'center'
      ctx.fillStyle = '#4a3c16'
      ctx.font = 'bold 26px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(T.mapTitle, VW / 2, VH * 0.13)
      ctx.fillStyle = '#8a7a4a'
      ctx.font = '15px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(`${a.label}・已走到第 ${maxLv} 關 ・ ${T.mapHint}`, VW / 2, VH * 0.2)
      this._mapBtns = []
      const start = Math.max(1, maxLv - 7)
      const COLS = 4
      for (let i = 0; i < 12; i++) {
        const lv = start + i, row = Math.floor(i / COLS)
        let col = i % COLS
        if (row % 2 === 1) col = COLS - 1 - col
        const nx = VW * 0.2 + col * VW * 0.2, ny = VH * 0.33 + row * VH * 0.19
        if (i > 0) {
          const pr = Math.floor((i - 1) / COLS)
          let pc = (i - 1) % COLS
          if (pr % 2 === 1) pc = COLS - 1 - pc
          ctx.strokeStyle = 'rgba(154,132,80,0.3)'; ctx.lineWidth = 8; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(VW * 0.2 + pc * VW * 0.2, VH * 0.33 + pr * VH * 0.19); ctx.lineTo(nx, ny); ctx.stroke()
          ctx.lineCap = 'butt'
        }
        const unlocked = lv <= maxLv, cur = lv === maxLv, sp = isSprint(lv), st = this.stars[lv] | 0
        ctx.fillStyle = !unlocked ? 'rgba(90,80,50,0.16)' : sp ? '#c9662a' : '#6a9440'
        ctx.beginPath(); ctx.arc(nx, ny, 30, 0, 7); ctx.fill()
        if (cur) {
          ctx.strokeStyle = '#e8a020'; ctx.lineWidth = 4 + 1.5 * Math.sin(this._t * 5)
          ctx.beginPath(); ctx.arc(nx, ny, 36, 0, 7); ctx.stroke()
        }
        ctx.fillStyle = unlocked ? '#fff' : 'rgba(90,80,50,0.55)'
        ctx.font = 'bold 20px "Noto Sans TC","Microsoft JhengHei",sans-serif'
        ctx.fillText(unlocked ? String(lv) : '🔒', nx, ny + 7)
        if (sp) { ctx.font = '13px sans-serif'; ctx.fillText('⏱', nx, ny - 12) }
        if (unlocked) {
          ctx.fillStyle = '#e8a020'; ctx.font = '14px sans-serif'
          ctx.fillText(st ? '★★★'.slice(0, st) : (cur ? '▶' : ''), nx, ny + 48)
          this._mapBtns.push({ x: nx - 34, y: ny - 34, w: 68, h: 68, lv })
        }
      }
      const bw = VW * 0.26, bh = VH * 0.09, by = VH * 0.86
      ctx.fillStyle = '#f0d080'; ctx.strokeStyle = '#7a9450'; ctx.lineWidth = 2
      rR(ctx, VW / 2 - bw - 12, by, bw, bh, 12); ctx.fill(); ctx.stroke()
      ctx.fillStyle = '#4a3608'
      ctx.font = 'bold 18px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText(`▶ 繼續:第 ${maxLv} 關${isSprint(maxLv) ? '(⏱限時)' : ''}`, VW / 2 - bw / 2 - 12, by + bh * 0.64)
      this._mapBtns.push({ x: VW / 2 - bw - 12, y: by, w: bw, h: bh, lv: maxLv })
      ctx.fillStyle = '#bcd88a'
      rR(ctx, VW / 2 + 12, by, bw, bh, 12); ctx.fill(); ctx.stroke()
      ctx.fillStyle = '#2c3608'
      ctx.fillText('← 換年齡檔', VW / 2 + 12 + bw / 2, by + bh * 0.64)
      this._mapBtns.push({ x: VW / 2 + 12, y: by, w: bw, h: bh, lv: 0 })
    }

    _drawWinCard() {
      const { ctx, W, H } = this
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      const x = W * 0.1, y = H * 0.07, w = W * 0.8, h = H * 0.86
      ctx.fillStyle = '#fcf9ee'
      ctx.strokeStyle = '#9a8450'; ctx.lineWidth = 3
      rR(ctx, x, y, w, h, 18); ctx.fill(); ctx.stroke()
      // 卡上小虹
      const COLORS = ['#ffe9a0', '#ffd77a', '#f0b850', '#d89830', '#c08020', '#a87018']
      ctx.lineWidth = Math.max(3, H * 0.008)
      COLORS.forEach((col, i) => {
        ctx.strokeStyle = col
        ctx.beginPath(); ctx.arc(W / 2, H * 0.3, H * (0.17 - i * 0.014), Math.PI * 1.1, Math.PI * 1.9); ctx.stroke()
      })
      ctx.textAlign = 'center'
      ctx.fillStyle = '#4a3c16'
      ctx.font = `bold ${Math.max(20, H * 0.055)}px "Noto Sans TC","Microsoft JhengHei",sans-serif`
      ctx.fillText(T.winTitle, W / 2, H * 0.16)
      ctx.fillStyle = '#e8a020'
      ctx.font = `${Math.max(18, H * 0.05)}px "Noto Sans TC","Microsoft JhengHei",sans-serif`
      ctx.fillText('★★★'.slice(0, this.lastStars) + '☆☆☆'.slice(0, 3 - this.lastStars), W / 2, H * 0.295)
      ctx.fillStyle = '#8a7a4a'
      ctx.font = `${Math.max(12, H * 0.03)}px "Noto Sans TC","Microsoft JhengHei",sans-serif`
      ctx.fillText(`存滿 ${this.goal} 倉——荒年來到,全地都有糧`, W / 2, H * 0.235)
      ctx.fillStyle = '#3e3418'
      wrap(ctx, `「${T.winVerse}」(${T.winRef})`, W / 2, H * 0.36, W * 0.68, H * 0.045)
      ctx.fillStyle = '#5a4a90'
      wrap(ctx, `「${T.teachVerse}」(${T.teachRef})`, W / 2, H * 0.5, W * 0.68, H * 0.041)
      ctx.fillStyle = '#3e3418'
      wrap(ctx, T.teach, W / 2, H * 0.59, W * 0.68, H * 0.04)
      // 再玩一次 / 選難度
      this._winBtns = []
      const nextGoal = levelGoal(this.cfg.goal, this.level + 1)
      const nextLabel = isSprint(this.level + 1) ? '⏱ 下一關(限時)' : `⭐ 下一關(目標 ${nextGoal})`
      const bw = W * 0.185, bh = H * 0.085, by = y + h - bh - H * 0.03, gap = W * 0.012
      const defs = [
        { label: nextLabel, action: 'next' },
        { label: '🗺 關卡地圖', action: 'map' },
        { label: '🔁 再玩一次', action: 'replay' },
        { label: '← 回大廳', action: 'lobby' },
      ]
      const x0 = W / 2 - (bw * 2 + gap * 1.5)
      defs.forEach((d, i) => {
        const bx = x0 + i * (bw + gap)
        ctx.fillStyle = i === 0 ? '#f0d080' : '#bcd88a'
        ctx.strokeStyle = '#7a9450'; ctx.lineWidth = 2
        rR(ctx, bx, by, bw, bh, 12); ctx.fill(); ctx.stroke()
        ctx.fillStyle = '#2c3608'
        ctx.font = `bold ${Math.max(12, H * 0.028)}px "Noto Sans TC","Microsoft JhengHei",sans-serif`
        ctx.fillText(d.label, bx + bw / 2, by + bh * 0.62)
        this._winBtns.push({ x: bx, y: by, w: bw, h: bh, action: d.action })
      })
      ctx.restore()
    }
  }

  function rR(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h) }
  function hexRGB(hex) {
    const h = hex.replace('#', '')
    const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
  }
  function tint(hex, k) { try { const [r2, g2, b2] = hexRGB(hex); return `rgb(${Math.round(r2 + (255 - r2) * k)},${Math.round(g2 + (255 - g2) * k)},${Math.round(b2 + (255 - b2) * k)})` } catch { return hex } }
  function shadeHex(hex, k) { try { const [r2, g2, b2] = hexRGB(hex); return `rgb(${Math.round(r2 * (1 - k))},${Math.round(g2 * (1 - k))},${Math.round(b2 * (1 - k))})` } catch { return hex } }
  function wrap(ctx, text, cx, y, maxW, lineH) {
    ctx.font = `${lineH * 0.72}px "Noto Sans TC","Microsoft JhengHei",sans-serif`
    let line = '', yy = y
    for (const ch of String(text)) {
      if (ctx.measureText(line + ch).width > maxW) { ctx.fillText(line, cx, yy); line = ch; yy += lineH }
      else line += ch
    }
    if (line) ctx.fillText(line, cx, yy)
  }

  const game = new Game(document.getElementById('cv'))
  game.boot()
  // Playwright / 無頭驗證掛勾
  window.__game = game
  window.__m3 = {
    start: (age, lv) => game._start(age || 'kid', lv || 1),
    gotoLevel: (lv) => game._start(game.age || 'kid', lv),
    state: () => ({
      state: game.state,
      collected: game.collected,
      pairs: game._pairs(),
      goal: game.goal,
      level: game.level,
      sprint: game.sprint,
      sprintT: Math.round(game.sprintT),
      stars: game.lastStars,
      hasMove: game.state === 'play' ? game._hasMove() : null,
    }),
  }
})()
