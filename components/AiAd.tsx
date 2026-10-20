"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { aiAd } from "@/lib/content";

/* The featured AI ad: the final cut and two behind-the-scenes cuts, played in lockstep.
   On desktop all three play and follow the final ad; on a phone one plays at a time
   and keeps the shared time when you switch. */

const p2 = (n: number) => String(n).padStart(2, "0");
const tc = (s: number) => `${p2(Math.floor(s / 60))}:${p2(Math.floor(s) % 60)}`;
const DUR = aiAd.dur;
const N = aiAd.cuts.length;

export default function AiAd() {
  const root = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const tcEl = useRef<HTMLSpanElement>(null);
  const mobile = useRef(false);
  const onScreen = useRef(false);
  const userPaused = useRef(false);
  const dragging = useRef(false);
  const [active, setActive] = useState(0); // the cut shown on phones
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [beat, setBeat] = useState(0);

  const clockIndex = () => (mobile.current ? active : 0);
  const shown = (i: number) => !mobile.current || i === active;
  const clock = () => vids.current[clockIndex()];

  const load = useCallback(() => {
    vids.current.forEach((v, i) => {
      if (!v || v.getAttribute("src")) return;
      if (mobile.current && i !== active) return;
      const c = aiAd.cuts[i];
      v.src = window.innerWidth < 760 ? c.src.sd : c.src.hd;
      v.load();
    });
  }, [active]);

  const paint = useCallback(() => {
    const v = clock();
    if (!v) return;
    const t = v.currentTime;
    if (fill.current) fill.current.style.transform = `scaleX(${Math.min(1, t / DUR)})`;
    if (tcEl.current) tcEl.current.textContent = `${tc(t)} / ${tc(DUR)}`;
    bar.current?.setAttribute("aria-valuenow", t.toFixed(1));
    let b = 0;
    aiAd.beats.forEach((x, i) => {
      if (t >= x.t) b = i;
    });
    setBeat((old) => (old === b ? old : b));
    // keep the followers locked to the clock
    vids.current.forEach((o, i) => {
      if (!o || i === clockIndex() || !shown(i) || !o.getAttribute("src")) return;
      if (Math.abs(o.currentTime - t) > 0.12) o.currentTime = t;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const loop = () => {
      paint();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, paint]);

  const playAll = useCallback(() => {
    load();
    const t = clock()?.currentTime ?? 0;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (shown(i)) {
        if (i !== clockIndex()) v.currentTime = t;
        v.play().catch(() => {});
      } else v.pause();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, active]);

  const pauseAll = () => vids.current.forEach((v) => v?.pause());

  // breakpoint, lazy load and autoplay while on screen
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const set = () => (mobile.current = mq.matches);
    set();
    mq.addEventListener("change", set);
    const el = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && (load(), near.disconnect()), { rootMargin: "700px 0px" });
    const vis = new IntersectionObserver(
      ([e]) => {
        onScreen.current = e.isIntersecting;
        if (e.isIntersecting && !userPaused.current && !reduce) playAll();
        if (!e.isIntersecting) pauseAll();
      },
      { threshold: 0.35 }
    );
    near.observe(el);
    vis.observe(el);
    return () => {
      mq.removeEventListener("change", set);
      near.disconnect();
      vis.disconnect();
    };
  }, [load, playAll]);

  // switching cut on a phone: carry the time across
  const choose = (i: number) => {
    if (i === active) return;
    const t = clock()?.currentTime ?? 0;
    const wasPlaying = playing;
    vids.current[active]?.pause();
    setActive(i);
    requestAnimationFrame(() => {
      const v = vids.current[i];
      if (!v) return;
      if (!v.getAttribute("src")) {
        const c = aiAd.cuts[i];
        v.src = window.innerWidth < 760 ? c.src.sd : c.src.hd;
        v.load();
      }
      v.currentTime = t;
      if (wasPlaying) v.play().catch(() => {});
    });
  };

  const toggle = () => {
    if (playing) {
      userPaused.current = true;
      pauseAll();
    } else {
      userPaused.current = false;
      playAll();
    }
  };

  const seek = (t: number) => {
    load();
    vids.current.forEach((v, i) => v && shown(i) && (v.currentTime = Math.max(0, Math.min(DUR - 0.05, t))));
    paint();
  };
  const seekX = (x: number) => {
    const r = bar.current!.getBoundingClientRect();
    seek(((x - r.left) / r.width) * DUR);
  };

  const sound = () => {
    const v = vids.current[0];
    const m = !muted;
    setMuted(m);
    if (v) v.muted = m;
    if (!m && mobile.current && active !== 0) choose(0);
    if (!m && !playing) {
      userPaused.current = false;
      playAll();
    }
  };

  const b = aiAd.beats[beat];

  return (
    <div className="aiad" ref={root}>
      <div className="aiad__copy rv">
        <span className="aiad__flag label">
          <span className="dot" aria-hidden="true" /> Featured · AI-generated ad · {aiAd.client} · {aiAd.year}
        </span>
        <h3 className="aiad__title">{aiAd.title}</h3>
        <p className="aiad__lead">{aiAd.lead}</p>
        <p className="aiad__note">{aiAd.note}</p>
        <ol className="aiad__steps">
          {aiAd.steps.map((s, i) => (
            <li key={s.t}>
              <span className="label">{p2(i + 1)}</span>
              <div>
                <strong>{s.t}</strong>
                <span>{s.d}</span>
              </div>
            </li>
          ))}
        </ol>
        <div className="suite__tools">
          {aiAd.tools.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="aiad__stage rv" style={{ ["--d" as string]: 1 }}>
        <div className="aiad__tabs" role="tablist" aria-label="Choose a cut">
          {aiAd.cuts.map((c, i) => (
            <button key={c.id} role="tab" aria-selected={i === active} className={i === active ? "is-on" : ""} onClick={() => choose(i)}>
              {i === 0 ? "Final ad" : `Build · ${c.id}`}
            </button>
          ))}
        </div>

        <div className="aiad__phones">
          {aiAd.cuts.map((c, i) => (
            <figure key={c.id} className={`phone phone--${c.id}${i === active ? " is-on" : ""}`}>
              <div className="phone__body">
                <video
                  ref={(el) => {
                    vids.current[i] = el;
                  }}
                  poster={c.poster.src}
                  muted={i === 0 ? muted : true}
                  loop
                  playsInline
                  preload="none"
                  aria-label={`${c.label}, ${c.sub}`}
                  onClick={toggle}
                  onPlay={() => i === clockIndex() && setPlaying(true)}
                  onPause={() => i === clockIndex() && setPlaying(false)}
                />
                <span className="phone__island" aria-hidden="true" />
                {i === 0 && (
                  <button className="phone__sound" onClick={sound} aria-pressed={!muted} aria-label={muted ? "Sound on" : "Sound off"}>
                    {muted ? "Sound off" : "Sound on"}
                  </button>
                )}
              </div>
              <figcaption>
                <strong>{c.label}</strong>
                <span>{c.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="aiad__transport">
          <button className="tbtn tbtn--play" onClick={toggle} aria-label={playing ? "Pause all" : "Play all"}>
            {playing ? (
              <svg viewBox="0 0 16 16"><path d="M3 2h4v12H3zM9 2h4v12H9z" /></svg>
            ) : (
              <svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" /></svg>
            )}
          </button>
          <div className="aiad__now" aria-live="polite">
            <span className="label">
              Now · {b.label} <span ref={tcEl}>00:00 / {tc(DUR)}</span>
            </span>
            <p key={b.label}>{b.text}</p>
          </div>
        </div>

        <div
          className="aiad__bar"
          ref={bar}
          role="slider"
          tabIndex={0}
          aria-label="Scrub all three cuts"
          aria-valuemin={0}
          aria-valuemax={DUR}
          aria-valuenow={0}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            dragging.current = true;
            seekX(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && seekX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onKeyDown={(e) => {
            const t = clock()?.currentTime ?? 0;
            if (e.key === "ArrowRight") seek(t + 2);
            else if (e.key === "ArrowLeft") seek(t - 2);
            else if (e.key === " ") toggle();
            else return;
            e.preventDefault();
          }}
        >
          <span className="aiad__track">
            <span className="aiad__fill" ref={fill} />
          </span>
          {aiAd.beats.map((x, i) => (
            <button
              key={x.label}
              className={`aiad__beat${i === beat ? " is-on" : ""}${i < beat ? " is-past" : ""}`}
              style={{ left: `${(x.t / DUR) * 100}%` }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => seek(x.t + 0.05)}
              aria-label={`Jump to ${x.label}, ${tc(x.t)}`}
            >
              <i />
              <span>{x.label}</span>
            </button>
          ))}
        </div>
        <p className="aiad__hint label">Three cuts, one clock. Click a beat to jump, or tap any phone to pause.</p>
      </div>
    </div>
  );
}
