import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Testimonials from '@/components/testimonials';
import ContactContent from '@/components/content/contact';

export default function Home() {
  return (
    <main id="main-content" className="scroll-smooth">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <section id="contact" className="max-w-6xl mx-auto py-16 px-4">
        <ContactContent />
      </section>
    </main>
  );
}
