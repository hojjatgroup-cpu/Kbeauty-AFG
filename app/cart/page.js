import CartClient from "./CartClient";

export const metadata = { title: "سبد خرید | Bag" };

export default function CartPage() {
  return (
    <div className="container page">
      <CartClient />
    </div>
  );
}
