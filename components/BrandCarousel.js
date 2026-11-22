"use client";

import brands from "@/data/brands.json";
import Wheel from "./Wheel";

export default function BrandCarousel({ dir }) {
  const items = brands.map((b) => ({
    key: b.slug,
    href: `/shop?brand=${b.slug}`,
    label: b.name,
    node: <img src={b.logo} alt={b.name} width="480" height="240" loading="lazy" draggable="false" />,
  }));
  return <Wheel items={items} dir={dir} />;
}
