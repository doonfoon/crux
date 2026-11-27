// CRUX — the map reveal: after each move, show where every right answer is.
(() => {
  const CDN = "https://cdn.jsdelivr.net/npm/";
  const LIBS = [CDN + "d3-array@3.2.4/dist/d3-array.min.js", CDN + "d3-geo@3.1.1/dist/d3-geo.min.js", CDN + "topojson-client@3.1.0/dist/topojson-client.min.js"];
  const WORLD_URL = CDN + "world-atlas@2.0.2/countries-110m.json";
  const US_URL = CDN + "us-atlas@3.0.1/states-10m.json";
  const W = 360, H = 200;
  const TIER_VAR = ["--jug", "--sloper", "--crimp", "--chip"];

  // Our answer names → the names the world atlas uses.
  const FIX = {
    "united states": "united states of america", "democratic republic of the congo": "dem rep congo", "republic of the congo": "congo",
    "central african republic": "central african rep", "bosnia and herzegovina": "bosnia and herz", "dominican republic": "dominican rep",
    "equatorial guinea": "eq guinea", "south sudan": "s sudan", "solomon islands": "solomon is", "eswatini": "eswatini",
    "east timor": "timor leste", "western sahara": "w sahara", "north macedonia": "macedonia", "czechia": "czechia",
    "ivory coast": "cote d ivoire", "cote divoire": "cote d ivoire", "palestine": "palestine", "falkland islands": "falkland is",
  };

  let libsP, worldP, usP;
  const loadScript = (src) => new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
  const libs = () => (libsP ||= LIBS.reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve()));
  const world = () => (worldP ||= libs().then(() => fetch(WORLD_URL)).then((r) => r.json()).then((t) => topojson.feature(t, t.objects.countries).features));
  const usa = () => (usP ||= libs().then(() => fetch(US_URL)).then((r) => r.json()).then((t) => topojson.feature(t, t.objects.states).features));

  // Start downloading quietly in the background so the first map is instant.
  function warm() { setTimeout(() => { world().catch(() => {}); }, 1500); }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  async function render(box, { entries, mode, you, norm, geo }) {
    box.innerHTML = `<div class="map-head"><span class="eyebrow">Where the holds are</span><span class="map-label" aria-live="polite"></span></div>
      <div class="map-frame loading"><div class="map-shimmer"></div></div>`;
    const frame = box.querySelector(".map-frame"), label = box.querySelector(".map-label");
    let feats;
    try { feats = mode === "us" ? await usa() : await world(); }
    catch { box.remove(); return; }
    if (!box.isConnected) return;

    const index = new Map(feats.map((f) => [norm(f.properties.name), f]));
    const marks = [];
    entries.forEach((e) => {
      let f = null, pt = null;
      if (mode !== "points") for (const k of e.keys) { const kk = FIX[k] || k; if (index.has(kk)) { f = index.get(kk); break; } }
      if (!f) for (const k of e.keys) { if (geo[k]) { pt = geo[k]; break; } }
      if (f || pt) marks.push({ e, f, pt, you: e.display === you });
    });
    if (!marks.length) { box.remove(); return; }

    // Pick a projection that frames the right answers.
    let proj;
    if (mode === "us") {
      proj = d3.geoAlbersUsa().fitExtent([[8, 8], [W - 8, H - 8]], { type: "FeatureCollection", features: feats });
    } else {
      const focus = { type: "FeatureCollection", features: marks.map((m) => m.f || { type: "Feature", geometry: { type: "Point", coordinates: [m.pt[1], m.pt[0]] } }) };
      let [[w, s], [e, n]] = d3.geoBounds(focus);
      if (w > e || e - w > 200) {
        proj = d3.geoNaturalEarth1().fitExtent([[6, 6], [W - 6, H - 6]], { type: "Sphere" });
      } else {
        const cx = (w + e) / 2, cy = (s + n) / 2;
        let dx = Math.max(e - w, 26) * 0.62, dy = Math.max(n - s, 16) * 0.62;
        if (dx / dy < 1.8) dx = dy * 1.8; // keep the map wide
        const box2 = { type: "MultiPoint", coordinates: [[cx - dx, Math.max(-85, cy - dy)], [cx + dx, Math.max(-85, cy - dy)], [cx + dx, Math.min(85, cy + dy)], [cx - dx, Math.min(85, cy + dy)], [cx, Math.min(85, cy + dy)], [cx, Math.max(-85, cy - dy)]] };
        proj = d3.geoNaturalEarth1().rotate([-cx, 0]).fitExtent([[0, 0], [W, H]], box2);
      }
    }
    const path = d3.geoPath(proj);
    const order = marks.slice().sort((a, b) => (a.you - b.you) || (a.e.tier - b.e.tier)); // your answer drawn on top
    const step = Math.min(0.05, 0.9 / order.length);
    let svg = `<svg viewBox="0 0 ${W} ${H}" class="map-svg" role="img" aria-label="Map of the right answers">
      <rect width="${W}" height="${H}" class="map-sea"/>`;
    if (mode !== "us") svg += `<path d="${path(d3.geoGraticule10())}" class="map-grat"/>`;
    svg += `<g class="map-land">${feats.map((f) => { const d = path(f); return d ? `<path d="${d}"/>` : ""; }).join("")}</g><g class="map-hits">`;
    const dots = [];
    order.forEach((m, i) => {
      const color = `var(${TIER_VAR[m.e.tier]})`, delay = `${(0.15 + i * step).toFixed(2)}s`;
      const tag = `data-name="${esc(m.e.display)}" data-tier="${m.e.tier}" style="--c:${color};--d:${delay}"`;
      if (m.f) {
        const d = path(m.f);
        if (!d) return;
        svg += `<path d="${d}" class="hit${m.you ? " you" : ""}" ${tag}><title>${esc(m.e.display)}</title></path>`;
        if (path.area(m.f) < 14) { const [x, y] = path.centroid(m.f); if (isFinite(x)) dots.push({ x, y, m, tag }); }
      } else {
        const p = proj([m.pt[1], m.pt[0]]);
        if (p) dots.push({ x: p[0], y: p[1], m, tag });
      }
    });
    dots.forEach(({ x, y, m, tag }) => {
      svg += `<g class="dot${m.you ? " you" : ""}" ${tag} transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><title>${esc(m.e.display)}</title>
        ${m.you ? `<circle r="9" class="dot-ring"/>` : ""}<circle r="${m.you ? 4.6 : 3.4}" class="dot-core"/></g>`;
    });
    svg += `</g></svg>`;
    const counts = [0, 0, 0, 0];
    marks.forEach((m) => counts[m.e.tier]++);
    frame.classList.remove("loading");
    frame.innerHTML = svg;
    box.insertAdjacentHTML("beforeend", `<div class="map-legend">${["Jug", "Sloper", "Crimp", "Foot Chip"].map((n, t) => counts[t] ? `<span><i style="background:var(${TIER_VAR[t]})"></i>${n}</span>` : "").join("")}${you ? `<span class="leg-you"><i></i>Your answer</span>` : ""}</div>`);

    // Tap or hover a place to see its name.
    const show = (el) => { label.textContent = el ? el.dataset.name : ""; label.style.color = el ? `var(${TIER_VAR[el.dataset.tier]})` : ""; };
    frame.querySelectorAll("[data-name]").forEach((el) => {
      el.addEventListener("pointerenter", () => show(el));
      el.addEventListener("click", () => show(el));
    });
    frame.addEventListener("pointerleave", () => show(null));
  }

  window.MapReveal = { render, warm };
})();
