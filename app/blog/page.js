import BlogList from "./BlogList";

export const metadata = {
  title: "مجلهٔ پوست | Skin journal",
  description: "مقاله‌های ساده دربارهٔ مراقبت پوست، روتین کره‌ای، ضدآفتاب و انتخاب محصول مناسب نوع پوست.",
  alternates: { canonical: "/blog/" },
  openGraph: { title: "مجلهٔ پوست", description: "مقاله‌های ساده دربارهٔ مراقبت پوست، روتین کره‌ای، ضدآفتاب و انتخاب محصول مناسب نوع پوست.", url: "/blog/" },
};

export default function BlogPage() {
  return <BlogList />;
}
