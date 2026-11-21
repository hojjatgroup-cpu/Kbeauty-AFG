// Cloudflare Pages Function: forwards an order to FormSubmit from the server,
// so it doesn't depend on the customer's own connection. Returns FormSubmit's message on failure.
import site from "../../data/site.json";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export async function onRequestPost({ request }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: "false", message: "bad request" }, 400);
  }
  const origin = new URL(request.url).origin;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${site.orderEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin + "/cart/",
      },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: "false", message: `HTTP ${res.status}: ${text.slice(0, 160)}` };
    }
    return json(data, res.ok ? 200 : 502);
  } catch (e) {
    return json({ success: "false", message: String(e).slice(0, 160) }, 502);
  }
}
