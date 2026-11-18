import SkinTest from "./SkinTest";

export const metadata = { title: "تست تشخیص نوع پوست" };

export default function SkinTestPage() {
  return (
    <div className="container">
      <h1 className="page-title" style={{ textAlign: "center" }}>
        تست تشخیص نوع پوست
      </h1>
      <p className="muted" style={{ textAlign: "center" }}>
        به ۴ سوال ساده جواب بده تا نوع پوستت و محصولات مناسب را ببینی.
      </p>
      <SkinTest />
    </div>
  );
}
