import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/SafeImage";
import { cn } from "@/utils/cn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  fallback?: string;
  children?: ReactNode;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  fallback,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-shrine-maroon-950 text-shrine-cream",
        compact ? "pt-28 pb-16 sm:pt-32 sm:pb-20" : "pt-32 pb-24 sm:pt-40 sm:pb-28",
      )}
    >
      <SafeImage
        src={image}
        fallback={fallback}
        alt=""
        loading="eager"
        className="hero-ken-burns absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-shrine-maroon-950/35 via-shrine-maroon-950/72 to-shrine-maroon-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-shrine-maroon-950/80 to-transparent" />
      <div className="bg-grain pointer-events-none absolute inset-0" />
      <Container className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold text-shrine-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-shrine-cream/75">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
