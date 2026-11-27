// CRUX — daily geography climb.
(() => {
  const ROUTE_LEN = 5; // questions per route (route #1 had 7)
  const SECONDS = 30; // time allowed per question
  const HOLDS = [
    { name: "Jug", m: 100, emoji: "🟩", title: "Clean grab!", blurb: "A big, friendly hold — a solid, popular answer.", delay: 0.5 },
    { name: "Sloper", m: 200, emoji: "🟦", title: "Smooth move!", blurb: "Nice — a step off the beaten path.", delay: 0.75 },
    { name: "Crimp", m: 300, emoji: "🟧", title: "Crimped it!", blurb: "Not many climbers find this one.", delay: 0.95 },
    { name: "Foot Chip", m: 400, emoji: "🟪", title: "Crux move!", blurb: "A tiny hold almost nobody spots. Legendary.", delay: 1.9 },
  ];
  const SLIP = { emoji: "⬛" };
  // Ranks are a share of the summit height, so they work for any route length.
  const RANK_NAMES = [[0, "Bum"], [0.2, "Weekend Warrior"], [0.35, "Crag Rat"], [0.5, "Crusher"],
    [0.65, "Sender"], [0.8, "Legend"], [1, "Summit Seeker"]];

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
  const MOVES = day === 0 ? 7 : ROUTE_LEN;           // route #1 was a 7-question route
  const MAX_M = MOVES * HOLDS[3].m;                  // summit = a Foot Chip on every move
  const RANKS = RANK_NAMES.map(([f, n]) => [Math.round((f * MAX_M) / 100) * 100, n]);

  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffled(arr, seed) {
    const a = arr.slice(), r = rng(seed);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  // ---------- the daily schedule ----------
  // Every question gets a topic, so one day never has two of the same kind (e.g. two Olympics questions).
  function topicOf(q) {
    const t = q.q;
    if (/Olympics/.test(t)) return "olympics";
    if (/capital/i.test(t)) return "capitals";
    if (/\bstarts with\b|\bstarts and ends\b|\bends in\b|\bends with\b|letters long|in its name/.test(t)) return "wordplay";
    if (/US state|New England|Four Corners/.test(t)) return "us-states";
    if (/borders|land border|touches only|touches Colorado/.test(t)) return "borders";
    if (/\blanguages?\b|\bspeak\b|\bspoken\b/.test(t)) return "languages";
    if (/Equator|Tropic|Arctic Circle|Prime Meridian/.test(t)) return "lines";
    if (/\briver\b/i.test(t)) return "rivers";
    if (/coastline|shoreline|\bsea\b|Gulf|\bocean/i.test(t)) return "seas";
    if (/mountain|Alps|Andes|Himalayas|Summits/i.test(t)) return "mountains";
    if (/\blakes?\b/i.test(t)) return "lakes";
    if (/^Name a country in |island country|Central America|Southeast Asia|Oceania|Nordic|continents/.test(t)) return "regions";
    if (/city in /.test(t)) return "cities";
    if (q.cat === "flag") return "flags";
    return t; // anything else is its own topic
  }
  const TOPIC = QUESTIONS.map(topicOf);
  // Two border questions "overlap" when one gives away an answer to the other (Kenya borders Ethiopia, and vice versa).
  let SUBJ, ANS; // filled in on first use (the name helpers are defined further down)
  const overlaps = (x, y) => {
    if (!SUBJ) {
      SUBJ = QUESTIONS.map((q) => { const m = q.q.match(/(?:borders|land border with) (?:the )?([^.(]+?)\s*[.(]/); return m ? norm(m[1]) : null; });
      ANS = QUESTIONS.map((q) => new Set(entries(q).flatMap((e) => e.keys)));
    }
    return (SUBJ[x] && ANS[y].has(SUBJ[x])) || (SUBJ[y] && ANS[x].has(SUBJ[y]));
  };
  const CAP = { borders: 2 }; // borders is a big topic and may appear twice a day; everything else once

  // Route #1 was already being played when this schedule was introduced, so it is kept exactly as it was.
  const ROUTE1 = ["Name a US state that starts with the letter I.", "Name a country that borders Chile.", "Name a river in South America.",
    "Name a New England state.", "Name a country that borders Nigeria.", "Name a country whose flag has stars on a blue background.",
    "Name a US state that borders Canada."].map((t) => QUESTIONS.findIndex((q) => q.q === t)).filter((i) => i >= 0);

  // Walk day by day from route #1. Each category is a queue that is used up completely, in a shuffled order,
  // before any question comes back. A question that would clash with today's topics just waits for a later day.
  function buildSchedule(lastDay) {
    const pools = { flag: [], nature: [], city: [], other: [] };
    QUESTIONS.forEach((q, i) => (pools[q.cat] || pools.other).push(i));
    const queues = {}, rounds = {};
    for (const c in pools) { rounds[c] = 0; queues[c] = shuffled(pools[c], 9100 + c.length * 31); }
    const refill = (c) => { rounds[c]++; queues[c].push(...shuffled(pools[c], 9100 + c.length * 31 + rounds[c] * 977)); };
    // Priority: an unused question with a fresh topic → an unused question (even if the topic repeats)
    // → only then start the next round. So nothing repeats until its whole category has been used.
    const take = (c, picked, count) => {
      const room = (x, extra) => !picked.includes(x) && (count[TOPIC[x]] || 0) < (CAP[TOPIC[x]] || 1) + extra;
      for (let pass = 0; pass < 3; pass++) {
        const q = queues[c];
        let i = q.findIndex((x) => room(x, 0) && !picked.some((y) => overlaps(x, y))); // fresh topic, no giveaways
        if (i < 0) i = q.findIndex((x) => room(x, 0));  // fresh topic (an overlap beats a repeat)
        if (i < 0) i = q.findIndex((x) => room(x, 1)); // at most one extra of a topic
        if (i >= 0) return q.splice(i, 1)[0];
        refill(c);
      }
      const q = queues[c], i = q.findIndex((x) => !picked.includes(x));
      return i >= 0 ? q.splice(i, 1)[0] : null;
    };
    const used = (picked) => { const count = {}; picked.forEach((x) => { count[TOPIC[x]] = (count[TOPIC[x]] || 0) + 1; }); return count; };
    const days = [];
    // route #1: remove its questions from the queues
    ROUTE1.forEach((x) => { const c = pools[QUESTIONS[x].cat] ? QUESTIONS[x].cat : "other"; const q = queues[c]; q.splice(q.indexOf(x), 1); });
    days.push(ROUTE1);
    for (let d = 1; d <= lastDay; d++) {
      const r = rng(5000 + d), picked = [];
      // Many days (not all) get a flag, a nature and/or a city question for variety.
      ["flag", "nature", "city"].forEach((c) => {
        if (r() < 0.65) { const x = take(c, picked, used(picked)); if (x !== null) picked.push(x); }
      });
      while (picked.length < ROUTE_LEN) {
        const x = take("other", picked, used(picked));
        if (x === null) break;
        picked.push(x);
      }
      days.push(shuffled(picked, 777 + d));
    }
    return days;
  }
  function questionsForDay(d) { return d <= 0 ? ROUTE1 : buildSchedule(d)[d]; }
  const qIds = questionsForDay(day);
  const crag = CRAGS[((day % CRAGS.length) + CRAGS.length) % CRAGS.length];

  // ---------- answer matching ----------
  // (a function declaration, so the daily schedule built earlier in this file can use it too)
  function norm(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/&/g, " and ").replace(/\bst\.?\s/g, "st ").replace(/[^a-z0-9]+/g, " ").trim()
      .replace(/^the /, "");
  }
  const ALIAS = Object.fromEntries(Object.entries(ALIASES).map(([k, v]) => [norm(k), norm(v)]));
  const KNOWN = new Set(KNOWN_PLACES.map(norm));
  const GEO_N = Object.fromEntries(Object.entries(GEO).map(([k, v]) => [norm(k), v]));
  // "Lake Victoria" = "Victoria", "Mount Everest" = "Everest", "Sahara Desert" = "Sahara"…
  const PRE = /^(lake|mount|mt|mont|river|sea of|the) /;
  const SUF = / (river|desert|ocean|sea|lake|mountains|mountain range|range|falls|fall|waterfall|island|city|peak|massif)$/;
  const core = (s) => { let p; do { p = s; s = s.replace(PRE, "").replace(SUF, ""); } while (s !== p && s); return s || p; };

  // Typo distance: letters added, missing, changed, or two letters swapped ("Purtugal") each count as one.
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 9;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }
  // How many typos a name of this length can have and still count.
  const typoLimit = (len) => (len <= 3 ? 0 : len <= 5 ? 1 : len <= 9 ? 2 : 3);

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
    const c = core(n);
    const loose = list.find((e) => e.keys.some((k) => core(k) === c));
    if (loose) return { ...loose, fuzzy: false };
    // A real place that just isn't on this route — don't "auto-correct" it into a right answer.
    if (KNOWN.has(n) || (q.map === "points" && GEO_N[n])) return { tier: -1 };
    let best = null, bestD = 99;
    for (const e of list) for (const k of e.keys) {
      const limit = typoLimit(k.length);
      const d = Math.min(lev(n, k), lev(c, core(k)));
      if (d <= limit && d < bestD) { best = e; bestD = d; }
    }
    return best ? { ...best, fuzzy: true } : { tier: -1 };
  }

  // ---------- "why didn't that land?" notes ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const COUNTRY_SET = new Set(KNOWN_COUNTRIES.map(norm));
  const STATE_SET = new Set(KNOWN_STATES.map(norm));
  const plural = (s) => /(alps|andes|himalayas|mountains)$/i.test(s);

  function whyNot(q, input) {
    const n = ALIAS[norm(input)] || norm(input);
    const name = esc(input);
    const text = esc(q.q.replace(/\s*\([^)]*\)/g, "").replace(/\s+\.$/, "."));
    const wantsState = /US state/.test(text), wantsCountry = /\bcountr(y|ies)\b/.test(text);
    const lang = q.q.match(/^Name (?:an? |one of )(?:official )?language (?:spoken )?(?:in|of) (.+?)\.$/) || q.q.match(/^Name one of (.+?)'s (?:four )?official languages\.$/);
    if (lang) return `${name} isn't one of the main languages of ${esc(lang[1])}.`;
    const isCountry = COUNTRY_SET.has(n), isState = STATE_SET.has(n), isPlace = !!GEO_N[n];
    if (!isCountry && !isState && !isPlace) {
      return `We couldn't find “${name}” among the right answers. Check the spelling — or it may just not fit this one.`;
    }
    if (wantsState && isCountry && !isState) return `${name} is a country — this one wanted a US state!`;
    if (wantsCountry && isState && !isCountry) return `${name} is a US state — this one wanted a country!`;

    const a = (w) => (/^(eu|uni|us\b|use|one)/i.test(w) ? "a " : /^[aeiou]/i.test(w) ? "an " : "a ") + w;
    let m;
    if ((m = text.match(/with exactly one other country|touches only one other country/))) return `${name} touches more than one country.`;
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

  // ---------- state ----------
  const stateKey = `crux-route-${day + 1}`;
  let state = store.get(stateKey, { answers: [] }); // {input, display, tier, fuzzy, timeout}
  const height = (answers = state.answers) => answers.reduce((s, a) => s + (a.tier >= 0 ? HOLDS[a.tier].m : 0), 0);
  let viewing = null;     // index of the answer whose result card is showing
  let celebrate = false;  // play the finale when the summary first appears
  let timer = null;

  const play = document.getElementById("play");
  const iconFor = (a) => FX.holdIcon(a.timeout ? -2 : a.tier);
  const rankFor = (m) => RANKS.filter(([min]) => m >= min).pop()[1];

  // ---------- altimeter ----------
  const altEl = document.getElementById("altValue"), altBox = document.getElementById("alt");
  let altShown = 0;
  function setAlt(v) { altShown = v; altEl.textContent = v.toLocaleString(); }
  function countAlt(to, tier) {
    const from = altShown, t0 = performance.now(), dur = FX.reduced ? 1 : 900;
    altBox.style.setProperty("--pulse", `var(--${["jug", "sloper", "crimp", "chip"][tier]})`);
    altBox.classList.remove("bump"); void altBox.offsetWidth; altBox.classList.add("bump");
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      altEl.textContent = Math.round(from + (to - from) * e).toLocaleString();
      if (k < 1) requestAnimationFrame(step); else setAlt(to);
    };
    requestAnimationFrame(step);
  }

  // ---------- screens ----------
  function render() {
    Scene.drawRoute(Scene.points(state.answers));
    Scene.placeClimber(Scene.current());
    setAlt(height());
    if (viewing !== null) return renderResult(viewing, false);
    if (state.answers.length >= MOVES) return renderSummary();
    renderQuestion();
  }

  function pips(current) {
    return `<div class="pips" aria-hidden="true">${Array.from({ length: MOVES }, (_, i) => {
      const a = state.answers[i];
      if (a) return `<i class="pip ${a.tier >= 0 ? "t" + a.tier : "tx"}"></i>`;
      return `<i class="pip ${i === current ? "now" : ""}"></i>`;
    }).join("")}</div>`;
  }

  function renderQuestion() {
    const i = state.answers.length;
    const q = QUESTIONS[qIds[i]];
    // Don't start the clock while the "How to climb" screen is still open.
    const helpBox = document.getElementById("help");
    if (helpBox.open && !state.clock) {
      play.innerHTML = `<div class="card q-card"><div class="eyebrow">Move ${i + 1} of ${MOVES}</div><h2 class="question">Ready when you are…</h2></div>`;
      helpBox.addEventListener("close", () => renderQuestion(), { once: true });
      return;
    }
    // The clock keeps running through a page refresh, so reloading can't buy extra time.
    if (!state.clock || state.clock.i !== i) { state.clock = { i, start: Date.now() }; store.set(stateKey, state); }
    const deadline = state.clock.start + SECONDS * 1000;
    play.innerHTML = `
      <div class="card q-card enter" id="qCard">
        <div class="q-head">
          <div>
            <div class="eyebrow">Move ${i + 1} of ${MOVES}</div>
            ${pips(i)}
          </div>
          <div class="ring" id="ring" role="timer" aria-label="Seconds left">
            <svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" id="ringFg" cx="24" cy="24" r="20" pathLength="100"/></svg>
            <span id="clockNum">${SECONDS}</span>
          </div>
        </div>
        <h2 class="question">${esc(q.q)}</h2>
        <form class="answer-row" id="answerForm" autocomplete="off">
          <input id="answer" type="text" placeholder="Type your answer…" autocapitalize="words" spellcheck="false" aria-label="Your answer" enterkeyhint="go">
          <button class="btn" type="submit">Climb <span aria-hidden="true">↑</span></button>
        </form>
        <div class="hint">One try · ${SECONDS} seconds · rarer right answers climb higher</div>
      </div>`;
    const input = document.getElementById("answer");
    if (matchMedia("(hover: hover)").matches) input.focus();

    const finish = (raw, timedOut) => {
      clearInterval(timer); timer = null;
      SFX.play(timedOut ? "buzzer" : "submit");
      const r = timedOut ? { tier: -1 } : judge(q, raw);
      state.answers.push({ input: raw, display: r.display || raw, tier: r.tier, fuzzy: !!r.fuzzy, timeout: timedOut });
      delete state.clock;
      store.set(stateKey, state);
      if (state.answers.length === MOVES) { recordStats(); celebrate = true; }
      viewing = state.answers.length - 1;
      const pts = Scene.points(state.answers);
      renderResult(viewing, true);
      Scene.playMove(pts, () => { if (r.tier >= 0) countAlt(height(), r.tier); });
    };

    const ring = document.getElementById("ring"), fg = document.getElementById("ringFg"), num = document.getElementById("clockNum"), card = document.getElementById("qCard");
    let lastSecs = null;
    const tickClock = () => {
      const left = Math.max(0, deadline - Date.now());
      const secs = Math.ceil(left / 1000);
      fg.style.strokeDashoffset = (100 * (1 - left / (SECONDS * 1000))).toFixed(2);
      if (secs !== lastSecs) {
        lastSecs = secs;
        num.textContent = secs;
        ring.classList.toggle("mid", secs <= 15 && secs > 10);
        ring.classList.toggle("urgent", secs <= 10);
        card.classList.toggle("urgent", secs <= 10);
        if (secs <= 5 && secs > 0 && !FX.reduced) num.animate([{ transform: "scale(1.35)" }, { transform: "scale(1)" }], { duration: 300, easing: "ease-out" });
        if (secs <= 5 && secs > 0 && left < SECONDS * 1000 - 500) SFX.play("tick", secs <= 2);
      }
      if (left <= 0) finish(input.value.trim(), true);
    };
    clearInterval(timer);
    timer = setInterval(tickClock, 100);
    tickClock();

    document.getElementById("answerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = input.value.trim();
      if (!raw) { input.focus(); if (!FX.reduced) input.animate([{ transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "none" }], { duration: 220 }); return; }
      finish(raw, false);
    });
  }

  function holdList(q, you) {
    return q.a.map((group, t) => group.length ? `
      <div class="hold-group t${t}">
        ${FX.holdIcon(t, "hold-icon sm")}
        <div>
          <div class="hg-label">${HOLDS[t].name} <span>+${HOLDS[t].m} m</span></div>
          <div class="hg-names">${group.map((a) => {
            const name = Array.isArray(a) ? a[0] : a;
            return name === you ? `<mark>${esc(name)}</mark>` : esc(name);
          }).join(", ")}</div>
        </div>
      </div>` : "").join("");
  }

  function meter(t) {
    return `<div class="meter" aria-label="Rarity: ${HOLDS[t].name}">
      <span class="meter-k">Rarity</span>
      <div class="segs">${HOLDS.map((_, k) => `<i class="${k <= t ? "on t" + k : ""}" style="--k:${k}"></i>`).join("")}</div>
      <span class="meter-v">${["Common", "Uncommon", "Rare", "Ultra rare"][t]}</span>
    </div>`;
  }

  function renderResult(i, fresh) {
    const a = state.answers[i];
    const q = QUESTIONS[qIds[i]];
    const hit = a.tier >= 0;
    const h = hit ? HOLDS[a.tier] : null;
    const last = i === MOVES - 1;
    const delay = fresh && !FX.reduced ? (hit ? h.delay : 0.55) : 0;
    const kind = hit ? `t${a.tier}` : a.timeout ? "tt" : "tx";
    play.innerHTML = `
      <div class="card r-card enter ${kind}" style="--delay:${delay}s">
        <div class="banner ${kind}">
          <div class="banner-icon">${iconFor(a)}</div>
          <div class="banner-text">
            <div class="banner-title">${hit ? h.title : a.timeout ? "Time's up!" : "Slip!"}</div>
            <div class="banner-sub">${hit ? `${h.name} · +${h.m} m` : "+0 m · the rope caught you"}</div>
          </div>
          ${a.tier === 3 ? `<div class="banner-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>` : ""}
        </div>
        <div class="r-body">
          <div class="eyebrow">Move ${i + 1} of ${MOVES}</div>
          <p class="r-q">${esc(q.q)}</p>
          ${hit ? `
            <div class="r-answer">${esc(a.display)}</div>
            ${a.fuzzy ? `<div class="r-note">We read “${esc(a.input)}” as ${esc(a.display)}.</div>` : ""}
            <p class="r-blurb">${h.blurb}</p>
            ${meter(a.tier)}`
          : a.timeout ? `
            <p class="r-blurb">${a.input ? `You were typing “${esc(a.input)}” when the clock ran out.` : "The clock ran out before you grabbed a hold."} Keep climbing!</p>`
          : `
            <div class="r-answer struck">${esc(a.input)}</div>
            <p class="r-blurb">${whyNot(q, a.input)}</p>`}
          ${mapMode(q) !== "none" ? `<div class="map-box" id="mapBox"></div>` : ""}
          <details class="holds">
            <summary>See every hold on this move</summary>
            <div class="hold-list">${holdList(q, hit ? a.display : null)}</div>
          </details>
          <button class="btn wide" id="nextBtn">${last ? "See your climb" : "Next move"} <span aria-hidden="true">→</span></button>
        </div>
      </div>`;
    document.getElementById("nextBtn").addEventListener("click", () => { SFX.play("click"); viewing = null; render(); });
    const mapBox = document.getElementById("mapBox");
    if (mapBox) MapReveal.render(mapBox, { entries: entries(q), mode: mapMode(q), you: hit ? a.display : null, norm, geo: GEO_N });
  }

  function mapMode(q) {
    if (q.map === "none") return "none";
    if (/US state/.test(q.q)) return "us";
    return q.map || "world";
  }

  function badge(m) {
    const pct = Math.round((m / MAX_M) * 100);
    return `<svg class="badge" viewBox="0 0 160 160" aria-hidden="true">
      <defs><linearGradient id="badgeG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--accent-2)"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs>
      <circle cx="80" cy="80" r="74" class="badge-track"/>
      <circle cx="80" cy="80" r="74" class="badge-arc" pathLength="100" style="--pct:${pct}" transform="rotate(-90 80 80)"/>
      <circle cx="80" cy="80" r="62" fill="url(#badgeG)"/>
      <circle cx="80" cy="80" r="55" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.2" stroke-dasharray="1.5 4"/>
      <path d="M58 64 L70 46 L76 54 L82 46 L102 64 Z" fill="#fff" opacity=".95"/>
      <path d="M70 46 L73 51 L70 53 L67 51 Z" fill="var(--accent)" opacity=".5"/>
      <text x="80" y="94" text-anchor="middle" class="badge-num">${m.toLocaleString()}</text>
      <text x="80" y="111" text-anchor="middle" class="badge-unit">METERS</text>
    </svg>`;
  }

  function renderSummary() {
    const m = height();
    const counts = [0, 0, 0, 0], slips = state.answers.filter((a) => a.tier < 0).length;
    state.answers.forEach((a) => { if (a.tier >= 0) counts[a.tier]++; });
    play.innerHTML = `
      <div class="card summary enter">
        <div class="sum-head">
          <span class="eyebrow">Route #${day + 1} · ${esc(crag.name)}</span>
          ${isToday ? `<span class="tag">Sent</span>` : `<span class="tag ghosty">Practice</span>`}
        </div>
        <div class="badge-wrap">${badge(m)}</div>
        <div class="rank">${rankFor(m)}</div>
        <div class="rank-sub">${m >= MAX_M ? "You topped out — a perfect climb!" : `${(MAX_M - m).toLocaleString()} m short of the summit`}</div>
        <div class="strip" aria-label="Your route">${state.answers.map((a, i) => `<div class="cell ${a.tier >= 0 ? "t" + a.tier : "tx"}" style="--i:${i}">${iconFor(a)}</div>`).join("")}</div>
        <div class="counts">
          ${HOLDS.map((h, t) => `<div class="count t${t}">${FX.holdIcon(t, "hold-icon sm")}<b>×${counts[t]}</b><span>${h.name}</span></div>`).join("")}
        </div>
        <details class="holds moves">
          <summary>Your moves${slips ? ` · ${slips} slip${slips > 1 ? "s" : ""}` : ""}</summary>
          <ul class="route-list">
            ${state.answers.map((a, i) => `
              <li>
                ${iconFor(a).replace('class="hold-icon"', 'class="hold-icon xs"')}
                <span class="q">${esc(QUESTIONS[qIds[i]].q)}</span>
                <span class="a ${a.tier < 0 ? "miss" : ""}">${a.timeout ? "out of time" : esc(a.tier >= 0 ? a.display : a.input)}</span>
              </li>`).join("")}
          </ul>
        </details>
        ${crag.fact ? `<div class="crag-fact"><span class="eyebrow">About ${esc(crag.name)}</span><p>${esc(crag.fact)}</p></div>` : ""}
        <div class="share-row">
          <button class="btn" id="shareBtn">Share result</button>
          <button class="btn ghost" id="reviewBtn">Review moves</button>
        </div>
        ${isToday ? `<div class="next">Next route in <b id="countdown"></b></div>` : `<div class="next"><a href="${location.pathname}">Back to today's route →</a></div>`}
      </div>`;
    document.getElementById("shareBtn").addEventListener("click", share);
    document.getElementById("reviewBtn").addEventListener("click", () => { viewing = 0; renderReview(); });
    if (isToday) tick();
    if (celebrate) {
      celebrate = false;
      if (m >= MAX_M) { FX.flash("#fff", 600); Scene.stamp("Summit!", "t3"); FX.confetti({ count: 220 }); SFX.play("summit"); }
      else if (m >= MAX_M * 0.5) { FX.confetti({ count: m >= MAX_M * 0.8 ? 170 : 90 }); SFX.play("finale"); }
      else SFX.play("finaleSmall");
    }
  }

  function renderReview() {
    renderResult(viewing, false);
    const btn = document.getElementById("nextBtn");
    btn.innerHTML = viewing < MOVES - 1 ? `Next move <span aria-hidden="true">→</span>` : "Back to summary";
    btn.replaceWith(btn.cloneNode(true));
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (viewing < MOVES - 1) { viewing++; renderReview(); } else { viewing = null; render(); }
    });
  }

  function shareText() {
    const m = height();
    return `CRUX #${day + 1} 🧗 ${crag.name}\n${state.answers.map((a) => a.tier >= 0 ? HOLDS[a.tier].emoji : SLIP.emoji).join("")}\n${m.toLocaleString()} m · ${rankFor(m)}\n${location.origin + location.pathname}`;
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
    setTimeout(() => t.remove(), 2400);
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
    const streak = s && s.lastDay >= today - 1 ? s.streak : 0;
    document.getElementById("streakNum").textContent = streak;
    document.getElementById("streak").classList.toggle("lit", streak > 0);
    document.getElementById("stats").textContent = s ? `Best climb ${s.best.toLocaleString()} m · ${s.played} route${s.played === 1 ? "" : "s"} climbed` : "Your first climb!";
  }

  // ---------- boot ----------
  const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(1)}° ${v >= 0 ? pos : neg}`;
  document.getElementById("crag").innerHTML = `
    <div class="sign-main">
      <div class="eyebrow"><svg viewBox="0 0 24 24" class="pin" aria-hidden="true"><path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/></svg>Today's crag</div>
      <div class="sign-name">${esc(crag.name)}</div>
      <div class="sign-where">${esc(crag.where)}</div>
      <div class="sign-meta"><span class="pill">${esc(crag.rock)}</span><span class="coords">${fmt(crag.lat, "N", "S")} · ${fmt(crag.lon, "E", "W")}</span></div>
      ${crag.fact ? `<details class="sign-fact"><summary>Fun fact</summary><p>${esc(crag.fact)}</p></details>` : ""}
    </div>
    <div class="sign-route"><span>Route</span><b>#${day + 1}</b></div>`;
  document.querySelectorAll("[data-hold]").forEach((n) => { n.innerHTML = FX.holdIcon(Number(n.dataset.hold)); });
  FX.topo();
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => FX.topo());
  Scene.init({
    svg: document.getElementById("wall"), wrap: document.getElementById("sceneWrap"),
    stamp: document.getElementById("stamp"), crag, maxM: MAX_M, seed: day + 1,
  });
  const help = document.getElementById("help");
  document.getElementById("helpBtn").addEventListener("click", () => { SFX.play("click"); help.showModal(); });
  const soundBtn = document.getElementById("soundBtn");
  const paintSound = () => {
    soundBtn.classList.toggle("off", !SFX.on);
    soundBtn.setAttribute("aria-pressed", String(SFX.on));
    soundBtn.setAttribute("aria-label", SFX.on ? "Sound on — tap to mute" : "Sound off — tap to turn on");
    soundBtn.title = SFX.on ? "Mute sounds" : "Turn sounds on";
  };
  soundBtn.addEventListener("click", () => { SFX.setOn(!SFX.on); paintSound(); });
  paintSound();
  if (!store.get("crux-seen-help", false)) { store.set("crux-seen-help", true); help.showModal(); }
  showStats();
  render();
  MapReveal.warm();
})();
