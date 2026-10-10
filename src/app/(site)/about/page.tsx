import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { FinalCta, StatsRow } from "@/components/site/blocks";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = pageMetadata({
  title: "About us: Meta ads specialists on Australian hours",
  description:
    "Veyo Media is a Meta ads specialist for Australian ecommerce brands, based in Sri Lanka and working Australian hours.",
  path: "/about",
});

const values = [
  { title: "Honest numbers", body: "We report against your store data and tell you when something isn't working." },
  { title: "You own everything", body: "Your ad account, pixel and audiences stay yours. Always." },
  { title: "Earn it monthly", body: "No lock-in contracts. If we're not adding value, you shouldn't be stuck with us." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Veyo"
        title="We carry your brand forward"
        intro="Veyo comes from the Latin veho, “I carry.” That's the job: carry your brand to the right people, and carry the profit back to you."
      />

      <Section eyebrow="Our story" title="A specialist, not a generalist agency">
        {/* TODO: add founder name, photo and a short personal story */}
        <div className="max-w-3xl space-y-4 text-lg text-muted-foreground">
          <p>
            Veyo Media was started by a Meta ads specialist who has spent two years running ads for Australian brands
            and agencies, managing around A$5,000 a month in spend and driving A$40–50k a month in revenue.
          </p>
          <p>
            We focus on one platform and one type of client: Meta ads for Australian ecommerce brands. That focus is
            why our clients get senior attention, not a rotating cast of juniors.
          </p>
        </div>
      </Section>

      <Section tone="muted" eyebrow="Where we are" title="Based in Sri Lanka. Working Australian hours.">
        <p className="max-w-3xl text-lg text-muted-foreground">
          Our team is based in {site.base} and works {site.hours}. Lower overheads mean small and growing brands get
          specialist-level work at a price they can afford. You get the same responsiveness as a local agency, with
          calls, Loom walkthroughs and replies during your working day.
        </p>
      </Section>

      <Section eyebrow="Track record" title="Results so far">
        <StatsRow />
      </Section>

      <Section tone="muted" eyebrow="How we work" title="What we stand for">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <article key={v.title} className="rounded-xl border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
