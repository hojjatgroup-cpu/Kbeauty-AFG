import FaqClient from "./FaqClient";

export const metadata = {
  title: "سوالات پرتکرار | FAQ",
  description: "پاسخ سوالات پرتکرار دربارهٔ سفارش، ارسال به ولایات، پرداخت هنگام تحویل و اورجینال بودن محصولات کره‌ای.",
  alternates: { canonical: "/faq/" },
  openGraph: { title: "سوالات پرتکرار", description: "پاسخ سوالات پرتکرار دربارهٔ سفارش، ارسال به ولایات، پرداخت هنگام تحویل و اورجینال بودن محصولات کره‌ای.", url: "/faq/" },
};

export default function FaqPage() {
  return <FaqClient />;
}
