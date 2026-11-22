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
  },  ko: {
    title: "자주 묻는 질문",
    items: [
      ["제품은 정품인가요?", "네, 모든 제품은 정품 한국 스킨케어입니다. '정품 확인 방법' 페이지에서 팁을 확인하세요."],
      ["어떻게 주문하나요?", "제품을 장바구니에 담고 '주문하러 가기'를 누른 뒤 정보를 입력하고 '주문하기'를 누르세요. 주문이 바로 접수되며, 확인을 위해 연락드립니다."],
      ["결제는 어떻게 하나요?", "현재는 착불 결제만 가능합니다. 주문 후 제품을 받을 때 결제하시면 됩니다."],
      ["어느 지역까지 배송되며 얼마나 걸리나요?", "아프가니스탄 전 지역에 배송합니다. 카불은 24시간, 다른 지역은 영업일 기준 2–3일 걸립니다. 배송비: 카불 시내 100 아프가니, 카불 외곽(예: 카이르 카나) 150 아프가니, 기타 지역 200 아프가니."],
      ["어떤 제품이 내 피부에 맞는지 모르겠어요.", "먼저 사이트의 피부 타입 테스트를 해 보시고, 인스타그램으로 무료 상담을 받아 보세요."],
      ["구매 후에도 지원해 주나요?", "네, 주문과 제품 사용법에 대해 인스타그램으로 24시간 지원해 드립니다."],
      ["반품할 수 있나요?", "제품이 가품으로 확인되었거나, 파손 또는 손상된 상태로 도착한 경우에만 반품이 가능합니다. 그 외에는 반품을 받지 않습니다."],
      ["유통기한은 어디에서 확인하나요?", "제조일 또는 유통기한은 각 제품 포장에 인쇄되어 있습니다. 궁금한 점은 구매 전에 문의해 주세요."],
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
