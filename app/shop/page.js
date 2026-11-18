import { Suspense } from "react";
import ShopClient from "./ShopClient";
import SectionTitle from "@/components/SectionTitle";

export const metadata = { title: "محصولات" };

export default function ShopPage() {
  return (
    <div className="container page">
      <SectionTitle center sub="محصول مناسب را با نوع پوست یا دسته‌بندی پیدا کن.">
        محصولات
      </SectionTitle>
      <Suspense fallback={null}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
