import Link from "next/link";
import { reels, type Block, type Chapter, type Project, type Shot } from "@/lib/content";
import CaseVideo from "./CaseVideo";
import { lbProps } from "@/lib/lb";
import { Annotated, Swipe } from "./CaseInteractive";
import { ArrowRight } from "./Icons";

export function CaseHero({ p, index, total }: { p: Project; index: number; total: number }) {
  return (
    <header className="cs-hero" style={{ ["--c" as string]: p.color, ["--t" as string]: p.text }}>
      <div className="wrap">
        <div className="cs-hero__top">
          <Link className="label" href="/#work">
            ← All work
          </Link>
          <span className="label">
            Case study {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {p.year}
          </span>
        </div>
        <h1 className="cs-title lines">
          <span className="ln">
            <span>{p.name}</span>
          </span>
        </h1>
        <div className="cs-sum">
          <p className="rv">{p.summary}</p>
        </div>
        <dl className="cs-meta rv">
          {p.meta.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

export function CaseCover({ p }: { p: Project }) {
  const [a, b, c] = p.cardMedia;
  return (
    <div className="cs-cover" style={{ ["--c" as string]: p.color }}>
      <div className="wrap">
        <div className="cover-grid">
          {[a, b, c].map((m, i) => (
            <figure key={m.src} className="rv-img" style={{ ["--d" as string]: i }}>
              <img src={m.src} width={m.w} height={m.h} alt={m.alt} fetchPriority={i === 0 ? "high" : undefined} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Story({ p }: { p: Project }) {
  return (
    <div className="wrap text-block">
      <span className="label">{p.story.label}</span>
      <div className="rv">
        {p.story.lead.map((l) => (
          <p key={l}>{l}</p>
        ))}
        {p.story.body && <p className="small">{p.story.body}</p>}
      </div>
    </div>
  );
}

const BOARD_MAX_H = 620;

function ShotFig({ s, group, pad, d }: { s: Shot; group: string; pad?: boolean; d: number }) {
  const board = pad ?? s.w < 1000;
  // On a board the piece shows at its native size (capped in height), never upscaled.
  // A fixed width keeps the box sized before the image loads, so nothing jumps.
  const boardW = Math.min(s.w, Math.round((BOARD_MAX_H * s.w) / s.h));
  return (
    <figure className="shot rv" style={{ ["--d" as string]: d }}>
      <button
        className={`shot__img zoom${board ? " shot__img--pad" : ""}`}
        {...lbProps(group, s, s.title, s.caption)}
        data-cursor="Open"
        aria-label={`Open ${s.title ?? "image"}`}
      >
        <img
          src={s.src}
          width={s.w}
          height={s.h}
          alt={s.alt}
          loading="lazy"
          decoding="async"
          style={board ? { width: boardW } : undefined}
        />
      </button>
      {(s.title || s.caption) && (
        <figcaption>
          {s.title && <strong>{s.title}</strong>}
          {s.caption && <span>{s.caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function BlockView({ b, group }: { b: Block; group: string }) {
  switch (b.type) {
    case "gallery":
      return (
        <div className={`g g--${b.cols}${b.items.some((i) => (b.pad ?? i.w < 1000)) ? " g--boards" : " g--a"}`}>
          {b.items.map((s, i) => (
            <ShotFig key={s.src} s={s} group={group} pad={b.pad} d={i} />
          ))}
        </div>
      );
    case "annotated":
      return <Annotated img={b.img} notes={b.notes} />;
    case "swipe":
      return <Swipe items={b.items} group={group} />;
    case "browser":
      return (
        <div className="browser rv">
          <div className="browser__bar" aria-hidden="true">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span className="browser__url">{b.url}</span>
          </div>
          <div className="browser__view" data-lenis-prevent tabIndex={0} aria-label="Landing page, scroll to explore">
            <img src={b.img.src} width={b.img.w} height={b.img.h} alt={b.img.alt} loading="lazy" decoding="async" />
          </div>
        </div>
      );
    case "video":
      return (
        <div className="g g--2 g--a">
          {b.ids.map((id, i) => {
            const r = reels.find((x) => x.id === id);
            return r ? <CaseVideo key={id} reel={r} d={i} /> : null;
          })}
        </div>
      );
    case "palette":
      return (
        <div className="pal">
          <div className="pal__colors">
            {b.colors.map((c, i) => (
              <figure key={c.hex} className="pal__chip rv" style={{ ["--d" as string]: i }}>
                <span style={{ background: c.hex }} />
                <figcaption>
                  <strong>{c.name}</strong>
                  <span>{c.hex}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ul className="pal__type">
            {b.fonts.map((f) => (
              <li key={f.name} className="rv">
                <b className={`pal__sample pal__sample--${f.style}`}>{f.sample}</b>
                <div>
                  <strong>{f.name}</strong>
                  <span>{f.use}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case "rules":
      return (
        <ul className="rules" style={{ ["--n" as string]: b.items.length }}>
          {b.items.map((r, i) => (
            <li key={r.title} className="rv" style={{ ["--d" as string]: i }}>
              <strong>{r.title}</strong>
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export function ChapterView({ c, group }: { c: Chapter; group: string }) {
  return (
    <section className="wrap chapter" id={c.id} aria-label={c.title}>
      <div className="chapter__head">
        <span className="chapter__n rv" aria-hidden="true">
          {c.n}
        </span>
        <h2 className="rv">
          {c.title}
          {c.kicker && <span className="label">{c.kicker}</span>}
        </h2>
        {c.intro && <p className="rv">{c.intro}</p>}
      </div>
      <div className="chapter__body">
        {c.blocks.map((b, i) => (
          <BlockView key={i} b={b} group={group} />
        ))}
      </div>
    </section>
  );
}

export function Outcome({ p }: { p: Project }) {
  return (
    <section className="wrap chapter" aria-label="Outcome">
      <div className="chapter__head">
        <span className="chapter__n rv" aria-hidden="true">
          ✓
        </span>
        <h2 className="rv">In numbers</h2>
      </div>
      <div className="outcome">
        {p.outcome.map((o, i) => (
          <div key={o.t} className="rv" style={{ ["--d" as string]: i }}>
            <b>{o.n}</b>
            <span>{o.t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NextProject({ p }: { p: Project }) {
  return (
    <Link
      href={`/work/${p.slug}/`}
      className="next"
      style={{ ["--c" as string]: p.color, ["--t" as string]: p.text }}
      data-cursor="Next case"
    >
      <div className="wrap">
        <span className="label">Next case study</span>
        <div className="next__t">
          <span>{p.name}</span>
          <i aria-hidden="true">
            <ArrowRight />
          </i>
        </div>
      </div>
    </Link>
  );
}

