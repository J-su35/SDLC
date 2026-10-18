import { Suspense } from "react";
import { io } from "next/cache";
import ProductCard from "./components/product-card";
import ProductSearch from "./components/product-search";
import { getHomePageData } from "@/lib/store";

const navItems = [
  "Deals Today",
  "Special Prices",
  "Fresh",
  "Frozen",
  "Bakery",
  "Shop",
  "Blog",
  "Pages",
  "Shop +",
];

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-canvas text-foreground" aria-busy="true">
          <div className="page-width py-8">
            <p className="text-xs text-muted">Loading storefront…</p>
          </div>
        </main>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}

async function HomePageContent() {
  await io();
  const { categories, featuredProducts } = getHomePageData();

  return (
    <main className="min-h-screen bg-canvas text-foreground">
      <header className="border-b border-border bg-canvas">
        <div className="page-width flex min-h-[46px] flex-wrap items-center justify-between gap-x-4 gap-y-3 py-2 md:flex-nowrap md:gap-7 md:py-0">
          <a className="order-1 flex items-center gap-1.5 text-[15px] font-extrabold tracking-[-0.02em] text-foreground" href="#" aria-label="Farmart home">
            <span className="text-[17px]">🌾</span>
            <span>Farmart</span>
          </a>

          <ProductSearch />

          <div className="order-2 flex items-center justify-end gap-2 whitespace-nowrap sm:gap-3 md:order-3">
            <a className="hidden text-[11px] font-bold text-foreground sm:inline" href="tel:88003326566">8 800 332 65-66</a>
            <button className="relative flex h-5 w-5 items-center justify-center bg-transparent text-[15px]" aria-label="Your account">👤</button>
            <button className="relative flex h-5 w-5 items-center justify-center bg-transparent text-[15px]" aria-label="Wishlist, 2 items">
              ❤️
              <span className="absolute -right-1.5 -top-2 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-primary text-[9px] font-bold leading-none text-foreground">2</span>
            </button>
            <button className="relative flex h-5 w-5 items-center justify-center bg-transparent text-[15px]" aria-label="Cart, 3 items">
              🛒
              <span className="absolute -right-1.5 -top-2 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-primary text-[9px] font-bold leading-none text-foreground">3</span>
            </button>
            <strong className="text-[11px] font-bold text-foreground">$3,099.00</strong>
          </div>
        </div>

        <nav className="overflow-x-auto border-t border-border">
          <div className="page-width flex min-h-[35px] w-max min-w-[974px] items-center gap-7 md:w-auto">
            <a className="flex flex-none items-center justify-center self-stretch bg-primary px-4 text-center text-[10px] font-bold tracking-[0.02em] text-foreground" href="#categories">▦&nbsp; SHOP ALL CATEGORY</a>
            <div className="flex flex-1 items-center justify-between gap-5 whitespace-nowrap text-[11px] text-foreground">
              {navItems.map((item) => (
                <a href="#featured" key={item} className="transition-colors duration-150 hover:text-primary">{item}</a>
              ))}
            </div>
            <a className="whitespace-nowrap text-[11px] text-muted transition-colors duration-150 hover:text-primary" href="#featured">◉ Recently Viewed</a>
          </div>
        </nav>
      </header>

      <div className="page-width pb-12 pt-5">
        <section className="grid gap-3 md:grid-cols-2" aria-label="Current promotions">
          <article className="relative flex min-h-[194px] items-center overflow-hidden rounded-[var(--farmart-radius-card)] bg-neutral p-5 md:p-6">
            <div className="relative z-10">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-foreground">FRESH DRINK</span>
              <h1 className="mb-2 text-[19px] font-extrabold leading-[1.22] tracking-[-0.04em] text-foreground">Active Summer With<br />Juice Milk 300ml</h1>
              <p className="mb-3 text-[11px] leading-[1.45] text-muted">New arrivals with natural fresh juice milk,<br className="hidden md:block" /> customize the varieties.</p>
              <a className="inline-flex h-[29px] items-center justify-center rounded-[var(--farmart-radius-control)] bg-primary px-3.5 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm" href="#featured">Shop Now</a>
            </div>
            <span className="pointer-events-none absolute bottom-2 right-5 text-[73px] leading-none -rotate-[7deg]" aria-hidden="true">🧃</span>
          </article>

          <article className="relative flex min-h-[194px] items-center overflow-hidden rounded-[var(--farmart-radius-card)] bg-promo-yellow p-5 md:p-6">
            <div className="relative z-10">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-foreground">SYNTHETIC GOODS</span>
              <h2 className="mb-1.5 text-[24px] font-extrabold leading-[1.22] tracking-[-0.04em] text-foreground">20% SALE OFF</h2>
              <p className="mb-3 text-[11px] leading-[1.65] text-foreground">Synthetic Goods<br />Net 2.0 Oz</p>
              <a className="inline-flex h-[29px] items-center justify-center rounded-[var(--farmart-radius-control)] bg-canvas px-3.5 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm" href="#featured">Shop Now</a>
            </div>
            <span className="pointer-events-none absolute bottom-0 right-3 text-[84px] leading-none" aria-hidden="true">📦</span>
          </article>
        </section>

        <section className="mt-[var(--farmart-space-section)]" id="categories">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="m-0 text-[14px] font-bold text-foreground">Browse by Category</h2>
            <a href="#categories" className="text-[11px] text-muted transition-colors duration-150 hover:text-primary">All Categories <span aria-hidden="true">⟶</span></a>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <a
                className={`group flex min-h-[78px] flex-col items-center justify-center gap-1.5 rounded-[var(--farmart-radius-card)] border px-2 text-center text-[10px] leading-[1.2] text-muted transition-colors duration-150 ${
                  category.active
                    ? "border-primary bg-soft-warm"
                    : "border-border hover:border-primary hover:bg-soft-warm"
                }`}
                href="#featured"
                key={category.name}
              >
                <span className="text-[21px] leading-none" aria-hidden="true">{category.icon}</span>
                <span>{category.name}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-[var(--farmart-space-section)]" id="featured">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="m-0 text-[14px] font-bold text-foreground">Featured Brands</h2>
            <a href="#featured" className="text-[11px] text-muted transition-colors duration-150 hover:text-primary">All Brands <span aria-hidden="true">⟶</span></a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {featuredProducts.map((item) => (
              <ProductCard
                colorClass={item.colorClass}
                href={item.href}
                icon={item.icon}
                key={item.name}
                label={item.label}
                name={item.name}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
