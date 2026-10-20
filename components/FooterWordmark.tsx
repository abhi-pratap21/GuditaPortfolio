"use client";

import { useEffect, useRef, useState } from "react";
import { WORDMARK_HERO } from "@/lib/logo";

/* Footer sign-off: the wordmark rises letter by letter when the footer comes into view,
   and a vermilion light follows the pointer across it. */
const svg = (cls: string) => WORDMARK_HERO.replace('class="hero-wm"', `class="fw__svg ${cls}"`);

export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`fw${shown ? " is-in" : ""}${hot ? " is-hot" : ""}`}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
    >
      <div className="fw__base" dangerouslySetInnerHTML={{ __html: svg("fw__svg--base") }} />
      <div className="fw__hot" dangerouslySetInnerHTML={{ __html: svg("fw__svg--hot") }} />
    </div>
  );
}
