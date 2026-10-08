"use client";

import { useRef, useState } from "react";
import type { Reel } from "@/lib/content";

/* A video on a case page: shows the poster, plays with sound on the first click,
   then hands over to the browser's own controls. */
export default function CaseVideo({ reel, d = 0 }: { reel: Reel; d?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.src = window.innerWidth < 760 ? reel.src.sd : reel.src.hd;
    v.muted = false;
    setStarted(true);
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  };

  return (
    <figure className="shot cvid rv" style={{ ["--d" as string]: d, ["--ar" as string]: `${reel.ratio[0]} / ${reel.ratio[1]}` }}>
      <div className="cvid__frame">
        <video
          ref={ref}
          poster={reel.poster.src}
          preload="none"
          playsInline
          controls={started}
          aria-label={`${reel.title}. ${reel.note}`}
        />
        {!started && (
          <button className="cvid__play" onClick={start} data-cursor="Play">
            <span className="cvid__btn" aria-hidden="true">
              <svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" /></svg>
            </span>
            <span className="label">
              Play · {Math.round(reel.dur)}s{reel.audio ? " · sound on" : ""}
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <strong>{reel.title}</strong>
        <span>{reel.note}</span>
      </figcaption>
    </figure>
  );
}
