import { cookies, headers } from "next/headers";
import { site } from "@/lib/site";

/** Details of the current request that Meta uses to match a server-side lead to an ad click. */
export async function leadRequestContext() {
  const h = await headers();
  const c = await cookies();
  return {
    // Cloudflare puts the visitor's real IP in cf-connecting-ip.
    ip: h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    userAgent: h.get("user-agent") ?? undefined,
    // A server action is posted from the page the form is on, so the referer is that page.
    sourceUrl: h.get("referer") ?? site.url,
    fbp: c.get("_fbp")?.value,
    fbc: c.get("_fbc")?.value,
  };
}
