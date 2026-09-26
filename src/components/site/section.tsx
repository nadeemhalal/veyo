import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  tone?: "default" | "muted" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "muted" && "bg-muted/60",
        tone === "dark" && "bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className={cn("mb-3 text-sm font-semibold uppercase tracking-wider", tone === "dark" ? "text-brand" : "text-primary")}>
                {eyebrow}
              </p>
            )}
            {title && <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>}
            {intro && (
              <p className={cn("mt-4 text-lg", tone === "dark" ? "text-primary-foreground/80" : "text-muted-foreground")}>{intro}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="border-b bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
