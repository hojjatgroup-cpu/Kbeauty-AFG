import SkinTest from "./SkinTest";

export const metadata = {
  title: "تست نوع پوست | Skin test",
  description: "تست رایگان و سریع تشخیص نوع پوست (چرب، خشک، مختلط، حساس) و پیشنهاد محصولات کره‌ای مناسب پوست شما.",
  alternates: { canonical: "/skin-test/" },
  openGraph: { title: "تست نوع پوست", description: "تست رایگان و سریع تشخیص نوع پوست (چرب، خشک، مختلط، حساس) و پیشنهاد محصولات کره‌ای مناسب پوست شما.", url: "/skin-test/" },
};

export default function SkinTestPage() {
  return (
    <div className="container page">
      <SkinTest />
    </div>
  );
}
