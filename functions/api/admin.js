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

// compare without leaking timing
async function same(a, b) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const u = new Uint8Array(x), v = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < u.length; i++) d |= u[i] ^ v[i];
  return d === 0;
}

export async function onRequestPost({ request, env }) {
  const pass = (env.ADMIN_PASSWORD || "").trim();
  if (!pass) return json({ ok: false, reason: "nopass" }, 500);
  if (!env.COUPONS) return json({ ok: false, reason: "storage" }, 500);
  // lock an address out for 30 minutes after 5 wrong passwords
  const ip = request.headers.get("cf-connecting-ip") || "x";
  const failKey = `adminfail:${ip}`;
  const fails = Number((await env.COUPONS.get(failKey)) || 0);
  if (fails >= 5) return json({ ok: false, reason: "locked" }, 429);
  let b = {};
  try { b = await request.json(); } catch {}
  if (!(await same(String(b.password || ""), pass))) {
    await env.COUPONS.put(failKey, String(fails + 1), { expirationTtl: 1800 });
    await new Promise((r) => setTimeout(r, 1000));
    return json({ ok: false, reason: fails + 1 >= 5 ? "locked" : "wrong" }, 401);
  }
  if (fails) await env.COUPONS.delete(failKey);
  const [users, orders] = await Promise.all([listAll(env.COUPONS, "user:"), listAll(env.COUPONS, "order:")]);
  orders.sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));
  users.sort((a, b) => String(b.created || "").localeCompare(String(a.created || "")));
  return new Response(JSON.stringify({
    ok: true,
    users: users.map((u) => ({ email: u.email, name: u.name, phone: u.phone, address: u.address, picture: u.picture, created: u.created, orders: (u.orders || []).length })),
    orders: orders.map((o) => ({ id: o.order_id, at: o.at, name: o.name, phone: o.phone, province: o.province, address: o.address, email: o.email, items: o.items, total: o.total, coupon: o.coupon })),
  }), { headers: { "content-type": "application/json", "cache-control": "no-store" } });
}
