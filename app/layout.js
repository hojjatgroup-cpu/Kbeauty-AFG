import localFont from "next/font/local";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import Splash from "@/components/Splash";
import PromoPopup from "@/components/PromoPopup";
import site from "@/data/site.json";

const modam = localFont({
  src: [
    { path: "./fonts/Modam-ExtraLight.woff", weight: "200", style: "normal" },
    { path: "./fonts/Modam-Light.woff", weight: "400", style: "normal" },
    { path: "./fonts/Modam-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "system-ui", "sans-serif"],
});

export const metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: "محصولات اورجینال کره‌ای مراقبت پوست | Authentic Korean skincare",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5CB4C0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={modam.className}>
        <Splash />
        <div className="bg-blobs" aria-hidden="true" />
        <LangProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <PromoPopup />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
