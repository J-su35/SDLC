"use client";

import { useState } from "react";

const buttonClass =
  "inline-flex h-10 items-center justify-center rounded-[var(--farmart-radius-control)] px-4 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export default function PurchasePanel() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function changeQuantity(nextQuantity: number) {
    setQuantity(Math.min(99, Math.max(1, nextQuantity)));
    setAdded(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex h-10 items-center rounded-[var(--farmart-radius-control)] border border-border">
          <button
            aria-label="Decrease quantity"
            className="h-full w-10 rounded-l-[var(--farmart-radius-control)] text-base text-foreground transition-colors duration-150 hover:bg-neutral disabled:cursor-not-allowed disabled:text-muted"
            disabled={quantity === 1}
            onClick={() => changeQuantity(quantity - 1)}
            type="button"
          >
            −
          </button>
          <output aria-label="Quantity" className="min-w-8 text-center text-xs font-bold" aria-live="polite">
            {quantity}
          </output>
          <button
            aria-label="Increase quantity"
            className="h-full w-10 rounded-r-[var(--farmart-radius-control)] text-base text-foreground transition-colors duration-150 hover:bg-neutral disabled:cursor-not-allowed disabled:text-muted"
            disabled={quantity === 99}
            onClick={() => changeQuantity(quantity + 1)}
            type="button"
          >
            +
          </button>
        </div>
        <button
          className={`${buttonClass} flex-1 bg-primary text-foreground hover:bg-soft-warm sm:flex-none`}
          onClick={() => setAdded(true)}
          type="button"
        >
          {added ? `Added ${quantity} ${quantity === 1 ? "pack" : "packs"}` : "Add to cart"}
          {!added && <span className="ml-2">${(4.99 * quantity).toFixed(2)}</span>}
        </button>
      </div>
      <p aria-live="polite" className={`min-h-5 text-[11px] ${added ? "text-foreground" : "text-muted"}`}>
        {added
          ? `${quantity} ${quantity === 1 ? "pack" : "packs"} added to your cart.`
          : "Freshness guaranteed. Add to your cart whenever you're ready."}
      </p>
    </div>
  );
}
