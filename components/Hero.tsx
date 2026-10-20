"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { heroCards, person } from "@/lib/content";
import { HeroWordmark, Monogram } from "./Wordmark";
import { ArrowDown, ArrowUpRight } from "./Icons";
import Clock from "./Clock";
import { lenis } from "./lenis";

const DEPTH = [0.5, 0.9, 1.4, 1.0, 0.6];

export default function Hero() {
  const stack = useRef<HTMLDivElement>(null);

  // cards drift against the pointer, each at its own depth
  useEffect(() => {
    const el = stack.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".card"));
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        cards.forEach((c, i) => {
          c.style.setProperty("--mx", `${(-nx * 26 * DEPTH[i]).toFixed(1)}px`);
          c.style.setProperty("--my", `${(-ny * 20 * DEPTH[i]).toFixed(1)}px`);
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const toWork = (e: React.MouseEvent) => {
    const t = document.getElementById("motion");
    if (!t) return;
    e.preventDefault();
    const l = lenis();
    if (l) l.scrollTo(t, { offset: 0, duration: 1.4 });
    else t.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__meta">
        <span className="label">Portfolio · 2025–26</span>
        <span className="label">
          Noida, IN · <Clock /> IST
        </span>
        <span className="label">Now: design & edit at Amrut.AI</span>
      </div>

      <div className="wrap hero__body">
        <div className="hero__left">
          <h1 className="hero__intro rv" id="hero-title">
            Hi, I’m Gudita<span className="sr-only"> Jain</span>{" "}
            <span className="hero__mark" aria-hidden="true">
              <Monogram />
            </span>
            , a graphic designer &amp; AI video editor. I build brand systems, campaigns and AI-made ads that{" "}
            <em className="it">hold up</em> on a phone, a menu card and a street hoarding.
          </h1>
          <div className="hero__aside rv" style={{ ["--d" as string]: 2 }}>
            <a className="btn btn--solid" href="#motion" onClick={toWork}>
              See the work <ArrowDown />
            </a>
            <a className="btn" href={person.cv} target="_blank" rel="noopener">
              Download CV <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="hero__stack" ref={stack} aria-label="Recent pieces">
          {heroCards.map((c, k) => (
            <Link
              key={k}
              href={`/work/${c.slug}/`}
              className="card"
              style={{ ["--k" as string]: k }}
              data-cursor="Open"
              aria-label={`${c.tag}: open case study`}
            >
              <img src={c.img.src} width={c.img.w} height={c.img.h} alt={c.img.alt} fetchPriority={k < 3 ? "high" : undefined} />
              <span className="card__tag">{c.tag}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="wrap hero__name">
        <HeroWordmark />
      </div>

      <div className="wrap hero__foot">
        <span className="label scroll-cue">
          <i aria-hidden="true" /> Scroll
        </span>
        <span className="label">Brand · Social · Print · AI video</span>
        <span className="label">Selected work 2025–26</span>
      </div>
    </section>
  );
}
