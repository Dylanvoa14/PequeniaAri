/* ═══════════════════════════════════════════════════════════
   ⚙️ CONFIGURACIÓN — edita solo esta parte ⚙️
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {
  // 📅 Fecha y hora del examen.
  // Formato: "AAAA-MM-DDTHH:MM:SS" (hora local de tu compu).
  // Ejemplo: 8 de julio de 2026 a las 3:00 pm → "2026-07-08T15:00:00"
  examDate: "2026-07-08T15:00:00",

  // ⏱️ Duración estimada del examen en horas (para el mensaje de "estás en pleno examen")
  examDurationHours: 3,

  // 💛 Apodos que rotan en el título
  nicknames: ["pequeña Ari", "niña nms", "Ariana", "futura aprobada"],

  // ✨ Mensajes del botón de ánimo (se elige uno al azar)
  boostMessages: [
    "Respira. Ya sabes esto. 🌬️",
    "Eres la persona más capaz que conozco 💪",
    "El examen debería estar nervioso de conocerte a TI 😤",
    "Un paso a la vez, pequeña Ari 🐾",
    "Estudiar a la 1 am cuenta doble, es ciencia 🌙",
    "Si el curso más difícil no pudo contigo antes, hoy menos ✨",
    "Recuerda hidratarte, cerebrito hermoso 💧",
    "Yo ya sé cómo termina esto: apruebas. Spoiler. 🎬",
    "Confía en ti la mitad de lo que yo confío en ti 💛",
    "Eres mi persona favorita y las personas favoritas aprueban 🏆",
  ],

  // 🏅 Razones por las que va a aprobar
  reasons: [
    { emoji: "📚", title: "Sobreviviste al curso más difícil", text: "Llegar al examen final de ESTE curso ya es una hazaña. Lo demás es solo el último jefe del videojuego." },
    { emoji: "🧠", title: "Tu cerebro es otra cosa", text: "Te he visto entender cosas que el resto de los mortales ni intentamos. Hoy solo tienes que dejarlo trabajar." },
    { emoji: "🌙", title: "Horas de estudio acumuladas", text: "Todas esas noches estudiando no se evaporan. Están ahí, listas para salir cuando las necesites." },
    { emoji: "💪", title: "Nunca te rendiste", text: "Hubo mil momentos para tirar la toalla y no lo hiciste. Esa constancia vale más que cualquier apunte." },
    { emoji: "🍀", title: "Tienes un fan de tiempo completo", text: "Yo. A toda hora. Enviándote buena vibra desde aquí como si me pagaran por ello." },
    { emoji: "👑", title: "Eres la niña nms", text: "Y la niña nms no pierde. Punto. Es ley universal." },
  ],
};

/* ═══════════════════════════════════════════════════════════
   A partir de aquí no hace falta tocar nada 🙂
   ═══════════════════════════════════════════════════════════ */

// ── Corazones flotantes de fondo ──
(function buildSky() {
  const sky = document.getElementById("sky");
  const symbols = ["💛", "🌸", "⭐", "🤍", "🌷", "✨"];
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement("span");
    el.className = "floaty";
    el.textContent = symbols[i % symbols.length];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 0.8 + Math.random() * 1.6 + "rem";
    el.style.animationDuration = 14 + Math.random() * 18 + "s";
    el.style.animationDelay = -Math.random() * 30 + "s";
    sky.appendChild(el);
  }
})();

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
    }, 400);
  }, 3800);
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
      $tag.textContent = "falta poquito para tu examen";
      $note.textContent = "y cada segundo que pasa estás más lista 🌷";
    } else if (now < examEnd) {
      $wrap.classList.add("done");
      $h.textContent = "TÚ";
      $m.textContent = "PUE";
      $s.textContent = "DES";
      $tag.textContent = "¡estás en pleno examen! 🔥";
      $note.textContent = "respira, lee con calma, y confía. Aquí te espero 💛";
    } else {
      $wrap.classList.add("done");
      $h.textContent = "LO";
      $m.textContent = "LOGRA";
      $s.textContent = "STE";
      $tag.textContent = "¡se acabó! 🎉";
      $note.textContent = "sea cual sea el resultado, estoy orgullosísimo de ti 🥹";
      if (!celebrated) { celebrated = true; launchConfetti(140); }
    }
  }
  tick();
  setInterval(tick, 1000);
})();

// ── Botón de ánimo ──
(function boostButton() {
  const btn = document.getElementById("boostBtn");
  const msg = document.getElementById("boostMsg");
  const count = document.getElementById("boostCount");
  let clicks = 0;
  let lastIndex = -1;

  btn.addEventListener("click", () => {
    clicks++;
    let i;
    do { i = Math.floor(Math.random() * CONFIG.boostMessages.length); }
    while (i === lastIndex && CONFIG.boostMessages.length > 1);
    lastIndex = i;

    msg.classList.remove("show");
    setTimeout(() => {
      msg.textContent = CONFIG.boostMessages[i];
      msg.classList.add("show");
    }, 150);

    if (clicks >= 20)      count.textContent = `${clicks} ánimos enviados… ok, ya vete a dar ese examen 😂💛`;
    else if (clicks >= 5)  count.textContent = `${clicks} ánimos enviados (ilimitados, no te preocupes)`;
    else if (clicks > 1)   count.textContent = `${clicks} ánimos enviados`;

    launchConfetti(40);
  });
})();

// ── Razones (tarjetas) ──
(function buildReasons() {
  const grid = document.getElementById("reasonsGrid");
  CONFIG.reasons.forEach((r) => {
    const card = document.createElement("article");
    card.className = "reason-card";
    card.innerHTML =
      `<span class="reason-emoji">${r.emoji}</span>` +
      `<h3 class="reason-title">${r.title}</h3>` +
      `<p class="reason-text">${r.text}</p>`;
    grid.appendChild(card);
  });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), (idx % 3) * 120);
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reason-card").forEach((c) => observer.observe(c));
})();

// ── Confeti de corazones ──
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

  const COLORS = ["#e8798f", "#f5b942", "#ffb8c6", "#f0946b", "#ffdfc4"];
  const SHAPES = ["heart", "circle", "star"];

  function spawn(n) {
    for (let i = 0; i < n; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        size: 6 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        vy: 1.5 + Math.random() * 2.5,
        vx: -1 + Math.random() * 2,
        rot: Math.random() * Math.PI * 2,
        vr: -0.08 + Math.random() * 0.16,
      });
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  function drawHeart(p) {
    const s = p.size / 2;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.6);
    ctx.bezierCurveTo(-s, -s * 0.4, -s * 0.4, -s, 0, -s * 0.3);
    ctx.bezierCurveTo(s * 0.4, -s, s, -s * 0.4, 0, s * 0.6);
    ctx.fill();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter((p) => p.y < canvas.height + 30);
    pieces.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.01) * 0.6;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "heart") {
        drawHeart(p);
      } else if (p.shape === "star") {
        ctx.font = p.size + "px serif";
        ctx.fillText("✦", -p.size / 2, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (pieces.length > 0) requestAnimationFrame(loop);
    else running = false;
  }

  return { spawn };
})();

function launchConfetti(n) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  confetti.spawn(n);
}
