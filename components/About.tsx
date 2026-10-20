import { certifications, experience, person, toolset } from "@/lib/content";
import { Monogram } from "./Wordmark";
import { ArrowUpRight } from "./Icons";
import Lines from "./Lines";

export default function About() {
  return (
    <section id="about" aria-label="About">
      <div className="wrap sec-head">
        <span className="label">(06) About</span>
      </div>
      <div className="wrap about">
        <figure className={`portrait rv${person.portrait ? "" : " no-photo"}`}>
          <div className="portrait__frame">
            {person.portrait && (
              <img src={person.portrait} width={person.portraitSize.w} height={person.portraitSize.h} alt="Gudita Jain in a navy saree, smiling, lit from behind against a dark backdrop" loading="lazy" decoding="async" />
            )}
            <div className="portrait__fallback" aria-hidden={!!person.portrait}>
              <Monogram />
            </div>
          </div>
          <figcaption>
            <span className="label">Gudita Jain</span>
            <span className="label">{person.city}</span>
          </figcaption>
        </figure>

        <div className="about__main">
          <Lines
            as="h2"
            className="display h-m"
            lines={["I design the whole", "system, not the", <>single <em className="it">post.</em></>]}
          />
          <div className="about__bio rv">
            <p>
              I’m Gudita, a graphic designer and video editor based in Noida. I design the logotype, the packaging it lands
              on, and the twenty pieces that keep it recognisable everywhere else.
            </p>
            <p>
              I started with identity work: Catfé, a cat café I took from logotype to signage, packaging and outdoor;
              SkinVibes, a natural skincare label; and marks like the Glow Grow lettermark. As a freelancer I designed for
              retail, food and education clients. In 2026 I moved into high-volume design, first in-house at Arihant
              Public School in Kota, then as graphic designer and video editor for Amrut.AI, an AI-visibility platform
              based in Vancouver.
            </p>
            <p>
              The motion side comes from my degree in Animation &amp; Gaming. Different audiences, same discipline:
              decide the idea first, then make it survive a business card, a billboard and a phone screen without losing
              its voice.
            </p>
          </div>

          <div className="xp">
            <h3 className="label">Experience &amp; education</h3>
            <ul>
              {experience.map((x) => (
                <li key={x.role} className="rv">
                  <div>
                    <strong>{x.role}</strong>
                    <small>{x.org}</small>
                  </div>
                  <span className="where">{x.where}</span>
                  <span className={`when${x.now ? " now" : ""}`}>{x.when}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="tools">
            {toolset.map((t) => (
              <div key={t.h} className="rv">
                <h3 className="label">{t.h}</h3>
                <ul>
                  {t.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="tools certs rv">
            <div style={{ gridColumn: "1 / -1" }}>
              <h3 className="label">Certifications</h3>
              <ul className="cert-list">
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about__cta rv">
            <a className="btn btn--solid" href={person.cv} target="_blank" rel="noopener">
              Download CV <ArrowUpRight />
            </a>
            <a className="btn" href={person.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
            <a className="btn" href={person.behance} target="_blank" rel="noopener noreferrer">
              Behance <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
