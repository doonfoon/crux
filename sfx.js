// CRUX — sound effects, synthesized live with the Web Audio API (no sound files needed).
(() => {
  let ctx = null, master = null, noiseBuf = null;
  let on = true;
  try { on = localStorage.getItem("crux-sound") !== "off"; } catch {}

  // Note frequencies (C major pentatonic-ish, so everything sounds happy together).
  const N = { C4: 261.6, G4: 392, A4: 440, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784, A5: 880, C6: 1046.5, D6: 1174.7, E6: 1318.5, G6: 1568, C7: 2093 };

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.55;
      const comp = ctx.createDynamicsCompressor(); // keeps big moments from clipping
      master.connect(comp); comp.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  // Browsers only allow sound after a tap, so wake the audio on the first one.
  ["pointerdown", "keydown"].forEach((ev) => addEventListener(ev, () => { if (on) audio(); }, { once: true, capture: true }));

  // ---------- building blocks ----------
  function tone({ f, to, type = "sine", at = 0, dur = 0.25, vol = 0.25, attack = 0.006, curve = "exp" }) {
    const t = ctx.currentTime + at;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    if (curve === "exp") g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    else g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function noise({ at = 0, dur = 0.15, vol = 0.2, type = "bandpass", f = 1200, to, q = 1, attack = 0.003 }) {
    const t = ctx.currentTime + at;
    const s = ctx.createBufferSource(), flt = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf;
    flt.type = type; flt.Q.value = q;
    flt.frequency.setValueAtTime(f, t);
    if (to) flt.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(flt); flt.connect(g); g.connect(master);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  }
  const bell = (f, at, vol = 0.12, dur = 0.9) => { tone({ f, at, dur, vol }); tone({ f: f * 2.01, at, dur: dur * 0.6, vol: vol * 0.35 }); tone({ f: f * 3.03, at, dur: dur * 0.3, vol: vol * 0.15 }); };
  const clink = (at = 0, vol = 0.13) => { tone({ f: 2630, at, dur: 0.16, vol, type: "triangle" }); tone({ f: 3970, at: at + 0.004, dur: 0.11, vol: vol * 0.6 }); tone({ f: 5210, at: at + 0.01, dur: 0.07, vol: vol * 0.3 }); };
  const chalk = (at = 0, vol = 0.35) => { noise({ at, dur: 0.09, vol, f: 1400, q: 0.8 }); noise({ at: at + 0.02, dur: 0.22, vol: vol * 0.35, type: "lowpass", f: 900 }); };
  const thud = (at = 0, vol = 0.45) => { tone({ f: 150, to: 45, at, dur: 0.22, vol }); noise({ at, dur: 0.08, vol: vol * 0.4, type: "lowpass", f: 400 }); };
  const sparks = (at, n, vol = 0.06) => { for (let i = 0; i < n; i++) tone({ f: 2500 + Math.random() * 3500, at: at + Math.random() * 0.35, dur: 0.05, vol, type: "square" }); };

  // ---------- the sounds ----------
  const SOUNDS = {
    click() { tone({ f: 900, to: 600, dur: 0.05, vol: 0.08, type: "triangle" }); },
    submit() { tone({ f: 520, to: 780, dur: 0.09, vol: 0.12, type: "triangle" }); },
    tick(urgent) { tone({ f: urgent ? 1500 : 1150, dur: 0.05, vol: urgent ? 0.14 : 0.09, type: "square" }); },
    buzzer() { tone({ f: 155, dur: 0.5, vol: 0.18, type: "sawtooth", curve: "lin" }); tone({ f: 160, dur: 0.5, vol: 0.12, type: "square", curve: "lin" }); },

    // Jug: chalky slap, carabiner clink, a friendly two-note chime
    jug() { chalk(0); clink(0.03); bell(N.C5, 0.06, 0.1, 0.5); bell(N.G5, 0.14, 0.1, 0.6); },
    // Sloper: a smooth whoosh into a gentle three-note chime
    sloper() {
      noise({ dur: 0.45, vol: 0.12, f: 500, to: 2500, q: 0.7 });
      clink(0.05, 0.1);
      bell(N.E5, 0.08, 0.1, 0.7); bell(N.G5, 0.18, 0.1, 0.7); bell(N.C6, 0.28, 0.11, 0.9);
    },
    // Crimp: crisp clink, a quick rising run, crackling sparks
    crimp() {
      clink(0, 0.16); chalk(0, 0.25);
      [N.C5, N.E5, N.G5, N.C6, N.E6].forEach((f, i) => tone({ f, at: 0.04 + i * 0.055, dur: 0.22, vol: 0.11, type: "triangle" }));
      sparks(0.05, 10);
      bell(N.G6, 0.32, 0.08, 0.6);
    },
    // Foot chip: the build-up while the climber crouches…
    riser() {
      noise({ dur: 1.4, vol: 0.14, f: 200, to: 3500, q: 2.5, attack: 1.2 });
      tone({ f: 110, to: 220, dur: 1.4, vol: 0.08, type: "sawtooth", attack: 1.2 });
    },
    // …and the big payoff when the hand lands
    chip() {
      thud(0, 0.3); clink(0, 0.18);
      noise({ dur: 0.6, vol: 0.18, type: "highpass", f: 4000 }); // cymbal-ish shimmer
      [N.C5, N.E5, N.G5, N.C6, N.E6, N.G6, N.C7].forEach((f, i) => tone({ f, at: 0.03 + i * 0.05, dur: 0.35, vol: 0.1, type: "triangle" }));
      [N.C4, N.G4, N.C5, N.E5].forEach((f) => tone({ f, at: 0.38, dur: 1.4, vol: 0.07, type: "sawtooth", attack: 0.02 }));
      [N.C6, N.E6, N.G6].forEach((f) => bell(f, 0.38, 0.08, 1.6));
      sparks(0.4, 18, 0.05);
    },
    // Slip: falling whistle, the rope catches, pebbles rattle down
    slip() {
      tone({ f: 900, to: 160, dur: 0.45, vol: 0.12, type: "triangle" });
      thud(0.32, 0.4);
      for (let i = 0; i < 7; i++) noise({ at: 0.35 + i * 0.07 + Math.random() * 0.04, dur: 0.04, vol: 0.12, f: 2500 + Math.random() * 2000, q: 4 });
    },
    // End of the route
    finaleSmall() { bell(N.C5, 0, 0.1, 0.6); bell(N.E5, 0.12, 0.1, 0.6); bell(N.G5, 0.24, 0.12, 1); },
    finale() {
      [N.C5, N.E5, N.G5].forEach((f, i) => tone({ f, at: i * 0.12, dur: 0.18, vol: 0.12, type: "triangle" }));
      [N.C5, N.E5, N.G5, N.C6].forEach((f) => tone({ f, at: 0.38, dur: 1.2, vol: 0.07, type: "triangle", attack: 0.02 }));
      bell(N.C6, 0.38, 0.1, 1.4); sparks(0.4, 10, 0.04);
    },
    summit() {
      [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => tone({ f, at: i * 0.13, dur: 0.2, vol: 0.13, type: "triangle" }));
      [N.C4, N.G4, N.C5, N.E5, N.G5].forEach((f) => tone({ f, at: 0.55, dur: 2.2, vol: 0.06, type: "sawtooth", attack: 0.03 }));
      [N.C6, N.E6, N.G6, N.C7].forEach((f, i) => bell(f, 0.55 + i * 0.12, 0.09, 1.8));
      noise({ at: 0.55, dur: 1, vol: 0.14, type: "highpass", f: 5000 });
      sparks(0.6, 24, 0.04);
    },
  };

  function play(name, arg) {
    if (!on || !SOUNDS[name]) return;
    if (!audio()) return;
    try { SOUNDS[name](arg); } catch {}
  }
  function setOn(v) {
    on = v;
    try { localStorage.setItem("crux-sound", v ? "on" : "off"); } catch {}
    if (v) { audio(); play("jug"); }
  }

  window.SFX = { play, setOn, get on() { return on; } };
})();
