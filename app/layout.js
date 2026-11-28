import localFont from "next/font/local";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import Splash from "@/components/Splash";
import PromoPopup from "@/components/PromoPopup";
import PromoBar from "@/components/PromoBar";
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

const SITE = "https://kbeautyaf.com";
const DESC =
  "فروشگاه آنلاین محصولات اورجینال کره‌ای مراقبت پوست در افغانستان: ضدآفتاب، سرم، کرم، تونر و ماسک از برندهای Anua، COSRX، Beauty of Joseon، SKIN1004 و Torriden. ارسال به همهٔ ولایات و پرداخت هنگام تحویل.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${site.name} | محصولات اورجینال کره‌ای مراقبت پوست در افغانستان`, template: `%s | ${site.name}` },
  description: DESC,
  keywords: [
    "محصولات کره‌ای", "کرم کره‌ای", "ضدآفتاب کره‌ای", "سرم کره‌ای", "مراقبت پوست", "اسکین کر کره‌ای",
    "محصولات اورجینال کره‌ای در افغانستان", "خرید آنلاین آرایشی کابل", "K-beauty Afghanistan", "Korean skincare Kabul",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "fa_AF",
    url: SITE,
    title: `${site.name} | محصولات اورجینال کره‌ای مراقبت پوست`,
    description: DESC,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      "@id": `${SITE}/#store`,
      name: site.name,
      url: SITE,
      logo: `${SITE}/email-logo.png`,
      image: `${SITE}/og.jpg`,
      description: DESC,
      email: site.email,
      areaServed: { "@type": "Country", name: "Afghanistan" },
      currenciesAccepted: "AFN",
      paymentAccepted: "Cash on delivery",
      sameAs: [`https://instagram.com/${site.instagram}`],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: site.name,
      inLanguage: "fa",
      publisher: { "@id": `${SITE}/#store` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE}/shop/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <Splash />
        <div className="bg-blobs" aria-hidden="true" />
        <LangProvider>
          <CartProvider>
            <PromoBar />
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
