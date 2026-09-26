import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/posts";
import { FinalCta } from "@/components/site/blocks";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Insights",
  description: "Meta ads teardowns, tactics and compliance notes for Australian ecommerce brands.",
};

// Shown until the first posts are published.
const upcoming = [
  { tag: "Teardown", title: "What the top PDRN skincare ads in Australia have in common" },
  { tag: "How-to", title: "Advantage+ Shopping campaigns for Shopify brands in Australia" },
  { tag: "Compliance", title: "5 ad claims that can get Australian skincare brands in trouble" },
  { tag: "Account lessons", title: "One ad hit 149x ROAS. Here's why we don't chase unicorn ads" },
];

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="The Veyo Teardown"
        intro="Breakdowns of real Meta ads, practical tactics and the rules Australian brands need to know."
      />

      {posts.length > 0 ? (
        <Section>
          <ul className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-primary">{p.tag}</span>
                    {p.draft && <span className="rounded bg-destructive/10 px-2 py-0.5 font-semibold text-destructive">Draft</span>}
                  </div>
                  <h2 className="mt-2 font-heading text-xl font-bold tracking-tight group-hover:underline">{p.title}</h2>
                  <p className="mt-2 flex-1 text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <time dateTime={p.date.toISOString()}>{formatPostDate(p.date)}</time> · {p.readingMinutes} min read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
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
      )}

      <FinalCta />
    </>
  );
}
