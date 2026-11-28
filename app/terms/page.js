import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "شرایط استفاده | Terms of service",
  description: "شرایط استفاده از فروشگاه K Beauty AFG.",
  alternates: { canonical: "/terms/" },
};

const content = {
  fa: {
    title: "شرایط استفاده",
    intro: "با استفاده از kbeautyaf.com این شرایط را می‌پذیرید.",
    sections: [
      { h: "سفارش و پرداخت", p: ["سفارش بعد از تماس همکاران ما تأیید می‌شود", "پرداخت هنگام تحویل (نقدی) است", "قیمت‌ها به افغانی است و ممکن است تغییر کند؛ قیمت زمان ثبت سفارش ملاک است"] },
      { h: "ارسال", p: "سفارش به همهٔ ولایات افغانستان ارسال می‌شود. هزینه و زمان ارسال هنگام ثبت سفارش نمایش داده می‌شود." },
      { h: "کد تخفیف", p: "کد تخفیف خرید اول برای هر شمارهٔ تماس فقط یک بار قابل استفاده است و روی هزینهٔ ارسال اعمال نمی‌شود." },
      { h: "محصولات", p: "اطلاعات محصولات برای آشنایی است و جای مشورهٔ پزشک را نمی‌گیرد. اگر پوست حساس دارید، قبل از استفاده تست کنید." },
      { h: "حساب کاربری", p: "مسئولیت حفظ دسترسی به ایمیل یا حساب گوگل‌تان با خودتان است." },
      { h: "تماس", p: "support@kbeautyaf.com · اینستاگرام K_beauty.afg" },
    ],
  },
  en: {
    title: "Terms of service",
    intro: "By using kbeautyaf.com you agree to these terms.",
    sections: [
      { h: "Orders and payment", p: ["Orders are confirmed after our team contacts you", "Payment is cash on delivery", "Prices are in AFN and may change; the price at the time of ordering applies"] },
      { h: "Delivery", p: "We deliver to every province of Afghanistan. Cost and time are shown at checkout." },
      { h: "Discount codes", p: "The first-order code can be used once per phone number and does not apply to shipping." },
      { h: "Products", p: "Product information is for guidance and is not medical advice. If you have sensitive skin, patch-test first." },
      { h: "Accounts", p: "You are responsible for keeping access to your email or Google account." },
      { h: "Contact", p: "support@kbeautyaf.com · Instagram K_beauty.afg" },
    ],
  },
};
content.ko = content.en;

export default function TermsPage() {
  return <InfoPage content={content} />;
}
