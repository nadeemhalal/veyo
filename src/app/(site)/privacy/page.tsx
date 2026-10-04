import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Section } from "@/components/site/section";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false } };

// DRAFT: have this reviewed by a lawyer before launch. It should reflect how you
// actually store leads (e.g. Supabase), any analytics/pixel you add, and the
// Australian Privacy Principles.
export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy" intro="Draft. Last updated: [date]." />
      <Section>
        <div className="max-w-3xl space-y-6 text-muted-foreground [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
          <h2>What we collect</h2>
          <p>When you request an audit or contact us, we collect your name, email, store URL, ad spend range and any message you send. When you use our audit checklist, we collect your name, organisation, email, your answers and score, and whether you&apos;d like tips by email.</p>
          <h2>How we use it</h2>
          <p>Only to respond to you, prepare your audit and provide our services. We don&apos;t sell your information.</p>
          <h2>Where it&apos;s stored</h2>
          <p>Form submissions are stored securely in our database provider, Supabase. [Confirm the storage region before launch.] Only our team can access them. Audit reports are sent using our email provider, Resend.</p>
          <h2>Ad account access</h2>
          <p>We access ad accounts only through Meta Business Manager partner access that you grant and can remove at any time. We never ask for passwords.</p>
          <h2>Cookies and tracking</h2>
          <p>[Describe any analytics or advertising pixels used on this site.]</p>
          <h2>Contact</h2>
          <p>Questions or requests to access or delete your data: {site.email}.</p>
        </div>
      </Section>
    </>
  );
}
