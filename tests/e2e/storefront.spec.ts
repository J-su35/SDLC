import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("Search products", { exact: true })).toBeVisible();
});

test("renders the SQLite catalog and navigates to a product and back", async ({ page, request }) => {
  const response = await request.get("/api/home");
  expect(response.ok()).toBeTruthy();
  const catalog = await response.json();
  expect(catalog.categories).toHaveLength(8);
  expect(catalog.featuredProducts).toHaveLength(5);
  for (const category of catalog.categories) {
    await expect(page.locator("#categories").getByRole("link", { name: category.name, exact: true })).toBeVisible();
  }
  for (const product of catalog.featuredProducts) {
    await expect(page.locator("#featured").getByRole("link").filter({ hasText: product.name })).toBeVisible();
  }
  await page.locator("#featured").getByRole("link").filter({ hasText: "Fresh strawberries" }).click();
  await expect(page).toHaveURL("/products/fresh-strawberries");
  await expect(page.getByRole("heading", { name: "Fresh strawberries", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Farmart home", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Browse by Category" })).toBeVisible();
});

test("searches case-insensitively, trims input, and opens a result", async ({ page }) => {
  await page.getByLabel("Search products", { exact: true }).fill("  STRAWBERRIES  ");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByText('1 result for “STRAWBERRIES”', { exact: true })).toBeVisible();
  const results = page.locator('div[aria-live="polite"]').filter({ has: page.getByRole("list") });
  await expect(results.getByText("$4.99", { exact: true })).toBeVisible();
  await results.getByRole("link", { name: /Fresh strawberries/ }).click();
  await expect(page).toHaveURL("/products/fresh-strawberries");
});

test("reports blank, overlong, and unmatched searches and recovers", async ({ page }) => {
  const input = page.getByLabel("Search products", { exact: true });
  const submit = page.getByRole("button", { name: "Search", exact: true });
  await input.fill("   ");
  await submit.click();
  await expect(page.getByText("Enter a product name to search.", { exact: true })).toBeVisible();
  await input.fill("a".repeat(101));
  await submit.click();
  await expect(page.getByText('Query parameter "q" is required and must be at most 100 characters.', { exact: true })).toBeVisible();
  await input.fill("not-in-catalog");
  await submit.click();
  await expect(page.getByText('No products found for “not-in-catalog”', { exact: true })).toBeVisible();
  await input.fill("organic");
  await submit.click();
  await expect(page.getByText('2 results for “organic”', { exact: true })).toBeVisible();
  await expect(page.getByText("Enter a product name to search.", { exact: true })).toBeHidden();
});

test("shows loading and server errors, then allows retry against the real API", async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/products?*", async (route) => {
    await pending;
    await route.fulfill({ status: 503, json: { error: "Catalog temporarily unavailable." } });
  });
  await page.getByLabel("Search products", { exact: true }).fill("strawberries");
  const submit = page.getByRole("button", { name: "Search", exact: true });
  await submit.click();
  try {
    await expect(submit).toBeDisabled();
    await expect(page.getByText("Searching products…", { exact: true })).toBeVisible();
  } finally {
    release();
  }
  await expect(page.getByText("Catalog temporarily unavailable.", { exact: true })).toBeVisible();
  await expect(submit).toBeEnabled();
  await page.unroute("**/api/products?*");
  await submit.click();
  await expect(page.getByText('1 result for “strawberries”', { exact: true })).toBeVisible();
  await expect(page.getByText("Catalog temporarily unavailable.", { exact: true })).toBeHidden();
});

test("keeps search results aligned with the form at each viewport", async ({ page }) => {
  await page.getByLabel("Search products", { exact: true }).fill("strawberries");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const results = page.locator('div[aria-live="polite"]').filter({ has: page.getByRole("list") });
  await expect(results).toBeVisible();
  await expect(async () => {
    const formBox = await page.getByRole("search").boundingBox();
    const resultsBox = await results.boundingBox();
    expect(formBox).not.toBeNull();
    expect(resultsBox).not.toBeNull();
    expect(Math.abs(resultsBox!.width - formBox!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(resultsBox!.x - formBox!.x)).toBeLessThanOrEqual(1);
    expect(resultsBox!.x + resultsBox!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  }).toPass();
});

test("updates quantity, price, and local purchase confirmation", async ({ page }) => {
  await page.goto("/products/fresh-strawberries");
  const quantity = page.getByLabel("Quantity", { exact: true });
  const decrease = page.getByRole("button", { name: "Decrease quantity" });
  await expect(quantity).toHaveText("1");
  await expect(decrease).toBeDisabled();
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(quantity).toHaveText("2");
  await page.getByRole("button", { name: "Add to cart $9.98", exact: true }).click();
  await expect(page.getByText("2 packs added to your cart.", { exact: true })).toBeVisible();
  await decrease.click();
  await expect(quantity).toHaveText("1");
  await expect(page.getByText("2 packs added to your cart.", { exact: true })).toBeHidden();
  await expect(page.getByRole("button", { name: "Add to cart $4.99", exact: true })).toBeVisible();
});

test("caps purchase quantity at 99 packs", async ({ page }) => {
  await page.goto("/products/fresh-strawberries");
  const increase = page.getByRole("button", { name: "Increase quantity" });
  for (let count = 1; count < 99; count += 1) await increase.click();
  await expect(page.getByLabel("Quantity", { exact: true })).toHaveText("99");
  await expect(increase).toBeDisabled();
  await expect(page.getByRole("button", { name: "Add to cart $494.01", exact: true })).toBeVisible();
});
