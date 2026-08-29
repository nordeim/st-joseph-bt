import type { ComponentType } from "react";
import {
  BookOpen,
  Church,
  Flame,
  Globe,
  HandHeart,
  Heart,
  Landmark,
  Sprout,
  type LucideProps,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { givingOptions, images, type GivingOption } from "@/data/content";
import { site } from "@/data/site";

const iconMap: Record<GivingOption["icon"], ComponentType<LucideProps>> = {
  flame: Flame,
  church: Church,
  sprout: Sprout,
  heart: Heart,
  book: BookOpen,
  "hand-heart": HandHeart,
  landmark: Landmark,
  globe: Globe,
};

export function Give() {
  return (
    <div>
      <PageHero
        eyebrow="Support the parish"
        title="Give"
        description="Every gift — PayNow, envelope, or a coin in the Cry Room — keeps the hill open for the next person who walks through the doors."
        image={images.chapel}
        fallback={images.chapel}
        compact
      />

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where your gift goes"
              title="Eight ways to support the mission"
              description={`PayNow UEN ${site.uen}. Cheques payable to ${site.chequePayee}.`}
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {givingOptions.map((option, index) => {
              const Icon = iconMap[option.icon];
              return (
                <Reveal key={option.name} delay={(index % 4) * 90}>
                  <div className="card-lift group flex h-full flex-col border border-shrine-stone bg-shrine-cream p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-shrine-maroon-50 text-shrine-maroon-600 ring-1 ring-shrine-stone transition-colors duration-300 group-hover:text-shrine-gold-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-shrine-maroon-700">
                      {option.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-shrine-charcoal">
                      {option.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-900 py-24 text-shrine-cream sm:py-28">
        <div className="bg-adobe-texture absolute inset-0" />
        <Container className="relative text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">
              Ready to give?
            </p>
            <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-semibold text-shrine-cream sm:text-4xl">
              A gift of any size keeps a lamp burning on the hill.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-shrine-cream/75">
              Use PayNow to UEN <span className="font-semibold text-shrine-gold-300">{site.uen}</span>
              , or give in person at the next Mass you attend.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="https://www.catholicfoundation.sg/give-20201016/the-gift-call/" variant="primary">
                GIFT — Catholic Foundation
              </Button>
              <Button to="/worship#visit" variant="outline-light">
                Visit in person
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
