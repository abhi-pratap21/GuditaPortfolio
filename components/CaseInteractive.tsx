"use client";

import { useEffect, useRef, useState } from "react";
import type { Img, Shot } from "@/lib/content";
import { lbProps } from "@/lib/lb";
import { ArrowLeft, ArrowRight } from "./Icons";

/* Numbered hotspots on a piece, linked to a list of notes. */
export function Annotated({ img, notes }: { img: Img; notes: { x: number; y: number; title: string; text: string }[] }) {
  const [on, setOn] = useState(-1);
  return (
    <div className="annot">
      <div className="annot__img rv">
        <img src={img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" decoding="async" />
        {notes.map((n, i) => (
          <button
            key={i}
            className={`hot${on === i ? " on" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            onPointerEnter={() => setOn(i)}
            onPointerLeave={() => setOn(-1)}
            onFocus={() => setOn(i)}
            onBlur={() => setOn(-1)}
            onClick={() => setOn(i)}
            aria-label={`${i + 1}: ${n.title}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ol className="notes">
        {notes.map((n, i) => (
          <li key={i} className="rv" style={{ ["--d" as string]: i }}>
            <div
              className={`note${on === i ? " on" : ""}`}
              onPointerEnter={() => setOn(i)}
              onPointerLeave={() => setOn(-1)}
            >
              <i>{i + 1}</i>
              <div>
                <strong>{n.title}</strong>
                <span>{n.text}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* A swipeable carousel, the way it would be seen on Instagram or LinkedIn. */
export function Swipe({ items, group }: { items: Shot[]; group: string }) {
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const onScroll = () => {
      const max = t.scrollWidth - t.clientWidth;
      const p = max > 0 ? t.scrollLeft / max : 0;
      const w = 100 / items.length;
      if (bar.current) {
        bar.current.style.width = `${w}%`;
        bar.current.style.transform = `translateX(${p * (items.length - 1) * 100}%)`;
      }
      setIdx(Math.round(p * (items.length - 1)));
    };
    onScroll();
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const go = (d: number) => {
    const t = track.current;
    if (!t) return;
    const card = t.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : t.clientWidth * 0.8;
    t.scrollBy({ left: d * step, behavior: "smooth" });
  };

  return (
    <div className="swipe rv">
      <div className="swipe__track" ref={track} data-lenis-prevent tabIndex={0} aria-label="Carousel slides, scroll sideways">
        {items.map((s, i) => (
          <figure className="shot" key={s.src}>
            <button className="shot__img" {...lbProps(group, s, s.title, s.caption)} data-cursor="Open" aria-label={`Open ${s.title}`}>
              <img src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" decoding="async" />
            </button>
            <figcaption>
              <strong>
                {String(i + 1).padStart(2, "0")} · {s.title}
              </strong>
              <span>{s.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="swipe__bar">
        <span className="label">
          {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="swipe__prog" aria-hidden="true">
          <i ref={bar} />
        </span>
        <button className="swipe__btn" onClick={() => go(-1)} aria-label="Previous slide">
          <ArrowLeft />
        </button>
        <button className="swipe__btn" onClick={() => go(1)} aria-label="Next slide">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
