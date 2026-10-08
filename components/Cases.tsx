"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/content";
import { ArrowUpRight } from "./Icons";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

/* Featured cases stick and stack; each one sinks a little as the next slides over it.
   The rest sit underneath as a pair of smaller cards. */
export default function Cases() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".case"));
    const mq = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches) {
        cards.forEach((c) => {
          c.style.transform = "";
          c.style.removeProperty("--dim");
        });
        return;
      }
      const vh = window.innerHeight;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const stickTop = parseFloat(getComputedStyle(c).top) || 0;
        const nt = next.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, 1 - (nt - stickTop) / (vh - stickTop)));
        c.style.transform = `scale(${(1 - p * 0.06).toFixed(4)})`;
        c.style.setProperty("--dim", (p * 0.45).toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="wrap cases" ref={ref}>
        {featured.map((p, k) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}/`}
            className="case"
            style={{ ["--c" as string]: p.color, ["--t" as string]: p.text, ["--k" as string]: k }}
            data-cursor="View case"
          >
            <div className="case__info">
              <div className="case__top">
                <span className="label">
                  {String(k + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                </span>
                <span className="label">{p.year}</span>
              </div>
              <h3 className="case__title">{p.name}</h3>
              <p className="case__desc">{p.card}</p>
              <ul className="case__tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="case__cta">
                <i aria-hidden="true">
                  <ArrowUpRight className="" />
                </i>
                View case study
              </span>
            </div>
            <div className="case__media">
              {p.cardMedia.map((m, i) => (
                <figure key={i}>
                  <img src={m.src} width={m.w} height={m.h} alt={m.alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="wrap more">
        <div className="more__head">
          <span className="label">More work</span>
        </div>
        <div className="more__grid">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}/`}
              className="mcard rv"
              style={{ ["--c" as string]: p.color, ["--t" as string]: p.text }}
              data-cursor="View case"
            >
              <div className="mcard__media">
                {p.cardMedia.slice(0, 2).map((m, i) => (
                  <img key={i} src={m.src} width={m.w} height={m.h} alt={m.alt} loading="lazy" decoding="async" />
                ))}
              </div>
              <div className="mcard__info">
                <div>
                  <span className="label">{p.year} · {p.tags.slice(0, 2).join(" · ")}</span>
                  <h3>{p.name}</h3>
                  <p>{p.card}</p>
                </div>
                <i aria-hidden="true">
                  <ArrowUpRight className="" />
                </i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
