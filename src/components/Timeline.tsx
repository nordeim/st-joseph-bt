import { lifeTimeline, type TimelineEntry } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

interface TimelineProps {
  entries?: TimelineEntry[];
}

export function Timeline({ entries = lifeTimeline }: TimelineProps) {
  return (
    <ol className="relative border-l border-shrine-stone ml-2 sm:ml-4">
      {entries.map((entry, index) => (
        <Reveal as="li" key={`${entry.year}-${entry.title}`} delay={index * 70} className="relative pb-12 last:pb-0 pl-8 sm:pl-12">
          <span
            className={cn(
              "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-shrine-gold-500 ring-4 ring-shrine-cream",
            )}
            aria-hidden="true"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shrine-maroon-500">
            {entry.year}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-shrine-maroon-700 sm:text-2xl">
            {entry.title}
          </h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-shrine-charcoal/80">{entry.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
