import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cursor } from "@/components/providers/Cursor";
import { Preloader } from "@/components/providers/Preloader";
import { TransitionProvider } from "@/components/providers/Transition";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Cursor />
      <Preloader />
      <TransitionProvider>
        <Header />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </TransitionProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
