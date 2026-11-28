import { json, cookies } from "../_auth.js";

export async function onRequestPost({ request, env }) {
  const t = cookies(request).kb_sess;
  if (t && env.COUPONS) await env.COUPONS.delete(`sess:${t}`).catch(() => {});
  return json({ ok: true }, 200, { "set-cookie": "kb_sess=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" });
}
