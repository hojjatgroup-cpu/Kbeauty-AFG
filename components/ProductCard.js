import Link from "next/link";
import ProductImage from "./ProductImage";
import AddToCartButton from "./AddToCartButton";
import { formatPrice, PRODUCT_TYPES } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} className="card-link">
        <ProductImage product={product} />
        <div className="card-body">
          <div className="card-brand">{product.brand}</div>
          <div className="card-name">{product.name}</div>
          <div className="card-meta">
            {PRODUCT_TYPES[product.type]} · {product.size}
          </div>
          <div className="card-price">{formatPrice(product.price)}</div>
        </div>
      </Link>
      <div className="card-actions">
        <AddToCartButton slug={product.slug} small />
      </div>
    </div>
  );
}
