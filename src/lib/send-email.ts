// Sends transactional email through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).
// Needs RESEND_API_KEY (server-only, never NEXT_PUBLIC_) and EMAIL_FROM, e.g. "Veyo Media <hello@veyomedia.com>",
// on a domain verified in Resend.

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(msg: { to: string; subject: string; html: string; text: string }): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { ok: false, reason: "not_configured" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text }),
    });
    if (!res.ok) {
      console.error("[email] Resend error", res.status, (await res.text()).slice(0, 300));
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Resend request failed", err);
    return { ok: false, reason: "failed" };
  }
}
