import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { websites } from "@/lib/site";
import { WebsitesPage } from "@/components/site/websites-page";

export const metadata: Metadata = pageMetadata({
  title: websites.au.title,
  description: websites.au.description,
  path: websites.au.path,
});

export default function WebsitesAuPage() {
  return <WebsitesPage region="au" />;
}
