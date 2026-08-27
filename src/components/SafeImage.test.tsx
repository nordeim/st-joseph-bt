import { act } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SafeImage } from "@/components/SafeImage";

describe("SafeImage", () => {
  it("renders with lazy loading by default", () => {
    render(<SafeImage src="https://example.com/a.jpg" alt="test alt" />);
    const img = screen.getByAltText("test alt") as HTMLImageElement;
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img.getAttribute("src")).toContain("example.com");
  });

  it("starts hidden (opacity-0) and fades in on load", async () => {
    const { container } = render(<SafeImage src="https://example.com/b.jpg" alt="fade test" />);
    const img = container.querySelector("img") as HTMLImageElement;
    expect(img.className).toContain("opacity-0");
    await act(async () => {
      img.dispatchEvent(new Event("load"));
    });
    expect(img.className).toContain("opacity-100");
  });

  it("falls back to default local image on error", async () => {
    const { container } = render(<SafeImage src="https://example.com/broken.jpg" alt="default fallback test" />);
    const img = container.querySelector("img") as HTMLImageElement;
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });
    expect(img.getAttribute("src")).toBe("/images/hero-church.jpg");
  });

  it("falls back to custom fallback when provided", async () => {
    const { container } = render(
      <SafeImage src="https://example.com/broken.jpg" fallback="/images/chapel-interior.jpg" alt="custom fallback test" />,
    );
    const img = container.querySelector("img") as HTMLImageElement;
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });
    expect(img.getAttribute("src")).toBe("/images/chapel-interior.jpg");
  });

  it("guards fallback to once via dataset (second error does not swap again)", async () => {
    const { container } = render(<SafeImage src="https://example.com/broken.jpg" alt="guard test" />);
    const img = container.querySelector("img") as HTMLImageElement;
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });
    expect(img.getAttribute("src")).toBe("/images/hero-church.jpg");
    expect(img.dataset.fallback).toBe("1");
    // second error should be ignored
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });
    expect(img.getAttribute("src")).toBe("/images/hero-church.jpg");
  });
});
