import InfoPage from "@/components/InfoPage";

export const metadata = { title: "بررسی اورجینال بودن | Authenticity" };

const content = {
  fa: {
    title: "چطور اورجینال بودن را بررسی کنیم؟",
    intro: "محصولات تقلبی مراقبت پوست زیاد است. با این نکته‌ها محصول اصل را بهتر تشخیص می‌دهید:",
    sections: [
      { h: "۱. بسته‌بندی را دقیق ببینید", p: "چاپ محصول اصل تمیز و دقیق است. رنگ‌های کم‌رنگ، نوشته‌های کج یا غلط املایی نشانهٔ هشدار است." },
      { h: "۲. نوشته‌های کره‌ای و معلومات سازنده", p: "روی بیشتر محصولات کره‌ای، نوشته‌های کره‌ای، نام و آدرس شرکت سازنده و Made in Korea درج شده است." },
      { h: "۳. کد بچ و تاریخ", p: "کد بچ (Batch Code) و تاریخ تولید یا انقضا معمولاً روی جعبه و ظرف چاپ شده و باید با هم یکی باشند." },
      { h: "۴. بارکد", p: "بارکد محصولات کره‌ای معمولاً با ۸۸۰ شروع می‌شود. این به‌تنهایی کافی نیست، ولی نشانهٔ خوبی است." },
      { h: "۵. بافت، رنگ و بو", p: "اگر بافت، رنگ یا بوی محصول عجیب است یا با همیشه فرق دارد، استفاده نکنید و با فروشنده تماس بگیرید." },
      { h: "۶. قیمت خیلی ارزان", p: "قیمتی که خیلی پایین‌تر از بازار است، معمولاً نشانهٔ محصول تقلبی یا تاریخ‌گذشته است." },
      { h: "تعهد ما", p: "محصولات K Beauty AFG مستقیم از منبع در کره جنوبی تهیه می‌شوند. اگر دربارهٔ اصل بودن محصولی سوال دارید، در اینستاگرام از ما بپرسید." },
    ],
  },
  en: {
    title: "How to check authenticity",
    intro: "Counterfeit skincare is common. These tips help you spot the real thing:",
    sections: [
      { h: "1. Look closely at the packaging", p: "Genuine printing is clean and precise. Faded colors, crooked text or spelling mistakes are warning signs." },
      { h: "2. Korean text and maker details", p: "Most Korean products show Korean text, the maker's name and address, and Made in Korea." },
      { h: "3. Batch code and dates", p: "The batch code and production or expiry date are usually printed on both the box and the container, and should match." },
      { h: "4. Barcode", p: "Korean barcodes usually start with 880. Not proof on its own, but a good sign." },
      { h: "5. Texture, color and scent", p: "If the texture, color or scent seems odd or different from usual, don't use it and contact the seller." },
      { h: "6. Too-cheap prices", p: "A price far below market usually means a fake or expired product." },
      { h: "Our promise", p: "K Beauty AFG products are sourced directly from the source in South Korea. Questions about any product? Ask us on Instagram." },
    ],
  },
};

export default function AuthenticityPage() {
  return <InfoPage content={content} />;
}
