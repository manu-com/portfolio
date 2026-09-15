import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Technologies } from "@/components/technologies";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Services />
        <About />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}