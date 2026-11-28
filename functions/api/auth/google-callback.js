import { cookies, login } from "../_auth.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const back = (q) => Response.redirect(`${url.origin}/account/${q}`, 302);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state || state !== cookies(request).kb_gstate || !env.COUPONS) return back("?err=google");

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${url.origin}/api/auth/google-callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!r.ok) return back("?err=google");
  const tok = await r.json();
  let info;
  try {
    // id_token comes straight from Google over HTTPS, so its payload can be read directly
    const part = tok.id_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    info = JSON.parse(decodeURIComponent(escape(atob(part))));
  } catch {
    return back("?err=google");
  }
  if (!info.email || info.email_verified === false || info.aud !== env.GOOGLE_CLIENT_ID) return back("?err=google");

  const cookie = await login(env, { email: info.email.toLowerCase(), name: info.name, picture: info.picture });
  const h = new Headers({ location: `${url.origin}/account/` });
  h.append("set-cookie", cookie);
  h.append("set-cookie", "kb_gstate=; Path=/; Max-Age=0");
  return new Response(null, { status: 302, headers: h });
}
