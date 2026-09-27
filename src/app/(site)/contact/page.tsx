import type { Metadata } from "next";
import { site } from "@/lib/site";
import { AuditForm } from "@/components/site/audit-form";
import { CtaLink } from "@/components/site/cta-link";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call or request a free Meta ads audit from Veyo Media.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk ads. We'll bring the opinions." intro={`We reply within one business day, ${site.hours}.`} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-semibold">Book a call</h2>
              <p className="mt-2 text-muted-foreground">A 20-minute call to see if we&apos;re a fit. No pitch deck, no pressure.</p>
              <CtaLink href={site.bookingUrl} className="mt-4">Book a call</CtaLink>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-2 inline-block text-primary underline">{site.email}</a>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">Agencies</h2>
              <p className="mt-2 text-muted-foreground">
                Need a white-label Meta specialist for your ecommerce clients? Mention it in your message.
              </p>
            </div>
          </div>
          <AuditForm />
        </div>
      </Section>
    </>
  );
}
