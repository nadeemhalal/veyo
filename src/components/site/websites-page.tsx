import { Check, Plus } from "lucide-react";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { leadQuestions, site, websites, type WebsitePackage } from "@/lib/site";
import { lkrSpendOptions, spendOptions } from "@/lib/audit-schema";
import { AuditForm } from "@/components/site/audit-form";
import { CtaLink } from "@/components/site/cta-link";
import { JsonLd } from "@/components/site/json-ld";
import { HeroPhoneDemo, PageBuilderGame } from "@/components/site/page-builder-game";
import { Section } from "@/components/site/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/** Websites & landing pages, for Australia (A$) or Sri Lanka (Rs). Copy lives in `websites` in site.ts. */
export function WebsitesPage({ region }: { region: "au" | "lk" }) {
  const copy = websites[region];
  const lk = region === "lk";

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd("Websites & landing pages", copy.description, copy.path, copy.country),
          breadcrumbJsonLd([{ name: "Websites & landing pages", path: copy.path }]),
          faqJsonLd(copy.faqs),
        ]}
      />

      <section className="overflow-hidden border-b bg-muted/40 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_24rem] lg:gap-10">
          <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{websites.eyebrow}</p>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">{websites.headline}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="#build" variant="brand" arrow>
              Build your page
            </CtaLink>
            {lk ? (
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Veyo, I'd like a quote for a website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Ask on WhatsApp
              </a>
            ) : (
              <CtaLink href="#quote" variant="outline">
                Just get a quote
              </CtaLink>
            )}
          </div>
          </div>
          <HeroPhoneDemo region={region} />
        </div>
      </section>

      <Section
        id="build"
        eyebrow="Build your page"
        title="Go from meh to veyo! in three taps."
        intro="Pick a build, tell us where visitors come from, and switch on the power-ups. See the page and the price change as you go."
      >
        <PageBuilderGame region={region} />
      </Section>

      <Section id="pricing" tone="muted" eyebrow="What's included" title="Everything in each build, in plain words.">
        <div className="grid gap-6 lg:grid-cols-3">
          {copy.packages.map((p) => (
            <PackageCard key={p.name} pkg={p} />
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{copy.taxNote}</p>
      </Section>

      <Section eyebrow="SEO and GEO" title="People don't only Google it any more. They ask." intro="Some buyers still scroll search results. More and more ask an AI tool instead. Your site should work for both.">
        <div className="grid gap-6 md:grid-cols-3">
          {websites.searchTypes.map((t, i) => (
            <article key={t.title} className={cn("rounded-xl border bg-card p-6", i === 2 && "border-dashed")}>
              <h3 className="font-heading text-2xl font-bold">{t.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{t.where}</p>
              <p className="mt-3 text-muted-foreground">{t.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Why Veyo" title="Made by people who see what happens after the click.">
        <div className="grid gap-6 sm:grid-cols-2">
          {websites.why.map((w) => (
            <article key={w.title} className="rounded-xl border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-muted-foreground">{w.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="How it works" title="Four steps, no surprises.">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {websites.steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border bg-card p-6">
              <span className="font-mono text-sm font-semibold text-primary">0{i + 1}</span>
              <h3 className="mt-2 font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="quote" tone="muted" eyebrow="Get a quote" title="Tell us what you need." intro="We'll reply with a quote within 1 business day. No obligation.">
        <div className="max-w-2xl">
          <AuditForm
            source={lk ? "sri-lanka-websites" : "websites"}
            submitLabel="Get my quote"
            urlLabel="Current website or social page"
            urlPlaceholder={lk ? "yourbrand.lk or facebook.com/yourbrand" : "yourbrand.com.au or instagram.com/yourbrand"}
            spendLabel="Monthly ad spend"
            spendChoices={lk ? lkrSpendOptions : spendOptions}
            question={lk ? leadQuestions.websitesLk : leadQuestions.websitesAu}
            success={
              <p className="mt-2 text-sm text-muted-foreground">
                Next, a short call about your offer and your buyers. We never ask for passwords.
              </p>
            }
          />
        </div>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Questions people ask">
        <Accordion className="max-w-3xl rounded-xl border bg-card px-5">
          {copy.faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}

function PackageCard({ pkg }: { pkg: WebsitePackage }) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-card p-6 sm:p-8",
        pkg.highlighted && "border-primary ring-2 ring-primary/20",
        pkg.addOn && "border-dashed bg-muted/40",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
        {pkg.addOn && (
          <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold">
            <Plus className="size-3" aria-hidden="true" />
            Add-on
          </span>
        )}
        {pkg.highlighted && (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">For ads</span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{pkg.fit}</p>
      <p className="mt-6">
        <span className="font-heading text-4xl font-bold tracking-tight">{pkg.price}</span>{" "}
        <span className="text-muted-foreground">{pkg.cadence}</span>
      </p>
      <ul className="my-6 flex-1 space-y-3 text-sm">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <CtaLink href="#quote" variant={pkg.highlighted ? "primary" : "outline"} className="w-full">
        {pkg.addOn ? "Add it to my quote" : "Get a quote"}
      </CtaLink>
    </article>
  );
}
