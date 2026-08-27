import { expect, type Page } from "@playwright/test";

/**
 * Navigate to a HashRouter URL via baseURL + hash.
 * Example: gotoHash(page, "/what-to-see#pilgrim-center") → /#/what-to-see#pilgrim-center
 */
export async function gotoHash(page: Page, hash: string) {
  const clean = hash.startsWith("/") ? hash : `/${hash}`;
  await page.goto(`/#${clean}`);
}

export async function expectHash(page: Page, fragment: string) {
  await expect(page).toHaveURL(new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
