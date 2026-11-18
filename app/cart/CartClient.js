"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import ProductImage from "@/components/ProductImage";
import { getProduct, formatPrice, hasPrice, toFa } from "@/lib/products";
import site from "@/data/site.json";

export default function CartClient() {
  const { items, setQty, remove, loaded } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  if (!loaded) return null;

  const rows = items
    .map((i) => ({ ...i, product: getProduct(i.slug) }))
    .filter((r) => r.product);

  if (!rows.length) {
    return (
      <div className="empty">
        <p style={{ fontSize: 40 }}>🛍️</p>
        <p>سبد خرید شما خالی است.</p>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: 14 }}>
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  const allPriced = rows.every((r) => hasPrice(r.product.price));
  const total = rows.reduce((s, r) => s + (Number(r.product.price) || 0) * r.qty, 0);

  const orderText = [
    `سلام، می‌خواهم از ${site.name} سفارش بدهم:`,
    "",
    ...rows.map(
      (r, idx) =>
        `${toFa(idx + 1)}. ${r.product.brand} - ${r.product.name} (${r.product.size}) × ${toFa(r.qty)}`
    ),
    "",
    allPriced ? `جمع کل: ${formatPrice(total)}` : "",
    `نام: ${name || "-"}`,
    `شمارهٔ تماس: ${phone || "-"}`,
    `شهر / آدرس: ${city || "-"}`,
    note ? `توضیحات: ${note}` : "",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");

  const handleOrder = () => {
    try {
      navigator.clipboard.writeText(orderText).then(
        () => setCopied(true),
        () => setCopied(false)
      );
    } catch (e) {}
  };

  return (
    <>
      {rows.map((r) => (
        <div key={r.slug} className="cart-item">
          <Link href={`/product/${r.slug}`}>
            <ProductImage product={r.product} />
          </Link>
          <div>
            <div className="card-brand">{r.product.brand}</div>
            <div className="cart-name">{r.product.name}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              {formatPrice(r.product.price)}
            </div>
            <div className="cart-row">
              <div className="qty">
                <button onClick={() => setQty(r.slug, r.qty + 1)} aria-label="بیشتر">
                  +
                </button>
                <span>{toFa(r.qty)}</span>
                <button onClick={() => setQty(r.slug, r.qty - 1)} aria-label="کمتر">
                  −
                </button>
              </div>
              <button className="remove" onClick={() => remove(r.slug)}>
                حذف
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="summary">
        <div className="cart-row" style={{ marginTop: 0, marginBottom: 14 }}>
          <strong>جمع کل</strong>
          <strong>{allPriced ? formatPrice(total) : "[پس از تأیید سفارش اعلام می‌شود]"}</strong>
        </div>

        <label className="field">
          <span>نام</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          <span>شمارهٔ تماس</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" dir="ltr" />
        </label>
        <label className="field">
          <span>شهر / آدرس</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label className="field">
          <span>توضیحات (اختیاری)</span>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </label>

        <a
          className="btn btn-primary btn-block"
          href={`https://ig.me/m/${site.instagram}`}
          target="_blank"
          rel="noopener"
          onClick={handleOrder}
        >
          📷 ثبت سفارش در اینستاگرام
        </a>
        {copied && <p className="success">✓ متن سفارش کپی شد. در صفحهٔ اینستاگرام آن را Paste کنید و بفرستید.</p>}

        <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
          با زدن دکمه، متن سفارش کپی می‌شود و صفحهٔ پیام اینستاگرام ما باز می‌شود. متن را آن‌جا بچسبانید و بفرستید. اگر
          کپی نشد، متن زیر را خودتان کپی کنید:
        </p>
        <textarea className="order-text" readOnly value={orderText} onFocus={(e) => e.target.select()} />
      </div>
    </>
  );
}
