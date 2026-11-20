import "server-only";

import Database from "better-sqlite3";
// import { mkdirSync } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";

export type Category = {
  name: string;
  icon: string;
  active: boolean;
};

export type FeaturedProduct = {
  id: string;
  label: string;
  name: string;
  icon: string;
  colorClass: string;
  href: string;
  priceCents: number | null;
};

type DatabaseRow = {
  id: string;
  label: string;
  name: string;
  icon: string;
  color_class: string;
  href: string;
  price_cents: number | null;
};

const globalForStore = globalThis as typeof globalThis & {
  farmartDatabase?: Database.Database;
};

// function getDatabase() {
//   if (globalForStore.farmartDatabase) {
//     return globalForStore.farmartDatabase;
//   }

//   const filename = process.env.FARMART_DATABASE_PATH ?? path.join(process.cwd(), "data", "farmart.sqlite");
//   if (filename !== ":memory:") {
//     mkdirSync(path.dirname(filename), { recursive: true });
//   }
//   const database = new Database(filename);
//   initializeCatalog(database);

//   globalForStore.farmartDatabase = database;
//   return database;
// }

function getDatabase() {
  if (globalForStore.farmartDatabase) {
    return globalForStore.farmartDatabase;
  }

  const filename = process.env.FARMART_DATABASE_PATH ?? path.join(process.cwd(), "data", "farmart.sqlite");
  if (filename !== ":memory:" && !existsSync(filename)) {
    throw new Error(`SQLite database not found: ${filename}`);
  }
  const database = new Database(filename, {
    readonly: true,
    fileMustExist: true,
  });

  globalForStore.farmartDatabase = database;
  return database;
}

export function initializeCatalog(database: Database.Database) {
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      name TEXT PRIMARY KEY,
      icon TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 0 CHECK (active IN (0, 1))
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color_class TEXT NOT NULL,
      href TEXT NOT NULL,
      price_cents INTEGER,
      is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1))
    );

    CREATE INDEX IF NOT EXISTS products_name_search
      ON products(name COLLATE NOCASE);
  `);

  const seed = database.transaction(() => {
    const insertCategory = database.prepare(`
      INSERT OR IGNORE INTO categories (name, icon, active)
      VALUES (@name, @icon, @active)
    `);
    const categories = [
      { name: "Fruits & Vegetables", icon: "🥦", active: 0 },
      { name: "Breads & Sweets", icon: "🍞", active: 1 },
      { name: "Frozen Seafoods", icon: "🍤", active: 0 },
      { name: "Raw Meats", icon: "🥩", active: 0 },
      { name: "Wines & Alcohol Drinks", icon: "🍷", active: 0 },
      { name: "Coffees and Teas", icon: "☕", active: 0 },
      { name: "Milks and Dairies", icon: "🥛", active: 0 },
      { name: "Pet Foods", icon: "🐾", active: 0 },
    ];
    for (const category of categories) {
      insertCategory.run(category);
    }

    const insertProduct = database.prepare(`
      INSERT OR IGNORE INTO products (
        id, label, name, icon, color_class, href, price_cents, is_featured
      ) VALUES (
        @id, @label, @name, @icon, @colorClass, @href, @priceCents, @isFeatured
      )
    `);
    const products = [
      {
        id: "fresh-strawberries",
        label: "FRESH PRODUCE",
        name: "Fresh strawberries",
        icon: "🍓",
        colorClass: "bg-soft-warm",
        href: "/products/fresh-strawberries",
        priceCents: 499,
        isFeatured: 1,
      },
      {
        id: "popcorn",
        label: "SNACKS",
        name: "Popcorn",
        icon: "🍿",
        colorClass: "bg-category-snacks",
        href: "#categories",
        priceCents: null,
        isFeatured: 1,
      },
      {
        id: "fresh-soup",
        label: "ORGANIC",
        name: "Fresh soup",
        icon: "🍵",
        colorClass: "bg-category-soup",
        href: "#categories",
        priceCents: null,
        isFeatured: 1,
      },
      {
        id: "berry-soda",
        label: "SODA CAN BOX",
        name: "Berry soda",
        icon: "🥤",
        colorClass: "bg-category-soda",
        href: "#categories",
        priceCents: null,
        isFeatured: 1,
      },
      {
        id: "hot-dog",
        label: "ORGANIC",
        name: "Hot dog",
        icon: "🌭",
        colorClass: "bg-category-organic",
        href: "#categories",
        priceCents: null,
        isFeatured: 1,
      },
    ];
    for (const product of products) {
      insertProduct.run(product);
    }
  });
  seed();

  return database;
}

export function getHomePageData() {
  return getHomePageDataFromDatabase(getDatabase());
}

export function getHomePageDataFromDatabase(database: Database.Database) {
  const categories = database
    .prepare(
      `SELECT name, icon, active FROM categories ORDER BY rowid`,
    )
    .all() as Array<{ name: string; icon: string; active: number }>;
  const featured = database
    .prepare(`
      SELECT id, label, name, icon, color_class, href, price_cents
      FROM products
      WHERE is_featured = 1
      ORDER BY rowid
    `)
    .all() as DatabaseRow[];

  return {
    categories: categories.map((category) => ({
      ...category,
      active: category.active === 1,
    })),
    featuredProducts: featured.map(mapProductRow),
  };
}

export function searchProducts(query: string) {
  return searchProductsInDatabase(getDatabase(), query);
}

export function searchProductsInDatabase(
  database: Database.Database,
  query: string,
) {
  const escapedQuery = query.replace(/[\\%_]/g, "\\$&");
  const rows = database
    .prepare(`
      SELECT id, label, name, icon, color_class, href, price_cents
      FROM products
      WHERE name LIKE @query ESCAPE '\\'
        OR label LIKE @query ESCAPE '\\'
      ORDER BY is_featured DESC, name COLLATE NOCASE
      LIMIT 50
    `)
    .all({ query: `%${escapedQuery}%` }) as DatabaseRow[];

  return rows.map(mapProductRow);
}

function mapProductRow(row: DatabaseRow): FeaturedProduct {
  return {
    id: row.id,
    label: row.label,
    name: row.name,
    icon: row.icon,
    colorClass: row.color_class,
    href: row.href,
    priceCents: row.price_cents,
  };
}
