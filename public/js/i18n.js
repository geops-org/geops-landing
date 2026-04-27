/* ── GLOBALS ─────────────────────────────────────────────── */
let currentLang = 'en';
let i18nData    = {};

/* ── i18n ENGINE ─────────────────────────────────────────── */
async function loadLang(lang) {
	try {
		const res = await fetch(`public/i18n/${lang}.json?v=${Date.now()}`);
		if (!res.ok) throw new Error('fetch failed');
		i18nData = await res.json();
	} catch (e) {
		console.warn(`[i18n] Could not load public/i18n/${lang}.json, using fallback.`);
		i18nData = FALLBACK[lang] || {};
	}
	currentLang = lang;
	applyLang();
}

function applyLang() {
	document.documentElement.lang = currentLang;

	// Text nodes
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.dataset.i18n;
		if (i18nData[key] !== undefined) el.textContent = i18nData[key];
	});

	// HTML nodes
	document.querySelectorAll('[data-i18n-html]').forEach(el => {
		const key = el.dataset.i18nHtml;
		if (i18nData[key] !== undefined) el.innerHTML = i18nData[key];
	});

	// Placeholders
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
		const key = el.dataset.i18nPlaceholder;
		if (i18nData[key] !== undefined) el.placeholder = i18nData[key];
	});

	// aria-label
	document.querySelectorAll('[data-i18n-aria]').forEach(el => {
		const key = el.dataset.i18nAria;
		if (i18nData[key] !== undefined) el.setAttribute('aria-label', i18nData[key]);
	});

	// Update lang button
	const langLabel = document.getElementById('lang-label');
	const langToggle = document.getElementById('lang-toggle');
	if (langLabel) langLabel.textContent = currentLang.toUpperCase();
	if (langToggle) langToggle.setAttribute('aria-label', i18nData['lang_toggle_label'] || '');

	// Sync tweak select if present
	const twLang = document.getElementById('tweak-lang');
	if (twLang) twLang.value = currentLang;
}

/* ── LANGUAGE TOGGLE ─────────────────────────────────────── */
function initLangToggle() {
	const btn = document.getElementById('lang-toggle');
	if (!btn) return;
	btn.addEventListener('click', () => {
		loadLang(currentLang === 'es' ? 'en' : 'es');
	});
}

/* ── INLINE FALLBACK STRINGS (if fetch fails) ────────────── */
const FALLBACK = {
	es: {
		nav_inicio: "Inicio", nav_marcas: "Marcas", nav_conoce_mas: "Conoce más",
		login_btn: "Iniciar sesión", lang_toggle_label: "Switch to English",
		hero_badge: "Lima, Perú · Ecosistema asiático",
		hero_h1: "Tu <span class=\"accent\">radar hiperlocal</span> del ecosistema asiático en Lima",
		hero_sub: "Conecta con comercios especializados en San Borja, Lince y el Barrio Chino.",
		hero_cta: "Crear cuenta gratis", hero_cta_secondary: "Conoce GeoPS ↓",
		hero_trust: "Comercios verificados en Lima",
		slide1_zone: "San Borja", slide1_cat: "K-Beauty / Av. Aviación",
		slide2_zone: "Lince", slide2_cat: "Anime & Manga / C.C. Arenales",
		slide3_zone: "Barrio Chino", slide3_cat: "Gastronomía / Calle Capón",
		carousel_prev: "Anterior", carousel_next: "Siguiente",
		how_title: "¿Cómo funciona GeoPS?",
		step1_title: "Busca tu producto", step1_body: "Encuentra productos asiáticos por nombre, categoría o zona.",
		step2_title: "Localiza el comercio", step2_body: "Consulta la dirección exacta, piso y stand del comercio más cercano.",
		step3_title: "Ve directo con stock confirmado", step3_body: "Sin viajes infructuosos. Inventario verificado antes de salir.",
		brands_subtitle: "Comercios verificados en la plataforma",
		tab_b2c: "Para entusiastas asiáticos", tab_b2b: "Para dueños de negocios",
		segments_label: "Para todos", segments_title: "Una plataforma, dos mundos",
		segments_sub: "Ya seas entusiasta del mundo asiático o dueño de un negocio, GeoPS está hecho para ti.",
		b2c_p1_title: "Encuentra productos únicos", b2c_p1_desc: "Accede a miles de artículos del ecosistema asiático.",
		b2c_p2_title: "Precios reales, sin sorpresas", b2c_p2_desc: "Compara entre comercios con total transparencia.",
		b2c_p3_title: "Ubicación exacta del stand", b2c_p3_desc: "Navega dentro de galerías con precisión.",
		b2c_visual_title: "Descubre lo mejor del sabor asiático cerca de ti",
		b2c_cta: "Explorar ahora", b2b_p1_title: "Aumenta tu tráfico peatonal",
		b2b_p1_desc: "Aparece en los resultados de miles de usuarios.",
		b2b_p2_title: "Publica promociones en segundos", b2b_p2_desc: "Comunica descuentos directamente.",
		b2b_p3_title: "Llega a miles de entusiastas", b2b_p3_desc: "Tu negocio visible para la comunidad.",
		b2b_visual_title: "Haz crecer tu negocio con GeoPS", b2b_cta: "Registrar mi negocio",
		conoce_label: "La plataforma", conoce_title: "Conoce GeoPS",
		video_prod_label: "La plataforma", video_prod_title: "Conoce la plataforma",
		video_prod_sub: "Mira cómo GeoPS conecta consumidores y comercios en un solo lugar.",
		video_prod_desc: "Descubre cómo miles de usuarios en Lima encuentran sus productos favoritos.",
		video_team_label: "El equipo", video_team_title: "Nuestro equipo",
		video_team_sub: "Las personas detrás de GeoPS.",
		video_team_desc: "Un equipo multidisciplinario digitaliza el ecosistema asiático.",
		video_placeholder: "Video · Próximamente",
		qa_label: "Preguntas frecuentes", qa_title: "¿Tienes dudas?",
		qa1_q: "¿Quiénes pueden usar GeoPS?",
		qa1_a: "GeoPS está abierto a consumidores y comerciantes del ecosistema asiático de Lima.",
		qa2_q: "¿Qué beneficios tengo como cliente?",
		qa2_a: "Accedes a un catálogo verificado con precios transparentes, stock en tiempo real y micro-navegación.",
		qa3_q: "¿Qué beneficios tengo como proveedor?",
		qa3_a: "Aumentas tu visibilidad, publicas promociones de forma inmediata y gestionas tu inventario en línea.",
		qa4_q: "¿Cuánto es el costo?",
		qa4_a: "Si eres consumidor, GeoPS es completamente gratis. Si tienes un negocio y quieres unirte a la plataforma:",
		qa4_cta: "Soy un negocio, quiero unirme",
		footer_tagline: "Tu radar hiperlocal del ecosistema asiático en Lima, Perú.",
		footer_col_plat: "Plataforma", footer_col_biz: "Negocios", footer_col_company: "Empresa",
		footer_link_how: "Cómo funciona", footer_link_map: "Quiénes somos",
		footer_link_register: "Registrar comercio",
		footer_link_about: "Sobre GeoPS", footer_link_contact: "Contacto",
		footer_terms: "Términos y Condiciones de Servicio",
		footer_privacy: "Políticas de Privacidad", footer_cookies: "Cookies",
		footer_copyright: "© 2026 GeoPS Inc. Todos los derechos reservados."
	},
	en: {
		nav_inicio: "Home", nav_marcas: "Brands", nav_conoce_mas: "Learn more",
		login_btn: "Sign in", lang_toggle_label: "Cambiar a Español",
		hero_badge: "Lima, Peru · Asian ecosystem",
		hero_h1: "Your <span class=\"accent\">hyperlocal radar</span> for Lima's Asian ecosystem",
		hero_sub: "Connect with specialized stores in San Borja, Lince and Lima's Chinatown.",
		hero_cta: "Create free account", hero_cta_secondary: "Discover GeoPS ↓",
		hero_trust: "Verified stores in Lima",
		slide1_zone: "San Borja", slide1_cat: "K-Beauty / Av. Aviación",
		slide2_zone: "Lince", slide2_cat: "Anime & Manga / C.C. Arenales",
		slide3_zone: "Chinatown", slide3_cat: "Gastronomy / Calle Capón",
		carousel_prev: "Previous", carousel_next: "Next",
		how_title: "How does GeoPS work?",
		step1_title: "Search your product", step1_body: "Find Asian products by name, category or zone.",
		step2_title: "Locate the store", step2_body: "Check the exact address, floor and stand of the nearest store.",
		step3_title: "Go with confirmed stock", step3_body: "No wasted trips. Verified inventory before you leave.",
		brands_subtitle: "Verified stores on the platform",
		tab_b2c: "For Asian enthusiasts", tab_b2b: "For business owners",
		segments_label: "For everyone", segments_title: "One platform, two worlds",
		segments_sub: "Whether you're an Asian culture fan or a business owner, GeoPS is made for you.",
		b2c_p1_title: "Find unique products", b2c_p1_desc: "Access thousands of Asian ecosystem items.",
		b2c_p2_title: "Real prices, no surprises", b2c_p2_desc: "Compare stores with full transparency.",
		b2c_p3_title: "Exact stall location", b2c_p3_desc: "Navigate arcades with precision.",
		b2c_visual_title: "Discover the best Asian flavors near you",
		b2c_cta: "Explore now", b2b_p1_title: "Boost your foot traffic",
		b2b_p1_desc: "Appear in results for thousands of active users.",
		b2b_p2_title: "Publish promotions in seconds", b2b_p2_desc: "Share discounts directly.",
		b2b_p3_title: "Reach thousands of enthusiasts", b2b_p3_desc: "Your business visible to the community.",
		b2b_visual_title: "Grow your business with GeoPS", b2b_cta: "Register my business",
		conoce_label: "The platform", conoce_title: "Meet GeoPS",
		video_prod_label: "The platform", video_prod_title: "Meet the platform",
		video_prod_sub: "See how GeoPS connects consumers and stores in one place.",
		video_prod_desc: "Discover how thousands of users in Lima find their favorite Asian products.",
		video_team_label: "The team", video_team_title: "Our team",
		video_team_sub: "The people behind GeoPS.",
		video_team_desc: "A multidisciplinary team digitalizing Lima's Asian ecosystem.",
		video_placeholder: "Video · Coming soon",
		qa_label: "FAQ", qa_title: "Got questions?",
		qa1_q: "Who can use GeoPS?",
		qa1_a: "GeoPS is open to consumers and merchants of Lima's Asian ecosystem.",
		qa2_q: "What benefits do I get as a customer?",
		qa2_a: "You access a verified catalog with transparent prices, real-time stock, and indoor navigation.",
		qa3_q: "What benefits do I get as a provider?",
		qa3_a: "You increase visibility, publish promotions immediately, and manage inventory online.",
		qa4_q: "How much does it cost?",
		qa4_a: "If you are a consumer, GeoPS is completely free. If you have a business and want to join:",
		qa4_cta: "I'm a business, I want to join",
		footer_tagline: "Your hyperlocal radar for Lima's Asian ecosystem.",
		footer_col_plat: "Platform", footer_col_biz: "Business", footer_col_company: "Company",
		footer_link_how: "How it works", footer_link_map: "Who we are",
		footer_link_register: "Register store",
		footer_link_about: "About GeoPS", footer_link_contact: "Contact",
		footer_terms: "Terms and Conditions of Service",
		footer_privacy: "Privacy Policy", footer_cookies: "Cookies",
		footer_copyright: "© 2026 GeoPS Inc. All rights reserved."
	}
};