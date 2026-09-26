import type { MetadataRoute } from "next";
import { industries, site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services/meta-ads",
    "/services/creative",
    "/services/audit",
    "/agencies",
    "/pricing",
    "/case-studies",
    "/insights",
    "/about",
    "/contact",
    ...industries.map((i) => `/industries/${i.slug}`),
    ...getAllPosts().map((p) => `/insights/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
