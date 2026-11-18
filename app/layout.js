import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";
import site from "@/data/site.json";

const modam = localFont({
  src: [
    { path: "./fonts/Modam-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/Modam-Light.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Modam-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: "فروشگاه آنلاین محصولات اورجینال کره‌ای مراقبت پوست: شوینده، ضدآفتاب، سرم، کرم و ماسک، با مشورهٔ رایگان.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0fd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={modam.className}>
        <div className="bg-blobs" aria-hidden="true" />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
