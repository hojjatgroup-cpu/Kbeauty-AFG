import WishlistClient from "./WishlistClient";

export const metadata = { title: "علاقه‌مندی‌ها | Wishlist", robots: { index: false }, alternates: { canonical: "/wishlist/" } };

export default function Page() {
  return <WishlistClient />;
}
