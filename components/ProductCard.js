"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import { useLang } from "./LangProvider";
import { formatPrice } from "@/lib/products";
import { pf } from "@/lib/i18n";

export default function ProductCard({ product }) {
  const { lang } = useLang();
  return (
    <Link href={`/product/${product.slug}`} className="pcard">
      <ProductImage product={product} />
      <div className="pcard-body">
        <div className="pcard-brand">{product.brand}</div>
        <h3 className="pcard-name">{pf(product, "name", lang)}</h3>
        <div className="pcard-price">{formatPrice(product.price, lang)}</div>
      </div>
    </Link>
  );
}
