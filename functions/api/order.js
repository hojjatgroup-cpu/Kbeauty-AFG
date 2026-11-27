// Cloudflare Pages Function: emails each order to the shop owner with Resend (resend.com, free).
// Needs the secret RESEND_API_KEY (Pages → Settings → Variables and Secrets).
// Customer confirmation emails also need MAIL_FROM on a verified domain, e.g. "K Beauty AFG <order@kbeautyaf.com>".
// Every order is also kept in the COUPONS KV store as a backup, when that binding exists.
import site from "../../data/site.json";

const FROM = "K Beauty AFG <order@kbeautyaf.com>";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);


const T = {
  fa: { dir: "rtl", hi: (n) => `سلام ${n} عزیز،`, got: "سفارش شما با موفقیت دریافت شد. از خرید شما سپاسگزاریم 🌸", code: "کد سفارش", items: "محصولات", sub: "جمع محصولات", disc: "تخفیف", ship: "هزینهٔ ارسال", total: "جمع کل", to: "ارسال به", wait: "همکاران ما به‌زودی برای تأیید سفارش با شما تماس می‌گیرند. پرداخت هنگام تحویل است.", q: "سوالی دارید؟", subj: "سفارش شما دریافت شد" },
  en: { dir: "ltr", hi: (n) => `Hi ${n},`, got: "Thank you! We have received your order 🌸", code: "Order code", items: "Items", sub: "Subtotal", disc: "Discount", ship: "Shipping", total: "Total", to: "Ship to", wait: "Our team will contact you soon to confirm your order. Payment is cash on delivery.", q: "Questions?", subj: "We received your order" },
  ko: { dir: "ltr", hi: (n) => `${n}님, 안녕하세요.`, got: "주문이 접수되었습니다. 감사합니다 🌸", code: "주문 번호", items: "상품", sub: "상품 합계", disc: "할인", ship: "배송비", total: "총액", to: "배송지", wait: "곧 담당자가 연락드려 주문을 확인합니다. 결제는 배송 시 현금입니다.", q: "문의", subj: "주문이 접수되었습니다" },
};

const customerHtml = (p) => {
  const t = T[p.language] || T.fa;
  const al = t.dir === "rtl" ? "right" : "left";
  const ar = t.dir === "rtl" ? "left" : "right";
  const font = "Tahoma,'Segoe UI',Arial,sans-serif";
  const row = (k, v, strong) =>
    `<tr><td style="padding:6px 0;color:#5b7479;text-align:${al}">${k}</td><td style="padding:6px 0;text-align:${ar};white-space:nowrap;${strong ? "font-weight:bold;font-size:16px;color:#1f3a3f" : "color:#1f3a3f"}">${esc(v)}</td></tr>`;
  const items = String(p.items || "")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const i = l.lastIndexOf(" — ");
      const name = (i > 0 ? l.slice(0, i) : l).replace(/^[\d۰-۹]+\.\s*/, "");
      const price = i > 0 ? l.slice(i + 3) : "";
      return `<tr><td style="padding:10px 0;border-bottom:1px solid #e3eef0;text-align:${al};color:#1f3a3f">${esc(name)}</td><td style="padding:10px 0;border-bottom:1px solid #e3eef0;text-align:${ar};white-space:nowrap;color:#1f3a3f">${esc(price)}</td></tr>`;
    })
    .join("");
  const hasDisc = p.discount && p.discount !== "-";
  return `<!doctype html><html dir="${t.dir}"><body style="margin:0;padding:0;background:#f2f8f9">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f8f9;padding:24px 12px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" dir="${t.dir}" style="max-width:520px;background:#ffffff;border-radius:16px;font-family:${font};font-size:14px;line-height:1.9;color:#1f3a3f">
<tr><td align="center" style="padding:28px 24px 8px"><img src="https://kbeautyaf.com/email-logo.png" width="180" alt="K Beauty AFG" style="display:block;border:0;width:180px;height:auto"></td></tr>
<tr><td style="padding:8px 28px 0;text-align:${al}">
<p style="margin:0 0 4px;font-size:16px;font-weight:bold">${esc(t.hi(p.name || ""))}</p>
<p style="margin:0 0 18px;color:#2f8794">${t.got}</p>
<div style="background:#eaf5f6;border-radius:10px;padding:10px 14px;margin-bottom:18px;text-align:center">${t.code}: <b dir="ltr" style="letter-spacing:1px">${esc(p.order_id || "")}</b></div>
<p style="margin:0 0 4px;font-weight:bold">${t.items}</p>
<table width="100%" cellpadding="0" cellspacing="0">${items}</table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px">
${row(t.sub, p.subtotal || "")}${hasDisc ? row(t.disc, p.discount) : ""}${row(t.ship, p.shipping || "")}
<tr><td colspan="2" style="border-top:1px dashed #cfe2e5;height:6px"></td></tr>
${row(t.total, p.total || "", true)}
</table>
<p style="margin:18px 0 4px;font-weight:bold">${t.to}</p>
<p style="margin:0;color:#5b7479">${esc(p.name || "")} · <span dir="ltr">${esc(p.phone || "")}</span><br>${esc(p.province || "")} — ${esc(p.address || "")}</p>
<p style="margin:20px 0 0;background:#fff7e8;border-radius:10px;padding:12px 14px">${t.wait}</p>
</td></tr>
<tr><td align="center" style="padding:22px 24px 26px;color:#5b7479;font-size:13px">${t.q}<br>
<a href="mailto:support@kbeautyaf.com" style="color:#2f8794;text-decoration:none" dir="ltr">support@kbeautyaf.com</a> · <a href="https://instagram.com/${site.instagram}" style="color:#2f8794;text-decoration:none" dir="ltr">@${site.instagram}</a><br>
<a href="https://kbeautyaf.com" style="color:#9ab0b4;text-decoration:none" dir="ltr">kbeautyaf.com</a></td></tr>
</table></td></tr></table></body></html>`;
};

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
    await send(env, { from: FROM, ...owner });
  } catch (e) {
    // if the custom sender fails, still deliver the order with Resend's test sender
    try {
      await send(env, { from: "K Beauty AFG <onboarding@resend.dev>", ...owner });
    } catch (e2) {
      return json({ success: "false", message: String(e.message || e) + " | " + String(e2.message || e2) }, 502);
    }
  }

  // confirmation to the customer (only possible with a verified domain sender)
  if (p.email && p._autoresponse) {
    try {
      await send(env, {
        from: FROM,
        to: [p.email],
        subject: `${(T[p.language] || T.fa).subj} — ${p.order_id || "K Beauty AFG"}`,
        html: customerHtml(p),
        text: p._autoresponse,
        reply_to: "support@kbeautyaf.com",
      });
    } catch {}
  }
  return json({ success: "true" });
}
