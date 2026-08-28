import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, ppcMembers, priests } from "@/data/content";
import { site } from "@/data/site";

const pillars = [
  {
    title: "Faith formation",
    body: "Catechesis that begins with the youngest and continues through adult Bible sharing, RCIA, and Sunday preaching.",
  },
  {
    title: "Community-building",
    body: "Neighbourhood Small Catholic Communities, feast-day hospitality, and a Mandarin-and-English household under one roof.",
  },
  {
    title: "Outreach",
    body: "SSVP's Friends in Need, wake prayer, PIETA for bereaved parents, and a parish that still looks outward from the hill.",
  },
];

export function About() {
  return (
    <div>
      <PageHero
        eyebrow="The Parish"
        title="A home under St Joseph's care"
        description={site.tagline}
        image={images.hero}
        fallback={images.heroFallback}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Mission"
              title="Nourish faith. Build community. Go out."
              description={site.vision}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <article className="card-lift h-full border border-shrine-stone bg-shrine-parchment p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-shrine-gold-600">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-shrine-charcoal/80">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-parchment py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Clergy"
              title="Shepherds of the parish"
              description="Call the parish priest or assistant priest's office. For general enquiries, telephone the parish line."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {priests.map((priest, index) => (
              <Reveal key={priest.name} delay={index * 80}>
                <article className="card-lift border border-shrine-stone bg-shrine-cream p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-shrine-maroon-500">
                    {priest.role}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-shrine-maroon-700">
                    {priest.name}
                  </h3>
                  {priest.phone ? (
                    <a
                      href={`tel:${priest.phone.replace(/\D/g, "")}`}
                      className="mt-3 inline-block text-sm text-shrine-charcoal/80 hover:text-shrine-maroon-600"
                    >
                      {priest.phone}
                    </a>
                  ) : (
                    <p className="mt-3 text-sm text-shrine-charcoal/70">Through the Parish Office</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Parish Pastoral Council"
              title="Co-responsibility for the flock"
              description="The Council promotes the participation of all the faithful. It is consultative, governed by norms approved by the Archbishop of Singapore, and works through a Parish Assembly, the Council, and its Executive Committee."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 overflow-x-auto border border-shrine-stone">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">Parish Pastoral Council Executive Committee</caption>
                <thead className="bg-shrine-maroon-900 text-shrine-cream">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Office
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ppcMembers.map((member) => (
                    <tr
                      key={`${member.role}-${member.name}`}
                      className="odd:bg-shrine-cream even:bg-shrine-parchment transition-colors duration-200 hover:bg-shrine-maroon-50"
                    >
                      <th scope="row" className="px-4 py-3 font-medium text-shrine-maroon-700">
                        {member.role}
                      </th>
                      <td className="px-4 py-3 text-shrine-charcoal/85">{member.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-shrine-charcoal/70">
              The Ex-Co meets monthly. Parishioners serve two-year terms, not more than two
              consecutive. The Parish Priest is president.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/ministries" variant="secondary">
              Explore ministries
            </Button>
            <Button to="/serve" variant="ghost">
              Offer your gifts
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
