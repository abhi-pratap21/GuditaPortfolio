"use client";

import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/content";
import Lines from "./Lines";

/* Services list. On desktop a preview follows the pointer down the rows. */
export default function Capabilities() {
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = float.current;
    if (!el || !window.matchMedia("(hover: hover) and (min-width: 900px)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX + 24;
      y = e.clientY - 150;
    };
    const tick = () => {
      cx += (x - cx) * 0.14;
      cy += (y - cy) * 0.14;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section id="services" aria-label="Capabilities">
      <div className="wrap sec-head">
        <span className="label">(03) Capabilities</span>
        <Lines as="h2" className="display h-l" lines={["What I make,", <>start to <em className="it">finish.</em></>]} />
        <p className="rv">Concept, layout, photo compositing, final artwork and the edit. One person on every step, so nothing gets lost between them.</p>
      </div>
      <div className="wrap">
        <ul className="caps" onPointerLeave={() => setActive(-1)}>
          {capabilities.map((c, i) => (
            <li className="cap rv" key={c.t} onPointerEnter={() => setActive(i)} style={{ ["--d" as string]: i }}>
              <span className="cap__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="cap__t">{c.t}</h3>
              <p className="cap__d">{c.d}</p>
              <span className="cap__x">{c.x}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`cap-float${active >= 0 ? " on" : ""}`} ref={float} aria-hidden="true">
        {capabilities.map((c, i) => (
          <img key={c.t} src={c.img.src} alt="" className={i === active ? "on" : ""} loading="lazy" decoding="async" />
        ))}
      </div>
    </section>
  );
}
