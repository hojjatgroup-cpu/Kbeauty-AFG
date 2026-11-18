import products from "@/data/products.json";
import site from "@/data/site.json";

export const SKIN_TYPES = {
  oily: "چرب",
  dry: "خشک",
  combination: "مختلط",
  sensitive: "حساس",
};

export const PRODUCT_TYPES = {
  cleanser: "شوینده",
  sunscreen: "ضدآفتاب",
  serum: "سرم",
  cream: "کرم",
  mask: "ماسک",
};

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

export function formatPrice(price) {
  if (!hasPrice(price)) return "[قیمت]";
  const withCommas = String(Math.round(Number(price))).replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  return `${faDigits(withCommas)} ${site.currency}`;
}

export function toFa(n) {
  return faDigits(n);
}
