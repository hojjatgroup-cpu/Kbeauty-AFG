"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, SKIN_TYPES, toFa } from "@/lib/products";

const QUESTIONS = [
  {
    q: "چند ساعت بعد از شستن صورت، پوستت چه حسی دارد؟",
    a: [
      ["در همه جا چرب و براق است", "oily"],
      ["کشیده و خشک است", "dry"],
      ["پیشانی و بینی چرب، گونه‌ها عادی یا خشک", "combination"],
      ["کمی سرخ یا ناآرام است", "sensitive"],
    ],
  },
  {
    q: "منافذ پوستت چطور به نظر می‌رسد؟",
    a: [
      ["در بیشتر جاهای صورت درشت و واضح", "oily"],
      ["ریز و تقریباً نامعلوم", "dry"],
      ["فقط روی پیشانی و بینی درشت‌تر", "combination"],
      ["معمولی، ولی پوستم زود سرخ می‌شود", "sensitive"],
    ],
  },
  {
    q: "تا آخر روز صورتت چطور می‌شود؟",
    a: [
      ["براق و چرب", "oily"],
      ["کدر یا پوسته‌پوسته", "dry"],
      ["فقط ناحیهٔ T (پیشانی، بینی، چانه) براق", "combination"],
      ["گاهی احساس سوزش یا خارش دارم", "sensitive"],
    ],
  },
  {
    q: "وقتی محصول جدیدی امتحان می‌کنی چه می‌شود؟",
    a: [
      ["مشکلی ندارم، فقط زود چرب می‌شوم", "oily"],
      ["بیشتر احساس خشکی می‌کنم", "dry"],
      ["بعضی جاها چرب و بعضی جاها خشک می‌شود", "combination"],
      ["زیاد پیش می‌آید که پوستم ناراحت یا سرخ شود", "sensitive"],
    ],
  },
];

const RESULTS = {
  oily: "پوست شما احتمالاً چرب است. شوینده‌های ملایم، مرطوب‌کننده‌های سبک و بدون روغن، و ضدآفتاب‌های سبک معمولاً انتخاب خوبی هستند.",
  dry: "پوست شما احتمالاً خشک است. شوینده‌های نرم، کرم‌های مغذی و محصولات آبرسان می‌توانند حس راحتی بیشتری به پوست بدهند.",
  combination: "پوست شما احتمالاً مختلط است. ناحیهٔ T به محصولات سبک‌تر و گونه‌ها به رطوبت بیشتر نیاز دارند.",
  sensitive: "پوست شما احتمالاً حساس است. محصولات ملایم با ترکیبات کمتر بهتر است و هر محصول جدید را اول روی بخش کوچکی امتحان کنید.",
};

export default function SkinTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const choose = (type) => {
    const next = [...answers, type];
    setAnswers(next);
    setStep(step + 1);
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
  };

  if (step < QUESTIONS.length) {
    const current = QUESTIONS[step];
    return (
      <div className="quiz">
        <div className="progress">
          <div style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          سوال {toFa(step + 1)} از {toFa(QUESTIONS.length)}
        </div>
        <div className="q-title">{current.q}</div>
        <div className="options">
          {current.a.map(([label, type]) => (
            <button key={label} className="option" onClick={() => choose(type)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const scores = { oily: 0, dry: 0, combination: 0, sensitive: 0 };
  answers.forEach((t) => (scores[t] += 1));
  const result = Object.keys(scores).reduce((best, k) => (scores[k] > scores[best] ? k : best), "oily");
  const recommended = getAllProducts().filter((p) => p.skin.includes(result));

  return (
    <div>
      <div className="quiz">
        <div className="result">
          <div className="muted">نتیجهٔ تست</div>
          <div className="result-type">پوست {SKIN_TYPES[result]}</div>
          <p style={{ marginTop: 8 }}>{RESULTS[result]}</p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: 14 }}>
            <Link href={`/shop?skin=${result}`} className="btn btn-primary">
              همهٔ محصولات مناسب
            </Link>
            <button className="btn btn-outline" onClick={restart}>
              تکرار تست
            </button>
          </div>
          <p className="note">این تست فقط یک راهنمای عمومی است و جای معاینه و مشورهٔ متخصص پوست را نمی‌گیرد.</p>
        </div>
      </div>
      <h2 className="section-title">پیشنهاد ما برای پوست {SKIN_TYPES[result]}</h2>
      <div className="grid">
        {recommended.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
