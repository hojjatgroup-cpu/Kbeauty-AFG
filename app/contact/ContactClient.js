"use client";

import { useLang } from "@/components/LangProvider";
import site from "@/data/site.json";

const C = {
  fa: {
    title: "تماس با ما",
    intro: "برای سفارش، سوال دربارهٔ محصولات یا مشورهٔ رایگان پوست، در اینستاگرام پیام بدهید یا به ما ایمیل بزنید.",
    ig: "اینستاگرام",
    mail: "ایمیل",
    send: "ارسال ایمیل",
    msg: "ارسال پیام",
    view: "مشاهدهٔ صفحه",
    hours: "ساعات پاسخگویی",
    hoursV: "همه‌روزه از ساعت ۸ صبح تا ۷ شب",
  },
  en: {
    title: "Contact us",
    intro: "For orders, product questions or free skin advice, message us on Instagram or send us an email.",
    ig: "Instagram",
    mail: "Email",
    send: "Send an email",
    msg: "Send a message",
    view: "View profile",
    hours: "Response hours",
    hoursV: "Every day, 8 am – 7 pm",
  },  ko: {
    title: "문의하기",
    intro: "주문, 제품 문의, 무료 피부 상담은 인스타그램 메시지나 이메일로 연락 주세요.",
    ig: "인스타그램",
    mail: "이메일",
    send: "이메일 보내기",
    msg: "메시지 보내기",
    view: "프로필 보기",
    hours: "응답 시간",
    hoursV: "매일 오전 8시 – 오후 7시",
  },

};

export default function ContactClient() {
  const { lang } = useLang();
  const c = C[lang];
  return (
    <div className="container prose" style={{ maxWidth: 760 }}>
      <h1 className="page-title">{c.title}</h1>
      <p>{c.intro}</p>
      <div className="p-box" style={{ textAlign: "center" }}>
        <h3>{c.ig}</h3>
        <p dir="ltr" style={{ marginBottom: 12 }}>
          @{site.instagram}
        </p>
        <div className="hero-actions">
          <a className="btn btn-ink" href={`https://ig.me/m/${site.instagram}`} target="_blank" rel="noopener">
            {c.msg}
          </a>
          <a className="btn btn-line" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            {c.view}
          </a>
        </div>
      </div>
      <div className="p-box" style={{ textAlign: "center" }}>
        <h3>{c.mail}</h3>
        <p dir="ltr" style={{ marginBottom: 12 }}>{site.email}</p>
        <div className="hero-actions">
          <a className="btn btn-ink" href={`mailto:${site.email}`}>
            {c.send}
          </a>
        </div>
      </div>
      <div className="p-box">
        <h3>{c.hours}</h3>
        <p className="muted">{c.hoursV}</p>
      </div>
    </div>
  );
}
