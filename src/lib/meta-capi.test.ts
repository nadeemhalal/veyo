import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildLeadEvent, safeEventId, sendMetaLead, sha256, splitName } from "./meta-capi";
import { parseAuditForm } from "./audit-schema";

const nodeSha = (v: string) => createHash("sha256").update(v).digest("hex");

const lead = {
  eventId: "3f2b9c1e-1111-4a5b-9c0d-123456789abc",
  email: "  Sam.Example@Example.COM ",
  name: "Sam O'Brien-Smith",
  source: "audit",
  sourceUrl: "https://veyomedia.com/services/audit",
  ip: "203.0.113.7",
  userAgent: "Mozilla/5.0",
  fbp: "fb.1.1700000000000.123",
  fbc: "fb.1.1700000000000.AbCdEf",
  time: 1_760_000_000_123,
};

describe("sha256", () => {
  it("matches Node's SHA-256", async () => {
    expect(await sha256("test@example.com")).toBe(nodeSha("test@example.com"));
  });
});

describe("splitName", () => {
  it("lowercases, strips punctuation and splits first and last", () => {
    expect(splitName("Sam O'Brien-Smith")).toEqual({ fn: "sam", ln: "smith" });
    expect(splitName("  Nads ")).toEqual({ fn: "nads", ln: undefined });
  });
});

describe("buildLeadEvent", () => {
  it("builds a Lead with hashed contact details and no raw email or name", async () => {
    const e = await buildLeadEvent(lead);
    expect(e).toMatchObject({
      event_name: "Lead",
      event_time: 1_760_000_000,
      event_id: lead.eventId,
      action_source: "website",
      event_source_url: lead.sourceUrl,
      custom_data: { content_name: "audit" },
    });
    expect(e.user_data.em).toEqual([nodeSha("sam.example@example.com")]);
    expect(e.user_data.fn).toEqual([nodeSha("sam")]);
    expect(e.user_data.client_ip_address).toBe("203.0.113.7");
    expect(e.user_data.fbp).toBe(lead.fbp);
    expect(e.user_data.fbc).toBe(lead.fbc);
    expect(JSON.stringify(e)).not.toMatch(/example\.com|Sam/i);
  });

  it("leaves out matching details it doesn't have", async () => {
    const e = await buildLeadEvent({ ...lead, ip: undefined, fbp: undefined, fbc: undefined });
    expect(e.user_data).not.toHaveProperty("client_ip_address");
    expect(e.user_data).not.toHaveProperty("fbp");
    expect(e.user_data).not.toHaveProperty("fbc");
  });
});

describe("safeEventId", () => {
  it("keeps a valid id and replaces anything else", () => {
    expect(safeEventId(lead.eventId)).toBe(lead.eventId);
    expect(safeEventId("<script>")).not.toBe("<script>");
    expect(safeEventId(undefined)).toMatch(/^[0-9a-f-]{36}$/);
  });
});

describe("sendMetaLead", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does nothing until the pixel id and token are set", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "");
    vi.stubEnv("META_CAPI_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendMetaLead(lead)).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the event to the pixel's events endpoint, with the test code when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1234567890");
    vi.stubEnv("META_CAPI_TOKEN", "token-abc");
    vi.stubEnv("META_TEST_EVENT_CODE", "TEST123");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    expect(await sendMetaLead(lead)).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/^https:\/\/graph\.facebook\.com\/v\d+\.0\/1234567890\/events$/);
    const body = JSON.parse(init.body);
    expect(body.access_token).toBe("token-abc");
    expect(body.test_event_code).toBe("TEST123");
    expect(body.data[0].event_id).toBe(lead.eventId);
  });

  it("returns false instead of throwing when Meta errors", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1234567890");
    vi.stubEnv("META_CAPI_TOKEN", "token-abc");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("bad", { status: 400 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await sendMetaLead(lead)).toBe(false);
  });
});

describe("audit form event id", () => {
  it("passes a submitted event id through validation", () => {
    const r = parseAuditForm({
      name: "Sam Example",
      email: "sam@example.com",
      storeUrl: "example.com",
      spend: "A$1k–5k/month",
      eventId: lead.eventId,
    });
    expect(r.ok && r.data.eventId).toBe(lead.eventId);
  });
});
