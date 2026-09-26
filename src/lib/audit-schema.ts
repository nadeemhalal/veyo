import { z } from "zod";

export const spendOptions = [
  "Under A$1k/month",
  "A$1k–5k/month",
  "A$5k–20k/month",
  "A$20k+/month",
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
  spend: z.enum(spendOptions, { error: "Please choose your monthly ad spend" }),
  message: z.string().trim().max(2000).optional().default(""),
  // Which page or campaign the lead came from, e.g. "audit" or "bfcm".
  source: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{1,40}$/)
    .catch("website")
    .default("website"),
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
