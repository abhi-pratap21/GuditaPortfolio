"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroCards, person } from "@/lib/content";
import { HeroWordmark, Monogram } from "./Wordmark";
import { ArrowDown, ArrowUpRight } from "./Icons";
import Clock from "./Clock";
import { lenis } from "./lenis";

/* Five slots in a fan. Every tick the deck moves one slot left: the leftmost card
   leaves, the rest slide over, and the next piece from the pool comes in on the right. */
const SLOTS = [
  { x: 0, y: 30, w: 24, r: -8, z: 1, d: 0.4 },
  { x: 12, y: 16, w: 30, r: -4, z: 3, d: 0.8 },
  { x: 28, y: 2, w: 44, r: 1, z: 5, d: 1.4 },
  { x: 58, y: 16, w: 30, r: 4, z: 3, d: 0.8 },
  { x: 76, y: 30, w: 24, r: 8, z: 1, d: 0.4 },
];
const EXIT = { x: -12, y: 38, w: 20, r: -14, z: 0, d: 0.3 };
const WAIT = { x: 92, y: 38, w: 20, r: 14, z: 0, d: 0.3 };
const TICK = 2400;
const N = heroCards.length;

export default function Hero() {
  const stack = useRef<HTMLDivElement>(null);
  const [o, setO] = useState(0);
  const paused = useRef(false);

  // the deck turns on a timer; paused on hover, off screen, in a hidden tab or for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = stack.current!;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const id = window.setInterval(() => {
      if (!paused.current && visible && !document.hidden) setO((v) => (v + 1) % N);
    }, TICK);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  // the fan drifts against the pointer; each slot has its own depth
  useEffect(() => {
    const el = stack.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--nx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--ny", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const front = heroCards[(o + 2) % N];
  const next = () => setO((v) => (v + 1) % N);

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

        <div
          className="hero__stack"
          ref={stack}
          aria-label="Recent pieces"
          onPointerEnter={() => (paused.current = true)}
          onPointerLeave={() => (paused.current = false)}
          onFocus={() => (paused.current = true)}
          onBlur={() => (paused.current = false)}
        >
          {heroCards.map((c, i) => {
            const rel = (i - o + N) % N;
            const slot = rel < SLOTS.length ? SLOTS[rel] : rel === N - 1 ? EXIT : WAIT;
            const on = rel < SLOTS.length;
            return (
              <Link
                key={c.img.src + i}
                href={c.href}
                className={`card${on ? " is-on" : rel === N - 1 ? " is-exit" : " is-wait"}`}
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  width: `${slot.w}%`,
                  zIndex: slot.z,
                  ["--r" as string]: `${slot.r}deg`,
                  ["--dp" as string]: slot.d,
                  ["--k" as string]: rel,
                }}
                tabIndex={on ? 0 : -1}
                aria-hidden={!on}
                data-cursor="Open"
                aria-label={`${c.tag}: open`}
              >
                {c.video ? (
                  <DeckVideo src={c.video} poster={c.img.src} label={c.img.alt} on={on} />
                ) : (
                  <img src={c.img.src} width={c.img.w} height={c.img.h} alt={c.img.alt} loading={i < 7 ? "eager" : "lazy"} fetchPriority={i < 5 ? "high" : undefined} />
                )}
                {c.video && (
                  <span className="card__motion" aria-hidden="true">
                    <i /> Motion
                  </span>
                )}
                <span className="card__tag">{c.tag}</span>
              </Link>
            );
          })}
          <div className="deck__meta">
            <span className="label" aria-hidden="true">
              <b>{String(((o + 2) % N) + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")} · {front.tag}
            </span>
            <span className="deck__bar" aria-hidden="true">
              <i key={o} />
            </span>
            <button className="deck__next" onClick={next} aria-label="Next piece">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
          </div>
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

/* A video card in the deck: silent loop, loaded on first appearance, playing only while in the fan. */
function DeckVideo({ src, poster, label, on }: { src: string; poster: string; label: string; on: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (on) {
      if (!v.getAttribute("src")) v.src = src;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    } else v.pause();
  }, [on, src]);
  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-label={label} />;
}
