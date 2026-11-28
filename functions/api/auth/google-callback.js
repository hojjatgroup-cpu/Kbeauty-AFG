import { cookies, login } from "../_auth.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const back = (q) => Response.redirect(`${url.origin}/account/${q}`, 302);
  const cid = (env.GOOGLE_CLIENT_ID || "").trim();
  const secret = (env.GOOGLE_CLIENT_SECRET || "").trim();
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (url.searchParams.get("error")) return back(`?err=google&why=${encodeURIComponent(url.searchParams.get("error"))}`);
  if (!env.COUPONS) return back("?err=google&why=storage");
  if (!secret) return back("?err=google&why=nosecret");
  if (!code || !state || state !== cookies(request).kb_gstate) return back("?err=google&why=state");

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: cid,
      client_secret: secret,
      redirect_uri: `${url.origin}/api/auth/google-callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    return back(`?err=google&why=token-${encodeURIComponent(e.error || r.status)}`);
  }
  const tok = await r.json();
  let info;
  try {
    // id_token comes straight from Google over HTTPS, so its payload can be read directly
    const part = tok.id_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    info = JSON.parse(decodeURIComponent(escape(atob(part))));
  } catch {
    return back("?err=google&why=idtoken");
  }
  if (!info.email || info.email_verified === false || info.aud !== cid) return back("?err=google&why=aud");

  const cookie = await login(env, { email: info.email.toLowerCase(), name: info.name, picture: info.picture });
  const h = new Headers({ location: `${url.origin}/account/` });
  h.append("set-cookie", cookie);
  h.append("set-cookie", "kb_gstate=; Path=/; Max-Age=0");
  return new Response(null, { status: 302, headers: h });
}
