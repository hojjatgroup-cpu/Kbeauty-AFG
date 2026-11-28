import products from "@/data/products.json";
import { SKIN_LABELS, TYPE_LABELS, translate } from "@/lib/i18n";

// Persian labels (kept for code that validates keys)
export const SKIN_TYPES = SKIN_LABELS.fa;
export const PRODUCT_TYPES = TYPE_LABELS.fa;

export const TYPE_ICONS = {
  cleanser: "🫧",
  toner: "💦",
  sunscreen: "☀️",
  serum: "💧",
  cream: "🧴",
  mask: "🌿",
};

export function getAllProducts() {
  return products;
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

// Only the product types that actually have products
export function usedTypes(labels) {
  const used = new Set(products.map((p) => p.type));
  return Object.fromEntries(Object.entries(labels).filter(([k]) => used.has(k)));
}

export function getBestsellers() {
  return products.filter((p) => p.bestseller);
}

export function getRelated(product, limit = 4) {
  return products
    .filter((p) => p.slug !== product.slug && p.type === product.type)
    .concat(products.filter((p) => p.slug !== product.slug && p.type !== product.type))
    .slice(0, limit);
}

export function hasPrice(price) {
  return price !== null && price !== undefined && price !== "";
}

const faDigits = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export function toFa(n) {
  return faDigits(n);
}

export function num(n, lang = "fa") {
  return lang === "fa" ? faDigits(n) : String(n);
}

export function formatPrice(price, lang = "fa") {
  if (!hasPrice(price)) return translate(lang, "price.unknown");
  const raw = String(Math.round(Number(price)));
  const currency = translate(lang, "currency");
  if (lang === "en") return `${raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`;
  return `${faDigits(raw.replace(/\B(?=(\d{3})+(?!\d))/g, "٬"))} ${currency}`;
}

// Discount percent when oldPrice is higher than price, else 0
export function discountPercent(product) {
  if (!hasPrice(product.price) || !hasPrice(product.oldPrice)) return 0;
  const o = Number(product.oldPrice), n = Number(product.price);
  return o > n ? Math.round(((o - n) / o) * 100) : 0;
}

// Search: Persian/English, ignores ی/ي ک/ك differences, half-spaces and spacing. Every word must match.
export function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/[أإآ]/g, "ا")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[\u200c\u200f\-_.]/g, " ")
    .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesSearch(product, query) {
  const q = normalize(query);
  if (!q) return true;
  const hay = normalize(
    [product.name, product.name_en, product.brand, product.brand_fa, product.short, product.short_en, product.name_ko, ...(product.keywords || [])].join(" ")
  );
  const squashed = hay.replace(/ /g, "");
  return q.split(" ").every((w) => hay.includes(w) || squashed.includes(w));
}

// one real product photo per category (from public/products/thumb)
const CAT_PHOTO = {
  cleanser: "cosrx-low-ph-cleanser",
  toner: "anua-heartleaf-77-toner",
  serum: "torriden-dive-in-serum",
  cream: "dr-althea-345-relief-cream",
  sunscreen: "boj-relief-sun-aqua-fresh",
  mask: "",
  hair: "lilyeve-grow-turn-exosome-ampoule",
  body: "medicube-glow-vanilla-mist",
};

// thumbnail of the chosen product, or of the first product in that category
export function catPhoto(type) {
  const all = getAllProducts();
  const p = all.find((x) => x.image.includes(CAT_PHOTO[type] || "@")) || all.find((x) => x.type === type);
  return p ? p.image.replace("/products/", "/products/thumb/") : "/logo.png";
}
