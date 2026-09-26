import type { Metadata } from "next";
import { Check } from "lucide-react";
import { AuditForm } from "@/components/site/audit-form";
import { Faq, StatsRow } from "@/components/site/blocks";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Free Meta ads audit",
  description: "Get a free 10-minute video audit of your Meta ads with three fixes you can use straight away.",
};

const youGet = [
  "A 10-minute personal video walkthrough of your ad account",
  "Three specific fixes, ranked by impact",
  "An honest view on whether you need an agency at all",
];

const checks = [
  "Pixel & Conversions API tracking",
  "Campaign and budget structure",
  "Creative fatigue and testing",
  "Offer and order value",
  "Landing page conversion",
];

export default function AuditPage() {
  return (
    <>
      <section id="hero" className="border-b bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Free Meta ads audit</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Find out what your Meta ads are really costing you
            </h1>
            <ul className="mt-8 space-y-3 text-lg">
              {youGet.map((i) => (
                <li key={i} className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              We only ask for Business Manager partner access. Never your login or password. Limited to 5 audits a month.
            </p>
          </div>
          <AuditForm />
        </div>
      </section>

      <Section id="what-we-check" eyebrow="What we check" title="Five areas where most accounts leak money">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {checks.map((c) => (
            <li key={c} className="rounded-xl border bg-card p-5 font-medium">{c}</li>
          ))}
        </ul>
      </Section>

      <Section id="proof" tone="muted" eyebrow="Who's auditing" title="From a specialist who runs Australian accounts every day">
        <StatsRow />
      </Section>

      <Section id="who-its-for" eyebrow="Who it's for" title="Is this a fit?">
        <p className="max-w-3xl text-lg text-muted-foreground">
          Australian ecommerce brands on Shopify or WooCommerce, spending around A$1,000 or more a month on Meta, or
          about to start. If you&apos;re spending less, we&apos;ll still give you honest advice on what to do yourself.
        </p>
      </Section>

      <Section id="faq" tone="muted" eyebrow="FAQ" title="Questions">
        <div className="max-w-3xl">
          <Faq />
        </div>
      </Section>

      <section id="form-repeat" className="py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="mb-6 text-center font-heading text-3xl font-bold tracking-tight">Get your free audit</h2>
          <AuditForm compact />
        </div>
      </section>
    </>
  );
}
