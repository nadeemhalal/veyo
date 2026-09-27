import type { Metadata } from "next";
import { publishedCaseStudies } from "@/lib/site";
import { FinalCta, StatsRow } from "@/components/site/blocks";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Meta ads results for Australian ecommerce brands, with spend, revenue, time period and attribution shown.",
};

const howWeMeasure = [
  "Every result shows ad spend, revenue and the time period.",
  "We state the attribution window (for example 7-day click, 1-day view).",
  "Where we can, we show MER (total revenue ÷ total ad spend) from store data, not just Meta's numbers.",
  "We only publish results with the client's permission. Some clients are anonymised.",
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Receipts, with context."
        intro="Big numbers without context are easy to fake. Ours come with spend, time period and attribution, so you can judge them properly."
      />

      <Section eyebrow="Overall" title="Across the accounts we manage">
        <StatsRow />
      </Section>

      <Section tone="muted" eyebrow="Case studies" title={publishedCaseStudies.length ? "Selected results" : "Detailed case studies are on the way"}>
        {publishedCaseStudies.length === 0 ? (
          <p className="max-w-3xl text-lg text-muted-foreground">
            We&apos;re preparing detailed, anonymised case studies with our clients&apos; permission. In the meantime, book a free audit and we&apos;ll walk you through real
            examples on a call.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {publishedCaseStudies.map((c) => (
              <article key={c.slug} className="rounded-xl border bg-card p-6">
                <p className="text-sm font-semibold text-primary">{c.category}</p>
                <h3 className="mt-1 font-heading text-xl font-bold">{c.client}</h3>
                <p className="mt-3 text-muted-foreground">{c.challenge}</p>
                <dl className="mt-5 grid grid-cols-3 gap-3">
                  {c.results.map((r) => (
                    <div key={r.label}>
                      <dt className="text-xs text-muted-foreground">{r.label}</dt>
                      <dd className="order-first font-heading text-2xl font-bold">{r.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">
                  {c.period} · Attribution: {c.attribution}
                </p>
              </article>
            ))}
          </div>
        )}
      </Section>

      <Section eyebrow="Method" title="How we measure results">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground">
          {howWeMeasure.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">Past results don&apos;t guarantee future performance.</p>
      </Section>

      <FinalCta />
    </>
  );
}
