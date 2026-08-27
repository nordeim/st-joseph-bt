import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-shrine-maroon-950 text-shrine-cream">
      <Container className="py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-shrine-gold-300">404</p>
        <h1 className="mt-5 font-display text-4xl font-semibold text-shrine-cream sm:text-5xl">
          This path does not lead to the church.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-shrine-cream/75">
          The page you asked for is not here. Begin again at the doors, or check the Mass times.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/" variant="primary">
            Return home
          </Button>
          <Button to="/worship" variant="outline-light">
            Mass times
          </Button>
        </div>
      </Container>
    </section>
  );
}
