import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "دسته‌بندی محصولات | Categories",
  description: "دسته‌بندی محصولات اورجینال کره‌ای: شوینده، تونر، سرم، کرم، ضدآفتاب، ماسک، مراقبت مو و بدن.",
  alternates: { canonical: "/categories/" },
};

export default function Page() {
  return <CategoriesClient />;
}
