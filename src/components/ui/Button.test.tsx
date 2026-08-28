import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Button } from "@/components/ui/Button";

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Button", () => {
  it("renders as Link when to is provided", () => {
    renderWithRouter(<Button to="/about">Go</Button>);
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders as anchor when href is provided", () => {
    render(<Button href="https://example.com">External</Button>);
    const anchor = screen.getByRole("link", { name: "External" });
    expect(anchor).toHaveAttribute("href", "https://example.com");
  });

  it("renders as button when neither to nor href is provided", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    renderWithRouter(<Button to="/">Default</Button>);
    const link = screen.getByRole("link", { name: "Default" });
    expect(link.className).toMatch(/bg-shrine-gold-500/);
  });

  it("applies secondary variant", () => {
    renderWithRouter(<Button to="/" variant="secondary">Sec</Button>);
    expect(screen.getByRole("link", { name: "Sec" }).className).toMatch(/bg-shrine-maroon-600/);
  });

  it("applies ghost variant", () => {
    renderWithRouter(<Button to="/" variant="ghost">Ghost</Button>);
    expect(screen.getByRole("link", { name: "Ghost" }).className).toMatch(/bg-transparent/);
  });

  it("applies outline-light variant", () => {
    renderWithRouter(<Button to="/" variant="outline-light">Outline</Button>);
    expect(screen.getByRole("link", { name: "Outline" }).className).toMatch(/border/);
    expect(screen.getByRole("link", { name: "Outline" }).className).toMatch(/text-shrine-cream/);
  });

  it("renders icon when provided", () => {
    render(<Button icon={<span data-testid="icon">★</span>}>WithIcon</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("gives press feedback via active-state classes", () => {
    renderWithRouter(<Button to="/">Press</Button>);
    const link = screen.getByRole("link", { name: "Press" });
    expect(link.className).toMatch(/active:translate-y-0/);
    expect(link.className).toMatch(/active:scale/);
  });
});
