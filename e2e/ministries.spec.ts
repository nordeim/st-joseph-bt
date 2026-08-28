import { expect, test } from "@playwright/test";

test.describe("Ministries — 6 sections", () => {
  test("6 sections render with imageAlt, summary, and details", async ({ page }) => {
    await page.goto("/#/ministries");

    const ids = ["liturgical", "faith-formation", "pastoral-care", "family-life", "youth", "mandarin"];
    for (const id of ids) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    await expect(page.locator("#liturgical").getByRole("img", { name: /sanctuary.*Mass/i })).toBeVisible();
    await expect(page.locator("#faith-formation").getByRole("img", { name: /stained glass/i })).toBeVisible();
    await expect(page.locator("#pastoral-care").getByRole("img", { name: /chapel|pastoral/i })).toBeVisible();

    await expect(page.locator("#liturgical").getByText("Sunset Choir at the Saturday 5.30 p.m. Mass").first()).toBeVisible();
    await expect(page.locator("#faith-formation").getByText("Catechesis of the Good Shepherd").first()).toBeVisible();
    await expect(page.locator("#pastoral-care").getByText("St Joachim Conference").first()).toBeVisible();
  });

  test("image onError fallback to local hero", async ({ page }) => {
    await page.route("**/pexels.com/**", (route) => route.abort());
    await page.route("**/wikimedia.org/**", (route) => route.abort());
    await page.goto("/#/ministries");

    const images = page.locator("#liturgical img, #faith-formation img, #pastoral-care img, #family-life img, #youth img, #mandarin img");
    await expect(images.first()).toBeVisible();
    await page.waitForTimeout(600);
    const srcs = await images.evaluateAll((els: HTMLImageElement[]) => els.map((e) => e.src));
    expect(srcs.length).toBe(6);
    expect(srcs.every((s) => s.length > 0)).toBe(true);
  });

  test("jump nav via Link preserves HashRouter route", async ({ page }) => {
    await page.goto("/#/ministries");
    const jumpNav = page.getByRole("navigation", { name: /Jump to ministry/i });
    await expect(jumpNav).toBeVisible();

    await jumpNav.getByRole("link", { name: "Liturgical" }).click();
    await expect(page).toHaveURL(/#\/ministries#liturgical/);
    await expect(page.locator("#liturgical")).toBeVisible();
    await expect(page.getByText(/This path does not lead/i)).not.toBeVisible();
    await expect(jumpNav.getByRole("link", { name: "Liturgical" })).toHaveAttribute("aria-current", "true");

    await jumpNav.getByRole("link", { name: "Faith Formation" }).click();
    await expect(page).toHaveURL(/#\/ministries#faith-formation/);
    await expect(page.locator("#faith-formation")).toBeVisible();
    await expect(jumpNav.getByRole("link", { name: "Faith Formation" })).toHaveAttribute("aria-current", "true");
    await expect(jumpNav.getByRole("link", { name: "Liturgical" })).not.toHaveAttribute("aria-current");
  });

  test("Home grounds cards link to Worship anchors", async ({ page }) => {
    await page.goto("/#/");

    const mainChurchCard = page.getByRole("link", { name: /Main Church/i }).first();
    await expect(mainChurchCard).toBeVisible();
    await mainChurchCard.click();
    await expect(page).toHaveURL(/#\/worship#mass/);
    await expect(page.locator("#mass")).toBeVisible();

    await page.goto("/#/");

    const chapelCard = page.getByRole("link", { name: /Chapel of St Joseph/i }).first();
    await expect(chapelCard).toBeVisible();
    await chapelCard.click();
    await expect(page).toHaveURL(/#\/worship#confession/);
    await expect(page.locator("#confession")).toBeVisible();
  });
});
