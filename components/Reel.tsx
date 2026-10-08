import { reel } from "@/lib/content";

/* An endless strip of pieces. The list is rendered twice so the loop is seamless. */
export default function Reel() {
  const row = (dup: boolean) =>
    reel.map((r, i) => (
      <figure key={`${dup ? "b" : "a"}${i}`} aria-hidden={dup || undefined}>
        <img src={r.img.src} width={r.img.w} height={r.img.h} alt={dup ? "" : r.img.alt} loading="lazy" decoding="async" />
        <figcaption>
          {String(i + 1).padStart(3, "0")} · {r.tag}
        </figcaption>
      </figure>
    ));
  return (
    <section className="reel" aria-label="A strip of recent pieces">
      <div className="reel__track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
