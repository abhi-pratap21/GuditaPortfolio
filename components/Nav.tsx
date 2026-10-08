"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { getProject, person } from "@/lib/content";
import { lenis } from "./lenis";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "motion", label: "Motion" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const home = path === "/";
  const caseSlug = path.match(/^\/work\/([^/]+)/)?.[1];
  const onDark = !!caseSlug && !getProject(caseSlug)?.light;
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const el = ref.current;
      if (!el) return;
      el.classList.toggle("is-scrolled", y > 40);
      if (Math.abs(y - last) > 6) {
        el.classList.toggle("is-hidden", y > last && y > 420);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) lenis()?.stop();
    else lenis()?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [path]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (!home) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const l = lenis();
    if (l) l.scrollTo(target, { offset: id === "work" ? -40 : 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <header className={`nav${onDark ? " on-dark" : ""}`} ref={ref}>
        <div className="wrap nav__in">
          <Link className="nav__logo" href="/" aria-label="Gudita Jain, home">
            <Wordmark />
          </Link>
          <p className="nav__role label">{person.role}</p>
          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.id} href={href(l.id)} onClick={go(l.id)}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="status" href={href("contact")} onClick={go("contact")}>
            <span className="dot" aria-hidden="true" />
            {person.status}
          </a>
          <button
            className="nav__menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className={`menu${open ? " is-open" : ""}`} id="menu" aria-hidden={!open} inert={!open}>
        <ol>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={href(l.id)} onClick={go(l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="menu__foot">
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <span>
            <a href={person.behance} target="_blank" rel="noopener noreferrer">Behance</a> ·{" "}
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
          <span>{person.city}</span>
        </div>
      </div>
    </>
  );
}
