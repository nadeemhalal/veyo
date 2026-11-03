import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Check, ShoppingBag } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { leadQuestions, linkedinIntro } from "@/lib/site";
import { AuditForm } from "@/components/site/audit-form";
import { Faq, StatsRow } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { Section } from "@/components/site/section";

// The page linked from LinkedIn outreach. Not for search (noindex, not in the sitemap).
export const metadata: Metadata = pageMetadata({
  title: "Meta ads for Australian ecommerce brands and agencies",
  description: "Facebook and Instagram ads for Australian ecommerce brands, and white-label Meta ads for agencies. Start with a free video audit.",
  path: "/hello",
  noindex: true,
});

const pathIcons = { brands: ShoppingBag, agencies: Building2 };
const { founder } = linkedinIntro;

function Portrait({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image is untested under vinext; the file is a 34 KB webp
    <img src="/images/nads.webp" width={480} height={501} alt={`${founder.name}, founder of Veyo Media (illustrated portrait)`} className={className} />
  );
}

/** "?for=Bloom Skincare" in an outreach link shows "Prepared for Bloom Skincare". Plain text only, kept short. */
function preparedFor(value: string | string[] | undefined): string | null {
  const v = (Array.isArray(value) ? value[0] : value)?.trim();
  return v && /^[\p{L}\p{N} &'.,-]{2,60}$/u.test(v) ? v : null;
}

export default async function HelloPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const forName = preparedFor((await searchParams).for);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-brand-foreground">
              {forName ? `Prepared for ${forName}` : "Hi from Veyo Media"}
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{linkedinIntro.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">{linkedinIntro.intro}</p>
            <div className="mt-6 flex items-center gap-4">
              <Portrait className="size-16 shrink-0 rounded-full border-2 border-brand bg-white object-cover object-top" />
              <p className="max-w-md text-sm font-medium">{founder.hello}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#audit" variant="brand" arrow>
                Get my free video audit
              </CtaLink>
              <a href="#paths" className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:bg-white/10">
                Brand or agency?
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">The free video audit</p>
            <ul className="mt-4 space-y-3">
              {linkedinIntro.auditGets.map((g) => (
                <li key={g} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-primary-foreground/70">No pitch deck, no 45-minute discovery call.</p>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <Section id="paths" eyebrow="Two ways we work" title="Brand or agency, it starts the same way">
        <div className="grid gap-6 md:grid-cols-2">
          {linkedinIntro.paths.map((p) => {
            const Icon = pathIcons[p.id];
            return (
              <article key={p.id} className="flex flex-col rounded-xl border bg-card p-6 sm:p-8">
                <Icon className="size-7 text-primary" aria-hidden="true" />
                <h2 className="mt-4 font-heading text-2xl font-bold">{p.title}</h2>
                <p className="mt-2 flex-1 text-muted-foreground">{p.body}</p>
                <p className="mt-4 font-mono text-sm font-semibold">{p.price}</p>
                <Link href={p.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                  {p.linkLabel} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Who you'll work with */}
      <Section id="founder" tone="muted" eyebrow="Who you'll work with" title={`Hi, I'm ${founder.name}`}>
        <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
          <Portrait className="mx-auto w-48 rounded-2xl border bg-white md:w-full" />
          <div className="max-w-2xl space-y-4 text-lg text-muted-foreground">
            {founder.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Proof */}
      <Section id="proof" eyebrow="Track record" title="Two years running Meta ads for Australian brands and agencies">
        <StatsRow />
        <p className="mt-4 text-sm text-muted-foreground">Past results don&apos;t guarantee future performance.</p>
      </Section>

      {/* Why */}
      <Section id="why" tone="muted" eyebrow="What you get" title="What working with us looks like">
        <ul className="grid gap-3 sm:grid-cols-2">
          {linkedinIntro.why.map((w) => (
            <li key={w} className="flex gap-3 rounded-xl border bg-card p-4 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {w}
            </li>
          ))}
        </ul>
      </Section>

      {/* How the audit works */}
      <Section id="how" eyebrow="How the audit works" title="Three steps, about five minutes of your time">
        <ol className="grid gap-4 md:grid-cols-3">
          {linkedinIntro.auditSteps.map((s) => (
            <li key={s.step} className="rounded-xl border bg-card p-6">
              <span className="font-mono text-sm font-semibold text-primary">{s.step}</span>
              <h3 className="mt-2 font-heading font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Form */}
      <section id="audit" className="scroll-mt-4 border-t py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight">Get your free video audit</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Tell us about your store, or one client account if you&apos;re an agency. We&apos;ll email you to set up partner access.
          </p>
          <AuditForm
            className="mt-8"
            source="linkedin"
            submitLabel="Get my free video audit"
            urlLabel="Website (yours or your client's)"
            question={leadQuestions.linkedin}
          />
        </div>
      </section>

      {/* FAQ */}
      <Section id="faq" tone="muted" eyebrow="FAQ" title="Questions">
        <div className="max-w-3xl">
          <Faq />
        </div>
      </Section>
    </>
  );
}
