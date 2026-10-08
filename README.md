# Gudita Jain — Portfolio

Next.js 16 + React 19, exported as a static site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, live reload
npm run build      # writes the finished site to /out
```

## Edit content

Every text, link, image and project lives in `lib/content.ts`.

- **Portrait:** save a photo as `public/img/gudita.jpg` (4:5, at least 1200 × 1500), then set `portrait: "/img/gudita.jpg"` in `lib/content.ts`.
- **CV:** replace `public/cv/Gudita-Jain-CV.pdf`.
- **New images:** add `.webp` files under `public/img/` and reference them in `lib/content.ts`.

## Motion videos

The Motion section and the Amrut case read from `reels` in `lib/content.ts`. Each video needs:
a full-size MP4 and a phone-size MP4 in `public/video/`, a poster and timeline thumbnails in `public/img/reels/`.

## Logo files

`public/brand/` contains the wordmark, the monogram, and the avatar/favicon as SVG. They are outlined vectors, so they open in Illustrator or Figma with no font needed.

## Deploy

Push this folder to GitHub and import it in Vercel. Or run `npx vercel` from this folder.
Optionally set `NEXT_PUBLIC_SITE_URL` to the final domain for social-share previews.
