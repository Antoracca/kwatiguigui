import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

// Prevent static prerendering for all marketing pages.
// next-themes / sonner corrupt the React SSR bundle during prerender.
// force-dynamic cascades to all 26 child pages automatically.
export const dynamic = "force-dynamic";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
