"use client";

import { useRef, type MouseEvent } from "react";

export default function DialogExample() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      event.currentTarget.close();
    }
  }

  return (
    <>
      <button
        className="h-[34px] rounded-[var(--farmart-radius-control)] bg-primary px-4 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        onClick={openDialog}
        type="button"
      >
        Preview dialog
      </button>

      <dialog
        aria-labelledby="add-item-title"
        aria-describedby="add-item-description"
        className="m-auto w-[calc(100%-32px)] max-w-[440px] rounded-[var(--farmart-radius-card)] border border-border bg-canvas p-0 text-foreground backdrop:bg-[rgba(40,51,66,0.5)]"
        onClick={closeOnBackdrop}
        ref={dialogRef}
      >
        <form method="dialog">
          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">Shopping list</p>
              <h2 className="text-lg font-bold leading-tight" id="add-item-title">Add fresh strawberries?</h2>
            </div>
            <button
              aria-label="Close dialog"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--farmart-radius-control)] text-lg text-muted transition-colors duration-150 hover:bg-neutral hover:text-foreground focus-visible:outline-2 focus-visible:outline-foreground"
              type="submit"
              value="cancel"
            >
              ×
            </button>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-3 rounded-[var(--farmart-radius-card)] bg-soft-warm p-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--farmart-radius-control)] bg-canvas text-2xl" aria-hidden="true">🍓</span>
              <div className="min-w-0">
                <p className="text-xs font-bold">Fresh strawberries</p>
                <p className="mt-1 text-[11px] text-muted">$4.99 / pack</p>
              </div>
              <span className="ml-auto text-[11px] font-bold text-foreground">1 pack</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted" id="add-item-description">
              Add this fresh pick to your shopping list. You can review your items
              before checkout.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border bg-neutral p-4 sm:flex-row sm:justify-end">
            <button
              className="h-[34px] rounded-[var(--farmart-radius-control)] border border-border bg-canvas px-4 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              type="submit"
              value="cancel"
            >
              Keep browsing
            </button>
            <button
              autoFocus
              className="h-[34px] rounded-[var(--farmart-radius-control)] bg-primary px-4 text-[11px] font-bold text-foreground transition-colors duration-150 hover:bg-soft-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              type="submit"
              value="confirm"
            >
              Add to list
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
