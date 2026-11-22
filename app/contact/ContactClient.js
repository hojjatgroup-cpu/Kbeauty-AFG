"use client";

import { useLang } from "@/components/LangProvider";
import site from "@/data/site.json";

const C = {
  fa: {
    title: "تماس با ما",
    intro: "برای سفارش، سوال دربارهٔ محصولات یا مشورهٔ رایگان پوست، در اینستاگرام به ما پیام بدهید.",
    msg: "ارسال پیام",
    view: "مشاهدهٔ صفحه",
    hours: "ساعات پاسخگویی",
    hoursV: "[روزها و ساعت‌های پاسخگویی]",
    addr: "آدرس",
    addrV: "[آدرس یا شهر]",
  },
  en: {
    title: "Contact us",
    intro: "For orders, product questions or free skin advice, message us on Instagram.",
    msg: "Send a message",
    view: "View profile",
    hours: "Response hours",
    hoursV: "[Days and hours]",
    addr: "Address",
    addrV: "[Address or city]",
  },  ko: {
    title: "문의하기",
    intro: "주문, 제품 문의, 무료 피부 상담은 인스타그램 메시지로 연락 주세요.",
    msg: "메시지 보내기",
    view: "프로필 보기",
    hours: "응답 시간",
    hoursV: "[요일 및 시간]",
    addr: "주소",
    addrV: "[주소 또는 도시]",
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
      <div className="p-box">
        <h3>{c.hours}</h3>
        <p className="muted">{c.hoursV}</p>
      </div>
      <div className="p-box">
        <h3>{c.addr}</h3>
        <p className="muted">{c.addrV}</p>
      </div>
    </div>
  );
}
