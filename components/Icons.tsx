export const ArrowUpRight = ({ className = "arr" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M14 8H3M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ArrowDown = ({ className = "arr" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
