import { afterEach, describe, expect, it, vi } from "vitest";
import { buildKlaviyoEvent, buildKlaviyoSubscription, canSubscribe, sendLeadToKlaviyo, type KlaviyoLead } from "./klaviyo";

const audit: KlaviyoLead = {
  kind: "audit",
  email: "  Sam@Example.COM ",
  name: "Sam O'Brien Smith",
  source: "audit",
  marketingOptIn: true,
  eventId: "3f2b9c1e-1111-4a5b-9c0d-123456789abc",
  storeUrl: "https://samstore.com.au",
  spend: "A$5k–20k/month",
  problems: ["ROAS dropped", "Creative is stale"],
};
const now = new Date("2026-11-15T01:02:03.000Z");

describe("canSubscribe", () => {
  it("needs the opt-in", () => {
    expect(canSubscribe({ ...audit, marketingOptIn: false })).toBe(false);
    expect(canSubscribe(audit)).toBe(true);
  });
  it("never subscribes Sri Lanka leads, even when ticked", () => {
    expect(canSubscribe({ marketingOptIn: true, source: "sri-lanka-q4" })).toBe(false);
    expect(canSubscribe({ marketingOptIn: true, source: "sri-lanka" })).toBe(false);
  });
});

describe("buildKlaviyoEvent", () => {
  it("records an audit request on a tidy profile", () => {
    const body = buildKlaviyoEvent(audit, now);
    const a = body.data.attributes;
    expect(a.metric.data.attributes.name).toBe("Requested Audit");
    expect(a.unique_id).toBe(audit.eventId);
    expect(a.time).toBe(now.toISOString());
    expect(a.properties).toMatchObject({ source: "audit", problems: "ROAS dropped; Creative is stale", marketing_opt_in: true });
    expect(a.profile.data.attributes).toMatchObject({
      email: "sam@example.com",
      first_name: "Sam",
      last_name: "O'Brien Smith",
      properties: { lead_source: "audit", store_url: audit.storeUrl, audit_requested: true, audit_requested_at: now.toISOString() },
    });
  });

  it("records a checklist with its score and leaves out empty fields", () => {
    const body = buildKlaviyoEvent(
      { kind: "checklist", email: "a@b.co", name: "Nads", source: "checklist", marketingOptIn: false, organisation: "Shop", score: 41, max: 60, storeUrl: "" },
      now,
    );
    const a = body.data.attributes;
    expect(a.metric.data.attributes.name).toBe("Completed Checklist");
    expect(a).not.toHaveProperty("unique_id");
    expect(a.properties).toEqual({ source: "checklist", score: 41, max_score: 60, marketing_opt_in: false });
    expect(a.profile.data.attributes).toEqual({
      email: "a@b.co",
      first_name: "Nads",
      organization: "Shop",
      properties: { lead_source: "checklist", checklist_score: 41 },
    });
  });
});

describe("buildKlaviyoSubscription", () => {
  it("subscribes the email to the given list", () => {
    const body = buildKlaviyoSubscription(audit, "LIST1");
    expect(body.data.relationships.list.data.id).toBe("LIST1");
    expect(body.data.attributes.custom_source).toBe("veyomedia.com audit form (audit)");
    expect(body.data.attributes.profiles.data[0].attributes).toEqual({
      email: "sam@example.com",
      subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
    });
  });
});

describe("sendLeadToKlaviyo", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("does nothing without a key", async () => {
    vi.stubEnv("KLAVIYO_PRIVATE_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadToKlaviyo(audit)).toBe("not_configured");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the event and the subscription for an opted-in lead", async () => {
    vi.stubEnv("KLAVIYO_PRIVATE_KEY", "pk_test");
    vi.stubEnv("KLAVIYO_LIST_ID", "");
    const fetchMock = vi.fn(async () => new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadToKlaviyo(audit)).toEqual({ event: true, subscribed: true });
    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
    expect(calls.map(([url]) => url)).toEqual([
      "https://a.klaviyo.com/api/events",
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
    ]);
    expect((calls[0][1].headers as Record<string, string>).Authorization).toBe("Klaviyo-API-Key pk_test");
    expect(JSON.parse(calls[1][1].body as string).data.relationships.list.data.id).toBe("Y6EmTp");
  });

  it("only records the event when the lead didn't opt in", async () => {
    vi.stubEnv("KLAVIYO_PRIVATE_KEY", "pk_test");
    const fetchMock = vi.fn(async () => new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadToKlaviyo({ ...audit, marketingOptIn: false })).toEqual({ event: true, subscribed: "skipped" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("reports a refused request without throwing", async () => {
    vi.stubEnv("KLAVIYO_PRIVATE_KEY", "pk_test");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn(async () => new Response("bad key", { status: 401 })));
    expect(await sendLeadToKlaviyo(audit)).toEqual({ event: false, subscribed: false });
  });
});
