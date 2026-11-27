// CRUX — visual effects: particle bursts, confetti, flashes, hold artwork, topo background.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = ([a, b]) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ---------- particle canvas (sits over everything, never blocks taps) ----------
  const cv = document.createElement("canvas");
  cv.className = "fx-canvas";
  cv.setAttribute("aria-hidden", "true");
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  const parts = [];
  let running = false, last = 0;
  function spawn(p) {
    parts.push(p);
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); }
  }
  function starPath(c, s) {
    const r = s / 2, r2 = r * 0.36;
    c.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 - Math.PI / 2, rr = i % 2 ? r2 : r;
      c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    c.closePath();
    c.fill();
  }
  function loop(t) {
    const dt = Math.min(0.033, (t - last) / 1000);
    last = t;
    ctx.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.age += dt;
      if (p.age >= p.life) { parts.splice(i, 1); continue; }
      const drag = Math.pow(p.drag, dt * 60);
      p.vx *= drag;
      p.vy = p.vy * drag + p.g * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      const k = p.age / p.life;
      ctx.globalAlpha = p.fade ? Math.max(0, 1 - k * k) : 1 - Math.max(0, (k - 0.8) / 0.2);
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      const s = p.grow ? p.size * (1 + k * p.grow) : p.size;
      if (p.shape === "rect") {
        const h = (s / 2) * (0.25 + 0.75 * Math.abs(Math.cos(p.age * p.flip)));
        ctx.fillRect(-s / 2, -h / 2, s, h);
      } else if (p.shape === "star") {
        starPath(ctx, s);
      } else {
        ctx.beginPath(); ctx.arc(0, 0, s / 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (parts.length) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, W, H); }
  }

  function burst(x, y, o = {}) {
    let n = o.count || 20;
    if (reduced) n = Math.ceil(n / 5);
    for (let i = 0; i < n; i++) {
      const ang = (o.angle ?? -Math.PI / 2) + (Math.random() - 0.5) * (o.spread ?? Math.PI * 2);
      const sp = rand(o.speed || [80, 240]);
      spawn({
        x: x + (o.jitter ? (Math.random() - 0.5) * o.jitter : 0),
        y: y + (o.jitter ? (Math.random() - 0.5) * o.jitter : 0),
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
        g: o.g ?? 300, drag: o.drag ?? 0.96,
        life: rand(o.life || [0.6, 1.2]), age: 0,
        size: rand(o.size || [3, 6]), color: pick(o.colors || ["#fff"]),
        shape: pick(o.shapes || ["circle"]),
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * (o.spin ?? 8),
        grow: o.grow || 0, fade: o.fade ?? true, flip: 4 + Math.random() * 9,
      });
    }
  }

  function confetti(o = {}) {
    const colors = o.colors || ["#a855f7", "#ffc53d", "#ff5a36", "#3b82f6", "#1fae74", "#ffffff"];
    const n = reduced ? 16 : (o.count || 140);
    for (let i = 0; i < n; i++) {
      const left = i % 2 === 0;
      spawn({
        x: left ? -10 : W + 10, y: H * (0.55 + Math.random() * 0.3),
        vx: (left ? 1 : -1) * rand([220, 620]) * (W / 900 + 0.5), vy: -rand([520, 980]),
        g: 760, drag: 0.985, life: rand([2.2, 3.6]), age: 0,
        size: rand([7, 12]), color: pick(colors), shape: pick(["rect", "rect", "rect", "star"]),
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 14, fade: false, flip: 4 + Math.random() * 8,
      });
    }
  }

  function flash(color = "#fff", ms = 520) {
    if (reduced) return;
    const d = document.createElement("div");
    d.className = "flash";
    d.style.background = color;
    d.style.animationDuration = ms + "ms";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), ms + 50);
  }

  function vibrate(pattern) { try { navigator.vibrate && navigator.vibrate(pattern); } catch {} }

  // ---------- hold artwork (48 × 40 drawings, shared by the wall and the cards) ----------
  const sparkle = (cx, cy, r) =>
    `M${cx} ${cy - r} L${cx + r * 0.3} ${cy - r * 0.3} L${cx + r} ${cy} L${cx + r * 0.3} ${cy + r * 0.3} L${cx} ${cy + r} L${cx - r * 0.3} ${cy + r * 0.3} L${cx - r} ${cy} L${cx - r * 0.3} ${cy - r * 0.3}Z`;
  const HOLD_ART = {
    // Jug: a big friendly bucket with a deep pocket
    0: `<path d="M5 24C3 12 12 5 24 5s21 7 19 19c-2 9-10 13-19 13S7 33 5 24Z" style="fill:var(--jug)"/>
        <path d="M5 24c2 9 10 13 19 13s17-4 19-13c-4 7-11 10-19 10S9 31 5 24Z" fill="rgba(0,0,0,.18)"/>
        <path d="M11 21C13 12 35 12 37 21c-6-4-20-4-26 0Z" fill="rgba(0,0,0,.42)"/>
        <path d="M11 13c3-4 8-6 13-6" stroke="rgba(255,255,255,.6)" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <circle cx="24" cy="28" r="2.5" fill="rgba(0,0,0,.32)"/>`,
    // Sloper: a smooth, round dome with nothing to grab
    1: `<path d="M3 34C5 17 15 8 24 8s19 9 21 26Z" style="fill:var(--sloper)"/>
        <path d="M3 34c3-6 10-9 21-9s18 3 21 9Z" fill="rgba(0,0,0,.18)"/>
        <ellipse cx="17" cy="17" rx="7.5" ry="3.4" fill="rgba(255,255,255,.5)" transform="rotate(-24 17 17)"/>
        <circle cx="24" cy="25" r="2.5" fill="rgba(0,0,0,.3)"/>`,
    // Crimp: a thin, sharp edge
    2: `<path d="M3 26L41 17c5-1 6 4 3 6L8 34c-5 1-8-6-5-8Z" style="fill:var(--crimp)"/>
        <path d="M8 34l36-11c-1 2-2 3-4 4L10 36c-1 0-2-1-2-2Z" fill="rgba(0,0,0,.2)"/>
        <path d="M6 25.5L40 18" stroke="rgba(255,255,255,.65)" stroke-width="2" stroke-linecap="round"/>
        <circle cx="24" cy="25.5" r="2.1" fill="rgba(0,0,0,.32)"/>`,
    // Foot chip: a tiny nubbin that sparkles
    3: `<path d="M16 29l7-7 9 2 1 7-12 2Z" style="fill:var(--chip)"/>
        <path d="M21 33l12-2-1-7 1 7c-3 2-8 3-12 2Z" fill="rgba(0,0,0,.25)"/>
        <path d="M18.5 28l4.5-4.4 7.5 1.6" stroke="rgba(255,255,255,.7)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="${sparkle(10, 12, 6)}" style="fill:var(--gold)"/>
        <path d="${sparkle(38, 9, 4)}" style="fill:var(--gold)"/>
        <path d="${sparkle(41, 29, 3)}" style="fill:var(--gold)" opacity=".85"/>`,
    // Slip: crumbling rock
    "-1": `<path d="M12 12l9-3 3 8-9 3Z" style="fill:var(--slip)"/>
        <path d="M27 18l7-1 1 7-6 1Z" style="fill:var(--slip)" opacity=".8"/>
        <path d="M17 26l5-1 1 5-5 1Z" style="fill:var(--slip)" opacity=".6"/>
        <path d="M37 6l-4 6M42 10l-5 4M8 30l3-2" stroke="var(--slip)" stroke-width="2" stroke-linecap="round" opacity=".7"/>`,
    // Out of time: stopwatch
    "-2": `<circle cx="24" cy="23" r="13" fill="none" stroke="var(--danger)" stroke-width="3.4"/>
        <path d="M24 23V15M24 23l5 3" stroke="var(--danger)" stroke-width="3" stroke-linecap="round"/>
        <path d="M20 6h8M24 6v4M35 11l3-3" stroke="var(--danger)" stroke-width="3" stroke-linecap="round"/>`,
  };
  const holdInner = (t) => HOLD_ART[t];
  const holdIcon = (t, cls = "hold-icon") =>
    `<svg class="${cls}" viewBox="0 0 48 40" aria-hidden="true">${HOLD_ART[t]}</svg>`;

  // ---------- topographic map background ----------
  function topo() {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    let s = 1234567;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const w = 1400, h = 1400;
    let thin = "", thick = "";
    [[260, 320, 1.0], [1080, 470, 0.85], [640, 1150, 1.1], [1300, 1250, 0.6]].forEach(([cx, cy, sc]) => {
      const ph = [r() * 6, r() * 6, r() * 6];
      for (let k = 1; k <= 12; k++) {
        const base = k * 34 * sc;
        let d = "";
        for (let j = 0; j <= 80; j++) {
          const th = (j / 80) * Math.PI * 2;
          const rr = base + (10 + k * 2.4) * Math.sin(3 * th + ph[0]) + (6 + k * 1.6) * Math.sin(5 * th + ph[1] + k * 0.18) + 5 * Math.sin(2 * th + ph[2]);
          d += (j ? "L" : "M") + (cx + rr * Math.cos(th)).toFixed(1) + " " + (cy + rr * Math.sin(th) * 0.82).toFixed(1);
        }
        if (k % 4 === 0) thick += `<path d="${d}Z"/>`; else thin += `<path d="${d}Z"/>`;
      }
    });
    const c = dark ? "rgba(255,255,255,0.05)" : "rgba(120,92,52,0.11)";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='xMidYMid slice'><g fill='none' stroke='${c}'><g stroke-width='1.2'>${thin}</g><g stroke-width='2.4'>${thick}</g></g></svg>`;
    document.body.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  window.FX = { reduced, burst, confetti, flash, vibrate, holdIcon, holdInner, topo };
})();
