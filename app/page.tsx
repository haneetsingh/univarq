import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Positioning } from "@/components/Positioning";
import { About } from "@/components/About";
import { WhyUnivarq } from "@/components/WhyUnivarq";
import { Services } from "@/components/Services";
import { Solutions } from "@/components/Solutions";
import { HowWeWork } from "@/components/HowWeWork";
import { Industries } from "@/components/Industries";
import { CaseStudies } from "@/components/CaseStudies";
import { Technology } from "@/components/Technology";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Positioning />
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Solutions />
        </Reveal>
        <Reveal>
          <WhyUnivarq />
        </Reveal>
        <Reveal>
          <HowWeWork />
        </Reveal>
        <Reveal>
          <Industries />
        </Reveal>
        <Reveal>
          <CaseStudies />
        </Reveal>
        <Reveal>
          <Technology />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
