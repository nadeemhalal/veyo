"use server";

import { parseAuditForm, type AuditFormState } from "@/lib/audit-schema";

export async function submitAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  const parsed = parseAuditForm(Object.fromEntries(formData));

  // Pretend success for bots so they don't retry.
  if (!parsed.ok && parsed.bot) {
    return { status: "success", message: "Thanks! We'll be in touch within one business day." };
  }
  if (!parsed.ok) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors: parsed.fieldErrors };
  }

  // TODO: store the lead. Planned: insert into a Supabase `audit_requests` table
  // (see README) and/or send a notification email. Until then, leads are only
  // logged in development and are NOT saved anywhere.
  if (process.env.NODE_ENV !== "production") {
    console.info("[audit request]", { ...parsed.data, email: "<redacted>" });
  }

  const message =
    parsed.data.source === "bfcm"
      ? "Thanks! We'll review your store and reply within one business day."
      : "Thanks! We'll send your audit within 2 business days.";
  return { status: "success", message };
}
