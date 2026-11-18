"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import { useLang } from "./LangProvider";
import { formatPrice, discountPercent, num } from "@/lib/products";
import { pf } from "@/lib/i18n";

export default function ProductCard({ product }) {
  const { lang, t } = useLang();
  const off = discountPercent(product);
  return (
    <Link href={`/product/${product.slug}`} className="pcard">
      <div className="pcard-media">
        <ProductImage product={product} />
        {off > 0 && <span className="sale-badge">{t("sale.off", { n: num(off, lang) })}</span>}
      </div>
      <div className="pcard-body">
        <div className="pcard-brand">{product.brand}</div>
        <h3 className="pcard-name">{pf(product, "name", lang)}</h3>
        <div className="pcard-price">
          {off > 0 && <s className="old-price">{formatPrice(product.oldPrice, lang)}</s>}
          {formatPrice(product.price, lang)}
        </div>
      </div>
    </Link>
  );
}
