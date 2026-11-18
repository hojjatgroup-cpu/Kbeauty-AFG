import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container empty">
      <p style={{ fontSize: 40 }}>🌸</p>
      <p>این صفحه پیدا نشد.</p>
      <Link href="/" className="btn btn-primary" style={{ marginTop: 14 }}>
        بازگشت به خانه
      </Link>
    </div>
  );
}
