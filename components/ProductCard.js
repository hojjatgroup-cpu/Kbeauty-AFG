import Link from "next/link";
import ProductImage from "./ProductImage";
import { formatPrice, PRODUCT_TYPES } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="pcard glass">
      <span className="pcard-type">{PRODUCT_TYPES[product.type]}</span>
      <ProductImage product={product} />
      <div className="pcard-body">
        <div className="pcard-brand">{product.brand}</div>
        <h3 className="pcard-name">{product.name}</h3>
        <p className="pcard-short">{product.short}</p>
        <div className="pcard-foot">
          <span className="pill pill-soft">مشاهده بیشتر</span>
          <span className="pcard-meta">
            <span className="pcard-price">{formatPrice(product.price)}</span>
            <span className="pcard-size">{product.size}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
