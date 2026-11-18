import Link from "next/link";
import { T } from "@/components/LangProvider";

export default function NotFound() {
  return (
    <div className="container empty" style={{ paddingTop: 60 }}>
      <p>
        <T k="notFound" />
      </p>
      <Link href="/" className="btn btn-ink" style={{ marginTop: 14 }}>
        <T k="backHome" />
      </Link>
    </div>
  );
}
