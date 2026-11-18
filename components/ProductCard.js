import Link from "next/link";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="pcard">
      <ProductImage product={product} />
      <div className="pcard-body">
        <div className="pcard-brand">{product.brand}</div>
        <h3 className="pcard-name">{product.name}</h3>
        <div className="pcard-price">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
