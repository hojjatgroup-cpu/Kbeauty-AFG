import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "حریم خصوصی | Privacy policy",
  description: "سیاست حریم خصوصی K Beauty AFG: چه اطلاعاتی جمع می‌کنیم و چطور از آن استفاده می‌کنیم.",
  alternates: { canonical: "/privacy/" },
};

const content = {
  fa: {
    title: "سیاست حریم خصوصی",
    intro: "K Beauty AFG (kbeautyaf.com) به حریم خصوصی شما احترام می‌گذارد. در این صفحه توضیح می‌دهیم چه اطلاعاتی جمع می‌کنیم و چطور از آن استفاده می‌کنیم.",
    sections: [
      { h: "چه اطلاعاتی جمع می‌کنیم؟", p: ["هنگام ثبت سفارش: نام، شمارهٔ تماس، ولایت، آدرس و (اختیاری) ایمیل", "هنگام ساخت حساب: ایمیل، و اگر با گوگل وارد شوید، نام و عکس پروفایل گوگل", "فهرست علاقه‌مندی‌ها و سبد خرید فقط روی دستگاه خودتان ذخیره می‌شود"] },
      { h: "از اطلاعات چطور استفاده می‌کنیم؟", p: ["برای ثبت، تأیید و ارسال سفارش", "برای فرستادن ایمیل تأیید سفارش و کد ورود", "برای نمایش سفارش‌های قبلی و پر کردن خودکار فرم خرید در حساب شما"] },
      { h: "اشتراک‌گذاری", p: "اطلاعات شما را نمی‌فروشیم و به کسی نمی‌دهیم؛ فقط برای ارسال سفارش در اختیار پیک یا شرکت ارسال قرار می‌گیرد. اطلاعات روی سرورهای امن Cloudflare نگهداری می‌شود و ایمیل‌ها از طریق Resend فرستاده می‌شوند." },
      { h: "حذف اطلاعات", p: "هر وقت خواستید حساب و اطلاعات‌تان حذف شود، به support@kbeautyaf.com ایمیل بزنید." },
      { h: "تماس", p: "سوال دربارهٔ حریم خصوصی: support@kbeautyaf.com" },
    ],
  },
  en: {
    title: "Privacy policy",
    intro: "K Beauty AFG (kbeautyaf.com) respects your privacy. This page explains what we collect and how we use it.",
    sections: [
      { h: "What we collect", p: ["When you order: name, phone, province, address and (optionally) email", "When you create an account: your email, and if you sign in with Google, your Google name and profile picture", "Your wishlist and bag are stored only on your own device"] },
      { h: "How we use it", p: ["To record, confirm and deliver your order", "To send order confirmations and sign-in codes by email", "To show your past orders and fill in the checkout form in your account"] },
      { h: "Sharing", p: "We never sell your data. It is shared only with the courier to deliver your order. Data is stored on Cloudflare's secure servers and emails are sent through Resend." },
      { h: "Deleting your data", p: "Email support@kbeautyaf.com anytime to have your account and data deleted." },
      { h: "Contact", p: "Privacy questions: support@kbeautyaf.com" },
    ],
  },
};
content.ko = content.en;

export default function PrivacyPage() {
  return <InfoPage content={content} />;
}
