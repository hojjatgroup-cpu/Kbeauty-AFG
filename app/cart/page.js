import CartClient from "./CartClient";

export const metadata = {
  title: "سبد خرید | Bag",
  description: "سبد خرید و ثبت سفارش در K Beauty AFG. پرداخت هنگام تحویل.",
  alternates: { canonical: "/cart/" },
  openGraph: { title: "سبد خرید", description: "سبد خرید و ثبت سفارش در K Beauty AFG. پرداخت هنگام تحویل.", url: "/cart/" },
};

export default function CartPage() {
  return (
    <div className="container page">
      <CartClient />
    </div>
  );
}
