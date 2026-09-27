import { afterEach, describe, expect, it, vi } from "vitest";
import { saveAuditRequest, toAuditRow } from "./audit-store";

const data = {
  name: "Sam Example",
  email: "sam@example.com",
  storeUrl: "https://example-store.com.au",
  spend: "A$1k–5k/month" as const,
  message: "",
  source: "bfcm",
};

describe("toAuditRow", () => {
  it("maps form fields to the audit_requests columns", () => {
    expect(toAuditRow(data)).toEqual({
      name: "Sam Example",
      work_email: "sam@example.com",
      store_url: "https://example-store.com.au",
      monthly_meta_ad_spend: "A$1k–5k/month",
      additional_info: null,
      source: "bfcm",
    });
  });

  it("keeps a non-empty message", () => {
    expect(toAuditRow({ ...data, message: "Hi" }).additional_info).toBe("Hi");
  });
});

describe("saveAuditRequest", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("returns false without Supabase env vars instead of pretending to save", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(saveAuditRequest(data)).resolves.toBe(false);
    spy.mockRestore();
  });
});
