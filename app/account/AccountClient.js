"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import SectionTitle from "@/components/SectionTitle";

const T = {
  fa: {
    title: "حساب من", login: "ورود یا ساخت حساب", loginSub: "با حساب گوگل یا ایمیل خود وارد شوید. سفارش‌ها و آدرس شما ذخیره می‌شود.",
    google: "ورود با گوگل", or: "یا با ایمیل", email: "ایمیل", send: "ارسال کد", code: "کد ۶ رقمی که به ایمیل‌تان فرستادیم", verify: "ورود",
    sentTo: "کد به این ایمیل فرستاده شد:", change: "تغییر ایمیل", hi: "سلام", profile: "اطلاعات ارسال", name: "نام و تخلص", phone: "شمارهٔ تماس",
    address: "آدرس منزل", save: "ذخیره", saved: "ذخیره شد ✓", orders: "سفارش‌های من", noOrders: "هنوز سفارشی ثبت نکرده‌اید.", shop: "دیدن محصولات",
    logout: "خروج از حساب", wish: "علاقه‌مندی‌های من", edit: "ویرایش پروفایل", cancel: "انصراف", empty: "—",
    err: { email: "ایمیل درست نیست.", wait: "لطفاً یک دقیقه صبر کنید و دوباره بزنید.", send: "ارسال کد انجام نشد. دوباره امتحان کنید.", code: "کد اشتباه است.", expired: "کد منقضی شده؛ دوباره کد بگیرید.", storage: "سیستم حساب کاربری هنوز کامل فعال نشده است.", google: "ورود با گوگل هنوز فعال نیست. فعلاً با ایمیل وارد شوید." },
  },
  en: {
    title: "My account", login: "Sign in or create an account", loginSub: "Use Google or your email. Your orders and address will be saved.",
    google: "Continue with Google", or: "or with email", email: "Email", send: "Send code", code: "6-digit code we emailed you", verify: "Sign in",
    sentTo: "Code sent to:", change: "Change email", hi: "Hi", profile: "Delivery details", name: "Full name", phone: "Phone",
    address: "Address", save: "Save", saved: "Saved ✓", orders: "My orders", noOrders: "No orders yet.", shop: "Browse products",
    logout: "Sign out", wish: "My wishlist", edit: "Edit profile", cancel: "Cancel", empty: "—",
    err: { email: "Please enter a valid email.", wait: "Please wait a minute and try again.", send: "Couldn't send the code. Try again.", code: "Wrong code.", expired: "Code expired; request a new one.", storage: "Accounts are not fully set up yet.", google: "Google sign-in isn't ready yet. Please use email for now." },
  },
  ko: {
    title: "마이페이지", login: "로그인 또는 회원가입", loginSub: "구글 또는 이메일로 로그인하세요. 주문과 주소가 저장됩니다.",
    google: "구글로 계속하기", or: "또는 이메일로", email: "이메일", send: "코드 보내기", code: "이메일로 받은 6자리 코드", verify: "로그인",
    sentTo: "코드를 보낸 이메일:", change: "이메일 변경", hi: "안녕하세요", profile: "배송 정보", name: "이름", phone: "전화번호",
    address: "주소", save: "저장", saved: "저장됨 ✓", orders: "주문 내역", noOrders: "아직 주문이 없습니다.", shop: "상품 보기",
    logout: "로그아웃", wish: "위시리스트", edit: "프로필 수정", cancel: "취소", empty: "—",
    err: { email: "올바른 이메일을 입력하세요.", wait: "잠시 후 다시 시도하세요.", send: "코드를 보내지 못했습니다.", code: "코드가 틀렸습니다.", expired: "코드가 만료되었습니다.", storage: "계정 기능이 아직 준비되지 않았습니다.", google: "구글 로그인이 아직 준비되지 않았습니다. 이메일을 이용하세요." },
  },
};

const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" />
  </svg>
);

export default function AccountClient() {
  const { lang } = useLang();
  const l = T[lang] || T.fa;
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = () =>
    fetch("/api/me")
      .then((r) => r.json().catch(() => ({})))
      .then((d) => {
        setUser(d && d.user ? d.user : null);
        if (d && d.user) setForm({ name: d.user.name || "", phone: d.user.phone || "", address: d.user.address || "" });
      })
      .catch(() => setUser(null));

  useEffect(() => {
    load();
    const q = new URLSearchParams(window.location.search).get("err");
    if (q === "google") setErr(l.err.google);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const post = async (url, body) => {
    setBusy(true);
    setErr("");
    try {
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.reason || "send");
      return d;
    } catch (e) {
      setErr(l.err[e.message] || l.err.send);
      return null;
    } finally {
      setBusy(false);
    }
  };

  const sendCode = async (e) => {
    e.preventDefault();
    if (await post("/api/auth/email-start", { email, lang })) setStep("code");
  };
  const verify = async (e) => {
    e.preventDefault();
    if (await post("/api/auth/email-verify", { email, code })) load();
  };
  const save = async (e) => {
    e.preventDefault();
    const d = await post("/api/me", form);
    if (d) {
      setUser(d.user);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };
  const logout = async () => {
    await post("/api/auth/logout", {});
    setUser(null);
    setStep("email");
    setCode("");
  };

  return (
    <div className="container page">
      <SectionTitle as="h1" center>{l.title}</SectionTitle>

      {user === undefined && <p className="muted" style={{ textAlign: "center" }}>…</p>}

      {user === null && (
        <div className="acc-box">
          <h2>{l.login}</h2>
          <p className="muted" style={{ marginBottom: 16 }}>{l.loginSub}</p>
          <a className="g-btn" href="/api/auth/google">
            <GoogleG /> {l.google}
          </a>
          <div className="acc-or">{l.or}</div>
          {step === "email" ? (
            <form onSubmit={sendCode}>
              <input type="email" dir="ltr" inputMode="email" autoComplete="email" placeholder={l.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button className="btn btn-ink" disabled={busy}>{busy ? "…" : l.send}</button>
            </form>
          ) : (
            <form onSubmit={verify}>
              <p className="muted">
                {l.sentTo} <span dir="ltr">{email}</span>
              </p>
              <input dir="ltr" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder={l.code} value={code} onChange={(e) => setCode(e.target.value)} required style={{ textAlign: "center", letterSpacing: 6, fontSize: 20 }} />
              <button className="btn btn-ink" disabled={busy}>{busy ? "…" : l.verify}</button>
              <p style={{ textAlign: "center", marginTop: 10 }}>
                <button type="button" className="link-line" style={{ background: "none", border: 0, borderBottom: "1px solid", cursor: "pointer", font: "inherit" }} onClick={() => { setStep("email"); setCode(""); setErr(""); }}>
                  {l.change}
                </button>
              </p>
            </form>
          )}
          {err && <p className="acc-err">{err}</p>}
        </div>
      )}

      {user && (
        <div className="acc-box">
          <div className="acc-head">
            <div className="acc-ava">{user.picture ? <img src={user.picture} alt="" referrerPolicy="no-referrer" /> : (user.name || user.email)[0].toUpperCase()}</div>
            <div>
              <b>{l.hi} {user.name || ""}</b>
              <div className="muted" dir="ltr" style={{ textAlign: "start", fontSize: 12.5 }}>{user.email}</div>
            </div>
          </div>

          {editing || !(user.name || user.phone || user.address) ? (
            <form onSubmit={save}>
              <p style={{ fontWeight: "bold", marginBottom: 2 }}>{l.profile}</p>
              <input placeholder={l.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input dir="ltr" inputMode="tel" placeholder={l.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input placeholder={l.address} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <button className="btn btn-ink" disabled={busy}>{l.save}</button>
              {editing && (
                <button type="button" className="btn btn-line" style={{ marginTop: 8 }} onClick={() => { setEditing(false); setForm({ name: user.name || "", phone: user.phone || "", address: user.address || "" }); }}>
                  {l.cancel}
                </button>
              )}
            </form>
          ) : (
            <div className="acc-info">
              <div className="acc-info-head">
                <p style={{ fontWeight: "bold" }}>{l.profile}</p>
                {saved && <span className="acc-saved">{l.saved}</span>}
              </div>
              <div className="acc-row"><span>{l.name}</span><b>{user.name || l.empty}</b></div>
              <div className="acc-row"><span>{l.phone}</span><b dir="ltr">{user.phone || l.empty}</b></div>
              <div className="acc-row"><span>{l.address}</span><b>{user.address || l.empty}</b></div>
              <button className="btn btn-line" style={{ marginTop: 12 }} onClick={() => setEditing(true)}>
                ✎ {l.edit}
              </button>
            </div>
          )}

          <div className="acc-orders">
            <p style={{ fontWeight: "bold" }}>{l.orders}</p>
            {(user.orders || []).length === 0 ? (
              <p className="muted" style={{ textAlign: "start" }}>{l.noOrders} <Link href="/shop" className="link-line">{l.shop}</Link></p>
            ) : (
              user.orders.map((o) => (
                <div key={o.id} className="acc-order">
                  <b dir="ltr">{o.id}</b> · {new Date(o.date).toLocaleDateString(lang === "fa" ? "fa-AF" : lang)}
                  <div style={{ whiteSpace: "pre-line" }}>{o.items}</div>
                  <div><b>{o.total}</b></div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Link href="/wishlist" className="btn btn-line" style={{ flex: 1 }}>{l.wish}</Link>
            <button className="btn btn-line" style={{ flex: 1 }} onClick={logout} disabled={busy}>{l.logout}</button>
          </div>
          {err && <p className="acc-err">{err}</p>}
        </div>
      )}
    </div>
  );
}
