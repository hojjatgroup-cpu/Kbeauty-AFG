"use client";

import { useLang } from "@/components/LangProvider";

const FAQS = {
  fa: {
    title: "سوالات پرتکرار",
    items: [
      ["محصولات شما اورجینال است؟", "بله، تمام محصولات ما اورجینال کره‌ای هستند. راهنمای بررسی را در صفحهٔ «بررسی اورجینال بودن» ببینید."],
      ["چطور سفارش بدهم؟", "محصولات را به سبد اضافه کنید، در سبد خرید «ادامه و تکمیل سفارش» را بزنید، مشخصات خود را بنویسید و سفارش را در اینستاگرام برای ما بفرستید تا تأیید شود."],
      ["روش پرداخت چیست؟", "[روش‌های پرداخت: مثلاً پرداخت هنگام تحویل]"],
      ["به کدام ولایات ارسال دارید و چقدر طول می‌کشد؟", "[ولایات، زمان و هزینهٔ ارسال]"],
      ["نمی‌دانم کدام محصول برای پوستم مناسب است، چه کنم؟", "اول تست نوع پوست را در سایت انجام دهید. بعد می‌توانید در اینستاگرام از ما مشورهٔ رایگان بگیرید."],
      ["امکان مرجوع کردن محصول هست؟", "[شرایط مرجوعی و تعویض]"],
      ["تاریخ انقضای محصولات را از کجا ببینم؟", "تاریخ تولید یا انقضا روی بسته‌بندی هر محصول درج شده است. اگر سوالی داشتید، پیش از خرید از ما بپرسید."],
    ],
  },
  en: {
    title: "FAQ",
    items: [
      ["Are your products authentic?", "Yes, all our products are authentic Korean skincare. See the 'Check authenticity' page for tips."],
      ["How do I order?", "Add products to your bag, tap 'Continue to checkout', fill in your details and send the order to us on Instagram for confirmation."],
      ["How do I pay?", "[Payment methods, e.g. cash on delivery]"],
      ["Which provinces do you deliver to, and how long does it take?", "[Provinces, delivery time and cost]"],
      ["I'm not sure which product suits my skin.", "Take the skin type test on the site first, then message us on Instagram for free advice."],
      ["Can I return a product?", "[Return and exchange policy]"],
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
