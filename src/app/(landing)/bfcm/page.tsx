import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { BookOpen, Check } from "lucide-react";
import { bfcm, site } from "@/lib/site";
import { AuditForm } from "@/components/site/audit-form";
import { StatsRow } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { Section } from "@/components/site/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = pageMetadata({
  title: `Black Friday ${bfcm.year} Meta ads for Australian brands`,
  description:
    "Get your Meta ads ready for Click Frenzy, Black Friday and Cyber Monday. Free playbook, plus a fixed-fee 6-week BFCM Sprint for Australian ecommerce brands.",
  path: "/bfcm",
});

export default function BfcmPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-brand-foreground">
              Black Friday {bfcm.year} · {bfcm.blackFriday}
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Win BFCM in October, not on the day.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              The brands that do well over Click Frenzy and Black Friday build their audiences weeks before the sale.
              Get the free playbook, or let us run the whole season for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/bfcm/playbook" variant="brand" arrow>
                Read the free playbook
              </CtaLink>
              <a
                href="#sprint"
                className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:bg-white/10"
              >
                See the BFCM Sprint
              </a>
            </div>
          </div>
          <Link
            href="/bfcm/playbook"
            className="group rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:bg-white/10 sm:p-8"
          >
            <BookOpen className="size-8 text-brand" aria-hidden="true" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-brand">Free playbook</p>
            <p className="mt-2 font-heading text-2xl font-bold">The Aussie BFCM Meta Ads Playbook</p>
            <ul className="mt-5 space-y-2 text-sm text-primary-foreground/80">
              {["Key dates and an 8-week timeline", "How to work out your break-even ROAS", "Offers that protect your margin", "Creative, budget and measurement checklists"].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-brand group-hover:underline">Read it now, free →</p>
          </Link>
        </div>
      </section>

      {/* Dates */}
      <Section id="dates" eyebrow="The season" title="The dates that matter">
        <ol className="grid gap-4 md:grid-cols-5">
          {bfcm.keyDates.map((d) => (
            <li key={d.label} className="rounded-xl border bg-card p-5">
              <p className="font-mono text-xs font-semibold text-primary">{d.date}</p>
              <h3 className="mt-2 font-heading font-semibold">{d.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Sprint */}
      <Section id="sprint" tone="muted" eyebrow="BFCM Sprint" title="We'll run your whole sale season. Fixed fee, no retainer.">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <ol className="space-y-4">
            {bfcm.sprintWeeks.map((w) => (
              <li key={w.when} className="flex gap-4 rounded-xl border bg-card p-5">
                <span className="w-20 shrink-0 font-mono text-sm font-semibold text-primary">{w.when}</span>
                <div>
                  <h3 className="font-heading font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="h-fit rounded-xl border-2 border-primary bg-card p-6 sm:p-8">
            <p className="text-sm font-semibold text-muted-foreground">6-week BFCM Sprint</p>
            <p className="mt-2 font-heading text-4xl font-bold tracking-tight">{bfcm.sprintPrice}</p>
            <p className="text-sm text-muted-foreground">flat fee + GST where applicable. Ad spend paid directly to Meta.</p>
            <ul className="my-6 space-y-3 text-sm">
              {bfcm.sprintIncludes.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <CtaLink href="#apply" className="w-full" arrow>
              Apply for a Sprint spot
            </CtaLink>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              We cap the number of Sprint brands so every account gets daily attention through the peak.
            </p>
          </div>
        </div>
      </Section>

      {/* Proof */}
      <Section id="proof" eyebrow="Who runs it" title="A Meta specialist who's run Australian accounts for two years">
        <StatsRow />
        <p className="mt-4 text-sm text-muted-foreground">Past results don&apos;t guarantee future performance.</p>
      </Section>

      {/* Agencies */}
      <Section id="agencies" tone="dark" eyebrow="For agencies" title="Stretched thin for BFCM? Borrow a Meta specialist.">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <p className="text-lg text-primary-foreground/80">
            November is the busiest month of the year for agencies. We&apos;ll run Meta ads for your ecommerce clients
            under your brand through the peak. White-label reports, NDA and non-solicitation signed, and no long-term
            commitment.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/agencies" variant="brand" arrow>
              White label details
            </CtaLink>
            <a
              href={`mailto:${site.email}?subject=BFCM%20overflow%20capacity`}
              className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="BFCM questions">
        <div className="max-w-3xl">
          <Accordion className="rounded-xl border bg-card px-5">
            {bfcm.faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Apply */}
      <section id="apply" className="border-t bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight">Apply for a BFCM Sprint</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Tell us about your store. We&apos;ll reply within one business day with a quick review and whether the Sprint is a
            fit.
          </p>
          <AuditForm className="mt-8" source="bfcm" submitLabel="Apply for a Sprint" />
        </div>
      </section>
    </>
  );
}
