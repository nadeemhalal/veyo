import type { Metadata } from "next";
import Link from "next/link";
import { Check, Globe, MapPin, X } from "lucide-react";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { site, sriLankaEcom } from "@/lib/site";
import { lkrSpendOptions } from "@/lib/audit-schema";
import { AdMakeover } from "@/components/site/ad-makeover";
import { AuditForm } from "@/components/site/audit-form";
import { StatsRow } from "@/components/site/blocks";
import { CodCalculator } from "@/components/site/cod-calculator";
import { CtaLink } from "@/components/site/cta-link";
import { JsonLd } from "@/components/site/json-ld";
import { LeakCheck } from "@/components/site/leak-check";
import { MehToVeyo } from "@/components/site/meh-to-veyo";
import { Section } from "@/components/site/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = pageMetadata({
  title: "Meta ads in Sri Lanka for online stores",
  description:
    "Facebook and Instagram ads (Meta ads) for Sri Lankan online stores selling islandwide or overseas. Click-to-WhatsApp, Pixel and Conversions API, counted on paid orders. Price on the page: Starter from Rs 35,000 a month.",
  path: "/sri-lanka",
});

const marketIcons = { local: MapPin, overseas: Globe };
const { starter, custom } = sriLankaEcom;

export default function SriLankaPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(sriLankaEcom.faqs)} />

      {/* Hero */}
      <section id="hero" className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-brand-foreground">
              Meta ads for Sri Lankan online stores
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Islandwide delivery. Worldwide ambition.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              Facebook and Instagram ads for Sri Lankan brands selling across the island or overseas. Run from{" "}
              {site.base.split(",")[0]} by a Meta ads specialist who&apos;s spent two years selling to Australian shoppers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#review" variant="brand" arrow>
                Get my free ad review
              </CtaLink>
              <a
                href="#pricing"
                className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:bg-white/10"
              >
                See the Starter pack
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
              {sriLankaEcom.trustPoints.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="size-4 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ul className="space-y-3">
            {sriLankaEcom.markets.map((m) => {
              const Icon = marketIcons[m.id];
              return (
                <li key={m.id}>
                  <a href={`#${m.id}`} className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <Icon className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-heading font-semibold">{m.title}</p>
                      <p className="mt-1 text-sm text-primary-foreground/80">{m.body}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Makeover */}
      <Section
        id="makeover"
        eyebrow="The same product, two ads"
        title={<MehToVeyo />}
        intro="Pick an example. The ad on the left is the one everybody runs. The one on the right answers the buyer's questions before they ask."
      >
        <AdMakeover makeovers={sriLankaEcom.makeovers} groupLabel="Example ad" />
      </Section>

      {/* Local and overseas */}
      <Section id="markets" tone="muted" eyebrow="Two kinds of store" title="Selling here, selling abroad, or both">
        <div className="grid gap-6 lg:grid-cols-2">
          {sriLankaEcom.markets.map((m) => {
            const Icon = marketIcons[m.id];
            return (
              <article key={m.id} id={m.id} className="scroll-mt-6 rounded-xl border bg-card p-6 sm:p-8">
                <Icon className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-2xl font-bold">{m.title}</h3>
                <p className="mt-2 text-muted-foreground">{m.body}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Run a hotel, villa or tour?{" "}
          <Link href="/sri-lanka/tourism" className="font-semibold text-primary underline-offset-4 hover:underline">
            See Meta ads for tourism businesses
          </Link>
          .
        </p>
      </Section>

      {/* Ad Library notes */}
      <Section
        id="who-is-advertising"
        eyebrow="We went and looked"
        title={`About ${sriLankaEcom.adLibrary.islandwideAds} ads say "islandwide delivery". Here's what else they say.`}
        intro={
          <>
            On {sriLankaEcom.adLibrary.checkedOn} we searched Meta&apos;s public Ad Library for ads running in Sri Lanka, and
            for ads mentioning Ceylon running in Australia. Same patterns, over and over.
          </>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-heading text-lg font-semibold">In Sri Lanka</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {sriLankaEcom.adLibrary.local.map((m) => (
                <li key={m} className="flex gap-2">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-heading text-lg font-semibold">Overseas</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {sriLankaEcom.adLibrary.overseas.map((m) => (
                <li key={m} className="flex gap-2">
                  <Globe className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium">Other people are selling your country&apos;s story. You could be the one selling it.</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Don&apos;t take our word for it:{" "}
          <a
            href={sriLankaEcom.adLibrary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            search the Ad Library yourself
          </a>
          .
        </p>
      </Section>

      {/* Specialist vs generalist */}
      <Section
        id="compare"
        tone="dark"
        eyebrow="Meta ads specialist, Sri Lanka"
        title="Most agencies here do everything. We do one thing."
        intro="We read the agency pages that come up when you search for Meta ads in Sri Lanka. Here's how we're different."
      >
        <div className="overflow-x-auto rounded-xl border border-white/15">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">A typical Sri Lankan digital agency compared with Veyo Media</caption>
            <thead className="bg-white/5">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold"></th>
                <th scope="col" className="px-5 py-4 font-semibold text-primary-foreground/70">Typical agency</th>
                <th scope="col" className="px-5 py-4 font-semibold text-brand">Veyo Media</th>
              </tr>
            </thead>
            <tbody>
              {sriLankaEcom.comparison.map((row) => (
                <tr key={row.label} className="border-t border-white/15">
                  <th scope="row" className="px-5 py-4 font-medium">{row.label}</th>
                  <td className="px-5 py-4 text-primary-foreground/70">{row.typical}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {row.veyo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Cash on delivery maths */}
      <Section
        id="calculator"
        tone="muted"
        eyebrow="Cash on delivery maths"
        title="Your cost per order, as your bank sees it"
        intro="Ads Manager counts every order placed. Your bank only counts the ones that get paid for."
      >
        <CodCalculator />
      </Section>

      {/* Leak check */}
      <Section
        id="leak-check"
        eyebrow="The 8-point leak check"
        title="Follow one buyer from scroll to sale"
        intro="Tick what's already true for your store. It takes about a minute."
      >
        <LeakCheck stages={sriLankaEcom.leakCheck} />
      </Section>

      {/* Pricing */}
      <Section
        id="pricing"
        tone="muted"
        eyebrow="Meta ads pricing in Sri Lanka"
        title="Start small. Grow when it works."
        intro="Most agency sites say &quot;contact us for a quote&quot;. Here's ours, before you've even said hello."
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="flex flex-col rounded-xl border-2 border-primary bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading text-2xl font-bold">{starter.name}</h3>
              <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">First-time client price</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{starter.fit}</p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/60 p-4">
                <dt className="text-sm text-muted-foreground">Monthly, for {starter.monthly.firstTimeFor}</dt>
                <dd className="mt-1 font-mono text-3xl font-bold tracking-tight">{starter.monthly.firstTime}</dd>
                <dd className="mt-1 text-sm text-muted-foreground">Then {starter.monthly.regular}/month (regular price)</dd>
              </div>
              <div className="rounded-lg bg-muted/60 p-4">
                <dt className="text-sm text-muted-foreground">One-off setup</dt>
                <dd className="mt-1 font-mono text-3xl font-bold tracking-tight">{starter.setup.firstTime}</dd>
                <dd className="mt-1 text-sm text-muted-foreground">Regular price {starter.setup.regular}</dd>
              </div>
            </dl>

            <ul className="my-6 flex-1 space-y-3 text-sm">
              {starter.includes.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <CtaLink href="#review" className="w-full" arrow>
              Start with a free ad review
            </CtaLink>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Ad spend is paid directly to Meta, not through us. First-time client prices apply to a store&apos;s first
              engagement with Veyo.
            </p>
          </article>

          <article className="flex flex-col rounded-xl border bg-card p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-bold">{custom.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{custom.fit}</p>
            <p className="mt-6 font-mono text-3xl font-bold tracking-tight">Custom quote</p>
            <ul className="my-6 flex-1 space-y-3 text-sm">
              {custom.includes.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <CtaLink href="#review" variant="outline" className="w-full">
              Ask for a quote
            </CtaLink>
            <p className="mt-3 text-center text-xs text-muted-foreground">Tell us what you sell and where in the form below.</p>
          </article>
        </div>
      </Section>

      {/* Proof, stated honestly */}
      <Section
        id="proof"
        eyebrow="The honest bit"
        title="New to Sri Lankan stores. Not new to selling online."
        intro={`We're based in ${site.base}, and for two years we've run Meta ads for Australian online stores and agencies. We haven't run ads for a Sri Lankan store as Veyo yet, so you won't find a local case study here.`}
      >
        <StatsRow />
        <p className="mt-4 text-sm text-muted-foreground">
          These numbers are from Australian online stores. Past results don&apos;t guarantee future performance.
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted" eyebrow="FAQ" title="Questions">
        <div className="max-w-3xl">
          <Accordion className="rounded-xl border bg-card px-5">
            {sriLankaEcom.faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Review form */}
      <section id="review" className="border-t py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight">Get a free review of your ads</h2>
          <p className="mt-3 text-center text-muted-foreground">
            A free video walkthrough of your ads and the page they lead to, with three fixes you can use even if you never
            hire us. Not running ads yet? We&apos;ll look at your store and where to start. Want a quote instead? Say so in
            the notes.
          </p>
          <AuditForm
            className="mt-8"
            source="sri-lanka"
            submitLabel="Get my free ad review"
            urlLabel="Website, Facebook or Instagram page"
            urlPlaceholder="yourstore.lk"
            spendChoices={lkrSpendOptions}
          />
          {site.whatsapp && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Rather chat?{" "}
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Message us on WhatsApp
              </a>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
