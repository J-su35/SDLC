import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import Database from "better-sqlite3";
import {
  homeApiResponse,
  productsApiResponse,
} from "../lib/api-responses";
import {
  getHomePageDataFromDatabase,
  initializeCatalog,
  searchProductsInDatabase,
} from "../lib/store";

function createTestDatabase() {
  const database = new Database(":memory:");
  initializeCatalog(database);
  return database;
}

describe("catalog store unit tests", () => {
  let database!: Database.Database;

  beforeEach(() => {
    database = createTestDatabase();
  });
  afterEach(() => database.close());

  it("seeds the homepage categories and featured products", () => {
    const home = getHomePageDataFromDatabase(database);

    assert.equal(home.categories.length, 8);
    assert.equal(home.categories.filter((category) => category.active).length, 1);
    assert.equal(home.featuredProducts.length, 5);
    assert.deepEqual(
      home.featuredProducts.map((product) => product.id),
      ["fresh-strawberries", "popcorn", "fresh-soup", "berry-soda", "hot-dog"],
    );
    assert.equal(home.featuredProducts[0].priceCents, 499);
    assert.equal(home.featuredProducts[1].priceCents, null);
  });

  it("searches product names and labels without case sensitivity", () => {
    assert.deepEqual(
      searchProductsInDatabase(database, "STRAWBERRIES").map(
        (product) => product.id,
      ),
      ["fresh-strawberries"],
    );
    assert.equal(searchProductsInDatabase(database, "organic").length, 2);
    assert.deepEqual(searchProductsInDatabase(database, "not in catalog"), []);
  });

  it("treats SQL LIKE wildcard characters as literal search text", () => {
    assert.deepEqual(searchProductsInDatabase(database, "%"), []);
    assert.deepEqual(searchProductsInDatabase(database, "_"), []);
  });

  it("caps search results at 50 products", () => {
    const insertProduct = database.prepare(`
      INSERT INTO products (
        id, label, name, icon, color_class, href, price_cents, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (let index = 0; index < 55; index += 1) {
      insertProduct.run(
        `catalog-item-${index}`,
        "TEST",
        `catalog-item-${index}`,
        "📦",
        "bg-neutral",
        "#",
        null,
        0,
      );
    }

    assert.equal(searchProductsInDatabase(database, "catalog-item").length, 50);
  });
});

describe("catalog API integration tests", () => {
  let database!: Database.Database;

  beforeEach(() => {
    database = createTestDatabase();
  });
  afterEach(() => database.close());

  it("returns seeded SQLite homepage data as JSON", async () => {
    const response = homeApiResponse(() => getHomePageDataFromDatabase(database));
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
    assert.equal(body.categories.length, 8);
    assert.equal(body.featuredProducts.length, 5);
  });

  it("returns database-backed product search results as JSON", async () => {
    const request = new Request(
      "http://localhost/api/products?q=%20strawberries%20",
    );
    const response = productsApiResponse(request, (query) =>
      searchProductsInDatabase(database, query),
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      query: "strawberries",
      count: 1,
      products: [
        {
          id: "fresh-strawberries",
          label: "FRESH PRODUCE",
          name: "Fresh strawberries",
          icon: "🍓",
          colorClass: "bg-soft-warm",
          href: "/products/fresh-strawberries",
          priceCents: 499,
        },
      ],
    });
  });

  it("rejects missing, blank, and overlong search queries", async () => {
    const search = (request: Request) =>
      productsApiResponse(request, (query) =>
        searchProductsInDatabase(database, query),
      );
    const requests = [
      new Request("http://localhost/api/products"),
      new Request("http://localhost/api/products?q=%20%20"),
      new Request(
        `http://localhost/api/products?q=${"a".repeat(101)}`,
      ),
    ];

    for (const request of requests) {
      const response = search(request);
      const body = await response.json();
      assert.equal(response.status, 400);
      assert.equal(typeof body.error, "string");
    }
  });
});
