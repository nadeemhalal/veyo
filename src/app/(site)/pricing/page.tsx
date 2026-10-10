import type { Metadata } from "next";
import { faqs } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import { Faq, FinalCta, PlanGrid } from "@/components/site/blocks";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = pageMetadata({
  title: "Meta ads management pricing for Australian ecommerce brands",
  description:
    "Transparent Meta ads management pricing for Australian ecommerce brands. Creative included, month-to-month.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }])]} />
      <PageHero
        eyebrow="Pricing"
        title="Prices you can see without booking a call."
        intro="Choose a plan based on your monthly Meta ad spend. Every plan is month-to-month with 30 days' notice."
      />
      <Section>
        <PlanGrid />
        <div className="mt-10 rounded-xl border bg-muted/50 p-6">
          <h2 className="font-heading text-lg font-semibold">Start with a 30-day pilot</h2>
          <p className="mt-2 text-muted-foreground">
            Not sure yet? Start with a one-month pilot on any plan. If it&apos;s not working for you, you walk away with
            your account, your data and everything we learned.
          </p>
        </div>
      </Section>
      <Section tone="muted" eyebrow="FAQ" title="Pricing questions">
        <div className="max-w-3xl">
          <Faq />
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
