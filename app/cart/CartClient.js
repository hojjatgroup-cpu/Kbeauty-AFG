"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLang } from "@/components/LangProvider";
import ProductImage from "@/components/ProductImage";
import SectionTitle from "@/components/SectionTitle";
import ProvinceSelect from "@/components/ProvinceSelect";
import { getProduct, formatPrice, hasPrice, num } from "@/lib/products";
import { pf } from "@/lib/i18n";
import provinces from "@/data/provinces.json";
import shipping from "@/data/shipping.json";
import site from "@/data/site.json";

const zone = (id) => shipping.zones.find((z) => z.id === id);

function makeOrderId() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KB-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${rand}`;
}

export default function CartClient() {
  const { items, setQty, remove, clear, loaded } = useCart();
  const { t, lang } = useLang();
  const [step, setStep] = useState("bag"); // bag -> checkout -> done
  const [form, setForm] = useState({ name: "", phone: "", province: "", address: "", email: "" });
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(null); // { id, text }

  if (!loaded) return null;

  if (step === "done" && done) {
    return (
      <div className="cart">
        <div className="summary done-box">
          <div className="done-icon">✓</div>
          <h2>{t("cart.thanks")}</h2>
          <p className="muted">{t("cart.thanksSub")}</p>
          <p className="order-id">
            {t("cart.orderId")}: <strong dir="ltr">{done.id}</strong>
          </p>
          <a className="btn btn-line btn-block" href={`https://ig.me/m/${site.instagram}`} target="_blank" rel="noopener">
            {t("cart.followIg")}
          </a>
          <Link href="/shop" className="btn btn-ink btn-block" style={{ marginTop: 8 }}>
            {t("cart.more")}
          </Link>
        </div>
      </div>
    );
  }

  const rows = items.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((r) => r.product);

  if (!rows.length) {
    return (
      <div className="empty">
        <SectionTitle center>{t("cart.title")}</SectionTitle>
        <p>{t("cart.empty")}</p>
        <Link href="/shop" className="btn btn-ink" style={{ marginTop: 16 }}>
          {t("cart.go")}
        </Link>
      </div>
    );
  }

  const allPriced = rows.every((r) => hasPrice(r.product.price));
  const subtotal = rows.reduce((s, r) => s + (Number(r.product.price) || 0) * r.qty, 0);
  const count = rows.reduce((s, r) => s + r.qty, 0);

  // Delivery options: two Kabul zones, then the other provinces
  const others = provinces.filter((p) => p.en !== "Kabul");
  const provFee = zone("province").fee;
  const options = [
    ...shipping.zones
      .filter((z) => z.id !== "province")
      .map((z) => ({ value: z.id, label: z[lang], note: formatPrice(z.fee, lang), fee: z.fee, time: z.time })),
    ...others.map((p) => ({ value: p.en, label: p[lang], note: formatPrice(provFee, lang), fee: provFee, time: "province" })),
  ];
  const chosen = options.find((o) => o.value === form.province);
  const shipFee = chosen ? chosen.fee : 0;
  const total = subtotal + shipFee;
  const fmtTotal = allPriced ? formatPrice(total, lang) : t("cart.totalLater");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const missing = {
    name: !form.name.trim(),
    phone: form.phone.replace(/\D/g, "").length < 7,
    province: !chosen,
    address: !form.address.trim(),
  };
  const valid = !Object.values(missing).some(Boolean);
  const err = (k) => (tried && missing[k] ? "field field-error" : "field");

  const itemLines = rows.map(
    (r, i) =>
      `${num(i + 1, lang)}. ${pf(r.product, "name", lang)} (${pf(r.product, "size", lang)}) × ${num(r.qty, lang)} — ${formatPrice(
        Number(r.product.price) * r.qty,
        lang
      )}`
  );

  const buildText = (id) =>
    [
      `${t("cart.orderId")}: ${id}`,
      "",
      ...itemLines,
      "",
      `${t("cart.subtotal")}: ${formatPrice(subtotal, lang)}`,
      `${t("cart.shipping")}: ${formatPrice(shipFee, lang)}`,
      `${t("cart.total")}: ${fmtTotal}`,
      "",
      `${t("cart.name")}: ${form.name}`,
      `${t("cart.phone")}: ${form.phone}`,
      `${t("cart.province")}: ${chosen ? chosen.label : ""}`,
      `${t("cart.address")}: ${form.address}`,
      form.email ? `${t("cart.email")}: ${form.email}` : "",
    ]
      .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
      .join("\n");

  const submit = async () => {
    setTried(true);
    if (!valid || sending) return;
    setSending(true);
    setFailed(false);
    const id = makeOrderId();
    const text = buildText(id);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.orderEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `سفارش جدید ${id} — K Beauty AFG`,
          _template: "table",
          _captcha: "false",
          order_id: id,
          name: form.name,
          phone: form.phone,
          province: chosen.label,
          address: form.address,
          email: form.email || "-",
          items: itemLines.join("\n"),
          subtotal: formatPrice(subtotal, lang),
          shipping: formatPrice(shipFee, lang),
          total: fmtTotal,
          language: lang,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || String(res.status));
      clear();
      setDone({ id, text });
      setStep("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setFailed(text);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="cart">
      <SectionTitle center>{step === "bag" ? t("cart.title") : t("cart.checkout")}</SectionTitle>

      <div className="steps-bar">
        <span className={step === "bag" ? "on" : ""}>
          {num(1, lang)}. {t("cart.step1")}
        </span>
        <span className={step === "checkout" ? "on" : ""}>
          {num(2, lang)}. {t("cart.step2")}
        </span>
      </div>

      {step === "bag" && (
        <>
          {rows.map((r) => (
            <div key={r.slug} className="cart-item">
              <Link href={`/product/${r.slug}`}>
                <ProductImage product={r.product} />
              </Link>
              <div>
                <div className="card-brand">{r.product.brand}</div>
                <div className="cart-name">{pf(r.product, "name", lang)}</div>
                <div className="muted small">{formatPrice(r.product.price, lang)}</div>
                <div className="cart-row">
                  <div className="qty">
                    <button onClick={() => setQty(r.slug, r.qty + 1)} aria-label="+">
                      +
                    </button>
                    <span>{num(r.qty, lang)}</span>
                    <button onClick={() => setQty(r.slug, r.qty - 1)} aria-label="−">
                      −
                    </button>
                  </div>
                  <button className="remove" onClick={() => remove(r.slug)}>
                    {t("cart.remove")}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="summary">
            <div className="sum-row">
              <span className="muted">{t("cart.items")}</span>
              <span>{num(count, lang)}</span>
            </div>
            <div className="sum-row">
              <span className="muted">{t("cart.subtotal")}</span>
              <span>{formatPrice(subtotal, lang)}</span>
            </div>
            <p className="hint" style={{ marginTop: 0, marginBottom: 14 }}>
              {t("cart.shipLater")}
            </p>
            <button className="btn btn-ink btn-block" onClick={() => setStep("checkout")}>
              {t("cart.continue")}
            </button>
            <Link href="/shop" className="btn btn-line btn-block" style={{ marginTop: 8 }}>
              {t("cart.more")}
            </Link>
          </div>
        </>
      )}

      {step === "checkout" && (
        <div className="summary">
          <label className={err("name")}>
            <span>{t("cart.name")} *</span>
            <input value={form.name} onChange={set("name")} autoComplete="name" />
          </label>
          <label className={err("phone")}>
            <span>{t("cart.phone")} *</span>
            <input
              value={form.phone}
              onChange={set("phone")}
              inputMode="tel"
              dir="ltr"
              autoComplete="tel"
              placeholder="07xx xxx xxx"
            />
          </label>
          <div className={err("province")}>
            <span>{t("cart.province")} *</span>
            <ProvinceSelect
              options={options}
              value={form.province}
              onChange={(v) => setForm({ ...form, province: v })}
              placeholder={t("cart.choose")}
              invalid={tried && missing.province}
            />
            {chosen && (
              <p className="hint" style={{ marginTop: 6 }}>
                {t("cart.deliveryTime")}: {t(chosen.time === "kabul" ? "ship.kabulTime" : "ship.provTime")}
              </p>
            )}
          </div>
          <label className={err("address")}>
            <span>{t("cart.address")} *</span>
            <textarea rows={3} value={form.address} onChange={set("address")} autoComplete="street-address" />
          </label>
          <label className="field">
            <span>
              {t("cart.email")} <em className="muted">({t("cart.optional")})</em>
            </span>
            <input type="email" value={form.email} onChange={set("email")} dir="ltr" autoComplete="email" />
          </label>

          <div className="totals">
            <div className="sum-row">
              <span className="muted">{t("cart.subtotal")}</span>
              <span>{formatPrice(subtotal, lang)}</span>
            </div>
            <div className="sum-row">
              <span className="muted">{t("cart.shipping")}</span>
              <span>{chosen ? formatPrice(shipFee, lang) : "—"}</span>
            </div>
            <div className="sum-row grand">
              <strong>{t("cart.total")}</strong>
              <strong>{fmtTotal}</strong>
            </div>
          </div>

          {tried && !valid && <p className="form-error">{t("cart.fill")}</p>}

          <button className="btn btn-ink btn-block" onClick={submit} disabled={sending}>
            {sending ? t("cart.sending") : t("cart.order")}
          </button>
          <button className="btn btn-line btn-block" onClick={() => setStep("bag")}>
            {t("cart.back")}
          </button>

          {failed && (
            <div className="fail-box">
              <p className="form-error">{t("cart.failed")}</p>
              <a
                className="btn btn-line btn-block"
                href={`https://ig.me/m/${site.instagram}`}
                target="_blank"
                rel="noopener"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(failed);
                  } catch (e) {}
                }}
              >
                {t("cart.orderIg")}
              </a>
              <textarea className="order-text" readOnly value={failed} onFocus={(e) => e.target.select()} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
