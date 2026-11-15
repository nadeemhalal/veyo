// Automatic WhatsApp message to a new lead, sent from Veyo's WhatsApp Business number through Meta's Cloud API.
// The number stays in the WhatsApp Business app too ("coexistence"), so these messages and the lead's replies
// show up in the app on the founder's phone like any other chat.
//
// Needs WHATSAPP_TOKEN (server-only secret: a system user token with whatsapp_business_messaging) and
// WHATSAPP_PHONE_NUMBER_ID (from WhatsApp Manager or the app's API Setup page). Without them, nothing is sent.
// Best effort: a failed message is logged and never affects the visitor, because the lead is already saved.
//
// WhatsApp only lets a business start a chat with a template Meta has approved. Each template below must be
// created in WhatsApp Manager > Message templates with exactly this name, category, language and body.

import { normalisePhone } from "@/lib/meta-capi";

// Graph API versions last about two years. Bump this when Meta deprecates it (same as meta-capi.ts).
const graphVersion = "v23.0";

export type LeadForWhatsApp = { source: string; name: string; storeUrl: string; whatsapp?: string };

type Template = {
  name: string;
  language: string;
  category: "UTILITY";
  /** The body to paste into WhatsApp Manager. {{1}}, {{2}}… are filled by `params`, in order. */
  body: string;
  /** Sample values Meta asks for when the template is submitted. */
  samples: string[];
  params: (lead: LeadForWhatsApp) => string[];
};

// Keep these true: the reply-time promise matches q4Sprint.replyPromise in site.ts.
export const whatsappTemplates: Record<string, Template> = {
  "sri-lanka-q4": {
    name: "q4_sprint_booking",
    language: "en",
    category: "UTILITY",
    body:
      "Hi {{1}}, thanks for booking the Veyo Media Q4 Sprint for {{2}}. Your booking is in. " +
      "Nads will message you here within 2 hours (9am–9pm Sri Lanka time) to confirm your spot and send the payment details. " +
      "Reply to this message if you have any questions.",
    samples: ["Kasun", "kasunstore.lk"],
    params: (l) => [firstName(l.name), storeName(l.storeUrl)],
  },
};

/** WhatsApp numbers are digits with the country code. Returns undefined if it can't be one. */
export function toWhatsAppNumber(phone: string): string | undefined {
  const n = normalisePhone(phone);
  return n && /^[1-9]\d{9,14}$/.test(n) ? n : undefined;
}

// Template values can't hold new lines, tabs or runs of spaces, and must not be empty.
function clean(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function firstName(name: string): string {
  return clean(name, 60).split(" ")[0] || "there";
}

/** "https://www.store.lk/shop/" → "store.lk/shop". */
export function storeName(url: string): string {
  const s = clean(url, 200).replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/+$/, "");
  return s.slice(0, 80) || "your store";
}

/** The Cloud API request body for one lead, or undefined if this form has no template or no usable number. */
export function buildLeadMessage(lead: LeadForWhatsApp) {
  const template = whatsappTemplates[lead.source];
  const to = lead.whatsapp ? toWhatsAppNumber(lead.whatsapp) : undefined;
  if (!template || !to) return undefined;
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "template",
    template: {
      name: template.name,
      language: { code: template.language },
      components: [{ type: "body", parameters: template.params(lead).map((text) => ({ type: "text", text })) }],
    },
  };
}

export function whatsappConfigured(): boolean {
  return Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

export type WhatsAppResult = "sent" | "failed" | "skipped";

/** Sends the lead's welcome message. "skipped" means not switched on, or nothing to send for this form. */
export async function sendLeadWhatsApp(lead: LeadForWhatsApp): Promise<WhatsAppResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const message = buildLeadMessage(lead);
  if (!token || !phoneNumberId || !message) return "skipped";

  try {
    const res = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.error("[whatsapp] error", res.status, (await res.text()).slice(0, 300));
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[whatsapp] request failed", err);
    return "failed";
  }
}
