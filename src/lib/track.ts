// Browser-side lead tracking. One call reports a lead to:
// - the Meta pixel (Lead, with an event id the server also sends to the Conversions API, so Meta counts it once)
// - GA4 (generate_lead, loaded directly, not through GTM)
// - GTM's dataLayer (generate_lead), for any other tags added there later.
// Each is skipped when it isn't loaded, e.g. in development.

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export function newEventId(): string {
  return crypto.randomUUID();
}

export function trackLead(source: string, eventId: string) {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: "generate_lead", form_source: source, event_id: eventId });
  w.gtag?.("event", "generate_lead", { form_source: source });
  w.fbq?.("track", "Lead", { content_name: source }, { eventID: eventId });
}
