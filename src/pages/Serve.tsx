import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, serveRoles } from "@/data/content";
import { site } from "@/data/site";

export function Serve() {
  return (
    <div>
      <PageHero
        eyebrow="Serve"
        title="Take a place in the household"
        description="Is God calling you to serve His church? Come and explore the communities you can be part of — at Mass, among the poor, with the young, and in the neighbourhood."
        image={images.hall}
        fallback={images.hall}
        compact
      />

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Ways to serve"
              title="Gifts already given"
              description="Speak to a ministry lead after Mass, or telephone the Parish Office. The Ministry MPSC Fair is a good first door."
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {serveRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 70}>
                <article className="card-lift h-full border border-shrine-stone bg-shrine-parchment p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-shrine-gold-600">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{role.title}</h3>
                  <p className="mt-3 leading-relaxed text-shrine-charcoal/80">{role.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-maroon-900 py-24 text-shrine-cream">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">
              Neighbourhood
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Get to know your Catholic neighbours.
            </h2>
            <p className="mt-5 text-shrine-cream/75">
              Join a Small Catholic Community in your neighbourhood, or register to bring up the
              offertory gifts at a weekend Mass (one week&apos;s notice, first come first served).
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="https://tinyurl.com/SJCBTSCC" variant="primary">
                Small Catholic Community
              </Button>
              <Button href="https://forms.gle/1BCrL6Kp7Cgt9BkdA" variant="outline-light">
                Offertory gifts
              </Button>
            </div>
            <p className="mt-8 text-sm text-shrine-cream/60">
              Parish office {site.contact.officePhone}
            </p>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
