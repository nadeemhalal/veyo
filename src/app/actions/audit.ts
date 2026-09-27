"use server";

import { parseAuditForm, type AuditFormState } from "@/lib/audit-schema";
import { saveAuditRequest } from "@/lib/audit-store";
import { site } from "@/lib/site";

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

  const saved = await saveAuditRequest(parsed.data);
  if (!saved) {
    return {
      status: "error",
      message: `Sorry, something went wrong sending your request. Please try again, or email us at ${site.email}.`,
    };
  }

  const message =
    parsed.data.source === "bfcm"
      ? "Thanks! We'll review your store and reply within one business day."
      : "Thanks! We'll send your audit within 2 business days.";
  return { status: "success", message };
}
