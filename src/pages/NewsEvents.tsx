import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, upcomingEvents } from "@/data/content";
import { site } from "@/data/site";

export function NewsEvents() {
  return (
    <div>
      <PageHero
        eyebrow="News & Events"
        title="What the parish is keeping this season"
        description="Drawn from the current bulletin. For last-minute changes, watch the parish Facebook page."
        image={images.feast}
        fallback={images.feast}
        compact
      />

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Around the parish"
              title="Gatherings, collections, and devotion"
              description={`Follow ${site.shortName} on Facebook for livestreams and late notices.`}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <Reveal key={event.title} delay={(index % 2) * 80}>
                <article className="card-lift flex h-full flex-col border border-shrine-stone bg-shrine-cream p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="inline-flex items-center border border-shrine-gold-500/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-shrine-gold-600">
                      {event.category}
                    </p>
                    <p className="font-display text-sm font-medium italic text-shrine-gold-600">{event.date}</p>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-shrine-maroon-700">
                    {event.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-shrine-charcoal/80">{event.summary}</p>
                  {event.href ? (
                    <a
                      href={event.href}
                      className="link-underline mt-5 w-fit text-sm font-semibold text-shrine-maroon-600 hover:text-shrine-maroon-500"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Join the WhatsApp community →
                    </a>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
