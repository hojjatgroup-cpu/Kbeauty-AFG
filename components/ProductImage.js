import { TYPE_ICONS } from "@/lib/products";

export default function ProductImage({ product, large = false }) {
  if (product.image) {
    return (
      <div className={`pimg ${large ? "pimg-lg" : ""}`}>
        <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`pimg pimg-ph pimg-${product.type} ${large ? "pimg-lg" : ""}`}>
      <span className="pimg-icon">{TYPE_ICONS[product.type]}</span>
      <span className="pimg-brand">{product.brand}</span>
    </div>
  );
}
