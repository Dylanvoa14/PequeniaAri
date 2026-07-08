/* ═══════════════════════════════════════════════════════════
   ⚙️ CONFIGURACIÓN — edita solo esta parte ⚙️
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {
  // 📅 Fecha y hora del examen. Formato: "AAAA-MM-DDTHH:MM:SS" (hora local).
  // Ejemplo: 8 de julio de 2026 a las 3:00 pm → "2026-07-08T15:00:00"
  examDate: "2026-07-08T15:00:00",

  // Duración estimada del examen en horas
  examDurationHours: 3,

  // Apodos que rotan en el título
  nicknames: ["NIÑA", "PEQUEÑA ARI", "ARIANA", "FUTURA APROBADA"],

  // Estadísticas absurdas (num se anima al hacer scroll)
  stats: [
    { num: 99.9, suffix: "%", decimals: 1, label: "probabilidad de aprobar", note: "el 0.1% restante es por si cae un meteorito" },
    { num: 47, suffix: "", decimals: 0, label: "crisis existenciales superadas este ciclo", note: "todas con éxito, cabe recalcar" },
    { num: 100, suffix: "%", decimals: 0, label: "de exámenes sobrevividos hasta la fecha", note: "racha histórica impecable, revisen los archivos" },
    { num: 0, suffix: "", decimals: 0, label: "excusas válidas para dudar de ti", note: "se buscó exhaustivamente. no se encontró ninguna" },
  ],

  // Respuestas del botón de pánico (en orden, van escalando)
  panicResponses: [
    "Respira hondo. Ya. Eso era todo, en serio.",
    "¿Otra vez? A ver: tú estudiaste, el pánico no. Ganas por experiencia.",
    "Diagnóstico oficial: nervios normales de persona que sí va a aprobar.",
    "El examen debería estar apretando su propio botón de pánico ahora mismo.",
    "Nivel de drama detectado: elevado. Nivel de preparación: más elevado todavía.",
    "Ya van varias. ¿Quieres que llame a alguien? ¿Al 911 de los exagerados?",
    "Dato científico: nadie que aprieta un botón tantas veces reprueba. Búscalo.",
    "El botón solicita un descanso. Tú también. Respira y ve a ganar.",
    "El botón está considerando cobrarte por sesión. Acepta yape.",
  ],

  // Predicciones del tarot (aleatorias, todas terminan igual porque el destino es terco)
  tarotPredictions: [
    "Las cartas dicen: apruebas. Las cartas nunca mienten, está en su contrato.",
    "Veo un aula... veo tu nombre... veo una nota más alta de lo que crees. Siempre veo lo mismo, qué aburrido.",
    "Mercurio está retrógrado, pero eso no aplica a la gente que estudió.",
    "Los astros convocaron reunión de emergencia y votaron por unanimidad: pasas.",
    "Veo a una persona celebrando esta noche. Se parece sospechosamente a ti.",
    "El destino dice que apruebas. Yo digo lo mismo. Doble confirmación, cero apelaciones.",
    "Tu carta es La Estrella, que significa 'deja de dudar y entra al examen de una vez'.",
    "Consulté tres barajas distintas. Las tres se aburrieron de repetir lo mismo: apruebas.",
  ],

  // Pensamientos intrusivos del minijuego
  doubts: [
    "¿y si me quedo en blanco?",
    "¿y si no estudié suficiente?",
    "todos saben más que yo",
    "¿y si toman justo lo que no repasé?",
    "seguro repruebo",
    "¿por qué elegí esta carrera?",
    "no me acuerdo de nada",
    "¿y si leo mal la pregunta?",
    "¿y si me da sueño a la mitad?",
  ],
};

/* ═══════════════════════════════════════════════════════════
   A partir de aquí no hace falta tocar nada :)
   ═══════════════════════════════════════════════════════════ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Rotación de apodos ──
(function rotateNicknames() {
  const el = document.getElementById("nickname");
  let i = 0;
  setInterval(() => {
    el.classList.add("swapping");
    setTimeout(() => {
      i = (i + 1) % CONFIG.nicknames.length;
      el.textContent = CONFIG.nicknames[i];
      el.classList.remove("swapping");
    }, 300);
  }, 3200);
})();

// ── Cuenta regresiva ──
(function countdown() {
  const exam = new Date(CONFIG.examDate).getTime();
  const examEnd = exam + CONFIG.examDurationHours * 3600 * 1000;
  const $h = document.getElementById("cdH");
  const $m = document.getElementById("cdM");
  const $s = document.getElementById("cdS");
  const $tag = document.getElementById("countdownTag");
  const $note = document.getElementById("countdownNote");
  const $wrap = document.getElementById("countdown");
  const pad = (n) => String(n).padStart(2, "0");
  let celebrated = false;

  function tick() {
    const now = Date.now();
    if (now < exam) {
      const diff = exam - now;
      $h.textContent = pad(Math.floor(diff / 3600000));
      $m.textContent = pad(Math.floor((diff % 3600000) / 60000));
      $s.textContent = pad(Math.floor((diff % 60000) / 1000));
      $tag.textContent = "CUENTA REGRESIVA OFICIAL";
      $note.textContent = "tiempo restante para demostrar lo que ya sabes";
    } else if (now < examEnd) {
      $wrap.classList.add("done");
      $h.textContent = "EN";
      $m.textContent = "CUR";
      $s.textContent = "SO";
      $tag.textContent = "EXAMEN EN CURSO";
      $note.textContent = "silencio por favor, hay una futura aprobada trabajando";
    } else {
      $wrap.classList.add("done");
      $h.textContent = "SOBRE";
      $m.textContent = "VI";
      $s.textContent = "VIÓ";
      $tag.textContent = "OPERACIÓN COMPLETADA";
      $note.textContent = "sea cual sea el resultado, el comité está orgulloso. y el comité soy yo";
      if (!celebrated) { celebrated = true; launchConfetti(160); }
    }
  }
  tick();
  setInterval(tick, 1000);
})();

// ── Estadísticas con contadores animados ──
(function buildStats() {
  const grid = document.getElementById("statsGrid");
  CONFIG.stats.forEach((s) => {
    const card = document.createElement("article");
    card.className = "stat-card";
    card.innerHTML =
      `<div class="stat-num" data-target="${s.num}" data-suffix="${s.suffix}" data-decimals="${s.decimals}">0${s.suffix}</div>` +
      `<div class="stat-label">${s.label}</div>` +
      `<div class="stat-note">${s.note}</div>`;
    grid.appendChild(card);
  });

  function animateNum(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix;
    const decimals = parseInt(el.dataset.decimals, 10);
    if (reducedMotion || target === 0) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    const dur = 1200;
    const start = performance.now();
    function step(t) {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        animateNum(e.target.querySelector(".stat-num"));
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.35 }
  );
  document.querySelectorAll(".stat-card").forEach((c) => observer.observe(c));
})();

// ── Botón de pánico ──
(function panicButton() {
  const btn = document.getElementById("panicBtn");
  const msg = document.getElementById("panicMsg");
  const meta = document.getElementById("panicMeta");
  let presses = 0;

  btn.addEventListener("click", () => {
    const responses = CONFIG.panicResponses;
    const i = Math.min(presses, responses.length - 1);
    presses++;

    if (!reducedMotion) {
      document.body.classList.remove("shake");
      void document.body.offsetWidth; // reinicia la animación
      document.body.classList.add("shake");
    }

    msg.classList.remove("show");
    setTimeout(() => {
      msg.textContent = responses[i];
      msg.classList.add("show");
    }, 120);

    meta.textContent =
      presses === 1 ? "INCIDENTE REGISTRADO: 1"
      : presses < 5 ? `INCIDENTES REGISTRADOS: ${presses}`
      : `INCIDENTES REGISTRADOS: ${presses} · EL SISTEMA ESTÁ JUZGÁNDOTE (CON CARIÑO)`;
  });
})();

// ── Tarot académico ──
(function tarot() {
  const card = document.getElementById("tarotCard");
  const inner = document.getElementById("tarotInner");
  const text = document.getElementById("tarotText");
  let flipped = false;
  let lastIndex = -1;
  let busy = false;

  function consult() {
    if (busy) return;
    busy = true;
    if (!flipped) {
      let i;
      do { i = Math.floor(Math.random() * CONFIG.tarotPredictions.length); }
      while (i === lastIndex && CONFIG.tarotPredictions.length > 1);
      lastIndex = i;
      text.textContent = CONFIG.tarotPredictions[i];
      inner.classList.add("flipped");
      flipped = true;
      setTimeout(() => (busy = false), 700);
    } else {
      inner.classList.remove("flipped");
      flipped = false;
      setTimeout(() => (busy = false), 700);
    }
  }

  card.addEventListener("click", consult);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); consult(); }
  });
})();

// ── Minijuego: aplasta tus dudas ──
(function doubtGame() {
  const area = document.getElementById("gameArea");
  const scoreEl = document.getElementById("gameScore");
  const msgEl = document.getElementById("gameMsg");
  const toggle = document.getElementById("gameToggle");
  const placeholder = document.getElementById("gamePlaceholder");
  let running = false;
  let score = 0;
  let spawner = null;
  const MAX_ON_SCREEN = 5;

  const milestones = {
    5: "5 dudas menos. Vas mejor aplastando dudas que ellas asustándote.",
    10: "10 dudas destruidas. Oficialmente ya no te queda ninguna excusa.",
    15: "Ok, para. Guarda esa energía para el examen.",
    25: "Esto ya es ensañamiento. Las dudas piden clemencia.",
  };

  function spawnDoubt() {
    if (!running) return;
    if (area.querySelectorAll(".doubt:not(.popped)").length >= MAX_ON_SCREEN) return;

    const el = document.createElement("button");
    el.className = "doubt";
    el.type = "button";
    el.textContent = CONFIG.doubts[Math.floor(Math.random() * CONFIG.doubts.length)];
    area.appendChild(el);

    // posición aleatoria dentro del área (se mide después de insertar)
    const aw = area.clientWidth, ah = area.clientHeight;
    const ew = el.offsetWidth, eh = el.offsetHeight;
    el.style.left = Math.random() * Math.max(aw - ew - 12, 1) + 6 + "px";
    el.style.top = Math.random() * Math.max(ah - eh - 12, 1) + 6 + "px";

    const pop = (e) => {
      e.preventDefault();
      if (el.classList.contains("popped")) return;
      el.classList.add("popped");
      score++;
      scoreEl.textContent = score;
      if (milestones[score]) {
        msgEl.textContent = milestones[score];
        launchConfetti(score >= 15 ? 80 : 40);
      }
      setTimeout(() => el.remove(), 350);
    };
    el.addEventListener("pointerdown", pop);

    // si nadie la toca, se va sola (las dudas también se aburren)
    setTimeout(() => {
      if (el.isConnected && !el.classList.contains("popped")) {
        el.classList.add("popped");
        setTimeout(() => el.remove(), 350);
      }
    }, 6000);
  }

  toggle.addEventListener("click", () => {
    running = !running;
    if (running) {
      toggle.textContent = "PAUSAR";
      placeholder.style.display = "none";
      msgEl.textContent = " ";
      spawnDoubt();
      spawner = setInterval(spawnDoubt, 900);
    } else {
      toggle.textContent = "SEGUIR";
      clearInterval(spawner);
    }
  });
})();

// ── Confeti ──
const confetti = (function () {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  let pieces = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const COLORS = ["#ff5c2e", "#0fa3a3", "#ffd23f", "#1c1a17"];

  function spawn(n) {
    for (let i = 0; i < n; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        w: 5 + Math.random() * 7,
        h: 8 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vy: 2 + Math.random() * 3,
        vx: -1.2 + Math.random() * 2.4,
        rot: Math.random() * Math.PI * 2,
        vr: -0.12 + Math.random() * 0.24,
      });
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter((p) => p.y < canvas.height + 30);
    pieces.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.02) * 0.8;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (pieces.length > 0) requestAnimationFrame(loop);
    else running = false;
  }

  return { spawn };
})();

function launchConfetti(n) {
  if (reducedMotion) return;
  confetti.spawn(n);
}
