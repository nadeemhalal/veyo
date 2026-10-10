import type { Metadata } from "next";
import { site } from "@/lib/site";

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline}`,
};

type PageMeta = {
  title: string;
  description: string;
  /** Path starting with "/", or "" for the home page. Used for the canonical URL. */
  path: string;
  /** Open Graph type. Defaults to "website". */
  type?: "website" | "article";
  /** Keep the page out of search results. */
  noindex?: boolean;
};

/**
 * Metadata for a page: title, description, canonical URL, and matching Open Graph / Twitter tags.
 * A child's `openGraph` replaces the parent's wholesale in Next, so each page has to supply the full set.
 */
export function pageMetadata({ title, description, path, type = "website", noindex }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const socialTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: "en_AU",
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage.url] },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: "veyo!",
  url: site.url,
  logo: `${site.url}/og.png`,
  email: site.email,
  slogan: site.tagline,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  areaServed: { "@type": "Country", name: "Australia" },
  knowsAbout: ["Meta ads", "Facebook ads", "Instagram ads", "Ecommerce advertising", "Ad creative"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-AU",
  publisher: { "@id": `${site.url}/#organization` },
};

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Australia" },
  };
}
