import { WORDMARK_HERO, WORDMARK_NAV, MONOGRAM } from "@/lib/logo";

/* The logo is outlined SVG (no font dependency), injected as markup
   so the hero version can animate each glyph on its own. */
export function Wordmark() {
  return <span style={{ display: "block" }} dangerouslySetInnerHTML={{ __html: WORDMARK_NAV }} />;
}

export function HeroWordmark() {
  return <div className="hero__name-svg" dangerouslySetInnerHTML={{ __html: WORDMARK_HERO }} />;
}

export function Monogram() {
  return <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: MONOGRAM }} />;
}
