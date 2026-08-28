import { Clock, MapPin, Train } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { devotions, images } from "@/data/content";
import { site } from "@/data/site";

export function Worship() {
  return (
    <div>
      <PageHero
        eyebrow="Worship"
        title="Mass, mercy, and the hours of the house"
        description="Come as you are. Weekday Mass is offered in the Chapel of St Joseph; the Main Church gathers the weekend assembly in Mandarin and English."
        image={images.sanctuary}
        fallback={images.sanctuary}
      >
        <div className="flex flex-wrap gap-4">
          <Button to="/worship#mass" variant="primary">
            Mass times
          </Button>
          <Button href={site.mapsUrl} variant="outline-light">
            Open maps
          </Button>
        </div>
      </PageHero>

      <section id="mass" className="scroll-mt-28 py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="The holy sacrifice"
              title="Mass schedule"
              description="On First Wednesday and First Friday evenings, the 6.30 p.m. chapel Mass gives way to the St Joseph Mass or Holy Hour in the Main Church."
            />
          </Reveal>
          <Reveal delay={80}>
            <dl className="divide-y divide-shrine-stone border-y border-shrine-stone">
              <div className="grid gap-2 px-3 py-5 transition-colors duration-200 hover:bg-shrine-maroon-50/60 sm:grid-cols-[9rem_1fr] sm:px-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                  Weekday morning
                </dt>
                <dd>{site.mass.weekdayMorning}</dd>
              </div>
              <div className="grid gap-2 px-3 py-5 transition-colors duration-200 hover:bg-shrine-maroon-50/60 sm:grid-cols-[9rem_1fr] sm:px-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                  Weekday evening
                </dt>
                <dd>{site.mass.weekdayEvening}</dd>
              </div>
              <div className="grid gap-2 px-3 py-5 transition-colors duration-200 hover:bg-shrine-maroon-50/60 sm:grid-cols-[9rem_1fr] sm:px-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                  Saturday
                </dt>
                <dd>{site.mass.saturday}</dd>
              </div>
              <div className="grid gap-2 px-3 py-5 transition-colors duration-200 hover:bg-shrine-maroon-50/60 sm:grid-cols-[9rem_1fr] sm:px-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                  Sunday
                </dt>
                <dd>
                  <ul className="space-y-1">
                    {site.mass.sunday.map((time) => (
                      <li key={time}>{time}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="grid gap-2 px-3 py-5 transition-colors duration-200 hover:bg-shrine-maroon-50/60 sm:grid-cols-[9rem_1fr] sm:px-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                  2nd collection
                </dt>
                <dd>{site.mass.secondCollection}</dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      <section id="confession" className="scroll-mt-28 bg-shrine-parchment py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Confession & devotion"
              title="Mercy before Mass, prayer through the week"
              align="center"
            />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl border border-shrine-stone bg-shrine-cream p-8 text-center">
            <p className="font-display text-2xl text-shrine-maroon-700">Confession</p>
            <p className="mt-3 leading-relaxed text-shrine-charcoal">{site.mass.confession}</p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-shrine-maroon-600">
              Adoration
            </p>
            <p className="mt-2 text-shrine-charcoal">{site.mass.adoration}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {devotions.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="card-lift h-full border border-shrine-stone bg-shrine-cream p-6">
                  <h3 className="font-display text-lg font-semibold text-shrine-maroon-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-shrine-charcoal">{item.when}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-shrine-maroon-500">
                    {item.where}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="visit" className="scroll-mt-28 py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Find us"
              title="620 Upper Bukit Timah Road"
              description="Gates open daily. For baptism, marriage, Mass intentions, or columbarium enquiries, telephone the Parish Office rather than assuming a walk-in appointment."
            />
            <ul className="mt-8 space-y-4 text-sm text-shrine-charcoal">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-shrine-maroon-600" aria-hidden="true" />
                {site.address.full}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-shrine-maroon-600" aria-hidden="true" />
                Gates {site.hours.gates}
              </li>
              <li className="flex gap-3">
                <Train className="mt-0.5 h-4 w-4 shrink-0 text-shrine-maroon-600" aria-hidden="true" />
                {site.transport.mrt}. Buses {site.transport.buses}.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={site.mapsUrl} variant="secondary">
                Get directions
              </Button>
              <Button to="/faq" variant="ghost">
                Visiting FAQ
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <iframe
              title="Map of St Joseph's Church Bukit Timah"
              src={site.mapsEmbedSrc}
              className="h-[22rem] w-full border-0 shadow-shrine grayscale-[0.15]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
