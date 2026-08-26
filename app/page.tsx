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
        <Reveal sectionName="services">
          <Services />
        </Reveal>
        <Reveal sectionName="solutions">
          <Solutions />
        </Reveal>
        <Reveal sectionName="why_univarq">
          <WhyUnivarq />
        </Reveal>
        <Reveal sectionName="how_we_work">
          <HowWeWork />
        </Reveal>
        <Reveal sectionName="industries">
          <Industries />
        </Reveal>
        <Reveal sectionName="case_studies">
          <CaseStudies />
        </Reveal>
        <Reveal sectionName="technology">
          <Technology />
        </Reveal>
        <Reveal sectionName="about">
          <About />
        </Reveal>
        <Reveal sectionName="faq">
          <Faq />
        </Reveal>
        <Reveal sectionName="contact">
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
