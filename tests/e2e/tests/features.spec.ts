import { test, expect } from "@playwright/test";
import { scrollTo, scrollToEnd, expectScrollPosition, sleep } from "./support";

test.describe("Features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders a canvas with the thumbhash", async ({ page }) => {
    await page.goto('/');
    page.setViewportSize({ width: 1000, height: 1000 });

    await page.waitForTimeout(2000);

    // Locate the thumb-hash element
    const canvas = page.getByTestId('demos-1').locator('.demo.--canvas thumb-hash canvas');
    expect(canvas).toHaveCount(1);
    expect(canvas).toHaveAttribute('width');
    expect(canvas).toHaveAttribute('height');
    expect(canvas).toHaveAttribute('style', 'width: 100%; height: 100%;');
  });

  test("renders a div with the average color", async ({ page }) => {
    await page.goto('/');
    page.setViewportSize({ width: 1000, height: 1000 });

    await page.waitForTimeout(2000);

    const div = page.getByTestId('demos-1').locator('.demo.--average thumb-hash div');
    expect(div).toHaveCount(1);
    expect(div).toHaveAttribute('style', 'width: 100%; height: 100%; background: rgb(163, 134, 104);');
  });
});
