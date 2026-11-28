// Checks the emailed code and signs the user in.
import { json, cleanEmail, login } from "../_auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.COUPONS) return json({ ok: false, reason: "storage" }, 500);
  let body = {};
  try { body = await request.json(); } catch {}
  const email = cleanEmail(body.email);
  const code = String(body.code || "").replace(/[۰-۹]/g, (c) => "۰۱۲۳۴۵۶۷۸۹".indexOf(c)).replace(/\D/g, "");
  const key = `otp:${email}`;
  const raw = await env.COUPONS.get(key);
  if (!raw) return json({ ok: false, reason: "expired" }, 400);
  const otp = JSON.parse(raw);
  if (otp.tries >= 5) {
    await env.COUPONS.delete(key);
    return json({ ok: false, reason: "expired" }, 400);
  }
  if (otp.code !== code) {
    otp.tries += 1;
    await env.COUPONS.put(key, JSON.stringify(otp), { expirationTtl: 600 });
    return json({ ok: false, reason: "code" }, 400);
  }
  await env.COUPONS.delete(key);
  const cookie = await login(env, { email });
  return json({ ok: true }, 200, { "set-cookie": cookie });
}
