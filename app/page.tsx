import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
import Awards from "@/components/Awards";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Research />
      <Awards />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
