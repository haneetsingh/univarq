import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Positioning } from "@/components/Positioning";
import { About } from "@/components/About";
import { WhyUnivarq } from "@/components/WhyUnivarq";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Positioning />
        <Services />
        <WhyUnivarq />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
