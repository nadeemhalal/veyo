import type { Metadata } from "next";
import { Check } from "lucide-react";
import { steps } from "@/lib/site";
import { FinalCta, StatsRow } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Meta ads management for Australian ecommerce brands",
  description:
    "Facebook and Instagram ads management for Australian ecom brands: structure, testing, creative and P&L reporting. Month-to-month.",
};

const included = [
  "Account, pixel and Conversions API health check",
  "Campaign structure: Advantage+ Shopping plus controlled tests",
  "Audience, placement and budget strategy",
  "Weekly (or fortnightly) optimisation",
  "Creative testing plan with new ads every month",
  "Reporting on spend, revenue, MER and new-customer cost",
];

const notIncluded = [
  "Ad spend, which you pay directly to Meta",
  "Creator fees for UGC videos, quoted separately if you want them",
  "Website builds (we'll recommend fixes and can refer a developer)",
];

export default function MetaAdsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meta ads management"
        title="Facebook & Instagram ads, run by someone who genuinely enjoys spreadsheets"
        intro="We plan, launch, test and scale your Meta ads, then report the results against your store data so you know what's really profitable."
      >
        <CtaLink href="/services/audit" arrow>Get a free ad audit</CtaLink>
        <CtaLink href="/pricing" variant="outline">See pricing</CtaLink>
      </PageHero>

      <Section eyebrow="Track record" title="What we've delivered so far">
        <StatsRow />
      </Section>

      <Section tone="muted" eyebrow="What's included" title="Everything needed to run Meta ads properly">
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="space-y-3">
            {included.map((i) => (
              <li key={i} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-heading font-semibold">Not included</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {notIncluded.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Process" title="How an engagement runs">
        <ol className="grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.step} className="rounded-xl border bg-card p-6">
              <span className="font-mono text-sm font-semibold text-primary">{s.step}</span>
              <h3 className="mt-2 font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="offer" tone="muted" eyebrow="Offer & landing pages" title="Ads can only sell what the page and offer allow">
        <p className="max-w-3xl text-lg text-muted-foreground">
          Many accounts don&apos;t have an ads problem. They have an offer or landing page problem. We review bundles,
          price points, shipping thresholds and product pages, and tell you exactly what to change to lift conversion
          and order value.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
