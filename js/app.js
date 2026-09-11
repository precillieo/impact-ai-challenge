/**
 * IMPACT '26 — Tech & AI Challenge
 */
(() => {
  const QUESTIONS_PER_RUN = 5;
  const SECONDS_PER_Q = 35;
  const POINTS_CORRECT = 100;
  const POINTS_SPEED_MAX = 50;
  const STORAGE_KEY = "impact_ai_leaderboard_v1";

  const KEYS = ["A", "B", "C", "D"];

  const MODE_META = {
    debug: { label: "Find the Bug", chip: "🐛 Find the Bug" },
    ai: { label: "AI Thinker", chip: "🧠 AI Thinker" },
    privacy: { label: "Privacy", chip: "🔒 Privacy" },
    general: { label: "AI Knowledge", chip: "💡 AI Knowledge" },
    puzzle: { label: "Puzzle", chip: "🧩 Puzzle" },
  };

  const state = {
    name: "",
    mode: "debug",
    queue: [],
    index: 0,
    score: 0,
    correct: 0,
    answered: false,
    advancing: false,
    timerId: null,
    timeLeft: SECONDS_PER_Q,
    questionDeadline: 0,
    runActive: false,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const els = {
    screens: $$(".screen"),
    home: $("#screen-home"),
    play: $("#screen-play"),
    result: $("#screen-result"),
    nameInput: $("#player-name"),
    startBtn: $("#btn-start"),
    lbHome: $("#lb-home"),
    soundBtn: $("#btn-sound"),
    resetLbBtn: $("#btn-reset-lb"),
    modeChips: $("#mode-chips"),
    modeLabelText: $("#mode-label-text"),
    modePill: $("#mode-pill"),
    progress: $("#progress-bar"),
    qNum: $("#q-num"),
    scorePill: $("#score-pill"),
    timerPill: $("#timer-pill"),
    badge: $("#q-badge"),
    prompt: $("#q-prompt"),
    code: $("#q-code"),
    choices: $("#choices"),
    feedback: $("#feedback"),
    feedbackTitle: $("#feedback-title"),
    feedbackText: $("#feedback-text"),
    nextBtn: $("#btn-next"),
    exitBtn: $("#btn-exit"),
    resultScore: $("#result-score"),
    resultSub: $("#result-sub"),
    resultStars: $("#result-stars"),
    lbResult: $("#lb-result"),
    playAgain: $("#btn-again"),
    toHome: $("#btn-home"),
    confetti: $("#confetti"),
  };

  function runLen() {
    return state.queue.length || QUESTIONS_PER_RUN;
  }

  function showScreen(id) {
    els.screens.forEach((s) => s.classList.toggle("active", s.id === id));
  }

  function normalizeName(name) {
    return name.trim().replace(/\s+/g, " ").slice(0, 24);
  }

  function nameKey(name) {
    return normalizeName(name).toLowerCase();
  }

  function loadBoard() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveBoard(board) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    } catch (err) {
      console.warn("Could not save leaderboard", err);
    }
  }

  function upsertScore(name, runScore, correctCount) {
    const board = loadBoard();
    const key = nameKey(name);
    const display = normalizeName(name);
    const prev = board[key] || {
      name: display,
      score: 0,
      plays: 0,
      bestRun: 0,
      totalCorrect: 0,
    };
    prev.name = display;
    prev.score += runScore;
    prev.plays += 1;
    prev.bestRun = Math.max(prev.bestRun || 0, runScore);
    prev.totalCorrect = (prev.totalCorrect || 0) + correctCount;
    board[key] = prev;
    saveBoard(board);
    return prev;
  }

  function rankedList() {
    return Object.values(loadBoard()).sort(
      (a, b) => b.score - a.score || b.bestRun - a.bestRun || a.name.localeCompare(b.name)
    );
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderLeaderboard(target, highlightName = "") {
    const list = rankedList().slice(0, 10);
    if (!list.length) {
      target.innerHTML =
        '<li style="grid-template-columns:1fr;color:var(--muted)">No scores yet — be the first!</li>';
      return;
    }
    const you = nameKey(highlightName);
    target.innerHTML = list
      .map((row, i) => {
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : String(i + 1);
        const cls = you && nameKey(row.name) === you ? "you" : "";
        return `<li class="${cls}">
          <span class="rank">${medal}</span>
          <span class="name">${escapeHtml(row.name)}</span>
          <span class="pts">${row.score}</span>
          <span class="plays">${row.plays} run${row.plays === 1 ? "" : "s"}</span>
        </li>`;
      })
      .join("");
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Shuffle answer options so the correct choice is not always in the same slot */
  function withShuffledChoices(q) {
    const paired = q.choices.map((text, i) => ({
      text,
      correct: i === q.answer,
    }));
    const shuffled = shuffle(paired);
    const answer = shuffled.findIndex((p) => p.correct);
    if (answer < 0) {
      console.error("Question missing correct answer after shuffle", q.id);
    }
    return {
      ...q,
      choices: shuffled.map((p) => p.text),
      answer,
    };
  }

  function pickQuestions(mode) {
    const pool = shuffle(
      (window.IMPACT_QUESTIONS || []).filter((q) => q.category === mode)
    );
    if (pool.length < QUESTIONS_PER_RUN) {
      console.warn(`Only ${pool.length} questions for mode=${mode}`);
    }
    return pool.slice(0, Math.min(QUESTIONS_PER_RUN, pool.length)).map(withShuffledChoices);
  }

  function setMode(mode) {
    if (!MODE_META[mode]) return;
    state.mode = mode;
    $$("#mode-chips .chip").forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.mode === mode);
    });
    els.modeLabelText.textContent = MODE_META[mode].label;
  }

  function clearTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  /** Wall-clock timer so background tab throttling doesn't skip timeouts forever */
  function startTimer() {
    clearTimer();
    state.questionDeadline = Date.now() + SECONDS_PER_Q * 1000;
    state.timeLeft = SECONDS_PER_Q;
    updateTimerUI();
    state.timerId = setInterval(() => {
      if (!state.runActive || state.answered) {
        clearTimer();
        return;
      }
      const left = Math.max(0, Math.ceil((state.questionDeadline - Date.now()) / 1000));
      if (left !== state.timeLeft) {
        state.timeLeft = left;
        updateTimerUI();
        if (left <= 5 && left > 0) ImpactSounds.tick();
      }
      if (left <= 0) {
        clearTimer();
        if (!state.answered) lockIn(-1);
      }
    }, 200);
  }

  function updateTimerUI() {
    els.timerPill.textContent = `⏱ ${Math.max(0, state.timeLeft)}s`;
    els.timerPill.classList.toggle("warn", state.timeLeft <= 8);
  }

  function updateHud() {
    const total = runLen();
    // Fill for questions already completed (+ current as partial feel via index)
    const pct = total ? ((state.index + (state.answered ? 1 : 0)) / total) * 100 : 0;
    els.progress.style.width = `${pct}%`;
    els.qNum.textContent = `Q ${Math.min(state.index + 1, total)} / ${total}`;
    els.scorePill.textContent = `⭐ ${state.score}`;
    els.modePill.textContent = MODE_META[state.mode]?.chip || state.mode;
  }

  function renderQuestion() {
    if (!state.runActive) return;
    const q = state.queue[state.index];
    if (!q) {
      finishRun();
      return;
    }

    state.answered = false;
    state.advancing = false;
    updateHud();
    els.badge.textContent = q.badge || "Challenge";
    els.prompt.textContent = q.prompt;

    if (q.code) {
      els.code.style.display = "block";
      els.code.textContent = q.code;
    } else {
      els.code.style.display = "none";
      els.code.textContent = "";
    }

    els.feedback.classList.remove("show", "ok", "bad");
    els.nextBtn.disabled = false;
    els.nextBtn.style.display = "none";
    els.choices.innerHTML = "";

    q.choices.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="key">${KEYS[i] || String(i + 1)}</span><span>${escapeHtml(text)}</span>`;
      btn.addEventListener("click", () => {
        ImpactSounds.click();
        lockIn(i);
      });
      els.choices.appendChild(btn);
    });

    ImpactSounds.whoosh();
    startTimer();
  }

  function lockIn(choiceIndex) {
    if (!state.runActive || state.answered) return;
    state.answered = true;
    clearTimer();

    const q = state.queue[state.index];
    if (!q) return;

    const correct = choiceIndex === q.answer;
    const remainingMs = Math.max(0, state.questionDeadline - Date.now());
    const elapsed = SECONDS_PER_Q - remainingMs / 1000;
    const speedBonus = correct
      ? Math.max(0, Math.round(POINTS_SPEED_MAX * (1 - Math.min(elapsed, SECONDS_PER_Q) / SECONDS_PER_Q)))
      : 0;
    const gained = correct ? POINTS_CORRECT + speedBonus : 0;

    if (correct) {
      state.correct += 1;
      state.score += gained;
      ImpactSounds.correct();
    } else {
      ImpactSounds.wrong();
    }

    updateHud();

    [...els.choices.querySelectorAll(".choice")].forEach((btn) => {
      const idx = Number(btn.dataset.index);
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("correct");
      if (choiceIndex === idx && !correct) btn.classList.add("wrong");
    });

    els.feedback.classList.remove("ok", "bad");
    els.feedback.classList.add("show", correct ? "ok" : "bad");
    if (choiceIndex < 0) {
      els.feedbackTitle.textContent = "⏰ Time’s up!";
    } else if (correct) {
      els.feedbackTitle.textContent = speedBonus
        ? `Correct! +${gained} (incl. +${speedBonus} speed)`
        : `Correct! +${gained}`;
    } else {
      els.feedbackTitle.textContent = "Not quite";
    }
    els.feedbackText.textContent = q.explanation;
    els.nextBtn.style.display = "inline-flex";
    els.nextBtn.textContent =
      state.index >= runLen() - 1 ? "See results →" : "Next question →";
  }

  function nextQuestion() {
    if (!state.runActive || !state.answered || state.advancing) return;
    state.advancing = true;
    ImpactSounds.click();
    els.nextBtn.disabled = true;

    if (state.index >= runLen() - 1) {
      finishRun();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function finishRun() {
    if (!state.runActive) return;
    state.runActive = false;
    clearTimer();
    state.advancing = false;

    els.progress.style.width = "100%";
    upsertScore(state.name, state.score, state.correct);

    const total = runLen();
    els.resultStars.textContent =
      state.correct <= 0 ? "—" : "⭐".repeat(Math.min(state.correct, total));
    els.resultScore.textContent = String(state.score);
    els.resultSub.textContent = `${MODE_META[state.mode].label} · ${state.correct} / ${total} correct · added to ${normalizeName(state.name)}'s total`;
    renderLeaderboard(els.lbResult, state.name);

    if (state.correct >= Math.max(4, Math.ceil(total * 0.8))) spawnConfetti();
    ImpactSounds.victory();
    showScreen("screen-result");
  }

  /** Leave mid-run — no leaderboard update */
  function exitRun() {
    if (!els.play.classList.contains("active")) return;
    if (!state.runActive) {
      showScreen("screen-home");
      return;
    }
    const ok = confirm(
      "Exit this run? Your current score will NOT be saved to the leaderboard."
    );
    if (!ok) return;
    clearTimer();
    state.runActive = false;
    state.answered = false;
    state.advancing = false;
    state.queue = [];
    ImpactSounds.exit();
    renderLeaderboard(els.lbHome, state.name);
    showScreen("screen-home");
  }

  function spawnConfetti() {
    els.confetti.innerHTML = "";
    const colors = ["#f0c14b", "#3ddc97", "#7aa2ff", "#ff6b6b", "#fff"];
    for (let i = 0; i < 40; i++) {
      const bit = document.createElement("i");
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.background = colors[i % colors.length];
      bit.style.animationDuration = `${2.2 + Math.random() * 2}s`;
      bit.style.transform = `rotate(${Math.random() * 360}deg)`;
      els.confetti.appendChild(bit);
    }
    setTimeout(() => {
      els.confetti.innerHTML = "";
    }, 4500);
  }

  function startGame() {
    const name = normalizeName(els.nameInput.value);
    if (name.length < 2) {
      els.nameInput.focus();
      els.nameInput.style.borderColor = "var(--bad)";
      return;
    }
    const pool = (window.IMPACT_QUESTIONS || []).filter((q) => q.category === state.mode);
    if (pool.length < 1) {
      alert("No questions in this mode yet — pick another challenge.");
      return;
    }

    els.nameInput.style.borderColor = "";
    ImpactSounds.unlock();
    ImpactSounds.start();

    clearTimer();
    state.name = name;
    state.queue = pickQuestions(state.mode);
    if (!state.queue.length) {
      alert("Could not load questions for this mode.");
      return;
    }
    state.index = 0;
    state.score = 0;
    state.correct = 0;
    state.answered = false;
    state.advancing = false;
    state.runActive = true;
    showScreen("screen-play");
    renderQuestion();
  }

  function syncSoundButton() {
    const on = ImpactSounds.isEnabled();
    els.soundBtn.setAttribute("aria-pressed", on ? "true" : "false");
    els.soundBtn.textContent = on ? "🔊" : "🔇";
    els.soundBtn.title = on ? "Mute sounds" : "Unmute sounds";
  }

  function init() {
    if (!window.IMPACT_QUESTIONS || !window.ImpactSounds) {
      console.error("Challenge assets failed to load");
      return;
    }

    ImpactSounds.loadPref();
    syncSoundButton();
    setMode("debug");
    renderLeaderboard(els.lbHome);

    els.modeChips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      ImpactSounds.click();
      setMode(btn.dataset.mode);
    });

    els.startBtn.addEventListener("click", startGame);
    els.nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") startGame();
    });
    els.nextBtn.addEventListener("click", nextQuestion);
    els.exitBtn.addEventListener("click", exitRun);

    els.playAgain.addEventListener("click", () => {
      ImpactSounds.click();
      startGame();
    });
    els.toHome.addEventListener("click", () => {
      ImpactSounds.click();
      clearTimer();
      state.runActive = false;
      state.advancing = false;
      renderLeaderboard(els.lbHome, state.name);
      showScreen("screen-home");
    });

    els.soundBtn.addEventListener("click", () => {
      ImpactSounds.unlock();
      ImpactSounds.setEnabled(!ImpactSounds.isEnabled());
      syncSoundButton();
      if (ImpactSounds.isEnabled()) ImpactSounds.click();
    });

    els.resetLbBtn.addEventListener("click", () => {
      if (confirm("Clear the local leaderboard on this device?")) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (_) {}
        renderLeaderboard(els.lbHome);
        ImpactSounds.wrong();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!els.play.classList.contains("active")) return;
      // Exit works even after answering (while waiting on Next)
      if (e.key === "Escape") {
        e.preventDefault();
        exitRun();
        return;
      }
      if (state.answered || !state.runActive) return;
      const map = { a: 0, b: 1, c: 2, d: 3 };
      const idx = map[e.key.toLowerCase()];
      if (idx === undefined) return;
      const btn = els.choices.querySelector(`[data-index="${idx}"]`);
      if (btn && !btn.disabled) btn.click();
    });

    showScreen("screen-home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
