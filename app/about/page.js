import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "دربارهٔ ما | About",
  description: "K Beauty AFG فروشگاه آنلاین محصولات اورجینال کره‌ای مراقبت پوست در افغانستان؛ تهیهٔ مستقیم از کره جنوبی، مشورهٔ رایگان و ارسال به همهٔ ولایات.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "دربارهٔ ما", description: "K Beauty AFG فروشگاه آنلاین محصولات اورجینال کره‌ای مراقبت پوست در افغانستان؛ تهیهٔ مستقیم از کره جنوبی، مشورهٔ رایگان و ارسال به همهٔ ولایات.", url: "/about/" },
};

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
  },  ko: {
    title: "회사 소개",
    intro:
      "K Beauty AFG는 정품 한국 스킨케어를 위한 온라인 브랜드입니다. 정품 한국 제품을 쉽게 구매할 수 있도록 하고, 피부에 맞는 제품 선택을 도와드립니다.",
    sections: [
      { h: "왜 저희일까요?", p: ["100% 정품 한국 제품만 판매", "올바른 루틴을 위한 무료 상담", "아프가니스탄 전 지역 배송", "구매 후 24시간 고객 지원"] },
      { h: "제품은 어디에서 오나요?", p: "모든 제품은 대한민국 현지에서 직접 공급받습니다." },
    ],
  },

};

export default function AboutPage() {
  return <InfoPage content={content} />;
}
