import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/utils/cn";

const SCROLL_THRESHOLD = 480;
const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Floating back-to-top affordance for long pages. Appears after the reader
 * has scrolled past the hero region; never touches the URL hash (HashRouter
 * contract) — it only calls window.scrollTo. A gold SVG ring fills with
 * reading depth (shared useScrollProgress source), giving a destination cue
 * before the click.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? 0 : -1}
      data-testid="back-to-top"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-shrine-gold-300/40 bg-shrine-maroon-900 text-shrine-cream shadow-shrine transition-[opacity,transform] duration-300 ease-out hover:-translate-y-1 hover:border-shrine-gold-300 hover:text-shrine-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shrine-gold-500",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 44 44"
        aria-hidden="true"
        data-testid="back-to-top-progress"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="22"
          cy="22"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.15"
        />
        <circle
          data-progress=""
          cx="22"
          cy="22"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--color-shrine-gold-300)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" aria-hidden="true" />
    </button>
  );
}
