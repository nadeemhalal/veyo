import Link from "next/link";
import { cn } from "@/lib/utils";

// The "!" mark: a bar that tapers from wide at the top to narrow at the bottom, plus a dot.
// In the wordmark the bar uses the text colour and only the dot is Signal lime.
// The full-lime version is reserved for the standalone icon (src/app/icon.svg).
export function VeyoMark({ className, barClassName = "fill-primary", dotClassName = "fill-brand" }: { className?: string; barClassName?: string; dotClassName?: string }) {
  return (
    <svg viewBox="0 0 10 26" className={className} aria-hidden="true" focusable="false">
      <path
        className={barClassName}
        d="M5 0C6.9 0 8.1 1.3 7.9 3.2L6.2 17.4C6.1 18.3 5.6 18.9 5 18.9C4.4 18.9 3.9 18.3 3.8 17.4L2.1 3.2C1.9 1.3 3.1 0 5 0Z"
      />
      <circle className={dotClassName} cx="5" cy="23.2" r="2.6" />
    </svg>
  );
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    // items-baseline puts the bottom of the mark (the dot) on the text baseline, not the descender line.
    <Link href={href} className={cn("inline-flex items-baseline font-logo leading-none", className)} aria-label="Veyo Media home">
      <span className="text-[26px] font-semibold tracking-[-0.04em] text-primary">veyo</span>
      <VeyoMark className="ml-px h-[19px] w-auto" />
    </Link>
  );
}
