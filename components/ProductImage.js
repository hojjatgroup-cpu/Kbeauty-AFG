import { TYPE_ICONS } from "@/lib/products";

export default function ProductImage({ product, large = false }) {
  const cls = `pimg ${large ? "pimg-lg" : ""}`;
  if (product.image) {
    return (
      <div className={cls}>
        <img
          src={large ? product.image : product.image.replace("/products/", "/products/thumb/")}
          alt={`${product.brand} ${product.name_en || product.name}`}
          loading={large ? "eager" : "lazy"}
          decoding="async"
          width={large ? 720 : 420}
          height={large ? 720 : 420}
        />
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
