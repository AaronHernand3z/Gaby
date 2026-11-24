/* =====================================================================
   CONFIGURACIÓN — edita aquí textos, fotos y fechas
   ===================================================================== */

// Fecha y hora en que comenzó todo (Año, Mes - 1, Día, Hora, Minuto)
// Ejemplo: 24 de noviembre de 2023 a las 00:00 -> new Date(2023, 10, 24, 0, 0)
const RELATIONSHIP_START = new Date(2023, 10, 24, 16, 30, 0);

// Palabras que van cambiando en "INCREÍBLE"
const HERO_WORDS = [
	"INCREÍBLE",
	"INOLVIDABLE",
	"MÁGICO",
	"HERMOSO",
	"ÚNICO",
	"MARAVILLOSO",
];

// Muestra la pantalla "toca para comenzar" (necesaria para que el
// navegador permita que suene la canción al final)
const SHOW_INTRO = !location.search.includes("sinintro");

// Las 5 primeras van en el collage; las demás aparecen en "Ver más fotos"
const POLAROID_PHOTOS = [
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM.jpeg",
		quote: "Cada momento contigo es mi lugar favorito.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (1).jpeg",
		quote: "Tu sonrisa sigue siendo mi mejor vista.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (2).jpeg",
		quote: "Gracias por ser mi compañera de aventuras.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (3).jpeg",
		quote: "Contigo todos los días se sienten mágicos.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (4).jpeg",
		quote: "Tres años aprendiendo a quererte cada día más.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (5).jpeg",
		quote: "A tu lado siempre encuentro paz.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (6).jpeg",
		quote: "Me encanta la forma en que iluminas mi vida.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (7).jpeg",
		quote: "Que increible fue ese dia.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (8).jpeg",
		quote: "Por mil risas más juntos.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (9).jpeg",
		quote: "Eres lo mejor que me ha pasado.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.35 AM (10).jpeg",
		quote: "Siempre voy a agradecer haberte conocido.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.33 AM.jpeg",
		quote: "Cada foto guarda un pedacito de nuestra historia.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.33 AM (1).jpeg",
		quote: "Qué bonito es crecer contigo.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.33 AM (2).jpeg",
		quote: "Mi bonita, siempre eres toda una diosa.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.33 AM (3).jpeg",
		quote: "Juntos hacemos el mejor equipo.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.30 AM.jpeg",
		quote: "No cambiaría ni un segundo de nuestro viaje.",
	},
	{
		src: "public/WhatsApp Image 2026-11-24 at 2.13.30 AM (1).jpeg",
		quote: "Te amo hoy, mañana y siempre, Gaby.",
	},
];

// Texto de la carta (un elemento = un párrafo). Agrega los que faltan al final.
const LETTER_PARAGRAPHS = [
	"Hola Gaby, espero estés bien",
	"La verdad no tengo mucha idea de qué escribir y estoy bastante oxidado en escribir cartas, pero quiero ser totalmente honesto contigo.",
	"Estos tres años de mi vida han sido toda una aventura, una odisea y un viaje que jamás imaginé ni en mis mayores aspiraciones. La verdad, antes de ti no conocía lo que era el amor y agradezco mucho que lo haya descubierto a tu lado mientras los dos aprendíamos un mundo completamente nuevo.",
	"Me hubiera gustado que este dia llegara bajo otras circunstancias y sinceramente no se si vamos a seguir juntos o si las cosas terminaran aqui, pero aún asi estos tres años han sido completamente increibles y soy muy feliz de haberlos vivido contigo",
	"Gracias por haber llegado a cambiar mi vida y por todo el tiempo que has estado junto a mi, gracias por todos los momentos felices, tristes, dificiles y por absolutamente todo lo que hemos vivido juntos.",
	"Te amo mucho Gaby.",
];

/* =====================================================================
   UTILIDADES
   ===================================================================== */
const $ = (sel) => document.querySelector(sel);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const isMobile = () =>
	window.matchMedia("(max-width: 720px) and (orientation: portrait)").matches;
const reducedMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;

// Valor real en px de 1 unidad de la maqueta (--u)
let U = 1;
function measureU() {
	const probe = document.createElement("div");
	probe.style.cssText =
		"position:absolute;visibility:hidden;width:calc(var(--u) * 100)";
	document.body.appendChild(probe);
	U = probe.getBoundingClientRect().width / 100 || 1;
	probe.remove();
}

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

/* =====================================================================
   ARRANQUE
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
	window.scrollTo(0, 0);
	measureU();
	Music.init();
	Clock.init();
	Polaroids.init();
	Letter.init();
	ScrollEngine.init();
	Petals.init();

	if (SHOW_INTRO) {
		Intro.init();
	} else {
		$("#intro").remove();
		document.documentElement.classList.remove("is-locked");
		HeroWord.start();
	}
});

/* =====================================================================
   PANTALLA DE ENTRADA
   ===================================================================== */
const Intro = {
	init() {
		const el = $("#intro");
		const open = () => {
			el.classList.add("is-gone");
			document.documentElement.classList.remove("is-locked");
			Music.play();
			setTimeout(() => HeroWord.start(), 900);
			setTimeout(() => el.remove(), 1200);
		};
		el.addEventListener("click", open, { once: true });
		el.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") open();
		});
	},
};

/* =====================================================================
   PALABRA QUE CAMBIA ("INCREÍBLE" -> ...)
   ===================================================================== */
const HeroWord = {
	i: 0,
	start() {
		this.el = $("#hero-word");
		this.render(HERO_WORDS[0]);
		if (HERO_WORDS.length > 1) setInterval(() => this.next(), 2800);
	},
	render(word) {
		this.el.innerHTML = [...word]
			.map((c, i) => `<span class="ch" style="--i:${i}">${c}</span>`)
			.join("");
		this.fit();
	},
	fit() {
		// Si una palabra larga no cabe en la tarjeta, se reduce un poco
		this.el.style.transform = "";
		const max = this.el.parentElement.clientWidth * 0.96;
		const w = this.el.scrollWidth;
		if (w > max) this.el.style.transform = `scale(${max / w})`;
	},
	next() {
		const chars = this.el.querySelectorAll(".ch");
		chars.forEach((c) => c.classList.add("is-out"));
		const outTime = 350 + chars.length * 25;
		setTimeout(() => {
			this.i = (this.i + 1) % HERO_WORDS.length;
			this.render(HERO_WORDS[this.i]);
		}, outTime);
	},
};

/* =====================================================================
   MOTOR DE SCROLL — una sola lectura por frame, sin recalcular layout
   ===================================================================== */
const ScrollEngine = {
	y: 0,
	lastY: 0,
	ticking: false,
	m: {},

	init() {
		this.heroBg = $("#hero-bg");
		this.treeL = $("#tree-left");
		this.treeR = $("#tree-right");
		this.phrases = [...document.querySelectorAll(".phrase")].map((el) => ({
			el,
			at: parseFloat(el.dataset.at),
			on: false,
		}));
		this.curtain = $("#curtain");
		this.timer = $("#timer-content");

		this.measure();
		const onResize = () => {
			measureU();
			Letter.checkOverflow();
			this.measure();
			this.update(true);
			if (HeroWord.el) HeroWord.fit();
		};
		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", () =>
			setTimeout(onResize, 120),
		);
		window.addEventListener("load", () => {
			measureU();
			Letter.checkOverflow();
			this.measure();
			this.update(true);
		});
		if (document.fonts)
			document.fonts.ready.then(() => {
				Letter.checkOverflow();
				this.measure();
			});

		window.addEventListener("scroll", () => this.request(), { passive: true });
		this.update(true);
	},

	measure() {
		const top = (el) => el.getBoundingClientRect().top + window.scrollY;
		const tab = $("#tabachines");
		const tim = $("#timer");
		const paper = $("#letter-paper");
		this.m = {
			vh: window.innerHeight,
			tabTop: top(tab),
			tabLen: tab.offsetHeight - window.innerHeight,
			timTop: top(tim),
			timLen: tim.offsetHeight - window.innerHeight,
			curtainW: this.curtain.offsetWidth,
			paperTop: top(paper),
			paperH: paper.offsetHeight,
		};
	},

	request() {
		if (!this.ticking) {
			this.ticking = true;
			requestAnimationFrame(() => this.update());
		}
	},

	update(force = false) {
		this.ticking = false;
		const y = window.scrollY;
		const dy = y - this.lastY;
		this.lastY = y;
		const m = this.m;

		// 1. Parallax del fondo del hero
		if (y < m.vh * 1.1 || force) {
			this.heroBg.style.transform = `translate3d(0, ${(y * 0.42).toFixed(1)}px, 0) scale(${1 + y * 0.00008})`;
		}

		// 2. Tabachines (empieza antes de fijarse y con curva rápida al inicio)
		const tabLead = m.vh * 0.45;
		const pTab = clamp((y - (m.tabTop - tabLead)) / (m.tabLen + tabLead));
		const inTab = y > m.tabTop - m.vh && y < m.tabTop + m.tabLen + m.vh;
		if (inTab || force) {
			for (const ph of this.phrases) {
				const on = pTab >= ph.at;
				if (on !== ph.on) {
					ph.on = on;
					ph.el.classList.toggle("is-on", on);
				}
			}
			const t = clamp(pTab / 0.85);
			const e = 1 - (1 - t) * (1 - t); // arranque inmediato y desaceleración suave
			if (!isMobile()) {
				const s = (1 + e * 0.32).toFixed(4);
				const x = (e * 22 * U).toFixed(1);
				const ty = (e * 14 * U).toFixed(1);
				this.treeL.style.transform = `translate3d(-${x}px, calc(-50% + ${ty}px), 0) scale(${s})`;
				this.treeR.style.transform = `translate3d(${x}px, calc(-50% + ${ty}px), 0) scale(-${s}, ${s})`;
			} else {
				const s = (1 + e * 0.22).toFixed(4);
				const x = (e * 10 * U).toFixed(1);
				const ty = (e * 8 * U).toFixed(1);
				this.treeL.style.transform = `translate3d(-${x}px, calc(-50% + ${ty}px), 0) scale(${s})`;
				this.treeR.style.transform = `translate3d(${x}px, calc(-50% + ${ty}px), 0) scale(-${s}, ${s})`;
			}
			if (
				Math.abs(dy) > 0 &&
				y > m.tabTop - m.vh * 0.6 &&
				y < m.tabTop + m.tabLen + m.vh
			) {
				Petals.tabachin && Petals.tabachin.boost(Math.abs(dy));
			}
		}

		// 3. Cortina rayada que se desliza y revela el timer
		const pTim = clamp(
			(y - (m.timTop - m.vh * 0.15)) / (m.timLen + m.vh * 0.15),
		);
		const inTim = y > m.timTop - m.vh * 1.2 && y < m.timTop + m.timLen + m.vh;
		if (inTim || force) {
			const slide = easeInOut(clamp(pTim / 0.6));
			this.curtain.style.transform = `translate3d(${(slide * m.curtainW).toFixed(1)}px, 0, 0)`;
			const reveal = clamp((pTim - 0.2) / 0.4);
			this.timer.style.opacity = reveal.toFixed(3);
			this.timer.style.transform = `translateY(calc(-50% + ${((1 - reveal) * 14 * U).toFixed(1)}px))`;
		}

		// 4. Jacarandas: también caen más mientras haces scroll
		if (Math.abs(dy) > 0 && Petals.jacaranda)
			Petals.jacaranda.boost(Math.abs(dy));

		// 5. Carta: se escribe conforme bajas
		const rel = (y + m.vh * 0.82 - m.paperTop) / (m.paperH * 0.92);
		Letter.setTarget(clamp(rel));
	},
};

/* =====================================================================
   RELOJ FLIP
   ===================================================================== */
const Clock = {
	units: {},

	init() {
		["days", "hours", "minutes", "seconds"].forEach((k) => {
			const el = $(`#flip-${k}`);
			el.innerHTML = `
				<span class="flip-sizer">00</span>
				<div class="flip-half flip-top"><span>00</span></div>
				<div class="flip-half flip-bottom"><span>00</span></div>
				<div class="flip-half flip-top flip-flap"><span>00</span></div>
				<div class="flip-half flip-bottom flip-flap"><span>00</span></div>
				<i class="flip-hinge is-l"></i><i class="flip-hinge is-r"></i>`;
			const [sizer] = el.getElementsByClassName("flip-sizer");
			const spans = el.querySelectorAll(".flip-half span");
			const unit = { el, sizer, spans, value: null };
			el.addEventListener("animationend", (e) => {
				if (e.target.classList.contains("flip-bottom")) {
					spans[1].textContent = unit.value;
					el.classList.remove("is-flipping");
				}
			});
			this.units[k] = unit;
		});

		this.tick(true);
		// sincroniza con el cambio exacto de segundo
		setTimeout(
			() => {
				this.tick();
				setInterval(() => this.tick(), 1000);
			},
			1000 - (Date.now() % 1000),
		);
	},

	tick(instant = false) {
		let diff = Math.max(0, Date.now() - RELATIONSHIP_START.getTime());
		const d = Math.floor(diff / 864e5);
		diff -= d * 864e5;
		const h = Math.floor(diff / 36e5);
		diff -= h * 36e5;
		const mi = Math.floor(diff / 6e4);
		diff -= mi * 6e4;
		const s = Math.floor(diff / 1e3);
		const pad = (n) => String(n).padStart(2, "0");
		this.set("days", pad(d), instant);
		this.set("hours", pad(h), instant);
		this.set("minutes", pad(mi), instant);
		this.set("seconds", pad(s), instant);
	},

	set(key, val, instant) {
		const u = this.units[key];
		if (u.value === val) return;
		const old = u.value ?? val;
		u.value = val;
		u.sizer.textContent = val;
		const [top, bottom, flapTop, flapBottom] = u.spans;
		if (instant || document.hidden) {
			top.textContent =
				bottom.textContent =
				flapTop.textContent =
				flapBottom.textContent =
					val;
			return;
		}
		top.textContent = val; // mitad superior ya con el nuevo número
		bottom.textContent = old; // mitad inferior aún con el anterior
		flapTop.textContent = old; // solapa que cae
		flapBottom.textContent = val; // solapa que aparece
		u.el.classList.remove("is-flipping");
		void u.el.offsetWidth; // reinicia la animación
		u.el.classList.add("is-flipping");
	},
};

/* =====================================================================
   POLAROIDS
   ===================================================================== */
const Polaroids = {
	// posición (en unidades --u) y giro de las 5 fotos del collage
	layout: [
		{ x: 24, y: 44, r: -3.5 },
		{ x: 302, y: 0, r: 2.5 },
		{ x: 580, y: 24, r: 3 },
		{ x: 158, y: 224, r: -2 },
		{ x: 446, y: 224, r: 3 },
	],

	build(photo, i, pos, lazy = true) {
		const el = document.createElement("div");
		el.className = "polaroid";
		el.tabIndex = 0;
		el.setAttribute("role", "button");
		el.setAttribute("aria-label", "Foto: toca para leer el mensaje");
		el.style.cssText = `--x:${pos.x};--y:${pos.y};--r:${pos.r}deg;--d:${i}`;
		el.innerHTML = `
			<div class="polaroid-inner">
				<div class="polaroid-face polaroid-front">
					<div class="polaroid-photo"><img src="${photo.src}" alt="" ${lazy ? 'loading="lazy"' : ""} decoding="async" /></div>
				</div>
				<div class="polaroid-face polaroid-back">
					<p class="polaroid-quote">${photo.quote}</p>
					<span class="polaroid-heart">♥</span>
				</div>
			</div>`;
		const flip = () => el.classList.toggle("is-flipped");
		el.addEventListener("click", flip);
		el.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				flip();
			}
		});
		return el;
	},

	init() {
		const section = $("#polaroids");
		const stage = $("#polaroid-stage");
		POLAROID_PHOTOS.slice(0, 5).forEach((p, i) =>
			stage.appendChild(this.build(p, i, this.layout[i])),
		);

		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				section.classList.add("is-in");
				io.disconnect();
				setTimeout(() => section.classList.add("is-settled"), 1600);
				// pequeña pista: una foto "se asoma" para invitar a voltearla
				setTimeout(() => {
					const hint = stage.children[1];
					if (hint && !hint.classList.contains("is-flipped")) {
						hint.classList.add("is-hint");
						setTimeout(() => hint.classList.remove("is-hint"), 1200);
					}
				}, 2200);
			},
			{ threshold: 0.25 },
		);
		io.observe(section);

		// Galería
		const gallery = $("#gallery");
		const grid = $("#gallery-grid");
		let built = false;
		const open = () => {
			if (!built) {
				POLAROID_PHOTOS.slice(5).forEach((p, i) => {
					const r = [-3, 2, -1.5, 3, -2.5, 1.5][i % 6];
					grid.appendChild(this.build(p, i, { x: 0, y: 0, r }));
				});
				built = true;
			}
			gallery.hidden = false;
			document.documentElement.classList.add("is-locked");
		};
		const close = () => {
			gallery.hidden = true;
			document.documentElement.classList.remove("is-locked");
		};
		$("#more-btn").addEventListener("click", open);
		$("#gallery-close").addEventListener("click", close);
		gallery.addEventListener("click", (e) => {
			if (e.target === gallery || e.target === grid) close();
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && !gallery.hidden) close();
		});
	},
};

/* =====================================================================
   CARTA — máquina de escribir ligada al scroll
   ===================================================================== */
const Letter = {
	parts: [],
	total: 0,
	typed: 0,
	target: 0,
	running: false,
	expanded: false,

	init() {
		const body = $("#letter-body");
		this.paper = $("#letter-paper");
		this.wrap = $("#letter-wrap");
		this.moreBtn = $("#letter-more");
		body.innerHTML = "";
		this.caret = document.createElement("span");
		this.caret.className = "caret";
		LETTER_PARAGRAPHS.forEach((text) => {
			const p = document.createElement("p");
			const typed = document.createElement("span");
			const rest = document.createElement("span");
			rest.className = "rest";
			rest.textContent = text; // el texto ya ocupa su espacio
			p.append(typed, rest);
			body.appendChild(p);
			this.parts.push({ text, typed, rest, start: this.total });
			this.total += text.length;
		});

		this.paper.addEventListener("click", () => this.setTarget(1, true));

		if (this.moreBtn) {
			this.moreBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				this.expanded = true;
				const startH = this.wrap.offsetHeight;
				const fullH = body.scrollHeight;
				this.wrap.style.maxHeight = `${startH}px`;
				void this.wrap.offsetHeight; // asegura el punto de partida de la transición
				this.paper.classList.remove("is-collapsed");
				this.wrap.style.maxHeight = `${fullH}px`;
				this.moreBtn.setAttribute("aria-expanded", "true");
				this.moreBtn.hidden = true;
				this.setTarget(1); // termina de escribir suavemente el resto
				setTimeout(() => {
					this.wrap.style.maxHeight = "";
					ScrollEngine.measure();
					ScrollEngine.update(true);
				}, 680);
			});
		}

		this.checkOverflow();
	},

	checkOverflow() {
		if (!this.paper || !this.wrap || !this.moreBtn) return;
		const body = $("#letter-body");
		if (!isMobile() || this.expanded) {
			this.paper.classList.remove("is-collapsed");
			this.wrap.style.maxHeight = "";
			this.moreBtn.hidden = true;
			return;
		}
		// Si en móvil supera ~265u de alto, colapsa y muestra "Seguir leyendo"
		const limit = 265 * U;
		const isLong = body.scrollHeight > limit;
		this.paper.classList.toggle("is-collapsed", isLong);
		this.moreBtn.hidden = !isLong;
	},

	setTarget(progress, instant = false) {
		const t = Math.round(progress * this.total);
		if (t <= this.target && !instant) return; // lo escrito no se borra
		this.target = Math.max(this.target, t);
		if (instant) {
			this.typed = this.target;
			this.render();
			return;
		}
		if (!this.running) {
			this.running = true;
			requestAnimationFrame(() => this.step());
		}
	},

	step() {
		const diff = this.target - this.typed;
		if (diff <= 0) {
			this.running = false;
			return;
		}
		// velocidad de máquina de escribir; se acelera si bajaste muy rápido
		this.typed += Math.max(1, Math.ceil(diff / 18));
		this.typed = Math.min(this.typed, this.target);
		this.render();
		requestAnimationFrame(() => this.step());
	},

	render() {
		const n = this.typed;
		for (const part of this.parts) {
			const k = clamp(n - part.start, 0, part.text.length);
			if (part.typed.textContent.length !== k) {
				part.typed.textContent = part.text.slice(0, k);
				part.rest.textContent = part.text.slice(k);
			}
			if (k > 0 && k < part.text.length) part.typed.after(this.caret);
		}
		if (n >= this.total) this.caret.remove();
		else if (n > 0 && !this.caret.isConnected)
			this.parts[0].typed.after(this.caret);
	},
};

/* =====================================================================
   PÉTALOS EN ACUARELA (sprites dibujados una sola vez)
   ===================================================================== */
function watercolorSprite(kind, color, edge, variant) {
	const S = 72;
	const c = document.createElement("canvas");
	c.width = c.height = S;
	const g = c.getContext("2d");
	g.translate(S / 2, S / 2);
	g.rotate(Math.random() * Math.PI * 2);
	const rnd = (a, b) => a + Math.random() * (b - a);

	const petalPath = (sx = 1, sy = 1) => {
		const p = new Path2D();
		p.moveTo(0, 26 * sy);
		p.bezierCurveTo(-3 * sx, 16 * sy, -22 * sx, 6 * sy, -21 * sx, -9 * sy);
		p.bezierCurveTo(-19 * sx, -25 * sy, 19 * sx, -25 * sy, 21 * sx, -9 * sy);
		p.bezierCurveTo(22 * sx, 6 * sy, 3 * sx, 16 * sy, 0, 26 * sy);
		return p;
	};

	const bellPath = () => {
		const p = new Path2D();
		for (let i = 0; i < 5; i++) {
			const a = (i / 5) * Math.PI * 2;
			p.ellipse(Math.cos(a) * 8, Math.sin(a) * 8, 9.5, 7.5, a, 0, Math.PI * 2);
		}
		return p;
	};

	const shape =
		kind === "tabachin"
			? petalPath(rnd(0.75, 1), rnd(0.8, 1))
			: variant % 3 === 2
				? petalPath(0.55, 0.6)
				: bellPath();

	// capa base translúcida
	g.globalAlpha = 0.55;
	g.fillStyle = color;
	g.fill(shape);
	// pigmento acumulado (segunda capa ligeramente desplazada)
	g.save();
	g.translate(rnd(-2, 2), rnd(-2, 2));
	g.scale(0.82, 0.82);
	g.globalAlpha = 0.35;
	g.fill(shape);
	g.restore();
	// borde más oscuro, típico de la acuarela
	g.globalAlpha = 0.45;
	g.strokeStyle = edge;
	g.lineWidth = 1.4;
	g.stroke(shape);
	// manchas claras (agua) para dar textura
	g.globalCompositeOperation = "destination-out";
	for (let i = 0; i < 4; i++) {
		const x = rnd(-12, 12);
		const y = rnd(-14, 10);
		const r = rnd(3, 8);
		const grd = g.createRadialGradient(x, y, 0, x, y, r);
		grd.addColorStop(0, "rgba(0,0,0,0.35)");
		grd.addColorStop(1, "rgba(0,0,0,0)");
		g.fillStyle = grd;
		g.globalAlpha = 1;
		g.fillRect(x - r, y - r, r * 2, r * 2);
	}
	g.globalCompositeOperation = "source-over";

	if (kind === "tabachin" && variant === 0) {
		// el pétalo "estandarte" del tabachín tiene vetas blanco/amarillo
		g.globalAlpha = 0.7;
		g.fillStyle = "#fff4d6";
		g.beginPath();
		g.ellipse(0, -6, 9, 13, 0, 0, Math.PI * 2);
		g.fill();
		g.globalAlpha = 0.6;
		g.fillStyle = edge;
		for (let i = 0; i < 9; i++) {
			g.beginPath();
			g.arc(rnd(-7, 7), rnd(-16, 4), rnd(0.6, 1.4), 0, Math.PI * 2);
			g.fill();
		}
	} else if (kind === "jacaranda" && variant % 3 !== 2) {
		// garganta clara de la flor
		const grd = g.createRadialGradient(0, 0, 0, 0, 0, 8);
		grd.addColorStop(0, "rgba(255,255,255,0.75)");
		grd.addColorStop(1, "rgba(255,255,255,0)");
		g.globalAlpha = 1;
		g.fillStyle = grd;
		g.beginPath();
		g.arc(0, 0, 8, 0, Math.PI * 2);
		g.fill();
	}
	return c;
}

class PetalField {
	constructor(canvas, opts) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.opts = opts;
		this.items = [];
		this.extra = 0; // pétalos extra pedidos por el scroll
		this.visible = false;
		this.raf = null;
		this.last = 0;
		this.sprites = [];
		opts.colors.forEach((col, i) => {
			for (let v = 0; v < 3; v++)
				this.sprites.push(watercolorSprite(opts.kind, col, opts.edge, v + i));
		});
		this.resize();
		window.addEventListener("resize", () => this.resize());
		if (typeof ResizeObserver !== "undefined") {
			new ResizeObserver(() => this.resize()).observe(canvas.parentElement);
		}
		this.seeded = false;
		new IntersectionObserver(([e]) => {
			this.visible = e.isIntersecting;
			if (this.visible) {
				this.resize();
				if (!this.seeded && this.opts.seed) {
					this.seeded = true;
					for (let i = 0; i < this.opts.seed; i++) this.spawn(true);
				}
				if (!this.raf) {
					this.last = performance.now();
					this.raf = requestAnimationFrame((t) => this.frame(t));
				}
			}
		}).observe(canvas.parentElement);
	}

	resize() {
		const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
		this.w = this.canvas.clientWidth;
		this.h = this.canvas.clientHeight;
		this.canvas.width = Math.round(this.w * dpr);
		this.canvas.height = Math.round(this.h * dpr);
		this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		this.dpr = dpr;
	}

	boost(px) {
		this.extra = Math.min(this.extra + px * this.opts.perPx, 14);
	}

	spawn(scatterY = false) {
		if (this.items.length >= this.opts.max) return;
		const [x, baseY] = this.opts.origin(this.w, this.h);
		const y = scatterY ? Math.random() * this.h * 0.85 : baseY;
		const size =
			(this.opts.size[0] +
				Math.random() * (this.opts.size[1] - this.opts.size[0])) *
			U;
		this.items.push({
			x,
			y,
			size,
			vy: (22 + Math.random() * 26) * U,
			vx: (Math.random() - 0.5) * 12 * U + this.opts.drift(x, this.w) * U,
			rot: Math.random() * Math.PI * 2,
			vr: (Math.random() - 0.5) * 1.6,
			flip: Math.random() * Math.PI * 2,
			vf: 1.5 + Math.random() * 2.5,
			sway: Math.random() * Math.PI * 2,
			sprite: this.sprites[(Math.random() * this.sprites.length) | 0],
			alpha: scatterY ? 0.8 : 0,
		});
	}

	frame(t) {
		const dt = Math.min(0.05, (t - this.last) / 1000);
		this.last = t;

		// generación: goteo constante + extra por el scroll
		this.acc = (this.acc || 0) + this.opts.rate * dt;
		const want = Math.floor(this.acc) + Math.floor(this.extra);
		this.acc -= Math.floor(this.acc);
		this.extra -= Math.floor(this.extra);
		for (let i = 0; i < want; i++) this.spawn();

		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.w, this.h);
		const keep = [];
		for (const p of this.items) {
			p.sway += dt * 1.6;
			p.flip += dt * p.vf;
			p.rot += dt * p.vr;
			p.x += (p.vx + Math.sin(p.sway) * 14 * U) * dt;
			p.y += p.vy * dt;
			p.alpha = Math.min(1, p.alpha + dt * 2);
			if (p.y < this.h + 90 && p.x > -90 && p.x < this.w + 90) keep.push(p);
			const sx = Math.cos(p.flip); // giro 3D al caer
			const cos = Math.cos(p.rot) * p.size;
			const sin = Math.sin(p.rot) * p.size;
			ctx.globalAlpha = p.alpha;
			ctx.setTransform(
				cos * sx * this.dpr,
				sin * sx * this.dpr,
				-sin * this.dpr,
				cos * this.dpr,
				p.x * this.dpr,
				p.y * this.dpr,
			);
			ctx.drawImage(p.sprite, -0.5, -0.5, 1, 1);
		}
		ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		ctx.globalAlpha = 1;
		this.items = keep;

		if (this.visible || this.items.length) {
			this.raf = requestAnimationFrame((tt) => this.frame(tt));
		} else {
			this.raf = null;
		}
	}
}

const Petals = {
	init() {
		if (reducedMotion) return;
		const mobile = isMobile();

		this.tabachin = new PetalField($("#tabachin-canvas"), {
			kind: "tabachin",
			colors: ["#e2401f", "#ee5a2a", "#d9361c", "#f27a3d"],
			edge: "#9e220e",
			size: [10, 16],
			rate: 2.6,
			perPx: 0.04,
			seed: mobile ? 10 : 20,
			max: mobile ? 36 : 85,
			// nacen a lo ancho de toda la sección para cubrirla por completo
			origin: (w, h) => [Math.random() * w, -20 - Math.random() * h * 0.12],
			drift: (x, w) => (x < w / 2 ? 4 : -4) + (Math.random() - 0.5) * 6,
		});

		this.jacaranda = new PetalField($("#jacaranda-canvas"), {
			kind: "jacaranda",
			colors: ["#9a7ed8", "#8467c9", "#b497e6", "#7a5cbf"],
			edge: "#5a3d9e",
			size: [8, 13],
			rate: 2.2,
			perPx: 0.02,
			max: mobile ? 30 : 60,
			// la jacaranda de la acuarela está arriba a la derecha
			origin: (w, h) => [
				Math.random() < 0.65
					? w * (0.45 + Math.random() * 0.55)
					: Math.random() * w,
				-20 - Math.random() * h * 0.1,
			],
			drift: () => -4,
		});
	},
};

/* =====================================================================
   MÚSICA — suena desde que se abre la página (o al primer toque)
   ===================================================================== */
const Music = {
	userPaused: false,
	available: true,
	target: 0.6,

	init() {
		this.audio = $("#bg-music");
		this.btn = $("#sound-btn");
		if (!this.audio || !this.btn) return;
		this.audio.volume = 0;
		this.audio.addEventListener("error", () => (this.available = false), true);
		const src = this.audio.querySelector("source");
		if (src) src.addEventListener("error", () => (this.available = false));

		this.btn.addEventListener("click", (e) => {
			e.stopPropagation();
			if (this.audio.paused) {
				this.userPaused = false;
				this.play();
			} else {
				this.userPaused = true;
				this.audio.pause();
				this.btn.classList.add("is-paused");
				this.btn.setAttribute("aria-label", "Reproducir música");
			}
		});

		// Intenta reproducir de inmediato al cargar la página
		this.play();

		// Respaldo: si el navegador bloqueó el autoplay inicial, arranca al primer toque o tecla
		const startOnGesture = () => {
			if (!this.userPaused && this.audio.paused) this.play();
		};
		window.addEventListener("pointerdown", startOnGesture, { once: true });
		window.addEventListener("click", startOnGesture, { once: true });
		window.addEventListener("keydown", startOnGesture, { once: true });
	},

	play() {
		if (!this.available || !this.audio || this.userPaused) return;
		this.audio.muted = false;
		const onPlaying = () => {
			this.btn.hidden = false;
			this.btn.classList.remove("is-paused");
			this.btn.setAttribute("aria-label", "Pausar música");
			this.fadeTo(this.target);
		};
		if (!this.audio.paused) {
			onPlaying();
			return;
		}
		this.audio.play().then(onPlaying).catch(() => {
			// El navegador bloqueó el autoplay hasta que el usuario interactúe
		});
	},

	fadeTo(vol) {
		cancelAnimationFrame(this.fadeRaf);
		const a = this.audio;
		const from = a.volume;
		const t0 = performance.now();
		const step = (t) => {
			const k = clamp((t - t0) / 1800);
			a.volume = from + (vol - from) * k;
			if (k < 1) this.fadeRaf = requestAnimationFrame(step);
		};
		this.fadeRaf = requestAnimationFrame(step);
	},
};
