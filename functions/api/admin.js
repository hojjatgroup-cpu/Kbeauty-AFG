// Owner-only data: customers and orders. Needs the secret ADMIN_PASSWORD.
import { json } from "./_auth.js";

async function listAll(kv, prefix, max = 500) {
  const keys = [];
  let cursor;
  do {
    const r = await kv.list({ prefix, cursor, limit: 1000 });
    keys.push(...r.keys.map((k) => k.name));
    cursor = r.list_complete ? null : r.cursor;
  } while (cursor && keys.length < max);
  const vals = await Promise.all(keys.slice(0, max).map((k) => kv.get(k)));
  return vals.map((v) => { try { return JSON.parse(v); } catch { return null; } }).filter(Boolean);
}

export async function onRequestPost({ request, env }) {
  const pass = (env.ADMIN_PASSWORD || "").trim();
  if (!pass) return json({ ok: false, reason: "nopass" }, 500);
  let b = {};
  try { b = await request.json(); } catch {}
  if (String(b.password || "") !== pass) {
    await new Promise((r) => setTimeout(r, 800));
    return json({ ok: false, reason: "wrong" }, 401);
  }
  if (!env.COUPONS) return json({ ok: false, reason: "storage" }, 500);
  const [users, orders] = await Promise.all([listAll(env.COUPONS, "user:"), listAll(env.COUPONS, "order:")]);
  orders.sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));
  users.sort((a, b) => String(b.created || "").localeCompare(String(a.created || "")));
  return json({
    ok: true,
    users: users.map((u) => ({ email: u.email, name: u.name, phone: u.phone, address: u.address, picture: u.picture, created: u.created, orders: (u.orders || []).length })),
    orders: orders.map((o) => ({ id: o.order_id, at: o.at, name: o.name, phone: o.phone, province: o.province, address: o.address, email: o.email, items: o.items, total: o.total, coupon: o.coupon })),
  });
}
