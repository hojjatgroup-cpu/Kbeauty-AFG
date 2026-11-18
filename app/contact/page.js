import site from "@/data/site.json";

export const metadata = { title: "تماس با ما" };

export default function ContactPage() {
  return (
    <div className="container prose" style={{ maxWidth: 760 }}>
      <h1 className="page-title">تماس با ما</h1>
      <p>برای سفارش، سوال دربارهٔ محصولات یا مشورهٔ رایگان پوست، در اینستاگرام به ما پیام بدهید.</p>

      <div className="p-box" style={{ textAlign: "center" }}>
        <p style={{ fontSize: 36 }}>📷</p>
        <p>
          <strong>اینستاگرام: {site.instagram}</strong>
        </p>
        <div className="hero-actions" style={{ justifyContent: "center", marginTop: 10 }}>
          <a className="btn btn-primary" href={`https://ig.me/m/${site.instagram}`} target="_blank" rel="noopener">
            ارسال پیام
          </a>
          <a className="btn btn-outline" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            مشاهدهٔ صفحه
          </a>
        </div>
      </div>

      <div className="p-box">
        <h3>ساعات پاسخگویی</h3>
        <p>[روزها و ساعت‌های پاسخگویی]</p>
      </div>
      <div className="p-box">
        <h3>آدرس</h3>
        <p>[آدرس یا شهر]</p>
      </div>
    </div>
  );
}
