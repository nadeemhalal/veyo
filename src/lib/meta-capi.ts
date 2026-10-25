// Meta Conversions API: sends each lead from our server, so it's counted even when an ad blocker stops the
// browser pixel. The pixel sends the same Lead with the same event_id, and Meta keeps one of the two.
//
// Needs NEXT_PUBLIC_META_PIXEL_ID (build-time) and META_CAPI_TOKEN (server-only secret, never NEXT_PUBLIC_).
// Optional META_TEST_EVENT_CODE makes events show under Test Events in Events Manager; remove it after testing.

// Graph API versions last about two years. Bump this when Meta deprecates it.
const graphVersion = "v23.0";

export type LeadContext = {
  eventId: string;
  email: string;
  name: string;
  /** Which form: "audit", "bfcm", "sri-lanka", "checklist"... */
  source: string;
  sourceUrl: string;
  ip?: string;
  userAgent?: string;
  /** Meta's browser cookies (_fbp, _fbc), which link the server event to the ad click. */
  fbp?: string;
  fbc?: string;
  /** Milliseconds since epoch. Defaults to now. */
  time?: number;
};

export async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Meta wants names lowercased with no punctuation or digits, split into first and last. */
export function splitName(name: string): { fn?: string; ln?: string } {
  const parts = name
    .toLowerCase()
    .replace(/[\p{P}\p{S}\d]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  return { fn: parts[0], ln: parts.length > 1 ? parts[parts.length - 1] : undefined };
}

/** Builds one Lead event. Personal details are hashed; nothing readable leaves our server. */
export async function buildLeadEvent(c: LeadContext) {
  const { fn, ln } = splitName(c.name);
  const user_data: Record<string, string | string[]> = { em: [await sha256(c.email.trim().toLowerCase())] };
  if (fn) user_data.fn = [await sha256(fn)];
  if (ln) user_data.ln = [await sha256(ln)];
  if (c.ip) user_data.client_ip_address = c.ip;
  if (c.userAgent) user_data.client_user_agent = c.userAgent;
  if (c.fbp) user_data.fbp = c.fbp;
  if (c.fbc) user_data.fbc = c.fbc;

  return {
    event_name: "Lead",
    event_time: Math.floor((c.time ?? Date.now()) / 1000),
    event_id: c.eventId,
    action_source: "website",
    event_source_url: c.sourceUrl,
    user_data,
    custom_data: { content_name: c.source },
  };
}

export function metaCapiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CAPI_TOKEN);
}

/** Sends a Lead to Meta. Best effort: a failure is logged and never affects the visitor. */
export async function sendMetaLead(c: LeadContext): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return false;

  try {
    const body: Record<string, unknown> = { data: [await buildLeadEvent(c)], access_token: token };
    if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;
    const res = await fetch(`https://graph.facebook.com/${graphVersion}/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.error("[meta-capi] error", res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[meta-capi] request failed", err);
    return false;
  }
}

/** Event ids come from the browser; anything odd is replaced so a bad value can't break the request. */
export function safeEventId(id: string | undefined): string {
  return id && /^[A-Za-z0-9-]{8,64}$/.test(id) ? id : crypto.randomUUID();
}
