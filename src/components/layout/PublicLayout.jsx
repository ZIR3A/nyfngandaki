import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

export function PublicLayout({ children, settings }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[128px] sm:pt-[136px]">
        {children}
      </main>
      <Footer settings={settings} />
      <ScrollToTop />
    </div>
  );
}
