import { expect, test } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-2 "Sacred Polish" E2E audit — validates the remediated codebase:
 *   1. Dark CTA-band headings render cream (WCAG: was maroon-700 ~1.26:1).
 *   2. Head completeness: favicon, theme-color, OG image/url, Twitter card, JSON-LD.
 *   3. Route transitions: keyed page-in wrapper replays on pathname change.
 *   4. Scroll progress rail + BackToTop ring track page depth.
 *   5. Mobile drawer marks the active route (parity with desktop nav).
 */

test.describe("Round-2 enhancement audit", () => {
  test("dark CTA-band headings are cream on Home, Serve, and Give", async ({ page }) => {
    for (const route of ["/", "/serve", "/give"]) {
      await gotoHash(page, route);
      const h2 = page.locator('main section[class*="bg-shrine-maroon-900"] h2').first();
      await expect(h2).toBeVisible();
      // shrine-cream #faf6ec — was maroon-700 #55191a (1.26:1 on maroon-900).
      await expect(h2).toHaveCSS("color", "rgb(250, 246, 236)");
    }
  });

  test("head ships favicon, theme-color, social images, and Church JSON-LD", async ({ page }) => {
    await gotoHash(page, "/");
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
      "href",
      "/favicon.svg",
    );
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#200a0a",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://st-joseph.jesspete.shop/images/hero-church.jpg",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://st-joseph.jesspete.shop/",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    const jsonld = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonld).not.toBeNull();
    const parsed = JSON.parse(jsonld!) as {
      "@type": string;
      telephone: string;
      address: { streetAddress: string; postalCode: string };
    };
    expect(parsed["@type"]).toBe("Church");
    expect(parsed.telephone).toBe("+65 6769 1666");
    expect(parsed.address.streetAddress).toBe("620 Upper Bukit Timah Road");
    expect(parsed.address.postalCode).toBe("678116");
  });

  test("favicon.svg resolves from public/", async ({ page }) => {
    const response = await page.request.get("/favicon.svg");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg");
  });

  test("route changes replay the page-in wrapper", async ({ page }) => {
    await gotoHash(page, "/worship");
    const container = page.getByTestId("page-container");
    await expect(container).toHaveAttribute("data-route", "/worship");
    await expect(container).toHaveCSS("animation-name", "page-in");

    await page.click('nav[aria-label="Primary"] >> text=News & Events');
    await expect(container).toHaveAttribute("data-route", "/news-events");
    await expect(container).toHaveCSS("animation-name", "page-in");
  });

  test("hash-only navigation keeps the same keyed node (data-route unchanged)", async ({
    page,
  }) => {
    await gotoHash(page, "/worship");
    const container = page.getByTestId("page-container");
    await expect(container).toHaveAttribute("data-route", "/worship");
    // PageHero in-page CTA: /worship → /worship#mass (same pathname).
    await page.getByRole("link", { name: "Mass times" }).first().click();
    await expect(page).toHaveURL(/#mass/);
    await expect(container).toHaveAttribute("data-route", "/worship");
  });

  test("scroll progress rail fills with page depth", async ({ page }) => {
    await gotoHash(page, "/");
    const rail = page.getByTestId("scroll-progress");
    await expect(rail).toBeAttached();
    await expect(rail).toHaveCSS("transform", "matrix(0, 0, 0, 1, 0, 0)");

    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect
      .poll(() => rail.evaluate((el) => getComputedStyle(el).transform), {
        timeout: 5_000,
      })
      .toMatch(/^matrix\(0\.[1-9]/);
  });

  test("BackToTop ring stroke offset tracks page depth", async ({ page }) => {
    await gotoHash(page, "/");
    const indicator = page.locator('[data-testid="back-to-top-progress"] circle[data-progress]');
    const circumference = 2 * Math.PI * 20;
    await expect(indicator).toHaveAttribute("stroke-dasharray", String(circumference));

    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect
      .poll(() => indicator.evaluate((el) => Number(el.getAttribute("stroke-dashoffset"))), {
        timeout: 5_000,
      })
      .toBeLessThan(circumference / 2);
  });

  test("mobile drawer marks the active route with aria-current and gold highlight", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHash(page, "/serve");
    await page.click('button[aria-label="Open menu"]');
    const drawer = page.getByRole("navigation", { name: "Mobile" });
    const serveLink = drawer.getByRole("link", { name: "Serve" });
    await expect(serveLink).toHaveAttribute("aria-current", "page");
    await expect(serveLink).toHaveCSS("color", "rgb(226, 191, 114)");

    // Parent section current when a child route is active.
    await gotoHash(page, "/history");
    await page.click('button[aria-label="Open menu"]');
    const aboutToggle = drawer.getByRole("button", { name: /About/i });
    await expect(aboutToggle).toHaveAttribute("aria-current", "true");
  });
});
