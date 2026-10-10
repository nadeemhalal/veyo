import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { playbookFiles } from "@/generated/content";
import { bfcm } from "@/lib/site";
import { CtaLink } from "@/components/site/cta-link";
import { PrintButton } from "@/components/site/print-button";

export const metadata: Metadata = pageMetadata({
  title: `The Aussie BFCM Meta Ads Playbook ${bfcm.year}`,
  description:
    "A free, practical guide to Meta ads for Click Frenzy, Black Friday and Cyber Monday: dates, break-even ROAS, offers, an 8-week timeline and checklists.",
  path: "/bfcm/playbook",
});

const content = playbookFiles[`bfcm-${bfcm.year}`];
if (!content) throw new Error(`Missing content/playbooks/bfcm-${bfcm.year}.md`);

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function textOf(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

const toc = content
  .split("\n")
  .filter((l) => l.startsWith("## "))
  .map((l) => l.slice(3).trim());

export default function PlaybookPage() {
  return (
    <>
      <header className="border-b bg-primary text-primary-foreground print:border-0 print:bg-transparent print:text-foreground">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand print:text-primary">Free playbook · {bfcm.year}</p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">The Aussie BFCM Meta Ads Playbook</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80 print:text-muted-foreground">
            How Australian ecommerce brands can plan Meta ads for Click Frenzy, Black Friday ({bfcm.blackFriday}) and Cyber
            Monday ({bfcm.cyberMonday}), without giving away their margin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <PrintButton className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10" />
            <CtaLink href="/bfcm#sprint" variant="brand" arrow>
              Want us to run it for you?
            </CtaLink>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Playbook contents" className="print:hidden lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-3 text-sm font-semibold">Contents</p>
          <ol className="space-y-2 text-sm text-muted-foreground">
            {toc.map((t) => (
              <li key={t}>
                <a href={`#${slugify(t)}`} className="hover:text-foreground">
                  {t}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground prose-table:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
            }}
          >
            {content}
          </ReactMarkdown>

          <hr />
          <p className="text-sm text-muted-foreground">
            This playbook is general guidance, not legal or financial advice. Check sale dates, shipping cut-offs and
            advertising rules for your own business.
          </p>
        </article>
      </div>

      <section className="border-t bg-muted/50 py-14 print:hidden">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">Rather not do it all yourself?</h2>
            <p className="mt-2 text-muted-foreground">
              Our 6-week BFCM Sprint runs the whole season for a fixed fee of {bfcm.sprintPrice}.{" "}
              <Link href="/bfcm#sprint" className="font-semibold text-primary underline-offset-4 hover:underline">
                See what&apos;s included
              </Link>
            </p>
          </div>
          <CtaLink href="/bfcm#apply" arrow>
            Apply for a Sprint
          </CtaLink>
        </div>
      </section>
    </>
  );
}
