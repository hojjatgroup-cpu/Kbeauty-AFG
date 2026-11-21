"use client";

import { useLang } from "@/components/LangProvider";

const FAQS = {
  fa: {
    title: "سوالات پرتکرار",
    items: [
      ["محصولات شما اورجینال است؟", "بله، تمام محصولات ما اورجینال کره‌ای هستند. راهنمای بررسی را در صفحهٔ «بررسی اورجینال بودن» ببینید."],
      ["چطور سفارش بدهم؟", "محصولات را به سبد اضافه کنید، در سبد خرید «ادامه و تکمیل سفارش» را بزنید، مشخصات خود را بنویسید و «ثبت سفارش» را بزنید. سفارش مستقیم برای ما می‌آید و برای تأیید با شما تماس می‌گیریم."],
      ["روش پرداخت چیست؟", "در حال حاضر پرداخت درِ منزل است؛ یعنی سفارش را ثبت می‌کنید و هنگام تحویل محصول، مبلغ را پرداخت می‌کنید."],
      ["به کدام ولایات ارسال دارید و چقدر طول می‌کشد؟", "به تمام ولایات افغانستان ارسال داریم. زمان ارسال در کابل ۲۴ ساعت و در ولایات ۲ تا ۳ روز کاری است. هزینهٔ ارسال: مرکز شهر کابل ۱۰۰ افغانی، نواحی دور کابل (مانند خیرخانه) ۱۵۰ افغانی و سایر ولایات ۲۰۰ افغانی."],
      ["نمی‌دانم کدام محصول برای پوستم مناسب است، چه کنم؟", "اول تست نوع پوست را در سایت انجام دهید. بعد می‌توانید در اینستاگرام از ما مشاورهٔ رایگان بگیرید."],
      ["بعد از خرید هم پشتیبانی دارید؟", "بله، ۲۴ ساعته بعد از خرید در اینستاگرام پاسخگوی سوال‌های شما دربارهٔ سفارش و روش استفاده هستیم."],
      ["امکان مرجوع کردن محصول هست؟", "محصول فقط در این صورت‌ها مرجوع می‌شود: اگر ثابت شود کالا تقلبی است، یا هنگام تحویل شکستگی یا آسیب‌دیدگی داشته باشد. در غیر این صورت امکان مرجوعی وجود ندارد."],
      ["تاریخ انقضای محصولات را از کجا ببینم؟", "تاریخ تولید یا انقضا روی بسته‌بندی هر محصول درج شده است. اگر سوالی داشتید، پیش از خرید از ما بپرسید."],
    ],
  },
  en: {
    title: "FAQ",
    items: [
      ["Are your products authentic?", "Yes, all our products are authentic Korean skincare. See the 'Check authenticity' page for tips."],
      ["How do I order?", "Add products to your bag, tap 'Continue to checkout', fill in your details and tap 'Place order'. Your order comes straight to us and we'll contact you to confirm."],
      ["How do I pay?", "For now we offer cash on delivery: place your order and pay when the product is delivered to your door."],
      ["Which provinces do you deliver to, and how long does it take?", "We deliver to all provinces of Afghanistan: 24 hours in Kabul and 2–3 working days to other provinces. Delivery cost: Kabul city center 100 AFN, outer Kabul areas (e.g. Khair Khana) 150 AFN, other provinces 200 AFN."],
      ["I'm not sure which product suits my skin.", "Take the skin type test on the site first, then message us on Instagram for free advice."],
      ["Do you offer support after purchase?", "Yes, we offer 24-hour support on Instagram for questions about your order and how to use your products."],
      ["Can I return a product?", "Returns are accepted only if the product is proven to be counterfeit, or arrives broken or damaged. Otherwise we can't accept returns."],
      ["Where can I find the expiry date?", "The production or expiry date is printed on each product's packaging. Ask us before buying if you have questions."],
    ],
  },
};

export default function FaqClient() {
  const { lang } = useLang();
  const c = FAQS[lang];
  return (
    <div className="container faq" style={{ maxWidth: 760 }}>
      <h1 className="page-title" style={{ marginTop: 34 }}>
        {c.title}
      </h1>
      {c.items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
