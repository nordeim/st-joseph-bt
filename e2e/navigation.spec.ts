import { expect, test } from "@playwright/test";

test.describe("navigation — desktop, keyboard, skip, footer", () => {
  test("desktop Worship dropdown on hover shows 3 children", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#/");

    const trigger = page.getByRole("button", { name: "Worship" });
    await expect(trigger).toBeVisible();
    await trigger.hover();

    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: "Mass Times" }).first()).toBeVisible();
    await expect(page.getByText("Weekday chapel Masses and weekend liturgies.").first()).toBeVisible();
    await expect(page.getByText("Reconciliation, Holy Hour, and weekday devotion.").first()).toBeVisible();
  });

  test("desktop Ministries dropdown on hover shows 3 children", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#/");

    const trigger = page.getByRole("button", { name: "Ministries" });
    await expect(trigger).toBeVisible();
    await trigger.hover();

    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: "Liturgical" }).first()).toBeVisible();
    await expect(page.getByText("Altar servers, choirs, and hospitality at Mass.").first()).toBeVisible();
    await expect(page.getByText("Catechesis of the Good Shepherd and adult formation.").first()).toBeVisible();
  });

  test("keyboard nav covers primaryNav and SkipLink focuses main", async ({ page }) => {
    await page.goto("/#/");

    const skipLink = page.getByRole("link", { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await skipLink.press("Enter");
    await expect(page).not.toHaveURL(/#main-content/);
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByRole("heading", { name: /A church on the hill/i })).toBeVisible();
    await expect(page.locator("#main-content")).toBeFocused();

    const worshipLink = page.getByRole("link", { name: "Worship" }).first();
    await worshipLink.focus();
    await expect(worshipLink).toBeFocused();
  });

  test("footer nav 10 links navigate correctly", async ({ page }) => {
    await page.goto("/#/");

    await page.getByRole("navigation", { name: "Explore" }).getByRole("link", { name: "History" }).click();
    await expect(page).toHaveURL(/#\/history/);
    await expect(page.getByRole("heading", { name: /From an attap chapel/i }).first()).toBeVisible();

    await page.goto("/#/");
    await page.getByRole("navigation", { name: "Get involved" }).getByRole("link", { name: "Liturgical" }).click();
    await expect(page).toHaveURL(/#liturgical/);
    await expect(page.locator("#liturgical")).toBeVisible();

    await page.goto("/#/");
    await page.getByRole("navigation", { name: "Get involved" }).getByRole("link", { name: "Serve" }).click();
    await expect(page).toHaveURL(/#\/serve/);
    await expect(page.getByRole("heading", { name: /Take a place in the household/i })).toBeVisible();
  });

  test("NotFound Return Home works", async ({ page }) => {
    await page.goto("/#/this-does-not-exist");
    await expect(page.getByText(/This path does not lead to the church/i)).toBeVisible();
    await page.getByRole("link", { name: /Return home/i }).click();
    await expect(page).toHaveURL(/#\/$|\/#\/\?/);
    await expect(page.getByRole("heading", { name: /A church on the hill/i })).toBeVisible();
  });

  test("header top bar Give link navigates to /give", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#/");

    const giveLinks = page.getByRole("link", { name: /^Give$/ });
    await giveLinks.first().click();
    await expect(page).toHaveURL(/#\/give/);
    await expect(page.getByRole("heading", { name: /^Give$/i }).first()).toBeVisible();
  });
});
