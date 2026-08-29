import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackToTop } from "@/components/BackToTop";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
  fireEvent.scroll(window);
}

function setScrollMetrics(scrollY: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
}

describe("BackToTop", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    window.localStorage.clear();
  });

  it("is hidden from the accessibility tree before the scroll threshold", () => {
    render(<BackToTop />);
    const button = screen.getByTestId("back-to-top");
    expect(button).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
  });

  it("becomes visible after scrolling past the threshold", () => {
    render(<BackToTop />);
    setScrollY(600);
    const button = screen.getByRole("button", { name: /back to top/i });
    expect(button).not.toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("hides again when scrolled back near the top", () => {
    render(<BackToTop />);
    setScrollY(600);
    setScrollY(100);
    const button = screen.getByTestId("back-to-top");
    expect(button).toHaveAttribute("aria-hidden", "true");
  });

  it("click scrolls smoothly to the top", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.spyOn(window, "scrollTo").mockImplementation(scrollTo as never);
    render(<BackToTop />);
    setScrollY(900);
    await user.click(screen.getByRole("button", { name: /back to top/i }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("reduced motion switches the scroll behavior to auto", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.spyOn(window, "scrollTo").mockImplementation(scrollTo as never);
    const media = vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);
    render(<BackToTop />);
    setScrollY(900);
    await user.click(screen.getByRole("button", { name: /back to top/i }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    media.mockRestore();
  });

  it("carries a scroll progress ring that fills with page depth", async () => {
    setScrollMetrics(0, 2000, 800);
    render(<BackToTop />);
    const ring = screen.getByTestId("back-to-top-progress");
    expect(ring).toHaveAttribute("aria-hidden", "true");
    const indicator = ring.querySelector("circle[data-progress]") as SVGCircleElement | null;
    expect(indicator).not.toBeNull();
    const circumference = Number(indicator!.getAttribute("stroke-dasharray"));
    expect(circumference).toBeCloseTo(2 * Math.PI * 20, 1);
    // At the top the ring is empty: dashoffset equals the full circumference.
    await waitFor(() =>
      expect(Number(indicator!.getAttribute("stroke-dashoffset"))).toBeCloseTo(circumference, 1),
    );
    // Mid-document (600 of 1200 scrollable) the ring is half full.
    setScrollMetrics(600, 2000, 800);
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(Number(indicator!.getAttribute("stroke-dashoffset"))).toBeCloseTo(
        circumference / 2,
        1,
      ),
    );
  });
});
