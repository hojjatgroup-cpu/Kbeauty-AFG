import AccountClient from "./AccountClient";

export const metadata = { title: "حساب من | Account", robots: { index: false }, alternates: { canonical: "/account/" } };

export default function Page() {
  return <AccountClient />;
}
