import Link from "next/link";
import { Check, X } from "lucide-react";
import { comparison, faqs, plans, stats, type Plan } from "@/lib/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CtaLink } from "./cta-link";
import { Section } from "./section";

export function StatsRow({ tone = "default" }: { tone?: "default" | "dark" }) {
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className={cn("rounded-xl border p-6", tone === "dark" ? "border-white/15 bg-white/5" : "bg-card")}>
          <dt className={cn("text-sm", tone === "dark" ? "text-primary-foreground/75" : "text-muted-foreground")}>{s.label}</dt>
          <dd className="order-first mb-2 font-heading text-4xl font-bold tracking-tight">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">Typical agency compared with Veyo Media</caption>
        <thead className="bg-muted/60">
          <tr>
            <th scope="col" className="px-5 py-4 font-semibold"></th>
            <th scope="col" className="px-5 py-4 font-semibold text-muted-foreground">Typical agency</th>
            <th scope="col" className="px-5 py-4 font-semibold text-primary">Veyo Media</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.label} className="border-t">
              <th scope="row" className="px-5 py-4 font-medium">{row.label}</th>
              <td className="px-5 py-4 text-muted-foreground">
                <span className="inline-flex items-start gap-2"><X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />{row.typical}</span>
              </td>
              <td className="px-5 py-4">
                <span className="inline-flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{row.veyo}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-card p-6 sm:p-8",
        plan.highlighted && "border-primary ring-2 ring-primary/20",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
        {plan.highlighted && <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">Most popular</span>}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{plan.fit}</p>
      <p className="mt-6">
        <span className="font-heading text-4xl font-bold tracking-tight">{plan.price}</span>
        <span className="text-muted-foreground">{plan.cadence}</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">+ GST where applicable. Ad spend is paid directly to Meta.</p>
      <ul className="my-6 flex-1 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <CtaLink href="/services/audit" variant={plan.highlighted ? "primary" : "outline"} className="w-full">
        Start with a free audit
      </CtaLink>
    </article>
  );
}

export function PlanGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <PlanCard key={p.name} plan={p} />
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <Accordion className="rounded-xl border bg-card px-5">
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
          <AccordionContent className="pb-4 text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FinalCta() {
  return (
    <Section tone="dark" id="final-cta">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Get a free video audit of your Meta ads
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            A 10-minute walkthrough of your account with three fixes you can use, even if you never hire us.
          </p>
        </div>
        <CtaLink href="/services/audit" variant="brand" arrow>
          Get my free audit
        </CtaLink>
      </div>
    </Section>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-primary underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
