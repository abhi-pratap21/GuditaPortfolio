import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain website to /out
// that can be hosted on Vercel, Netlify, GitHub Pages or any web host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
