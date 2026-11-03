"use server";

import { parseAuditForm, type AuditFormState } from "@/lib/audit-schema";
import { saveAuditRequest } from "@/lib/audit-store";
import { buildFormLeadAlert, sendLeadAlert } from "@/lib/lead-alert";
import { leadRequestContext } from "@/lib/lead-request";
import { safeEventId, safePageUrl, sendMetaLead } from "@/lib/meta-capi";
import { site } from "@/lib/site";

export async function submitAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  // "problems" can repeat (one per tapped answer); Object.fromEntries would keep only the last.
  const parsed = parseAuditForm({ ...Object.fromEntries(formData), problems: formData.getAll("problems") });

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

  const lead = parsed.data;
  // Both are best effort and run side by side: the lead is already saved.
  await Promise.all([
    sendMetaLead({
      eventId: safeEventId(lead.eventId),
      email: lead.email,
      name: lead.name,
      phone: lead.whatsapp || undefined,
      source: lead.source,
      ...(await leadRequestContext()),
      // The exact page beats the referer, which browsers often cut down to just the domain.
      ...withPageUrl(lead.pageUrl),
    }),
    sendLeadAlert(
      buildFormLeadAlert({
        source: lead.source,
        name: lead.name,
        email: lead.email,
        storeUrl: lead.storeUrl,
        spend: lead.spend,
        whatsapp: lead.whatsapp,
        problems: lead.problems,
        message: lead.message,
      }),
    ),
  ]);

  const message =
    parsed.data.source === "bfcm"
      ? "Thanks! We'll review your store and reply within one business day."
      : parsed.data.source === "sri-lanka-q4"
        ? "Got it! Your Q4 Sprint booking is in."
        : parsed.data.source.startsWith("sri-lanka")
          ? "Thank you! Your free ad review will reach you within 2 business days."
          : "Got it! Your roast (the nice kind) lands within 2 business days.";
  return { status: "success", message };
}

function withPageUrl(pageUrl: string | undefined) {
  const sourceUrl = safePageUrl(pageUrl);
  return sourceUrl ? { sourceUrl } : {};
}
