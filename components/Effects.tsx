"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { setLenis } from "./lenis";

/* Site-wide behaviour: smooth scroll, intro trigger, scroll reveals. */
export default function Effects() {
  const path = usePathname();

  // smooth scroll (skipped for reduced motion and touch, where native feels right)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;
    const l = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
    setLenis(l);
    let raf = 0;
    const loop = (t: number) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // intro: wait for fonts so the hero animates with the real type
  useEffect(() => {
    const root = document.documentElement;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      requestAnimationFrame(() => root.classList.add("is-loaded"));
    };
    document.fonts?.ready.then(go);
    const t = window.setTimeout(go, 900);
    return () => window.clearTimeout(t);
  }, []);

  // reveal on scroll, re-armed on every route.
  // Clipped elements (.rv-img) never report as intersecting, so their parent is watched instead.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".rv, .rv-img, .lines");
    const targets = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          targets.get(e.target)?.forEach((t) => t.classList.add("in"));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    els.forEach((el) => {
      if (el.classList.contains("in")) return;
      const watch = el.classList.contains("rv-img") && el.parentElement ? el.parentElement : el;
      const list = targets.get(watch);
      if (list) list.push(el);
      else {
        targets.set(watch, [el]);
        io.observe(watch);
      }
    });
    return () => io.disconnect();
  }, [path]);

  return null;
}
