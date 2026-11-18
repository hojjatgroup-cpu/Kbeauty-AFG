import InfoPage from "@/components/InfoPage";

export const metadata = { title: "دربارهٔ ما | About" };

const content = {
  fa: {
    title: "دربارهٔ ما",
    intro:
      "K Beauty AFG یک برند آنلاین برای محصولات اورجینال کره‌ای مراقبت پوست است. هدف ما این است که دسترسی به محصولات اصل و باکیفیت کره‌ای را آسان کنیم و در انتخاب محصول مناسب نوع پوست کنارتان باشیم.",
    sections: [
      { h: "چرا ما؟", p: ["فقط محصولات اورجینال کره‌ای", "مشاورهٔ رایگان برای انتخاب روتین مناسب پوست", "ارسال به تمام ولایات افغانستان", "پشتیبانی ۲۴ ساعته بعد از خرید"] },
      { h: "داستان ما", p: "[داستان شروع برند، تجربهٔ شما در مشورهٔ پوست و چرا محصولات کره‌ای را انتخاب کردید.]" },
      { h: "محصولات ما از کجا می‌آیند؟", p: "[منبع تهیهٔ محصولات: مثلاً خرید مستقیم از نمایندگی‌ها یا فروشگاه‌های رسمی در کوریا.]" },
    ],
  },
  en: {
    title: "About us",
    intro:
      "K Beauty AFG is an online brand for authentic Korean skincare. We make genuine, quality Korean products easy to get, and help you choose what suits your skin.",
    sections: [
      { h: "Why us?", p: ["Only authentic Korean products", "Free advice to build the right routine", "Delivery to all provinces of Afghanistan", "24-hour support after purchase"] },
      { h: "Our story", p: "[How the brand started, your skincare consulting experience, and why Korean skincare.]" },
      { h: "Where do our products come from?", p: "[Product sourcing: e.g. bought directly from official distributors or stores in Korea.]" },
    ],
  },
};

export default function AboutPage() {
  return <InfoPage content={content} />;
}
