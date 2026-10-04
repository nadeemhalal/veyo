import { z } from "zod";
import { allItemIds } from "@/lib/audit-checklist";

export const checklistContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  organisation: z.string().trim().min(1, "Please enter your organisation").max(150),
  email: z.email("Please enter a valid email").max(200),
});

export type ChecklistContact = z.infer<typeof checklistContactSchema>;

export const checklistSubmissionSchema = checklistContactSchema.extend({
  // Only known item ids, de-duplicated. Anything else is dropped.
  checked: z
    .array(z.string().max(10))
    .max(200)
    .transform((ids) => [...new Set(ids.filter((id) => allItemIds.has(id)))]),
  marketingOptIn: z.boolean().default(false),
  // Honeypot: bots fill it, people don't.
  company: z.string().max(200).optional(),
});

export type ChecklistSubmission = z.infer<typeof checklistSubmissionSchema>;

export function contactFieldErrors(raw: unknown): Partial<Record<keyof ChecklistContact, string>> {
  const result = checklistContactSchema.safeParse(raw);
  if (result.success) return {};
  const errors: Partial<Record<keyof ChecklistContact, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ChecklistContact;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
