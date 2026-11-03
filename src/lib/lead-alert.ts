// Instant lead alerts to the founder's phone through a Telegram bot.
// Needs TELEGRAM_BOT_TOKEN (server-only secret, from @BotFather) and TELEGRAM_CHAT_ID (who receives the alerts;
// find it with `npm run telegram:chat-id`). Without them, alerts are skipped. Best effort: a failed alert is
// logged and never affects the visitor, because the lead is already saved in Supabase.

import { normalisePhone } from "@/lib/meta-capi";

const sourceLabels: Record<string, string> = {
  "sri-lanka-q4": "Q4 Sprint booking (Sri Lanka)",
  "sri-lanka": "Free ad review (Sri Lanka online store)",
  "sri-lanka-tourism": "Free ad review (Sri Lanka tourism)",
  audit: "Free ad audit (Australia)",
  bfcm: "BFCM Sprint application (Australia)",
  linkedin: "Free audit (LinkedIn outreach, Australia)",
  website: "Website form",
};

export function sourceLabel(source: string): string {
  return sourceLabels[source] ?? `Form: ${source}`;
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export type FormLeadAlert = {
  source: string;
  name: string;
  email: string;
  storeUrl: string;
  spend: string;
  whatsapp?: string;
  problems?: readonly string[];
  message?: string;
};

/** The Telegram message for a form lead (Telegram HTML). */
export function buildFormLeadAlert(l: FormLeadAlert): string {
  const wa = l.whatsapp ? normalisePhone(l.whatsapp) : undefined;
  const lines = [
    `🔔 <b>New lead: ${escapeHtml(sourceLabel(l.source))}</b>`,
    "",
    `<b>Name:</b> ${escapeHtml(l.name)}`,
    `<b>Email:</b> ${escapeHtml(l.email)}`,
    l.whatsapp && `<b>WhatsApp:</b> ${escapeHtml(l.whatsapp)}`,
    `<b>Store:</b> ${escapeHtml(l.storeUrl)}`,
    `<b>Ad spend:</b> ${escapeHtml(l.spend)}`,
    l.problems?.length && `<b>Problems:</b> ${escapeHtml(l.problems.join("; "))}`,
    l.message && `<b>Note:</b> ${escapeHtml(l.message)}`,
    wa && "",
    wa && `👉 <a href="https://wa.me/${wa}">Reply on WhatsApp</a>`,
  ];
  return lines.filter((x): x is string => typeof x === "string").join("\n");
}

export type ChecklistAlert = { name: string; organisation: string; email: string; score: number; max: number; marketingOptIn: boolean };

/** The Telegram message for a completed audit checklist. */
export function buildChecklistAlert(c: ChecklistAlert): string {
  return [
    `✅ <b>Checklist completed: ${c.score}/${c.max}</b>`,
    "",
    `<b>Name:</b> ${escapeHtml(c.name)}`,
    `<b>Organisation:</b> ${escapeHtml(c.organisation)}`,
    `<b>Email:</b> ${escapeHtml(c.email)}`,
    `<b>Marketing emails OK:</b> ${c.marketingOptIn ? "yes" : "no"}`,
  ].join("\n");
}

export function leadAlertsConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

/** Sends one alert. Returns false (and logs) if not configured or Telegram refuses. */
export async function sendLeadAlert(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.error("[lead-alert] Telegram error", res.status, (await res.text()).slice(0, 200));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead-alert] Telegram request failed", err);
    return false;
  }
}
