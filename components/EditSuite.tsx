"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reels, type Reel } from "@/lib/content";
import Lines from "./Lines";

/* A small edit suite around real renders: the program monitor plays the selected clip,
   the timeline is built from that clip's own frames, and the bin switches between clips. */

const pickSrc = (r: Reel) => (window.innerWidth < 760 ? r.src.sd : r.src.hd);
const p2 = (n: number) => String(n).padStart(2, "0");
const tc = (sec: number, fps: number) => {
  const f = Math.min(fps - 1, Math.floor((sec % 1) * fps));
  return `00:${p2(Math.floor(sec / 60))}:${p2(Math.floor(sec) % 60)}:${p2(f)}`;
};
const len = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}:${p2(Math.round(s % 60))}` : `${Math.round(s)}s`);

export default function EditSuite() {
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const tcEl = useRef<HTMLSpanElement>(null);
  const tcEl2 = useRef<HTMLSpanElement>(null);
  const loaded = useRef<string | null>(null);
  const onScreen = useRef(false);
  const userPaused = useRef(false);
  const dragging = useRef<{ wasPlaying: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const reel = reels[active];
  const [dur, setDur] = useState(reel.dur);

  const paint = useCallback(() => {
    const v = video.current;
    if (!v) return;
    const d = v.duration || dur;
    const t = v.currentTime;
    if (head.current) head.current.style.left = `${Math.min(100, (t / d) * 100)}%`;
    const s = tc(t, reel.fps);
    if (tcEl.current) tcEl.current.textContent = s;
    if (tcEl2.current) tcEl2.current.textContent = `${s} / ${tc(Math.max(0, d - 1 / reel.fps), reel.fps)}`;
    area.current?.setAttribute("aria-valuenow", t.toFixed(2));
  }, [dur, reel.fps]);

  // keep the playhead in step with playback
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

  const ensureSrc = useCallback(() => {
    const v = video.current!;
    const r = reels[active];
    if (loaded.current !== r.id) {
      loaded.current = r.id;
      v.src = pickSrc(r);
      v.load();
    }
    return v;
  }, [active]);

  // a new clip in the bin: load it, and keep playing if the viewer was watching
  useEffect(() => {
    setDur(reels[active].dur);
    if (!video.current || loaded.current === null) return;
    const v = ensureSrc();
    if (onScreen.current && !userPaused.current) v.play().catch(() => {});
  }, [active, ensureSrc]);

  // load only when the section comes near; play while it is on screen
  useEffect(() => {
    const v = video.current;
    const el = root.current;
    if (!v || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        ensureSrc();
        near.disconnect();
      },
      { rootMargin: "600px 0px" }
    );
    const visible = new IntersectionObserver(
      ([e]) => {
        onScreen.current = e.isIntersecting;
        if (e.isIntersecting && !userPaused.current && !reduce) ensureSrc().play().catch(() => {});
        if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.4 }
    );
    near.observe(el);
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, [ensureSrc]);

  const toggle = () => {
    const v = ensureSrc();
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const step = (frames: number) => {
    const v = ensureSrc();
    userPaused.current = true;
    v.pause();
    const d = v.duration || dur;
    v.currentTime = Math.min(d - 1 / reel.fps, Math.max(0, v.currentTime + frames / reel.fps));
  };

  const seekTo = (clientX: number) => {
    const v = ensureSrc();
    const r = area.current!.getBoundingClientRect();
    const p = Math.min(0.999, Math.max(0, (clientX - r.left) / r.width));
    v.currentTime = p * (v.duration || dur);
    paint();
  };

  const fullscreen = () => {
    const v = ensureSrc() as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  const choose = (i: number) => {
    if (i === active) return;
    userPaused.current = false;
    setActive(i);
  };

  const [rw, rh] = reel.ratio;
  const portrait = rw < rh;
  const ticks = Math.max(1, Math.floor(dur));
  const every = dur > 40 ? 10 : dur > 14 ? 2 : 1;

  return (
    <section className="night" id="motion" aria-label="Motion and edit">
      <div className="wrap sec-head">
        <span className="label">(02) Motion &amp; edit</span>
        <Lines
          as="h2"
          className="display h-l"
          lines={[
            "Frames, cuts",
            <>
              and <em className="it">timing.</em>
            </>,
          ]}
        />
        <p className="rv">
          The video side of the practice. Press play, step through frame by frame, or drag along the timeline
          {reels.length > 1 ? ". Pick a clip from the bin to switch." : "."}
        </p>
      </div>

      <div className="wrap suite">
        <div className="suite__grid">
          <div ref={root} className="rv">
            <div className={`monitor${playing ? " is-playing" : ""}`}>
              <div className="monitor__bar">
                <span className="label rec">
                  <span className="dot" aria-hidden="true" /> Program
                </span>
                <span className="label">
                  {reel.client} · {rw}:{rh} · {reel.fps} fps{reel.audio ? "" : " · silent"}
                </span>
              </div>
              <div
                className={`screen${portrait ? " screen--portrait" : ""}`}
                style={{ ["--ar" as string]: portrait ? "16 / 10" : `${rw} / ${rh}` }}
              >
                <video
                  ref={video}
                  className="screen__video"
                  poster={reel.poster.src}
                  muted={muted}
                  loop
                  playsInline
                  preload="none"
                  aria-label={`${reel.title}. ${reel.note}`}
                  onPlay={() => setPlaying(true)}
                  onPause={() => {
                    setPlaying(false);
                    paint();
                  }}
                  onSeeked={paint}
                  onLoadedMetadata={(e) => {
                    setDur(e.currentTarget.duration || reel.dur);
                    paint();
                  }}
                  onClick={toggle}
                />
                <div className="screen__safe" aria-hidden="true" />
                <span className="screen__tc" ref={tcEl} aria-hidden="true">
                  00:00:00:00
                </span>
                <span className="screen__name">{reel.title}</span>
              </div>
              <div className="transport">
                <button className="tbtn" onClick={() => step(-1)} aria-label="Back one frame">
                  <svg viewBox="0 0 16 16"><path d="M3 2h2v12H3zM14 2v12L6 8z" /></svg>
                </button>
                <button className="tbtn tbtn--play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                  <svg className="i-play" viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" /></svg>
                  <svg className="i-pause" viewBox="0 0 16 16"><path d="M3 2h4v12H3zM9 2h4v12H9z" /></svg>
                </button>
                <button className="tbtn" onClick={() => step(1)} aria-label="Forward one frame">
                  <svg viewBox="0 0 16 16"><path d="M11 2h2v12h-2zM2 2v12l8-6z" /></svg>
                </button>
                <span className="transport__tc" ref={tcEl2} aria-hidden="true">
                  00:00:00:00
                </span>
                {reel.audio && (
                  <button className="tbtn" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Sound on" : "Sound off"} aria-pressed={!muted}>
                    {muted ? (
                      <svg viewBox="0 0 16 16"><path d="M2 6h3l4-3v10l-4-3H2zM11 6l4 4M15 6l-4 4" stroke="currentColor" strokeWidth="1.4" /></svg>
                    ) : (
                      <svg viewBox="0 0 16 16"><path d="M2 6h3l4-3v10l-4-3H2z" /><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                    )}
                  </button>
                )}
                <button className="tbtn" onClick={fullscreen} aria-label="Full screen">
                  <svg viewBox="0 0 16 16"><path d="M2 2h5v2H4v3H2zM9 2h5v5h-2V4H9zM2 9h2v3h3v2H2zM12 9h2v5H9v-2h3z" /></svg>
                </button>
              </div>
            </div>

            <div className="timeline">
              <div className="tl__ruler" aria-hidden="true">
                {Array.from({ length: ticks + 1 }, (_, s) => s)
                  .filter((s) => s % every === 0)
                  .map((s) => (
                    <span key={s} style={{ left: `${(s / dur) * 100}%` }}>
                      {p2(Math.floor(s / 60))}:{p2(s % 60)}
                    </span>
                  ))}
              </div>
              <div className="tl__tracks">
                <div className="track track--v">
                  <span className="track__id">V1</span>
                  <div className="track__lane">
                    <div className="clip clip--single is-active" key={reel.id}>
                      {reel.thumbs.map((f) => (
                        <img key={f.src} src={f.src} width={f.w} height={f.h} alt="" loading="lazy" decoding="async" />
                      ))}
                      <b>{reel.title}</b>
                    </div>
                  </div>
                </div>
                {reel.audio && (
                  <div className="track track--a" key={`a-${reel.id}`}>
                    <span className="track__id">A1</span>
                    <div className="track__lane">
                      <div className="wave">
                        {reel.wave && (
                          <svg viewBox={`0 0 ${reel.wave.length * 4} 40`} preserveAspectRatio="none" aria-hidden="true">
                            {Array.from(reel.wave).map((c, i) => {
                              const h = Math.max(1.5, (parseInt(c, 36) / 35) * 34);
                              return <rect key={i} x={i * 4} y={(20 - h / 2).toFixed(2)} width="2.6" height={h.toFixed(2)} fill="#7FC4A8" opacity=".8" />;
                            })}
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="tl__area"
                  ref={area}
                  role="slider"
                  tabIndex={0}
                  aria-label="Scrub the timeline"
                  aria-valuemin={0}
                  aria-valuemax={dur}
                  aria-valuenow={0}
                  onPointerDown={(e) => {
                    (e.target as HTMLElement).setPointerCapture(e.pointerId);
                    const v = ensureSrc();
                    dragging.current = { wasPlaying: !v.paused };
                    v.pause();
                    seekTo(e.clientX);
                  }}
                  onPointerMove={(e) => dragging.current && seekTo(e.clientX)}
                  onPointerUp={() => {
                    if (dragging.current?.wasPlaying) video.current?.play().catch(() => {});
                    dragging.current = null;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") step(e.shiftKey ? reel.fps : 1);
                    else if (e.key === "ArrowLeft") step(e.shiftKey ? -reel.fps : -1);
                    else if (e.key === " ") toggle();
                    else return;
                    e.preventDefault();
                  }}
                >
                  <div className="playhead" ref={head} />
                </div>
              </div>
            </div>
          </div>

          <aside className="suite__notes rv" style={{ ["--d" as string]: 2 }}>
            <div className="suite__now" key={reel.id}>
              <span className="label">
                Now playing · {String(active + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}
              </span>
              <h3>{reel.headline}</h3>
              <p>{reel.note}</p>
              <div className="suite__tools">
                {reel.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bin">
              <span className="label">Bin · {reels.length} {reels.length === 1 ? "clip" : "clips"}</span>
              <ul>
                {reels.map((r, i) => (
                  <li key={r.id}>
                    <button className={`bin__item${i === active ? " is-active" : ""}`} onClick={() => choose(i)} aria-pressed={i === active}>
                      <span className="bin__thumb" style={{ ["--ar" as string]: `${r.ratio[0]} / ${r.ratio[1]}` }}>
                        <img src={r.poster.src} alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="bin__meta">
                        <strong>{r.title}</strong>
                        <span>
                          {r.client} · {len(r.dur)} · {r.ratio[0]}:{r.ratio[1]}
                        </span>
                      </span>
                      <span className="bin__state" aria-hidden="true">
                        {i === active ? (playing ? "Playing" : "Loaded") : "Play"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
