import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "../../components/product-card";
import PurchasePanel from "./purchase-panel";

export const metadata: Metadata = {
  title: "Fresh Strawberries | Farmart",
  description: "Shop sweet, fresh strawberries at Farmart. A 250g pack for snacks, desserts, or breakfast.",
};

const relatedProducts = [
  { label: "BREAKFAST", name: "Crunchy granola", icon: "🥣", colorClass: "bg-category-soup", price: "$4.29" },
  { label: "DAIRY", name: "Natural yogurt", icon: "🥛", colorClass: "bg-category-organic", price: "$3.49" },
  { label: "FRESH PRODUCE", name: "Blueberries", icon: "🫐", colorClass: "bg-category-snacks", price: "$5.49" },
];

export default function StrawberryProductPage() {
  return (
    <main className="min-h-screen bg-canvas text-foreground">
      <header className="border-b border-border bg-canvas">
        <div className="page-width flex min-h-14 items-center justify-between gap-4">
          <Link className="flex items-center gap-1.5 text-[15px] font-extrabold tracking-[-0.02em] text-foreground" href="/" aria-label="Farmart home">
            <span className="text-[17px]" aria-hidden="true">🌾</span>
            <span>Farmart</span>
          </Link>
          <Link className="text-[11px] font-bold text-foreground transition-colors duration-150 hover:text-primary" href="/#categories">
            Shop all categories <span aria-hidden="true">⟶</span>
          </Link>
        </div>
      </header>

      <div className="page-width pb-16 pt-5">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link className="transition-colors duration-150 hover:text-primary" href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link className="transition-colors duration-150 hover:text-primary" href="/#categories">Fruits &amp; Vegetables</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-foreground">Fresh strawberries</li>
          </ol>
        </nav>

        <section className="grid items-start gap-8 md:grid-cols-2 md:gap-10" aria-labelledby="product-title">
          <div>
            <div className="relative flex aspect-square max-h-[480px] items-center justify-center overflow-hidden rounded-[var(--farmart-radius-card)] border border-border bg-soft-warm">
              <span className="absolute left-4 top-4 rounded-[var(--farmart-radius-control)] bg-canvas px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-foreground">Fresh pick</span>
              <span className="select-none text-[clamp(120px,24vw,220px)] leading-none" role="img" aria-label="A fresh strawberry">🍓</span>
              <span className="absolute bottom-4 right-4 text-[10px] font-semibold text-muted">250 g pack</span>
            </div>
            <div aria-label="Product image gallery" className="mt-3 grid grid-cols-3 gap-3">
              {[
                { icon: "🍓", label: "Strawberries" },
                { icon: "🍓", label: "Freshly picked" },
                { icon: "🍓", label: "Ready to enjoy" },
              ].map((image, index) => (
                <div
                  className={`flex aspect-[1.4] items-center justify-center rounded-[var(--farmart-radius-card)] border text-3xl ${
                    index === 0 ? "border-primary bg-soft-warm" : "border-border bg-neutral"
                  }`}
                  key={image.label}
                  role="img"
                  aria-label={image.label}
                >
                  {image.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-[var(--farmart-radius-control)] bg-soft-warm px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-foreground">Fresh produce</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted">
                <span aria-hidden="true" className="text-foreground">★★★★★</span>
                Customer favorite
              </span>
            </div>

            <h1 className="text-[27px] font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-[32px]" id="product-title">
              Fresh strawberries
            </h1>
            <p className="mt-2 text-xs text-muted">Sweet, bright berries for everyday moments.</p>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[27px] font-bold tracking-tight text-foreground">$4.99</span>
              <span className="text-xs text-muted">/ 250 g pack</span>
            </div>

            <p className="mt-4 max-w-lg text-[13px] leading-6 text-muted">
              Enjoy naturally sweet strawberries, carefully selected for their
              fresh flavor. Perfect for a quick snack, breakfast bowls, or
              sharing over dessert.
            </p>

            <div className="my-5 flex items-center gap-2 border-y border-border py-3">
              <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-category-organic text-[11px] font-bold text-foreground">✓</span>
              <span className="text-xs font-semibold text-foreground">In stock</span>
              <span className="text-[11px] text-muted">· Freshness guaranteed</span>
            </div>

            <PurchasePanel />

            <div className="mt-5 rounded-[var(--farmart-radius-card)] bg-neutral p-4">
              <h2 className="mb-1 text-xs font-bold">Fresh groceries, delivered with care</h2>
              <p className="text-[11px] leading-5 text-muted">
                Delivery options and availability are shown at checkout. Keep
                berries refrigerated and enjoy while fresh.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-border pt-8" aria-labelledby="details-heading">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">Product information</p>
          <h2 className="mb-5 text-xl font-bold" id="details-heading">Good to know</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-[var(--farmart-radius-card)] border border-border p-4">
              <h3 className="text-xs font-bold">Pack size</h3>
              <p className="mt-1 text-[11px] text-muted">250 g · one convenient pack</p>
            </article>
            <article className="rounded-[var(--farmart-radius-card)] border border-border p-4">
              <h3 className="text-xs font-bold">Storage</h3>
              <p className="mt-1 text-[11px] text-muted">Keep refrigerated for freshness.</p>
            </article>
            <article className="rounded-[var(--farmart-radius-card)] border border-border p-4">
              <h3 className="text-xs font-bold">Serving ideas</h3>
              <p className="mt-1 text-[11px] text-muted">Enjoy on their own, with breakfast, or in desserts.</p>
            </article>
          </div>
        </section>

        <section className="mt-12 border-t border-border pt-8" aria-labelledby="related-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">Picked to go together</p>
              <h2 className="text-xl font-bold" id="related-heading">You might also like</h2>
            </div>
            <Link className="text-[11px] text-muted transition-colors duration-150 hover:text-primary" href="/#featured">Browse more <span aria-hidden="true">⟶</span></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard
                colorClass={product.colorClass}
                href="/#featured"
                icon={product.icon}
                key={product.name}
                label={product.label}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
