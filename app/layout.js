import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/data/site.json";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap" });

export const metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: "فروشگاه آنلاین محصولات اورجینال کره‌ای مراقبت پوست: شوینده، ضدآفتاب، سرم، کرم و ماسک، با مشورهٔ رایگان.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7f8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
