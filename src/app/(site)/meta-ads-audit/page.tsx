import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AuditChecklistGame } from "@/components/site/audit-checklist-game";

export const metadata: Metadata = pageMetadata({
  title: "Free Meta Ads Audit Checklist for Australian Ecommerce Brands",
  description:
    "A free 60-point self-audit of your Meta ads: tracking, structure, audiences, creative, landing pages, reporting and Australian compliance. Get your score and fix list by email.",
  path: "/meta-ads-audit",
});

export default function MetaAdsAuditPage() {
  return (
    <>
      <section className="border-b bg-muted/40 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Free 60-point Meta ads audit</p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">How leaky are your Meta ads?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Tick through 7 sections, get a score out of 60, and find out exactly what to fix first. Honest answers only.
            We can&apos;t see your ticks, but Meta can see your results.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <AuditChecklistGame />
      </div>
    </>
  );
}
