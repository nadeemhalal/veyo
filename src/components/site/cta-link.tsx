import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "brand" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  brand: "bg-brand text-brand-foreground hover:bg-brand/85",
  outline: "border border-border bg-background hover:bg-muted",
  ghost: "hover:bg-muted",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        styles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </Link>
  );
}
