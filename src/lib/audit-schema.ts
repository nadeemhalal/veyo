import { z } from "zod";

export const spendOptions = [
  "Under A$1k/month",
  "A$1k–5k/month",
  "A$5k–20k/month",
  "A$20k+/month",
  "Not running ads yet",
] as const;

// Sri Lankan tourism businesses (/sri-lanka) think about ad spend in US dollars.
export const tourismSpendOptions = [
  "Under US$300/month",
  "US$300–1,000/month",
  "US$1,000–5,000/month",
  "US$5,000+/month",
  "Not running ads yet",
] as const;

// Sri Lankan online stores (/sri-lanka) spend in rupees.
export const lkrSpendOptions = [
  "Under Rs 50,000/month",
  "Rs 50,000–150,000/month",
  "Rs 150,000–500,000/month",
  "Rs 500,000+/month",
  "Not running ads yet",
] as const;

export const auditSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  storeUrl: z
    .string()
    .trim()
    .min(4, "Please enter your store URL")
    .max(300)
    .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
    .pipe(z.url("Please enter a valid URL")),
  spend: z.enum([...spendOptions, ...tourismSpendOptions, ...lkrSpendOptions], { error: "Please choose your monthly ad spend" }),
  message: z.string().trim().max(2000).optional().default(""),
  // Which page or campaign the lead came from, e.g. "audit" or "bfcm".
  source: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{1,40}$/)
    .catch("website")
    .default("website"),
  // Shared with the browser pixel so Meta counts the lead once. Checked again before sending.
  eventId: z.string().max(64).optional().catch(undefined),
  // WhatsApp number. Asked for (and required) on the Sri Lanka Q4 booking form, where we reply on WhatsApp.
  whatsapp: z.string().trim().max(30).optional().default(""),
  // The page the form was sent from, for Meta's event_source_url. Checked again before use.
  pageUrl: z.string().max(500).optional().catch(undefined),
  // Problems the visitor tapped on the form's last question.
  problems: z.array(z.string().trim().max(120)).max(10).optional().default([]).transform((ps) => ps.filter(Boolean)),
}).superRefine((d, ctx) => {
  const ok = /^\+?[\d\s()-]{7,20}$/.test(d.whatsapp);
  if (d.source === "sri-lanka-q4" && !ok) {
    ctx.addIssue({ code: "custom", path: ["whatsapp"], message: "Please enter your WhatsApp number" });
  } else if (d.whatsapp && !ok) {
    ctx.addIssue({ code: "custom", path: ["whatsapp"], message: "Please check your WhatsApp number" });
  }
});

export type AuditInput = z.infer<typeof auditSchema>;

export type AuditFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof AuditInput, string>>;
};

/** Validates raw form values. The `company` field is a honeypot: bots fill it, people don't. */
export function parseAuditForm(raw: Record<string, unknown>):
  | { ok: true; data: AuditInput }
  | { ok: false; bot: boolean; fieldErrors: Partial<Record<keyof AuditInput, string>> } {
  if (typeof raw.company === "string" && raw.company.trim() !== "") {
    return { ok: false, bot: true, fieldErrors: {} };
  }

  const result = auditSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };

  const fieldErrors: Partial<Record<keyof AuditInput, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof AuditInput;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, bot: false, fieldErrors };
}
