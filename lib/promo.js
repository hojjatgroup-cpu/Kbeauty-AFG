import site from "@/data/site.json";

export const PROMO = site.promo || null;
const K_COUPON = "kbeauty-coupon";
const K_USED = "kbeauty-first-order-done";
const K_SEEN = "kbeauty-promo-seen";

const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
  del(k) {
    try {
      localStorage.removeItem(k);
    } catch {}
  },
};

export const cleanCode = (c) => String(c || "").replace(/\s+/g, "").toUpperCase();

// Promo is live until the end of the "until" day (Kabul time is close enough)
export function promoActive() {
  if (!PROMO) return false;
  const end = new Date(`${PROMO.until}T23:59:59+04:30`);
  return Date.now() <= end.getTime();
}

export const firstOrderDone = () => store.get(K_USED) === "1";
export const markOrderDone = () => store.set(K_USED, "1");

export const savedCoupon = () => store.get(K_COUPON) || "";
export const saveCoupon = (c) => store.set(K_COUPON, cleanCode(c));
export const clearCoupon = () => store.del(K_COUPON);

export const popupSeen = () => store.get(K_SEEN) === "1";
export const markPopupSeen = () => store.set(K_SEEN, "1");

// Returns { ok, percent, reason }  reason: "invalid" | "expired" | "used"
export function checkCoupon(code) {
  if (!PROMO || cleanCode(code) !== cleanCode(PROMO.code)) return { ok: false, reason: "invalid" };
  if (!promoActive()) return { ok: false, reason: "expired" };
  if (PROMO.firstOrderOnly && firstOrderDone()) return { ok: false, reason: "used" };
  return { ok: true, percent: PROMO.percent };
}
