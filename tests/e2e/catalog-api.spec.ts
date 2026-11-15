import { expect, test } from "@playwright/test";

test("serves catalog search through the real HTTP route", async ({ request }) => {
  const response = await request.get("/api/products", { params: { q: "  STRAWBERRIES  " } });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  expect(await response.json()).toMatchObject({
    query: "STRAWBERRIES", count: 1,
    products: [{ id: "fresh-strawberries", priceCents: 499, href: "/products/fresh-strawberries" }],
  });
});

test("rejects invalid queries and treats SQL metacharacters as literal input", async ({ request }) => {
  for (const url of ["/api/products", "/api/products?q=%20%20", `/api/products?q=${"a".repeat(101)}`]) {
    const response = await request.get(url);
    expect(response.status()).toBe(400);
    expect(await response.json()).toHaveProperty("error");
  }
  for (const q of ["%", "_", "' OR 1=1 --"]) {
    const response = await request.get("/api/products", { params: { q } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ query: q, count: 0, products: [] });
  }
});
