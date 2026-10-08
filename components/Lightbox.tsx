"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./Icons";
import { lenis } from "./lenis";

type Item = { src: string; w: number; h: number; alt: string; title: string; caption: string };

/* Any element with data-lb="group" opens here. Prev/next walk the visible
   members of that group in DOM order, so filters on the page are respected. */
export default function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as Element).closest<HTMLElement>("[data-lb]");
      if (!t) return;
      e.preventDefault();
      const group = t.dataset.lb!;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(`[data-lb="${group}"]`)).filter(
        (n) => n.offsetParent !== null
      );
      const list = nodes.map((n) => ({
        src: n.dataset.src!,
        w: Number(n.dataset.w),
        h: Number(n.dataset.h),
        alt: n.dataset.alt || "",
        title: n.dataset.title || "",
        caption: n.dataset.caption || "",
      }));
      opener.current = t;
      setItems(list);
      setI(Math.max(0, nodes.indexOf(t)));
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus({ preventScroll: true });
  }, []);
  const step = useCallback((d: number) => setI((v) => (v + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    lenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis()?.start();
    };
  }, [open, close, step]);

  // swipe on touch
  const sx = useRef(0);
  const cur = items[i];

  return (
    <div
      className={`lb${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - sx.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="lb__top">
        <span className="label">
          {items.length ? `${String(i + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}` : ""}
        </span>
        <button className="lb__close" ref={closeRef} onClick={close}>
          Close · Esc
        </button>
      </div>
      <div className="lb__stage" onClick={(e) => e.target === e.currentTarget && close()}>
        {cur && <img key={cur.src} src={cur.src} width={cur.w} height={cur.h} alt={cur.alt} />}
        {items.length > 1 && (
          <>
            <button className="lb__nav lb__prev" onClick={() => step(-1)} aria-label="Previous image">
              <ArrowLeft />
            </button>
            <button className="lb__nav lb__next" onClick={() => step(1)} aria-label="Next image">
              <ArrowRight />
            </button>
          </>
        )}
      </div>
      <div className="lb__cap">
        <div>
          {cur?.title && <strong>{cur.title}</strong>}
          {cur?.caption && <p>{cur.caption}</p>}
        </div>
      </div>
    </div>
  );
}
