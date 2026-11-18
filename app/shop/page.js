import ShopClient from "./ShopClient";
import SectionTitle from "@/components/SectionTitle";
import { SKIN_TYPES, PRODUCT_TYPES } from "@/lib/products";

export const metadata = { title: "محصولات" };

export default async function ShopPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const skin = SKIN_TYPES[sp.skin] ? sp.skin : "all";
  const type = PRODUCT_TYPES[sp.type] ? sp.type : "all";

  return (
    <div className="container page">
      <SectionTitle center sub="محصول مناسب را با نوع پوست یا دسته‌بندی پیدا کن.">
        محصولات
      </SectionTitle>
      <ShopClient key={`${skin}-${type}`} initialSkin={skin} initialType={type} />
    </div>
  );
}
