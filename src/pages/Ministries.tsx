import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images, ministries } from "@/data/content";
import { cn } from "@/utils/cn";

export function Ministries() {
  return (
    <div>
      <PageHero
        eyebrow="Ministries"
        title="One baptism, one faith, one Church"
        description="We gather according to God's call, to render service according to the gifts and talents graced by God."
        image={images.glass}
        fallback={images.glass}
      >
        <nav aria-label="Jump to ministry" className="flex flex-wrap gap-3">
          {ministries.map((ministry) => (
            <Link
              key={ministry.id}
              to={`/ministries#${ministry.id}`}
              className="border border-shrine-cream/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-shrine-cream/90 transition-colors hover:border-shrine-gold-300 hover:text-shrine-gold-300"
            >
              {ministry.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      <div>
        {ministries.map((ministry, index) => (
          <section
            key={ministry.id}
            id={ministry.id}
            className={cn(
              "scroll-mt-28 py-20 sm:py-24",
              index % 2 === 1 ? "bg-shrine-parchment" : "bg-shrine-cream",
            )}
          >
            <Container>
              <Reveal>
                <article
                  className={cn(
                    "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                    index % 2 === 1 && "lg:[&>div:first-child]:order-2",
                  )}
                >
                  <div className="overflow-hidden shadow-shrine">
                    <SafeImage
                      src={ministry.image}
                      fallback={ministry.imageFallback}
                      alt={ministry.imageAlt}
                      className="aspect-[16/11] w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-shrine-gold-600">
                      0{index + 1} / 0{ministries.length}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-shrine-maroon-700 sm:text-4xl">
                      {ministry.title}
                    </h2>
                    <div className="gold-rule-left mt-5 w-24" />
                    <p className="mt-5 leading-relaxed text-shrine-charcoal/80">{ministry.summary}</p>
                    <ul className="mt-6 space-y-2.5">
                      {ministry.details.map((detail) => (
                        <li
                          key={detail}
                          className="border-l-2 border-shrine-gold-500 pl-4 text-sm leading-relaxed text-shrine-charcoal/85"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </Container>
          </section>
        ))}
      </div>

      <section className="bg-shrine-maroon-900 py-20 text-shrine-cream">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl font-display text-2xl font-semibold">
            Ready to take a place at the table of service?
          </p>
          <Button to="/serve" variant="primary">
            Serve with us
          </Button>
        </Container>
      </section>
    </div>
  );
}
