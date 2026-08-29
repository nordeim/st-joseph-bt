import { describe, expect, it } from "vitest";
import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Round-2 contract: useScrollProgress maps scroll depth to 0..1, guarded
 * against unscrollable documents (jsdom reports scrollHeight 0), rAF-throttled.
 */
function setScrollMetrics(scrollY: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
}

describe("useScrollProgress", () => {
  it("returns 0 on an unscrollable document (max <= 0 guard)", () => {
    setScrollMetrics(0, 0, 0);
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it("returns 0 while at the top of a scrollable document", async () => {
    setScrollMetrics(0, 2000, 800);
    const { result } = renderHook(() => useScrollProgress());
    await waitFor(() => expect(result.current).toBe(0));
  });

  it("maps midpoint scroll to ~0.5", async () => {
    setScrollMetrics(0, 2000, 800);
    const { result } = renderHook(() => useScrollProgress());
    await waitFor(() => expect(result.current).toBe(0));
    setScrollMetrics(600, 2000, 800);
    fireEvent.scroll(window);
    await waitFor(() => expect(result.current).toBeCloseTo(0.5, 5));
  });

  it("clamps to 1 at or beyond the bottom", async () => {
    setScrollMetrics(0, 2000, 800);
    const { result } = renderHook(() => useScrollProgress());
    await waitFor(() => expect(result.current).toBe(0));
    setScrollMetrics(9999, 2000, 800);
    fireEvent.scroll(window);
    await waitFor(() => expect(result.current).toBe(1));
  });
});
