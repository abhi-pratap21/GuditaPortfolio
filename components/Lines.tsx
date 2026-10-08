import type { ReactNode, ElementType } from "react";

/* Splits a heading into masked lines that slide up when revealed.
   Pass each visual line as a separate child array entry. */
export default function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  delay = 0,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={`lines ${className}`}>
      {lines.map((l, i) => (
        <span className="ln" key={i}>
          <span style={{ ["--d" as string]: i + delay }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
