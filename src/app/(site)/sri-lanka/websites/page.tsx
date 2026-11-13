import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { websites } from "@/lib/site";
import { WebsitesPage } from "@/components/site/websites-page";

export const metadata: Metadata = pageMetadata({
  title: websites.lk.title,
  description: websites.lk.description,
  path: websites.lk.path,
});

export default function WebsitesLkPage() {
  return <WebsitesPage region="lk" />;
}
