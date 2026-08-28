import { Clock, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SafeImage } from "@/components/SafeImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { grounds, images, upcomingEvents } from "@/data/content";
import { site } from "@/data/site";

const facts = [
  {
    icon: Clock,
    label: "Sunday Mass",
    value: "7.30 · 9.30 · 11.30 · 5.30",
  },
  {
    icon: MapPin,
    label: "Find us",
    value: "Cashew MRT · Upper Bukit Timah",
  },
  {
    icon: Sparkles,
    label: "Feast day",
    value: `${site.feast.name} · ${site.feast.date}`,
  },
  {
    icon: HeartHandshake,
    label: "Confession",
    value: "15 minutes before weekend Mass",
  },
];

export function Home() {
  return (
    <div>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-shrine-maroon-950 text-shrine-cream">
        <SafeImage
          src={images.hero}
          fallback={images.heroFallback}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="hero-ken-burns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shrine-maroon-950 via-shrine-maroon-950/55 to-shrine-maroon-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-shrine-maroon-950/70 via-shrine-maroon-950/20 to-transparent" />
        <div className="bg-grain pointer-events-none absolute inset-0" />

        <Container className="relative z-10 w-full pb-28 pt-36 sm:pb-32 sm:pt-44">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-shrine-gold-300">
            Saint Joseph&apos;s Church · Bukit Timah · {site.chineseName}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold text-shrine-cream sm:text-6xl lg:text-7xl">
            A church on the hill since 1846.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-shrine-cream/80">
            Singapore&apos;s second-oldest Catholic parish still gathers plantation-country
            families and city neighbours under the patronage of St Joseph the Worker.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/worship" variant="primary">
              Mass times
            </Button>
            <Button to="/worship#visit" variant="outline-light">
              Plan a visit
            </Button>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-16 mb-8">
        <Container>
          <div className="grid gap-px overflow-hidden border border-shrine-stone bg-shrine-stone shadow-shrine sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-shrine-cream px-5 py-6">
                <fact.icon className="h-5 w-5 text-shrine-maroon-600" aria-hidden="true" />
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-shrine-maroon-500">
                  {fact.label}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-shrine-maroon-700">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <SafeImage
                src={images.chapel}
                fallback={images.chapel}
                alt="Candlelit chapel of Saint Joseph"
                className="aspect-[4/5] w-full object-cover shadow-shrine-lg"
              />
              <div className="absolute -bottom-6 -right-4 hidden max-w-xs border border-shrine-stone bg-shrine-parchment p-6 shadow-shrine sm:block">
                <p className="font-display text-xl italic text-shrine-maroon-700">
                  “{site.vision}”
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Welcome"
              title="The carpenter's house, still open."
              description={site.tagline}
            />
            <div className="mt-8 space-y-5 leading-relaxed text-shrine-charcoal/85">
              <p>
                Every pilgrim who walks through these doors meets the same story: a French
                missionary who learned Chinese, an attap chapel by the Kranji, and plantation
                labourers who asked St Joseph — worker, husband, guardian — to keep them.
              </p>
              <p>
                The hill has seen tigers and rubber, a priest who sold milk to rebuild the
                church, and generations who still come for dawn Mass in the chapel and feast-day
                food stalls in May. You are not a visitor here. You are expected.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about" variant="secondary">
                Meet the parish
              </Button>
              <Button to="/history" variant="ghost">
                Read our history
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-shrine-parchment py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="On the grounds"
              title="Three places to begin"
              description="The Main Church, the Chapel of St Joseph, and the Rosary Garden — a Sunday, a weekday, a quiet walk."
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {grounds.map((place, index) => (
              <Reveal key={place.id} delay={index * 90}>
                <Link
                  to={`/worship#${place.id === "main-church" ? "mass" : place.id === "chapel" ? "confession" : "visit"}`}
                  className="group flex h-full flex-col bg-shrine-cream shadow-shrine transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <SafeImage
                      src={place.image}
                      fallback={place.imageFallback}
                      alt={place.imageAlt}
                      className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-shrine-gold-600">
                      0{index + 1} / 03
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-shrine-maroon-700">
                      {place.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-shrine-charcoal/80">
                      {place.summary}
                    </p>
                    <span className="mt-5 text-xs font-semibold uppercase tracking-wide text-shrine-maroon-600">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="This season"
              title="News & gatherings"
              description="Parish life, devotion, and the wider Church — drawn from the current bulletin."
            />
            <Button to="/news-events" variant="ghost">
              All events
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcomingEvents.slice(0, 4).map((event, index) => (
              <Reveal key={event.title} delay={index * 70}>
                <article className="flex h-full flex-col border border-shrine-stone bg-shrine-cream p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-shrine-terracotta-500">
                    {event.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-shrine-maroon-700">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-shrine-gold-600">{event.date}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-shrine-charcoal/80">
                    {event.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-900 py-24 text-shrine-cream sm:py-28">
        <div className="bg-adobe-texture absolute inset-0" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">
              Belong here
            </p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-semibold sm:text-4xl">
              Serve at the altar, sit with the poor, or simply come to Mass.
            </h2>
            <p className="mt-5 max-w-lg text-shrine-cream/75">
              The parish is built by people who stay. Find a ministry, support the maintenance
              fund, or bring the offertory gifts next weekend.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-4 lg:justify-end">
            <Button to="/serve" variant="primary">
              Serve with us
            </Button>
            <Button to="/give" variant="outline-light">
              Give
            </Button>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
