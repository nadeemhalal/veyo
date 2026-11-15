// Sends every website lead to Klaviyo.
//
// Every lead becomes a Klaviyo profile with a "Requested Audit" or "Completed Checklist" event. That sends no email
// on its own; it lets flows and filters see who asked for what (e.g. the welcome series skips people who already
// asked for an audit).
//
// Only leads who ticked the marketing opt-in are subscribed to the newsletter list (Spam Act: asking for an audit is
// not consent to marketing). That list uses double opt-in, so Klaviyo sends a confirmation email first and the
// welcome series starts once they confirm. Sri Lanka leads never join it: the series is written for Australian brands.
//
// Needs KLAVIYO_PRIVATE_KEY (server-only secret, a Klaviyo private API key with write access to Profiles, Events,
// Lists and Subscriptions). Without it, nothing is sent. KLAVIYO_LIST_ID overrides the newsletter list.
// Best effort: a failure is logged and never affects the visitor, because the lead is already saved.

const apiBase = "https://a.klaviyo.com/api";
// Klaviyo API revisions last about two years. Bump this when Klaviyo retires it.
const apiRevision = "2025-07-15";
// "Email List" in the Veyo Media Klaviyo account; it triggers the "Welcome series: newsletter" flow.
const defaultListId = "Y6EmTp";

export type KlaviyoLead = {
  kind: "audit" | "checklist";
  email: string;
  name: string;
  source: string;
  marketingOptIn: boolean;
  /** Shared with the pixel and Conversions API; stops Klaviyo counting a resent lead twice. */
  eventId?: string;
  storeUrl?: string;
  spend?: string;
  whatsapp?: string;
  problems?: readonly string[];
  organisation?: string;
  score?: number;
  max?: number;
};

export const klaviyoMetrics = { audit: "Requested Audit", checklist: "Completed Checklist" } as const;

export function klaviyoConfigured(): boolean {
  return Boolean(process.env.KLAVIYO_PRIVATE_KEY);
}

/** Opted in, and from an Australian form. */
export function canSubscribe(lead: Pick<KlaviyoLead, "marketingOptIn" | "source">): boolean {
  return lead.marketingOptIn && !lead.source.startsWith("sri-lanka");
}

function splitName(name: string): { first_name?: string; last_name?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  return { first_name: parts[0], ...(parts.length > 1 ? { last_name: parts.slice(1).join(" ") } : {}) };
}

// Klaviyo drops nothing for undefined, but empty strings would overwrite real values on the profile.
function compact<T extends Record<string, unknown>>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== "")) as Partial<T>;
}

/** The body for POST /api/events: creates or updates the profile and records the lead. */
export function buildKlaviyoEvent(lead: KlaviyoLead, now = new Date()) {
  const audit = lead.kind === "audit";
  const profileProperties = compact({
    lead_source: lead.source,
    store_url: lead.storeUrl,
    monthly_ad_spend: lead.spend,
    whatsapp: lead.whatsapp,
    ...(audit ? { audit_requested: true, audit_requested_at: now.toISOString() } : { checklist_score: lead.score }),
  });
  return {
    data: {
      type: "event",
      attributes: {
        properties: compact({
          source: lead.source,
          store_url: lead.storeUrl,
          monthly_ad_spend: lead.spend,
          problems: lead.problems?.length ? lead.problems.join("; ") : undefined,
          score: lead.score,
          max_score: lead.max,
          marketing_opt_in: lead.marketingOptIn,
        }),
        time: now.toISOString(),
        ...(lead.eventId ? { unique_id: lead.eventId } : {}),
        metric: { data: { type: "metric", attributes: { name: klaviyoMetrics[lead.kind] } } },
        profile: {
          data: {
            type: "profile",
            attributes: compact({
              email: lead.email.trim().toLowerCase(),
              ...splitName(lead.name),
              organization: lead.organisation,
              properties: profileProperties,
            }),
          },
        },
      },
    },
  };
}

/** The body for POST /api/profile-subscription-bulk-create-jobs: subscribes one opted-in lead to the list. */
export function buildKlaviyoSubscription(lead: KlaviyoLead, listId: string) {
  return {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source: `veyomedia.com ${lead.kind === "audit" ? "audit form" : "checklist"} (${lead.source})`,
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: lead.email.trim().toLowerCase(),
                subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
              },
            },
          ],
        },
      },
      relationships: { list: { data: { type: "list", id: listId } } },
    },
  };
}

async function post(path: string, body: unknown, key: string): Promise<boolean> {
  try {
    const res = await fetch(`${apiBase}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: apiRevision,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error(`[klaviyo] ${path} error`, res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[klaviyo] ${path} request failed`, err);
    return false;
  }
}

export type KlaviyoResult = { event: boolean; subscribed: boolean | "skipped" } | "not_configured";

/** Records the lead in Klaviyo and, if allowed, subscribes it to the newsletter list. Never throws. */
export async function sendLeadToKlaviyo(lead: KlaviyoLead): Promise<KlaviyoResult> {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key) return "not_configured";
  const listId = process.env.KLAVIYO_LIST_ID || defaultListId;
  const [event, subscribed] = await Promise.all([
    post("events", buildKlaviyoEvent(lead), key),
    canSubscribe(lead) ? post("profile-subscription-bulk-create-jobs", buildKlaviyoSubscription(lead, listId), key) : ("skipped" as const),
  ]);
  return { event, subscribed };
}
