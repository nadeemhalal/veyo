import type { MetadataRoute } from "next";
import { industries, site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  // Bump this when site copy changes materially. Posts use their own date.
  const siteUpdated = new Date("2026-10-10");
  const posts = getAllPosts();
  const pages = [
    "",
    "/services/meta-ads",
    "/services/creative",
    "/services/audit",
    "/agencies",
    "/meta-ads-audit",
    "/bfcm",
    "/bfcm/playbook",
    "/pricing",
    "/case-studies",
    "/insights",
    "/about",
    "/contact",
    ...industries.map((i) => `/industries/${i.slug}`),
  ].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: siteUpdated,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const postEntries = posts.map((p) => ({
    url: `${site.url}/insights/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...postEntries];
}
