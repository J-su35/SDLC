"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SearchProduct = {
  id: string;
  label: string;
  name: string;
  icon: string;
  href: string;
  priceCents: number | null;
};

type SearchResponse = {
  query: string;
  count: number;
  products: SearchProduct[];
};

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      setError("Enter a product name to search.");
      setResults(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/products?q=${encodeURIComponent(normalizedQuery)}`,
      );
      const data = (await response.json()) as SearchResponse | { error: string };
      if (!response.ok) {
        throw new Error("error" in data ? data.error : "Product search failed.");
      }
      setResults(data as SearchResponse);
    } catch (caughtError) {
      setResults(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Product search failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative order-3 w-full md:order-2 md:w-[min(450px,47%)]">
      <form
        className="flex h-[34px] items-center overflow-hidden rounded-[var(--farmart-radius-control)] border border-border bg-canvas text-muted"
        onSubmit={search}
        role="search"
      >
        <label className="sr-only" htmlFor="language">Search language</label>
        <select
          id="language"
          defaultValue="all"
          className="h-full w-[108px] border-r border-border bg-transparent px-2.5 text-[10px] font-semibold text-muted outline-none"
        >
          <option value="all">ALL LANGUAGE</option>
          <option value="en">English</option>
        </select>
        <label className="sr-only" htmlFor="search-products">Search products</label>
        <input
          id="search-products"
          name="q"
          placeholder="Search products..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-full flex-1 border-0 bg-transparent px-2.5 text-[11px] text-foreground placeholder:text-muted focus:outline-none"
        />
        <button
          className="h-full w-[34px] border-0 bg-transparent text-[23px] leading-none text-foreground disabled:opacity-50"
          type="submit"
          aria-label="Search"
          disabled={loading}
        >
          ⌕
        </button>
      </form>
      {(loading || error || results) && (
        <div
          className="absolute z-20 mt-1 max-h-72 w-[min(450px,calc(100vw-40px))] overflow-y-auto rounded-[var(--farmart-radius-card)] border border-border bg-canvas p-2 shadow-sm md:w-[min(450px,47%)]"
          aria-live="polite"
        >
          {loading && <p className="p-2 text-xs text-muted">Searching products…</p>}
          {error && <p className="p-2 text-xs text-foreground">{error}</p>}
          {results && (
            <>
              <p className="px-2 py-1 text-[10px] text-muted">
                {results.count
                  ? `${results.count} result${results.count === 1 ? "" : "s"} for “${results.query}”`
                  : `No products found for “${results.query}”`}
              </p>
              <ul>
                {results.products.map((product) => (
                  <li key={product.id}>
                    <Link
                      className="flex items-center gap-3 rounded-[var(--farmart-radius-control)] p-2 transition-colors duration-150 hover:bg-neutral"
                      href={product.href}
                      onClick={() => setResults(null)}
                    >
                      <span className="text-xl" aria-hidden="true">{product.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-foreground">
                          {product.name}
                        </span>
                        <span className="block text-[9px] text-muted">{product.label}</span>
                      </span>
                      {product.priceCents !== null && (
                        <span className="text-xs text-foreground">
                          ${(product.priceCents / 100).toFixed(2)}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
