import Link from "next/link";

type ProductCardProps = {
  label: string;
  name: string;
  icon: string;
  colorClass: string;
  href: string;
  price?: string;
};

export default function ProductCard({
  label,
  name,
  icon,
  colorClass,
  href,
  price,
}: ProductCardProps) {
  return (
    <Link
      className={`flex min-h-[170px] flex-col items-start justify-end overflow-hidden rounded-[var(--farmart-radius-card)] border border-transparent p-3.5 transition-colors duration-150 hover:border-primary ${colorClass}`}
      href={href}
    >
      <span className="mx-auto mt-0 self-center text-[43px] leading-none" aria-hidden="true">{icon}</span>
      <span className="mt-auto block text-[9px] font-bold uppercase tracking-[0.12em] text-foreground">{label}</span>
      <strong className="mt-1 text-[13px] font-bold text-foreground">{name}</strong>
      {price && <span className="mt-1 text-[11px] text-muted">{price}</span>}
    </Link>
  );
}
