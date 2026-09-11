/**
 * Lightweight UI sounds via Web Audio API (no audio files needed).
 */
window.ImpactSounds = (() => {
  let ctx = null;
  let enabled = true;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, duration, type = "sine", gain = 0.08, when = 0, slideTo = null) {
    const c = ensure();
    if (!c || !enabled) return;
    const t0 = c.currentTime + when;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo != null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t0 + duration);
    }
    const safeGain = Math.max(gain, 0.0001);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(safeGain, t0 + Math.min(0.015, duration / 2));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(duration, 0.02));
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  function noiseBurst(duration, gain = 0.04, when = 0) {
    const c = ensure();
    if (!c || !enabled) return;
    const t0 = c.currentTime + when;
    const len = Math.floor(c.sampleRate * duration);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    const g = c.createGain();
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    src.buffer = buf;
    g.gain.setValueAtTime(Math.max(gain, 0.0001), t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(duration, 0.02));
    src.connect(filter);
    filter.connect(g);
    g.connect(c.destination);
    src.start(t0);
    src.stop(t0 + duration + 0.02);
  }

  return {
    unlock() {
      ensure();
    },
    setEnabled(v) {
      enabled = !!v;
      try {
        localStorage.setItem("impact_ai_sfx", enabled ? "1" : "0");
      } catch (_) {}
    },
    isEnabled() {
      return enabled;
    },
    loadPref() {
      try {
        const v = localStorage.getItem("impact_ai_sfx");
        if (v === "0") enabled = false;
      } catch (_) {}
      return enabled;
    },
    click() {
      tone(620, 0.05, "triangle", 0.05);
    },
    /** Dramatic “level-up” sting for correct answers */
    correct() {
      noiseBurst(0.08, 0.03, 0);
      tone(392, 0.09, "square", 0.05, 0);
      tone(523.25, 0.11, "sawtooth", 0.055, 0.07);
      tone(659.25, 0.12, "square", 0.06, 0.14);
      tone(783.99, 0.14, "triangle", 0.07, 0.22);
      tone(1046.5, 0.28, "sine", 0.1, 0.32);
      tone(1318.5, 0.35, "sine", 0.07, 0.42);
      // shimmer
      tone(1568, 0.2, "triangle", 0.035, 0.5);
      tone(2093, 0.25, "sine", 0.025, 0.58);
    },
    wrong() {
      tone(240, 0.18, "sawtooth", 0.05, 0, 140);
      tone(180, 0.22, "square", 0.035, 0.12);
    },
    tick() {
      tone(980, 0.025, "square", 0.02);
    },
    whoosh() {
      tone(160, 0.14, "triangle", 0.035, 0, 420);
    },
    victory() {
      noiseBurst(0.12, 0.04, 0);
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
        tone(f, 0.28, i % 2 ? "triangle" : "sine", 0.09, i * 0.11);
      });
    },
    start() {
      tone(311, 0.1, "sawtooth", 0.045);
      tone(392, 0.12, "square", 0.05, 0.08);
      tone(523.25, 0.18, "sine", 0.07, 0.16);
    },
    exit() {
      tone(400, 0.1, "triangle", 0.04, 0, 200);
    },
  };
})();
