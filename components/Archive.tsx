"use client";

import { useMemo, useRef, useState } from "react";
import { archive, CATEGORIES } from "@/lib/content";
import { lbProps } from "@/lib/lb";
import Lines from "./Lines";

const FILTERS = ["All", ...CATEGORIES] as const;
/* "All" opens as a shorter wall that fades out; a category filter always shows everything in it. */

/* Every piece in one wall, filterable by discipline. Click to open full size. */
export default function Archive() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const collapsed = f === "All" && !open;
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: archive.length };
    archive.forEach((p) => (c[p.cat] = (c[p.cat] || 0) + 1));
    return c;
  }, []);
  const clients = useMemo(() => new Set(archive.map((p) => p.client)).size, []);

  return (
    <section id="index" aria-label="Index of pieces">
      <div className="wrap sec-head">
        <span className="label">(04) Index</span>
        <Lines as="h2" className="display h-l" lines={["Every piece,", <>one <em className="it">wall.</em></>]} />
        <p className="rv">
          {archive.length} pieces for {clients} clients and concepts. Filter by discipline, then open any piece full size.
          Arrow keys move through the set.
        </p>
      </div>
      <div className="wrap archive">
        <div className="filters" role="group" aria-label="Filter by discipline" ref={top}>
          {FILTERS.map((c) => (
            <button key={c} className="filter" aria-pressed={f === c} onClick={() => { setF(c); setOpen(false); }}>
              {c}
              <sup>{counts[c]}</sup>
            </button>
          ))}
        </div>
        <div
          className={`wall${collapsed ? " is-collapsed" : ""}`}
          onFocus={(e) => {
            // tabbing onto a piece hidden under the fade opens the wall instead of scrolling it
            if (!collapsed) return;
            const wall = e.currentTarget.getBoundingClientRect();
            if (e.target.getBoundingClientRect().bottom > wall.bottom - 200) setOpen(true);
          }}
        >
        <div className="masonry">
          {archive.map((p, i) => (
            <button
              key={p.src}
              className={`piece${p.wide ? " piece--wide" : ""}${f !== "All" && p.cat !== f ? " is-out" : ""}`}
              {...lbProps("archive", p, p.title, p.client)}
              data-cursor="Open"
              aria-label={`Open ${p.title}, ${p.client}`}
            >
              <span className="piece__img rv-img" style={{ ["--d" as string]: i % 4 }}>
                <img src={p.src} width={p.w} height={p.h} alt={p.alt} loading="lazy" decoding="async" />
              </span>
              <span className="piece__cap">
                <span>{p.title}</span>
                <span>{p.client}</span>
              </span>
            </button>
          ))}
        </div>
        {collapsed && <span className="wall__fade" aria-hidden="true" />}
        </div>
        {f === "All" && (
          <div className={`more-btn${collapsed ? "" : " is-open"}`}>
            <button
              className="btn"
              aria-expanded={!collapsed}
              onClick={() => {
                if (!collapsed) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                setOpen(!open);
              }}
            >
              {collapsed ? `Show all ${archive.length} pieces` : "Show fewer"}
              <span className="more-btn__n" aria-hidden="true">{collapsed ? "↓" : "↑"}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
