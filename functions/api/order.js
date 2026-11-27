// Cloudflare Pages Function: emails each order to the shop owner with Resend (resend.com, free).
// Needs the secret RESEND_API_KEY (Pages → Settings → Variables and Secrets).
// Customer confirmation emails also need MAIL_FROM on a verified domain, e.g. "K Beauty AFG <order@kbeautyaf.com>".
// Every order is also kept in the COUPONS KV store as a backup, when that binding exists.
import site from "../../data/site.json";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const LABELS = {
  order_id: "کد سفارش",
  name: "نام",
  phone: "شماره تماس",
  province: "ولایت",
  address: "آدرس",
  email: "ایمیل",
  items: "محصولات",
  subtotal: "جمع محصولات",
  coupon: "کد تخفیف",
  discount: "تخفیف",
  shipping: "هزینهٔ ارسال",
  total: "جمع کل",
  language: "زبان",
};

const table = (p) =>
  `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:14px;color:#1f3a3f">
  <h2 style="color:#2f8794">سفارش جدید — K Beauty AFG</h2>
  <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:560px">
  ${Object.keys(LABELS)
    .filter((k) => p[k] !== undefined && p[k] !== "")
    .map(
      (k) =>
        `<tr><td style="border:1px solid #d6e7ea;background:#f2f9fa;white-space:nowrap"><b>${LABELS[k]}</b></td>` +
        `<td style="border:1px solid #d6e7ea;white-space:pre-line">${esc(p[k])}</td></tr>`
    )
    .join("")}
  </table></div>`;

async function send(env, msg) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${(await r.text()).slice(0, 160)}`);
}

export async function onRequestPost({ request, env }) {
  let p;
  try {
    p = await request.json();
  } catch {
    return json({ success: "false", message: "bad request" }, 400);
  }

  if (env.COUPONS && p.order_id) {
    try {
      await env.COUPONS.put(`order:${p.order_id}`, JSON.stringify({ ...p, _autoresponse: undefined, at: new Date().toISOString() }));
    } catch {}
  }

  if (!env.RESEND_API_KEY) return json({ success: "false", message: "RESEND_API_KEY is not set" }, 500);

  const owner = {
    to: [site.orderEmail],
    subject: p._subject || `سفارش جدید ${p.order_id || ""}`,
    html: table(p),
    reply_to: p.email || undefined,
  };
  try {
    await send(env, { from: env.MAIL_FROM || "K Beauty AFG <onboarding@resend.dev>", ...owner });
  } catch (e) {
    // if the custom sender fails, still deliver the order with Resend's test sender
    try {
      if (!env.MAIL_FROM) throw e;
      await send(env, { from: "K Beauty AFG <onboarding@resend.dev>", ...owner });
    } catch (e2) {
      return json({ success: "false", message: String(e.message || e) + " | " + String(e2.message || e2) }, 502);
    }
  }

  // confirmation to the customer (only possible with a verified domain sender)
  if (env.MAIL_FROM && p.email && p._autoresponse) {
    try {
      await send(env, {
        from: env.MAIL_FROM,
        to: [p.email],
        subject: `سفارش شما دریافت شد — ${p.order_id || "K Beauty AFG"}`,
        text: p._autoresponse,
      });
    } catch {}
  }
  return json({ success: "true" });
}
