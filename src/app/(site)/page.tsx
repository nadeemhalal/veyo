import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { industries, problems, steps, services, site, trustPoints } from "@/lib/site";
import { ComparisonTable, Faq, FinalCta, PlanGrid, StatsRow } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { MehToVeyo } from "@/components/site/meh-to-veyo";
import { Section } from "@/components/site/section";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: "Meta (Facebook & Instagram) advertising management",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden border-b">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(60%_60%_at_80%_0%,color-mix(in_oklch,var(--brand),transparent_70%),transparent)]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-flex rounded-full border bg-background px-3 py-1 text-sm font-medium">
            Meta ads specialists for Australian ecommerce
          </p>
          <h1 className="max-w-4xl font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <MehToVeyo />
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
            Meta ads for Aussie ecom brands who are done shrugging at their results. Creative included. Reported against
            your P&amp;L, not vanity ROAS. Month-to-month.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink href="/services/audit" arrow>
              Roast my ads (nicely)
            </CtaLink>
            <CtaLink href="/pricing" variant="outline">
              See pricing
            </CtaLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Why brands trust us">
            {trustPoints.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="size-4 text-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <Section id="proof" eyebrow="Track record" title="Receipts, not vibes.">
        <StatsRow />
        <p className="mt-6 text-sm text-muted-foreground">
          Results from accounts we&apos;ve managed for Australian brands and agencies. Past results don&apos;t guarantee
          future performance. <Link href="/case-studies" className="underline">How we measure</Link>.
        </p>
      </Section>

      {/* Problem */}
      <Section id="problem" tone="muted" eyebrow="Sound familiar?" title="Your ads used to work. Now they just… exist.">
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <article key={p.title} className="rounded-xl border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section id="how-we-work" eyebrow="How we work" title="No magic. Just a system that works.">
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

      {/* Services */}
      <Section id="services" tone="muted" eyebrow="Services" title="Everything your ads need. Nothing they don't.">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link key={s.title} href={s.href} className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section id="industries" eyebrow="Industries" title="Especially good with beauty, wellness and fashion">
        <div className="grid gap-4 sm:grid-cols-3">
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="flex items-center justify-between rounded-xl border bg-card p-6 font-heading text-lg font-semibold hover:border-primary">
              {i.name}
              <ArrowRight className="size-5 text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Section>

      {/* White label */}
      <Section id="agencies" tone="dark" eyebrow="For agencies" title="Your logo on the report. Our hands on the keyboard.">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <p className="text-lg text-primary-foreground/80">
            We run Meta ads for Australian agencies under their brand. You keep the client and the margin. We handle
            the media buying, creative testing and white-label reporting.
          </p>
          <div className="space-y-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {["Your branding on every report", "NDA + non-solicitation", "Wholesale per-account pricing", "Scale accounts up or down"].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <CtaLink href="/agencies" variant="brand" arrow>
              Explore white label
            </CtaLink>
          </div>
        </div>
      </Section>

      {/* Difference */}
      <Section id="difference" tone="muted" eyebrow="The difference" title="Why brands break up with their old agency">
        <ComparisonTable />
      </Section>

      {/* Pricing preview */}
      <Section id="pricing-preview" eyebrow="Pricing" title="Pricing you can see without booking a call." intro="Pick the plan that matches your ad spend. Change or cancel with 30 days' notice.">
        <PlanGrid />
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted" eyebrow="FAQ" title="Questions we get (a lot)">
        <div className="max-w-3xl">
          <Faq />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
