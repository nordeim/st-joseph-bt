import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "@/components/ui/Accordion";

const items = [
  { question: "Q1 What are the Mass times?", answer: "A1 Weekday and weekend Mass times." },
  { question: "Q2 When is confession?", answer: "A2 15 minutes before weekend Masses." },
  { question: "Q3 How do I get there?", answer: "A3 620 Upper Bukit Timah Road." },
];

describe("Accordion", () => {
  it("opens first item by default and toggles single-open on click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const btn1 = screen.getByRole("button", { name: /Q1/ });
    const btn2 = screen.getByRole("button", { name: /Q2/ });
    // first open, second closed
    expect(btn1).toHaveAttribute("aria-expanded", "true");
    expect(btn2).toHaveAttribute("aria-expanded", "false");
    // click second -> swap
    await user.click(btn2);
    expect(btn2).toHaveAttribute("aria-expanded", "true");
    expect(btn1).toHaveAttribute("aria-expanded", "false");
  });

  it("ArrowDown moves focus to next header", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const btn1 = screen.getByRole("button", { name: /Q1/ });
    const btn2 = screen.getByRole("button", { name: /Q2/ });
    btn1.focus();
    expect(btn1).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(btn2).toHaveFocus();
  });

  it("ArrowUp moves focus to previous header (wraps)", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const btn1 = screen.getByRole("button", { name: /Q1/ });
    const btn3 = screen.getByRole("button", { name: /Q3/ });
    btn1.focus();
    await user.keyboard("{ArrowUp}");
    expect(btn3).toHaveFocus();
  });

  it("Home moves focus to first and End to last", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const btn1 = screen.getByRole("button", { name: /Q1/ });
    const btn2 = screen.getByRole("button", { name: /Q2/ });
    const btn3 = screen.getByRole("button", { name: /Q3/ });
    btn2.focus();
    await user.keyboard("{Home}");
    expect(btn1).toHaveFocus();
    await user.keyboard("{End}");
    expect(btn3).toHaveFocus();
  });

  it("open panel is exposed and closed panel is inert for the collapse animation", () => {
    render(<Accordion items={items} />);
    const panels = screen.getAllByRole("region", { hidden: true });
    expect(panels).toHaveLength(3);
    const open = panels[0] as HTMLElement;
    const closed = panels[1] as HTMLElement;
    expect(open).not.toHaveAttribute("aria-hidden");
    expect(open).not.toHaveAttribute("inert");
    expect(closed).toHaveAttribute("aria-hidden", "true");
    expect(closed).toHaveAttribute("inert", "");
  });

  it("collapse animation state follows the open item", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const btn2 = screen.getByRole("button", { name: /Q2/ });
    await user.click(btn2);
    const panels = screen.getAllByRole("region", { hidden: true });
    expect(panels[1]).not.toHaveAttribute("aria-hidden");
    expect(panels[1]).not.toHaveAttribute("inert");
    expect(panels[0]).toHaveAttribute("aria-hidden", "true");
    expect(panels[0]).toHaveAttribute("inert", "");
  });
});
