"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { toFa } from "@/lib/products";

export default function FloatingCart() {
  const { count } = useCart();
  const pathname = usePathname();
  if (pathname === "/cart") return null;

  return (
    <Link href="/cart" className="fab">
      <span aria-hidden="true">🛍️</span>
      سبد خرید
      {count > 0 && <span className="fab-count">{toFa(count)}</span>}
    </Link>
  );
}
