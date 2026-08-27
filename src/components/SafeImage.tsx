import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface SafeImageProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export function SafeImage({
  src,
  fallback = "/images/hero-church.jpg",
  alt,
  className,
  loading = "lazy",
}: SafeImageProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrent(src);
    setLoaded(false);
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
