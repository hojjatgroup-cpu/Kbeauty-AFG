import products from "@/data/products.json";
import { SKIN_LABELS, TYPE_LABELS, translate } from "@/lib/i18n";

// Persian labels (kept for code that validates keys)
export const SKIN_TYPES = SKIN_LABELS.fa;
export const PRODUCT_TYPES = TYPE_LABELS.fa;

export const TYPE_ICONS = {
  cleanser: "🫧",
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
