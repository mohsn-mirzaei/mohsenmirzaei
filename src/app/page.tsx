import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/providers/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/anim/Marquee";

export default function Home() {
  return (
    <>
      <Cursor />
      <Header />
      <SmoothScroll>
        <main>
          <Hero />
          <About />
          <Marquee />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
