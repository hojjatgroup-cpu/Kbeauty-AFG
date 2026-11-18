"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLang } from "@/components/LangProvider";
import ProductImage from "@/components/ProductImage";
import SectionTitle from "@/components/SectionTitle";
import { getProduct, formatPrice, hasPrice, num } from "@/lib/products";
import { pf } from "@/lib/i18n";
import provinces from "@/data/provinces.json";
import site from "@/data/site.json";

export default function CartClient() {
  const { items, setQty, remove, loaded } = useCart();
  const { t, lang } = useLang();
  const [step, setStep] = useState("bag"); // bag -> checkout
  const [form, setForm] = useState({ name: "", phone: "", province: "", address: "", email: "" });
  const [tried, setTried] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!loaded) return null;

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
  const total = rows.reduce((s, r) => s + (Number(r.product.price) || 0) * r.qty, 0);
  const totalText = allPriced ? formatPrice(total, lang) : t("cart.totalLater");
  const count = rows.reduce((s, r) => s + r.qty, 0);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const missing = {
    name: !form.name.trim(),
    phone: form.phone.replace(/\D/g, "").length < 7,
    province: !form.province,
    address: !form.address.trim(),
  };
  const valid = !Object.values(missing).some(Boolean);
  const province = provinces.find((p) => p.en === form.province);

  const orderText = [
    t("cart.msgHello", { name: site.name }),
    "",
    ...rows.map(
      (r, i) =>
        `${num(i + 1, lang)}. ${r.product.brand} - ${pf(r.product, "name", lang)} (${pf(r.product, "size", lang)}) × ${num(r.qty, lang)}`
    ),
    "",
    `${t("cart.total")}: ${totalText}`,
    "",
    `${t("cart.name")}: ${form.name}`,
    `${t("cart.phone")}: ${form.phone}`,
    `${t("cart.province")}: ${province ? province[lang] : ""}`,
    `${t("cart.address")}: ${form.address}`,
    form.email ? `${t("cart.email")}: ${form.email}` : "",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");

  const onOrder = (e) => {
    if (!valid) {
      e.preventDefault();
      setTried(true);
      return;
    }
    try {
      navigator.clipboard.writeText(orderText).then(
        () => setCopied(true),
        () => {}
      );
    } catch (err) {}
  };

  const err = (k) => (tried && missing[k] ? "field field-error" : "field");

  return (
    <div className="cart">
      <SectionTitle center>{step === "bag" ? t("cart.title") : t("cart.checkout")}</SectionTitle>

      <div className="steps-bar">
        <span className={step === "bag" ? "on" : ""}>{num(1, lang)}. {t("cart.step1")}</span>
        <span className={step === "checkout" ? "on" : ""}>{num(2, lang)}. {t("cart.step2")}</span>
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
              <strong>{t("cart.total")}</strong>
              <strong>{totalText}</strong>
            </div>
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
            <input value={form.phone} onChange={set("phone")} inputMode="tel" dir="ltr" autoComplete="tel" placeholder="07xx xxx xxx" />
          </label>
          <label className={err("province")}>
            <span>{t("cart.province")} *</span>
            <select value={form.province} onChange={set("province")}>
              <option value="">{t("cart.choose")}</option>
              {provinces.map((p) => (
                <option key={p.en} value={p.en}>
                  {p[lang]}
                </option>
              ))}
            </select>
          </label>
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

          {tried && !valid && <p className="form-error">{t("cart.fill")}</p>}

          <div className="sum-row" style={{ marginTop: 6 }}>
            <strong>{t("cart.total")}</strong>
            <strong>{totalText}</strong>
          </div>

          <a
            className="btn btn-ink btn-block"
            href={`https://ig.me/m/${site.instagram}`}
            target="_blank"
            rel="noopener"
            onClick={onOrder}
          >
            {t("cart.order")}
          </a>
          {copied && <p className="success">{t("cart.copied")}</p>}
          <button className="btn btn-line btn-block" style={{ marginTop: 8 }} onClick={() => setStep("bag")}>
            {t("cart.back")}
          </button>

          {valid && (
            <>
              <p className="hint">{t("cart.help")}</p>
              <textarea className="order-text" readOnly value={orderText} onFocus={(e) => e.target.select()} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
