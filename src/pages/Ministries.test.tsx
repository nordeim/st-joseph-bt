import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Ministries } from "@/pages/Ministries";

function renderMinistries(initialEntry = "/ministries") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Ministries />
    </MemoryRouter>,
  );
}

describe("Ministries jump nav", () => {
  it("renders 6 jump pills", () => {
    renderMinistries();
    const nav = screen.getByRole("navigation", { name: /Jump to ministry/i });
    expect(nav.querySelectorAll("a")).toHaveLength(6);
  });

  it("marks the pill matching the location hash with aria-current", () => {
    renderMinistries("/ministries#liturgical");
    const nav = screen.getByRole("navigation", { name: /Jump to ministry/i });
    const liturgical = nav.querySelectorAll("a")[0] as HTMLAnchorElement;
    const formation = nav.querySelectorAll("a")[1] as HTMLAnchorElement;
    expect(liturgical).toHaveAttribute("aria-current", "true");
    expect(formation).not.toHaveAttribute("aria-current");
  });

  it("pills have no aria-current when no hash is set", () => {
    renderMinistries();
    const nav = screen.getByRole("navigation", { name: /Jump to ministry/i });
    for (const pill of Array.from(nav.querySelectorAll("a"))) {
      expect(pill).not.toHaveAttribute("aria-current");
    }
  });
});
