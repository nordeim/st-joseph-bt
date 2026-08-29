import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Hairline gold rail pinned to the header's bottom edge; fills left-to-right
 * with reading progress. Transform-only (GPU-friendly), decorative
 * (aria-hidden) — the page has no scroll-linked text to announce.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      data-testid="scroll-progress"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-shrine-gold-500 via-shrine-gold-300 to-shrine-gold-500"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
