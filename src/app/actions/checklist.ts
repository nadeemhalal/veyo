"use server";

import { scoreChecklist, type ChecklistResult } from "@/lib/audit-checklist";
import { buildChecklistEmail } from "@/lib/checklist-email";
import { checklistSubmissionSchema } from "@/lib/checklist-input";
import { emailConfigured, sendEmail } from "@/lib/send-email";
import { site } from "@/lib/site";
import { getSupabase } from "@/lib/supabase";

const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");

export type ViewResultState = { ok: true; result: ChecklistResult } | { ok: false; message: string };

/** Scores the audit on the server (the client's own score is never trusted) and saves it as a lead. */
export async function viewChecklistResult(input: unknown): Promise<ViewResultState> {
  const parsed = checklistSubmissionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Please check your name, organisation and email." };
  const data = parsed.data;
  const result = scoreChecklist(data.checked);

  if (!data.company) {
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("checklist_results").insert({
        name: data.name,
        organisation: data.organisation,
        email: data.email,
        score: result.total,
        section_scores: Object.fromEntries(result.sections.map((s) => [s.id, s.score])),
        checked_items: data.checked,
        marketing_opt_in: data.marketingOptIn,
      });
      // Saving is best effort: the visitor still sees their results if it fails.
      if (error) console.error("[checklist] save failed:", error.code, error.message);
    } else {
      console.error("[checklist] Supabase env vars missing; result not saved");
    }
  }
  return { ok: true, result };
}

export type EmailReportState = { status: "sent" | "error"; message: string };

export async function emailChecklistReport(input: unknown): Promise<EmailReportState> {
  const parsed = checklistSubmissionSchema.safeParse(input);
  if (!parsed.success) return { status: "error", message: "Please check your name, organisation and email." };
  const data = parsed.data;

  // Pretend success for bots.
  if (data.company) return { status: "sent", message: "Sent! Check your inbox." };

  // Check email is configured before using up one of the visitor's daily sends.
  if (!emailConfigured()) {
    return { status: "error", message: "Email sending isn't switched on yet. Take a screenshot of your results for now." };
  }
  const supabase = getSupabase();
  if (!supabase) return { status: "error", message: "Email isn't set up yet. Please try again later." };

  // Max 3 reports per address per 24 hours, so the form can't be used to spam people.
  const { data: allowed, error } = await supabase.rpc("allow_checklist_email", { p_email: data.email });
  if (error) {
    console.error("[checklist] rate limit check failed:", error.code, error.message);
    return { status: "error", message: "Sorry, something went wrong. Please try again." };
  }
  if (!allowed) {
    return { status: "error", message: "We've already sent a few reports to this address today. Check your inbox (and spam folder)." };
  }

  const email = buildChecklistEmail({ name: data.name, organisation: data.organisation, result: scoreChecklist(data.checked), siteUrl: siteUrl() });
  const sent = await sendEmail({ to: data.email, ...email });
  if (!sent.ok) {
    return {
      status: "error",
      message:
        sent.reason === "not_configured"
          ? "Email sending isn't switched on yet. Take a screenshot of your results for now."
          : "Sorry, we couldn't send the email. Please try again in a minute.",
    };
  }
  return { status: "sent", message: `Sent to ${data.email}. Check your inbox (and the spam folder, just in case).` };
}
