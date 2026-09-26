import type { Metadata } from "next";
import { FinalCta } from "@/components/site/blocks";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Insights",
  description: "Meta ads teardowns, tactics and compliance notes for Australian ecommerce brands.",
};

// Planned topics. Replace with real posts as they're published.
const upcoming = [
  { tag: "Teardown", title: "What the top PDRN skincare ads in Australia have in common" },
  { tag: "How-to", title: "Advantage+ Shopping campaigns for Shopify brands in Australia" },
  { tag: "Compliance", title: "5 ad claims that can get Australian skincare brands in trouble" },
  { tag: "Account lessons", title: "One ad hit 149x ROAS. Here's why we don't chase unicorn ads" },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="The Veyo Teardown"
        intro="Weekly breakdowns of real Meta ads, practical tactics and the rules Australian brands need to know."
      />
      <Section eyebrow="Coming soon" title="First posts in the pipeline">
        <ul className="grid gap-4 md:grid-cols-2">
          {upcoming.map((p) => (
            <li key={p.title} className="rounded-xl border bg-card p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.tag}</span>
              <p className="mt-2 font-heading text-lg font-semibold">{p.title}</p>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCta />
    </>
  );
}
