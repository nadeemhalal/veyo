import Link from "next/link";
import { industries, site } from "@/lib/site";
import { Logo } from "./logo";

const groups = [
  {
    title: "Services",
    links: [
      { label: "Meta ads management", href: "/services/meta-ads" },
      { label: "Ad creative & UGC", href: "/services/creative" },
      { label: "Free ad audit", href: "/services/audit" },
      { label: "60-point audit checklist", href: "/meta-ads-audit" },
      { label: "White label for agencies", href: "/agencies" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Industries",
    links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">{site.tagline} Meta ads for Australian ecommerce brands.</p>
          <p className="text-sm text-muted-foreground">
            Based in {site.base}. Working {site.hours}.
          </p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h3 className="mb-3 text-sm font-semibold">{g.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          {/* TODO: add business registration number once registered */}
          <p>© {new Date().getFullYear()} {site.name}. Meta, Facebook and Instagram are trademarks of Meta Platforms, Inc.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
