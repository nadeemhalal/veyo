// Browser-side lead tracking. One call reports a lead to:
// - the Meta pixel (Lead, with an event id the server also sends to the Conversions API, so Meta counts it once)
// - GA4 (generate_lead, loaded directly, not through GTM)
// - Google Ads (a conversion, once NEXT_PUBLIC_GOOGLE_ADS_ID and NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL are set;
//   the event id is the transaction id, so a double-fire counts once)
// - GTM's dataLayer (generate_lead), for any other tags added there later.
// trackContact() does the same for clicks on WhatsApp, email and phone links (Meta "Contact", GA4 "contact",
// and a separate Google Ads conversion once NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL is set).
// Each is skipped when it isn't loaded, e.g. in development.

import { site } from "@/lib/site";

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export function newEventId(): string {
  return crypto.randomUUID();
}

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || site.googleAdsId;
const googleAdsLeadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || site.googleAdsLeadLabel;
const googleAdsContactLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL || site.googleAdsContactLabel;

export type ContactMethod = "whatsapp" | "email" | "phone";

export function trackContact(method: ContactMethod) {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: "contact", method });
  w.gtag?.("event", "contact", { method });
  if (googleAdsId && googleAdsContactLabel) {
    w.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${googleAdsContactLabel}` });
  }
  w.fbq?.("track", "Contact", { content_name: method });
}

export function trackLead(source: string, eventId: string, email?: string) {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: "generate_lead", form_source: source, event_id: eventId });
  w.gtag?.("event", "generate_lead", { form_source: source });
  if (googleAdsId && googleAdsLeadLabel) {
    // Enhanced conversions: gtag normalises and hashes the email before it leaves the browser.
    if (email) w.gtag?.("set", "user_data", { email });
    w.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${googleAdsLeadLabel}`, transaction_id: eventId });
  }
  w.fbq?.("track", "Lead", { content_name: source }, { eventID: eventId });
}
