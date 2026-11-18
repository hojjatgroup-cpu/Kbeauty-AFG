"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { useLang } from "@/components/LangProvider";
import { getAllProducts, num } from "@/lib/products";

const QUESTIONS = {
  fa: [
    ["چند ساعت بعد از شستن صورت، پوستت چه حسی دارد؟", ["در همه جا چرب و براق است", "کشیده و خشک است", "پیشانی و بینی چرب، گونه‌ها عادی یا خشک", "کمی سرخ یا ناآرام است"]],
    ["منافذ پوستت چطور به نظر می‌رسد؟", ["در بیشتر جاهای صورت درشت و واضح", "ریز و تقریباً نامعلوم", "فقط روی پیشانی و بینی درشت‌تر", "معمولی، ولی پوستم زود سرخ می‌شود"]],
    ["تا آخر روز صورتت چطور می‌شود؟", ["براق و چرب", "کدر یا پوسته‌پوسته", "فقط ناحیهٔ T (پیشانی، بینی، چانه) براق", "گاهی احساس سوزش یا خارش دارم"]],
    ["وقتی محصول جدیدی امتحان می‌کنی چه می‌شود؟", ["مشکلی ندارم، فقط زود چرب می‌شوم", "بیشتر احساس خشکی می‌کنم", "بعضی جاها چرب و بعضی جاها خشک می‌شود", "زیاد پیش می‌آید که پوستم ناراحت یا سرخ شود"]],
  ],
  en: [
    ["A few hours after washing, how does your skin feel?", ["Oily and shiny all over", "Tight and dry", "Oily forehead and nose, normal or dry cheeks", "A little red or uncomfortable"]],
    ["How do your pores look?", ["Large and visible on most of my face", "Small and barely visible", "Larger only on forehead and nose", "Normal, but my skin reddens easily"]],
    ["By the end of the day, your face is…", ["Shiny and oily", "Dull or flaky", "Shiny only in the T-zone (forehead, nose, chin)", "Sometimes stinging or itchy"]],
    ["When you try a new product…", ["No problem, I just get oily fast", "I mostly feel dry", "Some areas get oily, others dry", "My skin often gets upset or red"]],
  ],
};
const ORDER = ["oily", "dry", "combination", "sensitive"];

const RESULTS = {
  fa: {
    oily: "پوست شما احتمالاً چرب است. شوینده‌های ملایم، مرطوب‌کننده‌های سبک و بدون روغن، و ضدآفتاب‌های سبک معمولاً انتخاب خوبی هستند.",
    dry: "پوست شما احتمالاً خشک است. شوینده‌های نرم، کرم‌های مغذی و محصولات آبرسان حس راحتی بیشتری به پوست می‌دهند.",
    combination: "پوست شما احتمالاً مختلط است. ناحیهٔ T به محصولات سبک‌تر و گونه‌ها به رطوبت بیشتر نیاز دارند.",
    sensitive: "پوست شما احتمالاً حساس است. محصولات ملایم با ترکیبات کمتر بهتر است و هر محصول جدید را اول روی بخش کوچکی امتحان کنید.",
  },
  en: {
    oily: "Your skin is probably oily. Gentle cleansers, light oil-free moisturizers and lightweight sunscreens usually work well.",
    dry: "Your skin is probably dry. Soft cleansers, rich creams and hydrating products help it feel more comfortable.",
    combination: "Your skin is probably combination. The T-zone likes lighter products, while cheeks need more moisture.",
    sensitive: "Your skin is probably sensitive. Gentle products with fewer ingredients are best, and patch test anything new.",
  },
};

export default function SkinTest() {
  const { t, lang, skins } = useLang();
  const [answers, setAnswers] = useState([]);
  const questions = QUESTIONS[lang];
  const step = answers.length;

  if (step < questions.length) {
    const [q, opts] = questions[step];
    return (
      <div className="quiz">
        <SectionTitle center sub={t("quiz.sub")}>
          {t("quiz.title")}
        </SectionTitle>
        <div className="progress">
          <div style={{ width: `${(step / questions.length) * 100}%` }} />
        </div>
        <div className="muted small">{t("quiz.q", { n: num(step + 1, lang), total: num(questions.length, lang) })}</div>
        <div className="q-title">{q}</div>
        <div className="options">
          {opts.map((label, i) => (
            <button key={label} className="option" onClick={() => setAnswers([...answers, ORDER[i]])}>
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const scores = { oily: 0, dry: 0, combination: 0, sensitive: 0 };
  answers.forEach((a) => (scores[a] += 1));
  const result = ORDER.reduce((best, k) => (scores[k] > scores[best] ? k : best), "oily");
  const recommended = getAllProducts().filter((p) => p.skin.includes(result));

  return (
    <div>
      <div className="quiz">
        <div className="result">
          <div className="kicker">{t("quiz.result")}</div>
          <div className="result-type">{t("quiz.skin", { type: skins[result] })}</div>
          <p style={{ marginTop: 8 }}>{RESULTS[lang][result]}</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link href={`/shop?skin=${result}`} className="btn btn-ink">
              {t("quiz.all")}
            </Link>
            <button className="btn btn-line" onClick={() => setAnswers([])}>
              {t("quiz.again")}
            </button>
          </div>
          <p className="note">{t("quiz.note")}</p>
        </div>
      </div>
      <SectionTitle center>{t("quiz.reco", { type: skins[result] })}</SectionTitle>
      <div className="grid">
        {recommended.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
