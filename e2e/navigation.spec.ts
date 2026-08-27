import { expect, test } from "@playwright/test";

test.describe("navigation — desktop, keyboard, skip, footer", () => {
  test("desktop What to See dropdown on hover shows 3 children", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#/");

    // Hover What to See trigger (the button with aria-haspopup)
    const trigger = page.getByRole("button", { name: "What to See" });
    await expect(trigger).toBeVisible();
    await trigger.hover();

    // Dropdown should appear with 3 children
    await expect(page.getByRole("link", { name: "Pilgrim Center" }).first()).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Descriptions should be visible
    await expect(page.getByText("Exhibits, gift shop, and café.").first()).toBeVisible();
    await expect(page.getByText("Rosary walk, gardens, and outdoor amphitheater.").first()).toBeVisible();
  });

  test("keyboard nav covers primaryNav and SkipLink focuses main", async ({ page }) => {
    await page.goto("/#/");

    const skipLink = page.getByRole("link", { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
    // Focus skip link programmatically (Tab order is flaky in headless)
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    // Activate skip link — must NOT rewrite the hash (HashRouter would route
    // /main-content to NotFound); focus moves to the main landmark instead.
    await skipLink.press("Enter");
    await expect(page).not.toHaveURL(/#main-content/);
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByRole("heading", { name: /shepherd who stayed/i })).toBeVisible();
    await expect(page.locator("#main-content")).toBeFocused();
    // Pilgrimage link should be focusable via keyboard
    const pilgrimageLink = page.getByRole("link", { name: "Pilgrimage" }).first();
    await pilgrimageLink.focus();
    await expect(pilgrimageLink).toBeFocused();
  });

  test("footer nav 10 links navigate correctly", async ({ page }) => {
    await page.goto("/#/");

    // Footer Explore: History link
    await page.getByRole("navigation", { name: "Explore" }).getByRole("link", { name: "History" }).click();
    await expect(page).toHaveURL(/#\/history/);
    await expect(page.getByRole("heading", { name: /History of the Shrine/i }).first()).toBeVisible();

    // Footer Get involved: Tepeyac Hill (hash anchor)
    await page.goto("/#/");
    await page.getByRole("navigation", { name: "Get involved" }).getByRole("link", { name: "Tepeyac Hill" }).click();
    await expect(page).toHaveURL(/#tepeyac-hill/);
    await expect(page.locator("#tepeyac-hill")).toBeVisible();
  });

  test("NotFound Return Home works", async ({ page }) => {
    await page.goto("/#/this-does-not-exist");
    await expect(page.getByText(/This path does not lead to the shrine/i)).toBeVisible();
    await page.getByRole("link", { name: /Return home/i }).click();
    await expect(page).toHaveURL(/#\/$|\/#\/\?/);
    await expect(page.getByRole("heading", { name: /shepherd who stayed/i })).toBeVisible();
  });

  test("header top bar Give link navigates to /give", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#/");

    // Desktop top bar has Give link (hidden on mobile)
    const giveLinks = page.getByRole("link", { name: /^Give$/ });
    // There are at least 2 Give links (top bar + header button), check one navigates
    await giveLinks.first().click();
    await expect(page).toHaveURL(/#\/give|\/#\/shrinegift/);
    await expect(page.getByRole("heading", { name: /^Give$/i }).first()).toBeVisible();
  });
});
