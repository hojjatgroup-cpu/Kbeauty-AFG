import AdminClient from "./AdminClient";

export const metadata = { title: "مدیریت", robots: { index: false, follow: false } };

export default function Page() {
  return <AdminClient />;
}
