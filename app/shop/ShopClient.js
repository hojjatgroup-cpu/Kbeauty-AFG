"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, SKIN_TYPES, PRODUCT_TYPES, toFa } from "@/lib/products";

function Select({ label, options, value, onChange }) {
  return (
    <label className="select glass">
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        <option value="all">{label}: همه</option>
        {Object.entries(options).map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      <span className="select-arrow">⌄</span>
    </label>
  );
}

export default function ShopClient({ initialSkin = "all", initialType = "all" }) {
  const [skin, setSkin] = useState(initialSkin);
  const [type, setType] = useState(initialType);
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const products = getAllProducts().filter(
    (p) =>
      (skin === "all" || p.skin.includes(skin)) &&
      (type === "all" || p.type === type) &&
      (!query || `${p.name} ${p.brand} ${p.short}`.toLowerCase().includes(query))
  );

  return (
    <>
      <div className="filters">
        <label className="search glass">
          <span aria-hidden="true">⌕</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجوی محصول" />
        </label>
        <div className="filter-row">
          <Select label="نوع پوست" options={SKIN_TYPES} value={skin} onChange={setSkin} />
          <Select label="دسته" options={PRODUCT_TYPES} value={type} onChange={setType} />
        </div>
      </div>

      <p className="muted count">{toFa(products.length)} محصول</p>

      {products.length ? (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty glass">محصولی با این فیلترها پیدا نشد.</div>
      )}
    </>
  );
}
