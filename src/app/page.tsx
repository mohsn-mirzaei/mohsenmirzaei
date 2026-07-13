import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Courses } from "@/components/sections/Courses";
import { Testimonials } from "@/components/sections/Testimonials";
import { Notes } from "@/components/sections/Notes";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/anim/Marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Marquee />
      <Experience />
      <Projects />
      <Skills />
      <Courses />
      <Testimonials />
      <Notes />
      <Contact />
    </main>
  );
}
