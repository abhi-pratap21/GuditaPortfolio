"use client";

import { useMemo, useState } from "react";
import { archive, CATEGORIES } from "@/lib/content";
import { lbProps } from "@/lib/lb";
import Lines from "./Lines";

const FILTERS = ["All", ...CATEGORIES] as const;

/* Every piece in one wall, filterable by discipline. Click to open full size. */
export default function Archive() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
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
        <div className="filters" role="group" aria-label="Filter by discipline">
          {FILTERS.map((c) => (
            <button key={c} className="filter" aria-pressed={f === c} onClick={() => setF(c)}>
              {c}
              <sup>{counts[c]}</sup>
            </button>
          ))}
        </div>
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
      </div>
    </section>
  );
}
