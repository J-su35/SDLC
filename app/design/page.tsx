import Link from "next/link";
import DialogExample from "./dialog-example";

const colors = [
  { name: "Primary orange", value: "#FF7417", token: "--farmart-primary" },
  { name: "Foreground", value: "#283342", token: "--farmart-foreground" },
  { name: "Muted", value: "#788291", token: "--farmart-muted" },
  { name: "Canvas", value: "#FFFFFF", token: "--farmart-canvas" },
  { name: "Neutral", value: "#F2F3F5", token: "--farmart-neutral" },
  { name: "Promo yellow", value: "#FFCC0B", token: "--farmart-promo-yellow" },
  { name: "Warm tint", value: "#FFF8F1", token: "--farmart-soft-warm" },
  { name: "Snacks", value: "#F4E7FF", token: "--farmart-category-snacks" },
  { name: "Soup", value: "#FFFBEA", token: "--farmart-category-soup" },
  { name: "Soda", value: "#C9F9EF", token: "--farmart-category-soda" },
  { name: "Organic", value: "#DCFBEA", token: "--farmart-category-organic" },
];

const spacing = [
  { name: "Small", value: "4px", variable: "--farmart-space-sm", width: "w-1" },
  { name: "Medium", value: "12px", variable: "--farmart-space-md", width: "w-3" },
  { name: "Large", value: "20px", variable: "--farmart-space-lg", width: "w-5" },
  { name: "Section", value: "36px", variable: "--farmart-space-section", width: "w-9" },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-canvas text-foreground">
      <header className="border-b border-border">
        <div className="page-width flex min-h-14 items-center justify-between gap-4">
          <Link className="flex items-center gap-2 font-bold text-foreground" href="/" aria-label="Farmart storefront">
            <span aria-hidden="true">🌾</span>
            <span>Farmart <span className="font-normal text-muted">/ Design system</span></span>
          </Link>
          <Link className="text-[11px] font-bold text-foreground transition-colors duration-150 hover:text-primary" href="/">Back to storefront <span aria-hidden="true">⟶</span></Link>
        </div>
      </header>

      <div className="page-width pb-16 pt-10">
        <section className="mb-12">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">Farmart · UI foundations</p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A fresh, practical design system.</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            A friendly and efficient visual language for everyday grocery shopping.
            Use these shared foundations and components to keep the storefront clear,
            approachable, and consistent.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="color-heading">
          <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">01 · Foundations</p>
              <h2 className="text-xl font-bold" id="color-heading">Color palette</h2>
            </div>
            <span className="text-[11px] text-muted">11 shared color tokens</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((color) => (
              <article className="overflow-hidden rounded-[var(--farmart-radius-card)] border border-border bg-canvas" key={color.token}>
                <div className="h-20 border-b border-border" style={{ backgroundColor: `var(${color.token})` }} />
                <div className="p-3">
                  <h3 className="text-xs font-bold">{color.name}</h3>
                  <p className="mt-1 font-mono text-[10px] text-muted">{color.value}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-muted">
            Use deep slate for copy on orange actions to keep button labels legible.
            Reserve muted slate for secondary information.
          </p>
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div aria-labelledby="type-heading">
            <div className="mb-4 border-b border-border pb-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">02 · Foundations</p>
              <h2 className="text-xl font-bold" id="type-heading">Typography</h2>
            </div>
            <div className="space-y-5">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.1em] text-muted">Heading · 19px · bold</p>
                <p className="text-[19px] font-bold leading-tight">Everyday goodness, made simple.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.1em] text-muted">Body · 13px · regular</p>
                <p className="text-[13px] leading-[1.5]">Find fresh groceries and useful offers for your weekly shop.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.1em] text-muted">Utility · 11px · semibold</p>
                <p className="text-[11px] font-semibold">DELIVERY · CATEGORY · ACCOUNT</p>
              </div>
              <p className="text-[11px] text-muted">Arial, Helvetica, sans-serif</p>
            </div>
          </div>

          <div aria-labelledby="spacing-heading">
            <div className="mb-4 border-b border-border pb-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">03 · Foundations</p>
              <h2 className="text-xl font-bold" id="spacing-heading">Spacing & shapes</h2>
            </div>
            <div className="space-y-4">
              {spacing.map((step) => (
                <div className="flex items-center gap-3" key={step.variable}>
                  <div className={`h-3 shrink-0 rounded-sm bg-primary ${step.width}`} />
                  <span className="w-16 text-xs font-bold">{step.name}</span>
                  <code className="text-[10px] text-muted">{step.value}</code>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex h-10 w-24 items-center justify-center rounded-[var(--farmart-radius-control)] border border-border bg-neutral text-[10px] font-semibold">4px · controls</div>
                <div className="flex h-10 w-24 items-center justify-center rounded-[var(--farmart-radius-card)] border border-border bg-neutral text-[10px] font-semibold">7px · cards</div>
              </div>
              <p className="text-[11px] text-muted">Content width: 974px maximum · 20px page gutters</p>
            </div>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="components-heading">
          <div className="mb-4 border-b border-border pb-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">04 · Patterns</p>
            <h2 className="text-xl font-bold" id="components-heading">Components</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-[var(--farmart-radius-card)] border border-border p-5">
              <h3 className="mb-4 text-xs font-bold">Actions & search</h3>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <button className="h-[29px] rounded-[var(--farmart-radius-control)] bg-primary px-4 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm" type="button">Shop now</button>
                <button className="h-[29px] rounded-[var(--farmart-radius-control)] border border-border bg-canvas px-4 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm" type="button">Learn more</button>
              </div>
              <form className="flex h-9 max-w-md items-center rounded-[var(--farmart-radius-control)] border border-border bg-canvas px-3" role="search">
                <label className="sr-only" htmlFor="design-search">Search products</label>
                <input className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted" id="design-search" placeholder="Search products..." />
                <button className="text-lg text-foreground" type="submit" aria-label="Search">⌕</button>
              </form>
            </article>

            <article className="rounded-[var(--farmart-radius-card)] border border-border p-5">
              <h3 className="mb-4 text-xs font-bold">Promotions</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex min-h-28 items-center justify-between overflow-hidden rounded-[var(--farmart-radius-card)] bg-neutral p-4">
                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.1em]">Fresh drink</p>
                    <p className="text-sm font-bold">Shop fresh</p>
                  </div>
                  <span className="text-4xl" aria-hidden="true">🧃</span>
                </div>
                <div className="flex min-h-28 items-center justify-between overflow-hidden rounded-[var(--farmart-radius-card)] bg-promo-yellow p-4">
                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.1em]">Special offer</p>
                    <p className="text-sm font-bold">20% sale off</p>
                  </div>
                  <span className="text-4xl" aria-hidden="true">📦</span>
                </div>
              </div>
            </article>

            <article className="rounded-[var(--farmart-radius-card)] border border-border p-5 lg:col-span-2">
              <h3 className="mb-4 text-xs font-bold">Category cards</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { icon: "🥦", label: "Fresh produce", color: "bg-soft-warm" },
                  { icon: "🍿", label: "Snacks", color: "bg-category-snacks" },
                  { icon: "🍵", label: "Organic", color: "bg-category-soup" },
                  { icon: "🥤", label: "Drinks", color: "bg-category-soda" },
                ].map((category) => (
                  <div className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-[var(--farmart-radius-card)] border border-border ${category.color}`} key={category.label}>
                    <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                    <span className="text-[10px] font-semibold text-muted">{category.label}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="dialog-heading">
          <div className="mb-4 border-b border-border pb-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">05 · Patterns</p>
            <h2 className="text-xl font-bold" id="dialog-heading">Dialog</h2>
          </div>
          <div className="flex flex-col gap-4 rounded-[var(--farmart-radius-card)] border border-border bg-canvas p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="mb-1 text-xs font-bold">Confirmation dialog</h3>
              <p className="text-[11px] leading-5 text-muted">
                Use a focused, compact modal for a clear decision. The example
                includes a product summary, concise supporting copy, and distinct
                primary and secondary actions.
              </p>
            </div>
            <DialogExample />
          </div>
          <p className="mt-3 text-[10px] leading-5 text-muted">
            Opens as a native modal dialog. Escape, the close button, clicking the
            backdrop, and either action will dismiss it.
          </p>
        </section>

        <aside className="rounded-[var(--farmart-radius-card)] bg-neutral p-5">
          <h2 className="mb-2 text-sm font-bold">Interaction principles</h2>
          <p className="max-w-3xl text-xs leading-5 text-muted">
            Keep the interface flat, responsive, and easy to scan. Use quick 150ms
            color and border transitions; avoid heavy shadows, gradients, and
            dramatic motion. Prefer cheerful product illustrations and concise,
            reassuring copy.
          </p>
        </aside>
      </div>
    </main>
  );
}