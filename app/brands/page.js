import BrandsClient from "./BrandsClient";

export const metadata = {
  title: "برندهای کره‌ای | Brands",
  description: "برندهای اورجینال کره‌ای در K Beauty AFG: Anua، COSRX، Beauty of Joseon، SKIN1004، Torriden، medicube، Purito و بیشتر.",
  alternates: { canonical: "/brands/" },
};

export default function Page() {
  return <BrandsClient />;
}
