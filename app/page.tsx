import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyUnivarq } from "@/components/WhyUnivarq";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <WhyUnivarq />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
