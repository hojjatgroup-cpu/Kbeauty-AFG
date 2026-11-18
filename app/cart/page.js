import CartClient from "./CartClient";

export const metadata = { title: "سبد خرید" };

export default function CartPage() {
  return (
    <div className="container">
      <h1 className="page-title">سبد خرید</h1>
      <CartClient />
    </div>
  );
}
