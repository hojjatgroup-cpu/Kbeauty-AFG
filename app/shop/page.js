import ShopClient from "./ShopClient";
import { SKIN_TYPES, PRODUCT_TYPES } from "@/lib/products";

export const metadata = { title: "فروشگاه" };

export default async function ShopPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const skin = SKIN_TYPES[sp.skin] ? sp.skin : "all";
  const type = PRODUCT_TYPES[sp.type] ? sp.type : "all";

  return (
    <div className="container">
      <h1 className="page-title">فروشگاه</h1>
      <ShopClient key={`${skin}-${type}`} initialSkin={skin} initialType={type} />
    </div>
  );
}
