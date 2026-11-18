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
