import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";
import { CaseCover, CaseHero, ChapterView, NextProject, Outcome, Story } from "@/components/Case";
import Contact from "@/components/Contact";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const img = p.cardMedia[0];
  return {
    title: `${p.name} case study`,
    description: p.summary,
    openGraph: { title: `${p.name} · Gudita Jain`, description: p.summary, images: [{ url: img.src, width: img.w, height: img.h, alt: img.alt }] },
    twitter: { card: "summary_large_image", images: [img.src] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <main id="main" className={p.light ? "is-light" : undefined} style={{ ["--c" as string]: p.color, ["--t" as string]: p.text }}>
        <CaseHero p={p} index={index} total={projects.length} />
        <CaseCover p={p} />
        <Story p={p} />
        {p.chapters.map((c) => (
          <ChapterView key={c.n + c.title} c={c} group={p.slug} />
        ))}
        <Outcome p={p} />
        <NextProject p={next} />
      </main>
      <Contact />
    </>
  );
}
