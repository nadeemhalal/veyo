import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = { title: "Terms", robots: { index: false } };

// DRAFT: have this reviewed by a lawyer before launch.
export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of service" intro="Draft. Last updated: [date]." />
      <Section>
        <div className="max-w-3xl space-y-6 text-muted-foreground [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
          <h2>Services</h2>
          <p>Scope, deliverables and fees are set out in your proposal or plan.</p>
          <h2>Term and cancellation</h2>
          <p>Plans run month-to-month. Either party can cancel with 30 days&apos; written notice.</p>
          <h2>Ad spend</h2>
          <p>Ad spend is paid by you directly to Meta and is not included in our fees.</p>
          <h2>Ownership</h2>
          <p>You own your ad accounts, pixels, audiences, data and the creative you pay for.</p>
          <h2>Results</h2>
          <p>Advertising results depend on many factors outside our control. We don&apos;t guarantee specific outcomes.</p>
        </div>
      </Section>
    </>
  );
}
