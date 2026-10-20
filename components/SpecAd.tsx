"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScriptAd } from "@/lib/content";

/* The rhythm-edit spec ad: one phone, the script beside it lighting up line by line,
   and the shot lengths drawn underneath so the pacing can be seen, not just felt. */

const p2 = (n: number) => String(n).padStart(2, "0");
const tc = (s: number) => `${p2(Math.floor(s / 60))}:${p2(Math.floor(s) % 60)}`;

export default function SpecAd({ ad: specAd, flip = false }: { ad: ScriptAd; flip?: boolean }) {
  const SHOTS = specAd.cuts.slice(0, -1).map((t, i) => ({ t, len: +(specAd.cuts[i + 1] - t).toFixed(2) }));
  const AVG = (specAd.dur / SHOTS.length).toFixed(1);
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [t, setT] = useState(0);

  const ensure = useCallback(() => {
    const v = video.current!;
    if (!v.getAttribute("src")) {
      v.src = window.innerWidth < 760 ? specAd.src.sd : specAd.src.hd;
      v.load();
    }
    return v;
  }, [specAd]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const loop = () => {
      setT(video.current?.currentTime ?? 0);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    const el = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && (ensure(), near.disconnect()), { rootMargin: "600px 0px" });
    const vis = new IntersectionObserver(
      ([e]) => {
        const v = video.current;
        if (!v) return;
        if (e.isIntersecting && !userPaused.current && !reduce) ensure().play().catch(() => {});
        if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.4 }
    );
    near.observe(el);
    vis.observe(el);
    return () => {
      near.disconnect();
      vis.disconnect();
    };
  }, [ensure]);

  const seek = (s: number) => {
    const v = ensure();
    v.currentTime = Math.max(0, Math.min(specAd.dur - 0.05, s));
    setT(v.currentTime);
    if (v.paused && !userPaused.current) v.play().catch(() => {});
  };

  const toggle = () => {
    const v = ensure();
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const sound = () => {
    const v = ensure();
    v.muted = !muted;
    setMuted(!muted);
    if (muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  let line = 0;
  specAd.supers.forEach((x, i) => t >= x.t && (line = i));
  let shot = 0;
  SHOTS.forEach((x, i) => t >= x.t && (shot = i));

  return (
    <div className={`spec${flip ? " spec--flip" : ""}`} ref={root} id={`film-${specAd.id}`}>
      <div className="spec__stage rv">
        <figure className="phone phone--final spec__phone">
          <div className="phone__body">
            <video
              ref={video}
              poster={specAd.poster.src}
              muted={muted}
              loop
              playsInline
              preload="none"
              aria-label={`${specAd.title}. ${specAd.note}`}
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onSeeked={(e) => setT(e.currentTarget.currentTime)}
            />
            <span className="phone__island" aria-hidden="true" />
            <button className="phone__sound" onClick={sound} aria-pressed={!muted} aria-label={muted ? "Sound on" : "Sound off"}>
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        </figure>
        <div className="spec__play">
          <button className="tbtn tbtn--play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg viewBox="0 0 16 16"><path d="M3 2h4v12H3zM9 2h4v12H9z" /></svg>
            ) : (
              <svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" /></svg>
            )}
          </button>
          <span className="label">
            {tc(t)} / {tc(specAd.dur)} · 9:16
          </span>
        </div>
      </div>

      <div className="spec__copy rv" style={{ ["--d" as string]: 1 }}>
        <span className="aiad__flag label">
          <span className="dot" aria-hidden="true" /> {specAd.flag}
        </span>
        <h3 className="aiad__title">{specAd.title}</h3>
        <p className="aiad__lead">{specAd.lead}</p>

        <ol className="script" aria-label="The script, line by line">
          {specAd.supers.map((x, i) => (
            <li key={x.line}>
              <button className={`script__line${i === line ? " is-on" : ""}${i < line ? " is-past" : ""}`} onClick={() => seek(x.t + 0.05)}>
                <span className="label">{tc(x.t)}</span>
                <b>{x.line}</b>
              </button>
            </li>
          ))}
        </ol>

        <div className="rhythm">
          <div className="rhythm__head">
            <span className="label">Shot rhythm · {SHOTS.length} shots · average {AVG}s</span>
            <span className="label">
              Shot {p2(shot + 1)} · {SHOTS[shot].len.toFixed(1).replace(".0", "")}s
            </span>
          </div>
          <div className="rhythm__bar" role="group" aria-label="Shots, click to jump">
            {SHOTS.map((x, i) => (
              <button
                key={x.t}
                className={`rhythm__shot${i === shot ? " is-on" : ""}${i < shot ? " is-past" : ""}`}
                style={{ flexGrow: x.len }}
                onClick={() => seek(x.t + 0.05)}
                aria-label={`Shot ${i + 1}, ${x.len} seconds, at ${tc(x.t)}`}
              >
                {i === shot && <i style={{ transform: `scaleX(${Math.min(1, (t - x.t) / x.len)})` }} />}
              </button>
            ))}
          </div>
        </div>

        <p className="aiad__note">{specAd.note}</p>
        <div className="suite__tools">
          {specAd.tools.map((x) => (
            <span className="chip" key={x}>
              {x}
            </span>
          ))}
        </div>
        {specAd.tag && <p className="spec__disc label">{specAd.tag}</p>}
      </div>
    </div>
  );
}
