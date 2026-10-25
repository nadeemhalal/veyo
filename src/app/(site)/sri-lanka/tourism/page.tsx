import type { Metadata } from "next";
import { Check, Compass, Hotel, House, X } from "lucide-react";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { site, sriLankaTourism } from "@/lib/site";
import { tourismSpendOptions } from "@/lib/audit-schema";
import { AuditForm } from "@/components/site/audit-form";
import { StatsRow } from "@/components/site/blocks";
import { CommissionCalculator } from "@/components/site/commission-calculator";
import { CtaLink } from "@/components/site/cta-link";
import { JsonLd } from "@/components/site/json-ld";
import { LeakCheck } from "@/components/site/leak-check";
import { MehToVeyo } from "@/components/site/meh-to-veyo";
import { SeasonPicker } from "@/components/site/season-picker";
import { Section } from "@/components/site/section";
import { AdMakeover } from "@/components/site/ad-makeover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = pageMetadata({
  title: "Meta ads for Sri Lankan hotels, villas and tour operators",
  description:
    "Facebook and Instagram ads for Sri Lankan tourism businesses. Ads written for each market, creative included, counted to the booking. Month-to-month, and your accounts stay yours.",
  path: "/sri-lanka/tourism",
});

const audienceIcons = [House, Hotel, Compass];

export default function SriLankaTourismPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(sriLankaTourism.faqs)} />

      {/* Hero */}
      <section id="hero" className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-brand-foreground">
              For Sri Lankan tourism businesses
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Sri Lanka sells itself. Your ads still have to sell you.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              Facebook and Instagram ads for villas, hotels and tour operators. Written for the guest you want, in the
              country they&apos;re scrolling from, and counted all the way to the booking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#review" variant="brand" arrow>
                Get my free ad review
              </CtaLink>
              <a
                href="#calculator"
                className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:bg-white/10"
              >
                What do booking sites cost me?
              </a>
            </div>
          </div>
          <ul className="space-y-3">
            {sriLankaTourism.audiences.map((a, i) => {
              const Icon = audienceIcons[i];
              return (
                <li key={a.title} className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 p-5">
                  <Icon className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-heading font-semibold">{a.title}</p>
                    <p className="mt-1 text-sm text-primary-foreground/80">{a.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Makeover */}
      <Section
        id="makeover"
        eyebrow="The same business, two ads"
        title={<MehToVeyo />}
        intro="Pick your kind of business. The ad on the left is the one everybody runs. The one on the right gives a guest a reason to tap."
      >
        <AdMakeover makeovers={sriLankaTourism.makeovers} groupLabel="Type of business" mehCaption="PARADISE AWAITS" />
      </Section>

      {/* Ad Library notes */}
      <Section
        id="who-is-advertising"
        tone="muted"
        eyebrow="We went and looked"
        title="Overseas tour operators are selling your island. Quite well, too."
        intro={
          <>
            On {sriLankaTourism.adLibrary.checkedOn} we searched Meta&apos;s public Ad Library for Sri Lanka holiday ads running
            in Australia, the UK, Germany and India. Most of the ads we saw came from overseas tour operators and travel
            agents, not from Sri Lankan businesses.
          </>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">What the overseas operators do</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {sriLankaTourism.adLibrary.theyDo.map((t) => (
                <li key={t.title} className="rounded-xl border bg-card p-5">
                  <p className="flex gap-2 font-heading font-semibold">
                    <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {t.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">What we kept seeing from local pages</h3>
            <ul className="space-y-3 rounded-xl border bg-card p-5 text-sm">
              {sriLankaTourism.adLibrary.localsMiss.map((m) => (
                <li key={m} className="flex gap-2">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              None of this needs a bigger budget. Don&apos;t take our word for it:{" "}
              <a
                href={sriLankaTourism.adLibrary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                search the Ad Library yourself
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* Seasons */}
      <Section
        id="seasons"
        tone="dark"
        eyebrow="One island, many winters"
        title="Your guests aren't all in the same season"
        intro="Pick a month and see what it looks like where your guests live. This is why one ad for every country doesn't work."
      >
        <SeasonPicker />
      </Section>

      {/* Calculator */}
      <Section
        id="calculator"
        eyebrow="Do the maths"
        title="What are booking sites costing you?"
        intro="Booking sites earn their commission on guests you'd never have reached. On the ones who would have found you anyway, less so."
      >
        <CommissionCalculator />
      </Section>

      {/* Leak check */}
      <Section
        id="leak-check"
        tone="muted"
        eyebrow="The 8-point leak check"
        title="Follow one guest from scroll to booking"
        intro="Tick what's already true for your business. It takes about a minute."
      >
        <LeakCheck stages={sriLankaTourism.leakCheck} />
      </Section>

      {/* What you get */}
      <Section id="what-you-get" eyebrow="What we do" title="What you get from Veyo">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sriLankaTourism.whatYouGet.map((w) => (
            <li key={w.title} className="rounded-xl border bg-card p-6">
              <h3 className="font-heading font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Proof, stated honestly */}
      <Section
        id="proof"
        tone="muted"
        eyebrow="The honest bit"
        title="New to tourism. Not new to Meta ads."
        intro={`We're based in ${site.base}, and for two years we've run Meta ads for Australian online stores and agencies. We haven't run a hotel's or tour operator's ads yet, so you won't find a tourism case study here.`}
      >
        <StatsRow />
        <p className="mt-4 text-sm text-muted-foreground">
          These numbers are from Australian online stores, not tourism. Past results don&apos;t guarantee future
          performance.
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Questions">
        <div className="max-w-3xl">
          <Accordion className="rounded-xl border bg-card px-5">
            {sriLankaTourism.faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Review form */}
      <section id="review" className="border-t bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight">Get a free review of your ads</h2>
          <p className="mt-3 text-center text-muted-foreground">
            A free video walkthrough of your ads and the page they lead to, with three fixes you can use even if you
            never hire us. Not running ads yet? We&apos;ll review your page and where to start.
          </p>
          <AuditForm
            className="mt-8"
            source="sri-lanka-tourism"
            submitLabel="Get my free ad review"
            urlLabel="Website, booking page or Instagram"
            urlPlaceholder="yourvilla.com"
            spendChoices={tourismSpendOptions}
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
