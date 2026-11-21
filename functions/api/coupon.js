// Cloudflare Pages Function: remembers which phone numbers already used the first-order code.
// Needs a KV binding named COUPONS (Pages → Settings → Bindings). Without it, it lets codes through.

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

// Afghan numbers: 07xx…, 0093 7xx…, +93 7xx… → keep the last 9 digits
const normPhone = (p) => {
  const fa = "۰۱۲۳۴۵۶۷۸۹", ar = "٠١٢٣٤٥٦٧٨٩";
  const d = String(p || "")
    .replace(/[۰-۹]/g, (c) => fa.indexOf(c))
    .replace(/[٠-٩]/g, (c) => ar.indexOf(c))
    .replace(/\D/g, "");
  return d.slice(-9);
};

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: "bad" }, 400);
  }
  const phone = normPhone(body.phone);
  if (phone.length < 7) return json({ ok: false, reason: "phone" }, 400);
  if (!env.COUPONS) return json({ ok: true, unverified: true });

  const key = `first:${phone}`;
  if (body.action === "use") {
    await env.COUPONS.put(key, JSON.stringify({ order: String(body.order || ""), at: new Date().toISOString() }));
    return json({ ok: true });
  }
  const used = await env.COUPONS.get(key);
  return json(used ? { ok: false, reason: "used" } : { ok: true });
}
