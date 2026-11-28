// Sends a 6-digit sign-in code by email.
import { json, FROM, cleanEmail, validEmail } from "../_auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.COUPONS) return json({ ok: false, reason: "storage" }, 500);
  let body = {};
  try { body = await request.json(); } catch {}
  const email = cleanEmail(body.email);
  if (!validEmail(email)) return json({ ok: false, reason: "email" }, 400);

  const key = `otp:${email}`;
  const old = await env.COUPONS.get(key);
  if (old && Date.now() - JSON.parse(old).sent < 60000) return json({ ok: false, reason: "wait" }, 429);

  const code = String(100000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 900000));
  await env.COUPONS.put(key, JSON.stringify({ code, tries: 0, sent: Date.now() }), { expirationTtl: 600 });

  const lang = ["fa", "en", "ko"].includes(body.lang) ? body.lang : "fa";
  const txt = {
    fa: ["کد ورود شما به K Beauty AFG", "کد ورود شما:", "این کد تا ۱۰ دقیقه معتبر است. اگر شما درخواست نداده‌اید، این ایمیل را نادیده بگیرید.", "rtl"],
    en: ["Your K Beauty AFG sign-in code", "Your sign-in code:", "This code is valid for 10 minutes. If you didn't ask for it, ignore this email.", "ltr"],
    ko: ["K Beauty AFG 로그인 코드", "로그인 코드:", "이 코드는 10분간 유효합니다. 요청하지 않으셨다면 이 메일을 무시하세요.", "ltr"],
  }[lang];
  const html = `<div dir="${txt[3]}" style="font-family:Tahoma,Arial,sans-serif;background:#f2f8f9;padding:24px 12px"><div style="max-width:420px;margin:auto;background:#fff;border-radius:16px;padding:28px 24px;text-align:center;color:#1f3a3f">
<img src="https://kbeautyaf.com/email-logo.png" width="160" alt="K Beauty AFG" style="display:block;margin:0 auto 18px">
<p style="margin:0 0 10px">${txt[1]}</p>
<div style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#2f8794;margin:6px 0 16px" dir="ltr">${code}</div>
<p style="margin:0;color:#6f8a8e;font-size:13px;line-height:1.9">${txt[2]}</p></div></div>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [email], subject: `${txt[0]}: ${code}`, html, text: `${txt[1]} ${code}` }),
  });
  if (!r.ok) return json({ ok: false, reason: "send" }, 502);
  return json({ ok: true });
}
