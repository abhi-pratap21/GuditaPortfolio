"use client";

import { useState } from "react";
import { person } from "@/lib/content";
import { ArrowUpRight } from "./Icons";
import Clock from "./Clock";
import { lenis } from "./lenis";

export default function Contact() {
  const [toast, setToast] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setToast(true);
      window.setTimeout(() => setToast(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const top = (e: React.MouseEvent) => {
    e.preventDefault();
    const l = lenis();
    if (l) l.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <span className="label">(07) Contact</span>
        <h2 className="contact__head lines" style={{ marginTop: 22 }}>
          <span className="ln"><span>Got a brief?</span></span>
          <span className="ln"><span style={{ ["--d" as string]: 1 }}>Let’s make it <em className="it">land.</em></span></span>
        </h2>

        <div className="contact__grid">
          <div className="mail rv">
            <span className="label">Write to me</span>
            <p style={{ marginTop: 14 }}>
              <a className="link-u" href={`mailto:${person.email}`}>{person.email}</a>
            </p>
            <div className="mail__row">
              <button className="btn btn--solid" onClick={copy}>Copy email</button>
              <a className="btn" href={person.cv} target="_blank" rel="noopener">
                Download CV <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="reach rv" style={{ ["--d" as string]: 1 }}>
            <a href={person.phoneHref}>
              <span>{person.phone}</span>
              <span>Call</span>
            </a>
            <a href={person.behance} target="_blank" rel="noopener noreferrer">
              <span>Behance</span>
              <span>guditajain04 ↗</span>
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <span>guditajain ↗</span>
            </a>
            <div>
              <span>{person.city}</span>
              <span>
                <Clock /> IST
              </span>
            </div>
          </div>
        </div>

        <div className="foot">
          <span className="label">© {new Date().getFullYear()} Gudita Jain</span>
          <span className="label">Set in Archivo, Fraunces &amp; JetBrains Mono</span>
          <span className="label">
            <a href="#top" onClick={top}>Back to top ↑</a>
          </span>
        </div>
      </div>
      <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
        {toast ? "Email copied" : ""}
      </div>
    </footer>
  );
}
