import { cn } from "@/lib/utils";
import { VeyoMark } from "./logo";

// "From ~~meh~~ to veyo!" headline. Sizes with the surrounding font size.
export function MehToVeyo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline", className)} aria-label="From meh to veyo!">
      <span aria-hidden="true">
        From{" "}
        <span
          className={cn(
            "line-through decoration-brand decoration-[0.08em]",
            tone === "dark" ? "text-primary-foreground/40" : "text-foreground/35",
          )}
        >
          meh
        </span>{" "}
        to{" "}
        <span className={cn("whitespace-nowrap font-logo tracking-[-0.04em]", tone === "light" && "text-primary")}>
          veyo
          <VeyoMark
            className="ml-[0.04em] inline-block h-[0.73em] w-auto align-baseline"
            barClassName={tone === "dark" ? "fill-primary-foreground" : "fill-current"}
          />
        </span>
      </span>
    </span>
  );
}
