import { TYPE_ICONS } from "@/lib/products";

export default function ProductImage({ product, large = false }) {
  const cls = `pimg ${large ? "pimg-lg" : ""}`;
  if (product.image) {
    return (
      <div className={cls}>
        <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`${cls} pimg-ph pimg-${product.type}`}>
      <span className="pimg-icon">{TYPE_ICONS[product.type]}</span>
      <span className="pimg-brand">{product.brand}</span>
    </div>
  );
}
