import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = { title: "محصولات | Products" };

export default function ShopPage() {
  return (
    <div className="container page">
      <Suspense fallback={null}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
