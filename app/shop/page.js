import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "محصولات | Products",
  description: "خرید آنلاین محصولات اورجینال کره‌ای مراقبت پوست: ضدآفتاب، سرم، کرم، تونر، شوینده و ماسک؛ فیلتر بر اساس نوع پوست چرب، خشک، مختلط و حساس.",
  alternates: { canonical: "/shop/" },
  openGraph: { title: "محصولات", description: "خرید آنلاین محصولات اورجینال کره‌ای مراقبت پوست: ضدآفتاب، سرم، کرم، تونر، شوینده و ماسک؛ فیلتر بر اساس نوع پوست چرب، خشک، مختلط و حساس.", url: "/shop/" },
};

export default function ShopPage() {
  return (
    <div className="container page">
      <Suspense fallback={null}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
