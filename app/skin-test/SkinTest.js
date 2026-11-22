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
  ],  ko: [
    ["세안 후 몇 시간이 지나면 피부가 어떤가요?", ["전체적으로 번들거리고 기름져요", "당기고 건조해요", "이마와 코는 기름지고 볼은 보통이거나 건조해요", "조금 붉거나 불편해요"]],
    ["모공은 어떤가요?", ["얼굴 대부분에서 크고 잘 보여요", "작아서 거의 안 보여요", "이마와 코에서만 커요", "보통이지만 피부가 쉽게 붉어져요"]],
    ["하루가 끝날 무렵 얼굴은…", ["번들거리고 기름져요", "칙칙하거나 각질이 일어나요", "T존(이마, 코, 턱)만 번들거려요", "가끔 따갑거나 가려워요"]],
    ["새 제품을 써 보면…", ["문제없지만 금방 기름져요", "주로 건조함을 느껴요", "어떤 부위는 기름지고 어떤 부위는 건조해요", "피부가 자주 예민해지거나 붉어져요"]],
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
  },  ko: {
    oily: "지성 피부일 가능성이 높습니다. 순한 클렌저, 가벼운 오일프리 보습제, 산뜻한 선크림이 잘 맞습니다.",
    dry: "건성 피부일 가능성이 높습니다. 부드러운 클렌저, 영양감 있는 크림, 수분 제품이 피부를 더 편안하게 해 줍니다.",
    combination: "복합성 피부일 가능성이 높습니다. T존은 가벼운 제품을, 볼은 더 많은 보습을 필요로 합니다.",
    sensitive: "민감성 피부일 가능성이 높습니다. 성분이 적은 순한 제품이 좋으며, 새 제품은 먼저 부분 테스트를 해 보세요.",
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
  const recommended = getAllProducts().filter((p) => p.skin.includes(result) && p.type !== "hair" && p.type !== "body");

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
