import type { Metadata } from "next";
import { breadcrumbJsonLd, serviceJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import { FinalCta } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = pageMetadata({
  title: "Ad creative & UGC for Facebook and Instagram ads",
  description:
    "Hooks, scripts, statics and creator videos made for the Facebook and Instagram feed, with fresh creative every month.",
  path: "/services/creative",
});

const formats = [
  { title: "Hooks & scripts", body: "The first three seconds decide everything. We write and test hook variations for every concept." },
  { title: "Static & carousel ads", body: "Offer-led and benefit-led statics that are fast to test and easy to iterate." },
  { title: "UGC & creator videos", body: "We brief creators, direct the content and edit it into ads that feel native to the feed." },
  { title: "Iterations of winners", body: "When an ad works, we build variations fast, before fatigue sets in." },
];

export default function CreativePage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd("Ad creative & UGC", metadata.description as string, "/services/creative"), breadcrumbJsonLd([{ name: "Ad creative & UGC", path: "/services/creative" }])]} />
      <PageHero
        eyebrow="Ad creative & UGC"
        title="Targeting is automated. Creative is your unfair advantage."
        intro="Targeting is mostly automated now. What you show people decides your results. Every Veyo plan includes new creative every month."
      >
        <CtaLink href="/services/audit" arrow>Get a free ad audit</CtaLink>
      </PageHero>

      <Section eyebrow="Formats" title="What we make">
        <div className="grid gap-6 sm:grid-cols-2">
          {formats.map((f) => (
            <article key={f.title} className="rounded-xl border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="How we test" title="A testing engine, not one-off ads">
        <ol className="max-w-3xl list-decimal space-y-3 pl-5 text-lg text-muted-foreground">
          <li>Start from real customer language: reviews, comments and support questions.</li>
          <li>Turn it into angles, then write several hooks for each angle.</li>
          <li>Test in a structure that isolates what&apos;s working.</li>
          <li>Scale winners, retire losers, and feed what we learn into next month&apos;s batch.</li>
        </ol>
      </Section>

      <FinalCta />
    </>
  );
}
