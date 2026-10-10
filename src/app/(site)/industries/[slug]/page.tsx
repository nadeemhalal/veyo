import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { industries } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, StatsRow } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { PageHero, Section } from "@/components/site/section";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return pageMetadata({ title: industry.headline, description: industry.intro, path: `/industries/${industry.slug}` });
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}`;
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(industry.headline, industry.intro, path),
          breadcrumbJsonLd([{ name: industry.name, path }]),
        ]}
      />
      <PageHero eyebrow={industry.name} title={industry.headline} intro={industry.intro}>
        <CtaLink href="/services/audit" arrow>Get a free ad audit</CtaLink>
      </PageHero>

      <Section eyebrow="What we focus on" title={`What works for ${industry.name.toLowerCase()} brands`}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {industry.angles.map((a) => (
            <li key={a} className="flex gap-3 rounded-xl border bg-card p-5">
              <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" eyebrow="Compliance" title="Ads that stay within the rules">
        <div className="flex max-w-3xl gap-4 rounded-xl border bg-card p-6">
          <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-muted-foreground">{industry.compliance}</p>
        </div>
      </Section>

      <Section eyebrow="Track record" title="Results so far">
        <StatsRow />
      </Section>

      <FinalCta />
    </>
  );
}
