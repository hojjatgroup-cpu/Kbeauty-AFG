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
  },  ko: {
    title: "정품 확인 방법",
    intro: "가짜 화장품이 많습니다. 아래 팁으로 정품을 확인해 보세요:",
    sections: [
      { h: "1. 포장을 자세히 보세요", p: "정품은 인쇄가 깔끔하고 정확합니다. 흐린 색, 비뚤어진 글자, 철자 오류는 주의 신호입니다." },
      { h: "2. 한글 표기와 제조사 정보", p: "대부분의 한국 제품에는 한글 표기, 제조사 이름과 주소, Made in Korea가 적혀 있습니다." },
      { h: "3. 제조 번호와 날짜", p: "제조 번호와 제조일 또는 유통기한은 보통 상자와 용기 모두에 인쇄되어 있으며 서로 일치해야 합니다." },
      { h: "4. 바코드", p: "한국 바코드는 보통 880으로 시작합니다. 이것만으로 증명되지는 않지만 좋은 신호입니다." },
      { h: "5. 제형, 색, 향", p: "제형, 색, 향이 이상하거나 평소와 다르면 사용하지 말고 판매자에게 문의하세요." },
      { h: "6. 지나치게 싼 가격", p: "시중가보다 훨씬 싼 가격은 대개 가품이거나 유통기한이 지난 제품입니다." },
      { h: "저희의 약속", p: "K Beauty AFG 제품은 대한민국 현지에서 직접 공급받습니다. 제품에 대해 궁금한 점은 인스타그램으로 문의하세요." },
    ],
  },

};

export default function AuthenticityPage() {
  return <InfoPage content={content} />;
}
