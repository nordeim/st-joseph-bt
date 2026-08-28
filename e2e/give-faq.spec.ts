import { expect, test } from "@playwright/test";

test.describe("Give + FAQ + Worship journeys", () => {
  test("Give alias routes both show 8 options and external GIFT link", async ({ page }) => {
    await page.goto("/#/give");
    await expect(page.getByRole("heading", { name: /^Give$/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "PayNow" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Weekend collections" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cash boxes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /SSVP — Friends in Need/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /GIFT \(Archdiocese\)/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Boys' Town" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Mass offerings" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cheque" })).toBeVisible();

    const external = page.getByRole("link", { name: /GIFT — Catholic Foundation/i });
    await expect(external).toBeVisible();
    await expect(external).toHaveAttribute("href", "https://www.catholicfoundation.sg/give-20201016/the-gift-call/");

    await page.goto("/#/donate");
    await expect(page.getByRole("heading", { name: /^Give$/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "PayNow" })).toBeVisible();
  });

  test("FAQ accordion single-open with aria", async ({ page }) => {
    await page.goto("/#/faq");
    await expect(page.getByRole("heading", { name: /What pilgrims usually ask/i })).toBeVisible();

    const firstQuestion = page.getByRole("button", { name: /What are the Mass times\?/i });
    const secondQuestion = page.getByRole("button", { name: /When can I go to confession\?/i });

    await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(secondQuestion).toHaveAttribute("aria-expanded", "false");

    await secondQuestion.click();
    await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  });

  test("Worship Find Us and maps", async ({ page }) => {
    await page.goto("/#/worship");
    await expect(page.getByRole("heading", { name: /Mass, mercy/i }).first()).toBeVisible();

    await expect(page.locator("#mass")).toBeVisible();
    await expect(page.locator("#confession")).toBeVisible();
    await expect(page.locator("#visit")).toBeVisible();

    await expect(page.getByText("Weekday morning").first()).toBeVisible();
    await expect(page.getByText("Confession").first()).toBeVisible();

    await expect(page.getByRole("heading", { name: /620 Upper Bukit Timah/i }).first()).toBeVisible();
    await expect(page.getByText(/Gates.*8\.00 a\.m.*9\.00 p\.m/i).first()).toBeVisible();
    await expect(page.getByText(/Cashew MRT/i).first()).toBeVisible();

    const directions = page.getByRole("link", { name: /Get directions/i }).first();
    await expect(directions).toHaveAttribute("href", /google\.com\/maps/);

    const iframe = page.locator('iframe[title="Map of St Joseph\'s Church Bukit Timah"]');
    await expect(iframe).toBeAttached();
    await expect(iframe).toHaveAttribute("src", /google\.com\/maps/);
  });

  test("Footer Give link from home navigates to /give", async ({ page }) => {
    await page.goto("/#/");

    await page.getByRole("navigation", { name: "Get involved" }).getByRole("link", { name: /^Give$/ }).click();
    await expect(page).toHaveURL(/#\/give/);
    await expect(page.getByText("Eight ways to support the mission")).toBeVisible();
  });
});
