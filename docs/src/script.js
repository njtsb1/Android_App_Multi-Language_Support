const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY_HERE"; // <-- replace for local testing only

// DOM elements
const langSelect = document.getElementById("lang-select");
const themeToggle = document.getElementById("theme-toggle");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const translateBtn = document.getElementById("translate-btn");
const translatedText = document.getElementById("translated-text");
const translateMeta = document.getElementById("translate-meta");
const siteTitle = document.getElementById("site-title");
const footerText = document.getElementById("footer-text");
const yearSpan = document.getElementById("year");
const inputText = document.getElementById("input-text");
const dirButtons = Array.from(document.querySelectorAll(".dir-btn"));

yearSpan.textContent = new Date().getFullYear();

// UI texts
const UI_TEXTS = {
  "en-US": {
    title: "Android App Multi-Language Support",
    greeting: "Hello, welcome!",
    description: "This demo shows a simple multi-language, accessible, responsive page with dark/light mode.",
    translateBtn: "Translate with Google (or AI fallback)",
    translatedLabel: "Translated text:",
    inputPlaceholder: "Type or paste text here",
    footer: "© {year} Developed by Nivaldo Beirão"
  },
  "pt-BR": {
    title: "Aplicativo Android com Suporte a Vários Idiomas",
    greeting: "Olá, bem-vindo!",
    description: "Esta demonstração mostra uma página simples multilíngue, acessível e responsiva com modo escuro/claro.",
    translateBtn: "Traduzir com Google (ou fallback de IA)",
    translatedLabel: "Texto traduzido:",
    inputPlaceholder: "Digite ou cole um texto aqui",
    footer: "© {year} Desenvolvido por Nivaldo Beirão"
  },
  "es": {
    title: "Aplicación Android con Soporte Multilingüe",
    greeting: "¡Hola, bienvenido!",
    description: "Esta demostración muestra una página simple multilingüe, accesible y responsiva con modo oscuro/claro.",
    translateBtn: "Traducir con Google (o fallback de IA)",
    translatedLabel: "Texto traducido:",
    inputPlaceholder: "Escribe o pega un texto aquí",
    footer: "© {year} Desarrollado por Nivaldo Beirão"
  }
};

// Theme & language persistence keys
const LS_THEME_KEY = "multilang_theme";
const LS_LANG_KEY = "multilang_lang";

function getInitialLanguage() {
  const saved = localStorage.getItem(LS_LANG_KEY);
  if (saved && UI_TEXTS[saved]) return saved;
  const nav = navigator.language || navigator.userLanguage || "en-US";
  if (UI_TEXTS[nav]) return nav;
  const base = nav.split("-")[0];
  if (base === "pt") return "pt-BR";
  if (base === "es") return "es";
  return "en-US";
}

function getInitialTheme() {
  const saved = localStorage.getItem(LS_THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return "dark";
}

function applyTranslations(lang) {
  const t = UI_TEXTS[lang] || UI_TEXTS["en-US"];
  document.documentElement.lang = lang;
  siteTitle.textContent = t.title;
  heroTitle.textContent = t.greeting;
  heroDesc.textContent = t.description;
  translateBtn.textContent = t.translateBtn;
  document.getElementById("result-title").textContent = t.translatedLabel;
  inputText.placeholder = t.inputPlaceholder;
  footerText.textContent = t.footer.replace("{year}", new Date().getFullYear());
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
    root.classList.add("theme-set");
    themeToggle.setAttribute("aria-pressed", "false");
    themeToggle.setAttribute("aria-label", "Toggle light mode");
  } else {
    root.classList.remove("light");
    root.classList.add("theme-set");
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.setAttribute("aria-label", "Toggle dark mode");
  }
  localStorage.setItem(LS_THEME_KEY, theme);
}

// Simple simulated translator fallback (word-by-word small map).
// Keep this as a last-resort fallback when Google API is unavailable.
const SIMPLE_MAP = {
  "en->pt": { "hello": "olá", "welcome": "bem-vindo", "demo": "demonstração", "page": "página" },
  "en->es": { "hello": "hola", "welcome": "bienvenido", "demo": "demostración", "page": "página" },
  "pt->en": { "olá": "hello", "bem-vindo": "welcome", "demonstração": "demo", "página": "page" },
  "pt->es": { "olá": "hola", "bem-vindo": "bienvenido" },
  "es->en": { "hola": "hello", "bienvenido": "welcome" },
  "es->pt": { "hola": "olá", "bienvenido": "bem-vindo" }
};

function simpleFallbackTranslate(text, src, tgt) {
  if (!text) return "";
  if (src === tgt) return text;
  const key = `${src}->${tgt}`;
  const dict = SIMPLE_MAP[key] || {};
  // naive tokenization preserving punctuation
  return text.split(/(\s+|[.,;:!?()"\u201C\u201D])/g).map(token => {
    if (/^\s+$/.test(token) || /^[.,;:!?()"\u201C\u201D]$/.test(token)) return token;
    const lower = token.toLowerCase();
    const mapped = dict[lower];
    if (mapped) {
      // preserve capitalization
      if (token[0] === token[0].toUpperCase()) {
        return mapped.charAt(0).toUpperCase() + mapped.slice(1);
      }
      return mapped;
    }
    return token;
  }).join("");
}

// Google Translate (v2) client-side example using API key.
// NOTE: This is for demonstration only. Do not expose API keys in production.
// Recommended: create a server endpoint that calls Google Translate and returns results.
async function translateWithGoogle(text, src, tgt) {
  if (!text || src === tgt) return text;
  // Use the "translate" endpoint (v2) for simple demo. The endpoint accepts q, source, target, format.
  // For production use Google Cloud Translation v3 via server-side with proper auth.
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(GOOGLE_API_KEY)}`;
  const body = {
    q: text,
    source: src,
    target: tgt,
    format: "text"
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      // API returned an error (quota, invalid key, etc.)
      const err = await resp.json().catch(() => null);
      throw new Error(err?.error?.message || `Google Translate API error: ${resp.status}`);
    }

    const data = await resp.json();
    // Response structure: data.data.translations[0].translatedText
    const translated = data?.data?.translations?.[0]?.translatedText;
    if (translated) return translated;
    throw new Error("No translation returned");
  } catch (e) {
    // Bubble up error to caller so fallback can be used
    throw e;
  }
}

// UI state
let selectedDirection = { src: "en", tgt: "pt" };

function setActiveDirectionButton(button) {
  dirButtons.forEach(b => b.classList.remove("active"));
  if (button) button.classList.add("active");
  selectedDirection = button ? { src: button.dataset.src, tgt: button.dataset.tgt } : null;
}

function onDirectionClick(e) {
  const btn = e.currentTarget;
  setActiveDirectionButton(btn);
  // update translate button label to reflect direction (optional)
  translateBtn.textContent = `${btn.dataset.src.toUpperCase()} → ${btn.dataset.tgt.toUpperCase()} • ${UI_TEXTS[getInitialLanguage()].translateBtn}`;
}

// Main translate handler: tries Google first, falls back to simple translator
async function onTranslateClick() {
  const src = selectedDirection?.src || "en";
  const tgt = selectedDirection?.tgt || "pt";
  const sourceText = inputText.value.trim() || heroDesc.textContent.trim();

  // Accessibility: announce loading
  translateBtn.setAttribute("disabled", "true");
  translateBtn.textContent = "Translating…";
  translatedText.textContent = "";
  translateMeta.textContent = "";

  // Try Google Translate if API key is set
  if (GOOGLE_API_KEY && GOOGLE_API_KEY !== "YOUR_GOOGLE_API_KEY_HERE") {
    try {
      const translated = await translateWithGoogle(sourceText, src, tgt);
      translatedText.textContent = translated;
      translateMeta.textContent = `Translated with Google Translate (${src} → ${tgt})`;
      return;
    } catch (err) {
      // If Google fails, fall through to fallback translator
      console.warn("Google Translate failed:", err);
      translateMeta.textContent = `Google Translate failed: ${err.message}. Using fallback.`;
    } finally {
      translateBtn.removeAttribute("disabled");
      translateBtn.textContent = UI_TEXTS[getInitialLanguage()]?.translateBtn || "Translate";
    }
  }

  // Fallback: simple local translator
  const fallback = simpleFallbackTranslate(sourceText, src, tgt);
  translatedText.textContent = fallback || `[${tgt}] ${sourceText}`;
  translateMeta.textContent = `Translated with local fallback (${src} → ${tgt})`;

  translateBtn.removeAttribute("disabled");
  translateBtn.textContent = UI_TEXTS[getInitialLanguage()]?.translateBtn || "Translate";
}

// Initialization
function init() {
  const initialLang = getInitialLanguage();
  document.getElementById("lang-select").value = initialLang;
  applyTranslations(initialLang);

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Event listeners
  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem(LS_LANG_KEY, lang);
    applyTranslations(lang);
  });

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.classList.contains("light") ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  });

  dirButtons.forEach(btn => {
    btn.addEventListener("click", onDirectionClick);
  });

  translateBtn.addEventListener("click", onTranslateClick);

  // Keyboard accessibility for theme toggle
  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Default direction EN -> PT
  const defaultBtn = dirButtons.find(b => b.dataset.src === "en" && b.dataset.tgt === "pt");
  if (defaultBtn) setActiveDirectionButton(defaultBtn);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
