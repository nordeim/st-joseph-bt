import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, images } from "@/data/content";

export function FAQ() {
  return (
    <div>
      <PageHero
        eyebrow="Questions"
        title="Before you come"
        description="Hours, Mass, confession, feast day, and the cemetery — answered plainly. Telephone the Parish Office for anything the page cannot settle."
        image={images.garden}
        fallback={images.garden}
        compact
      />

      <section className="py-24 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="What pilgrims usually ask"
              description="Six questions. If yours is not here, the priests' offices are listed on the About page."
            />
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
