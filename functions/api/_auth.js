// Shared helpers for accounts (stored in the COUPONS KV namespace).
export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...headers } });

export const FROM = "K Beauty AFG <support@kbeautyaf.com>";
const DAY = 86400;
export const SESSION_DAYS = 60;

export function cookies(request) {
  const out = {};
  (request.headers.get("cookie") || "").split(";").forEach((c) => {
    const i = c.indexOf("=");
    if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
  });
  return out;
}

export function token(bytes = 24) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const cleanEmail = (e) => String(e || "").trim().toLowerCase();
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function getUser(env, email) {
  const raw = await env.COUPONS.get(`user:${email}`);
  return raw ? JSON.parse(raw) : null;
}

export async function saveUser(env, user) {
  await env.COUPONS.put(`user:${user.email}`, JSON.stringify(user));
}

// find or create the user, start a session, return the Set-Cookie header
export async function login(env, { email, name, picture }) {
  let user = await getUser(env, email);
  if (!user) user = { email, name: name || "", picture: picture || "", phone: "", province: "", address: "", orders: [], created: new Date().toISOString() };
  else {
    if (name && !user.name) user.name = name;
    if (picture) user.picture = picture;
  }
  await saveUser(env, user);
  const t = token();
  await env.COUPONS.put(`sess:${t}`, email, { expirationTtl: SESSION_DAYS * DAY });
  return `kb_sess=${t}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * DAY}`;
}

export async function sessionUser(env, request) {
  if (!env.COUPONS) return null;
  const t = cookies(request).kb_sess;
  if (!t || !/^[0-9a-f]{48}$/.test(t)) return null;
  const email = await env.COUPONS.get(`sess:${t}`);
  return email ? getUser(env, email) : null;
}

export const publicUser = (u) => ({
  email: u.email,
  name: u.name,
  picture: u.picture,
  phone: u.phone,
  province: u.province,
  address: u.address,
  orders: (u.orders || []).slice(0, 30),
});
