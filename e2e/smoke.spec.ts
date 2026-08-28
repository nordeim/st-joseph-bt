import { expect, test } from "@playwright/test";

test.describe("smoke — routing & hash anchors", () => {
  test("home renders hero and quick facts", async ({ page }) => {
    await page.goto("/#/");
    await expect(page.getByRole("heading", { name: /A church on the hill since 1846/i })).toBeVisible();
    await expect(page.getByText(/Bukit Timah/i).first()).toBeVisible();
    await expect(page.getByText("Sunday Mass").first()).toBeVisible();
    await expect(page.getByText("Feast day").first()).toBeVisible();
    await expect(page.getByText("Confession").first()).toBeVisible();
  });

  test("Worship alias routes all render same page", async ({ page }) => {
    for (const path of ["/#/worship", "/#/mass-times", "/#/hours-location", "/#/visit"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { name: /Mass, mercy/i }).first()).toBeVisible();
    }
  });

  test("Ministries alias routes render same page", async ({ page }) => {
    await page.goto("/#/ministries");
    await expect(page.getByRole("heading", { name: /One baptism, one faith/i }).first()).toBeVisible();

    await page.goto("/#/ministry");
    await expect(page.getByRole("heading", { name: /One baptism, one faith/i }).first()).toBeVisible();
  });

  test("Worship hash anchors are reachable", async ({ page }) => {
    await page.goto("/#/worship#mass");
    await expect(page.locator("#mass")).toBeVisible();

    await page.goto("/#/worship#confession");
    await expect(page.locator("#confession")).toBeVisible();

    await page.goto("/#/worship#visit");
    await expect(page.locator("#visit")).toBeVisible();
  });

  test("Ministries hash anchors are reachable", async ({ page }) => {
    await page.goto("/#/ministries#liturgical");
    await expect(page.locator("#liturgical")).toBeVisible();

    await page.goto("/#/ministries#faith-formation");
    await expect(page.locator("#faith-formation")).toBeVisible();

    await page.goto("/#/ministries#pastoral-care");
    await expect(page.locator("#pastoral-care")).toBeVisible();
  });

  test("NotFound for unknown route", async ({ page }) => {
    await page.goto("/#/does-not-exist-xyz");
    await expect(page.getByText(/This path does not lead to the church/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Return home/i })).toBeVisible();
  });

  test("header mobile drawer opens and closes on navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/#/");

    const toggle = page.getByRole("button", { name: /Open menu|Close menu/i });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByRole("button", { name: /Close menu/i })).toBeVisible();

    await expect(page.getByRole("link", { name: "Serve" }).first()).toBeVisible();

    await page.getByRole("link", { name: "Serve" }).first().click();
    await expect(page).toHaveURL(/#\/serve/);
    await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible();
  });
});
