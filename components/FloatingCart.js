"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { toFa } from "@/lib/products";

export default function FloatingCart() {
  const { count } = useCart();
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/cart")) return null;

  return (
    <Link href="/cart" className="fab" aria-label="سبد خرید">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      سبد
      {count > 0 && <span className="fab-count">{toFa(count)}</span>}
    </Link>
  );
}
