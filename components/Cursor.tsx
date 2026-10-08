"use client";

import { useEffect, useRef, useState } from "react";

/* A label that follows the pointer over anything with data-cursor="…". */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    let x = -200, y = -200, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as Element)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (t) {
        setLabel(t.dataset.cursor || "");
        el.classList.add("on");
      } else el.classList.remove("on");
    };
    const leave = () => el.classList.remove("on");
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
