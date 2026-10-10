import type { Metadata } from "next";
import { breadcrumbJsonLd, serviceJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import { Check, ShieldCheck } from "lucide-react";
import { site, whiteLabel } from "@/lib/site";
import { StatsRow } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = pageMetadata({
  title: "White-label Meta ads for Australian agencies",
  description:
    "White-label Meta ads management for Australian agencies. We run your ecommerce clients' Facebook and Instagram ads under your brand.",
  path: "/agencies",
});

export default function AgenciesPage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd("White-label Meta ads for agencies", metadata.description as string, "/agencies"), breadcrumbJsonLd([{ name: "Agencies", path: "/agencies" }])]} />
      <PageHero eyebrow="White label for agencies" title={whiteLabel.headline} intro={whiteLabel.intro}>
        <CtaLink href={site.bookingUrl} arrow>Book a partner call</CtaLink>
        <CtaLink href="#pricing" variant="outline">See partner pricing</CtaLink>
      </PageHero>

      <Section eyebrow="Why partner with us" title="Offer Meta ads without building a team">
        <div className="grid gap-6 sm:grid-cols-2">
          {whiteLabel.benefits.map((b) => (
            <article key={b.title} className="rounded-xl border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Track record" title="Already trusted by Australian agencies">
        <StatsRow />
      </Section>

      <Section eyebrow="How it works" title="From first call to first report in about a week">
        <ol className="grid gap-6 md:grid-cols-4">
          {whiteLabel.howItWorks.map((s) => (
            <li key={s.step} className="rounded-xl border bg-card p-6">
              <span className="font-mono text-sm font-semibold text-primary">{s.step}</span>
              <h3 className="mt-2 font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" eyebrow="What's included" title="Everything your clients need, delivered under your name">
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="space-y-3">
            {whiteLabel.included.map((i) => (
              <li key={i} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              <h3 className="font-heading font-semibold">Your clients stay yours</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {whiteLabel.promises.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="pricing" eyebrow="Partner pricing" title="Wholesale rates with room for your margin">
        <div className="grid gap-6 md:grid-cols-2">
          {whiteLabel.pricing.map((p) => (
            <article key={p.label} className="rounded-xl border bg-card p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-muted-foreground">{p.label}</h3>
              <p className="mt-2 font-heading text-3xl font-bold tracking-tight">{p.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">+ GST where applicable. Ad spend is paid by your client directly to Meta.</p>
      </Section>

      <Section tone="dark">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Have clients asking for Meta ads?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Book a 20-minute partner call. We&apos;ll talk through your clients, your process and whether we&apos;re a fit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={site.bookingUrl} variant="brand" arrow>Book a partner call</CtaLink>
            <a href={`mailto:${site.email}?subject=White-label%20partnership`} className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:bg-white/10">
              Email us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
