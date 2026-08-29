import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Serve } from "@/pages/Serve";
import { Give } from "@/pages/Give";

/**
 * Round-2 contract: headings inside dark maroon-900 CTA bands must carry an
 * explicit light color class. Without it they inherit the global
 * `h1-h4 → text-shrine-maroon-700` base rule and render at ~1.26:1 on
 * maroon-900 — an WCAG-failing "invisible heading" (verified live 2026-08-29).
 */
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("dark CTA band headings carry explicit cream color", () => {
  it("Home 'Belong here' band h2 is cream", () => {
    renderWithRouter(<Home />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /serve at the altar, sit with the poor/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
  });

  it("Serve neighbourhood band h2 is cream", () => {
    renderWithRouter(<Serve />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /get to know your catholic neighbours/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
  });

  it("Give closing band h2 is cream", () => {
    renderWithRouter(<Give />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /a gift of any size keeps a lamp burning/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
  });
});
