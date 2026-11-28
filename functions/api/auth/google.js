// Starts "Sign in with Google". Needs GOOGLE_CLIENT_ID (and GOOGLE_CLIENT_SECRET for the callback).
import { token } from "../_auth.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.GOOGLE_CLIENT_ID) return Response.redirect(`${url.origin}/account/?err=google`, 302);
  const state = token(16);
  const q = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${url.origin}/api/auth/google-callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return new Response(null, {
    status: 302,
    headers: {
      location: `https://accounts.google.com/o/oauth2/v2/auth?${q}`,
      "set-cookie": `kb_gstate=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
