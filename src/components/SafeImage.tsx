import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface SafeImageProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Priority hint for above-the-fold (LCP) images; omit for below-fold imagery. */
  fetchPriority?: "high" | "low" | "auto";
}

export function SafeImage({
  src,
  fallback = "/images/hero-church.jpg",
  alt,
  className,
  loading = "lazy",
  fetchPriority,
}: SafeImageProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrent(src);
    setLoaded(false);
    if (imgRef.current) {
      delete (imgRef.current.dataset as Record<string, string | undefined>).fallback;
      imgRef.current.removeAttribute("data-fallback");
    }
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [current]);

  return (
    <img
      ref={imgRef}
      src={current}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      className={cn(
        "transition-opacity duration-700",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
      onLoad={() => setLoaded(true)}
      onError={(event) => {
        const target = event.currentTarget;
        if (!target.dataset.fallback) {
          target.dataset.fallback = "1";
          setLoaded(false);
          setCurrent(fallback);
        }
      }}
    />
  );
}
