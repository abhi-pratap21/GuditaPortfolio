import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, person } from "@/lib/content";
import Nav from "@/components/Nav";
import Effects from "@/components/Effects";
import Lightbox from "@/components/Lightbox";
import Cursor from "@/components/Cursor";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["italic"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jbmono", display: "swap" });

const description =
  "Gudita Jain is a graphic designer and video editor based in Noida, India. Brand identities, social campaigns, print, packaging and motion for Amrut.AI, Catfé, SkinVibes and Arihant Public School.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${person.name} · Graphic Designer & Video Editor`, template: `%s · ${person.name}` },
  description,
  authors: [{ name: person.name }],
  keywords: ["Gudita Jain", "graphic designer", "video editor", "brand identity", "social media design", "AI video editor", "motion design", "Noida", "portfolio"],
  openGraph: {
    type: "website",
    title: `${person.name} · Graphic Designer & Video Editor`,
    description,
    siteName: person.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `${person.name} · Graphic Designer & Video Editor`, description },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE8",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "Graphic Designer & Video Editor",
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  sameAs: [person.behance, person.linkedin],
  worksFor: { "@type": "Organization", name: "Amrut.AI" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${fraunces.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`.rv,.rv-img,.ln>span,.hero-wm .gl,.hero-wm .tt,.hero__stack .card{opacity:1!important;transform:none!important;clip-path:none!important;translate:none!important}.rv-img img{transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        {children}
        <Lightbox />
        <Cursor />
        <Effects />
      </body>
    </html>
  );
}
