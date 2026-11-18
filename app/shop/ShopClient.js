"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, SKIN_TYPES, PRODUCT_TYPES, toFa } from "@/lib/products";

function Chips({ options, value, onChange }) {
  return (
    <div className="chips">
      <button className={`chip ${value === "all" ? "chip-active" : ""}`} onClick={() => onChange("all")}>
        همه
      </button>
      {Object.entries(options).map(([key, label]) => (
        <button key={key} className={`chip ${value === key ? "chip-active" : ""}`} onClick={() => onChange(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export default function ShopClient({ initialSkin = "all", initialType = "all" }) {
  const [skin, setSkin] = useState(initialSkin);
  const [type, setType] = useState(initialType);

  const products = getAllProducts().filter(
    (p) => (skin === "all" || p.skin.includes(skin)) && (type === "all" || p.type === type)
  );

  return (
    <>
      <div className="filters">
        <div>
          <div className="filter-label">نوع پوست</div>
          <Chips options={SKIN_TYPES} value={skin} onChange={setSkin} />
        </div>
        <div>
          <div className="filter-label">نوع محصول</div>
          <Chips options={PRODUCT_TYPES} value={type} onChange={setType} />
        </div>
      </div>
      <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
        {toFa(products.length)} محصول
      </p>
      {products.length ? (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">محصولی با این فیلترها پیدا نشد.</div>
      )}
    </>
  );
}
