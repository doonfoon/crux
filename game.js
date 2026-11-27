// CRUX — daily geography climb.
(() => {
  const MOVES = 7;
  const SECONDS = 30; // time allowed per question
  const HOLDS = [
    { name: "Jug", m: 100, emoji: "🟩", blurb: "A big, friendly hold — a solid, popular answer." },
    { name: "Sloper", m: 200, emoji: "🟦", blurb: "Nice — a step off the beaten path." },
    { name: "Crimp", m: 300, emoji: "🟧", blurb: "Not many climbers find this one." },
    { name: "Foot Chip", m: 400, emoji: "🟪", blurb: "A tiny hold almost nobody spots — what a deep cut!" },
  ];
  const SLIP = { name: "Slip", emoji: "⬛" };
  const MAX_M = MOVES * HOLDS[3].m;
  const RANKS = [
    [0, "Gumby"], [600, "Weekend Warrior"], [1000, "Crag Rat"],
    [1400, "Crusher"], [1800, "Sender"], [2200, "Dirtbag Legend"], [2800, "Summit Seeker"],
  ];

  // ---------- storage (never required to work) ----------
  const store = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  // ---------- daily puzzle ----------
  const EPOCH = new Date(2026, 10, 26); // Route #1 = Nov 26, 2026
  const dayIndex = (d) => Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - EPOCH) / 86400000);
  const today = dayIndex(new Date());
  const param = parseInt(new URLSearchParams(location.search).get("route"), 10);
  const day = Number.isFinite(param) && param >= 1 && param - 1 <= today ? param - 1 : today;
  const isToday = day === today;

  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffled(arr, seed) {
    const a = arr.slice(), r = rng(seed);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  // Walk through the bank in shuffled cycles so every question is used before any repeats.
  function questionsForDay(d) {
    const n = QUESTIONS.length, picked = [];
    for (let k = d * MOVES; picked.length < MOVES; k++) {
      const q = shuffled(QUESTIONS.map((_, i) => i), 9001 + Math.floor(k / n))[k % n];
      if (!picked.includes(q)) picked.push(q);
    }
    return picked;
  }
  const qIds = questionsForDay(day);
  const crag = CRAGS[((day % CRAGS.length) + CRAGS.length) % CRAGS.length];

  // ---------- answer matching ----------
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/\bst\.?\s/g, "st ").replace(/[^a-z0-9]+/g, " ").trim()
    .replace(/^the /, "");
  const ALIAS = Object.fromEntries(Object.entries(ALIASES).map(([k, v]) => [norm(k), norm(v)]));
  const KNOWN = new Set(KNOWN_PLACES.map(norm));

  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      let prev = dp[0]; dp[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return dp[b.length];
  }

  function entries(q) {
    const out = [];
    q.a.forEach((group, tier) => group.forEach((ans) => {
      const names = Array.isArray(ans) ? ans : [ans];
      out.push({ display: names[0], tier, keys: names.map(norm) });
    }));
    return out;
  }

  function judge(q, raw) {
    let n = norm(raw);
    if (!n) return null;
    const list = entries(q);
    // Exact name first (so "England" counts where England is an answer), then common aliases.
    const exact = list.find((e) => e.keys.includes(n)) || list.find((e) => e.keys.includes(ALIAS[n]));
    n = ALIAS[n] || n;
    if (exact) return { ...exact, fuzzy: false };
    if (KNOWN.has(n)) return { tier: -1 }; // a real place, just not on this route
    let best = null, bestD = 99;
    for (const e of list) for (const k of e.keys) {
      const limit = k.length >= 9 ? 2 : k.length >= 5 ? 1 : 0;
      const d = lev(n, k);
      if (d <= limit && d < bestD) { best = e; bestD = d; }
    }
    return best ? { ...best, fuzzy: true } : { tier: -1 };
  }

  // ---------- state ----------
  const stateKey = `crux-route-${day + 1}`;
  let state = store.get(stateKey, { answers: [] }); // {input, display, tier, fuzzy}
  const height = () => state.answers.reduce((s, a) => s + (a.tier >= 0 ? HOLDS[a.tier].m : 0), 0);
  let viewing = null; // index of the answer whose result card is showing

  // ---------- wall drawing ----------
  const svg = document.getElementById("wall");
  const NS = "http://www.w3.org/2000/svg";
  const W = 320, H = 220, BASE = 200, TOP = 36;
  const yFor = (m) => BASE - (m / MAX_M) * (BASE - TOP);
  const el = (tag, attrs, parent = svg) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    parent.appendChild(e);
    return e;
  };
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

  function holdPositions() {
    const r = rng(day * 31 + 7);
    let m = 0;
    return state.answers.map((a, i) => {
      if (a.tier >= 0) m += HOLDS[a.tier].m;
      const side = i % 2 === 0 ? -1 : 1;
      return { x: 150 + side * (25 + r() * 55), y: yFor(m), tier: a.tier };
    });
  }

  function drawWall(animateSlip) {
    svg.innerHTML = "";
    const defs = el("defs", {});
    const g = el("linearGradient", { id: "sky", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el("stop", { offset: "0", "stop-color": css("--sky-top") }, g);
    el("stop", { offset: "1", "stop-color": css("--sky-bot") }, g);
    el("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#sky)" });

    // rock face
    el("path", {
      d: "M20 220 L34 154 L22 110 L44 67 L60 29 L96 16 L150 10 L196 18 L238 13 L262 44 L280 88 L268 132 L292 176 L300 220 Z",
      fill: css("--rock"),
    });
    const crack = { fill: "none", stroke: css("--rock-dark"), "stroke-width": 2, "stroke-linecap": "round", opacity: .7 };
    el("path", { ...crack, d: "M110 220 L118 183 L108 154 L124 125 L116 88" });
    el("path", { ...crack, d: "M210 205 L202 169 L216 139 L206 110 L220 73 L212 44" });
    el("path", { ...crack, d: "M70 132 L90 110 L80 88" });
    el("path", { ...crack, d: "M240 110 L250 88" });

    // ground + summit flag
    el("rect", { x: 0, y: BASE + 4, width: W, height: H - BASE, fill: css("--rock-dark") });
    el("line", { x1: 150, y1: TOP, x2: 150, y2: TOP - 22, stroke: css("--ink"), "stroke-width": 2 });
    el("path", { d: `M150 ${TOP - 22} L170 ${TOP - 17} L150 ${TOP - 12} Z`, fill: css("--accent") });

    // altitude ticks
    for (let m = 0; m <= MAX_M; m += 700) {
      const y = yFor(m);
      el("line", { x1: 0, y1: y, x2: 14, y2: y, stroke: css("--ink"), opacity: .35 });
      const t = el("text", { x: 17, y: y + 4, "font-size": 10, fill: css("--ink"), opacity: .55, "font-family": "Space Grotesk" });
      t.textContent = m === MAX_M ? "2800 summit" : `${m}`;
    }

    // rope + holds
    const pts = holdPositions();
    let path = `M150 ${BASE + 4}`;
    pts.forEach((p) => { path += ` L${p.x.toFixed(1)} ${p.y.toFixed(1)}`; });
    el("path", { class: "rope", d: path, fill: "none", stroke: css("--accent"), "stroke-width": 2, "stroke-dasharray": "5 4" });

    pts.forEach((p, i) => {
      if (p.tier >= 0) {
        el("ellipse", { cx: p.x, cy: p.y + 5, rx: 9 + p.tier, ry: 6, fill: css(`--g${p.tier}`), stroke: css("--ink"), "stroke-width": 1.2 });
      } else {
        const x = el("g", { class: animateSlip && i === pts.length - 1 ? "slip" : "" });
        el("path", { d: `M${p.x - 4} ${p.y + 8} l8 8 M${p.x + 4} ${p.y + 8} l-8 8`, stroke: css("--gx"), "stroke-width": 2.5, "stroke-linecap": "round" }, x);
      }
    });

    // climber
    const last = pts[pts.length - 1] || { x: 150, y: BASE + 4 };
    const c = el("g", { class: "climber" + (animateSlip ? " slip" : "") });
    c.setAttribute("transform", `translate(${last.x} ${last.y - 14})`);
    el("circle", { cx: 0, cy: -10, r: 6, fill: css("--ink") }, c);
    el("path", { d: "M0 -4 L0 8 M0 0 L-8 -8 M0 0 L8 -6 M0 8 L-6 16 M0 8 L7 15", stroke: css("--ink"), "stroke-width": 3, "stroke-linecap": "round", fill: "none" }, c);
    el("path", { d: "M-4 -15 L4 -15 L5 -12 L-5 -12 Z", fill: css("--accent") }, c);

    document.getElementById("altValue").textContent = `${height().toLocaleString()} m`;
  }

  // ---------- screens ----------
  const play = document.getElementById("play");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function render(animateSlip = false) {
    drawWall(animateSlip);
    if (viewing !== null) return renderResult(viewing);
    if (state.answers.length >= MOVES) return renderSummary();
    renderQuestion();
  }

  let timer = null;

  function renderQuestion() {
    const i = state.answers.length;
    const q = QUESTIONS[qIds[i]];
    // The clock keeps running through a page refresh, so reloading can't buy extra time.
    if (!state.clock || state.clock.i !== i) { state.clock = { i, start: Date.now() }; store.set(stateKey, state); }
    const deadline = state.clock.start + SECONDS * 1000;
    play.innerHTML = `
      <div class="card">
        <div class="move-row">
          <div class="move">Move ${i + 1} of ${MOVES}</div>
          <div class="clock" id="clock"><span id="clockNum">${SECONDS}</span>s</div>
        </div>
        <div class="timebar"><div class="timefill" id="timefill"></div></div>
        <div class="question">${esc(q.q)}</div>
        <form class="answer-row" id="answerForm" autocomplete="off">
          <input id="answer" type="text" placeholder="Your answer…" autocapitalize="words" spellcheck="false" aria-label="Your answer">
          <button class="btn" type="submit">Climb</button>
        </form>
        <div class="hint">One try, ${SECONDS} seconds. Rarer right answers climb higher.</div>
      </div>`;
    const input = document.getElementById("answer");
    if (matchMedia("(hover: hover)").matches) input.focus();

    const finish = (raw, timedOut) => {
      clearInterval(timer); timer = null;
      const r = timedOut ? { tier: -1 } : judge(q, raw);
      state.answers.push({ input: raw, display: r.display || raw, tier: r.tier, fuzzy: !!r.fuzzy, timeout: timedOut });
      delete state.clock;
      store.set(stateKey, state);
      if (state.answers.length === MOVES) recordStats();
      viewing = state.answers.length - 1;
      render(r.tier < 0);
    };

    const fill = document.getElementById("timefill"), num = document.getElementById("clockNum"), clock = document.getElementById("clock");
    const tickClock = () => {
      const left = Math.max(0, deadline - Date.now());
      const secs = Math.ceil(left / 1000);
      num.textContent = secs;
      fill.style.width = `${(left / (SECONDS * 1000)) * 100}%`;
      clock.classList.toggle("urgent", secs <= 10);
      fill.classList.toggle("urgent", secs <= 10);
      if (left <= 0) finish(input.value.trim(), true);
    };
    clearInterval(timer);
    timer = setInterval(tickClock, 200);
    tickClock();

    document.getElementById("answerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = input.value.trim();
      if (!raw) return input.focus();
      finish(raw, false);
    });
  }

  // ---------- "why didn't that land?" notes ----------
  const COUNTRY_SET = new Set(KNOWN_COUNTRIES.map(norm));
  const STATE_SET = new Set(KNOWN_STATES.map(norm));
  const plural = (s) => /(alps|andes|himalayas|mountains)$/i.test(s);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function whyNot(q, input) {
    const n = ALIAS[norm(input)] || norm(input);
    const name = esc(input);
    const text = esc(q.q.replace(/\s*\([^)]*\)/g, "").replace(/\s+\.$/, "."));
    const wantsState = /US state/.test(text), wantsCountry = /\bcountr(y|ies)\b/.test(text);
    const isCountry = COUNTRY_SET.has(n), isState = STATE_SET.has(n);
    if (!isCountry && !isState) {
      return `We couldn't find “${name}” among the right answers. Check the spelling — or it may just not fit this one.`;
    }
    if (wantsState && isCountry && !isState) return `${name} is a country — this one wanted a US state!`;
    if (wantsCountry && isState && !isCountry) return `${name} is a US state — this one wanted a country!`;

    const a = (w) => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
    let m;
    if ((m = text.match(/with exactly one other country/))) return `${name} has more than one neighbor.`;
    if ((m = text.match(/(?:borders|shares a land border with) (.+?)\.$/))) return `${name} doesn't share a border with ${m[1]}.`;
    if ((m = text.match(/that the (.+?) touches\.$/))) return `The ${m[1]} doesn't touch ${name}.`;
    if ((m = text.match(/touches (.+?)\.$/))) return `${name} doesn't touch ${m[1]}.`;
    if ((m = text.match(/(?:coastline|shoreline) on (.+?)\.$/))) return `${name} doesn't have a coastline on ${m[1]}.`;
    if ((m = text.match(/with an? (.+?) coastline\.$/))) return `${name} doesn't have ${a(m[1])} coastline.`;
    if ((m = text.match(/Name an? .+? (?:the )?(.+?) (passes|flows|extends?|runs?)( through or borders| through| into)\.$/))) {
      const subj = "The " + m[1].replace(/^the /i, "");
      const verb = { passes: "pass", flows: "flow", extends: "extend", runs: "run" }[m[2]] || m[2];
      const rest = m[3].replace(" or borders", " or border");
      return plural(m[1]) ? `${subj} don't ${verb}${rest} ${name}.` : `${subj} doesn't ${verb}${rest} ${name}.`;
    }
    if ((m = text.match(/where (.+?) is an official language/))) return `${m[1]} isn't an official language of ${name}.`;
    if ((m = text.match(/member country of (.+?)\.$/))) return `${name} isn't a member of ${m[1]}.`;
    if ((m = text.match(/starts with the letter (\w)/))) return `${name} doesn't start with ${m[1]}.`;
    if ((m = text.match(/with more than (.+?)\.$/))) return `${name} doesn't have more than ${m[1]}.`;
    if ((m = text.match(/has hosted (.+?)\.$/))) return `${name} hasn't hosted ${m[1]}.`;
    if ((m = text.match(/that has a monarch/))) return `${name} doesn't have a monarch.`;
    if ((m = text.match(/was one of (.+?)\.$/))) return `${name} wasn't one of ${m[1]}.`;
    if ((m = text.match(/on the (.+?)\.$/))) return `${name} isn't on the ${m[1]}.`;
    if ((m = text.match(/^Name one of (.+?)\.$/))) return `${name} isn't one of ${m[1]}.`;
    if ((m = text.match(/^Name an? (.+?) in (.+?)\.$/))) return `${name} isn't ${a(m[1])} in ${m[2]}.`;
    if ((m = text.match(/^Name an? (.+?)\.$/))) return `${name} isn't ${a(m[1])}.`;
    return `${name} is a real place, but it isn't one of the right answers here.`;
  }

  function holdList(q, you) {
    return q.a.map((group, t) => group.length ? `
      <div class="hold-group">
        <div class="label"><span class="dot g${t}"></span>${HOLDS[t].name} · +${HOLDS[t].m} m</div>
        <div class="names">${group.map((a) => {
          const name = Array.isArray(a) ? a[0] : a;
          return name === you ? `<span class="you">${esc(name)}</span>` : esc(name);
        }).join(", ")}</div>
      </div>` : "").join("");
  }

  function renderResult(i) {
    const a = state.answers[i];
    const q = QUESTIONS[qIds[i]];
    const hit = a.tier >= 0;
    const h = hit ? HOLDS[a.tier] : null;
    const last = i === MOVES - 1;
    play.innerHTML = `
      <div class="card">
        <div class="move">Move ${i + 1} of ${MOVES}</div>
        <div class="question">${esc(q.q)}</div>
        <div class="result ${hit ? "hit" : "miss"}">
          ${hit ? `
            <div class="big"><span class="dot g${a.tier}"></span> ${h.name} &nbsp;+${h.m} m</div>
            <div>${esc(a.display)}${a.fuzzy ? ` <span class="sub">(we read “${esc(a.input)}” as ${esc(a.display)})</span>` : ""} — ${h.blurb}</div>`
          : a.timeout ? `
            <div class="big">⏱ Time's up! +0 m</div>
            <div>${a.input ? `You were typing “${esc(a.input)}” when the clock ran out.` : "The clock ran out."} The rope caught you — keep climbing.</div>`
          : `
            <div class="big">Slip! +0 m</div>
            <div>${whyNot(q, a.input)} The rope caught you — keep climbing.</div>`}
        </div>
        <details class="holds">
          <summary>See every hold on this move</summary>
          ${holdList(q, hit ? a.display : null)}
        </details>
        <button class="btn wide" id="nextBtn">${last ? "See your climb" : "Next move →"}</button>
      </div>`;
    document.getElementById("nextBtn").addEventListener("click", () => { viewing = null; render(); });
  }

  function rankFor(m) { return RANKS.filter(([min]) => m >= min).pop()[1]; }

  function shareText() {
    const m = height();
    return `CRUX #${day + 1} 🧗 ${crag[0]}\n${state.answers.map((a) => a.tier >= 0 ? HOLDS[a.tier].emoji : SLIP.emoji).join("")}\n${m.toLocaleString()} m · ${rankFor(m)}\n${location.origin + location.pathname}`;
  }

  function renderSummary() {
    const m = height();
    play.innerHTML = `
      <div class="card summary">
        <div class="move">Route #${day + 1} complete${isToday ? "" : " (practice)"}</div>
        <div class="rank">${rankFor(m)}</div>
        <div class="total">You climbed <b>${m.toLocaleString()} m</b> of ${MAX_M.toLocaleString()} m</div>
        <ul class="route-list">
          ${state.answers.map((a, i) => `
            <li>
              <span class="dot ${a.tier >= 0 ? "g" + a.tier : "gx"}"></span>
              <span class="q">${esc(QUESTIONS[qIds[i]].q)}</span>
              <span class="a">${a.timeout ? "⏱ out of time" : esc(a.tier >= 0 ? a.display : a.input)}</span>
            </li>`).join("")}
        </ul>
        <div class="share-row">
          <button class="btn" id="shareBtn">Share result</button>
          <button class="btn ghost" id="reviewBtn">Review moves</button>
        </div>
        ${isToday ? `<div class="next">Next route in <b id="countdown"></b></div>` : `<div class="next"><a href="${location.pathname}">Back to today's route</a></div>`}
      </div>`;
    document.getElementById("shareBtn").addEventListener("click", share);
    document.getElementById("reviewBtn").addEventListener("click", () => { viewing = 0; renderReview(); });
    if (isToday) tick();
  }

  function renderReview() {
    renderResult(viewing);
    const btn = document.getElementById("nextBtn");
    btn.textContent = viewing < MOVES - 1 ? "Next move →" : "Back to summary";
    btn.replaceWith(btn.cloneNode(true));
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (viewing < MOVES - 1) { viewing++; renderReview(); } else { viewing = null; render(); }
    });
  }

  async function share() {
    const text = shareText();
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) { await navigator.share({ text }); return; }
      await navigator.clipboard.writeText(text);
      toast("Copied! Paste it in the family chat.");
    } catch { toast("Couldn't share — try again."); }
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function tick() {
    const out = document.getElementById("countdown");
    if (!out) return;
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const s = Math.max(0, Math.floor((next - now) / 1000));
    out.textContent = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");
    if (s === 0) return location.reload();
    setTimeout(tick, 1000);
  }

  // ---------- stats ----------
  function recordStats() {
    if (!isToday) return;
    const s = store.get("crux-stats", { played: 0, streak: 0, best: 0, lastDay: null });
    if (s.lastDay === day) return;
    s.streak = s.lastDay === day - 1 ? s.streak + 1 : 1;
    s.played++; s.best = Math.max(s.best, height()); s.lastDay = day;
    store.set("crux-stats", s);
    showStats();
  }
  function showStats() {
    const s = store.get("crux-stats", null);
    document.getElementById("stats").textContent = s
      ? `streak ${s.lastDay >= today - 1 ? s.streak : 0} · best ${s.best.toLocaleString()} m`
      : "your first climb!";
  }

  // ---------- boot ----------
  document.getElementById("crag").innerHTML = `
    <div><span class="where">Today's crag</span><b>${esc(crag[0])}</b><span class="where">${esc(crag[1])}</span></div>
    <div class="num">Route #${day + 1}</div>`;
  const help = document.getElementById("help");
  document.getElementById("helpBtn").addEventListener("click", () => help.showModal());
  if (!store.get("crux-seen-help", false)) { store.set("crux-seen-help", true); help.showModal(); }
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => drawWall(false));
  showStats();
  render();
})();
