import Hero from "@/components/Hero";
import Reel from "@/components/Reel";
import Facts from "@/components/Facts";
import Cases from "@/components/Cases";
import EditSuite from "@/components/EditSuite";
import Archive from "@/components/Archive";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Lines from "@/components/Lines";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Reel />
        <Facts />


        <EditSuite />

        <section id="work" aria-label="Selected work">
          <div className="wrap sec-head">
            <span className="label">(02) Selected work</span>
            <Lines as="h2" className="display h-l" lines={["Seven projects,", <>told <em className="it">in full.</em></>]} />
            <p className="rv">
              Identities built from a blank page, a design critique that became a campaign, a school calendar that never
              slowed down, and a startup idea explained in one look. Each one opens into a full case study.
            </p>
          </div>
          <Cases />
        </section>
        <Capabilities />
        <Archive />
       
        <Process />
        <About />
      </main>
      <Contact />
    </>
  );
}
