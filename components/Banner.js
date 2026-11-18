import Link from "next/link";

export default function Banner({ banner }) {
  if (!banner?.image) return null;
  const img = <img src={banner.image} alt={banner.alt || ""} />;
  if (banner.href) {
    return (
      <Link href={banner.href} className="banner-img">
        {img}
      </Link>
    );
  }
  return <div className="banner-img">{img}</div>;
}
