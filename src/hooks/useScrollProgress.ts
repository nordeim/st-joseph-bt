import { useEffect, useState } from "react";

/**
 * Reading progress as 0..1 (scrollY / (scrollHeight - innerHeight)).
 * rAF-throttled; guarded against unscrollable documents (max <= 0 → 0);
 * clamped so overscroll cannot exceed 1. Shared by the header progress rail
 * and the BackToTop ring so the two indicators can never disagree.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return progress;
}
