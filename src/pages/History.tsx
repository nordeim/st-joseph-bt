import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { SafeImage } from "@/components/SafeImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/data/content";

export function History() {
  return (
    <div>
      <PageHero
        eyebrow="Our History"
        title="From an attap chapel to a church on the hill"
        description="Singapore's second-oldest Catholic parish — and the last remaining Catholic church cemetery in the country — began as a Chinese mission among pepper and gambier planters."
        image={images.cemetery}
        fallback={images.heroFallback}
      />

      <section className="py-24 sm:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="1845–today"
              title="A Chinese Catholic home"
              description="The evangelisation of the MEP missionaries formed the Catholic Church in Singapore. St Joseph's Bukit Timah became the first Chinese Catholic parish on the island. Its feast on 1 May honours St Joseph the Worker — a poignant link, for the first parishioners were labourers of the plantations."
            />
            <SafeImage
              src={images.heroFallback}
              fallback={images.heroFallback}
              alt="Cream church facade among tropical trees at golden hour"
              className="mt-10 aspect-[4/5] w-full object-cover shadow-shrine"
            />
          </Reveal>
          <Timeline />
        </Container>
      </section>

      <section className="bg-shrine-parchment py-24 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SafeImage
              src={images.garden}
              fallback={images.garden}
              alt="Garden path on the church grounds"
              className="aspect-[16/11] w-full object-cover shadow-shrine"
            />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Still a pilgrimage"
              title="Stations, a rosary walk, a cemetery"
              description="In 1991 life-sized Stations of the Cross were set around the boundary; in Lent, Catholics still retrace the road to Calvary here. The Rosary Garden, blessed in 2017, holds Fr Mauduit's headstone. The cemetery remains the last of its kind at a Catholic church in Singapore."
            />
            <p className="mt-6 leading-relaxed text-shrine-charcoal">
              Architecture on the rebuilt church — blessed in 1964, consecrated on the feast in
              2012 — carries both Gothic-Romanesque lines and the parish's Chinese heritage. The
              feast-day fair Fr Joachim Teng began in the 1950s is still how the hill keeps
              open house.
            </p>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
