"use client";

import { useEffect, useRef } from "react";
import { facts } from "@/lib/content";

/* Numbers count up once, when the row scrolls into view. */
export default function Facts() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-n]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduce) return;
        const t0 = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const ease = 1 - Math.pow(1 - p, 4);
          nums.forEach((n) => {
            n.textContent = String(Math.round(Number(n.dataset.n) * ease)) + (n.dataset.s || "");
          });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="wrap">
      <div className="facts" ref={ref}>
        {facts.map((f, i) => (
          <div className="fact rv" key={i} style={{ ["--d" as string]: i }}>
            <span className="fact__n" data-n={f.n} data-s={f.suffix}>
              {f.n}
              {f.suffix}
            </span>
            <p>{f.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
