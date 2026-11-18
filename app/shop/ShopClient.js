"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { useLang } from "@/components/LangProvider";
import { getAllProducts, SKIN_TYPES, PRODUCT_TYPES, num, usedTypes, matchesSearch } from "@/lib/products";

function Select({ label, allLabel, options, value, onChange }) {
  return (
    <label className="select glass">
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        <option value="all">
          {label}: {allLabel}
        </option>
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

export default function ShopClient() {
  const params = useSearchParams();
  const { t, lang, skins, types } = useLang();
  const [skin, setSkin] = useState("all");
  const [type, setType] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const s = params.get("skin");
    const ty = params.get("type");
    setSkin(SKIN_TYPES[s] ? s : "all");
    setType(PRODUCT_TYPES[ty] ? ty : "all");
    setQ(params.get("q") || "");
  }, [params]);

  const products = getAllProducts().filter(
    (p) =>
      (skin === "all" || p.skin.includes(skin)) &&
      (type === "all" || p.type === type) &&
      matchesSearch(p, q)
  );

  return (
    <>
      <SectionTitle center sub={t("shop.sub")}>
        {t("shop.title")}
      </SectionTitle>

      <div className="filters">
        <label className="search glass">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search.placeholder")} />
        </label>
        <div className="filter-row">
          <Select label={t("shop.skin")} allLabel={t("shop.all")} options={skins} value={skin} onChange={setSkin} />
          <Select label={t("shop.type")} allLabel={t("shop.all")} options={usedTypes(types)} value={type} onChange={setType} />
        </div>
      </div>

      <p className="count">
        {num(products.length, lang)} {t("shop.count")}
      </p>

      {products.length ? (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">{t("shop.empty")}</div>
      )}
    </>
  );
}
