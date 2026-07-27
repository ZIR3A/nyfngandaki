import HomeClient from "@/features/home/components/HomeClient";

export default function Home({ params }) {
  // Extract locale from params or default to 'en'
  const locale = params?.locale || "en";
  return (
    <main className="flex-1">
      <HomeClient locale={locale} />
    </main>
  );
}
