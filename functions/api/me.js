// GET: the signed-in user. POST: update name / phone / province / address.
import { json, sessionUser, saveUser, publicUser } from "./_auth.js";

export async function onRequestGet({ request, env }) {
  const u = await sessionUser(env, request);
  if (!u) return json({ ok: false, google: !!env.GOOGLE_CLIENT_ID }, 401);
  return json({ ok: true, user: publicUser(u) });
}

export async function onRequestPost({ request, env }) {
  const u = await sessionUser(env, request);
  if (!u) return json({ ok: false }, 401);
  let b = {};
  try { b = await request.json(); } catch {}
  for (const k of ["name", "phone", "province", "address"]) if (typeof b[k] === "string") u[k] = b[k].slice(0, 300);
  await saveUser(env, u);
  return json({ ok: true, user: publicUser(u) });
}
