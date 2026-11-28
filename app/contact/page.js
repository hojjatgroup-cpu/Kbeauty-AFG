import ContactClient from "./ContactClient";

export const metadata = {
  title: "تماس | Contact",
  description: "تماس با K Beauty AFG از طریق اینستاگرام K_beauty.afg یا ایمیل support@kbeautyaf.com؛ همه‌روزه از ۸ صبح تا ۷ شب.",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "تماس", description: "تماس با K Beauty AFG از طریق اینستاگرام K_beauty.afg یا ایمیل support@kbeautyaf.com؛ همه‌روزه از ۸ صبح تا ۷ شب.", url: "/contact/" },
};

export default function ContactPage() {
  return <ContactClient />;
}
