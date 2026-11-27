// CRUX — the illustrated climbing wall and every move animation.
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const W = 360, H = 320, BASE = 266, TOP = 60, CX = 186;
  const ROCK = { Granite: "#bfb8ab", Limestone: "#e3cfaa", Sandstone: "#d6834e", Quartzite: "#d2ccbe", Tuff: "#bd7a54", Dolomite: "#e9dacb" };
  const CLIFF = [[14, 330], [32, 282], [22, 240], [44, 198], [38, 160], [62, 124], [88, 98], [116, 74], [144, 54], [166, 40], [184, 26],
    [200, 36], [226, 44], [254, 62], [278, 88], [298, 122], [292, 160], [316, 200], [322, 244], [342, 290], [350, 330]];
  const CLIFF_D = "M" + CLIFF.map((p) => p.join(" ")).join(" L") + " Z";
  const HOLD_M = [100, 200, 300, 400];

  const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, t) => {
    const A = hex2rgb(a), B = hex2rgb(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function el(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) {
      if (k === "html") e.innerHTML = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(e);
    return e;
  }
  function seeded(seed) {
    let s = seed >>> 0;
    return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // Run a Web Animation, then leave the element in its final state.
  async function run(node, frames, opts, final) {
    const a = node.animate(frames, { fill: "forwards", ...opts });
    try { await a.finished; } catch {}
    if (final !== undefined) node.style.transform = final;
    a.cancel();
  }

  const CLIMBER = `
    <g class="cl-body">
      <path d="M-4 26 L-12 33 L-9.5 41" class="cl-pants"/>
      <path d="M-4 26 L5 34 L8.5 40" class="cl-pants"/>
      <ellipse cx="-9.5" cy="42.3" rx="3.2" ry="1.9" class="cl-shoe"/>
      <ellipse cx="9.4" cy="41.3" rx="3.2" ry="1.9" class="cl-shoe"/>
      <path d="M-8.5 13 L-16 16 L-19 9" class="cl-arm"/>
      <path d="M-0.5 13 L0 1" class="cl-arm"/>
      <line x1="-4" y1="12" x2="-4" y2="24" class="cl-shirt"/>
      <rect x="-8.6" y="23.2" width="9.2" height="3.6" rx="1.6" class="cl-harness"/>
      <circle cx="-4.2" cy="30" r="2.3" class="cl-chalk"/>
      <circle cx="0" cy="0.5" r="2" class="cl-skin"/>
      <circle cx="-19" cy="8.5" r="2" class="cl-skin"/>
      <circle cx="-4" cy="6" r="5" class="cl-skin"/>
      <path d="M-9.6 6.6 A5.6 5.6 0 0 1 1.6 6.6 L1.6 7.6 L-9.6 7.6 Z" class="cl-helmet"/>
    </g>`;

  const Scene = {
    init({ svg, wrap, stamp, crag, maxM, seed }) {
      Object.assign(this, { svg, wrap, stampEl: stamp, crag, maxM, seed });
      this.build();
      matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => { this.build(); this.redraw(); });
    },

    yFor(m) { return BASE - (m / this.maxM) * (BASE - TOP); },
    marks() { return [1, 2, 3].map((k) => Math.round((k * this.maxM) / 400) * 100); }, // altitude lines at ¼, ½, ¾
    start() { return { x: CX - 6, y: BASE, tier: -1, hit: false }; },

    // Where each move lands on the wall (same every time for the same route).
    points(answers) {
      const r = seeded(this.seed * 31 + 7);
      let m = 0, cur = this.start(), side = r() < 0.5 ? -1 : 1;
      return answers.map((a) => {
        const jitter = r(), rot = (r() - 0.5) * 50;
        if (a.tier >= 0) {
          m += HOLD_M[a.tier];
          side = -side;
          const off = (16 + jitter * 36) * (1 - 0.42 * (m / this.maxM));
          cur = { x: CX + side * off, y: this.yFor(m) };
          return { ...cur, tier: a.tier, hit: true, rot, m };
        }
        return { ...cur, tier: -1, hit: false, rot, m, timeout: !!a.timeout };
      });
    },

    // ---------- the painting ----------
    build() {
      const svg = this.svg, crag = this.crag;
      const dark = (this.dark = matchMedia("(prefers-color-scheme: dark)").matches);
      const r = seeded(this.seed * 7 + 3);
      svg.innerHTML = "";
      const sky = dark ? ["#060a1c", "#161a42", "#3b2b5f"] : ["#69aaea", "#a6d2f4", "#ffdfb2"];
      const water = dark ? ["#1d3a5c", "#0f2036"] : crag.env === "tropical" ? ["#3fd0c9", "#169ab0"] : ["#4aa3d8", "#246ea8"];
      el("defs", { html: `
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>
        <radialGradient id="glowG"><stop offset="0" stop-color="${dark ? "#e9e6ff" : "#fff3c4"}" stop-opacity=".95"/><stop offset="1" stop-color="${dark ? "#e9e6ff" : "#fff3c4"}" stop-opacity="0"/></radialGradient>
        <linearGradient id="aoG" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${dark ? 0.5 : 0.3}"/></linearGradient>
        <linearGradient id="rimG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="${dark ? 0.06 : 0.22}"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${dark ? 0.25 : 0.14}"/></linearGradient>
        <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${water[0]}"/><stop offset="1" stop-color="${water[1]}"/></linearGradient>
        <radialGradient id="auraG"><stop offset="0" stop-color="#ffe08a" stop-opacity=".95"/><stop offset=".4" stop-color="#c46bff" stop-opacity=".55"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/></radialGradient>
        <clipPath id="cliffClip"><path d="${CLIFF_D}"/></clipPath>
        <mask id="spotMask"><rect width="${W}" height="${H}" fill="#fff"/><circle id="spotHole" cx="-99" cy="-99" r="38" fill="#000"/></mask>` }, svg);

      // sky
      el("rect", { width: W, height: H, fill: "url(#skyG)" }, svg);
      if (dark) {
        const g = el("g", { class: "stars" }, svg);
        for (let i = 0; i < 50; i++) {
          const s = r();
          el("circle", { cx: (r() * W).toFixed(1), cy: (r() * 175).toFixed(1), r: (0.35 + s * 1.15).toFixed(2), fill: "#fff",
            style: `--o:${(0.35 + s * 0.65).toFixed(2)};animation-delay:${(r() * 5).toFixed(2)}s;animation-duration:${(2.4 + r() * 3).toFixed(2)}s` }, g);
        }
        el("circle", { cx: 70, cy: 64, r: 50, fill: "url(#glowG)", opacity: 0.32 }, svg);
        el("path", { d: "M70 50 A14 14 0 1 0 70 78 A16 16 0 0 1 70 50 Z", fill: "#f4efdc" }, svg);
      } else {
        el("circle", { cx: 66, cy: 66, r: 70, fill: "url(#glowG)", class: "sunglow" }, svg);
        el("circle", { cx: 66, cy: 66, r: 17, fill: "#fff5cf" }, svg);
        const birds = el("g", { class: "birds", fill: "none", stroke: "#2b3550", "stroke-width": 1.3, "stroke-linecap": "round", opacity: 0.55 }, svg);
        [[250, 40, 1], [268, 52, 0.8], [236, 58, 0.7]].forEach(([x, y, s], i) => {
          const b = el("g", { transform: `translate(${x} ${y}) scale(${s})` }, birds);
          el("path", { d: "M-6 0 Q-3 -4 0 0 Q3 -4 6 0", class: "wing", style: `animation-delay:${i * 0.3}s` }, b);
        });
      }
      // clouds
      const cloudFill = dark ? "#2a2f5e" : "#ffffff";
      [[40, 118, 1.1, 75], [230, 92, 0.8, 95], [320, 140, 1.3, 120]].forEach(([x, y, s, dur], i) => {
        const g = el("g", { class: "cloud", style: `animation-duration:${dur}s;animation-delay:-${i * 23}s`, opacity: dark ? 0.5 : 0.85 }, svg);
        const c = el("g", { transform: `translate(${x} ${y}) scale(${s})`, fill: cloudFill }, g);
        [[0, 0, 18, 7], [-13, 2, 12, 5], [14, 2, 13, 5.5], [2, -5, 11, 7]].forEach(([cx, cy, rx, ry]) => el("ellipse", { cx, cy, rx, ry }, c));
      });
      // distant ridges
      const ridge = (yb, amp, step, color, op) => {
        let d = `M-10 ${H}`;
        for (let x = -10, i = 0; x <= W + step; x += step, i++) d += ` L${x} ${(yb - (i % 2 ? amp * (0.5 + r() * 0.5) : amp * r() * 0.35)).toFixed(1)}`;
        el("path", { d: d + ` L${W + 20} ${H} Z`, fill: color, opacity: op }, svg);
      };
      ridge(206, 70, 34, dark ? "#232a58" : "#9dbcdc", dark ? 1 : 0.75);
      ridge(236, 52, 26, dark ? "#1b2148" : "#7fa3c6", dark ? 1 : 0.8);
      if (crag.env === "sea" || crag.env === "tropical") {
        el("rect", { x: 0, y: 262, width: W, height: H - 262, fill: "url(#waterG)" }, svg);
        const waves = el("g", { stroke: "#fff", "stroke-width": 1.2, "stroke-linecap": "round", fill: "none", opacity: dark ? 0.18 : 0.45 }, svg);
        for (let i = 0; i < 9; i++) {
          const x = r() * W, y = 270 + r() * 22;
          el("path", { d: `M${x} ${y} q4 -2.5 8 0 q4 2.5 8 0`, class: "wave", style: `animation-delay:-${(r() * 4).toFixed(1)}s` }, waves);
        }
      }

      // the cliff — a low-poly rock face, colored by the crag's rock type
      const base = crag.tone || ROCK[crag.rock] || ROCK.Granite;
      const rock = dark ? mix(base, "#1a2044", 0.56) : base;
      const lite = mix(rock, "#ffffff", dark ? 0.12 : 0.26), shade = mix(rock, "#000000", 0.32);
      const cliff = el("g", { "clip-path": "url(#cliffClip)" }, svg);
      const rows = [16, 42, 70, 100, 134, 170, 206, 244, 284, 330], cols = 12;
      const grid = rows.map((y, ri) => Array.from({ length: cols }, (_, ci) => {
        const x = -10 + ci * (380 / (cols - 1));
        const edge = ci === 0 || ci === cols - 1 || ri === 0 || ri === rows.length - 1;
        return [x + (edge ? 0 : (r() - 0.5) * 26), y + (edge ? 0 : (r() - 0.5) * 16)];
      }));
      const facet = (pts) => {
        const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3, cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
        const t = clamp(0.56 + (r() - 0.5) * 0.55 - ((cx - 180) / 360) * 0.6 - ((cy - 160) / 320) * 0.12, 0, 1);
        const col = t > 0.5 ? mix(rock, lite, (t - 0.5) * 2) : mix(shade, rock, t * 2);
        el("polygon", { points: pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" "), fill: col, stroke: col, "stroke-width": 0.7 }, cliff);
      };
      for (let ri = 0; ri < rows.length - 1; ri++) for (let ci = 0; ci < cols - 1; ci++) {
        const a = grid[ri][ci], b = grid[ri][ci + 1], c = grid[ri + 1][ci], d = grid[ri + 1][ci + 1];
        if ((ri + ci) % 2) { facet([a, b, c]); facet([b, d, c]); } else { facet([a, b, d]); facet([a, d, c]); }
      }
      // cracks and strata
      const crackCol = mix(shade, "#000000", 0.25);
      for (let i = 0; i < 5; i++) {
        let x = 60 + r() * 240, y = 60 + r() * 120, d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
        const len = 4 + Math.floor(r() * 5);
        for (let j = 0; j < len; j++) { x += (r() - 0.5) * 18; y += 10 + r() * 14; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; }
        el("path", { d, fill: "none", stroke: crackCol, "stroke-width": 1 + r() * 0.8, opacity: 0.45, "stroke-linejoin": "round" }, cliff);
      }
      el("rect", { width: W, height: H, fill: "url(#rimG)" }, cliff);
      el("rect", { width: W, height: H, fill: "url(#aoG)" }, cliff);
      if (crag.env === "alpine") {
        const snow = dark ? "#c9d2ea" : "#f7f9fd";
        el("polygon", { points: "146,54 166,40 184,26 200,36 226,44 240,54 226,57 212,51 198,60 184,52 170,61 158,57", fill: snow }, cliff);
        el("polygon", { points: "184,26 200,36 226,44 240,54 226,57 212,51 198,60 184,52", fill: dark ? "#aab4d2" : "#dde5f2" }, cliff);
      }
      // altitude marks
      const lineCol = dark ? "#ffffff" : "#ffffff";
      this.marks().forEach((m) => {
        const y = this.yFor(m);
        el("line", { x1: 0, x2: W, y1: y, y2: y, stroke: lineCol, "stroke-width": 0.8, "stroke-dasharray": "2 5", opacity: dark ? 0.18 : 0.4 }, cliff);
      });
      el("path", { d: CLIFF_D, fill: "none", stroke: mix(shade, "#000000", 0.3), "stroke-width": 1.2, opacity: 0.55, "stroke-linejoin": "round" }, svg);
      const labels = el("g", { class: "alt-labels" }, svg);
      this.marks().forEach((m) => {
        const y = this.yFor(m);
        el("rect", { x: 318, y: y - 6.5, width: 36, height: 13, rx: 6.5, class: "lbl-bg" }, labels);
        el("text", { x: 336, y: y + 3, "text-anchor": "middle", class: "lbl", text: `${m} m` }, labels);
      });
      // summit flag + cairn
      el("ellipse", { cx: 184, cy: 27, rx: 5, ry: 2.2, fill: mix(shade, "#000000", 0.2) }, svg);
      el("ellipse", { cx: 184, cy: 24.5, rx: 3.6, ry: 1.8, fill: mix(rock, "#ffffff", 0.2) }, svg);
      el("line", { x1: 184, y1: 24, x2: 184, y2: 3, stroke: dark ? "#e6e8f0" : "#2b3142", "stroke-width": 1.4 }, svg);
      el("path", { d: "M184.5 3.5 L203 7.5 L184.5 12 Z", class: "flag" }, svg);
      el("rect", { x: 208, y: 3, width: 54, height: 13, rx: 6.5, class: "lbl-bg" }, labels);
      el("text", { x: 235, y: 12.4, "text-anchor": "middle", class: "lbl", text: `SUMMIT ${this.maxM}` }, labels);

      // foreground ground + scenery
      this.ground(r, dark);

      // belayer
      const bel = el("g", { transform: "translate(112 306)", class: "belayer" }, svg);
      bel.innerHTML = `
        <path d="M0 -12 L-4 0 M0 -12 L4 0" class="cl-pants"/>
        <line x1="0" y1="-24" x2="0" y2="-12" class="cl-shirt bel-shirt"/>
        <path d="M-1 -21 L5 -26" class="cl-arm"/><path d="M0 -19 L6 -16" class="cl-arm"/>
        <rect x="-4" y="-13.5" width="8" height="3" rx="1.4" class="cl-harness"/>
        <circle cx="0" cy="-28.5" r="4.4" class="cl-skin"/>
        <path d="M-4.9 -28 A4.9 4.9 0 0 1 4.9 -28 Z" class="cl-helmet bel-helmet"/>`;

      this.gRoute = el("g", { class: "route" }, svg);
      this.gFx = el("g", { class: "fx" }, svg);
      this.climber = el("g", { class: "climber", html: CLIMBER }, svg);
      this.body = this.climber.querySelector(".cl-body");
      this.spot = el("rect", { width: W, height: H, fill: "#05060c", opacity: 0, mask: "url(#spotMask)", "pointer-events": "none" }, svg);
      this.spotHole = svg.querySelector("#spotHole");
    },

    ground(r, dark) {
      const env = this.crag.env, svg = this.svg;
      const top = { forest: "#6e9450", alpine: "#7a9a5e", desert: "#d9b277", sea: "#cdbb94", tropical: "#ecd8a8" }[env] || "#6e9450";
      const g0 = dark ? mix(top, "#141a33", 0.6) : top;
      const g = el("g", {}, svg);
      let d = `M-10 ${H}`;
      const pts = [];
      for (let x = -10; x <= W + 20; x += 24) { const y = 292 + (r() - 0.5) * 10; pts.push([x, y]); d += ` L${x} ${y.toFixed(1)}`; }
      el("path", { d: d + ` L${W + 20} ${H} Z`, fill: g0 }, g);
      for (let i = 0; i < pts.length - 1; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
        el("polygon", { points: `${x1},${y1} ${x2},${y2} ${(x1 + x2) / 2 + (r() - 0.5) * 10},${308 + r() * 8}`, fill: mix(g0, r() < 0.5 ? "#ffffff" : "#000000", 0.08 + r() * 0.06) }, g);
      }
      const pine = (x, y, h, snowy) => {
        const pg = el("g", { transform: `translate(${x} ${y})` }, g);
        el("rect", { x: -1.4, y: -4, width: 2.8, height: 6, fill: dark ? "#3a2e25" : "#6b4b32" }, pg);
        const green = dark ? "#1d3a2c" : "#2f6b44", lgt = dark ? "#26493a" : "#3f8657";
        for (let k = 0; k < 3; k++) {
          const w = h * (0.5 - k * 0.11), y0 = -4 - k * h * 0.26, y1 = y0 - h * 0.46;
          el("polygon", { points: `${-w},${y0} 0,${y1} 0,${y0}`, fill: lgt }, pg);
          el("polygon", { points: `0,${y0} 0,${y1} ${w},${y0}`, fill: green }, pg);
          if (snowy) el("polygon", { points: `${-w * 0.3},${y1 + h * 0.16} 0,${y1} ${w * 0.3},${y1 + h * 0.16}`, fill: dark ? "#c9d2ea" : "#f7f9fd" }, pg);
        }
      };
      const shrub = (x, y, s) => {
        const sg = el("g", { transform: `translate(${x} ${y}) scale(${s})`, fill: dark ? "#3c4630" : "#8c9550" }, g);
        [[-4, 0, 4], [3, 0, 4.5], [0, -3, 4]].forEach(([cx, cy, rr]) => el("circle", { cx, cy, r: rr }, sg));
      };
      const boulder = (x, y, s) => {
        const c = dark ? "#3a3d52" : "#a39684";
        el("polygon", { points: `${x - 8 * s},${y} ${x - 5 * s},${y - 7 * s} ${x + 3 * s},${y - 9 * s} ${x + 9 * s},${y - 3 * s} ${x + 8 * s},${y}`, fill: c }, g);
        el("polygon", { points: `${x + 3 * s},${y - 9 * s} ${x + 9 * s},${y - 3 * s} ${x + 8 * s},${y} ${x + 1 * s},${y}`, fill: mix(c, "#000000", 0.2) }, g);
      };
      const palm = (x, y, lean) => {
        const pg = el("g", { transform: `translate(${x} ${y})` }, g);
        el("path", { d: `M0 0 Q${lean * 6} -18 ${lean * 4} -36`, stroke: dark ? "#4a3a2a" : "#8a6a43", "stroke-width": 3.2, fill: "none", "stroke-linecap": "round" }, pg);
        const fr = el("g", { transform: `translate(${lean * 4} -36)`, stroke: dark ? "#1f4a33" : "#2f9a55", "stroke-width": 3, fill: "none", "stroke-linecap": "round", class: "fronds" }, pg);
        ["M0 0 Q-10 -6 -18 2", "M0 0 Q10 -7 18 1", "M0 0 Q-6 -10 -12 -12", "M0 0 Q7 -10 13 -11", "M0 0 Q-1 6 -8 10", "M0 0 Q2 6 9 9"].forEach((p) => el("path", { d: p }, fr));
      };
      if (env === "forest" || env === "alpine") {
        const snowy = env === "alpine";
        pine(14, 300, 46, snowy); pine(36, 306, 34, snowy); pine(330, 302, 50, snowy); pine(352, 308, 32, snowy); pine(306, 312, 26, snowy);
        for (let i = 0; i < 14; i++) {
          const x = r() * W, y = 296 + r() * 20;
          el("path", { d: `M${x} ${y} l-1.5 -4 M${x} ${y} l0 -5 M${x} ${y} l1.6 -4`, stroke: dark ? "#2f4a33" : "#4f7a3a", "stroke-width": 1, "stroke-linecap": "round" }, g);
        }
      } else if (env === "desert") {
        boulder(26, 304, 1.4); boulder(334, 306, 1.7); boulder(300, 312, 0.9);
        shrub(52, 304, 1); shrub(276, 308, 0.9); shrub(350, 312, 0.8);
      } else if (env === "tropical") {
        palm(18, 312, 1); palm(40, 316, -0.6); palm(338, 312, -1);
        boulder(306, 314, 0.9);
      } else {
        boulder(24, 306, 1.5); boulder(46, 310, 0.8); boulder(330, 306, 1.6); boulder(352, 312, 1);
      }
    },

    // ---------- holds, rope, climber ----------
    drawRoute(pts) {
      const g = this.gRoute;
      g.innerHTML = "";
      this.holdEls = [];
      this.pts = pts;
      const holdLayer = el("g", {}, g), ropeLayer = el("g", {}, g), drawLayer = el("g", {}, g);
      pts.forEach((p, i) => {
        if (!p.hit) {
          el("ellipse", { cx: p.x + 9, cy: p.y + 15, rx: 4.5, ry: 2.6, fill: "#fff", opacity: 0.35 }, holdLayer); // chalky scuff
          return;
        }
        const outer = el("g", { transform: `translate(${(p.x + 1).toFixed(1)} ${(p.y + 3).toFixed(1)}) rotate(${p.rot.toFixed(1)})` }, holdLayer);
        if (p.tier === 3) {
          el("circle", { r: 22, fill: "url(#auraG)", class: "aura" }, outer);
          const tw = el("g", { class: "twinkles" }, outer);
          [[-14, -10, 2.6], [13, -12, 2], [15, 9, 1.8]].forEach(([x, y, s], k) =>
            el("path", { d: `M${x} ${y - s * 2} L${x + s * 0.5} ${y - s * 0.5} L${x + s * 2} ${y} L${x + s * 0.5} ${y + s * 0.5} L${x} ${y + s * 2} L${x - s * 0.5} ${y + s * 0.5} L${x - s * 2} ${y} L${x - s * 0.5} ${y - s * 0.5}Z`,
              fill: "#ffd76a", style: `animation-delay:${k * 0.5}s` }, tw));
        }
        const anim = el("g", { class: "hold-anim" }, outer);
        const scale = [0.5, 0.5, 0.48, 0.62][p.tier];
        el("g", { transform: `scale(${scale}) translate(-24 -22)`, html: FX.holdInner(p.tier) }, anim);
        this.holdEls[i] = anim;
      });
      // rope: belayer → every clipped quickdraw → climber's harness
      const cur = pts.length ? pts[pts.length - 1] : this.start();
      const rp = [[117, 280]];
      pts.forEach((p) => { if (p.hit) rp.push([p.x - 8, p.y + 10]); });
      rp.push([cur.x - 4, cur.y + 26]);
      let d = `M${rp[0][0]} ${rp[0][1]}`;
      for (let i = 1; i < rp.length; i++) {
        const [x0, y0] = rp[i - 1], [x1, y1] = rp[i];
        d += ` Q${((x0 + x1) / 2 + (x1 - x0) * 0.1).toFixed(1)} ${((y0 + y1) / 2 + 8).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      }
      el("path", { d, class: "rope" }, ropeLayer);
      el("path", { d, class: "rope-fleck" }, ropeLayer);
      pts.forEach((p) => {
        if (!p.hit) return;
        const q = el("g", { transform: `translate(${(p.x - 8).toFixed(1)} ${(p.y + 4).toFixed(1)})` }, drawLayer);
        el("line", { x1: 0, y1: 0, x2: 0, y2: 4, stroke: "#5b6474", "stroke-width": 1.6 }, q);
        el("rect", { x: -2, y: 3.5, width: 4, height: 6, rx: 2, fill: "none", stroke: "#c9cfdb", "stroke-width": 1.1 }, q);
        el("circle", { cx: 0, cy: -0.5, r: 1.3, fill: "#8a93a5" }, q);
      });
    },

    placeClimber(p) { this.climber.style.transform = this.tf(p); },
    current() { return this.pts && this.pts.length ? this.pts[this.pts.length - 1] : this.start(); },
    redraw() { this.drawRoute(this.pts || []); this.placeClimber(this.current()); },
    tf(p, dy = 0, dx = 0) { return `translate(${(p.x + dx).toFixed(1)}px, ${(p.y + dy).toFixed(1)}px)`; },
    screenOf(x, y) {
      const m = this.svg.getScreenCTM();
      if (!m) return { x: 0, y: 0 };
      const pt = new DOMPoint(x, y).matrixTransform(m);
      return { x: pt.x, y: pt.y };
    },
    climberScreen(dy = 18) {
      const m = new DOMMatrix(getComputedStyle(this.climber).transform);
      return this.screenOf(m.e - 4, m.f + dy);
    },

    // ---------- the move animations ----------
    async playMove(pts, onLand) {
      const to = pts[pts.length - 1];
      const prev = pts.slice(0, -1);
      const from = prev.length ? prev[prev.length - 1] : this.start();
      this.drawRoute(prev);
      this.placeClimber(from);
      if (FX.reduced) {
        if (!to.hit && window.SFX) SFX.play("slip");
        this.drawRoute(pts); this.placeClimber(to); onLand && onLand();
        if (to.hit) this.reveal(pts.length - 1, to);
        return;
      }
      if (!to.hit) { await this.slip(from, to.timeout); onLand && onLand(); return; }
      await [this.jug, this.sloper, this.crimp, this.chip][to.tier].call(this, from, to);
      this.drawRoute(pts);
      this.placeClimber(to);
      onLand && onLand();
      this.reveal(pts.length - 1, to);
    },

    async jug(from, to) {
      await run(this.climber, [{ transform: this.tf(from) }, { transform: this.tf(to, -7), offset: 0.72 }, { transform: this.tf(to) }],
        { duration: 620, easing: "cubic-bezier(.3,.75,.4,1)" }, this.tf(to));
    },

    async sloper(from, to) {
      const mid = { x: (from.x + to.x) / 2 + (to.x > from.x ? -8 : 8), y: (from.y + to.y) / 2 };
      this.body.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(-6deg)", offset: 0.45 }, { transform: "rotate(0deg)" }], { duration: 900, easing: "ease-in-out" });
      await run(this.climber, [{ transform: this.tf(from) }, { transform: this.tf(mid) }, { transform: this.tf(to) }],
        { duration: 900, easing: "cubic-bezier(.45,0,.25,1)" }, this.tf(to));
    },

    async crimp(from, to) {
      await run(this.body, [{ transform: "none" }, { transform: "translate(0px,3px) scale(1,.84)" }], { duration: 170, easing: "ease-out" });
      const stop = this.trail(45);
      this.body.animate([{ transform: "translate(0px,3px) scale(1,.84)" }, { transform: "scale(.94,1.1)", offset: 0.35 }, { transform: "none" }], { duration: 640 });
      await run(this.climber, [{ transform: this.tf(from) }, { transform: this.tf(to, -15), offset: 0.7 }, { transform: this.tf(to) }],
        { duration: 640, easing: "cubic-bezier(.2,.9,.3,1)" }, this.tf(to));
      stop();
    },

    async chip(from, to) {
      if (window.SFX) SFX.play("riser");
      this.spotHole.setAttribute("cx", to.x);
      this.spotHole.setAttribute("cy", to.y + 6);
      this.spot.animate([{ opacity: 0 }, { opacity: 0.55 }], { duration: 380, fill: "forwards" });
      await run(this.body, [{ transform: "none" }, { transform: "translate(0px,4px) scale(1,.78)" }], { duration: 420, easing: "ease-in" });
      await run(this.body, [{ transform: "translate(0px,4px) scale(1,.78)" }, { transform: "translate(-.9px,4px) scale(1,.78)" }, { transform: "translate(.9px,4px) scale(1,.78)" }, { transform: "translate(0px,4px) scale(1,.78)" }],
        { duration: 120, iterations: 3 });
      const stop = this.trail(40);
      const sparks = setInterval(() => {
        const s = this.climberScreen();
        FX.burst(s.x, s.y, { count: 3, colors: ["#ffd76a", "#ffffff", "#c46bff"], shapes: ["star"], speed: [10, 60], g: 80, size: [5, 9], life: [0.5, 0.9] });
      }, 55);
      this.body.animate([{ transform: "translate(0px,4px) scale(1,.78)" }, { transform: "scale(.9,1.16)", offset: 0.3 }, { transform: "none" }], { duration: 1000 });
      await run(this.climber, [{ transform: this.tf(from) }, { transform: this.tf(to, -28), offset: 0.74 }, { transform: this.tf(to, 3), offset: 0.88 }, { transform: this.tf(to) }],
        { duration: 1050, easing: "cubic-bezier(.16,.84,.3,1)" }, this.tf(to));
      stop(); clearInterval(sparks);
      this.spot.animate([{ opacity: 0.55 }, { opacity: 0 }], { duration: 700, fill: "forwards", delay: 250 });
    },

    async slip(p, timeout) {
      if (window.SFX) SFX.play("slip");
      const feet = this.screenOf(p.x - 2, p.y + 40);
      FX.burst(feet.x, feet.y, { count: 10, colors: ["#8b8478", "#a39a8c", "#6e675d"], shapes: ["rect"], speed: [30, 140], angle: Math.PI / 2, spread: 1.6, g: 900, life: [0.8, 1.3], size: [3, 5] });
      FX.vibrate(60);
      this.shake(5);
      this.body.style.transformOrigin = "-3px -16px";
      this.body.animate([{ transform: "rotate(0)" }, { transform: "rotate(17deg)", offset: 0.22 }, { transform: "rotate(-12deg)", offset: 0.42 }, { transform: "rotate(7deg)", offset: 0.6 }, { transform: "rotate(-3deg)", offset: 0.78 }, { transform: "rotate(0)" }],
        { duration: 1500, easing: "ease-out" });
      if (timeout) FX.flash("rgba(229,72,77,.35)", 600);
      const f = clamp(BASE + 2 - p.y, 10, 40) / 40; // can't fall through the ground
      await run(this.climber, [
        { transform: this.tf(p), easing: "cubic-bezier(.5,0,1,.6)" },
        { transform: this.tf(p, 40 * f), offset: 0.18, easing: "ease-out" },
        { transform: this.tf(p, 28 * f), offset: 0.3 }, { transform: this.tf(p, 35 * f), offset: 0.42 },
        { transform: this.tf(p, 31 * f), offset: 0.56 }, { transform: this.tf(p, 33 * f), offset: 0.7 },
        { transform: this.tf(p) }], { duration: 1600 }, this.tf(p));
      this.body.style.transformOrigin = "";
    },

    // what happens the instant the hand lands on the new hold
    reveal(i, p) {
      const node = this.holdEls[i];
      if (!node) return;
      const s = this.screenOf(p.x + 1, p.y + 3);
      const plus = `+${HOLD_M[p.tier]} m`;
      if (window.SFX) SFX.play(["jug", "sloper", "crimp", "chip"][p.tier]);
      if (FX.reduced) { this.floatText(p, plus, p.tier); return; }
      switch (p.tier) {
        case 0:
          run(node, [{ transform: "scale(0)" }, { transform: "scale(1.35)", offset: 0.6 }, { transform: "scale(1)" }], { duration: 420, easing: "ease-out" });
          FX.burst(s.x, s.y + 4, { count: 16, colors: ["#ffffff", "#f4f1ea", "#e5e0d5"], speed: [12, 70], g: -40, drag: 0.9, size: [8, 16], grow: 1.5, life: [0.7, 1.2], jitter: 8 });
          break;
        case 1:
          run(node, [{ transform: "scale(1.7,.35)" }, { transform: "scale(.85,1.2)", offset: 0.5 }, { transform: "scale(1)" }], { duration: 520, easing: "ease-out" });
          this.ripple(p, "var(--sloper)", 0); this.ripple(p, "var(--sloper)", 180); this.ripple(p, "#ffffff", 360);
          FX.burst(s.x, s.y, { count: 12, colors: ["#8ec1ff", "#ffffff", "#3b82f6"], shapes: ["star", "circle"], speed: [40, 120], g: 60, size: [4, 8], life: [0.6, 1] });
          break;
        case 2:
          run(node, [{ transform: "scale(.2) rotate(-40deg)", filter: "brightness(3)" }, { transform: "scale(1.25) rotate(8deg)", filter: "brightness(2)", offset: 0.5 }, { transform: "scale(1) rotate(0)", filter: "brightness(1)" }], { duration: 480, easing: "ease-out" });
          FX.burst(s.x, s.y, { count: 34, colors: ["#ff8a00", "#ffc53d", "#fff1c2", "#ff5a36"], speed: [160, 420], g: 520, size: [2, 4.5], life: [0.45, 0.9] });
          this.shake(4);
          this.stamp("Crimped it!", "t2");
          FX.vibrate(30);
          break;
        case 3:
          run(node, [{ transform: "scale(0) rotate(-180deg)" }, { transform: "scale(1.9) rotate(15deg)", offset: 0.55 }, { transform: "scale(1) rotate(0)" }], { duration: 700, easing: "cubic-bezier(.2,1.3,.4,1)" });
          FX.flash("#fff", 560);
          FX.burst(s.x, s.y, { count: 46, colors: ["#ffd76a", "#c46bff", "#ffffff", "#a855f7"], shapes: ["star", "star", "circle"], speed: [120, 380], g: 220, size: [5, 11], life: [0.8, 1.5] });
          setTimeout(() => FX.confetti({ colors: ["#a855f7", "#c46bff", "#ffc53d", "#ffd76a", "#ffffff", "#ff5a36"] }), 120);
          this.shake(7);
          this.stamp("Crux move!", "t3");
          FX.vibrate([40, 60, 90]);
          break;
      }
      this.floatText(p, plus, p.tier);
    },

    // ---------- little helpers ----------
    trail(every) {
      const id = setInterval(() => {
        const g = this.climber.cloneNode(true);
        g.setAttribute("class", "ghost");
        g.style.transform = getComputedStyle(this.climber).transform;
        this.gFx.appendChild(g);
        g.animate([{ opacity: 0.4 }, { opacity: 0 }], { duration: 380, fill: "forwards" }).finished.then(() => g.remove()).catch(() => g.remove());
      }, every);
      return () => clearInterval(id);
    },
    ripple(p, color, delay) {
      const c = el("circle", { cx: p.x + 1, cy: p.y + 3, r: 9, fill: "none", stroke: color, "stroke-width": 2, class: "ripple" }, this.gFx);
      c.animate([{ transform: "scale(.4)", opacity: 0.9 }, { transform: "scale(3.2)", opacity: 0 }], { duration: 850, delay, easing: "cubic-bezier(.2,.7,.3,1)", fill: "both" })
        .finished.then(() => c.remove()).catch(() => c.remove());
    },
    floatText(p, text, tier) {
      const t = el("text", { x: p.x + 16, y: p.y + 2, class: `float t${tier}`, text }, this.gFx);
      t.animate([{ transform: "translateY(4px)", opacity: 0 }, { transform: "translateY(-6px)", opacity: 1, offset: 0.2 }, { transform: "translateY(-22px)", opacity: 0 }],
        { duration: 1500, easing: "ease-out", fill: "forwards" }).finished.then(() => t.remove()).catch(() => t.remove());
    },
    shake(px) {
      if (FX.reduced) return;
      this.wrap.animate([{ transform: "none" }, { transform: `translate(${-px}px, ${px * 0.5}px)` }, { transform: `translate(${px * 0.8}px, ${-px * 0.4}px)` },
        { transform: `translate(${-px * 0.5}px, ${px * 0.3}px)` }, { transform: `translate(${px * 0.3}px, 0)` }, { transform: "none" }], { duration: 380, easing: "ease-out" });
    },
    stamp(text, kind) {
      const s = this.stampEl;
      s.textContent = text;
      s.className = `stamp ${kind}`;
      void s.offsetWidth;
      s.classList.add("show");
    },
  };

  window.Scene = Scene;
})();
