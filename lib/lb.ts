/* Spread onto a button to register it with the site lightbox. */
export const lbProps = (
  group: string,
  img: { src: string; w: number; h: number; alt: string },
  title = "",
  caption = ""
) => ({
  "data-lb": group,
  "data-src": img.src,
  "data-w": img.w,
  "data-h": img.h,
  "data-alt": img.alt,
  "data-title": title,
  "data-caption": caption,
});
