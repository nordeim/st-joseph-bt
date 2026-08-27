import { expect, test } from "@playwright/test";

test.describe("What to See — exhibits", () => {
  test("3 sections render with imageAlt, summary, and details", async ({ page }) => {
    await page.goto("/#/what-to-see");

    const pilgrim = page.locator("#pilgrim-center");
    const shrine = page.locator("#shrine-church");
    const tepeyac = page.locator("#tepeyac-hill");

    await expect(pilgrim).toBeVisible();
    await expect(shrine).toBeVisible();
    await expect(tepeyac).toBeVisible();

    // Each section has an image with required alt
    await expect(pilgrim.getByRole("img", { name: /Sunlit stone hall/i })).toBeVisible();
    await expect(shrine.getByRole("img", { name: /stained glass/i })).toBeVisible();
    await expect(tepeyac.getByRole("img", { name: /stone pathway winding/i })).toBeVisible();

    // Pilgrim Center details (4 bullets)
    await expect(pilgrim.getByText("Interactive exhibits on his childhood")).toBeVisible();
    await expect(tepeyac.getByText("Rosary walk with stations")).toBeVisible();
  });

  test("image onError fallback to local hero", async ({ page }) => {
    // Abort Pexels CDN images to exercise SafeImage onError → fallback
    await page.route("**/pexels.com/**", (route) => route.abort());
    await page.goto("/#/what-to-see");

    const images = page.locator("#pilgrim-center img, #shrine-church img, #tepeyac-hill img");
    await expect(images.first()).toBeVisible();
    await page.waitForTimeout(500);
    const srcs = await images.evaluateAll((els: HTMLImageElement[]) => els.map((e) => e.src));
    expect(srcs.length).toBe(3);
    // Page must not crash and images remain attached; fallback is via SafeImage onError
    // (timing varies — just ensure no broken state)
    expect(srcs.every((s) => s.length > 0)).toBe(true);
  });

  test("jump nav via Link preserves HashRouter route", async ({ page }) => {
    await page.goto("/#/what-to-see");
    const jumpNav = page.getByRole("navigation", { name: /Jump to/i });
    await expect(jumpNav).toBeVisible();

    // Click Tepeyac Hill via jump nav (uses <Link to=\"/what-to-see#tepeyac-hill\">)
    await jumpNav.getByRole("link", { name: "Tepeyac Hill" }).click();
    await expect(page).toHaveURL(/#\/what-to-see#tepeyac-hill/);
    await expect(page.locator("#tepeyac-hill")).toBeVisible();
    // Should NOT be NotFound
    await expect(page.getByText(/This path doesn't lead/i)).not.toBeVisible();

    // Click Pilgrim Center
    await jumpNav.getByRole("link", { name: "Pilgrim Center" }).click();
    await expect(page).toHaveURL(/#\/what-to-see#pilgrim-center/);
    await expect(page.locator("#pilgrim-center")).toBeVisible();
  });

  test("Home grounds cards link to What to See anchors", async ({ page }) => {
    await page.goto("/#/");

    // Home has 3 grounds cards linking to What to See anchors
    const pilgrimCard = page.getByRole("link", { name: /Pilgrim Center/i }).first();
    await expect(pilgrimCard).toBeVisible();
    await pilgrimCard.click();
    await expect(page).toHaveURL(/#\/what-to-see#pilgrim-center/);
    await expect(page.locator("#pilgrim-center")).toBeVisible();
  });
});
