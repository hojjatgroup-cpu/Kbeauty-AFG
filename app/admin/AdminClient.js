"use client";
import { useEffect, useState } from "react";

const KEY = "kb-admin";
const fmt = (d) => (d ? new Date(d).toLocaleString("fa-AF", { dateStyle: "medium", timeStyle: "short" }) : "—");
const ERR = { wrong: "رمز اشتباه است.", nopass: "رمز مدیریت هنوز در Cloudflare تنظیم نشده است.", storage: "حافظه وصل نیست.", locked: "به خاطر چند رمز اشتباه، ورود تا ۳۰ دقیقه قفل شد." };

export default function AdminClient() {
  const [pw, setPw] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("orders");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async (password) => {
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const d = await r.json().catch(() => ({}));
      if (!d.ok) throw new Error(d.reason || "x");
      setData(d);
      try { sessionStorage.setItem(KEY, password); } catch {}
    } catch (e) {
      setErr(ERR[e.message] || "خطا در دریافت اطلاعات.");
      try { sessionStorage.removeItem(KEY); } catch {}
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(KEY);
      if (s) { setPw(s); load(s); }
    } catch {}
  }, []);

  if (!data)
    return (
      <div className="container page">
        <form className="acc-box" onSubmit={(e) => { e.preventDefault(); load(pw); }}>
          <h2>ورود مدیر</h2>
          <input type="password" dir="ltr" placeholder="رمز مدیریت" value={pw} onChange={(e) => setPw(e.target.value)} required autoComplete="current-password" />
          <button className="btn btn-ink" disabled={busy}>{busy ? "…" : "ورود"}</button>
          {err && <p className="acc-err">{err}</p>}
        </form>
      </div>
    );

  const s = q.trim().toLowerCase();
  const match = (o) => !s || JSON.stringify(o).toLowerCase().includes(s);
  const orders = data.orders.filter(match);
  const users = data.users.filter(match);

  return (
    <div className="container page adm">
      <div className="adm-stats">
        <div><b>{data.orders.length.toLocaleString("fa-AF")}</b><span>سفارش</span></div>
        <div><b>{data.users.length.toLocaleString("fa-AF")}</b><span>مشتری</span></div>
      </div>
      <div className="adm-tabs">
        <button className={tab === "orders" ? "on" : ""} onClick={() => setTab("orders")}>سفارش‌ها</button>
        <button className={tab === "users" ? "on" : ""} onClick={() => setTab("users")}>مشتری‌ها</button>
        <button onClick={() => load(pw)} disabled={busy} aria-label="تازه کردن">{busy ? "…" : "↻"}</button>
        <button onClick={() => { try { sessionStorage.removeItem(KEY); } catch {} setData(null); setPw(""); }} aria-label="خروج">⎋</button>
      </div>
      <input className="adm-search" placeholder="جستجو: نام، شماره، کد سفارش…" value={q} onChange={(e) => setQ(e.target.value)} />

      {tab === "orders" &&
        (orders.length === 0 ? <p className="muted" style={{ textAlign: "center" }}>سفارشی نیست.</p> :
          orders.map((o) => (
            <div key={o.id} className="adm-card">
              <div className="adm-top"><b dir="ltr">{o.id}</b><span>{fmt(o.at)}</span></div>
              <div className="adm-name">{o.name}</div>
              <div className="adm-line">
                <a href={`tel:${o.phone}`} dir="ltr">📞 {o.phone}</a>
                {o.phone && <a href={`https://wa.me/93${String(o.phone).replace(/\D/g, "").replace(/^0/, "")}`} target="_blank" rel="noopener">واتساپ</a>}
              </div>
              <div className="adm-muted">{o.province} — {o.address}</div>
              {o.email && <div className="adm-muted" dir="ltr">{o.email}</div>}
              <div className="adm-items">{o.items}</div>
              <div className="adm-total">
                {o.coupon && o.coupon !== "-" && <span className="adm-tag">{o.coupon}</span>}
                <b>{o.total}</b>
              </div>
            </div>
          )))}

      {tab === "users" &&
        (users.length === 0 ? <p className="muted" style={{ textAlign: "center" }}>مشتری‌ای نیست.</p> :
          users.map((u) => (
            <div key={u.email} className="adm-card adm-user">
              <div className="acc-ava">{u.picture ? <img src={u.picture} alt="" referrerPolicy="no-referrer" /> : (u.name || u.email)[0].toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="adm-name">{u.name || "—"}</div>
                <div className="adm-muted" dir="ltr" style={{ textAlign: "start" }}>{u.email}</div>
                {u.phone && <a href={`tel:${u.phone}`} dir="ltr" className="adm-muted">📞 {u.phone}</a>}
                {u.address && <div className="adm-muted">{u.address}</div>}
                <div className="adm-muted">عضویت: {fmt(u.created)} · {u.orders.toLocaleString("fa-AF")} سفارش</div>
              </div>
            </div>
          )))}
    </div>
  );
}
