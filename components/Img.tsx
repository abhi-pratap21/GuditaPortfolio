import type { Img as ImgT } from "@/lib/content";

type Props = { img: ImgT; className?: string; eager?: boolean; sizes?: string };

/* Plain <img> with intrinsic size so the layout never jumps while images load. */
export default function Img({ img, className, eager }: Props) {
  return (
    <img
      src={img.src}
      width={img.w}
      height={img.h}
      alt={img.alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
