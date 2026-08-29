import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ScrollProgress } from "@/components/ScrollProgress";

/**
 * Round-2 contract: a GPU-friendly (transform-only) gold rail that mirrors
 * reading progress; invisible to assistive tech; scaleX(0) at rest.
 */
function setScrollMetrics(scrollY: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
}

describe("ScrollProgress", () => {
  it("renders hidden from assistive tech, collapsed at the top", () => {
    setScrollMetrics(0, 0, 0);
    render(<ScrollProgress />);
    const rail = screen.getByTestId("scroll-progress");
    expect(rail).toHaveAttribute("aria-hidden", "true");
    expect(rail.style.transform).toBe("scaleX(0)");
  });

  it("advances scaleX with scroll depth", async () => {
    setScrollMetrics(0, 2000, 800);
    render(<ScrollProgress />);
    const rail = screen.getByTestId("scroll-progress");
    await waitFor(() => expect(rail.style.transform).toBe("scaleX(0)"));
    setScrollMetrics(600, 2000, 800);
    fireEvent.scroll(window);
    await waitFor(() => expect(rail.style.transform).toBe("scaleX(0.5)"));
  });
});
