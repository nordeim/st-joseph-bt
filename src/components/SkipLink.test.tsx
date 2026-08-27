import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkipLink } from "@/components/SkipLink";

/**
 * Regression tests for the HashRouter skip-link contract.
 *
 * Under HashRouter the URL hash IS the route, so a native
 * `<a href="#main-content">` activation would rewrite the hash to
 * `#main-content` and route the user to NotFound. The component must
 * preventDefault and move focus imperatively instead.
 *
 * Layout renders <main id="main-content"> without a static tabIndex;
 * SkipLink sets tabindex="-1" imperatively on click before focusing.
 */
describe("SkipLink", () => {
  it("renders a skip link targeting #main-content", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: /skip to main content/i });
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("activation keeps the current route (does not rewrite the hash)", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SkipLink />
        <main id="main-content">Parish content</main>
      </div>,
    );
    window.location.hash = "#/about";
    await user.click(screen.getByRole("link", { name: /skip to main content/i }));
    expect(window.location.hash).toBe("#/about");
  });

  it("activation moves focus to the main content landmark", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SkipLink />
        <main id="main-content">Parish content</main>
      </div>,
    );
    await user.click(screen.getByRole("link", { name: /skip to main content/i }));
    const main = document.getElementById("main-content");
    expect(main).toHaveFocus();
    // SkipLink imperatively adds tabindex="-1" so the <main> becomes focusable
    expect(main).toHaveAttribute("tabindex", "-1");
  });
});
