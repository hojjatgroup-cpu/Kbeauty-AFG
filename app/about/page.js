import InfoPage from "@/components/InfoPage";

export const metadata = { title: "دربارهٔ ما | About" };

const content = {
  fa: {
    title: "دربارهٔ ما",
    intro:
      "K Beauty AFG یک برند آنلاین برای محصولات اورجینال کره‌ای مراقبت پوست است. هدف ما این است که دسترسی به محصولات اصل و باکیفیت کره‌ای را آسان کنیم و در انتخاب محصول مناسب نوع پوست کنارتان باشیم.",
    sections: [
      { h: "چرا ما؟", p: ["فقط محصولات اورجینال کره‌ای", "مشاورهٔ رایگان برای انتخاب روتین مناسب پوست", "ارسال به تمام ولایات افغانستان", "پشتیبانی ۲۴ ساعته بعد از خرید"] },
      { h: "محصولات ما از کجا می‌آیند؟", p: "همهٔ محصولات ما مستقیم از منبع در کره جنوبی تهیه می‌شوند." },
    ],
  },
  en: {
    title: "About us",
    intro:
      "K Beauty AFG is an online brand for authentic Korean skincare. We make genuine, quality Korean products easy to get, and help you choose what suits your skin.",
    sections: [
      { h: "Why us?", p: ["Only authentic Korean products", "Free advice to build the right routine", "Delivery to all provinces of Afghanistan", "24-hour support after purchase"] },
      { h: "Where do our products come from?", p: "All our products are sourced directly from the source in South Korea." },
    ],
  },
};

export default function AboutPage() {
  return <InfoPage content={content} />;
}
